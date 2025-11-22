require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const bcrypt = require("bcrypt");
const rateLimit = require("express-rate-limit");
const mongoose = require("mongoose");
const Products = require("./models/Product");

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// Security middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));

// Rate limiting to prevent brute force attacks
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Previše pokušaja prijave. Pokušajte ponovo za 15 minuta.",
});

// Admin credentials from environment variables
const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

// Session management (simple in-memory for demo, use Redis in production)
const sessions = new Map();

// Middleware to check if user is authenticated
const requireAuth = (req, res, next) => {
  const sessionId = req.headers.authorization?.replace("Bearer ", "");
  if (!sessionId || !sessions.has(sessionId)) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
};

// Get or create products document
async function getProductsDocument() {
  let products = await Products.findOne();
  if (!products) {
    // Create default structure if doesn't exist
    products = new Products({
      alati: [],
    });
    // Initialize premazi as a Map
    products.premazi = new Map();
    products.premazi.set("metal", { kategorije: new Map() });
    products.premazi.set("drvo", { kategorije: new Map() });
    await products.save();
  } else {
    // Ensure premazi is a Map if it exists as an object
    if (products.premazi && !(products.premazi instanceof Map)) {
      const premaziMap = new Map();
      for (const [key, value] of Object.entries(products.premazi)) {
        if (value && value.kategorije && !(value.kategorije instanceof Map)) {
          value.kategorije = new Map(Object.entries(value.kategorije));
        }
        premaziMap.set(key, value);
      }
      products.premazi = premaziMap;
    }
  }
  return products;
}

// Generate session ID
function generateSessionId() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

// Routes

// Admin login
app.post("/api/login", loginLimiter, async (req, res) => {
  try {
    const { username, password } = req.body;

    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const sessionId = generateSessionId();
    sessions.set(sessionId, {
      username,
      createdAt: Date.now(),
    });

    res.json({
      success: true,
      sessionId,
      message: "Login successful",
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get all products (public endpoint)
app.get("/api/products", async (req, res) => {
  try {
    const products = await getProductsDocument();

    // Convert to plain object and handle Map properly
    const productsObj = products.toObject();

    // Convert premazi Maps to regular objects
    if (productsObj.premazi) {
      // Handle both Map and object formats
      const premaziObj =
        productsObj.premazi instanceof Map
          ? Object.fromEntries(productsObj.premazi)
          : productsObj.premazi;

      Object.keys(premaziObj).forEach((materialKey) => {
        if (premaziObj[materialKey] && premaziObj[materialKey].kategorije) {
          const kategorije = premaziObj[materialKey].kategorije;
          premaziObj[materialKey].kategorije =
            kategorije instanceof Map
              ? Object.fromEntries(kategorije)
              : kategorije;
        }
      });
      productsObj.premazi = premaziObj;
    }

    res.json(productsObj);
  } catch (error) {
    console.error("Error getting products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get all products (admin endpoint - requires auth)
app.get("/api/admin/products", requireAuth, async (req, res) => {
  try {
    const products = await getProductsDocument();

    const productsObj = products.toObject();

    // Convert premazi Maps to regular objects
    if (productsObj.premazi) {
      // Handle both Map and object formats
      const premaziObj =
        productsObj.premazi instanceof Map
          ? Object.fromEntries(productsObj.premazi)
          : productsObj.premazi;

      Object.keys(premaziObj).forEach((materialKey) => {
        if (premaziObj[materialKey] && premaziObj[materialKey].kategorije) {
          const kategorije = premaziObj[materialKey].kategorije;
          premaziObj[materialKey].kategorije =
            kategorije instanceof Map
              ? Object.fromEntries(kategorije)
              : kategorije;
        }
      });
      productsObj.premazi = premaziObj;
    }

    res.json(productsObj);
  } catch (error) {
    console.error("Error getting products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Add new product
app.post("/api/products", requireAuth, async (req, res) => {
  try {
    const { type, categoryIndex, material, subcategory, product } = req.body;

    if (!type || !product) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Validate new product data
    if (type !== "premazi") {
      if (
        !product.naziv ||
        !product.jedinica_mere ||
        !product.sifra_artikla ||
        !product.id
      ) {
        return res.status(400).json({
          error:
            "Missing required product fields: naziv, jedinica_mere, sifra_artikla, id",
        });
      }
    } else {
      if (!product.naziv || !product.tip || !product.boja || !product.id) {
        return res.status(400).json({
          error: "Missing required product fields: naziv, tip, boja, id",
        });
      }
    }

    const products = await getProductsDocument();

    if (type === "premazi") {
      if (!material || !subcategory) {
        return res
          .status(400)
          .json({ error: "Missing material or subcategory for premazi" });
      }

      // Ensure premazi is a Map
      if (!(products.premazi instanceof Map)) {
        products.premazi = new Map(Object.entries(products.premazi || {}));
      }

      if (!products.premazi.has(material)) {
        return res.status(400).json({ error: "Invalid material" });
      }

      let materialData = products.premazi.get(material);

      // Initialize kategorije Map if it doesn't exist
      if (
        !materialData.kategorije ||
        !(materialData.kategorije instanceof Map)
      ) {
        materialData.kategorije = new Map();
      }

      // Get or create subcategory
      let subcategoryData = materialData.kategorije.get(subcategory);
      if (!subcategoryData) {
        subcategoryData = { naziv: subcategory, proizvodi: [] };
      }

      subcategoryData.proizvodi.push(product);
      materialData.kategorije.set(subcategory, subcategoryData);
      products.premazi.set(material, materialData);
      products.markModified("premazi");
    } else {
      // Handle alati-like products
      if (categoryIndex === undefined) {
        return res.status(400).json({ error: "Missing category index" });
      }

      // Get the category array (handle both schema-defined and dynamic properties)
      const productsObj = products.toObject();
      const categoryArray = productsObj[type];

      if (!categoryArray || !Array.isArray(categoryArray)) {
        return res.status(400).json({ error: "Invalid main category type" });
      }

      if (!categoryArray[categoryIndex]) {
        return res.status(400).json({ error: "Invalid category index" });
      }

      // Get the actual Mongoose document array and push to it
      const actualCategoryArray = products[type];
      actualCategoryArray[categoryIndex].artikli.push(product);
      products.markModified(type);
    }

    // Save - optional fields in schema allow existing incomplete data
    await products.save();

    res.json({
      success: true,
      message: "Product added successfully",
      product,
    });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete product by ID
app.delete("/api/products/:type/:productId", requireAuth, async (req, res) => {
  try {
    const { type, productId } = req.params;
    console.log(`Deleting ${type} product with ID: ${productId}`);

    const products = await getProductsDocument();
    let removed = false;

    if (type === "premazi") {
      // Ensure premazi is a Map
      if (!(products.premazi instanceof Map)) {
        products.premazi = new Map(Object.entries(products.premazi || {}));
      }

      for (const [materialKey, material] of products.premazi.entries()) {
        if (material.kategorije) {
          // Ensure kategorije is a Map
          if (!(material.kategorije instanceof Map)) {
            material.kategorije = new Map(
              Object.entries(material.kategorije || {})
            );
          }

          for (const [
            categoryKey,
            categoryData,
          ] of material.kategorije.entries()) {
            const productIndex = categoryData.proizvodi.findIndex(
              (product) => product.id === productId
            );
            if (productIndex !== -1) {
              categoryData.proizvodi.splice(productIndex, 1);
              material.kategorije.set(categoryKey, categoryData);
              products.premazi.set(materialKey, material);
              products.markModified("premazi");
              removed = true;
              break;
            }
          }
        }
        if (removed) break;
      }
    } else {
      // Handle alati-like products (including dynamic main categories)
      const productsObj = products.toObject();
      const categoryArray = productsObj[type];

      if (categoryArray && Array.isArray(categoryArray)) {
        const actualCategoryArray = products[type];
        for (const category of actualCategoryArray) {
          const productIndex = category.artikli.findIndex(
            (product) => product.id === productId
          );
          if (productIndex !== -1) {
            category.artikli.splice(productIndex, 1);
            products.markModified(type);
            removed = true;
            break;
          }
        }
      }
    }

    if (!removed) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Save - optional fields in schema allow existing incomplete data
    await products.save();

    res.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Add main category
app.post("/api/categories/main", requireAuth, async (req, res) => {
  try {
    const { categoryName, categoryKey } = req.body;
    if (!categoryName || !categoryKey) {
      return res
        .status(400)
        .json({ error: "Category name and key are required" });
    }

    // Don't allow overwriting alati or premazi
    if (categoryKey === "alati" || categoryKey === "premazi") {
      return res
        .status(400)
        .json({ error: "Cannot overwrite reserved category" });
    }

    const products = await getProductsDocument();

    // Check if category already exists (handle both schema-defined and dynamic properties)
    const productsObj = products.toObject();
    if (productsObj[categoryKey]) {
      return res.status(400).json({ error: "Main category already exists" });
    }

    // Set the new category as an array directly on the document
    // For dynamic properties, use updateOne with $set operator which works reliably
    const updateResult = await Products.updateOne(
      { _id: products._id },
      { $set: { [categoryKey]: [] } }
    );

    if (updateResult.modifiedCount === 0) {
      console.error(
        `Failed to update document. Matched: ${updateResult.matchedCount}, Modified: ${updateResult.modifiedCount}`
      );
      return res.status(500).json({ error: "Failed to save main category" });
    }

    // Verify it was saved by checking the document
    const verify = await Products.findById(products._id);
    const verifyObj = verify.toObject();
    console.log(
      `Main category ${categoryKey} added. Document keys:`,
      Object.keys(verifyObj)
    );
    console.log(`Category exists:`, verifyObj[categoryKey] !== undefined);

    res.json({
      success: true,
      message: "Main category added successfully",
      category: {
        key: categoryKey,
        name: categoryName,
      },
    });
  } catch (error) {
    console.error("Error adding main category:", error);
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
});

// Add category for alati or custom main categories
app.post("/api/categories/alati", requireAuth, async (req, res) => {
  try {
    const { categoryName, mainCategoryKey } = req.body;
    if (!categoryName) {
      return res.status(400).json({ error: "Category name is required" });
    }

    const products = await getProductsDocument();
    const targetKey = mainCategoryKey || "alati";

    // Get the category array (handle both schema-defined and dynamic properties)
    const productsObj = products.toObject();
    const targetCategory = productsObj[targetKey];

    if (!targetCategory || !Array.isArray(targetCategory)) {
      return res.status(400).json({ error: "Main category does not exist" });
    }

    const exists = targetCategory.some(
      (cat) => cat.kategorija.toLowerCase() === categoryName.toLowerCase()
    );
    if (exists) {
      return res.status(400).json({ error: "Category already exists" });
    }

    // Get the actual Mongoose array and push to it
    const categoryArray = products[targetKey];
    if (!categoryArray) {
      return res.status(400).json({ error: "Main category array not found" });
    }

    // Use updateOne with $push to add the new category
    // This is more reliable for array updates
    const updateResult = await Products.updateOne(
      { _id: products._id },
      { $push: { [targetKey]: { kategorija: categoryName, artikli: [] } } }
    );

    if (updateResult.modifiedCount === 0) {
      console.error(
        `Failed to update document. Matched: ${updateResult.matchedCount}, Modified: ${updateResult.modifiedCount}`
      );
      return res.status(500).json({ error: "Failed to save subcategory" });
    }

    // Verify it was saved
    const verify = await Products.findById(products._id);
    const verifyObj = verify.toObject();
    console.log(
      `Subcategory ${categoryName} added to ${targetKey}. Total categories:`,
      verifyObj[targetKey]?.length
    );

    res.json({
      success: true,
      message: "Category added successfully",
      category: {
        index: products[targetKey].length - 1,
        name: categoryName,
      },
    });
  } catch (error) {
    console.error("Error adding category:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Add material category for premazi
app.post("/api/categories/premazi/material", requireAuth, async (req, res) => {
  try {
    const { materialName, materialKey } = req.body;
    if (!materialName || !materialKey) {
      return res
        .status(400)
        .json({ error: "Material name and key are required" });
    }

    const products = await getProductsDocument();

    // Ensure premazi is a Map
    if (!(products.premazi instanceof Map)) {
      products.premazi = new Map(Object.entries(products.premazi || {}));
    }

    if (products.premazi.has(materialKey)) {
      return res.status(400).json({ error: "Material already exists" });
    }

    products.premazi.set(materialKey, {
      kategorije: new Map(),
    });
    products.markModified("premazi");

    // Save - optional fields in schema allow existing incomplete data
    await products.save();

    res.json({
      success: true,
      message: "Material category added successfully",
      material: {
        key: materialKey,
        name: materialName,
      },
    });
  } catch (error) {
    console.error("Error adding material category:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete subcategory (alati-like categories)
app.delete(
  "/api/categories/alati/:mainCategoryKey/:categoryIndex",
  requireAuth,
  async (req, res) => {
    try {
      const { mainCategoryKey, categoryIndex } = req.params;
      const index = parseInt(categoryIndex);

      if (isNaN(index)) {
        return res.status(400).json({ error: "Invalid category index" });
      }

      const products = await getProductsDocument();
      const productsObj = products.toObject();
      const targetKey = mainCategoryKey || "alati";

      if (!productsObj[targetKey] || !Array.isArray(productsObj[targetKey])) {
        return res.status(404).json({ error: "Main category not found" });
      }

      if (index < 0 || index >= productsObj[targetKey].length) {
        return res.status(404).json({ error: "Category not found" });
      }

      // Get the category to delete to use it in $pull
      const categoryToDelete = productsObj[targetKey][index];

      if (!categoryToDelete) {
        return res.status(404).json({ error: "Category not found" });
      }

      // Use $pull to remove the category by matching the kategorija field
      const updateResult = await Products.updateOne(
        { _id: products._id },
        { $pull: { [targetKey]: { kategorija: categoryToDelete.kategorija } } }
      );

      if (updateResult.modifiedCount === 0) {
        console.error(
          `Failed to delete subcategory. Matched: ${updateResult.matchedCount}, Modified: ${updateResult.modifiedCount}`
        );
        return res.status(500).json({ error: "Failed to delete subcategory" });
      }

      console.log(
        `Subcategory ${categoryToDelete.kategorija} deleted from ${targetKey} successfully`
      );

      res.json({
        success: true,
        message: "Category deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting category:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// Delete premazi material
app.delete(
  "/api/categories/premazi/material/:materialKey",
  requireAuth,
  async (req, res) => {
    try {
      const { materialKey } = req.params;

      const products = await getProductsDocument();

      // Ensure premazi is a Map
      if (!(products.premazi instanceof Map)) {
        products.premazi = new Map(Object.entries(products.premazi || {}));
      }

      if (!products.premazi.has(materialKey)) {
        return res.status(404).json({ error: "Material not found" });
      }

      // Delete the material
      products.premazi.delete(materialKey);
      products.markModified("premazi");
      await products.save();

      res.json({
        success: true,
        message: "Material deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting material:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// Delete premazi subcategory
app.delete(
  "/api/categories/premazi/subcategory/:materialKey/:subcategoryKey",
  requireAuth,
  async (req, res) => {
    try {
      const { materialKey, subcategoryKey } = req.params;

      const products = await getProductsDocument();

      // Ensure premazi is a Map
      if (!(products.premazi instanceof Map)) {
        products.premazi = new Map(Object.entries(products.premazi || {}));
      }

      if (!products.premazi.has(materialKey)) {
        return res.status(404).json({ error: "Material not found" });
      }

      const materialData = products.premazi.get(materialKey);

      if (
        !materialData.kategorije ||
        !(materialData.kategorije instanceof Map)
      ) {
        return res.status(404).json({ error: "Subcategory not found" });
      }

      if (!materialData.kategorije.has(subcategoryKey)) {
        return res.status(404).json({ error: "Subcategory not found" });
      }

      // Delete the subcategory
      materialData.kategorije.delete(subcategoryKey);
      products.premazi.set(materialKey, materialData);
      products.markModified("premazi");
      await products.save();

      res.json({
        success: true,
        message: "Subcategory deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting subcategory:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// Delete main category
app.delete(
  "/api/categories/main/:categoryKey",
  requireAuth,
  async (req, res) => {
    try {
      const { categoryKey } = req.params;

      // Don't allow deleting reserved categories
      if (categoryKey === "alati" || categoryKey === "premazi") {
        return res
          .status(400)
          .json({ error: "Cannot delete reserved category" });
      }

      const products = await getProductsDocument();
      const productsObj = products.toObject();

      if (!productsObj[categoryKey]) {
        return res.status(404).json({ error: "Main category not found" });
      }

      // Delete the category using updateOne with $unset operator
      const updateResult = await Products.updateOne(
        { _id: products._id },
        { $unset: { [categoryKey]: "" } }
      );

      if (updateResult.modifiedCount === 0) {
        console.error(
          `Failed to delete category. Matched: ${updateResult.matchedCount}, Modified: ${updateResult.modifiedCount}`
        );
        return res
          .status(500)
          .json({ error: "Failed to delete main category" });
      }

      console.log(`Main category ${categoryKey} deleted successfully`);

      res.json({
        success: true,
        message: "Main category deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting main category:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// Delete subcategory (alati-like categories)
app.delete(
  "/api/categories/alati/:mainCategoryKey/:categoryIndex",
  requireAuth,
  async (req, res) => {
    try {
      const { mainCategoryKey, categoryIndex } = req.params;
      const index = parseInt(categoryIndex);

      if (isNaN(index)) {
        return res.status(400).json({ error: "Invalid category index" });
      }

      const products = await getProductsDocument();
      const productsObj = products.toObject();
      const targetKey = mainCategoryKey || "alati";

      if (!productsObj[targetKey] || !Array.isArray(productsObj[targetKey])) {
        return res.status(404).json({ error: "Main category not found" });
      }

      if (index < 0 || index >= productsObj[targetKey].length) {
        return res.status(404).json({ error: "Category not found" });
      }

      // Get the category to delete to use it in $pull
      const categoryToDelete = productsObj[targetKey][index];

      if (!categoryToDelete) {
        return res.status(404).json({ error: "Category not found" });
      }

      // Use $pull to remove the category by matching the kategorija field
      const updateResult = await Products.updateOne(
        { _id: products._id },
        { $pull: { [targetKey]: { kategorija: categoryToDelete.kategorija } } }
      );

      if (updateResult.modifiedCount === 0) {
        console.error(
          `Failed to delete subcategory. Matched: ${updateResult.matchedCount}, Modified: ${updateResult.modifiedCount}`
        );
        return res.status(500).json({ error: "Failed to delete subcategory" });
      }

      console.log(
        `Subcategory ${categoryToDelete.kategorija} deleted from ${targetKey} successfully`
      );

      res.json({
        success: true,
        message: "Category deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting category:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// Delete premazi material
app.delete(
  "/api/categories/premazi/material/:materialKey",
  requireAuth,
  async (req, res) => {
    try {
      const { materialKey } = req.params;

      const products = await getProductsDocument();

      // Ensure premazi is a Map
      if (!(products.premazi instanceof Map)) {
        products.premazi = new Map(Object.entries(products.premazi || {}));
      }

      if (!products.premazi.has(materialKey)) {
        return res.status(404).json({ error: "Material not found" });
      }

      // Delete the material
      products.premazi.delete(materialKey);
      products.markModified("premazi");
      await products.save();

      res.json({
        success: true,
        message: "Material deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting material:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// Delete premazi subcategory
app.delete(
  "/api/categories/premazi/subcategory/:materialKey/:subcategoryKey",
  requireAuth,
  async (req, res) => {
    try {
      const { materialKey, subcategoryKey } = req.params;

      const products = await getProductsDocument();

      // Ensure premazi is a Map
      if (!(products.premazi instanceof Map)) {
        products.premazi = new Map(Object.entries(products.premazi || {}));
      }

      if (!products.premazi.has(materialKey)) {
        return res.status(404).json({ error: "Material not found" });
      }

      const materialData = products.premazi.get(materialKey);

      if (
        !materialData.kategorije ||
        !(materialData.kategorije instanceof Map)
      ) {
        return res.status(404).json({ error: "Subcategory not found" });
      }

      if (!materialData.kategorije.has(subcategoryKey)) {
        return res.status(404).json({ error: "Subcategory not found" });
      }

      // Delete the subcategory
      materialData.kategorije.delete(subcategoryKey);
      products.premazi.set(materialKey, materialData);
      products.markModified("premazi");
      await products.save();

      res.json({
        success: true,
        message: "Subcategory deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting subcategory:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// Add subcategory for premazi
app.post(
  "/api/categories/premazi/subcategory",
  requireAuth,
  async (req, res) => {
    try {
      const { materialKey, subcategoryName, subcategoryKey } = req.body;
      if (!materialKey || !subcategoryName || !subcategoryKey) {
        return res.status(400).json({
          error: "Material key, subcategory name and key are required",
        });
      }

      const products = await getProductsDocument();

      // Ensure premazi is a Map
      if (!(products.premazi instanceof Map)) {
        products.premazi = new Map(Object.entries(products.premazi || {}));
      }

      if (!products.premazi.has(materialKey)) {
        return res.status(400).json({ error: "Material does not exist" });
      }

      let materialData = products.premazi.get(materialKey);

      if (
        !materialData.kategorije ||
        !(materialData.kategorije instanceof Map)
      ) {
        materialData.kategorije = new Map();
      }

      if (materialData.kategorije.has(subcategoryKey)) {
        return res.status(400).json({ error: "Subcategory already exists" });
      }

      materialData.kategorije.set(subcategoryKey, {
        naziv: subcategoryName,
        proizvodi: [],
      });

      products.premazi.set(materialKey, materialData);
      products.markModified("premazi");

      await products.save();

      res.json({
        success: true,
        message: "Subcategory added successfully",
        subcategory: {
          key: subcategoryKey,
          name: subcategoryName,
        },
      });
    } catch (error) {
      console.error("Error adding subcategory:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// Logout
app.post("/api/logout", requireAuth, (req, res) => {
  const sessionId = req.headers.authorization?.replace("Bearer ", "");
  if (sessionId) {
    sessions.delete(sessionId);
  }
  res.json({ success: true, message: "Logged out successfully" });
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    port: PORT,
    nodeEnv: process.env.NODE_ENV || "development",
    database:
      mongoose.connection.readyState === 1 ? "connected" : "disconnected",
  });
});

// Serve static files from dist folder
const distPath = path.join(__dirname, "../dist");
const indexPath = path.join(__dirname, "../dist/index.html");
const fs = require("fs");

if (fs.existsSync(distPath)) {
  app.use(
    express.static(distPath, {
      maxAge: "1y",
      etag: true,
    })
  );
}

// Catch-all handler
app.get("*", (req, res, next) => {
  if (req.path.startsWith("/api")) {
    return res.status(404).json({ error: "API route not found" });
  }

  if (
    req.path.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$/)
  ) {
    return res.status(404).send("File not found");
  }

  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res
      .status(404)
      .send("Frontend not found. Please build the frontend first.");
  }
});

// Export app for Vercel serverless functions
module.exports = app;

// Start server only if not in Vercel environment
if (process.env.VERCEL !== "1") {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
    console.log(`Admin username: ${ADMIN_USERNAME ? "SET" : "NOT SET"}`);
    console.log(
      `MongoDB: ${
        mongoose.connection.readyState === 1 ? "CONNECTED" : "DISCONNECTED"
      }`
    );
  });
}

// Clean up old sessions every hour
setInterval(() => {
  const now = Date.now();
  for (const [sessionId, session] of sessions.entries()) {
    if (now - session.createdAt > 24 * 60 * 60 * 1000) {
      sessions.delete(sessionId);
    }
  }
}, 60 * 60 * 1000);

require("dotenv").config();
const express = require("express");
const fs = require("fs").promises;
const fsSync = require("fs");
const path = require("path");
const cors = require("cors");
const bcrypt = require("bcrypt");
const rateLimit = require("express-rate-limit");

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));

// Rate limiting to prevent brute force attacks
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts per window
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

// Load products data
async function loadProducts() {
  try {
    const filePath = path.join(__dirname, "gradjevinski_alat.json");
    const data = await fs.readFile(filePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error loading products:", error);
    console.error(
      "Looking for file at:",
      path.join(__dirname, "gradjevinski_alat.json")
    );
    return null;
  }
}

// Save products data
async function saveProducts(data) {
  try {
    const filePath = path.join(__dirname, "gradjevinski_alat.json");
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error("Error saving products:", error);
    return false;
  }
}

// Generate session ID
function generateSessionId() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

// Find and remove product by ID
function removeProductById(products, type, productId) {
  if (type === "alati") {
    for (
      let categoryIndex = 0;
      categoryIndex < products.alati.length;
      categoryIndex++
    ) {
      const category = products.alati[categoryIndex];
      const productIndex = category.artikli.findIndex(
        (product) => product.id === productId
      );
      if (productIndex !== -1) {
        category.artikli.splice(productIndex, 1);
        return true;
      }
    }
  } else if (type === "premazi") {
    for (const [material, materialData] of Object.entries(products.premazi)) {
      for (const [categoryKey, categoryData] of Object.entries(
        materialData.kategorije
      )) {
        const productIndex = categoryData.proizvodi.findIndex(
          (product) => product.id === productId
        );
        if (productIndex !== -1) {
          categoryData.proizvodi.splice(productIndex, 1);
          return true;
        }
      }
    }
  }
  return false;
}

// Routes

// Admin login
app.post("/api/login", loginLimiter, async (req, res) => {
  try {
    const { username, password } = req.body;

    if (username !== ADMIN_USERNAME) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Check password (using plain text for now, but can be upgraded to bcrypt)
    if (password !== ADMIN_PASSWORD) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate session
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
    const products = await loadProducts();
    if (!products) {
      return res.status(500).json({ error: "Failed to load products" });
    }
    res.json(products);
  } catch (error) {
    console.error("Error getting products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get all products (admin endpoint - requires auth)
app.get("/api/admin/products", requireAuth, async (req, res) => {
  try {
    const products = await loadProducts();
    if (!products) {
      return res.status(500).json({ error: "Failed to load products" });
    }
    res.json(products);
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

    const products = await loadProducts();
    if (!products) {
      return res.status(500).json({ error: "Failed to load products" });
    }

    if (type === "alati") {
      // Handle alati products
      if (categoryIndex === undefined) {
        return res
          .status(400)
          .json({ error: "Missing category index for alati" });
      }

      if (!products.alati[categoryIndex]) {
        return res.status(400).json({ error: "Invalid category index" });
      }

      products.alati[categoryIndex].artikli.push(product);
    } else if (type === "premazi") {
      // Handle premazi products
      if (!material || !subcategory) {
        return res
          .status(400)
          .json({ error: "Missing material or subcategory for premazi" });
      }

      if (
        !products.premazi[material] ||
        !products.premazi[material].kategorije[subcategory]
      ) {
        return res
          .status(400)
          .json({ error: "Invalid material or subcategory" });
      }

      products.premazi[material].kategorije[subcategory].proizvodi.push(
        product
      );
    } else {
      return res.status(400).json({ error: "Invalid product type" });
    }

    // Save updated data
    const saved = await saveProducts(products);
    if (!saved) {
      return res.status(500).json({ error: "Failed to save products" });
    }

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

    const products = await loadProducts();
    if (!products) {
      return res.status(500).json({ error: "Failed to load products" });
    }

    const removed = removeProductById(products, type, productId);
    if (!removed) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Save updated data
    const saved = await saveProducts(products);
    if (!saved) {
      return res.status(500).json({ error: "Failed to save products" });
    }

    res.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Add category for alati
app.post("/api/categories/alati", requireAuth, async (req, res) => {
  try {
    const { categoryName } = req.body;
    if (!categoryName) {
      return res.status(400).json({ error: "Category name is required" });
    }

    const products = await loadProducts();
    if (!products) {
      return res.status(500).json({ error: "Failed to load products" });
    }

    // Check if category already exists
    const exists = products.alati.some(
      (cat) => cat.kategorija.toLowerCase() === categoryName.toLowerCase()
    );
    if (exists) {
      return res.status(400).json({ error: "Category already exists" });
    }

    // Add new category
    products.alati.push({
      kategorija: categoryName,
      artikli: [],
    });

    const saved = await saveProducts(products);
    if (!saved) {
      return res.status(500).json({ error: "Failed to save products" });
    }

    res.json({
      success: true,
      message: "Category added successfully",
      category: {
        index: products.alati.length - 1,
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

    const products = await loadProducts();
    if (!products) {
      return res.status(500).json({ error: "Failed to load products" });
    }

    // Check if material already exists
    if (products.premazi[materialKey]) {
      return res.status(400).json({ error: "Material already exists" });
    }

    // Add new material
    products.premazi[materialKey] = {
      kategorije: {},
    };

    const saved = await saveProducts(products);
    if (!saved) {
      return res.status(500).json({ error: "Failed to save products" });
    }

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

      const products = await loadProducts();
      if (!products) {
        return res.status(500).json({ error: "Failed to load products" });
      }

      if (!products.premazi[materialKey]) {
        return res.status(400).json({ error: "Material does not exist" });
      }

      // Check if subcategory already exists
      if (products.premazi[materialKey].kategorije[subcategoryKey]) {
        return res.status(400).json({ error: "Subcategory already exists" });
      }

      // Add new subcategory
      products.premazi[materialKey].kategorije[subcategoryKey] = {
        naziv: subcategoryName,
        proizvodi: [],
      };

      const saved = await saveProducts(products);
      if (!saved) {
        return res.status(500).json({ error: "Failed to save products" });
      }

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

// Health check endpoint (must be before catch-all route)
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    port: PORT,
    nodeEnv: process.env.NODE_ENV || "development",
  });
});

// Serve static files from dist folder (frontend)
// IMPORTANT: This must come AFTER API routes but BEFORE catch-all route
const distPath = path.join(__dirname, "../dist");
const indexPath = path.join(__dirname, "../dist/index.html");

// Serve static assets (CSS, JS, images, etc.)
if (fsSync.existsSync(distPath)) {
  app.use(
    express.static(distPath, {
      maxAge: "1y", // Cache static assets
      etag: true,
    })
  );
}

// Catch-all handler: send back Vue app's index.html file for SPA routing
// This must be LAST, after all API routes
app.get("*", (req, res, next) => {
  // Don't serve index.html for API routes
  if (req.path.startsWith("/api")) {
    return res.status(404).json({ error: "API route not found" });
  }

  // Don't serve index.html for static assets
  if (
    req.path.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$/)
  ) {
    return res.status(404).send("File not found");
  }

  // Serve index.html for all other routes (SPA routing)
  if (fsSync.existsSync(indexPath)) {
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
      `Products file: ${path.join(__dirname, "gradjevinski_alat.json")}`
    );
    console.log(`Dist folder: ${distPath}`);
    console.log(`Dist exists: ${fsSync.existsSync(distPath)}`);
    console.log(`Index.html exists: ${fsSync.existsSync(indexPath)}`);
  });
}

// Clean up old sessions every hour
setInterval(() => {
  const now = Date.now();
  for (const [sessionId, session] of sessions.entries()) {
    if (now - session.createdAt > 24 * 60 * 60 * 1000) {
      // 24 hours
      sessions.delete(sessionId);
    }
  }
}, 60 * 60 * 1000); // Every hour

import { defineStore } from "pinia";
import { ref, computed } from "vue";
import api from "../services/api";

export const useProductsStore = defineStore("products", () => {
  const products = ref(null);
  const loading = ref(false);
  const error = ref(null);

  // Generate unique ID
  function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  // Load products from server (public)
  async function loadProducts() {
    loading.value = true;
    error.value = null;
    try {
      const response = await api.get("/products");
      products.value = response.data;
    } catch (err) {
      error.value = "Failed to load products";
      console.error("Error loading products:", err);
    } finally {
      loading.value = false;
    }
  }

  // Load products for admin (requires auth)
  async function loadAdminProducts() {
    loading.value = true;
    error.value = null;
    try {
      const response = await api.get("/admin/products");
      products.value = response.data;
    } catch (err) {
      error.value = "Failed to load products";
      console.error("Error loading products:", err);
    } finally {
      loading.value = false;
    }
  }

  // Add new product
  async function addProduct(productData) {
    try {
      const response = await api.post("/products", productData);

      // Update local state instead of reloading
      if (products.value && response.data.product) {
        if (productData.type === "alati") {
          const category = products.value.alati[productData.categoryIndex];
          if (category) {
            category.artikli.push(response.data.product);
          }
        } else if (productData.type === "premazi") {
          const materialData = products.value.premazi[productData.material];
          if (
            materialData &&
            materialData.kategorije[productData.subcategory]
          ) {
            materialData.kategorije[productData.subcategory].proizvodi.push(
              response.data.product
            );
          }
        }
      }

      return { success: true, data: response.data };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.error || "Failed to add product",
      };
    }
  }

  // Delete product
  async function deleteProduct(type, productId) {
    try {
      await api.delete(`/products/${type}/${productId}`);

      // Update local state instead of reloading
      if (products.value) {
        if (type === "alati") {
          for (
            let categoryIndex = 0;
            categoryIndex < products.value.alati.length;
            categoryIndex++
          ) {
            const category = products.value.alati[categoryIndex];
            const productIndex = category.artikli.findIndex(
              (product) => product.id === productId
            );
            if (productIndex !== -1) {
              category.artikli.splice(productIndex, 1);
              break;
            }
          }
        } else if (type === "premazi") {
          for (const [material, materialData] of Object.entries(
            products.value.premazi
          )) {
            for (const [categoryKey, categoryData] of Object.entries(
              materialData.kategorije
            )) {
              const productIndex = categoryData.proizvodi.findIndex(
                (product) => product.id === productId
              );
              if (productIndex !== -1) {
                categoryData.proizvodi.splice(productIndex, 1);
                return { success: true };
              }
            }
          }
        }
      }

      return { success: true };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.error || "Failed to delete product",
      };
    }
  }

  // Get categories for alati
  const alatiCategories = computed(() => {
    if (!products.value?.alati) return [];
    return products.value.alati.map((cat, index) => ({
      index,
      name: cat.kategorija,
    }));
  });

  // Get premazi categories
  const premaziCategories = computed(() => {
    if (!products.value?.premazi) return [];
    return Object.entries(products.value.premazi).map(([key, data]) => ({
      key,
      name: key.charAt(0).toUpperCase() + key.slice(1),
    }));
  });

  // Get subcategories for premazi
  const getPremaziSubcategories = (material) => {
    if (!products.value?.premazi?.[material]) return [];
    return Object.entries(products.value.premazi[material].kategorije).map(
      ([key, data]) => ({
        key,
        name: data.naziv,
      })
    );
  };

  // Add category for alati
  async function addAlatiCategory(categoryName) {
    try {
      const response = await api.post("/categories/alati", {
        categoryName,
      });
      await loadAdminProducts(); // Reload to get updated categories
      return { success: true, data: response.data };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.error || "Failed to add category",
      };
    }
  }

  // Add material category for premazi
  async function addPremaziMaterial(materialName, materialKey) {
    try {
      const response = await api.post("/categories/premazi/material", {
        materialName,
        materialKey,
      });
      await loadAdminProducts(); // Reload to get updated categories
      return { success: true, data: response.data };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.error || "Failed to add material category",
      };
    }
  }

  // Add subcategory for premazi
  async function addPremaziSubcategory(
    materialKey,
    subcategoryName,
    subcategoryKey
  ) {
    try {
      const response = await api.post("/categories/premazi/subcategory", {
        materialKey,
        subcategoryName,
        subcategoryKey,
      });
      await loadAdminProducts(); // Reload to get updated categories
      return { success: true, data: response.data };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.error || "Failed to add subcategory",
      };
    }
  }

  return {
    products,
    loading,
    error,
    generateId,
    loadProducts,
    loadAdminProducts,
    addProduct,
    deleteProduct,
    addAlatiCategory,
    addPremaziMaterial,
    addPremaziSubcategory,
    alatiCategories,
    premaziCategories,
    getPremaziSubcategories,
  };
});

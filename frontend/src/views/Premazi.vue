<template>
  <div class="min-h-screen bg-white pt-20">
    <div class="container mx-auto px-6 py-12">
      <div class="text-center mb-12">
        <h1 class="text-4xl md:text-5xl font-bold mb-4 text-black">
          Premazi
        </h1>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Premium premazi za metal i drvo sa izuzetnom trajnošću
        </p>
      </div>

      <div v-if="loading" class="text-center text-black">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
        <p class="mt-4">Učitavanje proizvoda...</p>
      </div>

      <div v-else-if="error" class="text-center text-red-600">
        {{ error }}
      </div>

      <div v-else class="space-y-12">
        <template v-for="(material, materialKey) in filteredMaterials" :key="materialKey">
          <div class="kategorija">
            <h2 class="text-3xl font-bold mb-8 text-black">
              Premazi za {{ materialKey.charAt(0).toUpperCase() + materialKey.slice(1) }}
            </h2>
            <p class="text-gray-600 mb-8">{{ material.opis }}</p>

            <template v-if="filteredSubcategories(materialKey)">
              <div
                v-for="(category, categoryKey) in filteredSubcategories(materialKey)"
                :key="categoryKey"
                class="mb-8"
              >
                <h3 class="text-2xl font-semibold mb-6 text-gray-800">
                  {{ category.naziv }}
                </h3>
                <p class="text-gray-600 mb-6">{{ category.opis }}</p>
                <div class="artikli">
                  <div
                    v-for="product in category.proizvodi"
                    :key="product.id"
                    class="proizvod card-hover"
                  >
                    <div class="aspect-square mb-4 overflow-hidden rounded-lg bg-gray-100">
                      <img
                        :src="product.slika"
                        :alt="product.naziv"
                        class="w-full h-full object-cover"
                        @error="handleImageError"
                      />
                    </div>
                    <h4 class="text-lg font-semibold mb-2 text-black">
                      {{ product.naziv }}
                    </h4>
                    <div class="space-y-2 text-sm text-gray-600">
                      <p><strong class="text-black">Tip:</strong> {{ product.tip }}</p>
                      <p><strong class="text-black">Boja:</strong> {{ product.boja }}</p>
                      <p v-if="product.temperatura">
                        <strong class="text-black">Temperatura:</strong> {{ product.temperatura }}
                      </p>
                      <div v-if="product.svojstva && product.svojstva.length">
                        <p><strong class="text-black">Svojstva:</strong></p>
                        <ul class="list-disc list-inside ml-2">
                          <li v-for="svojstvo in product.svojstva" :key="svojstvo">
                            {{ svojstvo }}
                          </li>
                        </ul>
                      </div>
                      <div v-if="product.primenjuje_se && product.primenjuje_se.length">
                        <p><strong class="text-black">Primenjuje se:</strong></p>
                        <ul class="list-disc list-inside ml-2">
                          <li v-for="primenjuje in product.primenjuje_se" :key="primenjuje">
                            {{ primenjuje }}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
            <template v-else>
              <div
                v-for="(category, categoryKey) in material.kategorije"
                :key="categoryKey"
                class="mb-8"
              >
                <h3 class="text-2xl font-semibold mb-6 text-gray-800">
                  {{ category.naziv }}
                </h3>
                <p class="text-gray-600 mb-6">{{ category.opis }}</p>
                <div class="artikli">
                  <div
                    v-for="product in category.proizvodi"
                    :key="product.id"
                    class="proizvod card-hover"
                  >
                    <div class="aspect-square mb-4 overflow-hidden rounded-lg bg-gray-100">
                      <img
                        :src="product.slika"
                        :alt="product.naziv"
                        class="w-full h-full object-cover"
                        @error="handleImageError"
                      />
                    </div>
                    <h4 class="text-lg font-semibold mb-2 text-black">
                      {{ product.naziv }}
                    </h4>
                    <div class="space-y-2 text-sm text-gray-600">
                      <p><strong class="text-black">Tip:</strong> {{ product.tip }}</p>
                      <p><strong class="text-black">Boja:</strong> {{ product.boja }}</p>
                      <p v-if="product.temperatura">
                        <strong class="text-black">Temperatura:</strong> {{ product.temperatura }}
                      </p>
                      <div v-if="product.svojstva && product.svojstva.length">
                        <p><strong class="text-black">Svojstva:</strong></p>
                        <ul class="list-disc list-inside ml-2">
                          <li v-for="svojstvo in product.svojstva" :key="svojstvo">
                            {{ svojstvo }}
                          </li>
                        </ul>
                      </div>
                      <div v-if="product.primenjuje_se && product.primenjuje_se.length">
                        <p><strong class="text-black">Primenjuje se:</strong></p>
                        <ul class="list-disc list-inside ml-2">
                          <li v-for="primenjuje in product.primenjuje_se" :key="primenjuje">
                            {{ primenjuje }}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useProductsStore } from "../stores/products";
import { useRoute } from "vue-router";
import { useSEO } from "../composables/useSEO";

const productsStore = useProductsStore();
const loading = ref(false);
const error = ref(null);
const route = useRoute();

const products = computed(() => productsStore.products);

const selectedMaterial = computed(() => route.query.material);
const selectedSubcategory = computed(() => route.query.subcategory);

const filteredMaterials = computed(() => {
  if (!selectedMaterial.value || !products.value?.premazi)
    return products.value?.premazi || {};
  return {
    [selectedMaterial.value]: products.value.premazi[selectedMaterial.value],
  };
});

const filteredSubcategories = (material) => {
  if (!selectedSubcategory.value) return null;
  const mat = products.value?.premazi?.[material];
  if (!mat) return null;
  return {
    [selectedSubcategory.value]: mat.kategorije[selectedSubcategory.value],
  };
};

async function loadProducts() {
  loading.value = true;
  error.value = null;

  try {
    await productsStore.loadProducts();
  } catch (err) {
    error.value = "Greška pri učitavanju proizvoda";
  } finally {
    loading.value = false;
  }
}

function handleImageError(event) {
  event.target.src = "/img/placeholder.jpg";
}

onMounted(loadProducts);

// SEO Meta Tags
watch([selectedMaterial, selectedSubcategory], () => {
  const materialName = selectedMaterial.value ? 
    ` za ${selectedMaterial.value.charAt(0).toUpperCase() + selectedMaterial.value.slice(1)}` : '';
  const subcategoryName = selectedSubcategory.value ? 
    ` - ${selectedSubcategory.value.charAt(0).toUpperCase() + selectedSubcategory.value.slice(1)}` : '';
  
  useSEO({
    title: `Premazi${materialName}${subcategoryName} - Delta Tools | Premium premazi za metal i drvo`,
    description: `Premium premazi za metal i drvo sa izuzetnom trajnošću. Profesionalni premazi za zaštitu i dekoraciju u Bosni i Hercegovini.`,
    keywords: `premazi za metal, premazi za drvo, zaštitni premazi, dekorativni premazi, profesionalni premazi, Banja Luka, Bosna i Hercegovina, Delta Tools${materialName ? `, premazi${materialName}` : ''}`,
    url: `/premazi${selectedMaterial.value ? `?material=${selectedMaterial.value}` : ''}${selectedSubcategory.value ? `&subcategory=${selectedSubcategory.value}` : ''}`,
    image: '/img/LOGO_DETA_TOOLS-removebg-preview.png'
  });
}, { immediate: true });
</script>

<style scoped>
.kategorija {
  padding: 20px;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  margin-bottom: 30px;
  border-radius: 16px;
  transition: all 0.3s ease;
}

.kategorija h2 {
  border-left: 6px solid #000000;
  padding-left: 10px;
  color: #000000;
  font-size: 24px;
  margin-bottom: 20px;
}

.artikli {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.proizvod {
  background: #ffffff;
  border: 1px solid #333333;
  border-radius: 12px;
  padding: 20px;
  transition: all 0.3s ease;
}

.proizvod:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.proizvod img {
  width: 100%;
  height: 200px;
  object-fit: contain;
  border-radius: 8px;
  margin-bottom: 15px;
}

.proizvod h3,
.proizvod h4 {
  margin: 10px 0;
  font-size: 18px;
  color: #000000;
}

.proizvod p {
  margin: 8px 0;
  font-size: 14px;
  color: #6b7280;
}

.card-hover {
  transition: all 0.3s ease;
}

.card-hover:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

@media (max-width: 768px) {
  .artikli {
    grid-template-columns: 1fr;
  }

  .proizvod {
    margin-bottom: 1rem;
  }

  .kategorija {
    padding: 15px;
  }

  .kategorija h2 {
    font-size: 20px;
  }
}

@media (max-width: 480px) {
  .proizvod {
    padding: 15px;
  }

  .proizvod h3,
  .proizvod h4 {
    font-size: 16px;
  }

  .proizvod p {
    font-size: 13px;
  }
}
</style>
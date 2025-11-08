<template>
  <div class="min-h-screen section-bg pt-20">
    <div class="container mx-auto px-6 py-12">
      <div class="text-center mb-12">
        <h1 class="text-4xl md:text-5xl font-bold mb-4 gradient-text">
          Građevinski alati
        </h1>
        <p class="text-xl text-muted max-w-2xl mx-auto">
          Profesionalni alati za farbanje, dekorativne i građevinske radove
        </p>
      </div>

      <div v-if="loading" class="text-center text-primary">
        <div
          class="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto"
        ></div>
        <p class="mt-4">Učitavanje proizvoda...</p>
      </div>

      <div v-else-if="error" class="text-center text-red-500 p-8">
        <p class="text-xl font-bold mb-4">{{ error }}</p>
        <p class="text-sm text-muted mb-4">
          Proverite da li je backend server pokrenut i da li API endpoint radi.
        </p>
        <p class="text-xs text-muted">
          Pokušajte otvoriti: <code>/api/products</code> u browseru da proverite
          da li API radi.
        </p>
      </div>

      <div v-else class="space-y-12">
        <div
          v-for="category in filteredCategories"
          :key="category.kategorija"
          class="kategorija"
        >
          <h2 class="text-3xl font-bold mb-8 text-yellow-400">
            {{ category.kategorija }}
          </h2>

          <div class="artikli">
            <div
              v-for="product in category.artikli"
              :key="product.id"
              class="proizvod card-hover"
            >
              <div
                class="image-wrapper mb-4 overflow-hidden rounded-lg bg-gray-200"
              >
                <img
                  :src="product.slika"
                  :alt="product.naziv"
                  class="w-full h-full object-contain"
                  @error="handleImageError"
                />
              </div>

              <h3 class="text-lg font-semibold mb-2 text-primary">
                {{ product.naziv }}
              </h3>

              <div class="space-y-2 text-sm text-secondary">
                <p><strong>Dimenzije:</strong> {{ product.dimenzije }}</p>
                <p><strong>Šifra:</strong> {{ product.sifra_artikla }}</p>
                <p>
                  <strong>Količina:</strong> {{ product.kolicina_u_pakovanju }}
                  {{ product.jedinica_mere }}
                </p>
                <p>
                  <strong>Transportno pakovanje:</strong>
                  {{ product.transportno_pakovanje }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useProductsStore } from "../stores/products";
import { useRoute } from "vue-router";

const productsStore = useProductsStore();
const loading = ref(false);
const error = ref(null);
const route = useRoute();

const products = computed(() => productsStore.products);

const selectedCategory = computed(() => {
  const catIndex = route.query.category;
  if (!catIndex || !products.value?.alati) return null;
  return products.value.alati[catIndex];
});

const filteredCategories = computed(() => {
  if (selectedCategory.value) {
    return [selectedCategory.value];
  }
  return products.value?.alati || [];
});

async function loadProducts() {
  loading.value = true;
  error.value = null;

  try {
    await productsStore.loadProducts();
    // Check if products were loaded
    if (!productsStore.products) {
      error.value =
        "Proizvodi nisu učitani. Proverite da li API endpoint radi.";
    }
  } catch (err) {
    console.error("Error loading products:", err);
    error.value = `Greška pri učitavanju proizvoda: ${
      err.message || "Nepoznata greška"
    }`;
    if (err.response) {
      error.value += ` (Status: ${err.response.status})`;
    } else if (err.request) {
      error.value +=
        " - Server nije dostupan. Proverite da li je backend pokrenut.";
    }
  } finally {
    loading.value = false;
  }
}

function handleImageError(event) {
  event.target.src = "/img/placeholder.jpg";
}

onMounted(loadProducts);
</script>

<style scoped>
.gradient-text {
  background: linear-gradient(135deg, #fbbf24 0%, #ffa500 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.text-muted {
  color: var(--text-muted);
}

.section-bg {
  background: var(--bg-secondary);
  transition: background-color 0.3s ease;
  min-height: 100vh;
}

.text-primary {
  color: var(--text-primary);
}

.text-secondary {
  color: var(--text-secondary);
}

.kategorija {
  padding: 20px;
  background: var(--glass-bg);
  backdrop-filter: blur(10px);
  border: 1px solid var(--glass-border);
  margin-bottom: 30px;
  border-radius: 16px;
  transition: all 0.3s ease;
}

.kategorija h2 {
  border-left: 6px solid var(--accent-color);
  padding-left: 10px;
  color: var(--text-primary);
  font-size: 24px;
  margin-bottom: 20px;
}

.artikli {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.proizvod {
  background: var(--glass-bg);
  backdrop-filter: blur(10px);
  border: 1px solid var(--glass-border);
  border-radius: 12px;
  padding: 20px;
  transition: all 0.3s ease;
}

.proizvod:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.proizvod img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Ensures the image fills the container */
  border-radius: 8px;
}

.image-wrapper {
  height: 250px; /* Keeps the container height consistent */
}

.proizvod h3 {
  margin: 10px 0;
  font-size: 18px;
  color: var(--text-primary);
}

.proizvod p {
  margin: 8px 0;
  font-size: 14px;
  color: var(--text-secondary);
}

.proizvod strong {
  color: var(--accent-color);
}

.card-hover {
  transition: all 0.3s ease;
}

.card-hover:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
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

  .proizvod h3 {
    font-size: 16px;
  }

  .proizvod p {
    font-size: 13px;
  }
}
</style>

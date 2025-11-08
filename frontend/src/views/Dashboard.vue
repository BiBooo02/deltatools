<template>
  <div class="min-h-screen bg-gray-900">
    <!-- Header -->
    <header class="bg-gray-800 p-4 shadow-lg">
      <div class="container mx-auto flex justify-between items-center">
        <h1 class="text-2xl font-bold text-white">Delta Tools Admin Panel</h1>
        <button
          @click="handleLogout"
          class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          Odjavi se
        </button>
      </div>
    </header>

    <div class="container mx-auto p-6">
      <!-- Category Management Section -->
      <div class="bg-gray-800 rounded-xl p-6 mb-8">
        <h2 class="text-xl font-bold mb-4 text-white">
          Upravljanje kategorijama
        </h2>

        <div class="grid md:grid-cols-3 gap-6">
          <!-- Add Alati Category -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-yellow-400">
              Dodaj kategoriju alata
            </h3>
            <form @submit.prevent="handleAddAlatiCategory" class="space-y-3">
              <input
                v-model="newAlatiCategory.name"
                type="text"
                placeholder="Naziv kategorije"
                class="w-full px-4 py-2 rounded-lg bg-gray-100 text-gray-900"
                required
              />
              <button
                type="submit"
                :disabled="addingCategory"
                class="w-full py-2 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400 transition disabled:opacity-50"
              >
                {{ addingCategory ? "Dodavanje..." : "Dodaj kategoriju" }}
              </button>
            </form>
            <div
              v-if="categoryMessage"
              class="text-sm"
              :class="
                categoryMessage.type === 'success'
                  ? 'text-green-400'
                  : 'text-red-400'
              "
            >
              {{ categoryMessage.text }}
            </div>
          </div>

          <!-- Add Premazi Material -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-yellow-400">
              Dodaj materijal premaza
            </h3>
            <form @submit.prevent="handleAddPremaziMaterial" class="space-y-3">
              <input
                v-model="newPremaziMaterial.name"
                type="text"
                placeholder="Naziv materijala"
                class="w-full px-4 py-2 rounded-lg bg-gray-100 text-gray-900"
                required
              />
              <input
                v-model="newPremaziMaterial.key"
                type="text"
                placeholder="Ključ (npr. metal, drvo)"
                class="w-full px-4 py-2 rounded-lg bg-gray-100 text-gray-900"
                required
              />
              <button
                type="submit"
                :disabled="addingCategory"
                class="w-full py-2 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400 transition disabled:opacity-50"
              >
                {{ addingCategory ? "Dodavanje..." : "Dodaj materijal" }}
              </button>
            </form>
            <div
              v-if="categoryMessage"
              class="text-sm"
              :class="
                categoryMessage.type === 'success'
                  ? 'text-green-400'
                  : 'text-red-400'
              "
            >
              {{ categoryMessage.text }}
            </div>
          </div>

          <!-- Add Premazi Subcategory -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-yellow-400">
              Dodaj potkategoriju premaza
            </h3>
            <form
              @submit.prevent="handleAddPremaziSubcategory"
              class="space-y-3"
            >
              <select
                v-model="newPremaziSubcategory.materialKey"
                class="w-full px-4 py-2 rounded-lg bg-gray-100 text-gray-900"
                required
              >
                <option value="">Izaberite materijal</option>
                <option
                  v-for="material in productsStore.premaziCategories"
                  :key="material.key"
                  :value="material.key"
                >
                  {{ material.name }}
                </option>
              </select>
              <input
                v-model="newPremaziSubcategory.name"
                type="text"
                placeholder="Naziv potkategorije"
                class="w-full px-4 py-2 rounded-lg bg-gray-100 text-gray-900"
                required
              />
              <input
                v-model="newPremaziSubcategory.key"
                type="text"
                placeholder="Ključ potkategorije"
                class="w-full px-4 py-2 rounded-lg bg-gray-100 text-gray-900"
                required
              />
              <button
                type="submit"
                :disabled="addingCategory"
                class="w-full py-2 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400 transition disabled:opacity-50"
              >
                {{ addingCategory ? "Dodavanje..." : "Dodaj potkategoriju" }}
              </button>
            </form>
            <div
              v-if="categoryMessage"
              class="text-sm"
              :class="
                categoryMessage.type === 'success'
                  ? 'text-green-400'
                  : 'text-red-400'
              "
            >
              {{ categoryMessage.text }}
            </div>
          </div>
        </div>
      </div>

      <!-- Add Product Section -->
      <div class="bg-gray-800 rounded-xl p-6 mb-8">
        <h2 class="text-xl font-bold mb-4 text-white">Dodaj novi proizvod</h2>

        <form @submit.prevent="handleAddProduct" class="space-y-4">
          <!-- Product Type Selection -->
          <div>
            <label for="product-type" class="block mb-1 text-white"
              >Tip proizvoda</label
            >
            <select
              id="product-type"
              v-model="form.productType"
              class="w-full px-4 py-2 rounded-lg bg-gray-100 text-gray-900"
              required
            >
              <option value="">Izaberite tip proizvoda</option>
              <option value="alati">Alati</option>
              <option value="premazi">Premazi</option>
            </select>
          </div>

          <!-- Alati Category Selection -->
          <div v-if="form.productType === 'alati'" class="space-y-4">
            <div>
              <label for="alati-category" class="block mb-1 text-white"
                >Kategorija alata</label
              >
              <select
                id="alati-category"
                v-model="form.alatiCategory"
                class="w-full px-4 py-2 rounded-lg bg-gray-100 text-gray-900"
                required
              >
                <option value="">Izaberite kategoriju</option>
                <option
                  v-for="category in productsStore.alatiCategories"
                  :key="category.index"
                  :value="category.index"
                >
                  {{ category.name }}
                </option>
              </select>
            </div>

            <!-- Alati Form Fields -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label for="naziv" class="block mb-1 text-white">Naziv</label>
                <input
                  id="naziv"
                  v-model="form.alati.naziv"
                  type="text"
                  class="w-full px-4 py-2 rounded-lg bg-gray-100 text-gray-900"
                  required
                />
              </div>
              <div>
                <label for="dimenzije" class="block mb-1 text-white"
                  >Dimenzije</label
                >
                <input
                  id="dimenzije"
                  v-model="form.alati.dimenzije"
                  type="text"
                  class="w-full px-4 py-2 rounded-lg bg-gray-100 text-gray-900"
                  required
                />
              </div>
              <div>
                <label for="jedinica_mere" class="block mb-1 text-white"
                  >Jedinica mere</label
                >
                <input
                  id="jedinica_mere"
                  v-model="form.alati.jedinica_mere"
                  type="text"
                  class="w-full px-4 py-2 rounded-lg bg-gray-100 text-gray-900"
                  required
                />
              </div>
              <div>
                <label for="kolicina_u_pakovanju" class="block mb-1 text-white"
                  >Količina u pakovanju</label
                >
                <input
                  id="kolicina_u_pakovanju"
                  v-model="form.alati.kolicina_u_pakovanju"
                  type="number"
                  class="w-full px-4 py-2 rounded-lg bg-gray-100 text-gray-900"
                  required
                />
              </div>
              <div>
                <label for="transportno_pakovanje" class="block mb-1 text-white"
                  >Transportno pakovanje</label
                >
                <input
                  id="transportno_pakovanje"
                  v-model="form.alati.transportno_pakovanje"
                  type="number"
                  class="w-full px-4 py-2 rounded-lg bg-gray-100 text-gray-900"
                  required
                />
              </div>
              <div>
                <label for="sifra_artikla" class="block mb-1 text-white"
                  >Šifra artikla</label
                >
                <input
                  id="sifra_artikla"
                  v-model="form.alati.sifra_artikla"
                  type="text"
                  class="w-full px-4 py-2 rounded-lg bg-gray-100 text-gray-900"
                  required
                />
              </div>
              <div class="md:col-span-2">
                <label for="slika" class="block mb-1 text-white"
                  >Slika (putanja ili URL)</label
                >
                <input
                  id="slika"
                  v-model="form.alati.slika"
                  type="text"
                  class="w-full px-4 py-2 rounded-lg bg-gray-100 text-gray-900"
                />
              </div>
            </div>
          </div>

          <!-- Premazi Form -->
          <div v-if="form.productType === 'premazi'" class="space-y-4">
            <div>
              <label for="premazi-category" class="block mb-1 text-white"
                >Tip premaza</label
              >
              <select
                id="premazi-category"
                v-model="form.premaziCategory"
                class="w-full px-4 py-2 rounded-lg bg-gray-100 text-gray-900"
                required
              >
                <option value="">Izaberite tip premaza</option>
                <option
                  v-for="category in productsStore.premaziCategories"
                  :key="category.key"
                  :value="category.key"
                >
                  {{ category.name }}
                </option>
              </select>
            </div>

            <div v-if="form.premaziCategory">
              <label for="premazi-subcategory" class="block mb-1 text-white"
                >Kategorija premaza</label
              >
              <select
                id="premazi-subcategory"
                v-model="form.premaziSubcategory"
                class="w-full px-4 py-2 rounded-lg bg-gray-100 text-gray-900"
                required
              >
                <option value="">Izaberite kategoriju</option>
                <option
                  v-for="subcategory in premaziSubcategories"
                  :key="subcategory.key"
                  :value="subcategory.key"
                >
                  {{ subcategory.name }}
                </option>
              </select>
            </div>

            <!-- Premazi Form Fields -->
            <div
              v-if="form.premaziSubcategory"
              class="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div>
                <label for="premaz-naziv" class="block mb-1 text-white"
                  >Naziv</label
                >
                <input
                  id="premaz-naziv"
                  v-model="form.premazi.naziv"
                  type="text"
                  class="w-full px-4 py-2 rounded-lg bg-gray-100 text-gray-900"
                  required
                />
              </div>
              <div>
                <label for="premaz-tip" class="block mb-1 text-white"
                  >Tip</label
                >
                <input
                  id="premaz-tip"
                  v-model="form.premazi.tip"
                  type="text"
                  class="w-full px-4 py-2 rounded-lg bg-gray-100 text-gray-900"
                  required
                />
              </div>
              <div>
                <label for="premaz-boja" class="block mb-1 text-white"
                  >Boja</label
                >
                <input
                  id="premaz-boja"
                  v-model="form.premazi.boja"
                  type="text"
                  class="w-full px-4 py-2 rounded-lg bg-gray-100 text-gray-900"
                  required
                />
              </div>
              <div>
                <label for="premaz-temperatura" class="block mb-1 text-white"
                  >Temperatura (opciono)</label
                >
                <input
                  id="premaz-temperatura"
                  v-model="form.premazi.temperatura"
                  type="text"
                  class="w-full px-4 py-2 rounded-lg bg-gray-100 text-gray-900"
                  placeholder="npr. do 350°C"
                />
              </div>
              <div class="md:col-span-2">
                <label for="premaz-svojstva" class="block mb-1 text-white"
                  >Svojstva (razdvojite zarezom)</label
                >
                <textarea
                  id="premaz-svojstva"
                  v-model="form.premazi.svojstva"
                  class="w-full px-4 py-2 rounded-lg bg-gray-100 text-gray-900"
                  rows="3"
                  placeholder="npr. Otpornost na koroziju, Dobra pokrivnost, Brzo sušenje"
                ></textarea>
              </div>
              <div class="md:col-span-2">
                <label for="premaz-primenjuje-se" class="block mb-1 text-white"
                  >Primenjuje se (razdvojite zarezom)</label
                >
                <textarea
                  id="premaz-primenjuje-se"
                  v-model="form.premazi.primenjuje_se"
                  class="w-full px-4 py-2 rounded-lg bg-gray-100 text-gray-900"
                  rows="3"
                  placeholder="npr. Metalne konstrukcije, Mašine, Oprema"
                ></textarea>
              </div>
              <div class="md:col-span-2">
                <label for="premaz-slika" class="block mb-1 text-white"
                  >Slika (putanja ili URL)</label
                >
                <input
                  id="premaz-slika"
                  v-model="form.premazi.slika"
                  type="text"
                  class="w-full px-4 py-2 rounded-lg bg-gray-100 text-gray-900"
                />
              </div>
            </div>
          </div>

          <div class="md:col-span-2">
            <button
              type="submit"
              :disabled="productsStore.loading"
              class="w-full py-2 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400 transition disabled:opacity-50"
            >
              {{ productsStore.loading ? "Dodavanje..." : "Dodaj proizvod" }}
            </button>
          </div>
        </form>

        <div v-if="successMessage" class="text-green-500 text-center mt-4">
          {{ successMessage }}
        </div>
      </div>

      <!-- Products List -->
      <div class="bg-gray-800 rounded-xl p-6">
        <h2 class="text-xl font-bold mb-4 text-white">
          Upravljanje proizvodima
        </h2>

        <div v-if="productsStore.loading" class="text-center text-white">
          Učitavanje proizvoda...
        </div>

        <div v-else-if="productsStore.error" class="text-red-500 text-center">
          {{ productsStore.error }}
        </div>

        <div v-else class="space-y-4">
          <!-- Alati Products -->
          <div v-if="productsStore.products?.alati" class="mb-8">
            <h3 class="text-2xl font-bold mb-4 text-yellow-400">Alati</h3>

            <div
              v-for="(category, categoryIndex) in productsStore.products.alati"
              :key="categoryIndex"
              class="bg-gray-700 rounded-lg p-4 mb-4"
            >
              <h4 class="text-lg font-semibold mb-3 text-yellow-400">
                {{ category.kategorija }}
              </h4>

              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div
                  v-for="product in category.artikli"
                  :key="product.id"
                  class="bg-gray-600 rounded-lg p-4"
                >
                  <div class="flex justify-between items-start mb-2">
                    <h5 class="font-medium text-white">{{ product.naziv }}</h5>
                    <button
                      @click="handleDeleteProduct('alati', product.id)"
                      class="text-red-500 hover:text-red-400 text-sm"
                    >
                      Obriši
                    </button>
                  </div>
                  <p class="text-sm text-gray-300">
                    Dimenzije: {{ product.dimenzije }}
                  </p>
                  <p class="text-sm text-gray-300">
                    Šifra: {{ product.sifra_artikla }}
                  </p>
                  <p class="text-sm text-gray-300">
                    Količina: {{ product.kolicina_u_pakovanju }}
                    {{ product.jedinica_mere }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Premazi Products -->
          <div v-if="productsStore.products?.premazi" class="mb-8">
            <h3 class="text-2xl font-bold mb-4 text-yellow-400">Premazi</h3>

            <div
              v-for="(material, materialKey) in productsStore.products.premazi"
              :key="materialKey"
              class="bg-gray-700 rounded-lg p-4 mb-4"
            >
              <h4 class="text-lg font-semibold mb-3 text-yellow-400">
                {{ materialKey.charAt(0).toUpperCase() + materialKey.slice(1) }}
              </h4>

              <div
                v-for="(category, categoryKey) in material.kategorije"
                :key="categoryKey"
                class="mb-4"
              >
                <h5 class="text-md font-semibold mb-2 text-gray-300">
                  {{ category.naziv }}
                </h5>

                <div
                  class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                >
                  <div
                    v-for="product in category.proizvodi"
                    :key="product.id"
                    class="bg-gray-600 rounded-lg p-4"
                  >
                    <div class="flex justify-between items-start mb-2">
                      <h6 class="font-medium text-white">
                        {{ product.naziv }}
                      </h6>
                      <button
                        @click="handleDeleteProduct('premazi', product.id)"
                        class="text-red-500 hover:text-red-400 text-sm"
                      >
                        Obriši
                      </button>
                    </div>
                    <p class="text-sm text-gray-300">Tip: {{ product.tip }}</p>
                    <p class="text-sm text-gray-300">
                      Boja: {{ product.boja }}
                    </p>
                    <p v-if="product.temperatura" class="text-sm text-gray-300">
                      Temperatura: {{ product.temperatura }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";
import { useProductsStore } from "../stores/products";

const router = useRouter();
const authStore = useAuthStore();
const productsStore = useProductsStore();

const form = reactive({
  productType: "",
  alatiCategory: "",
  premaziCategory: "",
  premaziSubcategory: "",
  alati: {
    naziv: "",
    dimenzije: "",
    jedinica_mere: "",
    kolicina_u_pakovanju: "",
    transportno_pakovanje: "",
    sifra_artikla: "",
    slika: "",
  },
  premazi: {
    naziv: "",
    tip: "",
    boja: "",
    temperatura: "",
    svojstva: "",
    primenjuje_se: "",
    slika: "",
  },
});

const successMessage = ref("");
const addingCategory = ref(false);
const categoryMessage = ref(null);

const newAlatiCategory = reactive({
  name: "",
});

const newPremaziMaterial = reactive({
  name: "",
  key: "",
});

const newPremaziSubcategory = reactive({
  materialKey: "",
  name: "",
  key: "",
});

const premaziSubcategories = computed(() => {
  if (!form.premaziCategory) return [];
  return productsStore.getPremaziSubcategories(form.premaziCategory);
});

onMounted(async () => {
  await productsStore.loadAdminProducts();
});

async function handleAddProduct() {
  successMessage.value = "";

  let productData = {};

  if (form.productType === "alati") {
    productData = {
      type: "alati",
      categoryIndex: parseInt(form.alatiCategory),
      product: {
        id: productsStore.generateId(),
        ...form.alati,
        kolicina_u_pakovanju: parseInt(form.alati.kolicina_u_pakovanju),
        transportno_pakovanje: parseInt(form.alati.transportno_pakovanje),
      },
    };
  } else if (form.productType === "premazi") {
    productData = {
      type: "premazi",
      material: form.premaziCategory,
      subcategory: form.premaziSubcategory,
      product: {
        id: productsStore.generateId(),
        naziv: form.premazi.naziv,
        tip: form.premazi.tip,
        boja: form.premazi.boja,
        temperatura: form.premazi.temperatura || undefined,
        svojstva: form.premazi.svojstva.split(",").map((s) => s.trim()),
        primenjuje_se: form.premazi.primenjuje_se
          .split(",")
          .map((s) => s.trim()),
        slika: form.premazi.slika,
      },
    };
  }

  const result = await productsStore.addProduct(productData);

  if (result.success) {
    successMessage.value = "Proizvod uspešno dodat!";
    resetForm();

    setTimeout(() => {
      successMessage.value = "";
    }, 3000);
  } else {
    alert("Greška pri dodavanju proizvoda: " + result.error);
  }
}

async function handleDeleteProduct(type, productId) {
  if (!confirm("Da li ste sigurni da želite da obrišete ovaj proizvod?")) {
    return;
  }

  const result = await productsStore.deleteProduct(type, productId);

  if (result.success) {
    alert("Proizvod je uspešno obrisan!");
  } else {
    alert("Greška pri brisanju proizvoda: " + result.error);
  }
}

function resetForm() {
  form.productType = "";
  form.alatiCategory = "";
  form.premaziCategory = "";
  form.premaziSubcategory = "";

  Object.keys(form.alati).forEach((key) => {
    form.alati[key] = "";
  });

  Object.keys(form.premazi).forEach((key) => {
    form.premazi[key] = "";
  });
}

async function handleAddAlatiCategory() {
  addingCategory.value = true;
  categoryMessage.value = null;

  const result = await productsStore.addAlatiCategory(newAlatiCategory.name);

  if (result.success) {
    categoryMessage.value = {
      type: "success",
      text: "Kategorija uspešno dodata!",
    };
    newAlatiCategory.name = "";
    setTimeout(() => {
      categoryMessage.value = null;
    }, 3000);
  } else {
    categoryMessage.value = {
      type: "error",
      text: result.error || "Greška pri dodavanju kategorije",
    };
  }

  addingCategory.value = false;
}

async function handleAddPremaziMaterial() {
  addingCategory.value = true;
  categoryMessage.value = null;

  const result = await productsStore.addPremaziMaterial(
    newPremaziMaterial.name,
    newPremaziMaterial.key.toLowerCase()
  );

  if (result.success) {
    categoryMessage.value = {
      type: "success",
      text: "Materijal uspešno dodat!",
    };
    newPremaziMaterial.name = "";
    newPremaziMaterial.key = "";
    setTimeout(() => {
      categoryMessage.value = null;
    }, 3000);
  } else {
    categoryMessage.value = {
      type: "error",
      text: result.error || "Greška pri dodavanju materijala",
    };
  }

  addingCategory.value = false;
}

async function handleAddPremaziSubcategory() {
  addingCategory.value = true;
  categoryMessage.value = null;

  const result = await productsStore.addPremaziSubcategory(
    newPremaziSubcategory.materialKey,
    newPremaziSubcategory.name,
    newPremaziSubcategory.key.toLowerCase()
  );

  if (result.success) {
    categoryMessage.value = {
      type: "success",
      text: "Potkategorija uspešno dodata!",
    };
    newPremaziSubcategory.materialKey = "";
    newPremaziSubcategory.name = "";
    newPremaziSubcategory.key = "";
    setTimeout(() => {
      categoryMessage.value = null;
    }, 3000);
  } else {
    categoryMessage.value = {
      type: "error",
      text: result.error || "Greška pri dodavanju potkategorije",
    };
  }

  addingCategory.value = false;
}

async function handleLogout() {
  await authStore.logout();
  router.push("/login");
}
</script>

<template>
  <div id="app">
    <!-- Navigation -->
    <nav
      v-if="route.path !== '/admin/dashboard'"
      class="navbar fixed w-full top-0 z-50 transition-all duration-300"
      :class="{
        'navbar-hero': isHeroSection,
        'navbar-scrolled': !isHeroSection,
      }"
    >
      <div
        class="container mx-auto flex items-center justify-between py-4"
        style="height: 100px; padding-left: 0; padding-right: 1rem;"
      >
      <a href="/" @click.prevent="router.push('/')" class="flex items-center logo-link mr-auto">
          <img
            src="\img\LOGO_DETA_TOOLS-removebg-preview.png"
            alt="Delta Tools Logo"
            class="cursor-pointer object-contain"
            style="height: 100%; max-height: 120px;" 
            @error="handleLogoError"
          />
        </a>
        <ul class="desktop-menu hidden md:flex space-x-8 absolute left-1/2 transform -translate-x-1/2">
          <li class="relative group">
            <a
              href="#"
              class="hover:text-gray-600 transition-colors duration-300 font-medium flex items-center"
              @mouseenter="openDropdown()"
              @mouseleave="closeDropdown()"
            >
              Proizvodi
              <svg
                class="w-4 h-4 ml-1 group-hover:rotate-180 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </a>
            <div
              v-if="isDropdownOpen"
              ref="dropdownWrapper"
              class="dropdown-menu fixed md:absolute left-0 md:left-auto mt-2 rounded-lg shadow-lg opacity-100 visible transition-all duration-300 transform origin-top scale-100 z-50 flex"
              @mouseenter="keepDropdownOpen()"
              @mouseleave="closeDropdown()"
              :style="dropdownMenuStyle"
            >
              <!-- Main categories - Alati -->
              <div class="w-56">
                <div
                  class="font-bold px-4 py-2 cursor-pointer hover:bg-gray-100"
                  @mouseenter="
                    activeSubmenu = 'alati';
                    keepDropdownOpen();
                  "
                  @mouseleave="
                    setTimeout(() => {
                      if (!isDropdownOpen.value) activeSubmenu = null;
                    }, 100)
                  "
                  @click="handleProductFilter('alati')"
                >
                  Građevinski alati
                </div>

                <!-- Dynamic Main Categories -->
                <div
                  v-for="mainCat in dynamicMainCategories"
                  :key="mainCat.key"
                  class="font-bold px-4 py-2 cursor-pointer hover:bg-gray-100"
                  @mouseenter="
                    activeSubmenu = mainCat.key;
                    keepDropdownOpen();
                  "
                  @mouseleave="
                    setTimeout(() => {
                      if (!isDropdownOpen.value) activeSubmenu = null;
                    }, 100)
                  "
                  @click="handleProductFilter(mainCat.key)"
                >
                  {{ mainCat.name }}
                </div>

                <!-- Premazi -->
                <div
                  class="font-bold px-4 py-2 cursor-pointer hover:bg-gray-100"
                  @mouseenter="
                    activeSubmenu = 'premazi';
                    keepDropdownOpen();
                  "
                  @mouseleave="
                    setTimeout(() => {
                      if (!isDropdownOpen.value) activeSubmenu = null;
                    }, 100)
                  "
                  @click="handleProductFilter('premazi')"
                >
                  Premazi
                </div>
              </div>

              <!-- Alati subcategories side menu -->
              <div
                v-if="activeSubmenu === 'alati'"
                class="bg-white rounded-lg shadow-lg z-50 flex"
                @mouseenter="
                  keepDropdownOpen();
                  activeSubmenu = 'alati';
                "
                @mouseleave="
                  setTimeout(() => {
                    if (!isDropdownOpen.value) activeSubmenu = null;
                  }, 100)
                "
              >
                <div
                  v-for="(chunk, chunkIndex) in chunkArray(productsStore.alatiCategories, 10)"
                  :key="chunkIndex"
                  class="w-56"
                >
                  <div
                    v-for="cat in chunk"
                    :key="cat.index"
                  >
                    <a
                      href="#"
                      @click.prevent="handleProductFilter('alati', cat.index)"
                      class="block px-4 py-2 hover:bg-gray-100 transition-colors duration-300"
                    >
                      {{ cat.name }}
                    </a>
                  </div>
                </div>
              </div>

              <!-- Dynamic main categories subcategories -->
              <div
                v-if="activeSubmenu && activeSubmenu !== 'alati' && activeSubmenu !== 'premazi'"
                class="bg-white rounded-lg shadow-lg z-50 flex"
                @mouseenter="
                  keepDropdownOpen();
                "
                @mouseleave="
                  setTimeout(() => {
                    if (!isDropdownOpen.value) activeSubmenu = null;
                  }, 100)
                "
              >
                <div
                  v-for="(chunk, chunkIndex) in chunkArray(productsStore.getCategoriesForMain(activeSubmenu), 10)"
                  :key="chunkIndex"
                  class="w-56"
                >
                  <div
                    v-for="cat in chunk"
                    :key="cat.index"
                  >
                    <a
                      href="#"
                      @click.prevent="handleProductFilter(activeSubmenu, cat.index)"
                      class="block px-4 py-2 hover:bg-gray-100 transition-colors duration-300"
                    >
                      {{ cat.name }}
                    </a>
                  </div>
                </div>
              </div>

              <!-- Premazi main categories and subcategories side menu -->
              <div
                v-if="activeSubmenu === 'premazi'"
                class="flex bg-white rounded-lg shadow-lg z-50"
                @mouseenter="
                  keepDropdownOpen();
                  activeSubmenu = 'premazi';
                "
                @mouseleave="
                  setTimeout(() => {
                    if (!isDropdownOpen.value) activeSubmenu = null;
                  }, 100)
                "
              >
                <div class="w-56">
                  <div
                    v-for="cat in productsStore.premaziCategories"
                    :key="cat.key"
                    class="relative group/premazi"
                  >
                    <a
                      href="#"
                      @mouseenter="
                        showPremaziSubSub = cat.key;
                        keepDropdownOpen();
                      "
                      @mouseleave="
                        setTimeout(() => {
                          if (!isDropdownOpen.value) showPremaziSubSub = null;
                        }, 100)
                      "
                      @click.prevent="handleProductFilter('premazi', cat.key)"
                      class="block px-4 py-2 hover:bg-gray-100 transition-colors duration-300"
                    >
                      {{ cat.name }}
                      <span class="float-right">&rsaquo;</span>
                    </a>
                  </div>
                </div>
                <div
                  v-if="showPremaziSubSub"
                  class="w-56 bg-white rounded-lg shadow-lg z-50"
                  @mouseenter="
                    keepDropdownOpen();
                    showPremaziSubSub = showPremaziSubSub;
                  "
                  @mouseleave="
                    setTimeout(() => {
                      if (!isDropdownOpen.value) showPremaziSubSub = null;
                    }, 100)
                  "
                >
                  <div
                    v-for="sub in premaziSubmenus[showPremaziSubSub]"
                    :key="sub.key"
                  >
                    <a
                      href="#"
                      @click.prevent="
                        handleProductFilter(
                          'premazi',
                          showPremaziSubSub,
                          sub.key
                        )
                      "
                      class="block px-4 py-2 hover:bg-gray-100 transition-colors duration-300"
                    >
                      {{ sub.name }}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li>
            <a
              href="#"
              @click.prevent="handleNavClick('features')"
              class="hover:text-gray-600 transition-colors duration-300 font-medium"
              >Funkcije</a
            >
          </li>
          
          <li>
            <a
              href="#"
              @click.prevent="handleNavClick('about')"
              class="hover:text-gray-600 transition-colors duration-300 font-medium"
              >O nama</a
            >
          </li>
          <li>
            <a
              href="#"
              @click.prevent="handleNavClick('contact')"
              class="hover:text-gray-600 transition-colors duration-300 font-medium"
              >Kontakt</a
            >
          </li>
        </ul>
        <div class="md:hidden flex items-center">
          <div class="hamburger" @click="toggleMobileMenu">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </nav>

    <!-- Mobile Menu -->
    <div
      v-if="route.path !== '/admin/dashboard'"
      class="mobile-menu"
      :class="{ active: mobileMenuOpen }"
    >
      <ul>
        <li>
          <a
            href="#"
            @click.prevent="
              handleNavClick('features');
              closeMobileMenu();
            "
            >Funkcije</a
          >
        </li>
        <li>
          <div>
            <button
              class="w-full text-left px-4 py-2 font-bold"
              @click="
                activeSubmenu = activeSubmenu === 'alati' ? null : 'alati'
              "
            >
              Građevinski alati
            </button>
            <ul v-if="activeSubmenu === 'alati'" class="pl-4">
              <li v-for="cat in productsStore.alatiCategories" :key="cat.index">
                <a
                  href="#"
                  @click.prevent="
                    handleProductFilter('alati', cat.index);
                    closeMobileMenu();
                  "
                  class="block py-2"
                  >{{ cat.name }}</a
                >
              </li>
            </ul>
          </div>
        </li>

        <!-- Dynamic Main Categories Mobile -->
        <li v-for="mainCat in dynamicMainCategories" :key="mainCat.key">
          <div>
            <button
              class="w-full text-left px-4 py-2 font-bold"
              @click="
                activeSubmenu = activeSubmenu === mainCat.key ? null : mainCat.key
              "
            >
              {{ mainCat.name }}
            </button>
            <ul v-if="activeSubmenu === mainCat.key" class="pl-4">
              <li v-for="cat in productsStore.getCategoriesForMain(mainCat.key)" :key="cat.index">
                <a
                  href="#"
                  @click.prevent="
                    handleProductFilter(mainCat.key, cat.index);
                    closeMobileMenu();
                  "
                  class="block py-2"
                  >{{ cat.name }}</a
                >
              </li>
            </ul>
          </div>
        </li>

        <li>
          <div>
            <button
              class="w-full text-left px-4 py-2 font-bold"
              @click="
                activeSubmenu = activeSubmenu === 'premazi' ? null : 'premazi'
              "
            >
              Premazi
            </button>
            <ul v-if="activeSubmenu === 'premazi'" class="pl-4">
              <li v-for="cat in productsStore.premaziCategories" :key="cat.key">
                <button
                  class="w-full text-left py-2"
                  @click="
                    showPremaziSubSub =
                      showPremaziSubSub === cat.key ? null : cat.key
                  "
                >
                  {{ cat.name }}
                </button>
                <ul v-if="showPremaziSubSub === cat.key" class="pl-4">
                  <li v-for="sub in premaziSubmenus[cat.key]" :key="sub.key">
                    <a
                      href="#"
                      @click.prevent="
                        handleProductFilter('premazi', cat.key, sub.key);
                        closeMobileMenu();
                      "
                      class="block py-2"
                      >{{ sub.name }}</a
                    >
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </li>
        <li>
          <a
            href="#"
            @click.prevent="
              handleNavClick('about');
              closeMobileMenu();
            "
            >O nama</a
          >
        </li>
        <li>
          <a
            href="#"
            @click.prevent="
              handleNavClick('contact');
              closeMobileMenu();
            "
            >Kontakt</a
          >
        </li>
      </ul>
    </div>

    <!-- Main Content -->
    <router-view />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useProductsStore } from "./stores/products";

const router = useRouter();
const route = useRoute();
const productsStore = useProductsStore();

const mobileMenuOpen = ref(false);
const isHeroSection = ref(true);
const navbar = ref(null);
let lastScrollY = 0;

// Dropdown state
const isDropdownOpen = ref(false);
const activeSubmenu = ref(null);
const showPremaziSubSub = ref(null);
const dropdownTimeout = ref(null);

const dropdownWrapper = ref(null);

// Computed property za dinamičke glavne kategorije (isključujući alati i premazi)
const dynamicMainCategories = computed(() => {
  return productsStore.mainCategories.filter(cat => cat.key !== 'alati');
});

const premaziSubmenus = computed(() => {
  const result = {};
  for (const cat of productsStore.premaziCategories) {
    result[cat.key] = productsStore.getPremaziSubcategories(cat.key);
  }
  return result;
});

function handleLogoError(event) {
  event.target.src = "/img/placeholder.jpg";
}

function toggleMobileMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value;
}

function closeMobileMenu() {
  mobileMenuOpen.value = false;
}

function handleScroll() {
  const currentScrollY = window.scrollY;
  if (currentScrollY > lastScrollY) {
    navbar.value.style.transform = "translateY(-100%)";
  } else {
    navbar.value.style.transform = "translateY(0)";
  }
  lastScrollY = currentScrollY;

  const heroSection = document.querySelector("header");
  const partnersSection = document.querySelector(
    ".bg-gradient-to-r.from-gray-900.to-black"
  );

  if (heroSection && currentScrollY < heroSection.offsetHeight) {
    isHeroSection.value = true;
  } else if (
    partnersSection &&
    currentScrollY >= partnersSection.offsetTop - 100 &&
    currentScrollY <= partnersSection.offsetTop + partnersSection.offsetHeight
  ) {
    isHeroSection.value = true;
  } else {
    isHeroSection.value = false;
  }
}

function scrollToSection(sectionId) {
  const el = document.getElementById(sectionId);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
}

function handleNavClick(sectionId) {
  if (route.path === "/") {
    scrollToSection(sectionId);
  } else {
    router.push({ path: "/", hash: `#${sectionId}` });
    setTimeout(() => scrollToSection(sectionId), 300);
  }
}

function closeAllDropdowns() {
  isDropdownOpen.value = false;
  activeSubmenu.value = null;
  showPremaziSubSub.value = null;
}

function handleProductFilter(type, categoryKey, subcategoryKey) {
  closeAllDropdowns();
  
  if (type === "alati") {
    if (categoryKey === undefined) {
      router.push({ path: "/products" });
    } else {
      router.push({ path: "/products", query: { category: categoryKey } });
    }
  } else if (type === "premazi") {
    if (categoryKey === undefined) {
      router.push({ path: "/premazi" });
    } else if (subcategoryKey === undefined) {
      router.push({ path: "/premazi", query: { material: categoryKey } });
    } else {
      router.push({
        path: "/premazi",
        query: { material: categoryKey, subcategory: subcategoryKey },
      });
    }
  } else {
    // Handle dynamic main categories
    if (categoryKey === undefined) {
      router.push({ path: "/products", query: { type: type } });
    } else {
      router.push({ path: "/products", query: { type: type, category: categoryKey } });
    }
  }
}

function openDropdown() {
  isDropdownOpen.value = true;
  clearTimeout(dropdownTimeout.value);
}

function closeDropdown() {
  dropdownTimeout.value = setTimeout(() => {
    isDropdownOpen.value = false;
    activeSubmenu.value = null;
    showPremaziSubSub.value = null;
  }, 300);
}

function keepDropdownOpen() {
  clearTimeout(dropdownTimeout.value);
}

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  productsStore.loadProducts();
});

const dropdownMenuStyle = computed(() => {
  if (!dropdownWrapper.value) return {};

  if (window.innerWidth < 900) {
    return {
      left: "0",
      right: "0",
      width: "100vw",
      minWidth: "0",
      maxWidth: "100vw",
      position: "fixed",
    };
  }

  const rect = dropdownWrapper.value.getBoundingClientRect();
  if (rect.right > window.innerWidth - 20) {
    return {
      left: "auto",
      right: "0",
      minWidth: "700px",
    };
  }

  return { minWidth: "700px" };
});

// Function to split array into chunks
function chunkArray(array, size) {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}
</script>

<style>
body {
  font-family: "Inter", sans-serif;
  background-color: #ffffff;
  color: #333;
}

.navbar {
  background: #ffffff;
  border-bottom: 2px solid #333;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.navbar a {
  color: #333;
  transition: all 0.3s ease;
  position: relative;
}

.navbar a:not(.kontakt-btn):not(.logo-link)::after {
  content: "";
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background: #333;
  transition: width 0.3s ease;
}

.navbar a:not(.kontakt-btn):not(.logo-link):hover::after {
  width: 100%;
}

.navbar a:hover {
  color: #333;
}

.kontakt-btn {
  background: #333 !important;
  color: #ffffff !important;
}

.kontakt-btn:hover {
  background: #555 !important;
}

.kontakt-btn::after {
  display: none !important;
}

.logo-link {
  display: flex;
  align-items: center;
  margin-left: 0;
  padding-left: 0;
}

.logo-link::after {
  content: none !important;
}

.logo-link img {
  height: 3.5rem;
  max-height: 3.5rem;
  width: auto;
}

.navbar-hero {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 2px solid #333;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.navbar-hero a {
  color: #333;
  transition: all 0.3s ease;
}

.navbar-hero a:hover {
  color: #333;
}

.navbar-scrolled {
  background: #ffffff;
  border-bottom: 2px solid #333;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.dropdown-menu {
  background: #ffffff;
  border: 2px solid #333;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  animation: dropdownSlide 0.3s ease;
}

@keyframes dropdownSlide {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.dropdown-menu a {
  color: #333;
  border-bottom: 1px solid #e5e7eb;
  transition: all 0.3s ease;
}

.dropdown-menu a:last-child {
  border-bottom: none;
}

.dropdown-menu a:hover {
  background: #f9fafb;
  color: #333;
  padding-left: 20px;
}

.dropdown-menu .font-bold {
  transition: all 0.3s ease;
}

.dropdown-menu .font-bold:hover {
  padding-left: 20px;
  background: #f9fafb;
}

.hamburger {
  display: none;
  flex-direction: column;
  cursor: pointer;
  padding: 5px;
}

.hamburger span {
  width: 25px;
  height: 3px;
  background: #333;
  margin: 3px 0;
  transition: 0.3s;
  border-radius: 2px;
}

.navbar-hero .hamburger span {
  background: #333;
}

.hamburger.active span:nth-child(1) {
  transform: rotate(-45deg) translate(-5px, 6px);
}

.hamburger.active span:nth-child(2) {
  opacity: 0;
}

.hamburger.active span:nth-child(3) {
  transform: rotate(45deg) translate(-5px, -6px);
}

.mobile-menu {
  position: fixed;
  top: 100px;
  left: 0;
  right: 0;
  bottom: 0;
  background: #ffffff;
  z-index: 40;
  transform: translateX(-100%);
  transition: transform 0.3s ease;
  overflow-y: auto;
  max-height: calc(100vh - 100px);
}

.mobile-menu.active {
  transform: translateX(0);
}

.mobile-menu ul {
  list-style: none;
  padding: 20px 0;
  margin: 0;
}

.mobile-menu li {
  border-bottom: 1px solid #e5e7eb;
}

.mobile-menu a,
.mobile-menu button {
  display: block;
  padding: 20px;
  color: #333;
  text-decoration: none;
  font-size: 18px;
  transition: all 0.3s ease;
  background: transparent;
  border: none;
  width: 100%;
  text-align: left;
  cursor: pointer;
}

.mobile-menu a:hover,
.mobile-menu button:hover {
  background: #f9fafb;
  color: #555;
}

@media (max-width: 768px) {
  .hamburger {
    display: flex;
    margin-right: 1rem;
  }

  .desktop-menu {
    display: none;
  }

  .logo-link {
    margin-right: auto;
    margin-left: -1rem;
  }

  .logo-link img {
    max-height: 80px;
  }

  .navbar .container {
    padding-left: 0 !important;
    padding-right: 0.5rem !important;
  }
}
</style>
<template>
  <div id="app">
    <!-- Navigation -->
    <nav
      v-if="route.path !== '/admin/dashboard'"
      class="navbar glass-effect fixed w-full top-0 z-50 transition-all duration-300"
      :class="{
        'navbar-hero': isHeroSection,
        'navbar-dark': !isHeroSection,
      }"
    >
      <div
        class="container mx-auto flex justify-between items-center py-4 px-6"
      >
        <img
          src="/img/deltatoolslogo.png"
          alt="Delta Tools Logo"
          class="w-24 h-auto"
          @error="handleLogoError"
        />
        <ul class="desktop-menu hidden md:flex space-x-8">
          <li>
            <a
              href="#"
              @click.prevent="handleNavClick('features')"
              class="hover:text-yellow-400 transition-colors duration-300 font-medium"
              >Funkcije</a
            >
          </li>
          <li class="relative group">
            <a
              href="#"
              class="hover:text-yellow-400 transition-colors duration-300 font-medium flex items-center"
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
              class="dropdown-menu fixed md:absolute left-0 md:left-auto mt-2 min-w-[700px] rounded-lg shadow-lg opacity-100 visible transition-all duration-300 transform origin-top scale-100 bg-gray-900 z-50 flex"
              @mouseenter="keepDropdownOpen()"
              @mouseleave="closeDropdown()"
              :style="dropdownMenuStyle"
            >
              <!-- Main categories -->
              <div class="w-56">
                <div
                  class="font-bold px-4 py-2 text-yellow-400 cursor-pointer hover:bg-gray-800"
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
                <div
                  class="font-bold px-4 py-2 text-yellow-400 cursor-pointer hover:bg-gray-800"
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
                class="w-56 bg-gray-900 rounded-lg shadow-lg z-50"
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
                  v-for="cat in productsStore.alatiCategories"
                  :key="cat.index"
                >
                  <a
                    href="#"
                    @click.prevent="handleProductFilter('alati', cat.index)"
                    class="block px-4 py-2 hover:bg-gray-800 hover:text-yellow-400 transition-colors duration-300"
                  >
                    {{ cat.name }}
                  </a>
                </div>
              </div>
              <!-- Premazi main categories and subcategories side menu -->
              <div
                v-if="activeSubmenu === 'premazi'"
                class="flex bg-gray-900 rounded-lg shadow-lg z-50"
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
                      class="block px-4 py-2 hover:bg-gray-800 hover:text-yellow-400 transition-colors duration-300"
                    >
                      {{ cat.name }}
                      <span class="float-right">&rsaquo;</span>
                    </a>
                  </div>
                </div>
                <div
                  v-if="showPremaziSubSub"
                  class="w-56 bg-gray-900 rounded-lg shadow-lg z-50"
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
                      class="block px-4 py-2 hover:bg-gray-800 hover:text-yellow-400 transition-colors duration-300"
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
              @click.prevent="handleNavClick('about')"
              class="hover:text-yellow-400 transition-colors duration-300 font-medium"
              >O nama</a
            >
          </li>
          <li>
            <a
              href="#"
              @click.prevent="handleNavClick('contact')"
              class="px-6 py-2 rounded-full transition-colors duration-300 font-medium"
              >Kontakt</a
            >
          </li>
          <li>
            <button
              @click="toggleTheme"
              class="theme-toggle p-2 rounded-full transition-all duration-300"
              title="Promeni temu"
            >
              <svg
                v-if="theme === 'light'"
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                ></path>
              </svg>
              <svg
                v-else
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                ></path>
              </svg>
            </button>
          </li>
        </ul>
        <div class="md:hidden flex items-center space-x-4">
          <button
            @click="toggleTheme"
            class="theme-toggle p-2 rounded-full transition-all duration-300"
            title="Promeni temu"
          >
            <svg
              v-if="theme === 'light'"
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              ></path>
            </svg>
            <svg
              v-else
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              ></path>
            </svg>
          </button>
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
              class="w-full text-left px-4 py-2 font-bold text-yellow-400"
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
        <li>
          <div>
            <button
              class="w-full text-left px-4 py-2 font-bold text-yellow-400"
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
import { ref, onMounted, computed, watch, nextTick } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useProductsStore } from "./stores/products";

const router = useRouter();
const route = useRoute();
const productsStore = useProductsStore();

const theme = ref("dark");
const mobileMenuOpen = ref(false);
const isHeroSection = ref(true);
const navbar = ref(null);
let lastScrollY = 0;

// Dropdown state
const isDropdownOpen = ref(false);
const activeSubmenu = ref(null);
const showPremaziSubSub = ref(null); // for premazi subcategories
const dropdownTimeout = ref(null);

// Add a ref for the dropdown wrapper
const dropdownWrapper = ref(null);

// For premazi subcategories
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

function toggleTheme() {
  theme.value = theme.value === "dark" ? "light" : "dark";
  setTheme(theme.value);
}

function setTheme(newTheme) {
  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
}

function initializeTheme() {
  const saved = localStorage.getItem("theme");
  if (saved) {
    theme.value = saved;
    setTheme(saved);
  } else {
    setTheme(theme.value);
  }
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
  }, 300); // Increased from 150ms to 300ms
}

function keepDropdownOpen() {
  clearTimeout(dropdownTimeout.value);
}

onMounted(() => {
  initializeTheme();
  window.addEventListener("scroll", handleScroll);
  productsStore.loadProducts();
});

watch(
  () => route.hash,
  (newHash) => {
    if (route.path === "/" && newHash) {
      const sectionId = newHash.replace("#", "");
      setTimeout(() => scrollToSection(sectionId), 300);
    }
  },
  { immediate: true }
);

// Add a computed style for the dropdown to keep it in view
const dropdownMenuStyle = computed(() => {
  if (!dropdownWrapper.value) return {};

  // On mobile or small screens, make it full width
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

  // For larger screens, check if it would overflow
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
</script>

<style>
/* Your existing CSS styles here */
:root {
  --bg-primary: #000000;
  --bg-secondary: #111827;
  --bg-tertiary: #1f2937;
  --text-primary: #ffffff;
  --text-secondary: #d1d5db;
  --text-muted: #9ca3af;
  --border-color: #374151;
  --glass-bg: rgba(255, 255, 255, 0.1);
  --glass-border: rgba(255, 255, 255, 0.2);
  --accent-color: #fbbf24;
  --accent-hover: #f59e0b;
  --navbar-text: #ffffff;
  --navbar-text-hover: #fbbf24;
  --button-text: #000000;
  --button-bg: #fbbf24;
  --button-hover: #f59e0b;
}

[data-theme="light"] {
  --bg-primary: #ffffff;
  --bg-secondary: #f9fafb;
  --bg-tertiary: #f3f4f6;
  --text-primary: #111827;
  --text-secondary: #374151;
  --text-muted: #6b7280;
  --border-color: #d1d5db;
  --glass-bg: rgba(0, 0, 0, 0.05);
  --glass-border: rgba(0, 0, 0, 0.1);
  --accent-color: #f59e0b;
  --accent-hover: #d97706;
  --navbar-text: #111827;
  --navbar-text-hover: #f59e0b;
  --button-text: #ffffff;
  --button-bg: #f59e0b;
  --button-hover: #d97706;
}

body {
  font-family: "Inter", sans-serif;
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  transition: background-color 0.3s ease, color 0.3s ease;
}

.glass-effect {
  background: var(--glass-bg);
  backdrop-filter: blur(10px);
  border: 1px solid var(--glass-border);
  transition: all 0.3s ease;
}

.theme-toggle {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  color: var(--text-primary);
  transition: all 0.3s ease;
}

.theme-toggle:hover {
  background: var(--accent-color);
  color: var(--bg-primary);
}

.navbar a {
  color: var(--navbar-text);
  transition: color 0.3s ease;
}

.navbar a:hover {
  color: var(--navbar-text-hover);
}

.navbar-hero {
  background: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.navbar-hero a {
  color: #ffffff;
  transition: color 0.3s ease;
}

.navbar-hero a:hover {
  color: #fbbf24;
}

.navbar-hero .bg-yellow-500 {
  background-color: #fbbf24;
  color: #000000;
}

.navbar-hero .bg-yellow-500:hover {
  background-color: #f59e0b;
}

.navbar-hero .theme-toggle {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #ffffff;
}

.navbar-hero .theme-toggle:hover {
  background: #fbbf24;
  color: #000000;
}

.navbar-hero .hamburger span {
  background: #ffffff;
}

.navbar-hero .hamburger.active span {
  background: #ffffff;
}

.navbar-dark {
  background: var(--glass-bg);
  border-bottom: 1px solid var(--glass-border);
}

.navbar-dark a {
  color: var(--navbar-text);
}

.navbar-dark a:hover {
  color: var(--navbar-text-hover);
}

.dropdown-menu {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.dropdown-menu a {
  color: var(--text-secondary);
  border-bottom: 1px solid var(--border-color);
}

.dropdown-menu a:last-child {
  border-bottom: none;
}

.dropdown-menu a:hover {
  background: var(--glass-bg);
  color: var(--accent-color);
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
  background: var(--text-primary);
  margin: 3px 0;
  transition: 0.3s;
  border-radius: 2px;
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
  top: 50px;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--bg-primary);
  z-index: 40;
  transform: translateX(-100%);
  transition: transform 0.3s ease;
  padding-top: 80px;
}

.mobile-menu.active {
  transform: translateX(0);
}

.mobile-menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.mobile-menu li {
  border-bottom: 1px solid var(--border-color);
}

.mobile-menu a {
  display: block;
  padding: 20px;
  color: var(--text-primary);
  text-decoration: none;
  font-size: 18px;
  transition: all 0.3s ease;
}

.mobile-menu a:hover {
  background: var(--glass-bg);
  color: var(--accent-color);
}

@media (max-width: 768px) {
  .hamburger {
    display: flex;
  }

  .desktop-menu {
    display: none;
  }
}
</style>

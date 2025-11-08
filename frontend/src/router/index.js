import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Products from "../views/Products.vue";
import Premazi from "../views/Premazi.vue";
import Login from "../views/Login.vue";
import Dashboard from "../views/Dashboard.vue";
import PrivacyPolicy from "../views/PrivacyPolicy.vue";
import TermsOfService from "../views/TermsOfService.vue";
import CookiesPolicy from "../views/CookiesPolicy.vue";
import { useAuthStore } from "../stores/auth";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/products",
    name: "Products",
    component: Products,
  },
  {
    path: "/premazi",
    name: "Premazi",
    component: Premazi,
  },
  {
    path: "/privacy-policy",
    name: "PrivacyPolicy",
    component: PrivacyPolicy,
  },
  {
    path: "/terms-of-service",
    name: "TermsOfService",
    component: TermsOfService,
  },
  {
    path: "/cookies-policy",
    name: "CookiesPolicy",
    component: CookiesPolicy,
  },
  {
    path: "/admin/login",
    name: "Login",
    component: Login,
    meta: { requiresGuest: true },
  },
  {
    path: "/admin/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guards
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next("/admin/login");
  } else if (to.meta.requiresGuest && authStore.isAuthenticated) {
    next("/admin/dashboard");
  } else {
    next();
  }
});

export default router;

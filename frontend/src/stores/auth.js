import { defineStore } from "pinia";
import { ref, computed } from "vue";
import api from "../services/api";

export const useAuthStore = defineStore("auth", () => {
  const sessionId = ref(null);
  const user = ref(null);
  const loading = ref(false);

  const isAuthenticated = computed(() => !!sessionId.value);

  async function login(credentials) {
    loading.value = true;
    try {
      const response = await api.post("/login", credentials);
      sessionId.value = response.data.sessionId;
      user.value = { username: credentials.username };
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || "Login failed",
      };
    } finally {
      loading.value = false;
    }
  }

  async function logout() {
    try {
      await api.post("/logout");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      sessionId.value = null;
      user.value = null;
    }
  }

  return {
    sessionId,
    user,
    loading,
    isAuthenticated,
    login,
    logout,
  };
});

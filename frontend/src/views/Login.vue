<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-900">
    <div class="w-full max-w-sm mx-auto p-8 bg-gray-800 rounded-xl shadow-lg">
      <h2 class="text-2xl font-bold mb-6 text-center text-white">
        Admin Login
      </h2>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label for="username" class="block mb-1 text-white"
            >Korisničko ime</label
          >
          <input
            id="username"
            v-model="form.username"
            type="text"
            class="w-full px-4 py-2 rounded-lg bg-gray-100 text-gray-900"
            required
          />
        </div>

        <div>
          <label for="password" class="block mb-1 text-white">Lozinka</label>
          <input
            id="password"
            v-model="form.password"
            type="password"
            class="w-full px-4 py-2 rounded-lg bg-gray-100 text-gray-900"
            required
          />
        </div>

        <button
          type="submit"
          :disabled="authStore.loading"
          class="w-full py-2 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400 transition disabled:opacity-50"
        >
          {{ authStore.loading ? "Prijavljivanje..." : "Prijavi se" }}
        </button>

        <div v-if="error" class="text-red-500 text-center mt-2">
          {{ error }}
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";

const router = useRouter();
const authStore = useAuthStore();

const form = reactive({
  username: "",
  password: "",
});

const error = ref("");

async function handleLogin() {
  error.value = "";

  const result = await authStore.login(form);

  if (result.success) {
    router.push("/admin/dashboard");
  } else {
    error.value = result.error;
  }
}
</script>

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(null)

  const isAuthenticated = computed(() => {
    return !!token.value
  })

  function login(payload: { token: string }) {
    token.value = payload.token
  }

  function logout() {
    token.value = null
  }

  function register(payload: { token: string }) {
    token.value = payload.token
  }

  return {
    token,
    isAuthenticated,
    login,
    logout,
    register,
  }
})

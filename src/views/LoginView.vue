<script setup lang="ts">
import LoginForm from '@/components/LoginForm.vue'
import RegisterForm from '@/components/RegisterForm.vue'
import { useAuthStore } from '@/stores/auth.store'
import { ref } from 'vue'
const showLoginForm = ref(true)

const authStore = useAuthStore()
</script>

<template>
  <div
    v-if="!authStore.isAuthenticated && showLoginForm"
    class="h-screen w-screen flex items-center justify-center bg-gray-100"
  >
    <LoginForm @switch-form="showLoginForm = !showLoginForm" />
  </div>
  <div v-else class="h-screen w-screen flex items-center justify-center bg-gray-100">
    <RegisterForm @switch-form="showLoginForm = !showLoginForm" />
  </div>
</template>

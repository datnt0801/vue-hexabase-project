<script setup lang="ts">
import { ref } from 'vue'
import { authService } from '@/services/authService'
// import { useRouter } from 'vue-router'
// const router = useRouter()
const user_code = ref('')
const password = ref('')
const token = ref('token')
const handleLogin = async () => {
  const res = await authService.userLogin(user_code.value, password.value)
  console.log(res)

  token.value = res.token
  alert('Login successful')
}
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold text-center">User Login</h1>
    <form @submit.prevent="handleLogin" class="flex flex-col gap-2 max-w-sm mx-auto">
      <label for="user_code">User Code:</label>
      <input
        type="text"
        id="user_code"
        v-model="user_code"
        placeholder="User Code"
        class="border border-gray-300 rounded-md p-2"
      />
      <label for="password">Password:</label>
      <input
        type="password"
        id="password"
        v-model="password"
        placeholder="Password"
        class="border border-gray-300 rounded-md p-2"
      />
      <button type="submit" class="bg-blue-500 text-white p-2 rounded-md cursor-pointer">
        Login
      </button>
    </form>
    <div>access_token: {{ token }}</div>
  </div>
</template>

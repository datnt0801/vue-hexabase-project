<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits(['switch-form'])

const email = ref('')
const password = ref('')
const rePassword = ref('')
const isLoading = ref(false)
const error = ref('')

const handleRegister = async () => {
  error.value = ''

  if (!email.value || !password.value) {
    error.value = 'Vui lòng nhập đầy đủ thông tin'
    return
  }

  if (password.value !== rePassword.value) {
    error.value = 'Mật khẩu không khớp'
    return
  }

  if (password.value.length < 6) {
    error.value = 'Mật khẩu phải có ít nhất 6 ký tự'
    return
  }

  try {
    isLoading.value = true

    // fake API
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log('Register data:', {
      email: email.value,
      password: password.value,
    })

    alert('Register thành công 🎉')
  } catch (err) {
    console.error('Login error:', err)
    error.value = 'Login thất bại: ' + (err instanceof Error ? err.message : 'Unknown error')
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <form
    @submit.prevent="handleRegister"
    class="w-full max-w-sm p-6 bg-white rounded-xl shadow-md space-y-5"
  >
    <h2 class="text-2xl font-bold text-center">Đăng ký</h2>

    <!-- Email -->
    <div class="relative">
      <input
        id="email"
        v-model="email"
        type="email"
        placeholder="Email"
        class="peer w-full rounded-lg border border-gray-300 bg-transparent px-3 py-2 text-gray-900 placeholder-transparent focus:border-blue-500 focus:outline-none"
      />
      <label
        for="email"
        class="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500 peer-focus:bg-white"
      >
        Email
      </label>
    </div>

    <!-- Password -->
    <div class="relative">
      <input
        id="password"
        v-model="password"
        type="password"
        placeholder="Password"
        class="peer w-full rounded-lg border border-gray-300 bg-transparent px-3 py-2 text-gray-900 placeholder-transparent focus:border-blue-500 focus:outline-none"
      />
      <label
        for="password"
        class="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500 peer-focus:bg-white"
      >
        Mật khẩu
      </label>
    </div>

    <!-- RePassword -->
    <div class="relative">
      <input
        id="re-password"
        v-model="rePassword"
        type="password"
        placeholder="RePassword"
        class="peer w-full rounded-lg border border-gray-300 bg-transparent px-3 py-2 text-gray-900 placeholder-transparent focus:border-blue-500 focus:outline-none"
      />
      <label
        for="re-password"
        class="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500 peer-focus:bg-white"
      >
        Xác nhận mật khẩu
      </label>
    </div>

    <p v-if="error" class="text-sm text-red-500">{{ error }}</p>

    <button
      type="submit"
      :disabled="isLoading"
      class="w-full rounded-lg bg-blue-600 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
    >
      {{ isLoading ? 'Đang đăng ký...' : 'Đăng ký' }}
    </button>
    <div class="flex justify-between items-center">
      <p>Đã có tài khoản?</p>
      <button type="button" @click="emit('switch-form')" class="text-blue-600 hover:underline">
        Đăng nhập
      </button>
    </div>
  </form>
</template>

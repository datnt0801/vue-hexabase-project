<template>
  <div class="flex flex-col items-center justify-center h-screen gap-4">
    <h1 class="text-2xl font-bold">Confirm Change Email</h1>
    <p>Please enter the email confirmation ID that you received in your email</p>

    <input
      type="text"
      v-model="emailConfirmationID"
      class="border border-gray-300 rounded-md p-2"
      placeholder="Enter email confirmation ID"
    />

    <button @click="handleClickChangeEmail" class="bg-blue-500 text-white rounded-md p-2">
      Confirm Change Email
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { userService } from '@/services/userService'
import router from '@/router'
const emailConfirmationID = ref('')
const handleClickChangeEmail = async () => {
  const res = await userService.confirmUserEmail(
    emailConfirmationID.value,
    localStorage.getItem('user_token') || '',
  )
  if (res.status === 200) {
    alert('email confirmed successfully')
    console.log('email confirmed successfully')
    router.push('/user/dashboard')
  } else {
    console.log('email confirmation failed')
    alert('email confirmation failed')
  }
}
</script>

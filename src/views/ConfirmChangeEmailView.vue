<template>
  <div class="flex flex-col items-center justify-center h-screen gap-4">
    <h1 class="text-2xl font-bold">Confirm Change Email</h1>
    <p>Please enter the email confirmation ID that you received in your email</p>

    <button @click="handleClickChangeEmail" class="bg-blue-500 text-white rounded-md p-2">
      Confirm Change Email
    </button>
  </div>
</template>

<script setup lang="ts">
import { userService } from '@/services/userService'
import router from '@/router'
import { useRoute } from 'vue-router'
const userID = useRoute().params.user_id as string
const emailConfirmationID = useRoute().params.confirmation_id as string

const handleClickChangeEmail = async () => {
  const res = await userService.confirmUserEmail(
    emailConfirmationID,
    localStorage.getItem('user_token') || '',
  )
  console.log('confirm user email response: ', res.data)
  if (res.status === 200) {
    const resRemoveFlag = await userService.removeFlagChangeEmail(userID)
    if (resRemoveFlag.itemHistory.IsChanged) {
      alert('email confirmed successfully')
      console.log('email confirmed successfully')
      router.push('/user/dashboard')
    }
  } else {
    console.log('email confirmation failed')
    alert('email confirmation failed')
  }
}
</script>

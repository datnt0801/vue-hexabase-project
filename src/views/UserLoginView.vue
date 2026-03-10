<script setup lang="ts">
import { ref } from 'vue'
import { authService } from '@/services/authService'
import router from '@/router'
import { userService } from '@/services/userService'
import type { User } from '@/shared/type'
const user_code = ref('')
const password = ref('')
const token = ref('token')

const handleLogin = async () => {
  const res = await authService.userLogin(user_code.value, password.value)
  console.log('user login response: ', res.token)
  token.value = res.token
  await localStorage.setItem('user_token', res.token)
  const userInfo = await getUserInfo()
  console.log('user login info: ', userInfo)

  localStorage.setItem(
    'role',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    userInfo.user_roles.find((role: any) => role.application_id === 'APP-LIHgDFzX')?.role_name ||
      '',
  )

  const users = await userService.getUsers(undefined, userInfo.u_id.toString())
  const usersNotDeleted = users.items.filter((user: User) => user.deleted_at === undefined)
  if (usersNotDeleted.length === 0) {
    alert('account not found, please contact administrator')
    router.push('/user/login')
  }

  const userChangeEmail = usersNotDeleted.find(
    (user: User) => user.required_change_email.toString() === 'true',
  )
  console.log('userChangeEmail: ', userChangeEmail)
  if (userChangeEmail) {
    alert('please change email')
    // tạo request để change email
    const res = await userService.updateUserEmailRequest(userChangeEmail.email, token.value)
    console.log('update user email request response: ', res)
    if (res.error === null) {
      console.log('create request to change email successfully')
      router.push('/user/confirm-change-email')
    }
    console.log('update user email request response: ', res)
  } else {
    router.push('/user/dashboard')
  }
}

const getUserInfo = async () => {
  const res = await userService.getUserInfo(localStorage.getItem('user_token') || '')
  console.log('user token: ', localStorage.getItem('user_token'))
  return res
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

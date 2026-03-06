import type { User } from '@/shared/type'
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  const users = ref<User[]>([])

  return {
    users,
  }
})

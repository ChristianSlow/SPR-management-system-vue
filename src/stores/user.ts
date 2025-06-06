import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User } from '@/types/user'
import { UserRepository } from '@/repositories/userRepository'

export const useUserStore = defineStore('user', () => {
  const users = ref<User[]>()
  const user = ref<User>({})
  const isLoading = ref(false)

  async function getUser(id: string) {
    isLoading.value = true
    const response = await UserRepository.fetchUser(id)
    user.value = response?.data ?? {}
    isLoading.value = false
  }

  return {
    users,
    user,
    isLoading,
    getUser,
  }
})

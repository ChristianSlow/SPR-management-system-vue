import type { User } from '@/types/user'
import { useFetch } from '@vueuse/core'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const API_URL = import.meta.env.VITE_API_URL

export const useUserStore = defineStore('user', () => {
  const isLoading = ref(false)
  const user = ref<User>({
    id: '',
    student: {
      id: '',
      firstName: '',
      middleName: '',
      lastName: '',
    },
  })

  async function getUser(id: string) {
    isLoading.value = true
    const { data, error } = await useFetch(`${API_URL}/users/${id}`).json()
    user.value = data.value.data
    console.log(user.value)
    isLoading.value = false
  }

  return {
    isLoading,
    user,
    getUser,
  }
})

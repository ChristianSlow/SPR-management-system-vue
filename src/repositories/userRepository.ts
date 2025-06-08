import { useFetch } from '@vueuse/core'
import type { H3Response } from '@/types/h3response'
import type { User } from '@/types/user'

const API_URL = import.meta.env.VITE_API_URL

export const UserRepository = {
  async fetchUsers(params: Record<string, any>) {
    const queryString = new URLSearchParams(params).toString()
    const url = `${API_URL}/users${queryString ? '?' + queryString : ''}`

    try {
      const { data: response } = await useFetch(url).json<H3Response<User[]>>()
      return response.value
    } catch (error) {
      console.error('Error fetching users:', error)
      return { data: [], total: 0 }
    }
  },

  async fetchUser(id: string) {
    try {
      const { data: response } = await useFetch(`${API_URL}/users/${id}`).json<H3Response<User>>()
      return response.value
    } catch (error) {
      console.error('Error fetching user:', error)
      return { data: {} }
    }
  },
}

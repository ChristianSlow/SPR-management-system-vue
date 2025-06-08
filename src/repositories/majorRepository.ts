import type { H3Response } from '@/types/h3response'
import { useFetch } from '@vueuse/core'

const API_URL = import.meta.env.VITE_API_URL

export const MajorRepository = {
  async fetchMajors() {
    try {
      const { data, error } = await useFetch(`${API_URL}/majors`).get().json()
      if (error.value) {
        throw new Error(error.value.message)
      }
      return data.value
    } catch (error) {
      console.log(error)
    }
  },
  async fetchMajor(id: string) {
    try {
      const { data, error } = await useFetch(`${API_URL}/majors/${id}`).get().json()
      if (error.value) {
        throw new Error(error.value.message)
      }
      return data.value
    } catch (error) {
      console.log(error)
    }
  },
  async createMajor(payload: FormData) {
    try {
      const { data, error } = await useFetch(`${API_URL}/students`, {
        method: 'POST',
        body: payload,
      }).json<H3Response>()

      if (error.value) {
        throw new Error(error.value.message || 'Network error')
      }

      return data.value
    } catch (error) {
      console.error('Error adding student:', error)
      return {
        statusCode: 500,
        message: error instanceof Error ? error.message : 'Failed to add student',
      }
    }
  },
}

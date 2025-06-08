import type { H3Response } from '@/types/h3response'
import type { Student } from '@/types/student'
import { useFetch } from '@vueuse/core'

const API_URL = import.meta.env.VITE_API_URL

export const QueueRepository = {
  async fetchQueues(params: Record<string, any>) {
    const queryString = new URLSearchParams(params).toString()
    const url = `${API_URL}/students${queryString ? '?' + queryString : ''}`
    try {
      const { data: response } = await useFetch(url).json<H3Response<Student[]>>()
      return response.value
    } catch (error) {
      console.error('Error fetching students:', error)
      return { data: [], total: 0 }
    }
  },
  async destroyQueue(id: string) {
    try {
      const { data, error } = await useFetch(`${API_URL}/queue/${id}`, {
        method: 'DELETE',
      }).json<H3Response>()

      if (error.value) {
        throw new Error(error.value.message || 'Network error')
      }

      return data.value
    } catch (error) {
      return {
        statusCode: 500,
        message: error instanceof Error ? error.message : 'Failed to reject student',
      }
    }
  },
  async updateQueue(id: string, payload: any) {
    try {
      const { data, error } = await useFetch(`${API_URL}/queue/${id}`, {
        method: 'PUT',
        body: payload,
      }).json<H3Response>()

      if (error.value) {
        throw new Error(error.value.message || 'Network error')
      }

      return data.value
    } catch (error) {
      return {
        statusCode: 500,
        message: error instanceof Error ? error.message : 'Failed to update student',
      }
    }
  },
}

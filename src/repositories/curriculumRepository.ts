import { useFetch } from '@vueuse/core'
import type { H3Response } from '@/types/h3response'
import type { Curriculum } from '@/types/curriculum'

const API_URL = import.meta.env.VITE_API_URL

export const CurriculumRepository = {
  async fetchCurriculums(params: Record<string, any>) {
    const queryString = new URLSearchParams(params).toString()
    const url = `${API_URL}/curriculums${queryString ? '?' + queryString : ''}`

    try {
      const { data: response } = await useFetch(url).json<H3Response<Curriculum[]>>()
      return response.value
    } catch (error) {
      console.error('Error fetching curriculums:', error)
      return { data: [], total: 0 }
    }
  },

  async fetchCurriculum(uid: string) {
    try {
      const { data: response } = await useFetch(`${API_URL}/curriculums/${uid}`).json<
        H3Response<Curriculum>
      >()
      return response.value
    } catch (error) {
      console.error('Error fetching curriculum:', error)
      return { data: {} }
    }
  },

  async createCurriculum(payload: Curriculum) {
    try {
      const { data } = await useFetch(`${API_URL}/curriculums`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }).json<H3Response>()

      return data.value
    } catch (error) {
      console.error('Error adding curriculum:', error)
      return {
        statusCode: 500,
        message: error instanceof Error ? error.message : 'Failed to add curriculum',
      }
    }
  },

  async updateCurriculum(id: string, payload: Curriculum) {
    try {
      const { data } = await useFetch(`${API_URL}/curriculums/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }).json<H3Response>()

      return data.value
    } catch (error) {
      return {
        statusCode: 500,
        message: error instanceof Error ? error.message : 'Failed to update curriculum',
      }
    }
  },

  async destroyCurriculum(id: string) {
    try {
      const { data, error } = await useFetch(`${API_URL}/curriculums/${id}`, {
        method: 'DELETE',
      }).json<H3Response>()

      if (error.value) {
        throw new Error(error.value.message || 'Network error')
      }

      return data.value
    } catch (error) {
      return {
        statusCode: 500,
        message: error instanceof Error ? error.message : 'Failed to delete curriculum',
      }
    }
  },
}

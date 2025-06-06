import { useFetch } from '@vueuse/core'
import type { H3Response } from '@/types/h3response'
import type { Student } from '@/types/student'

const API_URL = import.meta.env.VITE_API_URL

export const StudentRepository = {
  async fetchStudents(params: Record<string, any>) {
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

  async fetchStudent(id: string) {
    try {
      const { data: response } = await useFetch(`${API_URL}/students/${id}`).json<
        H3Response<Student>
      >()
      return response.value
    } catch (error) {
      console.error('Error fetching student:', error)
      return { data: {} }
    }
  },

  async createStudent(payload: FormData) {
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

  async updateStudent(payload: FormData) {
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
      console.error('Error updating student:', error)
      return {
        statusCode: 500,
        message: error instanceof Error ? error.message : 'Failed to update student',
      }
    }
  },

  async destroyStudent(id: string) {
    try {
      const { data, error } = await useFetch(`${API_URL}/students/${id}`, {
        method: 'DELETE',
        body: id,
      }).json<H3Response>()

      if (error.value) {
        throw new Error(error.value.message || 'Network error')
      }

      return data.value
    } catch (error) {
      return {
        statusCode: 500,
        message: error instanceof Error ? error.message : 'Failed to delete student',
      }
    }
  },
}

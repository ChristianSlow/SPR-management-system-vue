import type { H3Response } from '@/types/h3response'
import { useFetch } from '@vueuse/core'

const API_URL = import.meta.env.VITE_API_URL

export const EnrollmentRepository = {
  async createEnrollment(payload: FormData) {
    try {
      const { data, error } = await useFetch(`${API_URL}/enrollments`)
        .post(payload)
        .json<H3Response>()

      if (error.value) {
        throw new Error(error.value.message || 'Network error')
      }

      return data.value
    } catch (error) {
      console.error('Error enrolling student:', error)
      return {
        statusCode: 500,
        message: error instanceof Error ? error.message : 'Failed to enroll student',
      }
    }
  },
}

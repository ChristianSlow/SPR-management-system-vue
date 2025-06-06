import { useFetch } from '@vueuse/core'

const API_URL = import.meta.env.VITE_API_URL

export const EnrollmentRepository = {
  async createEnrollment(payload: any) {
    try {
      const { data, error } = await useFetch(`${API_URL}/enrollments`).post(payload).json()

      console.log(data.value)
    } catch (error) {}
  },
}

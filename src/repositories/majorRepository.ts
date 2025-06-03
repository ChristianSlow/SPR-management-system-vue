import { useFetch } from '@vueuse/core'

const API_URL = import.meta.env.VITE_API_URL

export const MajorRepository = {
  async getMajors(id: string) {
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
}

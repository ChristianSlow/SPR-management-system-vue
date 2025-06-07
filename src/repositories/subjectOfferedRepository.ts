import type { H3Response } from '@/types/h3response'
import { useFetch } from '@vueuse/core'

const API_URL = import.meta.env.VITE_API_URL

export const SubjectOfferedRepository = {
  async fetchSubjectOffereds(curriculumId: string) {
    try {
      const { data: response } = await useFetch(
        `${API_URL}/curriculums/${curriculumId}/subjects`,
      ).json<H3Response>()
      return response.value
    } catch (error) {
      console.error('Error fetching subjects:', error)
      return { data: [] }
    }
  },

  async createSubjectOffereds(curriculumId: string, payload: any) {
    try {
      const { data } = await useFetch(`${API_URL}/curriculums/${curriculumId}/subjects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }).json<H3Response>()

      return data.value
    } catch (error) {
      console.error('Error adding subject:', error)
      return {
        statusCode: 500,
        message: error instanceof Error ? error.message : 'Failed to add subject',
      }
    }
  },
}

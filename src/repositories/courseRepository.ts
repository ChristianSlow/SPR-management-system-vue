import type { Course } from '@/types/course'
import type { H3Response } from '@/types/h3response'
import { useFetch } from '@vueuse/core'

const API_URL = import.meta.env.VITE_API_URL

export const CourseRepository = {
  async fetchCourses(params: Record<string, any>) {
    const queryString = new URLSearchParams(params).toString()
    const url = `${API_URL}/courses${queryString ? '?' + queryString : ''}`

    try {
      const { data: response } = await useFetch(url).json<H3Response<Course[]>>()
      return response.value
    } catch (error) {
      console.error('Error fetching courses:', error)
      return { data: [] }
    }
  },

  async fetchCourse(id: string) {
    try {
      const { data: response } = await useFetch(`${API_URL}/courses/${id}`).json<
        H3Response<Course>
      >()

      return response.value
    } catch (error) {
      console.error('Error fetching course:', error)
      return { data: {} }
    }
  },

  async createCourse(payload: Course) {
    try {
      const { data } = await useFetch(`${API_URL}/courses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }).json<H3Response>()

      return data.value
    } catch (error) {
      console.error('Error adding course:', error)
      return {
        statusCode: 500,
        message: error instanceof Error ? error.message : 'Failed to add course',
      }
    }
  },

  async updateCourse(id: string, payload: Course) {
    try {
      const { data } = await useFetch(`${API_URL}/courses/${id}`, {
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
        message: error instanceof Error ? error.message : 'Failed to update course',
      }
    }
  },

  async destroyCourse(id: string) {
    try {
      const { data, error } = await useFetch(`${API_URL}/courses/${id}`, {
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
        message: error instanceof Error ? error.message : 'Failed to delete course',
      }
    }
  },
}

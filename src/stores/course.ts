import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Course } from '@/types/course'
import { CourseRepository } from '@/repositories/courseRepository'
import { watchDebounced } from '@vueuse/core'

export const useCourseStore = defineStore('course', () => {
  const isLoading = ref(false)
  const courses = ref<Course[]>([])
  const course = ref<Course>()
  const searchQuery = ref('')
  const page = ref(0)
  const totalCourses = ref(0)

  async function getCourses() {
    isLoading.value = true
    const response = await CourseRepository.fetchCourses({ search: searchQuery.value })
    courses.value = response?.data ?? []
    isLoading.value = false
  }

  async function getCourse(uid: string) {
    isLoading.value = true
    const response = await CourseRepository.fetchCourse(uid)

    course.value = response?.data || {}
    isLoading.value = false
  }

  async function addCourse(course: Course) {
    isLoading.value = true
    try {
      const response = await CourseRepository.createCourse(course)
      await getCourses()
      return {
        status: 'success',
        message: response?.message,
        statusMessage: response?.statusMessage ?? '',
      }
    } catch (error) {
      console.error('Error adding course:', error)
      return {
        status: 'error',
        message: 'Failed to add course',
        statusMessage: 'error',
      }
    } finally {
      isLoading.value = false
    }
  }

  async function editCourse(uid: string, course: Course) {
    isLoading.value = true
    try {
      const response = await CourseRepository.updateCourse(uid, course)
      await getCourses()
      return {
        status: 'success',
        message: response?.message,
        statusMessage: response?.statusMessage ?? '',
      }
    } catch (error) {
      console.error('Error updating course:', error)
      return {
        status: 'error',
        message: 'Failed to update course',
        statusMessage: 'error',
      }
    } finally {
      isLoading.value = false
    }
  }

  async function deleteCourse(uid: string) {
    isLoading.value = true
    try {
      const response = await CourseRepository.destroyCourse(uid)
      await getCourses()
      return {
        status: 'success',
        message: response?.message,
        statusMessage: response?.statusMessage ?? '',
      }
    } catch (error) {
      console.error('Error deleting course:', error)
      return {
        status: 'error',
        message: 'Failed to delete course',
        statusMessage: 'error',
      }
    } finally {
      isLoading.value = false
    }
  }

  watchDebounced(
    [searchQuery],
    (newQuery) => {
      getCourses()
    },
    { debounce: 300 },
  )

  return {
    courses,
    course,
    isLoading,
    page,
    totalCourses,
    searchQuery,
    getCourse,
    getCourses,
    addCourse,
    deleteCourse,
    editCourse,
  }
})

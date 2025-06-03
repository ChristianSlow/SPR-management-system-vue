import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Course } from '@/types/course'
import { CourseRepository } from '@/repositories/courseRepository'

export const useCourseStore = defineStore('course', () => {
  const isLoading = ref(false)
  const courses = ref<Course[]>([])
  const course = ref<Course>()
  const searchQuery = ref('')

  async function getCourses() {
    isLoading.value = true
    const response = await CourseRepository.fetchCourses({ q: searchQuery.value })
    courses.value = response?.data ?? []
    isLoading.value = false
  }

  async function getCourse(uid: string) {
    isLoading.value = true
    const response = await CourseRepository.fetchCourse(uid)
    course.value = response?.data ?? {}
    isLoading.value = false
  }

  async function addCourse(course: Course) {
    isLoading.value = true
    try {
      const response = await CourseRepository.createCourse({
        name: course.name?.toLowerCase(),
        abbreviation: course.abbreviation?.toLowerCase(),
        majors: course.majors,
      })
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

  async function editCourse(course: Course) {
    isLoading.value = true
    console.log(course)
    try {
      const response = await CourseRepository.updateCourse(course.id as string, {
        name: course.name?.toLowerCase(),
        abbreviation: course.abbreviation,
        majors: course.majors,
      })
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
      console.log(uid)
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

  return {
    courses,
    isLoading,
    getCourse,
    getCourses,
    addCourse,
    deleteCourse,
    editCourse,
  }
})

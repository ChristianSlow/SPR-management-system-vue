import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Course } from '@/types/course'
import { CourseRepository } from '@/repositories/courseRepository'

export const useCourseStore = defineStore('course', () => {
  const isLoading = ref(false)
  const courses = ref<Course[]>([])

  async function getCourses() {
    isLoading.value = true
    const response = await CourseRepository.fetchCourses()
    courses.value = response.data
    isLoading.value = false
  }

  async function addCourse(course: Course) {
    isLoading.value = true
    await CourseRepository.createCourse({
      name: course.name?.toLowerCase(),
      abbreviation: course.abbreviation?.toLowerCase(),
    })
    await getCourses()
    isLoading.value = false
  }

  async function editCourse(course: Course) {
    isLoading.value = true
    await CourseRepository.updateCourse(course.uid as string, {
      name: course.name?.toLowerCase(),
    })
    getCourses()
    isLoading.value = false
  }

  async function deleteCourse(uid: string) {
    isLoading.value = true
    await CourseRepository.destroyCourse(uid)
    isLoading.value = false
  }

  return {
    courses,
    isLoading,
    getCourses,
    addCourse,
    deleteCourse,
    editCourse,
  }
})

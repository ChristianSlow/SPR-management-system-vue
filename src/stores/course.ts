import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Course } from '@/types/course'

export const useCourseStore = defineStore('course', () => {
  const courses = ref<Course[]>([
    {
      name: 'BACHELOR OF ELEMENTARY EDUCATION',
      abbreviation: 'BEED',
      majors: [],
    },
    {
      name: 'BACHELOR OF SECONDARY EDUCATION',
      abbreviation: 'BSED',
      majors: ['MATHEMATICS', 'ENGLISH', 'FILIPINO'],
    },
  ])

  function getCourses() {
    // code here
  }

  return {
    courses,
    getCourses,
  }
})

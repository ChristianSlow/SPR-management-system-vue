import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCourseStore = defineStore('course', () => {
  const course = ref()

  function getCourses() {
    // code here
  }

  return {
    course,
    getCourses,
  }
})

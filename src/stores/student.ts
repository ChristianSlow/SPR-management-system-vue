import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useStudentStore = defineStore('student', () => {
  const course = ref()

  function getStudents() {
    // code here
  }

  return {
    course,
    getStudents,
  }
})

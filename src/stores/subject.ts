import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSubjectStore = defineStore('subject', () => {
  const subject = ref()

  function fetchSubjects() {
    // code here
  }

  return { subject, fetchSubjects }
})

import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSubjectStore = defineStore('subject', () => {
  const subject = ref()

  function getSubjects() {
    // code here
  }

  return { subject, getSubjects }
})

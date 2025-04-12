import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useMajorStore = defineStore('major', () => {
  const subject = ref()

  function getMajors() {
    // code here
  }

  return { subject, getMajors }
})

import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Subject } from '@/types/subject'

export const useSubjectStore = defineStore('subject', () => {
  const subject = ref<Subject[]>([
    {
      code:'GE111',
      name:'Purposive Communication',
      unit: '3',
    },
    {
      code:'GE112',
      name:'Comtemporary World',
      unit: '3',
    }
])
  function getSubjects() {
    // code here
  }

  return { subject, getSubjects }
})

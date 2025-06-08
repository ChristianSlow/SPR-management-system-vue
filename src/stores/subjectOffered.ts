import { SubjectOfferedRepository } from '@/repositories/subjectOfferedRepository'
import type { SubjectOffered } from '@/types/subjectOffered'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useSubjectOfferedStore = defineStore('subject-offered', () => {
  const isLoading = ref(false)
  const subjectOffereds = ref<SubjectOffered[] | []>([])

  const subjects = computed(() => subjectOffereds.value.map((item) => item.subject))

  async function getSubjectOffereds(curriculumId: string) {
    isLoading.value = true
    const res = await SubjectOfferedRepository.fetchSubjectOffereds(curriculumId)
    console.log(res)
    subjectOffereds.value = res?.data
    isLoading.value = false
  }

  async function addSubjectOffereds(curriculumId: string, payload: any) {}

  return { isLoading, subjectOffereds, subjects, getSubjectOffereds, addSubjectOffereds }
})

import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Subject } from '@/types/subject'
import { SubjectRepository } from '@/repositories/subjectRepository'

export const useSubjectStore = defineStore('subject', () => {
  const isLoading = ref(false)
  const subjects = ref<Subject[]>([])

  async function getSubjects() {
    isLoading.value = true
    const response = await SubjectRepository.fetchSubjects()
    subjects.value = response.data
    isLoading.value = false
  }

  async function addSubject(subject: Subject) {
    isLoading.value = true
    await SubjectRepository.createSubject({
      name: subject.name?.toLowerCase(),
      code: subject.code?.toLowerCase(),
      unit: subject.unit,
    })
    getSubjects()
    isLoading.value = false
  }

  async function deleteSubject(uid: string) {
    isLoading.value = true
    await SubjectRepository.destroySubject(uid)
    isLoading.value = false
  }

  return { subjects, isLoading, getSubjects, addSubject, deleteSubject }
})

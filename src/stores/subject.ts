import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { Subject } from '@/types/subject'
import { SubjectRepository } from '@/repositories/subjectRepository'

export const useSubjectStore = defineStore('subject', () => {
  const isLoading = ref(false)
  const subjects = ref<Subject[]>([])
  const selectedCourse = ref<string | null>(null)

  async function getSubjects() {
    isLoading.value = true
    const response = await SubjectRepository.fetchSubjects()
    subjects.value = response.data
    isLoading.value = false
  }

  function getFilteredSubject(courseAbbreviation: string) {
    selectedCourse.value = courseAbbreviation
  }

  const filteredSubjects = computed(() => {
    if (!selectedCourse.value) return []
    return subjects.value.filter((s) => s.courseIds?.includes(selectedCourse.value as string))
  })

  async function addSubject(subject: Subject) {
    isLoading.value = true
    await SubjectRepository.createSubject({
      courseIds: subject.courseIds,
      name: subject.name?.toLowerCase(),
      code: subject.code?.toLowerCase(),
      unit: subject.unit,
    })
    await getSubjects()
    isLoading.value = false
  }

  async function editSubject(subject: Subject) {
    isLoading.value = true
    await SubjectRepository.updateSubject(subject.uid as string, {
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
    getSubjects()
    isLoading.value = false
  }

  return {
    subjects,
    isLoading,
    filteredSubjects,
    getSubjects,
    getFilteredSubject,
    addSubject,
    deleteSubject,
    editSubject,
  }
})

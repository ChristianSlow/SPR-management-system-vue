import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { Subject } from '@/types/subject'
import { SubjectRepository } from '@/repositories/subjectRepository'
import { watchDebounced } from '@vueuse/core'

export const useSubjectStore = defineStore('subject', () => {
  const isLoading = ref(false)
  const subjects = ref<Subject[]>([])
  const totalSubjects = ref(0)
  const selectedCourse = ref<string | null>(null)
  const searchQuery = ref('')

  async function getSubjects() {
    isLoading.value = true
    const response = await SubjectRepository.fetchSubjects({
      search: searchQuery.value,
    })
    subjects.value = response?.data || []
    totalSubjects.value = response?.total || 0
    isLoading.value = false
  }

  function getFilteredSubject(courseAbbreviation: string) {
    selectedCourse.value = courseAbbreviation
  }

  async function addSubject(subject: Subject) {
    isLoading.value = true
    try {
      const response = await SubjectRepository.createSubject(subject)
      await getSubjects()
      return {
        status: 'success',
        message: response?.message,
        statusMessage: response?.statusMessage ?? '',
      }
    } catch (error) {
      console.error('Error adding subject:', error)
      return {
        status: 'error',
        message: 'Failed to add subject',
        statusMessage: 'error',
      }
    } finally {
      isLoading.value = false
    }
  }

  async function editSubject(uid: string, subject: Subject) {
    isLoading.value = true
    try {
      const response = await SubjectRepository.updateSubject(uid, subject)
      await getSubjects()
      return {
        status: 'success',
        message: response?.message,
        statusMessage: response?.statusMessage ?? '',
      }
    } catch (error) {
      console.error('Error updating subject:', error)
      return {
        status: 'error',
        message: 'Failed to update subject',
        statusMessage: 'error',
      }
    } finally {
      isLoading.value = false
    }
  }

  async function deleteSubject(uid: string) {
    isLoading.value = true
    try {
      const response = await SubjectRepository.destroySubject(uid)
      await getSubjects()
      return {
        status: 'success',
        message: response?.message,
        statusMessage: response?.statusMessage ?? '',
      }
    } catch (error) {
      console.error('Error deleting subject:', error)
      return {
        status: 'error',
        message: 'Failed to delete subject',
        statusMessage: 'error',
      }
    } finally {
      isLoading.value = false
    }
  }

  watchDebounced(
    [searchQuery],
    (newQuery) => {
      getSubjects()
    },
    { debounce: 300 },
  )

  return {
    subjects,
    isLoading,
    searchQuery,
    getSubjects,
    getFilteredSubject,
    addSubject,
    deleteSubject,
    editSubject,
  }
})

import { ref } from 'vue'
import { defineStore } from 'pinia'
import { CurriculumRepository } from '@/repositories/curriculumRepository'
import type { Curriculum } from '@/types/curriculum'
import { watchDebounced } from '@vueuse/core'

export const useCurriculumStore = defineStore('curriculum', () => {
  const isLoading = ref(false)
  const curriculums = ref<Curriculum[]>([])
  const curriculum = ref<Curriculum>()
  const searchQuery = ref('')
  const page = ref(0)
  const totalCurriculums = ref(0)

  async function getCurriculums() {
    isLoading.value = true
    const response = await CurriculumRepository.fetchCurriculums({ search: searchQuery.value })
    curriculums.value = response?.data || []
    totalCurriculums.value = response?.meta?.total || 0
    page.value = response?.meta?.page || 0
    isLoading.value = false
  }

  async function addCurriculum(curriculum: Curriculum) {
    isLoading.value = true
    try {
      const response = await CurriculumRepository.createCurriculum(curriculum)
      await getCurriculums()
      return {
        status: 'success',
        message: response?.message,
        statusMessage: response?.statusMessage ?? '',
      }
    } catch (error) {
      console.error('Error adding curriculum:', error)
      return {
        status: 'error',
        message: 'Failed to add curricilum',
        statusMessage: 'error',
      }
    } finally {
      isLoading.value = false
    }
  }

  async function editCurriculum(curriculum: any) {
    isLoading.value = true
    console.log(curriculum)
    try {
      const response = await CurriculumRepository.updateCurriculum(
        curriculum.id as string,
        curriculum,
      )
      await getCurriculums()
      return {
        status: 'success',
        message: response?.message,
        statusMessage: response?.statusMessage ?? '',
      }
    } catch (error) {
      console.error('Error updating curriculum:', error)
      return {
        status: 'error',
        message: 'Failed to update curricilum',
        statusMessage: 'error',
      }
    } finally {
      isLoading.value = false
    }
  }

  async function deleteCurriculum(uid: string) {
    isLoading.value = true
    try {
      const response = await CurriculumRepository.destroyCurriculum(uid)
      await getCurriculums()
      return {
        status: 'success',
        message: response?.message,
        statusMessage: response?.statusMessage ?? '',
      }
    } catch (error) {
      console.error('Error deleting curriculum:', error)
      return {
        status: 'error',
        message: 'Failed to delete curricilum',
        statusMessage: 'error',
      }
    } finally {
      isLoading.value = false
    }
  }

  watchDebounced(
    [searchQuery, page],
    (newQuery) => {
      getCurriculums()
    },
    { debounce: 300 },
  )

  return {
    curriculums,
    curriculum,
    isLoading,
    searchQuery,
    page,
    totalCurriculums,
    getCurriculums,
    addCurriculum,
    deleteCurriculum,
    editCurriculum,
  }
})

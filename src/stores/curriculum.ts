import { ref } from 'vue'
import { defineStore } from 'pinia'
import { CurriculumRepository } from '@/repositories/curriculumRepository'
import { CourseRepository } from '@/repositories/courseRepository'
import type { Curriculum } from '@/types/curriculum'

export const useCurriculumStore = defineStore('curriculum', () => {
  const isLoading = ref(false)
  const curriculums = ref<Curriculum[]>([])
  const curriculum = ref<Curriculum>()
  const searchQuery = ref('')

  async function getCurriculums() {
    isLoading.value = true
    const response = await CurriculumRepository.fetchCurriculums({ searchQuery: searchQuery.value })
    console.log(response?.data)
    curriculums.value = response?.data || []
    isLoading.value = false
    console.log(curriculums.value)
  }

  async function addCurriculum(curriculum: Curriculum) {
    console.log(curriculum)
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

  async function editCurriculum(curriculum: Curriculum) {
    isLoading.value = true
    try {
      const response = await CurriculumRepository.updateCurriculum(curriculum.id as string, {
        course: curriculum.course?.toLowerCase(),
        name: curriculum.name?.toLowerCase(),
      })
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

  return {
    curriculums,
    curriculum,
    isLoading,
    getCurriculums,
    addCurriculum,
    deleteCurriculum,
    editCurriculum,
  }
})

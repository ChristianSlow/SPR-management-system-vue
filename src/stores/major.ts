import { MajorRepository } from '@/repositories/majorRepository'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMajorStore = defineStore('major', () => {
  const isLoading = ref(false)
  const majors = ref([])
  const major = ref()

  async function getMajors() {
    isLoading.value = true
    const response = await MajorRepository.fetchMajors()
    majors.value = response.data
    isLoading.value = false
  }

  async function getMajor(id: string) {
    isLoading.value = true
    const response = await MajorRepository.fetchMajor(id)
    major.value = response.data
    isLoading.value = false
  }

  async function addMajor(payload: any) {
    isLoading.value = true
    try {
      const response = await MajorRepository.createMajor(payload)
      await getMajors()
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

  return {
    majors,
    isLoading,
    getMajors,
    getMajor,
    addMajor,
  }
})

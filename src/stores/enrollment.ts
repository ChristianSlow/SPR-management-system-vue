import { EnrollmentRepository } from '@/repositories/enrollmentRepository'
import type { Student } from '@/types/student'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useEnrollmentStore = defineStore('enrollment', () => {
  const isLoading = ref(false)

  async function addEnrollment(file: File, file2: File, student: Student) {
    isLoading.value = true
    const formData = new FormData()
    formData.append('file1', file)
    formData.append('file2', file2)
    formData.append('student', JSON.stringify(student))
    try {
      const response = await EnrollmentRepository.createEnrollment(formData)
      return {
        status: 'success',
        message: 'Enrolled successfully!',
        statusMessage: response?.statusMessage ?? '',
      }
    } catch (error) {
      console.error('Error adding enrollment:', error)
      return {
        status: 'error',
        message: 'Failed to enrolled',
        statusMessage: 'error',
      }
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    addEnrollment,
  }
})

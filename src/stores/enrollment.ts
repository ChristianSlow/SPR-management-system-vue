import { EnrollmentRepository } from '@/repositories/enrollmentRepository'
import type { Student } from '@/types/student'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useEnrollmentStore = defineStore('enrollment', () => {
  const isLoading = ref(false)

  async function addCurriculum(uid: string, file: File, file2: File, student: Student) {
    isLoading.value = true
    const formData = new FormData()
    formData.append('userId', uid)
    formData.append('file', file)
    formData.append('file2', file2)
    formData.append('student', JSON.stringify(student))
    const response = await EnrollmentRepository.createEnrollment(formData)
    console.log(response)
    if (response?.statusCode == 200) {
      return {
        status: 'success',
        message: 'Enrolled successfully!',
        statusMessage: response.statusMessage ?? '',
      }
    }
    isLoading.value = false
    return {
      status: 'error',
      message: response?.message,
      statusMessage: response?.statusMessage ?? '',
    }
  }

  return {
    isLoading,
    addCurriculum,
  }
})

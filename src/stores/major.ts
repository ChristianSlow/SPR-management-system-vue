import { MajorRepository } from '@/repositories/majorRepository'
import { useFetch } from '@vueuse/core'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMajorStore = defineStore('major', () => {
  const isLoading = ref(false)
  const majors = ref([])

  async function fetchMajors(id: string) {
    isLoading.value
    const response = await MajorRepository.getMajors(id)
    majors.value = response.data
    isLoading.value = false
  }

  return {
    majors,
    fetchMajors,
  }
})

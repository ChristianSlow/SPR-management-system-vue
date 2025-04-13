import { ref } from 'vue'
import { defineStore } from 'pinia'
import { CurriculumRepository } from '@/repositories/curriculumRepository'
import type { Curriculum } from '@/types/curriculum'

export const useCurriculumStore = defineStore('curriculum', () => {
  const isLoading = ref(false)
  const curriculums = ref<Curriculum[]>([])
  const curriculum = ref<Curriculum>()

  async function getCurriculums() {
    isLoading.value = true
    const response = await CurriculumRepository.fetchCurriculums()
    curriculums.value = response.data
    isLoading.value = false
  }

  async function addCurriculum(curriculum: Curriculum) {
    isLoading.value = true
    await CurriculumRepository.createCurriculum({
      course: curriculum.course?.toLowerCase(),
      name: curriculum.name?.toLowerCase(),
      major: curriculum.major?.toLowerCase(),
    })
    getCurriculums()
    isLoading.value = false
  }

  async function editCurriculum(curriculum: Curriculum) {
    isLoading.value = true
    await CurriculumRepository.updateCurriculum(curriculum.uid as string, {
      course: curriculum.course?.toLowerCase(),
      name: curriculum.name?.toLowerCase(),
      major: curriculum.major?.toLowerCase(),
    })
    getCurriculums()
    isLoading.value = false
  }

  async function deleteCurriculum(uid: string) {
    isLoading.value = true
    await CurriculumRepository.destroyCurriculum(uid)
    isLoading.value = false
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

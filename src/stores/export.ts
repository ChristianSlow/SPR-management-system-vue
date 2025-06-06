import { useFetch } from '@vueuse/core'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const API_URL = import.meta.env.VITE_API_URL

export const useExportStore = defineStore('export', () => {
  const isLoading = ref(false)

  // need siya query params para maka filter unsa ray e export
  async function exportStudents() {
    const { data: response, error } = await useFetch(`${API_URL}/students/export`).json<any>()

    if (!response.value.ok) {
      const errorText = await response.value.text()
      throw new Error(`Export failed: ${response.value.status} - ${errorText}`)
    }

    const blob = await response.value.blob()
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'change this to file names'
    link.click()
    window.URL.revokeObjectURL(url)
  }

  return { isLoading, exportStudents }
})

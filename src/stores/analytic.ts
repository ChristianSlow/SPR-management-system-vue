import { useFetch } from '@vueuse/core'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const API_URL = import.meta.env.VITE_API_URL

export const useAnalyticStore = defineStore('analytic', () => {
  const isLoading = ref(false)
  const analytics = ref()

  async function fetchAnalytics() {
    isLoading.value = true
    const { data: response, error } = await useFetch(`${API_URL}/analytics`).get().json<any>()
    analytics.value = response.value.data
    console.log(analytics.value)
    isLoading.value = false
  }

  return {
    isLoading,
    analytics,
    fetchAnalytics,
  }
})

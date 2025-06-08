import { QueueRepository } from '@/repositories/queueRepository'
import { watchDebounced } from '@vueuse/core'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useQueueStore = defineStore('queue', () => {
  const isLoading = ref(false)
  const students = ref()
  const status = ref('PENDING')
  const search = ref('')
  const totalStudents = ref(0)
  const page = ref(0)

  async function getQueues() {
    isLoading.value = true
    const response = await QueueRepository.fetchQueues({
      search: search.value,
      status: status.value,
    })
    students.value = response?.data
    totalStudents.value = response?.meta?.total || 0
    isLoading.value = false
  }

  async function editQueue(id: string, payload: any) {
    isLoading.value = true
    const response = await QueueRepository.updateQueue(id, payload)
    await getQueues()
    console.log(response)
    isLoading.value = false
  }

  watchDebounced(
    [search, status],
    (newQuery) => {
      getQueues()
    },
    { debounce: 300 },
  )

  return {
    isLoading,
    students,
    search,
    status,
    totalStudents,
    page,
    editQueue,
    getQueues,
  }
})

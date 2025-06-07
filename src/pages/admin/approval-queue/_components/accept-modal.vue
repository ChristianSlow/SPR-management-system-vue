<script setup lang="ts">
import { inject } from 'vue'
import type { Student } from '@/types/student'
import { useToast } from 'primevue'
import { useQueueStore } from '@/stores/queue'

const dialogRef = inject<any>('dialogRef')
const student = dialogRef.value.data
const queueStore = useQueueStore()
const toast = useToast()

function onClose() {
  dialogRef.value.close()
}

async function onSubmit(payload: Student) {
  await queueStore.editQueue(payload.id ?? '', 'APPROVED')
  toast.add({
    severity: 'success',
    summary: 'Success',
    detail: 'Succesfully accepted student!',
    life: 3000,
  })
  onClose()
}
</script>

<template>
  <div class="bg-white">
    <!-- <h2 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Student</h2> -->
    <!-- <label>Note: This message will be sent to the student email.</label>
    <textarea
      rows="4"
      class="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
      placeholder="Enter your message here..."
    ></textarea> -->
    <div class="text-center">
      <i class="pi pi-exclamation-triangle mr-3 text-xl text-red-500" />
      <span
        >Are you sure you want to approved
        <span class="font-semibold capitalize"
          >{{ student.firstName }} {{ student.middleName }} {{ student.lastName }}</span
        >?</span
      >
    </div>
    <div class="flex justify-end mt-4 gap-2">
      <Button label="Cancel" severity="danger" @click="onClose" />
      <Button label="Accept" @click="onSubmit(student)" :loading="queueStore.isLoading" />
    </div>
  </div>
</template>

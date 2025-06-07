<script setup lang="ts">
import { inject } from 'vue'
import { useToast } from 'primevue'
import { useQueueStore } from '@/stores/queue'

const dialogRef = inject<any>('dialogRef')
const student = dialogRef.value.data
const store = useQueueStore()
const toast = useToast()

function onClose() {
  dialogRef.value.close()
}

async function onSubmit() {
  await store.editQueue(student.id, 'REJECTED')
  toast.add({
    severity: 'success',
    summary: 'Success',
    detail: 'Succesfully rejected student!',
    life: 3000,
  })
  onClose()
}
</script>
<template>
  <div class="space-y-4">
    <div class="text-center">
      <i class="pi pi-exclamation-triangle mr-3 text-xl text-red-500" />
      <span
        >Are you sure you want to reject
        <span class="font-semibold capitalize"
          >{{ student.firstName }} {{ student.middleName }} {{ student.lastName }}</span
        >?</span
      >
    </div>
    <div class="flex justify-end gap-4">
      <Button label="No" severity="danger" icon="pi pi-times" text @click="onClose" />
      <Button label="Yes" icon="pi pi-check" @click="onSubmit" :loading="store.isLoading" />
    </div>
  </div>
</template>

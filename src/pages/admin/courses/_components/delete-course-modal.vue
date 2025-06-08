<script setup lang="ts">
import { inject } from 'vue'
import { useCourseStore } from '@/stores/course'
import { useToast } from 'primevue'

const dialogRef = inject<any>('dialogRef')
const store = useCourseStore()
const toast = useToast()

const course = dialogRef.value.data

function onClose() {
  dialogRef.value.close()
}

async function onDelete() {
  const res = await store.deleteCourse(course.id)
  console.log(res)
  toast.add({
    severity: res.status,
    summary: res.statusMessage,
    detail: res.message,
    life: 3000,
  })
  onClose()
}
</script>

<template>
  <div class="confirmation-content text-center text-lg">
    <i class="pi pi-exclamation-triangle mr-3 text-3xl text-red-500" />
    <span>
      Are you sure you want to delete <strong>{{ course.name }}</strong
      >?
    </span>
  </div>

  <div class="flex justify-end gap-2 mt-4">
    <Button label="No" icon="pi pi-times" text @click="onClose" />
    <Button
      label="Yes"
      icon="pi pi-check"
      severity="danger"
      @click="onDelete"
      :loading="store.isLoading"
    />
  </div>
</template>

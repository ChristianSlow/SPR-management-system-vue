<script setup lang="ts">
import { inject } from 'vue'
import { useCourseStore } from '@/stores/course'

const dialogRef = inject<any>('dialogRef')
const store = useCourseStore()

const course = dialogRef.value.data

function onClose() {
  dialogRef.value.close()
}

function onDelete() {
  store.deleteCourse(course.uid)
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

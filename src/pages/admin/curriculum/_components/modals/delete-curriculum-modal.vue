<script setup lang="ts">
import { inject } from 'vue'
import { useCourseStore } from '@/stores/course'

const dialogRef = inject<any>('dialogRef')
const courseStore = useCourseStore()

const course = dialogRef.value.data.course

function onClose() {
  dialogRef.value.close()
}

function onDelete() {
  courseStore.courses = courseStore.courses.filter(c => c.name !== course.name)
  onClose()
}
</script>

<template>
  <div class="confirmation-content text-center text-lg">
    <i class="pi pi-exclamation-triangle mr-3 text-3xl text-red-500" />
    <span>
      Are you sure you want to delete <strong>{{ course.name }}</strong>?
    </span>
  </div>

  <div class="flex justify-end gap-2 mt-4">
    <Button label="No" icon="pi pi-times" text @click="onClose" />
    <Button label="Yes" icon="pi pi-check" severity="danger" @click="onDelete" />
  </div>
</template>

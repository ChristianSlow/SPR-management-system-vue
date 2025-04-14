<script setup lang="ts">
import { inject } from 'vue'

const dialogRef = inject<any>('dialogRef')
const student = dialogRef.value.data

function onClose() {
  dialogRef.value.close()
}
</script>

<template>
  <div class="space-y-4">
    <div class="text-center">
      <i class="pi pi-exclamation-triangle mr-3 text-xl text-red-500" />
      <span
        >Are you sure you want to decline
        <span class="font-semibold capitalize"
          >{{ student.firstName }} {{ student.middleName }} {{ student.lastName }}</span
        >?</span
      >
    </div>
    <div class="flex justify-end gap-4">
      <Button label="No" severity="danger" size="sm" icon="pi pi-times" text @click="onClose" />
      <Button label="Yes" icon="pi pi-check" size="sm" />
    </
  </div>
</template>

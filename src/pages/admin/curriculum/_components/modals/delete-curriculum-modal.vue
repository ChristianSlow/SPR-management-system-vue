<script setup lang="ts">
import { inject } from 'vue'
import { useToast } from 'primevue'
import { useCurriculumStore } from '@/stores/curriculum'

const dialogRef = inject<any>('dialogRef')
const store = useCurriculumStore()
const toast = useToast()
const curriculum = dialogRef.value.data

function onClose() {
  dialogRef.value.close()
}

async function onDelete() {
  const res = await store.deleteCurriculum(curriculum.id)
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
      Are you sure you want to delete <strong>{{ curriculum.name }}</strong
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

<script setup lang="ts">
import { useSubjectStore } from '@/stores/subject'
import type { Subject } from '@/types/subject'
import { useToast } from 'primevue/usetoast'
import { inject, ref } from 'vue'

const dialogRef = inject<any>('dialogRef')
const subject = ref<Subject>(dialogRef.value.data)
const store = useSubjectStore()
const toast = useToast()

function onClose() {
  dialogRef.value.close()
}

function onSubmit() {
  if (!subject.value || !subject.value.uid) return

  store.deleteSubject(subject.value.uid)
  toast.add({
    severity: 'success',
    summary: 'Success',
    detail: 'Successfully deleted subject!',
    life: 3000,
  })
  onClose()
}
</script>

<template>
  <div class="p-4">
    <p>
      Are you sure you want to delete the subject
      <strong class="capitalize"
        >{{ subject.code?.toLocaleUpperCase() }} - {{ subject.name }}</strong
      >?
    </p>

    <div class="flex justify-end gap-2 mt-4">
      <Button label="Cancel" class="p-button-text" @click="onClose" />
      <Button label="Delete" severity="danger" @click="onSubmit" :loading="store.isLoading" />
    </div>
  </div>
</template>

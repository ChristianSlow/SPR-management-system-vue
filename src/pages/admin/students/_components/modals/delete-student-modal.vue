<script setup lang="ts">
import { useStudentStore } from '@/stores/student'
import type { Student } from '@/types/student'
import { useToast } from 'primevue/usetoast'
import { inject, ref } from 'vue'

const dialogRef = inject<any>('dialogRef')
const student = ref<Student>(dialogRef.value.data)
const store = useStudentStore()
const toast = useToast()

function onClose() {
  dialogRef.value.close()
}

function onSubmit() {
  store.deleteStudent(student.value.id ?? '')
  toast.add({
    severity: 'success',
    summary: 'Success',
    detail: 'Successfully deleted student!',
    life: 3000,
  })
  onClose()
}
</script>

<template>
  <div class="p-4">
    <p>
      Are you sure you want to delete the student
      <span class="font-semibold capitalize"
        >{{ student.firstName }} {{ student.middleName }} {{ student.lastName }}</span
      >?
    </p>

    <div class="flex justify-end gap-2 mt-4">
      <Button label="Cancel" class="p-button-text" @click="onClose" />
      <Button label="Delete" severity="danger" @click="onSubmit" :loading="store.isLoading" />
    </div>
  </div>
</template>

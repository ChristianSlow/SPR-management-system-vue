<script setup lang="ts">
import { useSubjectStore } from '@/stores/subject'
import type { Subject } from '@/types/subject'
import { Message, useToast } from 'primevue'
import { inject, reactive } from 'vue'

const dialogRef = inject<any>('dialogRef')
const subject = reactive<Subject>({
  name: '',
  code: '',
  unit: '',
})
const store = useSubjectStore()
const toast = useToast()

function onClose() {
  dialogRef.value.close()
}

function onSubmit(payload: Subject) {
  store.addSubject(payload)
  toast.add({
    severity: 'success',
    summary: 'Success',
    detail: 'Succesfully added subject!',
    life: 3000,
  })
  onClose()
}
</script>

<template>
  <form class="flex flex-col gap-4" @submit.prevent="onSubmit(subject)">
    <div class="flex gap-4">
      <div class="flex flex-1 flex-col gap-2">
        <label>Subject Code</label>
        <InputText required v-model="subject.code" />
      </div>
      <div class="flex flex-1 flex-col gap-2">
        <label>Units</label>
        <InputText required v-model="subject.unit" />
      </div>
    </div>

    <div class="flex flex-col gap-2">
      <label>Descriptive Title</label>
      <InputText required v-model="subject.name" />
    </div>

    <div class="flex w-full gap-2 justify-end mt-4">
      <Button label="Cancel" class="p-button-text" @click="onClose" />
      <Button label="Save" class="p-button-primary" type="submit" :loading="store.isLoading" />
    </div>
  </form>
</template>

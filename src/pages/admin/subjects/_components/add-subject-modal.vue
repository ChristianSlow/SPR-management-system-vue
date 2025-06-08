<script setup lang="ts">
import { useCurriculumStore } from '@/stores/curriculum'
import { useSubjectStore } from '@/stores/subject'
import type { Subject } from '@/types/subject'
import { useToast } from 'primevue'
import { inject, onMounted, reactive } from 'vue'

const dialogRef = inject<any>('dialogRef')
const subject = reactive({
  name: '',
  code: '',
  unit: 0,
  curriculumIds: null,
})
const subjectStore = useSubjectStore()
const curriculumStore = useCurriculumStore()
const toast = useToast()

function onClose() {
  dialogRef.value.close()
}

async function onSubmit(payload: Subject) {
  const res = await subjectStore.addSubject(payload)
  toast.add({
    severity: res.status,
    summary: res.statusMessage,
    detail: res.message,
    life: 3000,
  })
  onClose()
}

onMounted(() => curriculumStore.getCurriculums())
</script>

<template>
  <form class="flex flex-col gap-4" @submit.prevent="onSubmit(subject)">
    <div class="flex flex-col gap-2">
      <label>Curriculum</label>
      <MultiSelect
        required
        v-model="subject.curriculumIds"
        :options="curriculumStore.curriculums"
        optionLabel="name"
        optionValue="id"
      />
    </div>
    <div class="flex flex-col gap-2">
      <label>Subject Code</label>
      <InputText required v-model="subject.code" />
    </div>
    <div class="flex flex-col gap-2">
      <label>Units</label>
      <InputNumber required v-model="subject.unit" />
    </div>

    <div class="flex flex-col gap-2">
      <label>Descriptive Title</label>
      <InputText required v-model="subject.name" />
    </div>

    <div class="flex w-full gap-2 justify-end mt-4">
      <Button label="Cancel" severity="danger" class="p-button-text" @click="onClose" />
      <Button
        label="Save"
        class="p-button-primary"
        type="submit"
        :loading="subjectStore.isLoading"
      />
    </div>
  </form>
</template>

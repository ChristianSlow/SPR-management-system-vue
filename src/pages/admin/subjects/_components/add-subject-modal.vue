<script setup lang="ts">
import { useCourseStore } from '@/stores/course'
import { useSubjectStore } from '@/stores/subject'
import type { Subject } from '@/types/subject'
import { useToast } from 'primevue'
import { inject, onMounted, reactive } from 'vue'

const dialogRef = inject<any>('dialogRef')
const subject = reactive<Subject>({
  courseIds: [],
  name: '',
  code: '',
  unit: '',
})
const store = useSubjectStore()
const courseStore = useCourseStore()
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

onMounted(() => courseStore.getCourses())
</script>

<template>
  <form class="flex flex-col gap-4" @submit.prevent="onSubmit(subject)">
    <div class="flex flex-col gap-2">
      <label>Course</label>
      <MultiSelect
        v-model="subject.courseIds"
        :options="courseStore.courses"
        optionLabel="abbreviation"
        optionValue="abbreviation"
        placeholder="Select course"
        class="w-full"
      />
    </div>

    <div class="flex flex-col gap-2">
      <label>Subject Code</label>
      <InputText required v-model="subject.code" />
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

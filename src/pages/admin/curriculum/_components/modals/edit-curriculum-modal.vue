<script setup lang="ts">
import { useCourseStore } from '@/stores/course'
import { useCurriculumStore } from '@/stores/curriculum'
import { useSubjectStore } from '@/stores/subject'
import type { Curriculum, Year } from '@/types/curriculum'
import type { Major } from '@/types/major'
import { useToast } from 'primevue'
import { computed, inject, onMounted, reactive, ref, watch, watchEffect } from 'vue'

const toast = useToast()
const courseStore = useCourseStore()
const subjectStore = useSubjectStore()
const curriculumStore = useCurriculumStore()
const dialogRef = inject<any>('dialogRef')
const firstYear = reactive<Year>({ ...dialogRef.value.data.firstYear })
const secondYear = reactive<Year>({ ...dialogRef.value.data.secondYear })
const thirdYear = reactive<Year>({ ...dialogRef.value.data.thirdYear })
const fourthYear = reactive<Year>({ ...dialogRef.value.data.fourthYear })

const curriculum = ref<Curriculum>({
  ...dialogRef.value.data,
})

const major = ref<Major>({
  ...dialogRef.value.data.major,
})

function onClose() {
  dialogRef.value.close()
}

async function onSave() {
  const res = await curriculumStore.addCurriculum(curriculum.value)
  toast.add({
    severity: res.status,
    summary: res.statusMessage,
    detail: res.message,
    life: 3000,
  })
  onClose()
}

onMounted(() => {
  courseStore.getCourses()
  subjectStore.getSubjects()
})

watchEffect(() => {
  subjectStore.getFilteredSubject(curriculum.value.course as string)
})

watchEffect(() => console.log(firstYear))
</script>

<template>
  <div class="grid gap-4 text-base md:text-lg">
    <!-- Course Name -->
    <div class="flex flex-col gap-4">
      <label for="course" class="block text-gray-700 dark:text-white"> Name </label>
      <InputText
        id="course"
        v-model="curriculum.name"
        required
        autofocus
        class="w-full rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
      />
      <div class="flex gap-4 w-full">
        <div class="flex-1">
          <label for="course" class="block text-gray-700 dark:text-white"> Course </label>
          <InputText
            option-label="name"
            v-model="curriculum.course.name"
            placeholder="Select a course"
            class="w-full"
            :loading="courseStore.isLoading"
            disabled
          />
        </div>
        <div class="flex-1">
          <label for="course" class="block text-gray-700 dark:text-white"> Major </label>
          <InputText
            v-model="major.name"
            editable
            placeholder="No majors associated"
            class="w-full"
            :loading="courseStore.isLoading"
            disabled
          />
        </div>
      </div>
      <div>
        <label class="block bg-red-800 text-white px-2"> First year </label>
        <div class="flex gap-4">
          <div class="flex-1">
            <label class="block text-gray-700 dark:text-white"> First semester </label>
            <MultiSelect
              v-model="firstYear.first"
              :loading="subjectStore.isLoading"
              optionLabel="code"
              optionValue="uid"
              placeholder="Select a subjects"
              class="w-full"
            />
          </div>
          <div class="flex-1">
            <label class="block text-gray-700 dark:text-white"> Second semester </label>
            <MultiSelect
              v-model="firstYear.second"
              optionLabel="code"
              optionValue="uid"
              :loading="subjectStore.isLoading"
              placeholder="Select a subjects"
              class="w-full"
            />
          </div>
        </div>
      </div>
      <div>
        <label class="block bg-red-800 text-white px-2"> Second year </label>
        <div class="flex gap-4">
          <div class="flex-1">
            <label class="block text-gray-700 dark:text-white"> First semester </label>
            <MultiSelect
              option-label="code"
              v-model="secondYear.first"
              editable
              placeholder="Select a subjects"
              class="w-full"
            />
          </div>
          <div class="flex-1">
            <label class="block text-gray-700 dark:text-white"> Second semester </label>
            <MultiSelect
              option-label="code"
              v-model="secondYear.second"
              editable
              placeholder="Select a subjects"
              class="w-full"
            />
          </div>
        </div>
      </div>
      <div>
        <label class="block bg-red-800 text-white px-2"> Third year </label>
        <div class="flex gap-4">
          <div class="flex-1">
            <label class="block text-gray-700 dark:text-white"> First semester </label>
            <MultiSelect
              option-label="code"
              v-model="thirdYear.first"
              editable
              placeholder="Select a subjects"
              class="w-full"
            />
          </div>
          <div class="flex-1">
            <label class="block text-gray-700 dark:text-white"> Second semester </label>
            <MultiSelect
              option-label="code"
              v-model="thirdYear.second"
              editable
              placeholder="Select a subjects"
              class="w-full"
            />
          </div>
        </div>
      </div>
      <div>
        <label class="block bg-red-800 text-white px-2"> Fourth year </label>
        <div class="flex gap-4">
          <div class="flex-1">
            <label class="block text-gray-700 dark:text-white"> First semester </label>
            <MultiSelect
              option-label="code"
              v-model="fourthYear.first"
              editable
              placeholder="Select a subjects"
              class="w-full"
            />
          </div>
          <div class="flex-1">
            <label class="block text-gray-700 dark:text-white"> Second semester </label>
            <MultiSelect
              option-label="code"
              v-model="fourthYear.second"
              editable
              placeholder="Select a subjects"
              class="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Buttons -->
  <div class="flex justify-end mt-4 gap-2">
    <Button label="Cancel" icon="pi pi-times" text @click="onClose" />
    <Button
      label="Save"
      icon="pi pi-check"
      severity="success"
      @click="onSave"
      :loading="curriculumStore.isLoading"
    />
  </div>
</template>

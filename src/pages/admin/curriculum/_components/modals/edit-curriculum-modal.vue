<script setup lang="ts">
import { useCourseStore } from '@/stores/course'
import { useCurriculumStore } from '@/stores/curriculum'
import { useSubjectStore } from '@/stores/subject'
import type { Curriculum, Year } from '@/types/curriculum'
import { computed, inject, onMounted, reactive, ref, watch, watchEffect } from 'vue'

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

function onClose() {
  dialogRef.value.close()
}

function onSave() {
  curriculumStore.addCurriculum(curriculum.value)
  onClose()
}

onMounted(() => {
  courseStore.getCourses()
  subjectStore.getSubjects()
})

const filteredMajor = computed(() => {
  return courseStore.courses.find((item) => item.abbreviation == curriculum.value.course)
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
          <Select
            option-label="name"
            v-model="curriculum.course"
            editable
            :options="courseStore.courses"
            optionValue="abbreviation"
            placeholder="Select a course"
            class="w-full"
            :loading="courseStore.isLoading"
          />
        </div>
        <div class="flex-1">
          <label for="course" class="block text-gray-700 dark:text-white"> Major </label>
          <Select
            v-model="curriculum.major"
            editable
            :options="filteredMajor?.majors"
            placeholder="Select a major"
            class="w-full"
            :loading="courseStore.isLoading"
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
              :options="subjectStore.filteredSubjects"
              :loading="subjectStore.isLoading"
              optionLabel="code"
              :maxSelectedLabels="3"
              filter
              placeholder="Select a subjects"
              class="w-full"
            />
          </div>
          <div class="flex-1">
            <label class="block text-gray-700 dark:text-white"> Second semester </label>
            <MultiSelect
              v-model="firstYear.second"
              optionLabel="code"
              :maxSelectedLabels="3"
              filter
              :options="subjectStore.filteredSubjects"
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
              optionLabel="code"
              :maxSelectedLabels="3"
              filter
              v-model="secondYear.first"
              :options="subjectStore.filteredSubjects"
              placeholder="Select a subjects"
              class="w-full"
            />
          </div>
          <div class="flex-1">
            <label class="block text-gray-700 dark:text-white"> Second semester </label>
            <MultiSelect
              optionLabel="code"
              :maxSelectedLabels="3"
              filter
              v-model="secondYear.second"
              :options="subjectStore.filteredSubjects"
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
              optionLabel="code"
              :maxSelectedLabels="3"
              filter
              v-model="thirdYear.first"
              :options="subjectStore.filteredSubjects"
              placeholder="Select a subjects"
              class="w-full"
            />
          </div>
          <div class="flex-1">
            <label class="block text-gray-700 dark:text-white"> Second semester </label>
            <MultiSelect
              optionLabel="code"
              :maxSelectedLabels="3"
              filter
              v-model="thirdYear.second"
              :options="subjectStore.filteredSubjects"
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
              optionLabel="code"
              :maxSelectedLabels="3"
              filter
              v-model="fourthYear.first"
              :options="subjectStore.filteredSubjects"
              placeholder="Select a subjects"
              class="w-full"
            />
          </div>
          <div class="flex-1">
            <label class="block text-gray-700 dark:text-white"> Second semester </label>
            <MultiSelect
              optionLabel="code"
              :maxSelectedLabels="3"
              filter
              v-model="fourthYear.second"
              :options="subjectStore.filteredSubjects"
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

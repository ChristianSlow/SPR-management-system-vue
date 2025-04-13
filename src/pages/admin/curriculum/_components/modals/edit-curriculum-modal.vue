<script setup lang="ts">
import { inject, ref } from 'vue'
import { useCourseStore } from '@/stores/course'

const dialogRef = inject<any>('dialogRef')
const courseStore = useCourseStore()

const originalCourse = dialogRef.value.data.course

const courseName = ref(originalCourse.name)
const majors = ref([...originalCourse.majors])
const newMajor = ref('')

function onClose() {
  dialogRef.value.close()
}

function addMajor() {
  const trimmed = newMajor.value.trim()
  if (trimmed && !majors.value.includes(trimmed.toUpperCase())) {
    majors.value.push(trimmed.toUpperCase())
    newMajor.value = ''
  }
}

function removeMajor(index: number) {
  majors.value.splice(index, 1)
}

function onSave() {
  const index = courseStore.courses.findIndex((c) => c.name === originalCourse.name)
  if (index !== -1) {
    courseStore.courses[index].name = courseName.value.trim().toUpperCase()
    courseStore.courses[index].majors = majors.value
  }
  onClose()
}
</script>

<template>
  <div class="grid gap-4 text-base md:text-lg">
    <div>
      <label for="course" class="block font-semibold text-gray-700 dark:text-white">
        Course Name
      </label>
      <InputText
        id="course"
        v-model="courseName"
        required
        autofocus
        class="w-full rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
      />
    </div>

    <div>
      <label class="block font-semibold text-gray-700 dark:text-white">Majors</label>
      <ul class="bg-gray-100 dark:bg-gray-700 p-2 rounded-md">
        <li
          v-for="(major, index) in majors"
          :key="index"
          class="flex items-center justify-between bg-white dark:bg-gray-800 p-3 rounded-md shadow-sm mb-2"
        >
          <span class="flex-1">{{ major }}</span>
          <Button
            icon="pi pi-trash"
            severity="danger"
            text
            class="p-button-md"
            @click="removeMajor(index)"
          />
        </li>
      </ul>
    </div>

    <div class="flex items-center gap-2">
      <InputText
        v-model="newMajor"
        placeholder="Add new major..."
        class="flex-1 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
      />
      <Button
        label="Add"
        icon="pi pi-plus"
        severity="primary"
        class="p-button-md"
        @click="addMajor"
      />
    </div>

    <div class="flex justify-end gap-2 mt-4">
      <Button label="Cancel" icon="pi pi-times" text class="p-button-md" @click="onClose" />
      <Button
        label="Save"
        icon="pi pi-check"
        severity="success"
        class="p-button-md"
        @click="onSave"
      />
    </div>
  </div>
</template>

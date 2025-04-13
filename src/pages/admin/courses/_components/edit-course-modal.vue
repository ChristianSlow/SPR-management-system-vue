<script setup lang="ts">
import { inject, reactive, ref } from 'vue'
import { useCourseStore } from '@/stores/course'
import type { Course } from '@/types/course'

const dialogRef = inject<any>('dialogRef')
const store = useCourseStore()

const props = dialogRef.value.data

const major = ref('')
const course = reactive<Course>({
  ...props,
})

function onClose() {
  dialogRef.value.close()
}

function addMajor() {
  course.majors?.push(major.value.trim().toLowerCase())
  major.value = ''
}

function removeMajor(index: number) {
  course.majors?.splice(index, 1)
}

function onSave() {
  store.editCourse(course)
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
        v-model="course.name"
        required
        autofocus
        class="w-full rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
      />
    </div>

    <div>
      <label for="course" class="block font-semibold text-gray-700 dark:text-white">
        Abbreviation
      </label>
      <InputText
        id="course"
        v-model="course.abbreviation"
        required
        autofocus
        class="w-full rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
      />
    </div>

    <div>
      <label class="block font-semibold text-gray-700 dark:text-white">Majors</label>
      <ul class="bg-gray-100 dark:bg-gray-700 p-2 rounded-md">
        <li
          v-for="(major, index) in course.majors"
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
        v-model="major"
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
        :loading="store.isLoading"
        @click="onSave"
      />
    </div>
  </div>
</template>

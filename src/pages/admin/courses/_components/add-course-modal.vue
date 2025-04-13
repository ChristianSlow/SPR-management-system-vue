<script setup lang="ts">
import { inject, reactive, ref } from 'vue'
import { useCourseStore } from '@/stores/course'
import type { Course } from '@/types/course'

const dialogRef = inject<any>('dialogRef')
const store = useCourseStore()

const majorInput = ref('')
const course = reactive<Course>({
  name: '',
  abbreviation: '',
  majors: [],
})

function addMajor() {
  course.majors?.push(majorInput.value.toLowerCase().trim())
  majorInput.value = ''
}

function removeMajor(index: number) {
  course.majors?.splice(index, 1)
}

function onClose() {
  dialogRef.value.close()
}

function onSave() {
  if (!course.name?.trim()) return
  store.addCourse(course)
  onClose()
}
</script>

<template>
  <div class="grid gap-4 text-base md:text-lg">
    <!-- Course Name -->
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

    <!-- Majors List -->
    <div>
      <label class="block font-semibold text-gray-700 dark:text-white">Majors</label>
      <ul class="bg-gray-100 dark:bg-gray-700 p-2 rounded-md">
        <li
          v-for="(major, index) in course.majors"
          :key="index"
          class="flex items-center justify-between bg-white dark:bg-gray-800 p-3 rounded-md shadow-sm mb-2"
        >
          <span>{{ major }}</span>
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

    <!-- Add New Major -->
    <div class="flex items-center gap-2">
      <InputText
        v-model="majorInput"
        placeholder="Add new major..."
        class="flex-1 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
      />
      <Button label="Add" icon="pi pi-plus" @click="addMajor" class="p-button-md" />
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
      :loading="store.isLoading"
    />
  </div>
</template>

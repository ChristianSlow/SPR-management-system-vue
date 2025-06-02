<script setup lang="ts">
import { inject, reactive, ref } from 'vue'
import { useCourseStore } from '@/stores/course'
import type { Course } from '@/types/course'
import { useToast } from 'primevue'

const dialogRef = inject<any>('dialogRef')
const store = useCourseStore()
const toast = useToast()

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

async function onSave() {
  if (!course.name?.trim()) return
  const res = await store.addCourse(course)
  toast.add({
    severity: res.status,
    summary: res.statusMessage,
    detail: res.message,
    life: 3000,
  })
  onClose()
}
</script>

<template>
  <div class="grid gap-4 text-base md:text-lg">
    <!-- Course Name -->
    <div class="flex gap-4">
      <div class="flex-1">
        <label for="course" class="block text-gray-700 dark:text-white"> Course name </label>
        <InputText
          placeholder="Enter course"
          id="course"
          v-model="course.name"
          required
          autofocus
          class="w-full rounded-md text-gray-900 dark:text-white"
        />
      </div>
      <div class="flex-1">
        <label for="abbreviation" class="block text-gray-700 dark:text-white"> Abbreviation </label>
        <InputText
          placeholder="Enter abbreviation"
          id="abbreviation"
          v-model="course.abbreviation"
          required
          autofocus
          class="w-full rounded-md text-gray-900 dark:text-white"
        />
      </div>
    </div>

    <!-- Majors List -->
    <div>
      <label class="block font-semibold bg-red-800 px-2 text-white">Majors</label>
      <ul
        class="bg-gray-100 dark:bg-gray-700 p-2 rounded-md"
        v-if="(course.majors?.length ?? 0) > 0"
      >
        <li
          v-for="(major, index) in course.majors"
          :key="index"
          class="flex items-center justify-between bg-white px-3 rounded-md shadow-sm mb-2"
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
      <div v-else>No majors added.</div>
    </div>

    <!-- Add New Major -->
    <div class="flex items-center gap-2">
      <InputText
        v-model="majorInput"
        placeholder="Add new major..."
        class="flex-1 rounded-md text-gray-900 dark:text-white"
      />
      <Button label="Add" icon="pi pi-plus" @click="addMajor" class="p-button-md" />
    </div>
  </div>

  <!-- Buttons -->
  <div class="flex justify-end mt-4 gap-2">
    <Button label="Cancel" severity="danger" icon="pi pi-times" text @click="onClose" />
    <Button
      label="Save"
      icon="pi pi-check"
      severity="success"
      @click="onSave"
      :loading="store.isLoading"
    />
  </div>
</template>

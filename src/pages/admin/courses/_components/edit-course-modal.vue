<script setup lang="ts">
import { inject, reactive, ref } from 'vue'
import { useCourseStore } from '@/stores/course'
import type { Course } from '@/types/course'
import { useToast } from 'primevue'

const dialogRef = inject<any>('dialogRef')
const store = useCourseStore()
const toast = useToast()
const props = dialogRef.value.data

const major = ref('')
const course = reactive<Course>({
  ...props,
  majors: props.majors ?? [],
})

function onClose() {
  dialogRef.value.close()
}

function addMajor() {
  course.majors?.push({ name: major.value.toLowerCase().trim() })
  major.value = ''
}

function removeMajor(index: number) {
  course.majors?.splice(index, 1)
}

async function onSave() {
  const res = await store.editCourse(course.id as string, course)
  console.log(res)
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
          <span>{{ major.name }}</span>
          <Button
            icon="pi pi-trash"
            severity="danger"
            text
            class="p-button-md"
            @click="removeMajor(index)"
          />
        </li>
      </ul>
      <div v-else>No majors found.</div>
    </div>

    <div class="flex items-center gap-2">
      <InputText
        v-model="major"
        placeholder="Add new major..."
        class="flex-1 rounded-md text-gray-900 dark:text-white"
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

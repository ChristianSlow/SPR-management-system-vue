<script setup lang="ts">
import { inject } from 'vue'
import { useCourseStore } from '@/stores/course'

const dialogRef = inject<any>('dialogRef')
const curriculum = dialogRef.value.data

const courseStore = useCourseStore()
const course = courseStore.courses.find((c) => c.abbreviation === curriculum.course)
</script>

<template>
  <div class="grid gap-4 text-base md:text-lg">
    <!-- Curriculum Name -->
    <div class="flex flex-col gap-4">
      <div>
        <label class="block text-gray-700 dark:text-white font-bold">Name:</label>
        <p class="text-gray-900 dark:text-white">{{ curriculum.name }}</p>
      </div>

      <!-- Course and Major -->
      <div class="flex gap-4 w-full">
        <div class="flex-1">
          <label class="block text-gray-700 dark:text-white font-bold">Course:</label>
          <p class="text-gray-900 dark:text-white">{{ course?.name || curriculum.course }}</p>
        </div>
        <div class="flex-1">
          <label class="block text-gray-700 dark:text-white font-bold">Major:</label>
          <p class="text-gray-900 dark:text-white">{{ curriculum.major || '—' }}</p>
        </div>
      </div>

      <!-- Yearly Breakdown -->
      <template
        v-for="(yearData, index) in ['firstYear', 'secondYear', 'thirdYear', 'fourthYear']"
        :key="index"
      >
        <div>
          <label class="block bg-red-800 text-white px-2 capitalize">
            {{ yearData.replace('Year', ' year') }}
          </label>
          <div class="flex gap-4">
            <div class="flex-1">
              <label class="block text-gray-700 dark:text-white font-bold">First semester:</label>
              <ul class="list-disc list-inside text-gray-900 dark:text-white">
                <li v-for="uid in curriculum[yearData]?.first || []" :key="uid">
                  {{ uid }}
                </li>
              </ul>
            </div>
            <div class="flex-1">
              <label class="block text-gray-700 dark:text-white font-bold">Second semester:</label>
              <ul class="list-disc list-inside text-gray-900 dark:text-white">
                <li v-for="uid in curriculum[yearData]?.second || []" :key="uid">
                  {{ uid }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>

  <!-- Buttons -->
  <div class="flex justify-end mt-4 gap-2">
    <Button label="Close" icon="pi pi-times" text @click="dialogRef.value.close()" />
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import { useCourseStore } from '@/stores/course'

const dialogRef = inject<any>('dialogRef')
const curriculum = dialogRef.value.data

const courseStore = useCourseStore()
const course = courseStore.courses.find((c) => c.abbreviation === curriculum.course)
</script>

<template>
  <div class="p-4 bg-white rounded shadow-md space-y-4">
    <div v-if="curriculum.name" class="capitalize">
      <strong>Name:</strong> {{ curriculum.name }}
    </div>
    <div v-if="curriculum.course" class="capitalize">
      <strong>Course:</strong> {{ course?.name || curriculum.course }}
    </div>
    <div v-if="curriculum.major" class="capitalize">
      <strong>Major:</strong> {{ curriculum.major }}
    </div>

    <div v-if="curriculum.firstYear">
      <h3 class="font-semibold mt-3">First Year</h3>
      <div class="p-4 border rounded-md">
        <label>First Semester</label>
        <pre
          class="bg-gray-100 p-2 rounded"
          v-for="item in curriculum.firstYear.first"
          :key="item"
          >{{ item }}</pre
        >
        <label>Second Semester</label>
        <pre
          class="bg-gray-100 p-2 rounded"
          v-for="item in curriculum.firstYear.second"
          :key="item"
          >{{ item }}</pre
        >
      </div>
    </div>
    <div v-if="curriculum.secondYear">
      <h3 class="font-semibold mt-3">Second Year</h3>
      <div class="p-4 border rounded-md">
        <label>First Semester</label>
        <pre
          class="bg-gray-100 p-2 rounded"
          v-for="item in curriculum.secondYear.first"
          :key="item"
          >{{ item }}</pre
        >
        <label>Second Semester</label>
        <pre
          class="bg-gray-100 p-2 rounded"
          v-for="item in curriculum.secondYear.second"
          :key="item"
          >{{ item }}</pre
        >
      </div>
    </div>
    <div v-if="curriculum.thirdYear">
      <h3 class="font-semibold mt-3">Third Year</h3>
      <div class="p-4 border rounded-md">
        <label>First Semester</label>
        <pre
          class="bg-gray-100 p-2 rounded"
          v-for="item in curriculum.thirdYear.first"
          :key="item"
          >{{ item }}</pre
        >
        <label>Second Semester</label>
        <pre
          class="bg-gray-100 p-2 rounded"
          v-for="item in curriculum.thirdYear.second"
          :key="item"
          >{{ item }}</pre
        >
      </div>
    </div>
    <div v-if="curriculum.fourthYear">
      <h3 class="font-semibold mt-3">Fourth Year</h3>
      <div class="p-4 border rounded-md">
        <label>First Semester</label>
        <pre
          class="bg-gray-100 p-2 rounded"
          v-for="item in curriculum.fourthYear.first"
          :key="item"
          >{{ item }}</pre
        >
        <label>Second Semester</label>
        <pre
          class="bg-gray-100 p-2 rounded"
          v-for="item in curriculum.fourthYear.second"
          :key="item"
          >{{ item }}</pre
        >
      </div>
    </div>

    <div v-if="curriculum.createdAt">
      <strong>Created At:</strong> {{ new Date(curriculum.createdAt).toLocaleString() }}
    </div>

    <!-- Buttons -->
    <div class="flex justify-end mt-4 gap-2">
      <Button label="Close" icon="pi pi-times" text @click="dialogRef.value.close()" />
    </div>
  </div>
</template>

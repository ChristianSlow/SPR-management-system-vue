<script setup lang="ts">
import { inject } from 'vue'
import { useCourseStore } from '@/stores/course'

const dialogRef = inject<any>('dialogRef')
const curriculum = dialogRef.value.data

const courseStore = useCourseStore()
const course = courseStore.courses.find((c) => c.abbreviation === curriculum.course)
</script>

<template>
  <div class="p-4 bg-white rounded space-y-4">
    <div>
      <div v-if="curriculum.name" class="capitalize">
        <strong>Name:</strong> {{ curriculum.name }}
      </div>
      <div v-if="curriculum.course" class="capitalize">
        <strong>Course:</strong> {{ course?.name || curriculum.course }}
      </div>
      <div v-if="curriculum.major" class="capitalize">
        <strong>Major:</strong> {{ curriculum.major }}
      </div>
    </div>

    <div v-if="curriculum.firstYear">
      <h3 class="font-semibold mt-3 bg-red-800 text-white px-2">First Year</h3>
      <div class="p-4 border rounded-md">
        <label>First Semester</label>
        <div
          class="bg-gray-100 p-2 rounded"
          v-for="item in curriculum.firstYear.first"
          :key="item"
          v-if="curriculum.firstYear.first.length > 0"
        >
          <div class="border bg-white p-2 rounded-sm">
            <span>Code: {{ item.code }}</span
            ><br />
            <span>Name: {{ item.name }}</span
            ><br />
            <span>Unit: {{ item.unit }}</span>
          </div>
        </div>
        <div class="bg-gray-100 p-2 rounded" v-else>no subjects found.</div>
        <label>Second Semester</label>
        <div
          class="bg-gray-100 p-2 rounded"
          v-for="item in curriculum.firstYear.first"
          :key="item"
          v-if="curriculum.firstYear.second.length > 0"
        >
          <div class="border bg-white p-2 rounded-sm">
            <span>Code: {{ item.code }}</span
            ><br />
            <span>Name: {{ item.name }}</span
            ><br />
            <span>Unit: {{ item.unit }}</span>
          </div>
        </div>
        <div class="bg-gray-100 p-2 rounded" v-else>no subjects found.</div>
      </div>
    </div>
    <div v-if="curriculum.secondYear">
      <h3 class="font-semibold mt-3 bg-red-800 text-white px-2">Second Year</h3>
      <div class="p-4 border rounded-md">
        <label>First Semester</label>
        <div
          class="bg-gray-100 p-2 rounded"
          v-for="item in curriculum.secondYear.first"
          :key="item"
          v-if="curriculum.secondYear.first.length > 0"
        >
          <div class="border bg-white p-2 rounded-sm">
            <span>Code: {{ item.code }}</span
            ><br />
            <span>Name: {{ item.name }}</span
            ><br />
            <span>Unit: {{ item.unit }}</span>
          </div>
        </div>
        <div class="bg-gray-100 p-2 rounded" v-else>no subjects found.</div>
        <label>Second Semester</label>
        <div
          class="bg-gray-100 p-2 rounded"
          v-for="item in curriculum.secondYear.first"
          :key="item"
          v-if="curriculum.secondYear.second.length > 0"
        >
          <div class="border bg-white p-2 rounded-sm">
            <span>Code: {{ item.code }}</span
            ><br />
            <span>Name: {{ item.name }}</span
            ><br />
            <span>Unit: {{ item.unit }}</span>
          </div>
        </div>
        <div class="bg-gray-100 p-2 rounded" v-else>no subjects found.</div>
      </div>
    </div>
    <div v-if="curriculum.thirdYear">
      <h3 class="font-semibold mt-3 bg-red-800 text-white px-2">Third Year</h3>
      <div class="p-4 border rounded-md">
        <label>First Semester</label>
        <div
          class="bg-gray-100 p-2 rounded"
          v-for="item in curriculum.thirdYear.first"
          :key="item"
          v-if="curriculum.thirdYear.first.length > 0"
        >
          <div class="border bg-white p-2 rounded-sm">
            <span>Code: {{ item.code }}</span
            ><br />
            <span>Name: {{ item.name }}</span
            ><br />
            <span>Unit: {{ item.unit }}</span>
          </div>
        </div>
        <div class="bg-gray-100 p-2 rounded" v-else>no subjects found.</div>
        <label>Second Semester</label>
        <div
          class="bg-gray-100 p-2 rounded"
          v-for="item in curriculum.thirdYear.first"
          :key="item"
          v-if="curriculum.thirdYear.second.length > 0"
        >
          <div class="border bg-white p-2 rounded-sm">
            <span>Code: {{ item.code }}</span
            ><br />
            <span>Name: {{ item.name }}</span
            ><br />
            <span>Unit: {{ item.unit }}</span>
          </div>
        </div>
        <div class="bg-gray-100 p-2 rounded" v-else>no subjects found.</div>
      </div>
    </div>
    <div v-if="curriculum.fourthYear">
      <h3 class="font-semibold mt-3 bg-red-800 text-white px-2">Fourth Year</h3>
      <div class="p-4 border rounded-md">
        <label>First Semester</label>
        <div
          class="bg-gray-100 p-2 rounded"
          v-for="item in curriculum.fourthYear.first"
          :key="item"
          v-if="curriculum.fourthYear.first.length > 0"
        >
          <div class="border bg-white p-2 rounded-sm">
            <span>Code: {{ item.code }}</span
            ><br />
            <span>Name: {{ item.name }}</span
            ><br />
            <span>Unit: {{ item.unit }}</span>
          </div>
        </div>
        <div class="bg-gray-100 p-2 rounded" v-else>no subjects found.</div>
        <label>Second Semester</label>
        <div
          class="bg-gray-100 p-2 rounded"
          v-for="item in curriculum.fourthYear.first"
          :key="item"
          v-if="curriculum.fourthYear.second.length > 0"
        >
          <div class="border bg-white p-2 rounded-sm">
            <span>Code: {{ item.code }}</span
            ><br />
            <span>Name: {{ item.name }}</span
            ><br />
            <span>Unit: {{ item.unit }}</span>
          </div>
        </div>
        <div class="bg-gray-100 p-2 rounded" v-else>no subjects found.</div>
      </div>
    </div>

    <!-- Buttons -->
    <div class="flex justify-end mt-4 gap-2">
      <Button label="Close" icon="pi pi-times" text @click="dialogRef.value.close()" />
    </div>
  </div>
</template>

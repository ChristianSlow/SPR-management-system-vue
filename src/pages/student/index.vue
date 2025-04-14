<script setup lang="ts">
import { useStudentStore } from '@/stores/student'
import { onMounted, ref } from 'vue'
import { getCurrentUser } from 'vuefire'

const products = ref()
const store = useStudentStore()

onMounted(async () => {
  const user = await getCurrentUser()
  await store.getStudent(user?.uid ?? '')
  console.log(store.student)
})
</script>
<template>
  <div class="p-1 bg-white min-h-screen w-full">
    <div class="rounded-lg p-1 w-full max-w-4xl">
      <!-- Header with Download Button -->
      <div class="flex justify-end items-center mb-4">
        <!-- <h2 class="text-lg font-semibold text-gray-800">Subject List</h2> -->
        <Button
          label="Download"
          icon="pi pi-download"
          class="p-button-sm custom-download-button transition-transform hover:scale-105"
        />
      </div>
    </div>
    <div>
      <div class="text-center mb-6">
        <img class="mx-auto" width="80" height="80" src="/tlogo.png" alt="Tañon College Logo" />
        <h1 class="text-red-800 text-xl font-bold">TAÑON COLLEGE</h1>
        <h2 class="text-gray-900 font-bold text-md">OFFICE OF THE REGISTRAR AND ADMISSIONS</h2>
        <p class="text-gray-900 text-sm">San Carlos City, Negros Occidental</p>
      </div>
      <div class="flex justify-between px-5">
        <h2 class="text-lg font-bold text-black text-center">
          Name: {{ store.student.firstName }} {{ store.student.middleName }}
          {{ store.student.lastName }}
        </h2>
        <h2 class="text-lg font-bold text-black text-center mb-4">
          Year: {{ store.student.year }}
        </h2>
      </div>
      <div class="flex justify-between px-5">
        <h2 class="text-xl font-bold text-gray-900 text-center">
          Course: {{ store.student.course }}
        </h2>
        <h2 class="text-lg font-semibold text-gray-900 text-center mb-3">
          Major: {{ store.student.major }}
        </h2>
      </div>

      <div>
        <div class="flex gap-4 items-start">
          <div class="border p-2 rounded-md flex-1">
            <span>First Semester</span>
            <DataTable :value="store.student.curriculum?.firstYear?.first">
              <template #empty> no subjects found. </template>
              <Column field="code"></Column>
              <Column field="unit"></Column>
              <Column field="name"></Column>
              <Column field="grade" header="Grd"></Column>
            </DataTable>
          </div>
          <div class="border p-2 rounded-md flex-1">
            <span>Second Semester</span>
            <DataTable :value="store.student.curriculum?.firstYear?.second">
              <template #empty> no subjects found. </template>
              <Column field="code"></Column>
              <Column field="unit"></Column>
              <Column field="name"></Column>
              <Column header="Enrolled"></Column>
              <Column header="Grd"></Column>
            </DataTable>
          </div>
        </div>

        <div class="text-right font-semibold text-md mt-6 p-4 bg-gray-200 rounded-lg">
          Total Units: <span class="text-blue-600">Total Units</span>
        </div>
      </div>
    </div>
    <div class="flex justify-center mt-6">
      <Button
        label="Enroll"
        icon="pi pi-sign-out"
        class="p-button-sm p-button-danger transition-transform hover:scale-105"
      />
    </div>
    <!-- Logout Button (Now Below the Content) -->
    <div class="flex justify-center mt-6">
      <Button
        label="Logout"
        icon="pi pi-sign-out"
        class="p-button-sm p-button-danger transition-transform hover:scale-105"
      />
    </div>
  </div>
</template>

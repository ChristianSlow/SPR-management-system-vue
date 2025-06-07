<script setup lang="ts">
import { useSubjectStore } from '@/stores/subject'
import { useDialog } from 'primevue'
import StudentTable from './_components/student-table.vue'
</script>

<template>
  <!-- Subjects Table -->
  <div class="bg-white border p-4 rounded-md">
    <h1
      class="text-center text-2xl font-bold bg-red-500 text-white dark:text-white px-5 py-2 border-b border-gray-300 dark:border-gray-600"
    >
      Students
    </h1>
    <div class="pt-2">
      <StudentTable />
    </div>
  </div>
</template>

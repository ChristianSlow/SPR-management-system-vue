<script setup lang="ts">
import { useSubjectStore } from '@/stores/subject'
import { useDialog } from 'primevue'
import CurriculumTable from './_components/curriculum-table.vue'

const dialog = useDialog()
const store = useSubjectStore()
</script>

<template>
  <!-- Subjects Table -->
  <div class="bg-white border p-4 rounded-md">
    <h1
      class="text-center text-2xl font-bold bg-red-500 text-white dark:text-white px-5 py-2 border-b border-gray-300 dark:border-gray-600"
    >
      Curriculum
    </h1>
    <div class="pt-2">
      <CurriculumTable />
    </div>
  </div>
</template>

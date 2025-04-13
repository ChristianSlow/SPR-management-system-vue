<script setup lang="ts">
import courseTable from './_components/course-table.vue'
</script>

<template>
  <div class="bg-white">
    <div class="bg-white border rounded-md p-4">
      <h1
        class="text-center text-2xl font-bold bg-red-500 text-white dark:text-white px-5 py-2 border-b border-gray-300 dark:border-gray-600"
      >
        Course Management
      </h1>
      <div class="pt-2">
        <courseTable />
      </div>
    </div>
  </div>
</template>

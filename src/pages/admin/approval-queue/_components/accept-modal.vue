<script setup lang="ts">
import { inject } from 'vue'

const dialogRef = inject<any>('dialogRef')

function onClose() {
  dialogRef.value.close()
}
</script>

<template>
  <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-11/12 max-w-md">
    <h2 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Student</h2>
    <input />
    <textarea
      rows="4"
      class="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
      placeholder="Enter your message here..."
    ></textarea>
    <div class="flex justify-end mt-4 gap-2">
      <Button label="cancel" @click="onClose" />
      <Button label="accept" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'

const dialogRef = inject<any>('dialogRef')

function onClose() {
  dialogRef.value.close()
}
</script>
<template>
  <div class="space-y-4">
    <div>
      <label class="font-medium text-gray-700 dark:text-gray-300">Subject Code</label>
      <InputText
        class="w-full p-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
      />
    </div>
    <div>
      <label class="font-medium text-gray-700 dark:text-gray-300">Descriptive Title</label>
      <InputText
        class="w-full p-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
      />
    </div>
    <div>
      <label class="font-medium text-gray-700 dark:text-gray-300">Units</label>
      <Dropdown
        optionLabel="label"
        optionValue="value"
        placeholder="Select Units"
        class="w-full p-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
      />
    </div>
  </div>
  <Button label="Cancel" class="p-button-text" @click="onClose" />
  <Button label="Save" class="p-button-primary" @click="onClose" />
</template>

<script setup lang="ts">
import { inject } from 'vue'

const dialogRef = inject<any>('dialogRef')

function onClose() {
  dialogRef.value.close()
}
</script>
<template>
    <div class="grid gap-4 text-base md:text-lg">
      <div>
        <label
          for="course"
          class="block text-base md:text-lg font-semibold text-gray-700 dark:text-white"
          >Course Name</label
        >
        <InputText
          id="course"
          required
          autofocus
          class="w-full p-inputtext-md rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
        />
        <small class="text-red-500">Course is required.</small>
      </div>
      <div>
        <label class="block text-base md:text-lg font-semibold text-gray-700 dark:text-white"
          >Majors</label
        >
        <ul class="bg-gray-100 dark:bg-gray-700 p-2 rounded-md">
          <li
            class="flex items-center justify-between bg-white dark:bg-gray-800 p-3 rounded-md shadow-sm mb-2"
          >
            <InputText
              class="flex-1 text-base md:text-lg p-inputtext-md mr-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <Button icon="pi pi-trash" severity="danger" text class="p-button-md" />
          </li>
        </ul>
      </div>
      <div class="flex items-center gap-2">
        <InputText
          placeholder="Add new major..."
          class="flex-1 p-inputtext-md rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
        />
        <Button label="Add" icon="pi pi-plus" severity="primary" class="p-button-md" />
      </div>
    </div>
    <Button label="Cancel" icon="pi pi-times" text class="p-button-md" @click="onClose" />
    <Button label="Save" icon="pi pi-check" severity="success" class="p-button-md" />
  </template>

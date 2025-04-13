<script setup lang="ts">
import type { Curriculum } from '@/types/curriculum'
import { inject, ref } from 'vue'

const dialogRef = inject<any>('dialogRef')
const curriculum = ref<Curriculum>({})

function onClose() {
  dialogRef.value.close()
}

function onSave() {
  onClose()
}
</script>

<template>
  <div class="grid gap-4 text-base md:text-lg">
    <!-- Course Name -->
    <div>
      <label for="course" class="block font-semibold text-gray-700 dark:text-white">
        Course Name
      </label>
      <InputText
        id="course"
        v-model="curriculum.name"
        required
        autofocus
        class="w-full rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
      />
    </div>
  </div>

  <!-- Buttons -->
  <div class="flex justify-end mt-4 gap-2">
    <Button label="Cancel" icon="pi pi-times" text @click="onClose" />
    <Button label="Save" icon="pi pi-check" severity="success" @click="onSave" />
  </div>
</template>

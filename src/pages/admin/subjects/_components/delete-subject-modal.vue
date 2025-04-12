<script setup lang="ts">
import { inject } from 'vue'

const dialogRef = inject<any>('dialogRef')

function onClose() {
  dialogRef.value.close()
}
</script>
<template>
  <p class="text-gray-900 dark:text-white">Are you sure you want to delete this subject?</p>
  <Button label="No" class="p-button-text" @click="onClose" />
  <Button label="Yes" class="p-button-danger" />
</template>

<script setup lang="ts">
import { inject } from 'vue'

const dialogRef = inject<any>('dialogRef')

function onClose() {
  dialogRef.value.close()
}
</script>
<template>
  <div class="confirmation-content text-center text-lg">
    <i class="pi pi-exclamation-triangle mr-3 text-3xl text-red-500" />
    <span>Are you sure you want to delete <strong>{{}}</strong>?</span>
  </div>
  <Button label="No" icon="pi pi-times" text @click="onClose"/>
  <Button label="Yes" icon="pi pi-check" severity="danger" @click="onClose"/>
</template>

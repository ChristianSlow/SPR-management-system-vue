<script setup lang="ts">
defineProps<{
  image: string
}>()
</script>
<template>
  <div class="card flex justify-center">
    <Image alt="Image" preview>
      <template #previewicon>
        <i class="pi pi-eye"></i>
      </template>
      <template #image>
        <img
          src="https://primefaces.org/cdn/primevue/images/galleria/galleria11.jpg"
          alt="image"
          class="min-w-4"
        />
      </template>
      <template #preview="slotProps">
        <img
          src="https://primefaces.org/cdn/primevue/images/galleria/galleria11.jpg"
          alt="preview"
          :style="slotProps.style"
        />
      </template>
    </Image>
  </div>
</template>

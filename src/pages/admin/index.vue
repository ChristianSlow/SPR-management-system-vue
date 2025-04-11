<script setup lang="ts">
import { Toast } from 'primevue'
import AdminLayout from '@/layouts/admin-layout.vue'
</script>

<template>
  <AdminLayout>
    <Toast position="bottom-right" />
    <RouterView />
  </AdminLayout>
</template>

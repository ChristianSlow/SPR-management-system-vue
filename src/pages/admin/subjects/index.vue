<script setup lang="ts">
import { useSubjectStore } from '@/stores/subject'
import { useDialog } from 'primevue'
import { defineAsyncComponent, onMounted } from 'vue'

const addSubject = defineAsyncComponent(
  () => import('@/pages/admin/subjects/_components/add-subject-modal.vue'),
)

const editSubject = defineAsyncComponent(
  () => import('@/pages/admin/subjects/_components/edit-subject-modal.vue'),
)

const deleteSubject = defineAsyncComponent(
  () => import('@/pages/admin/subjects/_components/delete-subject-modal.vue'),
)

const dialog = useDialog()
const store = useSubjectStore()

onMounted(() => store.getSubjects())
</script>

<template>
  <!-- Subjects Table -->
  <div class="bg-white border p-4 rounded-md">
    <h1
      class="text-center text-2xl font-bold bg-red-500 text-white dark:text-white px-5 py-2 border-b border-gray-300 dark:border-gray-600"
    >
      Subjects
    </h1>
    <div class="pt-2">
      <SubjectTable />
    </div>
  </div>
</template>

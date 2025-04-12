<script setup lang="ts">
import { useSubjectStore } from '@/stores/subject'
import { useDialog } from 'primevue'
import { defineAsyncComponent } from 'vue'

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
</script>
<template>
  <main
    class="md:ml-64 h-auto pt-12 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen"
  >
    <!-- Course & Major Selection -->
    <div class="bg-white dark:bg-gray-800 shadow-md p-4 mb-4">
      <div class="grid md:grid-cols-2 gap-6">
        <div>
          <label class="font-medium text-gray-900 dark:text-gray-300">Course</label>
          <select
            class="w-full mt-1 p-3 border rounded-lg focus:ring-1 focus:ring-black bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
          >
            <option value="" disabled>Select Course</option>
          </select>
        </div>
        <div>
          <label class="font-medium text-gray-900 dark:text-gray-300">Major</label>
          <select
            class="w-full mt-1 p-3 border rounded-lg focus:ring-1 focus:ring-black bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
          >
            <option value="" disabled>Select Major</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Subjects Table -->
    <div class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4">
      <div class="flex justify-between items-center mb-4">
        <h4 class="text-xl font-semibold text-gray-800 dark:text-white">Subjects</h4>
        <Button
          label="Add Subject"
          @click="
            () => {
              dialog.open(addSubject, {
                props: {
                  header: 'Confirm',
                  style: {
                    width: '50vw',
                  },
                  breakpoints: {
                    '960px': '75vw',
                    '640px': '90vw',
                  },
                  modal: true,
                },
              })
            }
          "
        />
      </div>

      <DataTable dataKey="id" class="shadow-sm rounded-lg overflow-hidden" :value="store.subject">
        <Column field="code" header="Subject Code" style="width: 20%" />
        <Column field="name" header="Descriptive Title" style="width: 40%" />
        <Column field="unit" header="Units" style="width: 15%" />
        <Column :exportable="false" style="width: 25%" class="text-right">
          <template #body="slotProps">
            <Button
              icon="pi pi-pencil"
              class="p-button-text p-button-rounded p-button-info"
              @click="
                () => {
                  dialog.open(editSubject, {
                    props: {
                      header: 'Confirm',
                      style: {
                        width: '50vw',
                      },
                      breakpoints: {
                        '960px': '75vw',
                        '640px': '90vw',
                      },
                      modal: true,
                    },
                  })
                }
              "
            />
            <Button
              icon="pi pi-trash"
              class="p-button-text p-button-rounded p-button-danger ml-2"
              @click="
                () => {
                  dialog.open(deleteSubject, {
                    props: {
                      header: 'Confirm',
                      style: {
                        width: '50vw',
                      },
                      breakpoints: {
                        '960px': '75vw',
                        '640px': '90vw',
                      },
                      modal: true,
                    },
                  })
                }
              "
            />
          </template>
        </Column>
      </DataTable>

      <!-- ✅ Total Units Display -->
      <div class="mt-4 flex justify-end">
        <p class="text-lg font-semibold text-gray-800 dark:text-white">Total Units:</p>
      </div>
    </div>

    <!-- Add/Edit Subject Dialog -->
    <AddEditModal />

    <!-- ❌ Delete Confirmation Dialog -->
    <DeleteSubjectModal />
  </main>
</template>

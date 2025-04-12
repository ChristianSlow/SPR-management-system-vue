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
                header: 'Add Subject',
                style: {
                  width: '50vw',
                },
                breakpoints: {
                  '960px': '75vw',
                  '640px': '90vw',
                },
                modal: true,
                closeOnEscape: true,
                draggable: false,
                dismissableMask: true,
              },
            })
          }
        "
      />
    </div>

    <DataTable
      dataKey="id"
      class="shadow-sm rounded-lg overflow-hidden"
      :value="store.subjects"
      :loading="store.isLoading"
    >
      <template #empty><div class="text-center p-8">No subjects found.</div></template>
      <Column field="code" header="Subject Code">
        <template #body="slotProps">
          {{ slotProps.data.code.toUppercase }}
        </template>
      </Column>
      <Column field="name" header="Descriptive Title">
        <template #body="slotProps">
          <div class="capitalize">
            {{ slotProps.data.name }}
          </div>
        </template>
      </Column>
      <Column field="unit" header="Units" />
      <Column :exportable="false" class="text-right">
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
  </div>
</template>

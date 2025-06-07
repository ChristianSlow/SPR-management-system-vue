<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useDialog } from 'primevue'
import { defineAsyncComponent } from 'vue'
import { useStudentStore } from '@/stores/student'

const addStudent = defineAsyncComponent(
  () => import('@/pages/admin/students/_components/modals/add-student-modal.vue'),
)

const deleteStudent = defineAsyncComponent(
  () => import('@/pages/admin/students/_components/modals/delete-student-modal.vue'),
)

const editStudent = defineAsyncComponent(
  () => import('@/pages/admin/students/_components/modals/edit-student-modal.vue'),
)

const viewStudent = defineAsyncComponent(
  () => import('@/pages/admin/students/_components/modals/view-student-modal.vue'),
)

const store = useStudentStore()
const dialog = useDialog()
const dt = ref()

onMounted(() => {
  store.getStudents()
})
</script>

<template>
  <div>
    <div class="card">
      <div class="rounded-sm">
        <DataTable
          ref="dt"
          size="small"
          :loading="store.isLoading"
          :value="store.students"
          dataKey="id"
          :paginator="true"
          :rows="10"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          :rowsPerPageOptions="[5, 10, 25]"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
        >
          <template #header>
            <div class="flex flex-wrap gap-2 items-center justify-between">
              <h4 class="m-0">Total students: {{ store.totalStudents }}</h4>
              <IconField>
                <InputIcon>
                  <i class="pi pi-search" />
                </InputIcon>
                <InputText placeholder="Search..." v-model="store.searchQuery" />
              </IconField>
            </div>
          </template>
          <template #empty>
            <div class="flex items-center justify-center p-4">No student found.</div>
          </template>
          <Column header="Fullname" style="min-width: 16rem">
            <template #body="slotProps">
              <span
                >{{ slotProps.data.lastName }}, {{ slotProps.data.firstName }}
                {{ slotProps.data.middleName }}</span
              >
            </template>
          </Column>
          <Column field="course" header="Course" style="min-width: 10rem"></Column>
          <Column field="year" header="Year" style="min-width: 10rem"></Column>
          <Column :exportable="false" header="Actions">
            <template #body="slotProps">
              <div class="flex gap-1">
                <Button
                  label="View"
                  size="small"
                  icon="pi pi-eye"
                  class="mr-2"
                  @click="
                    () => {
                      dialog.open(viewStudent, {
                        props: {
                          header: 'Student Details',
                          style: { width: '100vw' },
                          breakpoints: { '960px': '75vw', '640px': '90vw' },
                          modal: true,
                        },
                        data: slotProps.data,
                      })
                    }
                  "
                />
                <Button
                  size="small"
                  label="Edit"
                  icon="pi pi-pencil"
                  class="mr-2"
                  @click="
                    () => {
                      dialog.open(editStudent, {
                        props: {
                          header: 'Edit Students',
                          style: { width: '50vw' },
                          breakpoints: { '960px': '75vw', '640px': '90vw' },
                          modal: true,
                        },
                        data: slotProps.data,
                      })
                    }
                  "
                />
                <Button
                  size="small"
                  outlined
                  severity="danger"
                  label="Delete"
                  icon="pi pi-trash"
                  class="mr-2"
                  @click="
                    () => {
                      dialog.open(deleteStudent, {
                        props: {
                          header: 'Confirm Delete',
                          style: { width: '50vw' },
                          breakpoints: { '960px': '75vw', '640px': '90vw' },
                          modal: true,
                        },
                        data: slotProps.data,
                      })
                    }
                  "
                />
              </div>
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>

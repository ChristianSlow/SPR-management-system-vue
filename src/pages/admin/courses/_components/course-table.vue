<script setup lang="ts">
import { useCourseStore } from '@/stores/course'
import { useDialog } from 'primevue'
import { defineAsyncComponent, onMounted, watch } from 'vue'

const addCourse = defineAsyncComponent(
  () => import('@/pages/admin/courses/_components/add-course-modal.vue'),
)

const deleteCourse = defineAsyncComponent(
  () => import('@/pages/admin/courses/_components/delete-course-modal.vue'),
)

const editCourse = defineAsyncComponent(
  () => import('@/pages/admin/courses/_components/edit-course-modal.vue'),
)

const dialog = useDialog()
const store = useCourseStore()

onMounted(() => store.getCourses())
console.log(store.courses)
</script>

<template>
  <div class="card">
    <Toolbar class="mb-6">
      <template #start>
        <InputText type="text" placeholder="Search..." />
      </template>
      <template #end>
        <Button
          label="New"
          icon="pi pi-plus"
          class="mr-2"
          @click="
            () => {
              dialog.open(addCourse, {
                props: {
                  header: 'Add Course',
                  style: { width: '50vw' },
                  breakpoints: { '960px': '75vw', '640px': '90vw' },
                  modal: true,
                },
              })
            }
          "
        />
      </template>
    </Toolbar>
    <div class="border rounded-sm">
      <DataTable size="small" :value="store.courses" :loading="store.isLoading">
        <!-- <template #header>
              <div class="flex flex-wrap gap-2 items-center justify-between">
                <h4 class="m-0">Manage Products</h4>
                <IconField>
                  <InputIcon>
                    <i class="pi pi-search" />
                  </InputIcon>
                  <InputText v-model="filters['global'].value" placeholder="Search..." />
                </IconField>
              </div>
            </template> -->
        <template #empty>
          <div class="flex items-center justify-center p-4">No course found.</div>
        </template>
        <Column field="abbreviation" header="Abbreviation">
          <template #body="slotProps">
            {{ slotProps.data.abbreviation.toUpperCase() }}
          </template>
        </Column>
        <Column field="name" header="Name" style="min-width: 12rem">
          <template #body="slotProps">
            {{ slotProps.data.name.toUpperCase() }}
          </template>
        </Column>
        <Column header="Majors">
          <template #body="sloProps">
            <ul class="bg-gray-100 p-2 rounded-sm max-h-80 overflow-y-scroll">
              <li v-for="major in sloProps.data.majors" :key="major" class="capitalize">
                {{ major.name }}
              </li>
              <li v-if="sloProps.data.majors.length === 0" class="text-gray-500">
                No majors associated
              </li>
            </ul>
          </template></Column
        >
        <Column :exportable="false" header="Actions" style="min-width: 12rem">
          <template #body="slotProps">
            <Button
              size="small"
              label="Edit"
              icon="pi pi-pencil"
              class="mr-2"
              @click="
                () => {
                  dialog.open(editCourse, {
                    props: {
                      header: 'Edit Course',
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
                  dialog.open(deleteCourse, {
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
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

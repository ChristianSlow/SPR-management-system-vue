<script setup lang="ts">
import { useCourseStore } from '@/stores/course'
import { useDialog } from 'primevue'
import { defineAsyncComponent, onMounted } from 'vue'

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
</script>

<template>
  <div>
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
          <Column field="abbreviation" header="Abbreviation" style="min-width: 16rem">
            <template #body="slotProps">
              {{ slotProps.data.abbreviation.toUpperCase() }}
            </template>
          </Column>
          <Column field="name" header="Name" style="min-width: 12rem">
            <template #body="slotProps">
              {{ slotProps.data.name.toUpperCase() }}
            </template>
          </Column>
          <Column field="majors" header="Majors" style="min-width: 16rem"></Column>
          <Column :exportable="false" header="Actions" style="min-width: 12rem">
            <template #body="slotProps">
              <Button
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
                    })
                  }
                "
              />
              <Button
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
                    })
                  }
                "
              />
              <Button icon="pi pi-trash" outlined rounded severity="danger" />
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>

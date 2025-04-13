<script setup lang="ts">
import { useCourseStore } from '@/stores/course'
import { useDialog } from 'primevue'
import { defineAsyncComponent } from 'vue'

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
</script>

<template>
  <div class="bg-white">
    <div class="bg-white border rounded-md p-4">
      <div
        class="card bg-white dark:bg-gray-800 p-2 md:p-3 shadow-md border border-gray-200 dark:border-gray-700"
      >
        <!-- 🔹 Toolbar Section -->
        <Toolbar
          class="mb-4 md:mb-6 flex flex-col md:flex-row gap-4 md:gap-0 items-start md:items-center"
        >
          <template #start>
            <Button
              label="Add Course"
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

          <template #center>
            <h1
              class="m-0 text-lg md:text-xl font-semibold text-gray-700 dark:text-white tracking-wide text-center md:text-left"
            >
              Courses Management
            </h1>
          </template>

          <template #end>
            <Button
              label="Export"
              icon="pi pi-upload"
              class="w-full md:w-auto"
              severity="secondary"
            />
          </template>
        </Toolbar>

        <!-- 🔹 Data Table -->
        <DataTable
          :value="store.courses"
          ref="dt"
          :rows="10"
          paginator
          :rowsPerPageOptions="[5, 10, 25]"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} courses"
          class="p-datatable-striped p-datatable-hoverable-rows text-base md:text-lg"
          responsiveLayout="scroll"
        >
          <!-- Course Name -->
          <Column field="name" header="Course" sortable style="min-width: 12rem" />

          <!-- Majors List -->
          <Column header="Majors" style="min-width: 14rem">
            <template #body="slotProps">
              <ul class="text-gray-600 dark:text-gray-300 text-base md:text-lg list-disc pl-3">
                <li v-for="major in slotProps.data.majors" :key="major">{{ major }}</li>
              </ul>
            </template>
          </Column>

          <!-- Actions Column -->
          <Column :exportable="false" style="min-width: 8rem; text-align: center">
            <template #body="slotProps">
              <Button
                icon="pi pi-pencil"
                class="mr-2"
                @click="
                  () => {
                    dialog.open(editCourse, {
                      data: { course: slotProps.data },
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
                icon="pi pi-trash"
                severity="danger"
                @click="
                  () => {
                    dialog.open(deleteCourse, {
                      data: { course: slotProps.data },
                      props: {
                        header: 'Delete Course',
                        style: { width: '40vw' },
                        breakpoints: { '960px': '75vw', '640px': '90vw' },
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
    </div>
  </div>
</template>

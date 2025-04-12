<script setup lang="ts">
import { useDialog } from 'primevue'
import { defineAsyncComponent } from 'vue'

const addCourse = defineAsyncComponent(
  () => import('@/pages/admin/courses/_components/add-course-modal.vue'),
)

const dialog = useDialog()
</script>

<template>
  <main
    class="md:ml-64 h-auto pt-14 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white text-base md:text-lg"
  >
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
        ref="dt"
        :rows="10"
        paginator
        :rowsPerPageOptions="[5, 10, 25]"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} courses"
        class="p-datatable-striped p-datatable-hoverable-rows text-base md:text-lg"
        responsiveLayout="scroll"
      >
        <!-- Course Name -->
        <Column field="course" header="Course" sortable style="min-width: 12rem"></Column>

        <!-- Majors List -->
        <Column header="Majors" style="min-width: 14rem">
          <template #body="slotProps">
            <ul class="text-gray-600 dark:text-gray-300 text-base md:text-lg list-disc pl-3">
              <li v-for="major in slotProps.data.majors" :key="major">{{ major }}</li>
            </ul>
          </template>
        </Column>

        <!-- Status Column
              <Column header="Status" style="min-width: 8rem">
                  <template #body="slotProps">
                      <Tag :value="slotProps.data.inventoryStatus" :severity="getStatusLabel(slotProps.data.inventoryStatus)" class="px-2 py-1 text-base md:text-lg font-medium" />
                  </template>
              </Column> -->

        <!-- Actions Column -->
        <Column :exportable="false" style="min-width: 8rem; text-align: center">
          <template #body="slotProps">
            <Button icon="pi pi-pencil" outlined rounded class="mr-2 p-button-md p-button-text" />
            <Button
              icon="pi pi-trash"
              outlined
              rounded
              severity="danger"
              class="p-button-md p-button-text"
            />
          </template>
        </Column>
      </DataTable>
    </div>

    <!-- 🔹 Course Dialog -->

    <!-- 🔹 Delete Course Dialog -->
    <DeleteCourseModal />
  </main>
</template>

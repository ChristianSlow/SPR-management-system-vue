<template>
  <main class="md:ml-64 h-auto pt-14 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white text-base md:text-lg">
      <div class="card bg-white dark:bg-gray-800 p-2 md:p-3 shadow-md border border-gray-200 dark:border-gray-700">
          <!-- 🔹 Toolbar Section -->
          <Toolbar class="mb-4 md:mb-6 flex flex-col md:flex-row gap-4 md:gap-0 items-start md:items-center">
              <template #start>
                  <Button label="New Course" icon="pi pi-plus" class="mr-2 w-full md:w-auto" severity="primary" />
              </template>
              <template #center>
                  <h1 class="m-0 text-lg md:text-xl font-semibold text-gray-700 dark:text-white tracking-wide text-center md:text-left">Courses Management</h1>
              </template>
              <template #end>
                  <Button label="Export" icon="pi pi-upload" class="w-full md:w-auto" severity="secondary" />
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
              <Column :exportable="false" style="min-width: 8rem; text-align: center;">
                  <template #body="slotProps">
                      <Button icon="pi pi-pencil" outlined rounded class="mr-2 p-button-md p-button-text" />
                      <Button icon="pi pi-trash" outlined rounded severity="danger" class="p-button-md p-button-text" />
                  </template>
              </Column>
          </DataTable>
      </div>

      <!-- 🔹 Course Dialog -->
      <Dialog :style="{ width: '90%', maxWidth: '500px' }" header="Add Course" modal class="p-dialog-md bg-white dark:bg-gray-800">
          <div class="grid gap-4 text-base md:text-lg">
              <div>
                  <label for="course" class="block text-base md:text-lg font-semibold text-gray-700 dark:text-white">Course Name</label>
                  <InputText id="course" required autofocus class="w-full p-inputtext-md rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white" />
                  <small class="text-red-500">Course is required.</small>
              </div>
              <div>
                  <label class="block text-base md:text-lg font-semibold text-gray-700 dark:text-white">Majors</label>
                  <ul class="bg-gray-100 dark:bg-gray-700 p-2 rounded-md">
                      <li class="flex items-center justify-between bg-white dark:bg-gray-800 p-3 rounded-md shadow-sm mb-2">
                          <InputText  class="flex-1 text-base md:text-lg p-inputtext-md mr-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white" />
                          <Button icon="pi pi-trash" severity="danger" text class="p-button-md" />
                      </li>
                  </ul>
              </div>
              <div class="flex items-center gap-2">
                  <InputText placeholder="Add new major..." class="flex-1 p-inputtext-md rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white" />
                  <Button label="Add" icon="pi pi-plus" severity="primary" class="p-button-md" />
              </div>
          </div>
          <template #footer>
              <Button label="Cancel" icon="pi pi-times" text class="p-button-md" />
              <Button label="Save" icon="pi pi-check" severity="success" class="p-button-md" />
          </template>
      </Dialog>
      <Dialog :style="{ width: '450px' }" header="Confirm" modal>
          <div class="confirmation-content text-center text-lg">
              <i class="pi pi-exclamation-triangle mr-3 text-3xl text-red-500" />
              <span>Are you sure you want to delete <strong>{{  }}</strong>?</span>
          </div>
          <template #footer>
              <Button label="No" icon="pi pi-times" text />
              <Button label="Yes" icon="pi pi-check" severity="danger" />
          </template>
      </Dialog>
  </main>
</template>
<template>
  <main class=" md:ml-64 h-auto pt-12 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
    <!-- Course & Major Selection -->
    <div class="bg-white dark:bg-gray-800 shadow-md p-4 mb-4">
      <div class="grid md:grid-cols-2 gap-6">
        <div>
          <label class="font-medium text-gray-900 dark:text-gray-300">Course</label>
          <select class="w-full mt-1 p-3 border rounded-lg focus:ring-1 focus:ring-black bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600">
            <option value="" disabled>Select Course</option>
          </select>
        </div>
        <div>
          <label class="font-medium text-gray-900 dark:text-gray-300">Major</label>
          <select class="w-full mt-1 p-3 border rounded-lg focus:ring-1 focus:ring-black bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600">
            <option value="" disabled>Select Major</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Subjects Table -->
    <div class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4">
      <div class="flex justify-between items-center mb-4">
        <h4 class="text-xl font-semibold text-gray-800 dark:text-white">Subjects</h4>
        <Button label="New" icon="pi pi-plus" class="p-button-rounded p-button-primary" />
      </div>

      <DataTable dataKey="id" class="shadow-sm rounded-lg overflow-hidden">
        <Column field="code" header="Subject Code" style="width: 20%" />
        <Column field="name" header="Descriptive Title" style="width: 40%" />
        <Column field="units" header="Units" style="width: 15%" />
        <Column :exportable="false" style="width: 25%" class="text-right">
          <template #body="slotProps">
            <Button icon="pi pi-pencil" class="p-button-text p-button-rounded p-button-info" />
            <Button icon="pi pi-trash" class="p-button-text p-button-rounded p-button-danger ml-2" />
          </template>
        </Column>
      </DataTable>

      <!-- ✅ Total Units Display -->
      <div class="mt-4 flex justify-end">
        <p class="text-lg font-semibold text-gray-800 dark:text-white">Total Units: </p>
      </div>
    </div>

    <!-- Add/Edit Subject Dialog -->
    <Dialog header="Manage Subject" :modal="true" class="w-96 bg-white dark:bg-gray-800">
      <div class="space-y-4">
        <div>
          <label class="font-medium text-gray-700 dark:text-gray-300">Subject Code</label>
          <InputText class="w-full p-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600" />
        </div>
        <div>
          <label class="font-medium text-gray-700 dark:text-gray-300">Descriptive Title</label>
          <InputText class="w-full p-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600" />
        </div>
        <div>
          <label class="font-medium text-gray-700 dark:text-gray-300">Units</label>
          <Dropdown optionLabel="label" optionValue="value" placeholder="Select Units" class="w-full p-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600" />
        </div>
      </div>
      <template #footer>
        <Button label="Cancel" class="p-button-text" />
        <Button label="Save" class="p-button-primary" />
      </template>
    </Dialog>

    <!-- ❌ Delete Confirmation Dialog -->
    <Dialog header="Confirm Delete" :modal="true" class="w-96 bg-white dark:bg-gray-800">
      <p class="text-gray-900 dark:text-white">Are you sure you want to delete this subject?</p>
      <template #footer>
        <Button label="No" class="p-button-text" />
        <Button label="Yes" class="p-button-danger" />
      </template>
    </Dialog>
  </main>
</template>

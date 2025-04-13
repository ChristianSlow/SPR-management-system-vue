<template>
  <div class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4">
    <div>
      <div class="card bg-white dark:bg-gray-800 shadow-md p-4">
        <!-- Toolbar
        <Toolbar class="mb-4">
          <template #start>
            <Button label="New" icon="pi pi-plus" class="mr-2" @click="openNew" />
            <Button 
              label="Delete" 
              icon="pi pi-trash" 
              severity="danger" 
              outlined 
              @click="confirmDeleteSelected" 
              :disabled="!selectedProducts || !selectedProducts.length" 
            />
          </template>
        </Toolbar> -->

        <!-- Data Table -->
        <DataTable
          ref="dt"
          dataKey="id"
          :paginator="true"
          :rows="10"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          :rowsPerPageOptions="[5, 10, 25]"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} accounts"
        >
          <template #header>
            <div class="flex flex-wrap gap-2 items-center justify-between">
              <h4 class="m-0 text-3xl font-bold text-gray-800 dark:text-white">Manage Accounts</h4>
              <IconField>
                <InputIcon>
                  <i class="pi pi-search" />
                </InputIcon>
                <InputText
                  placeholder="Search..."
                  class="bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                />
              </IconField>
            </div>
          </template>

          <!-- <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column> -->
          <Column field="name" header="Name" style="min-width: 16rem"></Column>
          <Column field="email" header="Email" style="min-width: 16rem"></Column>
          <Column field="role" header="Role" style="min-width: 10rem"></Column>
          <Column :exportable="false" style="min-width: 12rem">
            <template #body="slotProps">
              <Button icon="pi pi-pencil" outlined rounded class="mr-2" />
              <Button icon="pi pi-trash" outlined rounded severity="danger" />
            </template>
          </Column>
        </DataTable>
      </div>

      <!-- Add/Edit Account Dialog -->
      <Dialog :style="{ width: '450px' }" header="Add/Edit Account" :modal="true">
        <div class="flex flex-col gap-6">
          <div>
            <label for="name" class="block font-bold mb-3">Name</label>
            <InputText id="name" />
            <small class="text-red-500">Name is required.</small>
          </div>
          <div>
            <label for="email" class="block font-bold mb-3">Email</label>
            <InputText id="email" required />
            <small class="text-red-500">Email is required.</small>
          </div>
          <div>
            <label for="password" class="block font-bold mb-3">Password</label>
            <InputText id="password" required />
            <small class="text-red-500">Password is required.</small>
          </div>
          <div>
            <span class="block font-bold mb-4">Role</span>
            <div class="grid grid-cols-12 gap-4">
              <div class="flex items-center gap-2 col-span-6">
                <RadioButton id="admin" name="role" value="admin" />
                <label for="admin">admin</label>
              </div>
              <div class="flex items-center gap-2 col-span-6">
                <RadioButton id="student" name="role" value="student" />
                <label for="student">student</label>
              </div>
            </div>
          </div>
        </div>
        <template #footer>
          <Button label="Cancel" icon="pi pi-times" text />
          <Button label="Save" icon="pi pi-check" />
        </template>
      </Dialog>
      <!-- Delete Confirmation Dialog -->
      <Dialog :style="{ width: '450px' }" header="Confirm" :modal="true">
        <div class="confirmation-content flex items-center gap-4">
          <i class="pi pi-exclamation-triangle text-red-500 text-3xl" />
          <span>Are you sure you want to delete <b></b>?</span>
        </div>
        <template #footer>
          <Button label="No" icon="pi pi-times" text />
          <Button label="Yes" icon="pi pi-check" severity="danger" />
        </template>
      </Dialog>
    </div>
  </div>
</template>

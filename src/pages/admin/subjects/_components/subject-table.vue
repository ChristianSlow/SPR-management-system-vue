<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useDialog } from 'primevue'
import { defineAsyncComponent } from 'vue'
import { useSubjectStore } from '@/stores/subject'

const addSubject = defineAsyncComponent(
  () => import('@/pages/admin/subjects/_components/add-subject-modal.vue'),
)

const deleteSubject = defineAsyncComponent(
  () => import('@/pages/admin/subjects/_components/delete-subject-modal.vue'),
)

const editSubject = defineAsyncComponent(
  () => import('@/pages/admin/subjects/_components/edit-subject-modal.vue'),
)

const dialog = useDialog()
const dt = ref()
const store = useSubjectStore()

onMounted(() => store.getSubjects())
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
                dialog.open(addSubject, {
                  props: {
                    header: 'Add Subject',
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
        <DataTable
          :loading="store.isLoading"
          ref="dt"
          size="small"
          :value="store.subjects"
          dataKey="id"
          :paginator="true"
          :rows="10"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          :rowsPerPageOptions="[5, 10, 25]"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
        >
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
            <div class="flex items-center justify-center p-4">No subject found.</div>
          </template>
          <Column field="code" header="Code" style="min-width: 12rem">
            <template #body="slotProps">
              {{ slotProps.data.code.toUpperCase() }}
            </template>
          </Column>
          <Column field="name" header="Name" style="min-width: 16rem">
            <template #body="slotProps">
              <span class="capitalize"> {{ slotProps.data.name }}</span>
            </template>
          </Column>
          <Column field="unit" header="Unit" style="min-width: 12rem"></Column>
          <Column :exportable="false" header="Actions" style="min-width: 12rem">
            <template #body="slotProps">
              <Button
                size="small"
                label="Edit"
                icon="pi pi-pencil"
                class="mr-2"
                @click="
                  () => {
                    dialog.open(editSubject, {
                      props: {
                        header: 'Edit Subject',
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
                label="Delete"
                icon="pi pi-trash"
                class="mr-2"
                severity="danger"
                outlined
                @click="
                  () => {
                    dialog.open(deleteSubject, {
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
  </div>
</template>

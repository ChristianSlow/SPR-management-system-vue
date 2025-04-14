<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useToast } from 'primevue/usetoast'
import { useDialog } from 'primevue'
import { defineAsyncComponent } from 'vue'
import { useStudentStore } from '@/stores/student'

const AcceptQueue = defineAsyncComponent(
  () => import('@/pages/admin/approval-queue/_components/accept-modal.vue'),
)

const DeleteQueue = defineAsyncComponent(
  () => import('@/pages/admin/approval-queue/_components/delete-modal.vue'),
)

const store = useStudentStore()
const dialog = useDialog()
const toast = useToast()
const dt = ref()

onMounted(() => {
  store.getStudents()
})
</script>

<template>
  <div>
    <div class="card">
      <Toolbar class="mb-6">
        <template #start>
          <InputText type="text" placeholder="Search..." />
        </template>
        <template #end>
          <Select
            :options="['Pending', 'Accepted', 'Denied']"
            placeholder="Select status"
            class="w-full md:w-56"
          />
          <!-- <Button
            label="New"
            icon="pi pi-plus"
            class="mr-2"
            @click="
              () => {
                dialog.open(addCurriculum, {
                  props: {
                    header: 'Add Curriculum',
                    style: { width: '50vw' },
                    breakpoints: { '960px': '75vw', '640px': '90vw' },
                    modal: true,
                  },
                })
              }
            "
          /> -->
        </template>
      </Toolbar>
      <div class="border rounded-sm">
        <DataTable
          ref="dt"
          size="small"
          :value="store.students"
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
            <div class="flex items-center justify-center p-4">No queue found.</div>
          </template>
          <Column header="Fullname" style="min-width: 16rem">
            <template #body="slotProps">
              <span>{{ slotProps.data.firstName }} {{ slotProps.data.lastName }}</span>
            </template>
          </Column>
          <Column field="sex" header="Gender" style="min-width: 10rem"></Column>
          <Column field="address" header="Address" style="min-width: 10rem"></Column>
          <Column :exportable="false" header="Actions" style="min-width: 12rem">
            <template #body="slotProps">
              <Button
                label="Accept"
                icon="pi pi-pencil"
                class="mr-2"
                @click="
                  () => {
                    dialog.open(AcceptQueue, {
                      props: {
                        header: 'Confirm',
                        style: { width: '50vw' },
                        breakpoints: { '960px': '75vw', '640px': '90vw' },
                        modal: true,
                      },
                    })
                  }
                "
              />
              <Button
                outlined
                severity="danger"
                label="Decline"
                icon="pi pi-trash"
                class="mr-2"
                @click="
                  () => {
                    dialog.open(DeleteQueue, {
                      props: {
                        header: 'Confirm Decline',
                        style: { width: '50vw' },
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

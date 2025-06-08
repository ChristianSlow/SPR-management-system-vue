<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useDialog } from 'primevue'
import { defineAsyncComponent } from 'vue'
import ViewImage from './view-image.vue'
import { useQueueStore } from '@/stores/queue'
import { useFetch } from '@vueuse/core'

const AcceptQueue = defineAsyncComponent(
  () => import('@/pages/admin/approval-queue/_components/accept-modal.vue'),
)

const DeleteQueue = defineAsyncComponent(
  () => import('@/pages/admin/approval-queue/_components/delete-modal.vue'),
)

const store = useQueueStore()
const dialog = useDialog()
const dt = ref()
const API_URL = import.meta.env.VITE_API_URL

async function exportStudent() {
  try {
    const response = await fetch(`${API_URL}/queue/export`)

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Export failed: ${response.status} - ${errorText}`)
    }

    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'students_export.xlsx'
    link.click()
    window.URL.revokeObjectURL(url)
  } catch (error) {
    console.error('CSV Export Error:', error)
  }
}

onMounted(() => {
  store.getQueues()
})
</script>

<template>
  <div class="card">
    <Toolbar class="mb-6">
      <template #start>
        <InputText v-model="store.search" type="text" placeholder="Search by Name" />
      </template>
      <template #end>
        <div class="flex gap-2">
          <Button label="Export" @click="exportStudent" />
          <Select
            v-model="store.status"
            :options="['PENDING', 'REJECTED']"
            defaultValue="PENDING"
            placeholder="Select status"
            class="w-full md:w-56"
          />
        </div>
      </template>
    </Toolbar>

    <div class="border rounded-sm">
      <DataTable
        ref="dt"
        size="small"
        :value="store.students"
        dataKey="id"
        :rows="10"
        :loading="store.isLoading"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        :rowsPerPageOptions="[5, 10, 25]"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} students"
      >
        <template #empty>
          <div class="flex items-center justify-center p-4">No queue found.</div>
        </template>

        <Column header="Fullname" style="min-width: 16rem">
          <template #body="slotProps">
            <span>
              {{ slotProps.data.firstName }}
              {{ slotProps.data.middleName ?? '' }}
              {{ slotProps.data.lastName }}
            </span>
          </template>
        </Column>

        <Column field="course" header="Course" style="min-width: 10rem" />
        <Column field="major" header="Major" style="min-width: 5rem" />
        <Column field="gwa" header="GWA" style="min-width: 10rem" />
        <Column field="proof" header="Proof">
          <template #body="props">
            <div class="flex gap-1">
              <div v-for="i of 2" :key="i">
                <ViewImage image="" />
              </div>
            </div>
          </template>
        </Column>

        <Column field="status" header="Status" style="min-width: 10rem" />

        <Column :exportable="false" header="Actions">
          <template #body="slotProps">
            <div class="flex gap-1" v-if="slotProps.data.status.toLowerCase() === 'pending'">
              <Button
                size="small"
                icon="pi pi-check"
                class="mr-2"
                @click="
                  () => {
                    dialog.open(AcceptQueue, {
                      props: {
                        header: `Accept ${slotProps.data.firstName} ${slotProps.data.middleName} ${slotProps.data.lastName}`,
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
                      data: slotProps.data,
                    })
                  }
                "
              />
            </div>
          </template>
        </Column>
      </DataTable>
      <Paginator
        v-if="store.totalStudents > 10"
        :template="{
          '640px': 'PrevPageLink CurrentPageReport NextPageLink',
          '960px': 'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
          '1300px': 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
          default: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink ',
        }"
        :rows="10"
        @page="(e) => (store.page = e.page + 1)"
        :totalRecords="store.totalStudents"
      >
      </Paginator>
    </div>
  </div>
</template>

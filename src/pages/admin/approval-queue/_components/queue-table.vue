<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
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

const searchQuery = ref('')
const statusQuery = ref('')

const filteredStudents = computed(() => {
  if (!statusQuery.value) return store.students
  return store.students.filter((student) => student.status === statusQuery.value.toLowerCase())
  // return store.students.filter((student) => {
  //   const fullName =
  //     `${student.firstName} ${student.middleName ?? ''} ${student.lastName}`.toLowerCase()
  //   const course = student.course?.toLowerCase() ?? ''
  //   const major = student.major?.toLowerCase() ?? ''
  //   const query = searchQuery.value.toLowerCase()

  //   const matchesSearch =
  //     fullName.includes(query) || course.includes(query) || major.includes(query)
  //   const matchesStatus = statusQuery.value ? student.status === statusQuery.value : true

  //   return matchesSearch && matchesStatus
  // })
})

onMounted(() => {
  store.getStudents()
})
</script>

<template>
  <div>
    <div class="card">
      <Toolbar class="mb-6">
        <template #start>
          <InputText
            v-model="searchQuery"
            type="text"
            placeholder="Search by Name, Course, or Major..."
          />
        </template>
        <template #end>
          <!-- Dropdown for selecting the status filter -->
          <Select
            v-model="statusQuery"
            :options="['', 'Pending', 'Accepted', 'Denied']"
            placeholder="Select status"
            class="w-full md:w-56"
          />
        </template>
      </Toolbar>

      <div class="border rounded-sm">
        <DataTable
          ref="dt"
          size="small"
          :value="filteredStudents"
          dataKey="id"
          :paginator="true"
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
          <Column field="major" header="Major" style="min-width: 10rem" />
          <Column field="status" header="Status" style="min-width: 10rem" />

          <Column :exportable="false" header="Actions">
            <template #body="slotProps">
              <div class="flex gap-2" v-if="slotProps.data.status === 'pending'">
                <Button
                  label="Accept"
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
                        data: slotProps.data,
                      })
                    }
                  "
                />
              </div>
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>

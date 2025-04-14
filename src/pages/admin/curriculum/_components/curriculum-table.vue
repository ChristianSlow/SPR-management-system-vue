<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useToast } from 'primevue/usetoast'
import { useDialog } from 'primevue'
import { defineAsyncComponent } from 'vue'
import { useCurriculumStore } from '@/stores/curriculum'

const addCurriculum = defineAsyncComponent(
  () => import('@/pages/admin/curriculum/_components/modals/add-curriculum-modal.vue'),
)

const deleteCurriculum = defineAsyncComponent(
  () => import('@/pages/admin/curriculum/_components/modals/delete-curriculum-modal.vue'),
)

const editCurriculum = defineAsyncComponent(
  () => import('@/pages/admin/curriculum/_components/modals/edit-curriculum-modal.vue'),
)

const viewCurriculum = defineAsyncComponent(
  () => import('@/pages/admin/curriculum/_components/modals/view-curriculum-modal.vue'),
)

const dialog = useDialog()
const toast = useToast()
const dt = ref()
const products = ref()
const store = useCurriculumStore()

onMounted(() => store.getCurriculums())
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
          />
        </template>
      </Toolbar>
      <div class="border rounded-sm">
        <DataTable :loading="store.isLoading" :value="store.curriculums">
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
            <div class="flex items-center justify-center p-4">No curriculum found.</div>
          </template>
          <Column field="name" header="Name" style="min-width: 12rem"></Column>
          <Column field="course" header="Course" style="min-width: 12rem"></Column>
          <Column field="major" header="Major" style="min-width: 12rem"></Column>
          <Column :exportable="false" header="Actions" style="min-width: 12rem">
            <template #body="slotProps">
              <Button
                label="view"
                size="small"
                icon="pi pi-eye"
                class="mr-2"
                @click="
                  () => {
                    dialog.open(viewCurriculum, {
                      props: {
                        header: 'Curriculum Details',
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
                label="Edit"
                size="small"
                icon="pi pi-pencil"
                class="mr-2"
                @click="
                  () => {
                    dialog.open(editCurriculum, {
                      props: {
                        header: 'Edit Curriculum',
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
                label="Delete"
                outlined
                severity="danger"
                size="small"
                icon="pi pi-trash"
                class="mr-2"
                @click="
                  () => {
                    dialog.open(deleteCurriculum, {
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

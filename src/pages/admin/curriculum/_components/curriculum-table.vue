<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'

import { useDialog } from 'primevue'
import { defineAsyncComponent } from 'vue'
import { useCurriculumStore } from '@/stores/curriculum'
import { useMajorStore } from '@/stores/major'
import type { Curriculum } from '@/types/curriculum'

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
const curriculumStore = useCurriculumStore()
const majorStore = useMajorStore()
const selectedCurriculum = ref()
const op = ref()
function onToggled(event: Event, curriculum: Curriculum) {
  op.value.hide()

  if (selectedCurriculum.value?.id === curriculum.id) {
    selectedCurriculum.value = null
  } else {
    selectedCurriculum.value = curriculum

    nextTick(() => {
      op.value.show(event)
    })
  }
}

function hidePopover() {
  op.value.hide()
}

onMounted(() => {
  curriculumStore.getCurriculums(), majorStore.getMajor(curriculumStore.curriculum?.majorId ?? '')
})
</script>

<template>
  <div class="card">
    <Toolbar class="mb-6">
      <template #start>
        <InputText type="text" placeholder="Search..." v-model="curriculumStore.searchQuery" />
      </template>
      <template #end>
        <Button
          label="Add Curriculum"
          icon="pi pi-plus"
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
    <span class="text-gray-600 text-semibold">
      Total Curriculum: {{ curriculumStore.totalCurriculums }}
    </span>
    <div class="border rounded-sm">
      <DataTable
        :loading="curriculumStore.isLoading"
        :value="curriculumStore.curriculums"
        size="small"
      >
        <template #empty>
          <div class="flex items-center justify-center p-4">No curriculum found.</div>
        </template>
        <Column field="name" header="Name" class="uppercase" style="min-width: 12rem"></Column>
        <Column field="course" header="Course" style="min-width: 12rem">
          <template #body="slotProps">
            <label class="capitalize">
              {{ slotProps.data.course.name }}
            </label>
          </template>
        </Column>
        <Column header="Majors" style="min-width: 12rem">
          <template #body="slotProps">
            <label v-if="slotProps.data.major" class="capitalize">
              {{ slotProps.data.major.name }}
            </label>
            <label v-else class="text-gray-500"> No majors associated </label>
          </template>
        </Column>
        <Column header="Actions">
          <template #body="slotProps">
            <Button
              type="button"
              severity="secondary"
              class="w-full"
              icon="pi pi-ellipsis-v"
              @click="onToggled($event, slotProps.data)"
              variant="text"
            />
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
  <Popover ref="op">
    <div class="flex flex-col items-start">
      <Button
        text
        icon="pi pi-eye"
        severity="secondary"
        class="w-full"
        label="View"
        size="small"
        @click="
          () => {
            dialog.open(viewCurriculum, {
              props: {
                header: 'Curriculum Details',
                style: { width: '50vw' },
                breakpoints: { '960px': '75vw', '640px': '90vw' },
                modal: true,
              },
              data: selectedCurriculum,
            })
            hidePopover()
          }
        "
      />
      <Button
        text
        icon="pi pi-pencil"
        severity="secondary"
        class="w-full"
        label="Edit"
        size="small"
        @click="
          () => {
            dialog.open(editCurriculum, {
              props: {
                header: 'Edit Curriculum',
                style: { width: '50vw' },
                breakpoints: { '960px': '75vw', '640px': '90vw' },
                modal: true,
              },
              data: selectedCurriculum,
            })
            hidePopover()
          }
        "
      />
      <Button
        icon="pi pi-trash"
        severity="danger"
        label="delete"
        size="small"
        text
        @click="
          () => {
            dialog.open(deleteCurriculum, {
              props: {
                header: 'Confirm Delete',
                style: { width: '50vw' },
                breakpoints: { '960px': '75vw', '640px': '90vw' },
                modal: true,
              },

              data: selectedCurriculum?.id,
            })
            hidePopover()
          }
        "
      />
    </div>
  </Popover>
</template>

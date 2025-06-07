<script setup lang="ts">
import { useCourseStore } from '@/stores/course'
import { useCurriculumStore } from '@/stores/curriculum'
import { useSubjectOfferedStore } from '@/stores/subjectOffered'
import type { Curriculum, Year } from '@/types/curriculum'
import type { Major } from '@/types/major'
import { useToast } from 'primevue'
import { inject, onMounted, ref } from 'vue'

const toast = useToast()
const courseStore = useCourseStore()
const curriculumStore = useCurriculumStore()
const subjectOfferedStore = useSubjectOfferedStore()
const dialogRef = inject<any>('dialogRef')

const curriculum = ref<Curriculum>({
  ...dialogRef.value.data,
  subjects: [],
})

const major = ref<Major>({
  ...dialogRef.value.data.major,
})

const subjectOffers = ref<{
  year: number | null
  semester: number | null
  subjectIds: any[] | null
}>({
  year: null,
  semester: null,
  subjectIds: null,
})

function onClose() {
  dialogRef.value.close()
}

function addSubject() {
  if (!subjectOffers.value.subjectIds?.length) return

  const addedSubjects = subjectOffers.value.subjectIds.map((s: any) => ({
    ...s,
    year: subjectOffers.value.year,
    semester: subjectOffers.value.semester,
  }))

  curriculum.value.subjects?.push(...addedSubjects)

  // Reset inputs
  subjectOffers.value = { year: null, semester: null, subjectIds: null }
}

async function onSave() {
  const res = await curriculumStore.editCurriculum(curriculum.value)
  toast.add({
    severity: res.status,
    summary: res.statusMessage,
    detail: res.message,
    life: 3000,
  })
  onClose()
}

onMounted(() => {
  courseStore.getCourses()
  subjectOfferedStore.getSubjectOffereds(curriculum.value.id ?? '')
})
</script>

<template>
  <div class="grid gap-4 text-base md:text-lg">
    <div class="flex flex-col gap-2">
      <label for="course" class="block text-gray-700 dark:text-white"> Name </label>
      <InputText
        id="course"
        v-model="curriculum.name"
        required
        autofocus
        class="w-full rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
      />
      <div class="flex gap-2 w-full">
        <div class="flex-1">
          <label for="course" class="block text-gray-700 dark:text-white"> Course </label>
          <InputText
            option-label="name"
            v-model="curriculum.course.name"
            placeholder="Select a course"
            class="w-full"
            :loading="courseStore.isLoading"
            disabled
          />
        </div>
        <div class="flex-1">
          <label for="course" class="block text-gray-700 dark:text-white"> Major </label>
          <InputText
            v-model="major.name"
            editable
            placeholder="No majors associated"
            class="w-full"
            :loading="courseStore.isLoading"
            disabled
          />
        </div>
      </div>
      <div class="flex flex-col gap-2">
        <label class="block bg-red-800 text-white px-2"> Subjects Offered</label>
        <div v-if="curriculum.subjects.length" class="grid gap-2">
          <div
            v-for="(subject, index) in curriculum.subjects"
            :key="subject.id + '-' + subject.year + '-' + subject.semester"
            class="flex items-center justify-between bg-gray-100 dark:bg-gray-800 p-2 rounded"
          >
            <div>
              <span class="font-semibold text-gray-800 dark:text-white">{{ subject.name }}</span>
              <span class="ml-2 text-sm text-gray-600 dark:text-gray-300">
                — Year {{ subject.year }}, Semester {{ subject.semester }}
              </span>
            </div>
            <Button
              icon="pi pi-trash"
              severity="danger"
              text
              @click="curriculum.subjects.splice(index, 1)"
            />
          </div>
        </div>
        <div v-else class="text-sm text-gray-500 italic">No subjects added yet.</div>
        <div class="flex flex-col gap-2">
          <FloatLabel class="w-full" variant="on">
            <MultiSelect
              id="on_label"
              :options="subjectOfferedStore.subjects"
              optionLabel="name"
              filter
              :maxSelectedLabels="2"
              :loading="subjectOfferedStore.isLoading"
              class="w-full"
              v-model="subjectOffers.subjectIds"
            />
            <label for="on_label">Subjects</label>
          </FloatLabel>

          <div class="flex gap-2">
            <FloatLabel class="w-full" variant="on">
              <Select
                id="on_label"
                :options="[1, 2, 3, 4]"
                class="w-full"
                v-model="subjectOffers.year"
              />
              <label for="on_label">Year level</label>
            </FloatLabel>
            <FloatLabel class="w-full" variant="on">
              <Select
                id="on_label"
                :options="[1, 2]"
                class="w-full"
                v-model="subjectOffers.semester"
              />
              <label for="on_label">Semester</label>
            </FloatLabel>
          </div>
          <Button
            label="Add"
            icon="pi pi-plus"
            class="p-button-md"
            severity="secondary"
            @click="addSubject"
          />
        </div>
      </div>
    </div>
  </div>

  <!-- Buttons -->
  <div class="flex justify-end mt-4 gap-2">
    <Button label="Cancel" icon="pi pi-times" text @click="onClose" />
    <Button
      label="Save"
      icon="pi pi-check"
      severity="success"
      @click="onSave"
      :loading="curriculumStore.isLoading"
    />
  </div>
</template>

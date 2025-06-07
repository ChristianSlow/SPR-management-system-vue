<script setup lang="ts">
import { useCourseStore } from '@/stores/course'
import { useCurriculumStore } from '@/stores/curriculum'
import { useSubjectOfferedStore } from '@/stores/subjectOffered'
import { useToast } from 'primevue'
import { inject, onMounted, ref, watch } from 'vue'

const courseStore = useCourseStore()
const curriculumStore = useCurriculumStore()
const dialogRef = inject<any>('dialogRef')

const toast = useToast()

const curriculum = ref({ courseId: '', name: '', majorId: '' })

function onClose() {
  dialogRef.value.close()
}

async function onSave() {
  const res = await curriculumStore.addCurriculum(curriculum.value)
  console.log(res)
  toast.add({
    severity: res.status,
    summary: res.statusMessage,
    detail: res.message,
    life: 3000,
  })
  onClose()
}

watch(
  () => curriculum.value.courseId,
  (val) => {
    courseStore.getCourse(val)
  },
)

onMounted(() => {
  courseStore.getCourses()
})
</script>

<template>
  <div class="grid gap-4 text-base md:text-lg">
    <!-- Course Name -->
    <div class="flex flex-col gap-4 pt-2">
      <FloatLabel class="w-full" variant="on">
        <InputText id="on_label" v-model="curriculum.name" class="w-full" />
        <label for="on_label">Curriculum Name</label>
      </FloatLabel>
      <FloatLabel class="flex-1" variant="on">
        <Select
          id="on_label"
          v-model="curriculum.courseId"
          :options="courseStore.courses"
          :loading="courseStore.isLoading"
          optionLabel="abbreviation"
          optionValue="id"
          class="w-full"
        />
        <label for="on_label">Course</label>
      </FloatLabel>
      <FloatLabel class="flex-1" variant="on">
        <Select
          id="on_label"
          v-model="curriculum.majorId"
          :options="courseStore.course?.majors"
          :loading="courseStore.isLoading"
          optionLabel="name"
          optionValue="id"
          class="w-full"
        />
        <label for="on_label">Major</label>
      </FloatLabel>
      <!-- <div class="flex flex-col gap-2">
        <label class="block bg-red-800 text-white px-2"> Subjects Offered</label>
        <div class="flex flex-col gap-2">
          <FloatLabel class="w-full" variant="on">
            <MultiSelect
              id="on_label"
              optionLabel="name"
              filter
              :maxSelectedLabels="3"
              class="w-full"
            />
            <label for="on_label">Subjects</label>
          </FloatLabel>

          <div class="flex gap-2">
            <FloatLabel class="w-full" variant="on">
              <Select id="on_label" :options="[1, 2, 3, 4]" class="w-full" />
              <label for="on_label">Year level</label>
            </FloatLabel>
            <FloatLabel class="w-full" variant="on">
              <Select id="on_label" :options="[1, 2]" class="w-full" />
              <label for="on_label">Semester</label>
            </FloatLabel>
          </div>
          <Button label="Add" icon="pi pi-plus" class="p-button-md" severity="secondary" />
        </div>
      </div> -->
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

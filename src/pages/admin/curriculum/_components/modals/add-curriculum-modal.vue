<script setup lang="ts">
import { useCourseStore } from '@/stores/course'
import { useSubjectStore } from '@/stores/subject'
import type { Curriculum } from '@/types/curriculum'
import { computed, inject, onMounted, ref, watch } from 'vue'

const courseStore = useCourseStore()
const subjectStore = useSubjectStore()
const dialogRef = inject<any>('dialogRef')
const curriculum = ref<Curriculum>({})

function onClose() {
  dialogRef.value.close()
}

function onSave() {
  onClose()
}

onMounted(() => {
  courseStore.getCourses()
  subjectStore.getSubjects()
})

const filteredMajor = computed(() => {
  return courseStore.courses.find((item) => item.abbreviation == curriculum.value.course)
})

watch(
  () => curriculum.value.course,
  (val) => {
    console.log(val)
    subjectStore.getFilteredSubject(val as string)
  },
)
</script>

<template>
  <div class="grid gap-4 text-base md:text-lg">
    <!-- Course Name -->
    <div class="flex flex-col gap-4">
      <label for="course" class="block text-gray-700 dark:text-white"> Name </label>
      <InputText
        id="course"
        v-model="curriculum.name"
        required
        autofocus
        class="w-full rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
      />
      <div class="flex flex-col gap-4 w-full">
        <div class="flex-1">
          <label for="course" class="block text-gray-700 dark:text-white"> Course </label>
          <Select
            v-model="curriculum.course"
            editable
            :options="courseStore.courses"
            optionLabel="name"
            optionValue="abbreviation"
            placeholder="Select a course"
            class="w-full md:w-56"
            :loading="courseStore.isLoading"
          />
        </div>
        <div class="flex-1">
          <label for="course" class="block text-gray-700 dark:text-white"> Major </label>
          <Select
            v-model="curriculum.major"
            editable
            :options="filteredMajor?.majors"
            placeholder="Select a major"
            class="w-full md:w-56"
            :loading="courseStore.isLoading"
          />
        </div>
      </div>
      <div>
        <label class="block text-gray-700 dark:text-white"> First year </label>
        <div class="flex gap-4">
          <div>
            <label class="block text-gray-700 dark:text-white"> First semester </label>
            <MultiSelect
              v-model="(curriculum.firstYear ?? {}).first"
              editable
              :options="subjectStore.filteredSubjects"
              option-label="code"
              option-value="uid"
              placeholder="Select a subjects"
              class="w-full md:w-56"
            />
          </div>
          <div>
            <label class="block text-gray-700 dark:text-white"> Second semester </label>
            <Select
              v-model="curriculum.major"
              editable
              :options="[]"
              placeholder="Select a subjects"
              class="w-full md:w-56"
            />
          </div>
        </div>
      </div>
      <div>
        <label class="block text-gray-700 dark:text-white"> Second year </label>
        <div class="flex gap-4">
          <div>
            <label class="block text-gray-700 dark:text-white"> First semester </label>
            <Select
              v-model="curriculum.major"
              editable
              :options="[]"
              placeholder="Select a subjects"
              class="w-full md:w-56"
            />
          </div>
          <div>
            <label class="block text-gray-700 dark:text-white"> Second semester </label>
            <Select
              v-model="curriculum.major"
              editable
              :options="[]"
              placeholder="Select a subjects"
              class="w-full md:w-56"
            />
          </div>
        </div>
      </div>
      <div>
        <label class="block text-gray-700 dark:text-white"> Third year </label>
        <div class="flex gap-4">
          <div>
            <label class="block text-gray-700 dark:text-white"> First semester </label>
            <Select
              v-model="curriculum.major"
              editable
              :options="[]"
              placeholder="Select a subjects"
              class="w-full md:w-56"
            />
          </div>
          <div>
            <label class="block text-gray-700 dark:text-white"> Second semester </label>
            <Select
              v-model="curriculum.major"
              editable
              :options="[]"
              placeholder="Select a subjects"
              class="w-full md:w-56"
            />
          </div>
        </div>
      </div>
      <div>
        <label class="block text-gray-700 dark:text-white"> Fourth year </label>
        <div class="flex gap-4">
          <div>
            <label class="block text-gray-700 dark:text-white"> First semester </label>
            <Select
              v-model="curriculum.major"
              editable
              :options="[]"
              placeholder="Select a subjects"
              class="w-full md:w-56"
            />
          </div>
          <div>
            <label class="block text-gray-700 dark:text-white"> Second semester </label>
            <Select
              v-model="curriculum.major"
              editable
              :options="[]"
              placeholder="Select a subjects"
              class="w-full md:w-56"
            />
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Buttons -->
  <div class="flex justify-end mt-4 gap-2">
    <Button label="Cancel" icon="pi pi-times" text @click="onClose" />
    <Button label="Save" icon="pi pi-check" severity="success" @click="onSave" />
  </div>
</template>

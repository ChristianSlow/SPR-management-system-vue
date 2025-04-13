<script setup lang="ts">
import { useCourseStore } from '@/stores/course'
import { useStudentStore } from '@/stores/student'
import type { Student } from '@/types/student'
import { useToast } from 'primevue'
import { computed, onMounted, ref } from 'vue'

const courseStore = useCourseStore()
const studentStore = useStudentStore()
const student = ref<Student>({
  role: 'student'
})
const toast = useToast()

onMounted(() => {
  courseStore.getCourses()
})

const filteredMajor = computed(() => {
  return courseStore.courses.find((item) => item.name === student.value.course)
})

async function onSubmit(payload: any) {
  studentStore.addStudent(payload)
  toast.add({
    severity: 'success',
    summary: 'Success',
    detail: 'Succesfully added subject!',
    life: 3000,
  })
}
</script>
<template>
  <Fluid class="flex justify-center p-2">
    <div class="flex mt-3 w-full justify-center">
      <div
        class="card flex flex-col gap-4 w-full max-w-screen-md p-4 rounded-lg shadow-md bg-white text-gray-800"
      >
        <div class="text-center mb-6">
          <img class="mx-auto" width="80" height="80" src="/tlogow.png" alt="Tañon College Logo" />
          <h1 class="text-red-800 text-xl font-bold">TAÑON COLLEGE</h1>
          <h2 class="text-gray-700 text-md">OFFICE OF THE REGISTRAR AND ADMISSIONS</h2>
          <p class="text-gray-600 text-sm">San Carlos City, Negros Occidental</p>
        </div>

        <!-- Student Information -->
        <form class="flex flex-col gap-4">
          <!-- Name Fields -->
          <div class="flex flex-col md:flex-row gap-2">
            <div class="flex flex-col gap-2 flex-1">
              <label>First Name</label>
              <InputText required v-model="student.firstName" />
            </div>
            <div class="flex flex-col gap-2 flex-1">
              <label>Middle Name</label>
              <InputText required v-model="student.middleName" />
            </div>
            <div class="flex flex-col gap-2 flex-1">
              <label>Last Name</label>
              <InputText required v-model="student.lastName" />
            </div>
          </div>

          <!-- Birth Info -->
          <div class="flex flex-col md:flex-row gap-2">
            <div class="flex flex-1 flex-col gap-2">
              <label>Date of Birth</label>
              <DatePicker
                showIcon
                fluid
                :showOnFocus="false"
                inputId="buttondisplay"
                v-model="student.birthDate"
              />
            </div>
            <div class="flex flex-1 flex-col gap-2">
              <label>Sex</label>
              <Select required v-model="student.sex" :options="['Male', 'Female']" />
            </div>
            <div class="flex flex-1 flex-col gap-2">
              <label>Civil Status</label>
              <Select
                required
                v-model="student.civilStatus"
                :options="['Single', 'Married', 'Widowed', 'Separated']"
              />
            </div>
          </div>

          <!-- Place of Birth -->
          <div class="flex flex-col gap-2">
            <label>Place of Birth</label>
            <InputText required v-model="student.birthPlace" />
          </div>

          <!-- Course Info -->
          <div class="flex flex-col md:flex-row gap-2">
            <div class="flex flex-1 flex-col gap-2">
              <label>Course</label>
              <Select
                required
                v-model="student.course"
                :options="courseStore.courses"
                :loading="courseStore.isLoading"
                option-label="name"
                option-value="name"
              />
            </div>
            <div class="flex flex-1 flex-col gap-2">
              <label>Major</label>
              <Select required v-model="student.major" :options="filteredMajor?.majors" />
            </div>
          </div>

          <!-- Year & Semester -->
          <div class="flex flex-col md:flex-row gap-2">
            <div class="flex flex-1 flex-col gap-2">
              <label>Year</label>
              <Select
                required
                v-model="student.year"
                :options="['First Year', 'Second Year', 'Third Year', 'Fourth Year']"
              />
            </div>
            <div class="flex flex-1 flex-col gap-2">
              <label>Semester</label>
              <Select
                required
                v-model="student.semester"
                :options="['First Semester', 'Second Semester']"
              />
            </div>
          </div>

          <!-- Parent Info -->
          <div class="flex flex-col md:flex-row gap-2">
            <div class="flex flex-1 flex-col gap-2">
              <label>Parent Name</label>
              <InputText required v-model="student.parentName" />
            </div>
            <div class="flex flex-1 flex-col gap-2">
              <label>Parent Mobile Number</label>
              <InputText required v-model="student.parentMobileNumber" />
            </div>
          </div>

          <!-- Parent Address -->
          <div class="flex flex-col gap-2">
            <label>Parent Address</label>
            <InputText required v-model="student.address" />
          </div>
        </form>

        <!-- Submit Button -->
        <div>
          <Button
            :loading="studentStore.isLoading"
            label="Submit"
            @click="onSubmit(student)"
            severity="danger"
            type="submit"
            raised
            class="w-full py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
          />
        </div>
      </div>
    </div>
  </Fluid>
</template>

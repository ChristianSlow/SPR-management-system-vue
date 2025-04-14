<script setup lang="ts">
import StudentLayout from '@/layouts/student-layout.vue'
import { useCourseStore } from '@/stores/course'
import { useStudentStore } from '@/stores/student'
import type { Student } from '@/types/student'
import { Message, useToast } from 'primevue'
import { computed, inject, onMounted, reactive, watchEffect } from 'vue'
import GradesTable from '../grades-table.vue'

const dialogRef = inject<any>('dialogRef')
const student = reactive<Student>(dialogRef.value.data)
const studentStore = useStudentStore()
const courseStore = useCourseStore()
const toast = useToast()

function onClose() {
  dialogRef.value.close()
}

function onSubmit(payload: Student) {
  studentStore.editStudent(payload)
  toast.add({
    severity: 'success',
    summary: 'Success',
    detail: 'Succesfully updating student!',
    life: 3000,
  })
  onClose()
}

onMounted(() => {
  courseStore.getCourses()
})

watchEffect(() => console.log(student))

const filteredMajor = computed(() => {
  return courseStore.courses.find((item) => item.name === student.course)
})
</script>

<template>
  <form class="flex flex-col gap-4" @submit.prevent="onSubmit(student)">
    <div>
      <h3 class="bg-red-800 px-2 text-white">Student Details</h3>
      <div class="p-4 border rounded-bl-md rounded-br-md flex flex-col gap-4">
        <div class="flex gap-2 flex-wrap">
          <div class="flex flex-col gap-2">
            <label>First Name</label>
            <InputText required v-model="student.firstName" />
          </div>
          <div class="flex flex-col gap-2">
            <label>Middle Name</label>
            <InputText required v-model="student.middleName" />
          </div>
          <div class="flex flex-col gap-2">
            <label>Last Name</label>
            <InputText required v-model="student.lastName" />
          </div>
        </div>
        <div class="flex flex-1 flex-col gap-2">
          <label for="mobile">Student Mobile Number</label>
          <InputText
            id="mobile"
            v-model="student.studentMobileNumber"
            type="tel"
            maxlength="11"
            pattern="[0-9]{11}"
            required
          />
        </div>
        <div class="flex flex-col gap-2">
          <label>Place of Birth</label>
          <InputText required v-model="student.birthPlace" />
        </div>
        <div class="p-4 bg-gray-100 space-y-4">
          <div class="flex gap-2">
            <div class="flex flex-1 flex-col gap-2">
              <label>Parent Name</label>
              <InputText required v-model="student.parentName" />
            </div>
            <div class="flex flex-1 flex-col gap-2">
              <label>Parent Mobile Number</label>
              <InputText required v-model="student.parentMobileNumber" />
            </div>
          </div>
          <div class="flex flex-col gap-2">
            <label>Parent Address</label>
            <InputText required v-model="student.address" />
          </div>
        </div>
        <!-- <div class="flex gap-2">
          <div class="flex flex-1 flex-col gap-2">
            <label>Date of Birth</label>
            <DatePicker
              v-model="student.birthDate"
              showIcon
              fluid
              :showOnFocus="false"
              inputId="buttondisplay"
            />
          </div>
          <div class="flex flex-1 flex-col gap-2">
            <label>Sex</label>
            <Select required :options="['Male', 'Female']" v-model="student.sex" />
          </div>
          <div class="flex flex-1 flex-col gap-2">
            <label>Civil Status</label>
            <Select
              required
              :options="['Single', 'Married', 'Widowed', 'Separated']"
              v-model="student.civilStatus"
            />
          </div>
        </div> -->
      </div>
    </div>
    
    <div>
      <h3 class="bg-red-800 px-2 text-white">Educational Details</h3>
      <div class="p-4 border rounded-bl-md rounded-br-md flex flex-col gap-4">
        <div class="flex gap-2">
          <div class="flex flex-1 flex-col gap-2">
            <label>Course</label>
            <Select
              required
              v-model="student.course"
              option-label="name"
              option-value="name"
              :options="courseStore.courses"
              :loading="courseStore.isLoading"
            />
          </div>
          <div class="flex flex-1 flex-col gap-2" v-if="student.course">
            <label>Major</label>
            <Select required v-model="student.major" :options="filteredMajor?.majors" />
          </div>
        </div>
        <div class="flex gap-2">
          <div class="flex flex-1 flex-col gap-2">
            <label>Year</label>
            <Select
              required
              :options="['First Year', 'Second Year', 'Third Year', 'Fourth Year']"
              v-model="student.year"
            />
          </div>
          <div class="flex flex-1 flex-col gap-2">
            <label>Semester</label>
            <Select
              required
              :options="['First Semester', 'Second Semester']"
              v-model="student.semester"
            />
          </div>
        </div>
      </div>
      <!-- <div>
        <div class="border p-2 mt-2">
          <span>First Semester</span>
          <GradesTable :subjects="student.curriculum?.firstYear?.first" />
        </div>
        <div class="border p-2 mt-2">
          <span>Second Semester</span>
          <GradesTable :subjects="student.curriculum?.firstYear?.second" />
        </div>
      </div> -->
    </div>

    <div class="flex w-full gap-2 justify-end mt-4">
      <Button label="Cancel" class="p-button-text" @click="onClose" />
      <Button
        label="Save"
        class="p-button-primary"
        type="submit"
        :loading="studentStore.isLoading"
      />
    </div>
  </form>
</template>

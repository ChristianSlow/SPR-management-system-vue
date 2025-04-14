<script setup lang="ts">
import StudentLayout from '@/layouts/student-layout.vue'
import { useCourseStore } from '@/stores/course'
import { useStudentStore } from '@/stores/student'
import type { Student } from '@/types/student'
import { Message, useToast } from 'primevue'
import { computed, inject, onMounted, reactive, watchEffect, toRaw } from 'vue'
import GradesTable from '../grades-table.vue'
import type { Subject } from '@/types/subject'

const dialogRef = inject<any>('dialogRef')
const studentStore = useStudentStore()
const courseStore = useCourseStore()
const toast = useToast()

function onClose() {
  dialogRef.value.close()
}

async function onSubmit(payload: Student) {
  await studentStore.editStudent(payload)
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
  studentStore.student = dialogRef.value.data
})

const filteredMajor = computed(() => {
  return courseStore.courses.find((item) => item.name === studentStore.student.course)
})

const handleSubjectUpdate = (
  updatedSubjects: Subject[],
  context: { year: string; semester: string },
) => {
  if (studentStore.student.curriculum && context) {
    const curriculum = toRaw(studentStore.student.curriculum)

    curriculum[context.year] = {
      ...curriculum[context.year],
      [context.semester]: updatedSubjects,
    }

    studentStore.student.curriculum = reactive(curriculum)
  }
  console.log(updatedSubjects, context)
}

watchEffect(() => {
  console.log(studentStore.student)
})
</script>

<template>
  <form class="flex flex-col gap-4" @submit.prevent="onSubmit(studentStore.student)">
    <div>
      <h3 class="bg-red-800 px-2 text-white">Student Details</h3>
      <div class="p-4 border rounded-bl-md rounded-br-md flex flex-col gap-4">
        <div class="flex gap-2 flex-wrap">
          <div class="flex flex-col gap-2">
            <label>First Name</label>
            <InputText required v-model="studentStore.student.firstName" />
          </div>
          <div class="flex flex-col gap-2">
            <label>Middle Name</label>
            <InputText required v-model="studentStore.student.middleName" />
          </div>
          <div class="flex flex-col gap-2">
            <label>Last Name</label>
            <InputText required v-model="studentStore.student.lastName" />
          </div>
        </div>
        <div class="flex flex-1 flex-col gap-2">
          <label for="mobile">Student Mobile Number</label>
          <InputText
            id="mobile"
            v-model="studentStore.student.studentMobileNumber"
            type="tel"
            maxlength="11"
            pattern="[0-9]{11}"
            required
          />
        </div>
        <div class="flex flex-col gap-2">
          <label>Place of Birth</label>
          <InputText required v-model="studentStore.student.birthPlace" />
        </div>
        <div class="p-4 bg-gray-100 space-y-4">
          <div class="flex gap-2">
            <div class="flex flex-1 flex-col gap-2">
              <label>Parent Name</label>
              <InputText required v-model="studentStore.student.parentName" />
            </div>
            <div class="flex flex-1 flex-col gap-2">
              <label>Parent Mobile Number</label>
              <InputText required v-model="studentStore.student.parentMobileNumber" />
            </div>
          </div>
          <div class="flex flex-col gap-2">
            <label>Parent Address</label>
            <InputText required v-model="studentStore.student.address" />
          </div>
        </div>
        <!-- <div class="flex gap-2">
          <div class="flex flex-1 flex-col gap-2">
            <label>Date of Birth</label>
            <DatePicker
              v-model="studentStore.student.birthDate"
              showIcon
              fluid
              :showOnFocus="false"
              inputId="buttondisplay"
            />
          </div>
          <div class="flex flex-1 flex-col gap-2">
            <label>Sex</label>
            <Select required :options="['Male', 'Female']" v-model="studentStore.student.sex" />
          </div>
          <div class="flex flex-1 flex-col gap-2">
            <label>Civil Status</label>
            <Select
              required
              :options="['Single', 'Married', 'Widowed', 'Separated']"
              v-model="studentStore.student.civilStatus"
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
              v-model="studentStore.student.course"
              option-label="name"
              option-value="name"
              :options="courseStore.courses"
              :loading="courseStore.isLoading"
            />
          </div>
          <div class="flex flex-1 flex-col gap-2" v-if="studentStore.student.course">
            <label>Major</label>
            <Select
              required
              v-model="studentStore.student.major"
              :options="filteredMajor?.majors"
            />
          </div>
        </div>
        <div class="flex gap-2">
          <div class="flex flex-1 flex-col gap-2">
            <label>Year</label>
            <Select
              required
              :options="['First Year', 'Second Year', 'Third Year', 'Fourth Year']"
              v-model="studentStore.student.year"
            />
          </div>
          <div class="flex flex-1 flex-col gap-2">
            <label>Semester</label>
            <Select
              required
              :options="['First Semester', 'Second Semester']"
              v-model="studentStore.student.semester"
            />
          </div>
        </div>
      </div>
      <div>
        <div class="border p-2 mt-2">
          <span>First Semester</span>
          <GradesTable
            :subjects="studentStore.student.curriculum?.firstYear?.first ?? []"
            :context="{ year: 'firstYear', semester: 'first' }"
            @update="handleSubjectUpdate"
          />
        </div>
        <div class="border p-2 mt-2">
          <span>Second Semester</span>
          <GradesTable
            :subjects="studentStore.student.curriculum?.firstYear?.second ?? []"
            :context="{ year: 'firstYear', semester: 'second' }"
            @update="handleSubjectUpdate"
          />
        </div>
      </div>
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

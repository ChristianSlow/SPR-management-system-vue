<script setup lang="ts">
import StudentLayout from '@/layouts/student-layout.vue'
import { useStudentStore } from '@/stores/student'
import type { Student } from '@/types/student'
import { Message, useToast } from 'primevue'
import { inject, reactive } from 'vue'

const dialogRef = inject<any>('dialogRef')
const student = reactive<Student>({})
const store = useStudentStore()
const toast = useToast()

function onClose() {
  dialogRef.value.close()
}

function onSubmit(payload: Student) {
  // store.addStudent(payload)
  toast.add({
    severity: 'success',
    summary: 'Success',
    detail: 'Succesfully added subject!',
    life: 3000,
  })
  onClose()
}
</script>

<template>
  <form class="flex flex-col gap-4" @submit.prevent="onSubmit(student)">
    <div class="flex flex-col gap-2">
      <label>First Name</label>
      <InputText required v-model="student.firstName" />
    </div>
    <div class="flex flex-col gap-2">
      <label>Middle Name</label>
      <InputText required v-model="student.middleName" />
    </div>
    <div class="flex flex-col gap-2">
      <label>Course</label>
      <InputText required v-model="student.course" />
    </div>
    <div class="flex flex-col gap-2">
      <label>Major</label>
      <InputText required v-model="student.major" />
    </div>
    <div class="flex flex-col gap-2">
      <label>Year</label>
      <InputText required v-model="student.year" />
    </div>
    <div class="flex flex-col gap-2">
      <label>Semester</label>
      <InputText required v-model="student.semester" />
    </div>
    <div class="flex flex-col gap-2">
      <label>Sex</label>
      <InputText required v-model="student.sex" />
    </div>
    <div class="flex flex-col gap-2">
      <label>Civil Status</label>
      <InputText required v-model="student.civilStatus" />
    </div>
    <div class="flex flex-col gap-2">
      <label>Date of Birth</label>
      <InputText required v-model="student.birthDate" />
    </div>
    <div class="flex flex-col gap-2">
      <label>Place of Birth</label>
      <InputText required v-model="student.birthPlace" />
    </div>
    <div class="flex flex-col gap-2">
      <label>Parent Name</label>
      <InputText required v-model="student.parentName" />
    </div>
    <div class="flex flex-col gap-2">
      <label>Parent Mobile Number</label>
      <InputText required v-model="student.parentMobileNumber" />
    </div>
    <div class="flex flex-col gap-2">
      <label>Parent Address</label>
      <InputText required v-model="student.address" />
    </div>

    <div class="flex w-full gap-2 justify-end mt-4">
      <Button label="Cancel" class="p-button-text" @click="onClose" />
      <Button label="Save" class="p-button-primary" type="submit" :loading="store.isLoading" />
    </div>
  </form>
</template>

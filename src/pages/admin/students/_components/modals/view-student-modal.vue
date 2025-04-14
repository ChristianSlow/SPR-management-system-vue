<script setup lang="ts">
import { inject } from 'vue'
import { formatDate } from '@/composables/formatTimstampDate'

const dialogRef = inject<any>('dialogRef')
const student = dialogRef.value.data
</script>

<template>
  <div class="space-y-4">
    <div class="bg-red-800 flex items-end p-4">
      <Avatar icon="pi pi-user" class="mr-2" size="xlarge" />
      <div>
        <span class="text-white text-xl">
          {{ student.firstName }} {{ student.middleName }} {{ student.lastName }}
        </span>
        <br />
        <span class="capitalize text-white"> {{ student.course }} - {{ student.major }} </span>
      </div>
    </div>

    <div>
      <h2 class="bg-gray-100 px-2 py-1 font-semibold">Student Details</h2>
      <div class="p-4 space-y-4 text-sm">
        <div class="grid grid-cols-2 gap-2">
          <div>
            <strong>Full Name:</strong> {{ student.lastName }}, {{ student.firstName }}
            {{ student.middleName }}
          </div>
          <div><strong>Gender:</strong> {{ student.sex }}</div>
          <div><strong>Civil Status:</strong> {{ student.civilStatus }}</div>
          <div><strong>Phone #:</strong> {{ student.studentMobileNumber }}</div>
          <div><strong>Birth Date:</strong> {{ formatDate(student.birthDate) }}</div>
          <div><strong>Birth Place:</strong> {{ student.birthPlace }}</div>
          <div><strong>Parent's Name:</strong> {{ student.parentName }}</div>
          <div><strong>Parent's Phone #:</strong> {{ student.parentMobileNumber }}</div>
          <div class="col-span-2"><strong>Address:</strong> {{ student.address }}</div>
        </div>
      </div>
    </div>

    <div>
      <h2 class="bg-gray-100 px-2 py-1 font-semibold">Academic Info</h2>
      <div class="p-4 space-y-2 text-sm">
        <div class="grid grid-cols-2 gap-2">
          <div><strong>Course:</strong> {{ student.course }}</div>
          <div><strong>Major:</strong> {{ student.major }}</div>
          <div><strong>Year:</strong> {{ student.year }}</div>
          <div><strong>Semester:</strong> {{ student.semester }}</div>
          <div><strong>Curriculum:</strong> {{ student.curriculum?.name || 'N/A' }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

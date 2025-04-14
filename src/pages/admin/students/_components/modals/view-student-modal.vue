<script setup lang="ts">
import { inject } from 'vue'
import { useStudentStore } from '@/stores/student'

const dialogRef = inject<any>('dialogRef')
const student = dialogRef.value.data

const studentStore = useStudentStore()
const students = studentStore.students
</script>

<template>
  <form class="flex flex-col gap-4">
    <div class="flex gap-2">
      <div class="flex flex-col gap-2">
        <label>First Name</label>
        <InputText required {{student.firstName}} />
      </div>
      <div class="flex flex-col gap-2">
        <label>Middle Name</label>
        <InputText required {{student.middleName}} />
      </div>
      <div class="flex flex-col gap-2">
        <label>Last Name</label>
        <InputText required {{student.lastName}} />
      </div>
    </div>
    <div class="flex gap-2">
      <div class="flex flex-1 flex-col gap-2">
        <label>Date of Birth</label>
        <DatePicker
          {{student.birthDate}}
          showIcon
          fluid
          :showOnFocus="false"
          inputId="buttondisplay"
        />
      </div>
      <div class="flex flex-1 flex-col gap-2">
        <label>Sex</label>
        <Select required :options="['Male', 'Female']" {{student.sex}} />
      </div>
      <div class="flex flex-1 flex-col gap-2">
        <label>Civil Status</label>
        <Select
          required
          :options="['Single', 'Married', 'Widowed', 'Separated']"
          {{student.civilStatus}}
        />
      </div>
      <div class="flex flex-1 flex-col gap-2">
        <label for="mobile">Student Mobile Number</label>
        <InputText
          id="mobile"
          {{student.studentMobileNumber}}
          type="tel"
          maxlength="11"
          pattern="[0-9]{11}"
          required
        />
      </div>
    </div>
    <div class="flex flex-col gap-2">
      <label>Place of Birth</label>
      <InputText {{student.birthPlace}} />
    </div>
    <div class="flex gap-2">
      <div class="flex flex-1 flex-col gap-2">
        <label>Course</label>
        <Select required {{student.course}} option-label="name" option-value="name" />
      </div>
      <div class="flex flex-1 flex-col gap-2">
        <label>Major</label>
        <Select required {{student.major}} />
      </div>
    </div>
    <div class="flex gap-2">
      <div class="flex flex-1 flex-col gap-2">
        <label>Year</label>
        <Select
          required
          :options="['First Year', 'Second Year', 'Third Year', 'Fourth Year']"
          {{student.year}}
        />
      </div>
      <div class="flex flex-1 flex-col gap-2">
        <label>Semester</label>
        <Select required :options="['First Semester', 'Second Semester']" {{student.semester}} />
      </div>
    </div>
    <div class="flex gap-2">
      <div class="flex flex-1 flex-col gap-2">
        <label>Parent Name</label>
        <InputText required {{student.parentName}} />
      </div>
      <div class="flex flex-1 flex-col gap-2">
        <label for="mobile">Parent Mobile Number</label>
        <InputText
          id="mobile"
          {{student.parentMobileNumber}}
          type="tel"
          maxlength="11"
          pattern="[0-9]{11}"
          required
        />
      </div>
    </div>
    <div class="flex flex-col gap-2">
      <label>Parent Address</label>
      <InputText required {{student.address}} />
    </div>
  </form>
</template>

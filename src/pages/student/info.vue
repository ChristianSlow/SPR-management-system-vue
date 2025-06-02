<script setup lang="ts">
import { CurriculumRepository } from '@/repositories/curriculumRepository'
import { useCourseStore } from '@/stores/course'
import { useStudentStore } from '@/stores/student'
import type { Student } from '@/types/student'
import { useToast } from 'primevue'
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import FileUploadProof from './_components/file-upload-proof.vue'

const courseStore = useCourseStore()
const studentStore = useStudentStore()
const router = useRouter()
const student = ref<Student>({})
const toast = useToast()
const route = useRoute()

onMounted(async () => {
  const result = await studentStore.getStudent(route.params.id as string)
  student.value = result
  courseStore.getCourses()
})

const filteredMajor = computed(() => {
  return courseStore.courses.find((item: any) => item.abbreviation === student.value.course)
})

async function onSubmit(payload: Student) {
  const curriculum = await CurriculumRepository.fetchCurriculum(payload.course as string)
  studentStore.editStudent({ ...payload, curriculum })
  toast.add({
    severity: 'success',
    summary: 'Success',
    detail: 'Successfully added subject!',
    life: 3000,
  })

  // router.push('/student')
}

function getImage(e: any) {
  student.value.file1 = e[0]
  student.value.file2 = e[1]
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

        <form class="flex flex-col gap-4" @submit="onSubmit">
          <div class="flex flex-col md:flex-row gap-2">
            <div class="flex flex-col gap-2 flex-1">
              <label>First Name</label>
              <InputText required v-model="student.firstName" disabled name="firstName" />
            </div>
            <div class="flex flex-col gap-2 flex-1">
              <label>Middle Name</label>
              <InputText required v-model="student.middleName" disabled name="middleName" />
            </div>
            <div class="flex flex-col gap-2 flex-1">
              <label>Last Name</label>
              <InputText required v-model="student.lastName" disabled name="lastName" />
            </div>
          </div>

          <div class="flex flex-col md:flex-row gap-2">
            <div class="flex flex-1 flex-col gap-2">
              <label>Date of Birth</label>
              <DatePicker
                showIcon
                fluid
                :showOnFocus="false"
                inputId="buttondisplay"
                v-model="student.birthDate"
                name="birthDate"
              />
            </div>
            <div class="flex flex-1 flex-col gap-2">
              <label>Sex</label>
              <Select required v-model="student.sex" :options="['Male', 'Female']" name="sex" />
            </div>
            <div class="flex flex-1 flex-col gap-2">
              <label>Civil Status</label>
              <Select
                required
                v-model="student.civilStatus"
                :options="['Single', 'Married', 'Widowed', 'Separated']"
                name="civilStatus"
              />
            </div>
            <div class="flex flex-1 flex-col gap-2">
              <label for="mobile">Mobile Number</label>
              <InputText
                id="mobile"
                v-model="student.studentMobileNumber"
                type="tel"
                maxlength="11"
                pattern="[0-9]{11}"
                required
                name="mobileNumber"
              />
            </div>
          </div>

          <!-- Place of Birth -->
          <div class="flex flex-col gap-2">
            <label>Place of Birth</label>
            <InputText required v-model="student.birthPlace" name="birthPlace" />
          </div>

          <!-- Parent Info -->
          <div class="flex flex-col md:flex-row gap-2">
            <div class="flex flex-1 flex-col gap-2">
              <label>Parent Name</label>
              <InputText required v-model="student.parentName" name="parentName" />
            </div>
            <div class="flex flex-1 flex-col gap-2">
              <label for="mobile">Parent Mobile Number</label>
              <InputText
                id="mobile"
                v-model="student.parentMobileNumber"
                type="tel"
                maxlength="11"
                pattern="[0-9]{11}"
                required
                name="parentMobileNumber"
              />
            </div>
          </div>

          <!-- Parent Address -->
          <div class="flex flex-col gap-2">
            <label>Parent Address</label>
            <InputText required v-model="student.address" name="address" />
          </div>
          <div>
            <h2 class="text-xl font-semibold">Educational Details</h2>
            <div class="flex flex-col md:flex-row gap-2">
              <div class="flex flex-1 flex-col gap-2">
                <label>Course</label>
                <Select
                  required
                  v-model="student.course"
                  :options="courseStore.courses"
                  :loading="courseStore.isLoading"
                  option-label="name"
                  option-value="id"
                  name="courseId"
                />
              </div>
              <div class="flex flex-1 flex-col gap-2">
                <label>Major</label>
                <Select
                  required
                  v-model="student.major"
                  :options="filteredMajor?.majors"
                  name="majorId"
                />
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
                  name="year"
                />
              </div>
              <div class="flex flex-1 flex-col gap-2">
                <label>Semester</label>
                <Select
                  required
                  v-model="student.semester"
                  :options="['First Semester', 'Second Semester']"
                  name="semester"
                />
              </div>
            </div>
            <div class="flex flex-col gap-2">
              <label>GWA (General Weighted Average)</label>
              <InputText required v-model="student.gwa" name="gwa" />
            </div>

            <div class="flex justify-between">
              <div class="flex flex-col gap-2 flex-1">
                <label>Upload photo of your card (Back to back)</label>
                <FileUploadProof @change="getImage" />
              </div>
            </div>
          </div>
          <!-- Submit Button -->
          <div>
            <Button
              :loading="studentStore.isLoading"
              label="Submit"
              severity="danger"
              type="submit"
              raised
              class="w-full py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
            />
          </div>
        </form>
      </div>
    </div>
  </Fluid>
</template>

<script setup lang="ts">
import { useCourseStore } from '@/stores/course'
import { useEnrollmentStore } from '@/stores/enrollment'
import { useUserStore } from '@/stores/user'
import type { Curriculum } from '@/types/curriculum'
import type { Enrollment } from '@/types/enrollment'
import type { Student } from '@/types/student'
import { useToast } from 'primevue'
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const courseStore = useCourseStore()
const userStore = useUserStore()
const enrollmentStore = useEnrollmentStore()
const router = useRouter()
const toast = useToast()
const route = useRoute()

const student = ref<Student>({
  birthDate: '',
  sex: '',
  mobileNumber: '',
  birthPlace: '',
  civilStatus: '',
  address: '',
  parentName: '',
  parentMobileNumber: '',
})

const curriculum = ref<Curriculum>({
  courseId: '',
  majorId: '',
})
const enrollment = ref<Enrollment>({
  generalAverage: '',
  academicYear: '',
  semester: '',
})

const fileFront = ref<File | null>(null)
const fileBack = ref<File | null>(null)

function onFileSelected(event: any) {
  fileFront.value = event?.files?.[0] || null
}
function onFile2Selected(event: any) {
  fileBack.value = event?.files?.[0] || null
}

async function onSubmit(student: Student, curriculum: Curriculum, enrollment: Enrollment) {
  const res = await enrollmentStore.addEnrollment(
    fileFront.value as File,
    fileBack.value as File,
    {
      id: userStore.user.student?.id,
      ...student,
      enrollment: { ...enrollment },
      curriculum: { ...curriculum },
    } as Student,
  )
  toast.add({
    severity: res.status,
    summary: res.statusMessage,
    detail: res.message,
    life: 3000,
  })
  router.push('/student')
}

onMounted(() => {
  courseStore.getCourses()
  userStore.getUser(route.params.id as string)
})

watch(
  () => curriculum.value.courseId,
  (val) => {
    if (val) {
      courseStore.getCourse(val)
    }
  },
)
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
        <form
          class="flex flex-col gap-4"
          @submit.prevent="onSubmit(student, curriculum, enrollment)"
        >
          <div class="flex flex-col md:flex-row gap-2">
            <div class="flex flex-col gap-2 flex-1">
              <label>First Name</label>
              <InputText required v-model="userStore.user.student.firstName" disabled />
            </div>
            <div class="flex flex-col gap-2 flex-1">
              <label>Middle Name</label>
              <InputText required v-model="userStore.user.student.middleName" disabled />
            </div>
            <div class="flex flex-col gap-2 flex-1">
              <label>Last Name</label>
              <InputText required v-model="userStore.user.student.lastName" disabled />
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
            <div class="flex flex-1 flex-col gap-2">
              <label for="mobile">Mobile Number</label>
              <InputText
                id="mobile"
                v-model="student.mobileNumber"
                type="tel"
                maxlength="11"
                pattern="[0-9]{11}"
                required
              />
            </div>
          </div>

          <div class="flex flex-col md:flex-row gap-2">
            <div class="flex flex-1 flex-col gap-2">
              <label>Place of Birth</label>
              <InputText required v-model="student.birthPlace" />
            </div>
            <div class="flex flex-1 flex-col gap-2">
              <label>Parent Name</label>
              <InputText required v-model="student.parentName" />
            </div>
            <div class="flex flex-1 flex-col gap-2">
              <label for="parent-mobile">Parent Mobile Number</label>
              <InputText
                id="parent-mobile"
                v-model="student.parentMobileNumber"
                type="tel"
                maxlength="11"
                pattern="[0-9]{11}"
                required
              />
            </div>
          </div>

          <div class="flex flex-col gap-2">
            <label> Address</label>
            <InputText required v-model="student.address" />
          </div>

          <div class="flex flex-col">
            <div class="flex flex-col gap-2 flex-1">
              <label>General Average</label>
              <InputText required v-model="enrollment.generalAverage" />
            </div>
            <div class="flex flex-col gap-2 flex-1 p-2">
              <label>Card</label>
              <div class="flex gap-5 flex-wrap">
                <div class="flex flex-col gap-2 flex-1">
                  <label>Front</label>
                  <FileUpload mode="basic" accept="image/*" @select="onFileSelected" />
                </div>
                <div class="flex flex-col gap-2 flex-1">
                  <label>Back</label>
                  <FileUpload mode="basic" accept="image/*" @select="onFile2Selected" />
                </div>
              </div>
            </div>
          </div>

          <!-- Course Info -->
          <div class="flex flex-col md:flex-row gap-2">
            <div class="flex flex-1 flex-col gap-2">
              <label>Course</label>
              <Select
                required
                v-model="curriculum.courseId"
                :options="courseStore.courses"
                :loading="courseStore.isLoading"
                option-label="name"
                option-value="id"
              />
            </div>
            <div class="flex flex-1 flex-col gap-2">
              <label>Major</label>
              <Select
                required
                v-model="curriculum.majorId"
                :options="courseStore.course?.majors"
                :loading="courseStore.isLoading"
                option-label="name"
                option-value="id"
              />
            </div>
          </div>

          <!-- Year & Semester -->
          <div class="flex flex-col md:flex-row gap-2">
            <div class="flex flex-1 flex-col gap-2">
              <label>Year Level</label>
              <Select required v-model="enrollment.academicYear" :options="['1', '2', '3', '4']" />
            </div>
            <div class="flex flex-1 flex-col gap-2">
              <label>Semester</label>
              <Select required v-model="enrollment.semester" :options="['1', '2']" />
            </div>
          </div>

          <div>
            <Button
              :loading="enrollmentStore.isLoading"
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

<script setup lang="ts">
import { ref, computed } from 'vue'
import Dropdown from 'primevue/dropdown'
import Card from 'primevue/card'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

interface Course {
  id: string
  name: string
}

interface Major {
  id: string
  name: string
}

interface Subject {
  code: string
  name: string
  units: number
}

type Year = '1st Year' | '2nd Year' | '3rd Year' | '4th Year'
type Semester = '1st Semester' | '2nd Semester'

const courses: Course[] = [
  { id: 'bsit', name: 'BSIT' },
  { id: 'bsba', name: 'BSBA' },
]

const majorsData: Record<string, Major[]> = {
  bsit: [
    { id: 'sd', name: 'Software Development' },
    { id: 'net', name: 'Networking' },
  ],
  bsba: [
    { id: 'mm', name: 'Marketing Management' },
    { id: 'fm', name: 'Financial Management' },
  ],
}

const years: Year[] = ['1st Year', '2nd Year', '3rd Year', '4th Year']
const semesters: Semester[] = ['1st Semester', '2nd Semester']

const selectedCourse = ref<string | null>(null)
const selectedMajor = ref<string | null>(null)
const selectedYear = ref<Year | null>(null)
const selectedSemester = ref<Semester | null>(null)
const selectedSubjects = ref<Subject[]>([])

const filteredMajors = computed<Major[]>(() => {
  return selectedCourse.value ? majorsData[selectedCourse.value] || [] : []
})

const subjectsData: Record<string, Record<string, Record<Year, Record<Semester, Subject[]>>>> = {
  bsit: {
    sd: {
      '1st Year': {
        '1st Semester': [
          { code: 'CS101', name: 'Intro to Programming', units: 3 },
          { code: 'IT102', name: 'Computer Fundamentals', units: 2 },
        ],
        '2nd Semester': [{ code: 'CS103', name: 'Data Structures', units: 3 }],
      },
    },
  },
  bsba: {
    mm: {
      '1st Year': {
        '1st Semester': [{ code: 'BA101', name: 'Intro to Marketing', units: 3 }],
        '2nd Semester': [],
      },
    },
  },
}

const filteredSubjects = computed<Subject[]>(() => {
  if (
    selectedCourse.value &&
    selectedMajor.value &&
    selectedYear.value &&
    selectedSemester.value
  ) {
    return (
      subjectsData[selectedCourse.value]?.[selectedMajor.value]?.[selectedYear.value]?.[selectedSemester.value] || []
    )
  }
  return []
})
</script>

<template>
  <main class="md:ml-64 h-auto pt-14 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
    <div class="w-full max-w-6xl mx-auto">
      <Card class="rounded-2xl shadow-lg dark:bg-gray-800 border-0">
        <template #title>
          <h2 class="text-3xl font-bold text-center">Course & Major Selection</h2>
        </template>

        <template #content>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <!-- Course -->
            <div>
              <label class="block mb-1 font-medium">Course</label>
              <Dropdown
                v-model="selectedCourse"
                :options="courses"
                option-label="name"
                option-value="id"
                placeholder="Select Course"
                class="w-full"
              />
            </div>

            <!-- Major -->
            <div>
              <label class="block mb-1 font-medium">Major</label>
              <Dropdown
                v-model="selectedMajor"
                :options="filteredMajors"
                option-label="name"
                option-value="id"
                placeholder="Select Major"
                class="w-full"
                :disabled="!selectedCourse"
              />
            </div>

            <!-- Year -->
            <div>
              <label class="block mb-1 font-medium">Year</label>
              <Dropdown
                v-model="selectedYear"
                :options="years"
                placeholder="Select Year"
                class="w-full"
                :disabled="!selectedMajor"
              />
            </div>

            <!-- Semester -->
            <div>
              <label class="block mb-1 font-medium">Semester</label>
              <Dropdown
                v-model="selectedSemester"
                :options="semesters"
                placeholder="Select Semester"
                class="w-full"
                :disabled="!selectedYear"
              />
            </div>

            <!-- Subject Selection -->
            <div class="md:col-span-2">
              <label class="block mb-1 font-medium">Subjects</label>
              <Dropdown
                v-model="selectedSubjects"
                :options="filteredSubjects"
                option-label="name"
                placeholder="Select Subjects"
                class="w-full"
                :disabled="filteredSubjects.length === 0"
                multiple
              >
                <template #value="slotProps">
                  <div class="flex flex-wrap gap-2">
                    <span
                      v-for="subject in slotProps.value"
                      :key="subject.code"
                      class="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded text-sm"
                    >
                      {{ subject.name }}
                    </span>
                  </div>
                </template>

                <template #option="slotProps">
                  <div class="flex flex-col">
                    <span class="font-medium">{{ slotProps.option.name }}</span>
                    <small class="text-xs text-gray-500">
                      {{ slotProps.option.code }} • {{ slotProps.option.units }} unit(s)
                    </small>
                  </div>
                </template>
              </Dropdown>
            </div>
          </div>
        </template>
      </Card>

      <!-- Selected Subjects Table -->
      <div class="mt-8 bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
        <h3 class="text-xl font-bold mb-4">Selected Subjects</h3>
        <DataTable
          :value="selectedSubjects"
          class="p-datatable-sm"
          stripedRows
          scrollable
          scrollHeight="200px"
        >
          <Column field="code" header="Subject Code" />
          <Column field="name" header="Subject Name" />
          <Column field="units" header="Units" />
        </DataTable>
      </div>
    </div>
  </main>
</template>

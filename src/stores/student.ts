import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Student } from '@/types/student'
import { StudentRepository } from '@/repositories/studentRepository'
import { CurriculumRepository } from '@/repositories/curriculumRepository'
import type { Curriculum } from '@/types/curriculum'
import { watchDebounced } from '@vueuse/core'

export const useStudentStore = defineStore('student', () => {
  const isLoading = ref(false)
  const students = ref<Student[]>([])
  const student = ref<Student>({})
  const totalStudents = ref(0)
  const searchQuery = ref('')
  const page = ref(0)

  const offset = computed(() => page.value * 10)

  async function getStudents() {
    isLoading.value = true
    const response = await StudentRepository.fetchStudents({
      search: searchQuery.value,
    })

    students.value = response?.data || []
    totalStudents.value = response?.total || 0
    isLoading.value = false
    console.log(students.value)
  }

  async function updateStudentStatus(uid: string, status: string, note?: string) {
    // isLoading.value = true
    // await StudentRepository.updateStudent(uid, {
    //   ...students.value.find((s) => s.uid === uid),
    //   status,
    //   note,
    // } as Student)
    // getStudents()
    // isLoading.value = false
  }

  async function getStudent(uid: string) {
    isLoading.value = true
    const response = await StudentRepository.fetchStudent(uid)
    student.value = response?.data ?? {}
    isLoading.value = false
  }

  async function addStudent(file: File, file2: File, student: Student) {
    isLoading.value = true
    const formData = new FormData()
    formData.append('file', file)
    formData.append('file2', file2)
    formData.append('student', JSON.stringify(student))

    const response = await StudentRepository.createStudent(formData)
    if (response?.statusCode == 200) {
      await getStudents()
      return {
        status: 'success',
        message: response.message,
        statusMessage: response.statusMessage ?? '',
      }
    }
    isLoading.value = false
    return {
      status: 'error',
      message: response?.message,
      statusMessage: response?.statusMessage ?? '',
    }
  }

  async function editStudent(uid: string, file: File, file2: File, student: Student) {
    isLoading.value = true
    const formData = new FormData()
    formData.append('file', file)
    formData.append('file2', file2)
    formData.append('student', JSON.stringify(student))
    const response = await StudentRepository.updateStudent(uid, formData)
    if (response?.statusCode == 200) {
      await getStudents()
      return {
        status: 'success',
        message: 'Registered successfully!',
        statusMessage: response.statusMessage ?? '',
      }
    }
    isLoading.value = false
    return {
      status: 'error',
      message: response?.message,
      statusMessage: response?.statusMessage ?? '',
    }
  }

  async function deleteStudent(uid: string) {
    isLoading.value = true
    await StudentRepository.destroyStudent(uid)
    getStudents()
    isLoading.value = false
  }

  watchDebounced(
    [searchQuery],
    (newQuery) => {
      getStudents()
    },
    { debounce: 300 },
  )

  return {
    students,
    student,
    totalStudents,
    page,
    isLoading,
    searchQuery,
    addStudent,
    getStudents,
    editStudent,
    deleteStudent,
    getStudent,
    updateStudentStatus,
  }
})

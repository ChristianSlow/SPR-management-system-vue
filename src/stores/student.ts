import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Student } from '@/types/student'
import { StudentRepository } from '@/repositories/studentRepository'
import { CurriculumRepository } from '@/repositories/curriculumRepository'
import type { Curriculum } from '@/types/curriculum'

export const useStudentStore = defineStore('student', () => {
  const isLoading = ref(false)
  const students = ref<Student[]>([])
  const student = ref<Student>({})
  const totalStudents = ref(0)
  const searchQuery = ref('')

  async function getStudents() {
    isLoading.value = true
    const response = await StudentRepository.fetchStudents({
      q: searchQuery.value,
    })

    students.value = response?.data || []
    totalStudents.value = response?.total || 0
    isLoading.value = false
    console.log(students.value)
  }

  async function updateStudentStatus(uid: string, status: string, note?: string) {
    isLoading.value = true

    // await StudentRepository.updateStudent(uid, {
    //   ...students.value.find((s) => s.uid === uid),
    //   status,
    //   note,
    // } as Student)

    getStudents()
    isLoading.value = false
  }

  async function getStudent(uid: string) {
    isLoading.value = true
    const response = await StudentRepository.fetchStudent(uid)
    student.value = response?.data as Student
    isLoading.value = false
    return response?.data as Student
  }

  async function addStudent(payload: File) {
    isLoading.value = true
    const formData = new FormData()
    formData.append('file', payload)
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

  async function editStudent(student: Student, file: File) {
    isLoading.value = true
    await StudentRepository.updateStudent(student.uid as string, student, file)
    getStudents()
    isLoading.value = false
  }

  async function deleteStudent(uid: string) {
    isLoading.value = true
    await StudentRepository.destroyStudent(uid)
    getStudents()
    isLoading.value = false
  }

  return {
    students,
    student,
    totalStudents,
    isLoading,
    addStudent,
    getStudents,
    editStudent,
    deleteStudent,
    getStudent,
    updateStudentStatus,
  }
})

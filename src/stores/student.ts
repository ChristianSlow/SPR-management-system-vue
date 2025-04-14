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

  async function getStudents() {
    isLoading.value = true
    const response = await StudentRepository.fetchStudents()
    students.value = response.data
    totalStudents.value = students.value.length
    isLoading.value = false
  }

  async function getStudent(uid: string) {
    isLoading.value = true
    const response = await StudentRepository.fetchStudent(uid)
    student.value = response.data
    isLoading.value = false
  }

  async function addStudent(student: Student) {
    isLoading.value = true
    await StudentRepository.createStudent(student)
    getStudents()
    isLoading.value = false
  }

  async function editStudent(student: Student) {
    isLoading.value = true
    console.log(student)
    const curriculum = await CurriculumRepository.fetchCurriculum(student.course as string)
    await StudentRepository.updateStudent(student.uid as string, { ...student, curriculum })
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
  }
})

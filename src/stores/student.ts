import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Student } from '@/types/student'
import { StudentRepository } from '@/repositories/studentRepository'

export const useStudentStore = defineStore('student', () => {
  const isLoading = ref(false)
  const students = ref<Student[]>([
    {
      uid: 'fsdf',
      firstName: 'sdfsdf',
      middleName: 'sfsdf',
      lastName: 'sfdsd',
      sex: 'fdsf',
      civilStatus: 'sdfds',
      studentMobileNumber: 'dsfsdf',
      birthPlace: 'sfdsd',
      parentName: 'sfsdfsddddddddd',
      parentMobileNumber: '948239847823',
      address: 'sdfsdf',
      course: 'sdfsd',
    },
  ])

  function getStudents() {
    students.value = [
      {
        uid: 'fsdf',
        firstName: 'sdfsdf',
        middleName: 'sfsdf',
        lastName: 'sfdsd',
        sex: 'fdsf',
        civilStatus: 'sdfds',
        studentMobileNumber: 'dsfsdf',
        birthPlace: 'sfdsd',
        parentName: 'sfsdfsddddddddd',
        parentMobileNumber: '948239847823',
        address: 'sdfsdf',
        course: 'sdfsd',
      },
    ]
  }
  function addStudent(student: Student) {
    students.value = [
      {
        uid: 'fsdf',
        firstName: 'sdfsdf',
        middleName: 'sfsdf',
        lastName: 'sfdsd',
        sex: 'fdsf',
        civilStatus: 'sdfds',
        studentMobileNumber: 'dsfsdf',
        birthPlace: 'sfdsd',
        parentName: 'sfsdfsddddddddd',
        parentMobileNumber: '948239847823',
        address: 'sdfsdf',
        course: 'sdfsd',
      },
    ]
    getStudents()
    isLoading.value = false
  }

  function editStudent(student: Student) {
    students.value = [
      {
        uid: 'fsdf',
        firstName: 'sdfsdf',
        middleName: 'sfsdf',
        lastName: 'sfdsd',
        sex: 'fdsf',
        civilStatus: 'sdfds',
        studentMobileNumber: 'dsfsdf',
        birthPlace: 'sfdsd',
        parentName: 'sfsdfsddddddddd',
        parentMobileNumber: '948239847823',
        address: 'sdfsdf',
        course: 'sdfsd',
      },
    ]
    getStudents()
    isLoading.value = false
  }

  async function deleteStudent(uid: string) {
    isLoading.value = true
    await StudentRepository.destroyStudent(uid)
    isLoading.value = false
  }
  return {
    students,
    isLoading,
    addStudent,
    getStudents,
    editStudent,
    deleteStudent,
  }
})

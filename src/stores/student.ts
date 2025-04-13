import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Student } from '@/types/student'

export const useStudentStore = defineStore('student', () => {
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

  return {
    students,
    getStudents,
  }
})

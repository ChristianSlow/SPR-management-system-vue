import type { Student } from './student'

export interface User {
  uid?: string
  id?: string
  firstName?: string
  middleName?: string
  lastName?: string
  email?: string
  password?: string
  student: Student
  createdAt?: any
}

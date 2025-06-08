import type { Student } from './student'

export enum Role {
  STUDENT = 'STUDENT',
  ADMIN = 'ADMIN',
}

export interface User {
  uid?: string
  id?: string
  firstName?: string
  middleName?: string
  lastName?: string
  name?: string
  role?: Role
  email?: string
  password?: string
  student: Student
  createdAt?: any
}

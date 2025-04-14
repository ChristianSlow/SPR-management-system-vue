import type { Curriculum } from './curriculum'

export interface Student {
  uid?: string
  role?: string
  firstName?: string
  middleName?: string
  lastName?: string
  sex?: string
  civilStatus?: string
  studentMobileNumber?: any
  birthPlace?: string
  birthDate?: any
  parentName?: string
  parentMobileNumber?: any
  address?: string
  course?: string
  semester?: string
  year?: string
  major?: string
  curriculum?: Curriculum
  createdAt?: any
  status?: any
}

import type { Curriculum } from './curriculum'
import type { Enrollment } from './enrollment'

export interface Student {
  uid?: string
  id?: string
  userId?: string
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
  generalAvg?: string
  gwaUrl?: string
  status?: string
  createdAt?: any
  isEnrolled?: boolean
  enrollment?: Enrollment
}

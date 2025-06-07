import type { Curriculum } from './curriculum'

export interface Enrollment {
  id?: string
  studentId?: string
  curriculumId?: string
  majorId?: string
  academicYear?: string
  semester?: string
  generalAverage?: string
  gwaUrl1?: string
  gwaUrl2?: string
  createdAt?: string
  curriculum?: Curriculum
}

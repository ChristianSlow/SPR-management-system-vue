import type { Course } from './course'
import type { Major } from './major'
import type { Subject } from './subject'

export interface Curriculum {
  id?: string
  name?: string
  course?: any
  description?: string
  courseId?: string
  subjects?: any
  enrollments?: any
  createdAt?: string
  majorId?: string
  course?: Course
  major?: Major
}

export interface Year {
  first?: any
  second?: any
}

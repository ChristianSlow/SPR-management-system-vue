import type { Course } from '@/types/course'
import type { H3Response } from '@/types/h3response'
import { useFetch } from '@vueuse/core'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
  updateDoc,
} from 'firebase/firestore'

const db = getFirestore()
const coursesRef = collection(db, 'courses')
const API_URL = import.meta.env.VITE_API_URL

export const CourseRepository = {
  // async fetchCourses() {
  //   try {
  //     const result = await useFetch(``)
  //     const querySnapshot = await getDocs(coursesRef)

  //     const courses = querySnapshot.docs.map<Course>((doc) => ({
  //       ...doc.data(),
  //       uid: doc.id,
  //     }))

  //     return { data: courses, total: 0 }
  //   } catch (error) {
  //     console.error('Error fetching courses:', error)
  //     return { data: [], total: 0 }
  //   }
  // },
  async fetchCourses(params: Record<string, any>) {
    const queryString = new URLSearchParams(params).toString()
    const url = `${API_URL}/courses${queryString ? '?' + queryString : ''}`

    try {
      const { data: response } = await useFetch(url).json<H3Response<Course[]>>()
      return response.value
    } catch (error) {
      console.error('Error fetching courses:', error)
      return { data: [] }
    }
  },

  async fetchCourse(uid: string) {
    try {
      const courseDoc = await getDoc(doc(db, 'courses', uid))

      return { data: { ...courseDoc.data(), uid: courseDoc.id } }
    } catch (error) {
      console.error('Error fetching courses:', error)
      return { data: {} }
    }
  },

  async createCourse(payload: Course) {
    try {
      await setDoc(doc(db, 'courses', payload.abbreviation as string), {
        ...payload,
      })

      return { message: 'Successfully added courses!' }
    } catch {
      return { message: 'Error adding courses' }
    }
  },

  async updateCourse(uid: string, payload: Course) {
    try {
      await updateDoc(doc(db, 'courses', uid), { ...payload })

      return { message: 'Successfully updated course!' }
    } catch (error) {
      console.error('Error updating course:', error)
      return { message: 'Error updating course' }
    }
  },

  async destroyCourse(uid: string) {
    try {
      const snapshot = await deleteDoc(doc(db, 'courses', uid))

      return { message: 'Successfully added courses!', data: snapshot }
    } catch {
      return { message: 'Error adding courses' }
    }
  },
}

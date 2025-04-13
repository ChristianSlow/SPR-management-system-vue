import type { Course } from '@/types/course'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  updateDoc,
} from 'firebase/firestore'

const db = getFirestore()
const coursesRef = collection(db, 'courses')

export const CourseRepository = {
  async fetchCourses() {
    try {
      const querySnapshot = await getDocs(coursesRef)

      const courses = querySnapshot.docs.map<Course>((doc) => ({
        ...doc.data(),
        uid: doc.id,
      }))

      return { data: courses, total: 0 }
    } catch (error) {
      console.error('Error fetching courses:', error)
      return { data: [], total: 0 }
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
      const snapshot = await addDoc(coursesRef, {
        ...payload,
      })

      return { message: 'Successfully added courses!', data: snapshot.id }
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

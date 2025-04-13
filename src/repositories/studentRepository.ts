import type { Student } from '@/types/student'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from 'firebase/firestore'

const db = getFirestore()
const usersRef = collection(db, 'users')
const studentsQuery = query(usersRef, where('role', '==', 'student'))

export const StudentRepository = {
  async fetchStudents() {
    try {
      const querySnapshot = await getDocs(studentsQuery)

      const students = querySnapshot.docs.map<Student>((doc) => ({
        ...doc.data(),
        uid: doc.id,
      }))

      return { data: students, total: 0 }
    } catch (error) {
      console.error('Error fetching students:', error)
      return { data: [], total: 0 }
    }
  },

  async fetchStudent(uid: string) {
    try {
      const studentDoc = await getDoc(doc(db, 'users', uid))

      return { data: { ...studentDoc.data(), uid: studentDoc.id } }
    } catch (error) {
      console.error('Error fetching students:', error)
      return { data: {} }
    }
  },

  async createStudent(payload: Student) {
    try {
      const snapshot = await addDoc(usersRef, {
        ...payload,
      })

      return { message: 'Successfully added students!', data: snapshot.id }
    } catch {
      return { message: 'Error adding students' }
    }
  },

  async updateStudent(uid: string, payload: Student) {
    try {
      await updateDoc(doc(db, 'users', uid), { ...payload })

      return { message: 'Successfully updated Student!' }
    } catch (error) {
      console.error('Error updating Student:', error)
      return { message: 'Error updating Student' }
    }
  },

  async destroyStudent(uid: string) {
    try {
      const snapshot = await deleteDoc(doc(db, 'users', uid))

      return { message: 'Successfully added students!', data: snapshot }
    } catch {
      return { message: 'Error adding students' }
    }
  },
}

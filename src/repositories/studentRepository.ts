import { supabase } from '@/supabase/supabase'
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
  setDoc,
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
      console.error('Error fetching curriculums:', error)
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

  async updateStudent(uid: string, payload: Student, file: File) {
    try {
      console.log(payload)
      const timestamp = new Date().toISOString().replace(/[-:.]/g, '')
      const uniqueFileName = `forms/${timestamp}_${file.name}`

      const { data, error } = await supabase.storage.from('images').upload(uniqueFileName, file, {
        contentType: file.type,
        upsert: true,
      })

      const { data: publicUrlData } = supabase.storage
        .from('images')
        .getPublicUrl(`forms/${file.name}`)

      await setDoc(
        doc(db, 'users', uid),
        { ...payload, gwaUrl: publicUrlData.publicUrl },
        { merge: true },
      )

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

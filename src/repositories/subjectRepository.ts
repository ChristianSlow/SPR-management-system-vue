import type { Subject } from '@/types/subject'
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
const subjectsRef = collection(db, 'subjects')

export const SubjectRepository = {
  async fetchSubjects() {
    try {
      const querySnapshot = await getDocs(subjectsRef)

      const subjects = querySnapshot.docs.map<Subject>((doc) => ({
        ...doc.data(),
        uid: doc.id,
      }))

      return { data: subjects, total: 0 }
    } catch (error) {
      console.error('Error fetching subjects:', error)
      return { data: [], total: 0 }
    }
  },

  async fetchSubject(uid: string) {
    try {
      const subjectDoc = await getDoc(doc(db, 'subjects', uid))

      return { data: { ...subjectDoc.data(), uid: subjectDoc.id } }
    } catch (error) {
      console.error('Error fetching subjects:', error)
      return { data: {} }
    }
  },

  async createSubject(payload: Subject) {
    try {
      const snapshot = await addDoc(subjectsRef, {
        ...payload,
      })

      return { message: 'Successfully added subjects!', data: snapshot.id }
    } catch {
      return { message: 'Error adding subjects' }
    }
  },

  async updateSubject(uid: string, payload: Partial<Subject>) {
    try {
      const subjectDoc = doc(db, 'subjects', uid)
      await updateDoc(subjectDoc, payload)

      return { message: 'Successfully updated subject!' }
    } catch (error) {
      console.error('Error updating subject:', error)
      return { message: 'Error updating subject' }
    }
  },

  async destroySubject(uid: string) {
    try {
      const snapshot = await deleteDoc(doc(db, 'subjects', uid))

      return { message: 'Successfully added subjects!', data: snapshot }
    } catch {
      return { message: 'Error adding subjects' }
    }
  },
}

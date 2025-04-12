import type { Curriculum } from '@/types/curriculum'
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
const curriculumsRef = collection(db, 'curriculums')

export const CurriculumRepository = {
  async fetchCurriculums() {
    try {
      const querySnapshot = await getDocs(curriculumsRef)

      const curriculums = querySnapshot.docs.map<Curriculum>((doc) => ({
        ...doc.data(),
        uid: doc.id,
      }))

      return { data: curriculums, total: 0 }
    } catch (error) {
      console.error('Error fetching curriculums:', error)
      return { data: [], total: 0 }
    }
  },

  async fetchCurriculum(uid: string) {
    try {
      const curriculumDoc = await getDoc(doc(db, 'curriculums', uid))

      return { data: { ...curriculumDoc.data(), uid: curriculumDoc.id } }
    } catch (error) {
      console.error('Error fetching curriculums:', error)
      return { data: {} }
    }
  },

  async createCurriculum(payload: Curriculum) {
    try {
      const snapshot = await addDoc(curriculumsRef, {
        ...payload,
      })

      return { message: 'Successfully added curriculums!', data: snapshot.id }
    } catch {
      return { message: 'Error adding curriculums' }
    }
  },

  async updateCurriculum(uid: string, payload: Partial<Curriculum>) {
    try {
      const CurriculumDoc = doc(db, 'curriculums', uid)
      await updateDoc(CurriculumDoc, payload)

      return { message: 'Successfully updated Curriculum!' }
    } catch (error) {
      console.error('Error updating Curriculum:', error)
      return { message: 'Error updating Curriculum' }
    }
  },

  async destroyCurriculum(uid: string) {
    try {
      const snapshot = await deleteDoc(doc(db, 'curriculums', uid))

      return { message: 'Successfully added curriculums!', data: snapshot }
    } catch {
      return { message: 'Error adding curriculums' }
    }
  },
}

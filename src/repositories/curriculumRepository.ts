import type { Curriculum } from '@/types/curriculum'
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

  async fetchCurriculum(course: string, major: string) {
    try {
      let curriculumDoc
      if (major) {
        curriculumDoc = await getDocs(
          query(
            collection(db, 'curriculums'),
            where('course', '==', course),
            where('major', '==', major),
          ),
        )
      } else {
        curriculumDoc = await getDocs(
          query(collection(db, 'curriculums'), where('course', '==', course)),
        )
      }

      const doc = curriculumDoc.docs[0]

      if (doc) {
        return {
          ...doc.data(),
          uid: doc.id,
        } as Curriculum
      } else {
        return {} as Curriculum
      }
    } catch (error) {
      console.error('Error fetching curriculum:', error)
      return {}
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

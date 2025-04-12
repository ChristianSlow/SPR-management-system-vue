import type { Subject } from '@/types/subject'
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore } from 'firebase/firestore'

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

  async destroySubject(uid: string) {
    try {
      const snapshot = await deleteDoc(doc(db, 'subjects', uid))

      return { message: 'Successfully added subjects!', data: snapshot }
    } catch {
      return { message: 'Error adding subjects' }
    }
  },
}

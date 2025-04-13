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
const gradesRef = collection(db, 'grades')

export const GradeRepository = {
  async fetchGrades() {
    // code here
  },
  async fetchGrade(uid: string) {
    // code here
  },
  async addGrade() {
    // code here
  },
  async updateGrade(uid: string) {
    // code here
  },
  async destroyGrade(uid: string) {
    // code here
  },
}

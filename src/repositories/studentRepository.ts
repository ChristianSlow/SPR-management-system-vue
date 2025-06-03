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

const API_URL = import.meta.env.VITE_API_URL

export const StudentRepository = {
  async fetchStudents(params: Record<string, any>) {
    const queryString = new URLSearchParams(params).toString()
    const url = `${API_URL}/students${queryString ? '?' + queryString : ''}`

    try {
      const { data: response } = await useFetch(url).json<H3Response<Student[]>>()
      return response.value
    } catch (error) {
      console.error('Error fetching students:', error)
      return { data: [], total: 0 }
    }
  },

  async fetchStudent(uid: string) {
    try {
      const { data: response } = await useFetch(`${API_URL}/students/${uid}`).json<
        H3Response<Student>
      >()
      return response.value
    } catch (error) {
      console.error('Error fetching student:', error)
      return { data: {} }
    }
  },

  async createStudent(payload: FormData) {
    try {
      const { data, error } = await useFetch(`${API_URL}/students`, {
        method: 'POST',
        body: payload,
      }).json<H3Response>()

      if (error.value) {
        throw new Error(error.value.message || 'Network error')
      }

      return data.value
    } catch (error) {
      console.error('Error adding student:', error)
      return {
        statusCode: 500,
        message: error instanceof Error ? error.message : 'Failed to add student',
      }
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
      const { data, error } = await useFetch(`${API_URL}/students/${uid}`, {
        method: 'DELETE',
        body: uid,
      }).json<H3Response>()

      if (error.value) {
        throw new Error(error.value.message || 'Network error')
      }

      return data.value
    } catch (error) {
      return {
        statusCode: 500,
        message: error instanceof Error ? error.message : 'Failed to delete student',
      }
    }
  },
}

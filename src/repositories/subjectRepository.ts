import type { Subject } from '@/types/subject'
import { useFetch } from '@vueuse/core'
import type { H3Response } from '@/types/h3response'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  Timestamp,
  updateDoc,
  where,
} from 'firebase/firestore'
import { useFirestore } from 'vuefire'

const db = useFirestore()
const subjectsRef = collection(db, 'subjects')

const API_URL = import.meta.env.VITE_API_URL

export const SubjectRepository = {
  async fetchSubjects(params: Record<string, any>) {
    const queryString = new URLSearchParams(params).toString()
    const url = `${API_URL}/subjects${queryString ? '?' + queryString : ''}`

    try {
      const { data: response } = await useFetch(url).json<H3Response<Subject[]>>()
      return response.value
    } catch (error) {
      console.error('Error fetching subjects:', error)
      return { total: 0, data: [] }
    }
  },

  async fetchSubject(id: string) {
    try {
      const { data: response } = await useFetch(`${API_URL}/subjects/${id}`).json<
        H3Response<Subject[]>
      >()

      return response.value
    } catch (error) {
      console.error('Error fetching subject:', error)
      return { data: {} }
    }
  },

  async createSubject(payload: Subject) {
    try {
      const { data } = await useFetch(`${API_URL}/subjects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }).json<H3Response>()

      return data.value
    } catch (error) {
      console.error('Error adding subject:', error)
      return {
        statusCode: 500,
        message: error instanceof Error ? error.message : 'Failed to add subject',
      }
    }
  },

  async updateSubject(id: string, payload: Partial<Subject>) {
    try {
      const { data } = await useFetch(`${API_URL}/subjects/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }).json<H3Response>()

      return data.value
    } catch (error) {
      return {
        statusCode: 500,
        message: error instanceof Error ? error.message : 'Failed to update subject',
      }
    }
  },

  async destroySubject(id: string) {
    try {
      const { data, error } = await useFetch(`${API_URL}/subjects/${id}`, {
        method: 'DELETE',
        body: id,
      }).json<H3Response>()

      if (error.value) {
        throw new Error(error.value.message || 'Network error')
      }

      return data.value
    } catch (error) {
      return {
        statusCode: 500,
        message: error instanceof Error ? error.message : 'Failed to delete subject',
      }
    }
  },
}

import { supabase } from '@/supabase/supabase'
import { useFetch } from '@vueuse/core'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const API_URL = import.meta.env.VITE_API_URL

export const useAuthStore = defineStore('auth', () => {
  const isLoading = ref(false)
  const credentials = ref({
    email: '',
    password: '',
  })

  async function signIn() {
    isLoading.value = true
    const { data, error } = await supabase.auth.signInWithPassword(credentials.value)
  }

  async function signUp(creds: any) {
    isLoading.value = true
    const { data, error } = await useFetch(`${API_URL}/users`).post(creds).json()
    isLoading.value = false
    return data.value as any
  }

  return {
    signIn,
    signUp,
    isLoading,
    credentials,
  }
})

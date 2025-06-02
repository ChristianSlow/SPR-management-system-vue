import { supabase } from '@/supabase/supabase'
import { defineStore } from 'pinia'
import { ref } from 'vue'

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

  return {
    signIn,
    isLoading,
    credentials,
  }
})

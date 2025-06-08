import { signOut, type Auth } from 'firebase/auth'
import { useRouter } from 'vue-router'

export function useLogout() {
  const router = useRouter()

  async function logout(auth: Auth) {
    await signOut(auth)
    router.replace('/auth')
  }

  return {
    logout,
  }
}

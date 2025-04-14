import { signOut, type Auth } from 'firebase/auth'
import { useRouter } from 'vue-router'

export function useLogout() {
  const router = useRouter()

  function logout(auth: Auth) {
    signOut(auth)
    router.replace('/')
  }

  return {
    logout,
  }
}

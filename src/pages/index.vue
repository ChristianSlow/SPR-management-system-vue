<script setup lang="ts">
import { ref } from 'vue'
import { doc, getDoc } from 'firebase/firestore'
import { signInWithEmailAndPassword, setPersistence, browserLocalPersistence } from 'firebase/auth'
import { useFirebaseAuth, useFirestore } from 'vuefire'
import { useToast } from 'primevue/usetoast'
import { useRouter } from 'vue-router'

const db = useFirestore()
const toast = useToast()
const auth = useFirebaseAuth()!
const router = useRouter()

const showPassword = ref(false)
const loginError = ref('')
const isLoggingIn = ref(false)
const loginSuccess = ref(false)
const isLoading = ref(false)

const credentials = ref({
  email: '',
  password: '',
})
const rememberMe = ref(true)

async function onFormSubmit() {
  isLoading.value = true
  loginError.value = ''
  isLoggingIn.value = true
  loginSuccess.value = false

  if (!credentials.value.email.includes('@')) {
    loginError.value = 'Enter a valid email address.'
    toast.add({ severity: 'error', summary: 'Invalid Email', detail: loginError.value, life: 3000 })
    isLoggingIn.value = false
    return
  }

  if (credentials.value.password.length < 6) {
    loginError.value = 'Password must be at least 6 characters.'
    toast.add({ severity: 'error', summary: 'Weak Password', detail: loginError.value, life: 3000 })
    isLoggingIn.value = false
    return
  }

  try {
    const { email, password } = credentials.value

    if (rememberMe.value) {
      await setPersistence(auth, browserLocalPersistence)
    }

    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const user = userCredential.user

    const docRef = doc(db, 'users', user.uid)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      const userData = docSnap.data()
      loginSuccess.value = true

      toast.add({ severity: 'success', summary: 'Login Successful', detail: 'Redirecting...', life: 2000 })

      setTimeout(() => {
        if (userData.role === 'admin') {
          router.push('/admin')
        } else if (userData.role === 'student') {
          router.push(userData.isDone ? '/infopage' : '/designatedsub')
        } else {
          toast.add({ severity: 'warn', summary: 'Unknown Role', detail: 'Redirecting to dashboard', life: 2500 })
          router.push('/dashboard')
        }
      }, 1500)
    } else {
      loginError.value = 'User record not found.'
      toast.add({ severity: 'error', summary: 'Login Failed', detail: loginError.value, life: 3000 })
    }
  } catch (error: any) {
    console.error('Error signing in:', error)
    switch (error.code) {
      case 'auth/invalid-email':
      case 'auth/user-not-found':
      case 'auth/wrong-password':
      case 'auth/invalid-credential':
        loginError.value = 'Incorrect email or password.'
        break
      default:
        loginError.value = 'An unknown error occurred.'
    }
    toast.add({ severity: 'error', summary: 'Authentication Error', detail: loginError.value, life: 3000 })
  } finally {
    isLoggingIn.value = false
    isLoading.value = false
  }
}
</script>

<template>
  <div class="flex flex-col min-h-screen relative">
    <Toast />

    <!-- Fullscreen Loader -->
    <div
      v-if="isLoading"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
    >
      <i class="pi pi-spin pi-spinner text-4xl text-white"></i>
    </div>

    <!-- Hero Section -->
    <!-- (keep as-is) -->

    <!-- About Section -->
    <!-- (keep as-is) -->

    <!-- Login Section -->
    <div class="w-full flex flex-col md:flex-row items-center min-h-screen bg-gray-100 mt-10">
      <div class="w-full md:w-1/2 min-h-[400px] md:min-h-screen flex items-center justify-center">
        <img src="/courses.png" class="w-full h-full object-cover rounded-xl shadow-lg" />
      </div>

      <div class="w-full md:w-1/2 flex justify-center items-center py-12 px-6">
        <div
          class="w-full max-w-md bg-white shadow-2xl rounded-2xl p-6 md:p-8 transition transform hover:scale-105"
        >
          <div class="text-center">
            <img
              src="/tlogow.jpg"
              class="mx-auto w-20 h-20 md:w-24 md:h-24 drop-shadow-md"
              alt="Tañon College Logo"
            />
            <h1 class="text-xl md:text-2xl font-bold text-red-800">Tañon College</h1>
          </div>

          <!-- Login Form -->
          <form
            @submit.prevent="onFormSubmit"
            class="mt-6 space-y-4"
            :class="{ 'opacity-60 pointer-events-none': isLoggingIn }"
          >
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">Email:</label>
              <input
                v-model="credentials.email"
                type="email"
                id="email"
                autocomplete="email"
                aria-label="Email address"
                class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none transition"
                required
              />
            </div>

            <div class="relative">
              <label for="password" class="block text-sm font-medium text-gray-700">Password:</label>
              <div class="relative">
                <input
                  v-model="credentials.password"
                  :type="showPassword ? 'text' : 'password'"
                  id="password"
                  autocomplete="current-password"
                  aria-label="Password"
                  class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none transition pr-10"
                  required
                />
                <button
                  type="button"
                  aria-label="Toggle password visibility"
                  class="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                  @click="showPassword = !showPassword"
                >
                  <i :class="showPassword ? 'pi pi-eye-slash' : 'pi pi-eye'"></i>
                </button>
              </div>
            </div>

            <div class="flex items-center gap-2">
              <input type="checkbox" v-model="rememberMe" id="remember" class="cursor-pointer" />
              <label for="remember" class="text-sm text-gray-700 cursor-pointer">Remember me</label>
            </div>

            <div class="flex justify-between items-center">
              <RouterLink to="/forgot-password" class="text-sm text-blue-600 hover:underline">
                Forgot Password?
              </RouterLink>
            </div>

            <!-- Error Message -->
            <p v-if="loginError" class="text-red-500 text-sm mt-2 text-center" aria-live="polite">
              {{ loginError }}
            </p>

            <!-- Login Button -->
            <button
              type="submit"
              class="w-full bg-red-800 text-white py-3 rounded-lg hover:bg-red-900 transition-transform transform hover:scale-105 shadow-md flex justify-center items-center gap-2"
              :disabled="isLoggingIn"
            >
              <template v-if="isLoggingIn">
                <i class="pi pi-spin pi-spinner"></i> Logging in...
              </template>
              <template v-else-if="loginSuccess">
                <i class="pi pi-check-circle text-green-300"></i> Login successful!
              </template>
              <template v-else> Login </template>
            </button>
          </form>

          <!-- Create Account -->
          <div class="mt-6 text-center">
            <RouterLink
              to="/createaccount"
              class="w-full inline-block bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-transform transform hover:scale-105 shadow-md"
            >
              Create Account
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in {
  animation: fadeIn 1.2s ease-out;
}
</style>

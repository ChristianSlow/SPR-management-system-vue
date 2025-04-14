<script setup lang="ts">
import { ref } from 'vue'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
} from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
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
const isLogin = ref(true)
const rememberMe = ref(true)

const credentials = ref({
  firstName: '',
  middleName: '',
  lastName: '',
  email: '',
  password: '',
})

async function onFormSubmit() {
  isLoading.value = true
  loginError.value = ''
  isLoggingIn.value = true
  loginSuccess.value = false

  const { email, password, firstName, lastName } = credentials.value

  if (!email.includes('@')) {
    loginError.value = 'Enter a valid email address.'
    toast.add({ severity: 'error', summary: 'Invalid Email', detail: loginError.value, life: 3000 })
    isLoggingIn.value = false
    isLoading.value = false
    return
  }

  if (password.length < 6) {
    loginError.value = 'Password must be at least 6 characters.'
    toast.add({ severity: 'error', summary: 'Weak Password', detail: loginError.value, life: 3000 })
    isLoggingIn.value = false
    isLoading.value = false
    return
  }

  try {
    await setPersistence(auth, browserLocalPersistence)

    if (isLogin.value) {
      // Login logic
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredential.user
      const docRef = doc(db, 'users', user.uid)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        const userData = docSnap.data()
        loginSuccess.value = true

        toast.add({
          severity: 'success',
          summary: 'Login Successful',
          detail: 'Redirecting...',
          life: 2000,
        })

        setTimeout(() => {
          if (userData.role === 'admin') {
            router.push('/admin')
          } else if (userData.role === 'student') {
            router.push(userData.isDone ? '/infopage' : '/designatedsub')
          } else {
            toast.add({
              severity: 'warn',
              summary: 'Unknown Role',
              detail: 'Redirecting...',
              life: 2500,
            })
            router.push('/dashboard')
          }
        }, 1500)
      } else {
        loginError.value = 'User record not found.'
        toast.add({
          severity: 'error',
          summary: 'Login Failed',
          detail: loginError.value,
          life: 3000,
        })
      }
    } else {
      // Sign-up logic
      if (!firstName || !lastName) {
        loginError.value = 'Please fill in all required fields.'
        toast.add({
          severity: 'warn',
          summary: 'Missing Info',
          detail: loginError.value,
          life: 3000,
        })
        isLoading.value = false
        isLoggingIn.value = false
        return
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      await setDoc(doc(db, 'users', user.uid), {
        firstName: credentials.value.firstName,
        middleName: credentials.value.middleName,
        lastName: credentials.value.lastName,
        email,
        role: 'student',
        isApproved: false,
        isDone: false,
        createdAt: new Date(),
      })

      toast.add({
        severity: 'success',
        summary: 'Account Created',
        detail: 'Redirecting...',
        life: 2000,
      })

      setTimeout(() => {
        router.push('/student/info')
      }, 1500)
    }
  } catch (error: any) {
    console.error('Auth Error:', error)
    loginError.value = error.message
    toast.add({ severity: 'error', summary: 'Auth Error', detail: error.message, life: 3000 })
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
              src="/tlogow.png"
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
            <div v-if="!isLogin">
              <div class="flex flex-col gap-2">
                <label for="firstname">Firstname</label>
                <InputText id="firstname" v-model="credentials.firstName" />
              </div>
              <div class="flex flex-col gap-2">
                <label for="middlename">Middlename</label>
                <InputText id="middlename" v-model="credentials.middleName" />
              </div>
              <div class="flex flex-col gap-2">
                <label for="lastname">Lastname</label>
                <InputText id="lastname" v-model="credentials.lastName" />
              </div>
            </div>
            <div class="flex flex-col gap-2">
              <label for="username">Email</label>
              <InputText id="username" v-model="credentials.email" />
            </div>
            <div class="flex flex-col gap-2">
              <label for="password">Password</label>
              <Password
                id="password"
                v-model="credentials.password"
                toggleMask
                :feedback="false"
                class="w-full"
                inputClass="w-full"
              />
            </div>

            <!-- 
            <div class="flex items-center gap-2">
              <input type="checkbox" v-model="rememberMe" id="remember" class="cursor-pointer" />
              <label for="remember" class="text-sm text-gray-700 cursor-pointer">Remember me</label>
            </div> -->

            <!-- <div class="flex justify-between items-center">
              <RouterLink to="/forgot-password" class="text-sm text-blue-600 hover:underline">
                Forgot Password?
              </RouterLink>
            </div> -->

            <!-- Error Message -->
            <p v-if="loginError" class="text-red-500 text-sm mt-2 text-center" aria-live="polite">
              {{ loginError }}
            </p>

            <!-- Login Button -->
            <button
              type="submit"
              :loading="isLoading"
              class="w-full bg-red-800 text-white py-3 rounded-lg hover:bg-red-900 transition-transform transform hover:scale-105 shadow-md flex justify-center items-center gap-2"
            >
              {{ isLogin ? 'Login' : 'Sign up' }}
            </button>
          </form>

          <!-- Create Account -->
          <div class="mt-6 text-center">
            <Button
              v-if="isLogin"
              @click="isLogin = false"
              class="w-full inline-block bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-transform transform hover:scale-105 shadow-md"
            >
              Create Account
            </Button>
            <Button
              v-else
              @click="isLogin = true"
              class="w-full inline-block bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-transform transform hover:scale-105 shadow-md"
            >
              Login Account
            </Button>
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

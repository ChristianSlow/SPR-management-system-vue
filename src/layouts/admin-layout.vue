<script setup lang="ts">
import { useLogout } from '@/composables/useLogout'
import type { Auth } from 'firebase/auth'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useFirebaseAuth } from 'vuefire'

const auth = useFirebaseAuth()
const route = useRoute()
const op = ref()
const out = useLogout()

const items = [
  {
    label: 'Dashboard',
    path: '/admin',
    name: 'admin-dashboard',
    icon: 'pi pi-home mr-2',
  },
  {
    label: 'Courses',
    path: '/admin/courses',
    name: 'admin-courses',
    icon: 'pi pi-book mr-2',
  },
  {
    label: 'Subjects',
    path: '/admin/subjects',
    name: 'admin-subjects',
    icon: 'pi pi-bookmark mr-2',
  },
  {
    label: 'Curriculum',
    path: '/admin/curriculum',
    name: 'admin-curriculum',
    icon: 'pi pi-server mr-2',
  },
  {
    label: 'Approval Queue',
    path: '/admin/approval-queue',
    name: 'admin-approval-queue',
    icon: 'pi pi-id-card mr-2',
  },
  {
    label: 'Students',
    path: '/admin/students',
    name: 'admin-students',
    icon: 'pi pi-users mr-2',
  },
  {
    label: 'Settings',
    path: '/admin/setting',
    name: 'admin-setting',
    icon: 'pi pi-cog mr-2',
  },
]

const toggle = (event: any) => {
  op.value.toggle(event)
}
</script>
<template>
  <main class="h-[100vh] flex flex-col overflow-hidden">
    <nav class="p-4 border-b">
      <div class="max-w-screen-xl flex items-center justify-between mx-auto">
        <a href="#" class="flex items-center space-x-3">
          <img src="/tlogow.png" class="h-10 w-10" alt="Logo" />
          <span class="self-center text-xl md:text-3xl font-bold text-gray-900 dark:text-white"
            >TAÑON COLLEGE</span
          >
        </a>

        <div class="md:hidden flex items-center">
          <button class="text-gray-800 dark:text-white text-2xl">
            <i class="pi pi-bars"></i>
          </button>
        </div>

        <div class="hidden md:flex items-center relative">
          <!-- User Icon -->
          <div
            class="cursor-pointer border-2 border-white hover:border-gray-300 dark:hover:border-gray-500 rounded-full"
          >
            <i
              class="pi pi-user text-gray-800 dark:text-white text-2xl rounded-full bg-gray-300 dark:bg-gray-600 p-2 cursor-pointer"
              @click="toggle"
            ></i>
          </div>

          <!-- PrimeVue Overlay Panel for Logout
            <OverlayPanel ref="op" class="w-56 p-4 shadow-lg bg-white dark:bg-gray-800">
              <div class="flex items-center gap-3 border-b pb-3 border-gray-300 dark:border-gray-600">
                <i
                  class="pi pi-user text-gray-800 dark:text-white text-3xl rounded-full bg-gray-300 dark:bg-gray-600 p-2"
                ></i>
                <div>
                  <span class="font-semibold block text-gray-800 dark:text-white">test</span>
                  <span class="text-sm text-gray-500 dark:text-gray-300">test</span>
                </div>
              </div>
              <div class="mt-3">
                <Button
                  label="Logout"
                  icon="pi pi-sign-out"
                  class="w-full bg-red-600 hover:bg-red-600 text-white"
                />
              </div>
            </OverlayPanel> -->
        </div>
      </div>
    </nav>

    <div class="flex">
      <div class="h-[calc(100vh-76px)] w-72 border-r flex flex-col items-center py-4">
        <ul class="space-y-2 font-medium">
          <li v-for="item in items" :key="item.name">
            <RouterLink
              :to="item.path"
              class="flex items-center p-2 rounded-lg hover:bg-red-200 text-gray-500"
              :class="route.name === item.name ? 'bg-red-600 text-white' : ''"
            >
              <i :class="item.icon"></i>
              <span>{{ item.label }}</span>
            </RouterLink>
          </li>
        </ul>
      </div>

      <div class="w-full p-4 bg-gray-50 h-[calc(100vh-77px)] overflow-y-auto">
        <slot></slot>
      </div>
    </div>
  </main>
  <Popover ref="op">
    <div class="flex flex-col gap-4">
      <div>
        <Button
          label="Log out"
          severity="secondary"
          icon="pi pi-sign-out"
          text
          @click="out.logout(auth as Auth)"
        />
      </div>
    </div>
  </Popover>
</template>

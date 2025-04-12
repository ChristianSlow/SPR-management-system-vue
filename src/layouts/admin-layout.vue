<template>
  <main class="h-full flex flex-col">
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
              class="pi pi-user text-gray-800 dark:text-white text-2xl rounded-full bg-gray-300 dark:bg-gray-600 p-2"
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
      <div class="h-[calc(100vh-76px)] p-4 w-72 border-r">
        <ul class="space-y-2 font-medium">
          <li>
            <RouterLink
              to="/admin"
              class="flex items-center p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <i class="pi pi-home mr-2"></i>
              <span>Dashboard</span>
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/admin/courses"
              class="flex items-center p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <i class="pi pi-book mr-2"></i>
              <span>Courses</span>
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/admin/subjects"
              class="flex items-center p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <i class="pi pi-bookmark mr-2"></i>
              <span>Subjects</span>
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/admin/curriculum"
              class="flex items-center p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <i class="pi pi-server mr-2"></i>
              <span>Curriculum</span>
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/admin/approval-queue"
              class="flex items-center p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <i class="pi pi-id-card mr-2"></i>
              <span>Approval Queue</span>
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/admin/students"
              class="flex items-center p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <i class="pi pi-users mr-2"></i>
              <span>Students</span>
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/admin/account"
              class="flex items-center p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <i class="pi pi-user mr-2"></i>
              <span>Users Account</span>
            </RouterLink>
          </li>
        </ul>
      </div>

      <div class="w-full p-4">
        <slot></slot>
      </div>
    </div>
  </main>
</template>

<template>
  <div class="antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
    <!-- Navbar -->
    <nav
      class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-2.5 fixed left-0 right-0 top-0 z-50"
    >
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

          <!-- PrimeVue Overlay Panel for Logout -->
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
          </OverlayPanel>
        </div>
      </div>
    </nav>

    <!-- Sidebar -->
    <aside
      class="fixed top-0 left-0 z-40 w-64 h-screen pt-20 bg-white dark:bg-gray-800 border-r dark:border-gray-700 transition-transform duration-300 ease-in-out md:translate-x-0"
    >
      <div class="h-full px-3 py-4 overflow-y-auto">
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
              to="/admin/students"
              class="flex items-center p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <i class="pi pi-users mr-2"></i>
              <span>Students List</span>
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/admin/studentsinfo"
              class="flex items-center p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <i class="pi pi-id-card mr-2"></i>
              <span>Students Info</span>
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/admin/users"
              class="flex items-center p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <i class="pi pi-user mr-2"></i>
              <span>Users Account</span>
            </RouterLink>
          </li>
        </ul>
      </div>
    </aside>

    <!-- Main Content -->
    <slot></slot>
  </div>
</template>

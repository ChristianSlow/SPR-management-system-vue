<template>
  <main class="md:ml-64 h-auto p-1 pt-16 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white text-base md:text-lg">
      <h1 class="text-4xl font-bold text-center text-gray-800 dark:text-white mb-5">Dashboard</h1>

      <!-- Grid Section for Stats -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-7">
          <div class="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 flex items-center space-x-4 border-t-4 border-black transition-all hover:shadow-lg hover:-translate-y-1">
              <AcademicCapIcon class="h-14 w-14 text-blue-500" />
              <div>
                  <h3 class="text-xl font-semibold text-gray-700 dark:text-white">Total Courses</h3>
                  <p class="text-gray-500 dark:text-gray-300 text-2xl font-medium">{{}}</p>
              </div>
          </div>

          <div class="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 flex items-center space-x-4 border-t-4 border-black transition-all hover:shadow-lg hover:-translate-y-1">
              <UserGroupIcon class="h-14 w-14 text-green-500" />
              <div>
                  <h3 class="text-xl font-semibold text-gray-700 dark:text-white">Registered Students</h3>
                  <p class="text-gray-500 dark:text-gray-300 text-2xl font-medium">{{}}</p>
              </div>
          </div>

          <div class="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 flex items-center space-x-4 border-t-4 border-black transition-all hover:shadow-lg hover:-translate-y-1">
              <XCircleIcon class="h-14 w-14 text-red-500" />
              <div>
                  <h3 class="text-xl font-semibold text-gray-700 dark:text-white">Denied Students</h3>
                  <p class="text-gray-500 dark:text-gray-300 text-2xl font-medium">{{}}</p>
              </div>
          </div>

          <div class="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 flex items-center space-x-4 border-t-4 border-black transition-all hover:shadow-lg hover:-translate-y-1">
              <UserGroupIcon class="h-14 w-14 text-black" />
              <div>
                  <h3 class="text-xl font-semibold text-gray-700 dark:text-white">Total Students</h3>
                  <p class="text-gray-500 dark:text-gray-300 text-2xl font-medium">{{}}</p>
              </div>
          </div>
      </div>

      <!-- Insights Section -->
      <div class="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-4 border-t-4 border-black">
          <h2 class="text-3xl font-semibold text-center text-gray-900 dark:text-white mb-6">Detailed Insights</h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div class="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 border-t-4 border-black">
                  <h3 class="text-2xl font-semibold text-gray-900 dark:text-white">Student Statistics</h3>
                  <p class="text-gray-500 dark:text-gray-300 mt-3 text-lg">Total Students: <span class="font-semibold text-gray-900 dark:text-white">{{}}</span></p>
                  <p class="text-gray-500 dark:text-gray-300 text-lg">Acceptance Rate: <span class="font-semibold text-green-600">{{}}%</span></p>
                  <p class="text-gray-500 dark:text-gray-300 text-lg">Denial Rate: <span class="font-semibold text-red-600">{{}}%</span></p>
              </div>

              <div class="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 border-t-4 border-black">
                  <h3 class="text-2xl font-semibold text-gray-900 dark:text-white mb-3">Enrollment Trends</h3>
                  <div class="relative w-full h-72">
                      <canvas id="enrollmentChart"></canvas>
                  </div>
              </div>
          </div>
      </div>
  </main>
</template>

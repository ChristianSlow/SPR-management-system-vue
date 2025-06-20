<script setup lang="ts">
import { useAnalyticStore } from '@/stores/analytic'
import { onMounted } from 'vue'

const store = useAnalyticStore()

onMounted(() => {
  store.fetchAnalytics()
})
</script>

<template>
  <div>
    <h1 class="text-xl text-gray-800 dark:text-white mb-5">Dashboard</h1>

    <!-- Grid Section for Stats -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-7">
      <div class="bg-white border rounded-xl p-6 flex items-center space-x-4 transition-all">
        <i class="pi pi-book text-4xl text-blue-500" />
        <div>
          <h3 class="text-lg text-gray-700 dark:text-white">Total Courses</h3>
          <p class="text-gray-500 dark:text-gray-300 text-2xl font-medium">
            {{ store.analytics?.courses }}
          </p>
        </div>
      </div>

      <div class="bg-white border rounded-xl p-6 flex items-center space-x-4 transition-all">
        <i class="pi pi-bookmark text-4xl text-green-500" />
        <div>
          <h3 class="text-lg text-gray-700 dark:text-white">Total Subjects</h3>
          <p class="text-gray-500 dark:text-gray-300 text-2xl font-medium">
            {{ store.analytics?.subjects }}
          </p>
        </div>
      </div>

      <div class="bg-white border rounded-xl p-6 flex items-center space-x-4 transition-all">
        <i class="pi pi-server text-4xl text-red-500" />
        <div>
          <h3 class="text-lg text-gray-700 dark:text-white">Total Curriculum</h3>
          <p class="text-gray-500 dark:text-gray-300 text-2xl font-medium">
            {{ store.analytics?.curriculums }}
          </p>
        </div>
      </div>

      <div class="bg-white border rounded-xl p-6 flex items-center space-x-4 transition-all">
        <i class="pi pi-users text-4xl text-black" />
        <div>
          <h3 class="text-lg text-gray-700 dark:text-white">Total Students</h3>
          <p class="text-gray-500 dark:text-gray-300 text-2xl font-medium">
            {{ store.analytics?.students }}
          </p>
        </div>
      </div>
    </div>

    <!-- Insights Section -->
    <div class="bg-white shadow-lg rounded-xl p-4">
      <h2 class="text-xl text-gray-900 dark:text-white mb-6">Detailed Insights</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="bg-white border rounded-xl p-6">
          <h3 class="text-2xl font-semibold text-gray-900 dark:text-white">Student Statistics</h3>
          <p class="text-gray-500 dark:text-gray-300 mt-3 text-lg">
            Total Students:
            <span class="font-semibold text-gray-900 dark:text-white">{{
              store.analytics?.students
            }}</span>
          </p>
          <p class="text-gray-500 dark:text-gray-300 text-lg">
            Acceptance Rate: <span class="font-semibold text-green-600">0%</span>
          </p>
          <p class="text-gray-500 dark:text-gray-300 text-lg">
            Denial Rate: <span class="font-semibold text-red-600">0%</span>
          </p>
        </div>

        <div class="bg-white border rounded-xl p-6">
          <h3 class="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
            Enrollment Trends
          </h3>
          <div class="relative w-full h-72">
            <canvas id="enrollmentChart"></canvas>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

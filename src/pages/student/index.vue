<template>
  <main class="p-1 bg-gray-100 min-h-screen flex items-center justify-center">
    <div class="bg-white shadow-lg rounded-lg p-1 w-full max-w-4xl">
      <!-- Header with Download Button -->
      <div class="flex justify-end items-center mb-4">
        <!-- <h2 class="text-lg font-semibold text-gray-800">Subject List</h2> -->
        <Button
          label="Download"
          icon="pi pi-download"
          class="p-button-sm custom-download-button transition-transform hover:scale-105"
        />
      </div>

      <!-- Content to Capture -->
      <div id="captureArea" class="border border-gray-300 p-6 rounded-lg shadow-sm bg-white">
        <div class="text-center mb-6">
          <img class="mx-auto" width="80" height="80" src="/tlogo.png" alt="Tañon College Logo" />
          <h1 class="text-red-800 text-xl font-bold">TAÑON COLLEGE</h1>
          <h2 class="text-gray-900 font-bold text-md">OFFICE OF THE REGISTRAR AND ADMISSIONS</h2>
          <p class="text-gray-900 text-sm">San Carlos City, Negros Occidental</p>
        </div>
        <h2 class="text-lg font-bold text-black text-center">Name</h2>
        <h2 class="text-lg font-bold text-black text-center mb-4">Year:</h2>
        <h2 class="text-xl font-bold text-gray-900 text-center">Course</h2>
        <h2 class="text-lg font-semibold text-gray-900 text-center mb-3">Major</h2>

        <p class="text-gray-500 text-center">Loading subjects...</p>

        <div>
          <table class="w-full border-collapse border border-gray-300 rounded-lg shadow-sm text-sm">
            <thead>
              <tr class="bg-gray-900 text-white">
                <th class="border p-2 text-left">Subject Code</th>
                <th class="border p-2 text-left">Descriptive Title</th>
                <th class="border p-2 text-center">Units</th>
                <th class="border p-2 text-center">Grades</th>
              </tr>
            </thead>
            <tbody>
              <tr class="even:bg-gray-100 hover:bg-gray-200 text-gray-700">
                <td class="border p-2">ubject Code</td>
                <td class="border p-2">Descriptive Title</td>
                <td class="border p-2 text-center">Units</td>
                <td class="border p-2 text-center">Grades</td>
              </tr>
            </tbody>
          </table>

          <div class="text-right font-semibold text-md mt-6 p-4 bg-gray-200 rounded-lg">
            Total Units: <span class="text-blue-600">Total Units</span>
          </div>
        </div>
      </div>
      <div class="flex justify-center mt-6">
        <Button
          label="Enroll"
          icon="pi pi-sign-out"
          class="p-button-sm p-button-danger transition-transform hover:scale-105"
        />
      </div>
      <!-- Logout Button (Now Below the Content) -->
      <div class="flex justify-center mt-6">
        <Button
          label="Logout"
          icon="pi pi-sign-out"
          class="p-button-sm p-button-danger transition-transform hover:scale-105"
        />
      </div>
    </div>
  </main>
</template>

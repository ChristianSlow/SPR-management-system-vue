<script setup lang="ts">
import { useDialog } from 'primevue'
import { defineAsyncComponent } from 'vue'

const accept = defineAsyncComponent(
  () => import('@/pages/admin/approval-queue/_components/accept-modal.vue'),
)

const dialog = useDialog()
</script>

<template>
  <div class="bg-white">
    <div class="bg-white border rounded-md p-4 overflow-hidden">
      <h1
        class="text-center text-4xl font-bold bg-red-500 text-white dark:text-white p-5 border-b border-gray-300 dark:border-gray-600"
      >
        Students Approval
      </h1>

      <div class="p-3">
        <!-- Filters Section -->
        <div class="mb-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <!-- Search Input -->
          <div class="relative w-full md:w-2/3">
            <InputText type="text" placeholder="Search..." />
          </div>

          <!-- Status Filter Dropdown -->
          <Select
            :options="['Pending', 'Accepted', 'Denied']"
            placeholder="Select status"
            class="w-full md:w-56"
          />
        </div>

        <!-- Students Table -->
        <div class="overflow-x-auto">
          <table
            class="w-full text-sm text-left text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600"
          >
            <thead
              class="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white uppercase text-xs font-bold border-b"
            >
              <tr>
                <th class="px-4 py-3">Student Name</th>
                <th class="px-4 py-3">Course</th>
                <th class="px-4 py-3">Major</th>
                <th class="px-4 py-3">Status</th>
                <th class="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b hover:bg-gray-50 dark:hover:bg-gray-600">
                <td class="px-4 py-3"></td>
                <td class="px-4 py-3"></td>
                <td class="px-4 py-3"></td>
                <td class="px-4 py-3">
                  <span
                    class="px-2 py-1 rounded text-xs font-bold"
                    :class="{
                      'bg-green-200 text-green-800 dark:bg-green-700 dark:text-green-200':
                        'Accepted',
                      'bg-red-200 text-red-800 dark:bg-red-700 dark:text-red-200': 'Denied',
                      'bg-yellow-200 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-200':
                        'Pending',
                    }"
                  >
                    Pending
                  </span>
                </td>
                <td class="px-4 py-3">
                  <div class="flex gap-2">
                    <Button
                      label="Accept"
                      @click="
                        () => {
                          dialog.open(accept, {
                            props: {
                              header: 'Confirm',
                              style: {
                                width: '50vw',
                              },
                              breakpoints: {
                                '960px': '75vw',
                                '640px': '90vw',
                              },
                              modal: true,
                            },
                          })
                        }
                      "
                    />
                    <Button label="deny" />
                    <button
                      class="p-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 focus:outline-none"
                    >
                      <i class="pi pi-eye"></i>
                    </button>
                    <button
                      class="p-2 bg-gray-500 text-white rounded-md shadow hover:bg-gray-600 focus:outline-none"
                    >
                      <i class="pi pi-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td colspan="5" class="text-center py-4">No matching students found.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <!-- Modal -->
    <AcceptModal />
  </div>
</template>

<style scoped>
/* Custom button hover effects */
button {
  transition: all 0.2s ease-in-out;
}
button:hover {
  transform: scale(1.05);
}
</style>

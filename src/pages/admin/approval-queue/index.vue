<template>
	<main
		class="md:ml-64 h-auto pt-14 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
		<div class="bg-white dark:bg-gray-800 shadow-lg overflow-hidden">
			<h1
				class="text-center text-4xl font-bold bg-gray-200 dark:bg-gray-700 text-black dark:text-white p-5 border-b border-gray-300 dark:border-gray-600">
				Students List
			</h1>

			<div class="p-3">
				<!-- Filters Section -->
				<div
					class="mb-4 flex flex-col md:flex-row justify-between items-center gap-4">
					<!-- Search Input -->
					<div class="relative w-full md:w-2/3">
						<i
							class="pi pi-search text-gray-500 dark:text-gray-300 absolute left-3 top-1/2 transform -translate-y-1/2"></i>
						<input
							class="w-full p-3 pl-10 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
							placeholder="Search by name, course, or major" />
					</div>

					<!-- Status Filter Dropdown -->
					<Dropdown
						:options="['', 'Pending', 'Accepted', 'Denied']"
						placeholder="Filter by Status"
						class="w-full md:w-1/3 p-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md" />
				</div>

				<!-- Loading Indicator -->
				<div
					class="text-center text-gray-600 dark:text-gray-300 py-5">
					<i class="pi pi-spin pi-spinner text-3xl"></i>
					<p>Loading students...</p>
				</div>

				<!-- Students Table -->
				<div
					class="overflow-x-auto">
					<table
						class="w-full text-sm text-left text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600">
						<thead
							class="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white uppercase text-xs font-bold border-b">
							<tr>
								<th class="px-4 py-3">Student Name</th>
								<th class="px-4 py-3">Course</th>
								<th class="px-4 py-3">Major</th>
								<th class="px-4 py-3">Status</th>
								<th class="px-4 py-3">Action</th>
							</tr>
						</thead>
						<tbody>
							<tr
								class="border-b hover:bg-gray-50 dark:hover:bg-gray-600">
								<td class="px-4 py-3"></td>
								<td class="px-4 py-3"></td>
								<td class="px-4 py-3"></td>
								<td class="px-4 py-3">
									<span
										class="px-2 py-1 rounded text-xs font-bold"
										:class="{
											'bg-green-200 text-green-800 dark:bg-green-700 dark:text-green-200': 'Accepted',
											'bg-red-200 text-red-800 dark:bg-red-700 dark:text-red-200': 'Denied',
											'bg-yellow-200 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-200': 'Pending',
                            }">
										{{ 'Pending' }}
									</span>
								</td>
								<td class="px-4 py-3">
									<div class="flex gap-2">
										<template>
											<button
												class="p-2 bg-green-500 text-white rounded-md shadow hover:bg-green-600 focus:outline-none">
												<i class="pi pi-check mr-1"></i> Accept
											</button>
											<button
												class="p-2 bg-red-500 text-white rounded-md shadow hover:bg-red-600 focus:outline-none">
												<i class="pi pi-times mr-1"></i> Deny
											</button>
										</template>
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
								<td
									colspan="5"
									class="text-center py-4">
									No matching students found.
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
		<!-- Modal -->
		<!-- <div
			class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
			<div
				class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-11/12 max-w-md">
				<h2 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
					{{ 'accept' ? 'Accept' : 'Deny' }} Student
				</h2>
				<input />
				<textarea
					rows="4"
					class="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
					placeholder="Enter your message here..."></textarea>
				<div class="flex justify-end mt-4 gap-2">
					<button
						class="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500">
						Cancel
					</button>
					<button
						:class="[
							'px-4 py-2 text-white rounded', 'accept'
								? 'bg-green-500 hover:bg-green-600'
								: 'bg-red-500 hover:bg-red-600',
						]">
						{{ 'accept' ? 'Accept' : 'Deny' }}
					</button>
				</div>
			</div>
		</div> -->
	</main>
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

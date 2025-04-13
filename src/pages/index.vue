<template>
  <div class="flex flex-col min-h-screen relative">
    <!-- Hero Section (Will Not Scroll) -->
    <div
      class="relative w-full flex justify-center items-center h-screen bg-cover bg-center px-4"
      style="background-image: url('/bg.jpg')"
    >
      <!-- Dark Overlay for Readability -->
      <div class="absolute inset-0 bg-black bg-opacity-50"></div>

      <!-- Centered Content -->
      <div
        class="relative z-10 flex flex-col justify-center items-center text-white text-center animate-fade-in"
      >
        <img
          src="/tlogow.png"
          alt="Tañon College Logo"
          class="w-32 h-32 md:w-40 md:h-40 mb-4 drop-shadow-lg"
        />
        <h1 class="text-3xl md:text-5xl font-extrabold tracking-wide drop-shadow-md">
          Welcome to Tañon College
        </h1>
      </div>
    </div>

    <!-- About Section -->
    <div class="w-full max-w-lg mx-auto bg-white shadow-lg rounded-2xl p-6 text-center mt-10">
      <img
        src="/tlogow.png"
        class="mx-auto w-20 h-20 md:w-24 md:h-24 drop-shadow-md"
        alt="Tañon College Logo"
      />
      <h1 class="text-xl md:text-3xl font-bold text-red-800">Tañon College</h1>
      <h4 class="text-xl md:text-xl pt-4 font-bold text-black">About Our Institution</h4>

      <Carousel :numVisible="1" :numScroll="1" :circular="true" :autoplayInterval="3000">
        <template #item="slotProps">
          <div class="p-4">
            <h3 class="text-lg md:text-xl font-semibold text-gray-800">
              {{ slotProps.data.title }}
            </h3>
            <p class="text-gray-600 mt-2 text-sm md:text-base">{{ slotProps.data.description }}</p>
          </div>
        </template>
      </Carousel>
    </div>

    <!-- Main Content Section -->
    <div class="w-full flex flex-col md:flex-row items-center min-h-screen bg-gray-100 mt-10">
      <!-- Left Section: Course Image (Fully Responsive) -->
      <div class="w-full md:w-1/2 min-h-[400px] md:min-h-screen flex items-center justify-center">
        <img src="/courses.png" class="w-full h-full object-cover rounded-xl shadow-lg" />
      </div>

      <!-- Right Section: Login Form -->
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
          <form class="mt-6 space-y-4">
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">Email:</label>
              <input
                type="email"
                id="email"
                class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none transition"
                required
              />
            </div>

            <div class="relative">
              <label for="password" class="block text-sm font-medium text-gray-700"
                >Password:</label
              >
              <div class="relative">
                <input
                  id="password"
                  class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none transition pr-10"
                  required
                />
                <button
                  type="button"
                  class="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                >
                  <i></i>
                </button>
              </div>
            </div>

            <!-- Error Message -->
            <p class="text-red-500 text-sm mt-2 text-center">{{}}</p>

            <div class="flex justify-between items-center">
              <RouterLink to="/forgot-password" class="text-sm text-blue-600 hover:underline">
                Forgot Password?
              </RouterLink>
            </div>

            <button
              type="submit"
              class="w-full bg-red-800 text-white py-3 rounded-lg hover:bg-red-900 transition-transform transform hover:scale-105 shadow-md flex justify-center items-center gap-2"
            >
              Login
              <!-- <template >
                              <i class="pi pi-spin pi-spinner"></i> Logging in...
                          </template>
                          <template >
                              <i class="pi pi-check-circle text-green-300"></i> Login successful!
                          </template>
                          <template>
                              Login
                          </template> -->
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
/* Fade-in animation */
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

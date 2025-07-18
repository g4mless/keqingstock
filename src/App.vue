<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

// Define the structure of an image object
interface Image {
  url: string;
  source: string;
}

// Reactive state
const allImages = ref<Image[]>([]);
const currentPage = ref(1);
const isLoading = ref(true);
const error = ref<string | null>(null);

// Constants
const pageSize = 20;

// Computed properties for pagination
const totalPages = computed(() => {
  return Math.ceil(allImages.value.length / pageSize);
});

const paginatedImages = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  const end = start + pageSize;
  return allImages.value.slice(start, end);
});

// Methods
const fetchImages = async () => {
  isLoading.value = true;
  error.value = null;
  try {
    const response = await fetch('https://keqing-api.vercel.app/api/v1/all');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    // Assuming the API returns the array directly
    allImages.value = data || [];
  } catch (e) {
    console.error('Failed to fetch images:', e);
    error.value = 'Failed to load images. Please try again later.';
  } finally {
    isLoading.value = false;
  }
};

const changePage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

// Lifecycle hook
onMounted(() => {
  fetchImages();
});
</script>

<template>
  <div class="bg-gray-900 text-white min-h-screen font-sans">
    <header class="sticky top-0 z-10 bg-gray-900/70 backdrop-blur-lg py-4 shadow-lg">
      <div class="container mx-auto">
        <h1 class="text-2xl font-bold text-left text-blue-300">
          Keqing Image Gallery
        </h1>
      </div>
    </header>

    <main class="container mx-auto p-4">
      <!-- Loading State -->
      <div v-if="isLoading" class="flex justify-center items-center h-64">
        <div class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center text-red-400 bg-red-900/20 p-4 rounded-lg">
        <p>{{ error }}</p>
      </div>

      <!-- Content -->
      <div v-else>
        <!-- Image Grid -->
        <div class="columns-2 sm:columns-3 md:columns-4 gap-4">
          <a
            v-for="image in paginatedImages"
            :key="image.url"
            :href="image.source"
            target="_blank"
            rel="noopener noreferrer"
            class="block hover:opacity-80 transition-opacity break-inside-avoid mb-4"
          >
            <img
              :src="image.url"
              :alt="'Image from source: ' + image.source"
              class="w-full h-auto shadow-md shadow-black/20"
              loading="lazy"
            />
          </a>
        </div>

        <!-- Pagination Controls -->
        <div v-if="totalPages > 1" class="flex justify-center items-center space-x-2 mt-8">
          <button
            @click="changePage(currentPage - 1)"
            :disabled="currentPage === 1"
            class="px-4 py-2 rounded font-bold transition-colors text-sm bg-blue-600 hover:bg-blue-500 disabled:bg-gray-700 disabled:text-gray-400 disabled:cursor-not-allowed"
          >
            Prev
          </button>

          <span class="text-gray-300">
            Page {{ currentPage }} of {{ totalPages }}
          </span>

          <button
            @click="changePage(currentPage + 1)"
            :disabled="currentPage === totalPages"
            class="px-4 py-2 rounded font-bold transition-colors text-sm bg-blue-600 hover:bg-blue-500 disabled:bg-gray-700 disabled:text-gray-400 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </main>
  </div>
</template>
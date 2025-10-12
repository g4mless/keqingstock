<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

interface Image {
  url: string;
  source: string;
}

const allImages = ref<Image[]>([]);
const currentPage = ref(1);
const isLoading = ref(true);
const error = ref<string | null>(null);

//total image per page
const pageSize = 20;

const totalPages = computed(() => {
  return Math.ceil(allImages.value.length / pageSize);
});

const paginatedImages = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  const end = start + pageSize;
  return allImages.value.slice(start, end);
});

const fetchImages = async () => {
  isLoading.value = true;
  error.value = null;
  try {
    const response = await fetch('https://keqing-api.vercel.app/api/v1/all');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    allImages.value = data || [];
  } catch (e) {
    console.error('Failed to fetch images:', e);
    error.value = 'Failed to load images. Please try again later.';
  } finally {
    isLoading.value = false;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

onMounted(() => {
  fetchImages();
});
</script>

<template>
  <div class="bg-gradient-to-br from-neutral-800/30 to-purple-950/30 text-white min-h-screen font-sans">
    <header class="sticky top-0 z-10 bg-neutral-900/70 backdrop-blur-lg py-4 shadow-lg border border-white/10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-xl font-bold text-neutral-100">
            <span class="text-purple-500">Keqing</span>Stock
        </h1>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-8">
      <div v-if="isLoading" class="flex justify-center items-center h-64">
        <div class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-violet-500"></div>
      </div>

      <div v-else-if="error" class="text-center text-red-400 bg-red-900/20 p-4 rounded-lg">
        <p>{{ error }}</p>
      </div>

      <!-- Content -->
      <div v-else>
        <!-- Image Grid -->
        <div class="columns-2 sm:columns-3 md:columns-3 lg:columns-4 gap-4">
          <a
            v-for="image in paginatedImages"
            :key="image.url"
            :href="image.source"
            target="_blank"
            rel="noopener noreferrer"
            class="group block overflow-hidden shadow-md shadow-black/20 break-inside-avoid mb-4"
          >
            <img
              :src="image.url"
              :alt="'Image from source: ' + image.source"
              class="w-full h-auto transition-transform duration-300 ease-in-out group-hover:scale-105"
              loading="lazy"
            />
          </a>
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="flex justify-center items-center space-x-2 mt-8">
          <button
            @click="prevPage"
            :disabled="currentPage === 1"
            class="px-4 py-2 font-bold transition-colors text-sm bg-violet-600/30 hover:bg-violet-500/30 text-neutral-100 disabled:bg-gray-700/30 disabled:text-gray-400/30"
          >
            Prev
          </button>

          <span class="text-gray-300">
            Page {{ currentPage }} of {{ totalPages }}
          </span>

          <button
            @click="nextPage"
            :disabled="currentPage === totalPages"
            class="px-4 py-2 font-bold transition-colors text-sm bg-violet-600/30 hover:bg-violet-500/30 text-neutral-100 disabled:bg-gray-700/30 disabled:text-gray-400/30"
          >
            Next
          </button>
        </div>

        <!-- Copyleft Text -->
        <p class="text-center text-sm text-gray-400 mt-6 max-w-2xl mx-auto">
          © All artworks are belong to their original creators. Sources linked through each image.
        </p>
      </div>
    </main>
  </div>
</template>

<style>
/* stupid touchpad issue */
html {
  overflow-x: hidden;
}
/* Furry indonesia, solid solid solid */
body {
  background-color: #1c1917;
}
</style>
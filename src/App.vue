<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

interface Image {
  url: string;
  source: string;
}

const allImages = ref<Image[]>([]);
const currentPage = ref(1);
const route = useRoute();
const router = useRouter();
const selectedImage = ref<Image | null>(null);

// When true, the next currentPage change won't push a new history entry.
const skipRoutePush = ref(false);
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
    const response = await fetch('https://api.keqing.web.id/all');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    allImages.value = Array.isArray(data) ? data : [];
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
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

onMounted(() => {
  const pRaw = route.query.page;
  if (pRaw) {
    const p = Array.isArray(pRaw)
      ? parseInt(pRaw[0] ?? '')
      : parseInt(pRaw !== null ? String(pRaw) : '');
    if (Number.isInteger(p) && p > 0) {
      currentPage.value = p;
      skipRoutePush.value = true;
    }
  }

  fetchImages().then(() => {
    if (totalPages.value > 0 && currentPage.value > totalPages.value) {
      currentPage.value = Math.max(1, totalPages.value);
    }
  });
});

watch(currentPage, (val) => {
  if (skipRoutePush.value) {
    skipRoutePush.value = false;
    return;
  }

  const query = { ...route.query } as Record<string, any>;
  if (val === 1) {
    delete query.page;
  } else {
    query.page = String(val);
  }

  router.push({ name: route.name || 'home', query })
    .then(() => {
      // Scroll after navigation completes so the router doesn't override it
      window.scrollTo({ top: 0, behavior: 'smooth' });
    })
    .catch(() => {
    });
});

const columnCount = ref(2);
const masonryColumns = ref<Image[][]>([]);

const updateColumnCount = () => {
  const width = window.innerWidth;
  if (width >= 1024) {
    columnCount.value = 4;
  } else if (width >= 640) {
    columnCount.value = 3;
  } else {
    columnCount.value = 2;
  }
};

const distributeImages = () => {
  // Create empty arrays for each column
  const cols: Image[][] = Array.from({ length: columnCount.value }, () => []);
  
  // Distribute images round-robin style
  paginatedImages.value.forEach((image, index) => {
    cols[index % columnCount.value].push(image);
  });
  
  masonryColumns.value = cols;
};

watch([paginatedImages, columnCount], () => {
  distributeImages();
});

onMounted(() => {
  updateColumnCount();
  window.addEventListener('resize', updateColumnCount);
});

import { onUnmounted } from 'vue';
onUnmounted(() => {
  window.removeEventListener('resize', updateColumnCount);
});
</script>

<template>
  <div class="bg-gradient-to-br from-neutral-800/30 to-purple-950/30 text-white min-h-screen font-sans">
    <header class="sticky top-0 z-10 bg-neutral-900/70 backdrop-blur-2xl backdrop-saturate-200 py-4 shadow-lg border border-white/10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-xl font-bold text-neutral-100">
            <span class="text-purple-500">Keqing</span>Stock
        </h1>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-8">
      <div v-if="isLoading" class="flex justify-center items-center h-64">
        <div class="w-48 h-4 bg-neutral-700 rounded-full overflow-hidden relative">
          <div class="absolute h-full bg-violet-500 rounded-full animate-progress-bar"></div>
        </div>
      </div>

      <div v-else-if="error" class="text-center text-red-400 bg-red-900/20 p-4 rounded-lg">
        <p>{{ error }}</p>
      </div>

      <!-- Content -->
      <div v-else>
        <!-- Image Grid -->
        <!-- Image Grid (JS Masonry) -->
        <div class="flex gap-4 items-start">
          <div 
            v-for="(col, colIndex) in masonryColumns" 
            :key="colIndex" 
            class="flex-1 flex flex-col gap-4"
          >
            <div
              v-for="image in col"
              :key="image.url"
              class="group block overflow-hidden shadow-md shadow-black/20 cursor-pointer"
              @click="selectedImage = image"
            >
              <img
                :src="image.url"
                :alt="'Image from source: ' + image.source"
                class="w-full h-auto transition-transform duration-300 ease-in-out group-hover:scale-105"
                loading="lazy"
              />
            </div>
          </div>
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

        <!-- Lightbox Modal -->
        <div 
          v-if="selectedImage" 
          class="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 cursor-pointer"
          @click="selectedImage = null"
        >
          <div 
            class="relative w-full h-full flex items-center justify-center cursor-default"
            @click.stop
          >
            <img 
              :src="selectedImage.url" 
              :alt="selectedImage.source"
              class="max-w-[80vw] max-h-[80vh] object-contain"
            />
        <button 
          @click="selectedImage = null"
          class="absolute top-4 right-4 bg-white/20 hover:bg-white/40 text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors"
          aria-label="Close"
        >
          ✕
        </button>
        <a
          :href="selectedImage.source"
          target="_blank"
          rel="noopener noreferrer"
          class="absolute bottom-4 left-4 bg-violet-700 hover:bg-violet-800 px-4 py-2 text-sm transition-colors"
        >
          View Source
        </a>
        </div>
        </div>
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

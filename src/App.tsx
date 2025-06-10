import { Show } from 'solid-js'
import { ImageGrid } from './components/ImageGrid'
import { createResource } from 'solid-js';

interface Image {
  url: string;
  source: string;
}

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

async function fetchImages(): Promise<Image[]> {
  const res = await fetch('https://keqing-api.vercel.app/keqing')
  if(!res.ok) throw new Error('Failed to fetch lol');
  const data = await res.json()
  return shuffleArray(data)
}

function App() {
  const [images] = createResource<Image[]>(fetchImages);

  return (
    <div class="backdrop-blur-md bg-gradient-to-br from-neutral-800/30 to-purple-600/30 border border-white/10">
      <header class="sticky top-0 z-50 backdrop-blur-md bg-neutral-900/75 border-b border-neutral-800">
        <div class="max-w-7xl mx-auto px-4 h-16 flex items-center">
            <h1 class="text-xl font-bold text-neutral-100">
            <span class="text-purple-500">Keqing</span>Stock
            </h1>
        </div>
      </header>

      <div class="max-w-7xl mx-auto w-full">
        <Show when={images()} fallback={<div class="text-center text-neutral-400 py-10">Loading...</div>}>
          <ImageGrid images={images() || []} />
        </Show>
      </div>
      <footer class="sticky top-0 z-50 backdrop-blur-md bg-neutral-900/75 border-b border-neutral-800">
        <div class="max-w-7xl mx-auto px-4 h-20 flex items-center">
            <h1 class="text-m font-medium text-neutral-100">
            <span class="text-purple-500">© Copyright All Reserved</span> to The Artists.<span class="text-purple-500"> Kudos to Them</span> For Making Good Keqing Fanart 💖.
            </h1>
        </div>
      </footer>
    </div>
    
  );
}

export default App

import { createSignal } from 'solid-js'
import { ImageGrid } from './components/ImageGrid'

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function App() {
  const [images] = createSignal(shuffleArray([
    {
      id: '1',
      url: 'https://files.edgestore.dev/20jyqi4p5w9mabwp/keqing/_public/keqing-sit.webp',
      originUrl: 'https://www.pixiv.net/en/artworks/106623085',
      alt: 'Keqing sit'
    },
    {
      id: '2',
      url: 'https://files.edgestore.dev/20jyqi4p5w9mabwp/keqing/_public/keqing-see2.webp',
      originUrl: 'https://www.pixiv.net/en/artworks/102934427',
      alt: 'Keqing see2'
    },
    {
      id: '3',
      url: 'https://files.edgestore.dev/20jyqi4p5w9mabwp/keqing/_public/keqing-wet.webp',
      originUrl: 'https://x.com/mar_R_o/status/1727111162284986484',
      alt: 'Keqing wet'
    },
    {
      id: '4',
      url: 'https://files.edgestore.dev/20jyqi4p5w9mabwp/keqing/_public/keqing-see1.webp',
      originUrl: 'https://www.pixiv.net/en/artworks/102934427',
      alt: 'keqing see1'
    },
    {
      id: '5',
      url: 'https://files.edgestore.dev/20jyqi4p5w9mabwp/keqing/_public/keqing-blinking.webp',
      originUrl: 'https://x.com/ebibi_chiriri/status/1578037551717580800',
      alt: 'keqing sticker'
    },
    {
      id: '6',
      url: 'https://files.edgestore.dev/20jyqi4p5w9mabwp/keqing/_public/keqing-wp2.webp',
      originUrl: 'https://www.pixiv.net/en/artworks/90015173',
      alt: 'keqing wp 2'
    },
    {
      id: '7',
      url: 'https://files.edgestore.dev/20jyqi4p5w9mabwp/keqing/_public/keqing-aura.webp',
      originUrl: 'https://www.pixiv.net/en/artworks/130066464',
      alt: 'keqing with aura'
    },
    {
      id: '8',
      url: 'https://files.edgestore.dev/20jyqi4p5w9mabwp/keqing/_public/keqing-baloon.webp',
      originUrl: 'https://x.com/aoirooto/status/1768200404641153087',
      alt: 'keqing baloon'
    },
    {
      id: '9',
      url: 'https://files.edgestore.dev/20jyqi4p5w9mabwp/keqing/_public/keqing-ptrt2.webp',
      originUrl: 'https://www.pixiv.net/artworks/109266324',
      alt: 'keqing portrait 2'
    },
    {
      id: '10',
      url: 'https://files.edgestore.dev/20jyqi4p5w9mabwp/keqing/_public/keqing-ptrt1.webp',
      originUrl: 'https://www.pixiv.net/en/artworks/126377588',
      alt: 'keqing portrait 1'
    },
    {
      id: '11',
      url: 'https://files.edgestore.dev/20jyqi4p5w9mabwp/keqing/_public/keqing-wp1.webp',
      originUrl: 'https://www.pixiv.net/en/artworks/87977897',
      alt: 'keqing wp 1'
    },
    {
      id: '12',
      url: 'https://files.edgestore.dev/20jyqi4p5w9mabwp/keqing/_public/keqing-kimono.webp',
      originUrl: 'https://safebooru.org/index.php?page=post&s=view&id=5506434',
      alt: 'keqing wp 1'
    },
    {
      id: '13',
      url: 'https://files.edgestore.dev/20jyqi4p5w9mabwp/keqing/_public/keqing-gloom.webp',
      originUrl: 'https://www.pixiv.net/en/artworks/86046891',
      alt: 'keqing gloom'
    },
    {
      id: '14',
      url: 'https://files.edgestore.dev/20jyqi4p5w9mabwp/keqing/_public/keqing-brush.webp',
      originUrl: 'https://x.com/redi_rkgk/status/1328877046412537858',
      alt: 'keqing brush'
    },
    {
      id: '15',
      url: 'https://files.edgestore.dev/20jyqi4p5w9mabwp/keqing/_public/keqing-umbrella.webp',
      originUrl: 'https://www.pixiv.net/en/artworks/118174964',
      alt: 'keqing umbrella'
    },
    {
      id: '15',
      url: 'https://files.edgestore.dev/20jyqi4p5w9mabwp/keqing/_public/keqing-headrest.webp',
      originUrl: 'https://x.com/_luna610/status/1706959678205579453',
      alt: 'keqing headrest'
    },
    {
      id: '16',
      url: 'https://files.edgestore.dev/20jyqi4p5w9mabwp/keqing/_public/keqing-landscape.webp',
      originUrl: 'https://danbooru.donmai.us/posts/4183543',
      alt: 'keqing landscape'
    },
    {
      id: '17',
      url: 'https://files.edgestore.dev/20jyqi4p5w9mabwp/keqing/_public/keqing-bouquet.webp',
      originUrl: 'https://www.pixiv.net/en/artworks/124469294',
      alt: 'keqing bouquet'
    },
    {
      id: '18',
      url: 'https://files.edgestore.dev/20jyqi4p5w9mabwp/keqing/_public/keqing-looktoviewer.webp',
      originUrl: 'https://x.com/ringozaka_0913/status/1812817203080974838',
      alt: 'keqing look to viewer'
    },
  ]));

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
        <ImageGrid images={images()} />
      </div>
      <footer class="sticky top-0 z-50 backdrop-blur-md bg-neutral-900/75 border-b border-neutral-800">
        <div class="max-w-7xl mx-auto px-4 h-20 flex items-center">
            <h1 class="text-m font-medium text-neutral-100">
            <span class="text-purple-500">©️Copyright All Reserved</span> to The Artists.<span class="text-purple-500"> Kudos to Them</span> For Making Good Keqing Fanart 💖.
            </h1>
        </div>
      </footer>
    </div>
    
  );
}

export default App

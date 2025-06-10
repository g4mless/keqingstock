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
      url: 'https://files.edgestore.dev/20jyqi4p5w9mabwp/keqing/_public/keqing-sit.webp',
      source: 'https://www.pixiv.net/en/artworks/106623085'
    },
    {
      url: 'https://files.edgestore.dev/20jyqi4p5w9mabwp/keqing/_public/keqing-see2.webp',
      source: 'https://www.pixiv.net/en/artworks/102934427'
    },
    {
      url: 'https://files.edgestore.dev/20jyqi4p5w9mabwp/keqing/_public/keqing-wet.webp',
      source: 'https://x.com/mar_R_o/status/1727111162284986484'
    },
    {
      url: 'https://files.edgestore.dev/20jyqi4p5w9mabwp/keqing/_public/keqing-see1.webp',
      source: 'https://www.pixiv.net/en/artworks/102934427'
    },
    {
      url: 'https://files.edgestore.dev/20jyqi4p5w9mabwp/keqing/_public/keqing-blinking.webp',
      source: 'https://x.com/ebibi_chiriri/status/1578037551717580800'
    },
    {
      url: 'https://files.edgestore.dev/20jyqi4p5w9mabwp/keqing/_public/keqing-wp2.webp',
      source: 'https://www.pixiv.net/en/artworks/90015173'
    },
    {
      url: 'https://files.edgestore.dev/20jyqi4p5w9mabwp/keqing/_public/keqing-aura.webp',
      source: 'https://www.pixiv.net/en/artworks/130066464'
    },
    {
      url: 'https://files.edgestore.dev/20jyqi4p5w9mabwp/keqing/_public/keqing-baloon.webp',
      source: 'https://x.com/aoirooto/status/1768200404641153087'
    },
    {
      url: 'https://files.edgestore.dev/20jyqi4p5w9mabwp/keqing/_public/keqing-ptrt2.webp',
      source: 'https://www.pixiv.net/artworks/109266324'
    },
    {
      url: 'https://files.edgestore.dev/20jyqi4p5w9mabwp/keqing/_public/keqing-ptrt1.webp',
      source: 'https://www.pixiv.net/en/artworks/126377588'
    },
    {
      url: 'https://files.edgestore.dev/20jyqi4p5w9mabwp/keqing/_public/keqing-wp1.webp',
      source: 'https://www.pixiv.net/en/artworks/87977897'
    },
    {
      url: 'https://files.edgestore.dev/20jyqi4p5w9mabwp/keqing/_public/keqing-kimono.webp',
      source: 'https://safebooru.org/index.php?page=post&s=view&id=5506434'
    },
    {
      url: 'https://files.edgestore.dev/20jyqi4p5w9mabwp/keqing/_public/keqing-gloom.webp',
      source: 'https://www.pixiv.net/en/artworks/86046891'
    },
    {
      url: 'https://files.edgestore.dev/20jyqi4p5w9mabwp/keqing/_public/keqing-brush.webp',
      source: 'https://x.com/redi_rkgk/status/1328877046412537858'
    },
    {
      url: 'https://files.edgestore.dev/20jyqi4p5w9mabwp/keqing/_public/keqing-umbrella.webp',
      source: 'https://www.pixiv.net/en/artworks/118174964'
    },
    {
      url: 'https://files.edgestore.dev/20jyqi4p5w9mabwp/keqing/_public/keqing-headrest.webp',
      source: 'https://x.com/_luna610/status/1706959678205579453'
    },
    {
      url: 'https://files.edgestore.dev/20jyqi4p5w9mabwp/keqing/_public/keqing-landscape.webp',
      source: 'https://danbooru.donmai.us/posts/4183543'
    },
    {
      url: 'https://files.edgestore.dev/20jyqi4p5w9mabwp/keqing/_public/keqing-bouquet.webp',
      source: 'https://www.pixiv.net/en/artworks/124469294'
    },
    {
      url: 'https://files.edgestore.dev/20jyqi4p5w9mabwp/keqing/_public/keqing-looktoviewer.webp',
      source: 'https://x.com/ringozaka_0913/status/1812817203080974838'
    },
    {
      url: 'https://files.edgestore.dev/20jyqi4p5w9mabwp/keqing/_public/keqing-portrait.webp',
      source: 'https://www.pixiv.net/artworks/97767520'
    },
    {
      url: 'https://files.edgestore.dev/20jyqi4p5w9mabwp/keqing/_public/keqing-casual.webp',
      source: 'https://www.zerochan.net/3555637'
    },
    {
      url: 'https://files.edgestore.dev/20jyqi4p5w9mabwp/keqing/_public/keqing-blushingcasual.webp',
      source: 'https://x.com/tozi526/status/1858888140146254273'
    },
    {
      url: 'https://files.edgestore.dev/20jyqi4p5w9mabwp/keqing/_public/keqing-looktoviewer2.webp',
      source: 'https://x.com/fal_maro/status/1835272406103121967'
    },
    {
      url: 'https://files.edgestore.dev/20jyqi4p5w9mabwp/keqing/_public/keqing-oneeyeclosed.webp',
      source: 'https://www.pixiv.net/artworks/99030313'
    },
    {
      url: 'https://files.edgestore.dev/20jyqi4p5w9mabwp/keqing/_public/keqing-umbrella2.webp',
      source: 'https://danbooru.donmai.us/posts/7496493'
    },
    {
      url: 'https://files.edgestore.dev/20jyqi4p5w9mabwp/keqing/_public/keqing-lovesmile.webp',
      source: 'https://x.com/tyenka7728/status/1625419589508124674'
    }
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
            <span class="text-purple-500">© Copyright All Reserved</span> to The Artists.<span class="text-purple-500"> Kudos to Them</span> For Making Good Keqing Fanart 💖.
            </h1>
        </div>
      </footer>
    </div>
    
  );
}

export default App

import { For, onMount, onCleanup } from 'solid-js';

interface Image {
  url: string;
  originUrl?: string;
}

interface ImageGridProps {
  images: Image[];
}

export function ImageGrid(props: ImageGridProps) {
  let container: HTMLDivElement | undefined;
  let masonryInstance: any;
  let imagesLoaded = 0;
  const totalImages = props.images.length;
  const gutter = 16;

  const getColumnWidth = () => {
    if (!container) return 300;
    const containerWidth = container.offsetWidth;
    return window.innerWidth < 640 ? (containerWidth - gutter) / 2 : 300;
  };

  const initMasonry = () => {
    if (typeof window !== 'undefined' && container) {
      // @ts-ignore
      import('masonry-layout').then((Masonry) => {
        const columnWidth = getColumnWidth();
        masonryInstance = new Masonry.default(container, {
          itemSelector: '.grid-item',
          gutter: gutter,
          transitionDuration: '0.3s',
          initLayout: false,
          fitWidth: true,
          columnWidth: columnWidth
        });
        masonryInstance.layout();
      });
    }
  };

  const handleImageLoad = () => {
    imagesLoaded++;
    if (imagesLoaded === totalImages && masonryInstance) {
      masonryInstance.layout();
    }
  };

  const handleResize = () => {
    if (masonryInstance && container) {
      masonryInstance.options.columnWidth = getColumnWidth();
      masonryInstance.layout();
    }
  };

  onMount(() => {
    initMasonry();
    window.addEventListener('resize', handleResize);
  });

  onCleanup(() => {
    if (masonryInstance) {
      masonryInstance.destroy();
    }
    window.removeEventListener('resize', handleResize);
  });
  return (
    <div class="flex justify-center w-full p-4">
      <div ref={container} class="grid-container w-full sm:w-auto">
        <For each={props.images}>
          {(image) => (
            <div class="grid-item w-1/2 sm:w-[300px] mb-4">
              <a 
                href={image.originUrl || image.url}
                target="_blank"
                rel="noopener noreferrer"
                class="block relative overflow-hidden rounded-2xl transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg bg-white group"
              >
                <img 
                  src={image.url} 
                  loading="lazy"
                  class="w-full h-auto block transition-transform duration-300 group-hover:scale-105"
                  onLoad={handleImageLoad}
                />
              </a>
            </div>
          )}
        </For>
      </div>
    </div>
  );
}

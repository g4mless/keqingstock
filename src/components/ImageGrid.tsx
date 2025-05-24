import { For, onMount, onCleanup } from 'solid-js';

interface Image {
  id: string;
  url: string;
  alt?: string;
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

  const initMasonry = () => {
    if (typeof window !== 'undefined' && container) {
      // @ts-ignore ts pmo
      import('masonry-layout').then((Masonry) => {
        masonryInstance = new Masonry.default(container, {
          itemSelector: '.grid-item',
          gutter: 16,
          transitionDuration: '0.3s',
          initLayout: false,
          fitWidth: true
        });
      });
    }
  };

  const handleImageLoad = () => {
    imagesLoaded++;
    if (imagesLoaded === totalImages && masonryInstance) {
      masonryInstance.layout();
    }
  };

  onMount(() => {
    initMasonry();
  });

  onCleanup(() => {
    if (masonryInstance) {
      masonryInstance.destroy();
    }
  });

  return (
    <div class="flex justify-center w-full p-4">
      <div ref={container} class="grid-container">
        <For each={props.images}>
          {(image) => (
            <div class="grid-item w-[300px] p-2">              <a 
                href={image.originUrl || image.url}
                target="_blank"
                rel="noopener noreferrer"
                class="block relative overflow-hidden rounded-2xl transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg bg-white group"
              >
                <img 
                  src={image.url} 
                  alt={image.alt || 'Grid image'} 
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

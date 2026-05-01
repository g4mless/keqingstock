import { useEffect, useMemo, useState } from 'react';

interface GalleryImage {
  url: string;
  source: string;
}

const pageSize = 20;

const getPageFromUrl = () => {
  const page = Number.parseInt(new URLSearchParams(window.location.search).get('page') ?? '1', 10);
  return Number.isInteger(page) && page > 0 ? page : 1;
};

const preloadImage = (url: string) => {
  return new Promise<void>((resolve) => {
    const image = new Image();

    image.onload = () => {
      if (image.decode) {
        image.decode().then(resolve).catch(resolve);
      } else {
        resolve();
      }
    };

    image.onerror = () => resolve();
    image.src = url;
  });
};

function App() {
  const [allImages, setAllImages] = useState<GalleryImage[]>([]);
  const [currentPage, setCurrentPage] = useState(getPageFromUrl);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [columnCount, setColumnCount] = useState(2);
  const [isLoading, setIsLoading] = useState(true);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const totalPages = Math.ceil(allImages.length / pageSize);

  const paginatedImages = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return allImages.slice(start, start + pageSize);
  }, [allImages, currentPage]);

  const masonryColumns = useMemo(() => {
    const columns = Array.from({ length: columnCount }, () => [] as GalleryImage[]);
    paginatedImages.forEach((image, index) => {
      columns[index % columnCount].push(image);
    });
    return columns;
  }, [columnCount, paginatedImages]);

  useEffect(() => {
    let cancelled = false;

    const fetchImages = async () => {
      setIsLoading(true);
      setIsPageLoading(true);
      setError(null);

      try {
        const response = await fetch('/index.json');
        if (!response.ok) throw new Error('Network response was not ok');

        const data: unknown = await response.json();
        const raw = Array.isArray(data) ? data : [];
        const images = [...raw].reverse().map((img) => {
          const entry = img as { flnm?: string; src?: string };
          return {
            url: `https://rrddcemyrcmrmpjnysgb.supabase.co/storage/v1/object/public/keq/keqing-${entry.flnm ?? ''}`,
            source: entry.src ?? '',
          };
        });

        if (!cancelled) {
          setAllImages(images);
        }
      } catch (err) {
        console.error('Failed to fetch images:', err);
        if (!cancelled) {
          setError('Failed to load images. Please try again later.');
          setIsPageLoading(false);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    fetchImages();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const updateColumnCount = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setColumnCount(4);
      } else if (width >= 640) {
        setColumnCount(3);
      } else {
        setColumnCount(2);
      }
    };

    updateColumnCount();
    window.addEventListener('resize', updateColumnCount);

    return () => {
      window.removeEventListener('resize', updateColumnCount);
    };
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(getPageFromUrl());
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);

    if (currentPage === 1) {
      query.delete('page');
    } else {
      query.set('page', String(currentPage));
    }

    const nextUrl = `${window.location.pathname}${query.toString() ? `?${query}` : ''}`;
    if (nextUrl !== `${window.location.pathname}${window.location.search}`) {
      window.history.pushState(null, '', nextUrl);
    }
  }, [currentPage]);

  useEffect(() => {
    let cancelled = false;

    const preloadPage = async () => {
      if (paginatedImages.length === 0) {
        setIsPageLoading(false);
        return;
      }

      setIsPageLoading(true);
      await Promise.all(paginatedImages.map((image) => preloadImage(image.url)));

      if (!cancelled) {
        setIsPageLoading(false);
      }
    };

    preloadPage();

    return () => {
      cancelled = true;
    };
  }, [paginatedImages]);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-gradient-to-br from-neutral-800/30 to-purple-950/30 text-white min-h-screen font-sans">
      <header className="sticky top-0 z-10 bg-neutral-900/70 backdrop-blur-2xl backdrop-saturate-200 py-4 shadow-lg border border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-xl font-bold text-neutral-100">
            <span className="text-purple-500">Keqing</span>Stock
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-8">
        {isLoading || isPageLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-48 h-4 bg-neutral-700 rounded-full overflow-hidden relative">
              <div className="absolute h-full bg-violet-500 rounded-full animate-progress-bar" />
            </div>
          </div>
        ) : error ? (
          <div className="text-center text-red-400 bg-red-900/20 p-4 rounded-lg">
            <p>{error}</p>
          </div>
        ) : (
          <>
            <div className="flex gap-4 items-start">
              {masonryColumns.map((column, columnIndex) => (
                <div key={columnIndex} className="flex-1 flex flex-col gap-4">
                  {column.map((image) => (
                    <button
                      key={image.url}
                      type="button"
                      className="group block overflow-hidden shadow-md shadow-black/20 cursor-pointer p-0 border-0 bg-transparent text-left"
                      onClick={() => setSelectedImage(image)}
                    >
                      <img
                        src={image.url}
                        alt={`Image from source: ${image.source}`}
                        className="w-full h-auto transition-transform duration-300 ease-in-out group-hover:scale-105"
                        loading="eager"
                      />
                    </button>
                  ))}
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2 mt-8">
                <button
                  type="button"
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 font-bold transition-colors text-sm bg-violet-600/30 hover:bg-violet-500/30 text-neutral-100 disabled:bg-gray-700/30 disabled:text-gray-400/30"
                >
                  Prev
                </button>

                <span className="text-gray-300">
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  type="button"
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 font-bold transition-colors text-sm bg-violet-600/30 hover:bg-violet-500/30 text-neutral-100 disabled:bg-gray-700/30 disabled:text-gray-400/30"
                >
                  Next
                </button>
              </div>
            )}

            <p className="text-center text-sm text-gray-400 mt-6 max-w-2xl mx-auto">
              All artworks belong to their original creators. Sources linked through each image.
            </p>
          </>
        )}
      </main>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative w-full h-full flex items-center justify-center cursor-default"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={selectedImage.url}
              alt={selectedImage.source}
              className="max-w-[80vw] max-h-[80vh] object-contain"
            />
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors"
              aria-label="Close"
            >
              X
            </button>
            <a
              href={selectedImage.source}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-4 left-4 bg-violet-600 hover:bg-violet-700 px-4 py-2 text-sm transition-colors"
            >
              View Source
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

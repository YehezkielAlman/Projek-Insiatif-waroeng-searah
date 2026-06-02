import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeader from '../components/SectionHeader';
import { X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface GalleryImage {
  src: string;
  alt: string;
  caption: string;
  aspect: 'landscape' | 'portrait' | 'square';
}

const GALLERY_IMAGES: GalleryImage[] = [
  {
    src: '/images/img-gallery-1.jpg',
    alt: 'Kopi tubruk tradisional',
    caption: 'Kopi Searah — Signature Kami',
    aspect: 'square',
  },
  {
    src: '/images/img-gallery-2.jpg',
    alt: 'Interior vintage dengan motor klasik',
    caption: 'Suasana Vintage yang Autentik',
    aspect: 'landscape',
  },
  {
    src: '/images/img-gallery-3.jpg',
    alt: 'Luti gendang dan epok-epok',
    caption: 'Camilan Tradisional Khas',
    aspect: 'square',
  },
  {
    src: '/images/img-gallery-4.jpg',
    alt: 'Barista station',
    caption: 'Perpaduan Kopi Tradisional & Modern',
    aspect: 'landscape',
  },
  {
    src: '/images/img-gallery-5.jpg',
    alt: 'Lampu pendant vintage',
    caption: 'Detail yang Penuh Kenangan',
    aspect: 'portrait',
  },
  {
    src: '/images/img-gallery-6.jpg',
    alt: 'Pengunjung menikmati kopi',
    caption: 'Tempat Bersantai & Bercerita',
    aspect: 'square',
  },
];

export default function GallerySection() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<GalleryImage | null>(null);

  useEffect(() => {
    if (!gridRef.current) return;

    const items = gridRef.current.querySelectorAll('.gallery-item');
    gsap.fromTo(
      items,
      { scale: 0.9, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, []);

  useEffect(() => {
    if (lightbox) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [lightbox]);

  return (
    <>
      <section
        id="gallery"
        className="w-full py-20 md:py-[120px]"
        style={{ backgroundColor: '#2C1810' }}
      >
        <div className="max-w-[1280px] mx-auto px-6 md:px-12">
          <SectionHeader
            label="GALERI"
            title="Suasana di Waroeng Searah"
            subtitle="Setiap sudut menyimpan cerita dan kenangan masa lalu."
            variant="dark"
            centered
          />

          <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {GALLERY_IMAGES.map((img, idx) => {
              // Create masonry-like feel with varying spans
              const spanClass =
                img.aspect === 'landscape'
                  ? 'col-span-2 row-span-1'
                  : img.aspect === 'portrait'
                  ? 'col-span-1 row-span-2'
                  : 'col-span-1 row-span-1';

              return (
                <div
                  key={idx}
                  className={`gallery-item ${spanClass} relative group overflow-hidden rounded-lg cursor-pointer`}
                  onClick={() => setLightbox(img)}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-[#2C1810]/0 group-hover:bg-[#2C1810]/30 transition-colors duration-400 flex items-end">
                    <p className="text-[#F5E6D0] text-sm font-medium p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-400 translate-y-2 group-hover:translate-y-0">
                      {img.caption}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[2000] bg-[#2C1810]/95 flex items-center justify-center p-4 md:p-8"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 text-[#F5E6D0] p-2 hover:text-[#D4A853] transition-colors"
            aria-label="Close lightbox"
          >
            <X size={28} />
          </button>
          <div className="max-w-4xl max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <img
              src={lightbox.src}
              alt={lightbox.alt}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />
            <p className="text-[#F5E6D0] text-center mt-4 text-lg font-medium">
              {lightbox.caption}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

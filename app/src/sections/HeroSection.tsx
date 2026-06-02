import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import VintageGrainCanvas from '../components/VintageGrainCanvas';

export default function HeroSection() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    const tl = gsap.timeline({ delay: 0.3 });

    tl.fromTo(
      '.hero-label',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
    )
      .fromTo(
        '.hero-h1-1',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.1'
      )
      .fromTo(
        '.hero-h1-2',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.5'
      )
      .fromTo(
        '.hero-subtitle',
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: 'power3.out' },
        '-=0.3'
      )
      .fromTo(
        '.hero-cta',
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' },
        '-=0.2'
      );

    return () => {
      tl.kill();
    };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative w-full min-h-[100dvh] flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#2C1810' }}
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/img-hero-bg.jpg"
          alt="Waroeng Searah interior"
          className="w-full h-full object-cover"
          style={{ opacity: 0.5 }}
        />
      </div>

      {/* Vintage Grain Canvas */}
      <div className="absolute inset-0 z-[1]">
        <VintageGrainCanvas />
      </div>

      {/* Dark overlay */}
      <div
        className="absolute inset-0 z-[2]"
        style={{ backgroundColor: 'rgba(44, 24, 16, 0.4)' }}
      />

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-[3] text-center px-6 max-w-2xl mx-auto"
      >
        <p className="hero-label text-xs md:text-sm font-medium uppercase tracking-[0.15em] text-[#D4A853] mb-4 opacity-0">
          KOTA LAMA TANJUNGPINANG
        </p>

        <h1 className="text-4xl md:text-6xl lg:text-[72px] font-bold leading-[1.1] text-[#F5E6D0] mb-2">
          <span className="hero-h1-1 block opacity-0">Rasakan Kenangan</span>
          <span className="hero-h1-2 block italic opacity-0">di Setiap Tegukan</span>
        </h1>

        <p className="hero-subtitle text-base md:text-lg text-[#F5E6D0]/70 max-w-[480px] mx-auto mt-6 mb-8 leading-relaxed opacity-0">
          Kopi tradisional & camilan khas dalam suasana vintage yang penuh nostalgia. Dibuka sejak 2024.
        </p>

        <div className="hero-cta flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0">
          <button
            onClick={() => scrollTo('#menu')}
            className="px-8 py-3.5 bg-[#C8803A] text-[#F5E6D0] text-sm font-medium rounded hover:bg-[#B87232] transition-colors duration-300"
          >
            Lihat Menu
          </button>
          <button
            onClick={() => scrollTo('#location')}
            className="text-[#D4A853] text-sm font-medium hover:text-[#E5B96A] transition-colors duration-300 flex items-center gap-1"
          >
            Kunjungi Kami <span>→</span>
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[3] animate-bounce">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#F5E6D0"
          strokeWidth="1.5"
          opacity="0.5"
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  );
}

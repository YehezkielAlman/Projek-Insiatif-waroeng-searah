import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const textEls = sectionRef.current.querySelectorAll('.about-text-animate');
    const imageEl = sectionRef.current.querySelector('.about-image');

    gsap.fromTo(
      textEls,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      }
    );

    if (imageEl) {
      gsap.fromTo(
        imageEl,
        { scale: 0.95, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="w-full py-20 md:py-[120px]"
      style={{ backgroundColor: '#FAF3E8' }}
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-center">
          {/* Text Column - 55% */}
          <div className="w-full md:w-[55%]">
            {/* Decorative line */}
            <div className="about-text-animate w-[60px] h-[1px] bg-[#2C1810]/20 mb-6" />

            <p className="about-text-animate text-xs md:text-sm font-medium uppercase tracking-[0.08em] text-[#C8803A] mb-4">
              CERITA KAMI
            </p>

            <h2 className="about-text-animate text-3xl md:text-5xl lg:text-[56px] font-semibold leading-tight text-[#2C1810] mb-6">
              Lebih dari Sekadar Kopi
            </h2>

            <p className="about-text-animate text-base md:text-lg text-[#2C1810]/60 leading-relaxed mb-4">
              Waroeng Searah hadir dari sebuah impian sederhana — menciptakan tempat di mana setiap
              pengunjung tidak hanya menikmati kopi, tetapi juga merasakan kenangan indah dari masa
              lalu.
            </p>

            <p className="about-text-animate text-base md:text-lg text-[#2C1810]/60 leading-relaxed mb-8">
              Diberi nama &lsquo;Searah&rsquo; dengan harapan selalu satu tujuan: memberikan pengalaman
              berbeda. Berdiri sejak Juni 2024 di jantung Kota Lama Tanjungpinang, kami menghadirkan
              perpaduan kopi tradisional dan modern dalam suasana vintage yang autentik.
            </p>

            {/* Quote */}
            <blockquote className="about-text-animate border-l-[3px] border-[#C8803A] pl-6 mb-3">
              <p className="text-lg md:text-xl text-[#2C1810] italic font-[Playfair_Display]">
                &ldquo;Kami ingin mereka tidak hanya menikmati kopi, tetapi juga merasakan kenangan
                indah dari masa lalu.&rdquo;
              </p>
            </blockquote>

            <p className="about-text-animate text-sm text-[#2C1810]/60">
              — Wahyu Perdana, Pemilik
            </p>
          </div>

          {/* Image Column - 45% */}
          <div className="w-full md:w-[45%]">
            <div className="about-image rounded-lg overflow-hidden shadow-[0_12px_40px_rgba(44,24,16,0.15)]">
              <img
                src="/images/img-about.jpg"
                alt="Interior vintage Waroeng Searah"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

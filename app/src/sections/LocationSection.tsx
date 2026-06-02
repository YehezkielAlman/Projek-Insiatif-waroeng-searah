import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Clock, Instagram } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function LocationSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const leftCol = sectionRef.current.querySelector('.location-left');
    const rightCol = sectionRef.current.querySelector('.location-right');

    if (leftCol) {
      gsap.fromTo(
        leftCol,
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    if (rightCol) {
      gsap.fromTo(
        rightCol,
        { x: 30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );
    }
  }, []);

  return (
    <section
      id="location"
      ref={sectionRef}
      className="w-full py-20 md:py-[120px]"
      style={{ backgroundColor: '#C8803A' }}
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row gap-12 md:gap-16">
          {/* Left Column - Info */}
          <div className="location-left w-full md:w-1/2">
            <p className="text-xs md:text-sm font-medium uppercase tracking-[0.08em] text-[#2C1810]/60 mb-4">
              LOKASI
            </p>

            <h2 className="text-3xl md:text-5xl lg:text-[56px] font-semibold leading-tight text-[#2C1810] mb-6">
              Kota Lama Tanjungpinang
            </h2>

            <div className="flex items-start gap-3 mb-6">
              <MapPin size={20} className="text-[#2C1810] mt-1 flex-shrink-0" />
              <p className="text-base md:text-lg text-[#2C1810]/80 leading-relaxed">
                Jl. Hang Tuah, Tepi Laut, Kota Lama, Tanjungpinang, Kepulauan Riau
              </p>
            </div>

            <div className="mb-8">
              <div className="flex items-center gap-3 mb-3">
                <Clock size={20} className="text-[#2C1810] flex-shrink-0" />
                <h3 className="text-xl md:text-2xl font-semibold text-[#2C1810]">
                  Jam Buka
                </h3>
              </div>
              <div className="pl-8 space-y-1 text-[#2C1810]/80">
                <p>Senin – Rabu: 08.00 – 23.00 WIB</p>
                <p>Jumat – Minggu: 07.00 – 24.00 WIB</p>
                <p className="font-medium text-[#2C1810]">Kamis: LIBUR</p>
              </div>
            </div>

            <a
              href="https://www.instagram.com/waroeng.searah"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#2C1810] text-[#2C1810] text-sm font-medium rounded hover:bg-[#2C1810] hover:text-[#F5E6D0] transition-colors duration-300"
            >
              <Instagram size={18} />
              Follow @waroeng.searah
            </a>
          </div>

          {/* Right Column - Map */}
          <div className="location-right w-full md:w-1/2">
            <div className="rounded-lg overflow-hidden shadow-[0_12px_40px_rgba(44,24,16,0.2)] h-[300px] md:h-full min-h-[400px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.3!2d104.45!3d0.92!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMMKwNTUnMTIuMCJOIDEwNMKwMjcnMDAuMCJF!5e0!3m2!1sen!2sid!4v1"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'sepia(0.3) saturate(0.8)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokasi Waroeng Searah"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

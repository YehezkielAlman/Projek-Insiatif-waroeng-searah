import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SectionHeaderProps {
  label: string;
  title: string;
  subtitle?: string;
  variant?: 'light' | 'dark';
  centered?: boolean;
}

export default function SectionHeader({ label, title, subtitle, variant = 'light', centered = true }: SectionHeaderProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const els = ref.current.querySelectorAll('.sh-animate');
    gsap.fromTo(
      els,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, []);

  const labelColor = variant === 'dark' ? 'text-[#D4A853]' : 'text-[#C8803A]';
  const titleColor = variant === 'dark' ? 'text-[#F5E6D0]' : 'text-[#2C1810]';
  const subtitleColor = variant === 'dark' ? 'text-[#F5E6D0]/60' : 'text-[#2C1810]/60';

  return (
    <div ref={ref} className={`mb-12 md:mb-16 ${centered ? 'text-center' : ''}`}>
      <p className={`sh-animate text-xs md:text-sm font-medium uppercase tracking-[0.15em] ${labelColor} mb-4`}>
        {label}
      </p>
      <h2 className={`sh-animate text-3xl md:text-5xl lg:text-[56px] font-semibold leading-tight ${titleColor} mb-4`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`sh-animate text-base md:text-lg max-w-xl ${centered ? 'mx-auto' : ''} ${subtitleColor}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

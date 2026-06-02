import { useState, useEffect, useCallback } from 'react';
import gsap from 'gsap';

const NAV_LINKS = [
  { label: 'Cerita Kami', href: '#about' },
  { label: 'Menu', href: '#menu' },
  { label: 'Galeri', href: '#gallery' },
  { label: 'Lokasi', href: '#location' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobile = useCallback(() => {
    setIsMobileOpen((prev) => {
      const next = !prev;
      if (next) {
        document.body.style.overflow = 'hidden';
        // Animate links in
        setTimeout(() => {
          gsap.fromTo(
            '.mobile-nav-link',
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power3.out' }
          );
        }, 100);
      } else {
        document.body.style.overflow = '';
      }
      return next;
    });
  }, []);

  const closeMobile = useCallback(() => {
    setIsMobileOpen(false);
    document.body.style.overflow = '';
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    closeMobile();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 ${
          isScrolled ? 'shadow-[0_2px_20px_rgba(0,0,0,0.3)]' : ''
        }`}
        style={{
          backgroundColor: 'rgba(44, 24, 16, 0.95)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(245, 230, 208, 0.1)',
          height: '64px',
        }}
      >
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 h-full flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-[#F5E6D0] font-medium text-sm tracking-[0.15em] uppercase"
          >
            WAROENG SEARAH
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="relative text-[#F5E6D0]/80 text-sm font-normal hover:text-[#F5E6D0] transition-colors duration-300 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#F5E6D0] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </a>
            ))}
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={toggleMobile}
            className="md:hidden flex flex-col gap-[5px] p-2"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-5 h-[1.5px] bg-[#F5E6D0] transition-all duration-300 ${
                isMobileOpen ? 'rotate-45 translate-y-[6.5px]' : ''
              }`}
            />
            <span
              className={`block w-5 h-[1.5px] bg-[#F5E6D0] transition-all duration-300 ${
                isMobileOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-5 h-[1.5px] bg-[#F5E6D0] transition-all duration-300 ${
                isMobileOpen ? '-rotate-45 -translate-y-[6.5px]' : ''
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-[999] md:hidden flex flex-col items-center justify-center"
          style={{ backgroundColor: '#2C1810' }}
        >
          <button
            onClick={closeMobile}
            className="absolute top-5 right-6 text-[#F5E6D0] p-2"
            aria-label="Close menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="4" y1="4" x2="20" y2="20" />
              <line x1="20" y1="4" x2="4" y2="20" />
            </svg>
          </button>
          <div className="flex flex-col items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="mobile-nav-link text-[#F5E6D0] text-3xl font-semibold font-[Playfair_Display] opacity-0"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

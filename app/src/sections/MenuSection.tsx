import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeader from '../components/SectionHeader';
import { Coffee, UtensilsCrossed, Cookie } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface MenuItem {
  name: string;
  description: string;
  price: string;
}

interface MenuCategory {
  icon: React.ReactNode;
  title: string;
  items: MenuItem[];
}

const MENU_DATA: MenuCategory[] = [
  {
    icon: <Coffee size={20} />,
    title: 'Kopi Searah',
    items: [
      { name: 'Kopi Searah', description: 'Signature kami — perpaduan kopi tradisional & modern', price: '12k' },
      { name: 'Americano', description: 'Espresso shot dengan air hangat', price: '15k' },
      { name: 'Espresso', description: 'Single shot, rich & bold', price: '10k' },
      { name: 'Kopi Susu', description: 'Kopi lokal dengan susu segar', price: '12k' },
    ],
  },
  {
    icon: <UtensilsCrossed size={20} />,
    title: 'Sarapan & Makan Siang',
    items: [
      { name: 'Nasi Goreng Searah', description: 'Nasi goreng spesial dengan telur', price: '18k' },
      { name: 'Mie Goreng', description: 'Mie goreng homemade', price: '15k' },
      { name: 'Roti Bakar', description: 'Roti bakar dengan mentega & kaya', price: '10k' },
    ],
  },
  {
    icon: <Cookie size={20} />,
    title: 'Camilan Tradisional',
    items: [
      { name: 'Luti Gendang', description: 'Roti gendang khas Melayu', price: '5k' },
      { name: 'Epok-Epok', description: 'Pastel isi sayur & kentang', price: '5k' },
      { name: 'Kue Cubit', description: 'Kue cubit manis kenangan', price: '8k' },
    ],
  },
];

export default function MenuSection() {
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardsRef.current) return;

    const cards = cardsRef.current.querySelectorAll('.menu-card');
    gsap.fromTo(
      cards,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, []);

  return (
    <section
      id="menu"
      className="w-full py-20 md:py-[120px]"
      style={{ backgroundColor: '#F5E6D0' }}
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        <SectionHeader
          label="MENU KAMI"
          title="Kopi, Camilan & Kenangan"
          subtitle="Semua menu harga ramah di kantong, mulai dari 5ribuan."
          variant="light"
          centered
        />

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {MENU_DATA.map((category) => (
            <div
              key={category.title}
              className="menu-card bg-[#FAF3E8] border border-[#2C1810]/10 rounded-lg p-6"
            >
              {/* Category header */}
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#2C1810]/10">
                <span className="text-[#C8803A]">{category.icon}</span>
                <h3 className="text-xl md:text-2xl font-semibold text-[#2C1810]">
                  {category.title}
                </h3>
              </div>

              {/* Items */}
              <div className="space-y-0">
                {category.items.map((item, idx) => (
                  <div
                    key={item.name}
                    className={`py-4 ${
                      idx < category.items.length - 1
                        ? 'border-b border-dashed border-[#2C1810]/20'
                        : ''
                    }`}
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <h4 className="text-base font-medium text-[#2C1810] mb-1">
                          {item.name}
                        </h4>
                        <p className="text-sm text-[#2C1810]/60">{item.description}</p>
                      </div>
                      <span className="text-sm font-semibold text-[#C8803A] whitespace-nowrap">
                        {item.price}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

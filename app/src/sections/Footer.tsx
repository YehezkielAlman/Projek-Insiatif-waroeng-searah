export default function Footer() {
  return (
    <footer
      className="w-full py-16 pb-8"
      style={{ backgroundColor: '#2C1810' }}
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 text-center">
        {/* Logo */}
        <p className="text-[#F5E6D0] font-medium text-sm tracking-[0.15em] uppercase mb-4">
          WAROENG SEARAH
        </p>

        {/* Tagline */}
        <p className="text-[#F5E6D0]/50 text-base mb-6">
          Rasakan kenangan di setiap tegukan.
        </p>

        {/* Social */}
        <p className="text-[#F5E6D0]/60 text-sm mb-10">
          Instagram:{" "}
          <a
            href="https://www.instagram.com/waroeng.searah"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#D4A853] hover:text-[#E5B96A] transition-colors duration-300"
          >
            @waroeng.searah
          </a>
        </p>

        {/* Divider */}
        <div className="w-full h-[1px] bg-[#F5E6D0]/10 mb-6" />

        {/* Copyright */}
        <p className="text-[#F5E6D0]/40 text-xs">
          © {new Date().getFullYear()} Waroeng Searah. Kota Lama Tanjungpinang.
        </p>
      </div>
    </footer>
  );
}

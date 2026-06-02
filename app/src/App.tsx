import Navigation from './sections/Navigation';
import HeroSection from './sections/HeroSection';
import AboutSection from './sections/AboutSection';
import MenuSection from './sections/MenuSection';
import GallerySection from './sections/GallerySection';
import LocationSection from './sections/LocationSection';
import Footer from './sections/Footer';

export default function App() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <MenuSection />
        <GallerySection />
        <LocationSection />
      </main>
      <Footer />
    </div>
  );
}

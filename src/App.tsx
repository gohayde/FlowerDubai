import { useEffect, lazy, Suspense } from 'react';
import Lenis from 'lenis';
import { useGsapAnimations } from './hooks/useGsap';
import './index.css';

import Header from './components/Header';
import Hero from './components/Hero';
import TrustBar from './components/TrustBar';
import Categories from './components/Categories';
import BestSellers from './components/BestSellers';
import About from './components/About';
import BigBouquets from './components/BigBouquets';
import BuildGift from './components/BuildGift';
import DeliveryAreas from './components/DeliveryAreas';
import Reviews from './components/Reviews';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import MobileOrderButton from './components/MobileOrderButton';
import LoadingScreen from './components/LoadingScreen';
import ScrollProgress from './components/ScrollProgress';
import BackToTop from './components/BackToTop';
import WhatsAppWidget from './components/WhatsAppWidget';
import DeliveryBanner from './components/DeliveryBanner';

// Interaction-triggered overlays: not needed for first paint, deferred to shrink the initial bundle.
const CartDrawer = lazy(() => import('./components/CartDrawer'));
const QuickView = lazy(() => import('./components/QuickView'));
const SearchOverlay = lazy(() => import('./components/SearchOverlay'));
const ExitIntentPopup = lazy(() => import('./components/ExitIntentPopup'));

function App() {
  useGsapAnimations();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.5,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <>
      <a href="#main-content" className="skip-to-content">Skip to content</a>
      {/* Global film grain — fixed, pointer-events none, GPU-safe */}
      <div className="grain-overlay" aria-hidden="true" />
      <LoadingScreen />
      <ScrollProgress />
      <Header />

      <main id="main-content">
        <Hero />
        <TrustBar />
        <Categories />
        <BestSellers />
        <About />
        <BigBouquets />
        <BuildGift />
        <DeliveryAreas />
        <Reviews />
        <FAQ />
        <DeliveryBanner />
        <Contact />
      </main>

      <Footer />

      {/* Overlays — lazy, so idle users never pay for this code */}
      <Suspense fallback={null}>
        <CartDrawer />
        <QuickView />
        <SearchOverlay />
        <ExitIntentPopup />
      </Suspense>
      <MobileOrderButton />
      <BackToTop />
      <WhatsAppWidget />
    </>
  );
}

export default App;



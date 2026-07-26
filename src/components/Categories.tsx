import { motion } from 'motion/react';
import { useInView } from '../hooks/useAnimations';

export default function Categories() {
  const { ref, isInView } = useInView();

  return (
    <section ref={ref} id="categories" className="section-padding" style={{ background: 'var(--color-cream)', overflow: 'hidden' }}>
      {/* Header */}
      <div className="container-main" style={{ marginBottom: 'clamp(2.5rem, 4vw, 3.5rem)' }}>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
          className="label-eyebrow"
          style={{ marginBottom: '0.875rem', color: 'var(--color-rose)' }}
        >
          Shop By Category
        </motion.p>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.75, ease: [0.32, 0.72, 0, 1] }}
            className="heading-section"
          >
            Every <em style={{ fontStyle: 'italic', color: 'var(--color-rose)' }}>Occasion</em>
          </motion.h2>
          <motion.a
            href="#products"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="btn-secondary"
            style={{ fontSize: '0.8125rem', padding: '0.625rem 1.5rem' }}
          >
            View All
          </motion.a>
        </div>
      </div>

      {/* Bento Grid */}
      <div className="container-main">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6" style={{ gridAutoRows: 'minmax(320px, auto)' }}>
          
          {/* Flower Bouquets - Large Main Card (8 cols) */}
          <motion.a
            href="#products"
            initial={{ opacity: 0, scale: 0.98, y: 20 }}
            animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="col-span-1 md:col-span-8 relative overflow-hidden group flex flex-col justify-between"
            style={{ 
              background: 'oklch(93% 0.020 10)', 
              borderRadius: '24px',
              padding: 'clamp(2rem, 4vw, 3rem)',
              textDecoration: 'none',
              minHeight: '400px'
            }}
          >
            <div className="relative z-10 max-w-[80%] md:max-w-[50%]">
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', lineHeight: 1.1, color: 'var(--color-charcoal)', marginBottom: '1rem' }}>Flower Bouquets</h3>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem', color: 'rgba(24,16,8,0.6)', marginBottom: '2rem', lineHeight: 1.5 }}>Hand-tied arrangements featuring the season's finest blooms.</p>
              <span className="uppercase tracking-[0.2em] text-[0.6875rem] font-medium text-black border-b border-black pb-1 transition-colors group-hover:text-[var(--color-rose)] group-hover:border-[var(--color-rose)]">Shop Collection</span>
            </div>
            <div 
              className="absolute top-0 right-0 bottom-0 w-full pointer-events-none"
              style={{ maskImage: 'linear-gradient(to right, transparent 0%, transparent 15%, rgba(0,0,0,0.5) 45%, black 65%)', WebkitMaskImage: 'linear-gradient(to right, transparent 0%, transparent 15%, rgba(0,0,0,0.5) 45%, black 65%)' }}
            >
              <img 
                src="/images/products/custom-bouquet.webp" 
                alt="Flower Bouquets" 
                loading="lazy"
                decoding="async"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'right center',
                  transition: 'transform 800ms cubic-bezier(0.16,1,0.3,1)',
                }}
              />
            </div>
            <style>{`
              .group:hover img { transform: scale(1.05) !important; }
            `}</style>
          </motion.a>

          {/* Chocolates - Vertical Card (4 cols) */}
          <motion.a
            href="#chocolates"
            initial={{ opacity: 0, scale: 0.98, y: 20 }}
            animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="col-span-1 md:col-span-4 relative overflow-hidden group flex flex-col justify-between"
            style={{ 
              background: 'oklch(91% 0.015 45)', 
              borderRadius: '24px',
              padding: 'clamp(2rem, 3vw, 2.5rem)',
              textDecoration: 'none',
              minHeight: '400px'
            }}
          >
            <div className="relative z-10 mb-auto max-w-[95%]">
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', lineHeight: 1.1, color: 'var(--color-charcoal)', marginBottom: '0.5rem' }}>Luxury Chocolates</h3>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', color: 'rgba(24,16,8,0.6)', marginBottom: '1.5rem', lineHeight: 1.5 }}>The perfect sweet pairing.</p>
              <span className="uppercase tracking-[0.2em] text-[0.6875rem] font-medium text-black border-b border-black pb-1 transition-colors group-hover:text-[var(--color-rose)] group-hover:border-[var(--color-rose)]">Discover</span>
            </div>
            <div 
              className="absolute pointer-events-none z-0"
              style={{ top: '2rem', right: 0, bottom: 0, left: 0, maskImage: 'linear-gradient(to bottom, transparent 0%, transparent 5%, rgba(0,0,0,0.5) 30%, black 50%)', WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, transparent 5%, rgba(0,0,0,0.5) 30%, black 50%)' }}
            >
              <img 
                src="/images/products/chocolate-gift.webp" 
                alt="Chocolates" 
                loading="lazy"
                decoding="async"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center 75%',
                  transition: 'transform 800ms cubic-bezier(0.16,1,0.3,1)',
                }}
              />
            </div>
          </motion.a>

          {/* Big Bouquets - Horizontal Half (6 cols) */}
          <motion.a
            href="#big-bouquets"
            initial={{ opacity: 0, scale: 0.98, y: 20 }}
            animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="col-span-1 md:col-span-6 relative overflow-hidden group flex flex-col justify-center"
            style={{ 
              background: 'oklch(93% 0.010 150)', 
              borderRadius: '24px',
              padding: 'clamp(2rem, 3vw, 2.5rem)',
              textDecoration: 'none',
              minHeight: '320px'
            }}
          >
            <div 
              className="absolute top-0 right-0 bottom-0 w-full pointer-events-none"
              style={{ maskImage: 'linear-gradient(to right, transparent 0%, transparent 20%, rgba(0,0,0,0.5) 50%, black 75%)', WebkitMaskImage: 'linear-gradient(to right, transparent 0%, transparent 20%, rgba(0,0,0,0.5) 50%, black 75%)' }}
            >
              <img 
                src="/images/products/big-surprise-1.webp" 
                alt="Big Bouquets" 
                loading="lazy"
                decoding="async"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'right center',
                  transition: 'transform 800ms cubic-bezier(0.16,1,0.3,1)',
                }}
              />
            </div>
            <div className="relative z-10 max-w-[80%] md:max-w-[50%]">
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', lineHeight: 1.1, color: 'var(--color-charcoal)', marginBottom: '0.5rem' }}>Big Bouquets</h3>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', color: 'rgba(24,16,8,0.6)', marginBottom: '1.5rem', lineHeight: 1.5 }}>Make an unforgettable statement.</p>
              <span className="uppercase tracking-[0.2em] text-[0.6875rem] font-medium text-black border-b border-black pb-1 transition-colors group-hover:text-[var(--color-rose)] group-hover:border-[var(--color-rose)]">Shop Grand Gifts</span>
            </div>
          </motion.a>

          {/* Flower Boxes - Horizontal Half (6 cols) */}
          <motion.a
            href="#products"
            initial={{ opacity: 0, scale: 0.98, y: 20 }}
            animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="col-span-1 md:col-span-6 relative overflow-hidden group flex flex-col justify-center"
            style={{ 
              background: 'oklch(94% 0.012 55)', 
              borderRadius: '24px',
              padding: 'clamp(2rem, 3vw, 2.5rem)',
              textDecoration: 'none',
              minHeight: '320px'
            }}
          >
            <div 
              className="absolute top-0 right-0 bottom-0 w-full pointer-events-none"
              style={{ maskImage: 'linear-gradient(to right, transparent 0%, transparent 20%, rgba(0,0,0,0.5) 50%, black 75%)', WebkitMaskImage: 'linear-gradient(to right, transparent 0%, transparent 20%, rgba(0,0,0,0.5) 50%, black 75%)' }}
            >
              <img 
                src="/images/products/flower-box-1.webp" 
                alt="Flower Boxes" 
                loading="lazy"
                decoding="async"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'right center',
                  transition: 'transform 800ms cubic-bezier(0.16,1,0.3,1)',
                }}
              />
            </div>
            <div className="relative z-10 max-w-[80%] md:max-w-[50%]">
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', lineHeight: 1.1, color: 'var(--color-charcoal)', marginBottom: '0.5rem' }}>Flower Boxes</h3>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', color: 'rgba(24,16,8,0.6)', marginBottom: '1.5rem', lineHeight: 1.5 }}>Modern, elegant, and ready to display.</p>
              <span className="uppercase tracking-[0.2em] text-[0.6875rem] font-medium text-black border-b border-black pb-1 transition-colors group-hover:text-[var(--color-rose)] group-hover:border-[var(--color-rose)]">Shop Boxes</span>
            </div>
          </motion.a>

        </div>
      </div>
    </section>
  );
}




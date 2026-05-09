import { memo } from 'react';
import { motion } from 'motion/react';
import { useInView } from '../hooks/useAnimations';
import { ArrowRight } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { products } from '../data/products';

const BigBouquetsBg = memo(function BigBouquetsBg() {
  return (
    <div aria-hidden="true" style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {/* Rose warm orb — large, diffused */}
      <motion.div
        animate={{ x: [0, 20, -10, 0], y: [0, -15, 20, 0], scale: [1, 1.05, 0.97, 1] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', top: '-20%', right: '10%',
          width: 'clamp(300px, 50vw, 700px)', height: 'clamp(300px, 50vw, 700px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 40% 40%, oklch(82% 0.065 10 / 0.18), oklch(93% 0.030 10 / 0.06) 55%, transparent 80%)',
          filter: 'blur(50px)',
        }}
      />
      <motion.div
        animate={{ x: [0, -12, 18, 0], y: [0, 18, -8, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut', delay: 8 }}
        style={{
          position: 'absolute', bottom: '-10%', left: '5%',
          width: 'clamp(200px, 30vw, 420px)', height: 'clamp(200px, 30vw, 420px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, oklch(62% 0.115 12 / 0.09), transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      {/* Decorative arc line */}
      <svg
        style={{ position: 'absolute', top: 0, right: 0, width: '45%', height: '100%', opacity: 0.04 }}
        viewBox="0 0 400 600" fill="none" preserveAspectRatio="xMaxYMid slice"
      >
        <ellipse cx="400" cy="300" rx="320" ry="300" stroke="oklch(18% 0.006 60)" strokeWidth="1"/>
        <ellipse cx="400" cy="300" rx="240" ry="220" stroke="oklch(18% 0.006 60)" strokeWidth="1"/>
        <ellipse cx="400" cy="300" rx="160" ry="145" stroke="oklch(18% 0.006 60)" strokeWidth="1"/>
      </svg>
    </div>
  );
});

export default function BigBouquets() {
  const { ref, isInView } = useInView();
  const { addItem, openCart } = useCartStore();
  const bigSurprise = products.find((p) => p.id === 'big-surprise');

  const handleOrder = () => {
    if (bigSurprise) { addItem(bigSurprise); openCart(); }
  };

  return (
    <section
      ref={ref}
      id="big-bouquets"
      style={{ background: 'var(--color-cream)', padding: 'clamp(5rem, 10vw, 8rem) 0', position: 'relative', overflow: 'hidden' }}
    >
      <BigBouquetsBg />

      <div className="container-main" style={{ position: 'relative', zIndex: 10 }}>
        <div className="bigbouquet-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(3rem, 6vw, 5rem)', alignItems: 'center' }}>
          {/* Text */}
          <div>
            <motion.span
              initial={{ opacity: 0, scale: 0.8, x: -10 }}
              animate={isInView ? { opacity: 1, scale: 1, x: 0 } : {}}
              transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
              style={{ display: 'inline-block', padding: '0.375rem 1rem', borderRadius: '9999px', background: 'var(--color-wine)', color: 'white', fontSize: '0.625rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.5rem' }}
            >
              Statement Gift
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
              style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 400, lineHeight: 1.05, letterSpacing: '-0.02em', color: 'var(--color-charcoal)' }}
            >
              Big Bouquets
              <br />
              For Big <em style={{ fontStyle: 'italic', color: 'var(--color-rose)' }}>Moments</em>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
              style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', lineHeight: 1.75, color: 'var(--color-muted)', maxWidth: '420px', marginTop: '1.25rem' }}
            >
              A grand statement bouquet designed for unforgettable birthdays, anniversaries,
              proposals, apologies, and luxury surprises.
            </motion.p>

            {/* Feature list */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
              style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
            >
              {['100+ fresh stems', 'Custom ribbon & wrap', 'Handwritten card included', 'Same-day delivery'].map((feat) => (
                <div key={feat} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ width: '1.25rem', height: '1.25rem', borderRadius: '50%', background: 'var(--color-blush-light)', border: '1px solid rgba(248,184,197,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="7" height="7" viewBox="0 0 7 7" fill="none" stroke="var(--color-rose)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 3.5l1.75 1.75L6 1.5"/>
                    </svg>
                  </span>
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', color: 'var(--color-muted)', fontWeight: 500 }}>{feat}</span>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.45, duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
              style={{ marginTop: '2rem' }}
            >
              <button
                onClick={handleOrder}
                className="bigbouquet-cta"
              >
                <span>Order Big Surprise</span>
                <span className="bigbouquet-icon-wrap">
                  <ArrowRight size={14} />
                </span>
              </button>
            </motion.div>
          </div>

          {/* Visual — Double-Bezel arch frame */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25, duration: 0.9, ease: [0.32, 0.72, 0, 1] }}
            style={{ position: 'relative' }}
          >
            {/* Shadow behind */}
            <div style={{
              position: 'absolute', inset: 0,
              borderRadius: '9999px 9999px 2.5rem 2.5rem',
              background: 'oklch(82% 0.065 10 / 0.18)',
              transform: 'scale(0.94) translateY(3%) translateX(3%)',
              filter: 'blur(32px)',
            }} />

            {/* Outer bezel shell */}
            <div style={{
              position: 'relative',
              background: 'rgba(24,16,8,0.035)',
              border: '1px solid rgba(24,16,8,0.055)',
              borderRadius: '9999px 9999px 2.5rem 2.5rem',
              padding: '0.375rem',
            }}>
              {/* Inner core */}
              <div style={{
                borderRadius: 'calc(9999px - 6px) calc(9999px - 6px) calc(2.5rem - 6px) calc(2.5rem - 6px)',
                overflow: 'hidden',
                aspectRatio: '3/4',
                background: 'oklch(90% 0.038 10)',
                boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.9)',
                position: 'relative',
              }}>
                <div
                  className="ken-burns"
                  style={{
                    position: 'absolute', inset: '-10%',
                    backgroundImage: 'url(/images/gallery/peonies.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    zIndex: 0,
                  }}
                />
                <img
                  src="/images/products/big-surprise.png"
                  alt="Grand surprise bouquet — 100+ fresh stems for special occasions"
                  style={{
                    position: 'absolute', inset: 0,
                    width: '100%', height: '100%',
                    objectFit: 'contain',
                    objectPosition: 'center bottom',
                    padding: '1.5rem 1.5rem 0',
                    display: 'block',
                    zIndex: 1,
                  }}
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = '0'; }}
                />
                {/* Subtle vignette */}
                <div aria-hidden="true" style={{
                  position: 'absolute', inset: 0, zIndex: 2,
                  background: 'radial-gradient(ellipse at 50% 0%, transparent 60%, rgba(18,12,8,0.08) 100%)',
                  pointerEvents: 'none',
                }} />
              </div>
            </div>

            {/* Floating price badge */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: 0.7, duration: 0.65, ease: [0.32, 0.72, 0, 1] }}
              className="drift-float"
              style={{
                position: 'absolute',
                bottom: '2.5rem', left: '-2rem',
                background: 'var(--color-charcoal)',
                borderRadius: '1.25rem',
                padding: '1.125rem 1.5rem',
                boxShadow: '0 12px 40px rgba(18,12,8,0.22)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.5625rem', fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '0.25rem' }}>From</p>
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.875rem', fontWeight: 400, color: 'oklch(97% 0.008 55)', lineHeight: 1 }}>1,200 <span style={{ fontSize: '0.875rem', fontWeight: 300, opacity: 0.65 }}>AED</span></p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .bigbouquet-grid { grid-template-columns: 1fr !important; }
        }
        .bigbouquet-cta {
          display: inline-flex; align-items: center; gap: 0.75rem;
          padding: 0.8125rem 1.375rem 0.8125rem 1.875rem;
          background: var(--color-charcoal); color: white;
          font-family: var(--font-sans); font-size: 0.8125rem; font-weight: 600;
          letter-spacing: 0.06em; text-transform: uppercase;
          border-radius: 9999px;
          border: none; cursor: pointer;
          transition: all 400ms cubic-bezier(0.32,0.72,0,1);
          box-shadow: 0 1px 2px rgba(24,16,8,0.12);
        }
        .bigbouquet-icon-wrap {
          display: inline-flex; align-items: center; justify-content: center;
          width: 1.75rem; height: 1.75rem; border-radius: 50%;
          background: rgba(255,255,255,0.14);
          border: 1px solid rgba(255,255,255,0.12);
          transition: transform 300ms cubic-bezier(0.32,0.72,0,1);
          flex-shrink: 0;
        }
        .bigbouquet-cta:hover { background: oklch(22% 0.008 58); transform: translateY(-2px); box-shadow: 0 16px 36px rgba(24,16,8,0.18); }
        .bigbouquet-cta:hover .bigbouquet-icon-wrap { transform: translate(2px, -1px) scale(1.1); }
        .bigbouquet-cta:active { transform: scale(0.98); }
      `}</style>
    </section>
  );
}



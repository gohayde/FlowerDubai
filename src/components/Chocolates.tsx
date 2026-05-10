import { motion } from 'motion/react';
import { useInView } from '../hooks/useAnimations';
import { ArrowRight } from 'lucide-react';

export default function Chocolates() {
  const { ref, isInView } = useInView();

  return (
    <section
      ref={ref}
      id="chocolates"
      className="section-padding"
      style={{ background: 'var(--color-warm-white)' }}
    >
      <div className="container-main">
        {/* Header */}
        <div style={{ marginBottom: 'clamp(3rem, 5vw, 4.5rem)', maxWidth: '640px' }}>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
            className="label-eyebrow"
            style={{ marginBottom: '1rem', color: 'var(--color-chocolate)' }}
          >
            Complete the Surprise
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
            className="heading-section"
          >
            Flowers, Chocolates
            <br />
            & Elegant <em style={{ fontStyle: 'italic', color: 'var(--color-rose)' }}>Boxes</em>
          </motion.h2>
        </div>

        {/* Asymmetric editorial grid: large left + two stacked right */}
        <div
          className="choc-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1.1fr 0.9fr',
            gridTemplateRows: 'auto auto',
            gap: '1.5rem',
          }}
        >
          {/* Large hero item — left, spans 2 rows */}
          <motion.a
            href="#products"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.75, ease: [0.32, 0.72, 0, 1] }}
            style={{
              gridRow: '1 / 3',
              textDecoration: 'none',
              borderRadius: '2rem',
              overflow: 'hidden',
              background: 'oklch(38% 0.065 45 / 0.06)',
              border: '1px solid rgba(122,75,52,0.1)',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              transition: 'box-shadow 600ms cubic-bezier(0.32,0.72,0,1)',
            }}
            whileHover={{ y: -4, boxShadow: '0 24px 60px rgba(122,75,52,0.12)' }}
          >
            <div
              style={{
                flex: 1,
                overflow: 'hidden',
                position: 'relative',
                minHeight: '340px',
              }}
            >
              <img
                src="/images/products/chocolate-gift.webp"
                alt="Chocolate gift set with ribbon"
                loading="lazy"
                decoding="async"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 700ms cubic-bezier(0.32,0.72,0,1)',
                  display: 'block',
                }}
                className="choc-img"
              />
            </div>
            <div style={{ padding: '2rem 2rem 2rem' }}>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.6875rem',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--color-chocolate)',
                  marginBottom: '0.625rem',
                }}
              >
                Premium Gift
              </p>
              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                  fontWeight: 400,
                  color: 'var(--color-charcoal)',
                  marginBottom: '0.625rem',
                  lineHeight: 1.2,
                }}
              >
                Chocolates
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.875rem',
                  color: 'var(--color-muted)',
                  lineHeight: 1.6,
                  marginBottom: '1.25rem',
                  maxWidth: '320px',
                }}
              >
                Pair your bouquet with premium chocolates for a complete gift experience.
              </p>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.8125rem',
                  fontWeight: 700,
                  color: 'var(--color-chocolate)',
                  letterSpacing: '0.02em',
                }}
              >
                Shop Chocolates <ArrowRight size={14} />
              </span>
            </div>
          </motion.a>

          {/* Top right — Flower Boxes */}
          <motion.a
            href="#products"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.25, duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
            style={{
              textDecoration: 'none',
              borderRadius: '1.75rem',
              overflow: 'hidden',
              background: 'var(--color-blush-light)',
              border: '1px solid rgba(248,184,197,0.18)',
              display: 'flex',
              alignItems: 'center',
              gap: '1.25rem',
              padding: '1.5rem',
              transition: 'all 500ms cubic-bezier(0.32,0.72,0,1)',
            }}
            whileHover={{ y: -3, boxShadow: '0 16px 40px rgba(248,184,197,0.18)' }}
          >
            <div
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '1.25rem',
                overflow: 'hidden',
                flexShrink: 0,
              }}
            >
              <img
                src="/images/products/flower-box.webp"
                alt="Luxury flower box"
                loading="lazy"
                decoding="async"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
            <div>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.625rem',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--color-rose)',
                  marginBottom: '0.375rem',
                }}
              >
                Trending
              </p>
              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.375rem',
                  fontWeight: 500,
                  color: 'var(--color-charcoal)',
                  marginBottom: '0.375rem',
                  lineHeight: 1.2,
                }}
              >
                Flower Boxes
              </h3>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.375rem',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: 'var(--color-rose)',
                }}
              >
                Shop Now <ArrowRight size={12} />
              </span>
            </div>
          </motion.a>

          {/* Bottom right — Custom Gift Sets */}
          <motion.a
            href="#products"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.35, duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
            style={{
              textDecoration: 'none',
              borderRadius: '1.75rem',
              overflow: 'hidden',
              background: 'oklch(40% 0.075 150 / 0.07)',
              border: '1px solid rgba(63,95,69,0.1)',
              display: 'flex',
              alignItems: 'center',
              gap: '1.25rem',
              padding: '1.5rem',
              transition: 'all 500ms cubic-bezier(0.32,0.72,0,1)',
            }}
            whileHover={{ y: -3, boxShadow: '0 16px 40px rgba(63,95,69,0.1)' }}
          >
            <div
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '1.25rem',
                overflow: 'hidden',
                flexShrink: 0,
              }}
            >
              <img
                src="/images/products/artisan-grace.webp"
                alt="Custom gift set with flowers and chocolates"
                loading="lazy"
                decoding="async"
                style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block', background: 'var(--color-blush-light)' }}
              />
            </div>
            <div>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.625rem',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--color-wine)',
                  marginBottom: '0.375rem',
                }}
              >
                Curated
              </p>
              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.375rem',
                  fontWeight: 500,
                  color: 'var(--color-charcoal)',
                  marginBottom: '0.375rem',
                  lineHeight: 1.2,
                }}
              >
                Custom Gift Sets
              </h3>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.375rem',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: 'var(--color-wine)',
                }}
              >
                Build Yours <ArrowRight size={12} />
              </span>
            </div>
          </motion.a>
        </div>
      </div>

      <style>{`
        .choc-img { transform-origin: center; }
        a:hover .choc-img { transform: scale(1.04); }
        @media (max-width: 768px) {
          .choc-grid {
            grid-template-columns: 1fr !important;
            grid-template-rows: auto !important;
          }
          .choc-grid > a:first-child {
            grid-row: auto !important;
          }
        }
      `}</style>
    </section>
  );
}



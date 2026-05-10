import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useInView } from '../hooks/useAnimations';
import { ArrowRight } from 'lucide-react';

const galleryItems = [
  { src: '/images/gallery/peonies.webp',           alt: 'Pink peonies closeup',         shape: 'arch-tall', span: 'row-span-2', label: 'Peonies',       bg: 'linear-gradient(155deg, oklch(93% 0.030 10) 0%, oklch(80% 0.072 8 / 0.7) 100%)' },
  { src: '/images/products/artisan-grace.webp',    alt: 'Artisan Grace bouquet',         shape: 'arch',      span: '',           label: 'Artisan Grace', bg: 'linear-gradient(145deg, oklch(93% 0.018 150) 0%, oklch(82% 0.055 10 / 0.5) 100%)' },
  { src: '/images/gallery/roses.webp',             alt: 'Roses in ceramic vase',         shape: 'arch',      span: '',           label: 'Rose Vase',     bg: 'linear-gradient(155deg, oklch(94% 0.015 12) 0%, oklch(82% 0.065 10 / 0.55) 100%)' },
  { src: '/images/products/flower-box.webp',       alt: 'Luxury flower box',             shape: 'arch-tall', span: 'row-span-2', label: 'Flower Box',    bg: 'linear-gradient(140deg, oklch(95% 0.012 55) 0%, oklch(90% 0.040 10 / 0.6) 100%)' },
  { src: '/images/gallery/florist.webp',           alt: 'Florist arranging flowers',     shape: 'arch',      span: '',           label: 'Studio',        bg: 'linear-gradient(150deg, oklch(93% 0.018 45) 0%, oklch(80% 0.072 8 / 0.5) 100%)' },
  { src: '/images/products/blush-breeze.webp',     alt: 'Blush Breeze bouquet',          shape: 'arch',      span: '',           label: 'Blush Breeze',  bg: 'linear-gradient(145deg, oklch(93% 0.030 10) 0%, oklch(72% 0.085 80 / 0.3) 100%)' },
  { src: '/images/products/wild-elegance.webp',    alt: 'Wild Elegance bouquet',         shape: 'arch',      span: '',           label: 'Wild Elegance', bg: 'linear-gradient(155deg, oklch(93% 0.030 10) 0%, oklch(78% 0.072 8 / 0.65) 100%)' },
  { src: '/images/products/yellow-sunrise.webp',   alt: 'Yellow Sunrise bouquet',        shape: 'arch',      span: '',           label: 'Yellow Sunrise', bg: 'linear-gradient(145deg, oklch(96% 0.022 80) 0%, oklch(93% 0.030 10 / 0.5) 100%)' },
];

export default function Gallery() {
  const { ref, isInView } = useInView(0.1);

  /* Subtle scroll parallax on the entire grid */
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const gridY = useTransform(scrollYProgress, [0, 1], ['-3%', '3%']);

  return (
    <section ref={ref} className="section-padding" style={{ background: 'var(--color-cream)', overflow: 'hidden' }}>
      <div className="container-main">
        {/* Header */}
        <div
          style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem', marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}
        >
          <div>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
              className="label-eyebrow"
              style={{ marginBottom: '0.875rem', color: 'var(--color-rose)' }}
            >
              Visual Stories
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 28 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.75, ease: [0.32, 0.72, 0, 1] }}
              className="heading-section"
            >
              The <em style={{ fontStyle: 'italic', color: 'var(--color-rose)' }}>Garden</em>
            </motion.h2>
          </div>
          <motion.a
            href="#products"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="btn-secondary"
            style={{ fontSize: '0.8125rem', padding: '0.625rem 1.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
          >
            All Arrangements <ArrowRight size={14} />
          </motion.a>
        </div>

        {/* Masonry grid — subtle scroll parallax wrapper */}
        <motion.div
          ref={sectionRef}
          style={{ y: gridY }}
          className="gallery-grid"
        >
          {galleryItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: 0.06 + i * 0.065, duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
              className={`gallery-item ${item.span}`}
              style={{
                borderRadius: item.shape === 'arch-tall' ? '9999px 9999px 1.75rem 1.75rem' : '1.75rem',
                overflow: 'hidden',
                position: 'relative',
                cursor: 'default',
                gridRow: item.span === 'row-span-2' ? 'span 2' : 'span 1',
              }}
            >
              {/* Animated placeholder bg */}
              <div
                className={item.span === 'row-span-2' ? 'ken-burns' : (i % 2 === 0 ? 'ken-burns' : 'ken-burns-r')}
                style={{
                  position: 'absolute', inset: '-8%',
                  background: item.bg,
                  zIndex: 0,
                }}
              />

              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                decoding="async"
                style={{
                  width: '100%', height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  position: 'relative', zIndex: 1,
                  transition: 'transform 800ms cubic-bezier(0.32,0.72,0,1)',
                }}
                className="gallery-img"
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
              />

              {/* Hover overlay */}
              <div
                className="gallery-overlay"
                style={{
                  position: 'absolute', inset: 0, zIndex: 2,
                  background: 'linear-gradient(to top, rgba(18,12,8,0.58) 0%, transparent 48%)',
                  opacity: 0,
                  transition: 'opacity 500ms cubic-bezier(0.32,0.72,0,1)',
                  display: 'flex', alignItems: 'flex-end',
                  padding: '1.375rem',
                }}
              >
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', color: 'white', fontStyle: 'italic', letterSpacing: '-0.01em' }}>
                  {item.label}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style>{`
        .gallery-grid {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr 1fr 0.85fr;
          grid-auto-rows: 200px;
          gap: 1.125rem;
        }
        .gallery-item { transition: transform 400ms cubic-bezier(0.32,0.72,0,1); }
        .gallery-item:hover { transform: scale(1.02); z-index: 2; }
        .gallery-item:hover .gallery-img { transform: scale(1.06); }
        .gallery-item:hover .gallery-overlay { opacity: 1 !important; }
        @media (max-width: 960px) {
          .gallery-grid { grid-template-columns: repeat(3, 1fr) !important; grid-auto-rows: 175px !important; }
        }
        @media (max-width: 600px) {
          .gallery-grid { grid-template-columns: repeat(2, 1fr) !important; grid-auto-rows: 150px !important; }
          .gallery-item { transform: none !important; }
        }
      `}</style>
    </section>
  );
}



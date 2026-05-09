'use client';
import { useRef, memo, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
} from 'motion/react';

/* ═══════════════════════════════════════════
   Video Background (For animated wind effect)
═══════════════════════════════════════════ */
const MotionBackground = memo(function MotionBackground() {
  const [videoError, setVideoError] = useState(false);

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0, background: 'var(--color-cream)' }}>
      {/* 
        This is ready for the animated video you create! 
        Just save your animated file as /public/images/hero/hero-bg.mp4 
      */}
      {!videoError ? (
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          onError={() => setVideoError(true)}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'right center' // Keeps the focus on the right side flowers
          }}
        >
          <source src="/images/hero/hero-bg.mp4" type="video/mp4" />
        </video>
      ) : (
        /* Fallback if the video isn't there yet */
        <motion.div
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{
            position: 'absolute', inset: '-2%', width: '104%', height: '104%',
            backgroundImage: 'url("/images/hero/hero-bg.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'right center',
          }}
        />
      )}

      {/* Cinematic Gradient Mix */}
      <div 
        style={{ 
          position: 'absolute', inset: 0, 
          background: 'linear-gradient(to right, rgba(10,5,2,0.95) 0%, rgba(20,10,5,0.6) 30%, transparent 100%), linear-gradient(to top, rgba(10,5,2,0.8) 0%, transparent 40%)',
          pointerEvents: 'none',
          zIndex: 1
        }} 
      />

      {/* Cinematic Vignette */}
      <div 
        style={{ 
          position: 'absolute', inset: 0, 
          background: 'radial-gradient(circle at center, transparent 20%, rgba(0,0,0,0.6) 100%)',
          pointerEvents: 'none',
          mixBlendMode: 'multiply',
          zIndex: 1
        }} 
      />
    </div>
  );
});

/* ═══════════════════════════════════════════
   Hero — Main Export
═══════════════════════════════════════════ */
export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });
  
  // Subtle parallax for text
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={containerRef}
      id="home"
      style={{ 
        height: '100dvh', 
        position: 'relative', 
        overflow: 'hidden', 
        display: 'flex', 
        alignItems: 'center'
      }}
    >
      <MotionBackground />

      <div className="container-main" style={{ position: 'relative', zIndex: 20, height: '100%', display: 'flex', alignItems: 'center' }}>
        
        {/* TEXT COLUMN - Strictly on the Left */}
        <motion.div 
          style={{ y: textY, opacity: textOpacity, maxWidth: '650px', paddingRight: '2rem', paddingTop: '5rem' }}
        >
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden', paddingBottom: '1rem' }}
          >
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8125rem', fontWeight: 600, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.85)', textTransform: 'uppercase' }}>
              The Art of Gifting
            </span>
          </motion.div>
          <div style={{ overflow: 'hidden', paddingBottom: '0.5rem' }}>
            <motion.h1
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(3.5rem, 8vw, 6.5rem)', lineHeight: 0.95, letterSpacing: '-0.02em', fontWeight: 400, color: '#fff', textShadow: '0 8px 32px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.2)' }}
            >
              Happiness
            </motion.h1>
          </div>
          <div style={{ overflow: 'hidden', paddingBottom: '0.5rem' }}>
            <motion.h1
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(3.5rem, 8vw, 6.5rem)', lineHeight: 0.95, letterSpacing: '-0.02em', fontWeight: 400, color: '#fff', textShadow: '0 8px 32px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.2)' }}
            >
              Delivered <em style={{ fontStyle: 'italic', color: 'var(--color-cream)', fontWeight: 300 }}>in</em>
            </motion.h1>
          </div>
          <div style={{ overflow: 'hidden', paddingBottom: '1rem' }}>
            <motion.h1
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(3.5rem, 8vw, 6.5rem)', lineHeight: 0.95, letterSpacing: '-0.02em', fontWeight: 300, fontStyle: 'italic', color: 'var(--color-cream)', textShadow: '0 8px 32px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.2)' }}
            >
              Bloom.
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 1.5 }}
            style={{ fontFamily: 'var(--font-sans)', fontSize: '1.125rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.95)', marginTop: '1.5rem', maxWidth: '420px', textShadow: '0 4px 12px rgba(0,0,0,0.3)' }}
          >
            Fresh bouquets and curated gifts delivered same-day across Dubai.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{ marginTop: '3rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
          >
            <a href="#products" className="hero-btn-solid">
              <span>Order Now</span>
              <span className="hero-btn-icon">
                <svg width="13" height="13" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2.5 9.5l7-7M9.5 2.5H3.5M9.5 2.5v6" />
                </svg>
              </span>
            </a>
          </motion.div>
        </motion.div>


      </div>

      <style>{`
        .hero-btn-solid {
          display: inline-flex;
          align-items: center;
          gap: 0.875rem;
          background: rgba(255,255,255,0.13);
          backdrop-filter: blur(16px) saturate(1.2);
          -webkit-backdrop-filter: blur(16px) saturate(1.2);
          color: white;
          border: 1px solid rgba(255,255,255,0.28);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.2), 0 4px 24px rgba(0,0,0,0.08);
          font-family: var(--font-sans);
          font-size: 0.8125rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          border-radius: 9999px;
          padding: 0.875rem 1.375rem 0.875rem 2rem;
          text-decoration: none;
          transition: all 400ms cubic-bezier(0.32, 0.72, 0, 1);
        }
        .hero-btn-solid:hover {
          background: rgba(255,255,255,0.96);
          color: var(--color-charcoal);
          border-color: rgba(255,255,255,0.9);
          transform: translateY(-2px);
          box-shadow: 0 20px 44px rgba(0,0,0,0.14), inset 0 1px 0 rgba(255,255,255,0.9);
        }
        .hero-btn-solid:active { transform: scale(0.98); }
        .hero-btn-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 1.75rem;
          height: 1.75rem;
          border-radius: 50%;
          background: rgba(255,255,255,0.18);
          border: 1px solid rgba(255,255,255,0.2);
          transition: transform 300ms cubic-bezier(0.32, 0.72, 0, 1), background 400ms;
          flex-shrink: 0;
        }
        .hero-btn-solid:hover .hero-btn-icon {
          transform: translate(2px, -1px) scale(1.1);
          background: rgba(255,255,255,0.25);
        }
        .hero-btn-solid:hover .hero-btn-icon svg { stroke: var(--color-charcoal); }

        .float-slow {
          animation: floatSlow 8s ease-in-out infinite;
        }

        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @media (max-width: 768px) {
          .float-slow { display: none; }
          .hero-btn-solid { width: 100%; justify-content: center; }
        }
      `}</style>
    </section>
  );
}



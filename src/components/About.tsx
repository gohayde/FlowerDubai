import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useInView } from '../hooks/useAnimations';

const stats = [
  { numeric: 2300, suffix: '+', label: 'Orders delivered', display: null },
  { numeric: 100,  suffix: '%',  label: 'Satisfaction',     display: null },
  { numeric: null, suffix: '',  label: 'Every day',        display: '9AM–2AM' },
];

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ─── Animated count-up number ─── */
function CountUp({
  target,
  suffix,
  duration = 1400,
  start,
}: {
  target: number;
  suffix: string;
  duration?: number;
  start: boolean;
}) {
  const [count, setCount] = useState(() => (prefersReducedMotion() ? target : 0));
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!start) return;
    if (prefersReducedMotion()) return;

    const startTime = performance.now();
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setCount(Math.round(ease(progress) * target));
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [start, target, duration]);

  const formatted = count >= 1000
    ? count.toLocaleString()
    : String(count);

  return <>{formatted}{suffix}</>;
}

export default function About() {
  const { ref, isInView } = useInView();
  const imageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: imageRef, offset: ['start end', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  return (
    <section ref={ref} id="about" className="section-padding" style={{ background: 'var(--color-cream-dark)', position: 'relative', overflow: 'hidden' }}>
      {/* Subtle ambient orb */}
      <div
        aria-hidden="true"
        className="orb-ambient"
        style={{
          position: 'absolute', top: '-20%', right: '-10%',
          width: 'clamp(320px, 45vw, 640px)', height: 'clamp(320px, 45vw, 640px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, oklch(93% 0.030 10 / 0.35), transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />

      <div className="container-main" style={{ position: 'relative', zIndex: 1 }}>
        <div className="about-grid">
          {/* Visual — arch frame with Ken Burns + scroll parallax */}
          <motion.div
            ref={imageRef}
            initial={{ opacity: 0, x: -44 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.32, 0.72, 0, 1] }}
            style={{ position: 'relative' }}
          >
            {/* Blush shadow behind frame */}
            <div
              style={{
                position: 'absolute', inset: 0,
                borderRadius: '9999px 9999px 2.5rem 2.5rem',
                background: 'var(--color-blush-light)',
                transform: 'scale(0.95) translateY(2.5%) translateX(2%)',
              }}
            />

            {/* Arch frame */}
            <div
              className="gsap-parallax"
              style={{
                position: 'relative',
                borderRadius: '9999px 9999px 2.5rem 2.5rem',
                overflow: 'hidden',
                aspectRatio: '3/4',
                background: 'oklch(90% 0.038 10)',
              }}
            >
              {/* Ken Burns animated layer */}
              <motion.div
                style={{ y: imageY }}
                className="ken-burns"
                // Ken Burns handles its own horizontal — just add scroll parallax via motion
              >
                <div
                  className="ken-burns"
                  style={{
                    position: 'absolute', inset: '-10%',
                    backgroundImage: 'url(/images/gallery/roses.webp)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center 25%',
                  }}
                />
              </motion.div>

              {/* Color wash placeholder */}
              <div
                style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(160deg, oklch(93% 0.032 10) 0%, oklch(78% 0.072 8 / 0.7) 55%, oklch(42% 0.070 150 / 0.18) 100%)',
                  zIndex: 0,
                }}
              />

              {/* Real image */}
              <img
                src="/images/gallery/roses.webp"
                alt="Fresh roses in a ceramic vase, arranged by Urban Rose florists"
                loading="lazy"
                decoding="async"
                style={{
                  position: 'absolute', inset: 0,
                  width: '100%', height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  zIndex: 1,
                }}
              />

              {/* Vignette */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute', inset: 0, zIndex: 2,
                  background: 'radial-gradient(ellipse at 50% 0%, transparent 55%, rgba(18,12,8,0.1) 100%)',
                  pointerEvents: 'none',
                }}
              />
            </div>

            {/* Floating rating badge */}
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.65, duration: 0.65, ease: [0.32, 0.72, 0, 1] }}
              className="drift-float"
              style={{
                position: 'absolute',
                bottom: '2rem', right: '-1.75rem',
                background: 'var(--color-charcoal)',
                borderRadius: '1.375rem',
                padding: '1.375rem 1.625rem',
                minWidth: '150px',
                boxShadow: '0 12px 40px rgba(18,12,8,0.22)',
              }}
            >
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: '2.25rem', fontWeight: 400, color: 'var(--color-blush)', lineHeight: 1, marginBottom: '0.3rem' }}>
                4.9
              </p>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.6875rem', fontWeight: 600, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Average rating
              </p>
            </motion.div>
          </motion.div>

          {/* Text */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
              className="label-eyebrow"
              style={{ marginBottom: '1rem', color: 'var(--color-rose)' }}
            >
              Our Story
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 28 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.75, ease: [0.32, 0.72, 0, 1] }}
              className="heading-section"
            >
              Flowers for Every
              <br />
              <em style={{ fontStyle: 'italic', color: 'var(--color-rose)' }}>Meaningful</em> Moment
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.65, ease: [0.32, 0.72, 0, 1] }}
              className="text-body-lg"
              style={{ marginTop: '1.5rem', maxWidth: '480px' }}
            >
              Urban Rose creates fresh floral gifts, elegant bouquets, grand arrangements,
              and chocolate pairings for moments that matter across Dubai. From romantic
              surprises to late-night gestures, every order is designed to arrive beautifully.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.35, duration: 0.65, ease: [0.32, 0.72, 0, 1] }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                marginTop: '2.5rem',
                paddingTop: '2.5rem',
                borderTop: '1px solid rgba(200,100,100,0.12)',
              }}
            >
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  style={{
                    paddingRight: i < 2 ? '1.5rem' : '0',
                    borderRight: i < 2 ? '1px solid rgba(200,100,100,0.1)' : 'none',
                    paddingLeft: i > 0 ? '1.5rem' : '0',
                  }}
                >
                  <p style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', fontWeight: 400, color: 'var(--color-charcoal)', lineHeight: 1, marginBottom: '0.4rem' }}>
                    {stat.display ? (
                      stat.display
                    ) : (
                      <CountUp
                        target={stat.numeric!}
                        suffix={stat.suffix}
                        duration={1600}
                        start={isInView}
                      />
                    )}
                  </p>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', color: 'var(--color-muted)', fontWeight: 500 }}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>

            <motion.a
              href="#contact"
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
              className="btn-secondary"
              style={{ display: 'inline-flex', marginTop: '2rem' }}
            >
              Get in touch
            </motion.a>
          </div>
        </div>
      </div>

      <style>{`
        .about-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(3rem, 6vw, 6rem);
          align-items: center;
        }
        .about-grid > div:first-child { max-width: 400px; margin: 0 auto; }
        @media (min-width: 768px) {
          .about-grid { grid-template-columns: 5fr 6fr; }
          .about-grid > div:first-child { max-width: none; margin: 0; }
        }
      `}</style>
    </section>
  );
}



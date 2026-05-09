import { memo, useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { useInView } from '../hooks/useAnimations';
import { ArrowRight, Phone } from 'lucide-react';

/* ─── Counter — isolated, no parent re-renders ─── */
const Counter = memo(function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const { ref, isInView } = useInView();
  const started = useRef(false);

  useEffect(() => {
    if (!isInView || started.current) return;
    started.current = true;
    const duration = 1800;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(ease * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [isInView, target]);

  return (
    <span ref={ref} style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 5vw, 3.75rem)', fontWeight: 400, color: 'oklch(97% 0.008 55)', lineHeight: 1, letterSpacing: '-0.02em' }}>
      {count.toLocaleString()}{suffix}
    </span>
  );
});

/* ─── Animated background — rings + mesh orbs ─── */
const DeliveryBg = memo(function DeliveryBg() {
  return (
    <div aria-hidden="true" style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {/* Ken Burns bg image area — animated until real photo */}
      <div
        className="ken-burns"
        style={{
          position: 'absolute', inset: '-8%',
          backgroundImage: 'url(/images/sections/delivery-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.12,
        }}
      />

      {/* Orbital rings */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 70, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute', top: '50%', right: '-8%',
          width: 'clamp(380px, 60vw, 800px)', height: 'clamp(380px, 60vw, 800px)',
          transform: 'translate(0, -50%)',
          borderRadius: '50%',
          border: '1px solid rgba(253,232,238,0.07)',
        }}
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 95, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute', top: '50%', right: '-4%',
          width: 'clamp(240px, 40vw, 540px)', height: 'clamp(240px, 40vw, 540px)',
          transform: 'translate(0, -50%)',
          borderRadius: '50%',
          border: '1px solid rgba(253,232,238,0.11)',
        }}
      />

      {/* Garden green orb — top-right bleed */}
      <div
        className="orb-ambient"
        style={{
          position: 'absolute', top: '-25%', right: '-10%',
          width: 'clamp(260px, 36vw, 520px)', height: 'clamp(260px, 36vw, 520px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, oklch(50% 0.085 150 / 0.38), transparent 70%)',
          filter: 'blur(64px)',
        }}
      />
      {/* Rose orb — bottom-left */}
      <div
        className="orb-ambient-b"
        style={{
          position: 'absolute', bottom: '-15%', left: '5%',
          width: 'clamp(140px, 20vw, 300px)', height: 'clamp(140px, 20vw, 300px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, oklch(82% 0.065 10 / 0.14), transparent 70%)',
          filter: 'blur(44px)',
        }}
      />

      {/* Grain */}
      <div
        style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat', backgroundSize: '256px 256px', opacity: 0.45,
        }}
      />
    </div>
  );
});

export default function ImmediateDelivery() {
  const { ref, isInView } = useInView();

  return (
    <section
      ref={ref}
      style={{ background: 'var(--color-wine)', padding: 'clamp(5rem, 10vw, 8rem) 0', position: 'relative', overflow: 'hidden' }}
    >
      <DeliveryBg />

      <div className="container-main" style={{ position: 'relative', zIndex: 10 }}>
        <div className="delivery-grid">
          {/* Text */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
              style={{ fontFamily: 'var(--font-sans)', fontSize: '0.6875rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600, color: 'rgba(253,232,238,0.5)', marginBottom: '1.5rem' }}
            >
              Same Day · Across All Dubai
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 32 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
              style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 400, lineHeight: 1.06, color: 'oklch(97% 0.008 55)', letterSpacing: '-0.015em' }}
            >
              Fresh Flowers,
              <br />
              <em style={{ fontStyle: 'italic', color: 'var(--color-blush)' }}>Delivered Today.</em>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.22, duration: 0.65, ease: [0.32, 0.72, 0, 1] }}
              style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', lineHeight: 1.75, color: 'rgba(253,232,238,0.65)', maxWidth: '420px', marginTop: '1.25rem', marginBottom: '2.5rem' }}
            >
              Order now and send a beautiful surprise across Dubai with immediate
              delivery, every day from 9AM to 2AM.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.36, duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
              style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1rem' }}
            >
              <a href="#products" className="delivery-cta-primary">
                <span>Order Now</span>
                <span className="delivery-icon-wrap">
                  <ArrowRight size={13} />
                </span>
              </a>
              <a href="tel:+971547470809" className="delivery-cta-ghost">
                <Phone size={15} />
                (+971) 54 747 0809
              </a>
            </motion.div>
          </div>

          {/* Right — image + stats */}
          <motion.div
            initial={{ opacity: 0, x: 44 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.22, duration: 0.9, ease: [0.32, 0.72, 0, 1] }}
            style={{ display: 'flex', flexDirection: 'column', gap: '0' }}
          >
            {/* Image panel — placeholder until real photo */}
            <div
              className="delivery-img-wrap img-zoom-wrap"
              style={{
                width: '100%',
                aspectRatio: '4 / 3',
                borderRadius: '2rem',
                background: 'linear-gradient(145deg, oklch(48% 0.082 150) 0%, oklch(38% 0.065 45 / 0.45) 100%)',
                border: '1px solid rgba(253,232,238,0.08)',
                overflow: 'hidden',
                marginBottom: '1.5rem',
                position: 'relative',
              }}
            >
              {/* Ken Burns layer */}
              <div
                className="ken-burns"
                style={{
                  position: 'absolute', inset: '-8%',
                  backgroundImage: 'url(/images/sections/delivery-bouquet.jpg)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />

              {/* Color wash */}
              <div
                style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(145deg, oklch(46% 0.080 150 / 0.6) 0%, oklch(38% 0.065 45 / 0.35) 100%)',
                }}
              />

              {/* Ambient text — shown when photo is absent */}
              <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '0.5rem' }}>
                <p style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 400, color: 'rgba(253,232,238,0.22)', letterSpacing: '-0.01em', fontStyle: 'italic' }}>
                  Same day
                </p>
                <p style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 400, color: 'rgba(253,232,238,0.14)', letterSpacing: '-0.02em', fontStyle: 'italic' }}>
                  across Dubai
                </p>
              </div>

              {/* Floating "Open Now" badge */}
              <motion.div
                animate={{ y: [0, -7, 0] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  position: 'absolute', bottom: '1.25rem', right: '1.25rem', zIndex: 2,
                  background: 'rgba(255,253,251,0.10)',
                  backdropFilter: 'blur(14px)',
                  border: '1px solid rgba(255,253,251,0.14)',
                  borderRadius: '1rem',
                  padding: '0.65rem 1.1rem',
                  display: 'flex', alignItems: 'center', gap: '0.55rem',
                }}
              >
                <motion.span
                  animate={{ opacity: [1, 0.25, 1] }}
                  transition={{ duration: 1.6, repeat: Infinity }}
                  style={{ width: 8, height: 8, borderRadius: '50%', background: 'oklch(75% 0.14 145)', flexShrink: 0 }}
                />
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.6875rem', fontWeight: 700, color: 'white', letterSpacing: '0.06em' }}>
                  Open Now
                </span>
              </motion.div>
            </div>

            {/* Stats */}
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px',
              background: 'rgba(253,232,238,0.07)',
              borderRadius: '1.375rem', overflow: 'hidden',
              border: '1px solid rgba(253,232,238,0.07)',
            }}>
              {[
                { target: 2347, suffix: '+', label: 'Orders Delivered' },
                { target: 100, suffix: '%', label: 'Satisfaction' },
              ].map(({ target, suffix, label }) => (
                <div key={label} style={{ background: 'rgba(40,74,48,0.5)', padding: '1.375rem 1.5rem', textAlign: 'center' }}>
                  <Counter target={target} suffix={suffix} />
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.6875rem', fontWeight: 600, color: 'rgba(253,232,238,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '0.4rem' }}>{label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        .delivery-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(3rem, 6vw, 5rem);
          align-items: center;
        }
        @media (min-width: 768px) {
          .delivery-grid { grid-template-columns: 1fr 1fr; }
        }
        .delivery-cta-primary {
          display: inline-flex; align-items: center; gap: 0.75rem;
          padding: 0.8125rem 1.375rem 0.8125rem 1.875rem;
          background: var(--color-blush); color: var(--color-charcoal);
          font-family: var(--font-sans); font-size: 0.8125rem; font-weight: 700;
          letter-spacing: 0.06em; text-transform: uppercase;
          border-radius: 9999px; text-decoration: none;
          transition: all 400ms cubic-bezier(0.32,0.72,0,1);
          box-shadow: 0 1px 3px rgba(18,12,8,0.1);
        }
        .delivery-icon-wrap {
          display: inline-flex; align-items: center; justify-content: center;
          width: 1.75rem; height: 1.75rem; border-radius: 50%;
          background: rgba(24,16,8,0.1);
          border: 1px solid rgba(24,16,8,0.08);
          transition: transform 300ms cubic-bezier(0.32,0.72,0,1);
          flex-shrink: 0;
        }
        .delivery-cta-primary:hover { background: var(--color-cream); transform: translateY(-2px); box-shadow: 0 14px 36px rgba(18,12,8,0.16); }
        .delivery-cta-primary:hover .delivery-icon-wrap { transform: translate(2px, -1px) scale(1.1); }
        .delivery-cta-primary:active { transform: scale(0.98); }
        .delivery-cta-ghost {
          display: inline-flex; align-items: center; gap: 0.5rem;
          color: rgba(253,232,238,0.75); text-decoration: none;
          font-size: 0.875rem; font-weight: 600; font-family: var(--font-sans);
          transition: color 300ms;
        }
        .delivery-cta-ghost:hover { color: var(--color-blush); }
      `}</style>
    </section>
  );
}



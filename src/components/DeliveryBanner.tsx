import { useRef, MutableRefObject } from 'react';
import { motion } from 'motion/react';
import { useInView } from '../hooks/useAnimations';
import { Zap, Clock, MapPin } from 'lucide-react';

const stats = [
  { icon: Zap,    value: '60 min',   label: 'Express Delivery' },
  { icon: Clock,  value: '9AM–2AM',  label: 'Open Every Day' },
  { icon: MapPin, value: '20+',      label: 'Dubai Areas' },
];

export default function DeliveryBanner() {
  const sectionRef = useRef<HTMLElement>(null);
  const { ref: inViewRef, isInView } = useInView();

  return (
    <section
      ref={(el) => {
        sectionRef.current = el;
        (inViewRef as MutableRefObject<HTMLElement | null>).current = el;
      }}
      style={{
        padding: 'clamp(3rem, 6vw, 5rem) clamp(1rem, 4vw, 2rem)',
        background: 'var(--color-warm-white)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        className="container-main"
        style={{ position: 'relative', zIndex: 1 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
          style={{
            borderRadius: '2rem',
            backgroundImage: 'linear-gradient(90deg, rgba(255, 251, 246, 0.03) 0%, rgba(255, 251, 246, 0.08) 45%, rgba(255, 251, 246, 0.76) 67%, rgba(255, 251, 246, 0.91) 100%), url("/Media/Delivery.png")',
            backgroundSize: '94% auto',
            backgroundPosition: 'center 48%',
            backgroundRepeat: 'no-repeat',
            overflow: 'hidden',
            position: 'relative',
            minHeight: 'clamp(360px, 35vw, 520px)',
          }}
          className="delivery-banner-grid"
        >
          {/* Text side */}
          <div className="delivery-banner-copy" style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            minHeight: 'inherit',
            width: 'min(100%, 470px)',
            marginLeft: 'clamp(48%, 56vw, 58%)',
            padding: 'clamp(2rem, 3.8vw, 3.25rem) clamp(2rem, 4.5vw, 4rem) clamp(2rem, 3.8vw, 3.25rem) 0',
            position: 'relative',
            zIndex: 1,
          }}>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--color-muted)',
                marginBottom: '1.125rem',
              }}
            >
              with Flower Dubai
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 22 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.28, duration: 0.75, ease: [0.32, 0.72, 0, 1] }}
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2rem, 4vw, 3.25rem)',
                fontWeight: 700,
                lineHeight: 1.1,
                color: 'var(--color-charcoal)',
                marginBottom: '1.25rem',
                letterSpacing: '-0.01em',
              }}
            >
              Get Your Flowers<br />
              <span style={{ fontStyle: 'italic' }}>Today.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.36, duration: 0.65 }}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.9375rem',
                fontWeight: 500,
                color: 'var(--color-muted)',
                lineHeight: 1.65,
                marginBottom: '2.25rem',
                maxWidth: '340px',
              }}
            >
              Immediate delivery across Dubai — order now and your bouquet arrives within the hour.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.44, duration: 0.6 }}
              style={{
                display: 'flex',
                columnGap: '1.75rem',
                rowGap: '1.25rem',
                marginBottom: '2.5rem',
                flexWrap: 'wrap',
              }}
            >
              {stats.map(({ icon: Icon, value, label }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{
                    width: '2rem', height: '2rem', borderRadius: '50%',
                    background: 'rgba(24,16,8,0.08)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <Icon size={12} color="var(--color-charcoal)" strokeWidth={2} />
                  </div>
                  <div>
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8125rem', fontWeight: 700, color: 'var(--color-charcoal)', lineHeight: 1.1 }}>{value}</p>
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.625rem', color: 'var(--color-muted)', fontWeight: 500, letterSpacing: '0.04em' }}>{label}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.52, duration: 0.6 }}
            >
              <a
                href="#products"
                className="delivery-cta"
              >
                Order Now
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <style>{`
        .delivery-banner-grid {
          box-shadow: 0 28px 70px rgba(24, 16, 8, 0.08);
        }
        .delivery-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.875rem 2.25rem;
          border-radius: 9999px;
          background: var(--color-charcoal);
          color: white;
          font-family: var(--font-sans);
          font-size: 0.9375rem;
          font-weight: 700;
          text-decoration: none;
          letter-spacing: 0.02em;
          box-shadow: 0 10px 28px rgba(24,16,8,0.18);
          transition: all 350ms cubic-bezier(0.32,0.72,0,1);
        }
        .delivery-cta:hover {
          background: var(--color-charcoal-mid);
          transform: translateY(-2px);
          box-shadow: 0 14px 34px rgba(24,16,8,0.22);
        }
        @media (max-width: 640px) {
          .delivery-banner-grid {
            background-image: linear-gradient(180deg, rgba(255, 251, 246, 0.08) 0%, rgba(255, 251, 246, 0.92) 58%, rgba(255, 251, 246, 0.98) 100%), url("/Media/Delivery.png") !important;
            background-size: auto 78% !important;
            background-position: 27% center !important;
          }
          .delivery-banner-copy {
            width: 100% !important;
            margin-left: 0 !important;
            padding: clamp(2rem, 9vw, 3rem) !important;
            justify-content: flex-end !important;
          }
        }
      `}</style>
    </section>
  );
}

import { motion } from 'motion/react';
import { useInView } from '../hooks/useAnimations';
import { MapPin, ArrowRight } from 'lucide-react';
import { deliveryAreas } from '../data/products';

export default function DeliveryAreas() {
  const { ref, isInView } = useInView();

  return (
    <section ref={ref} id="delivery" className="section-padding" style={{ background: 'var(--color-cream-dark)' }}>
      <div className="container-main">
        <div
          className="delivery-layout"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.4fr',
            gap: 'clamp(3rem, 6vw, 6rem)',
            alignItems: 'start',
          }}
        >
          {/* Left — text */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
              className="label-eyebrow"
              style={{ marginBottom: '1rem', color: 'var(--color-wine)' }}
            >
              We Deliver Across Dubai
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
              className="heading-section"
            >
              Flowers to Every
              <br />
              Corner of{' '}
              <em style={{ fontStyle: 'italic', color: 'var(--color-rose)' }}>Dubai</em>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
              className="text-body"
              style={{ marginTop: '1.25rem', maxWidth: '380px' }}
            >
              Based on Sheikh Zayed Road, we deliver same-day across 12 areas of Dubai,
              every day from 9AM to 2AM.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3, duration: 0.5 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginTop: '1.5rem',
                fontSize: '0.8125rem',
                color: 'var(--color-muted)',
                fontWeight: 500,
              }}
            >
              <MapPin size={14} style={{ color: 'var(--color-rose)', flexShrink: 0 }} />
              19 Sheikh Zayed Rd, Trade Center, Dubai
            </motion.div>

            <motion.a
              href="#contact"
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
              className="btn-primary"
              style={{ display: 'inline-flex', marginTop: '2rem', alignItems: 'center', gap: '0.5rem' }}
            >
              <span>Check Availability</span>
              <ArrowRight size={15} />
            </motion.a>
          </div>

          {/* Right — area chips, flowing organic */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25, duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', paddingTop: '0.5rem' }}
          >
            {deliveryAreas.map((area, i) => (
              <motion.span
                key={area}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{
                  delay: 0.3 + i * 0.04,
                  duration: 0.4,
                  ease: [0.32, 0.72, 0, 1],
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.375rem',
                  padding: '0.5rem 1.125rem',
                  borderRadius: '9999px',
                  background: 'var(--color-warm-white)',
                  border: '1px solid rgba(248,184,197,0.2)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.8125rem',
                  fontWeight: 500,
                  color: 'var(--color-charcoal)',
                  transition: 'all 350ms cubic-bezier(0.32,0.72,0,1)',
                  cursor: 'default',
                }}
                whileHover={{
                  background: 'var(--color-blush-light)',
                  borderColor: 'var(--color-blush)',
                }}
              >
                <span
                  style={{
                    width: '5px',
                    height: '5px',
                    borderRadius: '50%',
                    background: 'var(--color-wine)',
                    flexShrink: 0,
                    display: 'inline-block',
                  }}
                />
                {area}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .delivery-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}



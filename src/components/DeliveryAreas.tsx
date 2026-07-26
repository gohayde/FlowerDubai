import { motion } from 'motion/react';
import { useInView } from '../hooks/useAnimations';
import { MapPin, ArrowRight } from 'lucide-react';

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

          {/* Right — real map embed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25, duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
            style={{
              borderRadius: '1.75rem',
              overflow: 'hidden',
              border: '1px solid rgba(248,184,197,0.2)',
              aspectRatio: '16 / 10',
              boxShadow: '0 20px 50px rgba(24,16,8,0.06)',
            }}
          >
            <iframe
              title="Flower Dubai location and delivery coverage map"
              src="https://www.google.com/maps?q=19+Sheikh+Zayed+Rd,+Trade+Center,+Dubai&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, display: 'block' }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
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



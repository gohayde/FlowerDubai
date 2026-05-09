import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useInView } from '../hooks/useAnimations';
import { Plus, Minus } from 'lucide-react';
import { faqItems } from '../data/products';

export default function FAQ() {
  const { ref, isInView } = useInView();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section ref={ref} id="faq" className="section-padding" style={{ background: 'var(--color-cream)' }}>
      <div className="container-narrow">
        {/* Header */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'clamp(2rem, 4vw, 4rem)',
            marginBottom: 'clamp(3rem, 5vw, 4.5rem)',
            alignItems: 'end',
          }}
          className="faq-header"
        >
          <div>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
              className="label-eyebrow"
              style={{ marginBottom: '1rem', color: 'var(--color-rose)' }}
            >
              Questions
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
              className="heading-section"
            >
              Before You
              <br />
              <em style={{ fontStyle: 'italic', color: 'var(--color-rose)' }}>Order</em>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
            className="text-body"
          >
            Everything you need to know about ordering, delivery, and our flowers.
            Still need help? Call us any time.
          </motion.p>
        </div>

        {/* Accordion */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {faqItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: 0.15 + i * 0.07,
                duration: 0.6,
                ease: [0.32, 0.72, 0, 1],
              }}
              style={{
                borderTop: i === 0 ? '1px solid rgba(248,184,197,0.25)' : 'none',
                borderBottom: '1px solid rgba(248,184,197,0.25)',
              }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex items-center justify-between w-full text-left"
                aria-expanded={openIndex === i}
                style={{
                  padding: '1.5rem 0',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1rem, 1.5vw, 1.1875rem)',
                  fontWeight: 400,
                  color: openIndex === i ? 'var(--color-rose)' : 'var(--color-charcoal)',
                  transition: 'color 350ms',
                  width: '100%',
                  gap: '1.5rem',
                }}
              >
                <span style={{ flex: 1, textAlign: 'left' }}>{item.question}</span>
                <span
                  style={{
                    flexShrink: 0,
                    color: 'var(--color-rose)',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  {openIndex === i ? <Minus size={18} /> : <Plus size={18} />}
                </span>
              </button>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
                    style={{ overflow: 'hidden' }}
                  >
                    <p
                      style={{
                        paddingBottom: '1.5rem',
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.9375rem',
                        lineHeight: 1.7,
                        color: 'var(--color-muted)',
                        maxWidth: '65ch',
                      }}
                    >
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .faq-header {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}



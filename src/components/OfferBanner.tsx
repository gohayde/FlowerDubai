import { useState } from 'react';
import { motion } from 'motion/react';
import { useInView } from '../hooks/useAnimations';
import { ArrowRight } from 'lucide-react';

export default function OfferBanner() {
  const { ref, isInView } = useInView();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValid) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  return (
    <section
      ref={ref}
      style={{
        background: 'var(--color-warm-white)',
        padding: 'clamp(4rem, 8vw, 6rem) 0',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Large numeral — typographic decoration, not bokeh */}
      <div
        className="gsap-parallax"
        aria-hidden="true"
        style={{
          position: 'absolute',
          right: '-0.05em',
          top: '50%',
          transform: 'translateY(-50%)',
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(14rem, 30vw, 26rem)',
          fontWeight: 400,
          lineHeight: 1,
          color: 'rgba(24,16,8,0.03)',
          userSelect: 'none',
          pointerEvents: 'none',
          letterSpacing: '-0.04em',
        }}
      >
        10
      </div>

      <div className="container-narrow" style={{ position: 'relative', zIndex: 1 }}>
        <div
          className="offer-layout"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'clamp(2.5rem, 5vw, 5rem)',
            alignItems: 'center',
          }}
        >
          {/* Text side */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.6875rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                fontWeight: 600,
                color: 'var(--color-muted)',
                marginBottom: '1rem',
              }}
            >
              Welcome Gift
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.75rem, 5vw, 4.5rem)',
                fontWeight: 400,
                lineHeight: 1.05,
                letterSpacing: '-0.01em',
                color: 'var(--color-charcoal)',
              }}
            >
              10% Off
              <br />
              <em style={{ fontStyle: 'italic', color: 'var(--color-muted)' }}>Your First</em>
              <br />
              Order
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.9375rem',
                lineHeight: 1.65,
                color: 'var(--color-muted)',
                marginTop: '1rem',
                maxWidth: '320px',
              }}
            >
              Join the Flower Dubai list and receive your welcome discount by email.
            </motion.p>
          </div>

          {/* Form side */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.65, ease: [0.32, 0.72, 0, 1] }}
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  padding: '2rem',
                  borderRadius: '1.5rem',
                  background: 'rgba(255,255,255,0.4)',
                  border: '1px solid rgba(24,16,8,0.05)',
                  textAlign: 'center',
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.5rem',
                    fontWeight: 400,
                    color: 'var(--color-charcoal)',
                    marginBottom: '0.5rem',
                  }}
                >
                  Welcome.
                </p>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', color: 'var(--color-muted)' }}>
                  Your discount has been sent.
                </p>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}
              >
                <div>
                  <input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); if (error) setError(''); }}
                    aria-invalid={!!error}
                    aria-describedby={error ? 'email-error' : undefined}
                    style={{
                      width: '100%',
                      padding: '0.75rem 0',
                      border: 'none',
                      borderBottom: `1px solid ${error ? 'oklch(55% 0.18 28)' : 'rgba(24,16,8,0.2)'}`,
                      background: 'transparent',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '1rem',
                      color: 'var(--color-charcoal)',
                      outline: 'none',
                      transition: 'border-color 300ms',
                    }}
                    onFocus={(e) => (e.target.style.borderBottomColor = error ? 'oklch(55% 0.18 28)' : 'var(--color-charcoal)')}
                    onBlur={(e) => (e.target.style.borderBottomColor = error ? 'oklch(55% 0.18 28)' : 'rgba(24,16,8,0.2)')}
                  />
                  {error && (
                    <p id="email-error" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', color: 'oklch(55% 0.18 28)', marginTop: '0.375rem' }}>
                      {error}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.625rem',
                    padding: '0.875rem 2rem',
                    marginTop: '1rem',
                    borderRadius: '9999px',
                    border: 'none',
                    background: 'var(--color-charcoal)',
                    color: 'white',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    letterSpacing: '0.04em',
                    cursor: 'pointer',
                    transition: 'all 500ms cubic-bezier(0.32,0.72,0,1)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--color-charcoal-mid)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'var(--color-charcoal)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <span>Claim Discount</span>
                  <ArrowRight size={15} />
                </button>
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.6875rem',
                    color: 'var(--color-muted)',
                    textAlign: 'center',
                    letterSpacing: '0.02em',
                    marginTop: '0.5rem'
                  }}
                >
                  One-time welcome offer. No spam.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .offer-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}



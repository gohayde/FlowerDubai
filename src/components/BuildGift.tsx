import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useInView } from '../hooks/useAnimations';
import { ArrowRight } from 'lucide-react';

const giftTypes = ['Bouquet', 'Big Bouquet', 'Flower Box', 'Chocolates'];
const occasions = ['Birthday', 'Anniversary', 'Love & Romance', 'Congratulations', 'Thank You', 'Apology', 'Just Because'];
const deliveryOptions = ['Immediate Delivery', 'Today', 'Schedule Date'];

const previewImages: Record<string, string> = {
  'Bouquet': '/images/products/bloom-fusion.webp',
  'Big Bouquet': '/images/products/big-surprise.webp',
  'Flower Box': '/images/products/flower-box.webp',
  'Chocolates': '/images/products/chocolate-gift.webp',
};

const basePrices: Record<string, number> = {
  'Bouquet': 250,
  'Big Bouquet': 800,
  'Flower Box': 350,
  'Chocolates': 200,
};

export default function BuildGift() {
  const { ref, isInView } = useInView();
  const [gift, setGift] = useState('Bouquet');
  const [occasion, setOccasion] = useState('Birthday');
  const [delivery, setDelivery] = useState('Today');
  const [message, setMessage] = useState('');

  const price = basePrices[gift] + (delivery === 'Immediate Delivery' ? 50 : 0);

  return (
    <section ref={ref} className="section-padding" style={{ background: 'white' }}>
      <div className="container-main">
        {/* Header */}
        <div className="text-center" style={{ marginBottom: 'clamp(3rem, 5vw, 4rem)' }}>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
            className="label-eyebrow"
            style={{ marginBottom: '1rem', color: 'var(--color-rose)' }}
          >
            Personalize Your Gift
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
            className="heading-section"
          >
            Build The Perfect <em style={{ fontStyle: 'italic', color: 'var(--color-rose)' }}>Surprise</em>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
            className="text-body"
            style={{ marginTop: '0.75rem', maxWidth: '460px', marginInline: 'auto' }}
          >
            Choose the gift, occasion, delivery speed, and message.
          </motion.p>
        </div>

        {/* Double-Bezel outer shell */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
          style={{
            background: 'rgba(24,16,8,0.028)',
            border: '1px solid rgba(24,16,8,0.05)',
            borderRadius: '2.25rem',
            padding: '0.375rem',
          }}
        >
        <div
          className="grid"
          style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3rem',
            background: 'var(--color-cream)',
            borderRadius: 'calc(2.25rem - 6px)',
            padding: 'clamp(1.5rem, 4vw, 3rem)',
            boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.9)',
          }}
        >
          {/* Steps */}
          <div className="flex flex-col" style={{ gap: '2rem' }}>
            {/* Step 1: Gift Type */}
            <div>
              <p className="label-eyebrow" style={{ marginBottom: '0.75rem', color: 'var(--color-wine)' }}>
                1. Choose Gift
              </p>
              <div className="flex flex-wrap" style={{ gap: '0.5rem' }}>
                {giftTypes.map((g) => (
                  <button
                    key={g}
                    onClick={() => setGift(g)}
                    style={{
                      padding: '0.5rem 1rem',
                      borderRadius: '9999px',
                      border: '1.5px solid',
                      borderColor: gift === g ? 'var(--color-wine)' : 'rgba(117, 111, 107, 0.2)',
                      background: gift === g ? 'var(--color-wine)' : 'white',
                      color: gift === g ? 'white' : 'var(--color-charcoal)',
                      fontSize: '0.8125rem',
                      fontWeight: 500,
                      cursor: 'pointer',
                      transition: 'all 300ms cubic-bezier(0.32, 0.72, 0, 1)',
                    }}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Occasion */}
            <div>
              <p className="label-eyebrow" style={{ marginBottom: '0.75rem', color: 'var(--color-wine)' }}>
                2. Choose Occasion
              </p>
              <div className="flex flex-wrap" style={{ gap: '0.5rem' }}>
                {occasions.map((o) => (
                  <button
                    key={o}
                    onClick={() => setOccasion(o)}
                    style={{
                      padding: '0.5rem 1rem',
                      borderRadius: '9999px',
                      border: '1.5px solid',
                      borderColor: occasion === o ? 'var(--color-rose)' : 'rgba(117, 111, 107, 0.2)',
                      background: occasion === o ? 'var(--color-rose)' : 'white',
                      color: occasion === o ? 'white' : 'var(--color-charcoal)',
                      fontSize: '0.8125rem',
                      fontWeight: 500,
                      cursor: 'pointer',
                      transition: 'all 300ms cubic-bezier(0.32, 0.72, 0, 1)',
                    }}
                  >
                    {o}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Delivery */}
            <div>
              <p className="label-eyebrow" style={{ marginBottom: '0.75rem', color: 'var(--color-wine)' }}>
                3. Choose Delivery
              </p>
              <div className="flex flex-wrap" style={{ gap: '0.5rem' }}>
                {deliveryOptions.map((d) => (
                  <button
                    key={d}
                    onClick={() => setDelivery(d)}
                    style={{
                      padding: '0.5rem 1rem',
                      borderRadius: '9999px',
                      border: '1.5px solid',
                      borderColor: delivery === d ? 'var(--color-wine)' : 'rgba(117, 111, 107, 0.2)',
                      background: delivery === d ? 'var(--color-wine)' : 'white',
                      color: delivery === d ? 'white' : 'var(--color-charcoal)',
                      fontSize: '0.8125rem',
                      fontWeight: 500,
                      cursor: 'pointer',
                      transition: 'all 300ms cubic-bezier(0.32, 0.72, 0, 1)',
                    }}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Message */}
            <div>
              <p className="label-eyebrow" style={{ marginBottom: '0.75rem', color: 'var(--color-wine)' }}>
                4. Add Message
              </p>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write a personal message for the card..."
                rows={3}
                style={{
                  width: '100%',
                  padding: '0.875rem 1rem',
                  borderRadius: '1rem',
                  border: '1.5px solid rgba(117, 111, 107, 0.2)',
                  background: 'white',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.875rem',
                  color: 'var(--color-charcoal)',
                  resize: 'none',
                  outline: 'none',
                  transition: 'border-color 300ms',
                }}
                onFocus={(e) => (e.target.style.borderColor = 'var(--color-blush)')}
                onBlur={(e) => (e.target.style.borderColor = 'rgba(117, 111, 107, 0.2)')}
              />
            </div>
          </div>

          {/* Preview — nested bezel */}
          <div style={{ background: 'rgba(24,16,8,0.025)', border: '1px solid rgba(24,16,8,0.05)', borderRadius: '1.875rem', padding: '0.3125rem' }}>
          <div
            className="flex flex-col items-center justify-center text-center"
            style={{
              background: 'white',
              borderRadius: 'calc(1.875rem - 5px)',
              padding: '2rem',
              boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.95)',
            }}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={gift}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
                src={previewImages[gift]}
                alt={gift}
                loading="lazy"
                decoding="async"
                style={{
                  width: '80%',
                  maxWidth: '280px',
                  objectFit: 'contain',
                  marginBottom: '1.5rem',
                  filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.06))',
                }}
              />
            </AnimatePresence>
            <p className="label-eyebrow" style={{ marginBottom: '0.25rem' }}>
              {occasion} · {delivery}
            </p>
            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.25rem',
                fontWeight: 500,
                marginBottom: '0.5rem',
              }}
            >
              {gift}
            </p>
            <motion.p
              key={price}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '2rem',
                fontWeight: 600,
                color: 'var(--color-charcoal)',
                marginBottom: '1.5rem',
              }}
            >
              {price} <span style={{ fontSize: '1rem', fontWeight: 400 }}>د.إ</span>
            </motion.p>
            <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              <span>Continue to order</span>
              <span className="btn-icon-wrap">
                <ArrowRight size={13} />
              </span>
            </button>
          </div>
          </div>
        </div>
        </motion.div>
      </div>
    </section>
  );
}



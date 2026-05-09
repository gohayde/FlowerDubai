import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function WhatsAppWidget() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const phone = '971547470809';
  const message = encodeURIComponent('Hi! I would like to order flowers from Flower Dubai.');
  const waUrl = `https://wa.me/${phone}?text=${message}`;

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          initial={{ opacity: 0, scale: 0.7, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 20 }}
          transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          style={{
            position: 'fixed',
            right: '1.75rem',
            bottom: '1.75rem',
            zIndex: 9000,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.75rem',
            color: 'var(--color-charcoal)',
            textDecoration: 'none',
          }}
        >
          <span
            style={{
              position: 'relative',
              display: 'inline-flex',
              alignItems: 'center',
              minHeight: '2.5rem',
              padding: '0.55rem 0.9rem',
              borderRadius: '999px',
              background: 'var(--color-warm-white)',
              border: '1px solid rgba(24, 16, 8, 0.08)',
              boxShadow: '0 14px 34px rgba(24, 16, 8, 0.12)',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.75rem',
              fontWeight: 800,
              letterSpacing: '0.08em',
              lineHeight: 1,
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
            }}
          >
            Chat on WhatsApp
            <span
              aria-hidden="true"
              style={{
                position: 'absolute',
                right: '-0.38rem',
                width: '0.75rem',
                height: '0.75rem',
                background: 'var(--color-warm-white)',
                borderTop: '1px solid rgba(24, 16, 8, 0.08)',
                borderRight: '1px solid rgba(24, 16, 8, 0.08)',
                transform: 'rotate(45deg)',
              }}
            />
          </span>
          <span
            aria-hidden="true"
            style={{
              width: '3.25rem',
              height: '3.25rem',
              borderRadius: '50%',
              background: '#25D366',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              boxShadow: '0 8px 22px rgba(37, 211, 102, 0.3)',
            }}
          >
            <svg width="27" height="27" viewBox="0 0 32 32" fill="currentColor" role="img">
              <path d="M16.04 2.67c-7.28 0-13.2 5.92-13.2 13.19 0 2.33.61 4.6 1.78 6.6L2.67 29.33l7.03-1.85a13.12 13.12 0 0 0 6.34 1.61h.01c7.27 0 13.19-5.92 13.19-13.2 0-3.52-1.37-6.83-3.86-9.32a13.12 13.12 0 0 0-9.34-3.9Zm.01 24.19h-.01c-1.92 0-3.81-.52-5.46-1.5l-.39-.23-4.17 1.09 1.11-4.06-.26-.42a10.86 10.86 0 0 1-1.66-5.88c0-5.99 4.88-10.86 10.87-10.86 2.9 0 5.62 1.13 7.67 3.18a10.8 10.8 0 0 1 3.18 7.68c-.01 6-4.88 10.87-10.88 10.87Zm5.96-8.13c-.33-.16-1.93-.95-2.23-1.06-.3-.11-.52-.16-.74.16-.22.33-.85 1.06-1.04 1.28-.19.22-.38.25-.71.08-.33-.16-1.38-.51-2.63-1.62-.97-.86-1.63-1.93-1.82-2.26-.19-.33-.02-.51.14-.67.15-.15.33-.38.49-.57.16-.19.22-.33.33-.55.11-.22.05-.41-.03-.57-.08-.16-.74-1.78-1.01-2.44-.27-.64-.54-.55-.74-.56h-.63c-.22 0-.57.08-.87.41-.3.33-1.14 1.12-1.14 2.72s1.17 3.15 1.33 3.37c.16.22 2.3 3.51 5.58 4.92.78.34 1.39.54 1.86.69.78.25 1.49.21 2.05.13.63-.09 1.93-.79 2.2-1.55.27-.76.27-1.42.19-1.55-.08-.14-.3-.22-.63-.38Z" />
            </svg>
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}

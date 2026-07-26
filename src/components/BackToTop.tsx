import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handle = () => setShow(window.scrollY > 600);
    window.addEventListener('scroll', handle, { passive: true });
    handle();
    return () => window.removeEventListener('scroll', handle);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.7, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 20 }}
          transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          style={{
            position: 'fixed',
            bottom: 'max(calc(1.75rem + 3.25rem + 0.75rem), calc(env(safe-area-inset-bottom) + 5rem))',
            right: 'max(1.75rem, calc(env(safe-area-inset-right) + 1.75rem))',
            zIndex: 9000,
            width: '3.25rem',
            height: '3.25rem',
            borderRadius: '50%',
            background: 'white',
            border: '1.5px solid rgba(248,184,197,0.35)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          whileHover={{ scale: 1.1, boxShadow: '0 8px 30px rgba(248,184,197,0.3)' }}
          whileTap={{ scale: 0.95 }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 20V4M5 11l7-7 7 7" stroke="var(--color-rose)" strokeWidth="1.75"
              strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [phase, setPhase] = useState<'bloom' | 'text' | 'exit'>('bloom');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('text'), 900);
    const t2 = setTimeout(() => setPhase('exit'), 2200);
    const t3 = setTimeout(() => setVisible(false), 3000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--color-cream)',
            gap: '1.5rem',
          }}
        >
          {/* Logo animation */}
          <div style={{ position: 'relative', width: 'auto', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <motion.img
              src="/Media/Logo.png"
              alt="Flower Dubai logo"
              decoding="async"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={phase !== 'exit' ? { scale: 1, opacity: 1 } : { scale: 1.05, opacity: 0 }}
              transition={{
                duration: 1.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                height: '100%',
                objectFit: 'contain',
                mixBlendMode: 'multiply'
              }}
            />
          </div>

          {/* Progress bar */}
          <motion.div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              height: '2px',
              background: 'linear-gradient(to right, var(--color-blush), var(--color-rose))',
            }}
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 2.5, ease: 'easeInOut' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}



import { motion, useScroll, useSpring } from 'motion/react';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 40,
    restDelta: 0.001,
  });

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        zIndex: 9998,
        background: 'rgba(248,184,197,0.15)',
      }}
    >
      <motion.div
        style={{
          height: '100%',
          scaleX,
          transformOrigin: 'left',
          background: 'linear-gradient(to right, var(--color-blush), var(--color-rose), var(--color-gold))',
        }}
      />
    </div>
  );
}



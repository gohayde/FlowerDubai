import { motion } from 'motion/react';
import { ShoppingBag } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useState, useEffect } from 'react';

export default function MobileOrderButton() {
  const { openCart, totalItems } = useCartStore();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShow(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!show) return null;

  return (
    <motion.button
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
      onClick={openCart}
      className="fixed z-50 md:hidden flex items-center justify-center"
      style={{
        bottom: '1.5rem',
        right: '1.5rem',
        width: '3.5rem',
        height: '3.5rem',
        borderRadius: '50%',
        background: 'var(--color-wine)',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        boxShadow: '0 8px 30px rgba(63, 95, 69, 0.3)',
      }}
    >
      <ShoppingBag size={22} />
      {totalItems() > 0 && (
        <span
          className="absolute flex items-center justify-center"
          style={{
            top: '-4px',
            right: '-4px',
            width: '1.25rem',
            height: '1.25rem',
            borderRadius: '50%',
            background: 'var(--color-rose)',
            color: 'white',
            fontSize: '0.625rem',
            fontWeight: 700,
            border: '2px solid white',
          }}
        >
          {totalItems()}
        </span>
      )}
    </motion.button>
  );
}



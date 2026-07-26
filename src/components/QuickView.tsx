import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Minus, Plus } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useState, useEffect, useRef } from 'react';

export default function QuickView() {
  const { isQuickViewOpen, quickViewProduct, closeQuickView, addItem, openCart } = useCartStore();
  const [qty, setQty] = useState(1);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isQuickViewOpen) {
      triggerRef.current = document.activeElement as HTMLElement;
      closeBtnRef.current?.focus();
    } else {
      triggerRef.current?.focus();
    }
  }, [isQuickViewOpen]);

  useEffect(() => {
    if (!isQuickViewOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeQuickView(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isQuickViewOpen, closeQuickView]);

  const handleAdd = () => {
    if (!quickViewProduct) return;
    for (let i = 0; i < qty; i++) addItem(quickViewProduct);
    closeQuickView();
    openCart();
    setQty(1);
  };

  return (
    <AnimatePresence>
      {isQuickViewOpen && quickViewProduct && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeQuickView}
            className="fixed inset-0 z-[70]"
            style={{ background: 'rgba(31, 31, 31, 0.5)', backdropFilter: 'blur(6px)' }}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`Quick view — ${quickViewProduct.name}`}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
            className="fixed z-[80] left-1/2 top-1/2"
            style={{
              transform: 'translate(-50%, -50%)',
              width: '90%',
              maxWidth: '720px',
              maxHeight: '85vh',
              background: 'white',
              borderRadius: '2rem',
              overflow: 'hidden',
              boxShadow: '0 30px 80px rgba(0, 0, 0, 0.12)',
            }}
          >
            {/* Close */}
            <button
              ref={closeBtnRef}
              onClick={closeQuickView}
              aria-label="Close quick view"
              className="absolute z-10"
              style={{
                top: '1rem',
                right: '1rem',
                width: '2.75rem',
                height: '2.75rem',
                borderRadius: '50%',
                background: 'white',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
                color: 'var(--color-charcoal)',
              }}
            >
              <X size={18} />
            </button>

            <div
              className="grid"
              style={{
                gridTemplateColumns: '1fr 1fr',
                minHeight: '400px',
              }}
            >
              {/* Image */}
              <div
                className="flex items-center justify-center relative"
                style={{
                  background: 'var(--color-cream)',
                  padding: '2rem',
                }}
              >
                <div
                  className="absolute"
                  style={{
                    width: '70%',
                    paddingBottom: '70%',
                    borderRadius: '50%',
                    background: 'var(--color-blush-light)',
                  }}
                />
                <img
                  src={quickViewProduct.image}
                  alt={quickViewProduct.name}
                  loading="lazy"
                  decoding="async"
                  style={{
                    position: 'relative',
                    zIndex: 2,
                    width: '85%',
                    aspectRatio: '1 / 1',
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.06))',
                  }}
                />
              </div>

              {/* Info */}
              <div
                className="flex flex-col justify-center"
                style={{ padding: '2rem' }}
              >
                <span className="label-eyebrow" style={{ color: 'var(--color-lilac)', marginBottom: '0.5rem' }}>
                  {quickViewProduct.category}
                </span>
                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.75rem',
                    fontWeight: 500,
                    color: 'var(--color-charcoal)',
                    marginBottom: '0.75rem',
                    overflowWrap: 'break-word',
                  }}
                >
                  {quickViewProduct.name}
                </h3>
                <p
                  style={{
                    fontSize: '0.9375rem',
                    color: 'var(--color-muted)',
                    lineHeight: 1.7,
                    marginBottom: '1.5rem',
                  }}
                >
                  {quickViewProduct.description}
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.75rem',
                    fontWeight: 600,
                    color: 'var(--color-charcoal)',
                    marginBottom: '1.5rem',
                  }}
                >
                  {quickViewProduct.price} <span style={{ fontSize: '1rem', fontWeight: 400 }}>د.إ</span>
                </p>

                {/* Quantity */}
                <div className="flex items-center" style={{ gap: '1rem', marginBottom: '1.5rem' }}>
                  <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-muted)' }}>
                    Quantity
                  </span>
                  <div
                    className="flex items-center"
                    style={{
                      borderRadius: '9999px',
                      border: '1.5px solid rgba(117, 111, 107, 0.15)',
                      overflow: 'hidden',
                    }}
                  >
                    <button
                      onClick={() => setQty(Math.max(1, qty - 1))}
                      style={{
                        width: '2.75rem',
                        height: '2.75rem',
                        border: 'none',
                        background: 'transparent',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Minus size={14} />
                    </button>
                    <span style={{ width: '2.5rem', textAlign: 'center', fontWeight: 600 }}>{qty}</span>
                    <button
                      onClick={() => setQty(qty + 1)}
                      style={{
                        width: '2.75rem',
                        height: '2.75rem',
                        border: 'none',
                        background: 'transparent',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                <button onClick={handleAdd} className="btn-primary" style={{ justifyContent: 'center' }}>
                  <ShoppingBag size={16} />
                  <span>Add to Cart — {quickViewProduct.price * qty} د.إ</span>
                </button>
              </div>
            </div>

            <style>{`
              @media (max-width: 640px) {
                .fixed[style*="max-width: 720px"] .grid {
                  grid-template-columns: 1fr !important;
                }
              }
            `}</style>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}



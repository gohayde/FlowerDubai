import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCartStore } from '../store/cartStore';

export default function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, totalPrice } = useCartStore();
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      triggerRef.current = document.activeElement as HTMLElement;
      closeBtnRef.current?.focus();
    } else {
      triggerRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeCart(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, closeCart]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeCart}
            className="fixed inset-0 z-[70]"
            style={{ background: 'rgba(31, 31, 31, 0.4)', backdropFilter: 'blur(4px)' }}
          />

          {/* Drawer */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
            className="fixed top-0 right-0 bottom-0 z-[80] flex flex-col"
            style={{
              width: '100%',
              maxWidth: '420px',
              background: 'var(--color-cream)',
              boxShadow: '-20px 0 60px rgba(0, 0, 0, 0.08)',
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between"
              style={{
                padding: '1.25rem 1.5rem',
                borderBottom: '1px solid rgba(248, 184, 197, 0.15)',
              }}
            >
              <div className="flex items-center" style={{ gap: '0.75rem' }}>
                <ShoppingBag size={20} style={{ color: 'var(--color-rose)' }} />
                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.25rem',
                    fontWeight: 500,
                  }}
                >
                  Your Cart
                </h3>
                <span
                  className="flex items-center justify-center"
                  style={{
                    width: '1.5rem',
                    height: '1.5rem',
                    borderRadius: '50%',
                    background: 'var(--color-blush-light)',
                    fontSize: '0.6875rem',
                    fontWeight: 700,
                    color: 'var(--color-rose)',
                  }}
                >
                  {items.length}
                </span>
              </div>
              <button
                ref={closeBtnRef}
                onClick={closeCart}
                aria-label="Close cart"
                style={{
                  width: '2.75rem',
                  height: '2.75rem',
                  borderRadius: '50%',
                  background: 'var(--color-blush-light)',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-rose)',
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto" style={{ padding: '1rem 1.5rem' }}>
              {items.length === 0 ? (
                <div
                  className="flex flex-col items-center justify-center text-center"
                  style={{ paddingTop: '4rem', gap: '1rem' }}
                >
                  <div
                    className="flex items-center justify-center"
                    style={{
                      width: '4rem',
                      height: '4rem',
                      borderRadius: '50%',
                      background: 'var(--color-blush-light)',
                      color: 'var(--color-rose)',
                      fontSize: '1.5rem',
                    }}
                  >
                    🌸
                  </div>
                  <p
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.125rem',
                      color: 'var(--color-charcoal)',
                    }}
                  >
                    Your cart is empty
                  </p>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-muted)' }}>
                    Add some beautiful flowers to get started.
                  </p>
                  <button onClick={closeCart} className="btn-primary" style={{ marginTop: '0.5rem' }}>
                    <span>Shop Bouquets</span>
                  </button>
                </div>
              ) : (
                <div className="flex flex-col" style={{ gap: '1rem' }}>
                  {items.map((item) => (
                    <motion.div
                      key={item.product.id}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex"
                      style={{
                        gap: '1rem',
                        padding: '1rem',
                        background: 'white',
                        borderRadius: '1rem',
                        border: '1px solid rgba(248, 184, 197, 0.1)',
                      }}
                    >
                      <div
                        style={{
                          width: '5rem',
                          height: '5rem',
                          borderRadius: '0.75rem',
                          overflow: 'hidden',
                          background: 'var(--color-cream)',
                          flexShrink: 0,
                        }}
                      >
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          loading="lazy"
                          decoding="async"
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between" style={{ minWidth: 0 }}>
                        <div>
                          <p
                            title={item.product.name}
                            style={{
                              fontFamily: 'var(--font-serif)',
                              fontSize: '0.9375rem',
                              fontWeight: 500,
                              color: 'var(--color-charcoal)',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}
                          >
                            {item.product.name}
                          </p>
                          <p style={{ fontSize: '0.8125rem', color: 'var(--color-muted)' }}>
                            {item.product.price} د.إ
                          </p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div
                            className="flex items-center"
                            style={{
                              gap: '0',
                              borderRadius: '9999px',
                              border: '1px solid rgba(117, 111, 107, 0.15)',
                              overflow: 'hidden',
                            }}
                          >
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              aria-label="Decrease quantity"
                              style={{
                                width: '2.75rem',
                                height: '2.75rem',
                                border: 'none',
                                background: 'transparent',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'var(--color-muted)',
                              }}
                            >
                              <Minus size={14} />
                            </button>
                            <span
                              style={{
                                width: '2rem',
                                textAlign: 'center',
                                fontSize: '0.8125rem',
                                fontWeight: 600,
                              }}
                            >
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              aria-label="Increase quantity"
                              style={{
                                width: '2.75rem',
                                height: '2.75rem',
                                border: 'none',
                                background: 'transparent',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'var(--color-muted)',
                              }}
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.product.id)}
                            aria-label="Remove item"
                            style={{
                              width: '2.75rem',
                              height: '2.75rem',
                              borderRadius: '50%',
                              border: 'none',
                              background: 'transparent',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: 'var(--color-muted)',
                              transition: 'color 300ms',
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-rose)')}
                            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-muted)')}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div
                style={{
                  padding: '1.5rem',
                  borderTop: '1px solid rgba(248, 184, 197, 0.15)',
                  background: 'white',
                }}
              >
                <div
                  className="flex items-center justify-between"
                  style={{ marginBottom: '1rem' }}
                >
                  <span style={{ fontSize: '0.875rem', color: 'var(--color-muted)' }}>Subtotal</span>
                  <span
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.375rem',
                      fontWeight: 600,
                      color: 'var(--color-charcoal)',
                    }}
                  >
                    {totalPrice().toLocaleString()} د.إ
                  </span>
                </div>
                <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  <span>Proceed to Checkout</span>
                </button>
                <p
                  style={{
                    textAlign: 'center',
                    marginTop: '0.75rem',
                    fontSize: '0.75rem',
                    color: 'var(--color-muted)',
                  }}
                >
                  Delivery fees calculated at checkout
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}



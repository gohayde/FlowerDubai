import { useState, memo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useInView } from '../hooks/useAnimations';
import { Heart, Eye, ShoppingBag, Check } from 'lucide-react';
import { products } from '../data/products';
import { useCartStore } from '../store/cartStore';

/* ─── Luxury card — elegant, refined shadow ─── */
const LuxuryCard = memo(function LuxuryCard({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      style={{
        position: 'relative',
        background: '#fff',
        borderRadius: '1rem',
        overflow: 'hidden',
        boxShadow: '0 10px 40px -10px rgba(0,0,0,0.08)',
        border: '1px solid rgba(0,0,0,0.03)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      {children}
    </motion.div>
  );
});

export default function BestSellers() {
  const { ref, isInView } = useInView();
  const { addItem, openQuickView, openCart } = useCartStore();
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [addedId, setAddedId]     = useState<string | null>(null);

  const featured = products.filter((p) => p.featured).slice(0, 6);

  const toggleFav = (id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleAdd = (product: typeof products[0]) => {
    addItem(product);
    setAddedId(product.id);
    setTimeout(() => { setAddedId(null); openCart(); }, 700);
  };

  return (
    <section
      ref={ref}
      id="products"
      style={{
        background: 'var(--color-warm-white)',
        paddingTop: 'clamp(5rem, 10vw, 8rem)',
        paddingBottom: 'clamp(5rem, 10vw, 8rem)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle ambient mesh — warm, low opacity */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div
          className="mesh-orb-1"
          style={{
            position: 'absolute', top: '-20%', right: '-10%',
            width: 'clamp(300px, 40vw, 600px)', height: 'clamp(300px, 40vw, 600px)',
            borderRadius: '50%',
            background: 'radial-gradient(circle, oklch(93% 0.030 10 / 0.5), transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        <div
          className="mesh-orb-2"
          style={{
            position: 'absolute', bottom: '-15%', left: '-8%',
            width: 'clamp(200px, 30vw, 440px)', height: 'clamp(200px, 30vw, 440px)',
            borderRadius: '50%',
            background: 'radial-gradient(circle, oklch(40% 0.075 150 / 0.06), transparent 70%)',
            filter: 'blur(50px)',
          }}
        />
      </div>

      <div className="container-main" style={{ position: 'relative', zIndex: 1 }}>
        {/* Section header */}
        <div className="bestsellers-header" style={{ marginBottom: 'clamp(3rem, 6vw, 5rem)' }}>
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
              style={{ fontFamily: 'var(--font-sans)', fontSize: '0.6875rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600, color: 'var(--color-rose)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}
            >
              <span style={{ display: 'inline-block', width: '1.5rem', height: '1px', background: 'var(--color-rose)', flexShrink: 0 }} />
              Most Loved
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 28 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.75, ease: [0.32, 0.72, 0, 1] }}
              style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.25rem, 4.5vw, 4rem)', fontWeight: 400, lineHeight: 1.05, letterSpacing: '-0.02em', color: 'var(--color-charcoal)' }}
            >
              Best Sellers
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.65, ease: [0.32, 0.72, 0, 1] }}
            style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem', lineHeight: 1.75, color: 'var(--color-muted)', maxWidth: '380px', alignSelf: 'flex-end' }}
          >
            Fresh arrangements and gifts our customers order again and again.
          </motion.p>
        </div>

        {/* Bento grid */}
        <div className="bento-grid">
          {featured.map((product, i) => {
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 44 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.07 + i * 0.075, duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
                className="bento-card"
                style={{ height: '100%' }}
              >
                <LuxuryCard>
                  {/* Image area */}
                  <div
                    style={{
                      position: 'relative',
                      flex: '0 0 auto',
                      aspectRatio: '4/5',
                      background: 'radial-gradient(circle at center, #ffffff 0%, var(--color-warm-white) 100%)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      overflow: 'hidden',
                      padding: '2rem',
                    }}
                  >
                    {product.badge && (
                      <span style={{
                        position: 'absolute', top: '0.875rem', left: '0.875rem', zIndex: 10,
                        padding: '0.25rem 0.65rem', borderRadius: '9999px',
                        background: 'var(--color-charcoal)', color: 'white',
                        fontSize: '0.5625rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
                        fontFamily: 'var(--font-sans)',
                      }}>
                        {product.badge}
                      </span>
                    )}

                    <button
                      onClick={(e) => { e.stopPropagation(); toggleFav(product.id); }}
                      aria-label={`Favourite ${product.name}`}
                      style={{
                        position: 'absolute', top: '0.875rem', right: '0.875rem', zIndex: 10,
                        width: '2.125rem', height: '2.125rem', borderRadius: '50%',
                        background: 'rgba(255,255,255,0.88)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(248,184,197,0.2)',
                        cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: favorites.has(product.id) ? 'var(--color-rose)' : 'var(--color-muted)',
                        transition: 'all 300ms cubic-bezier(0.32,0.72,0,1)',
                      }}
                    >
                      <Heart size={12} fill={favorites.has(product.id) ? 'var(--color-rose)' : 'none'} strokeWidth={1.5} />
                    </button>

                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        transition: 'transform 800ms cubic-bezier(0.16,1,0.3,1)',
                        display: 'block',
                        position: 'relative',
                        zIndex: 1,
                        filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.15))'
                      }}
                      className="product-img"
                    />

                    <button
                      onClick={() => openQuickView(product)}
                      className="quick-view-btn"
                      style={{
                        position: 'absolute', bottom: '1.5rem', left: '50%',
                        transform: 'translateX(-50%) translateY(10px)',
                        padding: '0.6rem 1.25rem', borderRadius: '9999px',
                        background: 'rgba(255,255,255,0.98)',
                        backdropFilter: 'blur(12px)',
                        border: '1px solid rgba(24,16,8,0.07)',
                        cursor: 'pointer',
                        fontSize: '0.6875rem', fontWeight: 600, fontFamily: 'var(--font-sans)',
                        color: 'var(--color-charcoal)',
                        display: 'flex', alignItems: 'center', gap: '0.375rem',
                        whiteSpace: 'nowrap', opacity: 0,
                        transition: 'opacity 400ms cubic-bezier(0.16,1,0.3,1), transform 400ms cubic-bezier(0.16,1,0.3,1)',
                        letterSpacing: '0.05em',
                        textTransform: 'uppercase',
                        boxShadow: '0 4px 20px rgba(24,16,8,0.08)',
                        zIndex: 20
                      }}
                    >
                      <Eye size={14} strokeWidth={1.5} />
                      Quick View
                    </button>
                  </div>

                  {/* Info */}
                  <div style={{ padding: '1.5rem', borderTop: '1px solid rgba(24,16,8,0.03)', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.5625rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600, color: 'var(--color-muted)', marginBottom: '0.3rem', opacity: 0.65 }}>
                      {product.category}
                    </p>
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.125rem', fontWeight: 500, color: 'var(--color-charcoal)', lineHeight: 1.25, letterSpacing: '-0.01em' }}>
                      {product.name}
                    </h3>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.9rem' }}>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                        <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.125rem', fontWeight: 500, color: 'var(--color-charcoal)' }}>
                          {product.price.toLocaleString()} AED
                        </span>
                        {product.oldPrice && (
                          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8125rem', color: 'var(--color-muted)', textDecoration: 'line-through', opacity: 0.55 }}>
                            {product.oldPrice.toLocaleString()}
                          </span>
                        )}
                      </div>

                      <AnimatePresence mode="wait">
                        {addedId === product.id ? (
                          <motion.div key="added" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                            style={{ width: '2.25rem', height: '2.25rem', borderRadius: '50%', background: 'var(--color-wine)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                            <Check size={14} strokeWidth={2.5} />
                          </motion.div>
                        ) : (
                          <motion.button key="add" whileTap={{ scale: 0.91 }}
                            onClick={() => handleAdd(product)}
                            aria-label={`Add ${product.name} to cart`}
                            className="add-to-cart-btn"
                            style={{ width: '2.25rem', height: '2.25rem', borderRadius: '50%', background: 'var(--color-cream)', border: '1px solid rgba(24,16,8,0.08)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-charcoal)', transition: 'all 350ms cubic-bezier(0.32,0.72,0,1)' }}
                          >
                            <ShoppingBag size={14} strokeWidth={1.5} />
                          </motion.button>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </LuxuryCard>
              </motion.div>
            );
          })}
        </div>

        {/* View all */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
          style={{ textAlign: 'center', marginTop: 'clamp(2.5rem, 5vw, 4rem)' }}
        >
          <a href="#products" className="view-all-link">
            View All Products
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2.5 11.5l9-9M11.5 2.5H4.5M11.5 2.5v7" />
            </svg>
          </a>
        </motion.div>
      </div>

      <style>{`
        .bestsellers-header {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }
        @media (min-width: 768px) {
          .bestsellers-header {
            grid-template-columns: 1fr 1fr;
            align-items: flex-end;
          }
        }
        .bento-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.25rem;
        }
        @media (min-width: 640px) {
          .bento-grid { grid-template-columns: repeat(2, 1fr); }
          .bento-hero { grid-column: span 2; }
        }
        @media (min-width: 960px) {
          .bento-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 1.5rem;
          }
        }
        .bento-card:hover .product-img { transform: scale(1.05) rotate(0.4deg); }
        .bento-card:hover .quick-view-btn {
          opacity: 1 !important;
          transform: translateX(-50%) translateY(0) !important;
        }
        .add-to-cart-btn:hover {
          background: var(--color-charcoal) !important;
          color: white !important;
          border-color: var(--color-charcoal) !important;
        }
        .view-all-link {
          display: inline-flex;
          align-items: center;
          gap: 0.625rem;
          font-family: var(--font-sans);
          font-size: 0.8125rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--color-charcoal);
          text-decoration: none;
          border-bottom: 1px solid rgba(24,16,8,0.18);
          padding-bottom: 0.25rem;
          transition: border-color 400ms cubic-bezier(0.32,0.72,0,1), gap 400ms;
        }
        .view-all-link:hover { border-color: var(--color-charcoal); gap: 1.1rem; }
      `}</style>
    </section>
  );
}



import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useInView } from '../hooks/useAnimations';
import { Heart, ShoppingBag, Check } from 'lucide-react';
import { products } from '../data/products';
import { useCartStore } from '../store/cartStore';

export default function BestSellers() {
  const { ref, isInView } = useInView();
  const { addItem, openCart } = useCartStore();
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
        paddingBottom: 'clamp(2.75rem, 5vw, 4rem)',
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
        <div style={{ marginBottom: 'clamp(3rem, 6vw, 5rem)' }}>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
            style={{ fontFamily: 'var(--font-sans)', fontSize: '0.6875rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600, color: 'var(--color-rose)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}
          >
            <span style={{ display: 'inline-block', width: '1.5rem', height: '1px', background: 'var(--color-rose)', flexShrink: 0 }} />
            Most Loved
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.75, ease: [0.32, 0.72, 0, 1] }}
            style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.25rem, 4.5vw, 4rem)', fontWeight: 400, lineHeight: 1.05, letterSpacing: '-0.02em', color: 'var(--color-charcoal)', marginBottom: '1rem' }}
          >
            Best Sellers
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.65, ease: [0.32, 0.72, 0, 1] }}
            style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem', lineHeight: 1.75, color: 'var(--color-muted)', maxWidth: '480px' }}
          >
            Fresh arrangements and gifts our customers order again and again.
          </motion.p>
        </div>

        {/* Product grid */}
        <div className="product-grid">
          {featured.map((product, i) => (
            <motion.div
              key={product.id}
              className="product-card"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.07 + i * 0.08, duration: 0.75, ease: [0.32, 0.72, 0, 1] }}
              whileHover={{ y: -6 }}
            >
              {/* Fav button */}
              <button
                className="fav-btn"
                onClick={(e) => { e.stopPropagation(); toggleFav(product.id); }}
                aria-label={`Favourite ${product.name}`}
              >
                <Heart size={13} fill={favorites.has(product.id) ? '#c8566b' : 'none'} stroke={favorites.has(product.id) ? '#c8566b' : '#aaa'} strokeWidth={1.5} />
              </button>

              {/* Circular image blob */}
              <div className="product-img-wrap">
                <div className="product-circle" />
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  decoding="async"
                  className="product-img"
                />
              </div>

              {/* Info */}
              <div className="product-info">
                <p className="product-category">{product.category}</p>
                <h3 className="product-name">{product.name}</h3>

                <div className="product-price-row">
                  <div className="product-prices">
                    <span className="price-current">د.إ {product.price.toLocaleString()}</span>
                    {product.oldPrice && (
                      <span className="price-old">د.إ {product.oldPrice.toLocaleString()}</span>
                    )}
                  </div>

                  <AnimatePresence mode="wait">
                    {addedId === product.id ? (
                      <motion.div key="added" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                        className="cart-added">
                        <Check size={13} strokeWidth={2.5} />
                      </motion.div>
                    ) : (
                      <motion.button key="add" whileTap={{ scale: 0.88 }}
                        onClick={() => handleAdd(product)}
                        aria-label={`Add ${product.name} to cart`}
                        className="cart-btn">
                        <ShoppingBag size={13} strokeWidth={1.5} />
                      </motion.button>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          ))}
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
        /* ── Grid ── */
        .product-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem 1.25rem;
        }
        @media (min-width: 768px) {
          .product-grid { grid-template-columns: repeat(3, 1fr); gap: 2rem 1.75rem; }
        }

        /* ── Card ── */
        .product-card {
          position: relative;
          background: transparent;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          cursor: pointer;
        }

        /* ── Fav ── */
        .fav-btn {
          position: absolute;
          top: 0.5rem;
          right: 0.5rem;
          z-index: 10;
          width: 2rem;
          height: 2rem;
          border-radius: 50%;
          background: rgba(255,255,255,0.85);
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(0,0,0,0.07);
          transition: transform 250ms;
        }
        .fav-btn:hover { transform: scale(1.15); }

        /* ── Circle blob behind image ── */
        .product-img-wrap {
          position: relative;
          width: 100%;
          padding-bottom: 90%;
          margin-bottom: 1.25rem;
        }
        .product-circle {
          position: absolute;
          inset: 10% 10% 0;
          border-radius: 50%;
          background: radial-gradient(circle at 40% 45%, #f9d8e0 0%, #f5c2d0 60%, #efafc2 100%);
          z-index: 0;
        }
        .product-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: contain;
          z-index: 1;
          filter: drop-shadow(0 18px 32px rgba(0,0,0,0.18));
          transition: transform 700ms cubic-bezier(0.16,1,0.3,1);
        }
        .product-card:hover .product-img {
          transform: scale(1.06) translateY(-4px);
        }

        /* ── Info ── */
        .product-info {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.2rem;
        }
        .product-category {
          font-family: var(--font-sans);
          font-size: 0.6875rem;
          font-weight: 500;
          color: var(--color-muted);
          letter-spacing: 0.04em;
          text-transform: none;
          opacity: 0.75;
        }
        .product-name {
          font-family: var(--font-serif);
          font-size: clamp(1.2rem, 2.5vw, 1.6rem);
          font-weight: 600;
          font-style: italic;
          color: #c8566b;
          line-height: 1.2;
          letter-spacing: -0.01em;
        }
        .product-price-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          margin-top: 0.4rem;
          width: 100%;
        }
        .product-prices {
          display: flex;
          align-items: baseline;
          gap: 0.5rem;
        }
        .price-current {
          font-family: var(--font-sans);
          font-size: 1rem;
          font-weight: 700;
          color: var(--color-charcoal);
        }
        .price-old {
          font-family: var(--font-sans);
          font-size: 0.8125rem;
          color: var(--color-muted);
          text-decoration: line-through;
          opacity: 0.55;
        }

        /* ── Cart btn ── */
        .cart-btn {
          width: 2rem;
          height: 2rem;
          border-radius: 50%;
          background: white;
          border: 1px solid rgba(24,16,8,0.09);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-charcoal);
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
          transition: all 300ms;
          flex-shrink: 0;
        }
        .cart-btn:hover {
          background: #c8566b;
          color: white;
          border-color: #c8566b;
        }
        .cart-added {
          width: 2rem;
          height: 2rem;
          border-radius: 50%;
          background: #c8566b;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          flex-shrink: 0;
        }

        /* ── View all ── */
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
          transition: border-color 400ms, gap 400ms;
        }
        .view-all-link:hover { border-color: var(--color-charcoal); gap: 1.1rem; }
      `}</style>
    </section>
  );
}



import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { products } from '../data/products';

export default function SearchOverlay() {
  const { isSearchOpen, closeSearch, searchQuery, setSearchQuery, addItem, openCart } = useCartStore();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSearchOpen) closeSearch();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isSearchOpen, closeSearch]);

  const filtered = searchQuery.length > 1
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleAdd = (product: typeof products[0]) => {
    addItem(product);
    closeSearch();
    openCart();
  };

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[70] flex items-start justify-center"
          style={{
            background: 'rgba(255, 248, 244, 0.97)',
            backdropFilter: 'blur(20px)',
            paddingTop: 'clamp(6rem, 15vh, 10rem)',
          }}
          onClick={closeSearch}
        >
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
            onClick={(e) => e.stopPropagation()}
            style={{ width: '90%', maxWidth: '600px' }}
          >
            {/* Search Input */}
            <div
              className="flex items-center"
              style={{
                background: 'white',
                borderRadius: '9999px',
                padding: '0.5rem 1.5rem',
                boxShadow: '0 8px 40px rgba(0, 0, 0, 0.06)',
                border: '1px solid rgba(248, 184, 197, 0.2)',
              }}
            >
              <Search size={20} style={{ color: 'var(--color-muted)', flexShrink: 0 }} />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search for flowers, bouquets, gifts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  flex: 1,
                  padding: '0.875rem 1rem',
                  border: 'none',
                  background: 'transparent',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '1rem',
                  color: 'var(--color-charcoal)',
                  outline: 'none',
                }}
              />
              <button
                onClick={closeSearch}
                aria-label="Close search"
                style={{
                  width: '2rem',
                  height: '2rem',
                  borderRadius: '50%',
                  background: 'var(--color-blush-light)',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-rose)',
                  flexShrink: 0,
                }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Results */}
            {filtered.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  marginTop: '1rem',
                  background: 'white',
                  borderRadius: '1.5rem',
                  overflow: 'hidden',
                  boxShadow: '0 8px 40px rgba(0, 0, 0, 0.06)',
                  border: '1px solid rgba(248, 184, 197, 0.15)',
                }}
              >
                {filtered.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => handleAdd(product)}
                    className="flex items-center w-full text-left"
                    style={{
                      gap: '1rem',
                      padding: '1rem 1.5rem',
                      border: 'none',
                      background: 'transparent',
                      cursor: 'pointer',
                      borderBottom: '1px solid rgba(248, 184, 197, 0.08)',
                      transition: 'background 200ms',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--color-cream)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <div
                      style={{
                        width: '3rem',
                        height: '3rem',
                        borderRadius: '0.75rem',
                        overflow: 'hidden',
                        background: 'var(--color-cream)',
                        flexShrink: 0,
                      }}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        decoding="async"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                    <div className="flex-1">
                      <p
                        style={{
                          fontFamily: 'var(--font-serif)',
                          fontSize: '0.9375rem',
                          fontWeight: 500,
                          color: 'var(--color-charcoal)',
                        }}
                      >
                        {product.name}
                      </p>
                      <p style={{ fontSize: '0.75rem', color: 'var(--color-muted)' }}>
                        {product.category} · {product.price} د.إ
                      </p>
                    </div>
                  </button>
                ))}
              </motion.div>
            )}

            {searchQuery.length > 1 && filtered.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center"
                style={{
                  marginTop: '2rem',
                  color: 'var(--color-muted)',
                  fontSize: '0.9375rem',
                }}
              >
                No results found for "{searchQuery}"
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}



import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ShoppingBag, Menu, X, Phone, ChevronDown } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import LogoMark from './LogoMark';

const shopItems = [
  { label: 'Bouquets', href: '#products' },
  { label: 'Big Bouquets', href: '#big-bouquets' },
  { label: 'Chocolates', href: '#chocolates' },
  { label: 'Flower Boxes', href: '#build-gift' },
  { label: 'Gift Baskets', href: '#build-gift' },
];

const navLinks = [
  { label: 'Contact', href: '#contact' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [mobileShopOpen, setMobileShopOpen] = useState(false);
  const shopRef = useRef<HTMLDivElement>(null);
  const { toggleCart, totalItems, openSearch } = useCartStore();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('mobile-menu-open', isMobileOpen);
  }, [isMobileOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (shopRef.current && !shopRef.current.contains(e.target as Node)) {
        setShopOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinkStyle = {
    fontFamily: 'var(--font-sans)',
    fontSize: '0.8125rem',
    fontWeight: 500 as const,
    color: isScrolled ? 'var(--color-charcoal)' : '#fff',
    textDecoration: 'none',
    letterSpacing: '0.02em',
    transition: 'color 300ms',
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center"
        style={{ padding: isScrolled ? '0.4rem 1rem' : '1.25rem 1.25rem' }}
      >
        <div
          className="transition-all duration-700"
          style={{
            width: '100%',
            maxWidth: '860px',
            display: 'grid',
            gridTemplateColumns: 'auto 1fr auto',
            alignItems: 'center',
            gap: '1rem',
            background: isScrolled
              ? 'rgba(255, 253, 251, 0.95)'
              : 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            borderRadius: '9999px',
            padding: isScrolled ? '0.35rem 1.25rem' : '0.45rem 1.5rem',
            border: isScrolled ? '1px solid rgba(0, 0, 0, 0.05)' : '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: isScrolled
              ? '0 8px 32px rgba(0, 0, 0, 0.06)'
              : '0 4px 20px rgba(0, 0, 0, 0.03)',
          }}
        >
          {/* Logo — left */}
          <a href="#home" className="flex items-center gap-2 no-underline flex-shrink-0">
            <img
              src="/Media/Logo-small.webp"
              alt="Flower Dubai logo"
              decoding="async"
              fetchPriority="high"
              style={{
                height: isScrolled ? '2rem' : '2.5rem',
                width: 'auto',
                objectFit: 'contain',
                transition: 'all 500ms',
                filter: isScrolled ? 'none' : 'invert(1) brightness(100)',
                mixBlendMode: isScrolled ? 'multiply' : 'normal',
              }}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                (e.currentTarget.nextElementSibling as HTMLElement | null)?.style.setProperty('display', 'flex');
              }}
            />
            <span
              className="flex items-center gap-2"
              style={{ display: 'none' }}
            >
              <LogoMark size={isScrolled ? 18 : 20} />
              <span
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: isScrolled ? '1.125rem' : '1.25rem',
                  fontWeight: 500,
                  color: 'var(--color-charcoal)',
                  letterSpacing: '-0.01em',
                  transition: 'font-size 500ms',
                }}
              >
                Flower Dubai
              </span>
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center justify-center" style={{ gap: '2rem' }}>
            {/* Home link */}
            <a
              href="#home"
              style={navLinkStyle}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-charcoal)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = isScrolled ? 'var(--color-charcoal)' : '#fff')}
            >
              Home
            </a>

            {/* Shop dropdown */}
            <div ref={shopRef} style={{ position: 'relative' }}>
              <button
                onClick={() => setShopOpen((v) => !v)}
                className="flex items-center"
                style={{
                  ...navLinkStyle,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  gap: '0.25rem',
                  padding: 0,
                  color: isScrolled ? (shopOpen ? 'var(--color-charcoal)' : 'var(--color-charcoal)') : '#fff',
                }}
              >
                Shop
                <ChevronDown
                  size={13}
                  style={{
                    transition: 'transform 300ms',
                    transform: shopOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                />
              </button>

              <AnimatePresence>
                {shopOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.97 }}
                    transition={{ duration: 0.2, ease: [0.32, 0.72, 0, 1] }}
                    style={{
                      position: 'absolute',
                      top: 'calc(100% + 0.75rem)',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: 'rgba(255, 253, 251, 0.97)',
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      borderRadius: '1rem',
                      border: '1px solid rgba(248, 184, 197, 0.2)',
                      boxShadow: '0 16px 48px rgba(0,0,0,0.08)',
                      padding: '0.5rem',
                      minWidth: '180px',
                      zIndex: 100,
                    }}
                  >
                    {shopItems.map((item) => (
                      <a
                        key={item.label}
                        href={item.href}
                        onClick={() => setShopOpen(false)}
                        style={{
                          display: 'block',
                          padding: '0.625rem 1rem',
                          borderRadius: '0.625rem',
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.8125rem',
                          fontWeight: 500,
                          color: 'var(--color-charcoal)',
                          textDecoration: 'none',
                          transition: 'background 200ms',
                          whiteSpace: 'nowrap',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--color-blush-light)')}
                        onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                      >
                        {item.label}
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                style={navLinkStyle}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-charcoal)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = isScrolled ? 'var(--color-charcoal)' : '#fff')}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center justify-end" style={{ gap: '0.75rem' }}>
            <button
              onClick={openSearch}
              aria-label="Search"
              className="hidden sm:flex items-center justify-center"
              style={{
                width: '2.25rem',
                height: '2.25rem',
                borderRadius: '50%',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: isScrolled ? 'var(--color-charcoal)' : '#fff',
                transition: 'all 300ms',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--color-blush-light)';
                e.currentTarget.style.color = 'var(--color-rose)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = isScrolled ? 'var(--color-charcoal)' : '#fff';
              }}
            >
              <Search size={18} strokeWidth={1.5} />
            </button>

            <button
              onClick={toggleCart}
              aria-label="Cart"
              className="relative flex items-center justify-center"
              style={{
                width: '2.25rem',
                height: '2.25rem',
                borderRadius: '50%',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: isScrolled ? 'var(--color-charcoal)' : '#fff',
                transition: 'all 300ms',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--color-blush-light)';
                e.currentTarget.style.color = 'var(--color-rose)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = isScrolled ? 'var(--color-charcoal)' : '#fff';
              }}
            >
              <ShoppingBag size={18} strokeWidth={1.5} />
              {totalItems() > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute flex items-center justify-center"
                  style={{
                    top: '-2px',
                    right: '-2px',
                    width: '1rem',
                    height: '1rem',
                    borderRadius: '50%',
                    background: 'var(--color-rose)',
                    color: 'white',
                    fontSize: '0.625rem',
                    fontWeight: 700,
                  }}
                >
                  {totalItems()}
                </motion.span>
              )}
            </button>

            <a
              href="#products"
              className={`hidden md:inline-flex ${isScrolled ? 'btn-primary' : ''}`}
              style={{ 
                padding: '0.5rem 1.25rem', 
                fontSize: '0.75rem',
                background: isScrolled ? '' : 'rgba(255,255,255,0.2)',
                color: isScrolled ? '' : '#fff',
                border: isScrolled ? '' : '1px solid rgba(255,255,255,0.4)',
                borderRadius: '9999px',
                fontWeight: 600,
                transition: 'all 300ms'
              }}
            >
              <span>Order Now</span>
            </a>

            <button
              onClick={() => setIsMobileOpen(true)}
              aria-label="Menu"
              className="lg:hidden flex items-center justify-center"
              style={{
                width: '2.25rem',
                height: '2.25rem',
                borderRadius: '50%',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: isScrolled ? 'var(--color-charcoal)' : '#fff',
              }}
            >
              <Menu size={20} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60]"
            style={{
              background: 'rgba(255, 248, 244, 0.97)',
              backdropFilter: 'blur(30px)',
              WebkitBackdropFilter: 'blur(30px)',
            }}
          >
            <div className="flex flex-col h-full" style={{ padding: '1.5rem' }}>
              <div className="flex items-center justify-between">
                <a href="#home" className="flex items-center gap-2 no-underline" onClick={() => setIsMobileOpen(false)}>
                  <img
                    src="/Media/Logo-small.webp"
                    alt="Flower Dubai logo"
                    decoding="async"
                    style={{ height: '2rem', width: 'auto', objectFit: 'contain', mixBlendMode: 'multiply' }}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      (e.currentTarget.nextElementSibling as HTMLElement | null)?.style.setProperty('display', 'flex');
                    }}
                  />
                  <span className="items-center" style={{ gap: '0.5rem', display: 'none' }}>
                    <LogoMark size={18} />
                    <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 500 }}>
                      Flower Dubai
                    </span>
                  </span>
                </a>
                <button
                  onClick={() => setIsMobileOpen(false)}
                  aria-label="Close menu"
                  style={{
                    width: '2.5rem',
                    height: '2.5rem',
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
                  <X size={20} />
                </button>
              </div>

              <nav
                className="flex flex-col flex-1 justify-center"
                style={{ gap: '1.75rem' }}
              >
                {/* Home */}
                <motion.a
                  href="#home"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05, duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                  onClick={() => setIsMobileOpen(false)}
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '2rem',
                    color: 'var(--color-charcoal)',
                    textDecoration: 'none',
                    fontWeight: 400,
                  }}
                >
                  Home
                </motion.a>

                {/* Shop accordion */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                >
                  <button
                    onClick={() => setMobileShopOpen((v) => !v)}
                    className="flex items-center"
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '2rem',
                      color: 'var(--color-charcoal)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontWeight: 400,
                      gap: '0.5rem',
                      padding: 0,
                    }}
                  >
                    Shop
                    <ChevronDown
                      size={22}
                      style={{
                        transition: 'transform 300ms',
                        transform: mobileShopOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      }}
                    />
                  </button>
                  <AnimatePresence>
                    {mobileShopOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div style={{ paddingTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingLeft: '1rem' }}>
                          {shopItems.map((item) => (
                            <a
                              key={item.label}
                              href={item.href}
                              onClick={() => setIsMobileOpen(false)}
                              style={{
                                fontFamily: 'var(--font-sans)',
                                fontSize: '1.125rem',
                                color: 'var(--color-muted)',
                                textDecoration: 'none',
                                fontWeight: 500,
                              }}
                            >
                              {item.label}
                            </a>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Contact */}
                {[{ label: 'Contact', href: '#contact' }].map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.16 + i * 0.06,
                      duration: 0.5,
                      ease: [0.32, 0.72, 0, 1],
                    }}
                    onClick={() => setIsMobileOpen(false)}
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '2rem',
                      color: 'var(--color-charcoal)',
                      textDecoration: 'none',
                      fontWeight: 400,
                    }}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="flex flex-col"
                style={{ gap: '1rem' }}
              >
                <a href="tel:+971547470809" className="btn-primary" style={{ justifyContent: 'center' }}>
                  <Phone size={16} />
                  <span>(+971) 54 747 0809</span>
                </a>
                <a href="#products" onClick={() => setIsMobileOpen(false)} className="btn-secondary" style={{ justifyContent: 'center' }}>
                  Shop Bouquets
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}



import { motion } from 'motion/react';
import { useInView } from '../hooks/useAnimations';

const shopLinks = [
  { label: 'Flower Bouquets', href: '#products' },
  { label: 'Big Bouquets',    href: '#big-bouquets' },
  { label: 'Chocolates',      href: '#chocolates' },
  { label: 'Flower Boxes',    href: '#chocolates' },
];

const helpLinks = [
  { label: 'Contact',        href: '#contact' },
  { label: 'FAQ',            href: '#faq' },
  { label: 'Delivery areas', href: '#delivery' },
  { label: 'Privacy policy', href: '#' },
];

export default function Footer() {
  const { ref, isInView } = useInView(0.05);

  return (
    <footer
      style={{
        background: 'var(--color-charcoal)',
        color: 'rgba(255,255,255,0.6)',
        paddingTop: 'clamp(4.5rem, 8vw, 6.5rem)',
        paddingBottom: '2rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient orbs */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div
          className="orb-ambient"
          style={{
            position: 'absolute', top: '-30%', right: '-8%',
            width: 'clamp(280px, 40vw, 560px)', height: 'clamp(280px, 40vw, 560px)',
            borderRadius: '50%',
            background: 'radial-gradient(circle, oklch(38% 0.115 350 / 0.12), transparent 70%)',
            filter: 'blur(64px)',
          }}
        />
        <div
          className="orb-ambient-b"
          style={{
            position: 'absolute', bottom: '-20%', left: '-5%',
            width: 'clamp(180px, 24vw, 360px)', height: 'clamp(180px, 24vw, 360px)',
            borderRadius: '50%',
            background: 'radial-gradient(circle, oklch(40% 0.075 150 / 0.14), transparent 70%)',
            filter: 'blur(48px)',
          }}
        />
        {/* Fine grain */}
        <div
          style={{
            position: 'absolute', inset: 0,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.035'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat', backgroundSize: '256px', opacity: 0.4,
          }}
        />
      </div>

      <div className="container-main" style={{ position: 'relative', zIndex: 1 }}>
        {/* Top — brand + links */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease: [0.32, 0.72, 0, 1] }}
          className="footer-grid"
          style={{ paddingBottom: '3rem', borderBottom: '1px solid rgba(255,255,255,0.07)' }}
        >
          {/* Brand column */}
          <div style={{ maxWidth: '280px' }}>
            <div style={{ marginBottom: '1.375rem' }}>
              <img
                src="/Media/Logo-small.webp"
                alt="Flower Dubai"
                loading="lazy"
                decoding="async"
                style={{ height: '3rem', width: 'auto', objectFit: 'contain', filter: 'brightness(0) invert(1)', opacity: 0.9 }}
              />
            </div>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.42)', maxWidth: '260px' }}>
              Fresh flowers, luxury gifts, and same-day delivery across Dubai.
            </p>

            {/* Social row */}
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.75rem' }}>
              {[
                {
                  label: 'Facebook',
                  d: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
                },
                {
                  label: 'X',
                  d: 'M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z',
                },
                {
                  label: 'Instagram',
                  d: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
                },
                {
                  label: 'YouTube',
                  d: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
                },
              ].map(({ label, d }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  style={{
                    width: '2.25rem', height: '2.25rem', borderRadius: '50%',
                    background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'rgba(255,255,255,0.5)',
                    transition: 'all 350ms cubic-bezier(0.32,0.72,0,1)',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.13)';
                    (e.currentTarget as HTMLAnchorElement).style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.07)';
                    (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.5)';
                  }}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                    <path d={d} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.5625rem', letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 700, color: 'rgba(255,255,255,0.45)', marginBottom: '1.5rem' }}>
              Shop
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {shopLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 300ms', fontFamily: 'var(--font-sans)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-blush)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.5625rem', letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 700, color: 'rgba(255,255,255,0.45)', marginBottom: '1.5rem' }}>
              Help
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {helpLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 300ms', fontFamily: 'var(--font-sans)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-blush)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.5625rem', letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 700, color: 'rgba(255,255,255,0.45)', marginBottom: '1.5rem' }}>
              Contact
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { href: 'tel:+971547470809',              text: '(+971) 54 747 0809' },
                { href: 'mailto:flowerdubai@urbanrose.ae', text: 'flowerdubai@urbanrose.ae' },
              ].map(({ href, text }) => (
                <li key={text}>
                  <a
                    href={href}
                    style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 300ms', fontFamily: 'var(--font-sans)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-blush)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
                  >
                    {text}
                  </a>
                </li>
              ))}
              <li style={{ fontSize: '0.875rem', fontFamily: 'var(--font-sans)', color: 'rgba(255,255,255,0.4)' }}>
                19 Sheikh Zayed Rd, Dubai
              </li>
              <li style={{ fontSize: '0.875rem', fontFamily: 'var(--font-sans)', color: 'rgba(255,255,255,0.4)' }}>
                Everyday 9AM – 2AM
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <div
          style={{
            paddingTop: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            fontSize: '0.8125rem',
            color: 'rgba(255,255,255,0.3)',
            fontFamily: 'var(--font-sans)',
          }}
        >
          <p>© 2026 Flower Dubai. All Rights Reserved.</p>
          <p style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            Made with <span style={{ color: 'oklch(72% 0.085 80)', margin: '0 1px' }}>♥</span> in Dubai
          </p>
        </div>
      </div>

      <style>{`
        .footer-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
        }
        @media (min-width: 600px) {
          .footer-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 900px) {
          .footer-grid { grid-template-columns: 1.6fr 1fr 1fr 1.2fr; }
        }
      `}</style>
    </footer>
  );
}



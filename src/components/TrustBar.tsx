import { memo, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import gsap from 'gsap';

const ITEMS = [
  'Same-day Dubai delivery',
  'Fresh premium roses',
  'Urban Rose packaging',
  'Handwritten message cards',
  'Custom bouquet styling',
  'Flowers, chocolates, and gifts',
];

const TRACK1 = [...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS];

const Separator = () => (
  <span
    aria-hidden="true"
    style={{
      display: 'inline-block',
      width: '5px',
      height: '5px',
      borderRadius: '50%',
      background: 'oklch(74% 0.09 70 / 0.55)',
      flexShrink: 0,
      margin: '0 2rem',
      verticalAlign: 'middle',
    }}
  />
);

const TrackItem = memo(function TrackItem({ text }: { text: string }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        flexShrink: 0,
        whiteSpace: 'nowrap',
      }}
    >
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.7rem',
        }}
      >
        <span
          style={{
            width: '0.45rem',
            height: '0.45rem',
            borderRadius: '50%',
            background: 'var(--color-gold)',
            boxShadow: '0 0 0 0.32rem oklch(72% 0.085 80 / 0.10)',
            lineHeight: 1,
          }}
        />
        <span
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.05rem, 1.8vw, 1.35rem)',
            fontWeight: 500,
            letterSpacing: '0.02em',
            color: 'oklch(95% 0.01 60)',
            textTransform: 'none',
          }}
        >
          {text}
        </span>
      </span>
      <Separator />
    </span>
  );
});

const MarqueeRow = memo(function MarqueeRow({
  items,
  reverse = false,
  duration = 38,
}: {
  items: string[];
  reverse?: boolean;
  duration?: number;
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!trackRef.current) return;
    const track = trackRef.current;
    const ctx = gsap.context(() => {
      gsap.to(track, {
        xPercent: reverse ? 50 : -50,
        ease: 'none',
        duration,
        repeat: -1,
      });
    });
    return () => ctx.revert();
  }, [reverse, duration]);

  return (
    <div style={{ overflow: 'hidden', position: 'relative' }}>
      <div
        ref={trackRef}
        style={{
          display: 'flex',
          willChange: 'transform',
          flexShrink: 0,
          width: 'max-content',
        }}
      >
        {items.map((item, i) => (
          <TrackItem key={i} text={item} />
        ))}
      </div>
    </div>
  );
});

export default function TrustBar() {
  return (
    <section
      style={{
        background: 'var(--color-charcoal)',
        padding: 'clamp(1rem, 2vw, 1.45rem) 0',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Top hairline */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: '1px',
          background: 'linear-gradient(to right, transparent, oklch(72% 0.085 80 / 0.18), transparent)',
        }}
      />
      {/* Bottom hairline */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          height: '1px',
          background: 'linear-gradient(to right, transparent, oklch(72% 0.085 80 / 0.14), transparent)',
        }}
      />

      {/* Left fade */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', left: 0, top: 0, bottom: 0,
          width: 'clamp(5rem, 10vw, 9rem)',
          background: 'linear-gradient(to right, var(--color-charcoal), transparent)',
          zIndex: 2, pointerEvents: 'none',
        }}
      />
      {/* Right fade */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', right: 0, top: 0, bottom: 0,
          width: 'clamp(5rem, 10vw, 9rem)',
          background: 'linear-gradient(to left, var(--color-charcoal), transparent)',
          zIndex: 2, pointerEvents: 'none',
        }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9 }}
        style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.625rem, 1.2vw, 0.875rem)' }}
      >
        <MarqueeRow items={TRACK1} reverse={false} duration={62} />
      </motion.div>
    </section>
  );
}

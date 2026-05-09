import { memo, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import gsap from 'gsap';

const ITEMS = [
  { value: 'Quality Guaranteed', label: 'Our Flowers are sourced daily so we guarantee your loved ones the best scent.', highlight: true },
  { value: 'Immediate Delivery', label: 'We are the only stores in dubai to offer immediate delivery.', highlight: true },
  { value: 'Best Safety', label: 'All of our flowers and chocolates are sourced from the best locations on the planet.', highlight: false },
];

/* duplicate 4× so the loop is seamless (50% translation matches exactly 2 items) */
const TRACK = [...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS];

const Dot = () => (
  <span
    aria-hidden="true"
    style={{
      display: 'inline-block',
      width: '4px',
      height: '4px',
      borderRadius: '50%',
      background: 'oklch(82% 0.065 10 / 0.4)',
      flexShrink: 0,
      margin: '0 3rem',
      verticalAlign: 'middle',
    }}
  />
);

const TrackItem = memo(function TrackItem({
  value,
  label,
  highlight,
}: {
  value: string;
  label: string;
  highlight: boolean;
}) {
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
          gap: '0.75rem',
          position: 'relative',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            fontWeight: 400,
            lineHeight: 1,
            letterSpacing: '0.02em',
            color: highlight
              ? 'var(--color-gold)'
              : 'oklch(78% 0.055 10)',
            textTransform: 'uppercase',
            /* Subtle shimmer on highlighted values */
            ...(highlight ? {
              background: 'linear-gradient(90deg, oklch(68% 0.075 80), oklch(78% 0.095 75), oklch(72% 0.085 80))',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'trustShimmer 3.5s linear infinite',
            } : {}),
          }}
        >
          {value}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.875rem',
            fontWeight: 400,
            color: 'rgba(255,255,255,0.6)',
            letterSpacing: '0.02em',
          }}
        >
          {label}
        </span>
      </span>
      <Dot />
    </span>
  );
});

const MarqueeTrack = memo(function MarqueeTrack({ reverse = false }: { reverse?: boolean }) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!trackRef.current) return;
    const track = trackRef.current;
    
    // Calculate total width of one half of the track (since items are duplicated)
    // We'll let GSAP tween it.
    let ctx = gsap.context(() => {
      gsap.to(track, {
        xPercent: reverse ? 50 : -50,
        ease: 'none',
        duration: 38,
        repeat: -1,
      });
    });

    return () => ctx.revert();
  }, [reverse]);

  return (
    <div
      ref={trackRef}
      style={{
        display: 'flex',
        gap: 0,
        willChange: 'transform',
        flexShrink: 0,
        width: 'max-content',
      }}
    >
      {TRACK.map((item, i) => (
        <TrackItem key={i} {...item} />
      ))}
    </div>
  );
});

export default function TrustBar() {
  return (
    <section
      style={{
        background: 'var(--color-charcoal)',
        padding: 'clamp(1.5rem, 3vw, 2.25rem) 0',
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
          background: 'linear-gradient(to right, transparent, oklch(82% 0.065 10 / 0.12), transparent)',
        }}
      />
      {/* Bottom hairline */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          height: '1px',
          background: 'linear-gradient(to right, transparent, oklch(82% 0.065 10 / 0.10), transparent)',
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
        style={{ display: 'flex', width: 'max-content' }}
      >
        <MarqueeTrack />
        <MarqueeTrack />
      </motion.div>

      <style>{`
        @keyframes trustScrollRev {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
        @keyframes trustScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes trustShimmer {
          from { background-position: 200% center; }
          to   { background-position: -200% center; }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes trustScroll    { from { transform: none; } to { transform: none; } }
          @keyframes trustScrollRev { from { transform: none; } to { transform: none; } }
          @keyframes trustShimmer   { from { background-position: 0 center; } to { background-position: 0 center; } }
        }
      `}</style>
    </section>
  );
}



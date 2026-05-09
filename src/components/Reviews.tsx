import { memo, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import gsap from 'gsap';
import { useInView } from '../hooks/useAnimations';
import { Star } from 'lucide-react';
import { reviews as baseReviews } from '../data/products';

/* ─── Extended review set so both rows feel rich ─── */
const EXTRA_REVIEWS = [
  {
    id: 5,
    text: 'Ordered at midnight and the flowers were at my door by 10 AM. The quality is unreal.',
    author: 'Layla A.',
    rating: 5,
  },
  {
    id: 6,
    text: 'Urban Rose always makes me look like a thoughtful person. The packaging alone is gift-worthy.',
    author: 'Khalid N.',
    rating: 5,
  },
  {
    id: 7,
    text: 'Sent flowers to my mum in JBR and she was speechless. Fresh, beautifully arranged, on time.',
    author: 'Noor S.',
    rating: 5,
  },
  {
    id: 8,
    text: 'The big surprise bouquet is worth every dirham. My partner cried happy tears.',
    author: 'Rami T.',
    rating: 5,
  },
];

const allReviews = [...baseReviews, ...EXTRA_REVIEWS];

/* ─── Row A: first 4, Row B: last 4 — visually interleaved ─── */
const ROW_A = [...allReviews.slice(0, 4), ...allReviews.slice(0, 4), ...allReviews.slice(0, 4), ...allReviews.slice(0, 4)];
const ROW_B = [...allReviews.slice(4, 8), ...allReviews.slice(4, 8), ...allReviews.slice(4, 8), ...allReviews.slice(4, 8)];

/* ─── Single review card ─── */
const ReviewCard = memo(function ReviewCard({
  text,
  author,
  rating,
  idx,
}: {
  text: string;
  author: string;
  rating: number;
  idx: number;
}) {
  /* Alternate light/dark cards for visual rhythm */
  const isDark = idx % 5 === 2;

  return (
    <div
      style={{
        minWidth: 'clamp(280px, 32vw, 380px)',
        maxWidth: 'clamp(280px, 32vw, 380px)',
        flexShrink: 0,
        borderRadius: '1.75rem',
        padding: '2rem 1.875rem',
        userSelect: 'none',
        position: 'relative',
        overflow: 'hidden',
        background: isDark
          ? 'var(--color-charcoal)'
          : 'rgba(255,252,250,0.82)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        border: isDark
          ? '1px solid rgba(255,255,255,0.06)'
          : '1px solid rgba(200,100,100,0.1)',
        boxShadow: isDark
          ? '0 12px 40px rgba(18,12,8,0.18)'
          : '0 4px 24px rgba(200,100,100,0.07), inset 0 1px 0 rgba(255,255,255,0.7)',
      }}
    >
      {/* Stars */}
      <div style={{ display: 'flex', gap: '3px', marginBottom: '1.25rem' }}>
        {Array.from({ length: rating }).map((_, j) => (
          <Star key={j} size={12} fill="var(--color-gold)" color="var(--color-gold)" />
        ))}
      </div>

      {/* Large quote mark */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '1.25rem',
          right: '1.5rem',
          fontFamily: 'var(--font-serif)',
          fontSize: '5rem',
          lineHeight: 1,
          opacity: isDark ? 0.08 : 0.06,
          color: isDark ? 'white' : 'var(--color-rose)',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        &rdquo;
      </div>

      {/* Quote */}
      <p
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '1.0625rem',
          fontStyle: 'italic',
          lineHeight: 1.72,
          color: isDark ? 'rgba(255,248,244,0.88)' : 'var(--color-charcoal)',
          marginBottom: '1.75rem',
        }}
      >
        {text}
      </p>

      {/* Author */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          paddingTop: '1.125rem',
          borderTop: isDark
            ? '1px solid rgba(255,255,255,0.07)'
            : '1px solid rgba(200,100,100,0.09)',
        }}
      >
        <div
          style={{
            width: '2rem',
            height: '2rem',
            borderRadius: '50%',
            background: isDark ? 'rgba(255,255,255,0.1)' : 'var(--color-blush-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--font-serif)',
            fontSize: '0.875rem',
            fontWeight: 500,
            color: isDark ? 'rgba(255,255,255,0.6)' : 'var(--color-rose)',
            flexShrink: 0,
            border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(200,100,100,0.12)',
          }}
        >
          {author.charAt(0)}
        </div>
        <div>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.8125rem',
              fontWeight: 700,
              color: isDark ? 'rgba(255,248,244,0.9)' : 'var(--color-charcoal)',
              lineHeight: 1.25,
            }}
          >
            {author}
          </p>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.625rem',
              color: isDark ? 'rgba(255,255,255,0.35)' : 'var(--color-muted)',
              marginTop: '2px',
              fontWeight: 500,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}
          >
            Dubai · Verified
          </p>
        </div>
      </div>
    </div>
  );
});

/* ─── Infinite marquee row ─── */
const MarqueeRow = memo(function MarqueeRow({
  items,
  reverse = false,
  duration = '52s',
}: {
  items: typeof ROW_A;
  reverse?: boolean;
  duration?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!trackRef.current) return;
    const track = trackRef.current;
    
    // Parse duration string to number (e.g. "52s" -> 52)
    const durNum = parseFloat(duration);

    let ctx = gsap.context(() => {
      gsap.to(track, {
        xPercent: reverse ? 50 : -50,
        ease: 'none',
        duration: durNum,
        repeat: -1,
      });
    });

    return () => ctx.revert();
  }, [reverse, duration]);

  return (
    <div style={{ overflow: 'hidden', position: 'relative' }}>
      {/* Fade masks */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: '10rem',
          background: 'linear-gradient(to right, var(--color-warm-white), transparent)',
          zIndex: 2, pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', right: 0, top: 0, bottom: 0, width: '10rem',
          background: 'linear-gradient(to left, var(--color-warm-white), transparent)',
          zIndex: 2, pointerEvents: 'none',
        }}
      />
      <div
        ref={trackRef}
        className="reviews-marquee-track"
        style={{
          display: 'flex',
          gap: '1.25rem',
          width: 'max-content',
          paddingBottom: '0.5rem',
        }}
      >
        {items.map((review, i) => (
          <ReviewCard key={`${review.id}-${i}`} {...review} idx={i} />
        ))}
      </div>
    </div>
  );
});

export default function Reviews() {
  const { ref, isInView } = useInView();

  return (
    <section
      ref={ref}
      className="section-padding"
      style={{
        background: 'var(--color-warm-white)',
        paddingTop: 'clamp(2.5rem, 5vw, 4rem)',
        paddingBottom: 'clamp(3.75rem, 7vw, 5.5rem)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Ambient blush orb */}
      <div
        aria-hidden="true"
        className="orb-ambient"
        style={{
          position: 'absolute', bottom: '-25%', right: '-5%',
          width: 'clamp(300px, 42vw, 640px)', height: 'clamp(300px, 42vw, 640px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, oklch(93% 0.030 10 / 0.35), transparent 70%)',
          filter: 'blur(60px)', pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden="true"
        className="orb-ambient-b"
        style={{
          position: 'absolute', top: '-20%', left: '-8%',
          width: 'clamp(200px, 30vw, 480px)', height: 'clamp(200px, 30vw, 480px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, oklch(40% 0.075 150 / 0.05), transparent 70%)',
          filter: 'blur(55px)', pointerEvents: 'none',
        }}
      />

      {/* Header */}
      <div
        className="container-main"
        style={{ marginBottom: 'clamp(1.75rem, 3vw, 2.75rem)', position: 'relative', zIndex: 1 }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.5rem',
          }}
        >
          <div>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
              className="label-eyebrow"
              style={{ marginBottom: '0.875rem', color: 'var(--color-rose)' }}
            >
              Customer Love
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 28 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.75, ease: [0.32, 0.72, 0, 1] }}
              className="heading-section"
            >
              What our customers
              <br />
              <em style={{ fontStyle: 'italic', color: 'var(--color-rose)' }}>actually say</em>
            </motion.h2>
          </div>

          {/* Rating callout */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.65, ease: [0.32, 0.72, 0, 1] }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              gap: '0.5rem',
            }}
          >
            <div style={{ display: 'flex', gap: '3px' }}>
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} size={15} fill="var(--color-gold)" color="var(--color-gold)" />
              ))}
            </div>
            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '2.25rem',
                fontWeight: 400,
                color: 'var(--color-charcoal)',
                lineHeight: 1,
              }}
            >
              4.9
            </p>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.6875rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--color-muted)',
                fontWeight: 600,
              }}
            >
              2,300+ orders
            </p>
          </motion.div>
        </div>
      </div>

      {/* Single marquee row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.35, duration: 0.8 }}
        style={{ position: 'relative', zIndex: 1 }}
      >
        <MarqueeRow items={ROW_A} duration="56s" />
      </motion.div>

      <style>{`
        @keyframes reviewsLeft {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
        }
        @keyframes reviewsRight {
          from { transform: translateX(-33.333%); }
          to   { transform: translateX(0); }
        }
        .reviews-marquee-track:hover {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes reviewsLeft  { from { transform: none; } to { transform: none; } }
          @keyframes reviewsRight { from { transform: none; } to { transform: none; } }
        }
      `}</style>
    </section>
  );
}



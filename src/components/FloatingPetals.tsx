import { useState } from 'react';

interface Petal {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  color: string;
  shape: number; // 0-2 shape variants
  drift: number; // horizontal drift px
}

const PETAL_COLORS = [
  'rgba(248, 184, 197, 0.55)',
  'rgba(217, 108, 124, 0.35)',
  'rgba(255, 255, 255, 0.65)',
  'rgba(248, 184, 197, 0.4)',
  'rgba(201, 168, 76, 0.25)',
];

type PetalStyle = React.CSSProperties & {
  '--drift': string;
  '--drift-half': string;
};

const createPetals = (): Petal[] => {
  const prefersReducedMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return [];

  return Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 20,
    duration: 14 + Math.random() * 12,
    size: 7 + Math.random() * 11,
    color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
    shape: Math.floor(Math.random() * 3),
    drift: (Math.random() - 0.5) * 180,
  }));
};

function PetalSVG({ shape, color, size }: { shape: number; color: string; size: number }) {
  if (shape === 0) {
    // Elliptical petal
    return (
      <svg width={size} height={size * 1.4} viewBox="0 0 20 28" fill="none">
        <ellipse cx="10" cy="14" rx="8" ry="13" fill={color} />
      </svg>
    );
  }
  if (shape === 1) {
    // Teardrop petal
    return (
      <svg width={size} height={size * 1.3} viewBox="0 0 20 26" fill="none">
        <path d="M10 2 C4 8 2 15 10 24 C18 15 16 8 10 2Z" fill={color} />
      </svg>
    );
  }
  // Rounded diamond petal
  return (
    <svg width={size * 0.85} height={size * 1.5} viewBox="0 0 17 30" fill="none">
      <path d="M8.5 1 C5 6 1 13 8.5 29 C16 13 12 6 8.5 1Z" fill={color} />
    </svg>
  );
}

export default function FloatingPetals() {
  const [petals] = useState<Petal[]>(createPetals);

  if (petals.length === 0) return null;

  return (
    <>
      <style>{`
        @keyframes petal-fall-drift {
          0% {
            opacity: 0;
            transform: translateY(-8vh) translateX(0px) rotate(0deg) scale(1);
          }
          8% { opacity: 0.8; }
          50% { transform: translateY(50vh) translateX(var(--drift-half)) rotate(360deg) scale(0.9); }
          92% { opacity: 0.3; }
          100% {
            opacity: 0;
            transform: translateY(108vh) translateX(var(--drift)) rotate(800deg) scale(0.7);
          }
        }
      `}</style>
      <div
        className="fixed inset-0 pointer-events-none overflow-hidden"
        style={{ zIndex: 1 }}
        aria-hidden="true"
      >
        {petals.map((petal) => (
          <div
            key={petal.id}
            style={{
              position: 'absolute',
              left: `${petal.left}%`,
              top: 0,
              animationName: 'petal-fall-drift',
              animationTimingFunction: 'linear',
              animationDuration: `${petal.duration}s`,
              animationDelay: `${petal.delay}s`,
              animationIterationCount: 'infinite',
              '--drift': `${petal.drift}px`,
              '--drift-half': `${petal.drift * 0.5}px`,
            } as PetalStyle}
          >
            <PetalSVG shape={petal.shape} color={petal.color} size={petal.size} />
          </div>
        ))}
      </div>
    </>
  );
}



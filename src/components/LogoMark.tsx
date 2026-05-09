interface LogoMarkProps {
  size?: number;
  color?: string;
}

export default function LogoMark({ size = 20, color = 'var(--color-rose)' }: LogoMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Center circle */}
      <circle cx="16" cy="16" r="3" fill={color} opacity="0.9" />
      {/* Petals — 6 ellipses rotated */}
      {[0, 60, 120, 180, 240, 300].map((angle) => (
        <ellipse
          key={angle}
          cx="16"
          cy="9"
          rx="2.5"
          ry="5"
          fill={color}
          opacity="0.7"
          transform={`rotate(${angle} 16 16)`}
        />
      ))}
    </svg>
  );
}



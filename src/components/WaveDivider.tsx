interface WaveDividerProps {
  /** Hex or rgb color of the section above */
  fromColor?: string;
  /** Hex or rgb color of the section below */
  toColor?: string;
  /** Flip vertically to reverse the wave direction */
  flip?: boolean;
}

export default function WaveDivider({
  fromColor = '#ffffff',
  toColor = '#FFF8F4',
  flip = false,
}: WaveDividerProps) {
  return (
    <div
      aria-hidden="true"
      style={{
        background: fromColor,
        lineHeight: 0,
        display: 'block',
        transform: flip ? 'scaleY(-1)' : 'none',
        marginTop: '-1px',
        marginBottom: '-1px',
      }}
    >
      <svg
        viewBox="0 0 1440 56"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        style={{ display: 'block', width: '100%', height: '56px' }}
      >
        <path
          d="M0,28 C180,56 360,0 540,28 C720,56 900,0 1080,28 C1260,56 1350,14 1440,28 L1440,56 L0,56 Z"
          fill={toColor}
        />
      </svg>
    </div>
  );
}



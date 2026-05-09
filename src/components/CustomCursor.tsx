import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only on non-touch desktops
    if (window.matchMedia('(hover: none)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);
      const target = e.target as HTMLElement;
      setIsPointer(
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.tagName === 'A' ||
        target.tagName === 'BUTTON'
      );
    };

    const leave = () => setVisible(false);
    window.addEventListener('mousemove', move, { passive: true });
    document.addEventListener('mouseleave', leave);
    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseleave', leave);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        pointerEvents: 'none',
        zIndex: 99999,
        top: 0,
        left: 0,
        transform: `translate(${pos.x - (isPointer ? 6 : 4)}px, ${pos.y - (isPointer ? 6 : 4)}px) scale(${isPointer ? 1.5 : 1})`,
        transition: 'transform 100ms cubic-bezier(0.25,0.46,0.45,0.94)',
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        background: 'white',
        mixBlendMode: 'difference',
      }}
    />
  );
}



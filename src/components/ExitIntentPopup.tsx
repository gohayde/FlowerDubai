import { useState, useEffect, useRef, useCallback, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const STORAGE_KEY = 'fld_exit_popup_dismissed';

export default function ExitIntentPopup() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [focused, setFocused] = useState(false);
  const triggered = useRef(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const dismiss = useCallback(() => {
    setVisible(false);
    try { sessionStorage.setItem(STORAGE_KEY, '1'); } catch {}
  }, []);

  useEffect(() => {
    try { if (sessionStorage.getItem(STORAGE_KEY)) return; } catch {}

    const onMouseLeave = (e: MouseEvent) => {
      if (triggered.current) return;
      if (e.clientY <= 10) {
        triggered.current = true;
        setTimeout(() => setVisible(true), 120);
      }
    };

    let mobileTimer: ReturnType<typeof setTimeout>;
    const onScroll = () => {
      clearTimeout(mobileTimer);
      mobileTimer = setTimeout(() => {
        if (!triggered.current) { triggered.current = true; setVisible(true); }
      }, 25000);
    };

    document.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      document.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('scroll', onScroll);
      clearTimeout(mobileTimer);
    };
  }, []);

  useEffect(() => {
    if (!visible) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') dismiss(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    setTimeout(() => inputRef.current?.focus(), 700);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [visible, dismiss]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError('Please enter a valid email.'); return; }
    setError('');
    setSubmitted(true);
    try { sessionStorage.setItem(STORAGE_KEY, '1'); } catch {}
  };

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* ── Backdrop ── */}
          <motion.div
            key="bd"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.32, 0.72, 0, 1] }}
            onClick={dismiss}
            aria-hidden="true"
            style={{
              position: 'fixed', inset: 0, zIndex: 1200,
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              background: 'rgba(8, 5, 2, 0.75)',
            }}
          />

          {/* ── Card wrapper ── */}
          <motion.div
            key="panel"
            role="dialog"
            aria-modal="true"
            aria-label="Welcome offer"
            initial={{ opacity: 0, scale: 0.92, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 24 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'fixed', inset: 0, zIndex: 1201,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: 'clamp(1rem, 4vw, 2rem)',
              pointerEvents: 'none',
            }}
          >
            {/* ── Outer shell (gradient bezel) ── */}
            <div style={{
              pointerEvents: 'auto',
              position: 'relative',
              width: '100%',
              maxWidth: '820px',
              borderRadius: '2rem',
              padding: '2px',
              background: 'linear-gradient(140deg, rgba(255,255,255,0.22) 0%, rgba(212,168,108,0.18) 45%, rgba(255,255,255,0.05) 100%)',
              boxShadow: '0 0 0 1px rgba(255,255,255,0.07), 0 50px 130px rgba(0,0,0,0.65), 0 12px 40px rgba(0,0,0,0.35)',
            }}>
              {/* ── Close button — anchored to card top-right ── */}
              <motion.button
                onClick={dismiss}
                aria-label="Close offer"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{ delay: 0.45, duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
                style={{
                  position: 'absolute', top: '-1rem', right: '-1rem', zIndex: 10,
                  width: '2.25rem', height: '2.25rem', borderRadius: '50%',
                  border: '1.5px solid rgba(255,255,255,0.25)',
                  background: 'rgba(20,12,6,0.65)',
                  backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
                  cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 360ms cubic-bezier(0.32,0.72,0,1)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.92)';
                  e.currentTarget.style.borderColor = 'transparent';
                  e.currentTarget.style.transform = 'rotate(90deg) scale(1.1)';
                  const lines = e.currentTarget.querySelectorAll('line');
                  lines.forEach((l) => l.setAttribute('stroke', 'oklch(18% 0.006 60)'));
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(20,12,6,0.65)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)';
                  e.currentTarget.style.transform = 'rotate(0deg) scale(1)';
                  const lines = e.currentTarget.querySelectorAll('line');
                  lines.forEach((l) => l.setAttribute('stroke', 'white'));
                }}
              >
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                  <line x1="1" y1="1" x2="10" y2="10" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="10" y1="1" x2="1" y2="10" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </motion.button>
              {/* ── Inner core ── */}
              <div data-exit-grid style={{
                borderRadius: 'calc(2rem - 2px)',
                overflow: 'hidden',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                minHeight: '520px',
                background: 'oklch(99% 0.004 60)',
              }}>

                {/* ── LEFT: content pane ── */}
                <div style={{
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  padding: 'clamp(2.25rem, 4vw, 3.25rem)',
                  background: 'oklch(99% 0.004 60)',
                }}>
                  <AnimatePresence mode="wait">
                    {submitted ? (
                      /* ── SUCCESS STATE ── */
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.55, ease: [0.32, 0.72, 0, 1] }}
                      >
                        <motion.div
                          initial={{ scale: 0, rotate: -20 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                          style={{
                            width: '3.25rem', height: '3.25rem', borderRadius: '50%',
                            background: 'oklch(18% 0.006 60)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            marginBottom: '1.75rem',
                          }}
                        >
                          <svg width="16" height="13" viewBox="0 0 16 13" fill="none">
                            <motion.path
                              d="M1 6.5L5.5 11L15 1.5"
                              stroke="white" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"
                              initial={{ pathLength: 0 }}
                              animate={{ pathLength: 1 }}
                              transition={{ delay: 0.35, duration: 0.55, ease: [0.32, 0.72, 0, 1] }}
                            />
                          </svg>
                        </motion.div>

                        <p style={{
                          fontFamily: 'var(--font-sans)', fontSize: '0.625rem', letterSpacing: '0.2em',
                          textTransform: 'uppercase', fontWeight: 600, color: 'oklch(72% 0.085 80)',
                          marginBottom: '0.875rem',
                        }}>
                          You're in
                        </p>
                        <h2 style={{
                          fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.875rem, 3.5vw, 2.625rem)',
                          fontWeight: 400, lineHeight: 1.08, letterSpacing: '-0.01em',
                          color: 'oklch(18% 0.006 60)', marginBottom: '1rem',
                        }}>
                          Welcome to<br />
                          <em style={{ fontStyle: 'italic', color: 'oklch(52% 0.018 55)' }}>Flower Dubai.</em>
                        </h2>
                        <p style={{
                          fontFamily: 'var(--font-sans)', fontSize: '0.875rem', lineHeight: 1.7,
                          color: 'oklch(52% 0.018 55)', marginBottom: '2rem', maxWidth: '300px',
                        }}>
                          Your 10% welcome discount is on its way. Check your inbox and enjoy your first bloom.
                        </p>
                        <button
                          onClick={dismiss}
                          style={{
                            display: 'inline-flex', alignItems: 'center', gap: '0.625rem',
                            padding: '0.75rem 1.625rem', borderRadius: '9999px',
                            border: '1.5px solid oklch(18% 0.006 60)', background: 'transparent',
                            fontFamily: 'var(--font-sans)', fontSize: '0.8125rem', fontWeight: 600,
                            letterSpacing: '0.04em', color: 'oklch(18% 0.006 60)', cursor: 'pointer',
                            transition: 'all 400ms cubic-bezier(0.32,0.72,0,1)',
                          }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = 'oklch(18% 0.006 60)'; e.currentTarget.style.color = 'white'; }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'oklch(18% 0.006 60)'; }}
                        >
                          Continue shopping
                        </button>
                      </motion.div>
                    ) : (
                      /* ── FORM STATE ── */
                      <motion.div
                        key="form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.4 }}
                      >
                        {/* Eyebrow */}
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.18, duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                          style={{
                            display: 'inline-flex', alignItems: 'center', gap: '0.625rem',
                            marginBottom: '1.375rem',
                          }}
                        >
                          <span style={{ width: '1.75rem', height: '1px', background: 'oklch(72% 0.085 80)', display: 'block' }} />
                          <span style={{
                            fontFamily: 'var(--font-sans)', fontSize: '0.625rem', letterSpacing: '0.22em',
                            textTransform: 'uppercase', fontWeight: 700, color: 'oklch(72% 0.085 80)',
                          }}>
                            Welcome Gift
                          </span>
                        </motion.div>

                        {/* Big headline */}
                        <motion.h2
                          initial={{ opacity: 0, y: 22 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.26, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                          style={{
                            fontFamily: 'var(--font-serif)',
                            fontSize: 'clamp(2.75rem, 4.5vw, 3.75rem)',
                            fontWeight: 400, lineHeight: 1.03, letterSpacing: '-0.02em',
                            color: 'oklch(18% 0.006 60)', marginBottom: '1.125rem',
                          }}
                        >
                          10% Off<br />
                          <em style={{ fontStyle: 'italic', color: 'oklch(62% 0.018 55)' }}>Your First</em><br />
                          Order
                        </motion.h2>

                        {/* Sub copy */}
                        <motion.p
                          initial={{ opacity: 0, y: 14 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.34, duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                          style={{
                            fontFamily: 'var(--font-sans)', fontSize: '0.875rem', lineHeight: 1.7,
                            color: 'oklch(52% 0.018 55)', marginBottom: '2rem', maxWidth: '290px',
                          }}
                        >
                          Join the Flower Dubai list and unlock your welcome discount — sent straight to your inbox.
                        </motion.p>

                        {/* Email form */}
                        <motion.form
                          onSubmit={handleSubmit}
                          initial={{ opacity: 0, y: 14 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.44, duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                          style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}
                        >
                          {/* Pill input with nested CTA */}
                          <div style={{
                            borderRadius: '9999px',
                            padding: '2px',
                            background: focused
                              ? 'linear-gradient(130deg, oklch(18% 0.006 60) 0%, oklch(72% 0.085 80) 100%)'
                              : 'rgba(24,16,8,0.13)',
                            transition: 'background 380ms cubic-bezier(0.32,0.72,0,1)',
                            boxShadow: focused ? '0 0 0 4px rgba(212,168,108,0.12)' : 'none',
                          }}>
                            <div style={{
                              borderRadius: '9999px', background: 'oklch(99% 0.004 60)',
                              display: 'flex', alignItems: 'center',
                              paddingLeft: '1.375rem', paddingRight: '0.3rem',
                              paddingTop: '0.3rem', paddingBottom: '0.3rem',
                            }}>
                              <input
                                ref={inputRef}
                                type="email"
                                placeholder="your@email.com"
                                value={email}
                                onChange={(e) => { setEmail(e.target.value); if (error) setError(''); }}
                                onFocus={() => setFocused(true)}
                                onBlur={() => setFocused(false)}
                                aria-invalid={!!error}
                                style={{
                                  flex: 1, border: 'none', background: 'transparent',
                                  fontFamily: 'var(--font-sans)', fontSize: '0.875rem',
                                  color: 'oklch(18% 0.006 60)', outline: 'none',
                                  minWidth: 0, padding: '0.5rem 0.5rem 0.5rem 0',
                                }}
                              />
                              <button
                                type="submit"
                                style={{
                                  flexShrink: 0, display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                                  padding: '0.7rem 1.375rem', borderRadius: '9999px', border: 'none',
                                  background: 'oklch(18% 0.006 60)', color: 'white',
                                  fontFamily: 'var(--font-sans)', fontSize: '0.8125rem', fontWeight: 600,
                                  letterSpacing: '0.05em', cursor: 'pointer', whiteSpace: 'nowrap',
                                  transition: 'all 420ms cubic-bezier(0.32,0.72,0,1)',
                                }}
                                onMouseEnter={(e) => { e.currentTarget.style.background = 'oklch(28% 0.008 58)'; e.currentTarget.style.transform = 'scale(1.03)'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.background = 'oklch(18% 0.006 60)'; e.currentTarget.style.transform = 'scale(1)'; }}
                              >
                                <span>Claim 10%</span>
                                {/* nested icon circle */}
                                <span style={{
                                  width: '1.5rem', height: '1.5rem', borderRadius: '50%',
                                  background: 'rgba(255,255,255,0.13)',
                                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                                }}>
                                  <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                                    <path d="M1.5 7.5L7.5 1.5M7.5 1.5H3M7.5 1.5V6" stroke="white" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                                </span>
                              </button>
                            </div>
                          </div>

                          {error && (
                            <motion.p
                              initial={{ opacity: 0, y: -4 }}
                              animate={{ opacity: 1, y: 0 }}
                              style={{
                                fontFamily: 'var(--font-sans)', fontSize: '0.75rem',
                                color: 'oklch(52% 0.2 28)', paddingLeft: '1.375rem',
                              }}
                            >
                              {error}
                            </motion.p>
                          )}

                          <p style={{
                            fontFamily: 'var(--font-sans)', fontSize: '0.6875rem',
                            color: 'oklch(64% 0.012 55)', paddingLeft: '1.375rem', letterSpacing: '0.01em',
                          }}>
                            One-time offer · No spam · Unsubscribe anytime
                          </p>
                        </motion.form>

                        {/* Soft dismiss */}
                        <motion.button
                          onClick={dismiss}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.72, duration: 0.5 }}
                          style={{
                            marginTop: '1.625rem', background: 'none', border: 'none',
                            fontFamily: 'var(--font-sans)', fontSize: '0.75rem',
                            color: 'oklch(64% 0.012 55)', cursor: 'pointer', letterSpacing: '0.02em',
                            textDecoration: 'underline', textUnderlineOffset: '3px',
                            textDecorationColor: 'rgba(24,16,8,0.15)',
                            transition: 'color 300ms cubic-bezier(0.32,0.72,0,1)',
                            display: 'block',
                          }}
                          onMouseEnter={(e) => { e.currentTarget.style.color = 'oklch(18% 0.006 60)'; }}
                          onMouseLeave={(e) => { e.currentTarget.style.color = 'oklch(64% 0.012 55)'; }}
                        >
                          No thanks, I'll pay full price
                        </motion.button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* ── RIGHT: full-bleed floral image pane ── */}
                <div data-exit-img-pane style={{ position: 'relative', overflow: 'hidden' }}>
                  <motion.div
                    initial={{ scale: 1.08 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                    style={{ position: 'absolute', inset: 0 }}
                  >
                    <img
                      src="/Media/Popup.png"
                      alt=""
                      aria-hidden="true"
                      style={{
                        width: '100%', height: '100%',
                        objectFit: 'cover', objectPosition: 'center',
                        display: 'block',
                      }}
                    />
                    {/* Subtle left-edge vignette so text doesn't clash */}
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: 'linear-gradient(to right, oklch(99% 0.004 60 / 0.18) 0%, transparent 35%)',
                    }} />
                  </motion.div>

                  {/* Floating discount badge */}
                  <div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)' }}>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.7, rotate: -8 }}
                      animate={{ opacity: 1, scale: 1, rotate: -5 }}
                      transition={{ delay: 0.55, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                      style={{
                        background: 'oklch(18% 0.006 60)',
                        color: 'white', borderRadius: '9999px',
                        padding: '0.5rem 1.375rem',
                        fontFamily: 'var(--font-serif)',
                        fontSize: '1.125rem', fontWeight: 400, fontStyle: 'italic',
                        letterSpacing: '-0.01em', whiteSpace: 'nowrap',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                      }}
                    >
                      — 10% off —
                    </motion.div>
                  </div>
                </div>

              </div>
            </div>

          </motion.div>

          <style>{`
            @media (max-width: 640px) {
              [data-exit-grid] {
                grid-template-columns: 1fr !important;
              }
              [data-exit-img-pane] {
                display: none !important;
              }
            }
          `}</style>
        </>
      )}
    </AnimatePresence>
  );
}

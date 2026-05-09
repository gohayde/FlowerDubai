import { useState, type CSSProperties, type FormEvent } from 'react';
import { motion } from 'motion/react';
import { useInView } from '../hooks/useAnimations';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';

export default function Contact() {
  const { ref, isInView } = useInView();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const contactInfo = [
    { icon: <Phone size={18} />, label: '(+971) 54 747 0809', href: 'tel:+971547470809' },
    { icon: <Mail size={18} />, label: 'flowerdubai@urbanrose.ae', href: 'mailto:flowerdubai@urbanrose.ae' },
    { icon: <MapPin size={18} />, label: '19 Sheikh Zayed Rd, Trade Center, Dubai', href: '#' },
    { icon: <Clock size={18} />, label: 'Everyday 9AM – 2AM', href: '#' },
  ];

  const inputStyle: CSSProperties = {
    width: '100%',
    padding: '0.875rem 1rem',
    borderRadius: '0.875rem',
    border: '1.5px solid rgba(117, 111, 107, 0.15)',
    background: 'white',
    fontFamily: 'var(--font-sans)',
    fontSize: '0.875rem',
    color: 'var(--color-charcoal)',
    outline: 'none',
    transition: 'border-color 300ms, box-shadow 300ms',
  };

  return (
    <section ref={ref} id="contact" className="section-padding" style={{ background: 'white' }}>
      <div className="container-main">
        <div
          className="grid"
          style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'clamp(3rem, 6vw, 5rem)',
          }}
        >
          {/* Left - Info */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
              className="label-eyebrow"
              style={{ marginBottom: '1rem', color: 'var(--color-rose)' }}
            >
              Get in touch
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
              className="heading-section"
            >
              Send Happiness
              <br />
              <em style={{ fontStyle: 'italic', color: 'var(--color-rose)' }}>Today</em>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
              className="text-body"
              style={{ marginTop: '1rem', maxWidth: '440px' }}
            >
              Need help choosing the right bouquet? Contact Flower Dubai and we'll help 
              you create the perfect surprise.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
              className="flex flex-col"
              style={{ gap: '1rem', marginTop: '2rem' }}
            >
              {contactInfo.map((info) => (
                <a
                  key={info.label}
                  href={info.href}
                  className="flex items-center"
                  style={{
                    gap: '0.875rem',
                    textDecoration: 'none',
                    color: 'var(--color-charcoal)',
                    fontSize: '0.9375rem',
                    fontWeight: 500,
                    transition: 'color 300ms',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-rose)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-charcoal)')}
                >
                  <span
                    className="flex items-center justify-center"
                    style={{
                      width: '2.5rem',
                      height: '2.5rem',
                      borderRadius: '0.75rem',
                      background: 'var(--color-blush-light)',
                      color: 'var(--color-rose)',
                      flexShrink: 0,
                    }}
                  >
                    {info.icon}
                  </span>
                  {info.label}
                </a>
              ))}
            </motion.div>
          </div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
            style={{
              background: 'var(--color-cream)',
              borderRadius: '1.5rem',
              padding: 'clamp(1.5rem, 4vw, 2.5rem)',
              border: '1px solid rgba(248, 184, 197, 0.15)',
            }}
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center"
                style={{ padding: '3rem 1rem', gap: '1rem' }}
              >
                <div
                  className="flex items-center justify-center"
                  style={{
                    width: '4rem',
                    height: '4rem',
                    borderRadius: '50%',
                    background: 'var(--color-wine)',
                    color: 'white',
                    fontSize: '1.5rem',
                    marginBottom: '0.5rem',
                  }}
                >
                  ✓
                </div>
                <h3 className="heading-card">Message received.</h3>
                <p className="text-body" style={{ maxWidth: '320px' }}>
                  We'll get back to you with a flower recommendation.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col" style={{ gap: '1rem' }}>
                <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <input
                    type="text"
                    placeholder="Your Name"
                    required
                    style={inputStyle}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'var(--color-blush)';
                      e.target.style.boxShadow = '0 0 0 3px rgba(248,184,197,0.15)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(117, 111, 107, 0.15)';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    style={inputStyle}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'var(--color-blush)';
                      e.target.style.boxShadow = '0 0 0 3px rgba(248,184,197,0.15)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(117, 111, 107, 0.15)';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email Address"
                  style={inputStyle}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'var(--color-blush)';
                    e.target.style.boxShadow = '0 0 0 3px rgba(248,184,197,0.15)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(117, 111, 107, 0.15)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <select
                    style={{ ...inputStyle, appearance: 'none', color: 'var(--color-muted)' }}
                    defaultValue=""
                  >
                    <option value="" disabled>Occasion</option>
                    <option>Birthday</option>
                    <option>Anniversary</option>
                    <option>Love & Romance</option>
                    <option>Congratulations</option>
                    <option>Thank You</option>
                    <option>Other</option>
                  </select>
                  <select
                    style={{ ...inputStyle, appearance: 'none', color: 'var(--color-muted)' }}
                    defaultValue=""
                  >
                    <option value="" disabled>Delivery Area</option>
                    <option>Downtown Dubai</option>
                    <option>Dubai Marina</option>
                    <option>Jumeirah</option>
                    <option>DIFC</option>
                    <option>Business Bay</option>
                    <option>Palm Jumeirah</option>
                    <option>Other</option>
                  </select>
                </div>
                <textarea
                  placeholder="Your Message"
                  rows={3}
                  style={{ ...inputStyle, resize: 'none' }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'var(--color-blush)';
                    e.target.style.boxShadow = '0 0 0 3px rgba(248,184,197,0.15)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(117, 111, 107, 0.15)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  <Send size={16} />
                  <span>Send Request</span>
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}



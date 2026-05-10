# Design System

## Visual Theme

Formal luxury floristry. Warm cream ground — not white, not beige, the specific tone of a luxury gift box lining. Deep burgundy-rose and forest green as the two chromatic poles: desire and nature. Gold as a tertiary accent, used sparingly for price and premium signals. The aesthetic sits between a high-end Dubai boutique and an editorial magazine spread. Serif-led, unhurried, drenched in warmth.

**Scene sentence:** A woman browsing on her phone in a quiet Dubai Mall café at golden hour, ambient warm light, unhurried, expecting the visual quality of a luxury retail counter.

**Color strategy:** Committed. The warm cream ground carries 50%+ of every surface. One saturated rose-burgundy provides emotional charge. Garden green anchors action. Gold elevates without screaming.

**Theme:** Light. The golden-hour warmth of Dubai afternoon — never clinical white, never moody dark.

---

## Color Palette

All values in OKLCH.

### Core Roles

| Token | OKLCH | Hex approx | Role |
|---|---|---|---|
| `--color-cream` | `oklch(97% 0.008 55)` | #FFF8F4 | Page ground, primary surface |
| `--color-cream-dark` | `oklch(95% 0.010 52)` | #FFF0E8 | Section alternates, subtle depth |
| `--color-warm-white` | `oklch(99% 0.004 60)` | #FFFDFB | Card surfaces, elevated above ground |
| `--color-blush` | `oklch(82% 0.065 10)` | #F8B8C5 | Ambient tint, circle backgrounds, hover states |
| `--color-blush-light` | `oklch(93% 0.030 10)` | #FDE8EE | Very light blush, product image backgrounds |
| `--color-rose` | `oklch(62% 0.115 12)` | #D96C7C | Italic emphasis, eyebrow accents, italic headlines |
| `--color-dusty-rose` | `oklch(55% 0.105 12)` | #C85F73 | Rose hover states |
| `--color-berry` | `oklch(38% 0.115 350)` | #A41458 | Deep accent for high-contrast moments |
| `--color-garden` | `oklch(40% 0.075 150)` | #3F5F45 | Primary CTA, buttons, anchor dots |
| `--color-garden-light` | `oklch(46% 0.080 150)` | #4A7A52 | Garden hover |
| `--color-sage` | `oklch(65% 0.050 150)` | #8FA381 | Secondary green text, decorative |
| `--color-charcoal` | `oklch(18% 0.006 60)` | #1F1F1F | Primary text, headings |
| `--color-muted` | `oklch(52% 0.018 55)` | #756F6B | Body text, supporting copy |
| `--color-gold` | `oklch(72% 0.085 80)` | #D7A85A | Price, premium badges, star ratings |
| `--color-chocolate` | `oklch(38% 0.065 45)` | #7A4B34 | Chocolate product sections |

### Usage Rules

- Never pure `#000` or `#fff`. Every neutral is tinted toward warm amber (hue 55–60).
- Rose (`--color-rose`) is for emphasis and emotion — italic headings, eyebrows on feature sections. Not for body text or UI affordances.
- Garden (`--color-garden`) owns all CTAs. One action color, used with discipline.
- Gold is used for price display and star ratings only. Never as a decorative border or background fill.
- Blush-light is the only acceptable product image background. Not white.

---

## Typography

### Type Stack

```css
--font-serif: 'Cormorant Garamond', Georgia, serif;
--font-sans: 'Manrope', system-ui, sans-serif;
```

Cormorant Garamond for all display and heading text — formal, high-contrast, distinctly not-template. Manrope for all UI copy, body, labels — humanist sans, contemporary without being cold.

### Scale

| Class | Size | Weight | Use |
|---|---|---|---|
| `.heading-hero` | clamp(3rem, 6vw, 5.5rem) | 400 | Hero headline only |
| `.heading-display` | clamp(2.5rem, 5vw, 4.5rem) | 400 | Section intros |
| `.heading-section` | clamp(2rem, 3.5vw, 3.25rem) | 400 | Section headers |
| `.heading-card` | clamp(1.25rem, 2vw, 1.5rem) | 500 | Product names, card titles |
| `.label-eyebrow` | 0.6875rem / tracking 0.18em | 600 | Section labels, categories (ALL CAPS) |
| `.text-body-lg` | 1.125rem / lh 1.75 | 400 | Hero and feature body |
| `.text-body` | 1rem / lh 1.7 | 400 | Standard body copy |

### Typography Rules

- Serif headings always at weight 400 (regular). The letterforms provide the luxury signal — don't over-bold them.
- Italic serif (`<em>`) in rose (`--color-rose`) for single-word emotional emphasis in headlines. One word per headline maximum.
- Body text capped at 65–75ch line length.
- Eyebrow labels in `--color-rose` for hero and feature sections; in `--color-muted` for product and utility sections.
- No heading below 1.25rem in serif. Below that, use Manrope.

---

## Spacing & Layout

### Spacing Scale (meaningful rhythm, not uniform)

| Token | Value | Use |
|---|---|---|
| Section vertical | clamp(5rem, 10vw, 8rem) | Major section padding |
| Section vertical sm | clamp(3rem, 6vw, 5rem) | Minor / utility sections |
| Card padding | 1.5rem | Product card inner spacing |
| Container max | 1320px | Primary container |
| Container narrow | 960px | Editorial / text-heavy sections |
| Container gutter | clamp(1rem, 4vw, 2rem) | Horizontal page padding |

### Layout Principles

- Alternate section backgrounds between `--color-cream` and `--color-warm-white` for rhythm. Never two same-color sections in sequence.
- Product grids: 4 columns at 1280px+, 3 at 960px, 2 at 640px, 1 at mobile.
- Hero: 50/50 split at 768px+, stacked below. Image always right column on desktop.
- Arched image frames (border-radius 50% top, 0 bottom) for editorial portrait-format images.
- No wave dividers between sections. Use background color transitions only.
- No nested cards. Cards contain images and text, never other cards.

---

## Components

### Buttons

Three variants. All pill-shaped (border-radius: 9999px).

**Primary (`.btn-primary`)**
- Background: `--color-garden` → hover `--color-garden-light`
- Text: white, 0.875rem, weight 600, tracking 0.04em
- Padding: 0.875rem 2rem
- Hover: translateY(-1px) + shadow `0 8px 30px rgba(63,95,69,0.25)`
- Transition: 600ms ease-bloom

**Secondary (`.btn-secondary`)**
- Background: transparent
- Border: 1.5px solid `--color-charcoal`
- Hover: fills charcoal, text white

**Blush (`.btn-blush`)**
- Background: white
- Text: `--color-rose`
- Used on dark/image backgrounds only

### Product Cards (`.card-product`)

- Background: white (`--color-warm-white`)
- Border-radius: 1.5rem
- Border: 1px solid `rgba(248,184,197,0.15)`
- Image background: blush-light circle, 75% width
- Hover: translateY(-6px) + soft blush shadow
- No side-stripe borders. No gradient overlays on the card itself.

### Glass Cards (`.glass-card`)

- Background: `rgba(255,255,255,0.75)`, backdrop-filter blur(20px)
- Border: 1px solid `rgba(248,184,197,0.2)`
- Border-radius: 1.5rem
- Used for floating badges and overlays on image sections only. Not as general card pattern.

### Eyebrow Labels (`.label-eyebrow`)

- Font: Manrope, 0.6875rem, weight 600, tracking 0.18em, uppercase
- Color: `--color-rose` on hero/feature sections; `--color-muted` on product/utility sections

---

## Motion

### Easing Tokens

```css
--ease-bloom: cubic-bezier(0.32, 0.72, 0, 1);   /* Primary: ease-out-expo feel */
```

### Principles

- Entrance animations: opacity 0→1 + translateY(20–40px)→0. Duration 700–850ms. Stagger 150ms between siblings.
- Scroll reveals: `opacity 0→1 + translateY(32px)→0`, 700ms ease-bloom.
- Hover transitions: 500–600ms. Never instant, never slow.
- No bounce, no elastic, no spring on UI elements.
- No animation of layout properties (width, height, padding, margin).
- Floating/ambient elements (petals, orbs): independent slow loops, 6–20s, ease-in-out, opacity max 0.7.
- `prefers-reduced-motion`: all animations disabled, transitions collapsed to 0.01ms.

---

## Imagery Guidelines

- All product images: PNG with transparent background, on blush-light circle background.
- Hero image: full bouquet, portrait orientation, drop-shadow `0 24px 64px rgba(0,0,0,0.09)`.
- Gallery images: mixed aspect ratios, organic placement. Arched frames (pill-top) for editorial feel.
- No stock imagery of people. Flowers and arrangements only.
- No sparkle/bokeh overlays on images. Let the photography breathe.

---

## Iconography

- Lucide React icons throughout, strokeWidth 1.5–2, size 14–20px.
- Icons used for wayfinding and action (arrow, cart, search, close) only.
- No decorative icon grids.

---

## Section-Specific Notes

| Section | Background | Key Treatment |
|---|---|---|
| Hero | cream | 50/50 split, large serif, floating glass badges |
| TrustBar | cream-dark | Horizontal rule of 3–4 facts, no icon grid |
| Categories | warm-white | Horizontal scroll on mobile, organic sizing |
| BestSellers | warm-white | 4-col grid, product cards |
| ImmediateDelivery | garden (dark) | Inverted palette, white type, blush accent |
| About | cream | Editorial split: large image left, type right |
| BigBouquets | cream-dark | Full-bleed image section, minimal overlay type |
| Chocolates | warm-white | Product grid variant |
| BuildGift | rose/berry drenched | Full-bleed CTA, white type |
| Gallery | cream | Organic masonry or scattered placement |
| DeliveryAreas | warm-white | Map or tag-cloud, no icon grid |
| OfferBanner | blush | Horizontal promo strip |
| Reviews | cream | Quoted text, large, editorial |
| FAQ | cream-dark | Accordion, no borders on items |
| Contact | warm-white | Form + info, clean |
| Footer | charcoal | Inverted, warm-white type |

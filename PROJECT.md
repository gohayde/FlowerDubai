# FloDubai — Project Context

## Overview
A single-page e-commerce landing site for **Flower Dubai** (brand: Urban Rose), a Dubai-based flower and gift delivery service. The site is built as a rich, animated marketing page with an integrated shopping cart — no routing, no backend.

**Business details:**
- Location: 19 Sheikh Zayed Rd, Trade Center, Dubai
- Phone: (+971) 54 747 0809
- Email: flowerdubai@urbanrose.ae
- Hours: Every day, 9AM – 2AM

---

## Tech Stack

| Tool | Version | Role |
|---|---|---|
| React | 19 | UI framework |
| TypeScript | ~6.0 | Type safety |
| Vite | 8 | Build tool / dev server |
| Tailwind CSS | 4 | Utility-first styling |
| GSAP + @gsap/react | 3.15 | Scroll-triggered animations |
| Motion (Framer) | 12 | Component-level animations |
| Lenis | 1.3 | Smooth scroll |
| Zustand | 5 | Global cart/UI state |
| Lucide React | — | Icons |

---

## Project Structure

```
src/
├── App.tsx                  # Root — mounts all sections in order, sets up Lenis
├── index.css                # Global styles / Tailwind base
├── main.tsx                 # React entry point
├── data/
│   └── products.ts          # All static data: products, categories, reviews, FAQ, delivery areas
├── store/
│   └── cartStore.ts         # Zustand store — cart items, QuickView, search overlay state
├── hooks/
│   └── useAnimations.ts     # Reusable GSAP animation hooks
├── assets/
│   └── hero.png             # Local hero image
└── components/
    ├── Header.tsx            # Sticky nav with cart icon + search
    ├── Hero.tsx              # Full-screen hero section
    ├── TrustBar.tsx          # Trust/USP badges (fast delivery, etc.)
    ├── Categories.tsx        # Product category grid
    ├── BestSellers.tsx       # Featured products carousel/grid
    ├── ImmediateDelivery.tsx # Same-day delivery CTA section
    ├── About.tsx             # Brand story section
    ├── BigBouquets.tsx       # Big bouquet product showcase
    ├── Chocolates.tsx        # Chocolate gift products
    ├── BuildGift.tsx         # Custom gift builder CTA
    ├── Gallery.tsx           # Photo gallery
    ├── DeliveryAreas.tsx     # Dubai delivery coverage map/list
    ├── OfferBanner.tsx       # Promotional banner
    ├── Reviews.tsx           # Customer reviews
    ├── FAQ.tsx               # Accordion FAQ
    ├── Contact.tsx           # Contact form / info
    ├── Footer.tsx            # Site footer
    ├── CartDrawer.tsx        # Slide-out cart sidebar
    ├── QuickView.tsx         # Product quick-view modal
    ├── SearchOverlay.tsx     # Full-screen search overlay
    ├── FloatingPetals.tsx    # Ambient animated petal background
    └── MobileOrderButton.tsx # Sticky CTA button for mobile
```

---

## Data Model

### Product
```ts
{
  id: string          // slug, e.g. 'artisan-grace'
  name: string
  price: number       // AED
  oldPrice?: number   // for sale display
  image: string       // path under /images/products/
  category: string    // 'Flower Bouquets' | 'Big Bouquets' | 'Chocolates' | 'Flower Boxes'
  badge?: string      // e.g. 'Statement Gift'
  description: string
  featured?: boolean
}
```

### Categories
Flower Bouquets, Big Bouquets, Chocolates, Flower Boxes, Birthday, Anniversary, Romantic, Congratulations

### Delivery Areas (12 zones)
Downtown Dubai, Business Bay, DIFC, Dubai Marina, Jumeirah, Palm Jumeirah, Deira, Bur Dubai, Al Barsha, JVC, Dubai Hills, Trade Center

---

## State Management (Zustand — `cartStore.ts`)

Single store manages:
- **Cart**: items array, add/remove/update/clear, totalItems(), totalPrice()
- **CartDrawer**: `isOpen`, toggleCart / openCart / closeCart
- **QuickView modal**: `isQuickViewOpen`, `quickViewProduct`, open/close
- **Search overlay**: `isSearchOpen`, `searchQuery`, open/close/setQuery

---

## Page Section Order (App.tsx)
1. FloatingPetals (ambient layer)
2. Header
3. Hero → TrustBar → Categories → BestSellers → ImmediateDelivery → About → BigBouquets → Chocolates → BuildGift → Gallery → DeliveryAreas → OfferBanner → Reviews → FAQ → Contact
4. Footer
5. Overlays: CartDrawer, QuickView, SearchOverlay, MobileOrderButton

---

## Dev Commands
```bash
npm run dev      # start dev server (localhost:5173)
npm run build    # TypeScript check + Vite production build
npm run preview  # preview production build
npm run lint     # ESLint
```

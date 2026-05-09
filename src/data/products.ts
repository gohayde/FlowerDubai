export interface Product {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  category: string;
  badge?: string;
  description: string;
  featured?: boolean;
}

export const products: Product[] = [
  {
    id: 'artisan-grace',
    name: 'Artisan Grace',
    price: 350,
    oldPrice: 450,
    image: '/images/products/artisan-grace.png',
    category: 'Anniversaries',
    description: 'A graceful arrangement of soft pink roses, white ranunculus, and delicate greenery.',
    featured: true,
  },
  {
    id: 'aura-urban',
    name: 'Aura Urban',
    price: 300,
    oldPrice: 400,
    image: '/images/products/aura-urban.png',
    category: 'Wedding',
    description: 'A modern arrangement of burgundy roses and dusty pink carnations with dark foliage.',
    featured: true,
  },
  {
    id: 'big-surprise',
    name: 'Big Surprise',
    price: 1200,
    oldPrice: 1500,
    image: '/images/products/big-surprise.png',
    category: 'Big Bouquets',
    badge: 'Statement Gift',
    description: 'A grand statement bouquet designed for unforgettable moments.',
    featured: true,
  },
  {
    id: 'bloom-fusion',
    name: 'Bloom Fusion',
    price: 250,
    oldPrice: 320,
    image: '/images/products/bloom-fusion.png',
    category: 'Birthday',
    description: 'A vibrant fusion of lavender, pink roses, and white daisies.',
    featured: true,
  },
  {
    id: 'blue-garden',
    name: 'Blue Garden',
    price: 180,
    oldPrice: 240,
    image: '/images/products/blue-garden.png',
    category: 'Romantic',
    description: 'Blue hydrangeas paired with white roses and delicate baby\'s breath.',
    featured: true,
  },
  {
    id: 'blush-breeze',
    name: 'Blush & Breeze',
    price: 250,
    oldPrice: 350,
    image: '/images/products/blush-breeze.png',
    category: 'Birthday',
    description: 'Soft pink peonies and blush roses with wispy greenery.',
    featured: true,
  },
  {
    id: 'yellow-sunrise',
    name: 'Yellow Sunrise',
    price: 350,
    image: '/images/products/yellow-sunrise.png',
    category: 'Flower Bouquets',
    description: 'Bright yellow sunflowers and cream roses with lush green foliage.',
    featured: true,
  },
  {
    id: 'yellowish-bouquet',
    name: 'Yellowish Bouquet',
    price: 200,
    image: '/images/products/yellowish-bouquet.png',
    category: 'Flower Bouquets',
    description: 'Pale yellow roses and white chrysanthemums with light green leaves.',
    featured: true,
  },
  {
    id: 'wild-elegance',
    name: 'Wild Elegance',
    price: 350,
    image: '/images/products/wild-elegance.png',
    category: 'Flower Bouquets',
    description: 'A loose, natural arrangement of garden roses and wildflowers.',
    featured: true,
  },
  {
    id: 'chocolate-delight',
    name: 'Chocolate Delight',
    price: 400,
    image: '/images/products/chocolate-gift.png',
    category: 'Chocolates',
    description: 'Premium chocolate gift set paired with fresh roses.',
  },
  {
    id: 'rose-box-blush',
    name: 'Rose Box Blush',
    price: 450,
    image: '/images/products/flower-box.png',
    category: 'Flower Boxes',
    description: 'Perfectly arranged roses in a luxury hat box.',
  },
];

export const categories = [
  { name: 'Flower Bouquets', icon: 'bouquet' },
  { name: 'Big Bouquets', icon: 'big-bouquet' },
  { name: 'Chocolates', icon: 'chocolates' },
  { name: 'Flower Boxes', icon: 'gift-box' },
  { name: 'Birthday', icon: 'birthday' },
  { name: 'Anniversary', icon: 'anniversary' },
  { name: 'Romantic', icon: 'romantic' },
  { name: 'Congratulations', icon: 'congrats' },
];

export const reviews = [
  {
    id: 1,
    text: 'The flowers arrived quickly and looked beautiful. My wife absolutely loved the surprise!',
    author: 'Ahmed R.',
    rating: 5,
  },
  {
    id: 2,
    text: 'Perfect last-minute gift. The bouquet was fresh and elegant. Will definitely order again.',
    author: 'Sarah M.',
    rating: 5,
  },
  {
    id: 3,
    text: 'The chocolates and flowers made the surprise feel premium. Amazing presentation and quality.',
    author: 'Omar K.',
    rating: 5,
  },
  {
    id: 4,
    text: 'Loved the presentation and fast delivery. The arrangement was even more beautiful than the photos.',
    author: 'Fatima H.',
    rating: 5,
  },
];

export const faqItems = [
  {
    question: 'Do you offer immediate flower delivery in Dubai?',
    answer: 'Yes, Flower Dubai offers immediate delivery options across Dubai. You can order online or call us for urgent same-day deliveries.',
  },
  {
    question: 'What are your working hours?',
    answer: 'We are open everyday from 9AM to 2AM, including weekends and holidays.',
  },
  {
    question: 'Can I order chocolates with flowers?',
    answer: 'Yes, chocolates can be paired with flowers and gift arrangements. We offer premium chocolate gift sets that complement our floral arrangements beautifully.',
  },
  {
    question: 'What products do you sell?',
    answer: 'We offer flower bouquets, big bouquets, chocolates, flower boxes, and custom gift arrangements for all occasions.',
  },
  {
    question: 'Where are you located?',
    answer: '19 Sheikh Zayed Rd, Trade Center, Dubai. We deliver across all major areas in Dubai.',
  },
  {
    question: 'How can I contact Flower Dubai?',
    answer: 'Call (+971) 54 747 0809 or email flowerdubai@urbanrose.ae. We are available every day from 9AM to 2AM.',
  },
];

export const deliveryAreas = [
  'Downtown Dubai',
  'Business Bay',
  'DIFC',
  'Dubai Marina',
  'Jumeirah',
  'Palm Jumeirah',
  'Deira',
  'Bur Dubai',
  'Al Barsha',
  'JVC',
  'Dubai Hills',
  'Trade Center',
];

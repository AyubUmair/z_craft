import { CategoryInfo } from '@/types';

export const categories: CategoryInfo[] = [
  {
    slug: 'quran-covers',
    name: 'Quran Covers',
    description: 'Handcrafted embroidered velvet Quran covers with personalized gold monograms and name embroidery.',
    color: '#0E3B2E',
    colorName: 'Emerald',
    icon: '📖',
    image: '/images/categories/quran-covers.jpg',
  },
  {
    slug: 'wedding-gifts',
    name: 'Wedding Gifts',
    description: 'Luxury wedding and engagement gift sets — curated hampers, his & hers collections, and bespoke keepsakes.',
    color: '#5B1A26',
    colorName: 'Burgundy',
    icon: '💍',
    image: '/images/categories/wedding-gifts.jpg',
  },
  {
    slug: 'nikah-nama',
    name: 'Nikah Nama',
    description: 'Elegantly framed Islamic marriage certificates and wedding keepsakes with custom calligraphy.',
    color: '#0B2A5B',
    colorName: 'Royal Blue',
    icon: '🕌',
    image: '/images/categories/nikah-nama.jpg',
  },
  {
    slug: 'gift-boxes',
    name: 'Gift Boxes',
    description: 'Premium curated gift boxes for every occasion — birthdays, Eid, anniversaries, and more.',
    color: '#B58C8A',
    colorName: 'Dusty Rose',
    icon: '🎁',
    image: '/images/categories/gift-boxes.jpg',
  },
  {
    slug: 'wooden-crafts',
    name: 'Wooden Crafts',
    description: 'Custom laser-cut wooden nameplates, monogram signs, cake toppers, and decorative pieces.',
    color: '#8B6914',
    colorName: 'Warm Gold',
    icon: '🪵',
    image: '/images/categories/wooden-crafts.jpg',
  },
  {
    slug: 'photo-frames',
    name: 'Photo Frames',
    description: 'Personalized photo frames and memory keepsakes for life\'s most cherished moments.',
    color: '#6B3A5D',
    colorName: 'Plum',
    icon: '🖼️',
    image: '/images/categories/photo-frames.jpg',
  },
  {
    slug: 'resin-art',
    name: 'Resin Art',
    description: 'Stunning resin art pieces — ring holders, decorative trays, clocks, and wedding accessories.',
    color: '#2D5F5D',
    colorName: 'Teal',
    icon: '✨',
    image: '/images/categories/resin-art.jpg',
  },
  {
    slug: 'hampers',
    name: 'Hampers',
    description: 'Lavish suitcase-style and luxury hamper sets for weddings, given days, and special celebrations.',
    color: '#7B4F3A',
    colorName: 'Copper',
    icon: '🧳',
    image: '/images/categories/hampers.jpg',
  },
];

export function getCategoryBySlug(slug: string): CategoryInfo | undefined {
  return categories.find(c => c.slug === slug);
}

export function getCategoryColor(slug: string): string {
  return getCategoryBySlug(slug)?.color ?? '#C9A227';
}

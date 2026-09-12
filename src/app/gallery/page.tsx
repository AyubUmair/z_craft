'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeUp, staggerContainer, staggerItem } from '@/lib/animations';
import { categories } from '@/data/categories';

// Gallery items showing real deliveries / customer snaps
const galleryItems = [
  { id: 'g1', caption: 'Royal Blue Quran Cover with Gold Embroidery', category: 'quran-covers', color: '#0B2A5B' },
  { id: 'g2', caption: 'Luxury Wedding Hamper — His & Hers Set', category: 'hampers', color: '#5B1A26' },
  { id: 'g3', caption: 'Framed Nikah Nama — Floral Watercolor Design', category: 'nikah-nama', color: '#0B2A5B' },
  { id: 'g4', caption: 'Custom Wooden Nameplate — Gold Finish', category: 'wooden-crafts', color: '#8B6914' },
  { id: 'g5', caption: 'Emerald Velvet Quran Cover — Gift Wrapped', category: 'quran-covers', color: '#0E3B2E' },
  { id: 'g6', caption: 'Birthday Luxury Gift Box — Pink Theme', category: 'gift-boxes', color: '#B58C8A' },
  { id: 'g7', caption: 'Resin Ring Holder — Wedding Ceremony', category: 'resin-art', color: '#2D5F5D' },
  { id: 'g8', caption: 'Given Day Gift Set — Rose Gold Collection', category: 'wedding-gifts', color: '#5B1A26' },
  { id: 'g9', caption: "Men's Executive Hamper — Corporate Gift", category: 'hampers', color: '#7B4F3A' },
  { id: 'g10', caption: 'Dusty Rose Quran Cover — Customer Delivery', category: 'quran-covers', color: '#B58C8A' },
  { id: 'g11', caption: 'Wedding Cake Topper — Custom Laser Cut', category: 'wooden-crafts', color: '#8B6914' },
  { id: 'g12', caption: 'Eid Gift Box Collection — Family Set', category: 'gift-boxes', color: '#0E3B2E' },
];

export default function GalleryPage() {
  const [filter, setFilter] = useState('all');
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const filtered = filter === 'all' ? galleryItems : galleryItems.filter(item => item.category === filter);
  const selected = galleryItems.find(item => item.id === selectedItem);

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="py-16 sm:py-24 text-center border-b border-[var(--color-base-border)]">
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <p className="text-[var(--color-gold)] text-sm uppercase tracking-[0.3em] mb-4">Customer Snaps</p>
          <h1 className="font-serif text-5xl sm:text-6xl font-bold text-[var(--color-base-ivory)] mb-4">Gallery</h1>
          <p className="text-[var(--color-base-muted)] text-lg max-w-xl mx-auto px-4">
            Real deliveries, happy customers. Every piece handcrafted with love.
          </p>
          <div className="gold-divider w-24 mx-auto mt-6" />
        </motion.div>
      </section>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filter */}
        <div className="flex flex-wrap gap-2 mb-10 justify-center">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 text-xs uppercase tracking-wider font-medium rounded-sm border transition-all ${
              filter === 'all' ? 'bg-[var(--color-gold)] text-black border-[var(--color-gold)]' : 'text-[var(--color-base-muted)] border-[var(--color-base-border)] hover:border-[var(--color-gold)]/50'
            }`}
          >
            All
          </button>
          {categories.slice(0, 6).map(cat => (
            <button
              key={cat.slug}
              onClick={() => setFilter(cat.slug)}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-medium rounded-sm border transition-all ${
                filter === cat.slug ? 'bg-[var(--color-gold)] text-black border-[var(--color-gold)]' : 'text-[var(--color-base-muted)] border-[var(--color-base-border)] hover:border-[var(--color-gold)]/50'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <motion.div
          key={filter}
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4"
        >
          {filtered.map((item, idx) => {
            const heights = ['h-64', 'h-72', 'h-80', 'h-56', 'h-96', 'h-68'];
            const h = heights[idx % heights.length];
            return (
              <motion.div
                key={item.id}
                variants={staggerItem}
                className="break-inside-avoid"
              >
                <button
                  onClick={() => setSelectedItem(item.id)}
                  className="group w-full block relative rounded overflow-hidden card cursor-pointer"
                >
                  <div
                    className={`${h} w-full flex items-center justify-center transition-transform duration-500 group-hover:scale-105`}
                    style={{ background: `linear-gradient(135deg, ${item.color}44 0%, ${item.color}11 50%, var(--color-base-card) 100%)` }}
                  >
                    <span className="text-6xl opacity-20">
                      {categories.find(c => c.slug === item.category)?.icon}
                    </span>
                  </div>
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <p className="text-sm text-white">{item.caption}</p>
                  </div>
                  <div className="absolute inset-0 border-2 border-[var(--color-gold)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded" />
                </button>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ ease: [0.22, 1, 0.36, 1] }}
              className="relative max-w-3xl w-full"
              onClick={e => e.stopPropagation()}
            >
              <div
                className="aspect-[4/3] rounded-lg overflow-hidden flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${selected.color}55 0%, ${selected.color}22 50%, var(--color-base-card) 100%)` }}
              >
                <span className="text-[120px] opacity-30">
                  {categories.find(c => c.slug === selected.category)?.icon}
                </span>
              </div>
              <p className="text-[var(--color-base-ivory)] text-lg font-serif mt-4 text-center">{selected.caption}</p>
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute -top-10 right-0 text-[var(--color-base-muted)] hover:text-[var(--color-gold)] text-2xl"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { products, formatPrice } from '@/data/products';
import { categories, getCategoryBySlug } from '@/data/categories';
import { fadeUp, staggerContainer, staggerItem } from '@/lib/animations';
import type { Product } from '@/types';

function ProductCard({ product }: { product: Product }) {
  const cat = getCategoryBySlug(product.category);
  return (
    <Link href={`/product/${product.slug}`} className="group block">
      <div className="card overflow-hidden">
        <div className="relative aspect-[4/5] bg-gradient-to-br from-[var(--color-base-card)] to-[var(--color-base-card-hover)] overflow-hidden">
          <div
            className="absolute inset-0 flex items-center justify-center transition-transform duration-500 group-hover:scale-105"
            style={{
              background: `linear-gradient(135deg, ${cat?.color ?? '#333'}33 0%, var(--color-base-card) 100%)`,
            }}
          >
            <span className="text-6xl opacity-30">{cat?.icon}</span>
          </div>
          <div className="absolute top-3 left-3 flex gap-2">
            {product.bestseller && (
              <span className="px-2 py-1 bg-[var(--color-gold)] text-black text-[10px] uppercase tracking-wider font-bold rounded-sm">
                Bestseller
              </span>
            )}
            {product.newArrival && (
              <span className="px-2 py-1 bg-[var(--color-emerald)] text-white text-[10px] uppercase tracking-wider font-bold rounded-sm">
                New
              </span>
            )}
          </div>
          <div className="absolute inset-0 border-2 border-[var(--color-gold)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
        <div className="p-4">
          <p className="text-[10px] uppercase tracking-wider text-[var(--color-gold)] mb-1">{cat?.name}</p>
          <h3 className="font-serif text-lg text-[var(--color-base-ivory)] group-hover:text-[var(--color-gold)] transition-colors mb-2 line-clamp-1">
            {product.name}
          </h3>
          <p className="text-sm text-[var(--color-base-muted)] line-clamp-2 mb-3">{product.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-[var(--color-gold)] font-semibold">
              {product.priceNote ? `From ${formatPrice(product.basePrice)}` : formatPrice(product.basePrice)}
            </span>
            {product.rating && <span className="text-xs text-[var(--color-base-muted)]">⭐ {product.rating}</span>}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  let filtered = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category === selectedCategory);

  if (sortBy === 'price-low') filtered = [...filtered].sort((a, b) => a.basePrice - b.basePrice);
  else if (sortBy === 'price-high') filtered = [...filtered].sort((a, b) => b.basePrice - a.basePrice);
  else if (sortBy === 'newest') filtered = [...filtered].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  else filtered = [...filtered].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));

  return (
    <div className="pt-20">
      {/* Hero Banner */}
      <section className="py-16 sm:py-24 text-center border-b border-[var(--color-base-border)]">
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <p className="text-[var(--color-gold)] text-sm uppercase tracking-[0.3em] mb-4">Our Collection</p>
          <h1 className="font-serif text-5xl sm:text-6xl font-bold text-[var(--color-base-ivory)] mb-4">Shop All</h1>
          <p className="text-[var(--color-base-muted)] text-lg max-w-xl mx-auto">
            Browse our curated collection of handmade gifts, each crafted with love and attention to detail.
          </p>
          <div className="gold-divider w-24 mx-auto mt-6" />
        </motion.div>
      </section>

      <section ref={ref} className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
          {/* Category Pills */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-medium rounded-sm border transition-all ${
                selectedCategory === 'all'
                  ? 'bg-[var(--color-gold)] text-black border-[var(--color-gold)]'
                  : 'bg-transparent text-[var(--color-base-muted)] border-[var(--color-base-border)] hover:border-[var(--color-gold)]/50'
              }`}
            >
              All ({products.length})
            </button>
            {categories.map(cat => {
              const count = products.filter(p => p.category === cat.slug).length;
              return (
                <button
                  key={cat.slug}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`px-4 py-2 text-xs uppercase tracking-wider font-medium rounded-sm border transition-all ${
                    selectedCategory === cat.slug
                      ? 'bg-[var(--color-gold)] text-black border-[var(--color-gold)]'
                      : 'bg-transparent text-[var(--color-base-muted)] border-[var(--color-base-border)] hover:border-[var(--color-gold)]/50'
                  }`}
                >
                  {cat.name} ({count})
                </button>
              );
            })}
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 bg-[var(--color-base-card)] border border-[var(--color-base-border)] text-[var(--color-base-ivory)] text-sm rounded focus:outline-none focus:border-[var(--color-gold)] cursor-pointer"
          >
            <option value="featured">Featured</option>
            <option value="newest">Newest</option>
            <option value="price-low">Price: Low → High</option>
            <option value="price-high">Price: High → Low</option>
          </select>
        </div>

        {/* Products Grid */}
        <motion.div
          key={selectedCategory + sortBy}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filtered.map(product => (
            <motion.div key={product.id} variants={staggerItem}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-[var(--color-base-muted)] text-lg">No products found in this category.</p>
            <button onClick={() => setSelectedCategory('all')} className="btn-outline mt-4">
              View All Products
            </button>
          </div>
        )}

        {/* Results count */}
        <p className="text-[var(--color-base-muted)] text-sm mt-8 text-center">
          Showing {filtered.length} of {products.length} products
        </p>
      </section>
    </div>
  );
}

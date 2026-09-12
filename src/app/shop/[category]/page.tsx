'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { products, formatPrice } from '@/data/products';
import { getCategoryBySlug, categories } from '@/data/categories';
import { fadeUp, staggerContainer, staggerItem } from '@/lib/animations';

export default function CategoryPage() {
  const params = useParams();
  const categorySlug = params.category as string;
  const category = getCategoryBySlug(categorySlug);
  const categoryProducts = products.filter(p => p.category === categorySlug);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  if (!category) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-4xl text-[var(--color-base-ivory)] mb-4">Category Not Found</h1>
          <Link href="/shop" className="btn-primary"><span>Back to Shop</span></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      {/* Category Hero */}
      <section
        className="relative py-20 sm:py-28 text-center border-b border-[var(--color-base-border)]"
        style={{
          background: `linear-gradient(135deg, ${category.color}22 0%, var(--color-base-black) 60%)`,
        }}
      >
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <span className="text-5xl mb-4 block">{category.icon}</span>
          <p className="text-[var(--color-gold)] text-sm uppercase tracking-[0.3em] mb-4">Collection</p>
          <h1 className="font-serif text-5xl sm:text-6xl font-bold text-[var(--color-base-ivory)] mb-4">
            {category.name}
          </h1>
          <p className="text-[var(--color-base-muted)] text-lg max-w-2xl mx-auto px-4">
            {category.description}
          </p>
          <div className="gold-divider w-24 mx-auto mt-6" />
          <p className="text-sm text-[var(--color-base-muted)] mt-4">
            {categoryProducts.length} {categoryProducts.length === 1 ? 'product' : 'products'}
          </p>
        </motion.div>
      </section>

      {/* Products */}
      <section ref={ref} className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {categoryProducts.map(product => {
            const cat = getCategoryBySlug(product.category);
            return (
              <motion.div key={product.id} variants={staggerItem}>
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
                      {product.bestseller && (
                        <span className="absolute top-3 left-3 px-2 py-1 bg-[var(--color-gold)] text-black text-[10px] uppercase tracking-wider font-bold rounded-sm">
                          Bestseller
                        </span>
                      )}
                      <div className="absolute inset-0 border-2 border-[var(--color-gold)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                    <div className="p-4">
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
              </motion.div>
            );
          })}
        </motion.div>

        {categoryProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-[var(--color-base-muted)] text-lg mb-4">No products in this category yet.</p>
            <Link href="/shop" className="btn-outline">Browse All Products</Link>
          </div>
        )}
      </section>

      {/* Browse Other Categories */}
      <section className="border-t border-[var(--color-base-border)] py-16">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="font-serif text-2xl text-[var(--color-base-ivory)] mb-8 text-center">Browse Other Categories</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {categories.filter(c => c.slug !== categorySlug).map(c => (
              <Link
                key={c.slug}
                href={`/shop/${c.slug}`}
                className="px-4 py-2 text-xs uppercase tracking-wider font-medium text-[var(--color-base-muted)] border border-[var(--color-base-border)] rounded-sm hover:border-[var(--color-gold)]/50 hover:text-[var(--color-gold)] transition-all"
              >
                {c.icon} {c.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { categories } from '@/data/categories';
import { getFeaturedProducts, formatPrice } from '@/data/products';
import { testimonials } from '@/data/testimonials';
import { fadeUp, staggerContainer, staggerItem } from '@/lib/animations';

// ════════════════════════════════════════════════════════════
// HERO SECTION
// ════════════════════════════════════════════════════════════
function HeroSection() {
  return (
    <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0B0B0C] to-[#111113]" />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(circle at 25% 50%, var(--color-burgundy) 0%, transparent 50%),
                            radial-gradient(circle at 75% 30%, var(--color-emerald) 0%, transparent 50%),
                            radial-gradient(circle at 50% 80%, var(--color-royal-blue) 0%, transparent 40%)`,
        }}
      />
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(var(--color-gold) 1px, transparent 1px),
                            linear-gradient(90deg, var(--color-gold) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Top accent */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="w-20 h-[1px] mx-auto mb-8"
          style={{ background: 'linear-gradient(90deg, transparent, var(--color-gold), transparent)' }}
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="text-[var(--color-gold)] text-sm sm:text-base uppercase tracking-[0.3em] font-medium mb-6"
        >
          Award-Winning Artisan Studio · Est. 2018
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-[0.95]"
        >
          <span className="text-[var(--color-base-ivory)]">Crafting</span>
          <br />
          <span className="gold-text">Timeless</span>
          <br />
          <span className="text-[var(--color-base-ivory)]">Memories</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="text-[var(--color-base-muted)] text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Premium handmade gifts, personalized with love. From embroidered velvet Quran covers
          to luxury wedding hampers — every piece tells your story.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/shop" className="btn-primary text-base px-8 py-4">
            <span>Explore Collection</span>
          </Link>
          <Link href="/custom-order" className="btn-outline text-base px-8 py-4">
            Design Your Own
          </Link>
        </motion.div>

        {/* Bottom gold line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="w-32 h-[1px] mx-auto mt-16"
          style={{ background: 'linear-gradient(90deg, transparent, var(--color-gold), transparent)' }}
        />

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="mt-8"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-5 h-8 border border-[var(--color-gold)]/30 rounded-full mx-auto flex items-start justify-center pt-1.5"
          >
            <div className="w-1 h-2 bg-[var(--color-gold)]/50 rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════
// TRUST STRIP
// ════════════════════════════════════════════════════════════
function TrustStrip() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const stats = [
    { value: '2018', label: 'Established' },
    { value: '28K+', label: 'Happy Followers' },
    { value: '3000+', label: 'Orders Delivered' },
    { value: '🏆', label: 'Award Winner' },
  ];

  return (
    <section ref={ref} className="relative py-16 border-y border-[var(--color-base-border)]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat) => (
            <motion.div key={stat.label} variants={staggerItem} className="text-center">
              <div className="font-serif text-3xl sm:text-4xl font-bold gold-text mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-[var(--color-base-muted)] uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════
// FEATURED CATEGORIES
// ════════════════════════════════════════════════════════════
function FeaturedCategories() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  // Show only the first 6 categories for the homepage
  const displayCategories = categories.slice(0, 6);

  return (
    <section ref={ref} className="py-24 sm:py-32 velvet-overlay">
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeUp}
          className="text-center mb-16"
        >
          <p className="text-[var(--color-gold)] text-sm uppercase tracking-[0.3em] mb-4">Our Collections</p>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[var(--color-base-ivory)] mb-4">
            Explore by Category
          </h2>
          <div className="gold-divider w-24 mx-auto" />
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {displayCategories.map((cat) => (
            <motion.div key={cat.slug} variants={staggerItem}>
              <Link
                href={`/shop/${cat.slug}`}
                className="group block relative h-64 sm:h-72 rounded overflow-hidden card"
              >
                {/* Background gradient with jewel tone */}
                <div
                  className="absolute inset-0 transition-all duration-500 group-hover:scale-105"
                  style={{
                    background: `linear-gradient(135deg, ${cat.color}88 0%, ${cat.color}22 60%, var(--color-base-card) 100%)`,
                  }}
                />
                {/* Content */}
                <div className="relative z-10 h-full flex flex-col justify-end p-6">
                  <span className="text-4xl mb-3">{cat.icon}</span>
                  <h3 className="font-serif text-2xl font-semibold text-[var(--color-base-ivory)] mb-2 group-hover:text-[var(--color-gold)] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-sm text-[var(--color-base-muted)] line-clamp-2">
                    {cat.description}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-[var(--color-gold)] text-sm font-medium opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    View Collection
                    <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
                {/* Gold border on hover */}
                <div className="absolute inset-0 border border-transparent group-hover:border-[var(--color-gold)]/30 rounded transition-all duration-500" />
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeUp}
          className="text-center mt-12"
        >
          <Link href="/shop" className="btn-outline px-8">
            View All Categories
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════
// FEATURED PRODUCTS
// ════════════════════════════════════════════════════════════
function FeaturedProducts() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const featured = getFeaturedProducts().slice(0, 4);

  return (
    <section ref={ref} className="py-24 sm:py-32 bg-[var(--color-base-dark)]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeUp}
          className="text-center mb-16"
        >
          <p className="text-[var(--color-gold)] text-sm uppercase tracking-[0.3em] mb-4">Bestsellers</p>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[var(--color-base-ivory)] mb-4">
            Featured Creations
          </h2>
          <div className="gold-divider w-24 mx-auto" />
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {featured.map((product) => (
            <motion.div key={product.id} variants={staggerItem}>
              <Link href={`/product/${product.slug}`} className="group block">
                <div className="card overflow-hidden">
                  {/* Product Image Placeholder */}
                  <div className="relative aspect-[4/5] bg-gradient-to-br from-[var(--color-base-card)] to-[var(--color-base-card-hover)] overflow-hidden">
                    <div
                      className="absolute inset-0 flex items-center justify-center transition-transform duration-500 group-hover:scale-105"
                      style={{
                        background: `linear-gradient(135deg, ${
                          categories.find(c => c.slug === product.category)?.color ?? '#333'
                        }33 0%, var(--color-base-card) 100%)`,
                      }}
                    >
                      <span className="text-6xl opacity-30">
                        {categories.find(c => c.slug === product.category)?.icon}
                      </span>
                    </div>
                    {/* Badges */}
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
                    {/* Gold border sweep on hover */}
                    <div className="absolute inset-0 border-2 border-[var(--color-gold)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  {/* Product Info */}
                  <div className="p-4">
                    <p className="text-[10px] uppercase tracking-wider text-[var(--color-gold)] mb-1">
                      {categories.find(c => c.slug === product.category)?.name}
                    </p>
                    <h3 className="font-serif text-lg text-[var(--color-base-ivory)] group-hover:text-[var(--color-gold)] transition-colors mb-2 line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-sm text-[var(--color-base-muted)] line-clamp-2 mb-3">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-[var(--color-gold)] font-semibold">
                        {product.priceNote ? `From ${formatPrice(product.basePrice)}` : formatPrice(product.basePrice)}
                      </span>
                      {product.rating && (
                        <span className="text-xs text-[var(--color-base-muted)]">
                          ⭐ {product.rating}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeUp}
          className="text-center mt-12"
        >
          <Link href="/shop" className="btn-primary px-10">
            <span>Shop All Products</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════
// AWARDS TEASER
// ════════════════════════════════════════════════════════════
function AwardsTeaser() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="py-24 sm:py-32">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Award Content */}
          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={fadeUp}
          >
            <p className="text-[var(--color-gold)] text-sm uppercase tracking-[0.3em] mb-4">Recognition</p>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[var(--color-base-ivory)] mb-6">
              Award-Winning
              <br />
              <span className="gold-text">Craftsmanship</span>
            </h2>
            <div className="gold-divider w-20" />
            <p className="text-[var(--color-base-muted)] text-lg leading-relaxed mb-6">
              Recognized as the <strong className="text-[var(--color-base-ivory)]">&quot;Innovative Best Craft Designer of the Year&quot;</strong> at the
              Iconic Women Federation Awards 2023. Our commitment to quality and creativity has been
              celebrated on national stages.
            </p>
            <Link href="/awards" className="btn-outline">
              View All Awards
            </Link>
          </motion.div>

          {/* Right: Trophy Visual */}
          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={fadeUp}
            className="relative"
          >
            <div className="relative aspect-[4/3] rounded overflow-hidden border border-[var(--color-gold)]/20">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-gold)]/10 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-8xl mb-4">🏆</div>
                  <p className="font-serif text-2xl text-[var(--color-gold)] font-semibold">IWF Award 2023</p>
                  <p className="text-[var(--color-base-muted)] text-sm mt-2">Innovative Best Craft Designer</p>
                </div>
              </div>
              {/* Decorative corner accents */}
              <div className="absolute top-3 left-3 w-8 h-8 border-l border-t border-[var(--color-gold)]/40" />
              <div className="absolute top-3 right-3 w-8 h-8 border-r border-t border-[var(--color-gold)]/40" />
              <div className="absolute bottom-3 left-3 w-8 h-8 border-l border-b border-[var(--color-gold)]/40" />
              <div className="absolute bottom-3 right-3 w-8 h-8 border-r border-b border-[var(--color-gold)]/40" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════
// TESTIMONIALS
// ════════════════════════════════════════════════════════════
function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="py-24 sm:py-32 bg-[var(--color-base-dark)]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeUp}
          className="text-center mb-16"
        >
          <p className="text-[var(--color-gold)] text-sm uppercase tracking-[0.3em] mb-4">Testimonials</p>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[var(--color-base-ivory)] mb-4">
            What Our Customers Say
          </h2>
          <div className="gold-divider w-24 mx-auto" />
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {testimonials.slice(0, 3).map((testimonial) => (
            <motion.div key={testimonial.id} variants={staggerItem}>
              <div className="card p-6 h-full flex flex-col">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <span key={i} className="text-[var(--color-gold)]">★</span>
                  ))}
                </div>
                {/* Quote */}
                <p className="text-[var(--color-base-muted)] text-sm leading-relaxed flex-1 mb-6">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-[var(--color-base-border)]">
                  <div className="w-10 h-10 rounded-full bg-[var(--color-gold)]/20 flex items-center justify-center">
                    <span className="font-serif text-[var(--color-gold)] font-bold">
                      {testimonial.customerName.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[var(--color-base-ivory)]">
                      {testimonial.customerName}
                    </p>
                    <p className="text-xs text-[var(--color-base-muted)]">Verified Customer</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════
// CTA SECTION
// ════════════════════════════════════════════════════════════
function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="py-24 sm:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-gold)]/5 to-transparent" />
      
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeUp}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--color-base-ivory)] mb-6">
            Have Something <span className="gold-text">Special</span> in Mind?
          </h2>
          <p className="text-lg text-[var(--color-base-muted)] mb-10 leading-relaxed">
            Whether it&apos;s a dream wedding gift, a personalized keepsake, or a bespoke corporate present — 
            we bring your vision to life. Chat with us on WhatsApp to start designing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/94764248989?text=Hi%20Z%20Craft!%20I'd%20like%20to%20discuss%20a%20custom%20order.%20🎁"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp text-base px-8 py-4"
            >
              💬 Chat on WhatsApp
            </a>
            <Link href="/custom-order" className="btn-outline text-base px-8 py-4">
              Custom Order Form
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════
// HOME PAGE
// ════════════════════════════════════════════════════════════
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustStrip />
      <FeaturedCategories />
      <FeaturedProducts />
      <AwardsTeaser />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}

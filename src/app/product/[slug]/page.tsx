'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getProductBySlug, products, formatPrice } from '@/data/products';
import { getCategoryBySlug } from '@/data/categories';
import { useCart } from '@/context/CartContext';
import { fadeUp, staggerContainer, staggerItem } from '@/lib/animations';
import type { SwatchOption } from '@/types';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const product = getProductBySlug(slug);
  const { addItem } = useCart();

  const [customizations, setCustomizations] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-4xl text-[var(--color-base-ivory)] mb-4">Product Not Found</h1>
          <p className="text-[var(--color-base-muted)] mb-6">The product you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/shop" className="btn-primary"><span>Back to Shop</span></Link>
        </div>
      </div>
    );
  }

  const category = getCategoryBySlug(product.category);

  const handleFieldChange = (key: string, value: string) => {
    setCustomizations(prev => ({ ...prev, [key]: value }));
  };

  const handleAddToCart = () => {
    addItem(product, customizations, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2500);
  };

  // Related products (same category, exclude current)
  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="pt-20">
      {/* Breadcrumb */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4 border-b border-[var(--color-base-border)]">
        <nav className="flex items-center gap-2 text-sm text-[var(--color-base-muted)]">
          <Link href="/" className="hover:text-[var(--color-gold)] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-[var(--color-gold)] transition-colors">Shop</Link>
          <span>/</span>
          <Link href={`/shop/${product.category}`} className="hover:text-[var(--color-gold)] transition-colors">
            {category?.name}
          </Link>
          <span>/</span>
          <span className="text-[var(--color-base-ivory)]">{product.name}</span>
        </nav>
      </div>

      {/* Product Content */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: Product Images */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <div
              className="relative aspect-square rounded overflow-hidden border border-[var(--color-base-border)]"
              style={{
                background: `linear-gradient(135deg, ${category?.color ?? '#333'}22 0%, var(--color-base-card) 100%)`,
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[120px] opacity-20">{category?.icon}</span>
              </div>
              {/* Badges */}
              <div className="absolute top-4 left-4 flex gap-2">
                {product.bestseller && (
                  <span className="px-3 py-1.5 bg-[var(--color-gold)] text-black text-xs uppercase tracking-wider font-bold rounded-sm">
                    Bestseller
                  </span>
                )}
                {product.newArrival && (
                  <span className="px-3 py-1.5 bg-[var(--color-emerald)] text-white text-xs uppercase tracking-wider font-bold rounded-sm">
                    New Arrival
                  </span>
                )}
              </div>
              {/* Corner accents */}
              <div className="absolute top-3 left-3 w-10 h-10 border-l border-t border-[var(--color-gold)]/30" />
              <div className="absolute top-3 right-3 w-10 h-10 border-r border-t border-[var(--color-gold)]/30" />
              <div className="absolute bottom-3 left-3 w-10 h-10 border-l border-b border-[var(--color-gold)]/30" />
              <div className="absolute bottom-3 right-3 w-10 h-10 border-r border-b border-[var(--color-gold)]/30" />
            </div>
          </motion.div>

          {/* Right: Product Info + Customization Form */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="flex flex-col">
            {/* Category badge */}
            <Link
              href={`/shop/${product.category}`}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[var(--color-gold)] mb-3 hover:text-[var(--color-gold-light)] transition-colors w-fit"
            >
              {category?.icon} {category?.name}
            </Link>

            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[var(--color-base-ivory)] mb-4">
              {product.name}
            </h1>

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className={i < Math.floor(product.rating!) ? 'text-[var(--color-gold)]' : 'text-[var(--color-base-border)]'}>
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-sm text-[var(--color-base-muted)]">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>
            )}

            {/* Price */}
            <div className="mb-6">
              <span className="text-2xl font-semibold gold-text">
                {product.priceNote ? `From ${formatPrice(product.basePrice)}` : formatPrice(product.basePrice)}
              </span>
              {product.priceNote && (
                <p className="text-sm text-[var(--color-base-muted)] mt-1">{product.priceNote}</p>
              )}
            </div>

            <div className="gold-divider" />

            {/* Description */}
            <p className="text-[var(--color-base-muted)] leading-relaxed mb-6">
              {product.longDescription || product.description}
            </p>

            {/* Delivery Estimate */}
            {product.deliveryEstimate && (
              <div className="flex items-center gap-2 text-sm text-[var(--color-base-muted)] mb-6">
                <span>🚚</span>
                <span>Estimated delivery: <strong className="text-[var(--color-base-ivory)]">{product.deliveryEstimate}</strong></span>
              </div>
            )}

            {/* Customization Form */}
            {product.customizationFields.length > 0 && (
              <div className="space-y-5 mb-8">
                <h3 className="font-serif text-lg text-[var(--color-base-ivory)]">Personalize Your Order</h3>
                {product.customizationFields.map(field => (
                  <div key={field.key}>
                    <label className="block text-sm font-medium text-[var(--color-base-ivory)] mb-2">
                      {field.label}
                      {field.optional && <span className="text-[var(--color-base-muted)] font-normal ml-1">(Optional)</span>}
                    </label>

                    {field.type === 'text' && (
                      <input
                        type="text"
                        value={customizations[field.key] || ''}
                        onChange={(e) => handleFieldChange(field.key, e.target.value)}
                        maxLength={field.maxLength}
                        placeholder={field.placeholder}
                        className="w-full px-4 py-3 bg-[var(--color-base-card)] border border-[var(--color-base-border)] text-[var(--color-base-ivory)] rounded focus:outline-none focus:border-[var(--color-gold)] transition-colors text-sm"
                      />
                    )}

                    {field.type === 'textarea' && (
                      <textarea
                        value={customizations[field.key] || ''}
                        onChange={(e) => handleFieldChange(field.key, e.target.value)}
                        placeholder={field.placeholder}
                        rows={3}
                        className="w-full px-4 py-3 bg-[var(--color-base-card)] border border-[var(--color-base-border)] text-[var(--color-base-ivory)] rounded focus:outline-none focus:border-[var(--color-gold)] transition-colors text-sm resize-none"
                      />
                    )}

                    {field.type === 'select' && (
                      <select
                        value={customizations[field.key] || ''}
                        onChange={(e) => handleFieldChange(field.key, e.target.value)}
                        className="w-full px-4 py-3 bg-[var(--color-base-card)] border border-[var(--color-base-border)] text-[var(--color-base-ivory)] rounded focus:outline-none focus:border-[var(--color-gold)] transition-colors text-sm cursor-pointer"
                      >
                        <option value="">Select {field.label}...</option>
                        {(field.options as string[])?.map(opt => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    )}

                    {field.type === 'swatch' && (
                      <div className="flex flex-wrap gap-3">
                        {(field.options as SwatchOption[])?.map(opt => (
                          <button
                            key={opt.value}
                            onClick={() => handleFieldChange(field.key, opt.value)}
                            className={`flex items-center gap-2 px-3 py-2 rounded border transition-all text-sm ${
                              customizations[field.key] === opt.value
                                ? 'border-[var(--color-gold)] bg-[var(--color-gold)]/10'
                                : 'border-[var(--color-base-border)] hover:border-[var(--color-gold)]/50'
                            }`}
                          >
                            <span
                              className="w-5 h-5 rounded-full border border-white/20"
                              style={{ backgroundColor: opt.hex }}
                            />
                            <span className="text-[var(--color-base-ivory)]">{opt.label}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Quantity + Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-4 mt-auto">
              <div className="flex items-center border border-[var(--color-base-border)] rounded">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 text-[var(--color-base-muted)] hover:text-[var(--color-gold)] transition-colors"
                >
                  −
                </button>
                <span className="px-4 py-3 text-[var(--color-base-ivory)] font-medium min-w-[3rem] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-3 text-[var(--color-base-muted)] hover:text-[var(--color-gold)] transition-colors"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className={`flex-1 py-3 px-8 font-semibold text-sm uppercase tracking-wider rounded transition-all ${
                  addedToCart
                    ? 'bg-[var(--color-success)] text-white'
                    : 'bg-[var(--color-gold)] text-black hover:bg-[var(--color-gold-light)]'
                }`}
              >
                {addedToCart ? '✓ Added to Request' : 'Add to Request'}
              </button>
            </div>

            {/* WhatsApp Direct */}
            <a
              href={`https://wa.me/94764248989?text=${encodeURIComponent(`Hi Z Craft! I'm interested in: ${product.name} (${formatPrice(product.basePrice)})`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp w-full mt-3 justify-center"
            >
              💬 Inquire on WhatsApp
            </a>
          </motion.div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="border-t border-[var(--color-base-border)] py-16">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-2xl text-[var(--color-base-ivory)] mb-8 text-center">You May Also Like</h2>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {related.map(p => {
                const cat = getCategoryBySlug(p.category);
                return (
                  <motion.div key={p.id} variants={staggerItem}>
                    <Link href={`/product/${p.slug}`} className="group block">
                      <div className="card overflow-hidden">
                        <div
                          className="relative aspect-[4/5] flex items-center justify-center transition-transform duration-500 group-hover:scale-[1.02]"
                          style={{ background: `linear-gradient(135deg, ${cat?.color ?? '#333'}22 0%, var(--color-base-card) 100%)` }}
                        >
                          <span className="text-5xl opacity-20">{cat?.icon}</span>
                        </div>
                        <div className="p-3">
                          <h4 className="font-serif text-sm text-[var(--color-base-ivory)] group-hover:text-[var(--color-gold)] transition-colors line-clamp-1">
                            {p.name}
                          </h4>
                          <span className="text-[var(--color-gold)] text-sm">{formatPrice(p.basePrice)}</span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
}

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { formatLKR, generateWhatsAppLink, formatOrderForWhatsApp } from '@/lib/utils';
import { getCategoryBySlug } from '@/data/categories';
import { fadeUp } from '@/lib/animations';

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, totalEstimate } = useCart();
  const [customerInfo, setCustomerInfo] = useState({
    name: '', phone: '', email: '', address: '', notes: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = formatOrderForWhatsApp(
      items.map(item => ({
        productName: item.product.name,
        quantity: item.quantity,
        customizations: item.customizations,
        price: item.product.basePrice,
      })),
      customerInfo
    );
    const link = generateWhatsAppLink(message);
    setSubmitted(true);
    window.open(link, '_blank');
  };

  if (items.length === 0 && !submitted) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center px-4">
          <div className="text-6xl mb-6">🛍️</div>
          <h1 className="font-serif text-3xl text-[var(--color-base-ivory)] mb-4">Your Request is Empty</h1>
          <p className="text-[var(--color-base-muted)] mb-8 max-w-md mx-auto">
            Browse our collections and add items to your custom order request.
          </p>
          <Link href="/shop" className="btn-primary"><span>Explore Collection</span></Link>
        </motion.div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center px-4 max-w-lg mx-auto">
          <div className="text-6xl mb-6">✅</div>
          <h1 className="font-serif text-3xl text-[var(--color-base-ivory)] mb-4">Order Sent!</h1>
          <p className="text-[var(--color-base-muted)] mb-4">
            Your custom order request has been sent via WhatsApp. Our team will review your order and get back to you shortly.
          </p>
          <p className="text-sm text-[var(--color-gold)] mb-8">
            If WhatsApp didn&apos;t open, please contact us at +94 76 424 8989
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/shop" className="btn-primary"><span>Continue Shopping</span></Link>
            <button onClick={() => { clearCart(); setSubmitted(false); }} className="btn-outline">
              New Order
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      <section className="py-12 border-b border-[var(--color-base-border)] text-center">
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <p className="text-[var(--color-gold)] text-sm uppercase tracking-[0.3em] mb-4">Review & Submit</p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[var(--color-base-ivory)]">Your Order Request</h1>
          <div className="gold-divider w-24 mx-auto mt-6" />
        </motion.div>
      </section>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map(item => {
              const cat = getCategoryBySlug(item.product.category);
              return (
                <motion.div key={item.id} layout className="card p-4 sm:p-6">
                  <div className="flex gap-4">
                    {/* Mini Product Image */}
                    <div
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded flex-shrink-0 flex items-center justify-center"
                      style={{ background: `linear-gradient(135deg, ${cat?.color ?? '#333'}33 0%, var(--color-base-card) 100%)` }}
                    >
                      <span className="text-3xl opacity-30">{cat?.icon}</span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <Link href={`/product/${item.product.slug}`} className="font-serif text-lg text-[var(--color-base-ivory)] hover:text-[var(--color-gold)] transition-colors line-clamp-1">
                            {item.product.name}
                          </Link>
                          <p className="text-xs text-[var(--color-gold)] uppercase tracking-wider">{cat?.name}</p>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-[var(--color-base-muted)] hover:text-[var(--color-error)] transition-colors text-sm flex-shrink-0"
                          aria-label="Remove item"
                        >
                          ✕
                        </button>
                      </div>

                      {/* Customizations */}
                      {Object.entries(item.customizations).filter(([, v]) => v).length > 0 && (
                        <div className="mt-2 space-y-1">
                          {Object.entries(item.customizations).filter(([, v]) => v).map(([key, value]) => (
                            <p key={key} className="text-xs text-[var(--color-base-muted)]">
                              <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>: <span className="text-[var(--color-base-ivory)]">{value}</span>
                            </p>
                          ))}
                        </div>
                      )}

                      {/* Quantity + Price */}
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-[var(--color-base-border)] rounded text-sm">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-3 py-1 text-[var(--color-base-muted)] hover:text-[var(--color-gold)]">−</button>
                          <span className="px-3 py-1 text-[var(--color-base-ivory)]">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 py-1 text-[var(--color-base-muted)] hover:text-[var(--color-gold)]">+</button>
                        </div>
                        <span className="text-[var(--color-gold)] font-semibold">{formatLKR(item.product.basePrice * item.quantity)}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Order Summary + Customer Info */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-24">
              <h3 className="font-serif text-xl text-[var(--color-base-ivory)] mb-4">Order Summary</h3>
              <div className="space-y-2 mb-4 text-sm">
                <div className="flex justify-between text-[var(--color-base-muted)]">
                  <span>Items ({items.length})</span>
                  <span>{formatLKR(totalEstimate)}</span>
                </div>
                <div className="flex justify-between text-[var(--color-base-muted)]">
                  <span>Delivery</span>
                  <span>Calculated after</span>
                </div>
              </div>
              <div className="gold-divider" />
              <div className="flex justify-between text-lg font-semibold mb-6">
                <span className="text-[var(--color-base-ivory)]">Estimated Total</span>
                <span className="gold-text">{formatLKR(totalEstimate)}</span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <h4 className="font-serif text-lg text-[var(--color-base-ivory)]">Your Details</h4>
                <input
                  required
                  value={customerInfo.name}
                  onChange={e => setCustomerInfo(p => ({ ...p, name: e.target.value }))}
                  placeholder="Full Name *"
                  className="w-full px-4 py-3 bg-[var(--color-base-dark)] border border-[var(--color-base-border)] text-[var(--color-base-ivory)] rounded text-sm focus:outline-none focus:border-[var(--color-gold)] transition-colors"
                />
                <input
                  required
                  value={customerInfo.phone}
                  onChange={e => setCustomerInfo(p => ({ ...p, phone: e.target.value }))}
                  placeholder="Phone / WhatsApp *"
                  className="w-full px-4 py-3 bg-[var(--color-base-dark)] border border-[var(--color-base-border)] text-[var(--color-base-ivory)] rounded text-sm focus:outline-none focus:border-[var(--color-gold)] transition-colors"
                />
                <input
                  type="email"
                  value={customerInfo.email}
                  onChange={e => setCustomerInfo(p => ({ ...p, email: e.target.value }))}
                  placeholder="Email"
                  className="w-full px-4 py-3 bg-[var(--color-base-dark)] border border-[var(--color-base-border)] text-[var(--color-base-ivory)] rounded text-sm focus:outline-none focus:border-[var(--color-gold)] transition-colors"
                />
                <input
                  value={customerInfo.address}
                  onChange={e => setCustomerInfo(p => ({ ...p, address: e.target.value }))}
                  placeholder="Delivery Address"
                  className="w-full px-4 py-3 bg-[var(--color-base-dark)] border border-[var(--color-base-border)] text-[var(--color-base-ivory)] rounded text-sm focus:outline-none focus:border-[var(--color-gold)] transition-colors"
                />
                <textarea
                  value={customerInfo.notes}
                  onChange={e => setCustomerInfo(p => ({ ...p, notes: e.target.value }))}
                  placeholder="Additional notes..."
                  rows={3}
                  className="w-full px-4 py-3 bg-[var(--color-base-dark)] border border-[var(--color-base-border)] text-[var(--color-base-ivory)] rounded text-sm focus:outline-none focus:border-[var(--color-gold)] transition-colors resize-none"
                />

                <button type="submit" className="btn-whatsapp w-full justify-center py-4">
                  💬 Send Order via WhatsApp
                </button>
                <p className="text-xs text-[var(--color-base-muted)] text-center">
                  Your order details will be sent to our WhatsApp for confirmation
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

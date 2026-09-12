'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer, staggerItem } from '@/lib/animations';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would write to Firestore or send an email
    setSent(true);
  };

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="py-16 sm:py-24 text-center border-b border-[var(--color-base-border)]">
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <p className="text-[var(--color-gold)] text-sm uppercase tracking-[0.3em] mb-4">Let&apos;s Connect</p>
          <h1 className="font-serif text-5xl sm:text-6xl font-bold text-[var(--color-base-ivory)] mb-4">Get in Touch</h1>
          <p className="text-[var(--color-base-muted)] text-lg max-w-xl mx-auto px-4">
            Have a question, special request, or just want to say hi? We&apos;d love to hear from you.
          </p>
          <div className="gold-divider w-24 mx-auto mt-6" />
        </motion.div>
      </section>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.div variants={staggerItem}>
              <h2 className="font-serif text-3xl text-[var(--color-base-ivory)] mb-8">
                We&apos;re Here to Help
              </h2>
            </motion.div>

            {/* WhatsApp - Primary */}
            <motion.a
              variants={staggerItem}
              href="https://wa.me/94764248989?text=Hi%20Z%20Craft!%20I%20have%20a%20question%20about..."
              target="_blank"
              rel="noopener noreferrer"
              className="block mb-6 p-6 rounded border border-[var(--color-success)]/30 bg-[var(--color-success)]/5 hover:bg-[var(--color-success)]/10 transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-[var(--color-success)] flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">💬</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[var(--color-base-ivory)] group-hover:text-[var(--color-success)] transition-colors">
                    WhatsApp Us
                  </h3>
                  <p className="text-[var(--color-base-muted)] text-sm">Fastest way to reach us • Usually replies within minutes</p>
                  <p className="text-[var(--color-success)] font-medium mt-1">+94 76 424 8989</p>
                </div>
              </div>
            </motion.a>

            {/* Contact Cards */}
            <motion.div variants={staggerItem} className="space-y-4">
              {[
                { icon: '📍', title: 'Location', detail: 'Puttalam, Sri Lanka', sub: 'Island-wide delivery available' },
                { icon: '📞', title: 'Phone', detail: '+94 76 424 8989', sub: 'Available 9AM – 9PM daily' },
                { icon: '📸', title: 'Instagram', detail: '@z_craft.lk', sub: '28K+ followers', link: 'https://www.instagram.com/z_craft.lk' },
                { icon: '🎵', title: 'TikTok', detail: '@z_craft.lk', sub: '38.8K followers', link: 'https://www.tiktok.com/@z_craft.lk' },
              ].map(item => (
                <div key={item.title} className="card p-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[var(--color-gold)]/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">{item.icon}</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-[var(--color-base-ivory)] text-sm">{item.title}</h4>
                    {item.link ? (
                      <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-[var(--color-gold)] hover:text-[var(--color-gold-light)] transition-colors">
                        {item.detail}
                      </a>
                    ) : (
                      <p className="text-[var(--color-base-ivory)]">{item.detail}</p>
                    )}
                    <p className="text-xs text-[var(--color-base-muted)]">{item.sub}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            {sent ? (
              <div className="card p-8 text-center h-full flex flex-col items-center justify-center">
                <div className="text-6xl mb-6">✅</div>
                <h3 className="font-serif text-2xl text-[var(--color-base-ivory)] mb-4">Message Sent!</h3>
                <p className="text-[var(--color-base-muted)] mb-6">
                  Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                </p>
                <button onClick={() => { setSent(false); setForm({ name: '', email: '', subject: '', message: '' }); }}
                  className="btn-outline">Send Another Message</button>
              </div>
            ) : (
              <div className="card p-6 sm:p-8">
                <h3 className="font-serif text-2xl text-[var(--color-base-ivory)] mb-6">Send a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <input
                      required
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      placeholder="Your Name *"
                      className="w-full px-4 py-3 bg-[var(--color-base-dark)] border border-[var(--color-base-border)] text-[var(--color-base-ivory)] rounded text-sm focus:outline-none focus:border-[var(--color-gold)] transition-colors"
                    />
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      placeholder="Email Address *"
                      className="w-full px-4 py-3 bg-[var(--color-base-dark)] border border-[var(--color-base-border)] text-[var(--color-base-ivory)] rounded text-sm focus:outline-none focus:border-[var(--color-gold)] transition-colors"
                    />
                  </div>
                  <input
                    value={form.subject}
                    onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                    placeholder="Subject"
                    className="w-full px-4 py-3 bg-[var(--color-base-dark)] border border-[var(--color-base-border)] text-[var(--color-base-ivory)] rounded text-sm focus:outline-none focus:border-[var(--color-gold)] transition-colors"
                  />
                  <textarea
                    required
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    placeholder="Your message... *"
                    rows={6}
                    className="w-full px-4 py-3 bg-[var(--color-base-dark)] border border-[var(--color-base-border)] text-[var(--color-base-ivory)] rounded text-sm focus:outline-none focus:border-[var(--color-gold)] transition-colors resize-none"
                  />
                  <button type="submit" className="btn-primary w-full py-4">
                    <span>Send Message</span>
                  </button>
                  <p className="text-xs text-[var(--color-base-muted)] text-center">
                    For faster responses, use WhatsApp 💬
                  </p>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

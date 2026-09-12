'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { fadeUp, staggerContainer, staggerItem } from '@/lib/animations';

const milestones = [
  { year: '2018', title: 'The Beginning', desc: 'Z Craft was born from a passion for handmade artistry — starting with simple embroidered gifts from a small home studio in Puttalam.' },
  { year: '2019', title: 'Growing Community', desc: 'Word spread through Instagram and WhatsApp. Our first 1,000 followers showed us the demand for personalized, handcrafted gifts in Sri Lanka.' },
  { year: '2020', title: 'Expanding Horizons', desc: 'Introduced wedding hampers, Nikah Nama frames, and resin art to our collection. Island-wide delivery launched.' },
  { year: '2022', title: 'National Recognition', desc: 'Won the Best Customized Gift Designer award, validating years of dedication to quality and innovation.' },
  { year: '2023', title: 'IWF Award Winner', desc: 'Received the "Innovative Best Craft Designer of the Year" at the prestigious Iconic Women Federation Awards ceremony at BMICH, Colombo.' },
  { year: '2024', title: '28K+ Strong', desc: 'Grew to over 28,000 Instagram followers and 3,000+ orders delivered. Launched luxury suitcase hampers and premium resin collections.' },
];

const values = [
  { icon: '✨', title: 'Handmade Quality', desc: 'Every piece is handcrafted with meticulous attention to detail. No mass production — each item is unique.' },
  { icon: '💝', title: 'Personal Touch', desc: 'We specialize in personalization — your names, dates, and messages embedded into every creation.' },
  { icon: '🏆', title: 'Award-Winning', desc: 'Nationally recognized for innovation in craft design, setting the standard for premium handmade gifts.' },
  { icon: '🚚', title: 'Island-wide Delivery', desc: 'Reliable delivery across all of Sri Lanka. Your gifts arrive safely, beautifully packaged and on time.' },
];

export default function AboutPage() {
  const timelineRef = useRef(null);
  const timelineInView = useInView(timelineRef, { once: true, margin: '-80px' });
  const valuesRef = useRef(null);
  const valuesInView = useInView(valuesRef, { once: true, margin: '-80px' });

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-24 sm:py-32 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-gold)]/5 to-transparent" />
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="relative z-10 max-w-3xl mx-auto px-4">
          <p className="text-[var(--color-gold)] text-sm uppercase tracking-[0.3em] mb-4">Our Story</p>
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-[var(--color-base-ivory)] mb-6">
            Crafting <span className="gold-text">Dreams</span>
            <br />Since 2018
          </h1>
          <p className="text-[var(--color-base-muted)] text-lg leading-relaxed">
            Z Craft is an artisanal gift studio based in Puttalam, Sri Lanka, founded by <strong className="text-[var(--color-base-ivory)]">Nadhwa Zainub</strong> — 
            a passionate craftswoman who turned her love for handmade art into an award-winning business.
            What started as a small home studio has grown into a beloved brand trusted by thousands for their most meaningful gift-giving moments.
          </p>
          <div className="gold-divider w-24 mx-auto mt-8" />
        </motion.div>
      </section>

      {/* Values */}
      <section ref={valuesRef} className="py-20 bg-[var(--color-base-dark)] border-y border-[var(--color-base-border)]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" animate={valuesInView ? 'visible' : 'hidden'} variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {values.map(v => (
              <motion.div key={v.title} variants={staggerItem} className="text-center">
                <div className="text-4xl mb-4">{v.icon}</div>
                <h3 className="font-serif text-xl text-[var(--color-base-ivory)] mb-3">{v.title}</h3>
                <p className="text-sm text-[var(--color-base-muted)] leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section ref={timelineRef} className="py-24 sm:py-32">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" animate={timelineInView ? 'visible' : 'hidden'} variants={fadeUp} className="text-center mb-16">
            <p className="text-[var(--color-gold)] text-sm uppercase tracking-[0.3em] mb-4">Our Journey</p>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[var(--color-base-ivory)]">The Z Craft Story</h2>
            <div className="gold-divider w-24 mx-auto mt-6" />
          </motion.div>

          <motion.div initial="hidden" animate={timelineInView ? 'visible' : 'hidden'} variants={staggerContainer}
            className="relative"
          >
            {/* Timeline line */}
            <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-[var(--color-gold)] via-[var(--color-gold)]/30 to-transparent transform sm:-translate-x-1/2" />

            {milestones.map((m, i) => (
              <motion.div key={m.year} variants={staggerItem}
                className={`relative flex items-start mb-12 ${i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}
              >
                {/* Dot */}
                <div className="absolute left-4 sm:left-1/2 w-3 h-3 bg-[var(--color-gold)] rounded-full transform -translate-x-1/2 mt-2 z-10 ring-4 ring-[var(--color-base-black)]" />

                {/* Content */}
                <div className={`ml-12 sm:ml-0 sm:w-[45%] ${i % 2 === 0 ? 'sm:pr-12 sm:text-right' : 'sm:pl-12'}`}>
                  <span className="text-[var(--color-gold)] font-serif text-2xl font-bold">{m.year}</span>
                  <h3 className="font-serif text-xl text-[var(--color-base-ivory)] mt-1 mb-2">{m.title}</h3>
                  <p className="text-sm text-[var(--color-base-muted)] leading-relaxed">{m.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[var(--color-base-dark)] border-t border-[var(--color-base-border)] text-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="max-w-xl mx-auto px-4">
          <h2 className="font-serif text-3xl text-[var(--color-base-ivory)] mb-4">Let&apos;s Create Together</h2>
          <p className="text-[var(--color-base-muted)] mb-8">
            Every order is a collaboration. Tell us your vision, and we&apos;ll bring it to life with our craftsmanship.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/shop" className="btn-primary"><span>Shop Collection</span></Link>
            <Link href="/awards" className="btn-outline">View Awards</Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

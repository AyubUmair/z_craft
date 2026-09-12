'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { awards } from '@/data/awards';
import { fadeUp, staggerContainer, staggerItem } from '@/lib/animations';

export default function AwardsPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-24 sm:py-32 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-gold)]/5 to-transparent" />
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="relative z-10 max-w-3xl mx-auto px-4">
          <p className="text-[var(--color-gold)] text-sm uppercase tracking-[0.3em] mb-4">Recognition</p>
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-[var(--color-base-ivory)] mb-6">
            Awards & <span className="gold-text">Achievements</span>
          </h1>
          <p className="text-[var(--color-base-muted)] text-lg leading-relaxed">
            Our dedication to exceptional craftsmanship has been recognized at national award ceremonies, 
            celebrating innovation and quality in handmade gift design.
          </p>
          <div className="gold-divider w-24 mx-auto mt-8" />
        </motion.div>
      </section>

      {/* Awards Grid */}
      <section ref={ref} className="py-16 sm:py-24">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
            className="space-y-12"
          >
            {awards.map((award, i) => (
              <motion.div key={award.id} variants={staggerItem}>
                <div className={`grid md:grid-cols-2 gap-8 items-center ${i % 2 === 1 ? 'md:[direction:rtl]' : ''}`}>
                  {/* Award Image */}
                  <div className={`${i % 2 === 1 ? 'md:[direction:ltr]' : ''}`}>
                    <div className="relative aspect-[4/3] rounded-lg overflow-hidden group">
                      <div
                        className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[var(--color-gold)]/15 to-[var(--color-base-card)] transition-transform duration-700 group-hover:scale-105"
                        style={{ perspective: '1000px' }}
                      >
                        <div className="text-center transform transition-transform duration-500 group-hover:rotateY-3">
                          <div className="text-8xl mb-4">🏆</div>
                          <p className="font-serif text-xl text-[var(--color-gold)]">{award.year}</p>
                        </div>
                      </div>
                      {/* Gold frame corners */}
                      <div className="absolute top-4 left-4 w-12 h-12 border-l-2 border-t-2 border-[var(--color-gold)]/40" />
                      <div className="absolute top-4 right-4 w-12 h-12 border-r-2 border-t-2 border-[var(--color-gold)]/40" />
                      <div className="absolute bottom-4 left-4 w-12 h-12 border-l-2 border-b-2 border-[var(--color-gold)]/40" />
                      <div className="absolute bottom-4 right-4 w-12 h-12 border-r-2 border-b-2 border-[var(--color-gold)]/40" />
                    </div>
                  </div>

                  {/* Award Info */}
                  <div className={`${i % 2 === 1 ? 'md:[direction:ltr]' : ''}`}>
                    <span className="text-[var(--color-gold)] text-sm uppercase tracking-[0.3em] font-medium">
                      {award.year}
                    </span>
                    <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[var(--color-base-ivory)] mt-2 mb-4">
                      {award.title}
                    </h2>
                    <p className="text-[var(--color-gold)] text-sm uppercase tracking-wider mb-4">
                      {award.organization}
                    </p>
                    <div className="gold-divider w-16" style={{ margin: '1rem 0' }} />
                    <p className="text-[var(--color-base-muted)] leading-relaxed">
                      {award.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-[var(--color-base-dark)] border-y border-[var(--color-base-border)]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '🏆 3', label: 'Awards Won' },
              { value: '28K+', label: 'Instagram Followers' },
              { value: '3000+', label: 'Happy Customers' },
              { value: '6+', label: 'Years of Excellence' },
            ].map(stat => (
              <div key={stat.label}>
                <div className="font-serif text-3xl font-bold gold-text mb-2">{stat.value}</div>
                <div className="text-sm text-[var(--color-base-muted)] uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="max-w-xl mx-auto px-4">
          <h2 className="font-serif text-3xl text-[var(--color-base-ivory)] mb-4">Experience Award-Winning Quality</h2>
          <p className="text-[var(--color-base-muted)] mb-8">
            Every product carries the same passion and quality that earned us national recognition.
          </p>
          <Link href="/shop" className="btn-primary"><span>Shop Our Collection</span></Link>
        </motion.div>
      </section>
    </div>
  );
}

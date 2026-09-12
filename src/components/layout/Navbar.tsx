'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/shop' },
  { label: 'Custom Order', href: '/custom-order' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'About', href: '/about' },
  { label: 'Awards', href: '/awards' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-[500] border-b transition-all duration-300"
        style={{
          backgroundColor: scrolled ? 'rgba(11, 11, 12, 0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'blur(0px)',
          borderBottomColor: scrolled ? 'rgba(201, 162, 39, 0.2)' : 'transparent',
        }}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-full border border-[var(--color-gold)] flex items-center justify-center bg-black/50 group-hover:border-[var(--color-gold-light)] transition-colors">
                <span className="font-serif text-lg font-bold gold-text">ZC</span>
              </div>
              <div className="hidden sm:block">
                <span className="font-serif text-xl font-semibold text-[var(--color-base-ivory)] tracking-wide">
                  Z Craft
                </span>
                <span className="block text-[10px] uppercase tracking-[0.25em] text-[var(--color-base-muted)]">
                  Since 2018
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-[var(--color-base-muted)] hover:text-[var(--color-gold)] transition-colors relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[var(--color-gold)] group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </div>

            {/* Right side: Cart + Mobile Toggle */}
            <div className="flex items-center gap-4">
              {/* Cart Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center gap-2 text-[var(--color-base-muted)] hover:text-[var(--color-gold)] transition-colors"
                aria-label="Open cart"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 01-8 0" />
                </svg>
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[var(--color-gold)] text-black text-[10px] font-bold rounded-full flex items-center justify-center"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </button>

              {/* Mobile Hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden flex flex-col gap-1.5 w-7 p-1"
                aria-label="Toggle menu"
              >
                <motion.span
                  animate={mobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  className="block w-full h-[1.5px] bg-[var(--color-base-ivory)]"
                />
                <motion.span
                  animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="block w-full h-[1.5px] bg-[var(--color-base-ivory)]"
                />
                <motion.span
                  animate={mobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  className="block w-full h-[1.5px] bg-[var(--color-base-ivory)]"
                />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[499] bg-black/95 backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8 pt-20">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-serif text-3xl text-[var(--color-base-ivory)] hover:text-[var(--color-gold)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="gold-divider w-24 mt-4"
              />
              <motion.a
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                href="https://wa.me/94764248989"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp mt-2"
              >
                💬 Chat on WhatsApp
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

import Link from 'next/link';

const quickLinks = [
  { label: 'Shop All', href: '/shop' },
  { label: 'Quran Covers', href: '/shop/quran-covers' },
  { label: 'Wedding Gifts', href: '/shop/wedding-gifts' },
  { label: 'Custom Order', href: '/custom-order' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Awards', href: '/awards' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

const socialLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/z_craft.lk', icon: '📸' },
  { label: 'TikTok', href: 'https://www.tiktok.com/@z_craft.lk', icon: '🎵' },
  { label: 'Facebook', href: '#', icon: '👍' },
  { label: 'WhatsApp', href: 'https://wa.me/94764248989', icon: '💬' },
];

export default function Footer() {
  return (
    <footer className="relative bg-[var(--color-base-dark)] border-t border-[var(--color-base-border)]">
      {/* Gold top divider */}
      <div className="gold-divider-thick" style={{ margin: 0 }} />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full border border-[var(--color-gold)] flex items-center justify-center">
                <span className="font-serif text-xl font-bold gold-text">ZC</span>
              </div>
              <div>
                <span className="font-serif text-2xl font-semibold text-[var(--color-base-ivory)]">Z Craft</span>
                <span className="block text-[10px] uppercase tracking-[0.25em] text-[var(--color-base-muted)]">Handmade with ❤️</span>
              </div>
            </div>
            <p className="text-sm text-[var(--color-base-muted)] leading-relaxed mt-4">
              Crafting premium personalized gifts since 2018. Award-winning artisanal studio specializing in embroidered velvet works, 
              luxury hampers, and custom wooden crafts. Island-wide delivery across Sri Lanka.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg text-[var(--color-base-ivory)] mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--color-base-muted)] hover:text-[var(--color-gold)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-serif text-lg text-[var(--color-base-ivory)] mb-6">Get in Touch</h4>
            <ul className="space-y-4 text-sm text-[var(--color-base-muted)]">
              <li className="flex items-start gap-3">
                <span className="text-lg">📍</span>
                <span>Puttalam, Sri Lanka<br />Island-wide Delivery</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-lg">📞</span>
                <a href="tel:+94764248989" className="hover:text-[var(--color-gold)] transition-colors">
                  +94 76 424 8989
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-lg">💬</span>
                <a
                  href="https://wa.me/94764248989"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--color-success)] transition-colors"
                >
                  WhatsApp Us
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-lg">⏰</span>
                <span>Open Daily: 9AM — 9PM</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-serif text-lg text-[var(--color-base-ivory)] mb-6">Follow Us</h4>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full border border-[var(--color-base-border)] flex items-center justify-center hover:border-[var(--color-gold)] hover:bg-[var(--color-gold-muted)] transition-all"
                  aria-label={link.label}
                >
                  <span className="text-lg">{link.icon}</span>
                </a>
              ))}
            </div>
            <div className="mt-8">
              <h5 className="text-sm font-semibold text-[var(--color-base-ivory)] mb-3 uppercase tracking-wider">
                Newsletter
              </h5>
              <div className="flex">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-2.5 bg-[var(--color-base-card)] border border-[var(--color-base-border)] text-[var(--color-base-ivory)] text-sm rounded-l focus:outline-none focus:border-[var(--color-gold)] transition-colors"
                />
                <button className="px-4 py-2.5 bg-[var(--color-gold)] text-black text-sm font-semibold rounded-r hover:bg-[var(--color-gold-light)] transition-colors">
                  →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[var(--color-base-border)]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--color-base-muted)]">
            © {new Date().getFullYear()} Z Craft. All rights reserved. Handmade in Sri Lanka 🇱🇰
          </p>
          <div className="flex items-center gap-4 text-xs text-[var(--color-base-muted)]">
            <span>🏆 Award-Winning Craft Studio</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">🚚 Island-wide Delivery</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

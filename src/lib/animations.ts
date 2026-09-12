// ============================================================
// Z Craft — Framer Motion Animation Variants
// ============================================================
import type { Variants } from 'framer-motion';

// ── Fade In ─────────────────────────────────────────────────
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

// ── Fade Up (slide up + fade) ───────────────────────────────
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

// ── Fade Down ───────────────────────────────────────────────
export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

// ── Scale Up ────────────────────────────────────────────────
export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

// ── Stagger Container ──────────────────────────────────────
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

// ── Stagger Item (child of stagger container) ──────────────
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

// ── Page Transition ─────────────────────────────────────────
export const pageTransition: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
};

// ── Card Hover ──────────────────────────────────────────────
export const cardHover = {
  rest: {
    y: 0,
    boxShadow: '0 0 0 rgba(0,0,0,0)',
    transition: { duration: 0.3, ease: 'easeOut' },
  },
  hover: {
    y: -6,
    boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
    transition: { duration: 0.3, ease: 'easeOut' },
  },
};

// ── Gold Border Sweep ───────────────────────────────────────
export const goldBorderSweep = {
  rest: {
    clipPath: 'inset(0 100% 0 0)',
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
  hover: {
    clipPath: 'inset(0 0% 0 0)',
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

// ── Scale Pulse (for live preview updates) ──────────────────
export const scalePulse: Variants = {
  idle: { scale: 1 },
  pulse: {
    scale: [1, 1.02, 1],
    transition: { duration: 0.3, ease: 'easeInOut' },
  },
};

// ── Slide In From Left ──────────────────────────────────────
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

// ── Slide In From Right ─────────────────────────────────────
export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

// ── Navbar Reveal ───────────────────────────────────────────
export const navbarVariants = {
  transparent: {
    backgroundColor: 'rgba(11, 11, 12, 0)',
    backdropFilter: 'blur(0px)',
    borderBottomColor: 'rgba(201, 162, 39, 0)',
  },
  solid: {
    backgroundColor: 'rgba(11, 11, 12, 0.95)',
    backdropFilter: 'blur(12px)',
    borderBottomColor: 'rgba(201, 162, 39, 0.3)',
  },
};

// ── Text Reveal (word by word) ──────────────────────────────
export const textRevealContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.04,
    },
  },
};

export const textRevealWord: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    rotateX: -90,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// ── WhatsApp Button Pulse ───────────────────────────────────
export const whatsappPulse = {
  scale: [1, 1.08, 1],
  boxShadow: [
    '0 0 0 0 rgba(37, 211, 102, 0.4)',
    '0 0 0 12px rgba(37, 211, 102, 0)',
    '0 0 0 0 rgba(37, 211, 102, 0)',
  ],
  transition: {
    duration: 1.5,
    repeat: Infinity,
    repeatDelay: 4.5,
    ease: 'easeInOut',
  },
};

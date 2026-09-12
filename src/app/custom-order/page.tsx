'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer, staggerItem } from '@/lib/animations';
import { generateWhatsAppLink } from '@/lib/utils';

const steps = [
  { id: 1, title: 'Occasion' },
  { id: 2, title: 'Item Type' },
  { id: 3, title: 'Details' },
  { id: 4, title: 'Budget & Contact' },
];

const occasions = ['Wedding', 'Engagement', 'Birthday', 'Eid / Ramadan', 'Anniversary', 'Housewarming', 'Corporate', 'Other'];
const itemTypes = ['Gift Hamper', 'Quran Cover', 'Nikah Nama', 'Wooden Nameplate / Craft', 'Photo Frame', 'Resin Art', 'Gift Box', 'Cake Topper', 'Something Else'];
const budgetRanges = ['Under LKR 3,000', 'LKR 3,000 - 5,000', 'LKR 5,000 - 10,000', 'LKR 10,000 - 20,000', 'LKR 20,000 - 50,000', 'LKR 50,000+', 'Not sure — help me decide'];

export default function CustomOrderPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    occasion: '', itemType: '', description: '', budget: '',
    name: '', phone: '', email: '', deliveryDate: '', notes: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    const message = `🎨 *Custom Order Request from Z Craft Website*\n\n` +
      `👤 *Name:* ${form.name}\n📞 *Phone:* ${form.phone}\n📧 *Email:* ${form.email}\n\n` +
      `🎉 *Occasion:* ${form.occasion}\n🎁 *Item Type:* ${form.itemType}\n💰 *Budget:* ${form.budget}\n` +
      (form.deliveryDate ? `📅 *Needed by:* ${form.deliveryDate}\n` : '') +
      `\n📝 *Description:*\n${form.description}\n` +
      (form.notes ? `\n📌 *Notes:* ${form.notes}` : '') +
      `\n\n_Sent via zcraft.lk custom order form_`;

    const link = generateWhatsAppLink(message);
    setSubmitted(true);
    window.open(link, '_blank');
  };

  if (submitted) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center px-4 max-w-lg mx-auto">
          <div className="text-6xl mb-6">🎨</div>
          <h1 className="font-serif text-3xl text-[var(--color-base-ivory)] mb-4">Request Sent!</h1>
          <p className="text-[var(--color-base-muted)] mb-8">
            Your custom order request has been sent via WhatsApp. We&apos;ll review your requirements and get back to you with a design proposal and quote.
          </p>
          <button onClick={() => { setSubmitted(false); setStep(1); setForm({ occasion: '', itemType: '', description: '', budget: '', name: '', phone: '', email: '', deliveryDate: '', notes: '' }); }}
            className="btn-primary"><span>Submit Another Request</span></button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="py-16 text-center border-b border-[var(--color-base-border)]">
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <p className="text-[var(--color-gold)] text-sm uppercase tracking-[0.3em] mb-4">Bespoke Creations</p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[var(--color-base-ivory)] mb-4">Design Your Own</h1>
          <p className="text-[var(--color-base-muted)] text-lg max-w-xl mx-auto px-4">
            Can&apos;t find exactly what you&apos;re looking for? Tell us your vision and we&apos;ll bring it to life.
          </p>
          <div className="gold-divider w-24 mx-auto mt-6" />
        </motion.div>
      </section>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
        {/* Progress Bar */}
        <div className="flex items-center justify-between mb-12">
          {steps.map((s, i) => (
            <div key={s.id} className="flex items-center flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                step >= s.id ? 'bg-[var(--color-gold)] text-black' : 'bg-[var(--color-base-card)] text-[var(--color-base-muted)] border border-[var(--color-base-border)]'
              }`}>
                {step > s.id ? '✓' : s.id}
              </div>
              <span className={`ml-2 text-xs hidden sm:block ${step >= s.id ? 'text-[var(--color-gold)]' : 'text-[var(--color-base-muted)]'}`}>
                {s.title}
              </span>
              {i < steps.length - 1 && (
                <div className={`flex-1 h-[1px] mx-3 ${step > s.id ? 'bg-[var(--color-gold)]' : 'bg-[var(--color-base-border)]'}`} />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Occasion */}
        {step === 1 && (
          <motion.div key="step1" initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.h2 variants={staggerItem} className="font-serif text-2xl text-[var(--color-base-ivory)] mb-6">
              What&apos;s the occasion?
            </motion.h2>
            <div className="grid grid-cols-2 gap-3">
              {occasions.map(occ => (
                <motion.button
                  key={occ}
                  variants={staggerItem}
                  onClick={() => { setForm(f => ({ ...f, occasion: occ })); setStep(2); }}
                  className={`p-4 text-left rounded border transition-all text-sm ${
                    form.occasion === occ
                      ? 'border-[var(--color-gold)] bg-[var(--color-gold)]/10 text-[var(--color-gold)]'
                      : 'border-[var(--color-base-border)] bg-[var(--color-base-card)] text-[var(--color-base-muted)] hover:border-[var(--color-gold)]/50 hover:text-[var(--color-base-ivory)]'
                  }`}
                >
                  {occ}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 2: Item Type */}
        {step === 2 && (
          <motion.div key="step2" initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.h2 variants={staggerItem} className="font-serif text-2xl text-[var(--color-base-ivory)] mb-6">
              What are you looking for?
            </motion.h2>
            <div className="grid grid-cols-2 gap-3">
              {itemTypes.map(type => (
                <motion.button
                  key={type}
                  variants={staggerItem}
                  onClick={() => { setForm(f => ({ ...f, itemType: type })); setStep(3); }}
                  className={`p-4 text-left rounded border transition-all text-sm ${
                    form.itemType === type
                      ? 'border-[var(--color-gold)] bg-[var(--color-gold)]/10 text-[var(--color-gold)]'
                      : 'border-[var(--color-base-border)] bg-[var(--color-base-card)] text-[var(--color-base-muted)] hover:border-[var(--color-gold)]/50 hover:text-[var(--color-base-ivory)]'
                  }`}
                >
                  {type}
                </motion.button>
              ))}
            </div>
            <button onClick={() => setStep(1)} className="mt-6 text-sm text-[var(--color-base-muted)] hover:text-[var(--color-gold)] transition-colors">
              ← Back
            </button>
          </motion.div>
        )}

        {/* Step 3: Details */}
        {step === 3 && (
          <motion.div key="step3" initial="hidden" animate="visible" variants={fadeUp}>
            <h2 className="font-serif text-2xl text-[var(--color-base-ivory)] mb-6">Describe your vision</h2>
            <div className="space-y-4">
              <textarea
                value={form.description}
                onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                placeholder="Tell us what you have in mind — colors, style, text to include, reference ideas..."
                rows={5}
                className="w-full px-4 py-3 bg-[var(--color-base-card)] border border-[var(--color-base-border)] text-[var(--color-base-ivory)] rounded focus:outline-none focus:border-[var(--color-gold)] transition-colors text-sm resize-none"
              />
              <input
                value={form.deliveryDate}
                onChange={e => setForm(f => ({ ...f, deliveryDate: e.target.value }))}
                placeholder="When do you need it? (e.g., March 15, 2025)"
                className="w-full px-4 py-3 bg-[var(--color-base-card)] border border-[var(--color-base-border)] text-[var(--color-base-ivory)] rounded focus:outline-none focus:border-[var(--color-gold)] transition-colors text-sm"
              />
            </div>
            <div className="flex gap-4 mt-6">
              <button onClick={() => setStep(2)} className="btn-outline flex-1">← Back</button>
              <button onClick={() => setStep(4)} disabled={!form.description} className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed">
                <span>Next →</span>
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 4: Budget & Contact */}
        {step === 4 && (
          <motion.div key="step4" initial="hidden" animate="visible" variants={fadeUp}>
            <h2 className="font-serif text-2xl text-[var(--color-base-ivory)] mb-6">Budget & your details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-[var(--color-base-muted)] mb-2">Budget Range</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {budgetRanges.map(b => (
                    <button
                      key={b}
                      onClick={() => setForm(f => ({ ...f, budget: b }))}
                      className={`p-3 text-left rounded border text-sm transition-all ${
                        form.budget === b
                          ? 'border-[var(--color-gold)] bg-[var(--color-gold)]/10 text-[var(--color-gold)]'
                          : 'border-[var(--color-base-border)] text-[var(--color-base-muted)] hover:border-[var(--color-gold)]/50'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>
              <div className="gold-divider" />
              <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                placeholder="Your Name *" className="w-full px-4 py-3 bg-[var(--color-base-card)] border border-[var(--color-base-border)] text-[var(--color-base-ivory)] rounded focus:outline-none focus:border-[var(--color-gold)] text-sm" />
              <input required value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                placeholder="Phone / WhatsApp *" className="w-full px-4 py-3 bg-[var(--color-base-card)] border border-[var(--color-base-border)] text-[var(--color-base-ivory)] rounded focus:outline-none focus:border-[var(--color-gold)] text-sm" />
              <input value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                placeholder="Email" className="w-full px-4 py-3 bg-[var(--color-base-card)] border border-[var(--color-base-border)] text-[var(--color-base-ivory)] rounded focus:outline-none focus:border-[var(--color-gold)] text-sm" />
              <textarea value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                placeholder="Any additional notes..." rows={2}
                className="w-full px-4 py-3 bg-[var(--color-base-card)] border border-[var(--color-base-border)] text-[var(--color-base-ivory)] rounded focus:outline-none focus:border-[var(--color-gold)] text-sm resize-none" />
            </div>
            <div className="flex gap-4 mt-6">
              <button onClick={() => setStep(3)} className="btn-outline flex-1">← Back</button>
              <button
                onClick={handleSubmit}
                disabled={!form.name || !form.phone || !form.budget}
                className="btn-whatsapp flex-1 justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                💬 Send via WhatsApp
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

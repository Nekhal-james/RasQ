import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export const MinimalWaitlist: React.FC = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;
    setSubmitted(true);
  };

  return (
    <section id="waitlist" className="py-32 bg-[#F5F5F7] text-[#1D1D1F] border-t border-black/[0.06]">
      <div className="max-w-xl mx-auto px-6 text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-xs font-mono font-medium tracking-widest text-[#86868B] uppercase block mb-3">
            03. DEVELOPER KITS
          </span>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1D1D1F]">
            Request Early Hardware.
          </h2>

          <p className="mt-4 text-sm sm:text-base text-[#86868B] leading-relaxed">
            We are fabricating pilot ESP32-S3 Type-C carrier boards for university teams, labs, and embedded developers.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 bg-white p-8 sm:p-10 rounded-3xl border border-black/[0.06] shadow-sm transition-all duration-300 hover:shadow-md"
        >
          {submitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="py-6 space-y-3"
            >
              <CheckCircle2 className="w-10 h-10 text-[#34C759] mx-auto" />
              <h3 className="text-lg font-bold text-[#1D1D1F]">Reservation Confirmed</h3>
              <p className="text-xs text-[#86868B] max-w-sm mx-auto leading-relaxed">
                We will email firmware files, schematics, and shipment tracking to <strong className="text-[#1D1D1F]">{email}</strong>.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Full Name"
                className="w-full px-4 py-3 rounded-2xl bg-[#F5F5F7] border border-black/[0.06] text-sm text-[#1D1D1F] placeholder-[#86868B] focus:outline-none focus:border-[#0071E3] focus:bg-white transition-all duration-200"
              />
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Work or University Email"
                className="w-full px-4 py-3 rounded-2xl bg-[#F5F5F7] border border-black/[0.06] text-sm text-[#1D1D1F] placeholder-[#86868B] focus:outline-none focus:border-[#0071E3] focus:bg-white transition-all duration-200"
              />
              <button
                type="submit"
                className="group w-full py-3 rounded-2xl bg-[#1D1D1F] hover:bg-black active:scale-[0.99] text-white text-xs font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                <span>Request Prototype Hardware</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>
            </form>
          )}
        </motion.div>

      </div>
    </section>
  );
};

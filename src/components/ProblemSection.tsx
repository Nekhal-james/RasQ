import React from 'react';
import { motion } from 'motion/react';
import { X, Check } from 'lucide-react';

export const ProblemSection: React.FC = () => {
  return (
    <section id="problem" className="relative py-28 sm:py-36 bg-white border-t border-black/[0.04]">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-px bg-[#0071E3]" />
            <span className="text-xs font-mono font-semibold text-[#0071E3] tracking-widest uppercase">
              01 — The Problem
            </span>
          </div>
          <h2
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] text-black leading-[1.1] max-w-3xl"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            You're buying a <span className="text-black/30">$305 stack</span>{' '}
            to do what your <span className="text-gradient-accent">phone already does.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Legacy Approach */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-3xl border border-black/[0.06] bg-black/[0.01] p-8 sm:p-10 space-y-8"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 border border-red-100 mb-4">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                <span className="text-xs font-semibold text-red-600">The Legacy Approach</span>
              </div>
              <h3 className="text-2xl font-bold text-black tracking-tight">
                The $305 Modular Stack
              </h3>
              <p className="mt-3 text-sm text-black/50 leading-relaxed">
                Building an autonomous vision robot with Raspberry Pi requires stacking 5+ fragile boards, cables, and shields.
              </p>
            </div>

            <div className="space-y-4">
              {[
                { title: 'Scarce & overpriced', desc: 'Raspberry Pis are frequently out of stock or inflated 3× above MSRP.' },
                { title: 'Fragile ribbon cables', desc: 'CSI camera ribbons snap during chassis flex and robot vibration.' },
                { title: 'Motor brownouts', desc: 'Peak motor current causes voltage dips, Pi reboots, and SD card corruption.' },
                { title: '5 separate boards', desc: 'Pi + AI HAT + Camera + UPS + Motor Driver = fragile tower of hardware.' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="mt-0.5 w-5 h-5 rounded flex items-center justify-center shrink-0 bg-red-50 text-red-500">
                    <X className="w-3 h-3" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-black">{item.title}</div>
                    <div className="text-xs text-black/50 mt-0.5 leading-relaxed">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-black/[0.04]">
              <div className="text-3xl font-extrabold text-red-500 tabular-nums">$305</div>
              <div className="text-xs text-black/40 mt-1">Total BOM per robot unit</div>
            </div>
          </motion.div>

          {/* RasQ Solution */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-3xl border border-[#0071E3]/20 bg-gradient-to-b from-[#0071E3]/[0.02] to-transparent p-8 sm:p-10 space-y-8 relative overflow-hidden"
          >
            <div className="relative">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0071E3]/5 border border-[#0071E3]/10 mb-4">
                <div className="w-1.5 h-1.5 rounded-full bg-[#0071E3]" />
                <span className="text-xs font-semibold text-[#0071E3]">The RasQ Paradigm</span>
              </div>
              <h3 className="text-2xl font-bold text-black tracking-tight">
                The $29 Carrier Dock
              </h3>
              <p className="mt-3 text-sm text-black/50 leading-relaxed">
                Modern smartphones already contain an octa-core CPU, up to 45 TOPS NPU, 4K OIS cameras, 5G, and a built-in 5,000mAh battery.
              </p>
            </div>

            <div className="relative space-y-4">
              {[
                { title: 'Zero added silicon', desc: 'Leverage the compute, camera, and battery you already own.' },
                { title: 'Integrated optics & OIS', desc: 'Automotive-grade autofocus and vibration damping, no ribbons.' },
                { title: 'Built-in battery UPS', desc: 'Phone battery = uninterruptible power supply, immune to motor spikes.' },
                { title: 'One USB-C cable', desc: 'Plug in, get 40 GPIO pins + dual motor drivers. Zero soldering.' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="mt-0.5 w-5 h-5 rounded flex items-center justify-center shrink-0 bg-[#0071E3]/10 text-[#0071E3]">
                    <Check className="w-3 h-3" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-black">{item.title}</div>
                    <div className="text-xs text-black/50 mt-0.5 leading-relaxed">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="relative pt-6 border-t border-black/[0.04]">
              <div className="text-3xl font-extrabold text-[#0071E3] tabular-nums">$29</div>
              <div className="text-xs text-black/40 mt-1">Total BOM per robot unit</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { motion } from 'motion/react';

export const AppleProblemSolution: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 bg-[#FBFBFD] text-[#1D1D1F]">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mb-16"
        >
          <div className="text-xs font-mono text-[#0071E3] tracking-wider uppercase mb-2">
            01. The Problem & Insight
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1D1D1F]">
            The single-board computer paradox.
          </h2>
          <p className="mt-4 text-base text-[#6E6E73] leading-relaxed">
            Every year, robotics teams, university labs, and hackathon competitors spend hundreds of dollars purchasing standalone development boards and auxiliary shields—ignoring the high-performance supercomputer resting in their pocket.
          </p>
        </motion.div>

        {/* 2-Column Comparison: The Raspberry Pi Trap vs. The Smartphone Reality */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          
          {/* Column 1: The Traditional SBC Trap */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white p-8 sm:p-10 rounded-3xl border border-black/[0.06] shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-6"
          >
            <div>
              <div className="text-xs font-mono text-[#E11D48] font-medium tracking-wide uppercase mb-1">
                The Legacy Approach
              </div>
              <h3 className="text-xl font-bold text-[#1D1D1F]">
                The $305 Modular Stack
              </h3>
            </div>

            <p className="text-sm text-[#6E6E73] leading-relaxed">
              To build an autonomous vision robot with a Raspberry Pi, builders must stack multiple delicate boards: a Pi 5, an M.2 AI accelerator HAT, an external CSI ribbon camera, a separate battery power hat, and a motor driver shield.
            </p>

            <ul className="space-y-3 pt-4 border-t border-black/[0.06] text-xs text-[#1D1D1F]">
              <li className="flex items-start gap-2.5">
                <span className="text-[#E11D48] font-bold">✕</span>
                <span><strong>Scarce and inflated:</strong> Raspberry Pis are frequently out of stock or overpriced.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#E11D48] font-bold">✕</span>
                <span><strong>Fragile ribbon cables:</strong> CSI camera ribbons snap during robot vibration and chassis flex.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#E11D48] font-bold">✕</span>
                <span><strong>Motor brownouts:</strong> When DC motors draw peak current, the Pi experiences voltage dips and reboots corrupting SD cards.</span>
              </li>
            </ul>
          </motion.div>

          {/* Column 2: The RasQ Paradigm */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.75, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="bg-[#1D1D1F] p-8 sm:p-10 rounded-3xl text-white shadow-[0_4px_16px_rgba(0,0,0,0.06)] space-y-6"
          >
            <div>
              <div className="text-xs font-mono text-[#0071E3] font-medium tracking-wide uppercase mb-1">
                The RasQ Solution
              </div>
              <h3 className="text-xl font-bold text-white">
                The $29 Carrier Dock
              </h3>
            </div>

            <p className="text-sm text-[#A1A1A6] leading-relaxed">
              Modern smartphones already contain an octa-core CPU, dedicated neural processors (NPUs) delivering up to 45 TOPS, optical image-stabilized 4K cameras, 5G/Wi-Fi 6E, and integrated 5,000mAh lithium batteries.
            </p>

            <ul className="space-y-3 pt-4 border-t border-white/10 text-xs text-white">
              <li className="flex items-start gap-2.5">
                <span className="text-[#34D399] font-bold">✓</span>
                <span><strong>Zero added silicon cost:</strong> Leverage compute silicon you or your lab already own.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#34D399] font-bold">✓</span>
                <span><strong>Integrated optics & OIS:</strong> Smartphone cameras feature automotive-grade autofocus and vibration damping.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#34D399] font-bold">✓</span>
                <span><strong>Built-in battery UPS:</strong> The phone’s battery acts as an uninterruptible power supply, completely immune to motor current spikes.</span>
              </li>
            </ul>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

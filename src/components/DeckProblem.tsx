import React from 'react';
import { motion } from 'motion/react';

export const DeckProblem: React.FC = () => {
  return (
    <section id="problem" className="py-24 bg-[#F8F9FA] text-[#0F172A] border-b border-black/[0.06]">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Header from Slide 2 */}
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14"
        >
          <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#00A3C4] uppercase mb-2">
            <span>01</span>
            <span>·</span>
            <span>THE PROBLEM</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0F172A]">
            SBCs are costly; phones sit underused.
          </h2>
        </motion.div>

        {/* 2-Column Side-by-Side Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 mb-14">
          
          {/* Column 1: The SBC problem */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-3"
          >
            <h3 className="text-xl font-bold text-[#0F172A]">
              The SBC problem
            </h3>
            <p className="text-base text-[#475569] leading-relaxed">
              Raspberry Pi-class hardware is increasingly expensive and hard to source reliably, especially for students, makers and small teams. Camera, IMU, GPS and wireless modules cost extra.
            </p>
          </motion.div>

          {/* Column 2: The untapped smartphone */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-3"
          >
            <h3 className="text-xl font-bold text-[#0F172A]">
              The untapped smartphone
            </h3>
            <p className="text-base text-[#475569] leading-relaxed">
              Modern phones already have powerful CPU/GPU/NPU, storage, cameras, Wi-Fi, Bluetooth and many sensors, yet much of it goes unused.
            </p>
          </motion.div>

        </div>

        {/* Core Conclusion Highlight Banner (Matching Slide 2 exact blue callout) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="p-6 sm:p-8 rounded-2xl bg-white border border-black/[0.08] shadow-xs"
        >
          <p className="text-lg sm:text-xl font-semibold text-[#0080A0] leading-snug">
            The missing piece is hardware access: phones have the compute and sensors, but no developer-friendly physical interfaces.
          </p>
        </motion.div>

      </div>
    </section>
  );
};

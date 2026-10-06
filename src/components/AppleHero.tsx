import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown } from 'lucide-react';

interface AppleHeroProps {
  onExplore: () => void;
  onViewArchitecture: () => void;
}

export const AppleHero: React.FC<AppleHeroProps> = ({ onExplore, onViewArchitecture }) => {
  return (
    <section id="overview" className="pt-36 pb-24 md:pt-44 md:pb-32 bg-[#FBFBFD] text-[#1D1D1F]">
      <div className="max-w-5xl mx-auto px-6 text-center">
        
        {/* Subtle Category Kicker - Clean unboxed text */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-20px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center gap-2 text-xs font-mono text-[#0071E3] tracking-wide uppercase mb-4"
        >
          <span>Edge Computing</span>
          <span aria-hidden="true">·</span>
          <span>Robotics Architecture</span>
          <span aria-hidden="true">·</span>
          <span>Hackathon Concept</span>
        </motion.div>

        {/* Master Display Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-20px' }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-[-0.03em] text-[#1D1D1F] leading-[1.05] max-w-4xl mx-auto"
          style={{ textWrap: 'balance' }}
        >
          Your smartphone is the single-board computer you already own.
        </motion.h1>

        {/* Subtitle / Thesis */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-20px' }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 text-base sm:text-lg md:text-xl text-[#6E6E73] max-w-2xl mx-auto font-normal leading-relaxed"
          style={{ textWrap: 'balance' }}
        >
          RasQ transforms ordinary smartphones into Raspberry Pi-style robotics controllers via a single plug-and-play USB-C dock—unlocking 40 GPIO pins, dual motor drivers, and a local Python SDK without modifying a single screw.
        </motion.p>

        {/* Primary Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-20px' }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-9 flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={onExplore}
            className="px-6 py-3 rounded-full text-xs font-semibold text-white bg-[#1D1D1F] hover:bg-black transition-all shadow-xs flex items-center gap-2 cursor-pointer"
          >
            <span>Inspect the Hardware Dock</span>
            <ArrowDown className="w-3.5 h-3.5 opacity-80" />
          </button>

          <button
            onClick={onViewArchitecture}
            className="px-6 py-3 rounded-full text-xs font-medium text-[#1D1D1F] bg-black/[0.04] hover:bg-black/[0.08] transition-colors cursor-pointer"
          >
            How the System Works
          </button>
        </motion.div>

        {/* Core Invariants Bar - Apple Minimal Negative Space */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-20px' }}
          transition={{ duration: 0.85, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20 pt-10 border-t border-black/[0.06] grid grid-cols-1 sm:grid-cols-3 gap-8 text-left"
        >
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#1D1D1F] tracking-tight tabular-nums">
              $29 <span className="text-sm font-normal text-[#86868B]">vs $305</span>
            </div>
            <div className="text-xs font-semibold text-[#1D1D1F] mt-1">90% Cost Reduction</div>
            <p className="text-xs text-[#6E6E73] mt-1 leading-relaxed">
              Eliminates external cameras, AI accelerator hats, Wi-Fi dongles, and power supply boards.
            </p>
          </div>

          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#1D1D1F] tracking-tight tabular-nums">
              100%
            </div>
            <div className="text-xs font-semibold text-[#1D1D1F] mt-1">Non-Invasive Plug & Play</div>
            <p className="text-xs text-[#6E6E73] mt-1 leading-relaxed">
              Standard USB-C OTG connection. No soldering, no desoldering, and no voided phone warranties.
            </p>
          </div>

          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#1D1D1F] tracking-tight tabular-nums">
              16.5 ms
            </div>
            <div className="text-xs font-semibold text-[#1D1D1F] mt-1">Closed-Loop Latency</div>
            <p className="text-xs text-[#6E6E73] mt-1 leading-relaxed">
              32 TOPS on-device NPU runs computer vision models at 60 FPS directly over high-speed USB CDC.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

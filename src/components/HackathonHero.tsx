import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown, Zap, ShieldCheck, DollarSign } from 'lucide-react';

interface HackathonHeroProps {
  onScrollToDemo: () => void;
  onScrollToArch: () => void;
}

export const HackathonHero: React.FC<HackathonHeroProps> = ({
  onScrollToDemo,
  onScrollToArch,
}) => {
  return (
    <section className="pt-32 pb-16 bg-[#FBFBFD] text-[#111827]">
      <div className="max-w-5xl mx-auto px-6 text-center">
        
        {/* Subtle Pitch Kicker */}
        <motion.div 
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 text-xs font-mono font-medium tracking-wider text-[#0066CC] uppercase mb-4"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#0066CC] animate-pulse" />
          <span>HACKATHON PITCH · HARDWARE & SOFTWARE PLATFORM</span>
        </motion.div>

        {/* Master Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#111827] leading-[1.08] max-w-4xl mx-auto"
          style={{ textWrap: 'balance' }}
        >
          Turn your smartphone into a 40-pin Raspberry Pi.
        </motion.h1>

        {/* The Concrete Value Pitch */}
        <motion.p 
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 text-base sm:text-xl text-[#4B5563] max-w-2xl mx-auto font-normal leading-relaxed"
        >
          Raspberry Pis have become scarce and expensive. RasQ is a plug-and-play USB-C hardware dock that repurposes the phone already in your pocket—giving you 40 GPIO pins, dual motor drivers, and a local Python SDK without modifying a single screw.
        </motion.p>

        {/* Primary Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <button
            onClick={onScrollToDemo}
            className="px-6 py-3 rounded-full text-xs font-semibold bg-[#111827] hover:bg-black text-white transition-all shadow-xs flex items-center gap-2 cursor-pointer"
          >
            <span>Try Closed-Loop Interactive Demo</span>
            <ArrowDown className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onScrollToArch}
            className="px-6 py-3 rounded-full text-xs font-medium text-[#111827] bg-black/[0.04] hover:bg-black/[0.08] transition-colors cursor-pointer"
          >
            How the Architecture Works
          </button>
        </motion.div>

        {/* 3 Executive Summary Pills for Judges */}
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 pt-8 border-t border-black/[0.08] grid grid-cols-1 sm:grid-cols-3 gap-6 text-left"
        >
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#ECFDF5] text-[#059669] flex items-center justify-center shrink-0 mt-0.5">
              <DollarSign className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#111827]">90% Cost Reduction</div>
              <div className="text-xs text-[#6B7280] mt-0.5">$29 carrier dock vs $305 Raspberry Pi stack.</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#EFF6FF] text-[#0066CC] flex items-center justify-center shrink-0 mt-0.5">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#111827]">100% Plug-and-Play</div>
              <div className="text-xs text-[#6B7280] mt-0.5">Zero motherboard disassembly or voided warranties.</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#FFFBEB] text-[#D97706] flex items-center justify-center shrink-0 mt-0.5">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#111827]">32 TOPS Vision NPU</div>
              <div className="text-xs text-[#6B7280] mt-0.5">Real-time object detection at 60 FPS in 11ms.</div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

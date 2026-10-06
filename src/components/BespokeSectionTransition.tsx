import React from 'react';
import { motion } from 'motion/react';

interface BespokeSectionTransitionProps {
  variant?: 'light' | 'to-dark' | 'to-light';
  index?: string;
  label?: string;
}

export const BespokeSectionTransition: React.FC<BespokeSectionTransitionProps> = ({
  variant = 'light',
  index,
  label
}) => {
  // Cinematic transition into dark room (#specs)
  if (variant === 'to-dark') {
    return (
      <div className="relative w-full py-16 sm:py-24 bg-gradient-to-b from-[#FBFBFD] via-[#0A0A0C]/90 to-[#0A0A0C] overflow-hidden select-none">
        {/* Subtle Ambient Radial Spotlight */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[160px] bg-[#0071E3]/10 blur-[100px] rounded-full" />
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center justify-center text-center space-y-4"
          >
            {/* Luminous Aperture Horizon Line */}
            <div className="relative w-full flex items-center justify-center">
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                exit={{ scaleX: 0, opacity: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-px bg-gradient-to-r from-transparent via-[#38BDF8]/60 to-transparent"
              />
              <div className="absolute w-2 h-2 rounded-full bg-[#38BDF8] shadow-[0_0_12px_#38BDF8]" />
            </div>

            {/* Technical Chapter Badge */}
            <div className="flex items-center gap-3 font-mono text-[11px] text-[#38BDF8] tracking-widest uppercase pt-2">
              <span className="text-white/40">+</span>
              <span>{index || '03'}</span>
              <span className="text-white/30">/</span>
              <span>{label || 'ENGINEERING DOSSIER'}</span>
              <span className="text-white/40">+</span>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Cinematic transition out of dark room (#specs -> light canvas)
  if (variant === 'to-light') {
    return (
      <div className="relative w-full py-16 sm:py-24 bg-gradient-to-b from-[#0A0A0C] via-[#0A0A0C]/70 to-[#FBFBFD] overflow-hidden select-none">
        {/* Subtle Ambient Glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[500px] h-[140px] bg-[#0071E3]/10 blur-[90px] rounded-full" />
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center justify-center text-center space-y-4"
          >
            {/* Luminous Horizon Line */}
            <div className="relative w-full flex items-center justify-center">
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                exit={{ scaleX: 0, opacity: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-px bg-gradient-to-r from-transparent via-[#0071E3]/40 to-transparent"
              />
              <div className="absolute w-2 h-2 rounded-full bg-[#0071E3] shadow-[0_0_10px_#0071E3]" />
            </div>

            <div className="flex items-center gap-3 font-mono text-[11px] text-[#0071E3] tracking-widest uppercase pt-2">
              <span className="text-black/20">+</span>
              <span>{index || '04'}</span>
              <span className="text-black/20">/</span>
              <span>{label || 'REAL-TIME DETERMINISM'}</span>
              <span className="text-black/20">+</span>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Ultra-Luxury Light Canvas Section Divider
  return (
    <div className="relative w-full py-8 sm:py-12 overflow-hidden select-none">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scaleX: 0.8 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          exit={{ opacity: 0, scaleX: 0.8 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex items-center justify-between gap-4"
        >
          {/* Left Industrial Crosshair */}
          <span className="text-[10px] font-mono text-black/20 select-none hidden sm:inline">+</span>

          {/* Center Dynamic Expanding Hairline with Shimmer Ray */}
          <div className="relative flex-1 flex items-center justify-center overflow-hidden h-4">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-black/[0.08] to-transparent" />
            
            {/* Ambient Shimmer Beam Pulse */}
            <motion.div
              initial={{ x: '-100%', opacity: 0 }}
              whileInView={{ x: '100%', opacity: [0, 0.8, 0] }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 3.5, ease: 'easeInOut' }}
              className="absolute w-32 h-px bg-gradient-to-r from-transparent via-[#0071E3]/50 to-transparent"
            />
          </div>

          {/* Micro Chapter Indicator (if provided) */}
          {label && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="shrink-0 flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-black/[0.06] text-[10px] font-mono text-[#86868B] shadow-[0_1px_4px_rgba(0,0,0,0.02)]"
            >
              {index && <span className="font-bold text-[#1D1D1F]">{index}</span>}
              {index && <span className="text-black/20">·</span>}
              <span className="tracking-wider uppercase">{label}</span>
            </motion.div>
          )}

          {/* Right Industrial Crosshair */}
          <span className="text-[10px] font-mono text-black/20 select-none hidden sm:inline">+</span>
        </motion.div>
      </div>
    </div>
  );
};

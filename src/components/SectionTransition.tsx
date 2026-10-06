import React from 'react';
import { motion } from 'motion/react';

interface SectionTransitionProps {
  variant?: 'light' | 'to-dark' | 'to-light';
}

export const SectionTransition: React.FC<SectionTransitionProps> = ({ variant = 'light' }) => {
  if (variant === 'to-dark') {
    return (
      <div className="relative w-full h-24 sm:h-36 bg-gradient-to-b from-[#FBFBFD] via-[#0A0A0C]/80 to-[#0A0A0C] overflow-hidden pointer-events-none select-none">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
        />
      </div>
    );
  }

  if (variant === 'to-light') {
    return (
      <div className="relative w-full h-24 sm:h-36 bg-gradient-to-b from-[#0A0A0C] via-[#0A0A0C]/60 to-[#FBFBFD] overflow-hidden pointer-events-none select-none">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
        />
      </div>
    );
  }

  return (
    <div className="relative w-full py-4 sm:py-6 overflow-hidden pointer-events-none select-none">
      <motion.div
        initial={{ opacity: 0, scaleX: 0.85 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        exit={{ opacity: 0, scaleX: 0.85 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-5xl mx-auto px-6"
      >
        <div className="h-px w-full bg-gradient-to-r from-transparent via-black/[0.07] to-transparent" />
      </motion.div>
    </div>
  );
};

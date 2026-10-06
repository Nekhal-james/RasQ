import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown } from 'lucide-react';

interface DeckHeroProps {
  onScrollToProblem: () => void;
}

export const DeckHero: React.FC<DeckHeroProps> = ({ onScrollToProblem }) => {
  return (
    <section className="pt-36 pb-28 bg-[#0B132B] text-white relative overflow-hidden">
      
      {/* Background Subtle Gradient */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[350px] bg-[#00A3C4]/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        
        {/* Hackathon Kicker */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-xs sm:text-sm font-mono tracking-widest text-[#00A3C4] font-semibold uppercase mb-6"
        >
          iQOO HACKATHON 2026 · IDEA SUBMISSION
        </motion.div>

        {/* Master Logo Wordmark */}
        <motion.h1 
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl sm:text-8xl lg:text-9xl font-extrabold tracking-tight text-white mb-6"
        >
          RasQ
        </motion.h1>

        {/* Teal Accent Bar from Slide 1 */}
        <motion.div 
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-20 h-1.5 bg-[#00A3C4] origin-left mb-8"
        />

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="text-xl sm:text-3xl text-white/90 font-medium max-w-3xl leading-snug tracking-tight mb-8"
        >
          Turning a modern smartphone into a Raspberry Pi-like compute module.
        </motion.p>

        {/* Team Credits */}
        <motion.div 
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-white/60"
        >
          <div>
            Team: <span className="text-white font-semibold">Joshua Xavier Thomas · Vyshak Menon · Nekhal James</span>
          </div>

          <button
            onClick={onScrollToProblem}
            className="inline-flex items-center gap-2 text-[#00A3C4] hover:text-white transition-colors cursor-pointer"
          >
            <span>Read Submission</span>
            <ArrowDown className="w-3.5 h-3.5" />
          </button>
        </motion.div>

      </div>
    </section>
  );
};

import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown } from 'lucide-react';

interface MinimalHeroProps {
  onScrollToDiagram: () => void;
}

export const MinimalHero: React.FC<MinimalHeroProps> = ({ onScrollToDiagram }) => {
  return (
    <section className="pt-36 pb-20 text-center bg-[#F5F5F7] text-[#1D1D1F]">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Understated Product Label with subtle fade */}
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-xs font-mono font-medium tracking-widest text-[#86868B] uppercase block mb-6"
        >
          RASQ PLATFORM
        </motion.span>

        {/* Hero Title with vast negative space and gentle entrance */}
        <motion.h1 
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight text-[#1D1D1F] leading-[1.04]"
          style={{ textWrap: 'balance' }}
        >
          A phone. A Type-C dock. 40 GPIO pins.
        </motion.h1>

        {/* Narrative Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 text-lg sm:text-xl text-[#86868B] max-w-xl mx-auto font-normal leading-relaxed"
        >
          Transform the smartphone in your pocket into an edge-computing single-board computer for robotics. 100% plug-and-play.
        </motion.p>

        {/* Clean Interactive Prompt with subtle hover micro-animation */}
        <motion.div 
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12"
        >
          <button
            onClick={onScrollToDiagram}
            className="group inline-flex items-center gap-2 text-xs font-mono text-[#86868B] hover:text-[#1D1D1F] transition-colors duration-200 cursor-pointer"
          >
            <span>View Hardware Topology</span>
            <ArrowDown className="w-3.5 h-3.5 transition-transform duration-200 ease-out group-hover:translate-y-0.5" />
          </button>
        </motion.div>

      </div>
    </section>
  );
};


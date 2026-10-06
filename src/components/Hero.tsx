import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown, Zap } from 'lucide-react';

interface HeroProps {
  onExplore: () => void;
  onViewArchitecture: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore, onViewArchitecture }) => {
  return (
    <section id="overview" className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-white">
      {/* Background gradients */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#0071E3]/[0.02] rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#0071E3]/[0.015] rounded-full blur-[80px]" />
      </div>

      <div className="absolute inset-0 pointer-events-none opacity-[0.01]" style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
        backgroundSize: '64px 64px'
      }} />

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-10 pt-32 pb-24 md:pt-40 md:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-black/[0.04] bg-white">
            <Zap className="w-3.5 h-3.5 text-[#0071E3]" />
            <span className="text-xs font-medium text-black/60 tracking-wide">
              iQOO Hackathon 2026
            </span>
            <span className="text-black/20">·</span>
            <span className="text-xs font-medium text-[#0071E3]">
              Edge Computing × Robotics
            </span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl sm:text-7xl lg:text-[6rem] font-extrabold tracking-[-0.04em] leading-[1.05] max-w-5xl text-black"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Your phone is a supercomputer. <br />
          <span className="text-black/20">We gave it </span>
          <span className="text-gradient-accent">GPIO pins.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 text-lg sm:text-xl text-black/50 max-w-2xl leading-relaxed font-light"
        >
          RasQ is a <span className="text-black font-medium">$29 USB-C dock</span> that transforms any Android phone into a 
          Raspberry Pi-class robotics controller — with <span className="text-black font-medium">40 GPIO pins</span>, 
          dual motor drivers, and <span className="text-black font-medium">16.5ms AI control loops</span>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <button
            onClick={onExplore}
            className="px-7 py-3.5 rounded-full text-sm font-semibold text-white bg-black hover:bg-black/80 transition-all shadow-lg flex items-center gap-2.5 cursor-pointer"
          >
            <span>Explore the Hardware</span>
            <ArrowDown className="w-4 h-4 opacity-70" />
          </button>

          <button
            onClick={onViewArchitecture}
            className="px-7 py-3.5 rounded-full text-sm font-medium text-black/70 hover:text-black bg-white border border-black/[0.08] hover:border-black/[0.15] transition-all cursor-pointer"
          >
            See How It Works
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-px rounded-2xl overflow-hidden border border-black/[0.04] bg-black/[0.02]"
        >
          {[
            { value: '$29', label: 'Carrier Dock Cost', sublabel: 'vs $305 Pi stack', accent: 'text-black' },
            { value: '16.5ms', label: 'Closed-Loop Latency', sublabel: '60 Hz real-time control', accent: 'text-[#0071E3]' },
            { value: '90%', label: 'Cost Reduction', sublabel: 'No camera, NPU, or battery add-ons', accent: 'text-black' }
          ].map((stat, i) => (
            <div key={i} className="bg-white p-8 text-center border-r border-black/[0.04] last:border-r-0">
              <div className={`text-3xl sm:text-4xl font-extrabold tracking-tight tabular-nums ${stat.accent}`}>
                {stat.value}
              </div>
              <div className="text-sm font-semibold text-black mt-2">{stat.label}</div>
              <div className="text-xs text-black/40 mt-1">{stat.sublabel}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

import React from 'react';
import { motion } from 'motion/react';

export const DeckMVP: React.FC = () => {
  return (
    <section id="mvp" className="py-24 bg-white text-[#0F172A] border-b border-black/[0.06]">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Header from Slide 8 */}
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#00A3C4] uppercase mb-2">
            <span>07</span>
            <span>·</span>
            <span>MVP</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0F172A]">
            One complete sensing-to-actuation loop.
          </h2>
        </motion.div>

        {/* 3 Pillars from Slide 8 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          
          {/* Pillar 01: Hardware */}
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-3"
          >
            <div className="text-3xl font-extrabold text-[#CBD5E1] font-mono">01</div>
            <h3 className="text-xl font-bold text-[#0F172A]">Hardware</h3>
            <p className="text-sm text-[#475569] leading-relaxed">
              USB-C prototype dock with ESP32 to validate the architecture, sensor, servo, motor driver, LEDs.
            </p>
          </motion.div>

          {/* Pillar 02: Software */}
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.75, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-3"
          >
            <div className="text-3xl font-extrabold text-[#CBD5E1] font-mono">02</div>
            <h3 className="text-xl font-bold text-[#0F172A]">Software</h3>
            <p className="text-sm text-[#475569] leading-relaxed">
              Android app that detects the dock, reads sensors, controls GPIO and servo, shows live data.
            </p>
          </motion.div>

          {/* Pillar 03: AI */}
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.75, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-3"
          >
            <div className="text-3xl font-extrabold text-[#CBD5E1] font-mono">03</div>
            <h3 className="text-xl font-bold text-[#0F172A]">AI</h3>
            <p className="text-sm text-[#475569] leading-relaxed">
              Camera and sensor input processed on-device, driving an external actuator.
            </p>
          </motion.div>

        </div>

        {/* Closed Loop Formula Banner matching Slide 8 */}
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="p-6 rounded-2xl bg-[#F8F9FA] border border-black/[0.06] text-center"
        >
          <div className="text-base sm:text-lg font-bold text-[#0080A0] font-mono tracking-tight">
            Camera/sensors → AI → decision → USB → I/O controller → actuator
          </div>
        </motion.div>

      </div>
    </section>
  );
};

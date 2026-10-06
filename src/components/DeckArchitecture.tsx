import React from 'react';
import { motion } from 'motion/react';

export const DeckArchitecture: React.FC = () => {
  return (
    <section id="architecture" className="py-24 bg-white text-[#0F172A] border-b border-black/[0.06]">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Header from Slide 5 */}
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#00A3C4] uppercase mb-2">
            <span>04</span>
            <span>·</span>
            <span>ARCHITECTURE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0F172A]">
            The phone thinks. The microcontroller controls.
          </h2>
        </motion.div>

        {/* 3-Tier Layered Diagram matching Slide 5 */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-4 max-w-4xl mx-auto"
        >
          {/* TIER 1: COMPUTE (Dark Navy Box) */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <div className="w-24 text-xs font-mono font-bold tracking-wider text-[#64748B] shrink-0 uppercase">
              COMPUTE
            </div>
            <div className="flex-1 bg-[#101828] text-white p-6 rounded-2xl shadow-sm">
              <div className="text-lg font-bold">Smartphone</div>
              <div className="text-xs font-mono text-white/60 mt-1">
                AI · Vision · Apps · Cloud
              </div>
            </div>
          </div>

          {/* USB Connector Label */}
          <div className="flex items-center gap-4 py-1">
            <div className="w-24 shrink-0" />
            <div className="flex-1 flex justify-center text-xs font-mono text-[#64748B] tracking-wider uppercase">
              ↓ USB ↓
            </div>
          </div>

          {/* TIER 2: BRIDGE (Teal Box) */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <div className="w-24 text-xs font-mono font-bold tracking-wider text-[#64748B] shrink-0 uppercase">
              BRIDGE
            </div>
            <div className="flex-1 bg-[#0284A5] text-white p-6 rounded-2xl shadow-sm">
              <div className="text-lg font-bold">RasQ dock</div>
              <div className="text-xs font-mono text-white/80 mt-1">
                USB-C · I/O controller (ESP32 in prototype) · Power
              </div>
            </div>
          </div>

          {/* Spacer connector */}
          <div className="flex items-center gap-4 py-1">
            <div className="w-24 shrink-0" />
            <div className="flex-1 flex justify-center text-xs font-mono text-[#64748B] tracking-wider uppercase">
              ↓
            </div>
          </div>

          {/* TIER 3: WORLD (3 Clean White Cards) */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <div className="w-24 text-xs font-mono font-bold tracking-wider text-[#64748B] shrink-0 uppercase">
              WORLD
            </div>
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              <div className="bg-[#F8F9FA] p-5 rounded-2xl border border-black/[0.06] text-center">
                <div className="font-bold text-[#0F172A] text-sm">Sensors</div>
                <div className="text-xs font-mono text-[#0080A0] mt-1">I²C · SPI</div>
              </div>

              <div className="bg-[#F8F9FA] p-5 rounded-2xl border border-black/[0.06] text-center">
                <div className="font-bold text-[#0F172A] text-sm">Motors</div>
                <div className="text-xs font-mono text-[#0080A0] mt-1">PWM · GPIO</div>
              </div>

              <div className="bg-[#F8F9FA] p-5 rounded-2xl border border-black/[0.06] text-center">
                <div className="font-bold text-[#0F172A] text-sm">Peripherals</div>
                <div className="text-xs font-mono text-[#0080A0] mt-1">UART · USB</div>
              </div>

            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

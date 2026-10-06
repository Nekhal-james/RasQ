import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Smartphone, Cpu, Zap, Layers, Check, Activity } from 'lucide-react';

export const StaticDockDiagram: React.FC = () => {
  const [hoveredBus, setHoveredBus] = useState<string | null>(null);

  return (
    <section id="dock-diagram" className="py-24 bg-[#F5F5F7] text-[#1D1D1F]">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header with subtle scroll entry */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mx-auto text-center mb-16"
        >
          <span className="text-xs font-mono font-medium tracking-widest text-[#86868B] uppercase block mb-3">
            01. HARDWARE TOPOLOGY
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#1D1D1F]">
            The Smartphone & 40-Pin Dock Interface.
          </h2>
          <p className="mt-4 text-base text-[#86868B] leading-relaxed">
            A static overview of the RasQ hardware split: offloading computing and vision to your phone, while breaking out standard Raspberry Pi physical pins over USB-C.
          </p>
        </motion.div>

        {/* Hardware Diagram Box with smooth elevation entrance */}
        <motion.div 
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white rounded-3xl p-8 sm:p-12 border border-black/[0.06] shadow-sm max-w-4xl mx-auto transition-all duration-300 hover:shadow-md"
        >
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* The Smartphone (Brain) */}
            <motion.div 
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="md:col-span-5 bg-[#F5F5F7] rounded-2xl p-6 border border-black/[0.06] space-y-4 transition-all duration-200 hover:border-black/[0.12]"
            >
              <div className="flex items-center justify-between border-b border-black/[0.06] pb-3">
                <span className="text-xs font-mono font-bold text-[#1D1D1F] flex items-center gap-1.5">
                  <Smartphone className="w-4 h-4 text-[#0071E3]" />
                  THE BRAIN
                </span>
                <span className="text-[10px] font-mono text-[#86868B]">UNMODIFIED PHONE</span>
              </div>

              {/* Graphic Representation of Phone */}
              <div className="bg-[#1D1D1F] rounded-2xl p-4 text-white space-y-3 font-mono text-xs shadow-inner">
                <div className="flex justify-between items-center text-[10px] text-white/50 border-b border-white/10 pb-2">
                  <span>Snapdragon / Tensor SoC</span>
                  <span className="text-[#34C759] flex items-center gap-1 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#34C759] animate-pulse" />
                    32 TOPS NPU
                  </span>
                </div>

                <div className="space-y-1.5 text-[11px] text-white/80">
                  <div className="flex justify-between">
                    <span className="text-white/50">Optics:</span>
                    <span>4K 60FPS OIS Camera</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/50">Connectivity:</span>
                    <span>5G · Wi-Fi 6E · BLE 5.3</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/50">Internal UPS:</span>
                    <span className="text-[#34C759]">5,000mAh Battery</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/50">OS Runtime:</span>
                    <span>Python 3.11 on Android</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/10 flex justify-center">
                  <div className="w-12 h-2 rounded-full bg-[#0071E3] flex items-center justify-center transition-opacity hover:opacity-80">
                    <div className="w-6 h-0.5 bg-white rounded-xs" />
                  </div>
                </div>
              </div>

              <div className="text-[11px] text-[#86868B] font-mono leading-relaxed">
                Connects through standard USB-C port. Zero internal motherboard alterations or voided warranties.
              </div>
            </motion.div>

            {/* Middle: Type-C Bus Line with Subtle Flow Animation */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="md:col-span-2 flex flex-col items-center justify-center py-4 md:py-0 text-center space-y-2"
            >
              <div className="w-full md:w-px h-px md:h-16 bg-gradient-to-b from-black/[0.05] via-[#0071E3]/40 to-black/[0.05]" />
              
              <div className="p-2.5 rounded-xl bg-[#F5F5F7] border border-black/[0.08] text-center font-mono text-[10px] shadow-xs group cursor-default transition-all duration-200 hover:scale-105">
                <div className="font-bold text-[#1D1D1F] flex items-center justify-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#34C759] animate-pulse" />
                  USB-C
                </div>
                <div className="text-[9px] text-[#0071E3]">921.6k Baud</div>
                <div className="text-[9px] text-[#34C759]">18W USB-PD</div>
              </div>

              <div className="w-full md:w-px h-px md:h-16 bg-gradient-to-b from-black/[0.05] via-[#0071E3]/40 to-black/[0.05]" />
            </motion.div>

            {/* The RasQ Dock & 40-Pin Header (Bridge) */}
            <motion.div 
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="md:col-span-5 bg-[#F5F5F7] rounded-2xl p-6 border border-black/[0.06] space-y-4 transition-all duration-200 hover:border-black/[0.12]"
            >
              <div className="flex items-center justify-between border-b border-black/[0.06] pb-3">
                <span className="text-xs font-mono font-bold text-[#1D1D1F] flex items-center gap-1.5">
                  <Cpu className="w-4 h-4 text-[#34C759]" />
                  THE BRIDGE
                </span>
                <span className="text-[10px] font-mono text-[#86868B]">ESP32-S3 DOCK</span>
              </div>

              {/* Graphic Representation of Dock with 40-Pin Header */}
              <div className="bg-[#1D1D1F] rounded-2xl p-4 text-white space-y-3 font-mono text-xs shadow-inner">
                <div className="flex justify-between items-center text-[10px] text-white/50 border-b border-white/10 pb-2">
                  <span>ESP32-S3 Dual-Core</span>
                  <span className="text-[#0071E3] font-semibold">240 MHz MCU</span>
                </div>

                {/* 40-Pin Header Grid with Micro-Interactions */}
                <div className="space-y-1.5 pt-1">
                  <div className="text-[9px] text-white/50 flex justify-between">
                    <span>STANDARD 40-PIN EXPANSION</span>
                    <span className="text-[#34C759]">3.3V LOGIC</span>
                  </div>

                  <div className="bg-black/60 p-2 rounded-lg border border-white/10 space-y-1">
                    {/* Row 1 Pins */}
                    <div className="grid grid-cols-20 gap-1">
                      {Array.from({ length: 20 }).map((_, i) => {
                        const pinNum = i * 2 + 1;
                        const isPower = pinNum === 1 || pinNum === 17;
                        const isI2c = pinNum === 3 || pinNum === 5;
                        const isSpi = pinNum === 19 || pinNum === 21 || pinNum === 23;
                        const isHighlighted = 
                          (hoveredBus === 'power' && isPower) ||
                          (hoveredBus === 'i2c' && isI2c) ||
                          (hoveredBus === 'spi' && isSpi);

                        return (
                          <div
                            key={i}
                            title={`Pin ${pinNum}`}
                            className={`h-2.5 rounded-xs transition-all duration-200 ${
                              isHighlighted ? 'scale-125 z-10 shadow-sm' : ''
                            } ${
                              isPower
                                ? 'bg-[#FF9500]'
                                : isI2c
                                ? 'bg-[#0071E3]'
                                : isSpi
                                ? 'bg-[#AF52DE]'
                                : 'bg-[#FFD60A]'
                            }`}
                          />
                        );
                      })}
                    </div>

                    {/* Row 2 Pins */}
                    <div className="grid grid-cols-20 gap-1">
                      {Array.from({ length: 20 }).map((_, i) => {
                        const pinNum = (i + 1) * 2;
                        const is5v = pinNum === 2 || pinNum === 4;
                        const isPwm = pinNum === 12 || pinNum === 18 || pinNum === 32 || pinNum === 33;
                        const isGnd = pinNum === 6 || pinNum === 14 || pinNum === 20 || pinNum === 25 || pinNum === 30 || pinNum === 34 || pinNum === 39;
                        const isHighlighted = 
                          (hoveredBus === 'power' && is5v) ||
                          (hoveredBus === 'pwm' && isPwm);

                        return (
                          <div
                            key={i}
                            title={`Pin ${pinNum}`}
                            className={`h-2.5 rounded-xs transition-all duration-200 ${
                              isHighlighted ? 'scale-125 z-10 shadow-sm' : ''
                            } ${
                              is5v
                                ? 'bg-[#FF3B30]'
                                : isPwm
                                ? 'bg-[#0071E3]'
                                : isGnd
                                ? 'bg-[#636366]'
                                : 'bg-[#FFD60A]'
                            }`}
                          />
                        );
                      })}
                    </div>
                  </div>

                  {/* Interactive Pin Bus Filter Chips */}
                  <div className="flex flex-wrap items-center justify-between text-[9px] font-mono text-[#86868B] pt-1">
                    <button
                      onMouseEnter={() => setHoveredBus('power')}
                      onMouseLeave={() => setHoveredBus(null)}
                      className="hover:text-white transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF3B30]" /> 5V / 3.3V
                    </button>
                    <button
                      onMouseEnter={() => setHoveredBus('pwm')}
                      onMouseLeave={() => setHoveredBus(null)}
                      className="hover:text-white transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0071E3]" /> PWM
                    </button>
                    <button
                      onMouseEnter={() => setHoveredBus('i2c')}
                      onMouseLeave={() => setHoveredBus(null)}
                      className="hover:text-white transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0071E3]" /> I²C
                    </button>
                    <button
                      onMouseEnter={() => setHoveredBus('spi')}
                      onMouseLeave={() => setHoveredBus(null)}
                      className="hover:text-white transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#AF52DE]" /> SPI
                    </button>
                  </div>
                </div>

                {/* Integrated Dual Motor Drivers */}
                <div className="pt-2 border-t border-white/10 text-[10px] text-white/70 flex justify-between">
                  <span>Dual Motor H-Bridges:</span>
                  <span className="text-[#FF9500]">DRV8833 (2x 1.5A)</span>
                </div>
              </div>

              <div className="text-[11px] text-[#86868B] font-mono leading-relaxed">
                Physical hardware buses directly accept Raspberry Pi HATs, sensors, displays, and high-current motors.
              </div>
            </motion.div>

          </div>

          {/* Key Advantages Summary Bar with subtle hover */}
          <div className="mt-8 pt-8 border-t border-black/[0.06] grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-[#86868B] font-mono">
            <div className="transition-transform duration-200 hover:-translate-y-0.5">
              <strong className="text-[#1D1D1F] block text-sm mb-0.5">Plug & Play</strong>
              Slide the phone in to begin. Unplug when done.
            </div>
            <div className="transition-transform duration-200 hover:-translate-y-0.5">
              <strong className="text-[#1D1D1F] block text-sm mb-0.5">Sub-4ms Latency</strong>
              High-speed USB CDC binary protocol.
            </div>
            <div className="transition-transform duration-200 hover:-translate-y-0.5">
              <strong className="text-[#1D1D1F] block text-sm mb-0.5">7V–24V Power Input</strong>
              Powers motors while charging your phone.
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
};

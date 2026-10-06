import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Cpu, Smartphone, Zap, Shield } from 'lucide-react';

const SUBSYSTEMS = [
  {
    id: 'gpio', icon: Cpu, name: '40-Pin GPIO', badge: '2.54mm Standard', tagline: 'Raspberry Pi HAT-compatible header',
    specs: [{ label: 'Pins', value: '40 (2×20)' }, { label: 'Logic', value: '3.3V CMOS' }, { label: 'Protocols', value: 'I²C, SPI, UART, PWM' }, { label: 'Per Pin', value: '16 mA max' }]
  },
  {
    id: 'motors', icon: Zap, name: 'Dual H-Bridge', badge: 'DRV8833 Integrated', tagline: '2 DC motors or 1 stepper, no external shield',
    specs: [{ label: 'Channels', value: '2 DC / 1 Stepper' }, { label: 'Current', value: '2.0A peak/ch' }, { label: 'PWM', value: 'Up to 50 kHz' }, { label: 'Safety', value: 'Thermal + UVLO' }]
  },
  {
    id: 'bridge', icon: Smartphone, name: 'USB-C Bridge', badge: 'ESP32-S3', tagline: '921.6K baud serial over USB CDC',
    specs: [{ label: 'Baud', value: '921,600' }, { label: 'Latency', value: '< 2.8 ms RTT' }, { label: 'Interface', value: 'USB-C OTG' }, { label: 'Firmware', value: 'FreeRTOS C++' }]
  },
  {
    id: 'power', icon: Shield, name: 'Power & UPS', badge: 'Isolated Rails', tagline: 'Zero-switchover brownout protection',
    specs: [{ label: 'Input', value: '7V–24V DC' }, { label: 'Charging', value: 'USB-PD 18W' }, { label: 'UPS', value: '0ms switchover' }, { label: 'Isolation', value: 'Opto-coupled' }]
  },
];

export const HardwareSection: React.FC = () => {
  const [active, setActive] = useState('gpio');
  const current = SUBSYSTEMS.find((s) => s.id === active) || SUBSYSTEMS[0];

  return (
    <section id="hardware" className="relative py-28 sm:py-36 bg-[#FBFBFD] border-t border-black/[0.04]">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-px bg-[#0071E3]" />
            <span className="text-xs font-mono font-semibold text-[#0071E3] tracking-widest uppercase">
              02 — Hardware Architecture
            </span>
          </div>
          <h2
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] text-black leading-[1.1] max-w-4xl"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            One PCB. <span className="text-gradient-accent">Everything</span> a robot needs.
          </h2>
          <p className="mt-5 text-lg text-black/50 max-w-2xl leading-relaxed">
            Your phone slides into the USB-C port, instantly exposing 40 GPIO pins, integrated motor drivers, and regulated power.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl border border-black/[0.06] bg-white p-6 sm:p-10 mb-10 shadow-sm"
        >
          <div className="flex items-center justify-between pb-6 border-b border-black/[0.04] text-xs mb-8">
            <div className="flex items-center gap-3 font-mono">
              <span className="text-black/70 font-semibold">System Physical Topology</span>
              <span className="text-black/20">·</span>
              <span className="text-black/40">100% Non-Invasive</span>
            </div>
            <span className="text-black/30 font-mono text-[11px] hidden sm:block">USB 2.0 High-Speed CDC</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            {/* Phone */}
            <div className="md:col-span-4 rounded-2xl border border-black/[0.04] bg-[#F5F5F7] p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-9 h-9 rounded-xl bg-white border border-black/[0.04] shadow-sm flex items-center justify-center">
                    <Smartphone className="w-4 h-4 text-[#0071E3]" />
                  </div>
                  <span className="text-[10px] font-mono text-[#0071E3] font-bold tracking-wider">THE BRAIN</span>
                </div>
                <h4 className="text-base font-bold text-black">Any Android Phone</h4>
                <p className="text-xs text-black/50 mt-1">Stock Android 10+ · USB OTG</p>
              </div>
              <div className="mt-4 pt-4 border-t border-black/[0.04] space-y-2 font-mono text-xs">
                <div className="flex justify-between"><span className="text-black/40">CPU</span><span className="text-black/80 font-medium">Octa-Core 64-bit</span></div>
                <div className="flex justify-between"><span className="text-black/40">NPU</span><span className="text-[#0071E3] font-bold">15–45 TOPS</span></div>
                <div className="flex justify-between"><span className="text-black/40">Camera</span><span className="text-black/80 font-medium">4K 60fps + OIS</span></div>
                <div className="flex justify-between"><span className="text-black/40">Battery</span><span className="text-black/80 font-medium">5,000 mAh</span></div>
              </div>
            </div>

            {/* Bridge */}
            <div className="md:col-span-3 flex flex-col items-center justify-center py-4 md:py-0">
              <div className="flex md:flex-col items-center gap-3">
                <div className="h-px md:h-12 w-12 md:w-px bg-gradient-to-r md:bg-gradient-to-b from-transparent via-[#0071E3]/20 to-transparent" />
                <div className="bg-white border border-[#0071E3]/20 px-5 py-3 rounded-2xl text-center shadow-sm">
                  <div className="text-[10px] font-mono uppercase text-[#0071E3] font-bold tracking-wider">USB-C Link</div>
                  <div className="text-sm font-bold text-black mt-0.5">921.6K Baud</div>
                  <div className="text-[10px] text-black/40 font-mono mt-0.5">CDC Serial</div>
                </div>
                <div className="h-px md:h-12 w-12 md:w-px bg-gradient-to-r md:bg-gradient-to-b from-transparent via-[#0071E3]/20 to-transparent" />
              </div>
            </div>

            {/* Dock */}
            <div className="md:col-span-5 rounded-2xl bg-black text-white border border-black p-6 flex flex-col justify-between relative overflow-hidden shadow-lg">
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#0071E3]/20 rounded-full blur-[60px] pointer-events-none" />
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
                    <Cpu className="w-4 h-4 text-[#38BDF8]" />
                  </div>
                  <span className="text-[10px] font-mono text-[#38BDF8] font-bold tracking-wider">THE DOCK</span>
                </div>
                <h4 className="text-base font-bold text-white">RasQ Carrier Board</h4>
                <p className="text-xs text-white/50 mt-1">ESP32-S3 · Dual-Core 240MHz</p>
              </div>
              <div className="relative mt-4 pt-4 border-t border-white/10 space-y-2 font-mono text-xs">
                <div className="flex justify-between"><span className="text-white/40">GPIO</span><span className="text-[#38BDF8] font-bold">40-Pin Pi Header</span></div>
                <div className="flex justify-between"><span className="text-white/40">Motors</span><span className="text-white">Dual DRV8833</span></div>
                <div className="flex justify-between"><span className="text-white/40">MCU</span><span className="text-white">Dual 240MHz Xtensa</span></div>
                <div className="flex justify-between"><span className="text-white/40">Power</span><span className="text-white">7–24V DC</span></div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {SUBSYSTEMS.map((sub) => (
            <button
              key={sub.id}
              onClick={() => setActive(sub.id)}
              className={`px-4 py-2.5 text-xs font-medium rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                active === sub.id
                  ? 'bg-black text-white shadow-md'
                  : 'bg-white text-black/60 hover:text-black hover:bg-black/[0.02] border border-black/[0.06]'
              }`}
            >
              {sub.name}
            </button>
          ))}
        </div>

        {/* Card */}
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-2xl border border-black/[0.06] bg-white p-6 sm:p-8 shadow-sm"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-bold text-black">{current.name}</h3>
            <span className="text-xs font-mono text-[#0071E3] bg-[#0071E3]/5 px-2.5 py-1 rounded-md">{current.badge}</span>
          </div>
          <p className="text-sm text-black/50 mb-6">{current.tagline}</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-5 border-t border-black/[0.04]">
            {current.specs.map((spec, i) => (
              <div key={i}>
                <div className="text-[11px] font-mono text-black/40">{spec.label}</div>
                <div className="text-sm font-mono font-bold text-black mt-0.5">{spec.value}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

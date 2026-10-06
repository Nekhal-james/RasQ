import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Cpu, Smartphone, Zap, Shield, Layers, Radio } from 'lucide-react';

interface Subsystem {
  id: string;
  name: string;
  badge: string;
  tagline: string;
  description: string;
  specs: { label: string; value: string }[];
}

const SUBSYSTEMS: Subsystem[] = [
  {
    id: 'gpio',
    name: '40-Pin GPIO Header',
    badge: 'Standard 2.54mm',
    tagline: 'Direct Raspberry Pi HAT compatibility.',
    description: 'A 2x20 gold-plated pin header matching the standard Raspberry Pi pinout. Supports 28 digital GPIO lines with 3.3V logic levels, hardware PWM timers, I²C bus (SDA/SCL), SPI bus (MOSI/MISO/SCLK), and high-speed UART.',
    specs: [
      { label: 'Pin Count', value: '40 Pins (2x20)' },
      { label: 'Logic Voltage', value: '3.3V CMOS' },
      { label: 'Protocols', value: 'I²C, SPI, UART, PWM' },
      { label: 'Current per Pin', value: '16 mA max' }
    ]
  },
  {
    id: 'motors',
    name: 'Dual H-Bridge Drivers',
    badge: 'Integrated DRV8833',
    tagline: 'Drive 2 DC motors or 1 stepper directly from the carrier.',
    description: 'Built-in Texas Instruments DRV8833 dual motor driver ICs eliminate the need for an external motor shield. Delivers up to 1.5A continuous current per channel with hardware current limiting and thermal shutdown protection.',
    specs: [
      { label: 'Channels', value: '2 DC Motors / 1 Stepper' },
      { label: 'Peak Current', value: '2.0A per channel' },
      { label: 'PWM Frequency', value: 'Up to 50 kHz' },
      { label: 'Protection', value: 'Thermal & UVLO' }
    ]
  },
  {
    id: 'bridge',
    name: 'USB-C CDC Bridge',
    badge: 'ESP32-S3 Microcontroller',
    tagline: 'High-speed communication over standard Android USB host.',
    description: 'The dock carrier is managed by an ESP32-S3 dual-core microcontroller running a deterministic bare-metal C++ firmware. It bridges commands from Python over USB CDC at 921,600 baud with sub-3ms round-trip latency.',
    specs: [
      { label: 'Baud Rate', value: '921,600 baud' },
      { label: 'Latency', value: '< 2.8 ms RTT' },
      { label: 'USB Interface', value: 'Type-C USB OTG' },
      { label: 'Firmware', value: 'FreeRTOS / Bare-Metal C++' }
    ]
  },
  {
    id: 'power',
    name: 'Power Delivery & UPS',
    badge: 'Isolated Battery Rail',
    tagline: 'Zero-switchover brownout protection.',
    description: 'An onboard wide-input buck regulator accepts 7V to 24V from robot LiPo packs, powering heavy motors and stepping down 5V/3A to fast-charge the phone. The phone’s internal 5,000mAh battery keeps the brain alive during robot battery swaps.',
    specs: [
      { label: 'Input Voltage', value: '7V to 24V DC' },
      { label: 'Charging Output', value: 'USB-PD 18W Fast Chg' },
      { label: 'UPS Behavior', value: '0ms switchover' },
      { label: 'Isolation', value: 'Optically coupled logic' }
    ]
  }
];

export const AppleHardwareDiagram: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('gpio');
  const current = SUBSYSTEMS.find((s) => s.id === activeTab) || SUBSYSTEMS[0];

  return (
    <section id="hardware" className="py-20 sm:py-28 bg-[#FBFBFD] text-[#1D1D1F]">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mb-16"
        >
          <div className="text-xs font-mono text-[#0071E3] tracking-wider uppercase mb-2">
            02. Hardware Architecture
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1D1D1F]">
            The RasQ Carrier Dock.
          </h2>
          <p className="mt-4 text-base text-[#6E6E73] leading-relaxed">
            One precision PCB carrier board. An ordinary phone slides into the USB-C port, instantly exposing 40 standard GPIO pins, dual motor drivers, and regulated robotics power.
          </p>
        </motion.div>

        {/* Master Hardware Schematic Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white rounded-3xl border border-black/[0.06] p-6 sm:p-10 shadow-[0_2px_12px_rgba(0,0,0,0.02)] mb-12"
        >
          
          {/* Top Label */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-black/[0.06] text-xs">
            <div className="flex items-center gap-2 font-mono text-[#6E6E73]">
              <Layers className="w-4 h-4 text-[#0071E3]" />
              <span className="font-semibold text-[#1D1D1F]">System Physical Topology</span>
              <span>·</span>
              <span>100% Non-Invasive Coupling</span>
            </div>
            <div className="text-[#86868B] font-mono text-[11px]">
              Single Cable · USB 2.0 High-Speed CDC
            </div>
          </div>

          {/* Graphical Hardware Block Flow */}
          <div className="py-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Block 1: Smartphone (The Brain) */}
            <div className="md:col-span-4 bg-[#F5F5F7] rounded-2xl p-6 border border-black/[0.06] space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-white text-[#0071E3] flex items-center justify-center shadow-xs">
                  <Smartphone className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono text-[#0071E3] font-semibold">THE BRAIN</span>
              </div>

              <div>
                <h4 className="text-base font-bold text-[#1D1D1F]">Any Android Phone</h4>
                <p className="text-xs text-[#6E6E73] mt-1">Stock Android 10+ with USB OTG</p>
              </div>

              <div className="space-y-1.5 pt-3 border-t border-black/[0.06] text-xs font-mono text-[#6E6E73]">
                <div className="flex justify-between">
                  <span>SoC:</span>
                  <span className="text-[#1D1D1F] font-medium">Octa-Core 64-bit</span>
                </div>
                <div className="flex justify-between">
                  <span>Vision NPU:</span>
                  <span className="text-[#0071E3] font-bold">15–45 TOPS</span>
                </div>
                <div className="flex justify-between">
                  <span>Camera:</span>
                  <span className="text-[#1D1D1F] font-medium">4K 60FPS HDR + OIS</span>
                </div>
                <div className="flex justify-between">
                  <span>Battery UPS:</span>
                  <span className="text-[#1D1D1F] font-medium">5,000 mAh Internal</span>
                </div>
              </div>
            </div>

            {/* Block 2: The High-Speed USB-C Bridge Connection */}
            <div className="md:col-span-3 flex flex-col items-center justify-center py-4 md:py-0 text-center">
              <div className="flex md:flex-col items-center gap-2">
                <div className="h-0.5 md:h-8 w-12 md:w-0.5 bg-[#0071E3]/30" />
                
                <div className="bg-[#F5F5F7] border border-black/[0.08] px-4 py-3 rounded-2xl shadow-xs">
                  <div className="text-[10px] font-mono uppercase text-[#0071E3] font-bold">USB-C Link</div>
                  <div className="text-xs font-bold text-[#1D1D1F] mt-0.5">921.6K Baud</div>
                  <div className="text-[10px] text-[#86868B] font-mono mt-0.5">USB CDC Serial</div>
                </div>

                <div className="h-0.5 md:h-8 w-12 md:w-0.5 bg-[#0071E3]/30" />
              </div>
            </div>

            {/* Block 3: RasQ Hardware Carrier Dock */}
            <div className="md:col-span-5 bg-[#1D1D1F] text-white rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-white/10 text-white flex items-center justify-center">
                  <Cpu className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono text-[#38BDF8] font-semibold">THE BRIDGE & DOCK</span>
              </div>

              <div>
                <h4 className="text-base font-bold text-white">RasQ Carrier Board</h4>
                <p className="text-xs text-white/60 mt-1">ESP32-S3 Hardware Controller</p>
              </div>

              <div className="space-y-1.5 pt-3 border-t border-white/10 text-xs font-mono text-white/70">
                <div className="flex justify-between">
                  <span>GPIO Header:</span>
                  <span className="text-[#38BDF8] font-bold">40-Pin Pi Compatible</span>
                </div>
                <div className="flex justify-between">
                  <span>Motor Driver:</span>
                  <span className="text-white font-medium">Dual DRV8833 H-Bridge</span>
                </div>
                <div className="flex justify-between">
                  <span>MCU Clock:</span>
                  <span className="text-white font-medium">Dual 240MHz RISC-V</span>
                </div>
                <div className="flex justify-between">
                  <span>Power Input:</span>
                  <span className="text-white font-medium">7–24V DC Barrel / Screw</span>
                </div>
              </div>
            </div>

          </div>

          {/* Interactive Subsystem Inspector Tabs */}
          <div className="pt-8 border-t border-black/[0.06]">
            
            {/* Clean Segmented Navigation Buttons */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              {SUBSYSTEMS.map((subsystem) => (
                <button
                  key={subsystem.id}
                  onClick={() => setActiveTab(subsystem.id)}
                  className={`px-4 py-2 text-xs font-medium rounded-full transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === subsystem.id
                      ? 'bg-[#1D1D1F] text-white shadow-xs'
                      : 'bg-[#F5F5F7] text-[#1D1D1F]/70 hover:text-[#1D1D1F] hover:bg-[#EBEBEF]'
                  }`}
                >
                  {subsystem.name}
                </button>
              ))}
            </div>

            {/* Active Subsystem Detail Card */}
            <div className="bg-[#F5F5F7] rounded-2xl p-6 sm:p-8 border border-black/[0.04]">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <h3 className="text-lg font-bold text-[#1D1D1F]">{current.name}</h3>
                <span className="text-xs font-mono text-[#0071E3] font-medium">{current.badge}</span>
              </div>

              <div className="text-xs text-[#0071E3] font-mono mb-3">
                {current.tagline}
              </div>

              <p className="text-xs sm:text-sm text-[#6E6E73] leading-relaxed max-w-3xl mb-6">
                {current.description}
              </p>

              {/* Technical Specifications Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-black/[0.06]">
                {current.specs.map((spec, idx) => (
                  <div key={idx}>
                    <div className="text-[11px] font-mono text-[#86868B]">{spec.label}</div>
                    <div className="text-xs font-mono font-bold text-[#1D1D1F] mt-0.5">{spec.value}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
};

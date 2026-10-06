import React from 'react';
import { motion } from 'motion/react';
import { Smartphone, Cpu, Terminal, ShieldCheck, BatteryCharging, Zap } from 'lucide-react';

export const HackathonArchitecture: React.FC = () => {
  return (
    <section id="architecture" className="py-24 bg-[#FBFBFD] text-[#111827] border-t border-black/[0.08]">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Section Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mb-16"
        >
          <div className="text-xs font-mono font-medium tracking-wider text-[#0066CC] uppercase mb-2">
            HOW RASQ WORKS
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111827]">
            Splitting the system into three parts.
          </h2>
          <p className="mt-4 text-base text-[#4B5563] leading-relaxed">
            Instead of buying an expensive standalone development board to act as the brain of your project, RasQ decouples heavy compute from physical I/O.
          </p>
        </motion.div>

        {/* 3 Architecture Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          
          {/* 1. The Brain */}
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white p-7 rounded-3xl border border-black/[0.08] shadow-xs space-y-4 hover:shadow-md transition-shadow"
          >
            <div className="w-10 h-10 rounded-2xl bg-[#EFF6FF] text-[#0066CC] flex items-center justify-center">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-mono font-medium text-[#6B7280]">PART 01</span>
              <h3 className="text-lg font-bold text-[#111827]">The Brain</h3>
              <p className="text-xs font-mono text-[#0066CC] mt-0.5">YOUR SMARTPHONE</p>
            </div>
            <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">
              Provides the heavy computing horsepower: an octa-core CPU, dedicated 32 TOPS neural processor (NPU), 4K camera with hardware OIS, 5G/Wi-Fi 6E, and internal 5,000mAh battery.
            </p>
            <div className="pt-3 border-t border-black/[0.06] text-xs font-mono text-[#6B7280] space-y-1">
              <div>· Octa-Core Application CPU</div>
              <div>· Dedicated 32 TOPS Vision NPU</div>
              <div>· Zero-Switchover Battery UPS</div>
            </div>
          </motion.div>

          {/* 2. The Bridge */}
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.75, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white p-7 rounded-3xl border border-black/[0.08] shadow-xs space-y-4 hover:shadow-md transition-shadow"
          >
            <div className="w-10 h-10 rounded-2xl bg-[#ECFDF5] text-[#059669] flex items-center justify-center">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-mono font-medium text-[#6B7280]">PART 02</span>
              <h3 className="text-lg font-bold text-[#111827]">The Bridge</h3>
              <p className="text-xs font-mono text-[#059669] mt-0.5">USB-C HARDWARE DOCK</p>
            </div>
            <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">
              Connects to the phone via USB-C. Powered by an ESP32-S3 microcontroller, it translates phone commands into physical actions via 40-pin GPIO, I²C, SPI, PWM, and dual motor drivers.
            </p>
            <div className="pt-3 border-t border-black/[0.06] text-xs font-mono text-[#6B7280] space-y-1">
              <div>· ESP32-S3 Dual-Core @ 240MHz</div>
              <div>· Standard 40-Pin 2.54mm Header</div>
              <div>· Dual DRV8833 Motor H-Bridges</div>
            </div>
          </motion.div>

          {/* 3. The Control Center */}
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.75, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white p-7 rounded-3xl border border-black/[0.08] shadow-xs space-y-4 hover:shadow-md transition-shadow"
          >
            <div className="w-10 h-10 rounded-2xl bg-[#F5F3FF] text-[#7C3AED] flex items-center justify-center">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-mono font-medium text-[#6B7280]">PART 03</span>
              <h3 className="text-lg font-bold text-[#111827]">The Control Center</h3>
              <p className="text-xs font-mono text-[#7C3AED] mt-0.5">ANDROID APP & SDK</p>
            </div>
            <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">
              A dedicated app routes sensor data and camera frames to the hardware dock. An intuitive Python SDK lets developers easily write custom control loops locally on the phone.
            </p>
            <div className="pt-3 border-t border-black/[0.06] text-xs font-mono text-[#6B7280] space-y-1">
              <div>· Local Python 3.11 Execution</div>
              <div>· Low-Latency USB CDC Protocol (&lt;4ms)</div>
              <div>· Zero Root / Stock Permissions</div>
            </div>
          </motion.div>

        </div>

        {/* The Big Advantage Callout */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white p-8 sm:p-10 rounded-3xl border border-black/[0.08] shadow-xs space-y-4"
        >
          <div className="flex items-center gap-2 text-xs font-mono text-[#059669] uppercase font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>THE BIG ADVANTAGE · 100% NON-INVASIVE</span>
          </div>

          <h3 className="text-2xl font-bold text-[#111827]">
            Entirely plug-and-play. No motherboard modifications.
          </h3>

          <p className="text-sm text-[#4B5563] leading-relaxed max-w-3xl">
            RasQ does not require opening your smartphone's casing, desoldering connectors, or voiding manufacturer warranties. You simply dock the phone into the carrier board to use it as an advanced edge-computing controller, and unplug it when you are done. Your phone remains undamaged and ready for everyday use.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-black/[0.06] text-xs font-mono text-[#4B5563]">
            <div>
              <strong className="text-[#111827] block mb-0.5">Zero Teardown</strong>
              Connects via standard USB-C OTG without opening any screws.
            </div>
            <div>
              <strong className="text-[#111827] block mb-0.5">Built-in Battery UPS</strong>
              Survives robot battery dips and field battery swaps without rebooting.
            </div>
            <div>
              <strong className="text-[#111827] block mb-0.5">Raspberry Pi Compatible</strong>
              40-pin header supports existing HATs, displays, and shields.
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

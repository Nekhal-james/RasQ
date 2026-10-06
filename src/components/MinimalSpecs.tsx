import React from 'react';
import { motion } from 'motion/react';
import { Smartphone, Cpu, Terminal, ShieldCheck, DollarSign, BatteryCharging, Zap } from 'lucide-react';

export const MinimalSpecs: React.FC = () => {
  return (
    <section id="specifications" className="py-32 bg-[#F5F5F7] text-[#1D1D1F] border-t border-black/[0.06]">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Heading with Generous Whitespace & Motion Entry */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mb-24"
        >
          <span className="text-xs font-mono font-medium tracking-widest text-[#86868B] uppercase block mb-3">
            02. ARCHITECTURAL PRINCIPLES
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#1D1D1F] leading-tight">
            Built for robotics teams who value silicon efficiency.
          </h2>
          <p className="mt-6 text-base sm:text-lg text-[#86868B] leading-relaxed">
            Raspberry Pis have become scarce and expensive. Developers routinely buy separate camera modules, Wi-Fi adapters, and batteries—ignoring that modern smartphones already pack superior versions of these components.
          </p>
        </motion.div>

        {/* 3-Column Decoupled Architecture with Staggered Motion Entry */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 mb-28">
          
          {/* Column 1: The Brain */}
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-4 p-4 -m-4 rounded-2xl transition-all duration-300 hover:bg-black/[0.02]"
          >
            <div className="text-xs font-mono text-[#86868B]">PART 01</div>
            <h3 className="text-xl font-bold text-[#1D1D1F]">The Brain</h3>
            <div className="text-xs font-mono text-[#0071E3]">YOUR SMARTPHONE</div>
            <p className="text-sm text-[#86868B] leading-relaxed">
              Provides the heavy computing horsepower: 8-core CPU, dedicated 32 TOPS neural processor (NPU), 4K optical-stabilized camera, 5G/Wi-Fi 6E, and internal 5,000mAh battery.
            </p>
            <div className="pt-4 border-t border-black/[0.06] text-xs font-mono text-[#86868B] space-y-1.5">
              <div>· Octa-Core 3.2GHz Application SoC</div>
              <div>· Dedicated On-Device Vision NPU</div>
              <div>· Integrated Uninterruptible Battery</div>
            </div>
          </motion.div>

          {/* Column 2: The Bridge */}
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.75, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-4 p-4 -m-4 rounded-2xl transition-all duration-300 hover:bg-black/[0.02]"
          >
            <div className="text-xs font-mono text-[#86868B]">PART 02</div>
            <h3 className="text-xl font-bold text-[#1D1D1F]">The Bridge</h3>
            <div className="text-xs font-mono text-[#34C759]">USB-C HARDWARE DOCK</div>
            <p className="text-sm text-[#86868B] leading-relaxed">
              A custom hardware dock connects to your phone via USB-C. It translates digital commands into physical actions by breaking out standard 40-pin GPIO, I²C, SPI, PWM, and dual motor drivers.
            </p>
            <div className="pt-4 border-t border-black/[0.06] text-xs font-mono text-[#86868B] space-y-1.5">
              <div>· ESP32-S3 Microcontroller Core</div>
              <div>· 40-Pin Raspberry Pi Header</div>
              <div>· Dual DRV8833 Motor H-Bridges</div>
            </div>
          </motion.div>

          {/* Column 3: The Control Center */}
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.75, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-4 p-4 -m-4 rounded-2xl transition-all duration-300 hover:bg-black/[0.02]"
          >
            <div className="text-xs font-mono text-[#86868B]">PART 03</div>
            <h3 className="text-xl font-bold text-[#1D1D1F]">The Control Center</h3>
            <div className="text-xs font-mono text-[#AF52DE]">ANDROID APP & SDK</div>
            <p className="text-sm text-[#86868B] leading-relaxed">
              A dedicated app routes data between the phone's internal sensors and the physical hardware dock. An intuitive Python SDK lets developers easily write custom control loops.
            </p>
            <div className="pt-4 border-t border-black/[0.06] text-xs font-mono text-[#86868B] space-y-1.5">
              <div>· Local Python 3.11 Execution</div>
              <div>· Low-Latency USB CDC Protocol (&lt;4ms)</div>
              <div>· Zero Root / Stock Android Permissions</div>
            </div>
          </motion.div>

        </div>

        {/* The Big Advantage: Clean Minimal Callout with Framer Motion entry */}
        <motion.div 
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white rounded-3xl p-8 sm:p-14 border border-black/[0.06] shadow-sm transition-all duration-300 hover:shadow-md hover:border-black/[0.1]"
        >
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#34C759] uppercase mb-4">
              <ShieldCheck className="w-4 h-4" />
              <span>THE BIG ADVANTAGE</span>
            </div>

            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1D1D1F] tracking-tight">
              100% plug-and-play. Zero motherboard modification.
            </h3>

            <p className="mt-4 text-base text-[#86868B] leading-relaxed">
              RasQ does not require opening your smartphone's casing or voiding warranties. You simply dock the phone to use it as an advanced edge-computing controller, and unplug it when you are done—drastically lowering the barrier to entry for robotics and IoT projects.
            </p>

            <div className="mt-8 pt-6 border-t border-black/[0.06] grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs font-mono text-[#86868B]">
              <div className="transition-transform duration-200 hover:-translate-y-0.5">
                <strong className="text-[#1D1D1F] block text-sm mb-1">$29 vs $240+</strong>
                Save hundreds by avoiding redundant cameras and AI hats.
              </div>
              <div className="transition-transform duration-200 hover:-translate-y-0.5">
                <strong className="text-[#1D1D1F] block text-sm mb-1">Built-in Battery UPS</strong>
                Never suffer from filesystem corruption during sudden power drops.
              </div>
              <div className="transition-transform duration-200 hover:-translate-y-0.5">
                <strong className="text-[#1D1D1F] block text-sm mb-1">Standard 40 Pins</strong>
                Use your existing Raspberry Pi sensors, displays, and shields.
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

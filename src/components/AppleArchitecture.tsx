import React from 'react';
import { Smartphone, Cpu, Terminal, ShieldCheck, DollarSign, BatteryCharging, Zap } from 'lucide-react';

export const AppleArchitecture: React.FC = () => {
  return (
    <section id="architecture" className="py-24 bg-[#F5F5F7] text-[#1D1D1F] border-t border-black/[0.06]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 text-center mx-auto">
          <span className="text-xs font-semibold tracking-wider text-[#0071E3] uppercase block mb-2">
            System Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1D1D1F]">
            How RasQ splits the system into three parts.
          </h2>
          <p className="mt-3 text-base text-[#86868B] leading-relaxed">
            Instead of buying a standalone computer board to act as the brain of your robotics project, RasQ decouples heavy compute from physical I/O.
          </p>
        </div>

        {/* 3 Apple-Style Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          
          {/* Card 1: The Brain */}
          <div className="bg-white rounded-3xl p-8 border border-black/[0.06] shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#0071E3]/10 flex items-center justify-center text-[#0071E3]">
                <Smartphone className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-semibold text-[#86868B] block">Part 01</span>
                <h3 className="text-xl font-bold text-[#1D1D1F]">The Brain</h3>
                <p className="text-xs font-mono text-[#0071E3] mt-0.5">YOUR SMARTPHONE</p>
              </div>
              <p className="text-sm text-[#86868B] leading-relaxed">
                Provides the heavy computing power: 8-core CPU, dedicated AI processors (NPU), 4K camera, high-speed wireless connectivity, and built-in sensors.
              </p>
            </div>

            <div className="pt-4 border-t border-black/[0.06] text-xs font-mono text-[#86868B] space-y-1">
              <div>· Octa-core CPU + 32 TOPS NPU</div>
              <div>· 4K 60FPS Camera Optics</div>
              <div>· Built-in 5,000mAh Battery UPS</div>
            </div>
          </div>

          {/* Card 2: The Bridge */}
          <div className="bg-white rounded-3xl p-8 border border-black/[0.06] shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#34C759]/10 flex items-center justify-center text-[#34C759]">
                <Cpu className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-semibold text-[#86868B] block">Part 02</span>
                <h3 className="text-xl font-bold text-[#1D1D1F]">The Bridge</h3>
                <p className="text-xs font-mono text-[#34C759] mt-0.5">USB-C HARDWARE DOCK</p>
              </div>
              <p className="text-sm text-[#86868B] leading-relaxed">
                A custom hardware dock connects to your phone via USB-C. It translates digital commands into physical actions via standard hardware interfaces (GPIO, I²C, SPI, PWM).
              </p>
            </div>

            <div className="pt-4 border-t border-black/[0.06] text-xs font-mono text-[#86868B] space-y-1">
              <div>· ESP32-S3 Microcontroller Core</div>
              <div>· 40-Pin Raspberry Pi Header</div>
              <div>· Dual DC Motor H-Bridges</div>
            </div>
          </div>

          {/* Card 3: The Control Center */}
          <div className="bg-white rounded-3xl p-8 border border-black/[0.06] shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#AF52DE]/10 flex items-center justify-center text-[#AF52DE]">
                <Terminal className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-semibold text-[#86868B] block">Part 03</span>
                <h3 className="text-xl font-bold text-[#1D1D1F]">The Control Center</h3>
                <p className="text-xs font-mono text-[#AF52DE] mt-0.5">ANDROID APP & SDK</p>
              </div>
              <p className="text-sm text-[#86868B] leading-relaxed">
                A dedicated app routes data between the phone's internal sensors and the hardware dock. An intuitive Python SDK lets developers easily write their own robotics code.
              </p>
            </div>

            <div className="pt-4 border-t border-black/[0.06] text-xs font-mono text-[#86868B] space-y-1">
              <div>· Python 3.11 Local Execution</div>
              <div>· Sub-4ms USB CDC Serial Protocol</div>
              <div>· Zero Root / Stock Permissions</div>
            </div>
          </div>

        </div>

        {/* The Big Advantage Section (Full-width Apple Card) */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-black/[0.06] shadow-sm">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#34C759] uppercase mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span>The Big Advantage</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold text-[#1D1D1F] mb-3">
            Entirely plug-and-play. No modifications required.
          </h3>

          <p className="text-base text-[#86868B] leading-relaxed max-w-3xl mb-8">
            RasQ does not require modifying your smartphone's internal motherboard or voiding any warranties. Simply dock the phone to use it as an advanced edge-computing controller, and unplug it when you are done—drastically lowering the barrier to entry for complex robotics and IoT projects.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-black/[0.06] text-sm">
            <div className="flex items-start gap-3">
              <DollarSign className="w-5 h-5 text-[#34C759] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#1D1D1F] block">Saves $150+ per Rig</span>
                <span className="text-xs text-[#86868B] leading-snug">Avoids buying redundant cameras, Wi-Fi hats, and scarce boards.</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <BatteryCharging className="w-5 h-5 text-[#0071E3] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#1D1D1F] block">Built-in Battery UPS</span>
                <span className="text-xs text-[#86868B] leading-snug">Phone battery prevents sudden brownouts and corrupted SD cards.</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-[#FF9500] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#1D1D1F] block">High-Power Driving</span>
                <span className="text-xs text-[#86868B] leading-snug">Dock accepts 7V–24V DC input to charge phone and drive motors.</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

import React from 'react';
import { Smartphone, Cpu, Terminal, ShieldCheck, DollarSign, BatteryCharging, Zap, Compass } from 'lucide-react';

export const SimpleHowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-16 border-t border-neutral-900 bg-neutral-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
            <span>THE ARCHITECTURE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            How Phone Sensors Drive Physical Pins
          </h2>
          <p className="mt-2 text-sm text-neutral-400">
            A complete hardware-software bridge running locally on your Android device.
          </p>
        </div>

        {/* 3 Simple Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          
          {/* Part 1: The Brain */}
          <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-mono text-neutral-500">PART 1</span>
              <h3 className="text-lg font-bold text-white">The Phone's Sensors</h3>
              <p className="text-xs font-mono text-cyan-400 mt-0.5">BUILT-IN HARDWARE</p>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Your smartphone is already equipped with high-precision sensors: 6-axis gyroscope, 4K camera, ambient light sensor, microphone, and GNSS/GPS.
            </p>
            <div className="pt-2 border-t border-neutral-800 text-[11px] font-mono text-neutral-500">
              ✓ Gyroscope & Accelerometer<br />
              ✓ 60 FPS Camera Object Vision<br />
              ✓ Ambient Light & Microphone
            </div>
          </div>

          {/* Part 2: The Control Center */}
          <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-mono text-neutral-500">PART 2</span>
              <h3 className="text-lg font-bold text-white">Local Python Script</h3>
              <p className="text-xs font-mono text-sky-400 mt-0.5">EXECUTES ON PHONE</p>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              The RasQ daemon on Android lets you run standard Python scripts locally. Use intuitive syntax like <code className="text-sky-300">rasq.phone.sensors.gyroscope()</code> and <code className="text-sky-300">dock.servo(pin=18)</code>.
            </p>
            <div className="pt-2 border-t border-neutral-800 text-[11px] font-mono text-neutral-500">
              ✓ <code className="text-sky-300">import rasq</code> Python SDK<br />
              ✓ Sub-4ms USB CDC serial pipeline<br />
              ✓ Runs on Termux / Android service
            </div>
          </div>

          {/* Part 3: The Bridge */}
          <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-mono text-neutral-500">PART 3</span>
              <h3 className="text-lg font-bold text-white">The USB-C Dock</h3>
              <p className="text-xs font-mono text-teal-400 mt-0.5">40-PIN EXPANSION HEADER</p>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              The ESP32-S3 bridge dock connects to your phone via USB-C and translates Python calls into microsecond PWM pulses, digital GPIO states, or motor driver voltages.
            </p>
            <div className="pt-2 border-t border-neutral-800 text-[11px] font-mono text-neutral-500">
              ✓ Micro-Servos (PWM 18, 13)<br />
              ✓ Dual DC Motor H-Bridges (Pin 12)<br />
              ✓ Relays, LEDs, Buzzers & Solenoids
            </div>
          </div>

        </div>

        {/* The Big Advantage Box */}
        <div className="bg-gradient-to-r from-neutral-900 via-neutral-900/90 to-neutral-900 rounded-2xl border border-neutral-800 p-8 shadow-xl">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-3">
            <ShieldCheck className="w-4 h-4" />
            <span>THE BIG ADVANTAGE · 100% PLUG-AND-PLAY</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
            No soldering. No phone disassembly. Just plug and code.
          </h3>

          <p className="text-sm text-neutral-400 leading-relaxed max-w-3xl mb-6">
            RasQ operates over standard Android USB Host OTG without requiring root access or unlocking bootloaders. Simply plug in your USB-C cable to engage the hardware dock, test your robotics script in Python, and unplug when you are done.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-neutral-800 text-xs font-mono">
            <div className="flex items-center gap-2 text-neutral-300">
              <DollarSign className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Saves $150+ vs. buying external IMUs, cameras & boards</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-300">
              <BatteryCharging className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Built-in phone battery acts as uninterruptible power supply</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-300">
              <Zap className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Drive high-current 12V motors and servos with ease</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

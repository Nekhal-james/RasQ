import React from 'react';
import { ArrowDown, Cpu, Sparkles } from 'lucide-react';

interface SimpleHeroProps {
  onScrollToSimulator: () => void;
}

export const SimpleHero: React.FC<SimpleHeroProps> = ({ onScrollToSimulator }) => {
  return (
    <section className="pt-24 pb-8 text-center bg-neutral-950 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[250px] bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 mb-4 bg-neutral-900 px-3.5 py-1 rounded-full border border-neutral-800">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span>SMARTPHONE SENSORS · GPIO EXPANSION · LOCAL PYTHON</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight" style={{ textWrap: 'balance' }}>
          Connect real hardware to GPIO pins. Control it with your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-sky-400">phone's sensors</span>.
        </h1>

        <p className="mt-4 text-sm sm:text-base text-neutral-400 max-w-2xl mx-auto leading-relaxed">
          Plug servos, DC motors, LEDs, and relays into the RasQ USB-C dock. Write simple Python code that runs locally on your phone, reading the phone's gyroscope, camera, light sensor, or microphone to drive the physical pins.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onScrollToSimulator}
            className="px-6 py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-neutral-950 font-bold text-xs sm:text-sm transition-all shadow-md shadow-cyan-500/20 flex items-center gap-2 cursor-pointer"
          >
            <span>Try the Live Sensor & GPIO Simulator</span>
            <ArrowDown className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-neutral-500">
          <span>Python 3.11 on Android</span>
          <span>·</span>
          <span>40-Pin Header</span>
          <span>·</span>
          <span>Gyro, Camera, Light & Mic</span>
          <span>·</span>
          <span>Zero Rooting Required</span>
        </div>
      </div>
    </section>
  );
};

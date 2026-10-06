import React from 'react';
import { motion } from 'motion/react';
import { Camera, Cpu, Terminal, ArrowRight, Zap, Gauge } from 'lucide-react';

const STEPS = [
  { step: '01', title: 'Camera Capture', hw: 'Phone 4K Sensor', time: '4.2ms', icon: Camera, color: 'text-blue-500 bg-blue-50 border-blue-100' },
  { step: '02', title: 'NPU Inference', hw: 'On-Device NPU', time: '11.0ms', icon: Cpu, color: 'text-violet-500 bg-violet-50 border-violet-100' },
  { step: '03', title: 'Python Logic', hw: 'Octa-Core CPU', time: '0.8ms', icon: Terminal, color: 'text-emerald-500 bg-emerald-50 border-emerald-100' },
  { step: '04', title: 'USB CDC Bridge', hw: 'Type-C OTG', time: '0.4ms', icon: ArrowRight, color: 'text-amber-500 bg-amber-50 border-amber-100' },
  { step: '05', title: 'Actuation', hw: 'ESP32 + DRV8833', time: '0.1ms', icon: Zap, color: 'text-red-500 bg-red-50 border-red-100' },
];

export const PipelineSection: React.FC = () => {
  return (
    <section id="pipeline" className="relative py-28 sm:py-36 bg-white border-t border-black/[0.04]">
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
              03 — Real-Time Performance
            </span>
          </div>
          <h2
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] text-black leading-[1.1] max-w-4xl"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            <span className="text-gradient-accent">16.5 milliseconds.</span>{' '}
            <span className="text-black">Closed loop.</span>
          </h2>
          <p className="mt-5 text-lg text-black/50 max-w-2xl leading-relaxed">
            From photon hitting the camera sensor to motor torque — fully on-device, zero cloud, 60Hz continuous.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
          {STEPS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="group rounded-2xl border border-black/[0.06] bg-[#F5F5F7] p-5 flex flex-col justify-between hover:border-black/[0.1] transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono text-black/30 tracking-wider">{item.step}</span>
                    <div className={`w-7 h-7 rounded-lg border flex items-center justify-center shadow-sm ${item.color}`}>
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <h3 className="text-sm font-bold text-black">{item.title}</h3>
                  <div className="text-[11px] text-black/40 font-mono mt-0.5">{item.hw}</div>
                </div>

                <div className="mt-4 pt-4 border-t border-black/[0.04] flex items-baseline justify-between font-mono">
                  <span className="text-[10px] text-black/40">Latency</span>
                  <span className="text-sm font-bold text-black tabular-nums">{item.time}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl bg-black border border-black p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xl"
        >
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#38BDF8] mb-2">
              <Gauge className="w-4 h-4" />
              <span className="tracking-wider">TOTAL DETERMINISTIC CYCLE</span>
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white tabular-nums">
              16.5 ms <span className="text-lg font-normal text-white/50">≈ 60 Hz</span>
            </div>
            <p className="text-sm text-white/60 mt-2 max-w-lg">
              15× faster than human visual reaction time. Below the standard 20ms servo refresh window.
            </p>
          </div>

          <div className="shrink-0 bg-white/10 border border-white/20 px-6 py-4 rounded-2xl text-center font-mono">
            <span className="text-[10px] text-white/50 block">Cloud Dependency</span>
            <span className="text-[#34D399] font-bold text-base">Zero</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

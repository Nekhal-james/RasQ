import React from 'react';
import { motion } from 'motion/react';
import { Camera, Cpu, Terminal, Zap, ArrowRight, Gauge } from 'lucide-react';

const PIPELINE_STEPS = [
  {
    step: '01',
    title: 'Camera Capture',
    hardware: 'Phone 4K Sensor',
    latency: '4.2 ms',
    description: 'Hardware camera sensor streams NV21 raw frames directly to shared zero-copy Android memory buffers at 60 FPS.',
    icon: Camera,
    color: '#0071E3'
  },
  {
    step: '02',
    title: 'NPU Vision Inference',
    hardware: 'On-Device AI NPU',
    latency: '11.0 ms',
    description: 'Quantized INT8 YOLOv8 model runs on the smartphone NPU (15–45 TOPS), detecting objects and calculating bounding centroid.',
    icon: Cpu,
    color: '#7C3AED'
  },
  {
    step: '03',
    title: 'Python Control Logic',
    hardware: 'Octa-Core CPU',
    latency: '0.8 ms',
    description: 'Local Python script calculates proportional steering angles, PID corrections, and motor speeds with zero internet dependency.',
    icon: Terminal,
    color: '#10B981'
  },
  {
    step: '04',
    title: 'USB CDC Bridge',
    hardware: 'Type-C OTG Link',
    latency: '0.4 ms',
    description: 'Compact 8-byte binary control packet transmitted over 921.6K baud USB CDC direct serial interface to dock MCU.',
    icon: ArrowRight,
    color: '#F59E0B'
  },
  {
    step: '05',
    title: 'Physical Actuation',
    hardware: 'ESP32-S3 + DRV8833',
    latency: '0.1 ms',
    description: 'Hardware PWM timers immediately update pulse widths on Pin 18 (servo) and dual H-bridge motor coils.',
    icon: Zap,
    color: '#EF4444'
  }
];

export const ApplePipeline: React.FC = () => {
  return (
    <section id="architecture" className="py-20 sm:py-28 bg-[#FBFBFD] text-[#1D1D1F]">
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
            03. Real-Time Performance
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1D1D1F]">
            16.5 milliseconds closed loop.
          </h2>
          <p className="mt-4 text-base text-[#6E6E73] leading-relaxed">
            Autonomous robotics requires immediate reaction times. By eliminating network hops and executing AI directly on the phone’s silicon, RasQ achieves continuous 60Hz closed-loop control.
          </p>
        </motion.div>

        {/* 5-Step Pipeline Flow Bento Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
          {PIPELINE_STEPS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white rounded-2xl p-5 border border-black/[0.06] shadow-[0_2px_6px_rgba(0,0,0,0.02)] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-[#86868B] mb-3">
                    <span>STEP {item.step}</span>
                    <Icon className="w-4 h-4" style={{ color: item.color }} />
                  </div>

                  <h3 className="text-sm font-bold text-[#1D1D1F]">{item.title}</h3>
                  <div className="text-[11px] font-mono text-[#6E6E73] mt-0.5">{item.hardware}</div>

                  <p className="text-xs text-[#6E6E73] mt-3 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-black/[0.06] flex items-baseline justify-between font-mono">
                  <span className="text-[10px] text-[#86868B]">Latency:</span>
                  <span className="text-xs font-bold text-[#1D1D1F] tabular-nums">{item.latency}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Total Latency Summary Banner */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.75, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="bg-[#1D1D1F] text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
        >
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-[#38BDF8]">
              <Gauge className="w-4 h-4" />
              <span>TOTAL DETERMINISTIC CYCLE TIME</span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold tracking-tight tabular-nums">
              16.5 ms <span className="text-base font-normal text-white/60">(~60 Hz Continuous Sampling)</span>
            </div>
            <p className="text-xs text-white/70 max-w-xl">
              Faster than human visual reaction time (250ms) and standard hobby servo refresh limits (20ms/50Hz).
            </p>
          </div>

          <div className="shrink-0 bg-white/10 px-5 py-3 rounded-2xl text-center border border-white/10 font-mono text-xs">
            <span className="text-white/60 block text-[10px]">Cloud Latency</span>
            <span className="text-[#34D399] font-bold text-sm">0.0 ms (Offline)</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

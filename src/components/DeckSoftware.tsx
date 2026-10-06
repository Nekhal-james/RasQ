import React from 'react';
import { motion } from 'motion/react';

export const DeckSoftware: React.FC = () => {
  const stackLayers = [
    { num: '01', title: 'Application' },
    { num: '02', title: 'RasQ SDK' },
    { num: '03', title: 'Hardware & USB manager' },
    { num: '04', title: 'RasQ protocol over USB' },
    { num: '05', title: 'I/O controller firmware' },
  ];

  const pipelineSteps = [
    'Camera / sensors',
    'On-device AI',
    'Decision logic',
    'USB to I/O controller',
    'Actuator',
  ];

  return (
    <section id="software" className="py-24 bg-[#F8F9FA] text-[#0F172A] border-b border-black/[0.06]">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* PART A: Software Stack from Slide 6 */}
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14"
        >
          <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#00A3C4] uppercase mb-2">
            <span>05</span>
            <span>·</span>
            <span>SOFTWARE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0F172A]">
            A clear stack from app to actuator.
          </h2>
        </motion.div>

        {/* Slide 6 Stack & Protocol Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-24 items-center">
          
          {/* Left: 5 Software Stack Layers */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-6 space-y-3"
          >
            {stackLayers.map(l => (
              <div 
                key={l.num} 
                className="flex items-center gap-4 p-3.5 bg-white rounded-xl border border-black/[0.06]"
              >
                <span className="text-xs font-mono font-bold text-[#0080A0]">{l.num}</span>
                <span className="text-sm font-bold text-[#0F172A]">{l.title}</span>
              </div>
            ))}
          </motion.div>

          {/* Right: Protocol Box and Note */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.75, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-6 space-y-4"
          >
            <div className="bg-[#101828] text-white p-6 rounded-2xl font-mono text-xs space-y-1 shadow-sm">
              <div className="text-[#38BDF8]">GPIO_WRITE|17|1</div>
              <div className="text-white/60">→ OK|GPIO_WRITE|17</div>
              <div className="text-[#38BDF8] pt-2">I2C_READ|0x76|0xF7|6</div>
              <div className="text-white/60">→ I2C_DATA|…</div>
            </div>

            <p className="text-sm text-[#475569] leading-relaxed">
              The Android app detects the dock, talks to the I/O controller, exposes phone sensor data, shows real-time hardware data and provides APIs for external devices.
            </p>
          </motion.div>

        </div>

        {/* PART B: SDK & AI from Slide 7 */}
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="pt-12 border-t border-black/[0.08] mb-14"
        >
          <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#00A3C4] uppercase mb-2">
            <span>06</span>
            <span>·</span>
            <span>SDK AND AI</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0F172A]">
            Simple code in, on-device intelligence out.
          </h2>
        </motion.div>

        {/* Slide 7 Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Left: Code Box from Slide 7 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-7 space-y-3"
          >
            <div className="bg-[#101828] text-white p-6 rounded-2xl font-mono text-xs leading-relaxed shadow-sm">
              <span className="text-[#38BDF8]">from</span> rasq <span className="text-[#38BDF8]">import</span> GPIO, Sensor, Motor
              <br /><br />
              GPIO.write(<span className="text-[#FBBF24]">17</span>, <span className="text-[#FBBF24]">1</span>)
              <br />
              temp = Sensor.read(<span className="text-[#34D399]">"temperature"</span>)
              <br />
              Motor.set_speed(<span className="text-[#FBBF24]">1</span>, <span className="text-[#FBBF24]">70</span>)
            </div>

            <p className="text-xs font-mono text-[#64748B]">
              An SBC-style developer experience on a phone.
            </p>
          </motion.div>

          {/* Right: Sensing-to-Actuator Pipeline */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.75, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-5 space-y-3"
          >
            {pipelineSteps.map((step, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className={`w-3.5 h-3.5 rounded-full border-2 ${
                  idx === pipelineSteps.length - 1 
                    ? 'bg-[#0080A0] border-[#0080A0]' 
                    : 'border-[#0080A0] bg-white'
                }`} />
                <span className={`text-sm font-semibold ${
                  idx === pipelineSteps.length - 1 ? 'text-[#0080A0]' : 'text-[#0F172A]'
                }`}>
                  {step}
                </span>
              </div>
            ))}
          </motion.div>

        </div>

      </div>
    </section>
  );
};

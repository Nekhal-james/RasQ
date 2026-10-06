import React from 'react';
import { motion } from 'motion/react';

export const DeckIdea: React.FC = () => {
  const steps = [
    { num: '1', title: 'Smartphone', desc: 'Compute & Sensors' },
    { num: '2', title: 'Android control layer', desc: 'Daemon & HAL' },
    { num: '3', title: 'USB-C', desc: 'High-speed link & power' },
    { num: '4', title: 'I/O dock', desc: 'Physical expansion', highlight: true },
  ];

  return (
    <section id="idea" className="py-24 bg-white text-[#0F172A] border-b border-black/[0.06]">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Header from Slide 3 */}
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#00A3C4] uppercase mb-2">
            <span>02</span>
            <span>·</span>
            <span>OUR IDEA</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0F172A]">
            The smartphone becomes the compute module.
          </h2>
        </motion.div>

        {/* 4-Step Flow Chart from Slide 3 */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 relative">
            {steps.map((s, idx) => (
              <div 
                key={s.num} 
                className="relative flex flex-col items-center text-center p-6 rounded-2xl bg-[#F8F9FA] border border-black/[0.06]"
              >
                {/* Number Circle */}
                <div className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg mb-4 shadow-xs ${
                  s.highlight 
                    ? 'bg-[#007B99] text-white' 
                    : 'bg-white text-[#007B99] border border-black/[0.08]'
                }`}>
                  {s.num}
                </div>

                <div className="font-bold text-[#0F172A] text-base leading-tight mb-1">
                  {s.title}
                </div>
                <div className="text-xs text-[#64748B] font-mono">
                  {s.desc}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Bus Protocol Badges */}
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center space-y-4"
        >
          <div className="text-xl sm:text-2xl font-extrabold tracking-wider text-[#007B99] font-mono">
            GPIO · I²C · SPI · UART · PWM · ADC
          </div>

          <p className="text-sm text-[#475569] max-w-xl mx-auto">
            For students, developers, robotics teams, researchers and makers. No motherboard modification.
          </p>
        </motion.div>

      </div>
    </section>
  );
};

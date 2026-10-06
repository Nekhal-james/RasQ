import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

const FAQ_ITEMS = [
  {
    q: 'Does RasQ require rooting or jailbreaking the phone?',
    a: 'No. RasQ runs 100% within unprivileged Android userland on stock Android 10+. Communication uses standard USB Host APIs and in-kernel CDC-ACM drivers. No bootloader unlock, no custom ROM, no voided warranty.',
  },
  {
    q: 'How does it prevent motor brownouts and SD card corruption?',
    a: 'The phone runs on its own 5,000mAh battery, acting as an isolated UPS. The dock accepts external 7V–24V power for motors, with optically isolated logic rails. No shared power plane = no voltage dips = no corruption.',
  },
  {
    q: 'Can I use old phones with cracked screens?',
    a: 'Absolutely — RasQ is designed to repurpose discarded smartphones. The daemon auto-starts on USB dock connection. Control headlessly via Wi-Fi SSH, WebRTC streaming, or ADB.',
  },
  {
    q: 'Is the GPIO header compatible with Raspberry Pi HATs?',
    a: 'Yes. Identical 2×20 header, 2.54mm pitch, 3.3V logic, standard I²C (pins 3 & 5), SPI (pins 19, 21, 23, 24, 26), and hardware PWM. Drop-in compatibility with existing HATs and sensors.',
  },
  {
    q: 'What is the communication latency?',
    a: 'Round-trip USB CDC transmission: <0.8ms at 921,600 baud. Combined with camera capture (4.2ms) and NPU inference (11ms), the total closed-loop is 16.5ms (~60Hz) — satisfying real-time requirements for mobile rovers, arms, and balancing bots.',
  },
];

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative py-28 sm:py-36 bg-[#FBFBFD] border-t border-black/[0.04]">
      <div className="max-w-3xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="w-8 h-px bg-[#0071E3]" />
            <span className="text-xs font-mono font-semibold text-[#0071E3] tracking-widest uppercase">
              FAQ
            </span>
            <div className="w-8 h-px bg-[#0071E3]" />
          </div>
          <h2
            className="text-3xl sm:text-4xl font-extrabold tracking-[-0.03em] text-black"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Technical Questions
          </h2>
        </motion.div>

        <div className="space-y-3">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: idx * 0.04, ease: [0.16, 1, 0.3, 1] }}
                className={`rounded-2xl border transition-colors ${
                  isOpen ? 'border-[#0071E3]/20 bg-[#0071E3]/[0.02]' : 'border-black/[0.06] bg-white'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full py-5 px-6 flex items-center justify-between text-left cursor-pointer gap-4"
                >
                  <span className="text-sm font-semibold text-black">{item.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-[#0071E3]' : 'text-black/30'
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 text-sm text-black/60 leading-relaxed border-t border-black/[0.04] pt-4">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

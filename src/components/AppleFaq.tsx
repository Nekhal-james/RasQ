import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'Does RasQ require rooting or jailbreaking the smartphone?',
    answer: 'No. RasQ functions 100% within unprivileged userland on stock Android 10 and above. Communication with the ESP32-S3 microcontroller uses standard Android USB Host APIs (android.hardware.usb) and CDC-ACM serial drivers. You do not need to unlock the bootloader, flash custom ROMs, or void warranties.'
  },
  {
    question: 'How does the hardware prevent motor brownouts and SD card corruption?',
    answer: 'Traditional Raspberry Pis reboot whenever large DC motors draw peak stall current, frequently corrupting the microSD filesystem. With RasQ, the smartphone runs on its own internal 5,000mAh lithium battery, acting as an isolated uninterruptible power supply (UPS). The dock accepts wide-range external battery power (7V to 24V) to drive motors directly, while optically isolating the logic rails.'
  },
  {
    question: 'Can RasQ utilize old smartphones with cracked screens?',
    answer: 'Yes. RasQ is designed specifically to repurpose broken or discarded smartphones. The RasQ daemon starts automatically on USB dock connection. Developers can control the robot headlessly via Wi-Fi SSH, WebRTC video streaming, or USB debugging (adb).'
  },
  {
    question: 'Is the 40-pin header 100% electrically compatible with Raspberry Pi HATs?',
    answer: 'Yes. The RasQ carrier board features an identical 2x20 header with 2.54mm pitch matching the Raspberry Pi specification. It provides 3.3V logic levels, standard I²C (pins 3 & 5), SPI (pins 19, 21, 23, 24, 26), and hardware PWM timers, allowing you to mount existing sensors, displays, and shields directly.'
  },
  {
    question: 'What is the communication latency between the smartphone and the dock?',
    answer: 'Round-trip transmission over the direct USB-C CDC interface takes under 0.8 milliseconds at 921,600 baud. Combined with camera capture (4.2ms) and INT8 quantized NPU neural inference (11ms), the entire closed-loop control pipeline runs in 16.5ms (~60Hz), easily satisfying the real-time requirements of mobile rovers, robotic arms, and balancing bots.'
  }
];

export const AppleFaq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-20 sm:py-28 bg-[#FBFBFD] text-[#1D1D1F]">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="text-xs font-mono text-[#0071E3] tracking-wider uppercase mb-2">
            06. Technical Invariants
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1D1D1F]">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-base text-[#6E6E73] leading-relaxed">
            Direct answers to the most common engineering and architecture inquiries.
          </p>
        </motion.div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 0.5, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white rounded-2xl border border-black/[0.06] overflow-hidden shadow-[0_1px_4px_rgba(0,0,0,0.02)] transition-shadow"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full py-5 px-6 sm:px-8 flex items-center justify-between text-left cursor-pointer gap-4 hover:bg-black/[0.01] transition-colors"
                >
                  <span className="text-sm sm:text-base font-bold text-[#1D1D1F]">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#86868B] shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-[#0071E3]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 sm:px-8 pb-6 text-xs sm:text-sm text-[#6E6E73] leading-relaxed border-t border-black/[0.04] pt-4">
                    {item.answer}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

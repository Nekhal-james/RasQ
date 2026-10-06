import React from 'react';
import { motion } from 'motion/react';
import { DollarSign } from 'lucide-react';

export const HackathonEconomics: React.FC = () => {
  return (
    <section id="economics" className="py-24 bg-[#FBFBFD] text-[#111827] border-t border-black/[0.08]">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mb-12"
        >
          <div className="text-xs font-mono font-medium tracking-wider text-[#0066CC] uppercase mb-2">
            WHY THIS MATTERS
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111827]">
            Raspberry Pi 5 vs. RasQ Platform.
          </h2>
          <p className="mt-3 text-base text-[#4B5563] leading-relaxed">
            Developers routinely buy separate cameras, AI hats, Wi-Fi dongles, and battery shields—ignoring that modern smartphones already pack superior versions of these components.
          </p>
        </motion.div>

        {/* Comparison Table */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white rounded-3xl border border-black/[0.08] overflow-hidden shadow-xs mb-12"
        >
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-[#F9FAFB] text-[#4B5563] border-b border-black/[0.08]">
              <tr>
                <th className="py-3.5 px-4 font-semibold">Subsystem</th>
                <th className="py-3.5 px-4 font-semibold">Raspberry Pi 5 Stack</th>
                <th className="py-3.5 px-4 font-semibold">RasQ Platform</th>
                <th className="py-3.5 px-4 font-semibold text-right">Advantage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/[0.06] text-[#111827]">
              
              <tr className="hover:bg-black/[0.01] transition-colors">
                <td className="py-3.5 px-4 font-bold text-[#111827]">
                  Compute & AI NPU
                </td>
                <td className="py-3.5 px-4 text-[#4B5563]">
                  Pi 5 8GB ($80) + Hailo-8L HAT ($70)<br />
                  <span className="text-[11px] text-[#6B7280]">13 TOPS · Adds physical height</span>
                </td>
                <td className="py-3.5 px-4 text-[#111827]">
                  Phone Octa-Core SoC ($0)<br />
                  <span className="text-[11px] text-[#0066CC]">15–45 TOPS on-device NPU</span>
                </td>
                <td className="py-3.5 px-4 text-right font-bold text-[#059669] tabular-nums">
                  3.5x Faster NPU
                </td>
              </tr>

              <tr className="hover:bg-black/[0.01] transition-colors">
                <td className="py-3.5 px-4 font-bold text-[#111827]">
                  Camera Optics
                </td>
                <td className="py-3.5 px-4 text-[#4B5563]">
                  Pi Camera Module 3 ($35)<br />
                  <span className="text-[11px] text-[#6B7280]">Fragile CSI ribbon cable</span>
                </td>
                <td className="py-3.5 px-4 text-[#111827]">
                  Integrated 4K/60FPS HDR Camera ($0)<br />
                  <span className="text-[11px] text-[#0066CC]">Hardware Optical Image Stabilization</span>
                </td>
                <td className="py-3.5 px-4 text-right font-bold text-[#059669] tabular-nums">
                  Protected Optics
                </td>
              </tr>

              <tr className="hover:bg-black/[0.01] transition-colors">
                <td className="py-3.5 px-4 font-bold text-[#111827]">
                  Battery & UPS
                </td>
                <td className="py-3.5 px-4 text-[#4B5563]">
                  Waveshare UPS HAT + 18650 Cells ($35)<br />
                  <span className="text-[11px] text-[#6B7280]">Prone to brownout restarts</span>
                </td>
                <td className="py-3.5 px-4 text-[#111827]">
                  Internal 5,000mAh Battery ($0)<br />
                  <span className="text-[11px] text-[#0066CC]">Built-in uninterruptible power supply</span>
                </td>
                <td className="py-3.5 px-4 text-right font-bold text-[#059669] tabular-nums">
                  Zero Corrupt SD Cards
                </td>
              </tr>

              <tr className="hover:bg-black/[0.01] transition-colors">
                <td className="py-3.5 px-4 font-bold text-[#111827]">
                  Carrier & Motor I/O
                </td>
                <td className="py-3.5 px-4 text-[#4B5563]">
                  Dual DC Motor Shield ($25)<br />
                  <span className="text-[11px] text-[#6B7280]">Stacks on header, blocks airflow</span>
                </td>
                <td className="py-3.5 px-4 text-[#111827]">
                  RasQ Carrier Dock with DRV8833 ($29)<br />
                  <span className="text-[11px] text-[#0066CC]">Built directly into dock carrier PCB</span>
                </td>
                <td className="py-3.5 px-4 text-right font-bold text-[#0066CC] tabular-nums">
                  Included in Dock
                </td>
              </tr>

              <tr className="bg-[#F9FAFB] font-bold">
                <td className="py-4 px-4 text-sm text-[#111827]">
                  Total Cost per Rig
                </td>
                <td className="py-4 px-4 text-sm text-[#DC2626] tabular-nums">
                  $305.00
                </td>
                <td className="py-4 px-4 text-sm text-[#059669] tabular-nums">
                  $29.00 (with existing phone)
                </td>
                <td className="py-4 px-4 text-sm text-right text-[#059669] tabular-nums">
                  Save 90% ($276 / robot)
                </td>
              </tr>

            </tbody>
          </table>
        </motion.div>

      </div>
    </section>
  );
};

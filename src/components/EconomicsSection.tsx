import React, { useState } from 'react';
import { motion } from 'motion/react';

const BOM_DATA = [
  { sub: 'Compute & SoC', pi: 'Raspberry Pi 5 (8GB)', piCost: 80, rasq: 'Phone SoC (Existing)', rasqCost: 0 },
  { sub: 'AI Accelerator', pi: 'Hailo-8L AI Kit (13 TOPS)', piCost: 70, rasq: 'Integrated NPU (15–45 TOPS)', rasqCost: 0 },
  { sub: 'Camera Optics', pi: 'Pi Camera Module 3 Wide', piCost: 35, rasq: '4K OIS Phone Camera', rasqCost: 0 },
  { sub: 'Battery & UPS', pi: 'Waveshare UPS HAT + 18650s', piCost: 35, rasq: 'Phone 5,000mAh Battery', rasqCost: 0 },
  { sub: 'Motor Driver', pi: 'L298N Motor HAT', piCost: 25, rasq: 'Integrated DRV8833', rasqCost: 0 },
  { sub: 'Display / Debug', pi: '5" DSI Touch Display', piCost: 60, rasq: 'Phone AMOLED Screen', rasqCost: 0 },
  { sub: 'Connectivity', pi: 'Wi-Fi/BT (No Cellular)', piCost: 0, rasq: '5G + Wi-Fi 6E + BLE', rasqCost: 0 },
  { sub: 'Carrier Dock', pi: 'N/A', piCost: 0, rasq: 'RasQ USB-C Carrier', rasqCost: 29 },
];

const piTotal = BOM_DATA.reduce((s, d) => s + d.piCost, 0);
const rasqTotal = BOM_DATA.reduce((s, d) => s + d.rasqCost, 0);

export const EconomicsSection: React.FC = () => {
  const [fleet, setFleet] = useState(4);
  const savings = (piTotal - rasqTotal) * fleet;

  return (
    <section id="economics" className="relative py-28 sm:py-36 bg-[#FBFBFD] border-t border-black/[0.04]">
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
              04 — Bill of Materials
            </span>
          </div>
          <h2
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] text-black leading-[1.1] max-w-4xl"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Save <span className="text-gradient-accent">90%</span> by repurposing silicon you already own.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl border border-black/[0.06] bg-white overflow-hidden mb-10 shadow-sm"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="bg-[#F5F5F7] border-b border-black/[0.06]">
                  <th className="py-4 px-6 font-semibold text-black/60">Subsystem</th>
                  <th className="py-4 px-6 font-semibold text-black/60">Raspberry Pi 5 Stack</th>
                  <th className="py-4 px-6 font-semibold text-black/60">RasQ Platform</th>
                  <th className="py-4 px-6 font-semibold text-black/60 text-right">Savings</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/[0.04]">
                {BOM_DATA.map((row, idx) => (
                  <tr key={idx} className="hover:bg-black/[0.01] transition-colors">
                    <td className="py-4 px-6 font-bold text-black">{row.sub}</td>
                    <td className="py-4 px-6 text-black/60">
                      <span>{row.pi}</span>
                      {row.piCost > 0 && <span className="ml-2 text-red-600/70">${row.piCost}</span>}
                    </td>
                    <td className="py-4 px-6 text-black/80 font-medium">
                      <span>{row.rasq}</span>
                      {row.rasqCost > 0 && <span className="ml-2 text-[#0071E3]">${row.rasqCost}</span>}
                      {row.rasqCost === 0 && <span className="ml-2 text-emerald-600/70">$0</span>}
                    </td>
                    <td className="py-4 px-6 text-right font-bold text-emerald-600/80 tabular-nums">
                      {row.piCost - row.rasqCost > 0 ? `$${row.piCost - row.rasqCost}` : '—'}
                    </td>
                  </tr>
                ))}
                <tr className="bg-[#F5F5F7]">
                  <td className="py-5 px-6 font-bold text-black text-sm">Total BOM</td>
                  <td className="py-5 px-6 font-bold text-red-600 tabular-nums text-sm">${piTotal}</td>
                  <td className="py-5 px-6 font-bold text-[#0071E3] tabular-nums text-sm">${rasqTotal}</td>
                  <td className="py-5 px-6 text-right font-bold text-emerald-600 tabular-nums text-sm">
                    ${piTotal - rasqTotal} saved (90%)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl border border-black/[0.06] bg-white p-6 sm:p-8 shadow-sm"
        >
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-base font-bold text-black">Fleet Savings Calculator</h3>
              <p className="text-xs text-black/50 mt-1">Scale across your robotics lab or hackathon fleet.</p>
            </div>
            <div className="text-xs font-mono text-black/50">
              Fleet: <span className="text-black font-bold bg-[#F5F5F7] border border-black/[0.06] px-3 py-1 rounded-full">{fleet} {fleet === 1 ? 'robot' : 'robots'}</span>
            </div>
          </div>

          <input
            type="range"
            min={1}
            max={20}
            value={fleet}
            onChange={(e) => setFleet(parseInt(e.target.value, 10))}
            className="w-full accent-[#0071E3] cursor-pointer mb-2"
          />
          <div className="flex justify-between text-[11px] font-mono text-black/40 mb-6">
            <span>1 Solo</span>
            <span>10 Club</span>
            <span>20 Full Lab</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-black/[0.06]">
            <div className="bg-[#F5F5F7] border border-black/[0.04] p-5 rounded-2xl text-center">
              <div className="text-[11px] font-mono text-black/50">Pi Stack</div>
              <div className="text-2xl font-bold text-black mt-1 tabular-nums">${(piTotal * fleet).toLocaleString()}</div>
            </div>
            <div className="bg-white border border-[#0071E3]/20 p-5 rounded-2xl text-center shadow-sm">
              <div className="text-[11px] font-mono text-black/50">RasQ Platform</div>
              <div className="text-2xl font-bold text-[#0071E3] mt-1 tabular-nums">${(rasqTotal * fleet).toLocaleString()}</div>
            </div>
            <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-2xl text-center">
              <div className="text-[11px] font-mono text-emerald-700">Total Saved</div>
              <div className="text-2xl font-bold text-emerald-600 mt-1 tabular-nums">${savings.toLocaleString()}</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { DollarSign, Sliders } from 'lucide-react';

interface BOMItem {
  subsystem: string;
  piStack: { name: string; cost: number; notes: string };
  rasq: { name: string; cost: number; notes: string };
  verdict: string;
}

const BOM_DATA: BOMItem[] = [
  {
    subsystem: 'Compute Host & SoC',
    piStack: { name: 'Raspberry Pi 5 (8GB RAM)', cost: 80, notes: 'Requires active cooling fan' },
    rasq: { name: 'Repurposed Smartphone SoC', cost: 0, notes: 'Utilizes existing phone silicon' },
    verdict: '$80 Saved'
  },
  {
    subsystem: 'AI Vision Accelerator',
    piStack: { name: 'Raspberry Pi AI Kit (Hailo-8L)', cost: 70, notes: '13 TOPS M.2 PCIe HAT' },
    rasq: { name: 'Integrated Smartphone NPU', cost: 0, notes: '15–45 TOPS dedicated neural engine' },
    verdict: '$70 Saved'
  },
  {
    subsystem: 'Camera Optics & Sensor',
    piStack: { name: 'Pi Camera Module 3 Wide', cost: 35, notes: 'Fragile exposed ribbon cable' },
    rasq: { name: 'Smartphone 4K OIS Camera', cost: 0, notes: 'Protected chassis lens with autofocus' },
    verdict: '$35 Saved'
  },
  {
    subsystem: 'Battery & UPS Subsystem',
    piStack: { name: 'Waveshare UPS HAT + 18650s', cost: 35, notes: 'Prone to motor brownouts' },
    rasq: { name: 'Phone 5,000mAh Lithium Battery', cost: 0, notes: 'Built-in uninterrupted power source' },
    verdict: '$35 Saved'
  },
  {
    subsystem: 'Dual Motor Driver',
    piStack: { name: 'Stackable L298N / Dual Motor HAT', cost: 25, notes: 'Adds height and thermal load' },
    rasq: { name: 'Integrated DRV8833 on Dock', cost: 0, notes: 'Included in RasQ carrier PCB' },
    verdict: 'Included'
  },
  {
    subsystem: 'Wireless & Connectivity',
    piStack: { name: 'Integrated Pi Wi-Fi / Bluetooth', cost: 0, notes: 'No cellular fallback' },
    rasq: { name: 'Integrated 5G + Wi-Fi 6E + BLE', cost: 0, notes: 'Global cellular and long-range hotspot' },
    verdict: 'Parity + 5G'
  },
  {
    subsystem: 'Hardware Carrier Dock',
    piStack: { name: 'Not Required', cost: 0, notes: 'Direct Pi pins' },
    rasq: { name: 'RasQ USB-C Carrier Dock', cost: 29, notes: 'ESP32-S3 + 40-pin header + motor drivers' },
    verdict: '$29 Dock Cost'
  },
  {
    subsystem: 'Touchscreen / Telemetry UI',
    piStack: { name: '5-inch DSI Touch Display', cost: 60, notes: 'Optional but needed for field debugging' },
    rasq: { name: 'Smartphone AMOLED Display', cost: 0, notes: '120Hz high-res touch interface' },
    verdict: '$60 Saved'
  }
];

export const AppleEconomics: React.FC = () => {
  const [fleetSize, setFleetSize] = useState<number>(4);

  const piUnitCost = BOM_DATA.reduce((sum, item) => sum + item.piStack.cost, 0); // $305
  const rasqUnitCost = BOM_DATA.reduce((sum, item) => sum + item.rasq.cost, 0); // $29
  const unitSavings = piUnitCost - rasqUnitCost; // $276
  const totalSavings = unitSavings * fleetSize;

  return (
    <section id="economics" className="py-20 sm:py-28 bg-[#FBFBFD] text-[#1D1D1F]">
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
            04. Bill of Materials
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1D1D1F]">
            The economics of repurposing silicon.
          </h2>
          <p className="mt-4 text-base text-[#6E6E73] leading-relaxed">
            By shifting from purchasing fragmented standalone SBC accessories to a unified USB-C carrier, hardware teams eliminate up to 90% of their prototype budget.
          </p>
        </motion.div>

        {/* Bill of Materials Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white rounded-3xl border border-black/[0.06] overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.02)] mb-12"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-[#F5F5F7] text-[#6E6E73] border-b border-black/[0.06]">
                <tr>
                  <th className="py-4 px-6 font-semibold">Subsystem Required</th>
                  <th className="py-4 px-6 font-semibold">Raspberry Pi 5 Stack</th>
                  <th className="py-4 px-6 font-semibold">RasQ Carrier Platform</th>
                  <th className="py-4 px-6 font-semibold text-right">Unit Delta</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/[0.04] text-[#1D1D1F]">
                {BOM_DATA.map((item, idx) => (
                  <tr key={idx} className="hover:bg-black/[0.01] transition-colors">
                    <td className="py-4 px-6 font-bold text-[#1D1D1F]">
                      {item.subsystem}
                    </td>
                    <td className="py-4 px-6 text-[#6E6E73]">
                      <div className="font-medium text-[#1D1D1F]">{item.piStack.name}</div>
                      <div className="text-[11px] text-[#86868B]">{item.piStack.notes} (${item.piStack.cost})</div>
                    </td>
                    <td className="py-4 px-6 text-[#1D1D1F]">
                      <div className="font-medium">{item.rasq.name}</div>
                      <div className="text-[11px] text-[#0071E3]">{item.rasq.notes} (${item.rasq.cost})</div>
                    </td>
                    <td className="py-4 px-6 text-right font-bold text-[#10B981] tabular-nums">
                      {item.verdict}
                    </td>
                  </tr>
                ))}

                {/* Total Row */}
                <tr className="bg-[#F5F5F7] font-bold text-sm">
                  <td className="py-5 px-6 text-[#1D1D1F]">
                    Total Bill of Materials
                  </td>
                  <td className="py-5 px-6 text-[#E11D48] tabular-nums">
                    ${piUnitCost}.00
                  </td>
                  <td className="py-5 px-6 text-[#10B981] tabular-nums">
                    ${rasqUnitCost}.00
                  </td>
                  <td className="py-5 px-6 text-right text-[#10B981] tabular-nums">
                    Save $276 per robot (90%)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Interactive Fleet Savings Calculator for Hackathons & University Labs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white rounded-3xl border border-black/[0.06] p-6 sm:p-8 shadow-[0_2px_8px_rgba(0,0,0,0.02)]"
        >
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-base font-bold text-[#1D1D1F]">Hackathon & Lab Fleet Calculator</h3>
              <p className="text-xs text-[#6E6E73] mt-0.5">
                Calculate budget saved across multiple robot builds or classroom kits.
              </p>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="text-[#86868B]">Fleet Size:</span>
              <span className="font-bold text-[#1D1D1F] bg-[#F5F5F7] px-3 py-1 rounded-full tabular-nums">
                {fleetSize} {fleetSize === 1 ? 'Robot' : 'Robots'}
              </span>
            </div>
          </div>

          {/* Slider Control */}
          <div className="space-y-2 mb-8">
            <input
              type="range"
              min={1}
              max={20}
              step={1}
              value={fleetSize}
              onChange={(e) => setFleetSize(parseInt(e.target.value, 10))}
              className="w-full accent-[#0071E3] cursor-pointer"
            />
            <div className="flex justify-between text-[11px] font-mono text-[#86868B]">
              <span>1 Unit (Solo Project)</span>
              <span>10 Units (Robotics Club)</span>
              <span>20 Units (Full Lab Class)</span>
            </div>
          </div>

          {/* Calculated Savings Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-black/[0.06] text-center">
            <div className="bg-[#F5F5F7] p-4 rounded-2xl">
              <div className="text-[11px] font-mono text-[#86868B]">Raspberry Pi Stack</div>
              <div className="text-xl font-bold text-[#1D1D1F] mt-1 tabular-nums">
                ${(piUnitCost * fleetSize).toLocaleString()}
              </div>
            </div>

            <div className="bg-[#F5F5F7] p-4 rounded-2xl">
              <div className="text-[11px] font-mono text-[#86868B]">RasQ Platform</div>
              <div className="text-xl font-bold text-[#0071E3] mt-1 tabular-nums">
                ${(rasqUnitCost * fleetSize).toLocaleString()}
              </div>
            </div>

            <div className="bg-[#ECFDF5] p-4 rounded-2xl border border-[#A7F3D0]/60">
              <div className="text-[11px] font-mono text-[#059669]">Total Capital Saved</div>
              <div className="text-xl font-bold text-[#059669] mt-1 tabular-nums">
                ${totalSavings.toLocaleString()}
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

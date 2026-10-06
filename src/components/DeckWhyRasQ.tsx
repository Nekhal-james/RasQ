import React from 'react';
import { motion } from 'motion/react';

export const DeckWhyRasQ: React.FC = () => {
  const comparisonRows = [
    { metric: 'Compute', pi: 'Dedicated SBC', rasq: 'Existing phone (CPU/GPU/NPU)' },
    { metric: 'Cost', pi: 'Rising cost, supply issues', rasq: 'Reuses the phone you own' },
    { metric: 'Camera', pi: 'Separate module', rasq: 'Built in' },
    { metric: 'Connectivity', pi: 'Wi-Fi/BT variants', rasq: 'Wi-Fi, Bluetooth, 5G built in' },
    { metric: 'Sensors', pi: 'Add-on boards', rasq: 'IMU, GPS and more built in' },
    { metric: 'GPIO', pi: 'On-board header', rasq: 'Dock-provided GPIO' },
  ];

  return (
    <section id="why" className="py-24 bg-[#F8F9FA] text-[#0F172A] border-b border-black/[0.06]">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Header from Slide 4 */}
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14"
        >
          <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#00A3C4] uppercase mb-2">
            <span>03</span>
            <span>·</span>
            <span>WHY RASQ</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0F172A]">
            A new SBC architecture, not a Pi clone.
          </h2>
        </motion.div>

        {/* Clean Editorial Comparison Table from Slide 4 */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white rounded-2xl border border-black/[0.08] shadow-xs overflow-hidden"
        >
          <table className="w-full text-left text-sm font-sans">
            <thead className="bg-[#F1F5F9] text-[#475569] border-b border-black/[0.08] font-mono text-xs">
              <tr>
                <th className="py-4 px-6 font-semibold w-1/4">Aspect</th>
                <th className="py-4 px-6 font-semibold w-3/8 text-[#64748B]">Raspberry Pi</th>
                <th className="py-4 px-6 font-semibold w-3/8 text-[#007B99]">RasQ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/[0.06]">
              {comparisonRows.map((row, idx) => (
                <tr key={idx} className="hover:bg-black/[0.015] transition-colors">
                  <td className="py-4 px-6 font-bold text-[#0F172A] font-mono text-xs">
                    {row.metric}
                  </td>
                  <td className="py-4 px-6 text-[#64748B]">
                    {row.pi}
                  </td>
                  <td className="py-4 px-6 font-semibold text-[#007B99]">
                    {row.rasq}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

      </div>
    </section>
  );
};

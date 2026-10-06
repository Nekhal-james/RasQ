import React, { useState } from 'react';
import { COMPARISON_DATA } from '../data/specs';
import { Check, X, DollarSign, Calculator, Zap, Sparkles } from 'lucide-react';

export const ComparisonCalculator: React.FC = () => {
  const [fleetSize, setFleetSize] = useState<number>(3); // 3 rigs default (e.g. robotics team)
  const [phoneCostScenario, setPhoneCostScenario] = useState<'existing' | 'budget'>('existing');

  // Pi 5 stack cost per unit:
  // Pi 5 8GB ($80) + Hailo AI Hat ($70) + Pi Cam 3 ($35) + UPS Hat & Cells ($40) + Wi-Fi/LTE dongle ($50) + Motor driver shield ($25) = ~$300 (or $240 conservatively)
  const piStackCostPerUnit = 245;

  // RasQ cost per unit:
  // RasQ Dock ($29) + Phone ($0 if existing/spare, or $40 refurbished)
  const phoneUnitCost = phoneCostScenario === 'existing' ? 0 : 40;
  const rasqCostPerUnit = 29 + phoneUnitCost;

  const totalPiCost = fleetSize * piStackCostPerUnit;
  const totalRasqCost = fleetSize * rasqCostPerUnit;
  const totalSavings = totalPiCost - totalRasqCost;
  const savingsPercent = Math.round((totalSavings / totalPiCost) * 100);

  return (
    <section id="comparison" className="py-24 border-b border-neutral-900 bg-neutral-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-3">
            <span>05. BILL OF MATERIALS & SPECS</span>
            <span className="text-neutral-600">·</span>
            <span className="text-neutral-400">ECONOMIC ADVANTAGE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight" style={{ textWrap: 'balance' }}>
            The Hidden Cost of the Traditional SBC Stack.
          </h2>
          <p className="mt-3 text-base text-neutral-400 leading-relaxed">
            By the time you purchase a Raspberry Pi 5, an AI accelerator HAT, an official camera, a battery UPS shield, and cellular dongles, you have spent upwards of $245 per robot. RasQ eliminates that entire bill by leveraging hardware you already own.
          </p>
        </div>

        {/* Interactive Fleet Savings Calculator Card */}
        <div className="bg-neutral-900/90 rounded-2xl border border-neutral-800 p-6 sm:p-8 mb-16 shadow-2xl backdrop-blur-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Sliders & Scenarios */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                <Calculator className="w-4 h-4" />
                <span>INTERACTIVE LAB & TEAM TCO ESTIMATOR</span>
              </div>

              <div>
                <div className="flex justify-between items-center text-sm font-medium text-white mb-2">
                  <span>Number of Robotics Rigs / Edge Nodes</span>
                  <span className="font-mono text-cyan-400 font-bold text-base">{fleetSize} {fleetSize === 1 ? 'Unit' : 'Units'}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={fleetSize}
                  onChange={(e) => setFleetSize(Number(e.target.value))}
                  className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
                <div className="flex justify-between text-[11px] font-mono text-neutral-500 mt-1">
                  <span>1 Solo Prototype</span>
                  <span>10 Robotics Team</span>
                  <span>20 Fleet Deploy</span>
                </div>
              </div>

              <div>
                <div className="text-xs font-medium text-neutral-300 mb-2">Smartphone Source Scenario:</div>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setPhoneCostScenario('existing')}
                    className={`p-3 rounded-xl border text-left transition-colors cursor-pointer ${
                      phoneCostScenario === 'existing'
                        ? 'bg-neutral-800 border-cyan-400 text-white'
                        : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                    }`}
                  >
                    <div className="text-xs font-bold">Existing / Spare Phone ($0)</div>
                    <div className="text-[11px] text-neutral-400 mt-0.5">Use your current or drawer phone</div>
                  </button>

                  <button
                    onClick={() => setPhoneCostScenario('budget')}
                    className={`p-3 rounded-xl border text-left transition-colors cursor-pointer ${
                      phoneCostScenario === 'budget'
                        ? 'bg-neutral-800 border-cyan-400 text-white'
                        : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                    }`}
                  >
                    <div className="text-xs font-bold">Refurbished Android ($40)</div>
                    <div className="text-[11px] text-neutral-400 mt-0.5">Budget phone bought for project</div>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Comparative Total Cost */}
            <div className="lg:col-span-6 bg-neutral-950 p-6 rounded-xl border border-neutral-800 space-y-5">
              <div className="grid grid-cols-2 gap-4 pb-4 border-b border-neutral-900">
                <div>
                  <div className="text-xs text-neutral-500 font-mono">PI 5 + HATS STACK</div>
                  <div className="text-2xl font-extrabold text-neutral-300 font-mono tabular-nums mt-1">
                    ${totalPiCost}
                  </div>
                  <div className="text-[11px] text-neutral-500 font-mono">${piStackCostPerUnit}/rig</div>
                </div>

                <div>
                  <div className="text-xs text-cyan-400 font-mono font-semibold">RASQ PLATFORM</div>
                  <div className="text-3xl font-extrabold text-cyan-300 font-mono tabular-nums mt-0.5">
                    ${totalRasqCost}
                  </div>
                  <div className="text-[11px] text-neutral-400 font-mono">${rasqCostPerUnit}/rig</div>
                </div>
              </div>

              {/* Total Savings Display */}
              <div className="bg-neutral-900/90 rounded-lg p-4 border border-cyan-500/30 flex items-center justify-between">
                <div>
                  <div className="text-xs font-mono text-cyan-400">TOTAL CAPITAL SAVED:</div>
                  <div className="text-2xl font-extrabold text-emerald-400 font-mono tabular-nums">
                    ${totalSavings.toLocaleString()}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-mono text-neutral-400">COST REDUCTION:</div>
                  <div className="text-2xl font-bold text-white font-mono tabular-nums">
                    {savingsPercent}%
                  </div>
                </div>
              </div>

              <div className="text-[11px] text-neutral-400 font-mono leading-relaxed">
                * Plus you get an integrated 5000mAh UPS battery, 4K OIS camera, 32 TOPS NPU, and 5G connectivity that a standard Pi 5 stack cannot match without extra weight.
              </div>
            </div>

          </div>
        </div>

        {/* Side-by-Side Detailed Comparison Table */}
        <div className="bg-neutral-900/90 rounded-2xl border border-neutral-800 overflow-hidden shadow-2xl">
          <div className="p-6 border-b border-neutral-800">
            <h3 className="text-lg font-bold text-white">Full Architectural Feature Matrix</h3>
          </div>

          <div className="divide-y divide-neutral-800/80 overflow-x-auto">
            {COMPARISON_DATA.map((item, index) => (
              <div key={index} className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-start hover:bg-neutral-900/40 transition-colors">
                
                {/* Feature Name & Advantage */}
                <div className="md:col-span-4 space-y-1">
                  <h4 className="text-sm font-bold text-white">{item.feature}</h4>
                  <div className="text-xs text-cyan-400 font-medium">
                    {item.advantage}
                  </div>
                </div>

                {/* Raspberry Pi 5 Stack */}
                <div className="md:col-span-4 bg-neutral-950/80 p-3.5 rounded-xl border border-neutral-800/80 space-y-1">
                  <div className="flex justify-between items-center text-xs font-mono text-neutral-500 pb-1 border-b border-neutral-900">
                    <span>Raspberry Pi 5 + Add-ons</span>
                    <span className="text-red-400 font-semibold">+${item.raspberryPiStack.approxCost}</span>
                  </div>
                  <div className="text-xs text-neutral-300 font-medium pt-1">
                    {item.raspberryPiStack.spec}
                  </div>
                  <div className="text-[11px] text-neutral-500">
                    {item.raspberryPiStack.note}
                  </div>
                </div>

                {/* RasQ Platform */}
                <div className="md:col-span-4 bg-cyan-950/20 p-3.5 rounded-xl border border-cyan-500/30 space-y-1">
                  <div className="flex justify-between items-center text-xs font-mono text-cyan-400 pb-1 border-b border-cyan-950/60">
                    <span>RasQ Architecture</span>
                    <span className="text-emerald-400 font-semibold">{item.rasqPlatform.approxCost === 0 ? 'Included' : `$${item.rasqPlatform.approxCost}`}</span>
                  </div>
                  <div className="text-xs text-white font-medium pt-1">
                    {item.rasqPlatform.spec}
                  </div>
                  <div className="text-[11px] text-neutral-400">
                    {item.rasqPlatform.note}
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

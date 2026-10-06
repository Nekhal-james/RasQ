import React from 'react';

export const EngineeringComparison: React.FC = () => {
  return (
    <section id="comparison" className="py-24 bg-[#FBFBFD] text-[#111827] border-t border-black/[0.08]">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <div className="text-xs font-mono tracking-wider text-[#6B7280] uppercase mb-2">
            Bill of Materials & Economics
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111827]">
            The true cost of building an edge robotics rig.
          </h2>
          <p className="mt-4 text-base text-[#4B5563] leading-relaxed">
            By the time a robotics team purchases a standalone SBC, an AI accelerator HAT, an official camera, a battery shield, and cellular dongles, the stack becomes fragile, tall, and expensive.
          </p>
        </div>

        {/* Side-by-Side BOM Breakdown Table */}
        <div className="bg-white rounded-2xl border border-black/[0.08] overflow-hidden shadow-xs mb-12">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-[#F3F4F6] text-[#4B5563] border-b border-black/[0.08]">
              <tr>
                <th className="py-3 px-4 font-semibold">Subsystem</th>
                <th className="py-3 px-4 font-semibold">Traditional Raspberry Pi 5 Stack</th>
                <th className="py-3 px-4 font-semibold">RasQ Platform Approach</th>
                <th className="py-3 px-4 font-semibold text-right">Cost Difference</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/[0.06] text-[#111827]">
              
              <tr className="hover:bg-black/[0.015] transition-colors">
                <td className="py-3 px-4 font-bold text-[#111827]">
                  Compute & AI NPU
                </td>
                <td className="py-3 px-4 text-[#4B5563]">
                  Pi 5 8GB ($80) + Hailo-8L AI HAT ($70)<br />
                  <span className="text-[11px] text-[#6B7280]">13 TOPS · Requires separate PCIe flex cable</span>
                </td>
                <td className="py-3 px-4 text-[#111827]">
                  Host Phone Snapdragon / Tensor SoC ($0–$40)<br />
                  <span className="text-[11px] text-[#0066CC]">15–45 TOPS on-die neural engine</span>
                </td>
                <td className="py-3 px-4 text-right font-bold text-[#059669] tabular-nums">
                  -$110
                </td>
              </tr>

              <tr className="hover:bg-black/[0.015] transition-colors">
                <td className="py-3 px-4 font-bold text-[#111827]">
                  Optics & Camera
                </td>
                <td className="py-3 px-4 text-[#4B5563]">
                  Raspberry Pi Camera Module 3 ($35)<br />
                  <span className="text-[11px] text-[#6B7280]">Fragile 15-pin CSI flat flex cable</span>
                </td>
                <td className="py-3 px-4 text-[#111827]">
                  Integrated 4K/60FPS HDR Camera ($0)<br />
                  <span className="text-[11px] text-[#0066CC]">Hardware Optical Image Stabilization (OIS)</span>
                </td>
                <td className="py-3 px-4 text-right font-bold text-[#059669] tabular-nums">
                  -$35
                </td>
              </tr>

              <tr className="hover:bg-black/[0.015] transition-colors">
                <td className="py-3 px-4 font-bold text-[#111827]">
                  Power & UPS Backup
                </td>
                <td className="py-3 px-4 text-[#4B5563]">
                  Waveshare UPS HAT + 18650 Cells ($35)<br />
                  <span className="text-[11px] text-[#6B7280]">Bulky battery holder; prone to brownout resets</span>
                </td>
                <td className="py-3 px-4 text-[#111827]">
                  Internal 5,000mAh Lithium Battery ($0)<br />
                  <span className="text-[11px] text-[#0066CC]">Built-in UPS buffer prevents filesystem corruption</span>
                </td>
                <td className="py-3 px-4 text-right font-bold text-[#059669] tabular-nums">
                  -$35
                </td>
              </tr>

              <tr className="hover:bg-black/[0.015] transition-colors">
                <td className="py-3 px-4 font-bold text-[#111827]">
                  Wireless & Telemetry
                </td>
                <td className="py-3 px-4 text-[#4B5563]">
                  4G LTE USB Modem Dongle ($60)<br />
                  <span className="text-[11px] text-[#6B7280]">External antenna wiring required</span>
                </td>
                <td className="py-3 px-4 text-[#111827]">
                  Integrated 5G/4G + Wi-Fi 6E + GPS ($0)<br />
                  <span className="text-[11px] text-[#0066CC]">Dual-band GNSS positioning built-in</span>
                </td>
                <td className="py-3 px-4 text-right font-bold text-[#059669] tabular-nums">
                  -$60
                </td>
              </tr>

              <tr className="hover:bg-black/[0.015] transition-colors">
                <td className="py-3 px-4 font-bold text-[#111827]">
                  Motor Driving & I/O
                </td>
                <td className="py-3 px-4 text-[#4B5563]">
                  Dual DC Motor Shield ($25)<br />
                  <span className="text-[11px] text-[#6B7280]">Stacks on header, blocks cooling airflow</span>
                </td>
                <td className="py-3 px-4 text-[#111827]">
                  RasQ Carrier Dock with DRV8833 ($29)<br />
                  <span className="text-[11px] text-[#0066CC]">Built directly into dock substrate</span>
                </td>
                <td className="py-3 px-4 text-right font-bold text-[#4B5563] tabular-nums">
                  +$4
                </td>
              </tr>

              <tr className="bg-[#F9FAFB] font-bold">
                <td className="py-4 px-4 text-sm text-[#111827]">
                  Total Hardware Cost
                </td>
                <td className="py-4 px-4 text-sm text-[#DC2626] tabular-nums">
                  $305.00 per robot
                </td>
                <td className="py-4 px-4 text-sm text-[#059669] tabular-nums">
                  $29.00 – $69.00 per robot
                </td>
                <td className="py-4 px-4 text-sm text-right text-[#059669] tabular-nums">
                  Save up to $276 / rig (77%–90%)
                </td>
              </tr>

            </tbody>
          </table>
        </div>

        {/* Narrative Engineering Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-[#4B5563] leading-relaxed">
          <div>
            <strong className="text-[#111827] block mb-1">Mechanical Compactness</strong>
            A traditional Pi 5 stack with an AI HAT, UPS HAT, and motor shield stands nearly 85mm tall, requiring tall standoffs and fragile ribbon cables. RasQ keeps the entire assembly low-profile by embedding motor drivers directly into the carrier dock and placing the phone horizontally.
          </div>
          <div>
            <strong className="text-[#111827] block mb-1">Power Brownout Protection</strong>
            High-torque DC motors frequently produce inductive voltage dips that reboot conventional Raspberry Pis, corrupting the Linux root filesystem on the microSD card. With RasQ, the phone's internal battery acts as an automatic, zero-switchover uninterruptible power supply.
          </div>
        </div>

      </div>
    </section>
  );
};

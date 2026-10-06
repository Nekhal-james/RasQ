import React, { useState } from 'react';
import { RASQ_PINOUT } from '../data/pinout';
import { HeaderPin } from '../types';

export const PinoutTable: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'power' | 'gpio' | 'i2c' | 'spi' | 'uart' | 'pwm'>('all');

  const filteredPins = RASQ_PINOUT.filter(pin => {
    if (filter === 'all') return true;
    if (filter === 'power') return pin.type === 'power-5v' || pin.type === 'power-3v3' || pin.type === 'ground';
    if (filter === 'gpio') return pin.type === 'gpio' || pin.type === 'pwm';
    if (filter === 'i2c') return pin.type === 'i2c';
    if (filter === 'spi') return pin.type === 'spi';
    if (filter === 'uart') return pin.type === 'uart';
    if (filter === 'pwm') return pin.type === 'pwm';
    return true;
  });

  return (
    <section id="pinout" className="py-24 bg-[#FBFBFD] text-[#111827] border-t border-black/[0.08]">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-mono tracking-wider text-[#6B7280] uppercase mb-2">
            Hardware Interface Specification
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111827]">
            Standard 40-Pin Raspberry Pi Expansion Header.
          </h2>
          <p className="mt-4 text-base text-[#4B5563] leading-relaxed">
            The RasQ bridge replicates the physical 2.54mm pitch, electrical logic levels (3.3V), and pin-for-pin mapping of the Raspberry Pi 4/5. Connect existing HAT shields, sensors, and displays directly.
          </p>
        </div>

        {/* Filter Bar (Clean Functional Buttons) */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {[
            { id: 'all', label: 'All 40 Pins' },
            { id: 'power', label: 'Power & Ground' },
            { id: 'gpio', label: 'General Purpose GPIO' },
            { id: 'pwm', label: 'PWM Timers' },
            { id: 'i2c', label: 'I²C Bus' },
            { id: 'spi', label: 'SPI Bus' },
            { id: 'uart', label: 'UART Serial' },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setFilter(item.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                filter === item.id
                  ? 'bg-[#111827] text-white'
                  : 'bg-black/[0.04] text-[#4B5563] hover:text-[#111827]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Authentic Engineering Pin Table */}
        <div className="bg-white rounded-2xl border border-black/[0.08] overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-[#F3F4F6] text-[#4B5563] border-b border-black/[0.08]">
                <tr>
                  <th className="py-3 px-4 font-semibold w-16">Pin #</th>
                  <th className="py-3 px-4 font-semibold">Signal Name</th>
                  <th className="py-3 px-4 font-semibold">ESP32-S3 Bridge Pin</th>
                  <th className="py-3 px-4 font-semibold">Voltage Rail</th>
                  <th className="py-3 px-4 font-semibold">Bus Function & Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/[0.06] text-[#111827]">
                {filteredPins.map(pin => (
                  <tr key={pin.pinNumber} className="hover:bg-black/[0.015] transition-colors">
                    <td className="py-3 px-4 text-[#6B7280] font-bold tabular-nums">
                      {pin.pinNumber}
                    </td>
                    <td className="py-3 px-4 font-bold text-[#111827]">
                      {pin.name}
                    </td>
                    <td className="py-3 px-4 text-[#4B5563]">
                      {pin.esp32Pin || '—'}
                    </td>
                    <td className="py-3 px-4 text-[#0066CC] font-semibold">
                      {pin.voltage}
                    </td>
                    <td className="py-3 px-4 text-[#4B5563]">
                      {pin.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between text-xs font-mono text-[#6B7280]">
          <span>Mechanical Pin Spacing: 2.54mm (0.1 in) standard shrouded box header</span>
          <span>Logic: 3.3V CMOS · Inputs are 5V-tolerant through series protection</span>
        </div>

      </div>
    </section>
  );
};

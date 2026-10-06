import React, { useState } from 'react';
import { RASQ_PINOUT } from '../data/pinout';
import { HeaderPin, PinType } from '../types';
import { Sliders, Cpu, Zap, Info, Check } from 'lucide-react';

export const PinoutExplorer: React.FC = () => {
  const [selectedPin, setSelectedPin] = useState<HeaderPin>(RASQ_PINOUT[11]); // Default Pin 12 (GPIO 18 PWM)
  const [filterType, setFilterType] = useState<string>('all');
  const [pinStates, setPinStates] = useState<{ [pinNumber: number]: boolean }>({
    12: true, // Pin 12 HIGH
    16: false,
    18: false,
  });

  const getPinTypeBadge = (type: PinType) => {
    switch (type) {
      case 'power-5v': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'power-3v3': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'ground': return 'bg-neutral-800 text-neutral-400 border-neutral-700';
      case 'i2c': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'spi': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'uart': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'pwm': return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30';
      default: return 'bg-teal-500/20 text-teal-400 border-teal-500/30';
    }
  };

  const getPinColorDot = (type: PinType) => {
    switch (type) {
      case 'power-5v': return 'bg-red-500';
      case 'power-3v3': return 'bg-amber-400';
      case 'ground': return 'bg-neutral-500';
      case 'i2c': return 'bg-blue-400';
      case 'spi': return 'bg-purple-400';
      case 'uart': return 'bg-emerald-400';
      case 'pwm': return 'bg-cyan-400';
      default: return 'bg-teal-400';
    }
  };

  const togglePin = (pinNum: number) => {
    setPinStates(prev => ({
      ...prev,
      [pinNum]: !prev[pinNum]
    }));
  };

  // Group pins into pairs: Pin 1 (left) & Pin 2 (right), Pin 3 & Pin 4, etc.
  const pinRows: [HeaderPin, HeaderPin][] = [];
  for (let i = 0; i < RASQ_PINOUT.length; i += 2) {
    pinRows.push([RASQ_PINOUT[i], RASQ_PINOUT[i + 1]]);
  }

  const isHighlighted = (pin: HeaderPin) => {
    if (filterType === 'all') return true;
    if (filterType === 'power') return pin.type === 'power-5v' || pin.type === 'power-3v3' || pin.type === 'ground';
    if (filterType === 'i2c') return pin.type === 'i2c';
    if (filterType === 'spi') return pin.type === 'spi';
    if (filterType === 'uart') return pin.type === 'uart';
    if (filterType === 'pwm') return pin.type === 'pwm';
    if (filterType === 'gpio') return pin.type === 'gpio' || pin.type === 'pwm';
    return true;
  };

  return (
    <section id="pinout" className="py-24 border-b border-neutral-900 bg-neutral-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-3">
            <span>03. HARDWARE PINOUT SPECIFICATION</span>
            <span className="text-neutral-600">·</span>
            <span className="text-neutral-400">40-PIN EXPANSION HEADER</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight" style={{ textWrap: 'balance' }}>
            Raspberry Pi HAT Compatible. Zero Rewiring.
          </h2>
          <p className="mt-3 text-base text-neutral-400 leading-relaxed">
            The RasQ bridge replicates the exact mechanical and electrical pin mapping of the standard 40-pin Raspberry Pi header. Connect standard sensor breakout boards, OLED displays, and robotics shields directly.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-2 mb-8 bg-neutral-900/60 p-2 rounded-xl border border-neutral-800">
          <span className="text-xs font-mono text-neutral-500 px-3">FILTER BUS:</span>
          
          {[
            { id: 'all', label: 'All 40 Pins' },
            { id: 'power', label: 'Power & Ground' },
            { id: 'gpio', label: 'GPIO & PWM' },
            { id: 'i2c', label: 'I²C Bus' },
            { id: 'spi', label: 'SPI Bus' },
            { id: 'uart', label: 'UART Serial' },
            { id: 'pwm', label: 'PWM Timers' },
          ].map(btn => (
            <button
              key={btn.id}
              onClick={() => setFilterType(btn.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                filterType === btn.id
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Pinout Visualizer & Inspector Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: 40-Pin Header Graphic Layout */}
          <div className="lg:col-span-7 bg-neutral-900/90 rounded-2xl border border-neutral-800 p-6 shadow-xl">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-neutral-800 text-xs font-mono">
              <span className="text-white font-bold flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-cyan-400" />
                RASQ DOCK 40-PIN EXPANSION HEADER (TOP VIEW)
              </span>
              <span className="text-neutral-500">2.54mm PITCH</span>
            </div>

            {/* Header PCB Representation */}
            <div className="space-y-1.5 bg-neutral-950 p-4 rounded-xl border border-neutral-800 max-h-[580px] overflow-y-auto">
              {pinRows.map(([leftPin, rightPin]) => {
                const isLeftSelected = selectedPin.pinNumber === leftPin.pinNumber;
                const isRightSelected = selectedPin.pinNumber === rightPin.pinNumber;
                const isLeftActive = isHighlighted(leftPin);
                const isRightActive = isHighlighted(rightPin);

                return (
                  <div key={leftPin.pinNumber} className="grid grid-cols-2 gap-2 text-xs font-mono">
                    
                    {/* Left Pin (Odd: 1, 3, 5, 7...) */}
                    <button
                      onClick={() => setSelectedPin(leftPin)}
                      className={`flex items-center justify-between p-2 rounded-lg border text-left transition-all cursor-pointer ${
                        isLeftSelected 
                          ? 'border-cyan-400 bg-cyan-950/40 shadow-sm shadow-cyan-500/20' 
                          : isLeftActive
                          ? 'border-neutral-800/80 bg-neutral-900/60 hover:bg-neutral-800'
                          : 'border-transparent opacity-30 bg-neutral-900/20'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span className="text-neutral-500 text-[10px] w-4">{leftPin.pinNumber}</span>
                        <div className={`w-2 h-2 rounded-full ${getPinColorDot(leftPin.type)}`} />
                        <span className="text-neutral-200 truncate">{leftPin.name}</span>
                      </div>
                      <span className="text-[10px] text-neutral-500 ml-1">{leftPin.voltage}</span>
                    </button>

                    {/* Right Pin (Even: 2, 4, 6, 8...) */}
                    <button
                      onClick={() => setSelectedPin(rightPin)}
                      className={`flex items-center justify-between p-2 rounded-lg border text-left transition-all cursor-pointer ${
                        isRightSelected 
                          ? 'border-cyan-400 bg-cyan-950/40 shadow-sm shadow-cyan-500/20' 
                          : isRightActive
                          ? 'border-neutral-800/80 bg-neutral-900/60 hover:bg-neutral-800'
                          : 'border-transparent opacity-30 bg-neutral-900/20'
                      }`}
                    >
                      <span className="text-[10px] text-neutral-500 mr-1">{rightPin.voltage}</span>
                      <div className="flex items-center gap-2 truncate flex-row-reverse">
                        <span className="text-neutral-500 text-[10px] w-4 text-right">{rightPin.pinNumber}</span>
                        <div className={`w-2 h-2 rounded-full ${getPinColorDot(rightPin.type)}`} />
                        <span className="text-neutral-200 truncate">{rightPin.name}</span>
                      </div>
                    </button>

                  </div>
                );
              })}
            </div>

            {/* Pin Color Legend */}
            <div className="mt-4 pt-3 border-t border-neutral-800/80 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] font-mono text-neutral-400">
              <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-500" /> 5.0V Power</div>
              <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-400" /> 3.3V Power</div>
              <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-neutral-500" /> Ground</div>
              <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-cyan-400" /> PWM Timer</div>
              <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-400" /> I²C Bus</div>
              <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-purple-400" /> SPI Bus</div>
              <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-400" /> UART Serial</div>
            </div>
          </div>

          {/* Right Column: Selected Pin Deep Inspector */}
          <div className="lg:col-span-5 bg-neutral-900/90 rounded-2xl border border-neutral-800 p-6 shadow-xl sticky top-24">
            <div className="flex items-center justify-between pb-3 mb-5 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-neutral-500">PIN #{selectedPin.pinNumber}</span>
                <span className={`text-xs px-2 py-0.5 rounded border font-mono ${getPinTypeBadge(selectedPin.type)}`}>
                  {selectedPin.type.toUpperCase()}
                </span>
              </div>
              <span className="text-xs font-mono text-cyan-400">{selectedPin.voltage}</span>
            </div>

            <h3 className="text-xl font-bold text-white mb-1">
              {selectedPin.name}
            </h3>

            <p className="text-xs text-neutral-400 leading-relaxed mb-6">
              {selectedPin.description}
            </p>

            {/* Electrical & Hardware Specs */}
            <div className="space-y-3 font-mono text-xs bg-neutral-950 p-4 rounded-xl border border-neutral-800 mb-6">
              <div className="flex justify-between py-1 border-b border-neutral-900">
                <span className="text-neutral-500">Header Pin</span>
                <span className="text-white font-bold">Physical Pin {selectedPin.pinNumber}</span>
              </div>

              {selectedPin.bcmNumber !== undefined && (
                <div className="flex justify-between py-1 border-b border-neutral-900">
                  <span className="text-neutral-500">BCM GPIO ID</span>
                  <span className="text-cyan-400 font-bold">GPIO {selectedPin.bcmNumber}</span>
                </div>
              )}

              {selectedPin.esp32Pin && (
                <div className="flex justify-between py-1 border-b border-neutral-900">
                  <span className="text-neutral-500">ESP32-S3 Core Mapping</span>
                  <span className="text-teal-400 font-bold">{selectedPin.esp32Pin}</span>
                </div>
              )}

              <div className="flex justify-between py-1 border-b border-neutral-900">
                <span className="text-neutral-500">Logic Voltage Level</span>
                <span className="text-neutral-300">{selectedPin.voltage}</span>
              </div>

              <div className="flex justify-between py-1">
                <span className="text-neutral-500">Default Reset State</span>
                <span className="text-neutral-300">{selectedPin.defaultState}</span>
              </div>
            </div>

            {/* Interactive Pin Manual Toggle (if GPIO/PWM) */}
            {(selectedPin.type === 'gpio' || selectedPin.type === 'pwm') && (
              <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 mb-6">
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="text-neutral-300 font-medium">LIVE PIN CONTROL OVERRIDE</span>
                  <span className={pinStates[selectedPin.pinNumber] ? 'text-cyan-400' : 'text-neutral-500'}>
                    STATE: {pinStates[selectedPin.pinNumber] ? 'HIGH (1)' : 'LOW (0)'}
                  </span>
                </div>
                <button
                  onClick={() => togglePin(selectedPin.pinNumber)}
                  className={`w-full py-2 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    pinStates[selectedPin.pinNumber]
                      ? 'bg-cyan-500 text-neutral-950 shadow-md shadow-cyan-500/20'
                      : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                  }`}
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>Toggle Pin {selectedPin.pinNumber} ({pinStates[selectedPin.pinNumber] ? 'Active HIGH' : 'Active LOW'})</span>
                </button>
              </div>
            )}

            {/* Python Code Example for this Pin */}
            <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800 font-mono text-[11px] text-neutral-300">
              <div className="text-[10px] text-neutral-500 mb-1.5">PYTHON SDK SYNTAX:</div>
              <pre className="text-cyan-300 overflow-x-auto">
{selectedPin.type === 'pwm'
  ? `dock.servo(pin=${selectedPin.bcmNumber || selectedPin.pinNumber}, min_angle=-90, max_angle=90)`
  : selectedPin.type === 'i2c'
  ? `i2c_bus = dock.i2c(bus=1, speed_khz=400)`
  : selectedPin.type === 'spi'
  ? `spi_dev = dock.spi(bus=0, cs=0, max_speed_hz=10000000)`
  : `dock.gpio.write(${selectedPin.bcmNumber || selectedPin.pinNumber}, dock.HIGH)`
}
              </pre>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

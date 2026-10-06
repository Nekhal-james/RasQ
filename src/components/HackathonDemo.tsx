import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Smartphone, Cpu, Zap, Power, Play, Pause, ArrowRight, ShieldCheck, Check } from 'lucide-react';

export const HackathonDemo: React.FC = () => {
  const [isPluggedIn, setIsPluggedIn] = useState<boolean>(true);
  const [isAutoMoving, setIsAutoMoving] = useState<boolean>(true);

  // Target coordinates on screen (0 to 100%)
  const [targetX, setTargetX] = useState<number>(50);
  const [targetY, setTargetY] = useState<number>(50);

  // Physical Servo Motor Angle (-50 to +50 degrees)
  const [servoAngle, setServoAngle] = useState<number>(0);

  // LED and Solenoid states
  const [statusLed, setStatusLed] = useState<boolean>(false);

  // Auto-move target animation loop
  useEffect(() => {
    if (!isAutoMoving) return;

    let step = 0;
    const interval = setInterval(() => {
      step += 0.04;
      const nextX = 50 + Math.sin(step) * 36;
      const nextY = 50 + Math.cos(step * 0.7) * 22;
      setTargetX(nextX);
      setTargetY(nextY);
    }, 45);

    return () => clearInterval(interval);
  }, [isAutoMoving]);

  // Closed loop: When target moves and phone is plugged in, update motor!
  useEffect(() => {
    if (!isPluggedIn) {
      setServoAngle(0);
      setStatusLed(false);
      return;
    }

    // Map targetX (14% to 86%) to motor angle (-45 to +45 deg)
    const normalized = (targetX - 50) / 36;
    const clampedAngle = Math.round(Math.max(-50, Math.min(50, normalized * 45)));

    setServoAngle(clampedAngle);
    setStatusLed(Math.abs(clampedAngle) < 8); // Lights up when target is centered
  }, [targetX, isPluggedIn]);

  // Click on camera viewport to test target
  const handleViewportClick = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsAutoMoving(false);
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(12, Math.min(88, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(15, Math.min(85, ((e.clientY - rect.top) / rect.height) * 100));
    setTargetX(x);
    setTargetY(y);
  };

  return (
    <section id="demo" className="py-24 bg-[#FBFBFD] text-[#111827] border-t border-black/[0.08]">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 text-xs font-mono font-medium tracking-wider text-[#0066CC] uppercase mb-2">
            <span>PROOF OF CONCEPT (MVP)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111827]">
            The Closed-Loop Robotics Demo.
          </h2>
          <p className="mt-3 text-base text-[#4B5563] leading-relaxed">
            The phone's camera acts as the <strong className="text-[#111827]">eyes</strong>, the on-device NPU detects targets, and commands flow through the USB-C dock to move a <strong className="text-[#111827]">physical motor</strong>.
          </p>
        </motion.div>

        {/* Demo Controls Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white p-3.5 rounded-2xl border border-black/[0.08] shadow-xs mb-8 flex flex-wrap items-center justify-between gap-4 max-w-3xl mx-auto"
        >
          {/* Plug / Unplug Button */}
          <button
            onClick={() => setIsPluggedIn(!isPluggedIn)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
              isPluggedIn
                ? 'bg-[#111827] text-white shadow-xs'
                : 'bg-black/[0.05] text-[#111827] hover:bg-black/[0.08]'
            }`}
          >
            <Power className="w-4 h-4 text-[#0066CC]" />
            <span>{isPluggedIn ? 'USB-C Dock Connected' : 'Phone Unplugged (Click to Connect)'}</span>
          </button>

          {/* Auto-Move Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAutoMoving(!isAutoMoving)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                isAutoMoving
                  ? 'bg-[#0066CC]/10 text-[#0066CC] font-bold border border-[#0066CC]/20'
                  : 'bg-black/[0.04] text-[#4B5563] hover:text-[#111827]'
              }`}
            >
              {isAutoMoving ? 'Auto-Moving Target' : 'Manual Target Position'}
            </button>
            <span className="text-[11px] text-[#6B7280] font-mono hidden sm:inline">
              Click screen to reposition target
            </span>
          </div>
        </motion.div>

        {/* 3-Part Closed Loop Interactive Workbench */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-11 gap-6 items-center bg-white p-6 sm:p-8 rounded-3xl border border-black/[0.08] shadow-sm"
        >
          
          {/* Part 1: The Phone (The Brain & Eyes) */}
          <div className="lg:col-span-5 bg-[#F9FAFB] rounded-2xl p-5 border border-black/[0.06] space-y-3">
            <div className="flex items-center justify-between border-b border-black/[0.06] pb-2 text-xs font-mono">
              <span className="font-bold text-[#111827] flex items-center gap-1.5">
                <Smartphone className="w-4 h-4 text-[#0066CC]" />
                1. THE BRAIN (Your Phone)
              </span>
              <span className="text-[#6B7280] text-[10px]">
                {isPluggedIn ? '18W FAST CHG' : 'STANDALONE'}
              </span>
            </div>

            {/* Smartphone Viewport with Camera Vision Feed */}
            <div 
              onClick={handleViewportClick}
              className="relative aspect-[4/3] rounded-xl bg-[#111827] overflow-hidden border border-black/[0.1] cursor-crosshair select-none flex items-center justify-center shadow-inner"
            >
              {/* Subtle Camera Grid */}
              <div 
                className="absolute inset-0 opacity-15 pointer-events-none"
                style={{
                  backgroundImage: 'radial-gradient(circle, #38bdf8 1px, transparent 1px)',
                  backgroundSize: '24px 24px'
                }}
              />

              <div className="absolute top-2 left-2 text-[9px] font-mono text-white/50 pointer-events-none bg-black/40 px-2 py-0.5 rounded">
                Camera: 4K 60FPS · NPU: 11ms
              </div>

              {/* Target Object with AI Bounding Box */}
              {isPluggedIn && (
                <div
                  style={{
                    position: 'absolute',
                    left: `${targetX}%`,
                    top: `${targetY}%`,
                    transform: 'translate(-50%, -50%)',
                    transition: isAutoMoving ? 'left 0.08s linear, top 0.08s linear' : 'none'
                  }}
                  className="pointer-events-none z-10"
                >
                  <div className="w-16 h-16 border-2 border-[#0066CC] bg-[#0066CC]/15 rounded flex items-center justify-center relative shadow-sm">
                    {/* Centroid Reticle */}
                    <div className="w-3.5 h-3.5 rounded-full bg-[#0066CC] animate-ping absolute" />
                    <div className="w-2.5 h-2.5 rounded-full bg-white relative z-10 shadow" />

                    {/* AI Label */}
                    <div className="absolute -top-5 left-0 bg-[#0066CC] text-white font-mono text-[8px] font-bold px-1 rounded-t whitespace-nowrap">
                      TARGET: {Math.round(targetX)}%
                    </div>
                  </div>
                </div>
              )}

              {/* Overlay if Phone is Unplugged */}
              {!isPluggedIn && (
                <div className="absolute inset-0 bg-[#111827]/90 backdrop-blur-xs flex flex-col items-center justify-center p-4 text-center z-20">
                  <Smartphone className="w-8 h-8 text-white/30 mb-2" />
                  <span className="text-white text-xs font-bold">Phone Disconnected</span>
                  <span className="text-[11px] text-[#9CA3AF] mt-1 max-w-xs">
                    Plug phone into the Type-C dock to activate the hardware bridge.
                  </span>
                </div>
              )}

              <div className="absolute bottom-2 left-2 right-2 text-[9px] font-mono text-white/40 flex justify-between pointer-events-none">
                <span>Click screen to steer</span>
                <span className="text-[#38bdf8]">X: {Math.round(targetX)}%</span>
              </div>
            </div>

            <div className="text-[11px] font-mono text-[#6B7280] flex justify-between pt-1">
              <span>On-device vision model</span>
              <span className="text-[#111827] font-semibold">TFLite YOLOv8</span>
            </div>
          </div>

          {/* Part 2: The USB-C Cable Bridge (Center) */}
          <div className="lg:col-span-2 flex flex-col items-center justify-center py-4 lg:py-0">
            <div className="flex lg:flex-col items-center gap-2">
              <div className={`h-1 lg:h-12 w-12 lg:w-1 rounded transition-colors ${
                isPluggedIn ? 'bg-[#0066CC]' : 'bg-black/[0.1]'
              }`} />

              <div className="p-3 rounded-2xl bg-[#F9FAFB] border border-black/[0.08] text-center font-mono text-[10px] shadow-xs">
                <Cpu className={`w-5 h-5 mx-auto mb-1 ${isPluggedIn ? 'text-[#0066CC]' : 'text-[#9CA3AF]'}`} />
                <span className="font-bold text-[#111827] block">2. THE BRIDGE</span>
                <span className="text-[#6B7280] text-[9px] block">ESP32-S3 Dock</span>
                <div className={`mt-1 text-[9px] font-bold ${isPluggedIn ? 'text-[#059669]' : 'text-[#9CA3AF]'}`}>
                  {isPluggedIn ? '921K BAUD' : 'OFFLINE'}
                </div>
              </div>

              <div className={`h-1 lg:h-12 w-12 lg:w-1 rounded transition-colors ${
                isPluggedIn ? 'bg-[#0066CC]' : 'bg-black/[0.1]'
              }`} />
            </div>
          </div>

          {/* Part 3: Physical Motor Actuation (Right) */}
          <div className="lg:col-span-4 bg-[#F9FAFB] rounded-2xl p-5 border border-black/[0.06] space-y-3">
            <div className="flex items-center justify-between border-b border-black/[0.06] pb-2 text-xs font-mono">
              <span className="font-bold text-[#111827] flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-[#D97706]" />
                3. PHYSICAL MOTOR
              </span>
              <span className="text-[#6B7280] text-[10px]">PIN 18 PWM</span>
            </div>

            {/* Virtual Servo Motor Body */}
            <div className="aspect-[4/3] rounded-xl bg-white border border-black/[0.08] p-4 flex flex-col items-center justify-center relative shadow-xs">
              <span className="text-[10px] font-mono text-[#9CA3AF] absolute top-2.5 left-3">
                SERVO HORN ORIENTATION
              </span>

              {/* Physical Servo Assembly */}
              <div className="relative w-32 h-32 flex items-center justify-center">
                {/* Servo Casing */}
                <div className="w-20 h-20 bg-[#1F2937] rounded-xl border border-[#374151] shadow-md flex items-center justify-center relative">
                  {/* Motor Spline Bearing */}
                  <div className="w-10 h-10 rounded-full bg-[#111827] border border-[#4B5563] flex items-center justify-center relative">
                    
                    {/* Rotating Servo Horn */}
                    <div
                      style={{
                        transform: `rotate(${servoAngle}deg)`,
                        transition: 'transform 0.08s ease-out'
                      }}
                      className="w-1.5 h-16 bg-[#0066CC] rounded-full shadow-md origin-center relative"
                    >
                      <div className="w-3 h-3 rounded-full bg-white absolute -top-1 -left-0.5 shadow-sm" />
                    </div>

                    <div className="w-3 h-3 rounded-full bg-[#9CA3AF] z-10" />
                  </div>
                </div>
              </div>

              {/* Angle Readout */}
              <div className="w-full flex items-center justify-between pt-2 border-t border-black/[0.06] font-mono text-xs">
                <span className="text-[#6B7280]">Servo Angle:</span>
                <span className={`font-bold ${isPluggedIn ? 'text-[#0066CC]' : 'text-[#9CA3AF]'}`}>
                  {isPluggedIn ? `${servoAngle > 0 ? `+${servoAngle}` : servoAngle}°` : '0° (Unpowered)'}
                </span>
              </div>
            </div>

            {/* Hardware Pin & Pulse Width */}
            <div className="text-[11px] font-mono text-[#6B7280] flex justify-between pt-1">
              <span>PWM: {isPluggedIn ? `${Math.round(1500 + servoAngle * 10)} µs` : '0 µs'}</span>
              <span className={statusLed && isPluggedIn ? 'text-[#059669] font-bold' : 'text-[#9CA3AF]'}>
                LED Pin 23: {statusLed && isPluggedIn ? 'LOCKED' : 'TRACKING'}
              </span>
            </div>
          </div>

        </motion.div>

        {/* 22ms Real-Time Latency Breakdown Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 bg-white p-5 rounded-2xl border border-black/[0.08] shadow-xs"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono mb-3">
            <span className="font-bold text-[#111827]">CLOSED-LOOP LATENCY PIPELINE:</span>
            <span className="text-[#059669] font-bold">21.8 ms Total Loop (~45 Hz Continuous Control)</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-[11px] font-mono text-center">
            <div className="bg-[#F9FAFB] p-2 rounded border border-black/[0.04]">
              <div className="text-[#6B7280] text-[10px]">1. CAMERA CAPTURE</div>
              <div className="font-bold text-[#111827] mt-0.5">6.2 ms</div>
            </div>
            <div className="bg-[#F9FAFB] p-2 rounded border border-black/[0.04]">
              <div className="text-[#6B7280] text-[10px]">2. NPU VISION AI</div>
              <div className="font-bold text-[#0066CC] mt-0.5">11.4 ms</div>
            </div>
            <div className="bg-[#F9FAFB] p-2 rounded border border-black/[0.04]">
              <div className="text-[#6B7280] text-[10px]">3. PYTHON DECISION</div>
              <div className="font-bold text-[#111827] mt-0.5">1.1 ms</div>
            </div>
            <div className="bg-[#F9FAFB] p-2 rounded border border-black/[0.04]">
              <div className="text-[#6B7280] text-[10px]">4. USB-C BRIDGE</div>
              <div className="font-bold text-[#0066CC] mt-0.5">1.5 ms</div>
            </div>
            <div className="bg-[#F9FAFB] p-2 rounded border border-black/[0.04] col-span-2 sm:col-span-1">
              <div className="text-[#6B7280] text-[10px]">5. PWM ACTUATION</div>
              <div className="font-bold text-[#D97706] mt-0.5">1.6 ms</div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

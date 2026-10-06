import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, Pause, RotateCcw, Sliders, Check, ArrowDown, 
  Sparkles, ShieldCheck, Zap, Cpu
} from 'lucide-react';

interface StoryChapter {
  id: string;
  step: string;
  title: string;
  subtitle: string;
  description: string;
  pinHighlights: string;
}

const CHAPTERS: StoryChapter[] = [
  {
    id: 'approach',
    step: '01',
    title: 'The Brain in Free Flight',
    subtitle: 'Smartphone Disconnected · Standalone Compute',
    description: 'An unmodified smartphone suspended above the rig. Its 8-core CPU, dedicated 32 TOPS neural engine, 4K camera, and internal 5,000mAh battery represent an untapped edge-computing powerhouse.',
    pinHighlights: 'Dock Idle · Pins High-Impedance'
  },
  {
    id: 'alignment',
    step: '02',
    title: 'Precision Mechanical Alignment',
    subtitle: 'Type-C Guide Rails · CNC Aluminum Cradle',
    description: 'The phone aligns over the dock’s beveled Type-C male plug. Chamfered aluminum guide posts ensure zero lateral stress on the smartphone’s internal USB port.',
    pinHighlights: 'Guide Contacts Engaging'
  },
  {
    id: 'docking',
    step: '03',
    title: 'The Type-C Physical Seating',
    subtitle: 'High-Speed CDC Handshake · 18W USB-PD',
    description: 'The Type-C connector seats firmly into the socket. A high-speed USB CDC data pipe establishes at 921,600 baud while the dock delivers 18W fast charging to buffer the phone’s internal battery.',
    pinHighlights: 'USB Link Verified · 921.6k Baud'
  },
  {
    id: 'pinout',
    step: '04',
    title: 'The 40-Pin Header Ignition',
    subtitle: 'Raspberry Pi Standard · 3.3V Logic Bus',
    description: 'The ESP32-S3 coprocessor breaks out 40 physical pins. Hardware PWM timers, I²C, SPI, UART, and dual DRV8833 motor H-bridges ignite into an active, deterministic state.',
    pinHighlights: '16x PWM Active · I²C 1MHz · SPI 40MHz'
  },
  {
    id: 'actuation',
    step: '05',
    title: 'Closed-Loop Physical Execution',
    subtitle: 'Camera Eyes → NPU Inferences → Physical Action',
    description: 'The closed loop is live. The camera captures objects, on-device AI evaluates trajectories in 11ms, and commands actuate external robotics over the GPIO header. Unplug at any moment with zero trace.',
    pinHighlights: 'Closed Loop Continuous @ 54 Hz'
  }
];

export const ScrollytellingStage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0); // 0 to 1
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [userScrubbing, setUserScrubbing] = useState<boolean>(false);

  // Auto-play animation timer
  useEffect(() => {
    if (!isPlaying) return;

    let current = scrollProgress;
    const interval = setInterval(() => {
      current += 0.006;
      if (current > 1) {
        current = 0;
      }
      setScrollProgress(current);
    }, 30);

    return () => clearInterval(interval);
  }, [isPlaying, scrollProgress]);

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      if (isPlaying || userScrubbing || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalHeight = rect.height - window.innerHeight;
      const currentScroll = -rect.top;
      const progress = Math.max(0, Math.min(1, currentScroll / totalHeight));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isPlaying, userScrubbing]);

  // Determine current chapter
  const chapterIndex = Math.min(
    CHAPTERS.length - 1,
    Math.floor(scrollProgress * CHAPTERS.length)
  );
  const currentChapter = CHAPTERS[chapterIndex];

  // Realistic Physics Transformations
  // Phone height: starts at 140px above dock, lands at exact docking contact (0px) at progress 0.50+
  const dockingThreshold = 0.50;
  const isDocked = scrollProgress >= dockingThreshold;

  // Elevation: 0 to 1, where 1 is fully elevated (detached) and 0 is fully docked
  const elevation = Math.max(0, (dockingThreshold - scrollProgress) / dockingThreshold);

  // Phone translateY: from -110px down to -4px (seated into connector)
  const phoneY = -4 - elevation * 130;

  // Phone 3D tilt: gently tilts forward as it descends, settling dead-flat into connector
  const phoneTiltX = elevation * 12; // 0 to 12 deg
  const phoneScale = 1 - elevation * 0.03;

  // Shadow under phone: tightens and darkens as phone reaches dock
  const shadowBlur = 8 + (1 - elevation) * 20;
  const shadowOpacity = 0.15 + (1 - elevation) * 0.45;
  const shadowY = 20 - elevation * 15;

  // Energy & Contact Glow
  const contactGlow = isDocked ? Math.min(1, (scrollProgress - dockingThreshold) / 0.15) : 0;
  const pinsLit = scrollProgress >= 0.65;
  const loopActive = scrollProgress >= 0.82;

  return (
    <div ref={containerRef} className="relative bg-[#F5F5F7] text-[#1D1D1F]">
      
      {/* 400vh Scroll Track for spacious scrollytelling */}
      <div className="min-h-[420vh] relative">
        
        {/* Sticky Visual Stage */}
        <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden py-10 px-4 sm:px-8 select-none">
          
          {/* Top Control Bar & Scrubber */}
          <div className="max-w-5xl w-full mx-auto flex flex-wrap items-center justify-between gap-4 z-30">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold text-[#1D1D1F]">
                DOCKING SEQUENCE · {currentChapter.step}
              </span>
              <span className="text-[#86868B]">·</span>
              <span className="text-xs font-mono text-[#0071E3] font-medium hidden sm:inline">
                {currentChapter.pinHighlights}
              </span>
            </div>

            {/* Interactive Timeline Scrubber & Auto-Play */}
            <div className="flex items-center gap-3 bg-white/80 backdrop-blur-xl px-4 py-2 rounded-full border border-black/[0.08] shadow-xs">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="text-xs font-semibold text-[#1D1D1F] hover:text-[#0071E3] transition-colors flex items-center gap-1.5 cursor-pointer"
                title={isPlaying ? 'Pause Animation' : 'Auto-Play Realistic Docking'}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                <span>{isPlaying ? 'Pause' : 'Play Sequence'}</span>
              </button>

              <div className="w-px h-3.5 bg-black/[0.1]" />

              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.005"
                  value={scrollProgress}
                  onMouseDown={() => { setUserScrubbing(true); setIsPlaying(false); }}
                  onMouseUp={() => setUserScrubbing(false)}
                  onTouchStart={() => { setUserScrubbing(true); setIsPlaying(false); }}
                  onTouchEnd={() => setUserScrubbing(false)}
                  onChange={(e) => setScrollProgress(Number(e.target.value))}
                  className="w-24 sm:w-36 h-1.5 bg-black/[0.08] rounded-full appearance-none cursor-pointer accent-[#0071E3]"
                />
                <span className="font-mono text-[11px] text-[#86868B] w-9 tabular-nums">
                  {Math.round(scrollProgress * 100)}%
                </span>
              </div>

              <button
                onClick={() => { setScrollProgress(0); setIsPlaying(false); }}
                className="text-[#86868B] hover:text-[#1D1D1F] p-1 cursor-pointer"
                title="Reset to Top"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Central Realistic 3D Stage Viewport */}
          <div className="flex-1 flex items-center justify-center relative my-auto">
            <div className="relative w-full max-w-xl flex flex-col items-center justify-center">

              {/* 1. THE SMARTPHONE (REALISTIC TITANIUM / GLASS RENDERING) */}
              <div
                style={{
                  transform: `translateY(${phoneY}px) perspective(900px) rotateX(${phoneTiltX}deg) scale(${phoneScale})`,
                  transition: isPlaying || userScrubbing ? 'none' : 'transform 0.15s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
                className="relative z-20 w-64 sm:w-72 aspect-[9/17] rounded-[44px] p-2.5 shadow-2xl flex flex-col justify-between"
              >
                {/* Physical Titanium Edge Chassis */}
                <div className="absolute inset-0 rounded-[44px] bg-gradient-to-b from-[#3A3A3C] via-[#2C2C2E] to-[#1C1C1E] border-[3px] border-[#48484A] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] pointer-events-none" />

                {/* Glass Reflection Highlight Overlay */}
                <div 
                  className="absolute inset-0 rounded-[42px] pointer-events-none opacity-40"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.05) 45%, transparent 60%)'
                  }}
                />

                {/* Top Antenna Bands & Speaker Bezel */}
                <div className="relative z-10 flex justify-between items-center px-4 pt-1">
                  <span className="text-[10px] font-mono text-white/60">9:41</span>
                  
                  {/* Dynamic Island / Camera Punch Hole */}
                  <div className="w-18 h-4 bg-black rounded-full flex items-center justify-center px-2 relative border border-white/10 shadow-inner">
                    {/* Camera Lens Optics */}
                    <div className={`w-2.5 h-2.5 rounded-full border transition-all duration-300 ${
                      loopActive
                        ? 'bg-[#0071E3] border-[#38bdf8] shadow-[0_0_10px_#0071E3]'
                        : 'bg-[#1C1C1E] border-white/20'
                    }`} />
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="text-[9px] font-mono text-white/60 font-semibold">5G</span>
                    <div className="w-4 h-2 rounded-xs border border-white/50 p-0.5 flex items-center">
                      <div className="h-full w-full bg-[#34C759] rounded-xs" />
                    </div>
                  </div>
                </div>

                {/* OLED Display Area */}
                <div className="relative z-10 flex-1 mx-1 my-2 rounded-[34px] bg-[#0A0A0C] border border-white/[0.08] p-4 flex flex-col justify-between overflow-hidden shadow-inner">
                  
                  {/* Ambient Screen Light Mesh */}
                  <div className={`absolute inset-0 transition-opacity duration-500 ${isDocked ? 'opacity-100' : 'opacity-20'}`}
                    style={{
                      background: 'radial-gradient(circle at 50% 90%, rgba(0, 113, 227, 0.25), transparent 70%)'
                    }}
                  />

                  {/* Header on Phone */}
                  <div className="relative z-10 flex items-center justify-between text-[10px] font-mono">
                    <span className="text-white font-bold tracking-tight">RASQ SYSTEM</span>
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                      isDocked 
                        ? 'bg-[#34C759]/20 text-[#34C759]' 
                        : 'bg-white/10 text-white/50'
                    }`}>
                      {isDocked ? 'DOCK LINK: 921K' : 'DISCONNECTED'}
                    </span>
                  </div>

                  {/* Screen Content: Real-time Camera Vision or Connecting state */}
                  <div className="relative z-10 my-auto text-center flex flex-col items-center justify-center">
                    {loopActive ? (
                      /* Stage 5: Live Closed-Loop Vision Active */
                      <div className="space-y-2 animate-in fade-in zoom-in-95 duration-200">
                        <div className="w-24 h-24 rounded-2xl border-2 border-[#34C759] bg-[#34C759]/10 relative flex items-center justify-center shadow-[0_0_20px_rgba(52,199,89,0.3)]">
                          <div className="w-3 h-3 rounded-full bg-[#34C759] animate-ping absolute" />
                          <div className="w-2 h-2 rounded-full bg-white relative z-10" />
                          <div className="absolute -top-3 left-2 bg-[#34C759] text-black font-mono text-[8px] font-bold px-1 rounded">
                            TARGET TRACKED
                          </div>
                        </div>
                        <div className="text-[10px] font-mono text-[#34C759] font-semibold">
                          Vision: 60 FPS · 11ms NPU
                        </div>
                      </div>
                    ) : isDocked ? (
                      /* Stage 3 & 4: Docking Handshake Complete */
                      <div className="space-y-2 text-center">
                        <div className="w-14 h-14 rounded-full border border-[#0071E3] bg-[#0071E3]/20 flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(0,113,227,0.4)] animate-pulse">
                          <Zap className="w-7 h-7 text-[#0071E3]" />
                        </div>
                        <div className="text-xs font-mono font-bold text-white">
                          USB-PD 18W Fast Charge
                        </div>
                        <div className="text-[10px] font-mono text-[#0071E3]">
                          CDC Bus Synchronized
                        </div>
                      </div>
                    ) : (
                      /* Stage 1 & 2: Approaching */
                      <div className="space-y-1 text-center text-white/40 font-mono text-[10px]">
                        <Cpu className="w-8 h-8 mx-auto text-white/20 mb-1" />
                        <div>Octa-Core Compute</div>
                        <div className="text-[9px] text-white/20">Awaiting Docking Port</div>
                      </div>
                    )}
                  </div>

                  {/* Bottom Phone Telemetry */}
                  <div className="relative z-10 flex justify-between items-center text-[9px] font-mono pt-2 border-t border-white/[0.08] text-white/60">
                    <span>Li-ion UPS: 5000mAh</span>
                    <span className={isDocked ? 'text-[#34C759] font-bold' : ''}>
                      {isDocked ? '100% · AC ACTIVE' : 'BATTERY'}
                    </span>
                  </div>
                </div>

                {/* Smartphone Bottom Bezel & Type-C Female Receptacle */}
                <div className="relative z-10 flex justify-center items-center pb-1">
                  <div className={`w-9 h-2.5 rounded-full border transition-all duration-200 flex items-center justify-center ${
                    isDocked 
                      ? 'border-[#0071E3] bg-[#0071E3] shadow-[0_0_12px_#0071E3]' 
                      : 'border-white/30 bg-[#1C1C1E]'
                  }`}>
                    {/* Internal gold contact tongue inside port */}
                    <div className="w-5 h-0.5 bg-[#FFCC00] rounded-xs" />
                  </div>
                </div>
              </div>

              {/* 2. DYNAMIC CAST SHADOW (TIGHTENS AS PHONE LANDS) */}
              <div
                style={{
                  width: `${240 - elevation * 60}px`,
                  height: '14px',
                  borderRadius: '100%',
                  background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.7) 0%, transparent 70%)',
                  opacity: shadowOpacity,
                  filter: `blur(${shadowBlur}px)`,
                  transform: `translateY(${shadowY}px)`,
                  transition: 'all 0.15s ease-out'
                }}
                className="z-10 pointer-events-none"
              />

              {/* 3. THE RASQ CARRIER DOCK (REALISTIC CNC ALUMINUM & PCB ASSEMBLY) */}
              <div className="relative z-15 w-84 sm:w-96 bg-white rounded-[32px] p-6 border border-black/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.1)] space-y-4">
                
                {/* Precision Type-C Male Connector Plug rising to meet phone */}
                <div className="flex flex-col items-center -mt-10 mb-2">
                  <div className={`w-8 h-5 rounded-t-md border-t-2 border-x-2 transition-all duration-200 relative flex items-center justify-center ${
                    isDocked
                      ? 'border-[#0071E3] bg-[#0071E3]/20 shadow-[0_-5px_15px_rgba(0,113,227,0.5)]'
                      : 'border-[#86868B] bg-gradient-to-b from-[#E5E5EA] to-[#D1D1D6]'
                  }`}>
                    {/* Metal tongue seam line */}
                    <div className="w-5 h-1 bg-[#86868B] rounded-xs" />
                    {/* Gold pins tip highlight */}
                    <div className="absolute top-0.5 w-4 h-0.5 bg-[#FFCC00] rounded-xs opacity-80" />
                  </div>

                  {/* CNC Chamfered Connector Collar Base */}
                  <div className="w-14 h-2 bg-[#C7C7CC] rounded-t-sm border border-black/[0.1] shadow-xs" />
                </div>

                {/* Dock Branding Header & Status LEDs */}
                <div className="flex items-center justify-between border-b border-black/[0.06] pb-2 text-[11px] font-mono">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#1D1D1F]">RASQ DOCK</span>
                    <span className="text-[#86868B] text-[10px]">HW REV 0.9.4</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] text-[#86868B]">STATUS:</span>
                    <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                      isDocked ? 'bg-[#34C759] shadow-[0_0_8px_#34C759]' : 'bg-[#FF9500]'
                    }`} />
                    <span className={`text-[10px] font-bold ${isDocked ? 'text-[#34C759]' : 'text-[#FF9500]'}`}>
                      {isDocked ? 'CDC SYNC' : 'READY'}
                    </span>
                  </div>
                </div>

                {/* Real-life ESP32-S3 QFN Coprocessor Chip on Matte Dark PCB */}
                <div className="bg-[#1C1C1E] p-3 rounded-2xl border border-black/[0.15] text-[10px] font-mono flex items-center justify-between shadow-inner">
                  <div className="flex items-center gap-2.5">
                    {/* Black Epoxy Package with laser markings */}
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#2C2C2E] to-[#1C1C1E] border border-white/10 flex flex-col items-center justify-center p-1 relative shadow-md">
                      <div className="text-[7px] text-[#FFCC00] font-bold tracking-tighter">ESP32</div>
                      <div className="text-[6px] text-white/60">S3-WROOM</div>
                      {/* Solder balls / pin pads along perimeter */}
                      <div className="absolute top-0 inset-x-1 h-0.5 flex justify-between">
                        <div className="w-0.5 h-0.5 bg-[#8E8E93]" />
                        <div className="w-0.5 h-0.5 bg-[#8E8E93]" />
                        <div className="w-0.5 h-0.5 bg-[#8E8E93]" />
                      </div>
                    </div>

                    <div>
                      <div className="text-white font-bold leading-tight">ESP32-S3 Hardware Bridge</div>
                      <div className="text-[#86868B] text-[9px]">Dual-Core 240MHz · USB CDC Serial</div>
                    </div>
                  </div>

                  <div className="text-right text-[9px] font-mono text-white/50">
                    <div>Baud: 921,600</div>
                    <div className={isDocked ? 'text-[#34C759]' : ''}>{isDocked ? 'Handshake OK' : 'Listening'}</div>
                  </div>
                </div>

                {/* 40-PIN EXPANSION HEADER (AUTHENTIC 3D GOLD PINS WITH SHROUD) */}
                <div className="space-y-2 pt-1">
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="font-bold text-[#1D1D1F]">STANDARD 40-PIN GPIO HEADER</span>
                    <span className={pinsLit ? 'text-[#0071E3] font-bold' : 'text-[#86868B]'}>
                      {pinsLit ? '3.3V BUS ACTIVE' : 'RASPBERRY PI COMPATIBLE'}
                    </span>
                  </div>

                  {/* Realistic Injection-Molded Black Shrouded Header Block */}
                  <div className="bg-[#1D1D1F] p-3 rounded-2xl border border-black/[0.2] shadow-inner space-y-2">
                    
                    {/* Odd Pins Row (Pins 1 to 39) */}
                    <div className="grid grid-cols-20 gap-1">
                      {Array.from({ length: 20 }).map((_, i) => {
                        const pinNum = i * 2 + 1;
                        const is3v3 = pinNum === 1 || pinNum === 17;
                        const isI2c = pinNum === 3 || pinNum === 5;
                        const isSpi = pinNum === 19 || pinNum === 21 || pinNum === 23;

                        return (
                          <div
                            key={pinNum}
                            title={`Pin ${pinNum}`}
                            className={`h-3 rounded-xs transition-all duration-300 relative ${
                              pinsLit && is3v3
                                ? 'bg-[#FF9500] shadow-[0_0_6px_#FF9500]'
                                : pinsLit && isI2c
                                ? 'bg-[#0071E3] shadow-[0_0_6px_#0071E3]'
                                : pinsLit && isSpi
                                ? 'bg-[#AF52DE] shadow-[0_0_6px_#AF52DE]'
                                : pinsLit
                                ? 'bg-[#FFCC00] shadow-[0_0_4px_#FFCC00]'
                                : 'bg-gradient-to-b from-[#FFD60A] to-[#D4A373]'
                            }`}
                          >
                            {/* Metallic specular 3D pin highlight on tip */}
                            <div className="w-full h-1 bg-white/40 rounded-t-xs" />
                          </div>
                        );
                      })}
                    </div>

                    {/* Even Pins Row (Pins 2 to 40) */}
                    <div className="grid grid-cols-20 gap-1">
                      {Array.from({ length: 20 }).map((_, i) => {
                        const pinNum = (i + 1) * 2;
                        const is5v = pinNum === 2 || pinNum === 4;
                        const isPwm = pinNum === 12 || pinNum === 18 || pinNum === 32 || pinNum === 33;
                        const isGnd = pinNum === 6 || pinNum === 14 || pinNum === 20 || pinNum === 25 || pinNum === 30 || pinNum === 34 || pinNum === 39;

                        return (
                          <div
                            key={pinNum}
                            title={`Pin ${pinNum}`}
                            className={`h-3 rounded-xs transition-all duration-300 relative ${
                              pinsLit && is5v
                                ? 'bg-[#FF3B30] shadow-[0_0_6px_#FF3B30]'
                                : pinsLit && isPwm
                                ? 'bg-[#0071E3] animate-pulse shadow-[0_0_8px_#0071E3]'
                                : pinsLit && isGnd
                                ? 'bg-[#636366]'
                                : pinsLit
                                ? 'bg-[#FFCC00] shadow-[0_0_4px_#FFCC00]'
                                : 'bg-gradient-to-b from-[#FFD60A] to-[#D4A373]'
                            }`}
                          >
                            <div className="w-full h-1 bg-white/40 rounded-t-xs" />
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Pin Signal Legend */}
                  <div className="flex flex-wrap items-center justify-between text-[9px] font-mono text-[#86868B] pt-0.5">
                    <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#FF3B30]" /> 5V Rail</span>
                    <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#FF9500]" /> 3.3V Rail</span>
                    <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#0071E3]" /> 16x PWM</span>
                    <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#AF52DE]" /> I²C / SPI</span>
                    <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#636366]" /> GND</span>
                  </div>
                </div>

                {/* High-Current Dual Motor H-Bridge outputs */}
                <div className="flex items-center justify-between pt-2 border-t border-black/[0.06] text-[10px] font-mono text-[#86868B]">
                  <span>Motor Drivers: DRV8833 (2x 1.5A)</span>
                  <span className="text-[#1D1D1F] font-bold">7V–24V DC Input</span>
                </div>

              </div>

            </div>
          </div>

          {/* Bottom Narrative Banner (Vast Negative Space) */}
          <div className="max-w-2xl w-full mx-auto text-center z-30 transition-all duration-300">
            <span className="text-xs font-mono font-bold tracking-wider text-[#0071E3] uppercase block mb-1">
              {currentChapter.subtitle}
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#1D1D1F] tracking-tight">
              {currentChapter.title}
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-[#86868B] leading-relaxed max-w-lg mx-auto">
              {currentChapter.description}
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};

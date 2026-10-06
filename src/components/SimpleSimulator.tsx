import React, { useState, useEffect, useRef } from 'react';
import { Smartphone, Cpu, Zap, Power, Video, VideoOff, RefreshCw, ArrowRight } from 'lucide-react';

export const SimpleSimulator: React.FC = () => {
  const [isPluggedIn, setIsPluggedIn] = useState<boolean>(true);
  const [isAutoMoving, setIsAutoMoving] = useState<boolean>(true);
  const [useWebcam, setUseWebcam] = useState<boolean>(false);
  
  // Target coordinates on screen (0 to 100%)
  const [targetX, setTargetX] = useState<number>(50);
  const [targetY, setTargetY] = useState<number>(50);

  // Motor / servo angle (-60 deg to +60 deg)
  const [motorAngle, setMotorAngle] = useState<number>(0);
  
  // Bridge signal flash
  const [signalActive, setSignalActive] = useState<boolean>(false);

  // Webcam stream
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const webcamStreamRef = useRef<MediaStream | null>(null);

  // Auto-move target animation
  useEffect(() => {
    if (!isAutoMoving || useWebcam) return;

    let step = 0;
    const interval = setInterval(() => {
      step += 0.05;
      const nextX = 50 + Math.sin(step) * 35;
      const nextY = 50 + Math.cos(step * 0.7) * 25;
      setTargetX(nextX);
      setTargetY(nextY);
    }, 50);

    return () => clearInterval(interval);
  }, [isAutoMoving, useWebcam]);

  // Closed loop: When target moves and phone is plugged in, update motor!
  useEffect(() => {
    if (!isPluggedIn) {
      setMotorAngle(0);
      setSignalActive(false);
      return;
    }

    // Map targetX (15% to 85%) to motor angle (-50 to +50 degrees)
    const normalized = (targetX - 50) / 35; // approx -1 to 1
    const clampedAngle = Math.round(Math.max(-55, Math.min(55, normalized * 50)));

    setMotorAngle(clampedAngle);
    setSignalActive(true);

    const timer = setTimeout(() => {
      setSignalActive(false);
    }, 120);

    return () => clearTimeout(timer);
  }, [targetX, isPluggedIn]);

  // Webcam handler
  const toggleWebcam = async () => {
    if (useWebcam) {
      if (webcamStreamRef.current) {
        webcamStreamRef.current.getTracks().forEach(t => t.stop());
        webcamStreamRef.current = null;
      }
      setUseWebcam(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 480, height: 360, facingMode: 'user' }
        });
        webcamStreamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
        setUseWebcam(true);
        setIsAutoMoving(false);
      } catch (err) {
        alert("Could not access webcam. Using virtual object simulation.");
        setUseWebcam(false);
      }
    }
  };

  // Click on camera viewport to move target
  const handleViewportClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (useWebcam) return;
    setIsAutoMoving(false);
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(10, Math.min(90, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(15, Math.min(85, ((e.clientY - rect.top) / rect.height) * 100));
    setTargetX(x);
    setTargetY(y);
  };

  return (
    <section id="simulator" className="py-12 bg-neutral-950 text-white relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Simple Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>INTERACTIVE SIMULATOR</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            See the Closed-Loop in Action
          </h2>
          <p className="mt-2 text-sm text-neutral-400">
            The phone's camera acts as the <strong className="text-white">eyes</strong>, on-device AI tracks the object, and commands travel through the USB-C dock to move the <strong className="text-white">physical motor</strong>.
          </p>
        </div>

        {/* Top Control Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-neutral-900/80 p-3 rounded-2xl border border-neutral-800 mb-8 max-w-3xl mx-auto">
          {/* Plug / Unplug Button */}
          <button
            onClick={() => setIsPluggedIn(!isPluggedIn)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              isPluggedIn
                ? 'bg-cyan-400 text-neutral-950 shadow-md shadow-cyan-500/20'
                : 'bg-neutral-800 text-neutral-300 hover:text-white'
            }`}
          >
            <Power className="w-4 h-4" />
            <span>{isPluggedIn ? 'USB-C Dock Connected' : 'Phone Unplugged (Click to Connect)'}</span>
          </button>

          {/* Target Motion Options */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAutoMoving(!isAutoMoving)}
              disabled={useWebcam}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                isAutoMoving && !useWebcam
                  ? 'bg-neutral-800 text-cyan-300 border border-cyan-500/40'
                  : 'text-neutral-400 hover:text-white bg-neutral-950'
              }`}
            >
              {isAutoMoving ? 'Auto-Moving Target' : 'Move Target Manually'}
            </button>

            <button
              onClick={toggleWebcam}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                useWebcam
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'text-neutral-400 hover:text-white bg-neutral-950'
              }`}
            >
              {useWebcam ? <Video className="w-3.5 h-3.5 text-emerald-400" /> : <VideoOff className="w-3.5 h-3.5" />}
              <span>{useWebcam ? 'Using Webcam' : 'Use Webcam'}</span>
            </button>
          </div>
        </div>

        {/* 3-Box Flow Diagram & Interactive Rig */}
        <div className="grid grid-cols-1 lg:grid-cols-11 gap-4 items-center">
          
          {/* Box 1: The Phone (Brain & Camera) */}
          <div className="lg:col-span-5 bg-neutral-900 rounded-2xl border border-neutral-800 p-5 shadow-xl">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-neutral-800 text-xs font-mono">
              <span className="text-cyan-400 font-bold flex items-center gap-1.5">
                <Smartphone className="w-4 h-4" />
                1. THE BRAIN (Your Phone)
              </span>
              <span className="text-neutral-400">Camera + On-Device AI</span>
            </div>

            {/* Screen Viewport */}
            <div
              onClick={handleViewportClick}
              className="relative aspect-[4/3] rounded-xl overflow-hidden bg-black border-2 border-neutral-700 cursor-crosshair select-none flex items-center justify-center"
            >
              {/* Webcam stream */}
              <video
                ref={videoRef}
                className={`absolute inset-0 w-full h-full object-cover ${useWebcam ? 'block' : 'hidden'}`}
                muted
                playsInline
              />

              {/* Virtual Target Feed */}
              {!useWebcam && (
                <div className="absolute inset-0 bg-neutral-950 flex flex-col justify-between p-4">
                  {/* Grid Lines */}
                  <div
                    className="absolute inset-0 opacity-10 pointer-events-none"
                    style={{
                      backgroundImage: 'radial-gradient(circle, #38bdf8 1px, transparent 1px)',
                      backgroundSize: '24px 24px'
                    }}
                  />

                  <div className="text-[11px] font-mono text-neutral-400 z-10 pointer-events-none">
                    Click anywhere on this screen to move the target
                  </div>

                  {/* Red Target Ball with AI Bounding Box */}
                  <div
                    style={{
                      position: 'absolute',
                      left: `${targetX}%`,
                      top: `${targetY}%`,
                      transform: 'translate(-50%, -50%)',
                      transition: isAutoMoving ? 'left 0.08s linear, top 0.08s linear' : 'none'
                    }}
                    className="pointer-events-none z-20"
                  >
                    {/* Bounding Box */}
                    <div className="w-16 h-16 border-2 border-cyan-400 bg-cyan-400/10 rounded flex items-center justify-center relative shadow-lg shadow-cyan-500/20">
                      <div className="w-4 h-4 rounded-full bg-red-500 shadow-md shadow-red-500/50" />
                      
                      {/* AI Detection Label */}
                      <div className="absolute -top-5 left-0 bg-cyan-400 text-neutral-950 font-mono text-[9px] font-bold px-1 rounded-t whitespace-nowrap">
                        TARGET: {Math.round(targetX)}%
                      </div>
                    </div>
                  </div>

                  <div className="text-[10px] font-mono text-neutral-500 z-10 pointer-events-none flex justify-between">
                    <span>Frame: 60 FPS</span>
                    <span>AI Latency: 11ms</span>
                  </div>
                </div>
              )}

              {/* Overlay if Phone is Unplugged */}
              {!isPluggedIn && (
                <div className="absolute inset-0 bg-neutral-950/85 backdrop-blur-xs flex flex-col items-center justify-center p-4 text-center z-30">
                  <Smartphone className="w-8 h-8 text-neutral-500 mb-2" />
                  <span className="text-white text-xs font-bold">Phone is Unplugged</span>
                  <span className="text-[11px] text-neutral-400 mt-1 max-w-xs">
                    Click "Connect" above. When unplugged, your phone is just a phone.
                  </span>
                </div>
              )}
            </div>

            {/* Subtext */}
            <div className="mt-3 text-[11px] text-neutral-400 flex items-center justify-between font-mono">
              <span>On-device NPU computes target vector</span>
              <span className="text-cyan-400 font-bold">X: {Math.round(targetX)}%</span>
            </div>
          </div>

          {/* Box 2: The USB-C Cable / Bridge (Middle) */}
          <div className="lg:col-span-2 flex flex-col items-center justify-center py-4 lg:py-0">
            {/* Cable Line */}
            <div className="flex lg:flex-col items-center gap-2">
              <div
                className={`h-1 lg:h-12 w-12 lg:w-1 rounded transition-colors ${
                  isPluggedIn && signalActive
                    ? 'bg-cyan-400 shadow-sm shadow-cyan-400'
                    : isPluggedIn
                    ? 'bg-teal-500'
                    : 'bg-neutral-800'
                }`}
              />

              <div className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-center font-mono text-[10px]">
                <Cpu className={`w-5 h-5 mx-auto mb-1 ${isPluggedIn ? 'text-teal-400' : 'text-neutral-600'}`} />
                <span className="text-white font-bold block">2. THE BRIDGE</span>
                <span className="text-neutral-400 text-[9px] block">USB-C Dock</span>
                <div className={`mt-1 text-[9px] font-bold ${isPluggedIn ? 'text-emerald-400' : 'text-neutral-500'}`}>
                  {isPluggedIn ? 'ACTIVE' : 'IDLE'}
                </div>
              </div>

              <div
                className={`h-1 lg:h-12 w-12 lg:w-1 rounded transition-colors ${
                  isPluggedIn && signalActive
                    ? 'bg-cyan-400 shadow-sm shadow-cyan-400'
                    : isPluggedIn
                    ? 'bg-teal-500'
                    : 'bg-neutral-800'
                }`}
              />
            </div>
          </div>

          {/* Box 3: Physical Action (The Motor) */}
          <div className="lg:col-span-4 bg-neutral-900 rounded-2xl border border-neutral-800 p-5 shadow-xl">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-neutral-800 text-xs font-mono">
              <span className="text-teal-400 font-bold flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-400" />
                3. PHYSICAL ACTION (Motor)
              </span>
              <span className="text-neutral-400">PWM Servo Pin 18</span>
            </div>

            {/* Motor Visualizer */}
            <div className="aspect-[4/3] rounded-xl bg-neutral-950 border border-neutral-800 flex flex-col items-center justify-center p-4 relative">
              <span className="text-[10px] font-mono text-neutral-500 absolute top-3 left-3">
                REAL-TIME SERVO TRACKING
              </span>

              {/* Servo Body SVG */}
              <div className="relative w-36 h-36 flex items-center justify-center">
                
                {/* Black Servo Box Case */}
                <div className="w-24 h-24 bg-neutral-800 rounded-xl border border-neutral-700 shadow-xl flex items-center justify-center relative">
                  
                  {/* Mounting tabs */}
                  <div className="absolute -top-2 w-8 h-2 bg-neutral-700 rounded-t" />
                  <div className="absolute -bottom-2 w-8 h-2 bg-neutral-700 rounded-b" />

                  {/* Motor Shaft / Bearing */}
                  <div className="w-12 h-12 rounded-full bg-neutral-900 border-2 border-neutral-700 flex items-center justify-center relative">
                    
                    {/* Rotating Horn / Arm */}
                    <div
                      style={{
                        transform: `rotate(${motorAngle}deg)`,
                        transition: 'transform 0.08s ease-out'
                      }}
                      className="w-2 h-20 bg-gradient-to-t from-cyan-500 to-amber-400 rounded-full shadow-md shadow-amber-500/30 absolute origin-center"
                    >
                      {/* Tip indicator */}
                      <div className="w-3 h-3 rounded-full bg-white absolute -top-1 -left-0.5 shadow" />
                    </div>

                    {/* Shaft Center screw */}
                    <div className="w-4 h-4 rounded-full bg-neutral-600 border border-neutral-500 z-10" />
                  </div>
                </div>

              </div>

              {/* Angle Readout */}
              <div className="flex items-center justify-between w-full pt-3 mt-2 border-t border-neutral-800/80 font-mono text-xs">
                <span className="text-neutral-400">Motor Angle:</span>
                <span className={`font-bold ${isPluggedIn ? 'text-amber-400' : 'text-neutral-600'}`}>
                  {isPluggedIn ? `${motorAngle > 0 ? `+${motorAngle}` : motorAngle}°` : '0° (Unpowered)'}
                </span>
              </div>
            </div>

            {/* Subtext */}
            <div className="mt-3 text-[11px] text-neutral-400 flex items-center justify-between font-mono">
              <span>Bridge Pin: GPIO 18 (PWM)</span>
              <span className="text-emerald-400 font-bold">
                {isPluggedIn ? `${Math.round(1500 + motorAngle * 10)} µs` : '0 µs'}
              </span>
            </div>
          </div>

        </div>

        {/* Simple Step-by-Step Explanation Banner */}
        <div className="mt-8 bg-neutral-900/60 rounded-xl border border-neutral-800 p-4 text-xs font-mono text-neutral-300 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2 text-cyan-400 font-bold">
            <span>HOW IT WORKS:</span>
          </div>
          <div>
            1. Phone Camera sees target <span className="text-neutral-600">→</span> 2. Phone AI detects position <span className="text-neutral-600">→</span> 3. USB-C dock converts to PWM <span className="text-neutral-600">→</span> 4. Motor moves
          </div>
          <div className="text-emerald-400 font-bold">
            Total latency: 22ms
          </div>
        </div>

      </div>
    </section>
  );
};

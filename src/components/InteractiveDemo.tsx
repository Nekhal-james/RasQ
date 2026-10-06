import React, { useState, useEffect, useRef } from 'react';
import { 
  Smartphone, Cpu, Zap, Camera, Eye, RefreshCw, Power, 
  Play, Pause, Sliders, CheckCircle2, AlertTriangle, ArrowRight, Video, VideoOff
} from 'lucide-react';
import { DemoMode } from '../types';

export const InteractiveDemo: React.FC = () => {
  const [isDocked, setIsDocked] = useState<boolean>(true);
  const [demoMode, setDemoMode] = useState<DemoMode>('turret');
  const [isRunning, setIsRunning] = useState<boolean>(true);
  
  // Real webcam state
  const [useWebcam, setUseWebcam] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const webcamStreamRef = useRef<MediaStream | null>(null);

  // Vision target coordinates (0.0 to 1.0)
  const [targetPos, setTargetPos] = useState<{ x: number; y: number }>({ x: 0.5, y: 0.5 });
  const [isDraggingTarget, setIsDraggingTarget] = useState<boolean>(false);

  // Hardware state
  const [servoYaw, setServoYaw] = useState<number>(0); // -45 to +45 deg
  const [servoPitch, setServoPitch] = useState<number>(0); // -30 to +30 deg
  const [motorRpm, setMotorRpm] = useState<number>(0);
  const [ledPin23, setLedPin23] = useState<boolean>(false);
  const [solenoidPin22, setSolenoidPin22] = useState<boolean>(false);
  
  // Telemetry metrics
  const [latencyBreakdown, setLatencyBreakdown] = useState({
    camera: 6.2,
    npu: 11.4,
    decision: 1.1,
    bridgeUsb: 2.3,
    actuation: 1.8,
    total: 22.8,
  });

  // Recent USB CDC packet log
  const [packetLogs, setPacketLogs] = useState<string[]>([
    '[INIT] USB-PD Contract: 9V @ 2.0A (18W)',
    '[INIT] Bridge handshake: ESP32-S3 rev 0.2',
    '[SYNC] Baud: 921600 / CDC ACM Mode',
  ]);

  // Canvas ref for waveform logic oscilloscope
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Simulated target motion in 'turret' mode if not dragging and not using webcam
  useEffect(() => {
    if (!isRunning || !isDocked || useWebcam || isDraggingTarget) return;

    let angle = 0;
    const interval = setInterval(() => {
      angle += 0.04;
      if (demoMode === 'turret') {
        const nextX = 0.5 + Math.sin(angle) * 0.32;
        const nextY = 0.5 + Math.cos(angle * 0.8) * 0.22;
        setTargetPos({ x: nextX, y: nextY });
      } else if (demoMode === 'conveyor') {
        // conveyor items pass from left to right
        setTargetPos(prev => {
          const newX = (prev.x + 0.015) % 1.2;
          return { x: newX > 1.0 ? 0.05 : newX, y: 0.5 };
        });
      } else if (demoMode === 'rover') {
        const nextX = 0.5 + Math.sin(angle * 1.5) * 0.25;
        const nextY = 0.65 + Math.cos(angle * 0.5) * 0.15;
        setTargetPos({ x: nextX, y: nextY });
      }
    }, 50);

    return () => clearInterval(interval);
  }, [isRunning, isDocked, useWebcam, demoMode, isDraggingTarget]);

  // Real-time closed-loop decision & actuator calculation
  useEffect(() => {
    if (!isDocked) {
      setServoYaw(0);
      setServoPitch(0);
      setMotorRpm(0);
      setLedPin23(false);
      setSolenoidPin22(false);
      return;
    }

    if (demoMode === 'turret') {
      // Calculate angular servo target to follow targetPos
      const targetYawDeg = (targetPos.x - 0.5) * 70; // -35 to +35 deg
      const targetPitchDeg = -(targetPos.y - 0.5) * 50; // -25 to +25 deg

      setServoYaw(prev => prev + (targetYawDeg - prev) * 0.35);
      setServoPitch(prev => prev + (targetPitchDeg - prev) * 0.35);
      setMotorRpm(0);
      setLedPin23(Math.abs(targetYawDeg) < 5 && Math.abs(targetPitchDeg) < 5);
      setSolenoidPin22(false);

    } else if (demoMode === 'conveyor') {
      setMotorRpm(120); // Conveyor drive motor
      // When item reaches center (0.45 to 0.55), test defect
      const isDefectZone = targetPos.x >= 0.45 && targetPos.x <= 0.60;
      setSolenoidPin22(isDefectZone);
      setLedPin23(isDefectZone);

    } else if (demoMode === 'rover') {
      const obstacleDist = 1.0 - targetPos.y; // closer if y is larger
      const steering = (targetPos.x - 0.5) * 100;
      setMotorRpm(Math.max(20, Math.round(obstacleDist * 180)));
      setServoYaw(steering);
      setLedPin23(obstacleDist < 0.3);
      setSolenoidPin22(false);
    }

    // Add periodic packet logs
    if (Math.random() > 0.65) {
      const hexPayload = Math.floor(Math.random() * 0xFF).toString(16).padStart(2, '0').toUpperCase();
      let logMsg = '';
      if (demoMode === 'turret') {
        const panUs = Math.round(1500 + servoYaw * 10);
        logMsg = `[TX CDC] 0xAA 0x12 0x${hexPayload} -> SERVO_PAN(pin 18): ${panUs}µs`;
      } else if (demoMode === 'conveyor') {
        logMsg = `[TX CDC] 0xAA 0x22 0x${hexPayload} -> ${solenoidPin22 ? 'SOLENOID_KICK(pin 22): HIGH' : 'CONVEYOR_PWM(pin 12): 75%'}`;
      } else {
        logMsg = `[TX CDC] 0xAA 0x14 0x${hexPayload} -> DUAL_HBRIDGE_DRIVE(rpm: ${motorRpm})`;
      }

      setPacketLogs(prev => [logMsg, ...prev.slice(0, 5)]);
    }

    // Jitter latency slightly for realism
    setLatencyBreakdown({
      camera: Number((5.8 + Math.random() * 0.8).toFixed(1)),
      npu: Number((11.0 + Math.random() * 0.9).toFixed(1)),
      decision: Number((0.9 + Math.random() * 0.4).toFixed(1)),
      bridgeUsb: Number((2.1 + Math.random() * 0.4).toFixed(1)),
      actuation: Number((1.6 + Math.random() * 0.3).toFixed(1)),
      total: Number((21.4 + Math.random() * 2.0).toFixed(1)),
    });

  }, [targetPos, isDocked, demoMode, isRunning]);

  // Webcam activation handler
  const toggleWebcam = async () => {
    if (useWebcam) {
      if (webcamStreamRef.current) {
        webcamStreamRef.current.getTracks().forEach(track => track.stop());
        webcamStreamRef.current = null;
      }
      setUseWebcam(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { width: 640, height: 480, facingMode: 'user' } 
        });
        webcamStreamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
        setUseWebcam(true);
      } catch (err) {
        alert("Camera permission denied or camera not found. Using simulated vision feed instead.");
        setUseWebcam(false);
      }
    }
  };

  // Oscilloscope waveform rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let offset = 0;

    const renderWaveform = () => {
      offset += isDocked ? 2.5 : 0;
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Grid lines
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 0.5;
      for (let x = 0; x < canvas.width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 20) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      if (!isDocked) {
        // Flatline
        ctx.strokeStyle = '#475569';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2);
        ctx.lineTo(canvas.width, canvas.height / 2);
        ctx.stroke();
        return;
      }

      // Channel 1: PWM 1 (GPIO 18) - Cyan
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 2;
      ctx.beginPath();
      const period = 50;
      const duty = Math.min(0.9, Math.max(0.1, 0.5 + servoYaw / 100));
      for (let x = 0; x < canvas.width; x++) {
        const cycleX = (x + offset) % period;
        const yVal = cycleX < period * duty ? 25 : 55;
        if (x === 0) ctx.moveTo(x, yVal);
        else ctx.lineTo(x, yVal);
      }
      ctx.stroke();

      // Channel 2: GPIO 23 Status Pulse - Amber
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (let x = 0; x < canvas.width; x++) {
        const cycleX = (x + offset * 0.6) % 90;
        const yVal = (cycleX < 20 && ledPin23) ? 75 : 95;
        if (x === 0) ctx.moveTo(x, yVal);
        else ctx.lineTo(x, yVal);
      }
      ctx.stroke();

      animId = requestAnimationFrame(renderWaveform);
    };

    renderWaveform();
    return () => cancelAnimationFrame(animId);
  }, [isDocked, servoYaw, ledPin23]);

  // Target Dragging in Phone Viewport
  const handlePhoneCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDocked || useWebcam) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0.1, Math.min(0.9, (e.clientX - rect.left) / rect.width));
    const y = Math.max(0.1, Math.min(0.9, (e.clientY - rect.top) / rect.height));
    setTargetPos({ x, y });
  };

  return (
    <section id="interactive-demo" className="py-24 border-b border-neutral-900 bg-neutral-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-3">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>02. PROOF OF CONCEPT (MVP)</span>
              <span className="text-neutral-600">·</span>
              <span className="text-neutral-400">CLOSED-LOOP ROBOTICS RIG</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight" style={{ textWrap: 'balance' }}>
              Real-time Vision to Physical Actuation in 22ms.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-neutral-400 leading-relaxed">
              Test the exact proof-of-concept pipeline: The smartphone camera captures frames as "eyes," the on-device NPU runs computer vision detection, the app computes motion vectors, and sends hardware PWM commands across USB-C to drive the bridge motors.
            </p>
          </div>

          {/* Dock / Undock Plug-and-Play Control */}
          <div className="flex items-center gap-3 bg-neutral-900/80 p-2 rounded-2xl border border-neutral-800">
            <button
              onClick={() => setIsDocked(!isDocked)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                isDocked 
                  ? 'bg-cyan-400 text-neutral-950 shadow-md shadow-cyan-500/20' 
                  : 'bg-neutral-800 text-neutral-300 hover:text-white'
              }`}
            >
              <Power className="w-4 h-4" />
              <span>{isDocked ? 'Docked (SBC Mode)' : 'Undocked (Phone Mode)'}</span>
            </button>

            <button
              onClick={() => setIsRunning(!isRunning)}
              disabled={!isDocked}
              className={`p-2.5 rounded-xl text-xs transition-colors cursor-pointer ${
                !isDocked 
                  ? 'opacity-40 cursor-not-allowed bg-neutral-800 text-neutral-500'
                  : isRunning 
                  ? 'bg-neutral-800 text-amber-400 hover:bg-neutral-700' 
                  : 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30'
              }`}
              title={isRunning ? 'Pause Loop' : 'Resume Loop'}
            >
              {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Demo Scenario Selector */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-neutral-900/60 rounded-xl border border-neutral-800 mb-8">
          <span className="text-xs font-mono text-neutral-400 px-3">SCENARIO:</span>
          
          <button
            onClick={() => setDemoMode('turret')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              demoMode === 'turret'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            01. Pan-Tilt Vision Turret (Closed Loop)
          </button>

          <button
            onClick={() => setDemoMode('conveyor')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              demoMode === 'conveyor'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            02. Conveyor Defect Sorter & Solenoid
          </button>

          <button
            onClick={() => setDemoMode('rover')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              demoMode === 'rover'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            03. Autonomous Rover Obstacle Avoidance
          </button>

          <button
            onClick={toggleWebcam}
            className={`ml-auto px-3 py-1.5 text-xs font-medium rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer ${
              useWebcam
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'text-neutral-400 hover:text-neutral-200 bg-neutral-800/60'
            }`}
          >
            {useWebcam ? <Video className="w-3.5 h-3.5 text-emerald-400" /> : <VideoOff className="w-3.5 h-3.5" />}
            <span>{useWebcam ? 'Using Live Webcam' : 'Use My Webcam as Eyes'}</span>
          </button>
        </div>

        {/* The Closed-Loop Interactive Workbench Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: The Brain (Smartphone Screen Viewport) */}
          <div className="lg:col-span-5 bg-neutral-900/90 rounded-2xl border border-neutral-800 p-5 shadow-xl">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-neutral-800 text-xs font-mono">
              <span className="text-cyan-400 font-bold flex items-center gap-1.5">
                <Smartphone className="w-4 h-4" />
                THE BRAIN · CAMERA & NPU HUD
              </span>
              <span className="text-neutral-400">
                {isDocked ? 'USB-C DOCKED · 18W CHG' : 'STANDALONE PHONE'}
              </span>
            </div>

            {/* Smartphone Bezel & Camera Viewport */}
            <div className="relative rounded-xl overflow-hidden border-2 border-neutral-700 bg-black aspect-[4/3] shadow-inner select-none cursor-crosshair">
              
              {/* Webcam stream element */}
              <video 
                ref={videoRef} 
                className={`absolute inset-0 w-full h-full object-cover ${useWebcam ? 'block' : 'hidden'}`} 
                muted 
                playsInline 
              />

              {/* Simulated Camera View if not webcam */}
              {!useWebcam && (
                <div 
                  onClick={handlePhoneCanvasClick}
                  className="absolute inset-0 w-full h-full bg-gradient-to-b from-neutral-900 via-neutral-950 to-neutral-900 flex items-center justify-center"
                >
                  {/* Visual Grid Lines */}
                  <div className="absolute inset-0 opacity-15" style={{
                    backgroundImage: 'linear-gradient(to right, #475569 1px, transparent 1px), linear-gradient(to bottom, #475569 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                  }} />

                  {/* Mode-specific visual background */}
                  {demoMode === 'turret' && (
                    <div className="text-neutral-600 text-[11px] font-mono pointer-events-none text-center">
                      <span>Click anywhere in frame to move target</span>
                      <div className="mt-1 text-[10px] text-neutral-400">On-device NPU tracks target at 60 FPS</div>
                    </div>
                  )}

                  {demoMode === 'conveyor' && (
                    <div className="w-full px-6 pointer-events-none">
                      <div className="h-10 bg-neutral-800/80 rounded border border-neutral-700 relative flex items-center justify-between px-3">
                        <span className="text-[10px] font-mono text-neutral-500">CONVEYOR BELT (12V MOTOR PWM 75%)</span>
                        <div className="w-4 h-8 bg-cyan-500/20 rounded-sm border border-cyan-400/40" />
                      </div>
                    </div>
                  )}

                  {demoMode === 'rover' && (
                    <div className="pointer-events-none text-center text-xs font-mono text-neutral-400">
                      <div>FLOOR ROVER DEPTH ESTIMATOR</div>
                      <div className="text-[10px] text-neutral-400 mt-1">Calculating obstacle vector & clearance</div>
                    </div>
                  )}

                  {/* Interactive Target Object with Bounding Box */}
                  {isDocked && (
                    <div
                      style={{
                        position: 'absolute',
                        left: `${targetPos.x * 100}%`,
                        top: `${targetPos.y * 100}%`,
                        transform: 'translate(-50%, -50%)',
                        transition: isDraggingTarget ? 'none' : 'left 0.1s linear, top 0.1s linear'
                      }}
                      className="pointer-events-auto"
                    >
                      {/* Bounding Box Render */}
                      <div className="w-20 h-20 border-2 border-cyan-400 bg-cyan-400/10 rounded-sm relative flex items-center justify-center shadow-lg shadow-cyan-500/30">
                        {/* Target Reticle */}
                        <div className="w-3 h-3 rounded-full bg-cyan-400 animate-ping absolute" />
                        <div className="w-2 h-2 rounded-full bg-cyan-300 relative z-10" />

                        {/* Top Label */}
                        <div className="absolute -top-6 left-0 bg-cyan-400 text-neutral-950 font-mono text-[9px] font-bold px-1.5 py-0.5 rounded-t whitespace-nowrap">
                          {demoMode === 'conveyor' ? (solenoidPin22 ? 'DEFECT: 97.4%' : 'NOMINAL: 99.1%') : 'TARGET: 98.6%'}
                        </div>

                        {/* Coordinate readout */}
                        <div className="absolute -bottom-5 left-0 text-cyan-300 font-mono text-[8px] bg-neutral-900/90 px-1 py-0.5 rounded border border-neutral-700 whitespace-nowrap">
                          X: {targetPos.x.toFixed(2)} · Y: {targetPos.y.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Camera Crosshair Center Marker */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <div className="w-6 h-6 border border-neutral-500/40 rounded-full flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-neutral-500/60 rounded-full" />
                </div>
              </div>

              {/* On-Screen HUD Telemetry Overlay */}
              <div className="absolute top-2 left-2 pointer-events-none font-mono text-[10px] space-y-1 bg-black/60 backdrop-blur-sm p-2 rounded border border-neutral-800/80">
                <div className="text-cyan-400 font-bold">RASQ VISION PIPELINE</div>
                <div className="text-neutral-300">FPS: <span className="text-white">59.8</span></div>
                <div className="text-neutral-300">NPU LATENCY: <span className="text-emerald-400">{latencyBreakdown.npu}ms</span></div>
                <div className="text-neutral-300">CONF: <span className="text-white">0.984</span></div>
              </div>

              {/* Undocked Warning Banner */}
              {!isDocked && (
                <div className="absolute inset-0 bg-neutral-950/85 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center z-20">
                  <Smartphone className="w-10 h-10 text-neutral-400 mb-2" />
                  <div className="text-white font-bold text-sm">Phone Undocked</div>
                  <p className="text-neutral-400 text-xs mt-1 max-w-xs">
                    Plug phone into the USB-C RasQ dock above to initiate the hardware bridge and actuate motors.
                  </p>
                </div>
              )}
            </div>

            {/* Bottom Telemetry Bar */}
            <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-neutral-800 text-[11px] font-mono">
              <div className="bg-neutral-950 p-2 rounded border border-neutral-800">
                <span className="text-neutral-500 block text-[9px]">DECISION</span>
                <span className="text-white truncate block">
                  {demoMode === 'turret' ? `ΔYaw: ${(servoYaw).toFixed(1)}°` : demoMode === 'conveyor' ? (solenoidPin22 ? 'ACTUATE' : 'PASS') : 'TRACK'}
                </span>
              </div>
              <div className="bg-neutral-950 p-2 rounded border border-neutral-800">
                <span className="text-neutral-500 block text-[9px]">TOTAL LOOP</span>
                <span className="text-cyan-400 font-bold">{latencyBreakdown.total}ms</span>
              </div>
              <div className="bg-neutral-950 p-2 rounded border border-neutral-800">
                <span className="text-neutral-500 block text-[9px]">BATTERY UPS</span>
                <span className="text-emerald-400 font-bold">100% · 18W PD</span>
              </div>
            </div>
          </div>

          {/* Center Column: High-Speed USB-C Bridge & Physical Actuators */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Actuator Mechanical Visualizer Card */}
            <div className="bg-neutral-900/90 rounded-2xl border border-neutral-800 p-5 shadow-xl">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-neutral-800 text-xs font-mono">
                <span className="text-teal-400 font-bold flex items-center gap-1.5">
                  <Cpu className="w-4 h-4" />
                  THE BRIDGE · ESP32-S3 PHYSICAL ACTUATION
                </span>
                <span className="text-neutral-400">
                  {isDocked ? 'CDC 921.6K BAUD · ACTIVE' : 'DISCONNECTED'}
                </span>
              </div>

              {/* Physical Rig Graphic representation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* 1. Pan/Tilt Gimbal Turret Visualizer */}
                <div className="bg-neutral-950 rounded-xl border border-neutral-800 p-4 relative flex flex-col items-center justify-center min-h-[190px]">
                  <span className="text-[10px] font-mono text-neutral-400 absolute top-3 left-3">
                    DUAL SERVO GIMBAL (PWM 18 & 13)
                  </span>

                  {/* Animated Pan-Tilt Gimbal Assembly SVG */}
                  <div className="relative w-36 h-36 flex items-center justify-center">
                    
                    {/* Base Pedestal */}
                    <div className="w-20 h-6 bg-neutral-800 rounded-b-md border border-neutral-700 absolute bottom-4 shadow-lg flex items-center justify-center">
                      <div className="w-12 h-1.5 bg-neutral-900 rounded-full" />
                    </div>

                    {/* Pan Rotating Turret Arm */}
                    <div 
                      style={{
                        transform: `rotate(${servoYaw}deg)`,
                        transition: 'transform 0.08s ease-out'
                      }}
                      className="w-16 h-16 rounded-full border-2 border-cyan-500/50 bg-neutral-900/90 flex items-center justify-center relative shadow-md shadow-cyan-500/20"
                    >
                      {/* Aiming Reticle Needle */}
                      <div className="w-1 h-8 bg-cyan-400 rounded-full absolute -top-4 shadow-sm shadow-cyan-400" />
                      
                      {/* Pitch Gimbal Core */}
                      <div 
                        style={{
                          transform: `scaleY(${1 + servoPitch / 60})`,
                          transition: 'transform 0.08s ease-out'
                        }}
                        className="w-8 h-8 rounded-full bg-neutral-800 border border-teal-400 flex items-center justify-center"
                      >
                        <div className="w-3 h-3 rounded-full bg-teal-400 animate-pulse" />
                      </div>
                    </div>

                  </div>

                  {/* Angle Readouts */}
                  <div className="flex justify-between w-full text-[11px] font-mono pt-2 border-t border-neutral-800/80 text-neutral-400">
                    <span>Yaw: <span className="text-cyan-400 font-bold">{servoYaw.toFixed(1)}°</span></span>
                    <span>Pitch: <span className="text-teal-400 font-bold">{servoPitch.toFixed(1)}°</span></span>
                  </div>
                </div>

                {/* 2. Motor Driver & Digital Signals Visualizer */}
                <div className="bg-neutral-950 rounded-xl border border-neutral-800 p-4 flex flex-col justify-between min-h-[190px]">
                  <span className="text-[10px] font-mono text-neutral-400">
                    HARDWARE I/O & POWER CHANNELS
                  </span>

                  {/* Motor Tachometer */}
                  <div className="space-y-3 my-2">
                    <div>
                      <div className="flex justify-between text-xs font-mono mb-1">
                        <span className="text-neutral-300">DC Motor Drive (Pin 12 / H-Bridge)</span>
                        <span className="text-amber-400 font-bold">{motorRpm} RPM</span>
                      </div>
                      <div className="h-2 bg-neutral-900 rounded-full overflow-hidden">
                        <div 
                          style={{ width: `${Math.min(100, (motorRpm / 200) * 100)}%` }}
                          className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full transition-all duration-150"
                        />
                      </div>
                    </div>

                    {/* Active GPIO status indicators */}
                    <div className="grid grid-cols-3 gap-2 pt-2 text-[10px] font-mono">
                      <div className={`p-2 rounded border transition-colors ${
                        ledPin23 
                          ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300' 
                          : 'bg-neutral-900 border-neutral-800 text-neutral-500'
                      }`}>
                        <div className="font-bold">GPIO 23</div>
                        <div className="text-[9px]">{ledPin23 ? 'HIGH (1)' : 'LOW (0)'}</div>
                      </div>

                      <div className={`p-2 rounded border transition-colors ${
                        solenoidPin22 
                          ? 'bg-amber-500/20 border-amber-400 text-amber-300' 
                          : 'bg-neutral-900 border-neutral-800 text-neutral-500'
                      }`}>
                        <div className="font-bold">PIN 22 (SOL)</div>
                        <div className="text-[9px]">{solenoidPin22 ? 'FIRED' : 'IDLE'}</div>
                      </div>

                      <div className={`p-2 rounded border transition-colors ${
                        isDocked 
                          ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300' 
                          : 'bg-neutral-900 border-neutral-800 text-neutral-500'
                      }`}>
                        <div className="font-bold">ESP32 LINK</div>
                        <div className="text-[9px]">{isDocked ? 'CDC SYNC' : 'OFFLINE'}</div>
                      </div>
                    </div>
                  </div>

                  <div className="text-[10px] font-mono text-neutral-500 flex justify-between">
                    <span>Power Rail: 5.0V @ 2.4A</span>
                    <span>Bridge Core: 240 MHz</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Real-time Oscilloscope & USB Packet Inspector */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Oscilloscope Waveform */}
              <div className="bg-neutral-900/90 rounded-xl border border-neutral-800 p-4">
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="text-neutral-300 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                    HARDWARE PWM LOGIC ANALYZER
                  </span>
                  <span className="text-neutral-500 text-[10px]">PIN 18 / PIN 23</span>
                </div>
                <div className="rounded-lg overflow-hidden border border-neutral-800 bg-neutral-950">
                  <canvas 
                    ref={canvasRef} 
                    width={280} 
                    height={110} 
                    className="w-full h-[110px] block"
                  />
                </div>
              </div>

              {/* USB CDC Stream Terminal */}
              <div className="bg-neutral-900/90 rounded-xl border border-neutral-800 p-4 flex flex-col justify-between">
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="text-neutral-300 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-teal-400" />
                    USB-C BRIDGE PROTOCOL STREAM
                  </span>
                  <span className="text-neutral-500 text-[10px]">921.6 KBPS</span>
                </div>
                
                <div className="bg-neutral-950 rounded-lg border border-neutral-800 p-2.5 h-[110px] overflow-hidden font-mono text-[10px] space-y-1">
                  {packetLogs.map((log, idx) => (
                    <div key={idx} className="text-neutral-400 truncate">
                      <span className="text-cyan-400">{log.slice(0, 8)}</span>
                      <span>{log.slice(8)}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Latency Pipeline Breakdown Ribbon */}
        <div className="mt-8 bg-neutral-900/60 rounded-2xl border border-neutral-800 p-6">
          <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-4">
            <span className="text-white font-bold">TOTAL CLOSED-LOOP LATENCY BUDGET</span>
            <span className="text-cyan-400 font-bold">{latencyBreakdown.total}ms (~45 Hz Real-Time Loop)</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs font-mono">
            <div className="bg-neutral-950 p-3 rounded-lg border border-neutral-800">
              <div className="text-neutral-500 text-[10px]">01. SENSOR CAPTURE</div>
              <div className="text-white font-bold mt-1">{latencyBreakdown.camera} ms</div>
              <div className="text-[10px] text-neutral-400">Phone 4K ISP</div>
            </div>

            <div className="bg-neutral-950 p-3 rounded-lg border border-neutral-800">
              <div className="text-neutral-500 text-[10px]">02. ON-DEVICE AI</div>
              <div className="text-cyan-400 font-bold mt-1">{latencyBreakdown.npu} ms</div>
              <div className="text-[10px] text-neutral-400">Snapdragon NPU</div>
            </div>

            <div className="bg-neutral-950 p-3 rounded-lg border border-neutral-800">
              <div className="text-neutral-500 text-[10px]">03. APP DECISION</div>
              <div className="text-white font-bold mt-1">{latencyBreakdown.decision} ms</div>
              <div className="text-[10px] text-neutral-400">PID / Rule Engine</div>
            </div>

            <div className="bg-neutral-950 p-3 rounded-lg border border-neutral-800">
              <div className="text-neutral-500 text-[10px]">04. USB-C BRIDGE</div>
              <div className="text-teal-400 font-bold mt-1">{latencyBreakdown.bridgeUsb} ms</div>
              <div className="text-[10px] text-neutral-400">CDC Binary Packet</div>
            </div>

            <div className="bg-neutral-950 p-3 rounded-lg border border-neutral-800 col-span-2 sm:col-span-1">
              <div className="text-neutral-500 text-[10px]">05. MOTOR ACTUATION</div>
              <div className="text-amber-400 font-bold mt-1">{latencyBreakdown.actuation} ms</div>
              <div className="text-[10px] text-neutral-400">ESP32 PWM / Driver</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

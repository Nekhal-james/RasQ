import React, { useState } from 'react';
import { Smartphone, Cpu, Terminal, ArrowRight, ShieldCheck, Zap, Activity, HardDrive, Wifi, Camera, BatteryCharging, Layers } from 'lucide-react';

export const ArchitectureSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'brain' | 'bridge' | 'control'>('brain');

  return (
    <section id="architecture" className="py-24 border-b border-neutral-900 bg-neutral-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-3">
            <span>01. SYSTEM ARCHITECTURE</span>
            <span className="text-neutral-600">·</span>
            <span className="text-neutral-400">TRIPARTITE DECOUPLING</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight" style={{ textWrap: 'balance' }}>
            Why buy redundant electronics when your phone has an octa-core supercomputer?
          </h2>
          <p className="mt-4 text-base text-neutral-400 leading-relaxed">
            RasQ replaces the traditional all-in-one SBC with an intelligent 3-part split: offloading heavy AI compute to your phone, while a low-cost microchip bridge handles physical real-time signals.
          </p>
        </div>

        {/* The 3-Part Interactive Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          
          {/* Card 1: The Brain */}
          <button
            onClick={() => setActiveTab('brain')}
            className={`p-6 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
              activeTab === 'brain'
                ? 'bg-neutral-900/90 border-cyan-500/80 shadow-lg shadow-cyan-500/10'
                : 'bg-neutral-900/30 border-neutral-800/80 hover:border-neutral-700'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2.5 rounded-xl ${activeTab === 'brain' ? 'bg-cyan-500/20 text-cyan-400' : 'bg-neutral-800 text-neutral-400'}`}>
                <Smartphone className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono text-neutral-500">PART 01</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-1">The Brain</h3>
            <div className="text-xs font-mono text-cyan-400 mb-2">YOUR SMARTPHONE</div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Provides the heavy horsepower: multi-core CPU, dedicated NPU, 4K camera, wireless stack, and internal battery UPS.
            </p>
          </button>

          {/* Card 2: The Bridge */}
          <button
            onClick={() => setActiveTab('bridge')}
            className={`p-6 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
              activeTab === 'bridge'
                ? 'bg-neutral-900/90 border-teal-500/80 shadow-lg shadow-teal-500/10'
                : 'bg-neutral-900/30 border-neutral-800/80 hover:border-neutral-700'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2.5 rounded-xl ${activeTab === 'bridge' ? 'bg-teal-500/20 text-teal-400' : 'bg-neutral-800 text-neutral-400'}`}>
                <Cpu className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono text-neutral-500">PART 02</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-1">The Bridge</h3>
            <div className="text-xs font-mono text-teal-400 mb-2">CUSTOM USB-C DOCK (ESP32)</div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Translates digital commands into physical actions via 40-pin GPIO, I²C, SPI, PWM, and dual motor H-bridges.
            </p>
          </button>

          {/* Card 3: The Control Center */}
          <button
            onClick={() => setActiveTab('control')}
            className={`p-6 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
              activeTab === 'control'
                ? 'bg-neutral-900/90 border-sky-500/80 shadow-lg shadow-sky-500/10'
                : 'bg-neutral-900/30 border-neutral-800/80 hover:border-neutral-700'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2.5 rounded-xl ${activeTab === 'control' ? 'bg-sky-500/20 text-sky-400' : 'bg-neutral-800 text-neutral-400'}`}>
                <Terminal className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono text-neutral-500">PART 03</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-1">The Control Center</h3>
            <div className="text-xs font-mono text-sky-400 mb-2">ANDROID HAL & DEVELOPER SDK</div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Routes real-time sensor streams and computer vision inferences directly into intuitive Python and C++ APIs.
            </p>
          </button>

        </div>

        {/* Detailed Inspector Panel Based on Selected Tab */}
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 sm:p-8 backdrop-blur-sm">
          {activeTab === 'brain' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-5">
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  <span>COMPUTATIONAL HORSEPOWER · ZERO MODIFICATION</span>
                </div>
                <h3 className="text-2xl font-bold text-white">
                  The Brain: Octa-core Compute & 32 TOPS Vision NPU
                </h3>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  Traditional development boards run on stripped-down application processors with weak single-thread performance and no neural processing unit (NPU). Even a 3-year-old budget smartphone features an advanced 4nm–7nm SoC capable of running edge computer vision at 60+ frames per second.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800/80 space-y-1.5">
                    <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold">
                      <Camera className="w-4 h-4" />
                      <span>Industrial-Grade Optics</span>
                    </div>
                    <p className="text-xs text-neutral-400">
                      High-resolution 4K/60fps camera with Hardware Optical Image Stabilization (OIS) and auto-exposure.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800/80 space-y-1.5">
                    <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold">
                      <BatteryCharging className="w-4 h-4" />
                      <span>Built-in Li-ion UPS</span>
                    </div>
                    <p className="text-xs text-neutral-400">
                      The phone's 4,000–5,000mAh battery prevents filesystem corruption during unexpected robot power cuts or battery swaps.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800/80 space-y-1.5">
                    <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold">
                      <Wifi className="w-4 h-4" />
                      <span>Multi-Band Connectivity</span>
                    </div>
                    <p className="text-xs text-neutral-400">
                      5G/4G cellular telemetry, Wi-Fi 6E/7, Bluetooth 5.3, and dual-frequency GNSS (GPS) built-in.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800/80 space-y-1.5">
                    <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold">
                      <Activity className="w-4 h-4" />
                      <span>Internal Sensor Fusion</span>
                    </div>
                    <p className="text-xs text-neutral-400">
                      Access 6-axis gyroscope, accelerometer, magnetometer, ambient light, and barometer without external breakout boards.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Side Visual Specs */}
              <div className="lg:col-span-5 bg-neutral-950 rounded-xl border border-neutral-800 p-5 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-center pb-2 border-b border-neutral-800 text-neutral-400">
                  <span>PHONE SILICON SUBSYSTEM</span>
                  <span className="text-cyan-400">ONLINE</span>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-neutral-300 mb-1">
                      <span>Neural Engine (NPU)</span>
                      <span className="text-cyan-400 tabular-nums">32.0 TOPS</span>
                    </div>
                    <div className="h-1.5 w-full bg-neutral-900 rounded-full overflow-hidden">
                      <div className="h-full bg-cyan-400 rounded-full w-[85%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-neutral-300 mb-1">
                      <span>Octa-Core CPU (Kryo/Firestorm)</span>
                      <span className="text-teal-400 tabular-nums">3.20 GHz Peak</span>
                    </div>
                    <div className="h-1.5 w-full bg-neutral-900 rounded-full overflow-hidden">
                      <div className="h-full bg-teal-400 rounded-full w-[78%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-neutral-300 mb-1">
                      <span>Camera ISP Pipeline</span>
                      <span className="text-sky-400 tabular-nums">4K @ 60 FPS HDR</span>
                    </div>
                    <div className="h-1.5 w-full bg-neutral-900 rounded-full overflow-hidden">
                      <div className="h-full bg-sky-400 rounded-full w-[92%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-neutral-300 mb-1">
                      <span>Uninterruptible Power Supply</span>
                      <span className="text-emerald-400 tabular-nums">5,000 mAh (100%)</span>
                    </div>
                    <div className="h-1.5 w-full bg-neutral-900 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-400 rounded-full w-[100%]" />
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-neutral-900/80 rounded border border-neutral-800 text-[11px] text-neutral-400 leading-normal">
                  <span className="text-cyan-300 font-semibold">Zero Modification Advantage:</span> Unplug your phone when testing finishes. Your phone remains 100% stock, undamaged, and ready for everyday use.
                </div>
              </div>
            </div>
          )}

          {activeTab === 'bridge' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-5">
                <div className="flex items-center gap-2 text-xs font-mono text-teal-400">
                  <span className="w-2 h-2 rounded-full bg-teal-400" />
                  <span>HARDWARE INTERFACE COPROCESSOR · ESP32-S3 DOCK</span>
                </div>
                <h3 className="text-2xl font-bold text-white">
                  The Bridge: Real-Time Physical I/O & Dual Motor Drivers
                </h3>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  Smartphones lack physical pins to drive motors, read encoders, and trigger relays. The RasQ dock bridges this gap using an ESP32-S3 microcontroller wired via high-speed USB-C. It operates deterministic, real-time microsecond PWM and hardware interrupts.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800/80 space-y-1.5">
                    <div className="flex items-center gap-2 text-teal-400 text-xs font-semibold">
                      <Cpu className="w-4 h-4" />
                      <span>Raspberry Pi 40-Pin Header</span>
                    </div>
                    <p className="text-xs text-neutral-400">
                      Pin-for-pin compatible with Raspberry Pi hats, sensors, and displays (3.3V logic, 5V power rails).
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800/80 space-y-1.5">
                    <div className="flex items-center gap-2 text-teal-400 text-xs font-semibold">
                      <Zap className="w-4 h-4" />
                      <span>Dual Motor H-Bridges</span>
                    </div>
                    <p className="text-xs text-neutral-400">
                      Integrated DRV8833 drivers to power two DC motors or one 4-wire bipolar stepper directly without extra shields.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800/80 space-y-1.5">
                    <div className="flex items-center gap-2 text-teal-400 text-xs font-semibold">
                      <Layers className="w-4 h-4" />
                      <span>Hardware Buses (I²C, SPI, UART)</span>
                    </div>
                    <p className="text-xs text-neutral-400">
                      I²C up to 1MHz Fast Mode, SPI up to 40MHz, and high-speed hardware UART for external lidars and sensors.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800/80 space-y-1.5">
                    <div className="flex items-center gap-2 text-teal-400 text-xs font-semibold">
                      <BatteryCharging className="w-4 h-4" />
                      <span>Wide 7V–24V Power Input</span>
                    </div>
                    <p className="text-xs text-neutral-400">
                      Accepts standard 2S–6S LiPo robot packs, delivering USB-PD fast charge to the phone while driving motors.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Side Visual Specs */}
              <div className="lg:col-span-5 bg-neutral-950 rounded-xl border border-neutral-800 p-5 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-center pb-2 border-b border-neutral-800 text-neutral-400">
                  <span>ESP32-S3 BRIDGE FIRMWARE</span>
                  <span className="text-teal-400">SYNCED @ 921.6K BAUD</span>
                </div>

                <div className="space-y-2.5 text-[11px]">
                  <div className="flex justify-between py-1 border-b border-neutral-900">
                    <span className="text-neutral-400">Bridge MCU</span>
                    <span className="text-neutral-200">ESP32-S3 (Dual-Core @ 240MHz)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-neutral-900">
                    <span className="text-neutral-400">Interface Protocol</span>
                    <span className="text-teal-300">USB CDC-ACM / Binary Packet</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-neutral-900">
                    <span className="text-neutral-400">Digital GPIOs</span>
                    <span className="text-neutral-200">28 Available (3.3V Logic)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-neutral-900">
                    <span className="text-neutral-400">Hardware PWM</span>
                    <span className="text-neutral-200">16 Channels (14-bit resolution)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-neutral-900">
                    <span className="text-neutral-400">Motor Channels</span>
                    <span className="text-amber-400">2x 1.5A Continuous (DRV8833)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-neutral-900">
                    <span className="text-neutral-400">External Input</span>
                    <span className="text-neutral-200">7V to 24V DC Screw Terminal</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-neutral-400">Phone Charging</span>
                    <span className="text-emerald-400">USB-PD 5V/9V/12V (up to 30W)</span>
                  </div>
                </div>

                <div className="p-3 bg-neutral-900/80 rounded border border-neutral-800 text-[11px] text-neutral-400 leading-normal">
                  <span className="text-teal-300 font-semibold">Prototyping Status:</span> Currently engineered and tested with the ESP32-S3 module, preparing a compact single-PCB CNC carrier dock for production.
                </div>
              </div>
            </div>
          )}

          {activeTab === 'control' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-5">
                <div className="flex items-center gap-2 text-xs font-mono text-sky-400">
                  <span className="w-2 h-2 rounded-full bg-sky-400" />
                  <span>ANDROID HAL SERVICE & PYTHON / C++ SDK</span>
                </div>
                <h3 className="text-2xl font-bold text-white">
                  The Control Center: Seamless Software & Python SDK
                </h3>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  No complex driver installations. The RasQ Android app runs as a lightweight daemon service. When docked via USB-C, it automatically initiates the hardware handshake, loads trained TFLite/ONNX computer vision models into the NPU, and exposes an easy-to-use Python and C++ API.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800/80 space-y-1.5">
                    <div className="flex items-center gap-2 text-sky-400 text-xs font-semibold">
                      <Terminal className="w-4 h-4" />
                      <span>Pythonic API</span>
                    </div>
                    <p className="text-xs text-neutral-400">
                      Standard syntax you already know: <code className="text-sky-300 font-mono">dock.gpio.write(18, HIGH)</code> and <code className="text-sky-300 font-mono">camera.stream()</code>.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800/80 space-y-1.5">
                    <div className="flex items-center gap-2 text-sky-400 text-xs font-semibold">
                      <Activity className="w-4 h-4" />
                      <span>Zero-Copy Vision HAL</span>
                    </div>
                    <p className="text-xs text-neutral-400">
                      Frames stream from camera sensor directly into NPU neural models without memory copy bottlenecks.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800/80 space-y-1.5">
                    <div className="flex items-center gap-2 text-sky-400 text-xs font-semibold">
                      <Wifi className="w-4 h-4" />
                      <span>Headless & Web IDE</span>
                    </div>
                    <p className="text-xs text-neutral-400">
                      Deploy and debug code remotely over Wi-Fi, SSH terminal, or the built-in browser-based RasQ IDE.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800/80 space-y-1.5">
                    <div className="flex items-center gap-2 text-sky-400 text-xs font-semibold">
                      <HardDrive className="w-4 h-4" />
                      <span>ROS / ROS2 Bridge</span>
                    </div>
                    <p className="text-xs text-neutral-400">
                      Standard ROS2 publisher/subscriber nodes for camera frames, point clouds, and motor velocity commands.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Side Visual Specs */}
              <div className="lg:col-span-5 bg-neutral-950 rounded-xl border border-neutral-800 p-5 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-center pb-2 border-b border-neutral-800 text-neutral-400">
                  <span>RASQ PYTHON / NDK STACK</span>
                  <span className="text-sky-400">READY</span>
                </div>

                <div className="bg-neutral-900 rounded p-3 text-[11px] font-mono text-neutral-300 space-y-1 overflow-x-auto">
                  <span className="text-neutral-500"># 3-line quickstart</span>
                  <div><span className="text-cyan-400">import</span> rasq</div>
                  <div>dock = rasq.<span className="text-teal-400">Bridge</span>()</div>
                  <div>motor = dock.<span className="text-teal-400">dc_motor</span>(pwm_pin=18)</div>
                  <div>motor.<span className="text-sky-400">set_speed</span>(100) <span className="text-neutral-500"># 100% throttle</span></div>
                </div>

                <div className="space-y-2 text-[11px]">
                  <div className="flex justify-between py-1 border-b border-neutral-900">
                    <span className="text-neutral-400">Supported OS</span>
                    <span className="text-neutral-200">Android 9.0+ (ARM64 / AArch64)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-neutral-900">
                    <span className="text-neutral-400">Vision Frameworks</span>
                    <span className="text-neutral-200">TFLite, ONNX Runtime, MediaPipe</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-neutral-900">
                    <span className="text-neutral-400">SDK Languages</span>
                    <span className="text-sky-300">Python 3.10+, C++20, Rust, Node.js</span>
                  </div>
                </div>

                <div className="p-3 bg-neutral-900/80 rounded border border-neutral-800 text-[11px] text-neutral-400 leading-normal">
                  <span className="text-sky-300 font-semibold">Native Hardware Abstraction:</span> Directly binds Android USB Host OTG APIs with zero latency penalty.
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

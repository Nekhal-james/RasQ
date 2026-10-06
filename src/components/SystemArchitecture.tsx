import React from 'react';

export const SystemArchitecture: React.FC = () => {
  return (
    <section id="architecture" className="py-24 bg-[#FBFBFD] text-[#111827] border-t border-black/[0.08]">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Section Title */}
        <div className="max-w-2xl mb-16">
          <div className="text-xs font-mono tracking-wider text-[#6B7280] uppercase mb-2">
            System Architecture
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111827]">
            Decoupling heavy compute from physical I/O.
          </h2>
          <p className="mt-4 text-base text-[#4B5563] leading-relaxed">
            Instead of buying a standalone development board, RasQ splits the system into three distinct functional layers: the host compute in your pocket, a deterministic microchip bridge, and a local Python abstraction layer.
          </p>
        </div>

        {/* 3-Part Architecture Columns (Clean Proximity, No Nested Clutter) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20">
          
          {/* Part 1: The Brain */}
          <div className="space-y-4">
            <div className="text-xs font-mono font-medium text-[#6B7280]">LAYER 01</div>
            <h3 className="text-xl font-bold text-[#111827]">The Brain</h3>
            <div className="text-xs font-mono text-[#0066CC]">HOST SMARTPHONE</div>
            <p className="text-sm text-[#4B5563] leading-relaxed">
              Provides the heavy computing horsepower: an octa-core application processor (Snapdragon / Tensor), dedicated 32 TOPS neural processing unit (NPU), 4K optical-stabilized camera, 5G/Wi-Fi 6E radio, and an internal 5,000mAh battery.
            </p>
            <div className="pt-4 border-t border-black/[0.08] text-xs font-mono text-[#4B5563] space-y-1.5">
              <div>· Octa-Core Application CPU</div>
              <div>· Dedicated On-Device Vision NPU</div>
              <div>· Optical Image Stabilization Camera</div>
              <div>· Zero-Switchover Battery UPS</div>
            </div>
          </div>

          {/* Part 2: The Bridge */}
          <div className="space-y-4">
            <div className="text-xs font-mono font-medium text-[#6B7280]">LAYER 02</div>
            <h3 className="text-xl font-bold text-[#111827]">The Bridge</h3>
            <div className="text-xs font-mono text-[#0066CC]">USB-C HARDWARE DOCK</div>
            <p className="text-sm text-[#4B5563] leading-relaxed">
              A custom hardware dock connects to the phone via USB-C. Powered by an ESP32-S3 microcontroller, it executes microsecond-accurate hardware timers and breaks out standard 40-pin GPIO, I²C, SPI, UART, and dual motor H-bridges.
            </p>
            <div className="pt-4 border-t border-black/[0.08] text-xs font-mono text-[#4B5563] space-y-1.5">
              <div>· ESP32-S3 Dual-Core @ 240MHz</div>
              <div>· Standard 40-Pin 2.54mm Header</div>
              <div>· Dual DRV8833 DC Motor Drivers</div>
              <div>· 7V–24V DC Step-Down USB-PD</div>
            </div>
          </div>

          {/* Part 3: The Control Center */}
          <div className="space-y-4">
            <div className="text-xs font-mono font-medium text-[#6B7280]">LAYER 03</div>
            <h3 className="text-xl font-bold text-[#111827]">The Control Center</h3>
            <div className="text-xs font-mono text-[#0066CC]">ANDROID HAL & PYTHON SDK</div>
            <p className="text-sm text-[#4B5563] leading-relaxed">
              A lightweight background daemon communicates over standard USB CDC serial at up to 921,600 baud. The RasQ SDK allows developers to write standard Python code that runs locally on the phone without root privileges.
            </p>
            <div className="pt-4 border-t border-black/[0.08] text-xs font-mono text-[#4B5563] space-y-1.5">
              <div>· Local Python 3.11 Execution</div>
              <div>· Sub-4ms Roundtrip USB CDC Protocol</div>
              <div>· Standard Android Host OTG Permissions</div>
              <div>· OpenCV & TFLite Zero-Copy Pipeline</div>
            </div>
          </div>

        </div>

        {/* Real Python Code Example & Closed-Loop Proof of Concept */}
        <div className="bg-[#111827] rounded-2xl p-6 sm:p-8 text-white space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4">
            <div>
              <div className="text-xs font-mono text-[#9CA3AF]">CLOSED-LOOP PROOF OF CONCEPT</div>
              <div className="text-base font-bold text-white mt-0.5">Camera Vision to Physical Motor Actuation</div>
            </div>
            <span className="text-xs font-mono text-[#60A5FA]">turret_controller.py</span>
          </div>

          <p className="text-xs text-[#D1D5DB] leading-relaxed max-w-2xl font-mono">
            The smartphone's camera captures frames, the on-device NPU detects targets, the Python control loop calculates angular error, and commands flow through the USB-C dock to actuate external servos in under 22ms.
          </p>

          <pre className="bg-[#0B0F19] rounded-xl p-4 font-mono text-xs text-[#E5E7EB] overflow-x-auto leading-relaxed border border-white/5">
{`import rasq

# Initialize bridge communication over USB-C
dock = rasq.Bridge(port="/dev/ttyUSB0", baudrate=921600)
pan_servo = dock.servo(pin=18, min_angle=-90, max_angle=90)
drive_motor = dock.dc_motor(pwm_pin=12, dir_pin=17)

# Continuous vision loop leveraging phone's on-device NPU
camera = rasq.Camera(resolution=(1280, 720), fps=60)
detector = rasq.vision.ObjectDetector(model="yolov8n_float16.tflite")

for frame in camera.stream():
    detections = detector.detect(frame, target_class="tracked_object")
    if detections:
        target = detections[0]
        # Calculate corrective servo angle to center target
        pan_angle = (target.x - 0.5) * 80.0
        pan_servo.set_angle(pan_angle)
        drive_motor.set_speed(75) # 75% duty cycle via bridge H-bridge
        dock.gpio.write(23, dock.HIGH) # Status LED
    else:
        drive_motor.set_speed(0)
        dock.gpio.write(23, dock.LOW)`}
          </pre>

          <div className="pt-2 flex flex-wrap items-center justify-between text-xs font-mono text-[#9CA3AF]">
            <span>Average Closed-Loop Latency: 21.8ms (~45 Hz continuous loop)</span>
            <span className="text-[#34D399]">Zero Root Privileges Required</span>
          </div>
        </div>

        {/* The Big Advantage */}
        <div className="mt-16 pt-12 border-t border-black/[0.08] max-w-3xl">
          <div className="text-xs font-mono tracking-wider text-[#6B7280] uppercase mb-2">
            The Core Advantage
          </div>
          <h3 className="text-2xl font-bold text-[#111827]">
            Entirely plug-and-play. No motherboard teardowns.
          </h3>
          <p className="mt-3 text-base text-[#4B5563] leading-relaxed">
            RasQ does not require opening your smartphone's casing, desoldering connectors, or voiding manufacturer warranties. You simply dock the phone into the carrier board to use it as an advanced edge-computing controller, and unplug it when you are done. Your phone remains undamaged and ready for everyday use.
          </p>
        </div>

      </div>
    </section>
  );
};

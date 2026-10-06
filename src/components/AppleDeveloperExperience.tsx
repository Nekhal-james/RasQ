import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Terminal, Copy, Check, Code2, Cpu, Smartphone, ShieldCheck } from 'lucide-react';

const PYTHON_CODE = `import rasq
import time

# 1. Initialize high-speed USB-C hardware bridge
dock = rasq.Bridge()

# 2. Configure 40-pin GPIO actuators and dual H-Bridge motors
steering_servo = dock.servo(pin=18, min_angle=-60, max_angle=60)
drive_motors   = dock.motor_driver(left_ch=1, right_ch=2)

# 3. Mount phone 4K camera with hardware OIS & zero-copy NPU pipeline
camera   = rasq.Camera(resolution=(1280, 720), fps=60)
detector = rasq.vision.YOLO(model="yolov8n_quantized.tflite")

print("RasQ Autonomous Tracker online. Scanning visual field...")

# 4. Deterministic 16.5ms closed-loop execution
for frame in camera.stream():
    detections = detector.detect(frame, confidence=0.75)
    
    if detections:
        target = detections[0]
        # Proportional centering error (-1.0 to +1.0)
        error_x = (target.center_x - 0.5) * 2.0
        
        # Immediate microsecond PWM command to dock
        steering_servo.set_angle(error_x * 45.0)
        drive_motors.drive(speed=0.65)
    else:
        drive_motors.stop()`;

export const AppleDeveloperExperience: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(PYTHON_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="developer" className="py-20 sm:py-28 bg-[#FBFBFD] text-[#1D1D1F]">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mb-16"
        >
          <div className="text-xs font-mono text-[#0071E3] tracking-wider uppercase mb-2">
            05. Software Architecture
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1D1D1F]">
            Standard Python. Zero boilerplate.
          </h2>
          <p className="mt-4 text-base text-[#6E6E73] leading-relaxed">
            Write clean Python 3.11 scripts that execute natively on your phone. RasQ handles camera frame buffers, hardware NPU acceleration, and USB CDC serialization behind an intuitive SDK.
          </p>
        </motion.div>

        {/* Code Showcase Terminal Window */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="bg-[#1D1D1F] rounded-3xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.08)] mb-12 text-white"
        >
          {/* Mac-style Window Titlebar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#161617]">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#FF5F56]/80" />
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E]/80" />
              <div className="w-3 h-3 rounded-full bg-[#27C93F]/80" />
              <span className="ml-3 font-mono text-xs text-white/50">autonomous_tracker.py</span>
            </div>

            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-xs font-mono text-white/80 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#34D399]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Code'}</span>
            </button>
          </div>

          {/* Code Editor Body */}
          <div className="p-6 sm:p-8 overflow-x-auto font-mono text-xs leading-relaxed text-[#E5E7EB]">
            <pre>
              <code>{PYTHON_CODE}</code>
            </pre>
          </div>

          {/* Terminal Footer Bar */}
          <div className="px-6 py-3 bg-[#161617] border-t border-white/10 flex flex-wrap items-center justify-between text-[11px] font-mono text-white/50">
            <span>Runs locally on Android 10+ via background daemon</span>
            <span className="text-[#38BDF8]">pip install rasq-sdk</span>
          </div>
        </motion.div>

        {/* 4 Software Key Advantages Bento */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white p-6 rounded-2xl border border-black/[0.06] shadow-[0_2px_6px_rgba(0,0,0,0.02)] space-y-2"
          >
            <ShieldCheck className="w-5 h-5 text-[#0071E3]" />
            <h3 className="text-sm font-bold text-[#1D1D1F]">Zero Root Required</h3>
            <p className="text-xs text-[#6E6E73] leading-relaxed">
              Operates entirely within Android's unprivileged userland via standard USB Host API permissions.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white p-6 rounded-2xl border border-black/[0.06] shadow-[0_2px_6px_rgba(0,0,0,0.02)] space-y-2"
          >
            <Cpu className="w-5 h-5 text-[#7C3AED]" />
            <h3 className="text-sm font-bold text-[#1D1D1F]">Hardware NPU Accelerated</h3>
            <p className="text-xs text-[#6E6E73] leading-relaxed">
              TFLite and ONNX models compile directly to Qualcomm Hexagon, MediaTek APU, or Google TPU silicon.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white p-6 rounded-2xl border border-black/[0.06] shadow-[0_2px_6px_rgba(0,0,0,0.02)] space-y-2"
          >
            <Terminal className="w-5 h-5 text-[#10B981]" />
            <h3 className="text-sm font-bold text-[#1D1D1F]">Remote Wi-Fi SSH</h3>
            <p className="text-xs text-[#6E6E73] leading-relaxed">
              SSH into your robot over local Wi-Fi or cellular tunnel to debug scripts and view live camera telemetry.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white p-6 rounded-2xl border border-black/[0.06] shadow-[0_2px_6px_rgba(0,0,0,0.02)] space-y-2"
          >
            <Code2 className="w-5 h-5 text-[#F59E0B]" />
            <h3 className="text-sm font-bold text-[#1D1D1F]">ROS 2 & Micro-ROS</h3>
            <p className="text-xs text-[#6E6E73] leading-relaxed">
              Includes pre-built ROS 2 nodes for joint states, TF transforms, and cmd_vel navigation topics.
            </p>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

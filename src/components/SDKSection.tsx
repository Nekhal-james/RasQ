import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Copy, Check, ShieldCheck, Cpu, Terminal, Code2 } from 'lucide-react';

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

const SDK_FEATURES = [
  { icon: ShieldCheck, color: 'text-blue-500 bg-blue-50 border-blue-100', title: 'Zero Root Required', desc: 'Runs entirely within Android unprivileged userland via standard USB Host APIs.' },
  { icon: Cpu, color: 'text-violet-500 bg-violet-50 border-violet-100', title: 'Hardware NPU Accelerated', desc: 'TFLite/ONNX models compile to Qualcomm Hexagon, MediaTek APU, or Google TPU.' },
  { icon: Terminal, color: 'text-emerald-500 bg-emerald-50 border-emerald-100', title: 'Remote Wi-Fi SSH', desc: 'SSH into your robot over local Wi-Fi or cellular tunnel for live debugging.' },
  { icon: Code2, color: 'text-amber-500 bg-amber-50 border-amber-100', title: 'ROS 2 & Micro-ROS', desc: 'Pre-built nodes for joint states, TF transforms, and cmd_vel navigation.' },
];

export const SDKSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(PYTHON_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="sdk" className="relative py-28 sm:py-36 bg-white border-t border-black/[0.04]">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-px bg-[#0071E3]" />
            <span className="text-xs font-mono font-semibold text-[#0071E3] tracking-widest uppercase">
              05 — Software Architecture
            </span>
          </div>
          <h2
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] text-black leading-[1.1] max-w-4xl"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Standard Python. <span className="text-gradient-accent">Zero boilerplate.</span>
          </h2>
          <p className="mt-5 text-lg text-black/50 max-w-2xl leading-relaxed">
            Write clean Python 3.11 scripts that run natively on your phone. The SDK handles camera frames, NPU acceleration, and USB CDC serialization.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl border border-black/[0.06] bg-black overflow-hidden mb-12 shadow-2xl"
        >
          {/* Mac window header */}
          <div className="flex items-center justify-between px-6 py-4 bg-white/5 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
              <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
              <span className="ml-3 text-xs font-mono text-white/50">autonomous_tracker.py</span>
            </div>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-mono text-white/80 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#34D399]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          <div className="p-6 sm:p-8 overflow-x-auto">
            <pre className="font-mono text-xs leading-relaxed text-white/80">
              <code>{PYTHON_CODE}</code>
            </pre>
          </div>

          <div className="px-6 py-3 bg-white/5 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/50">
            <span>Runs on Android 10+ via background daemon</span>
            <span className="text-[#38BDF8]">pip install rasq-sdk</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SDK_FEATURES.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-2xl border border-black/[0.06] bg-[#F5F5F7] p-6 space-y-3 hover:border-black/[0.1] transition-colors"
              >
                <div className={`w-8 h-8 rounded-lg border flex items-center justify-center shadow-sm ${feat.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-black">{feat.title}</h3>
                <p className="text-xs text-black/60 leading-relaxed">{feat.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

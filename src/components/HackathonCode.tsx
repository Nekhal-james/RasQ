import React from 'react';
import { motion } from 'motion/react';
import { Terminal, Copy, Check } from 'lucide-react';

export const HackathonCode: React.FC = () => {
  const [copied, setCopied] = React.useState(false);

  const codeSnippet = `import rasq

# 1. Connect to USB-C bridge dock
dock = rasq.Bridge()
steer_servo = dock.servo(pin=18, min_angle=-90, max_angle=90)
drive_motor = dock.dc_motor(pwm_pin=12, dir_pin=17)

# 2. Leverage phone's on-device NPU for 60 FPS vision
camera = rasq.Camera(resolution=(1280, 720), fps=60)
detector = rasq.vision.ObjectDetector(model="yolov8n.tflite")

# 3. Closed-loop control in under 22ms
for frame in camera.stream():
    detections = detector.detect(frame, target_class="target")
    if detections:
        target = detections[0]
        # Calculate corrective steering angle
        pan_angle = (target.x - 0.5) * 80.0
        steer_servo.set_angle(pan_angle)
        drive_motor.set_speed(75) # 75% throttle via H-bridge
    else:
        drive_motor.set_speed(0)`;

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="code" className="py-24 bg-[#FBFBFD] text-[#111827] border-t border-black/[0.08]">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mb-12"
        >
          <div className="text-xs font-mono font-medium tracking-wider text-[#0066CC] uppercase mb-2">
            DEVELOPER EXPERIENCE
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111827]">
            Pythonic syntax. Zero boilerplate.
          </h2>
          <p className="mt-3 text-base text-[#4B5563] leading-relaxed">
            Write standard Python 3.11 code that executes locally on Android. The RasQ SDK abstracts camera frames, neural processing, and USB-C hardware timers into a clean API.
          </p>
        </motion.div>

        {/* Code Box */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="bg-[#111827] rounded-3xl p-6 sm:p-8 text-white shadow-xs"
        >
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4 text-xs font-mono">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#38bdf8]" />
              <span className="text-[#E5E7EB] font-bold">closed_loop_tracker.py</span>
            </div>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer text-[11px]"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#34D399]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Snippet'}</span>
            </button>
          </div>

          <pre className="font-mono text-xs text-[#E5E7EB] overflow-x-auto leading-relaxed">
            <code>{codeSnippet}</code>
          </pre>

          <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between text-xs font-mono text-[#9CA3AF]">
            <span>Runs locally on Android Termux / Background Daemon</span>
            <span className="text-[#34D399]">pip install rasq-sdk</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

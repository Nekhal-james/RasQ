import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, Cpu, Terminal, Shield, Check, Copy, Sliders } from 'lucide-react';

interface SpecCategory {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
}

const CATEGORIES: SpecCategory[] = [
  { id: 'all', name: 'All Specifications', icon: Sliders },
  { id: 'usbc', name: 'USB-C Power Delivery', icon: Zap },
  { id: 'gpio', name: 'GPIO Electrical & Voltage', icon: Cpu },
  { id: 'kernel', name: 'Linux Kernel & Android OS', icon: Terminal },
  { id: 'mcu', name: 'Co-Processor & Timers', icon: Shield }
];

interface SpecItem {
  id: string;
  category: 'usbc' | 'gpio' | 'kernel' | 'mcu';
  title: string;
  parameter: string;
  value: string;
  description: string;
  details: string[];
}

const SPEC_ITEMS: SpecItem[] = [
  // USB-C PD Specifications
  {
    id: 'usbc-power-negotiation',
    category: 'usbc',
    title: 'USB-PD 3.0 Dynamic Negotiation',
    parameter: 'Charging & Power Delivery',
    value: '18W – 45W PPS',
    description: 'Autonomous hardware negotiation between external robot supply and phone battery over CC1/CC2 lines.',
    details: [
      'Programmable Power Supply (PPS): 3.3V – 11.0V @ 3A step regulation',
      'Dual-Role Power (DRP) controller ensures phone remains USB Host while receiving charge',
      'Thermal foldback protection throttles charge current if phone temp exceeds 42°C',
      'Compatible with USB-PD 2.0/3.0, Qualcomm QuickCharge 4+, and USB-BC 1.2'
    ]
  },
  {
    id: 'usbc-input-rail',
    category: 'usbc',
    title: 'Wide-Range DC Input Stage',
    parameter: 'Robot Battery Input',
    value: '7.0V to 24.0V DC',
    description: 'High-efficiency synchronous buck converter accepts 2S to 6S LiPo/LiFePO4 battery packs.',
    details: [
      'Synchronous buck regulator operating at 400 kHz with 94.5% peak efficiency',
      'Reverse-polarity P-channel MOSFET protection eliminates connector damage',
      'TVS diode surge clamp protects against inductive motor back-EMF spikes up to 40V',
      'Continuous 5.0V / 3.0A auxiliary output rail for external servos and sensors'
    ]
  },
  {
    id: 'usbc-ups-switchover',
    category: 'usbc',
    title: 'Zero-Switchover Battery UPS',
    parameter: 'Brownout Immunity',
    value: '0.0 ms Switchover',
    description: 'Phone internal lithium cell serves as an active online uninterruptible power supply during motor stall dips.',
    details: [
      'Isolated logic rail eliminates MCU reset loops during heavy DC motor stalls',
      'Allows live battery swaps on mobile robots without shutting down the AI controller',
      'Zero risk of filesystem corruption on flash memory during sudden disconnects',
      'Hardware status pin reports external power presence to Python runtime'
    ]
  },

  // GPIO Voltage & Electrical Levels
  {
    id: 'gpio-voltage-levels',
    category: 'gpio',
    title: '3.3V LVCMOS Logic Standard',
    parameter: 'Digital Logic Levels',
    value: '3.3V CMOS ±5%',
    description: 'Direct electrical parity with official Raspberry Pi 40-pin header specification and existing HATs.',
    details: [
      'Output High Voltage (V_OH): Minimum 2.9V @ 8mA source current',
      'Output Low Voltage (V_OL): Maximum 0.4V @ 8mA sink current',
      'Input High Threshold (V_IH): Minimum 2.0V (TTL / 3.3V compatible)',
      'Input Low Threshold (V_IL): Maximum 0.8V with 200mV Schmitt hysteresis'
    ]
  },
  {
    id: 'gpio-current-protection',
    category: 'gpio',
    title: '5V-Tolerant Clamping Protection',
    parameter: 'Overvoltage & Current',
    value: '±16 mA per pin',
    description: 'Every GPIO line is fortified with ESD protection arrays and bidirectional clamping diodes.',
    details: [
      'Schottky diode clamps to 3.3V rail allow direct connection to 5V open-drain I²C pull-ups',
      'Max continuous sink/source current: 16mA per individual pin (80mA aggregate bank limit)',
      'IEC 61000-4-2 ESD protection rated to ±15kV air discharge and ±8kV contact',
      'Selectable 50kΩ internal hardware pull-up and pull-down resistors'
    ]
  },
  {
    id: 'gpio-bus-timing',
    category: 'gpio',
    title: 'High-Speed Bus Frequencies',
    parameter: 'SPI, I²C & PWM Speeds',
    value: '40 MHz SPI · 1 MHz I²C',
    description: 'Low pin capacitance enables maximum bandwidth communication with external peripherals.',
    details: [
      'SPI Master clock frequency up to 40 MHz with dual and quad SPI mode support',
      'I²C Fast-mode Plus (Fm+) supported up to 1.0 MHz with hardware clock stretching',
      'High-speed UART up to 3.0 Mbaud with 128-byte hardware FIFO buffers',
      'Rise and fall transitions (t_rise / t_fall) under 12 ns on 30pF capacitive load'
    ]
  },

  // Linux Kernel & Android OS Compatibility
  {
    id: 'kernel-gki-support',
    category: 'kernel',
    title: 'Generic Kernel Image (GKI) Parity',
    parameter: 'Kernel Versions',
    value: 'Linux 4.19 to 6.1+',
    description: 'Architected to work out-of-the-box across Android 10 through Android 15 on ARM64 architectures.',
    details: [
      'Compatible with standard Android Linux kernels: 4.19, 5.4, 5.10, 5.15, and 6.1+',
      'Standard Google GKI (Generic Kernel Image) and Project Treble compliance',
      'Stock Android unprivileged execution—zero root or bootloader unlocking required',
      'Tested across Qualcomm Snapdragon, MediaTek Dimensity, Google Tensor, and Exynos'
    ]
  },
  {
    id: 'kernel-cdc-driver',
    category: 'kernel',
    title: 'In-Kernel USB CDC-ACM Driver',
    parameter: 'Serial Subsystem',
    value: 'CONFIG_USB_ACM=y',
    description: 'Utilizes standard in-tree Linux USB Communications Device Class drivers without custom kernel modules.',
    details: [
      'Direct mapping to /dev/ttyUSB* and /dev/ttyACM* character devices',
      'Userland access via android.hardware.usb.UsbManager and UsbDeviceConnection API',
      'Zero-copy DMA bulk transfer endpoints for 64-byte serial packet packets',
      'Deterministic polling loop latency under 250 microseconds on Android binder thread'
    ]
  },
  {
    id: 'kernel-posix-runtime',
    category: 'kernel',
    title: 'POSIX Userland & ROS 2 Stacks',
    parameter: 'Software Runtime',
    value: 'Termux / PRoot / Docker',
    description: 'Run standard Linux robotics toolchains directly in the smartphone userland.',
    details: [
      'Native execution inside Termux or Debian/Ubuntu rootfs via PRoot without performance penalty',
      'Supports micro-ROS client daemon, ROS 2 Humble/Jazzy nodes, and rclpy libraries',
      'Hardware video decoding via Android MediaCodec API for OpenCV frame pipelines',
      'Zero external cloud telemetry—100% offline, local-first execution'
    ]
  },

  // Co-Processor & Deterministic Timing
  {
    id: 'mcu-architecture',
    category: 'mcu',
    title: 'Dual-Core ESP32-S3 Hardware Controller',
    parameter: 'Real-Time Co-Processor',
    value: '240 MHz Dual-Core',
    description: 'Dedicated Xtensa 32-bit LX7 processor offloads all real-time microsecond-critical tasks from the phone.',
    details: [
      'Core 0 dedicated to USB CDC high-speed packet ingestion and checksum verification',
      'Core 1 dedicated to hardware timer interrupts, PWM generation, and encoder counting',
      '512 KB internal SRAM + 8 MB Octal PSRAM for command buffering and telemetry logs',
      'Ultra-Low-Power (ULP) RISC-V co-processor monitors sleep-wake interrupts'
    ]
  },
  {
    id: 'mcu-pwm-timers',
    category: 'mcu',
    title: '16-Channel Hardware PWM Timers',
    parameter: 'Actuator Resolution',
    value: 'Up to 50 kHz · 14-bit',
    description: 'Jitter-free pulse generation for micro servos, brushless ESCs, and DC motor H-Bridges.',
    details: [
      'Hardware LEDC PWM generator supports up to 14-bit resolution @ 50 Hz (0.06 µs per step)',
      'Sub-microsecond pulse precision (< 20 ns timing jitter) prevents servo jittering',
      'Quadrature encoder interface (PCNT) reads dual optical encoders up to 20 MHz pulse rate',
      'Hardware dead-time insertion protects DRV8833 H-bridge FETs against shoot-through'
    ]
  },
  {
    id: 'mcu-firmware-safety',
    category: 'mcu',
    title: 'Hardware Watchdog & Fail-Safe',
    parameter: 'Robotics Safety Interlock',
    value: '50 ms Auto-Cutoff',
    description: 'Automated hardware failsafe prevents robot runaways if the smartphone crashes or disconnects.',
    details: [
      'Hardware watchdog automatically zeroes all motor PWM outputs if heartbeat packet lapses >50ms',
      'Emergency stop command halts dual H-Bridges within 12 microseconds',
      'Over-temperature and undervoltage hardware interrupt triggers immediate actuator sleep',
      'Open-source Apache 2.0 C++ firmware with OTA firmware update capability via Python SDK'
    ]
  }
];

export const AppleTechnicalSpecs: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copied, setCopied] = useState<boolean>(false);

  const filteredItems = selectedCategory === 'all'
    ? SPEC_ITEMS
    : SPEC_ITEMS.filter((item) => item.category === selectedCategory);

  const exportSpecsJSON = () => {
    const data = JSON.stringify(SPEC_ITEMS, null, 2);
    navigator.clipboard.writeText(data);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="specs" className="py-16 sm:py-24 bg-[#0A0A0C] text-white">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono text-[#38BDF8] tracking-wider uppercase mb-2">
              <span>Engineering Dossier</span>
              <span aria-hidden="true">·</span>
              <span>Hardware & Kernel Invariants</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Technical Specifications.
            </h2>
            <p className="mt-4 text-base text-[#9CA3AF] leading-relaxed">
              Exhaustive electrical, protocol, and kernel specifications designed for production robotics engineering and hackathon verification.
            </p>
          </div>

          {/* Copy Hardware Dossier Action */}
          <div className="shrink-0">
            <button
              onClick={exportSpecsJSON}
              className="px-4 py-2 rounded-xl text-xs font-mono bg-white/10 hover:bg-white/15 text-white transition-colors flex items-center gap-2 cursor-pointer border border-white/10"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#34D399]" /> : <Copy className="w-3.5 h-3.5 text-[#9CA3AF]" />}
              <span>{copied ? 'Dossier Copied (JSON)' : 'Copy Spec JSON'}</span>
            </button>
          </div>
        </motion.div>

        {/* High-Contrast Fast Stats Quick Strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14"
        >
          <div className="bg-[#141417] p-5 rounded-2xl border border-white/10">
            <div className="text-[11px] font-mono text-[#9CA3AF]">USB-PD Pass-Through</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#38BDF8] mt-1 tabular-nums">45W PPS</div>
            <div className="text-xs text-[#9CA3AF] mt-1">7V–24V Wide DC Input</div>
          </div>

          <div className="bg-[#141417] p-5 rounded-2xl border border-white/10">
            <div className="text-[11px] font-mono text-[#9CA3AF]">GPIO Logic Level</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white mt-1 tabular-nums">3.3V CMOS</div>
            <div className="text-xs text-[#9CA3AF] mt-1">5V-Tolerant Clamping</div>
          </div>

          <div className="bg-[#141417] p-5 rounded-2xl border border-white/10">
            <div className="text-[11px] font-mono text-[#9CA3AF]">Kernel Compatibility</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#34D399] mt-1 tabular-nums">Linux 4.19+</div>
            <div className="text-xs text-[#9CA3AF] mt-1">Android GKI & CDC-ACM</div>
          </div>

          <div className="bg-[#141417] p-5 rounded-2xl border border-white/10">
            <div className="text-[11px] font-mono text-[#9CA3AF]">Co-Processor Clock</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white mt-1 tabular-nums">240 MHz</div>
            <div className="text-xs text-[#9CA3AF] mt-1">Dual-Core ESP32-S3</div>
          </div>
        </motion.div>

        {/* Category Filter Controls */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center gap-2 mb-10"
        >
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-white text-[#0A0A0C] font-semibold shadow-xs'
                    : 'bg-[#18181B] text-[#A1A1AA] hover:text-white hover:bg-[#27272A]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#0A0A0C]' : 'text-[#71717A]'}`} />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Specifications Grid with Subtle InView Transitions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.2 } }}
                transition={{ duration: 0.5, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="bg-[#141417] rounded-3xl p-6 sm:p-7 border border-white/10 flex flex-col justify-between hover:border-white/20 transition-colors shadow-xs"
              >
                <div>
                  {/* Top Badge & Metric Value */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div>
                      <span className="text-[10px] font-mono text-[#38BDF8] uppercase tracking-wider block">
                        {item.parameter}
                      </span>
                      <h3 className="text-base font-bold text-white mt-1 leading-snug">
                        {item.title}
                      </h3>
                    </div>
                    <span className="shrink-0 px-2.5 py-1 rounded-md bg-white/10 font-mono text-xs font-bold text-white border border-white/10 tabular-nums">
                      {item.value}
                    </span>
                  </div>

                  <p className="text-xs text-[#9CA3AF] leading-relaxed mb-5">
                    {item.description}
                  </p>
                </div>

                {/* Sub-Bullets Detailed Breakdown */}
                <div className="pt-4 border-t border-white/10 space-y-2 text-[11px] text-[#D1D5DB] font-mono">
                  {item.details.map((detail, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-2">
                      <span className="text-[#38BDF8] font-bold select-none">›</span>
                      <span className="leading-normal">{detail}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Linux Kernel Compatibility Callout Banner */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.75, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 bg-gradient-to-r from-[#18181B] via-[#141417] to-[#18181B] rounded-3xl p-6 sm:p-8 border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        >
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-[#34D399]">
              <Terminal className="w-4 h-4" />
              <span>GKI COMPLIANCE & UNPRIVILEGED EXECUTION</span>
            </div>
            <h4 className="text-lg font-bold text-white">
              Zero Kernel Patches. Standard Android Open Accessory (AOA).
            </h4>
            <p className="text-xs text-[#9CA3AF] max-w-2xl leading-relaxed">
              RasQ operates strictly using standard Android Linux userland APIs. USB Host controllers connect via <code className="text-white font-mono bg-white/10 px-1 py-0.5 rounded">android.hardware.usb</code>, while Termux and micro-ROS scripts execute without SELinux denials or root escalation.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <div className="text-right hidden sm:block font-mono text-[11px] text-[#9CA3AF]">
              <span>SELinux Policy:</span>
              <span className="text-[#34D399] font-bold block">Enforcing Safe</span>
            </div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#34D399] animate-pulse" />
          </div>
        </motion.div>

      </div>
    </section>
  );
};

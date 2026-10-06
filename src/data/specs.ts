export interface ComparisonItem {
  feature: string;
  raspberryPiStack: {
    spec: string;
    note: string;
    approxCost: number;
  };
  rasqPlatform: {
    spec: string;
    note: string;
    approxCost: number;
  };
  advantage: string;
}

export const COMPARISON_DATA: ComparisonItem[] = [
  {
    feature: 'Compute & Neural Processing (AI NPU)',
    raspberryPiStack: {
      spec: 'Quad-core Cortex-A76 (No on-chip NPU). Requires $70 Hailo-8L Hat for 13 TOPS.',
      note: 'Separate PCIe hat required, draws additional power and adds physical height.',
      approxCost: 150, // Pi 5 8GB ($80) + Hailo Hat ($70)
    },
    rasqPlatform: {
      spec: 'Octa-core Snapdragon / Tensor / Dimensity with 15–45 TOPS dedicated NPU.',
      note: 'Built directly into phone silicon. Zero extra hardware or thermal throttling.',
      approxCost: 0, // Using existing or $35 refurbished phone
    },
    advantage: 'Up to 3.5× higher AI inference speed out-of-the-box',
  },
  {
    feature: 'Vision & Camera System',
    raspberryPiStack: {
      spec: 'Pi Camera Module 3 (12MP, rolling shutter, fragile ribbon cable).',
      note: 'Manual auto-focus tuning, fragile CSI flat flex cable that snaps easily.',
      approxCost: 35,
    },
    rasqPlatform: {
      spec: '12MP–108MP Multi-camera array with Hardware OIS, HDR, and 4K 60FPS.',
      note: 'Protected behind gorilla glass, calibrated autofocus, and ISP pipeline.',
      approxCost: 0,
    },
    advantage: 'Industrial-grade optical stabilization & auto-exposure',
  },
  {
    feature: 'Battery Backup & Power Resilience',
    raspberryPiStack: {
      spec: 'None included. Requires $35 Waveshare UPS HAT + 2x 18650 cells.',
      note: 'Sudden brownouts easily corrupt microSD cards and filesystem tables.',
      approxCost: 45,
    },
    rasqPlatform: {
      spec: 'Integrated 4000mAh–5000mAh Lithium-ion battery inside the phone.',
      note: 'Acts as built-in uninterruptible power supply (UPS). Survives field battery swaps.',
      approxCost: 0,
    },
    advantage: 'Zero corrupt SD cards; survives unplugging during field testing',
  },
  {
    feature: 'Wireless Connectivity & Telemetry',
    raspberryPiStack: {
      spec: 'Wi-Fi 5 / BLE 5.0. No cellular without $60 4G LTE USB dongle or HAT.',
      note: 'External antennas required for long-range field robotics.',
      approxCost: 60,
    },
    rasqPlatform: {
      spec: '5G / 4G LTE, Wi-Fi 6E/7, Bluetooth 5.3, Dual-band GPS/GNSS built-in.',
      note: 'Transmit high-bandwidth video and telemetry anywhere without dongles.',
      approxCost: 0,
    },
    advantage: 'Instant remote control & teleoperation anywhere over cellular',
  },
  {
    feature: 'Debugging & Visual Interface',
    raspberryPiStack: {
      spec: 'Headless SSH or external HDMI monitor / $40 portable DSI display.',
      note: 'Need to bring a monitor and keyboard into the robotics field pit.',
      approxCost: 40,
    },
    rasqPlatform: {
      spec: 'High-resolution OLED / AMOLED capacitive touchscreen.',
      note: 'Instant on-device telemetry GUI, camera feed viewer, and parameter tuner.',
      approxCost: 0,
    },
    advantage: 'Live on-device visual feedback without hauling external screens',
  },
  {
    feature: 'Hardware Control Bridge & GPIO',
    raspberryPiStack: {
      spec: 'Built-in 40-pin header (3.3V logic, limited PWM timers, no motor driver).',
      note: 'Prone to frying GPIO on overvoltage; requires motor driver shields.',
      approxCost: 20, // Add motor shield
    },
    rasqPlatform: {
      spec: 'RasQ Custom USB-C Bridge: 40-pin GPIO + Dual H-bridge motor drivers.',
      note: 'Powered by ESP32-S3 coprocessor, opto-isolated motor rails, 7V-24V DC input.',
      approxCost: 29, // RasQ Dock
    },
    advantage: 'Integrated dual motor H-bridges & hardware isolation',
  },
];

export const FAQ_ITEMS = [
  {
    question: 'Does RasQ require rooting or jailbreaking the smartphone?',
    answer: 'No! RasQ operates 100% within standard user permissions using the Android Open Accessory (AOA) and standard USB Host OTG (CDC-ACM / FTDI) protocols. You do not need to root, unlock bootloaders, or void warranties.'
  },
  {
    question: 'How does the hardware bridge communicate with the phone?',
    answer: 'The custom RasQ dock features a dedicated high-speed ESP32-S3 microcontroller running custom firmware. It communicates over USB-C using USB CDC Serial operating at up to 921,600 or 2,000,000 baud with a compact binary protocol, achieving sub-4ms roundtrip latencies.'
  },
  {
    question: 'What happens to the phone battery during extended robotics operation?',
    answer: 'The RasQ dock includes a 7V–24V DC power input terminal (ideal for 2S–6S LiPo drone/robot batteries). It incorporates a step-down USB-PD (Power Delivery) circuit that fast-charges the smartphone at 18W–30W while powering the 5V servo and high-current motor rails.'
  },
  {
    question: 'Can I use an old Android phone with a cracked or broken screen?',
    answer: 'Yes! Even if the touchscreen is damaged, as long as the motherboard, USB-C port, and camera function, the RasQ background service automatically boots on USB-C connection and can be accessed headlessly via Wi-Fi/SSH, Web IDE, or ADB.'
  },
  {
    question: 'Are Raspberry Pi HATs physically and electrically compatible?',
    answer: 'Yes. The 40-pin header maintains the exact pinout, mechanical spacing, and 3.3V logic levels as the Raspberry Pi 4/5. Most standard sensors, OLEDs, and relays work directly through the RasQ Python GPIO library.'
  }
];

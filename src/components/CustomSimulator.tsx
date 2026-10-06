import React, { useState, useEffect, useRef } from 'react';
import { 
  Smartphone, Cpu, Zap, Power, Play, Pause, Plus, Trash2, 
  Settings2, RotateCw, Cog, Lightbulb, Bell, Compass, Eye, Sun, Volume2, 
  Terminal, Check, RefreshCw, X, SlidersHorizontal, Sparkles
} from 'lucide-react';

export type SensorSource = 'gyro_roll' | 'gyro_pitch' | 'camera_x' | 'camera_y' | 'light_lux' | 'mic_db';

export type ComponentType = 'servo' | 'motor' | 'led' | 'relay' | 'buzzer';

export interface UserDevice {
  id: string;
  name: string;
  type: ComponentType;
  pin: number;
  sensorSource: SensorSource;
  multiplier: number; // e.g. 1.2
  threshold: number; // e.g. 50
  inverted: boolean;
  value: number; // current calculated output
  isActive: boolean; // boolean state
}

const AVAILABLE_PINS = [
  { pin: 18, name: 'GPIO 18 (PWM0)', desc: 'Hardware PWM Channel' },
  { pin: 12, name: 'GPIO 12 (PWM0)', desc: 'H-Bridge / Motor PWM' },
  { pin: 13, name: 'GPIO 13 (PWM1)', desc: 'Hardware PWM Channel' },
  { pin: 23, name: 'GPIO 23', desc: 'Digital I/O / High Drive' },
  { pin: 24, name: 'GPIO 24', desc: 'Digital I/O / Interrupt' },
  { pin: 22, name: 'GPIO 22', desc: 'Digital I/O / Solenoid' },
  { pin: 25, name: 'GPIO 25', desc: 'Digital I/O' },
  { pin: 17, name: 'GPIO 17', desc: 'Motor Channel 1A' },
  { pin: 27, name: 'GPIO 27', desc: 'Motor Channel 1B' },
  { pin: 26, name: 'GPIO 26', desc: 'Digital I/O' },
  { pin: 4, name: 'GPIO 4', desc: 'General Purpose / 1-Wire' },
  { pin: 5, name: 'GPIO 5', desc: 'General Purpose / ADC' },
];

export const CustomSimulator: React.FC = () => {
  // Global Rig Connection
  const [isDocked, setIsDocked] = useState<boolean>(true);
  const [isScriptRunning, setIsScriptRunning] = useState<boolean>(true);

  // Phone Sensor States
  const [phoneGyro, setPhoneGyro] = useState({ roll: 0, pitch: 0 }); // -45 to 45 deg
  const [cameraTarget, setCameraTarget] = useState({ x: 50, y: 50 }); // 0 to 100%
  const [lightLux, setLightLux] = useState<number>(240); // 0 to 800 lux
  const [micDb, setMicDb] = useState<number>(45); // 30 to 95 dB

  // User-customizable hardware devices
  const [devices, setDevices] = useState<UserDevice[]>([
    {
      id: 'dev_1',
      name: 'Steering Servo',
      type: 'servo',
      pin: 18,
      sensorSource: 'gyro_roll',
      multiplier: 1.2,
      threshold: 0,
      inverted: false,
      value: 0,
      isActive: true,
    },
    {
      id: 'dev_2',
      name: 'Drive Motor',
      type: 'motor',
      pin: 12,
      sensorSource: 'gyro_pitch',
      multiplier: 4.0,
      threshold: 5,
      inverted: false,
      value: 0,
      isActive: true,
    },
    {
      id: 'dev_3',
      name: 'Night Floodlight',
      type: 'led',
      pin: 23,
      sensorSource: 'light_lux',
      multiplier: 1.0,
      threshold: 120, // Turns on when lux < 120
      inverted: true,
      value: 0,
      isActive: false,
    },
    {
      id: 'dev_4',
      name: 'Clap Siren Alarm',
      type: 'buzzer',
      pin: 24,
      sensorSource: 'mic_db',
      multiplier: 1.0,
      threshold: 72, // Beeps when sound > 72 dB
      inverted: false,
      value: 0,
      isActive: false,
    }
  ]);

  // Modal / Creator State
  const [isAddingDevice, setIsAddingDevice] = useState<boolean>(false);
  const [editingDeviceId, setEditingDeviceId] = useState<string | null>(null);

  // Form State for Adding / Editing
  const [formName, setFormName] = useState<string>('My Custom Actuator');
  const [formType, setFormType] = useState<ComponentType>('servo');
  const [formPin, setFormPin] = useState<number>(18);
  const [formSensor, setFormSensor] = useState<SensorSource>('camera_x');
  const [formMultiplier, setFormMultiplier] = useState<number>(1.0);
  const [formThreshold, setFormThreshold] = useState<number>(50);
  const [formInverted, setFormInverted] = useState<boolean>(false);

  // Active Code Tab (Auto-generated vs Custom Editable)
  const [codeMode, setCodeMode] = useState<'generated' | 'editor'>('generated');
  const [customPythonCode, setCustomPythonCode] = useState<string>('');
  const [scriptSuccessMessage, setScriptSuccessMessage] = useState<string>('');

  // Calculate Hardware Device Outputs based on Phone Sensors
  useEffect(() => {
    if (!isDocked || !isScriptRunning) {
      setDevices(prev => prev.map(d => ({ ...d, value: 0, isActive: false })));
      return;
    }

    setDevices(prev => prev.map(dev => {
      // 1. Get raw sensor value
      let rawSensorVal = 0;
      if (dev.sensorSource === 'gyro_roll') rawSensorVal = phoneGyro.roll;
      else if (dev.sensorSource === 'gyro_pitch') rawSensorVal = phoneGyro.pitch;
      else if (dev.sensorSource === 'camera_x') rawSensorVal = cameraTarget.x - 50; // -50 to 50
      else if (dev.sensorSource === 'camera_y') rawSensorVal = cameraTarget.y - 50;
      else if (dev.sensorSource === 'light_lux') rawSensorVal = lightLux;
      else if (dev.sensorSource === 'mic_db') rawSensorVal = micDb;

      // 2. Compute actuator value
      if (dev.type === 'servo') {
        const sign = dev.inverted ? -1 : 1;
        const angle = Math.round(Math.max(-60, Math.min(60, rawSensorVal * dev.multiplier * sign)));
        return { ...dev, value: angle, isActive: true };

      } else if (dev.type === 'motor') {
        const sign = dev.inverted ? -1 : 1;
        const rawSpeed = Math.abs(rawSensorVal) * dev.multiplier * sign;
        const rpm = Math.round(Math.max(0, Math.min(220, rawSpeed)));
        return { ...dev, value: rpm, isActive: rpm > 0 };

      } else if (dev.type === 'led' || dev.type === 'relay') {
        let isTriggered = false;
        if (dev.inverted) {
          isTriggered = rawSensorVal < dev.threshold; // e.g. dark trigger
        } else {
          isTriggered = rawSensorVal > dev.threshold;
        }
        return { ...dev, value: isTriggered ? 1 : 0, isActive: isTriggered };

      } else if (dev.type === 'buzzer') {
        const isTriggered = dev.inverted ? rawSensorVal < dev.threshold : rawSensorVal > dev.threshold;
        return { ...dev, value: isTriggered ? 1 : 0, isActive: isTriggered };
      }

      return dev;
    }));

  }, [isDocked, isScriptRunning, phoneGyro, cameraTarget, lightLux, micDb]);

  // Generate Python Script based on current user configuration
  const generatePythonScript = () => {
    let lines = [
      '# RasQ Local Python Controller (Running on Phone)',
      'import rasq',
      '',
      'dock = rasq.Bridge() # Connects over USB-C to ESP32 dock',
      '',
      '# User Hardware Configuration'
    ];

    devices.forEach((d, idx) => {
      const varName = `${d.type}_${d.pin}`;
      if (d.type === 'servo') {
        lines.push(`${varName} = dock.servo(pin=${d.pin}, min_angle=-60, max_angle=60)`);
      } else if (d.type === 'motor') {
        lines.push(`${varName} = dock.dc_motor(pin=${d.pin})`);
      } else {
        lines.push(`${varName} = dock.output(pin=${d.pin})`);
      }
    });

    lines.push('', '# Continuous Real-Time Sensor Loop', 'while True:');

    // Group by sensor
    lines.push('    # 1. Read Phone Sensors locally');
    lines.push('    gyro = rasq.phone.sensors.gyroscope()');
    lines.push('    lux = rasq.phone.sensors.ambient_light()');
    lines.push('    mic = rasq.phone.sensors.microphone()');
    lines.push('');
    lines.push('    # 2. Drive configured GPIO pins');

    devices.forEach((d) => {
      const varName = `${d.type}_${d.pin}`;
      if (d.type === 'servo') {
        lines.push(`    ${varName}.set_angle(${d.sensorSource} * ${d.multiplier})`);
      } else if (d.type === 'motor') {
        lines.push(`    ${varName}.set_speed(abs(${d.sensorSource}) * ${d.multiplier})`);
      } else if (d.inverted) {
        lines.push(`    ${varName}.write(dock.HIGH if ${d.sensorSource} < ${d.threshold} else dock.LOW)`);
      } else {
        lines.push(`    ${varName}.write(dock.HIGH if ${d.sensorSource} > ${d.threshold} else dock.LOW)`);
      }
    });

    return lines.join('\n');
  };

  // Sync custom code text
  useEffect(() => {
    setCustomPythonCode(generatePythonScript());
  }, [devices]);

  // Handle Save Device
  const handleSaveDevice = () => {
    if (editingDeviceId) {
      setDevices(prev => prev.map(d => {
        if (d.id === editingDeviceId) {
          return {
            ...d,
            name: formName,
            type: formType,
            pin: formPin,
            sensorSource: formSensor,
            multiplier: formMultiplier,
            threshold: formThreshold,
            inverted: formInverted,
          };
        }
        return d;
      }));
      setEditingDeviceId(null);
    } else {
      const newDev: UserDevice = {
        id: `dev_${Date.now()}`,
        name: formName,
        type: formType,
        pin: formPin,
        sensorSource: formSensor,
        multiplier: formMultiplier,
        threshold: formThreshold,
        inverted: formInverted,
        value: 0,
        isActive: false,
      };
      setDevices(prev => [...prev, newDev]);
      setIsAddingDevice(false);
    }
  };

  const openEditModal = (dev: UserDevice) => {
    setEditingDeviceId(dev.id);
    setFormName(dev.name);
    setFormType(dev.type);
    setFormPin(dev.pin);
    setFormSensor(dev.sensorSource);
    setFormMultiplier(dev.multiplier);
    setFormThreshold(dev.threshold);
    setFormInverted(dev.inverted);
  };

  const deleteDevice = (id: string) => {
    setDevices(prev => prev.filter(d => d.id !== id));
  };

  const handleDeployCustomCode = () => {
    setScriptSuccessMessage('✓ Python code compiled and active on phone');
    setTimeout(() => setScriptSuccessMessage(''), 3000);
  };

  return (
    <section id="simulator" className="py-20 bg-[#F5F5F7] text-[#1D1D1F] border-b border-black/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Apple Style Editorial Section Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-semibold tracking-wider text-[#0071E3] uppercase block mb-2">
            Interactive Developer Rig
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#1D1D1F]">
            Design your hardware rig. Powered by your phone.
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#86868B] leading-relaxed">
            Add custom motors, servos, relays, and lights. Assign them to any GPIO pin, connect them to your phone's sensors, and run custom Python code locally.
          </p>
        </div>

        {/* Global Toolbar (Clean Frosted Glass) */}
        <div className="bg-white/80 backdrop-blur-xl border border-black/[0.08] p-4 rounded-2xl shadow-sm mb-8 flex flex-wrap items-center justify-between gap-4">
          
          {/* Dock / Undock Plug-and-Play */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsDocked(!isDocked)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                isDocked
                  ? 'bg-[#1D1D1F] text-white shadow-sm'
                  : 'bg-black/[0.05] text-[#1D1D1F] hover:bg-black/[0.08]'
              }`}
            >
              <Power className="w-4 h-4 text-[#0071E3]" />
              <span>{isDocked ? 'Dock Connected (USB-C)' : 'Phone Unplugged (Click to Connect)'}</span>
            </button>

            <button
              onClick={() => setIsScriptRunning(!isScriptRunning)}
              disabled={!isDocked}
              className={`px-3 py-2 rounded-xl text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                !isDocked
                  ? 'opacity-40 cursor-not-allowed bg-black/[0.04] text-[#86868B]'
                  : isScriptRunning
                  ? 'bg-[#34C759]/10 text-[#34C759] border border-[#34C759]/30'
                  : 'bg-[#FF9500]/10 text-[#FF9500] border border-[#FF9500]/30'
              }`}
            >
              {isScriptRunning ? <Play className="w-3.5 h-3.5 fill-current" /> : <Pause className="w-3.5 h-3.5" />}
              <span>{isScriptRunning ? 'Script Running' : 'Script Paused'}</span>
            </button>
          </div>

          {/* Add Hardware Button */}
          <button
            onClick={() => {
              setEditingDeviceId(null);
              setFormName('New Hardware Component');
              setFormType('servo');
              setFormPin(13);
              setFormSensor('camera_x');
              setFormMultiplier(1.0);
              setFormThreshold(50);
              setFormInverted(false);
              setIsAddingDevice(true);
            }}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#0071E3] hover:bg-[#0077ED] text-white transition-colors flex items-center gap-1.5 shadow-sm shadow-[#0071E3]/20 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Hardware Component</span>
          </button>
        </div>

        {/* Main 3-Column Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Column 1 (4 cols): Phone Sensors Controller */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-black/[0.06] shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-black/[0.06] pb-3">
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-[#0071E3]" />
                <span className="text-sm font-bold text-[#1D1D1F]">Phone Sensors (Inputs)</span>
              </div>
              <span className="text-[11px] font-mono text-[#86868B]">REAL-TIME HAL</span>
            </div>

            {/* Sensor 1: Gyroscope (Roll & Pitch) */}
            <div className="bg-[#F5F5F7] p-4 rounded-2xl space-y-3 border border-black/[0.04]">
              <div className="flex items-center justify-between text-xs font-semibold text-[#1D1D1F]">
                <span className="flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-[#0071E3]" />
                  Gyroscope / Orientation
                </span>
                <span className="font-mono text-[#0071E3]">Roll: {phoneGyro.roll}° · Pitch: {phoneGyro.pitch}°</span>
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-[#86868B] mb-1">
                  <span>Tilt Left / Right (Roll)</span>
                  <span>{phoneGyro.roll}°</span>
                </div>
                <input
                  type="range"
                  min="-45"
                  max="45"
                  value={phoneGyro.roll}
                  onChange={(e) => setPhoneGyro({ ...phoneGyro, roll: Number(e.target.value) })}
                  className="w-full h-1.5 bg-black/[0.08] rounded-lg appearance-none cursor-pointer accent-[#0071E3]"
                />
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-[#86868B] mb-1">
                  <span>Tilt Forward / Back (Pitch)</span>
                  <span>{phoneGyro.pitch}°</span>
                </div>
                <input
                  type="range"
                  min="-30"
                  max="30"
                  value={phoneGyro.pitch}
                  onChange={(e) => setPhoneGyro({ ...phoneGyro, pitch: Number(e.target.value) })}
                  className="w-full h-1.5 bg-black/[0.08] rounded-lg appearance-none cursor-pointer accent-[#0071E3]"
                />
              </div>

              {/* Minimal 3D Phone Render */}
              <div className="pt-1 flex justify-center">
                <div
                  style={{
                    transform: `rotate(${phoneGyro.roll}deg) perspective(240px) rotateX(${phoneGyro.pitch}deg)`,
                    transition: 'transform 0.05s ease-out'
                  }}
                  className="w-24 h-12 bg-white rounded-lg border border-black/[0.1] shadow-sm flex items-center justify-center text-[10px] font-mono text-[#86868B]"
                >
                  PHONE IMU
                </div>
              </div>
            </div>

            {/* Sensor 2: Vision Camera Viewfinder */}
            <div className="bg-[#F5F5F7] p-4 rounded-2xl space-y-3 border border-black/[0.04]">
              <div className="flex items-center justify-between text-xs font-semibold text-[#1D1D1F]">
                <span className="flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-[#34C759]" />
                  Vision Camera (NPU)
                </span>
                <span className="font-mono text-[#34C759]">X: {Math.round(cameraTarget.x)}% · Y: {Math.round(cameraTarget.y)}%</span>
              </div>

              <div
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = Math.max(10, Math.min(90, ((e.clientX - rect.left) / rect.width) * 100));
                  const y = Math.max(15, Math.min(85, ((e.clientY - rect.top) / rect.height) * 100));
                  setCameraTarget({ x, y });
                }}
                className="h-28 bg-[#1D1D1F] rounded-xl relative cursor-crosshair overflow-hidden flex items-center justify-center"
              >
                <div className="text-[10px] font-mono text-neutral-500 pointer-events-none">
                  Click to position tracked target
                </div>
                {/* Target box */}
                <div
                  style={{ left: `${cameraTarget.x}%`, top: `${cameraTarget.y}%` }}
                  className="absolute w-8 h-8 border border-[#34C759] bg-[#34C759]/20 rounded -translate-x-1/2 -translate-y-1/2 flex items-center justify-center shadow"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                </div>
              </div>
            </div>

            {/* Sensor 3: Light Sensor & Microphone */}
            <div className="grid grid-cols-2 gap-3">
              {/* Light */}
              <div className="bg-[#F5F5F7] p-3 rounded-2xl border border-black/[0.04] space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-[#1D1D1F]">
                  <span className="flex items-center gap-1">
                    <Sun className="w-3.5 h-3.5 text-[#FF9500]" />
                    Light
                  </span>
                  <span className="font-mono text-[11px] text-[#FF9500]">{lightLux} lx</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="500"
                  value={lightLux}
                  onChange={(e) => setLightLux(Number(e.target.value))}
                  className="w-full h-1.5 bg-black/[0.08] rounded-lg appearance-none cursor-pointer accent-[#FF9500]"
                />
                <button
                  onClick={() => setLightLux(lightLux < 100 ? 350 : 40)}
                  className="w-full py-1 text-[10px] font-medium bg-white rounded-lg border border-black/[0.06] hover:bg-black/[0.02] cursor-pointer"
                >
                  {lightLux < 100 ? 'Switch Daylight' : 'Cover Sensor'}
                </button>
              </div>

              {/* Mic */}
              <div className="bg-[#F5F5F7] p-3 rounded-2xl border border-black/[0.04] space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-[#1D1D1F]">
                  <span className="flex items-center gap-1">
                    <Volume2 className="w-3.5 h-3.5 text-[#FF3B30]" />
                    Mic
                  </span>
                  <span className="font-mono text-[11px] text-[#FF3B30]">{micDb} dB</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="90"
                  value={micDb}
                  onChange={(e) => setMicDb(Number(e.target.value))}
                  className="w-full h-1.5 bg-black/[0.08] rounded-lg appearance-none cursor-pointer accent-[#FF3B30]"
                />
                <button
                  onClick={() => {
                    setMicDb(85);
                    setTimeout(() => setMicDb(45), 500);
                  }}
                  className="w-full py-1 text-[10px] font-medium bg-white rounded-lg border border-black/[0.06] hover:bg-black/[0.02] cursor-pointer"
                >
                  👏 Clap Trigger
                </button>
              </div>
            </div>
          </div>

          {/* Column 2 (4 cols): User Configured Hardware Components */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-black/[0.06] shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-black/[0.06] pb-3">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#1D1D1F]" />
                <span className="text-sm font-bold text-[#1D1D1F]">Configured Hardware ({devices.length})</span>
              </div>
              <span className="text-[11px] font-mono text-[#86868B]">40-PIN EXPANSION</span>
            </div>

            <div className="text-xs text-[#86868B]">
              Every device is bound to a GPIO pin and driven by your selected phone sensor:
            </div>

            {/* List of Configured Devices */}
            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
              {devices.map((dev) => (
                <div
                  key={dev.id}
                  className="bg-[#F5F5F7] p-4 rounded-2xl border border-black/[0.04] transition-all hover:border-black/[0.12] space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-xl bg-white border border-black/[0.06] flex items-center justify-center text-xs font-bold font-mono text-[#0071E3]">
                        #{dev.pin}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#1D1D1F]">{dev.name}</div>
                        <div className="text-[10px] font-mono text-[#86868B]">
                          Pin {dev.pin} · {dev.type.toUpperCase()}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => openEditModal(dev)}
                        className="p-1.5 text-[#86868B] hover:text-[#1D1D1F] rounded-lg hover:bg-black/[0.04] cursor-pointer"
                        title="Configure Pin & Sensor Binding"
                      >
                        <Settings2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => deleteDevice(dev.id)}
                        className="p-1.5 text-[#86868B] hover:text-[#FF3B30] rounded-lg hover:bg-black/[0.04] cursor-pointer"
                        title="Remove Component"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Binding details tag */}
                  <div className="flex items-center justify-between pt-2 border-t border-black/[0.04] text-[11px] font-mono">
                    <span className="text-[#86868B]">Driven by:</span>
                    <span className="text-[#0071E3] font-medium bg-white px-2 py-0.5 rounded border border-black/[0.06]">
                      {dev.sensorSource}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Helper */}
            <div className="p-3 bg-[#F5F5F7] rounded-2xl text-[11px] text-[#86868B] leading-relaxed">
              Click <strong className="text-[#1D1D1F]">"+ Add Hardware Component"</strong> to attach more motors, relays, buzzers, or servos to any of the 40 Raspberry Pi-compatible GPIO pins.
            </div>
          </div>

          {/* Column 3 (4 cols): Physical Real-Time Reaction Workbench */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-black/[0.06] shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-black/[0.06] pb-3">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#FF9500]" />
                <span className="text-sm font-bold text-[#1D1D1F]">Physical Actuation Bench</span>
              </div>
              <span className="text-[11px] font-mono text-[#34C759]">LIVE OUTPUT</span>
            </div>

            {/* Render Each Configured Hardware Output Visually */}
            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
              {devices.map((dev) => (
                <div
                  key={dev.id}
                  className="bg-[#F5F5F7] p-4 rounded-2xl border border-black/[0.04] flex items-center justify-between"
                >
                  <div>
                    <div className="text-xs font-bold text-[#1D1D1F] flex items-center gap-1.5">
                      {dev.type === 'servo' && <RotateCw className="w-3.5 h-3.5 text-[#0071E3]" />}
                      {dev.type === 'motor' && <Cog className={`w-3.5 h-3.5 text-[#FF9500] ${dev.value > 0 ? 'animate-spin' : ''}`} />}
                      {dev.type === 'led' && <Lightbulb className="w-3.5 h-3.5 text-[#FFCC00]" />}
                      {dev.type === 'buzzer' && <Bell className="w-3.5 h-3.5 text-[#FF3B30]" />}
                      {dev.type === 'relay' && <Zap className="w-3.5 h-3.5 text-[#5856D6]" />}
                      <span>{dev.name}</span>
                    </div>

                    <div className="text-[11px] font-mono text-[#86868B] mt-1">
                      {dev.type === 'servo' && (
                        <span>Angle: <strong className="text-[#0071E3]">{isDocked ? `${dev.value}°` : '0°'}</strong></span>
                      )}
                      {dev.type === 'motor' && (
                        <span>Speed: <strong className="text-[#FF9500]">{isDocked ? `${dev.value} RPM` : '0 RPM'}</strong></span>
                      )}
                      {(dev.type === 'led' || dev.type === 'relay' || dev.type === 'buzzer') && (
                        <span>State: <strong className={dev.isActive && isDocked ? 'text-[#34C759]' : 'text-[#86868B]'}>
                          {dev.isActive && isDocked ? 'ACTIVE (HIGH)' : 'INACTIVE (LOW)'}
                        </strong></span>
                      )}
                    </div>
                  </div>

                  {/* Visual Actuator Element */}
                  <div>
                    {dev.type === 'servo' && (
                      <div className="w-12 h-12 rounded-full bg-white border border-black/[0.08] shadow-inner relative flex items-center justify-center">
                        <div
                          style={{
                            transform: `rotate(${isDocked ? dev.value : 0}deg)`,
                            transition: 'transform 0.08s ease-out'
                          }}
                          className="w-1 h-9 bg-[#0071E3] rounded-full origin-center relative shadow-sm"
                        >
                          <div className="w-2 h-2 rounded-full bg-[#1D1D1F] absolute -top-0.5 -left-0.5" />
                        </div>
                      </div>
                    )}

                    {dev.type === 'motor' && (
                      <div className="w-12 h-8 rounded-lg bg-white border border-black/[0.08] flex items-center justify-center font-mono text-xs font-bold text-[#FF9500]">
                        {isDocked && dev.value > 0 ? dev.value : 'OFF'}
                      </div>
                    )}

                    {dev.type === 'led' && (
                      <div className={`w-8 h-8 rounded-full border transition-all flex items-center justify-center ${
                        dev.isActive && isDocked
                          ? 'bg-[#FFCC00] border-amber-300 shadow-md shadow-[#FFCC00]/40 scale-105'
                          : 'bg-white border-black/[0.08]'
                      }`}>
                        <div className={`w-2.5 h-2.5 rounded-full ${dev.isActive && isDocked ? 'bg-white' : 'bg-black/[0.2]'}`} />
                      </div>
                    )}

                    {dev.type === 'buzzer' && (
                      <div className={`px-2 py-1 rounded text-[10px] font-mono font-bold transition-all ${
                        dev.isActive && isDocked
                          ? 'bg-[#FF3B30] text-white animate-bounce'
                          : 'bg-black/[0.06] text-[#86868B]'
                      }`}>
                        {dev.isActive && isDocked ? 'BEEP' : 'QUIET'}
                      </div>
                    )}

                    {dev.type === 'relay' && (
                      <div className={`px-2 py-1 rounded text-[10px] font-mono font-bold ${
                        dev.isActive && isDocked
                          ? 'bg-[#34C759]/15 text-[#34C759] border border-[#34C759]/30'
                          : 'bg-black/[0.06] text-[#86868B]'
                      }`}>
                        {dev.isActive && isDocked ? 'CLOSED' : 'OPEN'}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Roundtrip Latency Metric */}
            <div className="pt-3 border-t border-black/[0.06] flex items-center justify-between text-xs font-mono text-[#86868B]">
              <span>Round-trip Loop:</span>
              <span className="text-[#34C759] font-bold">18.4 ms (~54 Hz)</span>
            </div>
          </div>

        </div>

        {/* Python Code Engine Section */}
        <div className="mt-8 bg-white rounded-3xl p-6 border border-black/[0.06] shadow-sm">
          <div className="flex flex-wrap items-center justify-between pb-4 border-b border-black/[0.06] gap-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#0071E3]" />
                <span className="text-sm font-bold text-[#1D1D1F]">Local Python Engine (Runs on Phone)</span>
              </div>

              {/* Tab Selector */}
              <div className="flex items-center p-1 bg-[#F5F5F7] rounded-xl text-xs">
                <button
                  onClick={() => setCodeMode('generated')}
                  className={`px-3 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                    codeMode === 'generated' ? 'bg-white text-[#1D1D1F] shadow-xs' : 'text-[#86868B]'
                  }`}
                >
                  Auto-Generated SDK Script
                </button>
                <button
                  onClick={() => setCodeMode('editor')}
                  className={`px-3 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                    codeMode === 'editor' ? 'bg-white text-[#1D1D1F] shadow-xs' : 'text-[#86868B]'
                  }`}
                >
                  Editable Code Console
                </button>
              </div>
            </div>

            {codeMode === 'editor' && (
              <button
                onClick={handleDeployCustomCode}
                className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-[#1D1D1F] text-white hover:bg-black transition-colors cursor-pointer"
              >
                Deploy Script to Phone
              </button>
            )}
          </div>

          {scriptSuccessMessage && (
            <div className="my-3 p-2.5 rounded-xl bg-[#34C759]/10 border border-[#34C759]/20 text-xs font-mono text-[#34C759]">
              {scriptSuccessMessage}
            </div>
          )}

          {/* Code Viewer / Editor */}
          <div className="mt-4 bg-[#1D1D1F] rounded-2xl p-4 font-mono text-xs text-neutral-200 overflow-x-auto leading-relaxed border border-black/[0.1]">
            {codeMode === 'generated' ? (
              <pre>
                <code>{generatePythonScript()}</code>
              </pre>
            ) : (
              <textarea
                rows={12}
                value={customPythonCode}
                onChange={(e) => setCustomPythonCode(e.target.value)}
                className="w-full bg-transparent text-neutral-200 font-mono text-xs focus:outline-none resize-none leading-relaxed"
                placeholder="# Enter custom Python logic here..."
              />
            )}
          </div>

          <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-[#86868B]">
            <span>Android Daemon: USB CDC serial stream on /dev/ttyUSB0 (921,600 baud)</span>
            <span className="text-[#0071E3]">Python 3.11 Runtime Active</span>
          </div>
        </div>

      </div>

      {/* Add / Edit Hardware Component Modal */}
      {(isAddingDevice || editingDeviceId) && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-black/[0.08] space-y-5 animate-in fade-in zoom-in-95 duration-150">
            
            <div className="flex items-center justify-between pb-3 border-b border-black/[0.06]">
              <h3 className="text-lg font-bold text-[#1D1D1F]">
                {editingDeviceId ? 'Configure Hardware Component' : 'Add New Hardware Component'}
              </h3>
              <button
                onClick={() => {
                  setIsAddingDevice(false);
                  setEditingDeviceId(null);
                }}
                className="p-1 rounded-full text-[#86868B] hover:text-[#1D1D1F] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Component Name */}
              <div>
                <label className="block text-xs font-semibold text-[#1D1D1F] mb-1">
                  Component Name
                </label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#F5F5F7] border border-black/[0.08] text-xs text-[#1D1D1F] focus:outline-none focus:border-[#0071E3]"
                />
              </div>

              {/* Component Type */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#1D1D1F] mb-1">
                    Component Type
                  </label>
                  <select
                    value={formType}
                    onChange={(e) => setFormType(e.target.value as ComponentType)}
                    className="w-full px-3 py-2 rounded-xl bg-[#F5F5F7] border border-black/[0.08] text-xs text-[#1D1D1F] focus:outline-none focus:border-[#0071E3]"
                  >
                    <option value="servo">Micro Servo Motor</option>
                    <option value="motor">DC Gearmotor / Wheel</option>
                    <option value="led">High-Power LED</option>
                    <option value="buzzer">Piezo Buzzer Siren</option>
                    <option value="relay">10A Power Relay</option>
                  </select>
                </div>

                {/* GPIO Pin */}
                <div>
                  <label className="block text-xs font-semibold text-[#1D1D1F] mb-1">
                    RasQ GPIO Pin
                  </label>
                  <select
                    value={formPin}
                    onChange={(e) => setFormPin(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-[#F5F5F7] border border-black/[0.08] text-xs text-[#1D1D1F] focus:outline-none focus:border-[#0071E3]"
                  >
                    {AVAILABLE_PINS.map(p => (
                      <option key={p.pin} value={p.pin}>
                        Pin {p.pin} ({p.name})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Sensor Binding */}
              <div>
                <label className="block text-xs font-semibold text-[#1D1D1F] mb-1">
                  Driven By Phone Sensor
                </label>
                <select
                  value={formSensor}
                  onChange={(e) => setFormSensor(e.target.value as SensorSource)}
                  className="w-full px-3 py-2 rounded-xl bg-[#F5F5F7] border border-black/[0.08] text-xs text-[#1D1D1F] focus:outline-none focus:border-[#0071E3]"
                >
                  <option value="gyro_roll">Gyroscope Tilt: Roll (Left/Right)</option>
                  <option value="gyro_pitch">Gyroscope Tilt: Pitch (Forward/Back)</option>
                  <option value="camera_x">Vision Camera: Target X Position</option>
                  <option value="camera_y">Vision Camera: Target Y Position</option>
                  <option value="light_lux">Ambient Light Sensor (Lux)</option>
                  <option value="mic_db">Microphone Sound Amplitude (dB)</option>
                </select>
              </div>

              {/* Multiplier / Threshold parameters */}
              {formType === 'servo' || formType === 'motor' ? (
                <div>
                  <div className="flex justify-between text-xs font-semibold text-[#1D1D1F] mb-1">
                    <span>Sensitivity Multiplier</span>
                    <span className="font-mono text-[#0071E3]">{formMultiplier.toFixed(1)}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.2"
                    max="5.0"
                    step="0.1"
                    value={formMultiplier}
                    onChange={(e) => setFormMultiplier(Number(e.target.value))}
                    className="w-full h-1.5 bg-black/[0.08] rounded-lg appearance-none cursor-pointer accent-[#0071E3]"
                  />
                </div>
              ) : (
                <div>
                  <div className="flex justify-between text-xs font-semibold text-[#1D1D1F] mb-1">
                    <span>Trigger Threshold</span>
                    <span className="font-mono text-[#0071E3]">{formThreshold}</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="300"
                    value={formThreshold}
                    onChange={(e) => setFormThreshold(Number(e.target.value))}
                    className="w-full h-1.5 bg-black/[0.08] rounded-lg appearance-none cursor-pointer accent-[#0071E3]"
                  />
                </div>
              )}

              {/* Inverted logic toggle */}
              <div className="flex items-center justify-between pt-1">
                <span className="text-xs text-[#1D1D1F] font-medium">Invert Direction / Trigger Logic</span>
                <input
                  type="checkbox"
                  checked={formInverted}
                  onChange={(e) => setFormInverted(e.target.checked)}
                  className="w-4 h-4 rounded text-[#0071E3] accent-[#0071E3] cursor-pointer"
                />
              </div>

            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex gap-3">
              <button
                onClick={() => {
                  setIsAddingDevice(false);
                  setEditingDeviceId(null);
                }}
                className="flex-1 py-2.5 rounded-xl border border-black/[0.08] text-xs font-semibold text-[#1D1D1F] hover:bg-black/[0.04] transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={handleSaveDevice}
                className="flex-1 py-2.5 rounded-xl bg-[#0071E3] hover:bg-[#0077ED] text-xs font-semibold text-white transition-colors cursor-pointer"
              >
                Save Hardware Component
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};

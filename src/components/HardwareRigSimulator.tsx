import React, { useState, useEffect, useRef } from 'react';
import { 
  Smartphone, Cpu, Zap, Play, Pause, Power, RotateCw, Volume2, 
  Sun, Eye, Compass, Terminal, Check, Sliders, ToggleLeft, ToggleRight,
  Flame, Bell, Lightbulb, Cog
} from 'lucide-react';

export type SensorType = 'gyro' | 'camera' | 'light' | 'mic';
export type HardwareId = 'servo' | 'dcmotor' | 'led' | 'buzzer' | 'relay' | 'claw';

interface HardwareDevice {
  id: HardwareId;
  name: string;
  defaultPin: number;
  pinType: 'PWM' | 'GPIO' | 'H-Bridge';
  icon: string;
  unit: string;
  description: string;
  enabled: boolean;
}

export const HardwareRigSimulator: React.FC = () => {
  // Connection state
  const [isPluggedIn, setIsPluggedIn] = useState<boolean>(true);
  const [isRunning, setIsRunning] = useState<boolean>(true);

  // Active sensor on the phone
  const [activeSensor, setActiveSensor] = useState<SensorType>('gyro');

  // Phone Sensor Values
  const [phoneTilt, setPhoneTilt] = useState<{ roll: number; pitch: number }>({ roll: 0, pitch: 0 }); // -45 to 45
  const [cameraTargetX, setCameraTargetX] = useState<number>(50); // 0 to 100%
  const [lightLux, setLightLux] = useState<number>(180); // 0 to 800 lux
  const [micDb, setMicDb] = useState<number>(42); // 30 to 95 dB

  // Configured Hardware Devices plugged into GPIO pins
  const [devices, setDevices] = useState<Record<HardwareId, HardwareDevice>>({
    servo: { id: 'servo', name: 'Micro Servo Motor', defaultPin: 18, pinType: 'PWM', icon: 'servo', unit: 'degrees', description: 'Rotates -60° to +60° via PWM', enabled: true },
    dcmotor: { id: 'dcmotor', name: '12V DC Gearmotor', defaultPin: 12, pinType: 'H-Bridge', icon: 'motor', unit: 'RPM', description: 'Speed controlled via H-Bridge', enabled: true },
    led: { id: 'led', name: 'High-Power LED', defaultPin: 23, pinType: 'GPIO', icon: 'led', unit: 'State', description: 'Illuminates on digital HIGH', enabled: true },
    buzzer: { id: 'buzzer', name: 'Piezo Alarm Buzzer', defaultPin: 24, pinType: 'GPIO', icon: 'buzzer', unit: 'Tone', description: 'Beeps on audio or hazard alerts', enabled: true },
    relay: { id: 'relay', name: '10A Relay Switch', defaultPin: 22, pinType: 'GPIO', icon: 'relay', unit: 'Switch', description: 'Clicks open/closed for AC/DC power', enabled: false },
    claw: { id: 'claw', name: 'Robotic Gripper Claw', defaultPin: 25, pinType: 'PWM', icon: 'claw', unit: 'Grip %', description: 'Opens and closes clamp', enabled: false },
  });

  // Current Actuator Outputs
  const [servoAngle, setServoAngle] = useState<number>(0); // -60 to +60
  const [motorRpm, setMotorRpm] = useState<number>(0); // 0 to 200
  const [ledOn, setLedOn] = useState<boolean>(false);
  const [buzzerOn, setBuzzerOn] = useState<boolean>(false);
  const [relayClosed, setRelayClosed] = useState<boolean>(false);
  const [clawGripPercent, setClawGripPercent] = useState<number>(0);

  // Console output
  const [terminalLog, setTerminalLog] = useState<string>('>>> rasq python daemon active on phone');
  const [activeCodeLine, setActiveCodeLine] = useState<number>(4);

  // Toggle device plugged status
  const toggleDevice = (id: HardwareId) => {
    setDevices(prev => ({
      ...prev,
      [id]: { ...prev[id], enabled: !prev[id].enabled }
    }));
  };

  // Run the Python Script Logic on the Phone in real-time
  useEffect(() => {
    if (!isPluggedIn || !isRunning) {
      setServoAngle(0);
      setMotorRpm(0);
      setLedOn(false);
      setBuzzerOn(false);
      setRelayClosed(false);
      setClawGripPercent(0);
      return;
    }

    if (activeSensor === 'gyro') {
      // Gyro script: roll drives servo, pitch drives DC motor speed
      const targetAngle = Math.round(Math.max(-55, Math.min(55, phoneTilt.roll * 1.3)));
      setServoAngle(targetAngle);

      const targetRpm = Math.max(0, Math.round(Math.abs(phoneTilt.pitch) * 3.5));
      setMotorRpm(targetRpm);

      const isTiltedExcessive = Math.abs(phoneTilt.roll) > 35;
      setLedOn(isTiltedExcessive);
      setBuzzerOn(isTiltedExcessive && devices.buzzer.enabled);

      setActiveCodeLine(4);
      setTerminalLog(`[PHONE SENSOR: GYRO] roll=${phoneTilt.roll}° pitch=${phoneTilt.pitch}° -> Pin 18: ${targetAngle}°`);

    } else if (activeSensor === 'camera') {
      // Camera script: object X position steers servo & opens/closes claw
      const angle = Math.round((cameraTargetX - 50) * 1.1);
      setServoAngle(angle);

      // Center object triggers claw
      const isCentered = Math.abs(cameraTargetX - 50) < 12;
      setClawGripPercent(isCentered ? 100 : 15);
      setLedOn(isCentered);
      setBuzzerOn(false);
      setMotorRpm(0);

      setActiveCodeLine(5);
      setTerminalLog(`[PHONE SENSOR: CAMERA] target_x=${Math.round(cameraTargetX)}% -> Servo=${angle}° Claw=${isCentered ? 'CLAMP' : 'OPEN'}`);

    } else if (activeSensor === 'light') {
      // Light sensor: Low lux activates high-power LED & Relay switch
      const isDark = lightLux < 100;
      setLedOn(isDark);
      setRelayClosed(isDark);
      setMotorRpm(0);
      setBuzzerOn(false);
      setServoAngle(0);

      setActiveCodeLine(5);
      setTerminalLog(`[PHONE SENSOR: LIGHT] lux=${lightLux} -> ${isDark ? 'DARK: Relay & LED ON' : 'BRIGHT: Idle'}`);

    } else if (activeSensor === 'mic') {
      // Microphone: High dB (clap/noise) triggers siren & DC motor emergency stop
      const isLoud = micDb > 70;
      setBuzzerOn(isLoud);
      setLedOn(isLoud);
      setMotorRpm(isLoud ? 180 : 0);
      setRelayClosed(isLoud);

      setActiveCodeLine(4);
      setTerminalLog(`[PHONE SENSOR: MIC] sound=${micDb}dB -> ${isLoud ? 'TRIGGER ALARM ON' : 'Normal ambient'}`);
    }

  }, [isPluggedIn, isRunning, activeSensor, phoneTilt, cameraTargetX, lightLux, micDb, devices]);

  // Pre-configured Python scripts for each sensor
  const getPythonScript = () => {
    switch (activeSensor) {
      case 'gyro':
        return `# Script: phone_gyro_steering.py
import rasq
dock = rasq.Bridge() # Connects via USB-C to ESP32 dock
servo = dock.servo(pin=18)
motor = dock.dc_motor(pin=12)

# Read phone's built-in IMU sensor locally
for sample in rasq.phone.sensors.gyroscope():
    servo.set_angle(sample.roll * 1.3)
    motor.set_speed(abs(sample.pitch) * 3.5)
    if abs(sample.roll) > 35:
        dock.gpio.write(24, dock.HIGH) # Buzzer alert`;

      case 'camera':
        return `# Script: phone_vision_tracker.py
import rasq
dock = rasq.Bridge()
servo = dock.servo(pin=18)
claw = dock.servo(pin=25)

# Leverage phone's on-device NPU for 60 FPS vision
for target in rasq.phone.camera.track_objects():
    servo.set_angle((target.x - 0.5) * 110)
    if abs(target.x - 0.5) < 0.12:
        claw.set_grip(100) # Clamp target
        dock.gpio.write(23, dock.HIGH) # LED status`;

      case 'light':
        return `# Script: phone_ambient_light_switch.py
import rasq
dock = rasq.Bridge()
led = dock.output(pin=23)
relay = dock.output(pin=22)

# Read phone's ambient light sensor (lux)
for lux in rasq.phone.sensors.ambient_light():
    if lux < 100: # Threshold for darkness
        led.on()
        relay.on() # Switch high-voltage light load
    else:
        led.off()
        relay.off()`;

      case 'mic':
        return `# Script: phone_sound_alarm.py
import rasq
dock = rasq.Bridge()
buzzer = dock.output(pin=24)
motor = dock.dc_motor(pin=12)

# Sample phone microphone volume in real time
for db in rasq.phone.sensors.microphone():
    if db > 70: # Loud sound or clap detected
        buzzer.beep(duration_ms=200)
        motor.set_speed(100)
    else:
        buzzer.off()
        motor.set_speed(0)`;
    }
  };

  return (
    <section id="simulator" className="py-12 bg-neutral-950 text-white relative border-b border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>INTERACTIVE HARDWARE BENCH</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
            Use Phone Sensors to Control Hardware via Python
          </h2>
          <p className="mt-2 text-sm text-neutral-400">
            Plug different components into GPIO pins on the RasQ dock, pick a sensor on your phone, and run a local Python script to bridge them.
          </p>
        </div>

        {/* Global Control Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-neutral-900/90 p-3.5 rounded-2xl border border-neutral-800 mb-8 max-w-4xl mx-auto">
          {/* Plug/Unplug Toggle */}
          <button
            onClick={() => setIsPluggedIn(!isPluggedIn)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              isPluggedIn
                ? 'bg-cyan-400 text-neutral-950 shadow-md shadow-cyan-500/20'
                : 'bg-neutral-800 text-neutral-300 hover:text-white'
            }`}
          >
            <Power className="w-4 h-4" />
            <span>{isPluggedIn ? 'USB-C Dock: CONNECTED' : 'Phone UNPLUGGED (Click to Dock)'}</span>
          </button>

          {/* Script Execution Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsRunning(!isRunning)}
              disabled={!isPluggedIn}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer ${
                !isPluggedIn
                  ? 'opacity-40 cursor-not-allowed bg-neutral-800 text-neutral-500'
                  : isRunning
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
              }`}
            >
              {isRunning ? <Play className="w-3.5 h-3.5 fill-current" /> : <Pause className="w-3.5 h-3.5" />}
              <span>{isRunning ? 'Python Script Running' : 'Script Paused'}</span>
            </button>
            <span className="text-[11px] font-mono text-neutral-400 hidden sm:inline">
              Host: Android Termux / Local Python 3.11
            </span>
          </div>
        </div>

        {/* 3-Column Main Interactive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Column 1 (4 cols): The Phone & Sensor Control */}
          <div className="lg:col-span-4 bg-neutral-900 rounded-2xl border border-neutral-800 p-5 shadow-xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800 text-xs font-mono">
              <span className="text-cyan-400 font-bold flex items-center gap-1.5">
                <Smartphone className="w-4 h-4" />
                1. PHONE SENSORS
              </span>
              <span className="text-neutral-400 text-[10px]">LOCAL INPUTS</span>
            </div>

            {/* Sensor Selection Segmented Tabs */}
            <div className="grid grid-cols-2 gap-2 text-xs font-medium">
              <button
                onClick={() => setActiveSensor('gyro')}
                className={`p-2.5 rounded-xl border flex items-center gap-2 cursor-pointer transition-colors ${
                  activeSensor === 'gyro'
                    ? 'bg-neutral-800 border-cyan-400 text-white'
                    : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                }`}
              >
                <Compass className="w-4 h-4 text-cyan-400" />
                <span>Gyroscope / Tilt</span>
              </button>

              <button
                onClick={() => setActiveSensor('camera')}
                className={`p-2.5 rounded-xl border flex items-center gap-2 cursor-pointer transition-colors ${
                  activeSensor === 'camera'
                    ? 'bg-neutral-800 border-cyan-400 text-white'
                    : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                }`}
              >
                <Eye className="w-4 h-4 text-teal-400" />
                <span>Vision Camera</span>
              </button>

              <button
                onClick={() => setActiveSensor('light')}
                className={`p-2.5 rounded-xl border flex items-center gap-2 cursor-pointer transition-colors ${
                  activeSensor === 'light'
                    ? 'bg-neutral-800 border-cyan-400 text-white'
                    : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                }`}
              >
                <Sun className="w-4 h-4 text-amber-400" />
                <span>Light Sensor</span>
              </button>

              <button
                onClick={() => setActiveSensor('mic')}
                className={`p-2.5 rounded-xl border flex items-center gap-2 cursor-pointer transition-colors ${
                  activeSensor === 'mic'
                    ? 'bg-neutral-800 border-cyan-400 text-white'
                    : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                }`}
              >
                <Volume2 className="w-4 h-4 text-red-400" />
                <span>Microphone</span>
              </button>
            </div>

            {/* Active Sensor Interactive Manipulator */}
            <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 space-y-4">
              
              {/* Gyro Manipulator */}
              {activeSensor === 'gyro' && (
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-neutral-300">Roll (Tilt Left / Right):</span>
                    <span className="text-cyan-400 font-bold">{phoneTilt.roll}°</span>
                  </div>
                  <input
                    type="range"
                    min="-45"
                    max="45"
                    value={phoneTilt.roll}
                    onChange={(e) => setPhoneTilt({ ...phoneTilt, roll: Number(e.target.value) })}
                    className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                  />

                  <div className="flex justify-between items-center text-xs font-mono pt-1">
                    <span className="text-neutral-300">Pitch (Tilt Forward / Back):</span>
                    <span className="text-teal-400 font-bold">{phoneTilt.pitch}°</span>
                  </div>
                  <input
                    type="range"
                    min="-30"
                    max="30"
                    value={phoneTilt.pitch}
                    onChange={(e) => setPhoneTilt({ ...phoneTilt, pitch: Number(e.target.value) })}
                    className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-teal-400"
                  />

                  {/* 3D Visual Phone Tilt Box */}
                  <div className="pt-2 flex justify-center">
                    <div
                      style={{
                        transform: `rotate(${phoneTilt.roll}deg) perspective(200px) rotateX(${phoneTilt.pitch}deg)`,
                        transition: 'transform 0.05s ease-out'
                      }}
                      className="w-24 h-14 bg-neutral-800 border-2 border-cyan-400 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/10 text-[10px] font-mono text-cyan-300"
                    >
                      PHONE IMU
                    </div>
                  </div>
                </div>
              )}

              {/* Camera Manipulator */}
              {activeSensor === 'camera' && (
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-neutral-300">Object Position in Frame:</span>
                    <span className="text-teal-400 font-bold">{Math.round(cameraTargetX)}%</span>
                  </div>

                  {/* Camera view click pad */}
                  <div
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const x = Math.max(10, Math.min(90, ((e.clientX - rect.left) / rect.width) * 100));
                      setCameraTargetX(x);
                    }}
                    className="h-28 bg-black rounded-lg border border-neutral-700 relative cursor-crosshair flex items-center justify-center overflow-hidden"
                  >
                    <div className="text-[10px] font-mono text-neutral-600 pointer-events-none">
                      Click to move tracked object
                    </div>
                    {/* Bounding box */}
                    <div
                      style={{ left: `${cameraTargetX}%` }}
                      className="absolute w-10 h-10 border-2 border-teal-400 bg-teal-400/20 rounded -translate-x-1/2 flex items-center justify-center"
                    >
                      <div className="w-2 h-2 rounded-full bg-red-500" />
                    </div>
                  </div>
                </div>
              )}

              {/* Light Sensor Manipulator */}
              {activeSensor === 'light' && (
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-neutral-300">Ambient Brightness:</span>
                    <span className="text-amber-400 font-bold">{lightLux} Lux</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="600"
                    value={lightLux}
                    onChange={(e) => setLightLux(Number(e.target.value))}
                    className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                  />
                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={() => setLightLux(25)}
                      className="flex-1 py-1.5 rounded bg-neutral-900 border border-neutral-800 text-[11px] font-mono hover:text-white cursor-pointer"
                    >
                      Cover (Dark 25 lx)
                    </button>
                    <button
                      onClick={() => setLightLux(450)}
                      className="flex-1 py-1.5 rounded bg-neutral-900 border border-neutral-800 text-[11px] font-mono hover:text-white cursor-pointer"
                    >
                      Daylight (450 lx)
                    </button>
                  </div>
                </div>
              )}

              {/* Microphone Manipulator */}
              {activeSensor === 'mic' && (
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-neutral-300">Sound Amplitude:</span>
                    <span className="text-red-400 font-bold">{micDb} dB</span>
                  </div>
                  <input
                    type="range"
                    min="35"
                    max="95"
                    value={micDb}
                    onChange={(e) => setMicDb(Number(e.target.value))}
                    className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-red-400"
                  />
                  <button
                    onClick={() => {
                      setMicDb(88);
                      setTimeout(() => setMicDb(44), 600);
                    }}
                    className="w-full py-1.5 rounded bg-red-500/20 border border-red-500/40 text-red-300 text-xs font-mono font-bold hover:bg-red-500/30 cursor-pointer"
                  >
                    👏 Simulate Loud Clap (88 dB)
                  </button>
                </div>
              )}

            </div>

            {/* Local Python Script Running on Phone */}
            <div className="bg-neutral-950 p-3.5 rounded-xl border border-neutral-800 font-mono text-[11px]">
              <div className="flex items-center justify-between text-neutral-400 pb-2 mb-2 border-b border-neutral-900 text-[10px]">
                <span className="flex items-center gap-1.5 text-sky-400">
                  <Terminal className="w-3.5 h-3.5" />
                  PYTHON SCRIPT ON PHONE
                </span>
                <span className="text-emerald-400">RUNNING</span>
              </div>
              <pre className="text-neutral-300 overflow-x-auto leading-relaxed max-h-[160px]">
                <code>{getPythonScript()}</code>
              </pre>
            </div>
          </div>

          {/* Column 2 (4 cols): The RasQ Bridge & Pin Mapping */}
          <div className="lg:col-span-4 bg-neutral-900 rounded-2xl border border-neutral-800 p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800 text-xs font-mono">
              <span className="text-teal-400 font-bold flex items-center gap-1.5">
                <Cpu className="w-4 h-4" />
                2. RASQ DOCK & GPIO PINS
              </span>
              <span className="text-neutral-400 text-[10px]">ESP32-S3 BRIDGE</span>
            </div>

            <div className="text-xs text-neutral-400">
              Toggle which external components are wired to the dock's 40-pin header:
            </div>

            {/* Hardware Pin Assignment Cards */}
            <div className="space-y-2.5">
              {Object.values(devices).map(dev => (
                <div
                  key={dev.id}
                  className={`p-3 rounded-xl border transition-all ${
                    dev.enabled
                      ? 'bg-neutral-950 border-neutral-700 shadow-sm'
                      : 'bg-neutral-950/40 border-neutral-800/50 opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded bg-neutral-800 flex items-center justify-center text-xs font-bold text-cyan-400 font-mono">
                        #{dev.defaultPin}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white leading-tight">{dev.name}</div>
                        <div className="text-[10px] font-mono text-neutral-400">{dev.pinType} · Pin {dev.defaultPin}</div>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleDevice(dev.id)}
                      className={`px-2.5 py-1 rounded text-[11px] font-mono font-medium transition-colors cursor-pointer ${
                        dev.enabled
                          ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
                          : 'bg-neutral-800 text-neutral-400'
                      }`}
                    >
                      {dev.enabled ? 'Connected' : 'Plug In'}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Bridge Status Indicator */}
            <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800 font-mono text-[10px] space-y-1 text-neutral-400">
              <div className="flex justify-between">
                <span>USB Bus Link:</span>
                <span className={isPluggedIn ? 'text-emerald-400' : 'text-neutral-600'}>
                  {isPluggedIn ? 'CDC Serial 921,600 Baud' : 'Disconnected'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Power Delivery:</span>
                <span className="text-white">5.0V / 2.0A Rail Active</span>
              </div>
            </div>
          </div>

          {/* Column 3 (4 cols): Physical Hardware Output Workbench */}
          <div className="lg:col-span-4 bg-neutral-900 rounded-2xl border border-neutral-800 p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800 text-xs font-mono">
              <span className="text-amber-400 font-bold flex items-center gap-1.5">
                <Zap className="w-4 h-4" />
                3. PHYSICAL HARDWARE OUTPUTS
              </span>
              <span className="text-neutral-400 text-[10px]">REAL-TIME REACTION</span>
            </div>

            {/* Hardware Reacting Grid */}
            <div className="space-y-3.5">
              
              {/* 1. Servo Motor Visualizer */}
              <div className="p-3.5 bg-neutral-950 rounded-xl border border-neutral-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <RotateCw className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Servo Horn (Pin 18)</span>
                  </div>
                  <div className="text-[11px] font-mono text-neutral-400 mt-0.5">
                    Angle: <span className="text-cyan-300 font-bold">{isPluggedIn ? `${servoAngle}°` : '0°'}</span>
                  </div>
                </div>

                {/* Animated Rotating Horn */}
                <div className="w-14 h-14 bg-neutral-800 rounded-full border border-neutral-700 relative flex items-center justify-center shadow-inner">
                  <div
                    style={{
                      transform: `rotate(${isPluggedIn ? servoAngle : 0}deg)`,
                      transition: 'transform 0.08s ease-out'
                    }}
                    className="w-1 h-10 bg-cyan-400 rounded-full origin-center relative shadow-sm shadow-cyan-400"
                  >
                    <div className="w-2.5 h-2.5 rounded-full bg-white absolute -top-1 -left-0.5" />
                  </div>
                </div>
              </div>

              {/* 2. DC Motor Visualizer */}
              <div className="p-3.5 bg-neutral-950 rounded-xl border border-neutral-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Cog className={`w-3.5 h-3.5 text-amber-400 ${motorRpm > 0 && isPluggedIn ? 'animate-spin' : ''}`} />
                    <span>DC Motor / Wheel (Pin 12)</span>
                  </div>
                  <div className="text-[11px] font-mono text-neutral-400 mt-0.5">
                    Speed: <span className="text-amber-300 font-bold">{isPluggedIn ? `${motorRpm} RPM` : '0 RPM'}</span>
                  </div>
                </div>

                <div className="w-14 h-8 bg-neutral-800 rounded-lg border border-neutral-700 flex items-center justify-center font-mono text-[10px] text-amber-400">
                  {motorRpm > 0 && isPluggedIn ? `${motorRpm}` : 'OFF'}
                </div>
              </div>

              {/* 3. High-Power LED */}
              <div className="p-3.5 bg-neutral-950 rounded-xl border border-neutral-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Lightbulb className="w-3.5 h-3.5 text-yellow-300" />
                    <span>Status LED (Pin 23)</span>
                  </div>
                  <div className="text-[11px] font-mono text-neutral-400 mt-0.5">
                    State: <span className={ledOn && isPluggedIn ? 'text-yellow-300 font-bold' : 'text-neutral-500'}>
                      {ledOn && isPluggedIn ? 'HIGH (1)' : 'LOW (0)'}
                    </span>
                  </div>
                </div>

                <div className={`w-8 h-8 rounded-full border transition-all flex items-center justify-center ${
                  ledOn && isPluggedIn
                    ? 'bg-yellow-400 border-yellow-300 shadow-lg shadow-yellow-400/50 scale-110'
                    : 'bg-neutral-800 border-neutral-700'
                }`}>
                  <div className={`w-3 h-3 rounded-full ${ledOn && isPluggedIn ? 'bg-white' : 'bg-neutral-600'}`} />
                </div>
              </div>

              {/* 4. Buzzer Alarm */}
              <div className="p-3.5 bg-neutral-950 rounded-xl border border-neutral-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Bell className="w-3.5 h-3.5 text-red-400" />
                    <span>Alarm Buzzer (Pin 24)</span>
                  </div>
                  <div className="text-[11px] font-mono text-neutral-400 mt-0.5">
                    Acoustic: <span className={buzzerOn && isPluggedIn ? 'text-red-400 font-bold' : 'text-neutral-500'}>
                      {buzzerOn && isPluggedIn ? 'BEEPING 2.4kHz' : 'SILENT'}
                    </span>
                  </div>
                </div>

                <div className={`px-2.5 py-1 rounded text-[10px] font-mono font-bold transition-all ${
                  buzzerOn && isPluggedIn
                    ? 'bg-red-500 text-white animate-bounce'
                    : 'bg-neutral-800 text-neutral-500'
                }`}>
                  {buzzerOn && isPluggedIn ? 'SOUND' : 'QUIET'}
                </div>
              </div>

              {/* 5. Relay Switch */}
              {devices.relay.enabled && (
                <div className="p-3.5 bg-neutral-950 rounded-xl border border-neutral-800 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-blue-400" />
                      <span>10A Power Relay (Pin 22)</span>
                    </div>
                    <div className="text-[11px] font-mono text-neutral-400 mt-0.5">
                      Contacts: <span className={relayClosed && isPluggedIn ? 'text-emerald-400 font-bold' : 'text-neutral-500'}>
                        {relayClosed && isPluggedIn ? 'CLOSED (Conducting)' : 'OPEN'}
                      </span>
                    </div>
                  </div>

                  <div className={`px-2.5 py-1 rounded text-[10px] font-mono font-bold ${
                    relayClosed && isPluggedIn ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-neutral-800 text-neutral-500'
                  }`}>
                    {relayClosed && isPluggedIn ? 'CLICK: CLOSED' : 'OPEN'}
                  </div>
                </div>
              )}

              {/* 6. Robotic Claw */}
              {devices.claw.enabled && (
                <div className="p-3.5 bg-neutral-950 rounded-xl border border-neutral-800 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Flame className="w-3.5 h-3.5 text-teal-400" />
                      <span>Gripper Claw (Pin 25)</span>
                    </div>
                    <div className="text-[11px] font-mono text-neutral-400 mt-0.5">
                      Claw Grip: <span className="text-teal-300 font-bold">{isPluggedIn ? `${clawGripPercent}%` : '0%'}</span>
                    </div>
                  </div>

                  <div className="w-12 h-6 bg-neutral-800 rounded border border-neutral-700 flex items-center justify-center text-[10px] font-mono text-teal-400">
                    {clawGripPercent > 50 && isPluggedIn ? 'CLAMP' : 'OPEN'}
                  </div>
                </div>
              )}

            </div>

            {/* Live Telemetry Log Footer */}
            <div className="pt-2 border-t border-neutral-800/80 font-mono text-[10px] text-neutral-400 truncate">
              {terminalLog}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

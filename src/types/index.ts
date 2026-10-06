export type DemoMode = 'turret' | 'conveyor' | 'rover' | 'webcam';

export interface VisionDetection {
  label: string;
  confidence: number;
  x: number; // 0 to 1
  y: number; // 0 to 1
  width: number;
  height: number;
  color?: string;
}

export interface HardwareTelemetry {
  isDocked: boolean;
  dockVoltage: number; // e.g. 12.4V
  phoneBattery: number; // %
  usbCurrentMa: number; // mA
  loopLatencyMs: number; // ms
  cameraFps: number;
  npuInferenceMs: number;
  bridgeSerialBaud: number;
  servoYawDeg: number;
  servoPitchDeg: number;
  motorRpm: number;
  activePins: { [pinNumber: number]: boolean };
  lastCommand: string;
}

export type PinType = 'power-5v' | 'power-3v3' | 'ground' | 'gpio' | 'i2c' | 'spi' | 'uart' | 'pwm' | 'motor';

export interface HeaderPin {
  pinNumber: number;
  name: string;
  type: PinType;
  bcmNumber?: number;
  esp32Pin?: string;
  description: string;
  voltage: '3.3V' | '5.0V' | '0V';
  defaultState: 'HIGH' | 'LOW' | 'PWR' | 'GND';
}

export interface CodeSnippet {
  id: string;
  title: string;
  language: 'python' | 'cpp' | 'javascript';
  filename: string;
  description: string;
  code: string;
  demoMode: DemoMode;
}

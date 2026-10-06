import { CodeSnippet } from '../types';

export const CODE_SNIPPETS: CodeSnippet[] = [
  {
    id: 'turret',
    title: 'Visual Object Tracking Turret',
    language: 'python',
    filename: 'turret_tracker.py',
    description: 'Uses on-device NPU to detect targets via the phone camera, runs PID control loop, and directs pan/tilt servos through the RasQ USB bridge.',
    demoMode: 'turret',
    code: `import rasq
from rasq.vision import ObjectDetector, Camera
from rasq.controllers import PIDController

# Initialize smartphone hardware & USB-C bridge
dock = rasq.Bridge(port="/dev/ttyUSB0", baudrate=921600)
pan_servo = dock.servo(pin=18, min_angle=-90, max_angle=90)
tilt_servo = dock.servo(pin=13, min_angle=-45, max_angle=45)

# Leverage phone's on-device NPU for 60 FPS inference
camera = Camera(resolution=(1280, 720), fps=60)
detector = ObjectDetector(model="yolov8n_coco.tflite", target_label="target")

pid_x = PIDController(kp=0.45, ki=0.02, kd=0.08, setpoint=0.5)
pid_y = PIDController(kp=0.40, ki=0.01, kd=0.05, setpoint=0.5)

print("[RasQ] Starting closed-loop vision tracking...")
for frame in camera.stream():
    detections = detector.detect(frame)
    if detections:
        target = detections[0]
        # Calculate corrective servo angles
        yaw_adj = pid_x.compute(target.center_x)
        pitch_adj = pid_y.compute(target.center_y)
        
        # Send hardware pulses via USB-C bridge
        pan_servo.step(yaw_adj)
        tilt_servo.step(pitch_adj)
        dock.gpio.write(23, dock.HIGH) # Status LED flash
    else:
        dock.gpio.write(23, dock.LOW)`
  },
  {
    id: 'conveyor',
    title: 'Conveyor Quality Sorter',
    language: 'python',
    filename: 'defect_sorter.py',
    description: 'Inspects manufactured parts passing under the phone camera, flags defects with sub-15ms latency, and triggers pneumatic diverters.',
    demoMode: 'conveyor',
    code: `import rasq
from rasq.vision import DefectClassifier, Camera
import time

dock = rasq.Bridge()
conveyor_motor = dock.dc_motor(pwm_pin=12, dir_pin=17)
pneumatic_kicker = dock.solenoid(pin=22)

# Start 12V conveyor motor through bridge H-bridge
conveyor_motor.set_speed(75) # 75% duty cycle

classifier = DefectClassifier(model="surface_defect_mobilenet.tflite")
camera = Camera(fps=60)

for frame in camera.stream():
    result = classifier.evaluate(frame)
    if result.is_defective:
        print(f"[REJECT] Defect: {result.class_name} ({result.confidence:.1%})")
        # Pulse pneumatic solenoid to divert bad part
        time.sleep(0.08) # Conveyor travel delay
        pneumatic_kicker.pulse(duration_ms=60)
        dock.gpio.pulse(24, duration_ms=100) # Sound buzzer
    else:
        print(f"[PASS] Part verified: {result.confidence:.1%}")`
  },
  {
    id: 'rover',
    title: 'Autonomous Rover & Obstacle Avoidance',
    language: 'python',
    filename: 'rover_nav.py',
    description: 'Combines phone onboard 6-axis IMU (gyroscope & accelerometer) with camera depth estimation to steer dual DC drive wheels.',
    demoMode: 'rover',
    code: `import rasq
from rasq.sensors import PhoneSensors
from rasq.vision import DepthEstimator

dock = rasq.Bridge()
left_motor = dock.dc_motor(pwm_pin=18, dir_pin=27)
right_motor = dock.dc_motor(pwm_pin=19, dir_pin=26)

sensors = PhoneSensors() # Phone's built-in IMU & barometer
depth_model = DepthEstimator(backend="npu")

while True:
    tilt, roll, yaw = sensors.read_orientation()
    min_dist_meters = depth_model.get_forward_clearance()

    if min_dist_meters < 0.35: # Obstacle closer than 35cm
        # Reverse and pivot away
        left_motor.set_speed(-50)
        right_motor.set_speed(50)
    else:
        # Move forward, balancing heading using phone's gyro
        heading_error = 0.0 - yaw
        left_motor.set_speed(70 - heading_error * 0.5)
        right_motor.set_speed(70 + heading_error * 0.5)`
  },
  {
    id: 'cpp_native',
    title: 'Ultra-Low Latency C++ HAL Driver',
    language: 'cpp',
    filename: 'rasq_hal.cpp',
    description: 'Direct C++ NDK library communicating over high-speed USB CDC with minimal kernel overhead (<2ms latency).',
    demoMode: 'turret',
    code: `#include <rasq/bridge.hpp>
#include <rasq/fast_gpio.hpp>
#include <iostream>

int main() {
    rasq::Bridge bridge("/dev/bus/usb/001/002");
    if (!bridge.connect(rasq::Baud::BAUD_921600)) {
        std::cerr << "Failed to connect to RasQ dock" << std::endl;
        return 1;
    }

    // Configure 40-pin header output
    bridge.pinMode(18, rasq::PinMode::PWM);
    bridge.pinMode(23, rasq::PinMode::OUTPUT);

    // Fast packet loop: 1 kHz update rate
    for (int step = 0; step < 1000; ++step) {
        uint16_t pulseWidthUs = 1500 + (step % 500);
        bridge.writePWM(18, pulseWidthUs);
        bridge.digitalWrite(23, (step % 2 == 0));
    }
    return 0;
}`
  }
];

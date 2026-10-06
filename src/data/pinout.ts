import { HeaderPin } from '../types';

export const RASQ_PINOUT: HeaderPin[] = [
  // Pin 1, 2
  { pinNumber: 1, name: '3V3 PWR', type: 'power-3v3', voltage: '3.3V', defaultState: 'PWR', description: '3.3V DC Power Rail (up to 800mA from onboard LDO)' },
  { pinNumber: 2, name: '5V0 PWR', type: 'power-5v', voltage: '5.0V', defaultState: 'PWR', description: '5.0V DC Power Rail (stepped down from external DC jack)' },

  // Pin 3, 4
  { pinNumber: 3, name: 'GPIO 2 (SDA1)', type: 'i2c', bcmNumber: 2, esp32Pin: 'GPIO 8', voltage: '3.3V', defaultState: 'HIGH', description: 'I2C Data line 1 with 1.8k pull-up resistor' },
  { pinNumber: 4, name: '5V0 PWR', type: 'power-5v', voltage: '5.0V', defaultState: 'PWR', description: '5.0V DC Power Rail (high-current servo rail connection)' },

  // Pin 5, 6
  { pinNumber: 5, name: 'GPIO 3 (SCL1)', type: 'i2c', bcmNumber: 3, esp32Pin: 'GPIO 9', voltage: '3.3V', defaultState: 'HIGH', description: 'I2C Clock line 1 (supports up to 1MHz Fast Mode Plus)' },
  { pinNumber: 6, name: 'GND', type: 'ground', voltage: '0V', defaultState: 'GND', description: 'Common system ground' },

  // Pin 7, 8
  { pinNumber: 7, name: 'GPIO 4 (GPCLK0)', type: 'gpio', bcmNumber: 4, esp32Pin: 'GPIO 10', voltage: '3.3V', defaultState: 'LOW', description: 'General Purpose I/O or 1-Wire bus' },
  { pinNumber: 8, name: 'GPIO 14 (TXD)', type: 'uart', bcmNumber: 14, esp32Pin: 'GPIO 43', voltage: '3.3V', defaultState: 'HIGH', description: 'UART Transmit Data to external serial device' },

  // Pin 9, 10
  { pinNumber: 9, name: 'GND', type: 'ground', voltage: '0V', defaultState: 'GND', description: 'Common system ground' },
  { pinNumber: 10, name: 'GPIO 15 (RXD)', type: 'uart', bcmNumber: 15, esp32Pin: 'GPIO 44', voltage: '3.3V', defaultState: 'HIGH', description: 'UART Receive Data from external serial device' },

  // Pin 11, 12
  { pinNumber: 11, name: 'GPIO 17', type: 'gpio', bcmNumber: 17, esp32Pin: 'GPIO 11', voltage: '3.3V', defaultState: 'LOW', description: 'General Purpose I/O / Motor Channel 1A' },
  { pinNumber: 12, name: 'GPIO 18 (PWM0)', type: 'pwm', bcmNumber: 18, esp32Pin: 'GPIO 12', voltage: '3.3V', defaultState: 'LOW', description: 'Hardware PWM channel 0 (Pan Servo control)' },

  // Pin 13, 14
  { pinNumber: 13, name: 'GPIO 27', type: 'gpio', bcmNumber: 27, esp32Pin: 'GPIO 13', voltage: '3.3V', defaultState: 'LOW', description: 'General Purpose I/O / Motor Channel 1B' },
  { pinNumber: 14, name: 'GND', type: 'ground', voltage: '0V', defaultState: 'GND', description: 'Common system ground' },

  // Pin 15, 16
  { pinNumber: 15, name: 'GPIO 22', type: 'gpio', bcmNumber: 22, esp32Pin: 'GPIO 14', voltage: '3.3V', defaultState: 'LOW', description: 'General Purpose I/O or Solenoid driver trigger' },
  { pinNumber: 16, name: 'GPIO 23', type: 'gpio', bcmNumber: 23, esp32Pin: 'GPIO 21', voltage: '3.3V', defaultState: 'LOW', description: 'General Purpose I/O / LED Status Indicator' },

  // Pin 17, 18
  { pinNumber: 17, name: '3V3 PWR', type: 'power-3v3', voltage: '3.3V', defaultState: 'PWR', description: '3.3V DC Power Rail' },
  { pinNumber: 18, name: 'GPIO 24', type: 'gpio', bcmNumber: 24, esp32Pin: 'GPIO 47', voltage: '3.3V', defaultState: 'LOW', description: 'General Purpose I/O or Interrupt input' },

  // Pin 19, 20
  { pinNumber: 19, name: 'GPIO 10 (MOSI)', type: 'spi', bcmNumber: 10, esp32Pin: 'GPIO 35', voltage: '3.3V', defaultState: 'LOW', description: 'SPI Master Out Slave In (up to 40MHz)' },
  { pinNumber: 20, name: 'GND', type: 'ground', voltage: '0V', defaultState: 'GND', description: 'Common system ground' },

  // Pin 21, 22
  { pinNumber: 21, name: 'GPIO 9 (MISO)', type: 'spi', bcmNumber: 9, esp32Pin: 'GPIO 36', voltage: '3.3V', defaultState: 'LOW', description: 'SPI Master In Slave Out' },
  { pinNumber: 22, name: 'GPIO 25', type: 'gpio', bcmNumber: 25, esp32Pin: 'GPIO 48', voltage: '3.3V', defaultState: 'LOW', description: 'General Purpose I/O' },

  // Pin 23, 24
  { pinNumber: 23, name: 'GPIO 11 (SCLK)', type: 'spi', bcmNumber: 11, esp32Pin: 'GPIO 37', voltage: '3.3V', defaultState: 'LOW', description: 'SPI Serial Clock' },
  { pinNumber: 24, name: 'GPIO 8 (CE0)', type: 'spi', bcmNumber: 8, esp32Pin: 'GPIO 38', voltage: '3.3V', defaultState: 'HIGH', description: 'SPI Chip Enable 0 (Active LOW)' },

  // Pin 25, 26
  { pinNumber: 25, name: 'GND', type: 'ground', voltage: '0V', defaultState: 'GND', description: 'Common system ground' },
  { pinNumber: 26, name: 'GPIO 7 (CE1)', type: 'spi', bcmNumber: 7, esp32Pin: 'GPIO 39', voltage: '3.3V', defaultState: 'HIGH', description: 'SPI Chip Enable 1 (Active LOW)' },

  // Pin 27, 28
  { pinNumber: 27, name: 'ID_SD (EEPROM)', type: 'i2c', bcmNumber: 0, esp32Pin: 'GPIO 1', voltage: '3.3V', defaultState: 'HIGH', description: 'I2C ID EEPROM Data line (HAT identification)' },
  { pinNumber: 28, name: 'ID_SC (EEPROM)', type: 'i2c', bcmNumber: 1, esp32Pin: 'GPIO 2', voltage: '3.3V', defaultState: 'HIGH', description: 'I2C ID EEPROM Clock line (HAT identification)' },

  // Pin 29, 30
  { pinNumber: 29, name: 'GPIO 5', type: 'gpio', bcmNumber: 5, esp32Pin: 'GPIO 4', voltage: '3.3V', defaultState: 'LOW', description: 'General Purpose I/O / ADC Input' },
  { pinNumber: 30, name: 'GND', type: 'ground', voltage: '0V', defaultState: 'GND', description: 'Common system ground' },

  // Pin 31, 32
  { pinNumber: 31, name: 'GPIO 6', type: 'gpio', bcmNumber: 6, esp32Pin: 'GPIO 5', voltage: '3.3V', defaultState: 'LOW', description: 'General Purpose I/O' },
  { pinNumber: 32, name: 'GPIO 12 (PWM0)', type: 'pwm', bcmNumber: 12, esp32Pin: 'GPIO 6', voltage: '3.3V', defaultState: 'LOW', description: 'Hardware PWM channel 0 / Stepper Pulse' },

  // Pin 33, 34
  { pinNumber: 33, name: 'GPIO 13 (PWM1)', type: 'pwm', bcmNumber: 13, esp32Pin: 'GPIO 7', voltage: '3.3V', defaultState: 'LOW', description: 'Hardware PWM channel 1 (Tilt Servo control)' },
  { pinNumber: 34, name: 'GND', type: 'ground', voltage: '0V', defaultState: 'GND', description: 'Common system ground' },

  // Pin 35, 36
  { pinNumber: 35, name: 'GPIO 19 (MISO)', type: 'gpio', bcmNumber: 19, esp32Pin: 'GPIO 15', voltage: '3.3V', defaultState: 'LOW', description: 'General Purpose I/O or I2S Audio input' },
  { pinNumber: 36, name: 'GPIO 16', type: 'gpio', bcmNumber: 16, esp32Pin: 'GPIO 16', voltage: '3.3V', defaultState: 'LOW', description: 'General Purpose I/O' },

  // Pin 37, 38
  { pinNumber: 37, name: 'GPIO 26', type: 'gpio', bcmNumber: 26, esp32Pin: 'GPIO 17', voltage: '3.3V', defaultState: 'LOW', description: 'General Purpose I/O' },
  { pinNumber: 38, name: 'GPIO 20', type: 'gpio', bcmNumber: 20, esp32Pin: 'GPIO 18', voltage: '3.3V', defaultState: 'LOW', description: 'General Purpose I/O or I2S DIN' },

  // Pin 39, 40
  { pinNumber: 39, name: 'GND', type: 'ground', voltage: '0V', defaultState: 'GND', description: 'Common system ground' },
  { pinNumber: 40, name: 'GPIO 21', type: 'gpio', bcmNumber: 21, esp32Pin: 'GPIO 40', voltage: '3.3V', defaultState: 'LOW', description: 'General Purpose I/O or I2S DOUT' },
];

import React, { useState } from 'react';
import { Send, CheckCircle2, ShieldCheck, Sparkles, Smartphone, Cpu } from 'lucide-react';

interface DeveloperKitSectionProps {
  id?: string;
}

export const DeveloperKitSection: React.FC<DeveloperKitSectionProps> = ({ id = 'developer-kit' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    phoneModel: 'pixel',
    useCase: 'robotics',
    notes: '',
  });

  const [submitted, setSubmitted] = useState<boolean>(false);
  const [reservationCode, setReservationCode] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.email.includes('@')) {
      setErrorMessage('Please enter a valid name and email address.');
      return;
    }

    setErrorMessage('');
    const randomCode = `RQ-${Math.floor(1000 + Math.random() * 9000)}-DEV`;
    setReservationCode(randomCode);
    setSubmitted(true);
  };

  return (
    <section id={id} className="py-24 border-b border-neutral-900 bg-neutral-950 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 mb-3">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>06. HARDWARE ACCESS</span>
            <span className="text-neutral-600">·</span>
            <span className="text-neutral-400">PILOT BATCH</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight" style={{ textWrap: 'balance' }}>
            Request RasQ Developer Hardware.
          </h2>
          <p className="mt-3 text-base text-neutral-400 leading-relaxed">
            We are providing early pre-production ESP32-S3 USB-C carrier boards to robotics labs, university teams, and embedded developers.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-neutral-900/90 rounded-2xl border border-neutral-800 p-8 sm:p-10 shadow-2xl backdrop-blur-sm">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-14 h-14 bg-cyan-500/20 rounded-full flex items-center justify-center text-cyan-400 mx-auto border border-cyan-500/40">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white">Priority Reservation Confirmed</h3>
              <p className="text-sm text-neutral-400 max-w-md mx-auto">
                Thank you, <span className="text-white font-medium">{formData.name}</span>. Your developer kit request has been logged. We will reach out to <span className="text-cyan-400">{formData.email}</span> with firmware files and shipment tracking.
              </p>
              
              <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 max-w-xs mx-auto text-center font-mono">
                <div className="text-[10px] text-neutral-500">PILOT RESERVATION CODE:</div>
                <div className="text-xl font-bold text-cyan-300 mt-1">{reservationCode}</div>
              </div>

              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 text-xs font-mono text-neutral-400 hover:text-white underline cursor-pointer"
              >
                Submit another request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {errorMessage && (
                <div className="p-3 bg-red-950/40 border border-red-500/40 rounded-xl text-xs text-red-300">
                  {errorMessage}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Alex Rivera"
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-2">
                    Work or University Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@robotics-lab.edu"
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-2">
                    Robotics Team / Organization
                  </label>
                  <input
                    type="text"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    placeholder="MIT Robotics Team / Independent"
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-2">
                    Target Smartphone Hardware
                  </label>
                  <select
                    value={formData.phoneModel}
                    onChange={(e) => setFormData({ ...formData, phoneModel: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="pixel">Google Pixel (Tensor NPU / Android 14+)</option>
                    <option value="samsung">Samsung Galaxy S/A Series (Snapdragon / Exynos)</option>
                    <option value="oneplus">OnePlus / Xiaomi / Oppo</option>
                    <option value="budget_spare">Older Spare Android (Snapdragon 845 / 855 / 865)</option>
                    <option value="iphone_usbc">iPhone 15 / 16 (USB-C)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-2">
                  Primary Use Case & Objectives
                </label>
                <select
                  value={formData.useCase}
                  onChange={(e) => setFormData({ ...formData, useCase: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value="robotics">Autonomous Mobile Robot (AMR / Rover / Slam)</option>
                  <option value="turret">Object Tracking Camera Turret / Pan-Tilt Gimbal</option>
                  <option value="inspection">Industrial Conveyor & Defect Sorting</option>
                  <option value="drones">Drone Vision & Teleoperation Companion</option>
                  <option value="iot">Remote Cellular IoT & Environmental Monitoring</option>
                  <option value="education">University / STEM Robotics Lab Course</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-2">
                  Project Notes (Optional)
                </label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Tell us what actuators, motors, or vision models you plan to run..."
                  className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-cyan-400 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 text-sm font-semibold text-neutral-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-all duration-200 shadow-md shadow-cyan-500/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Request Developer Hardware Batch</span>
                <Send className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-xs text-neutral-500 font-mono text-center pt-2">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>Zero spam guarantee. Hardware batches dispatched on rolling basis.</span>
              </div>
            </form>
          )}
        </div>

      </div>
    </section>
  );
};

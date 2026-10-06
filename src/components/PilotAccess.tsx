import React, { useState } from 'react';
import { Check, ArrowRight } from 'lucide-react';

export const PilotAccess: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    phoneModel: '',
    intendedUse: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.email.includes('@')) return;
    setSubmitted(true);
  };

  return (
    <section id="pilot" className="py-24 bg-[#FBFBFD] text-[#111827] border-t border-black/[0.08]">
      <div className="max-w-2xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-xs font-mono tracking-wider text-[#6B7280] uppercase mb-2">
            Pilot Hardware Access
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-[#111827]">
            Request an ESP32-S3 Carrier Board.
          </h2>
          <p className="mt-3 text-sm text-[#4B5563] leading-relaxed">
            We are distributing pre-production prototype carrier boards to academic research labs, competitive robotics teams, and embedded engineers.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white p-8 rounded-2xl border border-black/[0.08] shadow-xs">
          {submitted ? (
            <div className="text-center py-6 space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#ECFDF5] text-[#059669] flex items-center justify-center mx-auto">
                <Check className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#111827]">Pilot Request Received</h3>
              <p className="text-xs text-[#4B5563] leading-relaxed max-w-md mx-auto">
                Thank you, <strong className="text-[#111827]">{formData.name}</strong>. We have logged your request and will follow up at <strong className="text-[#111827]">{formData.email}</strong> with firmware binaries, hardware schematics, and shipment timing.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#111827] mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Jordan Vance"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F9FAFB] border border-black/[0.1] text-xs text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:border-[#111827] focus:bg-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#111827] mb-1">
                    Institutional / Lab Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="jordan@robotics.cmu.edu"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F9FAFB] border border-black/[0.1] text-xs text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:border-[#111827] focus:bg-white transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#111827] mb-1">
                    University / Organization / Team
                  </label>
                  <input
                    type="text"
                    value={formData.organization}
                    onChange={e => setFormData({ ...formData, organization: e.target.value })}
                    placeholder="CMU Field Robotics / Independent"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F9FAFB] border border-black/[0.1] text-xs text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:border-[#111827] focus:bg-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#111827] mb-1">
                    Target Smartphone Model
                  </label>
                  <input
                    type="text"
                    value={formData.phoneModel}
                    onChange={e => setFormData({ ...formData, phoneModel: e.target.value })}
                    placeholder="Google Pixel 7 / Galaxy S23 / OnePlus"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F9FAFB] border border-black/[0.1] text-xs text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:border-[#111827] focus:bg-white transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#111827] mb-1">
                  Intended Project Application
                </label>
                <textarea
                  rows={3}
                  value={formData.intendedUse}
                  onChange={e => setFormData({ ...formData, intendedUse: e.target.value })}
                  placeholder="e.g. Autonomous ground rover with visual obstacle avoidance, quadcopter companion computer, conveyor optical sorter..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F9FAFB] border border-black/[0.1] text-xs text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:border-[#111827] focus:bg-white transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#111827] hover:bg-black text-white text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <span>Submit Pilot Program Application</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
};

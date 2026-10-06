import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export const AppleWaitlist: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [teamType, setTeamType] = useState('hackathon');
  const [submitted, setSubmitted] = useState(false);
  const [reservationCode, setReservationCode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please provide your name or robotics team name.');
      return;
    }
    if (!email.trim() || !email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid engineering contact email.');
      return;
    }

    setError('');
    const code = `RASQ-KIT-${Math.floor(1000 + Math.random() * 9000)}`;
    setReservationCode(code);
    setSubmitted(true);
  };

  return (
    <section id="pilot" className="py-20 sm:py-28 bg-[#FBFBFD] text-[#1D1D1F]">
      <div className="max-w-3xl mx-auto px-6 text-center">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <div className="text-xs font-mono text-[#0071E3] tracking-wider uppercase mb-2">
            07. Developer Pilot
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1D1D1F]">
            Request an Early Access Dev Kit.
          </h2>
          <p className="mt-3 text-base text-[#6E6E73] leading-relaxed max-w-xl mx-auto">
            We are sending the initial production batch of 50 RasQ USB-C carrier boards to competitive robotics teams, collegiate labs, and hackathons.
          </p>
        </motion.div>

        {/* Lead Capture Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white rounded-3xl border border-black/[0.06] p-8 sm:p-10 shadow-[0_2px_12px_rgba(0,0,0,0.02)] text-left"
        >
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#ECFDF5] text-[#059669] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#1D1D1F]">Reservation Confirmed</h3>
              <p className="text-xs text-[#6E6E73] max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{name}</strong>. Your developer kit application has been logged. We will reach out to <strong>{email}</strong> when the batch dispatches.
              </p>
              <div className="inline-block bg-[#F5F5F7] px-4 py-2 rounded-xl border border-black/[0.06] font-mono text-xs text-[#1D1D1F]">
                Priority Reservation: <span className="font-bold text-[#0071E3]">{reservationCode}</span>
              </div>
              <div className="pt-2">
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs text-[#0071E3] hover:underline cursor-pointer"
                >
                  Submit another kit request
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-[#1D1D1F] mb-1.5">
                  Full Name or Robotics Team
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Stanford Robotics Team / Jane Doe"
                  className="w-full px-4 py-2.5 rounded-xl border border-black/[0.1] bg-[#FBFBFD] text-xs text-[#1D1D1F] focus:outline-none focus:border-[#0071E3] focus:ring-1 focus:ring-[#0071E3] transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1D1D1F] mb-1.5">
                  Engineering Contact Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@university.edu or team@hackathon.org"
                  className="w-full px-4 py-2.5 rounded-xl border border-black/[0.1] bg-[#FBFBFD] text-xs text-[#1D1D1F] focus:outline-none focus:border-[#0071E3] focus:ring-1 focus:ring-[#0071E3] transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1D1D1F] mb-1.5">
                  Intended Project Track
                </label>
                <select
                  value={teamType}
                  onChange={(e) => setTeamType(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-black/[0.1] bg-[#FBFBFD] text-xs text-[#1D1D1F] focus:outline-none focus:border-[#0071E3] focus:ring-1 focus:ring-[#0071E3] transition-all"
                >
                  <option value="hackathon">Hackathon Project / Rapid Prototype</option>
                  <option value="university">University Robotics Lab / Research</option>
                  <option value="commercial">Commercial Edge AI / Automation</option>
                  <option value="hobbyist">Independent Maker / Robotics Enthusiast</option>
                </select>
              </div>

              {error && (
                <div className="text-xs text-[#E11D48] font-mono">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-full text-xs font-semibold text-white bg-[#0071E3] hover:bg-[#0077ED] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <span>Submit Dev Kit Application</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <div className="text-[11px] font-mono text-[#86868B] text-center pt-2">
                No credit card required · Hardware carrier ships Q3 2026
              </div>
            </form>
          )}
        </motion.div>

      </div>
    </section>
  );
};

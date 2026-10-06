import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export const WaitlistSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [teamType, setTeamType] = useState('hackathon');
  const [submitted, setSubmitted] = useState(false);
  const [reservationCode, setReservationCode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) { setError('Please provide your name or team name.'); return; }
    if (!email.trim() || !email.includes('@')) { setError('Please enter a valid email.'); return; }
    setError('');
    setReservationCode(`RASQ-KIT-${Math.floor(1000 + Math.random() * 9000)}`);
    setSubmitted(true);
  };

  return (
    <section id="waitlist" className="relative py-28 sm:py-36 bg-white border-t border-black/[0.04]">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#0071E3]/[0.02] rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-xl mx-auto px-6 lg:px-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="w-8 h-px bg-[#0071E3]" />
            <span className="text-xs font-mono font-semibold text-[#0071E3] tracking-widest uppercase">
              Early Access
            </span>
            <div className="w-8 h-px bg-[#0071E3]" />
          </div>
          <h2
            className="text-3xl sm:text-4xl font-extrabold tracking-[-0.03em] text-black"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Request a Dev Kit.
          </h2>
          <p className="mt-3 text-sm text-black/50 max-w-md mx-auto leading-relaxed">
            First batch: 50 carrier boards shipping to robotics teams, university labs, and hackathon competitors.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl border border-black/[0.06] bg-white p-8 text-left shadow-xl shadow-black/[0.02]"
        >
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-black">Reservation Confirmed</h3>
              <p className="text-xs text-black/60 max-w-sm mx-auto leading-relaxed">
                Thank you, <strong className="text-black">{name}</strong>. We'll reach out to <strong className="text-black">{email}</strong> when the batch ships.
              </p>
              <div className="inline-block bg-[#F5F5F7] px-4 py-2 rounded-xl border border-black/[0.06] font-mono text-xs text-black/60">
                Priority: <span className="font-bold text-[#0071E3]">{reservationCode}</span>
              </div>
              <div>
                <button onClick={() => setSubmitted(false)} className="text-xs text-[#0071E3] hover:underline cursor-pointer font-medium">
                  Submit another request
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-black/80 mb-2">Full Name or Team</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Stanford Robotics / Jane Doe"
                  className="w-full px-4 py-3 rounded-xl border border-black/[0.1] bg-[#FBFBFD] text-sm text-black placeholder:text-black/30 focus:outline-none focus:border-[#0071E3] focus:ring-1 focus:ring-[#0071E3] transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-black/80 mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@university.edu"
                  className="w-full px-4 py-3 rounded-xl border border-black/[0.1] bg-[#FBFBFD] text-sm text-black placeholder:text-black/30 focus:outline-none focus:border-[#0071E3] focus:ring-1 focus:ring-[#0071E3] transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-black/80 mb-2">Project Track</label>
                <select
                  value={teamType}
                  onChange={(e) => setTeamType(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-black/[0.1] bg-[#FBFBFD] text-sm text-black focus:outline-none focus:border-[#0071E3] focus:ring-1 focus:ring-[#0071E3] transition-all"
                >
                  <option value="hackathon">Hackathon / Rapid Prototype</option>
                  <option value="university">University Robotics Lab</option>
                  <option value="commercial">Commercial Edge AI</option>
                  <option value="hobbyist">Independent Maker</option>
                </select>
              </div>

              {error && <div className="text-xs text-red-500 font-mono">{error}</div>}

              <button
                type="submit"
                className="w-full py-3.5 rounded-full text-sm font-semibold text-white bg-[#0071E3] hover:bg-[#0077ED] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-[#0071E3]/20"
              >
                <span>Submit Application</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-[11px] font-mono text-black/40 text-center">
                No credit card · Ships Q3 2026
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

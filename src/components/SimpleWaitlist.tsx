import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

export const SimpleWaitlist: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setSubmitted(true);
  };

  return (
    <section id="waitlist" className="py-16 bg-neutral-950 border-t border-neutral-900">
      <div className="max-w-xl mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
          <span>EARLY ACCESS</span>
        </div>
        <h2 className="text-2xl font-bold text-white">
          Get RasQ Developer Hardware
        </h2>
        <p className="mt-2 text-xs text-neutral-400">
          We are shipping early ESP32-S3 USB-C prototype docks to developers and robotics teams.
        </p>

        <div className="mt-6 bg-neutral-900 p-6 rounded-2xl border border-neutral-800">
          {submitted ? (
            <div className="py-4 space-y-2">
              <CheckCircle2 className="w-8 h-8 text-cyan-400 mx-auto" />
              <div className="text-white font-bold text-sm">You are on the list!</div>
              <p className="text-xs text-neutral-400">
                We'll email updates and firmware downloads to <span className="text-cyan-400">{email}</span>.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Your Name"
                className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-400"
              />
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Email Address"
                className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-400"
              />
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-neutral-950 font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Request Early Access</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

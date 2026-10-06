import React from 'react';
import { Cpu, Sparkles } from 'lucide-react';

interface HackathonNavbarProps {
  onScrollToDemo: () => void;
  onScrollToArch: () => void;
  onScrollToBOM: () => void;
}

export const HackathonNavbar: React.FC<HackathonNavbarProps> = ({
  onScrollToDemo,
  onScrollToArch,
  onScrollToBOM,
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#FBFBFD]/85 backdrop-blur-md border-b border-black/[0.08]">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        
        {/* Brand Lockup */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-6 h-6 rounded-lg bg-[#111827] flex items-center justify-center text-white">
            <Cpu className="w-3.5 h-3.5" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-bold tracking-tight text-[#111827]">RasQ</span>
            <span className="text-[11px] font-mono text-[#0066CC] font-semibold">Hackathon Demo</span>
          </div>
        </a>

        {/* Navigation */}
        <nav className="hidden sm:flex items-center gap-7 text-xs font-medium text-[#4B5563]">
          <button
            onClick={onScrollToDemo}
            className="hover:text-[#111827] transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#0066CC] animate-pulse" />
            Live MVP Demo
          </button>
          <button
            onClick={onScrollToArch}
            className="hover:text-[#111827] transition-colors cursor-pointer"
          >
            How It Works
          </button>
          <button
            onClick={onScrollToBOM}
            className="hover:text-[#111827] transition-colors cursor-pointer"
          >
            Cost vs Raspberry Pi
          </button>
        </nav>

        {/* Action Button */}
        <div>
          <button
            onClick={onScrollToDemo}
            className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#111827] hover:bg-black text-white transition-all shadow-xs cursor-pointer"
          >
            Launch MVP
          </button>
        </div>

      </div>
    </header>
  );
};

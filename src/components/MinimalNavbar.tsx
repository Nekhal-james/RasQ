import React from 'react';
import { Cpu } from 'lucide-react';

interface MinimalNavbarProps {
  onScrollToDiagram: () => void;
  onScrollToSpecs: () => void;
  onScrollToWaitlist: () => void;
}

export const MinimalNavbar: React.FC<MinimalNavbarProps> = ({
  onScrollToDiagram,
  onScrollToSpecs,
  onScrollToWaitlist,
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#F5F5F7]/80 backdrop-blur-xl border-b border-black/[0.06]">
      <div className="max-w-6xl mx-auto px-6 h-12 flex items-center justify-between">
        
        {/* Brand */}
        <a href="#" className="flex items-center gap-2 text-[#1D1D1F] hover:opacity-75 transition-opacity">
          <div className="w-5 h-5 rounded bg-[#1D1D1F] flex items-center justify-center text-white">
            <Cpu className="w-3 h-3" />
          </div>
          <span className="text-sm font-bold tracking-tight">RasQ</span>
        </a>

        {/* Quiet Navigation */}
        <nav className="hidden sm:flex items-center gap-8 text-xs font-medium text-[#86868B]">
          <button
            onClick={onScrollToDiagram}
            className="hover:text-[#1D1D1F] transition-colors cursor-pointer"
          >
            Hardware Topology
          </button>
          <button
            onClick={onScrollToSpecs}
            className="hover:text-[#1D1D1F] transition-colors cursor-pointer"
          >
            Architecture
          </button>
          <button
            onClick={onScrollToWaitlist}
            className="hover:text-[#1D1D1F] transition-colors cursor-pointer"
          >
            Developer Kit
          </button>
        </nav>

        {/* Action */}
        <div>
          <button
            onClick={onScrollToWaitlist}
            className="px-3.5 py-1 rounded-full text-xs font-semibold bg-[#1D1D1F] text-white hover:bg-black transition-colors cursor-pointer"
          >
            Get Kit
          </button>
        </div>

      </div>
    </header>
  );
};

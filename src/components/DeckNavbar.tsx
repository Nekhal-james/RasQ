import React from 'react';

interface DeckNavbarProps {
  onScrollTo: (id: string) => void;
}

export const DeckNavbar: React.FC<DeckNavbarProps> = ({ onScrollTo }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0B132B]/90 backdrop-blur-md border-b border-white/10 text-white">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        
        {/* Brand Lockup */}
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold tracking-tight text-white font-sans">
            RasQ
          </span>
          <span className="text-white/30 hidden sm:inline">|</span>
          <span className="text-xs font-mono text-[#00A3C4] font-medium tracking-wide hidden sm:inline">
            iQOO Hackathon 2026
          </span>
        </div>

        {/* Navigation Anchors */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-white/70">
          <button 
            onClick={() => onScrollTo('problem')} 
            className="hover:text-white transition-colors cursor-pointer"
          >
            Problem
          </button>
          <button 
            onClick={() => onScrollTo('idea')} 
            className="hover:text-white transition-colors cursor-pointer"
          >
            The Concept
          </button>
          <button 
            onClick={() => onScrollTo('architecture')} 
            className="hover:text-white transition-colors cursor-pointer"
          >
            Architecture
          </button>
          <button 
            onClick={() => onScrollTo('software')} 
            className="hover:text-white transition-colors cursor-pointer"
          >
            Software & SDK
          </button>
          <button 
            onClick={() => onScrollTo('mvp')} 
            className="hover:text-white transition-colors cursor-pointer"
          >
            MVP
          </button>
          <button 
            onClick={() => onScrollTo('team')} 
            className="hover:text-white transition-colors cursor-pointer"
          >
            Team
          </button>
        </nav>

        {/* Subtitle tag */}
        <div className="text-[11px] font-mono text-[#00A3C4] border border-[#00A3C4]/30 px-2.5 py-1 rounded-full bg-[#00A3C4]/10">
          Idea Submission
        </div>

      </div>
    </header>
  );
};

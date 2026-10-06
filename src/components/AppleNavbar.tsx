import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

interface AppleNavbarProps {
  onNavigate: (id: string) => void;
}

export const AppleNavbar: React.FC<AppleNavbarProps> = ({ onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#FBFBFD]/80 backdrop-blur-md border-b border-black/[0.06] shadow-[0_1px_2px_rgba(0,0,0,0.03)]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-lg font-bold tracking-tight text-[#1D1D1F] hover:opacity-70 transition-opacity"
        >
          RasQ
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-[13px] font-normal text-[#1D1D1F]/70">
          <button
            onClick={() => onNavigate('overview')}
            className="hover:text-[#1D1D1F] transition-colors cursor-pointer"
          >
            Overview
          </button>
          <button
            onClick={() => onNavigate('hardware')}
            className="hover:text-[#1D1D1F] transition-colors cursor-pointer"
          >
            Hardware Dock
          </button>
          <button
            onClick={() => onNavigate('specs')}
            className="hover:text-[#1D1D1F] transition-colors cursor-pointer"
          >
            Specs
          </button>
          <button
            onClick={() => onNavigate('architecture')}
            className="hover:text-[#1D1D1F] transition-colors cursor-pointer"
          >
            Pipeline
          </button>
          <button
            onClick={() => onNavigate('economics')}
            className="hover:text-[#1D1D1F] transition-colors cursor-pointer"
          >
            Economics
          </button>
          <button
            onClick={() => onNavigate('developer')}
            className="hover:text-[#1D1D1F] transition-colors cursor-pointer"
          >
            Python SDK
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('pilot')}
            className="px-4 py-1.5 text-xs font-medium text-white bg-[#0071E3] hover:bg-[#0077ED] rounded-full transition-colors whitespace-nowrap cursor-pointer shadow-xs"
          >
            Request Dev Kit
          </button>
        </div>
      </div>

      {/* Whisper-Thin Dynamic Progress Beam */}
      <motion.div
        style={{ scaleX }}
        className="h-[1.5px] bg-[#0071E3] origin-left w-full pointer-events-none"
      />
    </header>
  );
};


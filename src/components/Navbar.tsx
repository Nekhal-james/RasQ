import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';

interface NavbarProps {
  onNavigate: (id: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { label: 'Problem', id: 'problem' },
    { label: 'Hardware', id: 'hardware' },
    { label: 'Pipeline', id: 'pipeline' },
    { label: 'Economics', id: 'economics' },
    { label: 'SDK', id: 'sdk' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-xl border-b border-black/[0.04]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        {/* Wordmark */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-7 h-7 rounded bg-black flex items-center justify-center">
            <span className="text-white font-bold text-xs">R</span>
          </div>
          <span className="text-base font-bold tracking-tight text-black">
            RasQ
          </span>
        </button>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => onNavigate(link.id)}
              className="px-3.5 py-1.5 text-[13px] font-medium text-black/50 hover:text-black rounded-lg hover:bg-black/[0.02] transition-all cursor-pointer"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* CTA */}
        <button
          onClick={() => onNavigate('waitlist')}
          className="px-5 py-2 text-[13px] font-semibold text-white bg-[#0071E3] hover:bg-[#0077ED] rounded-full transition-all cursor-pointer shadow-sm shadow-[#0071E3]/20"
        >
          Request Dev Kit
        </button>
      </div>

      {/* Progress bar */}
      <motion.div
        style={{ scaleX }}
        className="h-[2px] bg-[#0071E3] origin-left w-full"
      />
    </header>
  );
};

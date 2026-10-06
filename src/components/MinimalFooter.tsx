import React from 'react';
import { Cpu } from 'lucide-react';

export const MinimalFooter: React.FC = () => {
  return (
    <footer className="bg-[#F5F5F7] border-t border-black/[0.06] py-16 text-xs text-[#86868B]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-8 border-b border-black/[0.06]">
          
          <div className="flex items-center gap-2 text-[#1D1D1F]">
            <div className="w-5 h-5 rounded bg-[#1D1D1F] flex items-center justify-center text-white">
              <Cpu className="w-3 h-3" />
            </div>
            <span className="font-bold tracking-tight">RasQ</span>
            <span className="text-[#86868B]">· Smartphone-to-SBC Edge Computing Platform</span>
          </div>

          <div className="flex flex-wrap items-center gap-6 font-mono text-[11px]">
            <a href="#story" className="hover:text-[#1D1D1F] transition-colors">Docking Flow</a>
            <a href="#specifications" className="hover:text-[#1D1D1F] transition-colors">Architecture</a>
            <a href="#waitlist" className="hover:text-[#1D1D1F] transition-colors">Developer Kit</a>
          </div>

        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[11px] font-mono">
          <div>
            © {new Date().getFullYear()} RasQ Project. All rights reserved.
          </div>
          <div className="flex items-center gap-3">
            <span>ESP32-S3 Hardware Bridge</span>
            <span>·</span>
            <span>USB CDC-ACM Protocol</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

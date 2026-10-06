import React from 'react';
import { Cpu } from 'lucide-react';

export const HackathonFooter: React.FC = () => {
  return (
    <footer className="bg-[#FBFBFD] border-t border-black/[0.08] py-16 text-xs text-[#6B7280]">
      <div className="max-w-5xl mx-auto px-6 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-black/[0.08]">
          <div className="flex items-center gap-2 text-[#111827]">
            <div className="w-5 h-5 rounded bg-[#111827] flex items-center justify-center text-white">
              <Cpu className="w-3 h-3" />
            </div>
            <span className="font-bold">RasQ</span>
            <span className="text-[#9CA3AF]">·</span>
            <span>Smartphone-to-SBC Edge Computing Platform</span>
          </div>

          <div className="flex flex-wrap items-center gap-6 font-mono text-[11px]">
            <a href="#demo" className="hover:text-[#111827] transition-colors">MVP Demo</a>
            <a href="#architecture" className="hover:text-[#111827] transition-colors">Architecture</a>
            <a href="#economics" className="hover:text-[#111827] transition-colors">Economics</a>
            <a href="#code" className="hover:text-[#111827] transition-colors">Python SDK</a>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[11px] font-mono text-[#9CA3AF]">
          <div>
            Built for Hackathon 2026. Open-source hardware bridge specifications.
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

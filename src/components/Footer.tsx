import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#FBFBFD] border-t border-black/[0.04] py-16">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <div className="space-y-2 border-b border-black/[0.04] pb-8 mb-8 text-[11px] text-black/40 leading-relaxed font-mono">
          <p>1. BOM comparison based on Q2 2026 retail pricing for Raspberry Pi 5 8GB, Hailo-8L AI Kit, Camera Module 3, Waveshare UPS, and motor shields.</p>
          <p>2. Smartphone specs reference Snapdragon 8 Gen series, Dimensity, and Tensor processors with 15–45 TOPS NPUs.</p>
          <p>3. RasQ is an independent open-hardware project. Not affiliated with Raspberry Pi Ltd or Google Inc.</p>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded bg-black flex items-center justify-center">
              <span className="text-white font-bold text-xs">R</span>
            </div>
            <div>
              <div className="text-sm font-bold text-black">RasQ</div>
              <div className="text-[11px] text-black/50">Smartphone-to-SBC Robotics Platform</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-black/60 font-medium">
            <a href="#overview" className="hover:text-[#0071E3] transition-colors">Overview</a>
            <a href="#hardware" className="hover:text-[#0071E3] transition-colors">Hardware</a>
            <a href="#pipeline" className="hover:text-[#0071E3] transition-colors">Pipeline</a>
            <a href="#economics" className="hover:text-[#0071E3] transition-colors">Economics</a>
            <a href="#sdk" className="hover:text-[#0071E3] transition-colors">SDK</a>
            <a href="#waitlist" className="hover:text-[#0071E3] transition-colors">Dev Kit</a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-black/[0.04] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[11px] text-black/40 font-mono">
          <div>© {new Date().getFullYear()} RasQ Open Hardware. All rights reserved.</div>
          <div className="flex items-center gap-3">
            <span>Apache 2.0 Firmware</span>
            <span className="text-black/20">·</span>
            <span>CERN Open Hardware License</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

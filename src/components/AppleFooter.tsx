import React from 'react';

export const AppleFooter: React.FC = () => {
  return (
    <footer className="bg-[#F5F5F7] border-t border-black/[0.06] py-16 text-xs text-[#86868B]">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Footnote Notes */}
        <div className="space-y-2 border-b border-black/[0.06] pb-8 mb-8 text-[11px] leading-relaxed">
          <p>
            1. Bill of Materials comparison based on prevailing retail pricing for Raspberry Pi 5 8GB, official Raspberry Pi AI Kit (Hailo-8L), Camera Module 3 Wide, Waveshare UPS Module, and motor expansion shields as of Q2 2026.
          </p>
          <p>
            2. Smartphone compute specifications reference standard modern Snapdragon 8 Gen series, MediaTek Dimensity, and Google Tensor processors equipped with 15–45 TOPS neural processing units (NPUs).
          </p>
          <p>
            3. RasQ is an independent open-hardware research project and is not affiliated with, endorsed by, or sponsored by Raspberry Pi Ltd or Google Inc.
          </p>
        </div>

        {/* Footer Navigation Mirror & Copyright */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="font-bold text-[#1D1D1F] text-sm">RasQ</span>
            <p className="text-[11px]">Smartphone-to-SBC Edge Computing Platform</p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-[12px] text-[#6E6E73]">
            <a href="#overview" className="hover:text-[#1D1D1F] transition-colors">
              Overview
            </a>
            <a href="#hardware" className="hover:text-[#1D1D1F] transition-colors">
              Hardware
            </a>
            <a href="#architecture" className="hover:text-[#1D1D1F] transition-colors">
              Architecture
            </a>
            <a href="#economics" className="hover:text-[#1D1D1F] transition-colors">
              Economics
            </a>
            <a href="#developer" className="hover:text-[#1D1D1F] transition-colors">
              Python SDK
            </a>
            <a href="#pilot" className="hover:text-[#1D1D1F] transition-colors">
              Dev Kit
            </a>
          </div>
        </div>

        <div className="pt-8 mt-8 border-t border-black/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[11px]">
          <div>
            © {new Date().getFullYear()} RasQ Open Hardware. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Apache 2.0 Open Source Firmware</span>
            <span>·</span>
            <span>CERN Open Hardware License</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

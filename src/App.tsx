import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProblemSection } from './components/ProblemSection';
import { HardwareSection } from './components/HardwareSection';
import { PipelineSection } from './components/PipelineSection';
import { EconomicsSection } from './components/EconomicsSection';
import { SDKSection } from './components/SDKSection';
import { FAQSection } from './components/FAQSection';
import { WaitlistSection } from './components/WaitlistSection';
import { Footer } from './components/Footer';

export default function App() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -60;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col font-sans selection:bg-[#0071E3] selection:text-white antialiased overflow-x-hidden noise-overlay">
      <Navbar onNavigate={scrollTo} />
      <main className="flex-1 relative z-10">
        <Hero 
          onExplore={() => scrollTo('hardware')}
          onViewArchitecture={() => scrollTo('pipeline')}
        />
        <ProblemSection />
        <HardwareSection />
        <PipelineSection />
        <EconomicsSection />
        <SDKSection />
        <FAQSection />
        <WaitlistSection />
      </main>
      <Footer />
    </div>
  );
}

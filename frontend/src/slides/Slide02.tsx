import React, { useState } from 'react';
import { HeroPCBScene } from '../scenes/HeroPCBScene';
import { Cpu, Zap, Layers, CheckCircle2 } from 'lucide-react';
import { SLIDES } from '../data/slidesData';

export const Slide02: React.FC = () => {
  const slideData = SLIDES[1];
  const [activeHighlight, setActiveHighlight] = useState<string | null>(null);

  return (
    <div className="w-full h-full flex flex-col lg:flex-row items-center justify-between px-6 lg:px-16 pt-20 pb-12 relative z-10 select-none">
      {/* Left Column: Technical Content */}
      <div className="flex-1 max-w-xl z-20 flex flex-col justify-center">
        <div className="inline-flex items-center gap-2 pcb-glass px-3 py-1 rounded-full border border-[#00E676]/30 text-[10px] font-mono text-[#00E676] tracking-wider uppercase mb-4 w-fit">
          <Layers className="w-3 h-3 text-[#00E676]" />
          <span>{slideData.stageTag}</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
          {slideData.title}
        </h2>
        <h3 className="text-lg font-mono font-semibold text-[#00E676] mb-4">
          {slideData.subtitle}
        </h3>

        <p className="text-xs sm:text-sm text-[#B7C2C5] leading-relaxed mb-6">
          {slideData.description}
        </p>

        {/* 3 Interactive Technology Cards */}
        <div className="space-y-3 mb-6">
          <div
            onMouseEnter={() => setActiveHighlight('SMT')}
            onMouseLeave={() => setActiveHighlight(null)}
            className={`p-4 rounded-xl transition-all duration-300 cursor-pointer ${
              activeHighlight === 'SMT' ? 'pcb-glass-active border-[#00E676]' : 'pcb-glass border-[#00E676]/20 hover:border-[#00E676]/50'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-mono font-bold text-sm text-[#00E676]">SMT — Surface Mount Tech</span>
              <span className="text-[10px] font-mono text-[#718083]">High Density</span>
            </div>
            <p className="text-xs text-[#B7C2C5]">
              Components mounted directly onto PCB surface copper pads. Enables ultra-miniaturized high-speed electronics.
            </p>
          </div>

          <div
            onMouseEnter={() => setActiveHighlight('THT')}
            onMouseLeave={() => setActiveHighlight(null)}
            className={`p-4 rounded-xl transition-all duration-300 cursor-pointer ${
              activeHighlight === 'THT' ? 'pcb-glass-active border-[#00E676]' : 'pcb-glass border-[#00E676]/20 hover:border-[#00E676]/50'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-mono font-bold text-sm text-[#19FF88]">THT — Through-Hole Tech</span>
              <span className="text-[10px] font-mono text-[#718083]">Heavy Duty</span>
            </div>
            <p className="text-xs text-[#B7C2C5]">
              Component leads inserted through drilled PCB holes. Provides high mechanical joint strength for connectors & power parts.
            </p>
          </div>

          <div
            onMouseEnter={() => setActiveHighlight('Mixed')}
            onMouseLeave={() => setActiveHighlight(null)}
            className={`p-4 rounded-xl transition-all duration-300 cursor-pointer ${
              activeHighlight === 'Mixed' ? 'pcb-glass-active border-[#00E676]' : 'pcb-glass border-[#00E676]/20 hover:border-[#00E676]/50'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-mono font-bold text-sm text-[#00D66B]">Mixed Technology</span>
              <span className="text-[10px] font-mono text-[#718083]">Hybrid Assembly</span>
            </div>
            <p className="text-xs text-[#B7C2C5]">
              Combines both SMT passives/ICs and THT connectors on the same substrate for optimal electrical & structural performance.
            </p>
          </div>
        </div>
      </div>

      {/* Right Column: 3D PCB Interactive Viewer */}
      <div className="flex-1 w-full h-[50vh] lg:h-[70vh] relative z-10 flex items-center justify-center">
        <HeroPCBScene activeHighlight={activeHighlight} />
      </div>
    </div>
  );
};

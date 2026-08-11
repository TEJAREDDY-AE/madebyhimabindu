import React from 'react';
import { WaveSolderingScene } from '../scenes/WaveSolderingScene';
import { Waves, Zap, ShieldCheck } from 'lucide-react';
import { SLIDES } from '../data/slidesData';

export const Slide07: React.FC = () => {
  const slideData = SLIDES[6];

  return (
    <div className="w-full h-full flex flex-col lg:flex-row items-center justify-between px-6 lg:px-16 pt-20 pb-12 relative z-10 select-none">
      {/* Left Column: Technical Content */}
      <div className="flex-1 max-w-xl z-20 flex flex-col justify-center">
        <div className="inline-flex items-center gap-2 pcb-glass px-3 py-1 rounded-full border border-[#00E676]/30 text-[10px] font-mono text-[#00E676] tracking-wider uppercase mb-3 w-fit">
          <Waves className="w-3 h-3 text-[#00E676]" />
          <span>{slideData.stageTag}</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
          {slideData.title}
        </h2>
        <h3 className="text-base font-mono font-semibold text-[#00E676] mb-4">
          {slideData.subtitle}
        </h3>

        <p className="text-xs sm:text-sm text-[#B7C2C5] leading-relaxed mb-6">
          {slideData.description}
        </p>

        {/* Process Flow Cards */}
        <div className="space-y-2 mb-6">
          {slideData.keyPoints?.map((pt, i) => (
            <div key={i} className="pcb-glass p-3 rounded-xl border border-[#00E676]/20 flex items-start gap-3">
              <div className="w-5 h-5 rounded-md bg-[#00E676]/10 border border-[#00E676]/30 flex items-center justify-center font-mono text-xs font-bold text-[#00E676] shrink-0 mt-0.5">
                {i + 1}
              </div>
              <p className="text-xs text-[#B7C2C5] leading-relaxed">{pt}</p>
            </div>
          ))}
        </div>

        {/* Telemetry Grid */}
        <div className="grid grid-cols-3 gap-2">
          {slideData.specs?.map((sp, i) => (
            <div key={i} className="pcb-glass p-2.5 rounded-xl border border-[#00E676]/20 text-center">
              <div className="text-[10px] font-mono text-[#718083] uppercase mb-0.5">{sp.label}</div>
              <div className="text-xs font-mono font-bold text-[#00E676]">{sp.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Column: 3D Wave Soldering Interactive Scene */}
      <div className="flex-1 w-full h-[50vh] lg:h-[70vh] relative z-10 flex items-center justify-center">
        <WaveSolderingScene />
      </div>
    </div>
  );
};

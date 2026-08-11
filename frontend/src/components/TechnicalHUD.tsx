import React from 'react';
import { Activity, Zap } from 'lucide-react';

interface TechnicalHUDProps {
  currentSlide: number;
  totalSlides: number;
}

export const TechnicalHUD: React.FC<TechnicalHUDProps> = ({ currentSlide, totalSlides }) => {
  const stageNum = currentSlide + 1;
  const isEnding = currentSlide >= totalSlides;

  return (
    <div className="fixed bottom-6 left-6 z-30 pointer-events-none hidden sm:flex flex-col gap-2 font-mono text-[10px]">
      <div className="pcb-glass px-4 py-2.5 rounded-xl border border-[#00E676]/30 flex items-center gap-4 shadow-xl backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E676] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00E676]"></span>
          </span>
          <span className="text-[#00E676] font-bold tracking-wider uppercase">LINE-01 ONLINE</span>
        </div>

        <div className="h-3 w-[1px] bg-[#00E676]/30" />

        <div className="flex items-center gap-1.5 opacity-90">
          <Activity className="w-3.5 h-3.5 text-[#00E676]" />
          <span>VISION SYSTEM: 100%</span>
        </div>

        <div className="h-3 w-[1px] bg-[#00E676]/30" />

        <div className="flex items-center gap-1.5 opacity-90">
          <Zap className="w-3.5 h-3.5 text-[#00E676]" />
          <span>PRECISION: ±25µm</span>
        </div>

        <div className="h-3 w-[1px] bg-[#00E676]/30" />

        <div className="text-[#00E676] font-bold">
          {isEnding ? 'STAGE: FINAL RECAP' : `STAGE ${String(stageNum).padStart(2, '0')} / ${totalSlides}`}
        </div>
      </div>
    </div>
  );
};

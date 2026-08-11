import React from 'react';
import { HeroPCBScene } from '../scenes/HeroPCBScene';
import { CheckCircle2, RotateCcw, Award } from 'lucide-react';

interface EndingSlideProps {
  onRestart: () => void;
}

export const EndingSlide: React.FC<EndingSlideProps> = ({ onRestart }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-6 pt-20 pb-12 relative z-10 select-none text-center">
      <div className="max-w-2xl z-20 flex flex-col items-center">
        {/* Completion Badge */}
        <div className="inline-flex items-center gap-2 pcb-glass px-4 py-1.5 rounded-full border border-[#00E676] text-xs font-mono text-[#19FF88] tracking-widest uppercase mb-6 shadow-lg box-glow-green">
          <CheckCircle2 className="w-4 h-4 text-[#00E676]" />
          <span>END OF MANUFACTURING PROCESS</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-2">
          PCB ASSEMBLY
        </h1>
        <h2 className="text-xl sm:text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#00D66B] via-[#00E676] to-[#19FF88] mb-4">
          PROCESSES & STAGES
        </h2>

        <p className="text-xs sm:text-sm text-[#B7C2C5] font-mono mb-6 max-w-lg">
          Automated Precision Manufacturing Guide — Interactive 3D Digital Presentation
        </p>

        {/* Restart Presentation Button */}
        <button
          onClick={onRestart}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#00D66B] to-[#00E676] text-black font-mono font-bold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(0,230,118,0.5)] hover:scale-105 active:scale-95 transition-all duration-200"
        >
          <RotateCcw className="w-4 h-4 fill-black" />
          <span>REPLAY 3D PRESENTATION</span>
        </button>
      </div>

      {/* Finished 3D PCBA Display */}
      <div className="w-full max-w-xl h-[45vh] relative z-10 my-4">
        <HeroPCBScene />
      </div>

      <div className="text-[11px] font-mono text-[#718083] z-20">
        Presentation complete • M. Hima Bindu (24F65A0410)
      </div>
    </div>
  );
};

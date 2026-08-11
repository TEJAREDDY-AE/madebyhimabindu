import React from 'react';
import { CheckCircle2, RotateCcw, Image as ImageIcon } from 'lucide-react';

interface EndingSlideProps {
  onRestart: () => void;
}

export const EndingSlide: React.FC<EndingSlideProps> = ({ onRestart }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-6 pt-20 pb-12 relative z-10 select-none text-center">
      <div className="max-w-2xl z-20 flex flex-col items-center">
        {/* Completion Badge */}
        <div className="inline-flex items-center gap-2 pcb-glass px-4 py-1.5 rounded-full border border-[#00E676] text-xs font-mono text-[#19FF88] tracking-widest uppercase mb-4 shadow-lg box-glow-green">
          <CheckCircle2 className="w-4 h-4 text-[#00E676]" />
          <span>END OF MANUFACTURING PROCESS</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-1">
          THANK YOU FOR WATCHING
        </h1>
        <h2 className="text-lg sm:text-2xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#00D66B] via-[#00E676] to-[#19FF88] mb-3">
          PCB ASSEMBLY: PROCESSES & STAGES
        </h2>

        {/* Restart Presentation Button */}
        <button
          onClick={onRestart}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#00D66B] to-[#00E676] text-black font-mono font-bold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(0,230,118,0.5)] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer mb-4"
        >
          <RotateCcw className="w-4 h-4 fill-black" />
          <span>RESTART PRESENTATION</span>
        </button>
      </div>

      {/* Finished PCBA Presentation Image Display */}
      <div className="w-full max-w-xl h-[42vh] relative z-10 my-2 px-4">
        <div className="relative w-full h-full rounded-2xl overflow-hidden border border-[#00E676]/40 pcb-glass shadow-2xl group transition-all duration-500 hover:border-[#00E676]">
          <img
            src="/images/ending_slide.png"
            alt="PCB Assembly Presentation Completion"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050B0D] via-transparent to-transparent opacity-80" />
          
          <div className="absolute top-3 left-3 pcb-glass px-3 py-1 rounded-lg border border-[#00E676]/30 text-[10px] font-mono text-[#00E676] flex items-center gap-2">
            <ImageIcon className="w-3.5 h-3.5" />
            <span>PRESENTATION SUMMARY & QUESTIONS</span>
          </div>
        </div>
      </div>

      <div className="text-[11px] font-mono text-[#718083] z-20">
        Presentation complete • M. Hima Bindu (24F65A0410) • ECE-1
      </div>
    </div>
  );
};


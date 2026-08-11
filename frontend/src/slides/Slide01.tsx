import React from 'react';
import { ArrowDown, Cpu, Layers, Image as ImageIcon } from 'lucide-react';

interface Slide01Props {
  onNext?: () => void;
}

export const Slide01: React.FC<Slide01Props> = ({ onNext }) => {
  return (
    <div className="w-full h-full flex flex-col lg:flex-row items-center justify-between px-6 lg:px-16 pt-20 pb-12 relative z-10 select-none">
      {/* Left Column: Slide Title & Student Details */}
      <div className="flex-1 max-w-2xl z-20 flex flex-col justify-center">
        {/* Stage Tag */}
        <div className="inline-flex items-center gap-2 pcb-glass px-3.5 py-1.5 rounded-full border border-[#00E676]/30 text-[11px] font-mono text-[#00E676] tracking-wider uppercase mb-6 w-fit shadow-md">
          <Layers className="w-3.5 h-3.5 text-[#00E676] animate-spin" style={{ animationDuration: '8s' }} />
          <span>Automated Precision Manufacturing Guide</span>
        </div>

        {/* Main Title Hierarchy */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-2 leading-none">
          PCB ASSEMBLY
        </h1>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#00D66B] via-[#00E676] to-[#19FF88] mb-6">
          PROCESSES & STAGES
        </h2>

        <p className="text-sm sm:text-base text-[#B7C2C5] max-w-xl font-normal leading-relaxed mb-8">
          A comprehensive digital slide presentation exploring modern surface-mount technology (SMT), thermodynamics, through-hole wave soldering, and automated optical/X-ray quality control.
        </p>

        {/* STUDENT DETAILS BOX (Slide 1 ONLY) */}
        <div className="pcb-glass-active p-6 rounded-2xl border border-[#00E676]/50 max-w-md shadow-2xl relative overflow-hidden group">
          {/* Subtle neon green line underneath */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00D66B] via-[#00E676] to-[#19FF88]" />

          <div className="text-[10px] font-mono font-bold tracking-widest text-[#00E676] uppercase mb-2 flex items-center gap-2">
            <Cpu className="w-3.5 h-3.5" />
            <span>STUDENT PRESENTATION CREDITS</span>
          </div>

          <div className="space-y-1">
            <div className="text-xl sm:text-2xl font-extrabold text-white tracking-wide font-sans">
              M. Hima Bindu
            </div>
            <div className="text-sm font-mono font-semibold text-[#00E676]">
              24F65A0410
            </div>
            <div className="text-xs font-mono text-[#B7C2C5]">
              Final Year | ECE-1
            </div>
          </div>
        </div>

        {/* Start Guide Button */}
        {onNext && (
          <button
            onClick={onNext}
            className="mt-8 inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-gradient-to-r from-[#00D66B] to-[#00E676] text-black font-mono font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(0,230,118,0.4)] hover:scale-105 active:scale-95 transition-all w-fit cursor-pointer"
          >
            <span>EXPLORE ASSEMBLY LINE</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </button>
        )}
      </div>

      {/* Right Column: Presentation Image Showcase */}
      <div className="flex-1 w-full h-[50vh] lg:h-[70vh] relative z-10 flex items-center justify-center p-4">
        <div className="relative w-full max-w-xl h-full rounded-2xl overflow-hidden border border-[#00E676]/40 pcb-glass shadow-2xl group transition-all duration-500 hover:border-[#00E676]">
          <img
            src="/images/slide01_hero.png"
            alt="PCB Assembly Line Overview"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050B0D] via-transparent to-transparent opacity-80" />
          
          <div className="absolute top-4 left-4 pcb-glass px-3 py-1.5 rounded-lg border border-[#00E676]/30 text-[10px] font-mono text-[#00E676] flex items-center gap-2">
            <ImageIcon className="w-3.5 h-3.5" />
            <span>IMAGE EXHIBIT 01: SMT LINE OVERVIEW</span>
          </div>

          <div className="absolute bottom-4 left-4 right-4 pcb-glass p-3 rounded-xl border border-[#00E676]/30 backdrop-blur-md">
            <div className="text-xs font-mono font-bold text-white mb-1">AUTOMATED LINE 04</div>
            <div className="text-[11px] font-mono text-[#00E676]">Inline SMT Convection & Robotic Placement Station</div>
          </div>
        </div>
      </div>
    </div>
  );
};


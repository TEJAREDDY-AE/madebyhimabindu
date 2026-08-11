import React, { useState } from 'react';
import { HeroPCBScene } from '../scenes/HeroPCBScene';
import { ArrowDown, Cpu, Sparkles, Layers } from 'lucide-react';

interface Slide01Props {
  onNext?: () => void;
}

export const Slide01: React.FC<Slide01Props> = ({ onNext }) => {
  const [hoveredComponent, setHoveredComponent] = useState<string | null>(null);

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
          An interactive, cinematic 3D digital presentation exploring modern surface-mount technology (SMT), thermodynamics, through-hole wave soldering, and automated optical/X-ray quality control.
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
            className="mt-8 inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-gradient-to-r from-[#00D66B] to-[#00E676] text-black font-mono font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(0,230,118,0.4)] hover:scale-105 active:scale-95 transition-all w-fit"
          >
            <span>EXPLORE ASSEMBLY LINE</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </button>
        )}
      </div>

      {/* Right Column: Interactive 3D Hero PCB Model */}
      <div className="flex-1 w-full h-[55vh] lg:h-[75vh] relative z-10 flex items-center justify-center">
        <HeroPCBScene onComponentHover={setHoveredComponent} />

        {/* Hover telemetry tooltip */}
        {hoveredComponent && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pcb-glass px-4 py-2 rounded-xl border border-[#00E676] text-xs font-mono text-[#19FF88] box-glow-green pointer-events-none">
            INSPECTING: {hoveredComponent}
          </div>
        )}
      </div>
    </div>
  );
};

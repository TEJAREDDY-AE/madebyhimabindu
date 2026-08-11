import React, { useState } from 'react';
import { ShieldAlert, AlertTriangle, Wrench, Image as ImageIcon } from 'lucide-react';
import { SLIDES } from '../data/slidesData';

export const Slide11: React.FC = () => {
  const slideData = SLIDES[10];
  const [selectedDefect, setSelectedDefect] = useState<number>(0);

  const defects = [
    {
      name: 'SOLDER BRIDGING',
      type: 'Electrical Short Circuit',
      cause: 'Excessive solder paste volume, stencil misalignment, or tight pad spacing.',
      solution: 'Reduce stencil aperture size, optimize squeegee pressure, and refine reflow soak profile.',
      severity: 'HIGH RISK'
    },
    {
      name: 'TOMBSTONING',
      type: 'Open Circuit / Lifting Component',
      cause: 'Unequal surface tension forces across pads during reflow liquidus phase.',
      solution: 'Equalize copper thermal trace design, verify pad symmetry, and optimize preheat ramp.',
      severity: 'CRITICAL'
    },
    {
      name: 'INSUFFICIENT SOLDER',
      type: 'Weak Mechanical / Open Joint',
      cause: 'Clogged stencil apertures, insufficient paste stroke speed, or pad oxidation.',
      solution: 'Enforce automatic stencil cleaning cycles and 3D SPI paste volume monitoring.',
      severity: 'MODERATE'
    },
    {
      name: 'SOLDER BALLING',
      type: 'Unintended Solder Spheres',
      cause: 'Moisture in paste or rapid preheat ramp causing explosive solvent outgassing.',
      solution: 'Control ambient humidity (<50% RH) and slow down preheat heating rate (<2°C/sec).',
      severity: 'MODERATE'
    }
  ];

  return (
    <div className="w-full h-full flex flex-col lg:flex-row items-center justify-between px-6 lg:px-16 pt-20 pb-12 relative z-10 select-none">
      {/* Left Column: Defect Cards & Analysis */}
      <div className="flex-1 max-w-xl z-20 flex flex-col justify-center">
        <div className="inline-flex items-center gap-2 pcb-glass px-3 py-1 rounded-full border border-amber-500/40 text-[10px] font-mono text-amber-400 tracking-wider uppercase mb-3 w-fit">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
          <span>{slideData.stageTag}</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
          {slideData.title}
        </h2>
        <h3 className="text-base font-mono font-semibold text-[#00E676] mb-3">
          {slideData.subtitle}
        </h3>
        <p className="text-xs sm:text-sm text-[#B7C2C5] leading-relaxed mb-4">
          {slideData.description}
        </p>

        {/* Defect Selector Grid */}
        <div className="grid grid-cols-2 gap-2.5 mb-4">
          {defects.map((def, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedDefect(idx)}
              className={`p-3 rounded-xl cursor-pointer transition-all duration-300 ${
                selectedDefect === idx
                  ? 'pcb-glass-active border-[#00E676] box-glow-green'
                  : 'pcb-glass border-[#00E676]/20 hover:border-[#00E676]/40'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-[9px] font-mono font-bold text-red-400 px-1 py-0.5 rounded bg-red-950/60 border border-red-800">
                  {def.severity}
                </span>
              </div>
              <h4 className="font-mono font-bold text-xs text-white mb-0.5">{def.name}</h4>
              <p className="text-[10px] font-mono text-[#00E676] truncate">{def.type}</p>
            </div>
          ))}
        </div>

        {/* Selected Defect Analysis Card */}
        <div className="pcb-glass p-4 rounded-xl border border-[#00E676]/30 shadow-xl">
          <div className="flex items-center gap-2 mb-3">
            <Wrench className="w-4 h-4 text-amber-400" />
            <h3 className="font-mono font-bold text-sm text-white">
              ANALYSIS: {defects[selectedDefect].name}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded-lg bg-[#050b0d] border border-red-500/30">
              <div className="text-[10px] font-mono font-bold text-red-400 uppercase mb-0.5">ROOT CAUSE</div>
              <p className="text-[11px] text-[#B7C2C5] leading-normal">{defects[selectedDefect].cause}</p>
            </div>

            <div className="p-2.5 rounded-lg bg-[#050b0d] border border-[#00E676]/30">
              <div className="text-[10px] font-mono font-bold text-[#00E676] uppercase mb-0.5">REMEDIATION</div>
              <p className="text-[11px] text-[#B7C2C5] leading-normal">{defects[selectedDefect].solution}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Image Viewer */}
      <div className="flex-1 w-full h-[50vh] lg:h-[70vh] relative z-10 flex items-center justify-center p-4">
        <div className="relative w-full max-w-xl h-full rounded-2xl overflow-hidden border border-[#00E676]/40 pcb-glass shadow-2xl group transition-all duration-500 hover:border-[#00E676]">
          <img
            src="/images/slide11_defects.png"
            alt="SMT Solder Defect Analysis"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050B0D] via-transparent to-transparent opacity-80" />
          
          <div className="absolute top-4 left-4 pcb-glass px-3 py-1.5 rounded-lg border border-[#00E676]/30 text-[10px] font-mono text-[#00E676] flex items-center gap-2">
            <ImageIcon className="w-3.5 h-3.5" />
            <span>IMAGE EXHIBIT 11: COMMON SMT DEFECT DIAGNOSTICS</span>
          </div>

          <div className="absolute bottom-4 left-4 right-4 pcb-glass p-3 rounded-xl border border-[#00E676]/30 backdrop-blur-md">
            <div className="text-xs font-mono font-bold text-white mb-1">OPTICAL DEFECT INSPECTION</div>
            <div className="text-[11px] font-mono text-[#00E676]">Solder Bridging, Tombstoned Resistor & Insufficient Solder Joint</div>
          </div>
        </div>
      </div>
    </div>
  );
};


import React, { useState } from 'react';
import { ShieldAlert, CheckCircle2, AlertTriangle, Cpu, Wrench } from 'lucide-react';
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
    <div className="w-full h-full flex flex-col justify-center px-6 lg:px-16 pt-20 pb-12 relative z-10 select-none">
      <div className="max-w-3xl mb-6">
        <div className="inline-flex items-center gap-2 pcb-glass px-3 py-1 rounded-full border border-amber-500/40 text-[10px] font-mono text-amber-400 tracking-wider uppercase mb-3">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
          <span>{slideData.stageTag}</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
          {slideData.title}
        </h2>
        <h3 className="text-base font-mono font-semibold text-[#00E676] mb-3">
          {slideData.subtitle}
        </h3>
        <p className="text-xs sm:text-sm text-[#B7C2C5] leading-relaxed">
          {slideData.description}
        </p>
      </div>

      {/* Defect Selector Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {defects.map((def, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedDefect(idx)}
            className={`p-4 rounded-xl cursor-pointer transition-all duration-300 ${
              selectedDefect === idx
                ? 'pcb-glass-active border-[#00E676] box-glow-green'
                : 'pcb-glass border-[#00E676]/20 hover:border-[#00E676]/40'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span className="text-[10px] font-mono font-bold text-red-400 px-1.5 py-0.5 rounded bg-red-950/60 border border-red-800">
                {def.severity}
              </span>
            </div>
            <h4 className="font-mono font-bold text-sm text-white mb-1">{def.name}</h4>
            <p className="text-[11px] font-mono text-[#00E676]">{def.type}</p>
          </div>
        ))}
      </div>

      {/* Selected Defect Analysis Card */}
      <div className="max-w-4xl pcb-glass p-6 rounded-2xl border border-[#00E676]/30 shadow-2xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/40 flex items-center justify-center">
            <Wrench className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <h3 className="font-mono font-extrabold text-lg text-white">
              ROOT CAUSE ANALYSIS: {defects[selectedDefect].name}
            </h3>
            <p className="text-xs font-mono text-[#00E676]">{defects[selectedDefect].type}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-[#050b0d] border border-red-500/30">
            <div className="text-xs font-mono font-bold text-red-400 uppercase mb-1">PHYSICAL ROOT CAUSE</div>
            <p className="text-xs text-[#B7C2C5] leading-relaxed">{defects[selectedDefect].cause}</p>
          </div>

          <div className="p-4 rounded-xl bg-[#050b0d] border border-[#00E676]/30">
            <div className="text-xs font-mono font-bold text-[#00E676] uppercase mb-1">PREVENTION & DFM REMEDIATION</div>
            <p className="text-xs text-[#B7C2C5] leading-relaxed">{defects[selectedDefect].solution}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Printer, Cpu, Flame, Search, Activity } from 'lucide-react';
import { SLIDES } from '../data/slidesData';

export const Slide03: React.FC = () => {
  const slideData = SLIDES[2];
  const [activeStage, setActiveStage] = useState<number>(0);

  const stages = [
    {
      num: '01',
      name: 'PRINTING',
      subtitle: 'Solder Paste Application',
      icon: Printer,
      desc: 'Laser-cut stainless steel stencil apertures transfer precise solder paste (SAC305) volumes onto bare PCB copper pads.'
    },
    {
      num: '02',
      name: 'PLACEMENT',
      subtitle: 'Robotic Pick & Place',
      icon: Cpu,
      desc: 'High-speed vacuum nozzles mount SMD passives and micro-BGA ICs with sub-micron ±25µm motorized accuracy.'
    },
    {
      num: '03',
      name: 'SOLDERING',
      subtitle: 'Reflow & Wave Thermal Bonding',
      icon: Flame,
      desc: 'Multi-zone convection reflow oven melts solder paste to form permanent metallurgical intermetallic joint bonds.'
    },
    {
      num: '04',
      name: 'INSPECTION',
      subtitle: 'AOI & X-Ray Quality Control',
      icon: Search,
      desc: '3D Optical cameras and transmissive X-rays verify component presence, solder volume, and joint health.'
    }
  ];

  return (
    <div className="w-full h-full flex flex-col justify-center px-6 lg:px-16 pt-20 pb-12 relative z-10 select-none">
      <div className="max-w-3xl mb-8">
        <div className="inline-flex items-center gap-2 pcb-glass px-3 py-1 rounded-full border border-[#00E676]/30 text-[10px] font-mono text-[#00E676] tracking-wider uppercase mb-3">
          <Activity className="w-3.5 h-3.5 text-[#00E676]" />
          <span>{slideData.stageTag}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
          {slideData.title}
        </h2>
        <p className="text-xs sm:text-sm text-[#B7C2C5] leading-relaxed">
          {slideData.description}
        </p>
      </div>

      {/* Interactive Process Map Pipeline */}
      <div className="relative w-full max-w-5xl mx-auto my-6">
        {/* Animated Connecting PCB Trace Path */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-[#091316] -translate-y-1/2 rounded-full overflow-hidden border border-[#00E676]/20 hidden lg:block">
          <div className="h-full bg-gradient-to-r from-[#00D66B] via-[#00E676] to-[#19FF88] animate-pulse shadow-[0_0_15px_#00E676]" />
        </div>

        {/* 4 Stage Cards */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stages.map((stg, idx) => {
            const Icon = stg.icon;
            const isActive = activeStage === idx;
            return (
              <div
                key={stg.num}
                onClick={() => setActiveStage(idx)}
                onMouseEnter={() => setActiveStage(idx)}
                className={`p-5 rounded-2xl transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  isActive
                    ? 'pcb-glass-active border-[#00E676] translate-y-[-4px] box-glow-green'
                    : 'pcb-glass border-[#00E676]/20 hover:border-[#00E676]/40'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
                    isActive ? 'bg-[#00E676] text-black font-bold border-[#00E676]' : 'bg-[#071214] border-[#00E676]/30 text-[#00E676]'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-mono font-bold text-lg text-[#00E676]">{stg.num}</span>
                </div>

                <div>
                  <h3 className="font-mono font-bold text-base text-white mb-1">{stg.name}</h3>
                  <p className="text-[11px] font-mono text-[#00E676] mb-2">{stg.subtitle}</p>
                  <p className="text-xs text-[#B7C2C5] leading-relaxed">{stg.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

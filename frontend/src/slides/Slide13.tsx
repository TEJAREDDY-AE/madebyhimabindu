import React, { useState } from 'react';
import { Cpu, Sparkles, Network, Layers, Zap } from 'lucide-react';
import { SLIDES } from '../data/slidesData';

export const Slide13: React.FC = () => {
  const slideData = SLIDES[12];
  const [activeTrend, setActiveTrend] = useState<number>(0);

  const trends = [
    {
      title: 'INDUSTRY 4.0 & M2M SMART FACTORIES',
      tag: 'CONNECTED TELEMETRY',
      icon: Network,
      desc: 'Machine-to-Machine (M2M) IPC-CFX protocol allows stencil printers, pick-and-place heads, and reflow ovens to share real-time closed-loop tuning parameters.'
    },
    {
      title: 'AI PREDICTIVE MAINTENANCE & INSPECTION',
      tag: 'MACHINE LEARNING',
      icon: Sparkles,
      desc: 'Deep neural networks analyze thermal profiles, optical camera imagery, and X-ray densities to predict machine component wear before defects occur.'
    },
    {
      title: 'MICRO MINIATURIZATION (008004 PASSIVES)',
      tag: 'NANOSCALE SMT',
      icon: Cpu,
      desc: 'Next-gen assembly lines support ultra-fine pitch 008004 passives (0.25mm x 0.125mm) and micro-BGA packages with 0.15mm pad spacing.'
    },
    {
      title: 'FLEXIBLE & RIGID-FLEX EMBEDDED PCBA',
      tag: '3D CONFORMAL',
      icon: Layers,
      desc: 'Active IC silicon dies embedded directly inside FR-4 polyimide substrate layers, enabling foldable 3D conformal electronics for aerospace and wearables.'
    }
  ];

  return (
    <div className="w-full h-full flex flex-col justify-center px-6 lg:px-16 pt-20 pb-12 relative z-10 select-none">
      <div className="max-w-3xl mb-6">
        <div className="inline-flex items-center gap-2 pcb-glass px-3 py-1 rounded-full border border-[#00E676]/30 text-[10px] font-mono text-[#00E676] tracking-wider uppercase mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#00E676] animate-pulse" />
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

      {/* 4 Interactive Future Trend Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
        {trends.map((tr, idx) => {
          const Icon = tr.icon;
          const isActive = activeTrend === idx;
          return (
            <div
              key={idx}
              onClick={() => setActiveTrend(idx)}
              onMouseEnter={() => setActiveTrend(idx)}
              className={`p-5 rounded-2xl cursor-pointer transition-all duration-300 ${
                isActive
                  ? 'pcb-glass-active border-[#00E676] box-glow-green translate-y-[-2px]'
                  : 'pcb-glass border-[#00E676]/20 hover:border-[#00E676]/40'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  isActive ? 'bg-[#00E676] text-black font-bold' : 'bg-[#071214] text-[#00E676]'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="font-mono text-[10px] font-bold text-[#00E676] px-2 py-0.5 rounded bg-[#00E676]/10 border border-[#00E676]/30">
                  {tr.tag}
                </span>
              </div>

              <h4 className="font-mono font-bold text-sm text-white mb-2">{tr.title}</h4>
              <p className="text-xs text-[#B7C2C5] leading-relaxed">{tr.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

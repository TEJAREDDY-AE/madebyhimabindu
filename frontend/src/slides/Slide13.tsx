import React, { useState } from 'react';
import { Cpu, Sparkles, Network, Layers, Image as ImageIcon } from 'lucide-react';
import { SLIDES } from '../data/slidesData';

export const Slide13: React.FC = () => {
  const slideData = SLIDES[12];
  const [activeTrend, setActiveTrend] = useState<number>(0);

  const trends = [
    {
      title: 'INDUSTRY 4.0 SMART FACTORIES',
      tag: 'CONNECTED TELEMETRY',
      icon: Network,
      desc: 'Machine-to-Machine IPC-CFX protocol allows lines to share real-time closed-loop tuning parameters.'
    },
    {
      title: 'AI PREDICTIVE MAINTENANCE',
      tag: 'MACHINE LEARNING',
      icon: Sparkles,
      desc: 'Deep neural networks analyze thermal profiles, optical imagery, and X-ray densities to predict defects.'
    },
    {
      title: 'MICRO MINIATURIZATION (008004)',
      tag: 'NANOSCALE SMT',
      icon: Cpu,
      desc: 'Next-gen assembly lines support 008004 passives (0.25mm x 0.125mm) and micro-BGA packages.'
    },
    {
      title: 'FLEXIBLE & RIGID-FLEX EMBEDDED',
      tag: '3D CONFORMAL',
      icon: Layers,
      desc: 'Active IC silicon dies embedded directly inside polyimide substrate layers for 3D electronics.'
    }
  ];

  return (
    <div className="w-full h-full flex flex-col lg:flex-row items-center justify-between px-6 lg:px-16 pt-20 pb-12 relative z-10 select-none">
      {/* Left Column: Technical Description & Trends */}
      <div className="flex-1 max-w-xl z-20 flex flex-col justify-center">
        <div className="inline-flex items-center gap-2 pcb-glass px-3 py-1 rounded-full border border-[#00E676]/30 text-[10px] font-mono text-[#00E676] tracking-wider uppercase mb-3 w-fit">
          <Sparkles className="w-3.5 h-3.5 text-[#00E676] animate-pulse" />
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

        {/* 4 Interactive Future Trend Cards Grid */}
        <div className="grid grid-cols-2 gap-2.5">
          {trends.map((tr, idx) => {
            const Icon = tr.icon;
            const isActive = activeTrend === idx;
            return (
              <div
                key={idx}
                onClick={() => setActiveTrend(idx)}
                onMouseEnter={() => setActiveTrend(idx)}
                className={`p-3 rounded-xl cursor-pointer transition-all duration-300 ${
                  isActive
                    ? 'pcb-glass-active border-[#00E676] box-glow-green'
                    : 'pcb-glass border-[#00E676]/20 hover:border-[#00E676]/40'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                    isActive ? 'bg-[#00E676] text-black font-bold' : 'bg-[#071214] text-[#00E676]'
                  }`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-mono text-[9px] font-bold text-[#00E676] px-1.5 py-0.5 rounded bg-[#00E676]/10 border border-[#00E676]/30">
                    {tr.tag}
                  </span>
                </div>

                <h4 className="font-mono font-bold text-xs text-white mb-1 truncate">{tr.title}</h4>
                <p className="text-[11px] text-[#B7C2C5] leading-tight line-clamp-2">{tr.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Column: Image Viewer */}
      <div className="flex-1 w-full h-[50vh] lg:h-[70vh] relative z-10 flex items-center justify-center p-4">
        <div className="relative w-full max-w-xl h-full rounded-2xl overflow-hidden border border-[#00E676]/40 pcb-glass shadow-2xl group transition-all duration-500 hover:border-[#00E676]">
          <img
            src="/images/slide13_future_trends.png"
            alt="Future Trends Industry 4.0 Smart Factory"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050B0D] via-transparent to-transparent opacity-80" />
          
          <div className="absolute top-4 left-4 pcb-glass px-3 py-1.5 rounded-lg border border-[#00E676]/30 text-[10px] font-mono text-[#00E676] flex items-center gap-2">
            <ImageIcon className="w-3.5 h-3.5" />
            <span>IMAGE EXHIBIT 13: INDUSTRY 4.0 SMART FACTORY & AI</span>
          </div>

          <div className="absolute bottom-4 left-4 right-4 pcb-glass p-3 rounded-xl border border-[#00E676]/30 backdrop-blur-md">
            <div className="text-xs font-mono font-bold text-white mb-1">SMART FACTORY AI ANALYTICAL DASHBOARD</div>
            <div className="text-[11px] font-mono text-[#00E676]">Micro 008004 Passives, M2M Telemetry & Conformal Substrates</div>
          </div>
        </div>
      </div>
    </div>
  );
};


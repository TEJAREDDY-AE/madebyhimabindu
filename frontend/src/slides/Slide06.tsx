import React, { useState } from 'react';
import { ReflowOvenScene } from '../scenes/ReflowOvenScene';
import { Flame, Thermometer, Activity } from 'lucide-react';
import { SLIDES } from '../data/slidesData';

export const Slide06: React.FC = () => {
  const slideData = SLIDES[5];
  const [activeZone, setActiveZone] = useState<number>(2); // Default Reflow zone

  const zones = [
    {
      name: 'PREHEAT',
      temp: '25°C → 150°C',
      time: '60 - 90 sec',
      color: '#ff9800',
      desc: 'Gradual temperature ramp (1-3°C/sec) evaporates paste solvents and prevents PCB delamination thermal shock.'
    },
    {
      name: 'SOAK',
      temp: '150°C → 200°C',
      time: '60 - 120 sec',
      color: '#ff5722',
      desc: 'Activates flux chemistry to clean surface oxides and equalizes thermal mass across all components.'
    },
    {
      name: 'REFLOW PEAK',
      temp: 'Peak 245°C (TAL)',
      time: '45 - 75 sec',
      color: '#f44336',
      desc: 'Solder paste fully melts (liquidus state), wetting copper pads and component leads to form metallurgical bonds.'
    },
    {
      name: 'COOLING',
      temp: '245°C → 50°C',
      time: '30 - 60 sec',
      color: '#00E676',
      desc: 'Controlled rapid cooling solidifies solder alloy into a fine intermetallic grain structure with high tensile strength.'
    }
  ];

  return (
    <div className="w-full h-full flex flex-col lg:flex-row items-center justify-between px-6 lg:px-16 pt-20 pb-12 relative z-10 select-none">
      {/* Left Column: Technical Description & Interactive Thermal Graph */}
      <div className="flex-1 max-w-xl z-20 flex flex-col justify-center">
        <div className="inline-flex items-center gap-2 pcb-glass px-3 py-1 rounded-full border border-red-500/30 text-[10px] font-mono text-red-400 tracking-wider uppercase mb-3 w-fit">
          <Flame className="w-3 h-3 text-red-400 animate-pulse" />
          <span>{slideData.stageTag}</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-1">
          {slideData.title}
        </h2>
        <h3 className="text-base font-mono font-semibold text-red-400 mb-4">
          {slideData.subtitle}
        </h3>

        {/* Interactive Reflow Profile Thermal Graph */}
        <div className="pcb-glass p-4 rounded-2xl border border-red-500/30 mb-5 shadow-xl">
          <div className="flex items-center justify-between mb-3 text-xs font-mono text-[#B7C2C5]">
            <span className="flex items-center gap-1.5 text-white font-bold">
              <Thermometer className="w-4 h-4 text-red-400" />
              SAC305 REFLOW THERMAL PROFILE
            </span>
            <span className="text-[10px] text-red-400">Peak Temp: 245°C</span>
          </div>

          {/* SVG Profile Chart */}
          <div className="relative w-full h-32 mb-3 bg-[#050b0d] rounded-xl p-2 border border-[#718083]/20">
            <svg className="w-full h-full" viewBox="0 0 400 120">
              {/* Grid Lines */}
              <line x1="0" y1="30" x2="400" y2="30" stroke="#718083" strokeDasharray="3,3" opacity="0.2" />
              <line x1="0" y1="70" x2="400" y2="70" stroke="#718083" strokeDasharray="3,3" opacity="0.2" />

              {/* Thermal Curve Path */}
              <path
                d="M 20 100 L 90 70 L 200 50 L 280 15 L 380 100"
                fill="none"
                stroke="#f44336"
                strokeWidth="3"
                className="drop-shadow-[0_0_8px_rgba(244,67,54,0.6)]"
              />

              {/* Active Zone Point Indicator */}
              {activeZone === 0 && <circle cx="55" cy="85" r="5" fill="#ff9800" className="animate-ping" />}
              {activeZone === 1 && <circle cx="145" cy="60" r="5" fill="#ff5722" className="animate-ping" />}
              {activeZone === 2 && <circle cx="280" cy="15" r="5" fill="#f44336" className="animate-ping" />}
              {activeZone === 3 && <circle cx="330" cy="57" r="5" fill="#00E676" className="animate-ping" />}
            </svg>
          </div>

          {/* Thermal Zone Selector Tabs */}
          <div className="grid grid-cols-4 gap-1.5">
            {zones.map((z, idx) => (
              <button
                key={idx}
                onClick={() => setActiveZone(idx)}
                className={`py-1.5 px-2 rounded-lg font-mono text-[10px] font-bold text-center transition-all ${
                  activeZone === idx
                    ? 'bg-red-500/20 border border-red-500 text-white shadow-md'
                    : 'bg-[#071214] border border-[#718083]/20 text-[#718083] hover:text-white'
                }`}
              >
                {z.name}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Zone Active Card */}
        <div className="pcb-glass p-3.5 rounded-xl border border-red-500/30">
          <div className="flex items-center justify-between mb-1">
            <span className="font-mono font-bold text-sm text-red-400">{zones[activeZone].name}</span>
            <span className="font-mono text-xs text-[#B7C2C5]">{zones[activeZone].temp} ({zones[activeZone].time})</span>
          </div>
          <p className="text-xs text-[#B7C2C5] leading-relaxed">{zones[activeZone].desc}</p>
        </div>
      </div>

      {/* Right Column: 3D Reflow Oven Interactive Chamber Scene */}
      <div className="flex-1 w-full h-[48vh] lg:h-[70vh] relative z-10 flex items-center justify-center">
        <ReflowOvenScene />
      </div>
    </div>
  );
};

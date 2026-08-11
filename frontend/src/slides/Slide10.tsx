import React, { useState } from 'react';
import { ApplicationsScene } from '../scenes/ApplicationsScene';
import { Smartphone, Activity, Car, Check } from 'lucide-react';
import { SLIDES } from '../data/slidesData';

export const Slide10: React.FC = () => {
  const slideData = SLIDES[9];
  const [activeSector, setActiveSector] = useState<'consumer' | 'medical' | 'automotive'>('consumer');

  const sectors = [
    {
      id: 'consumer' as const,
      title: 'Consumer Tech',
      icon: Smartphone,
      subtitle: 'Smartphones, Laptops & Wearables',
      specs: 'Ultra-miniaturized SMT (01005 passives, 0.3mm pitch BGAs) driving compact consumer devices.'
    },
    {
      id: 'medical' as const,
      title: 'Medical Care',
      icon: Activity,
      subtitle: 'Diagnostic Devices & Life Support',
      specs: 'ISO 13485 & IPC Class 3 high-reliability assemblies where failure is not an option.'
    },
    {
      id: 'automotive' as const,
      title: 'Automotive & EV',
      icon: Car,
      subtitle: 'Powertrain, ADAS & LiDAR Modules',
      specs: 'AEC-Q100 certified PCBA engineered for extreme vibration, thermal shock (-40°C to 150°C), and harsh environments.'
    }
  ];

  return (
    <div className="w-full h-full flex flex-col lg:flex-row items-center justify-between px-6 lg:px-16 pt-20 pb-12 relative z-10 select-none">
      {/* Left Column: Sector Selectors & Information */}
      <div className="flex-1 max-w-xl z-20 flex flex-col justify-center">
        <div className="inline-flex items-center gap-2 pcb-glass px-3 py-1 rounded-full border border-[#00E676]/30 text-[10px] font-mono text-[#00E676] tracking-wider uppercase mb-3 w-fit">
          <Activity className="w-3.5 h-3.5 text-[#00E676]" />
          <span>{slideData.stageTag}</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
          {slideData.title}
        </h2>
        <h3 className="text-base font-mono font-semibold text-[#00E676] mb-4">
          {slideData.subtitle}
        </h3>

        <p className="text-xs sm:text-sm text-[#B7C2C5] leading-relaxed mb-6">
          {slideData.description}
        </p>

        {/* 3 Sector Selectors */}
        <div className="space-y-3">
          {sectors.map((sec) => {
            const Icon = sec.icon;
            const isActive = activeSector === sec.id;
            return (
              <div
                key={sec.id}
                onClick={() => setActiveSector(sec.id)}
                className={`p-4 rounded-xl transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'pcb-glass-active border-[#00E676] box-glow-green'
                    : 'pcb-glass border-[#00E676]/20 hover:border-[#00E676]/40'
                }`}
              >
                <div className="flex items-center gap-3 mb-1">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    isActive ? 'bg-[#00E676] text-black font-bold' : 'bg-[#071214] text-[#00E676]'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-mono font-bold text-sm text-white">{sec.title}</h4>
                    <p className="text-[11px] font-mono text-[#00E676]">{sec.subtitle}</p>
                  </div>
                </div>
                <p className="text-xs text-[#B7C2C5] mt-2 leading-relaxed">{sec.specs}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Column: 3D Applications Scene */}
      <div className="flex-1 w-full h-[50vh] lg:h-[70vh] relative z-10 flex items-center justify-center">
        <ApplicationsScene activeSector={activeSector} />
      </div>
    </div>
  );
};

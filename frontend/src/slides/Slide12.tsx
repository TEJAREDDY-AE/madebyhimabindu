import React, { useState } from 'react';
import { Award, Leaf, Shield, CheckCircle2 } from 'lucide-react';
import { SLIDES } from '../data/slidesData';

export const Slide12: React.FC = () => {
  const slideData = SLIDES[11];
  const [activeClass, setActiveClass] = useState<number>(2); // Default Class 3

  const ipcClasses = [
    {
      classNum: 'CLASS 1',
      title: 'General Electronic Products',
      desc: 'Includes consumer electronics (toys, basic gadgets) where major requirement is function of completed assembly.'
    },
    {
      classNum: 'CLASS 2',
      title: 'Dedicated Service Electronics',
      desc: 'Includes communications equipment & business machines where uninterrupted service is desired but not critical.'
    },
    {
      classNum: 'CLASS 3',
      title: 'High Performance / Harsh Environment',
      desc: 'Includes aerospace, life-support medical devices & automotive systems where equipment downtime cannot be tolerated.'
    }
  ];

  return (
    <div className="w-full h-full flex flex-col justify-center px-6 lg:px-16 pt-20 pb-12 relative z-10 select-none">
      <div className="max-w-3xl mb-6">
        <div className="inline-flex items-center gap-2 pcb-glass px-3 py-1 rounded-full border border-[#00E676]/30 text-[10px] font-mono text-[#00E676] tracking-wider uppercase mb-3">
          <Award className="w-3.5 h-3.5 text-[#00E676]" />
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

      {/* IPC Class Explorer Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 max-w-4xl">
        {ipcClasses.map((cls, idx) => (
          <div
            key={idx}
            onClick={() => setActiveClass(idx)}
            className={`p-5 rounded-2xl cursor-pointer transition-all duration-300 ${
              activeClass === idx
                ? 'pcb-glass-active border-[#00E676] box-glow-green'
                : 'pcb-glass border-[#00E676]/20 hover:border-[#00E676]/40'
            }`}
          >
            <span className="font-mono font-extrabold text-xs text-[#00E676] px-2 py-0.5 rounded bg-[#00E676]/10 border border-[#00E676]/30 mb-2 inline-block">
              {cls.classNum}
            </span>
            <h4 className="font-bold text-white text-base mb-2">{cls.title}</h4>
            <p className="text-xs text-[#B7C2C5] leading-relaxed">{cls.desc}</p>
          </div>
        ))}
      </div>

      {/* Compliance Standards Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-4xl">
        <div className="pcb-glass p-3.5 rounded-xl border border-[#00E676]/20 flex items-center gap-3">
          <Leaf className="w-5 h-5 text-[#00E676] shrink-0" />
          <div>
            <div className="font-mono text-xs font-bold text-white">RoHS 3 Lead-Free</div>
            <div className="text-[11px] text-[#B7C2C5]">SAC305 Alloy Transition</div>
          </div>
        </div>

        <div className="pcb-glass p-3.5 rounded-xl border border-[#00E676]/20 flex items-center gap-3">
          <Shield className="w-5 h-5 text-[#19FF88] shrink-0" />
          <div>
            <div className="font-mono text-xs font-bold text-white">ESD ANSI/ESD S20.20</div>
            <div className="text-[11px] text-[#B7C2C5]">Grounding & Static Control</div>
          </div>
        </div>

        <div className="pcb-glass p-3.5 rounded-xl border border-[#00E676]/20 flex items-center gap-3">
          <Award className="w-5 h-5 text-[#00D66B] shrink-0" />
          <div>
            <div className="font-mono text-xs font-bold text-white">ISO 9001:2015</div>
            <div className="text-[11px] text-[#B7C2C5]">Quality Management System</div>
          </div>
        </div>
      </div>
    </div>
  );
};

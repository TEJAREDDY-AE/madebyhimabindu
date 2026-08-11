import React, { useState } from 'react';
import { Award, Leaf, Shield, Image as ImageIcon } from 'lucide-react';
import { SLIDES } from '../data/slidesData';

export const Slide12: React.FC = () => {
  const slideData = SLIDES[11];
  const [activeClass, setActiveClass] = useState<number>(2); // Default Class 3

  const ipcClasses = [
    {
      classNum: 'CLASS 1',
      title: 'General Electronic Products',
      desc: 'Consumer electronics where basic function of assembly is required.'
    },
    {
      classNum: 'CLASS 2',
      title: 'Dedicated Service',
      desc: 'Communications & office equipment where uninterrupted service is desired.'
    },
    {
      classNum: 'CLASS 3',
      title: 'High Performance Mission Critical',
      desc: 'Aerospace, medical & automotive systems where downtime cannot be tolerated.'
    }
  ];

  return (
    <div className="w-full h-full flex flex-col lg:flex-row items-center justify-between px-6 lg:px-16 pt-20 pb-12 relative z-10 select-none">
      {/* Left Column: Technical Description & Standards */}
      <div className="flex-1 max-w-xl z-20 flex flex-col justify-center">
        <div className="inline-flex items-center gap-2 pcb-glass px-3 py-1 rounded-full border border-[#00E676]/30 text-[10px] font-mono text-[#00E676] tracking-wider uppercase mb-3 w-fit">
          <Award className="w-3.5 h-3.5 text-[#00E676]" />
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

        {/* IPC Class Explorer Tabs */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {ipcClasses.map((cls, idx) => (
            <div
              key={idx}
              onClick={() => setActiveClass(idx)}
              className={`p-3 rounded-xl cursor-pointer transition-all duration-300 ${
                activeClass === idx
                  ? 'pcb-glass-active border-[#00E676] box-glow-green'
                  : 'pcb-glass border-[#00E676]/20 hover:border-[#00E676]/40'
              }`}
            >
              <span className="font-mono font-bold text-[10px] text-[#00E676] block mb-1">
                {cls.classNum}
              </span>
              <h4 className="font-bold text-white text-xs mb-1 truncate">{cls.title}</h4>
              <p className="text-[11px] text-[#B7C2C5] leading-tight">{cls.desc}</p>
            </div>
          ))}
        </div>

        {/* Compliance Standards Badges */}
        <div className="grid grid-cols-3 gap-2">
          <div className="pcb-glass p-2.5 rounded-xl border border-[#00E676]/20 flex items-center gap-2">
            <Leaf className="w-4 h-4 text-[#00E676] shrink-0" />
            <div>
              <div className="font-mono text-xs font-bold text-white">RoHS 3</div>
              <div className="text-[10px] text-[#B7C2C5]">Lead-Free</div>
            </div>
          </div>

          <div className="pcb-glass p-2.5 rounded-xl border border-[#00E676]/20 flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#19FF88] shrink-0" />
            <div>
              <div className="font-mono text-xs font-bold text-white">ESD Safe</div>
              <div className="text-[10px] text-[#B7C2C5]">ANSI S20.20</div>
            </div>
          </div>

          <div className="pcb-glass p-2.5 rounded-xl border border-[#00E676]/20 flex items-center gap-2">
            <Award className="w-4 h-4 text-[#00D66B] shrink-0" />
            <div>
              <div className="font-mono text-xs font-bold text-white">ISO 9001</div>
              <div className="text-[10px] text-[#B7C2C5]">Quality QMS</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Image Viewer */}
      <div className="flex-1 w-full h-[50vh] lg:h-[70vh] relative z-10 flex items-center justify-center p-4">
        <div className="relative w-full max-w-xl h-full rounded-2xl overflow-hidden border border-[#00E676]/40 pcb-glass shadow-2xl group transition-all duration-500 hover:border-[#00E676]">
          <img
            src="/images/slide12_standards.png"
            alt="IPC Standards & Compliance Certification"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050B0D] via-transparent to-transparent opacity-80" />
          
          <div className="absolute top-4 left-4 pcb-glass px-3 py-1.5 rounded-lg border border-[#00E676]/30 text-[10px] font-mono text-[#00E676] flex items-center gap-2">
            <ImageIcon className="w-3.5 h-3.5" />
            <span>IMAGE EXHIBIT 12: GOVERNANCE & COMPLIANCE BADGES</span>
          </div>

          <div className="absolute bottom-4 left-4 right-4 pcb-glass p-3 rounded-xl border border-[#00E676]/30 backdrop-blur-md">
            <div className="text-xs font-mono font-bold text-white mb-1">IPC-A-610 CLASS 3 CERTIFIED QUALITY</div>
            <div className="text-[11px] font-mono text-[#00E676]">RoHS 3 Compliant Lead-Free Alloy & ANSI/ESD S20.20 Protocol</div>
          </div>
        </div>
      </div>
    </div>
  );
};


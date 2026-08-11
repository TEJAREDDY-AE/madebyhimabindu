import React, { useState } from 'react';
import { QualityControlScene } from '../scenes/QualityControlScene';
import { Eye, ShieldCheck, Zap, CheckCircle2 } from 'lucide-react';
import { SLIDES } from '../data/slidesData';

export const Slide09: React.FC = () => {
  const slideData = SLIDES[8];
  const [activeTab, setActiveTab] = useState<'xray' | 'fct' | 'validation'>('xray');

  return (
    <div className="w-full h-full flex flex-col lg:flex-row items-center justify-between px-6 lg:px-16 pt-20 pb-12 relative z-10 select-none">
      {/* Left Column: Technical Description & Interactive Tabs */}
      <div className="flex-1 max-w-xl z-20 flex flex-col justify-center">
        <div className="inline-flex items-center gap-2 pcb-glass px-3 py-1 rounded-full border border-[#00E676]/30 text-[10px] font-mono text-[#00E676] tracking-wider uppercase mb-3 w-fit">
          <ShieldCheck className="w-3.5 h-3.5 text-[#00E676]" />
          <span>{slideData.stageTag}</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
          {slideData.title}
        </h2>
        <h3 className="text-base font-mono font-semibold text-[#00E676] mb-3">
          {slideData.subtitle}
        </h3>
        <p className="text-xs sm:text-sm text-[#B7C2C5] leading-relaxed mb-5">
          {slideData.description}
        </p>

        {/* 3 Interactive Mode Tabs */}
        <div className="flex flex-col sm:flex-row gap-2 mb-4">
          <button
            onClick={() => setActiveTab('xray')}
            className={`px-4 py-2.5 rounded-xl font-mono text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'xray'
                ? 'bg-[#00E676] text-black shadow-[0_0_20px_rgba(0,230,118,0.4)]'
                : 'pcb-glass border-[#00E676]/30 text-[#B7C2C5] hover:text-white'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>01. X-RAY (AXI)</span>
          </button>

          <button
            onClick={() => setActiveTab('fct')}
            className={`px-4 py-2.5 rounded-xl font-mono text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'fct'
                ? 'bg-[#00E676] text-black shadow-[0_0_20px_rgba(0,230,118,0.4)]'
                : 'pcb-glass border-[#00E676]/30 text-[#B7C2C5] hover:text-white'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>02. FUNCTIONAL (FCT)</span>
          </button>

          <button
            onClick={() => setActiveTab('validation')}
            className={`px-4 py-2.5 rounded-xl font-mono text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'validation'
                ? 'bg-[#00E676] text-black shadow-[0_0_20px_rgba(0,230,118,0.4)]'
                : 'pcb-glass border-[#00E676]/30 text-[#B7C2C5] hover:text-white'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>03. VALIDATION</span>
          </button>
        </div>

        {/* Selected Mode Info Card */}
        <div className="pcb-glass p-5 rounded-2xl border border-[#00E676]/40 shadow-xl">
          {activeTab === 'xray' && (
            <div>
              <div className="text-xs font-mono text-[#00E676] font-bold uppercase mb-1">
                TRANSMISSIVE X-RAY TOMOGRAPHY
              </div>
              <h4 className="text-base font-bold text-white mb-2">Hidden BGA Solder Joint Verification</h4>
              <p className="text-xs text-[#B7C2C5] leading-relaxed mb-3">
                Penetrates silicon packages to inspect hidden BGA solder balls, detecting diameter variations, solder bridging, and internal void percentage.
              </p>
              <div className="p-2.5 rounded-xl bg-black/50 border border-[#00E676]/30 font-mono text-xs text-[#00E676]">
                AXI TELEMETRY: 4.2% Area Void (Threshold &lt; 15% PASS)
              </div>
            </div>
          )}

          {activeTab === 'fct' && (
            <div>
              <div className="text-xs font-mono text-[#00E676] font-bold uppercase mb-1">
                BED-OF-NAILS & FLYING PROBE TEST
              </div>
              <h4 className="text-base font-bold text-white mb-2">Full Electrical Signal Telemetry</h4>
              <p className="text-xs text-[#B7C2C5] leading-relaxed mb-3">
                Spring-loaded pogo pins inject test signals and analog voltages to verify power rails, clock frequency, and bus communication.
              </p>
              <div className="p-2.5 rounded-xl bg-black/50 border border-[#00E676]/30 font-mono text-xs text-[#19FF88]">
                FCT TELEMETRY: 3.3V / 5.0V Rails OK • 100 MHz Clock PASS
              </div>
            </div>
          )}

          {activeTab === 'validation' && (
            <div>
              <div className="text-xs font-mono text-[#00E676] font-bold uppercase mb-1">
                FINAL END-OF-LINE CERTIFICATION
              </div>
              <h4 className="text-base font-bold text-white mb-2">IPC-A-610 Class 3 Verification</h4>
              <p className="text-xs text-[#B7C2C5] leading-relaxed mb-3">
                100% certified quality gate validation confirming assembly compliance for mission-critical aerospace and medical applications.
              </p>
              <div className="p-2.5 rounded-xl bg-black/50 border border-[#00E676]/30 font-mono text-xs text-[#00E676] font-bold">
                STATUS: PASSED CLASS 3 HIGH-RELIABILITY SPECIFICATION
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Column: 3D Quality Control Scene */}
      <div className="flex-1 w-full h-[50vh] lg:h-[70vh] relative z-10 flex items-center justify-center">
        <QualityControlScene activeTab={activeTab} />
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { Cpu, Play } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Loading 3D Environment...');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsReady(true);
          setStatusText('SYSTEM READY');
          return 100;
        }

        if (prev === 25) setStatusText('Loading Manufacturing Models...');
        if (prev === 55) setStatusText('Loading Process Telemetry...');
        if (prev === 85) setStatusText('Initializing 3D Shaders...');

        return prev + 5;
      });
    }, 40);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-[#050B0D] flex flex-col items-center justify-center p-6 select-none">
      {/* PCB Trace Background Graphic */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-radial-pcb flex items-center justify-center">
        <svg className="w-full h-full max-w-4xl" viewBox="0 0 800 600" fill="none">
          <path
            d="M100 100 H300 L400 200 V400 L500 500 H700"
            stroke="#00E676"
            strokeWidth="2"
            className="animate-pcb-trace"
          />
          <path
            d="M700 100 H500 L400 200 V400 L300 500 H100"
            stroke="#00E676"
            strokeWidth="2"
            className="animate-pcb-trace"
            style={{ animationDelay: '1.5s' }}
          />
          <circle cx="400" cy="200" r="6" fill="#00E676" className="animate-ping" />
          <circle cx="400" cy="400" r="6" fill="#00E676" className="animate-ping" />
        </svg>
      </div>

      <div className="relative z-10 max-w-md w-full pcb-glass p-8 rounded-3xl border border-[#00E676]/40 shadow-2xl flex flex-col items-center text-center">
        <div className="relative mb-6">
          <div className="w-20 h-20 rounded-2xl bg-[#071214] border-2 border-[#00E676]/60 flex items-center justify-center shadow-[0_0_30px_rgba(0,230,118,0.3)]">
            <Cpu className="w-10 h-10 text-[#00E676] animate-pulse" />
          </div>
          <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#00E676] flex items-center justify-center text-black font-bold text-[10px]">
            3D
          </div>
        </div>

        <h1 className="text-xl font-mono font-bold tracking-wider text-white uppercase mb-1 flex items-center gap-2">
          <span>PCBA SYSTEM INITIALIZING</span>
        </h1>
        <p className="text-xs text-[#B7C2C5] font-sans mb-6">
          Automated Precision Manufacturing Guide
        </p>

        {/* Progress Bar */}
        <div className="w-full bg-[#071214] h-2.5 rounded-full overflow-hidden mb-3 border border-[#00E676]/20 p-0.5">
          <div
            className="h-full bg-gradient-to-r from-[#00D66B] to-[#00E676] rounded-full transition-all duration-150 shadow-[0_0_12px_#00E676]"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="w-full flex items-center justify-between font-mono text-xs text-[#718083] mb-6">
          <span className="text-[#00E676] font-medium">{statusText}</span>
          <span className="font-bold text-white">{progress}%</span>
        </div>

        {isReady ? (
          <button
            onClick={onComplete}
            className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#00D66B] to-[#00E676] text-black font-mono font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(0,230,118,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            <Play className="w-4 h-4 fill-black" />
            <span>START 3D PRESENTATION</span>
          </button>
        ) : (
          <div className="flex items-center gap-2 text-xs font-mono text-[#718083]">
            <span className="w-2 h-2 rounded-full bg-[#00E676] animate-ping" />
            <span>Loading interactive 3D environment...</span>
          </div>
        )}
      </div>
    </div>
  );
};

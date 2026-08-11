import React from 'react';
import { ChevronUp, ChevronDown, Cpu, Sun, Moon } from 'lucide-react';
import { SLIDES } from '../data/slidesData';

interface NavigationProps {
  currentSlide: number;
  totalSlides: number;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onGoToSlide: (index: number) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentSlide,
  totalSlides,
  theme,
  onToggleTheme,
  onGoToSlide,
  onNext,
  onPrev,
}) => {
  const progressPercent = ((currentSlide + 1) / totalSlides) * 100;
  const isEnding = currentSlide >= totalSlides;

  return (
    <>
      {/* Top Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-[3px] bg-black/40 z-50 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#00D66B] via-[#00E676] to-[#19FF88] transition-all duration-500 ease-out shadow-[0_0_12px_#00E676]"
          style={{ width: `${isEnding ? 100 : progressPercent}%` }}
        />
      </div>

      {/* Floating Header */}
      <header className="fixed top-6 left-6 right-6 z-40 flex items-center justify-between pointer-events-none">
        {/* Top-Left: Brand & Title */}
        <div className="pointer-events-auto flex items-center gap-3 pcb-glass px-4 py-2.5 rounded-xl border border-[#00E676]/30 shadow-2xl">
          <div className="w-8 h-8 rounded-lg bg-[#00E676]/15 flex items-center justify-center border border-[#00E676]/40">
            <Cpu className="w-5 h-5 text-[#00E676] animate-pulse" />
          </div>
          <div>
            <div className="text-xs font-mono font-bold tracking-widest text-[#00E676] uppercase flex items-center gap-1.5">
              <span>PCB ASSEMBLY</span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#00E676] animate-ping" />
            </div>
            <div className="text-[11px] opacity-80 font-sans font-medium">
              Processes & Stages Guide
            </div>
          </div>
        </div>

        {/* Top-Right: Slide Counter & Theme Toggle Button */}
        <div className="pointer-events-auto flex items-center gap-3">
          {/* THEME TOGGLE SWITCH BUTTON (LIGHT / DARK) */}
          <button
            onClick={onToggleTheme}
            className="pcb-glass px-3.5 py-2 rounded-xl border border-[#00E676]/30 hover:border-[#00E676] flex items-center gap-2 text-xs font-mono font-bold transition-all duration-200 group shadow-lg"
            title={`Switch to ${theme === 'dark' ? 'Light Clean Mode' : 'Dark PCB Mode'}`}
          >
            {theme === 'dark' ? (
              <>
                <Sun className="w-4 h-4 text-amber-400 group-hover:rotate-45 transition-transform" />
                <span className="hidden sm:inline text-[#00E676]">LIGHT MODE</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-[#00E676] group-hover:-rotate-12 transition-transform" />
                <span className="hidden sm:inline text-[#00E676]">DARK MODE</span>
              </>
            )}
          </button>

          {/* Slide Counter */}
          <div className="pcb-glass px-4 py-2 rounded-xl border border-[#00E676]/20 text-xs font-mono font-semibold flex items-center gap-2 shadow-lg">
            <span className="text-[#00E676] font-bold text-sm">
              {isEnding ? 'END' : String(currentSlide + 1).padStart(2, '0')}
            </span>
            <span className="opacity-40">/</span>
            <span className="opacity-80">{String(totalSlides).padStart(2, '0')}</span>
          </div>

          <div className="hidden lg:flex pcb-glass px-3 py-1.5 rounded-xl border border-[#00E676]/20 text-[11px] font-mono items-center gap-2 shadow-lg">
            <kbd className="px-1.5 py-0.5 rounded bg-black/20 border border-[#00E676]/30 text-[#00E676] text-[10px]">
              ↑ ↓
            </kbd>
            <span className="opacity-80">Scroll / Arrows to navigate</span>
          </div>
        </div>
      </header>

      {/* Floating Right Slide Selector */}
      <nav aria-label="Slide Selector" className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-2 pointer-events-auto pcb-glass px-2.5 py-4 rounded-2xl border border-[#00E676]/20 shadow-2xl">
        {SLIDES.map((slide, idx) => {
          const isActive = idx === currentSlide;
          return (
            <button
              key={slide.id}
              onClick={() => onGoToSlide(idx)}
              title={`Go to Slide ${slide.slideNumber}: ${slide.title}`}
              className={`group relative flex items-center justify-center transition-all duration-300 ${
                isActive
                  ? 'w-9 h-9 rounded-xl bg-[#00E676]/20 border border-[#00E676] text-[#00E676] font-mono font-bold text-xs shadow-[0_0_15px_rgba(0,230,118,0.4)]'
                  : 'w-7 h-7 rounded-lg hover:bg-black/10 opacity-60 hover:opacity-100 font-mono text-[11px]'
              }`}
            >
              <span>{slide.slideNumber}</span>

              <div className="absolute right-12 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap pcb-glass px-3 py-1.5 rounded-lg border border-[#00E676]/40 text-xs font-sans shadow-2xl">
                <span className="text-[#00E676] font-mono font-bold mr-1.5">
                  {slide.slideNumber}.
                </span>
                {slide.title}
              </div>
            </button>
          );
        })}
      </nav>

      {/* Floating Bottom-Right Prev/Next Buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2 pointer-events-auto">
        <button
          onClick={onPrev}
          disabled={currentSlide === 0}
          className="p-3 rounded-xl pcb-glass border border-[#00E676]/30 disabled:opacity-30 disabled:border-gray-500 disabled:cursor-not-allowed hover:border-[#00E676] hover:bg-[#00E676]/10 transition-all duration-200 group shadow-lg"
          title="Previous Slide (Arrow Up / Left)"
        >
          <ChevronUp className="w-5 h-5 text-[#00E676] group-hover:scale-110 transition-transform" />
        </button>
        <button
          onClick={onNext}
          disabled={currentSlide >= totalSlides}
          className="p-3 rounded-xl pcb-glass border border-[#00E676]/30 disabled:opacity-30 disabled:border-gray-500 disabled:cursor-not-allowed hover:border-[#00E676] hover:bg-[#00E676]/10 transition-all duration-200 group shadow-lg"
          title="Next Slide (Arrow Down / Right / Space)"
        >
          <ChevronDown className="w-5 h-5 text-[#00E676] group-hover:scale-110 transition-transform" />
        </button>
      </div>
    </>
  );
};

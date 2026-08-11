import React, { useState, useEffect, useCallback, useRef } from 'react';
import { SLIDES } from './data/slidesData';

// Core UI & Background Components
import { BackgroundCanvas } from './scenes/BackgroundCanvas';
import { Navigation } from './components/Navigation';
import { TechnicalHUD } from './components/TechnicalHUD';
import { LoadingScreen } from './components/LoadingScreen';

// 13 Presentation Slides & Ending View
import { Slide01 } from './slides/Slide01';
import { Slide02 } from './slides/Slide02';
import { Slide03 } from './slides/Slide03';
import { Slide04 } from './slides/Slide04';
import { Slide05 } from './slides/Slide05';
import { Slide06 } from './slides/Slide06';
import { Slide07 } from './slides/Slide07';
import { Slide08 } from './slides/Slide08';
import { Slide09 } from './slides/Slide09';
import { Slide10 } from './slides/Slide10';
import { Slide11 } from './slides/Slide11';
import { Slide12 } from './slides/Slide12';
import { Slide13 } from './slides/Slide13';
import { EndingSlide } from './slides/EndingSlide';

export function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  const totalSlides = SLIDES.length;
  const isScrollingRef = useRef(false);
  const touchStartYRef = useRef(0);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  const goToSlide = useCallback(
    (index: number) => {
      const clampedIndex = Math.max(0, Math.min(index, totalSlides));
      setCurrentSlide(clampedIndex);
    },
    [totalSlides]
  );

  const handleNext = useCallback(() => {
    setCurrentSlide((prev) => Math.min(prev + 1, totalSlides));
  }, [totalSlides]);

  const handlePrev = useCallback(() => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  }, []);

  // Mouse Wheel Navigation Handler
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isLoading) return;

      if (isScrollingRef.current) return;
      isScrollingRef.current = true;

      if (e.deltaY > 30) {
        handleNext();
      } else if (e.deltaY < -30) {
        handlePrev();
      }

      setTimeout(() => {
        isScrollingRef.current = false;
      }, 700);
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [isLoading, handleNext, handlePrev]);

  // Keyboard Navigation Handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isLoading) return;

      if (['ArrowDown', 'ArrowRight', 'PageDown', ' '].includes(e.key)) {
        e.preventDefault();
        handleNext();
      } else if (['ArrowUp', 'ArrowLeft', 'PageUp'].includes(e.key)) {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'Home') {
        e.preventDefault();
        goToSlide(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        goToSlide(totalSlides);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLoading, handleNext, handlePrev, goToSlide, totalSlides]);

  // Mobile Touch Swipe Navigation
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartYRef.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isLoading) return;
      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartYRef.current - touchEndY;

      if (deltaY > 50) {
        handleNext();
      } else if (deltaY < -50) {
        handlePrev();
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isLoading, handleNext, handlePrev]);

  const renderSlideContent = () => {
    switch (currentSlide) {
      case 0:
        return <Slide01 onNext={handleNext} />;
      case 1:
        return <Slide02 />;
      case 2:
        return <Slide03 />;
      case 3:
        return <Slide04 />;
      case 4:
        return <Slide05 />;
      case 5:
        return <Slide06 />;
      case 6:
        return <Slide07 />;
      case 7:
        return <Slide08 />;
      case 8:
        return <Slide09 />;
      case 9:
        return <Slide10 />;
      case 10:
        return <Slide11 />;
      case 11:
        return <Slide12 />;
      case 12:
        return <Slide13 />;
      case 13:
        return <EndingSlide onRestart={() => goToSlide(0)} />;
      default:
        return <Slide01 onNext={handleNext} />;
    }
  };

  return (
    <main className={`w-screen h-screen overflow-hidden relative font-sans select-none ${theme === 'light' ? 'light-theme bg-[#EEF3F0] text-[#0A1B14]' : 'bg-[#050B0D] text-white'}`}>
      {/* Boot Loading Screen */}
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      {/* Ambient 3D Background Canvas */}
      <BackgroundCanvas theme={theme} />

      {/* Presentation Header Navigation with Light/Dark Theme Switcher */}
      {!isLoading && (
        <Navigation
          currentSlide={currentSlide}
          totalSlides={totalSlides}
          theme={theme}
          onToggleTheme={toggleTheme}
          onGoToSlide={goToSlide}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      )}

      {/* Technical Industrial Overlay HUD */}
      {!isLoading && (
        <TechnicalHUD currentSlide={currentSlide} totalSlides={totalSlides} />
      )}

      {/* Main Full-Screen Presentation Scene Container */}
      <div className="w-full h-full relative z-10">
        <div key={currentSlide} className="w-full h-full animate-fadeIn transition-opacity duration-500">
          {renderSlideContent()}
        </div>
      </div>
    </main>
  );
}

export default App;

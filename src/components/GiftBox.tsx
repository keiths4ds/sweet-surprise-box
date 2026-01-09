import { useState } from 'react';
import ConfettiBurst from './ConfettiBurst';

interface GiftBoxProps {
  onOpen: () => void;
}

/**
 * GiftBox Component
 * 
 * Displays a shaking gift box that opens on click.
 * Triggers confetti burst animation when opened.
 * The box contains the birthday message and ribbon decoration.
 * 
 * CUSTOMIZATION:
 * - Change the birthday message text below
 * - Modify ribbon colors in the design system (src/index.css)
 */

const GiftBox = ({ onOpen }: GiftBoxProps) => {
  const [isOpening, setIsOpening] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleClick = () => {
    if (isOpening) return; // Prevent double-click
    
    setIsOpening(true);
    setShowConfetti(true); // Trigger confetti burst
    
    // Delay the callback to allow animation to play
    setTimeout(onOpen, 800);
  };

  return (
    <>
      {/* Confetti burst - triggers once on open */}
      <ConfettiBurst trigger={showConfetti} />
      
      <div
        onClick={handleClick}
        className={`
          gift-box
          w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96
          rounded-3xl
          flex flex-col items-center justify-center
          cursor-pointer
          ${isOpening ? 'animate-gift-open' : 'animate-shake'}
          relative
          overflow-hidden
        `}
      >
        {/* Ribbon Horizontal */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-full h-8 bg-rose opacity-80 animate-ribbon" />
        </div>
        
        {/* Ribbon Vertical */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-8 h-full bg-rose opacity-80 animate-ribbon" />
        </div>
        
        {/* Bow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10">
          <div className="relative">
            {/* Left loop */}
            <div className="absolute -left-8 -top-4 w-8 h-6 bg-love-pink rounded-full rotate-[-30deg] opacity-90" />
            {/* Right loop */}
            <div className="absolute -right-8 -top-4 w-8 h-6 bg-love-pink rounded-full rotate-[30deg] opacity-90" />
            {/* Center knot */}
            <div className="w-5 h-5 bg-rose rounded-full relative z-10" />
            {/* Tails */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 flex gap-1">
              <div className="w-2 h-10 bg-love-pink rounded-b-full rotate-[-15deg] opacity-80" />
              <div className="w-2 h-10 bg-love-pink rounded-b-full rotate-[15deg] opacity-80" />
            </div>
          </div>
        </div>

        {/* Content Container - appears above ribbon */}
        <div className="relative z-20 bg-card/95 backdrop-blur-sm px-6 py-8 rounded-2xl mx-4 text-center shadow-lg">
          {/* ========== BIRTHDAY MESSAGE - CHANGE TEXT HERE ========== */}
          {/* Lemon Milk heading via font-heading */}
          <h1 className="font-heading text-xl sm:text-2xl md:text-3xl text-primary-foreground leading-tight tracking-wide">
            Happiest Birthday to
            <br />
            <span className="text-rose">My Sweet Sweet Pie</span>
          </h1>
          {/* =========================================================== */}
          
          {/* Emoji decorations */}
          <div className="mt-4 text-3xl sm:text-4xl flex justify-center gap-2">
            <span className="animate-pulse-glow">🎂</span>
            <span className="animate-pulse-glow" style={{ animationDelay: '0.5s' }}>💚</span>
          </div>
          
          {/* Hint text - Manrope via font-body */}
          <p className="mt-4 text-sm text-muted-foreground font-body opacity-70">
            Click to open your gift ✨
          </p>
        </div>

        {/* Corner sparkles */}
        <div className="absolute top-4 left-4 text-2xl animate-sparkle" style={{ animationDelay: '0s' }}>✨</div>
        <div className="absolute top-4 right-4 text-2xl animate-sparkle" style={{ animationDelay: '0.5s' }}>💫</div>
        <div className="absolute bottom-4 left-4 text-2xl animate-sparkle" style={{ animationDelay: '1s' }}>💖</div>
        <div className="absolute bottom-4 right-4 text-2xl animate-sparkle" style={{ animationDelay: '1.5s' }}>🌟</div>
      </div>
    </>
  );
};

export default GiftBox;

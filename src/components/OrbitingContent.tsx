import { useState, useEffect } from 'react';
import Polaroid from './Polaroid';

/**
 * =============================================================================
 * ORBITING CONTENT - CUSTOMIZATION GUIDE
 * =============================================================================
 * 
 * PHOTOS + CAPTIONS:
 * - Exactly 5 photo+caption pairs are displayed
 * - Each photo has one caption that moves with it
 * - To use your own images: import photo1 from '@/assets/photo1.jpg';
 * 
 * YOUTUBE VIDEO:
 * - Change YOUTUBE_EMBED_URL to your video's embed link
 * - Format: https://www.youtube.com/embed/YOUR_VIDEO_ID
 * 
 * ORBIT SETTINGS:
 * - ORBIT_DURATION: Time for one full rotation (default: 25s)
 * - Orbit radius is set in index.css via --photo-orbit-radius
 * =============================================================================
 */

// ========== YOUTUBE VIDEO URL ==========
const YOUTUBE_EMBED_URL = 'https://www.youtube.com/embed/dQw4w9WgXcQ';

// ========== ORBIT ANIMATION DURATION (seconds) ==========
const ORBIT_DURATION = 25;

// ========== SMILE BUTTON DELAY (seconds after reveal) ==========
const SMILE_BUTTON_DELAY = 7;

// ==========================================================================
// EXACTLY 5 PHOTO + CAPTION PAIRS - CUSTOMIZE HERE
// ==========================================================================
const photoItems = [
  {
    id: 1,
    src: '/pictures/21st Sept.jpeg',
    alt: 'Memory 1',
    caption: '67',
  },
  {
    id: 2,
    src: '/pictures/Beach.jpeg',
    alt: 'Memory 2',
    caption: 'Princess fr (iykyk)',
  },
  {
    id: 3,
    src: '/pictures/Churchgate.jpeg',
    alt: 'Memory 3',
    caption: 'My Christmas definitely came early',
  },
  {
    id: 4,
    src: '/pictures/Flowers.jpeg',
    alt: 'Memory 4',
    caption: 'The Prettiest Lady',
  },
  {
    id: 5,
    src: '/pictures/NMIMS_smile.jpeg',
    alt: 'Memory 5',
    caption: 'We got our photo together :)',
  },
];

// ==========================================================================
// "IF YOU'RE SMILING" MESSAGE - CUSTOMIZE HERE
// ==========================================================================
const SMILE_BUTTON_TEXT = "If you're smiling right now, click this 💚";
const SMILE_MESSAGE_LINE1 = "Good. That's all I wanted today.";
const SMILE_MESSAGE_LINE2 = "— Key 💚";
const SMILE_CONTINUE_HINT = "Click anywhere to continue";

const OrbitingContent = () => {
  // 5 photos with 72° spacing (360/5)
  const angleGap = 360 / photoItems.length;
  
  // ========== SMILE INTERACTION STATE ==========
  // showButton: delayed appearance after reveal
  // isOrbitPaused: controls animation pause/resume
  // showSmileMessage: controls message visibility
  const [showButton, setShowButton] = useState(false);
  const [isOrbitPaused, setIsOrbitPaused] = useState(false);
  const [showSmileMessage, setShowSmileMessage] = useState(false);

  // ========== DELAYED BUTTON APPEARANCE ==========
  // Button appears 7 seconds after component mounts (reveal animations finish)
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, SMILE_BUTTON_DELAY * 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // ========== PAUSE ORBIT & SHOW MESSAGE ==========
  const handleSmileClick = () => {
    setIsOrbitPaused(true);
    setShowSmileMessage(true);
  };

  // ========== RESUME ORBIT & HIDE MESSAGE ==========
  const handleContinueClick = () => {
    setShowSmileMessage(false);
    setIsOrbitPaused(false);
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      
      {/* Subtle background hearts */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute text-love-pink opacity-10 animate-float"
            style={{
              left: `${10 + (i * 10) % 80}%`,
              top: `${10 + (i * 12) % 80}%`,
              fontSize: `${14 + (i % 3) * 4}px`,
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${5 + (i % 3) * 2}s`,
            }}
          >
            💕
          </div>
        ))}
      </div>

      {/* Title at top - Lemon Milk heading */}
      <div className="absolute top-6 sm:top-10 left-1/2 -translate-x-1/2 text-center z-20 px-4">
        <h1 className="font-heading text-xl sm:text-2xl md:text-3xl lg:text-4xl text-primary-foreground drop-shadow-sm tracking-wide">
          Happy Birthday! 🎂💚
        </h1>
        <p className="font-body text-muted-foreground mt-2 text-sm sm:text-base">
          To the most amazing person in my life
        </p>
      </div>

      {/* ========== MAIN ORBIT CONTAINER ========== */}
      <div className="relative flex items-center justify-center">
        
        {/* ========== YOUTUBE VIDEO (CENTER - PROTECTED ZONE) ========== */}
        <div className="relative z-10">
          <div className="
            w-56 h-32 
            sm:w-80 sm:h-[180px] 
            lg:w-96 lg:h-[216px]
            rounded-2xl overflow-hidden 
            bg-card
            video-glow
          ">
            <iframe
              className="w-full h-full"
              src={YOUTUBE_EMBED_URL}
              title="Birthday Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        {/* ==========================================================================
            SINGLE ORBIT RING - Photo+Caption Pairs
            ==========================================================================
            - 5 pairs evenly spaced at 72° intervals
            - Entire ring rotates, not individual elements
            - Photos stay upright via counter-rotation
            - Captions are attached to photos, moving as one unit
            - Animation pauses when user clicks "smile" button
            - Resumes when user clicks anywhere to continue
        */}
        <div 
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{
            animation: `orbit-rotate ${ORBIT_DURATION}s linear infinite`,
            animationPlayState: isOrbitPaused ? 'paused' : 'running',
          }}
        >
          {photoItems.map((item, index) => {
            // Calculate angle: 0°, 72°, 144°, 216°, 288°
            const angle = angleGap * index;
            
            return (
              <div
                key={item.id}
                className="absolute orbit-item-position"
                style={{
                  '--item-angle': `${angle}deg`,
                } as React.CSSProperties}
              >
                {/* Counter-rotation wrapper keeps photo+caption upright */}
                <div 
                  style={{
                    animation: `orbit-counter-rotate ${ORBIT_DURATION}s linear infinite`,
                    animationPlayState: isOrbitPaused ? 'paused' : 'running',
                  }}
                >
                  <Polaroid 
                    src={item.src} 
                    alt={item.alt}
                    caption={item.caption}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ==========================================================================
          "IF YOU'RE SMILING" BUTTON
          ==========================================================================
          - Appears after delay (SMILE_BUTTON_DELAY seconds)
          - Fades in smoothly with upward motion
          - Hidden when message is showing
      */}
      {showButton && !showSmileMessage && (
        <div className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 text-center z-20 px-4">
          <button
            onClick={handleSmileClick}
            className="smile-button-appear smile-button px-6 py-3 rounded-full font-body text-sm sm:text-base transition-all duration-300 hover:scale-105 cursor-pointer"
          >
            {SMILE_BUTTON_TEXT}
          </button>
        </div>
      )}

      {/* ==========================================================================
          SMILE MESSAGE OVERLAY (GLASSMORPHISM)
          ==========================================================================
          - Higher z-index than photos and video
          - Semi-transparent blurred backdrop for readability
          - Click anywhere to dismiss and resume orbit
      */}
      {showSmileMessage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center cursor-pointer"
          onClick={handleContinueClick}
        >
          {/* Subtle backdrop dim */}
          <div className="absolute inset-0 bg-background/30 backdrop-blur-sm" />
          
          {/* Glassmorphism message card - Manrope for warm message text */}
          <div className="smile-message-card relative z-10 mx-4 px-8 py-10 sm:px-12 sm:py-12 rounded-3xl text-center max-w-md">
            <p className="font-body text-lg sm:text-xl text-primary-foreground leading-relaxed font-medium">
              {SMILE_MESSAGE_LINE1}
            </p>
            <p className="font-body text-base sm:text-lg text-muted-foreground mt-4 font-normal">
              {SMILE_MESSAGE_LINE2}
            </p>
            
            {/* Continue hint */}
            <p className="font-body text-xs sm:text-sm text-muted-foreground/70 mt-8">
              {SMILE_CONTINUE_HINT}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrbitingContent;

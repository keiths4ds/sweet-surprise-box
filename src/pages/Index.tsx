import { useState } from 'react';
import ScrollMessage from '@/components/ScrollMessage';
import GiftBox from '@/components/GiftBox';
import OrbitingContent from '@/components/OrbitingContent';
import MusicToggle from '@/components/MusicToggle';

/**
 * =============================================================================
 * BIRTHDAY SURPRISE - MAIN PAGE (3-Stage Reveal Experience)
 * =============================================================================
 * 
 * STAGE 1 (scrollClosed → scrollOpen): Parchment scroll with message
 * STAGE 2 (gift): Shaking gift box with birthday message  
 * STAGE 3 (reveal): YouTube video with orbiting photos
 * 
 * User flow is strictly linear: scroll → gift box → reveal
 * 
 * CUSTOMIZATION FILES:
 * - Scroll message: src/components/ScrollMessage.tsx
 * - Gift box text: src/components/GiftBox.tsx
 * - Photos & YouTube: src/components/OrbitingContent.tsx
 * - Music: src/components/MusicToggle.tsx
 * - Colors & Animations: src/index.css
 * =============================================================================
 */

/* ========== STAGE TYPES ========== */
type Stage = 'scroll' | 'gift' | 'reveal';

const Index = () => {
  /* ========== STAGE STATE ========== */
  /* Controls which layer is currently visible */
  const [currentStage, setCurrentStage] = useState<Stage>('scroll');

  /* ========== STAGE TRANSITION HANDLERS ========== */
  const handleScrollComplete = () => {
    // Transition from scroll to gift box
    setCurrentStage('gift');
  };

  const handleGiftOpen = () => {
    // Transition from gift box to reveal
    setCurrentStage('reveal');
  };

  return (
    <div className="min-h-screen bg-romantic overflow-hidden">
      {/* Music toggle button - always visible */}
      <MusicToggle />

      {/* ========== STAGE 1: SCROLL MESSAGE ========== */}
      {currentStage === 'scroll' && (
        <div className="animate-fade-in">
          <ScrollMessage onComplete={handleScrollComplete} />
        </div>
      )}

      {/* ========== STAGE 2: GIFT BOX ========== */}
      {currentStage === 'gift' && (
        <div className="min-h-screen flex items-center justify-center p-4 animate-stage-enter">
          <GiftBox onOpen={handleGiftOpen} />
        </div>
      )}

      {/* ========== STAGE 3: VIDEO + ORBITING PHOTOS ========== */}
      {currentStage === 'reveal' && (
        <div className="animate-content-reveal">
          <OrbitingContent />
        </div>
      )}
    </div>
  );
};

export default Index;

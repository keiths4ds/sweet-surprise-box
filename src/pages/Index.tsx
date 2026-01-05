import { useState } from 'react';
import GiftBox from '@/components/GiftBox';
import OrbitingContent from '@/components/OrbitingContent';
import MusicToggle from '@/components/MusicToggle';

/**
 * =============================================================================
 * BIRTHDAY SURPRISE - MAIN PAGE
 * =============================================================================
 * 
 * This page has two states:
 * 1. CLOSED STATE: Shaking gift box with birthday message
 * 2. OPENED STATE: YouTube video with orbiting photos and romantic text
 * 
 * CUSTOMIZATION FILES:
 * - Photos & YouTube: src/components/OrbitingContent.tsx
 * - Music: src/components/MusicToggle.tsx
 * - Colors & Animations: src/index.css
 * - Birthday message: src/components/GiftBox.tsx
 * =============================================================================
 */

const Index = () => {
  const [isOpened, setIsOpened] = useState(false);

  const handleOpen = () => {
    setIsOpened(true);
  };

  return (
    <div className="min-h-screen bg-romantic overflow-hidden">
      {/* Music toggle button - always visible */}
      <MusicToggle />

      {/* CLOSED STATE - Gift Box */}
      {!isOpened && (
        <div className="min-h-screen flex items-center justify-center p-4">
          <GiftBox onOpen={handleOpen} />
        </div>
      )}

      {/* OPENED STATE - Main Content with orbiting elements */}
      {isOpened && (
        <div className="animate-content-reveal">
          <OrbitingContent />
        </div>
      )}
    </div>
  );
};

export default Index;

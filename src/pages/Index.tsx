import { useState } from 'react';
import GiftBox from '@/components/GiftBox';
import OrbitingContent from '@/components/OrbitingContent';

/**
 * Birthday Surprise Page
 * 
 * Two states:
 * 1. Gift Box (closed) - Shows shaking gift box with birthday message
 * 2. Main Content (opened) - Shows video with orbiting photos and text
 */
const Index = () => {
  const [isOpened, setIsOpened] = useState(false);

  const handleOpen = () => {
    setIsOpened(true);
  };

  return (
    <div className="min-h-screen bg-romantic overflow-hidden">
      {/* Closed state - Gift Box */}
      {!isOpened && (
        <div className="min-h-screen flex items-center justify-center p-4">
          <GiftBox onOpen={handleOpen} />
        </div>
      )}

      {/* Opened state - Main Content */}
      {isOpened && (
        <div className="animate-content-reveal">
          <OrbitingContent />
        </div>
      )}
    </div>
  );
};

export default Index;

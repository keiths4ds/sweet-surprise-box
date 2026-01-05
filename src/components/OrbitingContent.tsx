import { useMemo } from 'react';
import Polaroid from './Polaroid';

/**
 * =============================================================================
 * CUSTOMIZATION GUIDE
 * =============================================================================
 * 
 * TO ADD YOUR OWN PHOTOS:
 * 1. Add your images to src/assets/ folder
 * 2. Import them at the top: import photo1 from '@/assets/photo1.jpg';
 * 3. Replace the URL strings in the 'photos' array with your imported images
 * 
 * TO CHANGE THE YOUTUBE VIDEO:
 * 1. Find the YOUTUBE_EMBED_URL constant below
 * 2. Replace with your video: https://www.youtube.com/embed/YOUR_VIDEO_ID
 * 
 * TO CHANGE ROMANTIC TEXT:
 * 1. Edit the 'textSnippets' array below
 * =============================================================================
 */

// ========== REPLACE WITH YOUR YOUTUBE VIDEO ID ==========
const YOUTUBE_EMBED_URL = 'https://www.youtube.com/embed/dQw4w9WgXcQ';
// =========================================================

// ========== REPLACE THESE PHOTOS WITH YOUR OWN ==========
const photos = [
  { id: 1, src: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=200&h=200&fit=crop', alt: 'Memory 1' },
  { id: 2, src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=200&h=200&fit=crop', alt: 'Memory 2' },
  { id: 3, src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=200&h=200&fit=crop', alt: 'Memory 3' },
  { id: 4, src: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=200&h=200&fit=crop', alt: 'Memory 4' },
  { id: 5, src: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=200&h=200&fit=crop', alt: 'Memory 5' },
  { id: 6, src: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=200&h=200&fit=crop', alt: 'Memory 6' },
  { id: 7, src: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=200&h=200&fit=crop', alt: 'Memory 7' },
  { id: 8, src: 'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=200&h=200&fit=crop', alt: 'Memory 8' },
];
// =========================================================

// ========== CUSTOMIZE YOUR ROMANTIC TEXT SNIPPETS ==========
const textSnippets = [
  { id: 1, text: "My favorite person 💚" },
  { id: 2, text: "Still can't believe you 🥺" },
  { id: 3, text: "Us >>> everything" },
  { id: 4, text: "Happy You Day ✨" },
  { id: 5, text: "Forever my person 💕" },
  { id: 6, text: "Best thing in my life" },
];
// ============================================================

const OrbitingContent = () => {
  // Calculate responsive values based on screen size
  const orbitConfig = useMemo(() => {
    // Detect if mobile (will be recalculated on resize via CSS)
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
    const isTablet = typeof window !== 'undefined' && window.innerWidth < 1024;
    
    return {
      // Number of photos to show based on screen size
      visiblePhotos: isMobile ? 6 : isTablet ? 8 : 8,
      // Photo orbit radius (CSS clamp handles responsiveness)
      photoRadius: isMobile ? 120 : isTablet ? 180 : 220,
      // Text orbit radius (outer ring)
      textRadius: isMobile ? 180 : isTablet ? 280 : 340,
    };
  }, []);

  const visiblePhotos = photos.slice(0, orbitConfig.visiblePhotos);

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden py-20">
      {/* Background floating hearts */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute text-love-pink opacity-15 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 16 + 8}px`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${5 + Math.random() * 5}s`,
            }}
          >
            💕
          </div>
        ))}
      </div>

      {/* Title at top */}
      <div className="absolute top-6 sm:top-10 left-1/2 -translate-x-1/2 text-center z-20 px-4">
        <h1 className="font-handwritten text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-primary-foreground drop-shadow-sm">
          Happy Birthday! 🎂💚
        </h1>
        <p className="font-body text-muted-foreground mt-2 text-sm sm:text-base">
          To the most amazing person in my life
        </p>
      </div>

      {/* Orbit container - centers everything */}
      <div className="relative flex items-center justify-center">
        
        {/* ========== YOUTUBE VIDEO (CENTER) ========== */}
        <div className="relative z-10 video-container">
          <div className="
            w-56 h-32 
            sm:w-72 sm:h-40 
            md:w-80 md:h-44 
            lg:w-96 lg:h-56
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

        {/* ========== ORBITING PHOTOS (INNER RING) ========== */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div 
            className="photo-orbit-container"
            style={{
              '--photo-count': visiblePhotos.length,
              '--orbit-duration': '40s',
            } as React.CSSProperties}
          >
            {visiblePhotos.map((photo, index) => {
              // Calculate angle for equal spacing: 360° / number of photos
              const angle = (360 / visiblePhotos.length) * index;
              // Slight random rotation for natural polaroid look
              const tilt = (index % 2 === 0 ? 1 : -1) * (3 + (index % 3) * 2);
              
              return (
                <div
                  key={photo.id}
                  className="photo-orbit-item animate-float"
                  style={{
                    '--angle': `${angle}deg`,
                    '--photo-radius': `clamp(100px, 25vw, ${orbitConfig.photoRadius}px)`,
                    animationDelay: `${index * 0.4}s`,
                    animationDuration: `${4 + (index % 3)}s`,
                  } as React.CSSProperties}
                >
                  <Polaroid 
                    src={photo.src} 
                    alt={photo.alt} 
                    rotation={tilt}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* ========== ORBITING TEXT (OUTER RING) ========== */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div 
            className="text-orbit-container"
            style={{
              '--text-count': textSnippets.length,
              '--orbit-duration': '55s',
            } as React.CSSProperties}
          >
            {textSnippets.map((snippet, index) => {
              const angle = (360 / textSnippets.length) * index;
              
              return (
                <div
                  key={snippet.id}
                  className="text-orbit-item"
                  style={{
                    '--angle': `${angle}deg`,
                    '--text-radius': `clamp(160px, 40vw, ${orbitConfig.textRadius}px)`,
                  } as React.CSSProperties}
                >
                  <div className="
                    floating-text 
                    text-sm sm:text-base md:text-lg lg:text-xl 
                    whitespace-nowrap 
                    px-3 py-1.5 sm:px-4 sm:py-2
                    bg-card/70 backdrop-blur-sm 
                    rounded-full 
                    shadow-md
                    text-fade
                  ">
                    {snippet.text}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrbitingContent;

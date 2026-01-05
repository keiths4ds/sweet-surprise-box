import Polaroid from './Polaroid';

/**
 * =============================================================================
 * ORBITING CONTENT - CUSTOMIZATION GUIDE
 * =============================================================================
 * 
 * PHOTOS:
 * - Exactly 5 photos are displayed (edit the photos array below)
 * - To use your own images: import photo1 from '@/assets/photo1.jpg';
 * - Then replace the URL in the array with your imported variable
 * 
 * YOUTUBE VIDEO:
 * - Change YOUTUBE_EMBED_URL to your video's embed link
 * - Format: https://www.youtube.com/embed/YOUR_VIDEO_ID
 * 
 * ORBIT SETTINGS:
 * - ORBIT_DURATION: Time for one full rotation (default: 25s)
 * - Orbit radius is calculated automatically based on video size + safe zone
 * 
 * TEXT SNIPPETS:
 * - Edit the textSnippets array to change the floating messages
 * =============================================================================
 */

// ========== YOUTUBE VIDEO URL ==========
const YOUTUBE_EMBED_URL = 'https://www.youtube.com/embed/dQw4w9WgXcQ';

// ========== ORBIT ANIMATION DURATION (seconds) ==========
const ORBIT_DURATION = 25;

// ========== EXACTLY 5 PHOTOS - REPLACE WITH YOUR OWN ==========
const photos = [
  { 
    id: 1, 
    src: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=200&h=200&fit=crop', 
    alt: 'Memory 1' 
  },
  { 
    id: 2, 
    src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=200&h=200&fit=crop', 
    alt: 'Memory 2' 
  },
  { 
    id: 3, 
    src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=200&h=200&fit=crop', 
    alt: 'Memory 3' 
  },
  { 
    id: 4, 
    src: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=200&h=200&fit=crop', 
    alt: 'Memory 4' 
  },
  { 
    id: 5, 
    src: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=200&h=200&fit=crop', 
    alt: 'Memory 5' 
  },
];

// ========== ROMANTIC TEXT SNIPPETS ==========
const textSnippets = [
  { id: 1, text: "My favorite person 💚" },
  { id: 2, text: "Us >>> everything" },
  { id: 3, text: "Happy You Day ✨" },
  { id: 4, text: "Forever yours 💕" },
];

const OrbitingContent = () => {
  // Calculate angle for each photo: 360° / 5 = 72° between each
  const angleGap = 360 / photos.length; // 72 degrees

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      
      {/* Background floating hearts - subtle decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute text-love-pink opacity-10 animate-float"
            style={{
              left: `${10 + (i * 7) % 80}%`,
              top: `${5 + (i * 11) % 85}%`,
              fontSize: `${12 + (i % 4) * 4}px`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${5 + (i % 3) * 2}s`,
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

      {/* ========== MAIN ORBIT CONTAINER ========== */}
      {/* This container centers everything and holds the video + orbiting elements */}
      <div className="relative flex items-center justify-center">
        
        {/* ========== YOUTUBE VIDEO (CENTER) ========== */}
        {/* Video dimensions: Mobile ~224x126, Tablet ~320x180, Desktop ~384x216 */}
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

        {/* ========== PHOTO ORBIT RING ========== */}
        {/* 
          Orbit Geometry:
          - 5 photos with 72° spacing (360/5)
          - Orbit radius = video half-diagonal + safe zone (40px) + half photo size
          - Photos stay upright using counter-rotation: rotate(angle) translate(r) rotate(-angle)
        */}
        <div 
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{
            // Orbit ring rotates continuously
            animation: `orbit-rotate ${ORBIT_DURATION}s linear infinite`,
          }}
        >
          {photos.map((photo, index) => {
            // Calculate this photo's angle: 0°, 72°, 144°, 216°, 288°
            const angle = angleGap * index;
            
            return (
              <div
                key={photo.id}
                className="absolute photo-orbit-position"
                style={{
                  // Position on orbit circle
                  '--photo-angle': `${angle}deg`,
                } as React.CSSProperties}
              >
                {/* Counter-rotation wrapper to keep photo upright */}
                <div 
                  className="photo-counter-rotate"
                  style={{
                    animation: `orbit-counter-rotate ${ORBIT_DURATION}s linear infinite`,
                  }}
                >
                  <Polaroid 
                    src={photo.src} 
                    alt={photo.alt}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* ========== TEXT ORBIT RING (OUTER) ========== */}
        {/* 
          Text orbits on a larger radius than photos
          Rotates in opposite direction for visual interest
        */}
        <div 
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{
            animation: `orbit-rotate-reverse ${ORBIT_DURATION + 15}s linear infinite`,
          }}
        >
          {textSnippets.map((snippet, index) => {
            const angle = (360 / textSnippets.length) * index;
            
            return (
              <div
                key={snippet.id}
                className="absolute text-orbit-position"
                style={{
                  '--text-angle': `${angle}deg`,
                } as React.CSSProperties}
              >
                {/* Counter-rotation to keep text readable */}
                <div 
                  style={{
                    animation: `orbit-counter-rotate-reverse ${ORBIT_DURATION + 15}s linear infinite`,
                  }}
                >
                  <div className="
                    floating-text 
                    text-sm sm:text-base md:text-lg
                    whitespace-nowrap 
                    px-3 py-1.5 sm:px-4 sm:py-2
                    bg-card/80 backdrop-blur-sm 
                    rounded-full 
                    shadow-md
                  ">
                    {snippet.text}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OrbitingContent;

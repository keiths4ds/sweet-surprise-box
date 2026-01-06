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

// ==========================================================================
// EXACTLY 5 PHOTO + CAPTION PAIRS - CUSTOMIZE HERE
// ==========================================================================
const photoItems = [
  { 
    id: 1, 
    src: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=200&h=200&fit=crop', 
    alt: 'Memory 1',
    caption: 'My favorite person 💚'
  },
  { 
    id: 2, 
    src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=200&h=200&fit=crop', 
    alt: 'Memory 2',
    caption: 'Us >>> everything'
  },
  { 
    id: 3, 
    src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=200&h=200&fit=crop', 
    alt: 'Memory 3',
    caption: 'Happy You Day ✨'
  },
  { 
    id: 4, 
    src: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=200&h=200&fit=crop', 
    alt: 'Memory 4',
    caption: 'Forever yours 💕'
  },
  { 
    id: 5, 
    src: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=200&h=200&fit=crop', 
    alt: 'Memory 5',
    caption: 'Best memories 🥰'
  },
];

const OrbitingContent = () => {
  // 5 photos with 72° spacing (360/5)
  const angleGap = 360 / photoItems.length;

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
        */}
        <div 
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{
            animation: `orbit-rotate ${ORBIT_DURATION}s linear infinite`,
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
    </div>
  );
};

export default OrbitingContent;

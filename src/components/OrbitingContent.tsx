import Polaroid from './Polaroid';

/**
 * CUSTOMIZATION GUIDE:
 * 
 * To add your own photos:
 * 1. Import your images at the top of this file:
 *    import photo1 from '@/assets/your-photo-1.jpg';
 * 2. Replace the placeholder URLs in the 'photos' array below with your imported images
 * 
 * To change the YouTube video:
 * 1. Find the iframe in the return statement
 * 2. Replace the 'src' URL with your YouTube embed link
 *    Format: https://www.youtube.com/embed/YOUR_VIDEO_ID
 */

// Placeholder photos - REPLACE THESE with your own images
const photos = [
  { id: 1, src: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=200&h=200&fit=crop', alt: 'Memory 1' },
  { id: 2, src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=200&h=200&fit=crop', alt: 'Memory 2' },
  { id: 3, src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=200&h=200&fit=crop', alt: 'Memory 3' },
  { id: 4, src: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=200&h=200&fit=crop', alt: 'Memory 4' },
  { id: 5, src: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=200&h=200&fit=crop', alt: 'Memory 5' },
  { id: 6, src: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=200&h=200&fit=crop', alt: 'Memory 6' },
  { id: 7, src: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=200&h=200&fit=crop', alt: 'Memory 7' },
  { id: 8, src: 'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=200&h=200&fit=crop', alt: 'Memory 8' },
  { id: 9, src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=200&h=200&fit=crop', alt: 'Memory 9' },
  { id: 10, src: 'https://images.unsplash.com/photo-1494500764479-0c8f2919a3d8?w=200&h=200&fit=crop', alt: 'Memory 10' },
];

// Romantic text snippets - CUSTOMIZE THESE with your own messages
const textSnippets = [
  { id: 1, text: "My favorite person 💚" },
  { id: 2, text: "Still can't believe you 🥺" },
  { id: 3, text: "Us >>> everything" },
  { id: 4, text: "Happy You Day ✨" },
  { id: 5, text: "Forever my person 💕" },
  { id: 6, text: "Best thing in my life" },
];

const OrbitingContent = () => {
  // Calculate positions for photos in orbit
  const totalItems = photos.length;
  const orbitRadius = 'clamp(140px, 35vw, 280px)';
  
  return (
    <div className="relative w-full h-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background hearts floating */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute text-love-pink opacity-20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 20 + 10}px`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
            }}
          >
            💕
          </div>
        ))}
      </div>

      {/* Center container for video */}
      <div className="relative z-10">
        {/* YouTube Video - REPLACE THE URL with your video */}
        <div className="w-64 h-44 sm:w-80 sm:h-56 md:w-96 md:h-64 rounded-2xl overflow-hidden shadow-2xl bg-card animate-float">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="Birthday Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Orbiting photos */}
        {photos.map((photo, index) => {
          const angle = (360 / totalItems) * index;
          const rotation = (index % 2 === 0 ? 5 : -5) + Math.random() * 6 - 3;
          
          return (
            <div
              key={photo.id}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-orbit"
              style={{
                '--orbit-radius': orbitRadius,
                '--orbit-duration': '45s',
                animationDelay: `-${(45 / totalItems) * index}s`,
              } as React.CSSProperties}
            >
              <div className="animate-float" style={{ animationDelay: `${index * 0.3}s` }}>
                <Polaroid 
                  src={photo.src} 
                  alt={photo.alt} 
                  rotation={rotation}
                />
              </div>
            </div>
          );
        })}

        {/* Orbiting text snippets (outer orbit) */}
        {textSnippets.map((snippet, index) => {
          return (
            <div
              key={snippet.id}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-orbit"
              style={{
                '--orbit-radius': 'clamp(200px, 48vw, 380px)',
                '--orbit-duration': '60s',
                animationDelay: `-${(60 / textSnippets.length) * index}s`,
              } as React.CSSProperties}
            >
              <div className="floating-text text-lg sm:text-xl md:text-2xl whitespace-nowrap animate-float px-4 py-2 bg-card/80 backdrop-blur-sm rounded-full shadow-lg"
                   style={{ animationDelay: `${index * 0.5}s` }}>
                {snippet.text}
              </div>
            </div>
          );
        })}
      </div>

      {/* Title at top */}
      <div className="absolute top-6 sm:top-10 left-1/2 -translate-x-1/2 text-center z-20">
        <h1 className="font-handwritten text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-primary-foreground">
          Happy Birthday! 🎂💚
        </h1>
        <p className="font-body text-muted-foreground mt-2 text-sm sm:text-base">
          To the most amazing person in my life
        </p>
      </div>
    </div>
  );
};

export default OrbitingContent;

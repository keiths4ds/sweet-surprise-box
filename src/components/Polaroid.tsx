interface PolaroidProps {
  src: string;
  alt: string;
  rotation?: number;
  className?: string;
}

/**
 * Polaroid Component
 * 
 * Displays an image in a polaroid-style frame with soft shadow.
 * Size is responsive and controlled by parent container.
 * 
 * TO REPLACE IMAGES:
 * 1. Import your image: import myPhoto from '@/assets/my-photo.jpg';
 * 2. Pass it to the src prop: <Polaroid src={myPhoto} alt="Description" />
 */

const Polaroid = ({ src, alt, rotation = 0, className = '' }: PolaroidProps) => {
  return (
    <div 
      className={`
        polaroid 
        w-16 h-20 
        sm:w-20 sm:h-24 
        md:w-24 md:h-28 
        flex-shrink-0
        ${className}
      `}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <div className="w-full h-12 sm:h-16 md:h-20 overflow-hidden rounded-sm bg-muted">
        <img 
          src={src} 
          alt={alt}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default Polaroid;

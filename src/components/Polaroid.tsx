interface PolaroidProps {
  src: string;
  alt: string;
  rotation?: number;
  className?: string;
}

/**
 * Polaroid Component
 * Displays an image in a polaroid-style frame
 * 
 * To replace images: Change the 'src' prop with your own image URL or imported image
 */
const Polaroid = ({ src, alt, rotation = 0, className = '' }: PolaroidProps) => {
  return (
    <div 
      className={`polaroid w-20 h-24 sm:w-24 sm:h-28 md:w-28 md:h-32 ${className}`}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <div className="w-full h-16 sm:h-20 md:h-24 overflow-hidden rounded-sm bg-muted">
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

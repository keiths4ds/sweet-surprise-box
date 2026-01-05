interface PolaroidProps {
  src: string;
  alt: string;
  className?: string;
}

/**
 * Polaroid Component
 * 
 * Displays an image in a polaroid-style frame.
 * Size is responsive:
 * - Mobile: 60-70px wide
 * - Desktop: 90-110px wide
 * 
 * TO REPLACE IMAGES:
 * 1. Import your image: import myPhoto from '@/assets/my-photo.jpg';
 * 2. Pass it to the src prop: <Polaroid src={myPhoto} alt="Description" />
 */

const Polaroid = ({ src, alt, className = '' }: PolaroidProps) => {
  return (
    <div 
      className={`
        polaroid 
        w-[65px] h-[80px]
        sm:w-[85px] sm:h-[100px]
        lg:w-[100px] lg:h-[120px]
        flex-shrink-0
        ${className}
      `}
    >
      <div className="w-full h-[50px] sm:h-[65px] lg:h-[80px] overflow-hidden rounded-sm bg-muted">
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

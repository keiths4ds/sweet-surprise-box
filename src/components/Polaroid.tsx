interface PolaroidProps {
  src: string;
  alt: string;
  caption?: string;
}

/**
 * Polaroid Component
 * 
 * Displays an image in a polaroid-style frame with optional caption.
 * Photo + caption move together as a single unit.
 * 
 * Size is responsive:
 * - Mobile: 60-70px wide
 * - Desktop: 90-110px wide
 * 
 * TO REPLACE IMAGES:
 * 1. Import your image: import myPhoto from '@/assets/my-photo.jpg';
 * 2. Pass it to the src prop: <Polaroid src={myPhoto} alt="Description" caption="Your text" />
 */

const Polaroid = ({ src, alt, caption }: PolaroidProps) => {
  return (
    <div className="polaroid-container">
      {/* Photo frame */}
      <div className="polaroid">
        <img
          src={src}
          alt={alt}
          className="
            w-[60px] h-[60px]
            sm:w-[80px] sm:h-[80px]
            lg:w-[100px] lg:h-[100px]
            object-cover rounded-sm
          "
          loading="lazy"
        />
      </div>
      
      {/* Caption attached below photo */}
      {caption && (
        <div className="polaroid-caption">
          {caption}
        </div>
      )}
    </div>
  );
};

export default Polaroid;

import { useState } from 'react';

/**
 * =============================================================================
 * SCROLL MESSAGE COMPONENT
 * =============================================================================
 * 
 * A parchment-style scroll that creates the first interaction layer.
 * Two states: closed (rolled up) and open (unrolled with message).
 * 
 * CUSTOMIZATION:
 * - Line 22: Change the text shown on the CLOSED scroll
 * - Line 67-73: Change the text shown INSIDE the open scroll
 * =============================================================================
 */

interface ScrollMessageProps {
  onComplete: () => void;
}

/* ========== CLOSED SCROLL TEXT ========== */
const CLOSED_SCROLL_TEXT = "For someone who means more to me than she knows…";

/* ========== OPEN SCROLL MESSAGE ========== */
/* Edit this array to customize the message inside the scroll */
const SCROLL_MESSAGE_LINES = [
  "Every moment with you feels like a gift,",
  "every smile of yours lights up my world.",
  "",
  "Today, I wanted to create something special,",
  "just for you…",
  "",
  "Happy Birthday, my love 💚",
];

const ScrollMessage = ({ onComplete }: ScrollMessageProps) => {
  const [isOpen, setIsOpen] = useState(false);

  /* ========== CLICK HANDLER ========== */
  const handleClick = () => {
    if (!isOpen) {
      // First click: Open the scroll
      setIsOpen(true);
    } else {
      // Second click: Transition to gift box
      onComplete();
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      onClick={handleClick}
    >
      {/* ========== CLOSED SCROLL STATE ========== */}
      {!isOpen && (
        <div className="scroll-closed animate-float cursor-pointer">
          <div className="scroll-roll scroll-roll-top" />
          <div className="scroll-body-closed">
            <p className="scroll-closed-text">{CLOSED_SCROLL_TEXT}</p>
          </div>
          <div className="scroll-roll scroll-roll-bottom" />
        </div>
      )}

      {/* ========== OPEN SCROLL STATE ========== */}
      {isOpen && (
        <div className="scroll-open animate-scroll-unroll cursor-pointer">
          <div className="scroll-roll scroll-roll-top-open" />
          <div className="scroll-body-open">
            {/* ========== SCROLL MESSAGE CONTENT ========== */}
            <div className="scroll-content">
              {SCROLL_MESSAGE_LINES.map((line, index) => (
                <p 
                  key={index} 
                  className="scroll-message-line"
                  style={{ animationDelay: `${0.3 + index * 0.15}s` }}
                >
                  {line || <br />}
                </p>
              ))}
            </div>
            
            {/* ========== HINT TO CONTINUE ========== */}
            <p className="scroll-hint animate-pulse-glow">
              Click once more 💚
            </p>
          </div>
          <div className="scroll-roll scroll-roll-bottom-open" />
        </div>
      )}
    </div>
  );
};

export default ScrollMessage;

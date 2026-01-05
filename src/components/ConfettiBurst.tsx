import { useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';

/**
 * ConfettiBurst Component
 * 
 * Triggers a beautiful confetti burst animation when activated.
 * Uses soft romantic colors: white, pastel pink, light green, gold.
 * Animation lasts ~2-3 seconds and does NOT repeat.
 */

interface ConfettiBurstProps {
  trigger: boolean;
}

const ConfettiBurst = ({ trigger }: ConfettiBurstProps) => {
  const fireConfetti = useCallback(() => {
    // Romantic color palette
    const colors = [
      '#ffffff',  // White
      '#f8b4c4',  // Pastel pink
      '#c8e6c9',  // Light green
      '#ffd700',  // Gold
      '#ffb6c1',  // Light pink
      '#e8f5e9',  // Mint
    ];

    // Center burst
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x: 0.5, y: 0.5 },
      colors,
      startVelocity: 30,
      gravity: 0.8,
      scalar: 1.2,
      drift: 0,
      ticks: 200,
    });

    // Left burst with slight delay
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0.3, y: 0.5 },
        colors,
        startVelocity: 25,
        gravity: 0.9,
        ticks: 180,
      });
    }, 100);

    // Right burst with slight delay
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 0.7, y: 0.5 },
        colors,
        startVelocity: 25,
        gravity: 0.9,
        ticks: 180,
      });
    }, 200);

    // Sparkle shower from top
    setTimeout(() => {
      confetti({
        particleCount: 30,
        spread: 100,
        origin: { x: 0.5, y: 0.2 },
        colors,
        startVelocity: 15,
        gravity: 0.5,
        scalar: 0.8,
        ticks: 250,
        shapes: ['circle'],
      });
    }, 300);
  }, []);

  useEffect(() => {
    if (trigger) {
      fireConfetti();
    }
  }, [trigger, fireConfetti]);

  return null; // This component renders nothing, only triggers confetti
};

export default ConfettiBurst;

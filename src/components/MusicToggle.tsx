import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

/**
 * MusicToggle Component
 * 
 * A floating button that controls background music playback.
 * Music does NOT autoplay - user must click to start.
 * 
 * TO CHANGE THE MUSIC FILE:
 * 1. Add your MP3 file to the public folder (e.g., public/music/birthday-song.mp3)
 * 2. Update the MUSIC_URL constant below with your file path
 */

// ========== CHANGE YOUR MUSIC FILE HERE ==========
const MUSIC_URL = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
// ==================================================

const MusicToggle = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize audio on mount
  useEffect(() => {
    audioRef.current = new Audio(MUSIC_URL);
    audioRef.current.loop = true;
    audioRef.current.volume = 0;
    
    audioRef.current.addEventListener('canplaythrough', () => {
      setIsLoaded(true);
    });

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
      }
    };
  }, []);

  // Smooth fade in/out function
  const fadeAudio = (targetVolume: number, duration: number = 1000) => {
    if (!audioRef.current) return;
    
    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
    }

    const startVolume = audioRef.current.volume;
    const volumeDiff = targetVolume - startVolume;
    const steps = 20;
    const stepTime = duration / steps;
    const volumeStep = volumeDiff / steps;
    let currentStep = 0;

    fadeIntervalRef.current = setInterval(() => {
      currentStep++;
      if (audioRef.current) {
        audioRef.current.volume = Math.max(0, Math.min(1, startVolume + (volumeStep * currentStep)));
      }
      
      if (currentStep >= steps) {
        if (fadeIntervalRef.current) {
          clearInterval(fadeIntervalRef.current);
        }
        if (targetVolume === 0 && audioRef.current) {
          audioRef.current.pause();
        }
      }
    }, stepTime);
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      // Fade out and pause
      fadeAudio(0, 800);
      setIsPlaying(false);
    } else {
      // Start playing and fade in
      audioRef.current.play();
      fadeAudio(0.4, 1000);
      setIsPlaying(true);
    }
  };

  return (
    <button
      onClick={toggleMusic}
      disabled={!isLoaded}
      className={`
        fixed bottom-6 right-6 z-50
        w-12 h-12 rounded-full
        bg-card/90 backdrop-blur-sm
        border border-border
        shadow-lg
        flex items-center justify-center
        transition-all duration-300
        hover:scale-110 hover:shadow-xl
        disabled:opacity-50 disabled:cursor-not-allowed
        group
      `}
      aria-label={isPlaying ? 'Pause music' : 'Play music'}
    >
      {isPlaying ? (
        <Volume2 className="w-5 h-5 text-sage group-hover:text-accent transition-colors" />
      ) : (
        <VolumeX className="w-5 h-5 text-muted-foreground group-hover:text-sage transition-colors" />
      )}
      
      {/* Pulse animation when playing */}
      {isPlaying && (
        <span className="absolute inset-0 rounded-full bg-sage/20 animate-ping" />
      )}
    </button>
  );
};

export default MusicToggle;

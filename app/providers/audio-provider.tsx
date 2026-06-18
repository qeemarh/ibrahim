'use client';

import { createContext, useContext, useEffect, useRef, useState, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface AudioContextType {
  isPlaying: boolean;
  isMuted: boolean;
  startMusic: () => Promise<void>;
  toggleMute: () => void;
}

const AudioContext = createContext<AudioContextType | null>(null);

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    // Return a default context if not wrapped
    return {
      isPlaying: false,
      isMuted: false,
      startMusic: async () => {},
      toggleMute: () => {},
    };
  }
  return context;
};

export default function AudioProvider({ children }: { children: ReactNode }) {
  const [isClient, setIsClient] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setIsClient(true);

    // Try to load the music file
    let audioPath = '/you-can-come-to-me.mp3';
    
    // Fallback to a music streaming service if local file doesn't exist
    const audio = new Audio(audioPath);
    audio.loop = true;
    audio.volume = 0;
    
    // Handle error by using a fallback
    audio.onerror = () => {
      console.log('Could not load music file');
    };
    
    audioRef.current = audio;

    return () => {
      if (audio) {
        audio.pause();
      }
    };
  }, []);

  const startMusic = async () => {
    if (!audioRef.current || isPlaying) return;

    try {
      await audioRef.current.play();
      setIsPlaying(true);

      let volume = 0;
      const fade = setInterval(() => {
        volume += 0.02;
        if (volume >= 0.3) {
          volume = 0.3;
          clearInterval(fade);
        }
        if (audioRef.current) {
          audioRef.current.volume = volume;
        }
      }, 100);
    } catch (error) {
      console.log('Could not start music:', error);
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !audioRef.current.muted;
    setIsMuted(!isMuted);
  };

  if (!isClient) {
    return <>{children}</>;
  }

  return (
    <AudioContext.Provider value={{ isPlaying, isMuted, startMusic, toggleMute }}>
      {children}
      {isPlaying && (
        <motion.div
          className="fixed bottom-5 right-5 z-50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.button
            onClick={toggleMute}
            className="bg-primary/90 backdrop-blur text-white px-4 py-3 rounded-full shadow-xl hover:scale-105 transition font-medium flex items-center gap-2"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {isMuted ? '🔇' : '🔊'}
            <span className="hidden sm:inline">{isMuted ? 'Unmute' : 'Mute'}</span>
          </motion.button>
        </motion.div>
      )}
    </AudioContext.Provider>
  );
}

'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Page() {
  const [isClient, setIsClient] = useState(false);
  const [musicStarted, setMusicStarted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setIsClient(true);

    const audio = new Audio('/daylight.mp3');
    audio.loop = true;
    audio.volume = 0;

    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const startMusic = async () => {
    if (!audioRef.current || musicStarted) return;

    try {
      await audioRef.current.play();

      setMusicStarted(true);

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
      console.log('Could not start music');
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;

    audioRef.current.muted = !audioRef.current.muted;
    setIsMuted(audioRef.current.muted);
  };

  if (!isClient) {
    return null;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  const slideInVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1,
        ease: 'easeOut',
      },
    },
  };

  const floatVariants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <main className="min-h-screen w-full bg-background overflow-hidden flex items-center justify-center relative">

      {/* Music Controls */}
      {musicStarted && (
        <div className="fixed top-5 right-5 z-50">
          <button
            onClick={toggleMute}
            className="bg-white/80 backdrop-blur px-4 py-2 rounded-full shadow-lg hover:scale-105 transition"
          >
            {isMuted ? '🔇 Unmute' : '🔊 Mute'}
          </button>
        </div>
      )}

      {/* Decorative balloons */}
      <motion.div
        className="absolute top-10 left-10 text-4xl opacity-50"
        variants={floatVariants}
        animate="animate"
      >
        🎈
      </motion.div>

      <motion.div
        className="absolute top-20 right-20 text-4xl opacity-50"
        variants={floatVariants}
        animate="animate"
        transition={{
          delay: 0.3,
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        🎂
      </motion.div>

      <motion.div
        className="absolute bottom-20 right-10 text-4xl opacity-40"
        variants={floatVariants}
        animate="animate"
        transition={{
          delay: 0.6,
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        🎈
      </motion.div>

      {/* Main Content */}
      <motion.div
        className="relative z-10 px-4 md:px-8 max-w-4xl w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex flex-col items-center gap-8">

          {/* Baby Picture */}
          <motion.div variants={slideInVariants} className="relative">
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-06-13%20at%2014.06.55-xbkhOK20pDEB1RYOk8pDLgXIK2JgF9.jpeg"
                alt="Baby picture"
                className="w-full h-full object-cover rounded-3xl shadow-2xl"
              />

              <div className="absolute -inset-4 rounded-3xl border-8 border-accent opacity-20 pointer-events-none" />
            </div>
          </motion.div>

          {/* Birthday Text */}
          <motion.div
            variants={itemVariants}
            className="text-center space-y-4"
          >
            <h1 className="text-5xl md:text-6xl font-serif text-primary font-bold leading-tight text-balance">
              Ishola mi
            </h1>

            <p className="text-3xl md:text-4xl font-serif text-foreground font-light">
              Happy birthday my love
            </p>
          </motion.div>

          {/* CTA Button */}
          <motion.div variants={itemVariants}>
            <Link
              href="/letter"
              onClick={startMusic}
              className="inline-block px-8 py-4 bg-accent text-white rounded-full font-medium text-lg hover:bg-primary transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              Click here ✨
            </Link>
          </motion.div>

        </div>
      </motion.div>
    </main>
  );
}
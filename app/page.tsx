'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAudio } from '@/app/providers/audio-provider';

export default function Page() {
  const [isClient, setIsClient] = useState(false);
  const { startMusic } = useAudio();

  useEffect(() => {
    setIsClient(true);
  }, []);

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

  const hatVariants = {
    animate: {
      rotate: [0, 5, -5, 0],
      y: [0, -5, 5, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.05, 1],
      boxShadow: [
        '0 0 20px rgba(194, 24, 91, 0.3)',
        '0 0 40px rgba(194, 24, 91, 0.6)',
        '0 0 20px rgba(194, 24, 91, 0.3)',
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-background via-purple-50 to-background overflow-hidden flex items-center justify-center relative">
      
      {/* Animated gradient orbs */}
      <motion.div
        className="absolute -top-32 -right-32 w-80 h-80 bg-gradient-to-br from-primary to-accent rounded-full opacity-10 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute -bottom-32 -left-32 w-80 h-80 bg-gradient-to-tr from-accent to-primary rounded-full opacity-10 blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{ duration: 8, repeat: Infinity, delay: 1 }}
      />

      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-10 left-10 text-6xl"
          variants={floatVariants}
          animate="animate"
        >
          💝
        </motion.div>

        <motion.div
          className="absolute top-20 right-20 text-6xl"
          variants={floatVariants}
          animate="animate"
          transition={{
            delay: 0.3,
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          ✨
        </motion.div>

        <motion.div
          className="absolute bottom-20 right-10 text-6xl"
          variants={floatVariants}
          animate="animate"
          transition={{
            delay: 0.6,
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          💖
        </motion.div>

        <motion.div
          className="absolute bottom-32 left-20 text-6xl"
          variants={floatVariants}
          animate="animate"
          transition={{
            delay: 0.4,
            duration: 3.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          🎉
        </motion.div>
      </div>

      {/* Main Content */}
      <motion.div
        className="relative z-10 px-4 md:px-8 max-w-4xl w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex flex-col items-center gap-8">

          {/* Picture with Birthday Decoration */}
          <motion.div variants={slideInVariants} className="relative">
            <div className="relative w-72 h-80 md:w-96 md:h-[28rem]">
              <motion.div variants={pulseVariants} animate="animate" className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-accent to-primary opacity-20 rounded-3xl blur-2xl" />
              </motion.div>

              <div className="relative bg-white p-4 rounded-3xl shadow-2xl h-full flex items-center justify-center">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-06-13%20at%2014.19.53-FnzYtVV1nAKGznxC7V2NU8Yclh0wK9.jpeg"
                  alt="Birthday boy"
                  className="h-full w-full object-cover rounded-2xl"
                />
              </div>

              {/* Birthday Decoration */}
              <motion.div
                className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-7xl"
                variants={hatVariants}
                animate="animate"
              >
                💜
              </motion.div>

              {/* Decorative frame glow */}
              <div className="absolute -inset-6 rounded-3xl border-4 border-primary opacity-30 pointer-events-none" />
            </div>
          </motion.div>

          {/* Birthday Text */}
          <motion.div
            variants={itemVariants}
            className="text-center space-y-6"
          >
            <div className="space-y-2">
              <h1 className="text-5xl md:text-7xl font-serif text-primary font-bold leading-tight text-balance bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-600 to-accent">
                Ishola mi
              </h1>
              <div className="h-1.5 w-24 bg-gradient-to-r from-primary to-accent rounded-full mx-auto" />
            </div>

            <p className="text-2xl md:text-3xl font-serif text-accent font-light">
              Happy birthday my love
            </p>

            <p className="text-lg md:text-xl text-foreground/70 font-light max-w-2xl mx-auto">
              A special gift from your princess
            </p>
          </motion.div>

          {/* CTA Button */}
          <motion.div variants={itemVariants}>
            <motion.div
              whileHover={{ scale: 1.08, rotate: 1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/letter"
                onClick={startMusic}
                className="relative inline-block px-12 py-4 text-white rounded-full font-semibold text-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group"
              >
                {/* Button gradient background */}
                <span className="absolute inset-0 bg-gradient-to-r from-primary via-purple-600 to-accent rounded-full group-hover:bg-gradient-to-l transition-all duration-300" />
                
                {/* Shine effect */}
                <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 rounded-full transform -skew-x-12 group-hover:translate-x-full transition-transform duration-700" />
                </span>
                
                {/* Button text */}
                <span className="relative flex items-center gap-2">
                  Open Your Gift ✨
                </span>

                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-full opacity-0 group-hover:opacity-50 blur transition-opacity duration-300 -z-10" />
              </Link>
            </motion.div>
          </motion.div>

        </div>
      </motion.div>
    </main>
  );
}

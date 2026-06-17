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
    <main className="min-h-screen w-full bg-background overflow-hidden flex items-center justify-center relative">

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

          {/* Baby Picture with Birthday Hat */}
          <motion.div variants={slideInVariants} className="relative">
            <div className="relative w-72 h-72 md:w-96 md:h-96">
              <motion.div variants={pulseVariants} animate="animate" className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-accent to-primary opacity-20 rounded-3xl blur-2xl" />
              </motion.div>

              <div className="relative bg-white p-3 rounded-3xl shadow-2xl">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-06-13%20at%2014.06.55-xbkhOK20pDEB1RYOk8pDLgXIK2JgF9.jpeg"
                  alt="Baby picture"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>

              {/* Birthday Hat */}
              <motion.div
                className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-7xl"
                variants={hatVariants}
                animate="animate"
              >
                🎉
              </motion.div>

              {/* Decorative frame glow */}
              <div className="absolute -inset-6 rounded-3xl border-4 border-primary opacity-30 pointer-events-none" />
            </div>
          </motion.div>

          {/* Birthday Text */}
          <motion.div
            variants={itemVariants}
            className="text-center space-y-4"
          >
            <h1 className="text-5xl md:text-7xl font-serif text-primary font-bold leading-tight text-balance">
              Ishola mi
            </h1>

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
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/letter"
                onClick={startMusic}
                className="inline-block px-10 py-4 bg-primary text-white rounded-full font-semibold text-xl hover:bg-accent transition-all duration-300 shadow-xl hover:shadow-2xl"
              >
                Open Your Gift ✨
              </Link>
            </motion.div>
          </motion.div>

        </div>
      </motion.div>
    </main>
  );
}

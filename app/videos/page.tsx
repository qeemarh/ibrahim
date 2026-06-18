'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { IoArrowBack } from 'react-icons/io5';
import { useState, useEffect } from 'react';

const AnimatedStory = () => {
  const storyLines = [
    "We started talking on the 8th of March,",
    "the day you messaged me on Instagram saying \"Asalamualaikum\"",
    "because we are all Muslims and it was Ramadan.",
    "",
    "We vibed so well from the very first moment.",
    "Every conversation felt special, like you understood me.",
    "",
    "And then March 28th came—",
    "the day you asked me to be your girlfriend",
    "with flowers and a handwritten letter.",
    "That day, you became my forever.",
  ];

  return (
    <div className="space-y-3 text-lg md:text-xl text-foreground/80 leading-relaxed">
      {storyLines.map((line, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          {line || <div className="h-2" />}
          {line && <span className="font-serif italic">{line}</span>}
        </motion.div>
      ))}
    </div>
  );
};

export default function VideosPage() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  // Play background music on component mount
  useEffect(() => {
    const audio = document.getElementById('bgMusic') as HTMLAudioElement;
    if (audio && !isMuted) {
      audio.play().catch(() => {
        // Autoplay might be blocked, user will need to interact
      });
    }
  }, [isMuted]);

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-background via-purple-50 to-background py-8 md:py-16 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary rounded-full opacity-5 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent rounded-full opacity-5 blur-3xl" />

      {/* Background Music */}
      <audio
        id="bgMusic"
        src="https://youtu.be/watch?v=nU7h_Fup_dE"
        loop
        className="hidden"
      />

      {/* Back button */}
      <Link
        href="/menu"
        className="inline-flex items-center gap-2 ml-4 md:ml-8 text-primary hover:text-accent transition-all hover:gap-3 mb-8 font-semibold relative z-10"
      >
        <IoArrowBack size={20} />
        <span>Back</span>
      </Link>

      <motion.div
        className="max-w-6xl mx-auto px-4 md:px-8 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-16 md:mb-24">
          <h1 className="text-5xl md:text-7xl font-serif text-primary font-bold mb-4">
            Our Video Collection
          </h1>
          <p className="text-xl text-foreground/70">
            Moments we&apos;ve captured, memories we&apos;ll treasure forever
          </p>
        </motion.div>

        {/* Section 1: Our Story */}
        <motion.div variants={itemVariants} className="mb-20 md:mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Story Text - Animated */}
            <motion.div
              className="order-2 lg:order-1"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="space-y-6">
                <div>
                  <h2 className="text-4xl md:text-5xl font-serif text-primary font-bold mb-2">
                    Our Story
                  </h2>
                  <div className="h-1.5 w-20 bg-gradient-to-r from-primary to-accent rounded-full" />
                </div>
                <p className="text-lg text-foreground/60 italic">
                  How we met and fell in love...
                </p>
                <AnimatedStory />
              </div>
            </motion.div>

            {/* Story Video */}
            <motion.div
              className="order-1 lg:order-2"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div
                className="relative rounded-3xl overflow-hidden shadow-2xl cursor-pointer group bg-gradient-to-br from-primary/20 to-accent/20 backdrop-blur-sm"
                onClick={() => setSelectedVideo('our-story')}
              >
                <div className="aspect-video flex items-center justify-center bg-gradient-to-br from-primary to-accent relative overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"
                    animate={{ x: ['0%', '100%'] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <div className="relative z-10 text-center">
                    <motion.div
                      className="text-7xl mb-4"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      💕
                    </motion.div>
                    <p className="text-white font-semibold text-lg">Our Story Video</p>
                    <p className="text-white/70 text-sm mt-2">Click to watch</p>
                  </div>
                </div>

                {/* Play button */}
                <motion.div
                  className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-20 h-20 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center border-2 border-white/50">
                    <motion.div
                      className="text-4xl ml-1"
                      animate={{ scale: [1, 1.15, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      ▶
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Section 2: Highlights */}
        <motion.div variants={itemVariants} className="mb-20 md:mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Highlights Video */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div
                className="relative rounded-3xl overflow-hidden shadow-2xl cursor-pointer group bg-gradient-to-br from-accent/20 to-secondary/20 backdrop-blur-sm"
                onClick={() => setSelectedVideo('highlights')}
              >
                <div className="aspect-video flex items-center justify-center bg-gradient-to-br from-accent to-secondary relative overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"
                    animate={{ x: ['0%', '100%'] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <div className="relative z-10 text-center">
                    <motion.div
                      className="text-7xl mb-4"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      ✨
                    </motion.div>
                    <p className="text-white font-semibold text-lg">Call Highlights</p>
                    <p className="text-white/70 text-sm mt-2">Click to watch</p>
                  </div>
                </div>

                {/* Play button */}
                <motion.div
                  className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-20 h-20 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center border-2 border-white/50">
                    <motion.div
                      className="text-4xl ml-1"
                      animate={{ scale: [1, 1.15, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      ▶
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Highlights Description */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="space-y-6">
                <div>
                  <h2 className="text-4xl md:text-5xl font-serif text-primary font-bold mb-2">
                    Highlights
                  </h2>
                  <div className="h-1.5 w-20 bg-gradient-to-r from-primary to-accent rounded-full" />
                </div>
                <p className="text-lg text-foreground/60 italic">
                  Our most beautiful call moments
                </p>
                <div className="space-y-4 text-lg text-foreground/80">
                  <p className="font-serif">
                    A beautiful collection of screenshots and screen recordings from our video calls. Every time we connect, you light up my world.
                  </p>
                  <p className="font-serif">
                    This is a long-distance love story, and these moments prove that distance means nothing when your heart is with someone special.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Section 3: Adunni and Kolapo */}
        <motion.div variants={itemVariants} className="mb-12 md:mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Compilation Description */}
            <motion.div
              className="order-2 lg:order-1"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="space-y-6">
                <div>
                  <h2 className="text-4xl md:text-5xl font-serif text-primary font-bold mb-2">
                    Adunni & Kolapo
                  </h2>
                  <div className="h-1.5 w-20 bg-gradient-to-r from-primary to-accent rounded-full" />
                </div>
                <p className="text-lg text-foreground/60 italic">
                  Our pictures together with a song that explains how I feel
                </p>
                <div className="space-y-4 text-lg text-foreground/80">
                  <p className="font-serif">
                    A compilation of our most precious moments together—pictures that capture who we are when we&apos;re together.
                  </p>
                  <p className="font-serif">
                    Set to a song that expresses everything my heart feels but sometimes my words cannot.
                  </p>
                  <p className="font-serif text-accent font-semibold">
                    This is our love story, beautifully put together.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Compilation Video */}
            <motion.div
              className="order-1 lg:order-2"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div
                className="relative rounded-3xl overflow-hidden shadow-2xl cursor-pointer group bg-gradient-to-br from-secondary/20 to-primary/20 backdrop-blur-sm"
                onClick={() => setSelectedVideo('adunni-kolapo')}
              >
                <div className="aspect-video flex items-center justify-center bg-gradient-to-br from-secondary to-primary relative overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"
                    animate={{ x: ['0%', '100%'] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <div className="relative z-10 text-center">
                    <motion.div
                      className="text-7xl mb-4"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      💑
                    </motion.div>
                    <p className="text-white font-semibold text-lg">Adunni & Kolapo</p>
                    <p className="text-white/70 text-sm mt-2">Our Love Story</p>
                  </div>
                </div>

                {/* Play button */}
                <motion.div
                  className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-20 h-20 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center border-2 border-white/50">
                    <motion.div
                      className="text-4xl ml-1"
                      animate={{ scale: [1, 1.15, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      ▶
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Video Player Modal */}
      {selectedVideo && (
        <motion.div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelectedVideo(null)}
        >
          <motion.div
            className="relative w-full max-w-4xl rounded-3xl overflow-hidden"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-black aspect-video flex items-center justify-center relative">
              {/* Video Player */}
              <video
                key={selectedVideo}
                controls
                autoPlay
                className="w-full h-full"
              >
                {selectedVideo === 'our-story' && (
                  <source
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Video%202026-06-18%20at%2020.51.52-m2a3RcYrsEnOm2nd4lUV3MysIZNaHI.mp4"
                    type="video/mp4"
                  />
                )}
                {selectedVideo === 'highlights' && (
                  <source
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Video%202026-06-18%20at%2019.18.42-gogzQtnPPzvQAlNpk5er7zrwtajLjl.mp4"
                    type="video/mp4"
                  />
                )}
                {selectedVideo === 'adunni-kolapo' && (
                  <>
                    <source
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Video%202026-06-18%20at%2020.53.01-EuvmdFvpCf0XCYyjCUstuvzPoanYH5.mp4"
                      type="video/mp4"
                    />
                  </>
                )}
                Your browser does not support the video tag.
              </video>

              {/* Close button */}
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors text-4xl z-10 bg-black/50 rounded-full w-12 h-12 flex items-center justify-center"
              >
                ×
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </main>
  );
}

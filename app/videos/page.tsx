'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { IoArrowBack } from 'react-icons/io5';
import { useState } from 'react';

const videos = [
  {
    id: 1,
    title: 'Our Story',
    description: 'A collection of our sweetest moments together',
    thumbnail: 'bg-gradient-to-br from-primary to-accent',
    icon: '💕',
    duration: '3:45',
  },
  {
    id: 2,
    title: 'Highlights',
    description: 'The best times we&apos;ve shared',
    thumbnail: 'bg-gradient-to-br from-accent to-secondary',
    icon: '✨',
    duration: '2:30',
  },
  {
    id: 3,
    title: 'Memories',
    description: 'Candid moments that made me fall more in love',
    thumbnail: 'bg-gradient-to-br from-secondary to-primary',
    icon: '🎬',
    duration: '4:10',
  },
];

export default function VideosPage() {
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);

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

  return (
    <main className="min-h-screen w-full bg-background py-8 md:py-16">
      {/* Back button */}
      <Link
        href="/menu"
        className="inline-flex items-center gap-2 ml-4 md:ml-8 text-primary hover:text-accent transition-colors mb-8 font-semibold"
      >
        <IoArrowBack size={20} />
        <span>Back</span>
      </Link>

      <motion.div
        className="max-w-6xl mx-auto px-4 md:px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-12 md:mb-16">
          <h1 className="text-5xl md:text-6xl font-serif text-primary font-bold mb-4">
            Video Compilations
          </h1>
          <p className="text-lg text-foreground/70">
            Watch our beautiful moments in motion
          </p>
        </motion.div>

        {/* Video Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {videos.map((video) => (
            <motion.div
              key={video.id}
              variants={itemVariants}
              className="group cursor-pointer"
              onClick={() => setSelectedVideo(video.id)}
            >
              <div className="relative overflow-hidden rounded-3xl shadow-xl">
                {/* Thumbnail */}
                <div className={`${video.thumbnail} h-80 relative`}>
                  {/* Placeholder with gradient and icon */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center backdrop-blur-sm">
                    <motion.div
                      className="text-7xl mb-4"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {video.icon}
                    </motion.div>
                    <p className="text-white/80 text-sm font-light">
                      Ready to watch
                    </p>
                  </div>

                  {/* Play button overlay */}
                  <motion.div
                    className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ scale: 0.8 }}
                    whileHover={{ scale: 1 }}
                  >
                    <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border-2 border-white/40">
                      <motion.div
                        className="text-4xl"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        ▶
                      </motion.div>
                    </div>
                  </motion.div>
                </div>

                {/* Info section */}
                <div className="bg-white p-6 md:p-8">
                  <h3 className="text-xl md:text-2xl font-serif font-bold text-primary mb-2">
                    {video.title}
                  </h3>
                  <p className="text-foreground/70 text-sm md:text-base mb-4">
                    {video.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-light text-foreground/50">
                      Duration: {video.duration}
                    </span>
                    <motion.span
                      className="text-accent font-semibold"
                      whileHover={{ x: 5 }}
                    >
                      Watch →
                    </motion.span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Note about video uploads */}
        <motion.div variants={itemVariants} className="mt-12 md:mt-16 text-center">
          <div className="bg-secondary/30 rounded-2xl p-6 md:p-8 border-2 border-secondary">
            <p className="text-primary font-semibold mb-2">
              Your Video Compilations
            </p>
            <p className="text-foreground/70">
              When you create your beautiful video edits, just send them to me and I&apos;ll add them to this page. Each video will play in a beautiful player designed just for us.
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Video Player Modal */}
      {selectedVideo && (
        <motion.div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
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
            {/* Video player placeholder */}
            <div className="bg-black aspect-video flex flex-col items-center justify-center relative">
              <div className="text-center">
                <motion.div
                  className="text-8xl mb-4"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🎬
                </motion.div>
                <p className="text-white text-xl font-light mb-8">
                  {videos.find((v) => v.id === selectedVideo)?.title}
                </p>
                <p className="text-white/60 text-sm">
                  Video player will appear here when videos are uploaded
                </p>
              </div>

              {/* Close button */}
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors text-4xl"
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

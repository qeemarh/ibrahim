'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { IoArrowBack } from 'react-icons/io5';

const activities = [
  {
    id: 'cake',
    title: 'Birthday Cake',
    description: 'Blow out the candles & make a wish',
    icon: '🍰',
    href: '/cake',
    color: 'from-purple-400 to-primary',
  },
  {
    id: 'videos',
    title: 'Video Compilations',
    description: 'Watch our special moments together',
    icon: '🎬',
    href: '/videos',
    color: 'from-accent to-pink-400',
  },
  {
    id: 'quiz',
    title: 'Love Quiz',
    description: 'How well do you know us?',
    icon: '💕',
    href: '/quiz',
    color: 'from-primary to-accent',
  },
  {
    id: 'memory',
    title: 'Memory Game',
    description: 'Match our beautiful moments',
    icon: '🎮',
    href: '/memory-game',
    color: 'from-secondary to-primary',
  },
  {
    id: 'notes',
    title: 'Love Notes',
    description: 'Read messages from my heart',
    icon: '💌',
    href: '/love-notes',
    color: 'from-accent to-secondary',
  },
];

export default function MenuPage() {
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

  const hoverVariants = {
    hover: {
      scale: 1.05,
      boxShadow: '0 20px 40px rgba(156, 39, 176, 0.3)',
      transition: { duration: 0.3 },
    },
  };

  return (
    <main className="min-h-screen w-full bg-background py-8 md:py-16">
      {/* Back button */}
      <Link
        href="/letter"
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
            Choose Your Adventure
          </h1>
          <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto">
            Explore all the surprises I&apos;ve prepared for you, my love. Pick an activity and let&apos;s celebrate!
          </p>
        </motion.div>

        {/* Activity Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {activities.map((activity) => (
            <motion.div key={activity.id} variants={itemVariants}>
              <Link href={activity.href}>
                <motion.div
                  className={`relative h-64 rounded-3xl bg-gradient-to-br ${activity.color} p-6 md:p-8 text-white shadow-xl cursor-pointer overflow-hidden group`}
                  whileHover="hover"
                  variants={hoverVariants}
                >
                  {/* Background glow effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute inset-0 bg-black/10 blur-xl" />
                  </div>

                  {/* Content */}
                  <div className="relative h-full flex flex-col justify-between">
                    <div>
                      <div className="text-6xl mb-4">{activity.icon}</div>
                      <h2 className="text-2xl md:text-3xl font-serif font-bold mb-2">
                        {activity.title}
                      </h2>
                      <p className="text-white/90 text-sm md:text-base">
                        {activity.description}
                      </p>
                    </div>

                    {/* Arrow indicator */}
                    <motion.div
                      className="flex items-center gap-2"
                      initial={{ x: 0 }}
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="text-sm font-semibold">Explore</span>
                      <span className="text-xl">→</span>
                    </motion.div>
                  </div>

                  {/* Border glow on hover */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl border-2 border-white/20"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Motivational Message */}
        <motion.div
          variants={itemVariants}
          className="mt-12 md:mt-16 text-center"
        >
          <p className="text-lg text-primary/70 italic">
            Each activity is a piece of my heart, created just for you. Have fun, my love!
          </p>
        </motion.div>
      </motion.div>
    </main>
  );
}

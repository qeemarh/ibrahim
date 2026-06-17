'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { IoArrowBack } from 'react-icons/io5';

const timelineEvents = [
  {
    id: 1,
    date: 'March 8, 2025',
    title: 'The Beginning',
    description: 'The day we started talking and our beautiful story began',
    icon: '💕',
  },
  {
    id: 2,
    date: 'March 15, 2025',
    title: 'Getting to Know You',
    description: 'Hours of conversations and learning more about each other',
    icon: '💬',
  },
  {
    id: 3,
    date: 'March 25, 2025',
    title: 'First Laugh Together',
    description: 'The moment your laugh made me fall harder for you',
    icon: '😊',
  },
  {
    id: 4,
    date: 'April 10, 2025',
    title: 'I Fell in Love',
    description: 'The moment I realized you\'re my forever person',
    icon: '💜',
  },
  {
    id: 5,
    date: 'June 17, 2026',
    title: 'Happy Birthday',
    description: 'Your special day - celebrating you and our love',
    icon: '🎂',
  },
];

export default function TimelinePage() {
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
        className="max-w-4xl mx-auto px-4 md:px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-12 md:mb-16">
          <h1 className="text-5xl md:text-6xl font-serif text-primary font-bold mb-4">
            Our Timeline
          </h1>
          <p className="text-lg text-foreground/70">
            The beautiful moments that brought us here
          </p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          className="relative"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Center line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-accent to-primary hidden md:block" />

          {/* Events */}
          <div className="space-y-12">
            {timelineEvents.map((event, index) => (
              <motion.div
                key={event.id}
                variants={itemVariants}
                className={`flex ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* Content */}
                <div className="flex-1 md:flex-1 md:px-8">
                  <motion.div
                    className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow"
                    whileHover={{ y: -5 }}
                  >
                    <p className="text-sm font-semibold text-accent mb-2">
                      {event.date}
                    </p>
                    <h3 className="text-2xl md:text-3xl font-serif text-primary font-bold mb-3">
                      {event.title}
                    </h3>
                    <p className="text-foreground/70 leading-relaxed">
                      {event.description}
                    </p>
                  </motion.div>
                </div>

                {/* Timeline dot and icon */}
                <div className="hidden md:flex md:flex-1 justify-center">
                  <motion.div
                    className="relative flex items-center justify-center"
                    whileHover={{ scale: 1.2 }}
                  >
                    {/* Glow */}
                    <motion.div
                      className="absolute w-12 h-12 rounded-full bg-primary/20"
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />

                    {/* Icon */}
                    <div className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-3xl shadow-lg">
                      {event.icon}
                    </div>
                  </motion.div>
                </div>

                {/* Mobile timeline dot */}
                <div className="md:hidden flex items-start pt-2">
                  <motion.div
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-xl flex-shrink-0 shadow-lg"
                    whileHover={{ scale: 1.15 }}
                  >
                    {event.icon}
                  </motion.div>
                  <div className="absolute left-0 top-8 bottom-0 w-0.5 bg-secondary/30" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Closing message */}
        <motion.div
          variants={itemVariants}
          className="mt-16 text-center"
        >
          <p className="text-lg text-primary/70 italic font-light">
            And our story continues to be written every single day with you...
          </p>
        </motion.div>
      </motion.div>
    </main>
  );
}

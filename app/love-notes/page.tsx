'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { IoArrowBack } from 'react-icons/io5';
import { useState } from 'react';

const loveNotes = [
  {
    id: 1,
    title: 'Why I Love You',
    content: 'There are a thousand reasons why I love you. The way you laugh, the way you care, the way you make me feel safe and loved. You bring out the best in me and make me want to be a better person every single day.',
    icon: '💕',
    color: 'from-red-400 to-pink-400',
  },
  {
    id: 2,
    title: 'Your Smile',
    content: 'Your smile is my favorite thing in this world. It lights up my darkest days and makes everything better. Every time I see it, I fall in love with you all over again.',
    icon: '😊',
    color: 'from-yellow-400 to-orange-400',
  },
  {
    id: 3,
    title: 'Forever with You',
    content: 'I want forever with you. I want to build dreams together, create memories that last a lifetime, and grow old loving you more and more each day. You\'re not just my love, you\'re my forever.',
    icon: '👑',
    color: 'from-purple-400 to-pink-400',
  },
  {
    id: 4,
    title: 'My Safe Place',
    content: 'In a world that can be chaotic and unpredictable, you are my safe place. Your arms feel like home. With you, I can be completely myself and know that I\'m loved unconditionally.',
    icon: '🏠',
    color: 'from-blue-400 to-cyan-400',
  },
  {
    id: 5,
    title: 'Grateful for You',
    content: 'Every day I wake up grateful for you. Grateful for the little things - the good morning messages, the late-night talks, the way you listen. Grateful for choosing me and loving me like you do.',
    icon: '🙏',
    color: 'from-green-400 to-emerald-400',
  },
  {
    id: 6,
    title: 'You Complete Me',
    content: 'Before you, I didn\'t realize what was missing. Now I know - it was you. You complete me in ways I never imagined possible. You\'re my better half, my soulmate, my everything.',
    icon: '💜',
    color: 'from-primary to-accent',
  },
];

export default function LoveNotesPage() {
  const [selectedNote, setSelectedNote] = useState<number | null>(null);

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
            Love Notes
          </h1>
          <p className="text-lg text-foreground/70">
            Messages from my heart to yours
          </p>
        </motion.div>

        {/* Notes Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {loveNotes.map((note) => (
            <motion.div
              key={note.id}
              variants={itemVariants}
              onClick={() => setSelectedNote(note.id)}
              className="group cursor-pointer"
            >
              <motion.div
                className={`h-80 rounded-3xl bg-gradient-to-br ${note.color} p-6 md:p-8 text-white shadow-xl overflow-hidden relative`}
                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(156, 39, 176, 0.3)' }}
                transition={{ duration: 0.3 }}
              >
                {/* Background decoration */}
                <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-white/10 rounded-full blur-2xl" />

                {/* Content */}
                <div className="relative h-full flex flex-col justify-between">
                  <div>
                    <div className="text-6xl mb-4">{note.icon}</div>
                    <h2 className="text-2xl md:text-3xl font-serif font-bold mb-2">
                      {note.title}
                    </h2>
                  </div>

                  {/* Read more indicator */}
                  <motion.div
                    className="flex items-center gap-2"
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="text-sm font-semibold">Read Note</span>
                    <span className="text-xl">→</span>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Modal for full note */}
        {selectedNote && (
          <motion.div
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setSelectedNote(null)}
          >
            <motion.div
              className="bg-white rounded-3xl p-8 md:p-12 max-w-2xl w-full max-h-96 overflow-y-auto"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {loveNotes.find((n) => n.id === selectedNote) && (
                <>
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-5xl">
                      {loveNotes.find((n) => n.id === selectedNote)?.icon}
                    </span>
                    <h2 className="text-3xl md:text-4xl font-serif text-primary font-bold">
                      {loveNotes.find((n) => n.id === selectedNote)?.title}
                    </h2>
                  </div>

                  <p className="text-lg text-foreground/80 leading-relaxed mb-8">
                    {loveNotes.find((n) => n.id === selectedNote)?.content}
                  </p>

                  <button
                    onClick={() => setSelectedNote(null)}
                    className="w-full px-6 py-3 bg-primary text-white rounded-full font-semibold hover:bg-accent transition-all"
                  >
                    Close
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </main>
  );
}

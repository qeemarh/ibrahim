'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { IoArrowBack } from 'react-icons/io5';
import { useState, useEffect } from 'react';

const memoryCards = [
  { id: 1, emoji: '💕', label: 'Love' },
  { id: 2, emoji: '🌹', label: 'Rose' },
  { id: 3, emoji: '💌', label: 'Letter' },
  { id: 4, emoji: '✨', label: 'Sparkle' },
  { id: 5, emoji: '💕', label: 'Love' },
  { id: 6, emoji: '🌹', label: 'Rose' },
  { id: 7, emoji: '💌', label: 'Letter' },
  { id: 8, emoji: '✨', label: 'Sparkle' },
  { id: 9, emoji: '👑', label: 'King' },
  { id: 10, emoji: '💜', label: 'Purple Heart' },
  { id: 11, emoji: '👑', label: 'King' },
  { id: 12, emoji: '💜', label: 'Purple Heart' },
];

export default function MemoryGamePage() {
  const [cards, setCards] = useState<typeof memoryCards>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const shuffled = [...memoryCards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setGameWon(false);
  };

  useEffect(() => {
    if (matched.length === cards.length && cards.length > 0) {
      setGameWon(true);
    }
  }, [matched, cards.length]);

  const toggleFlip = (index: number) => {
    if (flipped.includes(index) || matched.includes(index) || flipped.length === 2) {
      return;
    }

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(moves + 1);

      if (cards[newFlipped[0]].emoji === cards[newFlipped[1]].emoji) {
        setMatched([...matched, ...newFlipped]);
        setFlipped([]);
      } else {
        setTimeout(() => {
          setFlipped([]);
        }, 1000);
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
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

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4 },
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
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-serif text-primary font-bold mb-4">
            Memory Game
          </h1>
          <p className="text-lg text-foreground/70">
            Match pairs of our favorite symbols
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={itemVariants}
          className="flex justify-between items-center mb-8 bg-white rounded-2xl p-6 shadow-lg"
        >
          <div>
            <p className="text-sm text-foreground/70 font-light">Pairs Matched</p>
            <p className="text-3xl font-bold text-primary">
              {matched.length / 2}/{cards.length / 2}
            </p>
          </div>
          <div>
            <p className="text-sm text-foreground/70 font-light">Moves</p>
            <p className="text-3xl font-bold text-accent">{moves}</p>
          </div>
          <button
            onClick={initializeGame}
            className="px-6 py-3 bg-primary text-white rounded-full font-semibold hover:bg-accent transition-all"
          >
            New Game
          </button>
        </motion.div>

        {/* Game Grid */}
        <motion.div
          className="grid grid-cols-3 md:grid-cols-4 gap-4 md:gap-6 mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {cards.map((card, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              onClick={() => toggleFlip(index)}
              className="aspect-square cursor-pointer"
            >
              <motion.div
                className={`w-full h-full rounded-2xl flex items-center justify-center font-bold text-4xl md:text-5xl transition-all ${
                  flipped.includes(index) || matched.includes(index)
                    ? 'bg-white border-2 border-primary shadow-lg'
                    : 'bg-gradient-to-br from-primary to-accent hover:shadow-lg'
                }`}
                initial={false}
                animate={{
                  rotateY: flipped.includes(index) || matched.includes(index) ? 0 : 180,
                }}
                transition={{ duration: 0.4 }}
                style={{ perspective: '1000px' }}
              >
                {(flipped.includes(index) || matched.includes(index)) && card.emoji}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Win Message */}
        <AnimatePresence>
          {gameWon && (
            <motion.div
              className="text-center space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <motion.div
                className="text-7xl"
                animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                🎉
              </motion.div>
              <h2 className="text-3xl md:text-4xl font-serif text-primary font-bold">
                You Won!
              </h2>
              <p className="text-lg text-foreground/70">
                Completed in {moves} moves!
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <button
                  onClick={initializeGame}
                  className="px-8 py-4 bg-primary text-white rounded-full font-semibold hover:bg-accent transition-all shadow-lg hover:shadow-xl"
                >
                  Play Again
                </button>
                <Link
                  href="/menu"
                  className="px-8 py-4 bg-secondary text-foreground rounded-full font-semibold hover:bg-primary hover:text-white transition-all shadow-lg hover:shadow-xl"
                >
                  Back to Menu
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </main>
  );
}

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { IoArrowBack } from 'react-icons/io5';

export default function LetterPage() {
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  const images = [
    {
      src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-06-13%20at%2014.19.57-EH2hYjLEOZ5JGHksULQUaFDrvoHMPJ.jpeg',
      alt: 'Photo 1',
    },
    {
      src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-06-13%20at%2014.19.58-iGEglRni5nOjkAvySjEuHxKD7HYMMa.jpeg',
      alt: 'Photo 2',
    },
    {
      src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-06-13%20at%2014.19.53%20%283%29-wjXGB8StL6i3X39PU4ADfqwbF60FjS.jpeg',
      alt: 'Photo 3',
    },
    {
      src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-06-13%20at%2014.19.53%20%284%29-5ie2Kklo8J4G9zaK2qixR9fBB0RUHS.jpeg',
      alt: 'Photo 4',
    },
    {
      src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-06-17%20at%2019.29.57%20%282%29-ileNRSYjEBUL7cTq6CI9pK5jCEW0RY.jpeg',
      alt: 'Photo 5',
    },
    {
      src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-06-13%20at%2014.19.53%20%282%29-n7ILbRZzcuJ04GWWiIZdiejDLb8JsL.jpeg',
      alt: 'Photo 6',
    },
    {
      src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-06-17%20at%2019.29.57%20%281%29-yie2A45tPZouMTROBJtF0OYJ8OVQG0.jpeg',
      alt: 'Photo 7',
    },
    {
      src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-06-17%20at%2019.29.57-mJqQilELeOX2jZryxpPoyoNx05zQeM.jpeg',
      alt: 'Photo 8',
    },
  ];

  const letterContent = `Happy Birthday, Ishola mi ❤️

Before everything, I pray that Allah blesses this year of your life with endless blessings, success in all your endeavors, good health, and a heart filled with peace. May He increase your wisdom, strengthen your faith, and grant you all the goodness you deserve. Ameen.

I still can't believe I'm the one writing this to you. On the 8th of March, when you sent me that "Asalamualaikum" message on Instagram during Ramadan, I had no idea that one simple greeting would change my entire life. But here we are, and I'm so grateful Allah knew what I needed before I even knew it myself.

Do you remember how we just... vibed? From that very first conversation, it felt different. It felt right. I can go back to check our chats from that day—the way you made me feel seen, heard, and valued from the very beginning. That was the moment I started falling for you, even if I didn't fully realize it yet.

And then March 28th came. The day you asked me to be your girlfriend with flowers and a handwritten letter. I still have that letter, you know. When I read it, I'm reminded of exactly why my heart chose you. That day made it official—you became the most important person in my world.

I'm grateful for every conversation we've had. For every time you've made me laugh until my stomach hurt. For the inside jokes that only we understand—Tunde, "if you beat me good for you, but if I beat you," the sips self-control sticker. These are the little moments that make our love story uniquely ours.

I'm grateful that you were brave enough to say "I love you" first. That moment was terrifying and beautiful all at once. And I'm grateful that I get to love you back with everything I have. Some days I wonder how I got so lucky to call you mine.

I love that Ibrahim (my Ibrahim) cares so deeply about everyone around him. Your heart is the most beautiful thing about you, and I hope you never lose that goodness.

Thank you for these almost 3 months of being officially yours. They've been the happiest of my life. Thank you for showing up for me every single day. Thank you for listening when I need to talk. Thank you for being patient, kind, and consistently choosing me.

I know this year will bring you everything you've been praying for. I know Allah has amazing plans for us. And I'm honored to be on this journey with you.

Happy Birthday, my love. May this year be filled with happiness, laughter, unforgettable memories, and all the blessings your beautiful heart deserves.

Forever yours,
Asmau 💜❤️`;

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

  const handleEnvelopeClick = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setIsLetterOpen(true);
        setIsAnimating(false);
      }, 800);
    }
  };

  return (
    <main className="min-h-screen w-full bg-background py-8 md:py-16">
      {/* Back button */}
      <Link
        href="/"
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Photo Gallery */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif text-primary font-bold">
              Ishola mi
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {images.slice(0, 2).map((image, index) => (
                <motion.div
                  key={index}
                  className="relative group"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-white p-2">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-300 rounded-2xl"
                    />
                    <div className="absolute inset-2 rounded-2xl border-4 border-accent opacity-20 pointer-events-none" />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* View All Photos Button */}
            {!showAllPhotos && (
              <motion.button
                onClick={() => setShowAllPhotos(true)}
                className="mt-4 px-6 py-3 bg-primary text-white rounded-full font-semibold hover:bg-accent transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View All {images.length} Photos
              </motion.button>
            )}

            {/* All Photos Modal */}
            {showAllPhotos && (
              <motion.div
                className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => setShowAllPhotos(false)}
              >
                <motion.div
                  className="bg-white rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-serif text-primary font-bold">All Moments</h3>
                    <button
                      onClick={() => setShowAllPhotos(false)}
                      className="text-2xl text-accent hover:text-primary transition"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {images.map((image, index) => (
                      <motion.div
                        key={index}
                        className="relative group"
                        whileHover={{ scale: 1.05 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-white p-2">
                          <img
                            src={image.src}
                            alt={image.alt}
                            className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-300 rounded-2xl"
                          />
                          <div className="absolute inset-2 rounded-2xl border-4 border-accent opacity-20 pointer-events-none" />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            )}
            <p className="text-muted-foreground italic text-lg">
              Your beautiful moments, forever cherished in my heart...
            </p>
          </motion.div>

          {/* Love Letter as Decorated Envelope */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif text-primary font-bold">
              A Letter from Your Heart
            </h2>

            {/* Decorated Envelope */}
            {!isLetterOpen ? (
              <motion.div
                className="relative cursor-pointer h-96"
                onClick={handleEnvelopeClick}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* Envelope body */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-b from-accent to-primary rounded-lg shadow-2xl overflow-hidden"
                  animate={isAnimating ? { rotateZ: -15, y: -20 } : { rotateZ: 0, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  {/* Envelope decoration */}
                  <div className="absolute inset-0 bg-white/5 opacity-30" />

                  {/* Flap */}
                  <motion.div
                    className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-primary to-accent origin-top"
                    animate={isAnimating ? { rotateX: 180, opacity: 0 } : { rotateX: 0, opacity: 1 }}
                    transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
                    style={{ perspective: '1000px' }}
                  >
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center text-white">
                        <p className="text-sm font-light">To my Love</p>
                        <p className="text-xl font-serif font-bold">Ibrahim Sulu-Gambari</p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Letter edges showing */}
                  <div className="absolute inset-0 flex items-center justify-center pt-32">
                    <div className="text-center text-white">
                      <p className="text-4xl mb-4">💌</p>
                      <p className="text-lg font-serif">Click to reveal your gift</p>
                    </div>
                  </div>

                  {/* Decorative ribbons and patterns */}
                  <div className="absolute top-4 left-4 text-2xl">✨</div>
                  <div className="absolute top-4 right-4 text-2xl">💝</div>
                  <div className="absolute bottom-4 left-4 text-2xl">🌹</div>
                  <div className="absolute bottom-4 right-4 text-2xl">💖</div>
                </motion.div>

                {/* Stickman pulling letter animation */}
                {isAnimating && (
                  <motion.div
                    className="absolute -right-20 top-1/2 transform -translate-y-1/2 z-20"
                    initial={{ x: 0 }}
                    animate={{ x: 40 }}
                    transition={{ duration: 0.8 }}
                  >
                    <div className="relative w-16 h-16">
                      {/* Head with face */}
                      <div className="absolute top-0 left-4 w-8 h-8 bg-gradient-to-b from-accent to-primary rounded-full border-2 border-primary">
                        <div className="flex items-center justify-center w-full h-full">
                          <span className="text-sm">😊</span>
                        </div>
                      </div>
                      {/* Body */}
                      <line x1="8" y1="8" x2="8" y2="20" stroke="currentColor" strokeWidth="2" />
                      {/* Arms */}
                      <line x1="2" y1="12" x2="14" y2="12" stroke="currentColor" strokeWidth="2" />
                      {/* Legs */}
                      <line x1="4" y1="20" x2="2" y2="28" stroke="currentColor" strokeWidth="2" />
                      <line x1="12" y1="20" x2="14" y2="28" stroke="currentColor" strokeWidth="2" />
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ) : (
              /* Full Letter Display */
              <motion.div
                className="bg-white rounded-2xl shadow-2xl p-8 md:p-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="space-y-6 max-h-96 overflow-y-auto">
                  {letterContent.split('\n\n').map((paragraph, index) => (
                    <motion.p
                      key={index}
                      className="text-foreground/80 leading-relaxed font-light text-lg"
                      style={{ fontFamily: 'Georgia, serif' }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      {paragraph}
                    </motion.p>
                  ))}
                </div>

                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  onClick={() => setIsLetterOpen(false)}
                  className="mt-8 w-full bg-primary text-white py-3 rounded-full font-semibold hover:bg-accent transition-all"
                >
                  Close Letter
                </motion.button>
              </motion.div>
            )}

            {!isLetterOpen && (
              <motion.p
                className="text-center text-muted-foreground text-base font-light"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Click the envelope to read your love letter 💌
              </motion.p>
            )}
          </motion.div>
        </div>

        {/* Continue to Menu Button */}
        {isLetterOpen && (
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Link
              href="/menu"
              className="inline-block px-10 py-4 bg-primary text-white rounded-full font-semibold text-lg hover:bg-accent transition-all shadow-lg hover:shadow-xl"
            >
              Explore More Surprises 💜
            </Link>
          </motion.div>
        )}
      </motion.div>
    </main>
  );
}

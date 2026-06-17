'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { IoArrowBack } from 'react-icons/io5';

export default function LetterPage() {
  const [isLetterOpen, setIsLetterOpen] = useState(false);

  const images = [
    {
      src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-06-13%20at%2014.19.57-EH2hYjLEOZ5JGHksULQUaFDrvoHMPJ.jpeg',
      alt: 'Photo 1',
    },
    {
      src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-06-13%20at%2014.19.58-iGEglRni5nOjkAvySjEuHxKD7HYMMa.jpeg',
      alt: 'Photo 2',
    },
  ];

  const letterContent = `Ayanfe mi, Happy birthday Ibrahim Sulu-Gambari,

As I write this, my heart is filled with so much love and gratitude for you. Today marks another year of your beautiful existence, and I just had to make sure you know how special you are to me.

From the moment I met you, I knew you were different. Your smile lights up my world, and your love has changed me in ways I never thought possible. You make every day feel like an adventure, and with you by my side, I can conquer anything.

I love the little things about you—the way you laugh, the way you hold my hand, the way you look at me like I'm your whole world. You're my best friend, my partner, and my greatest blessing.

Thank you for being so patient, so kind, and so incredibly loving. Thank you for believing in us and for never giving up on me. You've taught me what true love really means.

As you celebrate today, I want you to know that I'm celebrating YOU—all that you are, all that you've done for me, and all the beautiful memories we're still going to create together.

Here's to another year of laughter, adventure, and endless love. I can't wait to spend it all with you.

Forever yours,
Your Love ❤️`;

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
        href="/"
        className="inline-flex items-center gap-2 ml-4 md:ml-8 text-primary hover:text-accent transition-colors mb-8"
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
              Our Memories
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {images.map((image, index) => (
                <motion.div
                  key={index}
                  className="relative group"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative overflow-hidden rounded-2xl shadow-lg">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {/* Decorative frame */}
                    <div className="absolute inset-0 border-8 border-secondary opacity-30 rounded-2xl pointer-events-none" />
                  </div>
                </motion.div>
              ))}
            </div>
            <p className="text-muted-foreground italic">
              More photos coming soon as we grow our collection together...
            </p>
          </motion.div>

          {/* Love Letter as Envelope */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif text-primary font-bold">
              A Letter for You
            </h2>

            {/* Envelope Design */}
            <motion.div
              className="bg-white rounded-lg shadow-2xl overflow-hidden cursor-pointer"
              onClick={() => setIsLetterOpen(!isLetterOpen)}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div
                className={`relative transition-all duration-500 ${
                  isLetterOpen ? 'h-auto' : 'h-48'
                }`}
              >
                {/* Envelope flap */}
                <div
                  className={`absolute top-0 left-0 right-0 bg-gradient-to-b from-secondary to-secondary/80 p-6 md:p-8 transition-all duration-500 ${
                    isLetterOpen
                      ? 'rotate-x-180 transform opacity-0 h-0'
                      : 'h-32 md:h-40'
                  }`}
                >
                  <div className="flex items-center justify-between h-full">
                    <div>
                      <p className="text-sm text-foreground/70">To my Love</p>
                      <p className="text-lg font-serif text-primary font-semibold">
                        Ibrahim
                      </p>
                    </div>
                    <button
                      className="text-primary hover:text-accent transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsLetterOpen(true);
                      }}
                    >
                      <span className="text-sm font-medium border-2 border-primary px-4 py-2 rounded-full hover:bg-primary hover:text-white transition-all">
                        Read more
                      </span>
                    </button>
                  </div>
                </div>

                {/* Letter content */}
                <div
                  className={`p-6 md:p-8 bg-white transition-all duration-500 ${
                    isLetterOpen ? 'pt-8' : 'pt-40 md:pt-44'
                  }`}
                >
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {letterContent.split('\n\n').map((paragraph, index) => (
                      <p
                        key={index}
                        className="text-foreground/80 leading-relaxed font-light whitespace-pre-wrap"
                        style={{ fontFamily: 'cursive' }}
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {isLetterOpen && (
                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-6 text-primary hover:text-accent transition-colors text-sm font-medium border-t-2 border-secondary pt-4"
                      onClick={() => setIsLetterOpen(false)}
                    >
                      Close letter
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>

            {!isLetterOpen && (
              <p className="text-center text-muted-foreground text-sm">
                Click the envelope to read my full letter to you 💌
              </p>
            )}
          </motion.div>
        </div>
      </motion.div>
    </main>
  );
}

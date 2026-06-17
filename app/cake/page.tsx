'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { IoArrowBack } from 'react-icons/io5';
import { useState, useRef, useEffect } from 'react';

export default function CakePage() {
  const [blownOut, setBlownOut] = useState(false);
  const [cakeRevealed, setCakeRevealed] = useState(false);
  const [micPermission, setMicPermission] = useState<'pending' | 'granted' | 'denied'>('pending');
  const [isListening, setIsListening] = useState(false);
  const [decibels, setDecibels] = useState(0);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const requestMicPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);
      analyserRef.current = analyser;

      setMicPermission('granted');
      startListening();
    } catch {
      setMicPermission('denied');
    }
  };

  const startListening = () => {
    setIsListening(true);
    const dataArray = new Uint8Array(analyserRef.current?.frequencyBinCount || 128);

    const checkAudio = () => {
      if (!analyserRef.current) return;
      
      analyserRef.current.getByteFrequencyData(dataArray);
      const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
      
      setDecibels(average);

      if (average > 70) {
        setBlownOut(true);
        setIsListening(false);
        stopMicrophone();
        
        setTimeout(() => {
          setCakeRevealed(true);
        }, 1000);
      }

      animationFrameRef.current = requestAnimationFrame(checkAudio);
    };

    checkAudio();
  };

  const stopMicrophone = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  };

  const manualBlow = () => {
    setBlownOut(true);
    stopMicrophone();
    setTimeout(() => {
      setCakeRevealed(true);
    }, 1000);
  };

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
            Make a Wish
          </h1>
          <p className="text-lg text-foreground/70">
            Blow out the candles and make your wish come true
          </p>
        </motion.div>

        {/* Cake Container */}
        <motion.div
          variants={itemVariants}
          className="relative flex justify-center mb-12"
        >
          <div className="relative w-full max-w-md">
            {/* Birthday Cake - Realistic Design */}
            <div className="relative h-96">
              {/* Cake layers */}
              <motion.div
                className="absolute inset-0 flex flex-col justify-end items-center"
                animate={blownOut ? { y: 20, opacity: 0.5 } : { y: 0, opacity: 1 }}
              >
                {/* Top layer - chocolate cake with frosting */}
                <div className="relative w-56 h-24 bg-gradient-to-b from-amber-700 to-amber-900 rounded-t-3xl shadow-2xl border-4 border-amber-800">
                  {/* Vanilla frosting swirls on top */}
                  <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-amber-100 to-amber-50 rounded-t-3xl opacity-90" />
                  
                  {/* Decorative frosting piping */}
                  <div className="absolute -top-1 left-6 w-3 h-5 bg-amber-100 rounded-full opacity-70" />
                  <div className="absolute -top-1 left-16 w-2 h-4 bg-amber-100 rounded-full opacity-70" />
                  <div className="absolute -top-1 right-16 w-2 h-4 bg-amber-100 rounded-full opacity-70" />
                  <div className="absolute -top-1 right-6 w-3 h-5 bg-amber-100 rounded-full opacity-70" />
                </div>

                {/* Middle layer */}
                <div className="relative w-64 h-28 bg-gradient-to-b from-amber-800 to-amber-950 rounded-3xl shadow-2xl border-4 border-amber-900">
                  {/* Frosting drip effect */}
                  <div className="absolute top-0 left-0 w-full h-6 bg-gradient-to-b from-amber-100 to-transparent opacity-70 rounded-t-2xl" />
                  
                  {/* Decorative details */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex gap-8">
                      <div className="text-2xl">💜</div>
                      <div className="text-2xl">✨</div>
                      <div className="text-2xl">💜</div>
                    </div>
                  </div>
                </div>

                {/* Bottom layer - base */}
                <div className="w-80 h-32 bg-gradient-to-b from-amber-900 to-amber-950 rounded-b-3xl shadow-2xl border-4 border-amber-900">
                  {/* Frosting details on side */}
                  <div className="absolute top-0 left-0 w-full h-6 bg-gradient-to-b from-amber-100 to-transparent opacity-60 rounded-t-2xl" />
                </div>

                {/* Decorative cake plate */}
                <div className="w-96 h-8 bg-gradient-to-b from-gray-300 to-gray-400 rounded-full shadow-2xl border-2 border-gray-500" />
              </motion.div>

              {/* Realistic candles with layered flames */}
              <AnimatePresence>
                {!blownOut && (
                  <>
                    {[0, 1, 2, 3].map((index) => (
                      <motion.div
                        key={`candle-${index}`}
                        className="absolute top-10"
                        style={{
                          left: `${16 + index * 22}%`,
                        }}
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{ duration: 0.6 }}
                      >
                        {/* Candle wax - cream/ivory colored with texture */}
                        <div className="relative w-4 h-24 mx-auto">
                          {/* Main candle body */}
                          <div className="absolute inset-0 bg-gradient-to-b from-yellow-50 via-amber-50 to-amber-100 rounded-full shadow-lg border border-yellow-200" />
                          
                          {/* Candle texture lines */}
                          <div className="absolute left-0.5 top-2 w-1 h-16 bg-gradient-to-b from-yellow-200 to-transparent opacity-40 rounded-full" />
                          <div className="absolute right-0.5 top-3 w-1 h-14 bg-gradient-to-b from-yellow-100 to-transparent opacity-30 rounded-full" />
                          
                          {/* Flame core - bright yellow inner flame */}
                          <motion.div
                            className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-2.5 h-8 origin-bottom"
                            animate={{
                              scaleY: [1, 1.15, 0.95, 1.1, 1],
                              rotateZ: [0, -3, 3, -2, 0],
                            }}
                            transition={{
                              duration: 1.2,
                              repeat: Infinity,
                              ease: 'easeInOut',
                              delay: index * 0.15,
                            }}
                          >
                            <div className="w-full h-full bg-gradient-to-t from-amber-400 via-yellow-300 to-yellow-100 rounded-full" />
                          </motion.div>

                          {/* Flame middle - orange glow */}
                          <motion.div
                            className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-4 h-9 rounded-full origin-bottom opacity-70"
                            style={{
                              background: 'linear-gradient(to top, rgba(255, 140, 0, 0.6), rgba(255, 165, 0, 0.3))',
                            }}
                            animate={{
                              scaleY: [1, 1.1, 0.9, 1.05, 1],
                              rotateZ: [0, -2, 2, -1, 0],
                            }}
                            transition={{
                              duration: 1.2,
                              repeat: Infinity,
                              ease: 'easeInOut',
                              delay: index * 0.15,
                            }}
                          />

                          {/* Flame outer glow - soft halo */}
                          <motion.div
                            className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-6 h-10 rounded-full blur-md origin-bottom"
                            style={{
                              background: 'radial-gradient(ellipse at center, rgba(255, 165, 0, 0.4) 0%, rgba(255, 100, 0, 0.1) 100%)',
                            }}
                            animate={{
                              scale: [1, 1.2, 0.95, 1.15, 1],
                              opacity: [0.5, 0.7, 0.4, 0.6, 0.5],
                            }}
                            transition={{
                              duration: 1.2,
                              repeat: Infinity,
                              ease: 'easeInOut',
                              delay: index * 0.15,
                            }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Sparkles around cake */}
          <AnimatePresence>
            {cakeRevealed && (
              <>
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={`sparkle-${i}`}
                    className="absolute text-4xl"
                    initial={{
                      x: 0,
                      y: 0,
                      opacity: 1,
                    }}
                    animate={{
                      x: Math.cos((i / 12) * Math.PI * 2) * 200,
                      y: Math.sin((i / 12) * Math.PI * 2) * 200,
                      opacity: 0,
                    }}
                    transition={{
                      duration: 1.5,
                      ease: 'easeOut',
                    }}
                  >
                    ✨
                  </motion.div>
                ))}
              </>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Microphone Section */}
        {!blownOut && (
          <motion.div variants={itemVariants} className="text-center mb-8">
            {micPermission === 'pending' ? (
              <button
                onClick={requestMicPermission}
                className="px-8 py-4 bg-primary text-white rounded-full font-semibold text-lg hover:bg-accent transition-all shadow-lg hover:shadow-xl"
              >
                Allow Microphone Access
              </button>
            ) : micPermission === 'granted' && !isListening ? (
              <button
                onClick={startListening}
                className="px-8 py-4 bg-primary text-white rounded-full font-semibold text-lg hover:bg-accent transition-all shadow-lg hover:shadow-xl"
              >
                Start Listening
              </button>
            ) : null}

            {isListening && (
              <div className="space-y-4">
                {/* Audio visualizer */}
                <motion.div
                  className="flex items-end justify-center gap-1 h-16"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                >
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-2 bg-gradient-to-t from-primary to-accent rounded-full"
                      style={{
                        height: `${(decibels / 255) * 60 + 10}px`,
                      }}
                      animate={{
                        height: `${(decibels / 255) * 60 + (Math.sin(i + Date.now() / 100) * 20)}px`,
                      }}
                      transition={{ duration: 0.1 }}
                    />
                  ))}
                </motion.div>

                <p className="text-foreground/70 font-light">
                  Blow hard! {decibels > 50 ? '🎯 Getting close!' : ''}
                </p>
              </div>
            )}

            {/* Manual blow option */}
            {micPermission === 'denied' && !blownOut && (
              <div className="space-y-4">
                <p className="text-accent text-sm">Microphone access denied</p>
                <button
                  onClick={manualBlow}
                  className="px-8 py-4 bg-secondary text-foreground rounded-full font-semibold hover:bg-accent hover:text-white transition-all"
                >
                  Blow Out Candles (Manual)
                </button>
              </div>
            )}
          </motion.div>
        )}

        {/* Success Message */}
        <AnimatePresence>
          {blownOut && !cakeRevealed && (
            <motion.div
              variants={itemVariants}
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <p className="text-2xl font-serif text-primary mb-4">
                Wish coming true...
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Celebration & Next Step */}
        <AnimatePresence>
          {cakeRevealed && (
            <motion.div
              variants={itemVariants}
              className="text-center space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <motion.div
                className="text-6xl"
                animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                🎉
              </motion.div>
              <h2 className="text-3xl md:text-4xl font-serif text-primary font-bold">
                Your Wish is My Command
              </h2>
              <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                Now let&apos;s celebrate more! Here are more surprises waiting for you.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Link
                  href="/videos"
                  className="px-8 py-4 bg-primary text-white rounded-full font-semibold hover:bg-accent transition-all shadow-lg hover:shadow-xl"
                >
                  Watch Videos
                </Link>
                <Link
                  href="/quiz"
                  className="px-8 py-4 bg-secondary text-foreground rounded-full font-semibold hover:bg-primary hover:text-white transition-all shadow-lg hover:shadow-xl"
                >
                  Take the Quiz
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </main>
  );
}

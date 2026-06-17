'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const CORRECT_PASSCODE = '0803';

const HINTS = [
  'Think about when our story began...',
  'It\'s a special date in March...',
  'The day we first started talking...',
  'March 8th - 0-8-0-3...',
];

export default function PasscodePage() {
  const router = useRouter();
  const [passcode, setPasscode] = useState('');
  const [isWrong, setIsWrong] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [hintIndex, setHintIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Check if already unlocked
    const unlocked = localStorage.getItem('birthdayUnlocked');
    if (unlocked) {
      router.push('/');
    }
  }, [router]);

  const handleDigitClick = (digit: string) => {
    if (passcode.length < 4) {
      setPasscode(passcode + digit);
      setIsWrong(false);
      setShowHint(false);
    }
  };

  const handleBackspace = () => {
    setPasscode(passcode.slice(0, -1));
  };

  const handleSubmit = () => {
    if (passcode.length === 4) {
      if (passcode === CORRECT_PASSCODE) {
        localStorage.setItem('birthdayUnlocked', 'true');
        // Set cookie for middleware
        document.cookie = 'birthdayUnlocked=true; path=/; max-age=31536000';
        router.push('/');
      } else {
        setIsWrong(true);
        setAttemptCount(attemptCount + 1);
        setShowHint(true);
        setHintIndex(Math.min(attemptCount, HINTS.length - 1));
        setTimeout(() => {
          setPasscode('');
        }, 500);
      }
    }
  };

  if (!isClient) {
    return null;
  }

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-background via-secondary/20 to-background overflow-hidden flex items-center justify-center relative py-8">
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-10 right-20 text-5xl"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          💜
        </motion.div>
        <motion.div
          className="absolute bottom-20 left-10 text-5xl"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: 0.3 }}
        >
          💖
        </motion.div>
      </div>

      <motion.div
        className="relative z-10 max-w-md w-full px-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Photo with frame */}
        <div className="flex justify-center mb-8">
          <motion.div
            animate={isWrong ? { x: [-10, 10, -10, 0], rotate: [-2, 2, -2, 0] } : { x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="w-56 h-56 bg-white rounded-2xl p-3 shadow-2xl">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-06-13%20at%2014.06.55-xbkhOK20pDEB1RYOk8pDLgXIK2JgF9.jpeg"
                alt="Baby picture"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="absolute -inset-4 rounded-2xl border-4 border-primary opacity-40 pointer-events-none" />

            {/* Sad emoji on wrong attempt */}
            {isWrong && (
              <motion.div
                className="absolute -top-6 -right-6 text-6xl"
                animate={{ scale: [0.8, 1, 0.8] }}
                transition={{ duration: 0.6 }}
              >
                😔
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Title */}
        <motion.div
          className="text-center mb-8"
          animate={isWrong ? { scale: [1, 1.05, 1] } : { scale: 1 }}
        >
          <h1 className="text-4xl md:text-5xl font-serif text-primary font-bold mb-2">
            Happy birthday
          </h1>
          <p className="text-2xl md:text-3xl font-serif text-accent">
            my love
          </p>
        </motion.div>

        {/* Passcode input display */}
        <div className="flex justify-center gap-4 mb-8">
          {[0, 1, 2, 3].map((index) => (
            <motion.div
              key={index}
              className={`w-16 h-16 rounded-xl flex items-center justify-center text-2xl font-bold border-2 transition-all ${
                index < passcode.length
                  ? 'bg-primary/10 border-primary text-primary'
                  : 'bg-secondary/30 border-border'
              }`}
              animate={
                index < passcode.length
                  ? { scale: [0.8, 1.1, 1] }
                  : { scale: 1 }
              }
              transition={{ duration: 0.3 }}
            >
              {index < passcode.length ? '●' : ''}
            </motion.div>
          ))}
        </div>

        {/* Wrong attempt message */}
        {isWrong && (
          <motion.div
            className="text-center mb-6 p-4 bg-accent/10 rounded-lg border border-accent"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-accent font-semibold mb-2">Not quite right... 💭</p>
            {showHint && (
              <p className="text-sm text-foreground/70 italic">
                {HINTS[hintIndex]}
              </p>
            )}
          </motion.div>
        )}

        {/* PIN Pad */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
            <motion.button
              key={digit}
              onClick={() => handleDigitClick(digit)}
              className="aspect-square rounded-xl bg-primary text-white font-semibold text-xl hover:bg-accent transition-all shadow-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {digit}
            </motion.button>
          ))}

          {/* 0 button spanning 2 columns */}
          <motion.button
            onClick={() => handleDigitClick('0')}
            className="col-span-2 aspect-square rounded-xl bg-primary text-white font-semibold text-xl hover:bg-accent transition-all shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            0
          </motion.button>

          {/* Backspace */}
          <motion.button
            onClick={handleBackspace}
            className="aspect-square rounded-xl bg-secondary text-foreground font-semibold text-xl hover:bg-secondary/80 transition-all shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ⌫
          </motion.button>
        </div>

        {/* Submit button */}
        <motion.button
          onClick={handleSubmit}
          disabled={passcode.length !== 4}
          className={`w-full py-4 rounded-full font-semibold text-lg transition-all shadow-lg ${
            passcode.length === 4
              ? 'bg-accent text-white hover:bg-primary'
              : 'bg-muted text-muted-foreground cursor-not-allowed'
          }`}
          whileHover={passcode.length === 4 ? { scale: 1.05 } : {}}
          whileTap={passcode.length === 4 ? { scale: 0.95 } : {}}
        >
          Unlock 🔓
        </motion.button>

        {/* Help text */}
        <p className="text-center text-sm text-foreground/60 mt-6">
          Think of a special date between us...
        </p>
      </motion.div>
    </main>
  );
}

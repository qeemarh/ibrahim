'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { IoArrowBack } from 'react-icons/io5';
import { useState } from 'react';

const quizQuestions = [
  {
    id: 1,
    question: 'What date did we first start talking?',
    options: ['8th March', '12th March', '15th March', '20th March'],
    correctIndex: 0,
    hint: 'It was in March...',
  },
  {
    id: 2,
    question: 'What\'s my favorite color?',
    options: ['Blue', 'Purple', 'Green', 'Red'],
    correctIndex: 1,
    hint: 'Think royalty and majesty...',
  },
  {
    id: 3,
    question: 'What\'s something I love about you?',
    options: ['Your kindness', 'Your smile', 'Your heart', 'All of the above'],
    correctIndex: 3,
    hint: 'Everything about you is special...',
  },
  {
    id: 4,
    question: 'What\'s our favorite thing to do together?',
    options: ['Talk', 'Watch movies', 'Spend time', 'Create memories'],
    correctIndex: 3,
    hint: 'We love being together...',
  },
  {
    id: 5,
    question: 'What does Ayanfe mi mean to you?',
    options: ['My love', 'My heart', 'My everything', 'All precious'],
    correctIndex: 2,
    hint: 'It\'s how I call you with all my love...',
  },
  {
    id: 6,
    question: 'What\'s your favorite quality in me?',
    options: ['My support', 'My laugh', 'My love for you', 'My care'],
    correctIndex: 2,
    hint: 'I love how you feel about me...',
  },
  {
    id: 7,
    question: 'What\'s one dream we share?',
    options: ['Travel together', 'Build a life', 'Create memories', 'All of them'],
    correctIndex: 3,
    hint: 'We dream of many things together...',
  },
  {
    id: 8,
    question: 'How do I feel when I\'m with you?',
    options: ['Happy', 'Safe', 'Complete', 'All of the above'],
    correctIndex: 3,
    hint: 'You make me feel everything beautiful...',
  },
  {
    id: 9,
    question: 'What\'s my love language?',
    options: ['Words', 'Time', 'Actions', 'Your presence'],
    correctIndex: 1,
    hint: 'I want to spend every moment with you...',
  },
  {
    id: 10,
    question: 'What do you mean to me?',
    options: ['Everything', 'My world', 'My forever', 'All true'],
    correctIndex: 3,
    hint: 'You are simply everything...',
  },
];

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [answered, setAnswered] = useState(false);

  const question = quizQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  const handleAnswer = (index: number) => {
    if (answered) return;
    
    setSelectedAnswer(index);
    setAnswered(true);

    if (index === question.correctIndex) {
      setScore(score + 1);
    }
  };

  const goToNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setAnswered(false);
      setShowHint(false);
    } else {
      setShowResult(true);
    }
  };

  const getResultMessage = (finalScore: number) => {
    const percentage = (finalScore / quizQuestions.length) * 100;

    if (percentage === 100) {
      return {
        title: 'Perfect Score!',
        message: 'You know me SO well! You truly are my perfect match. I\'m so lucky to have you!',
        emoji: '💯',
      };
    } else if (percentage >= 80) {
      return {
        title: 'Amazing!',
        message: 'You really know your way around my heart! Keep loving me like this forever.',
        emoji: '😘',
      };
    } else if (percentage >= 60) {
      return {
        title: 'Great Job!',
        message: 'You know me pretty well! Let\'s make more memories together so you know me even better.',
        emoji: '💕',
      };
    } else if (percentage >= 40) {
      return {
        title: 'Good Try!',
        message: 'We\'ve got time to get to know each other better. Let\'s create more beautiful moments together.',
        emoji: '💜',
      };
    } else {
      return {
        title: 'Let\'s Connect More!',
        message: 'No worries! Every day with you is a chance to know each other deeper. Let\'s spend more time together!',
        emoji: '🌟',
      };
    }
  };

  const result = getResultMessage(score);

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
        className="max-w-2xl mx-auto px-4 md:px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div
              key={`question-${currentQuestion}`}
              variants={itemVariants}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-4xl md:text-5xl font-serif text-primary font-bold mb-4">
                  Love Quiz
                </h1>
                <p className="text-lg text-foreground/70">
                  Test how well you know us
                </p>
              </div>

              {/* Progress bar */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-primary">
                    Question {currentQuestion + 1} of {quizQuestions.length}
                  </span>
                  <span className="text-sm font-semibold text-primary">
                    Score: {score}
                  </span>
                </div>
                <motion.div
                  className="w-full h-2 bg-secondary/30 rounded-full overflow-hidden"
                >
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary to-accent"
                    initial={{ width: `${((currentQuestion) / quizQuestions.length) * 100}%` }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </motion.div>
              </div>

              {/* Question */}
              <motion.div
                className="bg-white rounded-2xl p-8 md:p-10 shadow-lg mb-8"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="text-2xl md:text-3xl font-serif text-primary font-bold mb-8">
                  {question.question}
                </h2>

                {/* Options */}
                <div className="space-y-3">
                  {question.options.map((option, index) => (
                    <motion.button
                      key={index}
                      onClick={() => handleAnswer(index)}
                      disabled={answered}
                      className={`w-full p-4 rounded-xl font-semibold text-left transition-all ${
                        selectedAnswer === index
                          ? index === question.correctIndex
                            ? 'bg-green-100 border-2 border-green-500 text-green-900'
                            : 'bg-red-100 border-2 border-red-500 text-red-900'
                          : answered && index === question.correctIndex
                          ? 'bg-green-100 border-2 border-green-500 text-green-900'
                          : 'bg-secondary/30 border-2 border-secondary hover:border-primary text-foreground'
                      }`}
                      whileHover={!answered ? { scale: 1.02 } : {}}
                      whileTap={!answered ? { scale: 0.98 } : {}}
                    >
                      {option}
                    </motion.button>
                  ))}
                </div>

                {/* Hint and feedback */}
                {answered && (
                  <motion.div
                    className="mt-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {selectedAnswer === question.correctIndex ? (
                      <p className="text-green-600 font-semibold text-lg">
                        Correct! You know me so well!
                      </p>
                    ) : (
                      <div className="space-y-3">
                        <p className="text-red-600 font-semibold text-lg">
                          Not quite right, but that&apos;s okay!
                        </p>
                        <button
                          onClick={() => setShowHint(!showHint)}
                          className="text-primary font-semibold hover:underline"
                        >
                          {showHint ? 'Hide' : 'Show'} Hint
                        </button>
                        {showHint && (
                          <p className="text-foreground/70 italic">
                            {question.hint}
                          </p>
                        )}
                      </div>
                    )}
                  </motion.div>
                )}
              </motion.div>

              {/* Next button */}
              {answered && (
                <motion.button
                  onClick={goToNextQuestion}
                  className="w-full px-8 py-4 bg-primary text-white rounded-full font-semibold text-lg hover:bg-accent transition-all shadow-lg hover:shadow-xl"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {currentQuestion === quizQuestions.length - 1
                    ? 'See Your Score'
                    : 'Next Question'}
                </motion.button>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="results"
              variants={itemVariants}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-8"
            >
              {/* Results */}
              <motion.div
                className="bg-gradient-to-br from-primary to-accent rounded-3xl p-8 md:p-12 text-white shadow-2xl"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <motion.div
                  className="text-7xl mb-4"
                  animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  {result.emoji}
                </motion.div>

                <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
                  {result.title}
                </h2>

                <div className="text-6xl md:text-7xl font-bold mb-4">
                  {score}/{quizQuestions.length}
                </div>

                <p className="text-xl font-light mb-6">
                  ({((score / quizQuestions.length) * 100).toFixed(0)}%)
                </p>

                <p className="text-lg font-light max-w-2xl mx-auto">
                  {result.message}
                </p>
              </motion.div>

              {/* Action buttons */}
              <div className="flex gap-4 justify-center flex-wrap">
                <button
                  onClick={() => {
                    setCurrentQuestion(0);
                    setScore(0);
                    setShowResult(false);
                    setSelectedAnswer(null);
                    setAnswered(false);
                  }}
                  className="px-8 py-4 bg-primary text-white rounded-full font-semibold hover:bg-accent transition-all shadow-lg hover:shadow-xl"
                >
                  Retake Quiz
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

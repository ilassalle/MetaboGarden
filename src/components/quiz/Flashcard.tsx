'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { QuizQuestion } from '@/data/types';

interface FlashcardProps {
  question: QuizQuestion;
  onNext: () => void;
}

export default function Flashcard({ question, onNext }: FlashcardProps) {
  const [flipped, setFlipped] = useState(false);

  function handleFlip() {
    setFlipped((prev) => !prev);
  }

  function handleNext() {
    setFlipped(false);
    onNext();
  }

  return (
    <div className="space-y-4">
      {/* Perspective wrapper */}
      <div
        className="relative w-full cursor-pointer"
        style={{ perspective: 1000 }}
        onClick={handleFlip}
      >
        <motion.div
          className="relative w-full"
          style={{ transformStyle: 'preserve-3d' }}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          {/* Front */}
          <div
            className="rounded-2xl border-2 border-green-300 bg-gradient-to-br from-green-50 to-emerald-50 p-8 min-h-[220px] flex flex-col items-center justify-center text-center"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <span className="text-xs font-medium text-green-500 uppercase tracking-wider mb-3">
              Question
            </span>
            <p className="text-green-900 font-medium leading-relaxed text-lg">
              {question.questionText}
            </p>
            <span className="mt-4 text-xs text-green-400">
              Tap to reveal answer
            </span>
          </div>

          {/* Back */}
          <div
            className="absolute inset-0 rounded-2xl border-2 border-emerald-400 bg-gradient-to-br from-emerald-50 to-green-50 p-8 min-h-[220px] flex flex-col items-center justify-center text-center"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          >
            <span className="text-xs font-medium text-emerald-500 uppercase tracking-wider mb-3">
              Answer
            </span>
            <p className="text-emerald-900 font-semibold text-lg mb-3">
              {question.correctAnswer}
            </p>
            <p className="text-sm text-green-700 leading-relaxed">
              {question.explanation}
            </p>
          </div>
        </motion.div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleNext}
          className="rounded-xl bg-green-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-green-700"
        >
          Next
        </button>
      </div>
    </div>
  );
}

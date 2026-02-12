'use client';

import { motion } from 'framer-motion';
import type { QuizQuestion } from '@/data/types';

interface MultipleChoiceProps {
  question: QuizQuestion;
  onAnswer: (answer: string) => void;
  showResult: boolean;
  userAnswer?: string;
}

export default function MultipleChoice({
  question,
  onAnswer,
  showResult,
  userAnswer,
}: MultipleChoiceProps) {
  const options = question.options ?? [];

  function optionClass(option: string) {
    const base =
      'w-full text-left rounded-xl border px-4 py-3 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-400/50';

    if (!showResult) {
      return `${base} border-green-200 bg-white hover:border-green-400 hover:bg-green-50 text-green-900 cursor-pointer`;
    }

    const isCorrect = option === question.correctAnswer;
    const isSelected = option === userAnswer;

    if (isCorrect) {
      return `${base} border-emerald-400 bg-emerald-50 text-emerald-900 cursor-default`;
    }
    if (isSelected && !isCorrect) {
      return `${base} border-red-400 bg-red-50 text-red-900 cursor-default`;
    }
    return `${base} border-green-100 bg-green-50/30 text-green-700/50 cursor-default`;
  }

  return (
    <div className="space-y-4">
      <p className="text-green-900 font-medium leading-relaxed">
        {question.questionText}
      </p>

      <div className="grid gap-3">
        {options.map((option, idx) => (
          <motion.button
            key={idx}
            className={optionClass(option)}
            onClick={() => !showResult && onAnswer(option)}
            disabled={showResult}
            whileTap={!showResult ? { scale: 0.98 } : undefined}
          >
            <span className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full border border-current/20 flex items-center justify-center text-xs">
                {String.fromCharCode(65 + idx)}
              </span>
              <span>{option}</span>
            </span>

            {showResult && option === question.correctAnswer && (
              <span className="ml-auto text-emerald-600 text-xs mt-0.5">
                Correct
              </span>
            )}
            {showResult &&
              option === userAnswer &&
              option !== question.correctAnswer && (
                <span className="ml-auto text-red-500 text-xs mt-0.5">
                  Your answer
                </span>
              )}
          </motion.button>
        ))}
      </div>

      {showResult && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl bg-green-50 border border-green-200 p-4 text-sm text-green-800 leading-relaxed"
        >
          <span className="font-semibold">Explanation: </span>
          {question.explanation}
        </motion.div>
      )}
    </div>
  );
}

'use client';

import { motion } from 'framer-motion';

interface MatchFeedbackProps {
  totalPairs: number;
  matchedPairs: number;
  incorrectAttempts: number;
  onRetry: () => void;
}

function getMessage(accuracy: number): string {
  if (accuracy === 100) return 'Flawless! Your enzyme-substrate knowledge is on point!';
  if (accuracy >= 80) return 'Great recall! Just a few branches to prune.';
  if (accuracy >= 50) return 'Solid foundation! Keep growing those connections.';
  return 'Every pathway starts with a single step. Try again!';
}

export default function MatchFeedback({
  totalPairs,
  matchedPairs,
  incorrectAttempts,
  onRetry,
}: MatchFeedbackProps) {
  const totalAttempts = matchedPairs + incorrectAttempts;
  const accuracy =
    totalAttempts > 0 ? Math.round((matchedPairs / totalAttempts) * 100) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center gap-5 rounded-2xl border border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 p-8 text-center"
    >
      <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          className="w-7 h-7 text-emerald-600"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </div>

      <div>
        <p className="text-lg font-bold text-green-900 mb-1">
          All {totalPairs} pairs matched!
        </p>
        <p className="text-sm text-green-700">
          Accuracy: <span className="font-semibold">{accuracy}%</span>{' '}
          <span className="text-green-500">
            ({matchedPairs} correct, {incorrectAttempts} incorrect)
          </span>
        </p>
      </div>

      <p className="text-sm text-green-700 max-w-sm leading-relaxed">
        {getMessage(accuracy)}
      </p>

      <button
        onClick={onRetry}
        className="rounded-xl bg-green-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-green-700"
      >
        Try Again
      </button>
    </motion.div>
  );
}

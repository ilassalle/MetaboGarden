'use client';

import { motion } from 'framer-motion';

interface ScoreSummaryProps {
  correct: number;
  total: number;
  onRetry: () => void;
}

function getMessage(pct: number): string {
  if (pct === 100) return 'Perfect score! Your metabolic garden is in full bloom!';
  if (pct >= 80) return 'Excellent work! Your knowledge is flourishing!';
  if (pct >= 60) return 'Good effort! Keep watering those roots of understanding.';
  if (pct >= 40) return 'Nice start! A few more rounds and you will be growing strong.';
  return 'Every seed needs time. Review the pathway and try again!';
}

export default function ScoreSummary({
  correct,
  total,
  onRetry,
}: ScoreSummaryProps) {
  const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
  const circumference = 2 * Math.PI * 54; // r = 54
  const offset = circumference - (pct / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center gap-6 rounded-2xl border border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 p-8"
    >
      {/* Circular progress */}
      <div className="relative w-32 h-32">
        <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
          {/* Track */}
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke="currentColor"
            className="text-green-200"
            strokeWidth="8"
          />
          {/* Progress */}
          <motion.circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke="currentColor"
            className="text-emerald-500"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-green-900">{pct}%</span>
          <span className="text-xs text-green-600">
            {correct}/{total}
          </span>
        </div>
      </div>

      {/* Message */}
      <p className="text-center text-green-800 font-medium leading-relaxed max-w-sm">
        {getMessage(pct)}
      </p>

      {/* Retry button */}
      <button
        onClick={onRetry}
        className="rounded-xl bg-green-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-green-700"
      >
        Try Again
      </button>
    </motion.div>
  );
}

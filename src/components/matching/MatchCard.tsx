'use client';

import { motion } from 'framer-motion';

interface MatchCardProps {
  label: string;
  isSelected: boolean;
  isMatched: boolean;
  isIncorrect: boolean;
  onClick: () => void;
}

const shakeAnimation = {
  x: [0, -6, 6, -4, 4, 0],
  transition: { duration: 0.4 },
};

export default function MatchCard({
  label,
  isSelected,
  isMatched,
  isIncorrect,
  onClick
}: MatchCardProps) {
  function cardClass() {
    const base =
      'w-full rounded-xl border px-4 py-3 text-sm font-medium transition-colors duration-200 text-left';

    if (isMatched) {
      return `${base} border-emerald-400 bg-emerald-50 text-emerald-800 cursor-default`;
    }
    if (isSelected) {
      return `${base} border-green-500 bg-green-100 text-green-900 ring-2 ring-green-400/50 cursor-pointer`;
    }
    if (isIncorrect) {
      return `${base} border-red-400 bg-red-50 text-red-800 cursor-pointer`;
    }
    return `${base} border-green-200 bg-white text-green-900 hover:border-green-400 hover:bg-green-50 cursor-pointer`;
  }

  return (
    <motion.button
      className={cardClass()}
      onClick={!isMatched ? onClick : undefined}
      disabled={isMatched}
      animate={isIncorrect ? shakeAnimation : {}}
      whileTap={!isMatched ? { scale: 0.97 } : undefined}
    >
      <span className="flex items-center gap-2">
        {isMatched && (
          <svg
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-4 h-4 text-emerald-500 flex-shrink-0"
          >
            <path
              fillRule="evenodd"
              d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
              clipRule="evenodd"
            />
          </svg>
        )}
        <span>{label}</span>
      </span>
    </motion.button>
  );
}

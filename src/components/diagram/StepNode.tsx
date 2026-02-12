'use client';

import { motion } from 'framer-motion';
import type { ReactionStep } from '@/data/types';

interface StepNodeProps {
  step: ReactionStep;
  isSelected: boolean;
  onClick: () => void;
}

export default function StepNode({ step, isSelected, onClick }: StepNodeProps) {
  const substrateNames = step.substrates.map((s) => s.abbreviation || s.name).join(' + ');
  const productNames = step.products.map((p) => p.abbreviation || p.name).join(' + ');

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      className={`
        relative flex flex-col items-center gap-1.5 p-3 rounded-xl
        transition-colors duration-200 cursor-pointer group outline-none
        ${isSelected
          ? 'bg-green-50 ring-2 ring-green-500'
          : 'bg-white hover:bg-green-50/60 ring-1 ring-green-200 hover:ring-green-300'
        }
      `}
    >
      {/* Rate-limiting star */}
      {step.isRateLimiting && (
        <span
          className="absolute -top-1.5 -left-1.5 flex items-center justify-center w-5 h-5 bg-amber-400 rounded-full text-[10px] text-white shadow-sm"
          title="Rate-limiting step"
        >
          &#9733;
        </span>
      )}

      {/* MCAT badge */}
      {step.mcatHighYield && (
        <span
          className="absolute -top-1.5 -right-1.5 flex items-center justify-center px-1.5 py-0.5 bg-emerald-600 rounded-full text-[9px] font-bold text-white tracking-wide shadow-sm"
          title="MCAT High-Yield"
        >
          HY
        </span>
      )}

      {/* Circular step number */}
      <div
        className={`
          flex items-center justify-center w-10 h-10 rounded-full
          text-sm font-bold transition-colors duration-200
          ${isSelected
            ? 'bg-green-600 text-white'
            : 'bg-green-100 text-green-800 group-hover:bg-green-200'
          }
        `}
      >
        {step.stepNumber}
      </div>

      {/* Enzyme name */}
      <span
        className={`
          text-xs font-semibold leading-tight text-center max-w-[160px] truncate
          ${isSelected ? 'text-green-800' : 'text-green-700'}
        `}
        title={step.enzyme.name}
      >
        {step.enzyme.name}
      </span>

      {/* Substrate -> Product subtitle */}
      <span className="text-[11px] text-green-600/70 leading-tight text-center max-w-[180px] truncate">
        {substrateNames} &rarr; {productNames}
      </span>
    </motion.button>
  );
}

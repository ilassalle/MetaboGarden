'use client';

import { motion } from 'framer-motion';

interface ReactionArrowProps {
  cofactorsConsumed: string[];
  cofactorsProduced: string[];
}

export default function ReactionArrow({
  cofactorsConsumed,
  cofactorsProduced,
}: ReactionArrowProps) {
  const hasCofactors = cofactorsConsumed.length > 0 || cofactorsProduced.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="flex items-center justify-center gap-3 py-1"
    >
      {/* Cofactors consumed (left side) */}
      {hasCofactors && (
        <div className="flex flex-col items-end min-w-[80px]">
          {cofactorsConsumed.map((c) => (
            <span key={c} className="text-[10px] text-red-400 font-medium leading-tight">
              {c} &darr;
            </span>
          ))}
        </div>
      )}

      {/* Arrow SVG */}
      <svg
        width="20"
        height="32"
        viewBox="0 0 20 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        <line
          x1="10"
          y1="0"
          x2="10"
          y2="24"
          stroke="#4ade80"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <polyline
          points="4,20 10,28 16,20"
          stroke="#4ade80"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* Cofactors produced (right side) */}
      {hasCofactors && (
        <div className="flex flex-col items-start min-w-[80px]">
          {cofactorsProduced.map((c) => (
            <span key={c} className="text-[10px] text-emerald-500 font-medium leading-tight">
              &uarr; {c}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
}

'use client';

import { useState, useMemo, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { PathwayId, MatchPair } from '@/data/types';
import { matchingSets } from '@/data/matching-sets';
import { shuffle } from '@/lib/shuffle';
import { scoreMatching } from '@/lib/game-engine';
import { useProgressStore } from '@/lib/progress-store';
import MatchCard from './MatchCard';
import MatchFeedback from './MatchFeedback';

interface MatchingGameProps {
  pathwayId: PathwayId;
}

export default function MatchingGame({ pathwayId }: MatchingGameProps) {
  const updateGameProgress = useProgressStore((s) => s.updateGameProgress);
  const pairs = useMemo(
    () => matchingSets.filter((p) => p.pathwayId === pathwayId),
    [pathwayId],
  );

  const [leftItems, setLeftItems] = useState<MatchPair[]>(() => shuffle(pairs));
  const [rightItems, setRightItems] = useState<MatchPair[]>(() => shuffle(pairs));
  const [selectedLeftId, setSelectedLeftId] = useState<string | null>(null);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [incorrectId, setIncorrectId] = useState<string | null>(null);
  const [incorrectAttempts, setIncorrectAttempts] = useState(0);
  const [finished, setFinished] = useState(false);

  /* ── Initialize / shuffle on mount or retry ── */
  const initGame = useCallback(() => {
    setLeftItems(shuffle(pairs));
    setRightItems(shuffle(pairs));
    setSelectedLeftId(null);
    setMatched(new Set());
    setIncorrectId(null);
    setIncorrectAttempts(0);
    setFinished(false);
  }, [pairs]);

  /* ── No pairs available ── */
  if (pairs.length === 0) {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
        <p className="text-lg font-semibold text-green-800 mb-2">
          Coming soon!
        </p>
        <p className="text-sm text-green-600">
          Matching sets for this pathway are still being cultivated. Check back
          soon!
        </p>
      </div>
    );
  }

  /* ── Handlers ── */
  function handleLeftClick(id: string) {
    if (matched.has(id)) return;
    setSelectedLeftId((prev) => (prev === id ? null : id));
    setIncorrectId(null);
  }

  function handleRightClick(rightPair: MatchPair) {
    if (!selectedLeftId || matched.has(rightPair.id)) return;

    if (selectedLeftId === rightPair.id) {
      // Correct match
      const next = new Set(matched);
      next.add(rightPair.id);
      setMatched(next);
      setSelectedLeftId(null);
      setIncorrectId(null);

      if (next.size === pairs.length) {
        const finalScore = scoreMatching(pairs.length, next.size, incorrectAttempts);
        updateGameProgress({
          pathwayId,
          gameMode: 'matching',
          score: finalScore,
          bestScore: finalScore,
          attempts: 1,
          timeSpentSeconds: 0,
          completedAt: new Date().toISOString(),
        });
        setFinished(true);
      }
    } else {
      // Incorrect
      setIncorrectId(rightPair.id);
      setIncorrectAttempts((c) => c + 1);
      // Clear the incorrect flash after animation
      setTimeout(() => setIncorrectId(null), 500);
    }
  }

  /* ── Render ── */
  return (
    <div className="space-y-6">
      {/* Progress info */}
      {!finished && (
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-green-600">
            <span>
              {matched.size} of {pairs.length} matched
            </span>
            {incorrectAttempts > 0 && (
              <span className="text-red-500">
                {incorrectAttempts} incorrect
              </span>
            )}
          </div>
          <div className="h-2 rounded-full bg-green-100 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-green-500"
              initial={false}
              animate={{
                width: `${(matched.size / pairs.length) * 100}%`,
              }}
              transition={{ ease: 'easeOut', duration: 0.3 }}
            />
          </div>
        </div>
      )}

      <AnimatePresence mode="wait">
        {finished ? (
          <motion.div
            key="feedback"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <MatchFeedback
              totalPairs={pairs.length}
              matchedPairs={matched.size}
              incorrectAttempts={incorrectAttempts}
              onRetry={initGame}
            />
          </motion.div>
        ) : (
          <motion.div
            key="game"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-2 gap-4"
          >
            {/* Left column */}
            <div className="space-y-3">
              <span className="text-xs font-medium text-green-500 uppercase tracking-wider">
                Terms
              </span>
              {leftItems.map((pair) => (
                <MatchCard
                  key={pair.id}
                  label={pair.leftLabel}
                  isSelected={selectedLeftId === pair.id}
                  isMatched={matched.has(pair.id)}
                  isIncorrect={false}
                  onClick={() => handleLeftClick(pair.id)}
                />
              ))}
            </div>

            {/* Right column */}
            <div className="space-y-3">
              <span className="text-xs font-medium text-green-500 uppercase tracking-wider">
                Definitions
              </span>
              {rightItems.map((pair) => (
                <MatchCard
                  key={pair.id}
                  label={pair.rightLabel}
                  isSelected={false}
                  isMatched={matched.has(pair.id)}
                  isIncorrect={incorrectId === pair.id}
                  onClick={() => handleRightClick(pair)}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

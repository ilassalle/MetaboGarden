'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { PathwayId } from '@/data/types';
import { quizQuestions } from '@/data/quiz-questions';
import { shuffle } from '@/lib/shuffle';
import { useProgressStore } from '@/lib/progress-store';
import MultipleChoice from './MultipleChoice';
import FillInBlank from './FillInBlank';
import Flashcard from './Flashcard';
import ScoreSummary from './ScoreSummary';

interface QuizGameProps {
  pathwayId: PathwayId;
}

type Mode = 'quiz' | 'flashcard';

export default function QuizGame({ pathwayId }: QuizGameProps) {
  const updateGameProgress = useProgressStore((s) => s.updateGameProgress);
  const questions = useMemo(
    () => shuffle(quizQuestions.filter((q) => q.pathwayId === pathwayId)),
    [pathwayId],
  );

  const [mode, setMode] = useState<Mode>('quiz');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<(string | null)[]>(
    () => new Array(questions.length).fill(null),
  );
  const [showExplanation, setShowExplanation] = useState(false);
  const [finished, setFinished] = useState(false);

  const current = questions[currentIndex] ?? null;
  const total = questions.length;
  const correctCount = answers.filter(
    (a, i) =>
      a !== null &&
      a.toLowerCase().trim() ===
        questions[i].correctAnswer.toLowerCase().trim(),
  ).length;

  /* ───── No questions available ───── */
  if (total === 0) {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
        <p className="text-lg font-semibold text-green-800 mb-2">
          Coming soon!
        </p>
        <p className="text-sm text-green-600">
          Quiz questions for this pathway are still being planted. Check back
          soon!
        </p>
      </div>
    );
  }

  /* ───── Handlers ───── */
  function handleAnswer(answer: string) {
    setAnswers((prev) => {
      const next = [...prev];
      next[currentIndex] = answer;
      return next;
    });
    setShowExplanation(true);
  }

  function handleNext() {
    if (currentIndex + 1 >= total) {
      const finalScore = total > 0 ? Math.round((correctCount / total) * 100) : 0;
      updateGameProgress({
        pathwayId,
        gameMode: 'quiz',
        score: finalScore,
        bestScore: finalScore,
        attempts: 1,
        timeSpentSeconds: 0,
        completedAt: new Date().toISOString(),
      });
      setFinished(true);
    } else {
      setCurrentIndex((i) => i + 1);
      setShowExplanation(false);
    }
  }

  function handleFlashcardNext() {
    if (currentIndex + 1 >= total) {
      setCurrentIndex(0); // loop in flashcard mode
    } else {
      setCurrentIndex((i) => i + 1);
    }
  }

  function handleRetry() {
    setCurrentIndex(0);
    setAnswers(new Array(total).fill(null));
    setShowExplanation(false);
    setFinished(false);
  }

  function switchMode(newMode: Mode) {
    setMode(newMode);
    handleRetry();
  }

  /* ───── Render ───── */
  return (
    <div className="space-y-6">
      {/* Mode toggle */}
      <div className="flex gap-1 p-1 rounded-xl bg-green-100 w-fit">
        {(['quiz', 'flashcard'] as const).map((m) => (
          <button
            key={m}
            onClick={() => switchMode(m)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              mode === m
                ? 'bg-white text-green-800 shadow-sm'
                : 'text-green-600 hover:text-green-800'
            }`}
          >
            {m === 'quiz' ? 'Quiz' : 'Flashcards'}
          </button>
        ))}
      </div>

      {/* Progress bar */}
      {!finished && (
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-green-600">
            <span>
              Question {currentIndex + 1} of {total}
            </span>
            {mode === 'quiz' && (
              <span>
                {correctCount} correct
              </span>
            )}
          </div>
          <div className="h-2 rounded-full bg-green-100 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-green-500"
              initial={false}
              animate={{
                width: `${((currentIndex + (showExplanation ? 1 : 0)) / total) * 100}%`,
              }}
              transition={{ ease: 'easeOut', duration: 0.3 }}
            />
          </div>
        </div>
      )}

      {/* Content */}
      <AnimatePresence mode="wait">
        {finished && mode === 'quiz' ? (
          <motion.div
            key="summary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ScoreSummary
              correct={correctCount}
              total={total}
              onRetry={handleRetry}
            />
          </motion.div>
        ) : current ? (
          <motion.div
            key={`${mode}-${currentIndex}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
          >
            {mode === 'flashcard' ? (
              <Flashcard question={current} onNext={handleFlashcardNext} />
            ) : current.questionType === 'fill-in-blank' ? (
              <FillInBlank
                question={current}
                onAnswer={handleAnswer}
                showResult={showExplanation}
                userAnswer={answers[currentIndex] ?? undefined}
              />
            ) : (
              <MultipleChoice
                question={current}
                onAnswer={handleAnswer}
                showResult={showExplanation}
                userAnswer={answers[currentIndex] ?? undefined}
              />
            )}

            {/* Next button (quiz mode, after answering) */}
            {mode === 'quiz' && showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-end mt-4"
              >
                <button
                  onClick={handleNext}
                  className="rounded-xl bg-green-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-green-700"
                >
                  {currentIndex + 1 >= total ? 'See Results' : 'Next Question'}
                </button>
              </motion.div>
            )}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

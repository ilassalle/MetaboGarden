'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { QuizQuestion } from '@/data/types';

interface FillInBlankProps {
  question: QuizQuestion;
  onAnswer: (answer: string) => void;
  showResult: boolean;
  userAnswer?: string;
}

export default function FillInBlank({
  question,
  onAnswer,
  showResult,
  userAnswer,
}: FillInBlankProps) {
  const [input, setInput] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (input.trim() && !showResult) {
      onAnswer(input.trim());
    }
  }

  const isCorrect =
    showResult &&
    userAnswer?.toLowerCase().trim() ===
      question.correctAnswer.toLowerCase().trim();

  return (
    <div className="space-y-4">
      <p className="text-green-900 font-medium leading-relaxed">
        {question.questionText}
      </p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          value={showResult ? userAnswer ?? '' : input}
          onChange={(e) => setInput(e.target.value)}
          disabled={showResult}
          placeholder="Type your answer..."
          className={`w-full rounded-xl border px-4 py-3 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-green-400/50 ${
            showResult
              ? isCorrect
                ? 'border-emerald-400 bg-emerald-50 text-emerald-900'
                : 'border-red-400 bg-red-50 text-red-900'
              : 'border-green-200 bg-white text-green-900 placeholder:text-green-400'
          }`}
        />

        {!showResult && (
          <button
            type="submit"
            disabled={!input.trim()}
            className="rounded-xl bg-green-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-green-700 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Submit
          </button>
        )}
      </form>

      {showResult && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          {isCorrect ? (
            <p className="text-sm font-semibold text-emerald-700">
              Correct!
            </p>
          ) : (
            <p className="text-sm text-red-700">
              <span className="font-semibold">Incorrect.</span> The correct
              answer is{' '}
              <span className="font-semibold text-emerald-700">
                {question.correctAnswer}
              </span>
            </p>
          )}

          <div className="rounded-xl bg-green-50 border border-green-200 p-4 text-sm text-green-800 leading-relaxed">
            <span className="font-semibold">Explanation: </span>
            {question.explanation}
          </div>
        </motion.div>
      )}
    </div>
  );
}

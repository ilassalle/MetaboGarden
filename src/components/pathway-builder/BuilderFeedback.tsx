'use client';

interface BuilderFeedbackProps {
  score: number;
  onReset: () => void;
  onClose: () => void;
}

function getMessage(score: number): string {
  if (score === 100) return 'Perfect score! You have mastered this pathway!';
  if (score >= 80) return 'Excellent work! Just a few details to review.';
  if (score >= 60) return 'Good progress! Review the incorrect steps and try again.';
  if (score >= 40) return 'Nice effort! Keep studying the pathway and give it another shot.';
  return 'Keep going! Review the pathway steps and try again.';
}

export default function BuilderFeedback({ score, onReset, onClose }: BuilderFeedbackProps) {
  const message = getMessage(score);

  return (
    <div className="bg-white rounded-2xl border border-green-200 shadow-lg shadow-green-100/50 p-6 max-w-md mx-auto">
      {/* Header */}
      <div className="text-center mb-5">
        <div
          className={`
            inline-flex items-center justify-center w-14 h-14 rounded-full mb-3
            ${score >= 80 ? 'bg-green-100' : score >= 50 ? 'bg-amber-100' : 'bg-orange-100'}
          `}
        >
          {score >= 80 ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-7 h-7 text-green-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1.5M12 19.5V21M4.219 4.219l1.061 1.061M17.72 17.72l1.06 1.06M3 12h1.5M19.5 12H21M4.219 19.781l1.061-1.061M17.72 6.28l1.06-1.06" />
              <circle cx="12" cy="12" r="4.5" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-7 h-7 text-amber-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
            </svg>
          )}
        </div>

        <h3 className="text-lg font-bold text-green-900">
          {score === 100 ? 'Pathway Complete!' : 'Results'}
        </h3>
      </div>

      {/* Score display */}
      <div className="mb-4">
        <div className="flex items-baseline justify-center gap-1 mb-2">
          <span className="text-4xl font-bold text-green-800">{score}</span>
          <span className="text-lg text-green-600">%</span>
        </div>

        {/* Progress bar */}
        <div className="h-3 bg-green-100 rounded-full overflow-hidden">
          <div
            className={`
              h-full rounded-full transition-all duration-700 ease-out
              ${score >= 80 ? 'bg-green-500' : score >= 50 ? 'bg-amber-400' : 'bg-orange-400'}
            `}
            style={{ width: `${score}%` }}
          />
        </div>
      </div>

      {/* Message */}
      <p className="text-sm text-green-700/80 text-center mb-6">{message}</p>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={onReset}
          className="flex-1 px-4 py-2.5 rounded-xl bg-green-600 text-white text-sm font-semibold hover:bg-green-700 transition-colors"
        >
          Try Again
        </button>
        <button
          type="button"
          onClick={onClose}
          className="flex-1 px-4 py-2.5 rounded-xl border border-green-200 text-green-700 text-sm font-semibold hover:bg-green-50 transition-colors"
        >
          Review Answers
        </button>
      </div>
    </div>
  );
}

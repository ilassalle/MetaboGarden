'use client';

import { pathwayRegistry } from '@/data/pathway-registry';
import { useProgressStore } from '@/lib/progress-store';
import { LeafIcon } from '@/components/layout/PlantDecoration';

function PlantGrowth({ mastery }: { mastery: number }) {
  if (mastery >= 100) {
    return (
      <div className="text-emerald-500" aria-label="Full flower">
        <svg viewBox="0 0 48 64" className="w-11 h-16 mx-auto" fill="none">
          <path d="M24 58V30" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" />
          <ellipse cx="24" cy="22" rx="7" ry="11" fill="#f472b6" opacity={0.95} />
          <ellipse cx="17" cy="25" rx="6" ry="9" fill="#fb7185" opacity={0.9} />
          <ellipse cx="31" cy="25" rx="6" ry="9" fill="#fbbf24" opacity={0.9} />
          <ellipse cx="24" cy="28" rx="6" ry="8" fill="#facc15" opacity={0.95} />
          <circle cx="24" cy="25" r="3.2" fill="#fde047" />
          <path d="M24 41c-4.5-1.1-7.1-4.8-6.2-8.5 3 1.3 6.2 3.6 6.2 3.6s3.2-2.3 6.2-3.6c0.9 3.7-1.7 7.4-6.2 8.5z" fill="currentColor" opacity={0.5} />
        </svg>
      </div>
    );
  }

  if (mastery >= 75) {
    return (
      <div className="text-emerald-500" aria-label="Budding flower">
        <svg viewBox="0 0 48 64" className="w-11 h-16 mx-auto" fill="none">
          <path d="M24 58V32" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" />
          <path d="M24 32c-5-1.2-8-6.7-6.3-12.4 3 1.8 6.3 4.7 6.3 4.7s3.3-2.9 6.3-4.7c1.7 5.7-1.3 11.2-6.3 12.4z" fill="#f472b6" opacity={0.9} />
          <path d="M24 42c-4-1-6.5-4.2-5.7-7.5 2.8 1.2 5.7 3.2 5.7 3.2s2.9-2 5.7-3.2c0.8 3.3-1.7 6.5-5.7 7.5z" fill="currentColor" opacity={0.45} />
        </svg>
      </div>
    );
  }

  if (mastery >= 50) {
    return (
      <div className="text-emerald-500" aria-label="Leaves stage">
        <svg viewBox="0 0 48 64" className="w-11 h-16 mx-auto" fill="none">
          <path d="M24 58V34" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" />
          <path d="M24 42c-8-1.5-12.8-7.8-11.3-14.5 4 1.6 8.5 5.2 11.3 7.9 2.8-2.7 7.3-6.3 11.3-7.9 1.5 6.7-3.3 13-11.3 14.5z" fill="currentColor" opacity={0.55} />
          <path d="M24 41c-6-1.1-9.2-5.5-8.2-10 2.9 1.2 6.2 3.6 8.2 5.7 2-2.1 5.3-4.5 8.2-5.7 1 4.5-2.2 8.9-8.2 10z" fill="currentColor" opacity={0.75} />
        </svg>
      </div>
    );
  }

  if (mastery >= 25) {
    return (
      <div className="text-green-400" aria-label="Bigger sprout">
        <svg viewBox="0 0 48 64" className="w-11 h-16 mx-auto" fill="none">
          <path d="M24 58V38" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" />
          <path d="M24 44c-7-1.6-10.5-7.8-8.8-13.2 3.5 2 6.8 5.2 8.8 7.6 2-2.4 5.3-5.6 8.8-7.6 1.7 5.4-1.8 11.6-8.8 13.2z" fill="currentColor" opacity={0.65} />
        </svg>
      </div>
    );
  }

  return (
    <div className="text-green-300" aria-label="Small sprout">
      <svg viewBox="0 0 48 64" className="w-11 h-16 mx-auto" fill="none">
        <path d="M24 58V44" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" />
        <path d="M24 49c-4.8-1.1-7.3-5.3-6.2-9 2.5 1.4 4.8 3.8 6.2 5.6 1.4-1.8 3.7-4.2 6.2-5.6 1.1 3.7-1.4 7.9-6.2 9z" fill="currentColor" opacity={0.6} />
      </svg>
    </div>
  );
}

export default function ProgressPage() {
  const { progress, getPathwayMastery, isPathwayUnlocked } = useProgressStore();

  const overallMastery = Math.round(
    pathwayRegistry.reduce((sum, p) => sum + getPathwayMastery(p.id), 0) / pathwayRegistry.length
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold text-green-900 mb-2">My Garden</h1>
      <p className="text-green-700/70 mb-8">
        Watch your garden grow as you master each metabolic pathway.
      </p>

      {/* Overall progress */}
      <div className="bg-white rounded-2xl border border-green-200 p-6 mb-8">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-green-800">Overall Mastery</span>
          <span className="text-sm text-green-600">{overallMastery}%</span>
        </div>
        <div className="h-2 bg-green-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-500 rounded-full transition-all duration-700"
            style={{ width: `${overallMastery}%` }}
          />
        </div>
        <p className="text-xs text-green-600/50 mt-2">
          {progress.achievements.length} achievements earned
        </p>
      </div>

      {/* Garden grid */}
      <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-3 gap-4">
        {pathwayRegistry.map((pathway) => {
          const unlocked = isPathwayUnlocked(pathway.id);
          const mastery = unlocked ? getPathwayMastery(pathway.id) : 0;

          return (
            <div
              key={pathway.id}
              className="bg-white rounded-2xl border border-green-200 p-4 text-center"
            >
              <div className="mb-3 h-16 flex items-end justify-center">
                {unlocked ? (
                  <PlantGrowth mastery={mastery} />
                ) : (
                  <div className="text-green-300 text-xl">🔒</div>
                )}
              </div>
              <h3 className="text-sm font-medium text-green-900 mb-1">{pathway.label}</h3>
              <div className="h-1 bg-green-100 rounded-full overflow-hidden mb-1">
                <div
                  className="h-full bg-green-400 rounded-full transition-all"
                  style={{ width: `${mastery}%` }}
                />
              </div>
              <span className="text-xs text-green-600/50">
                {unlocked ? `${Math.round(mastery)}%` : 'Locked'}
              </span>
            </div>
          );
        })}
      </div>

      {/* Achievements */}
      {progress.achievements.length > 0 && (
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-green-900 mb-4">Achievements</h2>
          <div className="flex flex-wrap gap-2">
            {progress.achievements.map((a) => (
              <div key={a} className="flex items-center gap-1.5 bg-green-100 rounded-full px-3 py-1">
                <LeafIcon className="w-3.5 h-3.5 text-green-600" />
                <span className="text-xs font-medium text-green-700">{a}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

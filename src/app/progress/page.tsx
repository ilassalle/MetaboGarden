'use client';

import { pathwayRegistry } from '@/data/pathway-registry';
import { useProgressStore } from '@/lib/progress-store';
import { SeedlingIcon, LeafIcon } from '@/components/layout/PlantDecoration';

function PlantGrowth({ mastery }: { mastery: number }) {
  if (mastery >= 80) {
    return (
      <div className="text-green-500">
        <svg viewBox="0 0 40 60" className="w-10 h-15 mx-auto" fill="none">
          <path d="M20 55V25" stroke="currentColor" strokeWidth={2} />
          <path d="M20 35c-8-2-12-10-10-18 4 4 10 6 10 6s6-2 10-6c2 8-2 16-10 18z" fill="currentColor" opacity={0.7} />
          <path d="M20 25c-5-1-8-7-6-13 3 3 6 4 6 4s4-1 6-4c2 6-1 12-6 13z" fill="currentColor" opacity={0.8} />
          <circle cx="14" cy="20" r="3" fill="#fb7185" opacity={0.8} />
          <circle cx="26" cy="22" r="2.5" fill="#fbbf24" opacity={0.8} />
          <circle cx="20" cy="15" r="2" fill="#a78bfa" opacity={0.8} />
        </svg>
      </div>
    );
  }
  if (mastery >= 40) {
    return (
      <div className="text-green-400">
        <svg viewBox="0 0 40 60" className="w-10 h-15 mx-auto" fill="none">
          <path d="M20 55V30" stroke="currentColor" strokeWidth={2} />
          <path d="M20 40c-6-1.5-9-8-7-14 3 3 7 5 7 5s4-2 7-5c2 6-1 12.5-7 14z" fill="currentColor" opacity={0.6} />
          <path d="M20 30c-4-1-6-5-4-10 2 2 4 3 4 3s3-1 4-3c1 5-1 9-4 10z" fill="currentColor" opacity={0.7} />
        </svg>
      </div>
    );
  }
  if (mastery > 0) {
    return (
      <div className="text-green-300">
        <SeedlingIcon className="w-10 h-10 mx-auto" />
      </div>
    );
  }
  return (
    <div className="text-green-200">
      <div className="w-4 h-4 rounded-full bg-current mx-auto opacity-50" />
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

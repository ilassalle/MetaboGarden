'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserProgress, GameProgress, PathwayId, GameMode } from '@/data/types';

interface ProgressStore {
  progress: UserProgress;
  updateGameProgress: (entry: GameProgress) => void;
  getGameProgress: (pathwayId: PathwayId, gameMode: GameMode) => GameProgress | undefined;
  getPathwayMastery: (pathwayId: PathwayId) => number;
  addAchievement: (achievementId: string) => void;
  resetProgress: () => void;
}

const initialProgress: UserProgress = {
  gameProgress: [],
  achievements: [],
  lastPlayedAt: new Date().toISOString(),
};

export const useProgressStore = create<ProgressStore>()(
  persist(
    (set, get) => ({
      progress: initialProgress,

      updateGameProgress: (entry) => {
        set((state) => {
          const existing = state.progress.gameProgress.findIndex(
            (g) => g.pathwayId === entry.pathwayId && g.gameMode === entry.gameMode
          );

          const updated = [...state.progress.gameProgress];
          if (existing >= 0) {
            updated[existing] = {
              ...entry,
              bestScore: Math.max(entry.score, updated[existing].bestScore),
              attempts: updated[existing].attempts + 1,
            };
          } else {
            updated.push({ ...entry, attempts: 1 });
          }

          return {
            progress: {
              ...state.progress,
              gameProgress: updated,
              lastPlayedAt: new Date().toISOString(),
            },
          };
        });
      },

      getGameProgress: (pathwayId, gameMode) => {
        return get().progress.gameProgress.find(
          (g) => g.pathwayId === pathwayId && g.gameMode === gameMode
        );
      },

      getPathwayMastery: (pathwayId) => {
        const modes: GameMode[] = ['pathway-builder', 'quiz', 'diagram', 'matching'];
        const scores = modes.map((mode) => {
          const gp = get().progress.gameProgress.find(
            (g) => g.pathwayId === pathwayId && g.gameMode === mode
          );
          return gp?.bestScore ?? 0;
        });
        return scores.reduce((a, b) => a + b, 0) / modes.length;
      },

      addAchievement: (achievementId) => {
        set((state) => {
          if (state.progress.achievements.includes(achievementId)) return state;
          return {
            progress: {
              ...state.progress,
              achievements: [...state.progress.achievements, achievementId],
            },
          };
        });
      },

      resetProgress: () => {
        set({ progress: initialProgress });
      },
    }),
    {
      name: 'metab-game-progress',
    }
  )
);

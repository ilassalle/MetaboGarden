'use client';

import { useSyncExternalStore } from 'react';
import PathwayCard from '@/components/layout/PathwayCard';
import { pathwayRegistry } from '@/data/pathway-registry';
import { useProgressStore } from '@/lib/progress-store';
import { VineCorner } from '@/components/layout/PlantDecoration';

export default function Home() {
  const getPathwayMastery = useProgressStore((s) => s.getPathwayMastery);
  const isPathwayUnlocked = useProgressStore((s) => s.isPathwayUnlocked);
  const isHydrated = useSyncExternalStore(
    (onStoreChange) => {
      const unsubHydrate = useProgressStore.persist.onHydrate(onStoreChange);
      const unsubFinishHydration = useProgressStore.persist.onFinishHydration(onStoreChange);
      return () => {
        unsubHydrate();
        unsubFinishHydration();
      };
    },
    () => useProgressStore.persist.hasHydrated(),
    () => false
  );

  return (
    <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-12">
      {/* Decorative corners */}
      <VineCorner className="absolute bottom-0 left-0 w-32 h-32 opacity-30 pointer-events-none rotate-180" />

      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-green-900 mb-3">
          MetaboGarden
        </h1>
        <p className="text-green-700/70 max-w-lg mx-auto leading-relaxed">
          Grow your knowledge of metabolic pathways. Pick a pathway and start
          learning through interactive games.
        </p>
      </div>

      {/* Pathway grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {pathwayRegistry.map((pathway) => {
          const unlocked = isHydrated ? isPathwayUnlocked(pathway.id) : false;
          return (
            <PathwayCard
              key={pathway.id}
              pathway={pathway}
              mastery={isHydrated && unlocked ? getPathwayMastery(pathway.id) : 0}
              locked={!unlocked}
            />
          );
        })}
      </div>
    </div>
  );
}

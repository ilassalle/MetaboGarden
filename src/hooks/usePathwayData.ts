'use client';

import { useState, useEffect } from 'react';
import type { PathwayId, Pathway } from '@/data/types';

const pathwayLoaders: Record<PathwayId, () => Promise<Pathway>> = {
  glycolysis: () => import('@/data/pathways/glycolysis').then((m) => m.glycolysisPathway),
  gluconeogenesis: () => import('@/data/pathways/gluconeogenesis').then((m) => m.gluconeogenesisPathway),
  glycogenesis: () => import('@/data/pathways/glycogenesis').then((m) => m.glycogenesisPathway),
  glycogenolysis: () => import('@/data/pathways/glycogenolysis').then((m) => m.glycogenolysisPathway),
  'fatty-acid-synthesis': () => import('@/data/pathways/fatty-acid-synthesis').then((m) => m.fattyAcidSynthesisPathway),
  'beta-oxidation': () => import('@/data/pathways/beta-oxidation').then((m) => m.betaOxidationPathway),
  'ketone-metabolism': () => import('@/data/pathways/ketone-metabolism').then((m) => m.ketoneMetabolismPathway),
  'tca-cycle': () => import('@/data/pathways/tca-cycle').then((m) => m.tcaCyclePathway),
  etc: () => import('@/data/pathways/etc').then((m) => m.etcPathway),
  'tca-etc': () => import('@/data/pathways/tca-etc').then((m) => m.tcaEtcPathway),
  'pentose-phosphate': () => import('@/data/pathways/pentose-phosphate').then((m) => m.pentosePhosphatePathway),
};

export function usePathwayData(pathwayId: PathwayId) {
  const [pathway, setPathway] = useState<Pathway | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const loader = pathwayLoaders[pathwayId];
    if (!loader) {
      setError(`Unknown pathway: ${pathwayId}`);
      setLoading(false);
      return;
    }

    loader()
      .then((data) => {
        setPathway(data);
        setLoading(false);
      })
      .catch(() => {
        setError(`Failed to load pathway: ${pathwayId}`);
        setLoading(false);
      });
  }, [pathwayId]);

  return { pathway, loading, error };
}

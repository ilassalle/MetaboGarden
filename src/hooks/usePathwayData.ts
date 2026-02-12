'use client';

import { useEffect, useReducer } from 'react';
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

interface PathwayState {
  pathway: Pathway | null;
  loading: boolean;
  error: string | null;
}

type PathwayAction =
  | { type: 'LOAD_START' }
  | { type: 'LOAD_SUCCESS'; pathway: Pathway }
  | { type: 'LOAD_ERROR'; error: string };

function pathwayReducer(state: PathwayState, action: PathwayAction): PathwayState {
  if (action.type === 'LOAD_START') {
    return { ...state, loading: true, error: null };
  }

  if (action.type === 'LOAD_SUCCESS') {
    return { pathway: action.pathway, loading: false, error: null };
  }

  return { pathway: null, loading: false, error: action.error };
}

export function usePathwayData(pathwayId: PathwayId) {
  const [state, dispatch] = useReducer(pathwayReducer, {
    pathway: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;
    const loader = pathwayLoaders[pathwayId];

    if (!loader) {
      dispatch({ type: 'LOAD_ERROR', error: `Unknown pathway: ${pathwayId}` });
      return;
    }

    dispatch({ type: 'LOAD_START' });

    loader()
      .then((data) => {
        if (cancelled) return;
        dispatch({ type: 'LOAD_SUCCESS', pathway: data });
      })
      .catch(() => {
        if (cancelled) return;
        dispatch({ type: 'LOAD_ERROR', error: `Failed to load pathway: ${pathwayId}` });
      });

    return () => {
      cancelled = true;
    };
  }, [pathwayId]);

  return state;
}

import type { Pathway } from '../types';
import { tcaEtcPathway } from './tca-etc';

export const etcPathway: Pathway = {
  ...tcaEtcPathway,
  id: 'etc',
  name: 'Electron Transport Chain (ETC)',
  description:
    'The ETC occurs in the inner mitochondrial membrane. Complexes I-IV transfer electrons from NADH/FADH2 to oxygen while pumping protons; ATP synthase (Complex V) uses this proton gradient to produce ATP.',
  location: 'Inner Mitochondrial Membrane',
  netEquation:
    'NADH/FADH2 + O2 + ADP + Pi → NAD+/FAD + H2O + ATP (via oxidative phosphorylation)',
  energySummary: {
    atpConsumed: 0,
    atpProduced: 0,
    gtpProduced: 0,
    nadhProduced: 0,
    fadh2Produced: 0,
    netAtp: 26,
    co2Produced: 0,
  },
  steps: tcaEtcPathway.steps
    .filter((step) => step.phaseName === 'Electron Transport Chain')
    .map((step, index) => ({
      ...step,
      id: `etc-step-${index + 1}`,
      pathwayId: 'etc',
      stepNumber: index + 1,
    })),
};

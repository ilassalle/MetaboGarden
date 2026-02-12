import type { Pathway } from '../types';
import { tcaEtcPathway } from './tca-etc';

export const tcaCyclePathway: Pathway = {
  ...tcaEtcPathway,
  id: 'tca-cycle',
  name: 'TCA Cycle',
  description:
    'The citric acid cycle (Krebs cycle) in the mitochondrial matrix oxidizes acetyl-CoA to CO2 while producing NADH, FADH2, and GTP. These reduced carriers then deliver electrons to the ETC for oxidative phosphorylation.',
  location: 'Mitochondrial Matrix',
  netEquation:
    'Acetyl-CoA + 3 NAD+ + FAD + GDP + Pi + 2 H2O → 2 CO2 + 3 NADH + FADH2 + GTP + CoA-SH',
  energySummary: {
    atpConsumed: 0,
    atpProduced: 0,
    gtpProduced: 1,
    nadhProduced: 3,
    fadh2Produced: 1,
    netAtp: 0,
    co2Produced: 2,
  },
  steps: tcaEtcPathway.steps
    .filter((step) => step.phaseName === 'TCA Cycle')
    .map((step, index) => ({
      ...step,
      id: `tca-cycle-step-${index + 1}`,
      pathwayId: 'tca-cycle',
      stepNumber: index + 1,
    })),
};

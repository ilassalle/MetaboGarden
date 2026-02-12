import type { PathwayMeta } from './types';

export const pathwayRegistry: PathwayMeta[] = [
  {
    id: 'glycolysis',
    label: 'Glycolysis',
    shortDescription: 'Glucose to pyruvate — the universal energy pathway',
    stepCount: 10,
    location: 'Cytoplasm',
    color: '#22c55e',
  },
  {
    id: 'gluconeogenesis',
    label: 'Gluconeogenesis',
    shortDescription: 'Making new glucose from non-carbohydrate sources',
    stepCount: 11,
    location: 'Cytoplasm + Mitochondria',
    color: '#16a34a',
  },
  {
    id: 'glycogenesis',
    label: 'Glycogenesis',
    shortDescription: 'Building glycogen for energy storage',
    stepCount: 4,
    location: 'Cytoplasm',
    color: '#15803d',
  },
  {
    id: 'glycogenolysis',
    label: 'Glycogenolysis',
    shortDescription: 'Breaking down glycogen to release glucose',
    stepCount: 3,
    location: 'Cytoplasm',
    color: '#4ade80',
  },
  {
    id: 'fatty-acid-synthesis',
    label: 'Fatty Acid Synthesis',
    shortDescription: 'Converting acetyl-CoA into fatty acids',
    stepCount: 7,
    location: 'Cytoplasm',
    color: '#86efac',
  },
  {
    id: 'beta-oxidation',
    label: 'Beta-Oxidation',
    shortDescription: 'Breaking down fatty acids for energy',
    stepCount: 5,
    location: 'Mitochondrial Matrix',
    color: '#166534',
  },
  {
    id: 'ketone-metabolism',
    label: 'Ketone Body Metabolism',
    shortDescription: 'Ketogenesis in liver, ketolysis in tissues',
    stepCount: 5,
    location: 'Mitochondria',
    color: '#14532d',
  },
  {
    id: 'tca-etc',
    label: 'TCA Cycle + ETC',
    shortDescription: 'The powerhouse cycle and electron transport chain',
    stepCount: 13,
    location: 'Mitochondria',
    color: '#059669',
  },
  {
    id: 'pentose-phosphate',
    label: 'Pentose Phosphate Pathway',
    shortDescription: 'NADPH production and ribose-5-phosphate synthesis',
    stepCount: 7,
    location: 'Cytoplasm',
    color: '#34d399',
  },
];

export function getPathwayMeta(id: string): PathwayMeta | undefined {
  return pathwayRegistry.find((p) => p.id === id);
}

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
    location: 'Liver/kidney cytoplasm + mitochondria',
    color: '#16a34a',
  },
  {
    id: 'glycogenesis',
    label: 'Glycogenesis',
    shortDescription: 'Builds glycogen via UDP-glucose (key enzyme: glycogen synthase)',
    location: 'Cytoplasm',
    color: '#15803d',
  },
  {
    id: 'glycogenolysis',
    label: 'Glycogenolysis',
    shortDescription: 'Breaking down glycogen to release glucose',
    location: 'Cytoplasm (ER involvement in liver)',
    color: '#4ade80',
  },
  {
    id: 'fatty-acid-synthesis',
    label: 'Fatty Acid Synthesis',
    shortDescription: 'Cytosolic fatty acid synthase cycle (NADPH; ACC is rate-limiting)',
    location: 'Cytoplasm',
    color: '#86efac',
  },
  {
    id: 'beta-oxidation',
    label: 'Beta-Oxidation',
    shortDescription: 'Breaking down fatty acids for energy',
    stepCount: 4,
    location: 'Mitochondrial Matrix',
    color: '#166534',
  },
  {
    id: 'ketone-metabolism',
    label: 'Ketone Body Metabolism',
    shortDescription: 'Ketogenesis in liver; ketolysis in peripheral tissues (not liver)',
    location: 'Liver + peripheral tissue mitochondria',
    color: '#14532d',
  },
  {
    id: 'tca-cycle',
    label: 'TCA Cycle',
    shortDescription: 'Oxidizes acetyl-CoA to CO2 and generates reduced electron carriers',
    stepCount: 8,
    location: 'Mitochondrial Matrix',
    color: '#059669',
  },
  {
    id: 'etc',
    label: 'Electron Transport Chain (ETC)',
    shortDescription: 'Complexes I-IV transfer electrons to drive ATP synthesis at Complex V',
    stepCount: 5,
    location: 'Inner Mitochondrial Membrane',
    color: '#10b981',
  },
  {
    id: 'pentose-phosphate',
    label: 'Pentose Phosphate Pathway',
    shortDescription: 'NADPH production and ribose-5-phosphate synthesis',
    location: 'Cytoplasm',
    color: '#34d399',
  },
];

export function getPathwayMeta(id: string): PathwayMeta | undefined {
  return pathwayRegistry.find((p) => p.id === id);
}

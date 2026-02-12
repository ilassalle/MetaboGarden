import type { MatchPair } from './types';

export const matchingSets: MatchPair[] = [
  // ── GLYCOLYSIS: Enzyme ↔ Reaction ─────────────────────────
  {
    id: 'gly-m1',
    pathwayId: 'glycolysis',
    leftLabel: 'Hexokinase',
    rightLabel: 'Glucose → Glucose-6-phosphate',
    category: 'enzyme-reaction',
  },
  {
    id: 'gly-m2',
    pathwayId: 'glycolysis',
    leftLabel: 'PFK-1',
    rightLabel: 'Fructose-6-P → Fructose-1,6-BP',
    category: 'enzyme-reaction',
  },
  {
    id: 'gly-m3',
    pathwayId: 'glycolysis',
    leftLabel: 'Aldolase',
    rightLabel: 'Fructose-1,6-BP → G3P + DHAP',
    category: 'enzyme-reaction',
  },
  {
    id: 'gly-m4',
    pathwayId: 'glycolysis',
    leftLabel: 'Pyruvate kinase',
    rightLabel: 'PEP → Pyruvate + ATP',
    category: 'enzyme-reaction',
  },
  {
    id: 'gly-m5',
    pathwayId: 'glycolysis',
    leftLabel: 'GAPDH',
    rightLabel: 'G3P → 1,3-BPG (uses NAD+)',
    category: 'enzyme-reaction',
  },
  // ── GLYCOLYSIS: Substrate ↔ Product ───────────────────────
  {
    id: 'gly-m6',
    pathwayId: 'glycolysis',
    leftLabel: 'Glucose (substrate)',
    rightLabel: '2 Pyruvate (product)',
    category: 'substrate-product',
  },
  {
    id: 'gly-m7',
    pathwayId: 'glycolysis',
    leftLabel: 'NAD+ (consumed)',
    rightLabel: 'NADH (produced)',
    category: 'substrate-product',
  },
  {
    id: 'gly-m8',
    pathwayId: 'glycolysis',
    leftLabel: '2-Phosphoglycerate',
    rightLabel: 'Phosphoenolpyruvate',
    category: 'substrate-product',
  },
  // ── GLYCOLYSIS: Regulator ↔ Target ────────────────────────
  {
    id: 'gly-m9',
    pathwayId: 'glycolysis',
    leftLabel: 'Fructose-2,6-BP (activator)',
    rightLabel: 'PFK-1',
    category: 'regulator-target',
  },
  {
    id: 'gly-m10',
    pathwayId: 'glycolysis',
    leftLabel: 'Citrate (inhibitor)',
    rightLabel: 'PFK-1',
    category: 'regulator-target',
  },
  {
    id: 'gly-m11',
    pathwayId: 'glycolysis',
    leftLabel: 'Glucose-6-P (inhibitor)',
    rightLabel: 'Hexokinase',
    category: 'regulator-target',
  },
  {
    id: 'gly-m12',
    pathwayId: 'glycolysis',
    leftLabel: 'Alanine (inhibitor)',
    rightLabel: 'Pyruvate kinase',
    category: 'regulator-target',
  },
];

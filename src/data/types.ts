// ============================================================
// CORE BIOCHEMISTRY DATA MODEL
// ============================================================

export type PathwayId =
  | 'glycolysis'
  | 'gluconeogenesis'
  | 'glycogenesis'
  | 'glycogenolysis'
  | 'fatty-acid-synthesis'
  | 'beta-oxidation'
  | 'ketone-metabolism'
  | 'tca-cycle'
  | 'etc'
  | 'tca-etc'
  | 'pentose-phosphate';

export type ReactionType =
  | 'phosphorylation'
  | 'isomerization'
  | 'cleavage'
  | 'oxidation'
  | 'reduction'
  | 'dehydration'
  | 'hydration'
  | 'substrate-level-phosphorylation'
  | 'hydrolysis'
  | 'carboxylation'
  | 'decarboxylation'
  | 'mutase'
  | 'ligation'
  | 'condensation'
  | 'thiolysis'
  | 'transfer'
  | 'rearrangement'
  | 'oxidative-decarboxylation';

export interface Molecule {
  id: string;
  name: string;
  abbreviation: string;
  formula: string;
}

export interface Regulation {
  regulatorName: string;
  regulatorType:
    | 'allosteric-activator'
    | 'allosteric-inhibitor'
    | 'product-inhibition'
    | 'feedforward-activation'
    | 'hormonal'
    | 'covalent-modification';
  description: string;
  tissueSpecific?: string;
}

export interface TissueVariant {
  tissue: string;
  isoformName: string;
  differenceDescription: string;
  kmValue?: string;
}

export interface Enzyme {
  id: string;
  name: string;
  ecNumber?: string;
  alternateNames?: string[];
  cofactors: string[];
  mechanismDescription: string;
  regulation: Regulation[];
  tissueVariants?: TissueVariant[];
  clinicalSignificance?: string;
}

export interface ReactionStep {
  id: string;
  stepNumber: number;
  pathwayId: PathwayId;
  phaseName?: string;
  reactionName: string;
  reactionType: ReactionType;
  enzyme: Enzyme;
  substrates: Molecule[];
  products: Molecule[];
  cofactorsConsumed: string[];
  cofactorsProduced: string[];
  deltaG: number;
  isReversible: boolean;
  isRateLimiting: boolean;
  detailedDescription: string;
  clinicalSignificance?: string;
  mcatHighYield: boolean;
}

export interface PathwayConnection {
  targetPathwayId: PathwayId;
  connectionDescription: string;
  sharedMetabolite: string;
}

export interface EnergySummary {
  atpConsumed: number;
  atpProduced: number;
  gtpProduced?: number;
  nadhProduced: number;
  fadh2Produced: number;
  netAtp: number;
  co2Produced?: number;
}

export interface Pathway {
  id: PathwayId;
  name: string;
  description: string;
  location: string;
  netEquation: string;
  steps: ReactionStep[];
  energySummary: EnergySummary;
  connections: PathwayConnection[];
  mcatKeyPoints: string[];
}

// ============================================================
// GAME-SPECIFIC TYPES
// ============================================================

export type QuestionType = 'multiple-choice' | 'fill-in-blank' | 'true-false';

export type QuestionCategory =
  | 'enzyme'
  | 'substrate'
  | 'product'
  | 'regulation'
  | 'energetics'
  | 'mechanism'
  | 'clinical'
  | 'location'
  | 'integration';

export type Difficulty = 'basic' | 'intermediate' | 'advanced';

export interface QuizQuestion {
  id: string;
  pathwayId: PathwayId;
  relatedStepId?: string;
  questionType: QuestionType;
  questionText: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  difficulty: Difficulty;
  category: QuestionCategory;
}

export type MatchCategory =
  | 'enzyme-reaction'
  | 'substrate-product'
  | 'regulator-target'
  | 'cofactor-enzyme'
  | 'pathway-location';

export interface MatchPair {
  id: string;
  pathwayId: PathwayId;
  leftLabel: string;
  rightLabel: string;
  category: MatchCategory;
}

export type GameMode = 'pathway-builder' | 'quiz' | 'diagram' | 'matching';

export interface GameProgress {
  pathwayId: PathwayId;
  gameMode: GameMode;
  completedAt?: string;
  score: number;
  bestScore: number;
  attempts: number;
  timeSpentSeconds: number;
}

export interface UserProgress {
  gameProgress: GameProgress[];
  achievements: string[];
  lastPlayedAt: string;
}

// ============================================================
// PATHWAY REGISTRY TYPES
// ============================================================

export interface PathwayMeta {
  id: PathwayId;
  label: string;
  shortDescription: string;
  stepCount?: number;
  location: string;
  color: string;
}

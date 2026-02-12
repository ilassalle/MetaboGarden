import type { Pathway, QuizQuestion } from './types';
import { glycolysisPathway } from './pathways/glycolysis';
import { gluconeogenesisPathway } from './pathways/gluconeogenesis';
import { glycogenesisPathway } from './pathways/glycogenesis';
import { glycogenolysisPathway } from './pathways/glycogenolysis';
import { fattyAcidSynthesisPathway } from './pathways/fatty-acid-synthesis';
import { betaOxidationPathway } from './pathways/beta-oxidation';
import { ketoneMetabolismPathway } from './pathways/ketone-metabolism';
import { tcaCyclePathway } from './pathways/tca-cycle';
import { etcPathway } from './pathways/etc';
import { pentosePhosphatePathway } from './pathways/pentose-phosphate';

const allPathways: Pathway[] = [
  glycolysisPathway,
  gluconeogenesisPathway,
  glycogenesisPathway,
  glycogenolysisPathway,
  fattyAcidSynthesisPathway,
  betaOxidationPathway,
  ketoneMetabolismPathway,
  tcaCyclePathway,
  etcPathway,
  pentosePhosphatePathway,
];

const locationDistractors = [
  'Cytoplasm',
  'Mitochondrial Matrix',
  'Inner Mitochondrial Membrane',
  'Cytoplasm + Mitochondria',
  'Liver + peripheral tissue mitochondria',
  'Cytoplasm (ER involvement in liver)',
];

function normalizeLocation(location: string) {
  return location.replace('Cytosol', 'Cytoplasm').trim();
}

function toOptions(correct: string, pool: string[]) {
  const uniquePool = Array.from(new Set(pool.filter((item) => item !== correct)));
  return [correct, ...uniquePool.slice(0, 3)];
}

function buildCoreQuestions(pathway: Pathway): QuizQuestion[] {
  const rateLimitingStep = pathway.steps.find((step) => step.isRateLimiting) ?? pathway.steps[0];
  const firstStep = pathway.steps[0];
  const lastStep = pathway.steps[pathway.steps.length - 1];

  return [
    {
      id: `${pathway.id}-q-core-1`,
      pathwayId: pathway.id,
      questionType: 'multiple-choice',
      questionText: `Where does ${pathway.name} primarily occur?`,
      options: toOptions(normalizeLocation(pathway.location), locationDistractors),
      correctAnswer: normalizeLocation(pathway.location),
      explanation: `${pathway.name} is primarily located in ${pathway.location}.`,
      difficulty: 'basic',
      category: 'location',
    },
    {
      id: `${pathway.id}-q-core-2`,
      pathwayId: pathway.id,
      relatedStepId: rateLimitingStep.id,
      questionType: 'multiple-choice',
      questionText: `Which enzyme is highlighted as rate-limiting in ${pathway.name}?`,
      options: toOptions(
        rateLimitingStep.enzyme.name,
        pathway.steps.map((step) => step.enzyme.name),
      ),
      correctAnswer: rateLimitingStep.enzyme.name,
      explanation: `${rateLimitingStep.enzyme.name} is tagged as the rate-limiting control point in this pathway dataset.`,
      difficulty: 'intermediate',
      category: 'regulation',
    },
    {
      id: `${pathway.id}-q-core-3`,
      pathwayId: pathway.id,
      questionType: 'fill-in-blank',
      questionText: `What is the net ATP yield of ${pathway.name}? (enter a number, use negatives for ATP cost)`,
      correctAnswer: String(pathway.energySummary.netAtp),
      explanation: `${pathway.name} has a net ATP value of ${pathway.energySummary.netAtp} based on ATP produced minus ATP consumed.`,
      difficulty: 'basic',
      category: 'energetics',
    },
    {
      id: `${pathway.id}-q-core-4`,
      pathwayId: pathway.id,
      relatedStepId: firstStep.id,
      questionType: 'fill-in-blank',
      questionText: `What substrate starts step 1 of ${pathway.name}?`,
      correctAnswer: firstStep.substrates[0]?.name ?? 'N/A',
      explanation: `Step 1 starts with ${firstStep.substrates[0]?.name ?? 'N/A'} in this pathway dataset.`,
      difficulty: 'basic',
      category: 'substrate',
    },
    {
      id: `${pathway.id}-q-core-5`,
      pathwayId: pathway.id,
      relatedStepId: lastStep.id,
      questionType: 'multiple-choice',
      questionText: `Which product is formed at the final step of ${pathway.name}?`,
      options: toOptions(
        lastStep.products[0]?.name ?? 'N/A',
        pathway.steps.flatMap((step) => step.products.map((p) => p.name)),
      ),
      correctAnswer: lastStep.products[0]?.name ?? 'N/A',
      explanation: `The final step (${lastStep.reactionName}) produces ${lastStep.products[0]?.name ?? 'N/A'}.`,
      difficulty: 'intermediate',
      category: 'product',
    },
  ];
}

const generatedQuestions = allPathways.flatMap((pathway) => buildCoreQuestions(pathway));

export const quizQuestions: QuizQuestion[] = generatedQuestions;

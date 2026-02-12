import type { QuizQuestion } from './types';

export const quizQuestions: QuizQuestion[] = [
  // ── GLYCOLYSIS ─────────────────────────────────────────────
  // Enzyme identification
  {
    id: 'gly-q1',
    pathwayId: 'glycolysis',
    relatedStepId: 'gly-step-1',
    questionType: 'multiple-choice',
    questionText:
      'Which enzyme catalyzes the first committed step of glycolysis (the phosphorylation of fructose-6-phosphate)?',
    options: [
      'Hexokinase',
      'Phosphofructokinase-1 (PFK-1)',
      'Pyruvate kinase',
      'Aldolase',
    ],
    correctAnswer: 'Phosphofructokinase-1 (PFK-1)',
    explanation:
      'PFK-1 catalyzes the phosphorylation of fructose-6-phosphate to fructose-1,6-bisphosphate. This is the rate-limiting and first committed step of glycolysis because glucose-6-phosphate can still be diverted to other pathways.',
    difficulty: 'basic',
    category: 'enzyme',
  },
  {
    id: 'gly-q2',
    pathwayId: 'glycolysis',
    relatedStepId: 'gly-step-1',
    questionType: 'multiple-choice',
    questionText:
      'Which enzyme traps glucose inside the cell by phosphorylating it to glucose-6-phosphate?',
    options: [
      'Glucokinase',
      'Hexokinase',
      'Phosphoglucose isomerase',
      'Both Hexokinase and Glucokinase',
    ],
    correctAnswer: 'Both Hexokinase and Glucokinase',
    explanation:
      'Hexokinase (most tissues) and glucokinase (liver and pancreatic beta cells) both catalyze this reaction. Hexokinase has a low Km and is inhibited by its product, while glucokinase has a high Km and is not product-inhibited.',
    difficulty: 'intermediate',
    category: 'enzyme',
  },
  // Substrate / product
  {
    id: 'gly-q3',
    pathwayId: 'glycolysis',
    questionType: 'multiple-choice',
    questionText:
      'What are the net products of glycolysis from one molecule of glucose?',
    options: [
      '2 pyruvate, 2 ATP, 2 NADH',
      '2 pyruvate, 4 ATP, 2 NADH',
      '1 pyruvate, 2 ATP, 1 NADH',
      '2 pyruvate, 2 ATP, 2 FADH2',
    ],
    correctAnswer: '2 pyruvate, 2 ATP, 2 NADH',
    explanation:
      'Glycolysis produces 4 ATP total but consumes 2 ATP in the preparatory phase, giving a net yield of 2 ATP. It also produces 2 NADH (from glyceraldehyde-3-phosphate dehydrogenase) and 2 pyruvate.',
    difficulty: 'basic',
    category: 'energetics',
  },
  {
    id: 'gly-q4',
    pathwayId: 'glycolysis',
    relatedStepId: 'gly-step-4',
    questionType: 'multiple-choice',
    questionText:
      'Aldolase cleaves fructose-1,6-bisphosphate into which two products?',
    options: [
      'Glyceraldehyde-3-phosphate and dihydroxyacetone phosphate',
      'Glucose-6-phosphate and fructose-6-phosphate',
      'Phosphoenolpyruvate and pyruvate',
      '1,3-bisphosphoglycerate and 3-phosphoglycerate',
    ],
    correctAnswer:
      'Glyceraldehyde-3-phosphate and dihydroxyacetone phosphate',
    explanation:
      'Aldolase performs a retro-aldol cleavage of the 6-carbon fructose-1,6-bisphosphate into two 3-carbon molecules: glyceraldehyde-3-phosphate (G3P) and dihydroxyacetone phosphate (DHAP).',
    difficulty: 'basic',
    category: 'substrate',
  },
  // Regulation
  {
    id: 'gly-q5',
    pathwayId: 'glycolysis',
    questionType: 'multiple-choice',
    questionText:
      'Which molecule is the most potent allosteric activator of PFK-1?',
    options: [
      'ATP',
      'Citrate',
      'Fructose-2,6-bisphosphate',
      'AMP',
    ],
    correctAnswer: 'Fructose-2,6-bisphosphate',
    explanation:
      'Fructose-2,6-bisphosphate (F2,6BP) is the most potent activator of PFK-1. It is produced by PFK-2 (bifunctional enzyme) and signals the fed state. AMP also activates PFK-1 but is less potent.',
    difficulty: 'intermediate',
    category: 'regulation',
  },
  {
    id: 'gly-q6',
    pathwayId: 'glycolysis',
    questionType: 'multiple-choice',
    questionText:
      'Which of the following inhibits PFK-1?',
    options: [
      'AMP',
      'Fructose-2,6-bisphosphate',
      'Citrate and ATP',
      'Fructose-6-phosphate',
    ],
    correctAnswer: 'Citrate and ATP',
    explanation:
      'ATP (at high concentrations) and citrate are allosteric inhibitors of PFK-1. High ATP signals adequate energy, and citrate indicates the TCA cycle is saturated, reducing the need for glycolysis.',
    difficulty: 'intermediate',
    category: 'regulation',
  },
  // Energetics
  {
    id: 'gly-q7',
    pathwayId: 'glycolysis',
    questionType: 'fill-in-blank',
    questionText:
      'How many ATP molecules are consumed during the preparatory (investment) phase of glycolysis?',
    correctAnswer: '2',
    explanation:
      'Two ATP are consumed: one by hexokinase (glucose to glucose-6-phosphate) and one by PFK-1 (fructose-6-phosphate to fructose-1,6-bisphosphate).',
    difficulty: 'basic',
    category: 'energetics',
  },
  {
    id: 'gly-q8',
    pathwayId: 'glycolysis',
    questionType: 'fill-in-blank',
    questionText:
      'What is the net ATP yield from one molecule of glucose through glycolysis alone?',
    correctAnswer: '2',
    explanation:
      'Glycolysis produces 4 ATP by substrate-level phosphorylation but uses 2 ATP in the preparatory phase, giving a net yield of 2 ATP per glucose.',
    difficulty: 'basic',
    category: 'energetics',
  },
  // Clinical
  {
    id: 'gly-q9',
    pathwayId: 'glycolysis',
    questionType: 'multiple-choice',
    questionText:
      'Pyruvate kinase deficiency primarily causes hemolytic anemia because mature red blood cells rely exclusively on which pathway for ATP?',
    options: [
      'TCA cycle',
      'Oxidative phosphorylation',
      'Glycolysis',
      'Pentose phosphate pathway',
    ],
    correctAnswer: 'Glycolysis',
    explanation:
      'Mature RBCs lack mitochondria, so glycolysis is their sole source of ATP. Pyruvate kinase deficiency impairs ATP production, leading to rigid cells that are destroyed in the spleen (hemolytic anemia).',
    difficulty: 'advanced',
    category: 'clinical',
  },
  {
    id: 'gly-q10',
    pathwayId: 'glycolysis',
    questionType: 'multiple-choice',
    questionText:
      'Arsenic poisoning can inhibit glycolysis at which enzyme by replacing inorganic phosphate?',
    options: [
      'Hexokinase',
      'Glyceraldehyde-3-phosphate dehydrogenase',
      'Pyruvate kinase',
      'Phosphoglycerate kinase',
    ],
    correctAnswer: 'Glyceraldehyde-3-phosphate dehydrogenase',
    explanation:
      'Arsenate (AsO4^3-) competes with inorganic phosphate at glyceraldehyde-3-phosphate dehydrogenase, forming an unstable arsenate ester that spontaneously hydrolyzes, bypassing ATP generation at the next step.',
    difficulty: 'advanced',
    category: 'clinical',
  },
  // Mechanism
  {
    id: 'gly-q11',
    pathwayId: 'glycolysis',
    questionType: 'multiple-choice',
    questionText:
      'Which type of reaction does triose phosphate isomerase (TPI) catalyze?',
    options: [
      'Phosphorylation',
      'Isomerization',
      'Oxidation',
      'Substrate-level phosphorylation',
    ],
    correctAnswer: 'Isomerization',
    explanation:
      'TPI catalyzes the reversible isomerization of dihydroxyacetone phosphate (a ketose) to glyceraldehyde-3-phosphate (an aldose), ensuring both products of the aldolase reaction proceed through the payoff phase.',
    difficulty: 'basic',
    category: 'mechanism',
  },
  {
    id: 'gly-q12',
    pathwayId: 'glycolysis',
    relatedStepId: 'gly-step-6',
    questionType: 'multiple-choice',
    questionText:
      'Glyceraldehyde-3-phosphate dehydrogenase requires which coenzyme?',
    options: [
      'FAD',
      'NAD+',
      'Coenzyme A',
      'Thiamine pyrophosphate',
    ],
    correctAnswer: 'NAD+',
    explanation:
      'GAPDH oxidizes glyceraldehyde-3-phosphate using NAD+ as an electron acceptor, producing NADH and 1,3-bisphosphoglycerate. This is the only oxidation step in glycolysis.',
    difficulty: 'intermediate',
    category: 'mechanism',
  },
  {
    id: 'gly-q13',
    pathwayId: 'glycolysis',
    questionType: 'multiple-choice',
    questionText:
      'Substrate-level phosphorylation occurs at which two steps of glycolysis?',
    options: [
      'Hexokinase and PFK-1',
      'Phosphoglycerate kinase and pyruvate kinase',
      'Aldolase and enolase',
      'GAPDH and TPI',
    ],
    correctAnswer: 'Phosphoglycerate kinase and pyruvate kinase',
    explanation:
      'Substrate-level phosphorylation transfers a phosphoryl group directly from a substrate to ADP. This occurs at phosphoglycerate kinase (1,3-BPG to 3-PG) and pyruvate kinase (PEP to pyruvate).',
    difficulty: 'intermediate',
    category: 'mechanism',
  },
  {
    id: 'gly-q14',
    pathwayId: 'glycolysis',
    questionType: 'fill-in-blank',
    questionText:
      'In anaerobic conditions, pyruvate is converted to lactate by which enzyme?',
    correctAnswer: 'Lactate dehydrogenase',
    explanation:
      'Lactate dehydrogenase (LDH) reduces pyruvate to lactate while oxidizing NADH back to NAD+, allowing glycolysis to continue in the absence of oxygen.',
    difficulty: 'basic',
    category: 'enzyme',
  },
  {
    id: 'gly-q15',
    pathwayId: 'glycolysis',
    questionType: 'multiple-choice',
    questionText:
      'Which of the three irreversible steps of glycolysis is NOT bypassed in gluconeogenesis by a different enzyme?',
    options: [
      'All three are bypassed by different enzymes in gluconeogenesis',
      'The hexokinase step',
      'The PFK-1 step',
      'The pyruvate kinase step',
    ],
    correctAnswer:
      'All three are bypassed by different enzymes in gluconeogenesis',
    explanation:
      'All three irreversible glycolytic enzymes (hexokinase, PFK-1, pyruvate kinase) are bypassed in gluconeogenesis: glucose-6-phosphatase, fructose-1,6-bisphosphatase, and pyruvate carboxylase + PEPCK respectively.',
    difficulty: 'advanced',
    category: 'integration',
  },
  {
    id: 'gly-q16',
    pathwayId: 'glycolysis',
    questionType: 'multiple-choice',
    questionText:
      'Phosphoenolpyruvate (PEP) has the highest phosphoryl-transfer potential among glycolytic intermediates. Which enzyme produces PEP?',
    options: [
      'Pyruvate kinase',
      'Enolase',
      'Phosphoglycerate mutase',
      'Phosphoglycerate kinase',
    ],
    correctAnswer: 'Enolase',
    explanation:
      'Enolase dehydrates 2-phosphoglycerate to form phosphoenolpyruvate (PEP). The dehydration raises the phosphoryl-transfer potential dramatically, enabling the subsequent substrate-level phosphorylation by pyruvate kinase.',
    difficulty: 'intermediate',
    category: 'mechanism',
  },
  {
    id: 'gly-q17',
    pathwayId: 'glycolysis',
    questionType: 'fill-in-blank',
    questionText:
      'Fluoride inhibits glycolysis by inhibiting which enzyme?',
    correctAnswer: 'Enolase',
    explanation:
      'Fluoride ions form a complex with magnesium and phosphate that inhibits enolase. This is why fluoride-containing tubes are used for blood glucose measurements -- they prevent glycolysis in the sample.',
    difficulty: 'advanced',
    category: 'clinical',
  },
  {
    id: 'gly-q18',
    pathwayId: 'glycolysis',
    questionType: 'multiple-choice',
    questionText:
      'In which cellular compartment does glycolysis occur?',
    options: [
      'Mitochondrial matrix',
      'Cytoplasm (cytosol)',
      'Endoplasmic reticulum',
      'Nucleus',
    ],
    correctAnswer: 'Cytoplasm (cytosol)',
    explanation:
      'All ten reactions of glycolysis take place in the cytosol. This is important because it means glycolysis can occur in cells that lack mitochondria, such as mature red blood cells.',
    difficulty: 'basic',
    category: 'location',
  },
];

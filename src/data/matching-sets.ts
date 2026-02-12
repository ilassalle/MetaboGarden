import type { MatchPair, Pathway } from './types';
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

function buildPairs(pathway: Pathway): MatchPair[] {
  const enzymeReactionPairs: MatchPair[] = pathway.steps.slice(0, 4).map((step, index) => ({
    id: `${pathway.id}-m-er-${index + 1}`,
    pathwayId: pathway.id,
    leftLabel: step.enzyme.name,
    rightLabel: step.reactionName,
    category: 'enzyme-reaction',
  }));

  const firstStep = pathway.steps[0];
  const lastStep = pathway.steps[pathway.steps.length - 1];

  const substrateProductPairs: MatchPair[] = [
    {
      id: `${pathway.id}-m-sp-1`,
      pathwayId: pathway.id,
      leftLabel: `${firstStep.substrates[0]?.name ?? 'Initial substrate'} (start)`,
      rightLabel: `${lastStep.products[0]?.name ?? 'Final product'} (end product)`,
      category: 'substrate-product',
    },
    {
      id: `${pathway.id}-m-sp-2`,
      pathwayId: pathway.id,
      leftLabel: 'Net ATP outcome',
      rightLabel: `${pathway.energySummary.netAtp} ATP`,
      category: 'substrate-product',
    },
  ];

  const regulators = pathway.steps
    .flatMap((step) => step.enzyme.regulation.map((reg) => ({ step, reg })))
    .slice(0, 2)
    .map((entry, index): MatchPair => ({
      id: `${pathway.id}-m-rt-${index + 1}`,
      pathwayId: pathway.id,
      leftLabel: entry.reg.regulatorName,
      rightLabel: entry.step.enzyme.name,
      category: 'regulator-target',
    }));

  const fallbackRegulators: MatchPair[] = [];
  if (regulators.length < 2) {
    fallbackRegulators.push(
      {
        id: `${pathway.id}-m-rt-f1`,
        pathwayId: pathway.id,
        leftLabel: 'Primary location',
        rightLabel: pathway.location,
        category: 'pathway-location',
      },
      {
        id: `${pathway.id}-m-rt-f2`,
        pathwayId: pathway.id,
        leftLabel: 'Pathway name',
        rightLabel: pathway.name,
        category: 'pathway-location',
      },
    );
  }

  return [...enzymeReactionPairs, ...substrateProductPairs, ...regulators, ...fallbackRegulators].slice(0, 8);
}

export const matchingSets: MatchPair[] = allPathways.flatMap((pathway) => buildPairs(pathway));

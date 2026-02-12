import type { Pathway } from '../types';

export const ketoneMetabolismPathway: Pathway = {
  id: 'ketone-metabolism',
  name: 'Ketone Body Metabolism',
  description:
    'Ketone body metabolism encompasses two opposing processes: ketogenesis (synthesis in the liver) and ketolysis (utilization in peripheral tissues). During prolonged fasting, starvation, or uncontrolled diabetes, the liver converts excess acetyl-CoA from beta-oxidation into the ketone bodies acetoacetate, beta-hydroxybutyrate, and acetone. Crucially, the liver produces ketones but cannot use them because it lacks thiophorase (succinyl-CoA:acetoacetate CoA transferase). Peripheral tissues — especially the brain during prolonged fasting, heart, and skeletal muscle — take up and oxidize ketone bodies as an alternative fuel source.',
  location: 'Mitochondria',
  netEquation:
    'Ketogenesis: 2 Acetyl-CoA + H₂O → Acetoacetate + 2 CoA | Ketolysis: Acetoacetate + Succinyl-CoA + CoA → 2 Acetyl-CoA + Succinate',
  energySummary: {
    atpConsumed: 0,
    atpProduced: 0,
    nadhProduced: 0,
    fadh2Produced: 0,
    netAtp: 0,
  },
  connections: [
    {
      targetPathwayId: 'beta-oxidation',
      connectionDescription:
        'Excess acetyl-CoA from beta-oxidation is the substrate for ketogenesis when it exceeds TCA cycle capacity',
      sharedMetabolite: 'Acetyl-CoA',
    },
    {
      targetPathwayId: 'tca-etc',
      connectionDescription:
        'Ketolysis produces acetyl-CoA that enters the TCA cycle; ketogenesis diverts acetyl-CoA away from TCA when OAA is depleted',
      sharedMetabolite: 'Acetyl-CoA / Succinyl-CoA',
    },
    {
      targetPathwayId: 'gluconeogenesis',
      connectionDescription:
        'OAA is consumed by gluconeogenesis during fasting, reducing TCA cycle capacity and driving ketogenesis from accumulated acetyl-CoA',
      sharedMetabolite: 'Oxaloacetate',
    },
    {
      targetPathwayId: 'fatty-acid-synthesis',
      connectionDescription:
        'HMG-CoA is a shared intermediate: in mitochondria it leads to ketogenesis, in cytoplasm it leads to cholesterol synthesis',
      sharedMetabolite: 'HMG-CoA',
    },
    {
      targetPathwayId: 'glycolysis',
      connectionDescription:
        'During prolonged fasting, ketone bodies spare glucose by providing an alternative fuel for the brain',
      sharedMetabolite: 'Acetyl-CoA',
    },
  ],
  mcatKeyPoints: [
    'The liver synthesizes ketone bodies but CANNOT use them because it lacks thiophorase (succinyl-CoA:acetoacetate CoA transferase)',
    'The three ketone bodies are: acetoacetate, beta-hydroxybutyrate (most abundant in blood), and acetone (produced by spontaneous decarboxylation)',
    'Brain can use ketone bodies during prolonged fasting (after 2-3 days), reducing glucose requirement from ~120 g/day to ~40 g/day',
    'HMG-CoA synthase is the rate-limiting enzyme of ketogenesis',
    'Ketogenesis is stimulated by glucagon and high acetyl-CoA levels; inhibited by insulin',
    'Diabetic ketoacidosis (DKA) occurs in type 1 diabetes: absence of insulin causes unregulated lipolysis and ketogenesis',
    'Ketone bodies are water-soluble (unlike fatty acids), allowing them to travel in blood without albumin',
    'Beta-hydroxybutyrate:acetoacetate ratio reflects the mitochondrial NADH/NAD+ ratio',
    'Mitochondrial HMG-CoA (ketogenesis) is distinct from cytoplasmic HMG-CoA (cholesterol synthesis)',
    'Acetone is volatile and exhaled — causes fruity breath odor in DKA',
  ],
  steps: [
    // -- Step 1: Thiolase (Ketogenesis) --
    {
      id: 'km-step-1',
      stepNumber: 1,
      pathwayId: 'ketone-metabolism',
      phaseName: 'Ketogenesis (Liver Only)',
      reactionName: 'Condensation of Two Acetyl-CoA to Acetoacetyl-CoA',
      reactionType: 'condensation',
      enzyme: {
        id: 'thiolase-keto',
        name: 'Thiolase (Acetyl-CoA Acetyltransferase)',
        ecNumber: 'EC 2.3.1.9',
        alternateNames: ['Acetoacetyl-CoA Thiolase', 'ACAT'],
        cofactors: [],
        mechanismDescription:
          'Catalyzes the reverse of the thiolytic cleavage reaction in beta-oxidation: two molecules of acetyl-CoA condense to form acetoacetyl-CoA, releasing one CoA. This is a Claisen condensation reaction. The equilibrium normally favors thiolysis (cleavage), but the subsequent irreversible HMG-CoA synthase reaction pulls the condensation forward.',
        regulation: [
          {
            regulatorName: 'Acetyl-CoA concentration',
            regulatorType: 'allosteric-activator',
            description:
              'High mitochondrial acetyl-CoA concentration (from beta-oxidation exceeding TCA cycle capacity) drives the condensation reaction forward by mass action.',
          },
        ],
      },
      substrates: [
        {
          id: 'acetyl-coa-km1a',
          name: 'Acetyl-CoA',
          abbreviation: 'Ac-CoA',
          formula: 'C23H38N7O17P3S',
        },
        {
          id: 'acetyl-coa-km1b',
          name: 'Acetyl-CoA',
          abbreviation: 'Ac-CoA',
          formula: 'C23H38N7O17P3S',
        },
      ],
      products: [
        {
          id: 'acetoacetyl-coa-km1',
          name: 'Acetoacetyl-CoA',
          abbreviation: 'AcAc-CoA',
          formula: 'C25H40N7O18P3S',
        },
      ],
      cofactorsConsumed: [],
      cofactorsProduced: ['CoA'],
      deltaG: 6.0,
      isReversible: true,
      isRateLimiting: false,
      detailedDescription:
        'This is the same thiolase enzyme used in the final step of beta-oxidation, but running in the reverse direction (condensation instead of thiolysis). During fasting, acetyl-CoA accumulates in liver mitochondria because: (1) beta-oxidation is highly active (stimulated by glucagon), and (2) OAA is being consumed by gluconeogenesis, limiting TCA cycle capacity. The resulting high acetyl-CoA:CoA ratio drives the condensation reaction forward despite the unfavorable equilibrium. The acetoacetyl-CoA product is immediately consumed by HMG-CoA synthase, pulling the reaction forward.',
      mcatHighYield: true,
    },

    // -- Step 2: HMG-CoA Synthase (Rate-Limiting) --
    {
      id: 'km-step-2',
      stepNumber: 2,
      pathwayId: 'ketone-metabolism',
      phaseName: 'Ketogenesis (Liver Only)',
      reactionName: 'Formation of HMG-CoA',
      reactionType: 'condensation',
      enzyme: {
        id: 'hmg-coa-synthase',
        name: 'HMG-CoA Synthase (Mitochondrial)',
        ecNumber: 'EC 2.3.3.10',
        alternateNames: ['3-Hydroxy-3-Methylglutaryl-CoA Synthase', 'mHMGCS', 'HMGCS2'],
        cofactors: [],
        mechanismDescription:
          'Condenses acetoacetyl-CoA with a third acetyl-CoA molecule to form HMG-CoA (3-hydroxy-3-methylglutaryl-CoA). This is an aldol-like condensation reaction. The acetyl group from acetyl-CoA is added to the carbonyl of acetoacetyl-CoA, with release of CoA.',
        regulation: [
          {
            regulatorName: 'Insulin',
            regulatorType: 'hormonal',
            description:
              'Insulin suppresses transcription of HMG-CoA synthase gene and promotes its succinylation (inactivation), reducing ketogenesis in the fed state.',
          },
          {
            regulatorName: 'Glucagon',
            regulatorType: 'hormonal',
            description:
              'Glucagon induces HMG-CoA synthase gene expression (via FoxA2 and PPARalpha), promoting ketogenesis during fasting.',
          },
          {
            regulatorName: 'Succinyl-CoA',
            regulatorType: 'allosteric-inhibitor',
            description:
              'Succinyl-CoA (a TCA cycle intermediate) succinylates and inhibits HMG-CoA synthase. When TCA cycle flux is adequate, this feedback inhibits ketogenesis.',
          },
        ],
        clinicalSignificance:
          'HMG-CoA synthase deficiency is a rare inborn error causing hypoketotic hypoglycemia (similar presentation to fatty acid oxidation defects, but with normal acylcarnitine profile).',
      },
      substrates: [
        {
          id: 'acetoacetyl-coa-km2',
          name: 'Acetoacetyl-CoA',
          abbreviation: 'AcAc-CoA',
          formula: 'C25H40N7O18P3S',
        },
        {
          id: 'acetyl-coa-km2',
          name: 'Acetyl-CoA',
          abbreviation: 'Ac-CoA',
          formula: 'C23H38N7O17P3S',
        },
      ],
      products: [
        {
          id: 'hmg-coa',
          name: '3-Hydroxy-3-Methylglutaryl-CoA',
          abbreviation: 'HMG-CoA',
          formula: 'C27H44N7O20P3S',
        },
      ],
      cofactorsConsumed: ['H2O'],
      cofactorsProduced: ['CoA'],
      deltaG: -13.0,
      isReversible: false,
      isRateLimiting: true,
      detailedDescription:
        'This is the rate-limiting and committed step of ketogenesis. The mitochondrial HMG-CoA synthase (HMGCS2) is distinct from the cytoplasmic isoform (HMGCS1) involved in cholesterol synthesis. Key distinction: mitochondrial HMG-CoA is used for ketogenesis (by HMG-CoA lyase), while cytoplasmic HMG-CoA is used for cholesterol synthesis (by HMG-CoA reductase, the target of statins). The mitochondrial enzyme is regulated at the transcriptional level by glucagon/insulin signaling (via FoxA2, PPARalpha, CREB) and at the post-translational level by succinylation. When TCA cycle intermediates are depleted (OAA consumed by gluconeogenesis), succinyl-CoA levels fall, relieving inhibition and promoting ketogenesis.',
      clinicalSignificance:
        'Do not confuse mitochondrial HMG-CoA synthase (ketogenesis) with cytoplasmic HMG-CoA synthase (cholesterol synthesis). Statins inhibit HMG-CoA reductase (cholesterol pathway), NOT HMG-CoA lyase (ketogenesis).',
      mcatHighYield: true,
    },

    // -- Step 3: HMG-CoA Lyase --
    {
      id: 'km-step-3',
      stepNumber: 3,
      pathwayId: 'ketone-metabolism',
      phaseName: 'Ketogenesis (Liver Only)',
      reactionName: 'Cleavage of HMG-CoA to Acetoacetate',
      reactionType: 'cleavage',
      enzyme: {
        id: 'hmg-coa-lyase',
        name: 'HMG-CoA Lyase',
        ecNumber: 'EC 4.1.3.4',
        alternateNames: ['3-Hydroxy-3-Methylglutaryl-CoA Lyase', 'HL'],
        cofactors: [],
        mechanismDescription:
          'Cleaves HMG-CoA into acetoacetate (the first ketone body) and acetyl-CoA. This is a retro-aldol cleavage. The acetyl-CoA released can re-enter the ketogenic pathway or the TCA cycle.',
        regulation: [],
        clinicalSignificance:
          'HMG-CoA lyase deficiency is a rare autosomal recessive disorder presenting in neonates with hypoketotic hypoglycemia, metabolic acidosis, and hyperammonemia.',
      },
      substrates: [
        {
          id: 'hmg-coa-km3',
          name: 'HMG-CoA',
          abbreviation: 'HMG-CoA',
          formula: 'C27H44N7O20P3S',
        },
      ],
      products: [
        {
          id: 'acetoacetate',
          name: 'Acetoacetate',
          abbreviation: 'AcAc',
          formula: 'C4H6O3',
        },
        {
          id: 'acetyl-coa-km3',
          name: 'Acetyl-CoA',
          abbreviation: 'Ac-CoA',
          formula: 'C23H38N7O17P3S',
        },
      ],
      cofactorsConsumed: [],
      cofactorsProduced: [],
      deltaG: -5.4,
      isReversible: false,
      isRateLimiting: false,
      detailedDescription:
        'HMG-CoA lyase cleaves HMG-CoA to produce acetoacetate, the first ketone body, and acetyl-CoA. Acetoacetate can then be: (1) reduced to beta-hydroxybutyrate by beta-hydroxybutyrate dehydrogenase (step 4), (2) spontaneously decarboxylated to acetone (step 5), or (3) released into the blood for uptake by peripheral tissues. Note that the net stoichiometry of steps 1-3 is: 2 acetyl-CoA → 1 acetoacetate + 1 CoA (the third acetyl-CoA added in step 2 is recovered here). HMG-CoA lyase is also required for leucine catabolism, so its deficiency also impairs leucine degradation.',
      clinicalSignificance:
        'HMG-CoA lyase deficiency: hypoketotic hypoglycemia + organic aciduria (3-methylglutaconic acid, 3-hydroxy-3-methylglutaric acid). Also impairs leucine catabolism.',
      mcatHighYield: true,
    },

    // -- Step 4: Beta-Hydroxybutyrate Dehydrogenase --
    {
      id: 'km-step-4',
      stepNumber: 4,
      pathwayId: 'ketone-metabolism',
      phaseName: 'Ketogenesis (Liver Only)',
      reactionName: 'Reduction of Acetoacetate to Beta-Hydroxybutyrate',
      reactionType: 'reduction',
      enzyme: {
        id: 'bhb-dehydrogenase',
        name: 'Beta-Hydroxybutyrate Dehydrogenase',
        ecNumber: 'EC 1.1.1.30',
        alternateNames: ['D-3-Hydroxybutyrate Dehydrogenase', 'BDH1'],
        cofactors: ['NADH'],
        mechanismDescription:
          'Reduces the keto group of acetoacetate to a hydroxyl group using NADH as the electron donor, producing D-beta-hydroxybutyrate (D-3-hydroxybutyrate). This is a reversible reaction; the direction depends on the NADH/NAD+ ratio.',
        regulation: [
          {
            regulatorName: 'NADH/NAD+ ratio',
            regulatorType: 'allosteric-activator',
            description:
              'A high mitochondrial NADH/NAD+ ratio (as seen during active beta-oxidation) drives the reaction toward beta-hydroxybutyrate production, making it the predominant circulating ketone body.',
          },
        ],
      },
      substrates: [
        {
          id: 'acetoacetate-km4',
          name: 'Acetoacetate',
          abbreviation: 'AcAc',
          formula: 'C4H6O3',
        },
      ],
      products: [
        {
          id: 'beta-hydroxybutyrate',
          name: 'D-Beta-Hydroxybutyrate',
          abbreviation: 'BHB',
          formula: 'C4H8O3',
        },
      ],
      cofactorsConsumed: ['NADH'],
      cofactorsProduced: ['NAD+'],
      deltaG: -1.4,
      isReversible: true,
      isRateLimiting: false,
      detailedDescription:
        'Beta-hydroxybutyrate is the most abundant ketone body in the blood (3:1 ratio to acetoacetate under normal conditions, rising to 6:1 or higher in DKA). The BHB:AcAc ratio directly reflects the mitochondrial NADH:NAD+ ratio because this is a near-equilibrium reaction. During active beta-oxidation, NADH is abundant, driving the equilibrium toward BHB. In peripheral tissues during ketolysis, the reaction runs in reverse (BHB → AcAc + NADH), effectively transporting reducing equivalents from liver to peripheral tissues. Technically, beta-hydroxybutyrate is not a "ketone" (it has a hydroxyl group, not a keto group), but it is classified as a ketone body.',
      clinicalSignificance:
        'Urine dipsticks detect acetoacetate (not beta-hydroxybutyrate), which can underestimate ketosis severity. Serum BHB measurement is the gold standard for monitoring DKA.',
      mcatHighYield: true,
    },

    // -- Step 5: Spontaneous Decarboxylation to Acetone --
    {
      id: 'km-step-5',
      stepNumber: 5,
      pathwayId: 'ketone-metabolism',
      phaseName: 'Ketogenesis (Liver Only)',
      reactionName: 'Spontaneous Decarboxylation of Acetoacetate to Acetone',
      reactionType: 'decarboxylation',
      enzyme: {
        id: 'non-enzymatic',
        name: 'Non-enzymatic (Spontaneous)',
        alternateNames: ['Spontaneous Decarboxylation'],
        cofactors: [],
        mechanismDescription:
          'Acetoacetate is a beta-keto acid that undergoes slow, spontaneous (non-enzymatic) decarboxylation to form acetone and CO2. The reaction rate increases at lower pH (relevant in DKA). Acetone is volatile and cannot be reconverted to acetyl-CoA in significant amounts.',
        regulation: [],
        clinicalSignificance:
          'Acetone is responsible for the characteristic fruity breath odor in patients with DKA. Acetone is volatile and exhaled through the lungs.',
      },
      substrates: [
        {
          id: 'acetoacetate-km5',
          name: 'Acetoacetate',
          abbreviation: 'AcAc',
          formula: 'C4H6O3',
        },
      ],
      products: [
        {
          id: 'acetone',
          name: 'Acetone',
          abbreviation: 'Ace',
          formula: 'C3H6O',
        },
        {
          id: 'co2-km5',
          name: 'Carbon Dioxide',
          abbreviation: 'CO2',
          formula: 'CO2',
        },
      ],
      cofactorsConsumed: [],
      cofactorsProduced: [],
      deltaG: -25.0,
      isReversible: false,
      isRateLimiting: false,
      detailedDescription:
        'This is a non-enzymatic reaction. Acetoacetate, as a beta-keto acid, is inherently unstable and undergoes spontaneous decarboxylation. Under normal conditions, most acetoacetate is either reduced to beta-hydroxybutyrate (step 4) or used by peripheral tissues (ketolysis). Significant acetone production occurs only when ketone body concentrations are pathologically elevated (as in DKA or prolonged starvation). Acetone is essentially a metabolic dead-end — it is volatile, exhaled by the lungs, and excreted in urine, with minimal metabolic utilization. Small amounts can be converted to pyruvate and lactate in the liver via acetol, but this is quantitatively minor.',
      clinicalSignificance:
        'Fruity breath odor in DKA is due to acetone exhalation. Acetone can also be detected on breath in prolonged fasting and ketogenic diets.',
      mcatHighYield: true,
    },

    // -- Step 6: Ketolysis — Thiophorase --
    {
      id: 'km-step-6',
      stepNumber: 6,
      pathwayId: 'ketone-metabolism',
      phaseName: 'Ketolysis (Peripheral Tissues — NOT Liver)',
      reactionName: 'Activation of Acetoacetate by Thiophorase',
      reactionType: 'transfer',
      enzyme: {
        id: 'thiophorase',
        name: 'Succinyl-CoA:Acetoacetate CoA Transferase',
        ecNumber: 'EC 2.8.3.5',
        alternateNames: ['Thiophorase', 'SCOT', '3-Oxoacid CoA-Transferase', 'OXCT1'],
        cofactors: ['Succinyl-CoA'],
        mechanismDescription:
          'Transfers the CoA group from succinyl-CoA to acetoacetate, forming acetoacetyl-CoA and succinate. This activates acetoacetate for subsequent cleavage by thiolase. The reaction uses succinyl-CoA from the TCA cycle as the CoA donor, bypassing the need for a separate activation step requiring ATP.',
        regulation: [],
        clinicalSignificance:
          'The liver LACKS this enzyme. This is the fundamental reason the liver cannot oxidize ketone bodies — it can only produce them. This ensures that ketone bodies synthesized by the liver are exported for use by extrahepatic tissues. SCOT deficiency is a rare cause of persistent ketoacidosis.',
      },
      substrates: [
        {
          id: 'acetoacetate-km6',
          name: 'Acetoacetate',
          abbreviation: 'AcAc',
          formula: 'C4H6O3',
        },
        {
          id: 'succinyl-coa-km6',
          name: 'Succinyl-CoA',
          abbreviation: 'Suc-CoA',
          formula: 'C25H40N7O19P3S',
        },
      ],
      products: [
        {
          id: 'acetoacetyl-coa-km6',
          name: 'Acetoacetyl-CoA',
          abbreviation: 'AcAc-CoA',
          formula: 'C25H40N7O18P3S',
        },
        {
          id: 'succinate-km6',
          name: 'Succinate',
          abbreviation: 'Suc',
          formula: 'C4H6O4',
        },
      ],
      cofactorsConsumed: ['Succinyl-CoA'],
      cofactorsProduced: ['Succinate'],
      deltaG: -0.8,
      isReversible: true,
      isRateLimiting: false,
      detailedDescription:
        'This is the critical step that distinguishes tissues that can and cannot use ketone bodies. The liver does NOT express thiophorase (SCOT/OXCT1), so it cannot activate acetoacetate for utilization. This ensures a one-way flow: liver synthesizes ketone bodies and exports them for use by the heart, skeletal muscle, brain (during prolonged fasting), and renal cortex. The heart preferentially uses ketone bodies even in the fed state. The brain begins using ketone bodies after 2-3 days of fasting, eventually deriving up to 75% of its energy from them, dramatically reducing the need for gluconeogenesis and sparing muscle protein. Beta-hydroxybutyrate arriving at peripheral tissues is first oxidized back to acetoacetate by BHB dehydrogenase (reverse of step 4, producing NADH) before being activated by thiophorase.',
      clinicalSignificance:
        'SCOT (thiophorase) deficiency: rare autosomal recessive disorder causing persistent severe ketoacidosis even in the fed state, because tissues cannot utilize ketone bodies. The liver lacks SCOT — this is the single most important fact about ketone body metabolism for the MCAT.',
      mcatHighYield: true,
    },

    // -- Step 7: Thiolase Cleavage of Acetoacetyl-CoA --
    {
      id: 'km-step-7',
      stepNumber: 7,
      pathwayId: 'ketone-metabolism',
      phaseName: 'Ketolysis (Peripheral Tissues — NOT Liver)',
      reactionName: 'Thiolytic Cleavage of Acetoacetyl-CoA to 2 Acetyl-CoA',
      reactionType: 'thiolysis',
      enzyme: {
        id: 'thiolase-ketolysis',
        name: 'Thiolase (Acetyl-CoA Acetyltransferase)',
        ecNumber: 'EC 2.3.1.9',
        alternateNames: ['Acetoacetyl-CoA Thiolase', 'ACAT'],
        cofactors: ['CoA'],
        mechanismDescription:
          'Cleaves acetoacetyl-CoA using a free CoA molecule, producing two molecules of acetyl-CoA. This is the same thiolase reaction as in the final step of beta-oxidation and the reverse of step 1 in ketogenesis. The acetyl-CoA products enter the TCA cycle for complete oxidation.',
        regulation: [],
      },
      substrates: [
        {
          id: 'acetoacetyl-coa-km7',
          name: 'Acetoacetyl-CoA',
          abbreviation: 'AcAc-CoA',
          formula: 'C25H40N7O18P3S',
        },
        {
          id: 'coa-km7',
          name: 'Coenzyme A',
          abbreviation: 'CoA',
          formula: 'C21H36N7O16P3S',
        },
      ],
      products: [
        {
          id: 'acetyl-coa-km7a',
          name: 'Acetyl-CoA',
          abbreviation: 'Ac-CoA',
          formula: 'C23H38N7O17P3S',
        },
        {
          id: 'acetyl-coa-km7b',
          name: 'Acetyl-CoA',
          abbreviation: 'Ac-CoA',
          formula: 'C23H38N7O17P3S',
        },
      ],
      cofactorsConsumed: ['CoA'],
      cofactorsProduced: [],
      deltaG: -6.0,
      isReversible: true,
      isRateLimiting: false,
      detailedDescription:
        'The final step of ketolysis cleaves acetoacetyl-CoA into two acetyl-CoA molecules, which enter the TCA cycle. The overall energy yield from one acetoacetate: thiophorase uses 1 succinyl-CoA (bypasses succinyl-CoA synthetase, costing 1 GTP), then 2 acetyl-CoA in TCA cycle yield ~20 ATP (2 x 10), minus 1 GTP = ~19 ATP net per acetoacetate. For beta-hydroxybutyrate: add 1 NADH from BHB dehydrogenase (~2.5 ATP), so ~21.5 ATP net. This makes ketone bodies an efficient fuel source. The complete ketolysis pathway: BHB → AcAc (NADH produced) → AcAc-CoA (thiophorase) → 2 Ac-CoA (thiolase) → TCA cycle.',
      clinicalSignificance:
        'Ketone bodies provide 2 acetyl-CoA per acetoacetate, yielding approximately 20 ATP via the TCA cycle and ETC. They are an efficient fuel that spares glucose and reduces muscle protein breakdown during prolonged fasting.',
      mcatHighYield: true,
    },
  ],
};

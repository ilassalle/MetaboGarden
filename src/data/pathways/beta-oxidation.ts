import type { Pathway } from '../types';

export const betaOxidationPathway: Pathway = {
  id: 'beta-oxidation',
  name: 'Beta-Oxidation (Fatty Acid Oxidation)',
  description:
    'The mitochondrial spiral pathway that degrades fatty acids by sequentially removing 2-carbon units as acetyl-CoA. Each cycle of beta-oxidation involves four reactions: oxidation (FAD), hydration, oxidation (NAD+), and thiolysis. For palmitate (C16), seven cycles produce 8 acetyl-CoA, 7 FADH2, and 7 NADH, yielding approximately 106 ATP (104 net after activation cost). The pathway is active during fasting, exercise, and starvation, and is reciprocally regulated with fatty acid synthesis.',
  location: 'Mitochondrial Matrix',
  netEquation:
    'Palmitoyl-CoA + 7 FAD + 7 NAD+ + 7 CoA + 7 H₂O → 8 Acetyl-CoA + 7 FADH2 + 7 NADH + 7 H+',
  energySummary: {
    atpConsumed: 2,
    atpProduced: 106,
    nadhProduced: 7,
    fadh2Produced: 7,
    netAtp: 104,
    co2Produced: 16,
  },
  connections: [
    {
      targetPathwayId: 'tca-etc',
      connectionDescription:
        'Acetyl-CoA from beta-oxidation enters the TCA cycle for complete oxidation; NADH and FADH2 feed into the ETC',
      sharedMetabolite: 'Acetyl-CoA',
    },
    {
      targetPathwayId: 'ketone-metabolism',
      connectionDescription:
        'When acetyl-CoA exceeds TCA cycle capacity (e.g., prolonged fasting), it is diverted to ketogenesis in the liver',
      sharedMetabolite: 'Acetyl-CoA',
    },
    {
      targetPathwayId: 'fatty-acid-synthesis',
      connectionDescription:
        'Malonyl-CoA from fatty acid synthesis inhibits CPT-I, preventing simultaneous beta-oxidation and synthesis',
      sharedMetabolite: 'Malonyl-CoA / Fatty acyl-CoA',
    },
    {
      targetPathwayId: 'gluconeogenesis',
      connectionDescription:
        'NADH and acetyl-CoA from beta-oxidation provide energy and allosteric activation for gluconeogenesis during fasting',
      sharedMetabolite: 'NADH / Acetyl-CoA',
    },
    {
      targetPathwayId: 'glycolysis',
      connectionDescription:
        'Acetyl-CoA from beta-oxidation inhibits pyruvate dehydrogenase, sparing glucose during fasting',
      sharedMetabolite: 'Acetyl-CoA',
    },
  ],
  mcatKeyPoints: [
    'Active during fasting, exercise, and starvation; glucagon and epinephrine stimulate lipolysis and beta-oxidation',
    'CPT-I (carnitine palmitoyltransferase I) is the rate-limiting step for long-chain fatty acid entry into mitochondria',
    'CPT-I is inhibited by malonyl-CoA, preventing simultaneous synthesis and oxidation',
    'Each cycle: 1 FADH2, 1 NADH, 1 acetyl-CoA removed from the acyl chain',
    'Palmitate (C16) yields: 8 acetyl-CoA, 7 FADH2, 7 NADH = ~106 ATP total (net 104 after 2 ATP activation cost)',
    'Odd-chain fatty acids produce propionyl-CoA in the final thiolysis step, which is converted to succinyl-CoA (requires B12, biotin)',
    'MCAD (medium-chain acyl-CoA dehydrogenase) deficiency is the most common inherited fatty acid oxidation disorder',
    'Very long chain fatty acids (>C20) undergo initial shortening in peroxisomes; Zellweger syndrome results from absent peroxisomes',
    'Activation of fatty acids requires 2 ATP equivalents (ATP → AMP + 2 Pi)',
    'Carnitine shuttle is required only for long-chain fatty acids; medium- and short-chain can enter mitochondria directly',
  ],
  steps: [
    // -- Step 1: Fatty Acid Activation --
    {
      id: 'bo-step-1',
      stepNumber: 1,
      pathwayId: 'beta-oxidation',
      phaseName: 'Activation',
      reactionName: 'Fatty Acid Activation to Fatty Acyl-CoA',
      reactionType: 'ligation',
      enzyme: {
        id: 'acyl-coa-synthetase',
        name: 'Fatty Acyl-CoA Synthetase',
        ecNumber: 'EC 6.2.1.3',
        alternateNames: ['Thiokinase', 'Acyl-CoA Ligase', 'Fatty Acid:CoA Ligase'],
        cofactors: ['ATP', 'CoA', 'Mg2+'],
        mechanismDescription:
          'Catalyzes a two-step reaction on the outer mitochondrial membrane: (1) fatty acid + ATP → fatty acyl-adenylate (acyl-AMP) + PPi, (2) acyl-AMP + CoA → fatty acyl-CoA + AMP. Pyrophosphatase rapidly hydrolyzes PPi to 2 Pi, making the reaction irreversible (costs 2 ATP equivalents total).',
        regulation: [],
        clinicalSignificance:
          'The cost of 2 ATP equivalents for activation is important for net ATP yield calculations on the MCAT.',
      },
      substrates: [
        {
          id: 'fatty-acid',
          name: 'Fatty Acid (e.g., Palmitate)',
          abbreviation: 'FA',
          formula: 'C16H32O2',
        },
        {
          id: 'coa-bo1',
          name: 'Coenzyme A',
          abbreviation: 'CoA',
          formula: 'C21H36N7O16P3S',
        },
      ],
      products: [
        {
          id: 'fatty-acyl-coa',
          name: 'Fatty Acyl-CoA (e.g., Palmitoyl-CoA)',
          abbreviation: 'Acyl-CoA',
          formula: 'C37H66N7O17P3S',
        },
      ],
      cofactorsConsumed: ['ATP'],
      cofactorsProduced: ['AMP', 'PPi'],
      deltaG: -34.0,
      isReversible: false,
      isRateLimiting: false,
      detailedDescription:
        'Fatty acid activation occurs on the outer mitochondrial membrane and is the first committed step. The reaction consumes the equivalent of 2 ATP (ATP → AMP + PPi, then PPi → 2 Pi by pyrophosphatase). The resulting fatty acyl-CoA must be transported into the mitochondrial matrix for beta-oxidation. Long-chain acyl-CoAs (C12-C20) require the carnitine shuttle for transport. Short- and medium-chain fatty acids can cross the inner membrane without the carnitine shuttle and are activated in the matrix.',
      clinicalSignificance:
        'Remember: activation costs 2 ATP equivalents (ATP → AMP + 2 Pi). This is why net ATP from palmitate oxidation is 106 - 2 = 104.',
      mcatHighYield: true,
    },

    // -- Step 2: Carnitine Shuttle (CPT-I / CPT-II) --
    {
      id: 'bo-step-2',
      stepNumber: 2,
      pathwayId: 'beta-oxidation',
      phaseName: 'Carnitine Shuttle',
      reactionName: 'Carnitine Shuttle Transport (CPT-I and CPT-II)',
      reactionType: 'transfer',
      enzyme: {
        id: 'cpt-i',
        name: 'Carnitine Palmitoyltransferase I',
        ecNumber: 'EC 2.3.1.21',
        alternateNames: ['CPT-I', 'CPT-1', 'Carnitine Acyltransferase I'],
        cofactors: ['Carnitine'],
        mechanismDescription:
          'CPT-I (on outer mitochondrial membrane) transfers the acyl group from CoA to carnitine, forming acylcarnitine. Acylcarnitine is transported across the inner membrane by carnitine-acylcarnitine translocase (CACT). CPT-II (on inner membrane matrix side) transfers the acyl group back to mitochondrial CoA, regenerating acyl-CoA in the matrix. Free carnitine returns to the intermembrane space via CACT.',
        regulation: [
          {
            regulatorName: 'Malonyl-CoA',
            regulatorType: 'allosteric-inhibitor',
            description:
              'Malonyl-CoA (from ACC during fatty acid synthesis) potently inhibits CPT-I, preventing fatty acid entry into mitochondria when synthesis is active. This is the key reciprocal regulatory mechanism.',
          },
          {
            regulatorName: 'Insulin (indirect)',
            regulatorType: 'hormonal',
            description:
              'Insulin stimulates ACC, increasing malonyl-CoA, which inhibits CPT-I. This suppresses beta-oxidation in the fed state.',
          },
          {
            regulatorName: 'Glucagon (indirect)',
            regulatorType: 'hormonal',
            description:
              'Glucagon inhibits ACC (via AMPK/PKA), decreasing malonyl-CoA, thereby relieving CPT-I inhibition and promoting beta-oxidation during fasting.',
          },
        ],
        clinicalSignificance:
          'CPT-I deficiency causes impaired long-chain fatty acid oxidation, presenting with hypoketotic hypoglycemia, hepatomegaly, and elevated free carnitine. CPT-II deficiency is the most common inherited disorder of long-chain fatty acid oxidation in adults, presenting with myalgias and rhabdomyolysis.',
      },
      substrates: [
        {
          id: 'fatty-acyl-coa-2',
          name: 'Fatty Acyl-CoA',
          abbreviation: 'Acyl-CoA',
          formula: 'C37H66N7O17P3S',
        },
        {
          id: 'carnitine',
          name: 'Carnitine',
          abbreviation: 'Carn',
          formula: 'C7H15NO3',
        },
      ],
      products: [
        {
          id: 'acylcarnitine',
          name: 'Acylcarnitine',
          abbreviation: 'Acyl-Carn',
          formula: 'C23H45NO4',
        },
      ],
      cofactorsConsumed: ['Carnitine'],
      cofactorsProduced: ['CoA'],
      deltaG: -1.5,
      isReversible: true,
      isRateLimiting: true,
      detailedDescription:
        'The carnitine shuttle is the rate-limiting step for long-chain fatty acid oxidation. CPT-I on the outer mitochondrial membrane is the regulatory enzyme. The three-component shuttle consists of: (1) CPT-I converts acyl-CoA to acylcarnitine, (2) CACT (carnitine-acylcarnitine translocase) exchanges acylcarnitine inward for free carnitine outward across the inner membrane, and (3) CPT-II on the matrix side reconverts acylcarnitine to acyl-CoA. Malonyl-CoA inhibition of CPT-I is the primary mechanism ensuring that fatty acid synthesis and oxidation do not occur simultaneously. Carnitine is synthesized from lysine and methionine (requires vitamin C) and is also obtained from dietary meat.',
      clinicalSignificance:
        'Primary carnitine deficiency: impaired fatty acid oxidation with cardiomyopathy. CPT-I deficiency: hypoketotic hypoglycemia (liver cannot make ketones). CPT-II deficiency (adult form): exercise-induced myalgias and rhabdomyolysis.',
      mcatHighYield: true,
    },

    // -- Step 3: Oxidation by FAD (Acyl-CoA Dehydrogenase) --
    {
      id: 'bo-step-3',
      stepNumber: 3,
      pathwayId: 'beta-oxidation',
      phaseName: 'Beta-Oxidation Spiral',
      reactionName: 'Oxidation by FAD (Acyl-CoA Dehydrogenase)',
      reactionType: 'oxidation',
      enzyme: {
        id: 'acyl-coa-dehydrogenase',
        name: 'Acyl-CoA Dehydrogenase',
        ecNumber: 'EC 1.3.8.7',
        alternateNames: ['VLCAD', 'LCAD', 'MCAD', 'SCAD'],
        cofactors: ['FAD'],
        mechanismDescription:
          'Oxidizes the bond between C-alpha and C-beta (C-2 and C-3) of acyl-CoA, creating a trans-delta2-enoyl-CoA. FAD is the electron acceptor, producing FADH2. The electrons from FADH2 are transferred to ETF (electron-transferring flavoprotein), then to ETF:ubiquinone oxidoreductase, and finally to ubiquinone (CoQ) in the ETC.',
        regulation: [],
        clinicalSignificance:
          'MCAD deficiency is the most common inherited disorder of fatty acid oxidation (1:10,000-15,000). Presents in infancy with hypoketotic hypoglycemia, vomiting, lethargy (often triggered by fasting or illness). Can cause sudden infant death. Detected by newborn screening (elevated octanoylcarnitine C8).',
      },
      substrates: [
        {
          id: 'acyl-coa-3',
          name: 'Acyl-CoA',
          abbreviation: 'Acyl-CoA',
          formula: 'CnH(2n-1)O-SCoA',
        },
      ],
      products: [
        {
          id: 'trans-enoyl-coa',
          name: 'trans-Delta2-Enoyl-CoA',
          abbreviation: 'Enoyl-CoA',
          formula: 'CnH(2n-3)O-SCoA',
        },
      ],
      cofactorsConsumed: ['FAD'],
      cofactorsProduced: ['FADH2'],
      deltaG: -4.5,
      isReversible: false,
      isRateLimiting: false,
      detailedDescription:
        'The first reaction of each beta-oxidation cycle introduces a trans double bond between C-2 and C-3. There are four chain-length-specific isozymes: VLCAD (very long chain, C14-C20), LCAD (long chain, C12-C16), MCAD (medium chain, C6-C12), and SCAD (short chain, C4-C6). FAD is the electron acceptor because the energy change for this oxidation is insufficient to reduce NAD+. The FADH2 electrons enter the ETC at CoQ via ETF and ETF:QO, yielding ~1.5 ATP per FADH2.',
      clinicalSignificance:
        'MCAD deficiency: most common FA oxidation disorder. Presents with hypoketotic hypoglycemia, dicarboxylic aciduria, elevated C6-C10 acylcarnitines. On newborn screening, elevated C8 (octanoylcarnitine) is diagnostic.',
      mcatHighYield: true,
    },

    // -- Step 4: Hydration (Enoyl-CoA Hydratase) --
    {
      id: 'bo-step-4',
      stepNumber: 4,
      pathwayId: 'beta-oxidation',
      phaseName: 'Beta-Oxidation Spiral',
      reactionName: 'Hydration of Enoyl-CoA',
      reactionType: 'hydration',
      enzyme: {
        id: 'enoyl-coa-hydratase',
        name: 'Enoyl-CoA Hydratase',
        ecNumber: 'EC 4.2.1.17',
        alternateNames: ['Crotonase'],
        cofactors: [],
        mechanismDescription:
          'Adds water across the trans double bond of enoyl-CoA in a stereospecific manner, producing L-3-hydroxyacyl-CoA (L-beta-hydroxyacyl-CoA). The L-stereochemistry is important and contrasts with the D-isomer produced during fatty acid synthesis.',
        regulation: [],
      },
      substrates: [
        {
          id: 'trans-enoyl-coa-4',
          name: 'trans-Delta2-Enoyl-CoA',
          abbreviation: 'Enoyl-CoA',
          formula: 'CnH(2n-3)O-SCoA',
        },
      ],
      products: [
        {
          id: 'l-hydroxyacyl-coa',
          name: 'L-3-Hydroxyacyl-CoA',
          abbreviation: 'L-3-OH-Acyl-CoA',
          formula: 'CnH(2n-1)O2-SCoA',
        },
      ],
      cofactorsConsumed: ['H2O'],
      cofactorsProduced: [],
      deltaG: -0.6,
      isReversible: true,
      isRateLimiting: false,
      detailedDescription:
        'Enoyl-CoA hydratase catalyzes the stereospecific addition of water across the trans-delta2 double bond, yielding the L-isomer of 3-hydroxyacyl-CoA. This is a near-equilibrium reaction. The L-stereochemistry is critical: beta-oxidation produces L-3-hydroxyacyl-CoA, while fatty acid synthesis produces D-3-hydroxyacyl-ACP. For unsaturated fatty acids with cis double bonds, additional auxiliary enzymes (enoyl-CoA isomerase and 2,4-dienoyl-CoA reductase) are needed to convert the cis bonds to the trans configuration for processing by the normal beta-oxidation enzymes.',
      mcatHighYield: false,
    },

    // -- Step 5: Oxidation by NAD+ (3-Hydroxyacyl-CoA Dehydrogenase) --
    {
      id: 'bo-step-5',
      stepNumber: 5,
      pathwayId: 'beta-oxidation',
      phaseName: 'Beta-Oxidation Spiral',
      reactionName: 'Oxidation by NAD+ (L-3-Hydroxyacyl-CoA Dehydrogenase)',
      reactionType: 'oxidation',
      enzyme: {
        id: 'l-3-hydroxyacyl-coa-dh',
        name: 'L-3-Hydroxyacyl-CoA Dehydrogenase',
        ecNumber: 'EC 1.1.1.35',
        alternateNames: ['HAD', 'HADH', '3-HAD'],
        cofactors: ['NAD+'],
        mechanismDescription:
          'Oxidizes the hydroxyl group at C-3 of L-3-hydroxyacyl-CoA to a keto group, forming 3-ketoacyl-CoA (beta-ketoacyl-CoA). NAD+ is the electron acceptor, producing NADH. This is the higher-energy oxidation step, capable of reducing NAD+ (unlike the first oxidation, which can only reduce FAD).',
        regulation: [
          {
            regulatorName: 'NADH/NAD+ ratio',
            regulatorType: 'product-inhibition',
            description:
              'High NADH/NAD+ ratio inhibits the enzyme, slowing beta-oxidation when the ETC is backed up or NAD+ is depleted.',
          },
        ],
        clinicalSignificance:
          'LCHAD (long-chain 3-hydroxyacyl-CoA dehydrogenase) deficiency can cause acute fatty liver of pregnancy (AFLP) when the fetus is homozygous and the mother is a carrier.',
      },
      substrates: [
        {
          id: 'l-hydroxyacyl-coa-5',
          name: 'L-3-Hydroxyacyl-CoA',
          abbreviation: 'L-3-OH-Acyl-CoA',
          formula: 'CnH(2n-1)O2-SCoA',
        },
      ],
      products: [
        {
          id: 'ketoacyl-coa',
          name: '3-Ketoacyl-CoA (Beta-Ketoacyl-CoA)',
          abbreviation: '3-Keto-Acyl-CoA',
          formula: 'CnH(2n-3)O2-SCoA',
        },
      ],
      cofactorsConsumed: ['NAD+'],
      cofactorsProduced: ['NADH'],
      deltaG: -3.2,
      isReversible: true,
      isRateLimiting: false,
      detailedDescription:
        'The second oxidation step in each cycle produces NADH (worth ~2.5 ATP in the ETC). The 3-ketoacyl-CoA product has a weakened C-C bond between C-alpha and C-beta, setting up the thiolysis in the next step. Together, the two oxidation steps per cycle (FAD-linked and NAD+-linked) produce 1 FADH2 (~1.5 ATP) and 1 NADH (~2.5 ATP), for 4 ATP per cycle from the oxidation steps alone. LCHAD is part of the mitochondrial trifunctional protein (MTP), which also contains enoyl-CoA hydratase and thiolase activities for long-chain substrates.',
      clinicalSignificance:
        'LCHAD deficiency: presents with hypoketotic hypoglycemia, cardiomyopathy, retinopathy, peripheral neuropathy. Associated with acute fatty liver of pregnancy (AFLP) and HELLP syndrome.',
      mcatHighYield: true,
    },

    // -- Step 6: Thiolysis (Thiolase / Beta-Ketothiolase) --
    {
      id: 'bo-step-6',
      stepNumber: 6,
      pathwayId: 'beta-oxidation',
      phaseName: 'Beta-Oxidation Spiral',
      reactionName: 'Thiolytic Cleavage (Thiolase)',
      reactionType: 'thiolysis',
      enzyme: {
        id: 'beta-ketothiolase',
        name: 'Beta-Ketothiolase',
        ecNumber: 'EC 2.3.1.16',
        alternateNames: ['Thiolase', 'Acetyl-CoA Acetyltransferase', '3-Ketoacyl-CoA Thiolase'],
        cofactors: ['CoA'],
        mechanismDescription:
          'Cleaves the 3-ketoacyl-CoA between C-alpha and C-beta using a free CoA molecule. This produces acetyl-CoA (C2) and a fatty acyl-CoA shortened by two carbons. The mechanism involves a cysteine nucleophile that forms a thioester intermediate with the acyl chain, followed by CoA attacking to release acetyl-CoA.',
        regulation: [
          {
            regulatorName: 'Acetyl-CoA',
            regulatorType: 'product-inhibition',
            description:
              'Accumulation of acetyl-CoA (when TCA cycle is saturated) inhibits thiolase, slowing beta-oxidation and diverting acetyl-CoA to ketogenesis.',
          },
        ],
      },
      substrates: [
        {
          id: 'ketoacyl-coa-6',
          name: '3-Ketoacyl-CoA',
          abbreviation: '3-Keto-Acyl-CoA',
          formula: 'CnH(2n-3)O2-SCoA',
        },
        {
          id: 'coa-bo6',
          name: 'Coenzyme A',
          abbreviation: 'CoA',
          formula: 'C21H36N7O16P3S',
        },
      ],
      products: [
        {
          id: 'acetyl-coa-bo6',
          name: 'Acetyl-CoA',
          abbreviation: 'Ac-CoA',
          formula: 'C23H38N7O17P3S',
        },
        {
          id: 'shortened-acyl-coa',
          name: 'Acyl-CoA (shortened by 2 carbons)',
          abbreviation: 'Cn-2 Acyl-CoA',
          formula: 'C(n-2) Acyl-CoA',
        },
      ],
      cofactorsConsumed: ['CoA'],
      cofactorsProduced: [],
      deltaG: -8.2,
      isReversible: true,
      isRateLimiting: false,
      detailedDescription:
        'Thiolysis cleaves the 3-ketoacyl-CoA, releasing one acetyl-CoA and regenerating a shortened acyl-CoA that re-enters the spiral at step 3. For palmitate (C16), the cycle repeats 7 times: cycle 1 produces C14 acyl-CoA + acetyl-CoA, cycle 2 produces C12 + acetyl-CoA, and so on until the final cycle cleaves C4 (acetoacetyl-CoA) into 2 acetyl-CoA. Total yield from palmitate: 8 acetyl-CoA + 7 FADH2 + 7 NADH. ATP yield: 8 acetyl-CoA x 10 ATP (via TCA/ETC) = 80, plus 7 FADH2 x 1.5 = 10.5, plus 7 NADH x 2.5 = 17.5, total = 108, minus 2 for activation = 106 gross or 104 net (some sources round to 106 net). For odd-chain fatty acids, the final thiolysis produces propionyl-CoA (C3) instead of acetyl-CoA, which is converted to succinyl-CoA via propionyl-CoA carboxylase (biotin) and methylmalonyl-CoA mutase (vitamin B12).',
      clinicalSignificance:
        'Odd-chain FA oxidation: propionyl-CoA → methylmalonyl-CoA (biotin, B12 required) → succinyl-CoA (TCA cycle). B12 deficiency → methylmalonic acidemia. Propionic acidemia from propionyl-CoA carboxylase deficiency.',
      mcatHighYield: true,
    },
  ],
};

import type { Pathway } from '../types';

export const fattyAcidSynthesisPathway: Pathway = {
  id: 'fatty-acid-synthesis',
  name: 'Fatty Acid Synthesis',
  description:
    'De novo synthesis of fatty acids from acetyl-CoA, occurring in the cytoplasm of liver and adipose tissue. The pathway converts citrate exported from the mitochondria into palmitate (C16) through repeated cycles of 2-carbon addition using the fatty acid synthase (FAS) complex. NADPH provides the reducing equivalents, primarily from the pentose phosphate pathway and malic enzyme.',
  location: 'Cytoplasm',
  netEquation:
    '8 Acetyl-CoA + 7 ATP + 14 NADPH + 14 H+ → Palmitate + 8 CoA + 7 ADP + 7 Pi + 14 NADP+ + 6 H2O',
  energySummary: {
    atpConsumed: 7,
    atpProduced: 0,
    nadphConsumed: 14,
    nadhProduced: 0,
    fadh2Produced: 0,
    netAtp: -7,
  },
  connections: [
    {
      targetPathwayId: 'glycolysis',
      connectionDescription:
        'Glycolysis provides pyruvate, which enters the mitochondria and is converted to acetyl-CoA, then exported as citrate for fatty acid synthesis',
      sharedMetabolite: 'Acetyl-CoA (via citrate)',
    },
    {
      targetPathwayId: 'tca-etc',
      connectionDescription:
        'Citrate is diverted from the TCA cycle and exported to the cytoplasm via the citrate shuttle to provide acetyl-CoA for fatty acid synthesis',
      sharedMetabolite: 'Citrate',
    },
    {
      targetPathwayId: 'pentose-phosphate',
      connectionDescription:
        'The pentose phosphate pathway is the major source of NADPH required for the reductive steps of fatty acid synthesis',
      sharedMetabolite: 'NADPH',
    },
    {
      targetPathwayId: 'beta-oxidation',
      connectionDescription:
        'Malonyl-CoA (from ACC) inhibits CPT-I, preventing simultaneous fatty acid synthesis and beta-oxidation',
      sharedMetabolite: 'Malonyl-CoA / Fatty acyl-CoA',
    },
    {
      targetPathwayId: 'gluconeogenesis',
      connectionDescription:
        'OAA released by citrate lyase can be recycled to pyruvate via malic enzyme, generating NADPH, or used in gluconeogenesis',
      sharedMetabolite: 'Oxaloacetate',
    },
  ],
  mcatKeyPoints: [
    'Occurs primarily in liver and adipose tissue cytoplasm during the fed state',
    'Insulin stimulates fatty acid synthesis; glucagon and epinephrine inhibit it',
    'Acetyl-CoA carboxylase (ACC) is the rate-limiting enzyme and key regulatory point',
    'ACC is activated by insulin and citrate; inhibited by glucagon, palmitoyl-CoA, and AMPK',
    'Fatty acid synthase (FAS) is a single large multifunctional polypeptide (homodimer) in mammals',
    'Malonyl-CoA (product of ACC) inhibits CPT-I, preventing simultaneous fatty acid synthesis and beta-oxidation',
    'NADPH sources: pentose phosphate pathway (major) and malic enzyme',
    'Palmitate (C16:0) is the primary product; further elongation and desaturation occur in the ER',
    'Net equation: 8 Acetyl-CoA + 7 ATP + 14 NADPH + 14 H+ → Palmitate + 8 CoA + 7 ADP + 7 Pi + 14 NADP+ + 6 H2O',
    'Citrate shuttle exports acetyl-CoA from mitochondria to cytoplasm since acetyl-CoA cannot cross the inner mitochondrial membrane directly',
  ],
  steps: [
    // -- Step 1: Citrate Shuttle --
    {
      id: 'fas-step-1',
      stepNumber: 1,
      pathwayId: 'fatty-acid-synthesis',
      phaseName: 'Acetyl-CoA Transport',
      reactionName: 'Citrate Shuttle (Citrate Lyase Reaction)',
      reactionType: 'cleavage',
      enzyme: {
        id: 'citrate-lyase',
        name: 'ATP-Citrate Lyase',
        ecNumber: 'EC 2.3.3.8',
        alternateNames: ['ACL', 'Citrate Cleavage Enzyme'],
        cofactors: ['CoA', 'ATP'],
        mechanismDescription:
          'Citrate is exported from the mitochondrial matrix to the cytoplasm via the citrate transporter (tricarboxylate carrier). In the cytoplasm, ATP-citrate lyase cleaves citrate using ATP and CoA to regenerate acetyl-CoA and oxaloacetate.',
        regulation: [
          {
            regulatorName: 'Insulin',
            regulatorType: 'hormonal',
            description:
              'Insulin upregulates ATP-citrate lyase expression and activity, promoting fatty acid synthesis in the fed state.',
          },
        ],
        clinicalSignificance:
          'ATP-citrate lyase is a pharmacological target for lowering cholesterol; bempedoic acid inhibits this enzyme.',
      },
      substrates: [
        {
          id: 'citrate',
          name: 'Citrate',
          abbreviation: 'Citrate',
          formula: 'C6H8O7',
        },
        {
          id: 'coa-fas1',
          name: 'Coenzyme A',
          abbreviation: 'CoA',
          formula: 'C21H36N7O16P3S',
        },
        {
          id: 'atp-fas1',
          name: 'ATP',
          abbreviation: 'ATP',
          formula: 'C10H16N5O13P3',
        },
      ],
      products: [
        {
          id: 'acetyl-coa-fas1',
          name: 'Acetyl-CoA',
          abbreviation: 'Acetyl-CoA',
          formula: 'C23H38N7O17P3S',
        },
        {
          id: 'oxaloacetate',
          name: 'Oxaloacetate',
          abbreviation: 'OAA',
          formula: 'C4H4O5',
        },
        {
          id: 'adp-fas1',
          name: 'ADP',
          abbreviation: 'ADP',
          formula: 'C10H15N5O10P2',
        },
        {
          id: 'pi-fas1',
          name: 'Inorganic Phosphate',
          abbreviation: 'Pi',
          formula: 'PO4^3-',
        },
      ],
      cofactorsConsumed: ['ATP', 'CoA'],
      cofactorsProduced: ['ADP', 'Pi'],
      deltaG: -3.8,
      isReversible: false,
      isRateLimiting: false,
      detailedDescription:
        'Acetyl-CoA cannot cross the inner mitochondrial membrane directly. Instead, it condenses with OAA to form citrate (via citrate synthase in the TCA cycle), which is exported to the cytoplasm via the tricarboxylate carrier. In the cytoplasm, ATP-citrate lyase regenerates acetyl-CoA and OAA. The OAA is then converted to malate (by malate dehydrogenase) and then to pyruvate (by malic enzyme, producing NADPH), or returned to the mitochondria via the malate-aspartate shuttle.',
      clinicalSignificance:
        'Bempedoic acid (Nexletol) inhibits ATP-citrate lyase and is used clinically to lower LDL cholesterol.',
      mcatHighYield: true,
    },

    // -- Step 2: Acetyl-CoA Carboxylase (Rate-Limiting) --
    {
      id: 'fas-step-2',
      stepNumber: 2,
      pathwayId: 'fatty-acid-synthesis',
      phaseName: 'Malonyl-CoA Formation',
      reactionName: 'Carboxylation of Acetyl-CoA to Malonyl-CoA',
      reactionType: 'carboxylation',
      enzyme: {
        id: 'acc',
        name: 'Acetyl-CoA Carboxylase',
        ecNumber: 'EC 6.4.1.2',
        alternateNames: ['ACC', 'ACC1'],
        cofactors: ['Biotin', 'ATP', 'HCO3-'],
        mechanismDescription:
          'A biotin-dependent carboxylase that adds a carboxyl group (from bicarbonate) to acetyl-CoA in two half-reactions: (1) biotin carboxylase domain uses ATP to carboxylate biotin, (2) transcarboxylase domain transfers the carboxyl group from carboxybiotin to acetyl-CoA, forming malonyl-CoA.',
        regulation: [
          {
            regulatorName: 'Insulin',
            regulatorType: 'hormonal',
            description:
              'Insulin activates protein phosphatase 2A (PP2A), which dephosphorylates and activates ACC. Insulin also induces ACC gene transcription via SREBP-1c.',
          },
          {
            regulatorName: 'Citrate',
            regulatorType: 'allosteric-activator',
            description:
              'Citrate promotes polymerization of ACC protomers into the active filamentous form, indicating abundant acetyl-CoA and energy.',
          },
          {
            regulatorName: 'Glucagon',
            regulatorType: 'hormonal',
            description:
              'Glucagon activates PKA, which phosphorylates and inactivates ACC, decreasing fatty acid synthesis during fasting.',
          },
          {
            regulatorName: 'Epinephrine',
            regulatorType: 'hormonal',
            description:
              'Epinephrine, like glucagon, activates PKA to phosphorylate and inactivate ACC.',
          },
          {
            regulatorName: 'Palmitoyl-CoA',
            regulatorType: 'allosteric-inhibitor',
            description:
              'The end product palmitoyl-CoA (long-chain fatty acyl-CoA) allosterically inhibits ACC, providing end-product feedback inhibition.',
          },
          {
            regulatorName: 'AMPK',
            regulatorType: 'covalent-modification',
            description:
              'AMP-activated protein kinase phosphorylates and inactivates ACC when cellular energy is low (high AMP:ATP ratio), shutting down the energy-expensive fatty acid synthesis.',
          },
        ],
        clinicalSignificance:
          'ACC is a target for anti-obesity and metabolic syndrome drug development. ACC inhibitors are in clinical trials for NASH and hepatocellular carcinoma.',
      },
      substrates: [
        {
          id: 'acetyl-coa-fas2',
          name: 'Acetyl-CoA',
          abbreviation: 'Acetyl-CoA',
          formula: 'C23H38N7O17P3S',
        },
        {
          id: 'bicarbonate',
          name: 'Bicarbonate',
          abbreviation: 'HCO3-',
          formula: 'CHO3-',
        },
        {
          id: 'atp-fas2',
          name: 'ATP',
          abbreviation: 'ATP',
          formula: 'C10H16N5O13P3',
        },
      ],
      products: [
        {
          id: 'malonyl-coa',
          name: 'Malonyl-CoA',
          abbreviation: 'Malonyl-CoA',
          formula: 'C24H38N7O19P3S',
        },
        {
          id: 'adp-fas2',
          name: 'ADP',
          abbreviation: 'ADP',
          formula: 'C10H15N5O10P2',
        },
        {
          id: 'pi-fas2',
          name: 'Inorganic Phosphate',
          abbreviation: 'Pi',
          formula: 'PO4^3-',
        },
      ],
      cofactorsConsumed: ['ATP', 'HCO3-'],
      cofactorsProduced: ['ADP', 'Pi'],
      deltaG: -35.2,
      isReversible: false,
      isRateLimiting: true,
      detailedDescription:
        'Rate-limiting step. This is the committed and rate-limiting step of fatty acid synthesis. ACC is the primary regulatory enzyme of the pathway. It exists in an inactive protomeric form and an active polymerized filamentous form. Citrate promotes polymerization (activation), while palmitoyl-CoA promotes depolymerization (inactivation). Phosphorylation by AMPK or PKA (in response to glucagon/epinephrine) inactivates ACC, while dephosphorylation by PP2A (in response to insulin) activates it. The product malonyl-CoA also inhibits CPT-I, preventing fatty acid oxidation during synthesis.',
      clinicalSignificance:
        'Malonyl-CoA inhibits CPT-I, creating a reciprocal regulation between fatty acid synthesis and oxidation. Biotin deficiency impairs this reaction.',
      mcatHighYield: true,
    },

    // -- Step 3: Loading onto ACP --
    {
      id: 'fas-step-3',
      stepNumber: 3,
      pathwayId: 'fatty-acid-synthesis',
      phaseName: 'FAS Complex — Priming',
      reactionName: 'Loading of Acetyl and Malonyl Groups onto ACP',
      reactionType: 'transfer',
      enzyme: {
        id: 'fas-mat',
        name: 'Malonyl/Acetyl-CoA-ACP Transacylase (MAT domain of FAS)',
        ecNumber: 'EC 2.3.1.39',
        alternateNames: ['MAT', 'Malonyl-CoA:ACP Transacylase'],
        cofactors: ['Phosphopantetheine (on ACP)'],
        mechanismDescription:
          'The MAT domain of FAS transfers the malonyl group from malonyl-CoA to the phosphopantetheine arm of the acyl carrier protein (ACP) domain. Acetyl-CoA is loaded onto the cysteine of the ketoacyl synthase (KS) domain. This primes the FAS complex for the condensation reaction.',
        regulation: [],
        clinicalSignificance:
          'The ACP domain uses a phosphopantetheine prosthetic group derived from vitamin B5 (pantothenate), identical to the arm of CoA.',
      },
      substrates: [
        {
          id: 'malonyl-coa-fas3',
          name: 'Malonyl-CoA',
          abbreviation: 'Malonyl-CoA',
          formula: 'C24H38N7O19P3S',
        },
        {
          id: 'acetyl-coa-fas3',
          name: 'Acetyl-CoA',
          abbreviation: 'Acetyl-CoA',
          formula: 'C23H38N7O17P3S',
        },
      ],
      products: [
        {
          id: 'malonyl-acp',
          name: 'Malonyl-ACP',
          abbreviation: 'Mal-ACP',
          formula: 'C3H3O3-ACP',
        },
        {
          id: 'acetyl-ks',
          name: 'Acetyl-KS',
          abbreviation: 'Ac-KS',
          formula: 'C2H3O-KS',
        },
      ],
      cofactorsConsumed: [],
      cofactorsProduced: ['CoA', 'CoA'],
      deltaG: -0.5,
      isReversible: true,
      isRateLimiting: false,
      detailedDescription:
        'This priming step loads the substrates onto the FAS complex. The acetyl group is transferred to the cysteine residue of the KS (beta-ketoacyl synthase) domain, and the malonyl group is transferred to the phosphopantetheine arm of the ACP domain. In subsequent cycles, the growing acyl chain replaces the acetyl group on the KS domain. The FAS complex in mammals is a homodimer, with each monomer containing all seven enzymatic activities plus the ACP domain.',
      mcatHighYield: true,
    },

    // -- Step 4: Condensation --
    {
      id: 'fas-step-4',
      stepNumber: 4,
      pathwayId: 'fatty-acid-synthesis',
      phaseName: 'FAS Complex — Elongation Cycle',
      reactionName: 'Condensation (Acetyl-KS + Malonyl-ACP → Acetoacetyl-ACP)',
      reactionType: 'condensation',
      enzyme: {
        id: 'fas-ks',
        name: 'Beta-Ketoacyl-ACP Synthase (KS domain of FAS)',
        ecNumber: 'EC 2.3.1.41',
        alternateNames: ['KS', 'Condensing Enzyme'],
        cofactors: [],
        mechanismDescription:
          'The KS domain catalyzes a decarboxylative Claisen condensation: the malonyl group on ACP loses CO2, and the resulting carbanion attacks the acetyl group on the KS cysteine, forming a beta-ketoacyl-ACP (acetoacetyl-ACP in the first cycle). The decarboxylation drives the reaction forward thermodynamically.',
        regulation: [],
      },
      substrates: [
        {
          id: 'acetyl-ks-4',
          name: 'Acetyl-KS',
          abbreviation: 'Ac-KS',
          formula: 'C2H3O-KS',
        },
        {
          id: 'malonyl-acp-4',
          name: 'Malonyl-ACP',
          abbreviation: 'Mal-ACP',
          formula: 'C3H3O3-ACP',
        },
      ],
      products: [
        {
          id: 'acetoacetyl-acp',
          name: 'Acetoacetyl-ACP (beta-Ketoacyl-ACP)',
          abbreviation: 'AcAc-ACP',
          formula: 'C4H5O2-ACP',
        },
      ],
      cofactorsConsumed: [],
      cofactorsProduced: ['CO2'],
      deltaG: -15.0,
      isReversible: false,
      isRateLimiting: false,
      detailedDescription:
        'The condensation reaction is the carbon-carbon bond-forming step. The CO2 that was added by ACC in step 2 is released here — this is why the carboxylation and decarboxylation strategy is used: the decarboxylation provides the thermodynamic driving force for the otherwise unfavorable C-C bond formation. Each cycle adds a net 2 carbons. In the first cycle, acetyl (C2) + malonyl (C3) - CO2 = acetoacetyl (C4). This cycle repeats 7 times total to build palmitate (C16).',
      clinicalSignificance:
        'The decarboxylative condensation strategy explains why bicarbonate and biotin are required (for ACC) even though no net CO2 is incorporated into the final product.',
      mcatHighYield: true,
    },

    // -- Step 5: First Reduction (NADPH) --
    {
      id: 'fas-step-5',
      stepNumber: 5,
      pathwayId: 'fatty-acid-synthesis',
      phaseName: 'FAS Complex — Elongation Cycle',
      reactionName: 'Reduction of Beta-Ketoacyl-ACP (NADPH-dependent)',
      reactionType: 'reduction',
      enzyme: {
        id: 'fas-kr',
        name: 'Beta-Ketoacyl-ACP Reductase (KR domain of FAS)',
        ecNumber: 'EC 1.1.1.100',
        alternateNames: ['KR'],
        cofactors: ['NADPH'],
        mechanismDescription:
          'The KR domain reduces the beta-keto group to a beta-hydroxy group using NADPH as the electron donor. This produces D-beta-hydroxyacyl-ACP. Note: this uses NADPH (not NADH), distinguishing anabolic from catabolic pathways.',
        regulation: [],
      },
      substrates: [
        {
          id: 'acetoacetyl-acp-5',
          name: 'Beta-Ketoacyl-ACP',
          abbreviation: 'AcAc-ACP',
          formula: 'C4H5O2-ACP',
        },
      ],
      products: [
        {
          id: 'd-hydroxyacyl-acp',
          name: 'D-Beta-Hydroxyacyl-ACP',
          abbreviation: 'D-OH-ACP',
          formula: 'C4H7O2-ACP',
        },
      ],
      cofactorsConsumed: ['NADPH'],
      cofactorsProduced: ['NADP+'],
      deltaG: -5.4,
      isReversible: false,
      isRateLimiting: false,
      detailedDescription:
        'The first reduction step converts the beta-keto group to a beta-hydroxyl group. This is one of two NADPH-consuming steps per elongation cycle (the other is step 7). The stereochemistry produces the D-isomer, in contrast to beta-oxidation which produces the L-isomer. This stereospecificity is a key distinction between synthesis and degradation. The NADPH comes primarily from the pentose phosphate pathway (especially the oxidative phase catalyzed by G6PD and 6-PGD) and from the malic enzyme reaction.',
      mcatHighYield: true,
    },

    // -- Step 6: Dehydration --
    {
      id: 'fas-step-6',
      stepNumber: 6,
      pathwayId: 'fatty-acid-synthesis',
      phaseName: 'FAS Complex — Elongation Cycle',
      reactionName: 'Dehydration of D-Beta-Hydroxyacyl-ACP',
      reactionType: 'dehydration',
      enzyme: {
        id: 'fas-dh',
        name: 'Beta-Hydroxyacyl-ACP Dehydratase (DH domain of FAS)',
        ecNumber: 'EC 4.2.1.59',
        alternateNames: ['DH'],
        cofactors: [],
        mechanismDescription:
          'The DH domain removes a water molecule from the D-beta-hydroxyacyl-ACP, creating a trans-delta2-enoyl-ACP (an alpha,beta-unsaturated thioester). This dehydration creates a carbon-carbon double bond between C-2 and C-3.',
        regulation: [],
      },
      substrates: [
        {
          id: 'd-hydroxyacyl-acp-6',
          name: 'D-Beta-Hydroxyacyl-ACP',
          abbreviation: 'D-OH-ACP',
          formula: 'C4H7O2-ACP',
        },
      ],
      products: [
        {
          id: 'trans-enoyl-acp',
          name: 'trans-Delta2-Enoyl-ACP',
          abbreviation: 'Enoyl-ACP',
          formula: 'C4H5O-ACP',
        },
      ],
      cofactorsConsumed: [],
      cofactorsProduced: ['H2O'],
      deltaG: -2.0,
      isReversible: true,
      isRateLimiting: false,
      detailedDescription:
        'The dehydration step removes water to form a trans double bond. This is the reverse of the hydration step in beta-oxidation (which adds water across the trans double bond). The trans configuration of the double bond distinguishes this intermediate from the cis double bonds found in naturally occurring unsaturated fatty acids. These reactions in synthesis mirror those in beta-oxidation but run in the reverse direction with different cofactors (NADPH vs FADH2/NADH) and different stereochemistry.',
      mcatHighYield: false,
    },

    // -- Step 7: Second Reduction (NADPH) --
    {
      id: 'fas-step-7',
      stepNumber: 7,
      pathwayId: 'fatty-acid-synthesis',
      phaseName: 'FAS Complex — Elongation Cycle',
      reactionName: 'Reduction of Enoyl-ACP (NADPH-dependent)',
      reactionType: 'reduction',
      enzyme: {
        id: 'fas-er',
        name: 'Enoyl-ACP Reductase (ER domain of FAS)',
        ecNumber: 'EC 1.3.1.10',
        alternateNames: ['ER'],
        cofactors: ['NADPH'],
        mechanismDescription:
          'The ER domain reduces the trans double bond of enoyl-ACP using NADPH, producing a fully saturated acyl-ACP that is 2 carbons longer than the starting acyl chain. The saturated product is then transferred back to the KS domain for the next cycle of elongation.',
        regulation: [],
        clinicalSignificance:
          'The bacterial enoyl-ACP reductase (FabI) is the target of the antibiotic isoniazid (used to treat tuberculosis) and triclosan (antibacterial agent).',
      },
      substrates: [
        {
          id: 'trans-enoyl-acp-7',
          name: 'trans-Delta2-Enoyl-ACP',
          abbreviation: 'Enoyl-ACP',
          formula: 'C4H5O-ACP',
        },
        {
          id: 'nadph-fas7',
          name: 'NADPH',
          abbreviation: 'NADPH',
          formula: 'C21H30N7O17P3',
        },
        {
          id: 'proton-fas7',
          name: 'Proton',
          abbreviation: 'H+',
          formula: 'H+',
        },
      ],
      products: [
        {
          id: 'butyryl-acp',
          name: 'Butyryl-ACP (Acyl-ACP)',
          abbreviation: 'Acyl-ACP',
          formula: 'C4H7O-ACP',
        },
        {
          id: 'nadp-fas7',
          name: 'NADP+',
          abbreviation: 'NADP+',
          formula: 'C21H28N7O17P3',
        },
      ],
      cofactorsConsumed: ['NADPH'],
      cofactorsProduced: ['NADP+'],
      deltaG: -6.7,
      isReversible: false,
      isRateLimiting: false,
      detailedDescription:
        'The second reduction step saturates the double bond, completing one cycle of elongation. After this step, the acyl chain (now 4 carbons in the first cycle) is transferred from the ACP back to the KS domain cysteine, and a new malonyl-CoA is loaded onto ACP for the next round. This cycle repeats 7 times total: starting from acetyl (C2), each cycle adds 2 carbons, producing C4 → C6 → C8 → C10 → C12 → C14 → C16 (palmitate). After 7 cycles, palmitoyl-ACP is released as free palmitate by the thioesterase (TE) domain of FAS. Each cycle consumes 1 malonyl-CoA (= 1 ATP at ACC) and 2 NADPH.',
      clinicalSignificance:
        'Isoniazid (anti-TB drug) inhibits the mycobacterial enoyl-ACP reductase (InhA), a homolog of the ER domain. This is a key drug target distinct from the mammalian FAS.',
      mcatHighYield: true,
    },
  ],
};

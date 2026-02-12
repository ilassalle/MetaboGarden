import type { Pathway } from '../types';

export const gluconeogenesisPathway: Pathway = {
  id: 'gluconeogenesis',
  name: 'Gluconeogenesis',
  description:
    'The synthesis of glucose from non-carbohydrate precursors (pyruvate, lactate, glycerol, glucogenic amino acids). It is essentially the reverse of glycolysis but uses four unique bypass enzymes to circumvent the three irreversible glycolytic steps. Occurs primarily in the liver (90%) and kidney cortex (10%), mainly in the cytoplasm with key steps in the mitochondria.',
  location: 'Cytoplasm + Mitochondria',
  netEquation:
    '2 Pyruvate + 4 ATP + 2 GTP + 2 NADH + 2 H+ + 4 H2O → Glucose + 4 ADP + 2 GDP + 6 Pi + 2 NAD+',
  energySummary: {
    atpConsumed: 6, // 4 ATP + 2 GTP equivalent
    atpProduced: 0,
    nadhProduced: -2, // 2 NADH consumed
    fadh2Produced: 0,
    netAtp: -6,
  },
  connections: [
    {
      targetPathwayId: 'glycolysis',
      connectionDescription:
        'Gluconeogenesis is the reverse of glycolysis with 3 bypass reactions replacing the 3 irreversible glycolytic steps. Reciprocally regulated to prevent futile cycling.',
      sharedMetabolite: 'Glucose / Pyruvate',
    },
    {
      targetPathwayId: 'tca-etc',
      connectionDescription:
        'Oxaloacetate (TCA intermediate) is a key gluconeogenic substrate. Pyruvate carboxylase converts pyruvate to OAA in the mitochondria.',
      sharedMetabolite: 'Oxaloacetate',
    },
    {
      targetPathwayId: 'glycogenesis',
      connectionDescription:
        'Newly synthesized glucose can be stored as glycogen via glycogenesis. G6P is the shared branch point.',
      sharedMetabolite: 'Glucose-6-phosphate',
    },
    {
      targetPathwayId: 'beta-oxidation',
      connectionDescription:
        'Beta-oxidation provides ATP, NADH, and acetyl-CoA to fuel gluconeogenesis. Acetyl-CoA activates pyruvate carboxylase.',
      sharedMetabolite: 'Acetyl-CoA (activator)',
    },
  ],
  mcatKeyPoints: [
    'Occurs primarily in liver (90%) and kidney cortex (10%); NOT in muscle or brain',
    'Costs 4 ATP + 2 GTP per glucose synthesized (compared to 2 ATP gained in glycolysis)',
    'Three irreversible glycolytic steps are bypassed: hexokinase/glucokinase (step 1), PFK-1 (step 3), pyruvate kinase (step 10)',
    'Bypass 1 uses two enzymes: pyruvate carboxylase (mitochondria, biotin-dependent) and PEPCK (cytoplasm, uses GTP)',
    'OAA cannot cross mitochondrial membrane directly — must be converted to malate (malate-aspartate shuttle) for transport',
    'Acetyl-CoA is an obligate allosteric activator of pyruvate carboxylase — links fatty acid oxidation to gluconeogenesis',
    'Fructose-1,6-bisphosphatase is inhibited by AMP and fructose-2,6-bisphosphate (reciprocal regulation with PFK-1)',
    'Glucose-6-phosphatase is found only in liver and kidney (ER membrane); muscle lacks it and cannot export free glucose',
    'Stimulated by glucagon and cortisol; inhibited by insulin',
    'Cori cycle: lactate from muscle → liver → gluconeogenesis → glucose → back to muscle',
    'Alanine cycle: alanine from muscle → liver → transamination to pyruvate → gluconeogenesis',
    'Ethanol metabolism increases NADH/NAD+ ratio, inhibiting gluconeogenesis and causing hypoglycemia',
  ],
  steps: [
    // ── Step 1: Pyruvate Carboxylase (Bypass 1a — Mitochondrial) ──
    {
      id: 'gluconeogenesis-step-1',
      stepNumber: 1,
      pathwayId: 'gluconeogenesis',
      phaseName: 'Bypass 1: Pyruvate → PEP (Mitochondrial Phase)',
      reactionName: 'Carboxylation of Pyruvate to Oxaloacetate',
      reactionType: 'carboxylation',
      enzyme: {
        id: 'pyruvate-carboxylase',
        name: 'Pyruvate Carboxylase',
        ecNumber: 'EC 6.4.1.1',
        alternateNames: ['PC'],
        cofactors: ['Biotin', 'Mg2+', 'Mn2+'],
        mechanismDescription:
          'A biotin-dependent carboxylase that adds CO2 to pyruvate in two half-reactions. First, biotin is carboxylated using bicarbonate (HCO3-) and ATP. Then, the carboxyl group is transferred from carboxybiotin to pyruvate, forming oxaloacetate. The reaction occurs in the mitochondrial matrix.',
        regulation: [
          {
            regulatorName: 'Acetyl-CoA',
            regulatorType: 'allosteric-activator',
            description:
              'Acetyl-CoA is an obligate allosteric activator. When fatty acid oxidation produces excess acetyl-CoA, it activates pyruvate carboxylase to channel pyruvate toward gluconeogenesis rather than the TCA cycle.',
          },
          {
            regulatorName: 'Glucagon',
            regulatorType: 'hormonal',
            description:
              'Glucagon increases pyruvate carboxylase expression in the liver and promotes conditions (increased acetyl-CoA from beta-oxidation) that activate the enzyme.',
          },
          {
            regulatorName: 'Insulin',
            regulatorType: 'hormonal',
            description:
              'Insulin suppresses pyruvate carboxylase gene expression, reducing gluconeogenic flux in the fed state.',
          },
        ],
        clinicalSignificance:
          'Pyruvate carboxylase deficiency is a rare autosomal recessive disorder causing lactic acidosis, hyperammonemia, and neurological deficits. Biotin deficiency (from raw egg white consumption — avidin binds biotin) impairs this enzyme.',
      },
      substrates: [
        { id: 'pyruvate', name: 'Pyruvate', abbreviation: 'Pyr', formula: 'C3H4O3' },
        { id: 'co2-bicarb', name: 'Bicarbonate', abbreviation: 'HCO3-', formula: 'HCO3-' },
      ],
      products: [
        { id: 'oxaloacetate', name: 'Oxaloacetate', abbreviation: 'OAA', formula: 'C4H4O5' },
      ],
      cofactorsConsumed: ['ATP', 'Biotin-CO2'],
      cofactorsProduced: ['ADP', 'Pi'],
      deltaG: -2.1,
      isReversible: false,
      isRateLimiting: true,
      detailedDescription:
        'This is the first step of bypass 1, occurring in the mitochondrial matrix. Pyruvate carboxylase is a biotin-dependent enzyme that converts pyruvate to oxaloacetate using ATP and CO2 (as bicarbonate). Acetyl-CoA is an obligate allosteric activator — without it, the enzyme is essentially inactive. This elegantly links fatty acid oxidation to gluconeogenesis: when beta-oxidation floods the mitochondria with acetyl-CoA, pyruvate is directed toward OAA (gluconeogenesis) rather than acetyl-CoA (TCA entry). OAA cannot directly cross the inner mitochondrial membrane, so it must be converted to malate or aspartate for transport to the cytoplasm.',
      clinicalSignificance:
        'Pyruvate carboxylase deficiency: lactic acidosis, hyperammonemia, developmental delay. Biotin deficiency impairs all biotin-dependent carboxylases (pyruvate carboxylase, acetyl-CoA carboxylase, propionyl-CoA carboxylase).',
      mcatHighYield: true,
    },

    // ── Step 2: Malate Shuttle (OAA Transport) ──
    {
      id: 'gluconeogenesis-step-2',
      stepNumber: 2,
      pathwayId: 'gluconeogenesis',
      phaseName: 'Bypass 1: Pyruvate → PEP (Mitochondrial Transport)',
      reactionName: 'OAA → Malate (Mitochondrial) → OAA (Cytoplasmic)',
      reactionType: 'reduction',
      enzyme: {
        id: 'malate-dehydrogenase-mito',
        name: 'Malate Dehydrogenase (Mitochondrial + Cytoplasmic)',
        ecNumber: 'EC 1.1.1.37',
        alternateNames: ['MDH'],
        cofactors: ['NADH (mitochondrial)', 'NAD+ (cytoplasmic)'],
        mechanismDescription:
          'In the mitochondria, OAA is reduced to malate by mitochondrial malate dehydrogenase (using NADH). Malate crosses the inner mitochondrial membrane via the malate-alpha-ketoglutarate antiporter. In the cytoplasm, malate is re-oxidized to OAA by cytoplasmic malate dehydrogenase (producing NADH). This shuttle effectively transfers both the carbon skeleton and reducing equivalents to the cytoplasm.',
        regulation: [],
        clinicalSignificance:
          'This shuttle is essential because OAA cannot cross the mitochondrial membrane. It also provides cytoplasmic NADH needed for the GAPDH reverse reaction (step 5 of gluconeogenesis).',
      },
      substrates: [
        { id: 'oxaloacetate-mito', name: 'Oxaloacetate (mitochondrial)', abbreviation: 'OAA', formula: 'C4H4O5' },
      ],
      products: [
        { id: 'oxaloacetate-cyto', name: 'Oxaloacetate (cytoplasmic)', abbreviation: 'OAA', formula: 'C4H4O5' },
      ],
      cofactorsConsumed: ['NADH (mitochondrial)'],
      cofactorsProduced: ['NADH (cytoplasmic)'],
      deltaG: 0,
      isReversible: true,
      isRateLimiting: false,
      detailedDescription:
        'OAA produced by pyruvate carboxylase cannot directly cross the inner mitochondrial membrane. Instead, mitochondrial malate dehydrogenase reduces OAA to malate using NADH. Malate exits via the malate-alpha-ketoglutarate antiporter. In the cytoplasm, cytoplasmic malate dehydrogenase re-oxidizes malate to OAA, regenerating NADH. This is critical because cytoplasmic NADH is needed later in gluconeogenesis (for the reverse GAPDH reaction). An alternative route uses transamination: OAA → aspartate (via aspartate aminotransferase), which crosses the membrane and is reconverted to OAA in the cytoplasm.',
      mcatHighYield: true,
    },

    // ── Step 3: PEPCK (Bypass 1b — Cytoplasmic) ──
    {
      id: 'gluconeogenesis-step-3',
      stepNumber: 3,
      pathwayId: 'gluconeogenesis',
      phaseName: 'Bypass 1: Pyruvate → PEP (Cytoplasmic Phase)',
      reactionName: 'Decarboxylation and Phosphorylation of OAA to PEP',
      reactionType: 'decarboxylation',
      enzyme: {
        id: 'pepck',
        name: 'Phosphoenolpyruvate Carboxykinase',
        ecNumber: 'EC 4.1.1.32',
        alternateNames: ['PEPCK', 'PCK1 (cytoplasmic)', 'PCK2 (mitochondrial)'],
        cofactors: ['GTP', 'Mn2+'],
        mechanismDescription:
          'Decarboxylates and phosphorylates OAA in a single step, using GTP as the phosphoryl donor. CO2 is released, and the phosphoenol group is formed. In humans, the cytoplasmic isoform (PEPCK-C / PCK1) is the predominant form involved in gluconeogenesis.',
        regulation: [
          {
            regulatorName: 'Glucagon / cAMP',
            regulatorType: 'hormonal',
            description:
              'Glucagon activates PEPCK transcription via cAMP response element (CRE). PEPCK is primarily regulated at the transcriptional level — its mRNA levels change dramatically with hormonal status.',
          },
          {
            regulatorName: 'Cortisol',
            regulatorType: 'hormonal',
            description:
              'Cortisol induces PEPCK gene expression via glucocorticoid response elements (GRE), promoting gluconeogenesis during stress and fasting.',
          },
          {
            regulatorName: 'Insulin',
            regulatorType: 'hormonal',
            description:
              'Insulin represses PEPCK gene transcription, shutting down gluconeogenesis in the fed state.',
          },
        ],
        clinicalSignificance:
          'PEPCK is a key target for diabetes therapy. In type 2 diabetes, PEPCK expression is inappropriately elevated, contributing to hepatic glucose overproduction. Metformin indirectly reduces PEPCK activity.',
      },
      substrates: [
        { id: 'oxaloacetate', name: 'Oxaloacetate', abbreviation: 'OAA', formula: 'C4H4O5' },
      ],
      products: [
        { id: 'pep', name: 'Phosphoenolpyruvate', abbreviation: 'PEP', formula: 'C3H5O6P' },
        { id: 'co2', name: 'Carbon dioxide', abbreviation: 'CO2', formula: 'CO2' },
      ],
      cofactorsConsumed: ['GTP'],
      cofactorsProduced: ['GDP', 'CO2'],
      deltaG: 0.9,
      isReversible: false,
      isRateLimiting: false,
      detailedDescription:
        'PEPCK catalyzes the second part of bypass 1, converting OAA to PEP with the release of CO2 and the expenditure of GTP. Together with pyruvate carboxylase, this bypass costs 1 ATP + 1 GTP per pyruvate (vs. 1 ATP generated by pyruvate kinase in glycolysis). PEPCK is predominantly regulated at the transcriptional level: glucagon and cortisol induce its gene, while insulin represses it. The CO2 added by pyruvate carboxylase is removed here — this "CO2 trick" facilitates the decarboxylation by making it thermodynamically favorable.',
      clinicalSignificance:
        'Overexpression of PEPCK contributes to hyperglycemia in type 2 diabetes. PEPCK is a major target of insulin signaling in the liver.',
      mcatHighYield: true,
    },

    // ── Steps 4-8: Reversible Glycolytic Steps Running in Reverse ──
    // PEP → 2-PG (reverse of glycolysis step 9: enolase)
    {
      id: 'gluconeogenesis-step-4',
      stepNumber: 4,
      pathwayId: 'gluconeogenesis',
      phaseName: 'Shared Reversible Steps (Glycolysis in Reverse)',
      reactionName: 'Hydration of PEP to 2-PG',
      reactionType: 'hydration',
      enzyme: {
        id: 'enolase-gng',
        name: 'Enolase',
        ecNumber: 'EC 4.2.1.11',
        cofactors: ['2 Mg2+'],
        mechanismDescription:
          'Catalyzes the reverse reaction: adds water across the double bond of PEP to form 2-phosphoglycerate. This is the reverse of the dehydration in glycolysis step 9.',
        regulation: [
          {
            regulatorName: 'Fluoride (F-)',
            regulatorType: 'allosteric-inhibitor',
            description: 'Fluoride inhibits enolase by chelating Mg2+, affecting both glycolysis and gluconeogenesis.',
          },
        ],
      },
      substrates: [
        { id: 'pep', name: 'Phosphoenolpyruvate', abbreviation: 'PEP', formula: 'C3H5O6P' },
      ],
      products: [
        { id: '2-pg', name: '2-Phosphoglycerate', abbreviation: '2-PG', formula: 'C3H7O7P' },
      ],
      cofactorsConsumed: ['H2O'],
      cofactorsProduced: [],
      deltaG: 3.2,
      isReversible: true,
      isRateLimiting: false,
      detailedDescription:
        'The reverse of glycolysis step 9. Enolase adds water to PEP to form 2-PG. The same enzyme is used in both directions; the directionality is determined by substrate/product concentrations.',
      mcatHighYield: false,
    },

    // 2-PG → 3-PG (reverse of glycolysis step 8: phosphoglycerate mutase)
    {
      id: 'gluconeogenesis-step-5',
      stepNumber: 5,
      pathwayId: 'gluconeogenesis',
      phaseName: 'Shared Reversible Steps (Glycolysis in Reverse)',
      reactionName: 'Isomerization of 2-PG to 3-PG',
      reactionType: 'mutase',
      enzyme: {
        id: 'phosphoglycerate-mutase-gng',
        name: 'Phosphoglycerate Mutase',
        ecNumber: 'EC 5.4.2.11',
        alternateNames: ['PGM'],
        cofactors: [],
        mechanismDescription:
          'Transfers the phosphate group from C-2 to C-3 via a 2,3-bisphosphoglycerate intermediate, the reverse of glycolysis step 8.',
        regulation: [],
      },
      substrates: [
        { id: '2-pg', name: '2-Phosphoglycerate', abbreviation: '2-PG', formula: 'C3H7O7P' },
      ],
      products: [
        { id: '3-pg', name: '3-Phosphoglycerate', abbreviation: '3-PG', formula: 'C3H7O7P' },
      ],
      cofactorsConsumed: [],
      cofactorsProduced: [],
      deltaG: -4.4,
      isReversible: true,
      isRateLimiting: false,
      detailedDescription:
        'The reverse of glycolysis step 8. Phosphoglycerate mutase shifts the phosphate from C-2 to C-3. This near-equilibrium reaction proceeds in the gluconeogenic direction when 3-PG is consumed by the subsequent step.',
      mcatHighYield: false,
    },

    // 3-PG → 1,3-BPG (reverse of glycolysis step 7: phosphoglycerate kinase)
    {
      id: 'gluconeogenesis-step-6',
      stepNumber: 6,
      pathwayId: 'gluconeogenesis',
      phaseName: 'Shared Reversible Steps (Glycolysis in Reverse)',
      reactionName: 'Phosphorylation of 3-PG to 1,3-BPG',
      reactionType: 'phosphorylation',
      enzyme: {
        id: 'phosphoglycerate-kinase-gng',
        name: 'Phosphoglycerate Kinase',
        ecNumber: 'EC 2.7.2.3',
        alternateNames: ['PGK'],
        cofactors: ['Mg2+'],
        mechanismDescription:
          'In the gluconeogenic direction, transfers a phosphate from ATP to 3-PG, forming 1,3-BPG. This is the reverse of the substrate-level phosphorylation in glycolysis step 7 and consumes ATP.',
        regulation: [],
      },
      substrates: [
        { id: '3-pg', name: '3-Phosphoglycerate', abbreviation: '3-PG', formula: 'C3H7O7P' },
      ],
      products: [
        { id: '1-3-bpg', name: '1,3-Bisphosphoglycerate', abbreviation: '1,3-BPG', formula: 'C3H8O10P2' },
      ],
      cofactorsConsumed: ['ATP'],
      cofactorsProduced: ['ADP'],
      deltaG: 18.5,
      isReversible: true,
      isRateLimiting: false,
      detailedDescription:
        'The reverse of glycolysis step 7. In gluconeogenesis, ATP is consumed to phosphorylate 3-PG to 1,3-BPG. This is one of the ATP costs of gluconeogenesis (2 ATP total at this step, one per triose). Combined with the ATP and GTP consumed in bypass 1, the total energy cost reflects why gluconeogenesis is expensive.',
      mcatHighYield: false,
    },

    // 1,3-BPG → G3P (reverse of glycolysis step 6: GAPDH)
    {
      id: 'gluconeogenesis-step-7',
      stepNumber: 7,
      pathwayId: 'gluconeogenesis',
      phaseName: 'Shared Reversible Steps (Glycolysis in Reverse)',
      reactionName: 'Reduction of 1,3-BPG to G3P',
      reactionType: 'reduction',
      enzyme: {
        id: 'gapdh-gng',
        name: 'Glyceraldehyde-3-phosphate Dehydrogenase',
        ecNumber: 'EC 1.2.1.12',
        alternateNames: ['GAPDH'],
        cofactors: ['NADH'],
        mechanismDescription:
          'In the gluconeogenic direction, GAPDH reduces 1,3-BPG to G3P using NADH. This consumes the NADH that was generated by the malate shuttle (from OAA → malate → OAA transport).',
        regulation: [],
      },
      substrates: [
        { id: '1-3-bpg', name: '1,3-Bisphosphoglycerate', abbreviation: '1,3-BPG', formula: 'C3H8O10P2' },
      ],
      products: [
        { id: 'g3p', name: 'Glyceraldehyde-3-phosphate', abbreviation: 'G3P', formula: 'C3H7O6P' },
      ],
      cofactorsConsumed: ['NADH'],
      cofactorsProduced: ['NAD+', 'Pi'],
      deltaG: -6.3,
      isReversible: true,
      isRateLimiting: false,
      detailedDescription:
        'The reverse of glycolysis step 6. GAPDH uses NADH to reduce 1,3-BPG to G3P, releasing Pi. The NADH required here is supplied by the malate shuttle (mitochondrial OAA → malate transport → cytoplasmic malate → OAA). This step explains why the malate shuttle is essential: it provides reducing equivalents in the cytoplasm. Ethanol metabolism raises cytoplasmic NADH/NAD+ ratio via alcohol dehydrogenase, which can paradoxically inhibit gluconeogenesis by diverting OAA to malate.',
      clinicalSignificance:
        'Ethanol-induced hypoglycemia: alcohol dehydrogenase and aldehyde dehydrogenase generate excess NADH, shifting OAA → malate equilibrium and depleting the OAA pool needed for gluconeogenesis.',
      mcatHighYield: true,
    },

    // G3P ↔ DHAP and recombination (reverse of glycolysis steps 4+5: TPI + aldolase)
    {
      id: 'gluconeogenesis-step-8',
      stepNumber: 8,
      pathwayId: 'gluconeogenesis',
      phaseName: 'Shared Reversible Steps (Glycolysis in Reverse)',
      reactionName: 'Condensation of G3P + DHAP to F-1,6-BP',
      reactionType: 'condensation',
      enzyme: {
        id: 'aldolase-gng',
        name: 'Aldolase (+ Triose Phosphate Isomerase)',
        ecNumber: 'EC 4.1.2.13',
        alternateNames: ['Aldolase', 'TPI'],
        cofactors: [],
        mechanismDescription:
          'Triose phosphate isomerase first converts one G3P to DHAP. Then aldolase catalyzes the aldol condensation of G3P and DHAP to form fructose-1,6-bisphosphate. This is the reverse of the aldol cleavage in glycolysis step 4.',
        regulation: [],
      },
      substrates: [
        { id: 'g3p', name: 'Glyceraldehyde-3-phosphate', abbreviation: 'G3P', formula: 'C3H7O6P' },
        { id: 'dhap', name: 'Dihydroxyacetone phosphate', abbreviation: 'DHAP', formula: 'C3H7O6P' },
      ],
      products: [
        { id: 'fructose-1-6-bisphosphate', name: 'Fructose-1,6-bisphosphate', abbreviation: 'F-1,6-BP', formula: 'C6H14O12P2' },
      ],
      cofactorsConsumed: [],
      cofactorsProduced: [],
      deltaG: -23.8,
      isReversible: true,
      isRateLimiting: false,
      detailedDescription:
        'The reverse of glycolysis steps 4 and 5 combined. TPI interconverts G3P and DHAP, and aldolase condenses them into F-1,6-BP. In the gluconeogenic direction, the equilibrium strongly favors condensation (the forward aldol cleavage has a large positive delta-G). Two triose phosphate molecules recombine to regenerate the six-carbon sugar bisphosphate.',
      mcatHighYield: false,
    },

    // ── Step 9: Fructose-1,6-Bisphosphatase (Bypass 2) ──
    {
      id: 'gluconeogenesis-step-9',
      stepNumber: 9,
      pathwayId: 'gluconeogenesis',
      phaseName: 'Bypass 2: F-1,6-BP → F-6-P',
      reactionName: 'Hydrolysis of F-1,6-BP to F-6-P',
      reactionType: 'hydrolysis',
      enzyme: {
        id: 'fructose-1-6-bisphosphatase',
        name: 'Fructose-1,6-bisphosphatase',
        ecNumber: 'EC 3.1.3.11',
        alternateNames: ['FBPase-1'],
        cofactors: ['Mg2+'],
        mechanismDescription:
          'Hydrolyzes the phosphate ester bond at the C-1 position of fructose-1,6-bisphosphate, releasing inorganic phosphate and producing fructose-6-phosphate. This bypass circumvents the irreversible PFK-1 reaction of glycolysis.',
        regulation: [
          {
            regulatorName: 'AMP',
            regulatorType: 'allosteric-inhibitor',
            description:
              'AMP inhibits FBPase-1, preventing gluconeogenesis when cellular energy is low (reciprocal regulation with PFK-1, which is activated by AMP).',
          },
          {
            regulatorName: 'Fructose-2,6-bisphosphate',
            regulatorType: 'allosteric-inhibitor',
            description:
              'F-2,6-BP is a potent inhibitor of FBPase-1 (and activator of PFK-1). In the fed state, insulin increases F-2,6-BP, inhibiting gluconeogenesis. In fasting, glucagon decreases F-2,6-BP, relieving FBPase-1 inhibition.',
          },
          {
            regulatorName: 'Citrate',
            regulatorType: 'allosteric-activator',
            description:
              'Citrate activates FBPase-1, promoting gluconeogenesis when TCA intermediates are abundant (reciprocal: citrate inhibits PFK-1).',
          },
          {
            regulatorName: 'Glucagon (indirect)',
            regulatorType: 'hormonal',
            description:
              'Glucagon → cAMP → PKA phosphorylates PFK-2/FBPase-2, activating the phosphatase domain. This lowers F-2,6-BP, relieving FBPase-1 inhibition and slowing PFK-1, favoring gluconeogenesis.',
            tissueSpecific: 'Liver',
          },
          {
            regulatorName: 'Insulin (indirect)',
            regulatorType: 'hormonal',
            description:
              'Insulin dephosphorylates PFK-2/FBPase-2, activating the kinase domain. This raises F-2,6-BP, inhibiting FBPase-1 and activating PFK-1, favoring glycolysis.',
          },
        ],
        clinicalSignificance:
          'FBPase-1 deficiency causes fasting hypoglycemia and lactic acidosis due to impaired gluconeogenesis. It is a rare autosomal recessive disorder.',
      },
      substrates: [
        { id: 'fructose-1-6-bisphosphate', name: 'Fructose-1,6-bisphosphate', abbreviation: 'F-1,6-BP', formula: 'C6H14O12P2' },
      ],
      products: [
        { id: 'fructose-6-phosphate', name: 'Fructose-6-phosphate', abbreviation: 'F6P', formula: 'C6H13O9P' },
      ],
      cofactorsConsumed: ['H2O'],
      cofactorsProduced: ['Pi'],
      deltaG: -8.6,
      isReversible: false,
      isRateLimiting: true,
      detailedDescription:
        'This bypass reaction is the major regulatory point of gluconeogenesis. FBPase-1 removes the C-1 phosphate from F-1,6-BP by hydrolysis (not by transferring it to ADP — the energy is lost as heat). The reciprocal regulation with PFK-1 through F-2,6-BP is the single most important mechanism preventing futile cycling between glycolysis and gluconeogenesis. The bifunctional enzyme PFK-2/FBPase-2 controls F-2,6-BP levels and is the key target of insulin/glucagon signaling in the liver.',
      clinicalSignificance:
        'FBPase-1 deficiency: fasting hypoglycemia, lactic acidosis, hepatomegaly. Patients must avoid prolonged fasting.',
      mcatHighYield: true,
    },

    // F-6-P → G-6-P (reverse of glycolysis step 2: phosphoglucose isomerase)
    {
      id: 'gluconeogenesis-step-10',
      stepNumber: 10,
      pathwayId: 'gluconeogenesis',
      phaseName: 'Shared Reversible Steps (Glycolysis in Reverse)',
      reactionName: 'Isomerization of F-6-P to G-6-P',
      reactionType: 'isomerization',
      enzyme: {
        id: 'phosphoglucose-isomerase-gng',
        name: 'Phosphoglucose Isomerase',
        ecNumber: 'EC 5.3.1.9',
        alternateNames: ['PGI'],
        cofactors: [],
        mechanismDescription:
          'Converts fructose-6-phosphate (ketose) back to glucose-6-phosphate (aldose). This is the reverse of glycolysis step 2.',
        regulation: [],
      },
      substrates: [
        { id: 'fructose-6-phosphate', name: 'Fructose-6-phosphate', abbreviation: 'F6P', formula: 'C6H13O9P' },
      ],
      products: [
        { id: 'glucose-6-phosphate', name: 'Glucose-6-phosphate', abbreviation: 'G6P', formula: 'C6H13O9P' },
      ],
      cofactorsConsumed: [],
      cofactorsProduced: [],
      deltaG: -2.2,
      isReversible: true,
      isRateLimiting: false,
      detailedDescription:
        'The reverse of glycolysis step 2. This near-equilibrium reaction converts the ketose (F6P) back to the aldose (G6P). The reaction proceeds toward G6P in gluconeogenesis because G6P is continuously removed by glucose-6-phosphatase in the next step.',
      mcatHighYield: false,
    },

    // ── Step 11: Glucose-6-Phosphatase (Bypass 3) ──
    {
      id: 'gluconeogenesis-step-11',
      stepNumber: 11,
      pathwayId: 'gluconeogenesis',
      phaseName: 'Bypass 3: G-6-P → Glucose',
      reactionName: 'Hydrolysis of G-6-P to Glucose',
      reactionType: 'hydrolysis',
      enzyme: {
        id: 'glucose-6-phosphatase',
        name: 'Glucose-6-phosphatase',
        ecNumber: 'EC 3.1.3.9',
        alternateNames: ['G6Pase'],
        cofactors: [],
        mechanismDescription:
          'Hydrolyzes the phosphate ester bond of glucose-6-phosphate, releasing free glucose and inorganic phosphate. The enzyme is embedded in the endoplasmic reticulum (ER) membrane, with its active site facing the ER lumen. G6P is transported into the ER by a specific translocase (T1), and free glucose and Pi are transported back to the cytoplasm.',
        regulation: [
          {
            regulatorName: 'Substrate availability',
            regulatorType: 'allosteric-activator',
            description:
              'G6Pase activity is largely regulated by substrate (G6P) availability. Increased gluconeogenic flux or glycogenolysis raises G6P levels, driving glucose release.',
          },
          {
            regulatorName: 'Cortisol',
            regulatorType: 'hormonal',
            description:
              'Cortisol induces glucose-6-phosphatase gene expression, enhancing gluconeogenic capacity.',
          },
          {
            regulatorName: 'Insulin',
            regulatorType: 'hormonal',
            description:
              'Insulin represses glucose-6-phosphatase gene expression, reducing hepatic glucose output in the fed state.',
          },
        ],
        tissueVariants: [
          {
            tissue: 'Liver',
            isoformName: 'G6Pase-alpha (G6PC1)',
            differenceDescription:
              'Primary isoform responsible for hepatic glucose production. Deficiency causes von Gierke disease (GSD type Ia).',
          },
          {
            tissue: 'Kidney',
            isoformName: 'G6Pase-alpha',
            differenceDescription:
              'Kidney cortex also expresses G6Pase and contributes ~10% of gluconeogenesis during prolonged fasting.',
          },
        ],
        clinicalSignificance:
          'Glucose-6-phosphatase deficiency causes von Gierke disease (GSD type Ia): severe fasting hypoglycemia, hepatomegaly, lactic acidosis, hyperuricemia, hyperlipidemia. G6P translocase deficiency causes GSD type Ib (similar symptoms + neutropenia).',
      },
      substrates: [
        { id: 'glucose-6-phosphate', name: 'Glucose-6-phosphate', abbreviation: 'G6P', formula: 'C6H13O9P' },
      ],
      products: [
        { id: 'glucose', name: 'Glucose', abbreviation: 'Glc', formula: 'C6H12O6' },
      ],
      cofactorsConsumed: ['H2O'],
      cofactorsProduced: ['Pi'],
      deltaG: -13.8,
      isReversible: false,
      isRateLimiting: false,
      detailedDescription:
        'The final bypass reaction of gluconeogenesis releases free glucose from G6P. This enzyme is located in the ER membrane (not the cytoplasm), and its active site faces the ER lumen. G6P must be transported into the ER by a translocase (T1), and free glucose exits via GLUT7. Critically, glucose-6-phosphatase is found ONLY in liver and kidney — muscle and brain lack this enzyme, which is why they cannot release free glucose into the blood. This is the reason muscle glycogen cannot contribute to blood glucose maintenance.',
      clinicalSignificance:
        'Von Gierke disease (GSD Ia): G6Pase deficiency → severe fasting hypoglycemia, massive hepatomegaly (glycogen and fat accumulation), lactic acidosis, hyperuricemia (gout), hyperlipidemia. Patients require frequent feeding or continuous cornstarch administration.',
      mcatHighYield: true,
    },
  ],
};

import type { Pathway } from '../types';

export const glycogenesisPathway: Pathway = {
  id: 'glycogenesis',
  name: 'Glycogenesis',
  description:
    'The synthesis of glycogen from glucose. Glycogen is a branched polymer of glucose residues linked by alpha-1,4-glycosidic bonds (linear chains) and alpha-1,6-glycosidic bonds (branch points every 8-12 residues). Glycogen is stored primarily in liver (maintaining blood glucose) and skeletal muscle (local fuel for contraction). The process requires UTP activation of glucose and is stimulated by insulin in the fed state.',
  location: 'Cytoplasm',
  netEquation:
    'n Glucose + n ATP + n UTP + Glycogen primer → Glycogen(n) + n ADP + n UDP + n PPi + n Pi',
  energySummary: {
    atpConsumed: 2, // 1 ATP (hexokinase) + 1 UTP (UDP-glucose pyrophosphorylase) per glucose added
    atpProduced: 0,
    nadhProduced: 0,
    fadh2Produced: 0,
    netAtp: -2,
  },
  connections: [
    {
      targetPathwayId: 'glycolysis',
      connectionDescription:
        'Glucose-6-phosphate is the branch point: it can enter glycolysis for energy or be directed toward glycogen synthesis.',
      sharedMetabolite: 'Glucose-6-phosphate',
    },
    {
      targetPathwayId: 'gluconeogenesis',
      connectionDescription:
        'Newly synthesized glucose from gluconeogenesis can be stored as glycogen. In liver, gluconeogenic flux often replenishes glycogen stores.',
      sharedMetabolite: 'Glucose-6-phosphate',
    },
    {
      targetPathwayId: 'glycogenolysis',
      connectionDescription:
        'Glycogenesis and glycogenolysis are reciprocally regulated. Insulin stimulates synthesis while glucagon/epinephrine stimulate breakdown. They do not operate simultaneously.',
      sharedMetabolite: 'Glycogen',
    },
    {
      targetPathwayId: 'pentose-phosphate',
      connectionDescription:
        'G6P can be diverted to the pentose phosphate pathway for NADPH production instead of glycogen synthesis.',
      sharedMetabolite: 'Glucose-6-phosphate',
    },
  ],
  mcatKeyPoints: [
    'Glycogen synthase is the rate-limiting enzyme and is regulated by covalent modification (phosphorylation/dephosphorylation) and allosteric effectors',
    'Insulin stimulates glycogenesis by activating protein phosphatase 1 (PP1), which dephosphorylates and activates glycogen synthase',
    'Glucagon (liver) and epinephrine (liver + muscle) inhibit glycogenesis by activating PKA, which phosphorylates and inactivates glycogen synthase',
    'Glucose-6-phosphate allosterically activates glycogen synthase (even the phosphorylated form), promoting storage when glucose is abundant',
    'UDP-glucose is the activated form of glucose used for glycogen synthesis — UTP is the energy currency, not ATP, for this activation step',
    'Glycogenin is the primer protein required to initiate new glycogen granules (self-glucosylates to create a short chain that glycogen synthase can extend)',
    'Branching enzyme creates alpha-1,6 linkages every 8-12 residues, increasing solubility and the number of terminal residues for rapid mobilization',
    'Liver glycogen (100-120g) maintains blood glucose during fasting; muscle glycogen (300-400g) fuels local contraction',
    'Glycogen storage diseases (GSDs) result from defects in glycogen synthesis or degradation enzymes',
    'Cost: 2 high-energy phosphate bonds per glucose incorporated (1 ATP at hexokinase + 1 UTP at UDP-glucose pyrophosphorylase)',
  ],
  steps: [
    // ── Step 1: Hexokinase / Glucokinase ──
    {
      id: 'glycogenesis-step-1',
      stepNumber: 1,
      pathwayId: 'glycogenesis',
      phaseName: 'Glucose Activation',
      reactionName: 'Phosphorylation of Glucose to G6P',
      reactionType: 'phosphorylation',
      enzyme: {
        id: 'hexokinase-glycogenesis',
        name: 'Hexokinase / Glucokinase',
        ecNumber: 'EC 2.7.1.1',
        alternateNames: ['HK (muscle)', 'GK / HK IV (liver)'],
        cofactors: ['Mg2+'],
        mechanismDescription:
          'Phosphorylates glucose at the C-6 position using ATP, trapping it inside the cell as glucose-6-phosphate. In liver, glucokinase (high Km ~10 mM) only phosphorylates glucose when blood glucose is elevated, acting as a glucose sensor.',
        regulation: [
          {
            regulatorName: 'Glucose-6-phosphate',
            regulatorType: 'product-inhibition',
            description:
              'G6P inhibits hexokinase (not glucokinase), preventing excessive phosphorylation when downstream pathways are saturated.',
          },
          {
            regulatorName: 'Insulin',
            regulatorType: 'hormonal',
            description:
              'Insulin induces glucokinase expression in the liver and promotes GLUT4 translocation in muscle, increasing glucose uptake and phosphorylation.',
            tissueSpecific: 'Liver and Muscle',
          },
          {
            regulatorName: 'Glucokinase regulatory protein (GKRP)',
            regulatorType: 'allosteric-inhibitor',
            description:
              'GKRP sequesters glucokinase in the nucleus when blood glucose is low. High glucose and fructose-1-phosphate release GK from GKRP, allowing it to phosphorylate glucose.',
            tissueSpecific: 'Liver',
          },
        ],
        tissueVariants: [
          {
            tissue: 'Liver',
            isoformName: 'Glucokinase (HK IV)',
            differenceDescription:
              'High Km (~10 mM), not saturated at physiological glucose levels. Not inhibited by G6P. Acts as a glucose sensor — active only when blood glucose is high.',
            kmValue: '~10 mM',
          },
          {
            tissue: 'Muscle',
            isoformName: 'Hexokinase I/II',
            differenceDescription:
              'Low Km (~0.1 mM), saturated at normal glucose levels. Inhibited by G6P.',
            kmValue: '~0.1 mM',
          },
        ],
        clinicalSignificance:
          'Glucokinase mutations cause MODY type 2 (maturity-onset diabetes of the young). Glucokinase activators are therapeutic targets for type 2 diabetes.',
      },
      substrates: [
        { id: 'glucose', name: 'Glucose', abbreviation: 'Glc', formula: 'C6H12O6' },
      ],
      products: [
        { id: 'glucose-6-phosphate', name: 'Glucose-6-phosphate', abbreviation: 'G6P', formula: 'C6H13O9P' },
      ],
      cofactorsConsumed: ['ATP'],
      cofactorsProduced: ['ADP'],
      deltaG: -33.4,
      isReversible: false,
      isRateLimiting: false,
      detailedDescription:
        'The first step in glycogen synthesis is identical to glycolysis step 1: glucose is phosphorylated to G6P. This traps glucose inside the cell. In liver, glucokinase (HK IV) has a high Km and is not inhibited by its product, allowing the liver to continue phosphorylating glucose when blood levels are high — directing excess glucose toward glycogen storage. In muscle, hexokinase I/II has a low Km and is inhibited by G6P.',
      clinicalSignificance:
        'MODY type 2: glucokinase mutations impair the glucose-sensing function, leading to mild fasting hyperglycemia.',
      mcatHighYield: true,
    },

    // ── Step 2: Phosphoglucomutase ──
    {
      id: 'glycogenesis-step-2',
      stepNumber: 2,
      pathwayId: 'glycogenesis',
      phaseName: 'Glucose Activation',
      reactionName: 'Isomerization of G6P to G1P',
      reactionType: 'mutase',
      enzyme: {
        id: 'phosphoglucomutase',
        name: 'Phosphoglucomutase',
        ecNumber: 'EC 5.4.2.2',
        alternateNames: ['PGM1'],
        cofactors: ['Mg2+'],
        mechanismDescription:
          'Transfers the phosphate group from C-6 to C-1 of glucose via a glucose-1,6-bisphosphate intermediate. The enzyme uses a phosphoserine residue at the active site that donates and accepts the phosphate group.',
        regulation: [],
        clinicalSignificance:
          'Phosphoglucomutase 1 (PGM1) deficiency is a congenital disorder of glycosylation (CDG) causing hypoglycemia, exercise intolerance, and abnormal glycoprotein synthesis.',
      },
      substrates: [
        { id: 'glucose-6-phosphate', name: 'Glucose-6-phosphate', abbreviation: 'G6P', formula: 'C6H13O9P' },
      ],
      products: [
        { id: 'glucose-1-phosphate', name: 'Glucose-1-phosphate', abbreviation: 'G1P', formula: 'C6H13O9P' },
      ],
      cofactorsConsumed: [],
      cofactorsProduced: [],
      deltaG: 7.5,
      isReversible: true,
      isRateLimiting: false,
      detailedDescription:
        'Phosphoglucomutase shifts the phosphate from C-6 to C-1, converting G6P to G1P. This is necessary because UDP-glucose (the activated glucose donor for glycogen synthesis) requires a C-1 phosphate for the pyrophosphorylase reaction. The reaction proceeds through a glucose-1,6-bisphosphate intermediate and is freely reversible — also used in glycogenolysis (G1P → G6P).',
      clinicalSignificance:
        'PGM1-CDG: congenital disorder of glycosylation with diverse symptoms including hypoglycemia, liver dysfunction, and coagulopathy.',
      mcatHighYield: false,
    },

    // ── Step 3: UDP-Glucose Pyrophosphorylase ──
    {
      id: 'glycogenesis-step-3',
      stepNumber: 3,
      pathwayId: 'glycogenesis',
      phaseName: 'UDP-Glucose Formation',
      reactionName: 'Activation of G1P to UDP-Glucose',
      reactionType: 'transfer',
      enzyme: {
        id: 'udp-glucose-pyrophosphorylase',
        name: 'UDP-Glucose Pyrophosphorylase',
        ecNumber: 'EC 2.7.7.9',
        alternateNames: ['UGP2', 'UDPG pyrophosphorylase'],
        cofactors: ['Mg2+'],
        mechanismDescription:
          'Catalyzes the reaction of glucose-1-phosphate with UTP to form UDP-glucose and pyrophosphate (PPi). The subsequent hydrolysis of PPi by inorganic pyrophosphatase (PPi → 2 Pi) drives the reaction forward, making it effectively irreversible in vivo.',
        regulation: [],
        clinicalSignificance:
          'This step activates glucose by attaching it to a UDP nucleotide carrier. The energy of UTP drives the reaction, and PPi hydrolysis ensures irreversibility.',
      },
      substrates: [
        { id: 'glucose-1-phosphate', name: 'Glucose-1-phosphate', abbreviation: 'G1P', formula: 'C6H13O9P' },
      ],
      products: [
        { id: 'udp-glucose', name: 'UDP-Glucose', abbreviation: 'UDP-Glc', formula: 'C15H24N2O17P2' },
      ],
      cofactorsConsumed: ['UTP'],
      cofactorsProduced: ['PPi'],
      deltaG: -3.3,
      isReversible: false,
      isRateLimiting: false,
      detailedDescription:
        'This is the activation step where glucose is "charged" onto a UDP carrier, analogous to amino acid activation by aminoacyl-tRNA synthetases. G1P attacks the alpha-phosphate of UTP, displacing pyrophosphate. The subsequent hydrolysis of PPi by pyrophosphatase (PPi → 2 Pi) provides a large negative free energy change that pulls the reaction forward. UDP-glucose is the immediate glucose donor for glycogen synthase. This step consumes one UTP (equivalent to one ATP) per glucose added to glycogen.',
      mcatHighYield: true,
    },

    // ── Step 4: Glycogen Synthase (Rate-Limiting) ──
    {
      id: 'glycogenesis-step-4',
      stepNumber: 4,
      pathwayId: 'glycogenesis',
      phaseName: 'Chain Elongation',
      reactionName: 'Addition of Glucose to Glycogen (alpha-1,4 linkage)',
      reactionType: 'transfer',
      enzyme: {
        id: 'glycogen-synthase',
        name: 'Glycogen Synthase',
        ecNumber: 'EC 2.4.1.11',
        alternateNames: ['GYS1 (muscle)', 'GYS2 (liver)'],
        cofactors: [],
        mechanismDescription:
          'Transfers the glucose moiety from UDP-glucose to the C-4 hydroxyl of the non-reducing end of a growing glycogen chain, forming a new alpha-1,4-glycosidic bond. The enzyme requires a pre-existing primer of at least 4 glucose residues (provided by glycogenin). UDP is released as a product.',
        regulation: [
          {
            regulatorName: 'Insulin (via PP1)',
            regulatorType: 'covalent-modification',
            description:
              'Insulin activates protein phosphatase 1 (PP1), which dephosphorylates glycogen synthase, converting it from the less active "b" form to the fully active "a" form. This is the primary mechanism by which insulin stimulates glycogen synthesis.',
          },
          {
            regulatorName: 'Glucagon (liver, via PKA)',
            regulatorType: 'covalent-modification',
            description:
              'Glucagon → cAMP → PKA phosphorylates glycogen synthase at multiple serine residues, converting it to the less active "b" form. GSK-3 (glycogen synthase kinase-3) also phosphorylates it after priming by casein kinase II.',
            tissueSpecific: 'Liver',
          },
          {
            regulatorName: 'Epinephrine (via PKA)',
            regulatorType: 'covalent-modification',
            description:
              'Epinephrine → cAMP → PKA phosphorylates and inactivates glycogen synthase in both liver and muscle, inhibiting glycogen synthesis during fight-or-flight response.',
          },
          {
            regulatorName: 'Glucose-6-phosphate',
            regulatorType: 'allosteric-activator',
            description:
              'G6P allosterically activates glycogen synthase, even the phosphorylated "b" form. When G6P accumulates (indicating glucose abundance), it promotes glycogen storage regardless of phosphorylation state.',
          },
          {
            regulatorName: 'GSK-3 (Glycogen Synthase Kinase-3)',
            regulatorType: 'covalent-modification',
            description:
              'GSK-3 phosphorylates and inactivates glycogen synthase. Insulin inhibits GSK-3 via the PI3K/Akt pathway, relieving inhibition of glycogen synthase. This is a major insulin signaling target.',
          },
        ],
        tissueVariants: [
          {
            tissue: 'Liver',
            isoformName: 'GYS2',
            differenceDescription:
              'Liver glycogen synthase responds to glucagon signaling. Liver glycogen is synthesized to maintain blood glucose homeostasis for the whole body.',
          },
          {
            tissue: 'Muscle',
            isoformName: 'GYS1',
            differenceDescription:
              'Muscle glycogen synthase is stimulated by insulin and exercise-induced glucose uptake. Muscle glycogen serves as a local fuel reserve for contraction.',
          },
        ],
        clinicalSignificance:
          'GSD type 0 (glycogen synthase deficiency): fasting hypoglycemia and postprandial hyperglycemia due to inability to buffer blood glucose through glycogen storage. Rare autosomal recessive condition.',
      },
      substrates: [
        { id: 'udp-glucose', name: 'UDP-Glucose', abbreviation: 'UDP-Glc', formula: 'C15H24N2O17P2' },
        { id: 'glycogen-n', name: 'Glycogen (n residues)', abbreviation: 'Glycogen(n)', formula: '(C6H10O5)n' },
      ],
      products: [
        { id: 'glycogen-n+1', name: 'Glycogen (n+1 residues)', abbreviation: 'Glycogen(n+1)', formula: '(C6H10O5)n+1' },
      ],
      cofactorsConsumed: [],
      cofactorsProduced: ['UDP'],
      deltaG: -13.3,
      isReversible: false,
      isRateLimiting: true,
      detailedDescription:
        'Glycogen synthase is the rate-limiting enzyme of glycogenesis. It adds glucose units from UDP-glucose to the non-reducing end of glycogen chains via alpha-1,4-glycosidic bonds. The enzyme exists in two forms: the active dephosphorylated "a" form and the less active phosphorylated "b" form. Insulin promotes the "a" form (via PP1-mediated dephosphorylation and GSK-3 inhibition), while glucagon and epinephrine promote the "b" form (via PKA-mediated phosphorylation). Importantly, G6P can allosterically activate even the "b" form, providing a metabolite-level override. Glycogen synthase requires glycogenin as a primer — it cannot initiate a new chain from scratch.',
      clinicalSignificance:
        'GSD type 0 (glycogen synthase deficiency): impaired glycogen synthesis leads to fasting hypoglycemia and postprandial hyperglycemia/lactacidemia.',
      mcatHighYield: true,
    },

    // ── Step 5: Branching Enzyme ──
    {
      id: 'glycogenesis-step-5',
      stepNumber: 5,
      pathwayId: 'glycogenesis',
      phaseName: 'Branch Point Creation',
      reactionName: 'Creation of alpha-1,6 Branch Points',
      reactionType: 'transfer',
      enzyme: {
        id: 'branching-enzyme',
        name: 'Glycogen Branching Enzyme',
        ecNumber: 'EC 2.4.1.18',
        alternateNames: ['1,4-alpha-glucan-branching enzyme', 'GBE1', 'Amylo-(1,4→1,6)-transglucosidase'],
        cofactors: [],
        mechanismDescription:
          'Transfers a block of approximately 7 glucose residues from the non-reducing end of a chain (must be at least 11 residues long) to the C-6 hydroxyl of a glucose residue in the same or a nearby chain, creating an alpha-1,6-glycosidic branch point. The branch must be at least 4 residues away from another branch point.',
        regulation: [],
        clinicalSignificance:
          'Branching enzyme deficiency causes GSD type IV (Andersen disease): accumulation of abnormal, poorly branched glycogen (amylopectin-like) that is insoluble and triggers an immune response. Progressive liver cirrhosis, hepatosplenomegaly, and usually death in early childhood.',
      },
      substrates: [
        { id: 'glycogen-linear', name: 'Glycogen (linear alpha-1,4 chain)', abbreviation: 'Glycogen', formula: '(C6H10O5)n' },
      ],
      products: [
        { id: 'glycogen-branched', name: 'Glycogen (with alpha-1,6 branch)', abbreviation: 'Glycogen', formula: '(C6H10O5)n' },
      ],
      cofactorsConsumed: [],
      cofactorsProduced: [],
      deltaG: 0,
      isReversible: false,
      isRateLimiting: false,
      detailedDescription:
        'The branching enzyme is essential for creating the highly branched structure of glycogen. It transfers a terminal segment of approximately 7 glucose residues from an alpha-1,4 chain to a C-6 hydroxyl group, creating an alpha-1,6 linkage. Branching increases glycogen solubility and dramatically increases the number of non-reducing ends, which are the sites where glycogen phosphorylase (degradation) and glycogen synthase (elongation) act. The high degree of branching allows extremely rapid mobilization of glucose when needed. Without branching, glycogen would resemble amylose (starch component), which is less soluble and less efficiently mobilized.',
      clinicalSignificance:
        'GSD type IV (Andersen disease): branching enzyme deficiency leads to accumulation of amylopectin-like glycogen with long, unbranched outer chains. Causes progressive hepatic cirrhosis and is usually fatal in early childhood without liver transplantation.',
      mcatHighYield: true,
    },
  ],
};

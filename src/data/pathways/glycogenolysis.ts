import type { Pathway } from '../types';

export const glycogenolysisPathway: Pathway = {
  id: 'glycogenolysis',
  name: 'Glycogenolysis',
  description:
    'The breakdown of glycogen to release glucose-1-phosphate (and a small amount of free glucose from branch points). In liver, G6P is converted to free glucose for blood glucose maintenance. In muscle, G6P enters glycolysis directly for local energy production. Glycogenolysis is stimulated by glucagon (liver) and epinephrine (liver and muscle) through a phosphorylase kinase cascade.',
  location: 'Cytoplasm',
  netEquation:
    'Glycogen(n) + Pi → Glycogen(n-1) + Glucose-1-phosphate (repeated; branch points release free glucose)',
  energySummary: {
    atpConsumed: 0,
    atpProduced: 0,
    nadhProduced: 0,
    fadh2Produced: 0,
    netAtp: 0, // No direct ATP cost or production; G1P enters other pathways
  },
  connections: [
    {
      targetPathwayId: 'glycolysis',
      connectionDescription:
        'In muscle, G6P from glycogenolysis enters glycolysis directly for ATP production. Muscle glycogen is the primary fuel for anaerobic exercise.',
      sharedMetabolite: 'Glucose-6-phosphate',
    },
    {
      targetPathwayId: 'glycogenesis',
      connectionDescription:
        'Glycogenolysis and glycogenesis are reciprocally regulated by the same hormonal signals. They do not operate simultaneously to prevent futile cycling.',
      sharedMetabolite: 'Glycogen',
    },
    {
      targetPathwayId: 'gluconeogenesis',
      connectionDescription:
        'In liver, both glycogenolysis and gluconeogenesis contribute to blood glucose maintenance. Glycogenolysis is the first response to fasting; gluconeogenesis becomes dominant after glycogen stores are depleted (~24 hours).',
      sharedMetabolite: 'Glucose-6-phosphate',
    },
    {
      targetPathwayId: 'pentose-phosphate',
      connectionDescription:
        'G6P from glycogenolysis can enter the pentose phosphate pathway for NADPH and ribose-5-phosphate production.',
      sharedMetabolite: 'Glucose-6-phosphate',
    },
  ],
  mcatKeyPoints: [
    'Glycogen phosphorylase is the rate-limiting enzyme, cleaving alpha-1,4 bonds by phosphorolysis (using Pi, not H2O)',
    'Phosphorolysis is more energy-efficient than hydrolysis: produces G1P directly (already phosphorylated) without ATP cost',
    'Debranching enzyme has two activities: transferase (moves 3 glucose residues) and alpha-1,6-glucosidase (releases 1 free glucose)',
    'About 90% of glucose residues are released as G1P (alpha-1,4 bonds); ~10% as free glucose (alpha-1,6 branch points)',
    'In liver: G6P → free glucose (via glucose-6-phosphatase) → exported to blood for systemic use',
    'In muscle: G6P enters glycolysis directly (muscle lacks glucose-6-phosphatase and CANNOT export free glucose)',
    'Epinephrine activates glycogenolysis in BOTH liver and muscle; glucagon acts ONLY on liver',
    'The phosphorylase kinase cascade: glucagon/epi → cAMP → PKA → phosphorylase kinase → glycogen phosphorylase (b→a)',
    'Calcium activates phosphorylase kinase in muscle (via calmodulin subunit) — links muscle contraction to glycogenolysis',
    'Key glycogen storage diseases: Von Gierke (I, G6Pase), Pompe (II, lysosomal alpha-glucosidase), Cori/Forbes (III, debranching), McArdle (V, muscle phosphorylase)',
    'Glycogen phosphorylase stops 4 residues from a branch point — debranching enzyme must act before phosphorylase can continue',
    'Liver glycogen stores (~100g) are depleted after ~24 hours of fasting; muscle glycogen (~400g) is only used locally',
  ],
  steps: [
    // ── Step 1: Glycogen Phosphorylase (Rate-Limiting) ──
    {
      id: 'glycogenolysis-step-1',
      stepNumber: 1,
      pathwayId: 'glycogenolysis',
      phaseName: 'Chain Shortening (alpha-1,4 Cleavage)',
      reactionName: 'Phosphorolysis of Glycogen to Glucose-1-Phosphate',
      reactionType: 'phosphorylation',
      enzyme: {
        id: 'glycogen-phosphorylase',
        name: 'Glycogen Phosphorylase',
        ecNumber: 'EC 2.4.1.1',
        alternateNames: ['GP', 'PYGM (muscle)', 'PYGL (liver)', 'PYGB (brain)'],
        cofactors: ['Pyridoxal phosphate (PLP, vitamin B6)'],
        mechanismDescription:
          'Cleaves alpha-1,4-glycosidic bonds at the non-reducing ends of glycogen chains by phosphorolysis — using inorganic phosphate (Pi) instead of water. The phosphate attacks the C-1 of the terminal glucose, releasing glucose-1-phosphate. PLP (vitamin B6 derivative) acts as a general acid catalyst at the active site. The enzyme works processively, removing one glucose at a time, but stops 4 residues from any alpha-1,6 branch point.',
        regulation: [
          {
            regulatorName: 'Glucagon (liver)',
            regulatorType: 'covalent-modification',
            description:
              'Glucagon → cAMP → PKA → phosphorylase kinase (activated) → phosphorylates glycogen phosphorylase b to the active "a" form. This is the primary hormonal activation of liver glycogenolysis during fasting.',
            tissueSpecific: 'Liver',
          },
          {
            regulatorName: 'Epinephrine (liver + muscle)',
            regulatorType: 'covalent-modification',
            description:
              'Epinephrine activates glycogen phosphorylase via the same cAMP/PKA cascade in both liver and muscle. In liver, epi acts via beta-adrenergic receptors (cAMP). In muscle, epi acts via both beta-adrenergic (cAMP) and alpha-adrenergic (Ca2+/IP3) receptors.',
          },
          {
            regulatorName: 'AMP',
            regulatorType: 'allosteric-activator',
            description:
              'AMP allosterically activates muscle glycogen phosphorylase b (even without phosphorylation), linking glycogenolysis to low energy charge during exercise. This is primarily important in muscle, not liver.',
            tissueSpecific: 'Muscle',
          },
          {
            regulatorName: 'ATP',
            regulatorType: 'allosteric-inhibitor',
            description:
              'ATP allosterically inhibits glycogen phosphorylase, preventing unnecessary glycogen breakdown when energy is sufficient.',
          },
          {
            regulatorName: 'Glucose-6-phosphate',
            regulatorType: 'allosteric-inhibitor',
            description:
              'G6P inhibits glycogen phosphorylase, providing negative feedback when glucose-6-phosphate accumulates.',
          },
          {
            regulatorName: 'Glucose (liver)',
            regulatorType: 'allosteric-inhibitor',
            description:
              'Free glucose allosterically inhibits the liver isoform of glycogen phosphorylase a, causing it to become a better substrate for PP1 dephosphorylation (a → b). This is how high blood glucose directly shuts down hepatic glycogenolysis.',
            tissueSpecific: 'Liver',
          },
          {
            regulatorName: 'Calcium / Calmodulin',
            regulatorType: 'allosteric-activator',
            description:
              'Ca2+ released during muscle contraction binds to the calmodulin subunit (delta subunit) of phosphorylase kinase, activating it even without PKA phosphorylation. This directly links muscle contraction to glycogen breakdown.',
            tissueSpecific: 'Muscle',
          },
          {
            regulatorName: 'Insulin (indirect, via PP1)',
            regulatorType: 'covalent-modification',
            description:
              'Insulin activates protein phosphatase 1 (PP1), which dephosphorylates glycogen phosphorylase a back to the less active b form, shutting down glycogenolysis in the fed state.',
          },
        ],
        tissueVariants: [
          {
            tissue: 'Liver',
            isoformName: 'PYGL (Liver glycogen phosphorylase)',
            differenceDescription:
              'Regulated primarily by hormonal signals (glucagon) and glucose. Not strongly activated by AMP. Responds to systemic glucose needs. Glucose acts as an allosteric inhibitor, promoting dephosphorylation.',
          },
          {
            tissue: 'Muscle',
            isoformName: 'PYGM (Muscle glycogen phosphorylase)',
            differenceDescription:
              'Strongly activated by AMP and Ca2+ (during contraction). Responds to local energy demands. Deficiency causes McArdle disease (GSD type V).',
          },
          {
            tissue: 'Brain',
            isoformName: 'PYGB (Brain glycogen phosphorylase)',
            differenceDescription:
              'Brain isoform found in astrocytes. Glycogen in astrocytes serves as a short-term glucose reserve for neurons.',
          },
        ],
        clinicalSignificance:
          'McArdle disease (GSD type V): muscle glycogen phosphorylase (PYGM) deficiency causes exercise intolerance, myoglobinuria, and the "second wind" phenomenon (as blood-borne fuels compensate). Hers disease (GSD type VI): liver glycogen phosphorylase (PYGL) deficiency causes mild hepatomegaly and fasting hypoglycemia.',
      },
      substrates: [
        { id: 'glycogen-n', name: 'Glycogen (n residues)', abbreviation: 'Glycogen(n)', formula: '(C6H10O5)n' },
      ],
      products: [
        { id: 'glucose-1-phosphate', name: 'Glucose-1-phosphate', abbreviation: 'G1P', formula: 'C6H13O9P' },
        { id: 'glycogen-n-1', name: 'Glycogen (n-1 residues)', abbreviation: 'Glycogen(n-1)', formula: '(C6H10O5)n-1' },
      ],
      cofactorsConsumed: ['Pi'],
      cofactorsProduced: [],
      deltaG: 3.1,
      isReversible: true,
      isRateLimiting: true,
      detailedDescription:
        'Glycogen phosphorylase is the rate-limiting enzyme of glycogenolysis. It cleaves alpha-1,4-glycosidic bonds by phosphorolysis (not hydrolysis), directly producing glucose-1-phosphate without ATP expenditure. This is energetically advantageous: phosphorolysis saves one ATP compared to hydrolysis (which would release free glucose requiring phosphorylation by hexokinase). PLP (pyridoxal phosphate, from vitamin B6) is an essential cofactor. The enzyme removes glucose residues sequentially from non-reducing ends but stops 4 residues before any alpha-1,6 branch point, creating a "limit dextrin." The debranching enzyme must then act before phosphorylase can continue. The regulation of glycogen phosphorylase is a classic MCAT topic involving the phosphorylase kinase cascade.',
      clinicalSignificance:
        'McArdle disease (GSD V): PYGM deficiency → exercise intolerance, muscle cramps, myoglobinuria, "second wind" phenomenon. Hers disease (GSD VI): PYGL deficiency → hepatomegaly, mild fasting hypoglycemia.',
      mcatHighYield: true,
    },

    // ── Step 2: Debranching Enzyme ──
    {
      id: 'glycogenolysis-step-2',
      stepNumber: 2,
      pathwayId: 'glycogenolysis',
      phaseName: 'Branch Point Removal',
      reactionName: 'Debranching: Transferase + alpha-1,6-Glucosidase',
      reactionType: 'transfer',
      enzyme: {
        id: 'debranching-enzyme',
        name: 'Glycogen Debranching Enzyme',
        ecNumber: 'EC 3.2.1.33 / EC 2.4.1.25',
        alternateNames: ['AGL', 'Amylo-1,6-glucosidase / 4-alpha-glucanotransferase'],
        cofactors: [],
        mechanismDescription:
          'A bifunctional enzyme with two distinct catalytic activities on a single polypeptide: (1) Transferase (oligo-1,4→1,4-glucanotransferase): transfers a block of 3 glucose residues from the branch to the non-reducing end of a nearby chain via a new alpha-1,4 linkage, leaving a single glucose residue attached by the alpha-1,6 bond. (2) Alpha-1,6-glucosidase: hydrolyzes the remaining alpha-1,6-linked glucose residue, releasing it as free glucose (not G1P). After debranching, glycogen phosphorylase can resume cleaving the now-linear chain.',
        regulation: [],
        clinicalSignificance:
          'Debranching enzyme deficiency causes GSD type III (Cori disease / Forbes disease). Patients accumulate abnormal glycogen with short outer branches (limit dextrin). Symptoms include hepatomegaly, fasting hypoglycemia (milder than GSD I), and progressive myopathy. Type IIIa affects liver and muscle; type IIIb affects liver only.',
      },
      substrates: [
        { id: 'limit-dextrin', name: 'Limit Dextrin (glycogen with 4-residue branch stub)', abbreviation: 'Limit Dextrin', formula: '(C6H10O5)n' },
      ],
      products: [
        { id: 'glycogen-debranched', name: 'Glycogen (debranched, linear)', abbreviation: 'Glycogen', formula: '(C6H10O5)n' },
        { id: 'free-glucose', name: 'Free Glucose', abbreviation: 'Glc', formula: 'C6H12O6' },
      ],
      cofactorsConsumed: ['H2O'],
      cofactorsProduced: [],
      deltaG: -6.0,
      isReversible: false,
      isRateLimiting: false,
      detailedDescription:
        'The debranching enzyme acts after glycogen phosphorylase has shortened a branch to 4 glucose residues (a "limit dextrin"). It has two catalytic activities on one polypeptide: First, the transferase activity moves a block of 3 residues from the branch stub to a nearby non-reducing end via alpha-1,4 linkage. This leaves a single glucose attached by the alpha-1,6 bond. Second, the alpha-1,6-glucosidase activity hydrolyzes this last alpha-1,6-linked glucose, releasing it as free glucose (approximately 10% of total glucose released from glycogen). After debranching, the chain is linear and glycogen phosphorylase can resume processively cleaving alpha-1,4 bonds. The free glucose released at branch points does not require phosphorylation by hexokinase to become G6P, but it represents only a small fraction of total glucose mobilization.',
      clinicalSignificance:
        'GSD type III (Cori/Forbes disease): debranching enzyme deficiency → accumulation of limit dextrins (abnormal glycogen with short outer chains). Hepatomegaly, fasting hypoglycemia (less severe than Von Gierke because gluconeogenesis is intact), myopathy (type IIIa), elevated CK. Distinguished from GSD I by intact gluconeogenic response to galactose/fructose.',
      mcatHighYield: true,
    },

    // ── Step 3: Phosphoglucomutase ──
    {
      id: 'glycogenolysis-step-3',
      stepNumber: 3,
      pathwayId: 'glycogenolysis',
      phaseName: 'G1P Conversion',
      reactionName: 'Isomerization of G1P to G6P',
      reactionType: 'mutase',
      enzyme: {
        id: 'phosphoglucomutase-glycogenolysis',
        name: 'Phosphoglucomutase',
        ecNumber: 'EC 5.4.2.2',
        alternateNames: ['PGM1'],
        cofactors: ['Mg2+'],
        mechanismDescription:
          'Catalyzes the reversible transfer of a phosphate group between the C-1 and C-6 positions of glucose phosphate, converting glucose-1-phosphate to glucose-6-phosphate via a glucose-1,6-bisphosphate intermediate. This is the same enzyme used in glycogenesis but operating in the reverse direction.',
        regulation: [],
        clinicalSignificance:
          'PGM1 deficiency is a congenital disorder of glycosylation (CDG) with diverse manifestations.',
      },
      substrates: [
        { id: 'glucose-1-phosphate', name: 'Glucose-1-phosphate', abbreviation: 'G1P', formula: 'C6H13O9P' },
      ],
      products: [
        { id: 'glucose-6-phosphate', name: 'Glucose-6-phosphate', abbreviation: 'G6P', formula: 'C6H13O9P' },
      ],
      cofactorsConsumed: [],
      cofactorsProduced: [],
      deltaG: -7.5,
      isReversible: true,
      isRateLimiting: false,
      detailedDescription:
        'Phosphoglucomutase converts G1P (product of glycogen phosphorylase) to G6P, which is the metabolic branch point. This is the same enzyme used in glycogenesis (G6P → G1P) operating in reverse. G6P can then either: (1) in liver — be dephosphorylated by glucose-6-phosphatase to free glucose for export to blood, or (2) in muscle — enter glycolysis directly for ATP production. Muscle lacks glucose-6-phosphatase and therefore cannot release free glucose from glycogen — muscle glycogen serves only as a local fuel source.',
      mcatHighYield: true,
    },

    // ── Step 4: Glucose-6-Phosphatase (Liver/Kidney Only) ──
    {
      id: 'glycogenolysis-step-4',
      stepNumber: 4,
      pathwayId: 'glycogenolysis',
      phaseName: 'Glucose Release (Liver/Kidney Only)',
      reactionName: 'Hydrolysis of G6P to Free Glucose',
      reactionType: 'hydrolysis',
      enzyme: {
        id: 'glucose-6-phosphatase-glycogenolysis',
        name: 'Glucose-6-phosphatase',
        ecNumber: 'EC 3.1.3.9',
        alternateNames: ['G6Pase', 'G6PC1'],
        cofactors: [],
        mechanismDescription:
          'Hydrolyzes glucose-6-phosphate to free glucose and inorganic phosphate in the lumen of the endoplasmic reticulum. G6P is transported into the ER by a specific translocase (G6PT / T1), and the products are transported back to the cytoplasm. Free glucose exits the hepatocyte via GLUT2.',
        regulation: [
          {
            regulatorName: 'Substrate availability',
            regulatorType: 'allosteric-activator',
            description:
              'G6Pase activity is primarily regulated by substrate availability (G6P levels). Both glycogenolysis and gluconeogenesis contribute to the G6P pool.',
          },
          {
            regulatorName: 'Cortisol',
            regulatorType: 'hormonal',
            description:
              'Cortisol induces G6Pase gene expression, increasing the capacity for glucose release.',
          },
          {
            regulatorName: 'Insulin',
            regulatorType: 'hormonal',
            description:
              'Insulin represses G6Pase gene expression, reducing hepatic glucose output in the fed state.',
          },
        ],
        tissueVariants: [
          {
            tissue: 'Liver',
            isoformName: 'G6Pase-alpha (G6PC1)',
            differenceDescription:
              'Primary isoform for hepatic glucose release. Located in the ER membrane. Deficiency causes Von Gierke disease (GSD type Ia).',
          },
          {
            tissue: 'Kidney',
            isoformName: 'G6Pase-alpha',
            differenceDescription:
              'Kidney cortex expresses G6Pase and can contribute to blood glucose during prolonged fasting.',
          },
          {
            tissue: 'Muscle',
            isoformName: 'ABSENT',
            differenceDescription:
              'Muscle does NOT express glucose-6-phosphatase. Therefore, muscle glycogen CANNOT be converted to free glucose and CANNOT contribute to blood glucose directly. G6P from muscle glycogen must enter glycolysis locally.',
          },
        ],
        clinicalSignificance:
          'Von Gierke disease (GSD type Ia): glucose-6-phosphatase deficiency causes severe fasting hypoglycemia (cannot release glucose from liver glycogen OR gluconeogenesis), massive hepatomegaly (glycogen + fat accumulation), lactic acidosis, hyperuricemia, hyperlipidemia. GSD type Ib: G6P translocase deficiency (similar symptoms + neutropenia and recurrent infections).',
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
        'This step occurs ONLY in liver and kidney (not muscle, brain, or other tissues). Glucose-6-phosphatase is located in the ER membrane with its active site facing the ER lumen. G6P must first be transported into the ER lumen by the G6P translocase (T1), where it is hydrolyzed to free glucose and Pi. Free glucose is then transported to the cytoplasm and exits the cell via GLUT2 transporters into the blood. This is the final step that allows liver glycogen to maintain blood glucose homeostasis. The absence of G6Pase in muscle is the fundamental reason why muscle glycogen serves only as a local fuel and cannot maintain blood glucose. Patients with Von Gierke disease cannot perform this step and develop severe fasting hypoglycemia.',
      clinicalSignificance:
        'Von Gierke disease (GSD Ia): most severe GSD. Presents in infancy with severe hypoglycemia (seizures), hepatomegaly, "doll-like" facies, growth retardation. Lab findings: lactic acidosis, hyperuricemia (gout), hyperlipidemia. Treatment: frequent cornstarch feeds, avoidance of fasting. GSD Ib (translocase deficiency): same metabolic features + neutropenia → recurrent bacterial infections.',
      mcatHighYield: true,
    },

    // ── Step 5: Lysosomal Glycogen Degradation (Acid alpha-Glucosidase) ──
    {
      id: 'glycogenolysis-step-5',
      stepNumber: 5,
      pathwayId: 'glycogenolysis',
      phaseName: 'Lysosomal Degradation (Parallel Pathway)',
      reactionName: 'Lysosomal Hydrolysis of Glycogen',
      reactionType: 'hydrolysis',
      enzyme: {
        id: 'acid-alpha-glucosidase',
        name: 'Acid alpha-Glucosidase',
        ecNumber: 'EC 3.2.1.20',
        alternateNames: ['GAA', 'Acid Maltase', 'Lysosomal alpha-glucosidase'],
        cofactors: [],
        mechanismDescription:
          'A lysosomal enzyme that hydrolyzes alpha-1,4 and alpha-1,6-glycosidic bonds in glycogen at acidic pH (optimum ~pH 4). It degrades glycogen that enters lysosomes via autophagy, releasing free glucose. This is a separate pathway from the cytoplasmic glycogen phosphorylase pathway and accounts for a small fraction (~3%) of total glycogen degradation.',
        regulation: [],
        clinicalSignificance:
          'Acid alpha-glucosidase deficiency causes Pompe disease (GSD type II): glycogen accumulates in lysosomes, particularly in cardiac and skeletal muscle. Infantile-onset form presents with severe cardiomyopathy, hypotonia, and death by age 2 without treatment. Late-onset form causes progressive proximal myopathy and respiratory failure. Enzyme replacement therapy (ERT) with alglucosidase alfa is available.',
      },
      substrates: [
        { id: 'glycogen-lysosomal', name: 'Glycogen (lysosomal)', abbreviation: 'Glycogen', formula: '(C6H10O5)n' },
      ],
      products: [
        { id: 'glucose-free', name: 'Free Glucose', abbreviation: 'Glc', formula: 'C6H12O6' },
      ],
      cofactorsConsumed: ['H2O'],
      cofactorsProduced: [],
      deltaG: -15.0,
      isReversible: false,
      isRateLimiting: false,
      detailedDescription:
        'A small fraction of cellular glycogen is continuously taken up by lysosomes via autophagy and degraded by acid alpha-glucosidase (acid maltase) at lysosomal pH (~4.0). This is mechanistically distinct from the cytoplasmic phosphorylase pathway: it uses hydrolysis (not phosphorolysis) and produces free glucose (not G1P). Although this pathway accounts for only ~3% of normal glycogen degradation, its deficiency causes Pompe disease (GSD II), the only GSD that is also a lysosomal storage disease. Pompe disease is unique among GSDs because the cytoplasmic glycogenolysis pathway is intact — the problem is specifically in the lysosomal degradation of glycogen, leading to massive lysosomal glycogen accumulation, especially in cardiac and skeletal muscle.',
      clinicalSignificance:
        'Pompe disease (GSD II): the only GSD that is a lysosomal storage disease. Infantile form: cardiomegaly (massive), hypotonia ("floppy baby"), macroglossia, death by 1-2 years. Late-onset: progressive limb-girdle weakness, respiratory insufficiency. Enzyme replacement therapy (ERT) is available. Newborn screening is increasingly performed.',
      mcatHighYield: true,
    },
  ],
};

import type { Pathway } from '../types';

export const glycolysisPathway: Pathway = {
  id: 'glycolysis',
  name: 'Glycolysis',
  description:
    'The universal pathway for glucose catabolism, occurring in the cytoplasm of all cells. It converts one molecule of glucose into two molecules of pyruvate, generating a net gain of 2 ATP and 2 NADH.',
  location: 'Cytoplasm',
  netEquation:
    'Glucose + 2 NAD+ + 2 ADP + 2 Pi → 2 Pyruvate + 2 NADH + 2 H+ + 2 ATP + 2 H₂O',
  energySummary: {
    atpConsumed: 2,
    atpProduced: 4,
    nadhProduced: 2,
    fadh2Produced: 0,
    netAtp: 2,
  },
  connections: [
    {
      targetPathwayId: 'tca-etc',
      connectionDescription: 'Pyruvate enters mitochondria and is converted to acetyl-CoA by pyruvate dehydrogenase',
      sharedMetabolite: 'Pyruvate',
    },
    {
      targetPathwayId: 'gluconeogenesis',
      connectionDescription: 'Gluconeogenesis is essentially the reverse of glycolysis with 3 bypass reactions',
      sharedMetabolite: 'Glucose / Pyruvate',
    },
    {
      targetPathwayId: 'pentose-phosphate',
      connectionDescription: 'G6P can be diverted to the PPP for NADPH and ribose-5-phosphate production',
      sharedMetabolite: 'Glucose-6-phosphate',
    },
    {
      targetPathwayId: 'glycogenesis',
      connectionDescription: 'G6P can be converted to G1P for glycogen synthesis',
      sharedMetabolite: 'Glucose-6-phosphate',
    },
    {
      targetPathwayId: 'fatty-acid-synthesis',
      connectionDescription: 'Pyruvate → acetyl-CoA → citrate exported to cytoplasm for FA synthesis',
      sharedMetabolite: 'Acetyl-CoA (via pyruvate)',
    },
  ],
  mcatKeyPoints: [
    'Net yield: 2 ATP, 2 NADH, 2 pyruvate per glucose',
    'Three irreversible steps (1, 3, 10) are bypassed in gluconeogenesis',
    'PFK-1 is the committed and most important regulatory step',
    'Substrate-level phosphorylation occurs at steps 7 and 10',
    'Under anaerobic conditions, pyruvate is reduced to lactate to regenerate NAD+',
    'All cells have glycolytic enzymes; RBCs depend entirely on glycolysis',
    'Fluoride inhibits enolase (relevant in blood collection tubes)',
    'Arsenic replaces Pi in step 6, uncoupling substrate-level phosphorylation',
  ],
  steps: [
    // ── Step 1: Hexokinase ──
    {
      id: 'glycolysis-step-1',
      stepNumber: 1,
      pathwayId: 'glycolysis',
      phaseName: 'Investment Phase',
      reactionName: 'Phosphorylation of Glucose',
      reactionType: 'phosphorylation',
      enzyme: {
        id: 'hexokinase',
        name: 'Hexokinase',
        ecNumber: 'EC 2.7.1.1',
        alternateNames: ['Glucokinase (liver isoform, HK IV)'],
        cofactors: ['Mg2+'],
        mechanismDescription:
          'Transfers the terminal phosphate group from ATP to the C-6 hydroxyl of glucose, trapping it inside the cell as glucose-6-phosphate.',
        regulation: [
          {
            regulatorName: 'Glucose-6-phosphate',
            regulatorType: 'product-inhibition',
            description: 'G6P allosterically inhibits hexokinase (but NOT glucokinase), preventing excess phosphorylation when G6P accumulates.',
          },
        ],
        tissueVariants: [
          {
            tissue: 'Liver',
            isoformName: 'Glucokinase (HK IV)',
            differenceDescription:
              'Higher Km (~10 mM vs 0.1 mM), not inhibited by G6P. Acts as a glucose sensor — only active when blood glucose is high. Induced by insulin.',
            kmValue: '~10 mM',
          },
          {
            tissue: 'Pancreatic beta cells',
            isoformName: 'Glucokinase',
            differenceDescription: 'Serves as the glucose sensor for insulin secretion. Mutations cause MODY (maturity-onset diabetes of the young).',
          },
        ],
        clinicalSignificance:
          'Glucokinase mutations → MODY type 2. Glucokinase activators are being explored as diabetes treatments.',
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
      isRateLimiting: true,
      detailedDescription:
        'The first step traps glucose inside the cell by adding a phosphate group. The negative charge of the phosphate prevents G6P from crossing the plasma membrane. This is an irreversible step under cellular conditions due to the large negative ΔG. In liver, glucokinase (HK IV) has a much higher Km, allowing the liver to phosphorylate glucose only when blood glucose is elevated.',
      clinicalSignificance:
        'Glucokinase (liver/pancreas) mutations cause MODY2. Hexokinase deficiency can cause hemolytic anemia in RBCs.',
      mcatHighYield: true,
    },

    // ── Step 2: Phosphoglucose Isomerase ──
    {
      id: 'glycolysis-step-2',
      stepNumber: 2,
      pathwayId: 'glycolysis',
      phaseName: 'Investment Phase',
      reactionName: 'Isomerization of G6P to F6P',
      reactionType: 'isomerization',
      enzyme: {
        id: 'phosphoglucose-isomerase',
        name: 'Phosphoglucose Isomerase',
        ecNumber: 'EC 5.3.1.9',
        alternateNames: ['Glucose-6-phosphate Isomerase', 'PGI'],
        cofactors: [],
        mechanismDescription:
          'Converts the aldose (glucose-6-phosphate) to the ketose (fructose-6-phosphate) via an enediol intermediate. Ring opening, isomerization, and ring closure.',
        regulation: [],
        clinicalSignificance: 'PGI is also known as autocrine motility factor (AMF) when secreted by tumor cells.',
      },
      substrates: [
        { id: 'glucose-6-phosphate', name: 'Glucose-6-phosphate', abbreviation: 'G6P', formula: 'C6H13O9P' },
      ],
      products: [
        { id: 'fructose-6-phosphate', name: 'Fructose-6-phosphate', abbreviation: 'F6P', formula: 'C6H13O9P' },
      ],
      cofactorsConsumed: [],
      cofactorsProduced: [],
      deltaG: 2.2,
      isReversible: true,
      isRateLimiting: false,
      detailedDescription:
        'This near-equilibrium reaction converts the 6-membered glucose ring to the 5-membered fructose ring. The conversion is necessary to set up the symmetrical cleavage in step 4. The reaction is freely reversible and is driven forward by the consumption of F6P in step 3.',
      mcatHighYield: false,
    },

    // ── Step 3: PFK-1 (Rate-limiting / committed step) ──
    {
      id: 'glycolysis-step-3',
      stepNumber: 3,
      pathwayId: 'glycolysis',
      phaseName: 'Investment Phase',
      reactionName: 'Phosphorylation of F6P to F-1,6-BP',
      reactionType: 'phosphorylation',
      enzyme: {
        id: 'pfk1',
        name: 'Phosphofructokinase-1',
        ecNumber: 'EC 2.7.1.11',
        alternateNames: ['PFK-1'],
        cofactors: ['Mg2+'],
        mechanismDescription:
          'Transfers a phosphate from ATP to the C-1 position of F6P, creating fructose-1,6-bisphosphate. This is the committed step of glycolysis.',
        regulation: [
          {
            regulatorName: 'ATP',
            regulatorType: 'allosteric-inhibitor',
            description: 'High ATP signals sufficient energy; allosterically inhibits PFK-1.',
          },
          {
            regulatorName: 'Citrate',
            regulatorType: 'allosteric-inhibitor',
            description: 'Citrate from TCA cycle indicates adequate energy and biosynthetic precursors.',
          },
          {
            regulatorName: 'AMP',
            regulatorType: 'allosteric-activator',
            description: 'Low energy charge (high AMP) stimulates glycolysis.',
          },
          {
            regulatorName: 'Fructose-2,6-bisphosphate',
            regulatorType: 'allosteric-activator',
            description:
              'The most potent activator of PFK-1. Produced by PFK-2 (bifunctional enzyme controlled by insulin/glucagon). In fed state, insulin activates PFK-2 → more F-2,6-BP → more PFK-1 activity.',
          },
          {
            regulatorName: 'Insulin (indirect)',
            regulatorType: 'hormonal',
            description: 'Insulin activates PFK-2, increasing F-2,6-BP, which activates PFK-1.',
          },
          {
            regulatorName: 'Glucagon (indirect)',
            regulatorType: 'hormonal',
            description: 'Glucagon (via cAMP/PKA) phosphorylates PFK-2, activating its phosphatase domain, decreasing F-2,6-BP, slowing glycolysis in the liver.',
            tissueSpecific: 'Liver',
          },
        ],
        clinicalSignificance: 'PFK-1 deficiency (Tarui disease / GSD VII) causes exercise intolerance and hemolytic anemia.',
      },
      substrates: [
        { id: 'fructose-6-phosphate', name: 'Fructose-6-phosphate', abbreviation: 'F6P', formula: 'C6H13O9P' },
      ],
      products: [
        { id: 'fructose-1-6-bisphosphate', name: 'Fructose-1,6-bisphosphate', abbreviation: 'F-1,6-BP', formula: 'C6H14O12P2' },
      ],
      cofactorsConsumed: ['ATP'],
      cofactorsProduced: ['ADP'],
      deltaG: -22.2,
      isReversible: false,
      isRateLimiting: true,
      detailedDescription:
        'This is the committed step of glycolysis and the most important regulatory point. Once F-1,6-BP is formed, the cell is committed to glycolysis. PFK-1 is an allosteric enzyme subject to complex regulation reflecting the energy status of the cell. Fructose-2,6-bisphosphate (made by PFK-2) is the single most potent activator and is the key link between hormonal signaling (insulin/glucagon) and glycolytic flux.',
      clinicalSignificance: 'Tarui disease (GSD VII): PFK-1 deficiency → exercise intolerance, hemolysis.',
      mcatHighYield: true,
    },

    // ── Step 4: Aldolase ──
    {
      id: 'glycolysis-step-4',
      stepNumber: 4,
      pathwayId: 'glycolysis',
      phaseName: 'Investment Phase',
      reactionName: 'Cleavage of F-1,6-BP',
      reactionType: 'cleavage',
      enzyme: {
        id: 'aldolase',
        name: 'Aldolase',
        ecNumber: 'EC 4.1.2.13',
        alternateNames: ['Fructose-bisphosphate Aldolase', 'Aldolase B (liver)'],
        cofactors: [],
        mechanismDescription:
          'Cleaves the 6-carbon F-1,6-BP into two 3-carbon fragments via a Schiff base intermediate (Class I aldolase in animals). The C3-C4 bond is broken through a retro-aldol reaction.',
        regulation: [],
        tissueVariants: [
          {
            tissue: 'Liver',
            isoformName: 'Aldolase B',
            differenceDescription: 'Also cleaves fructose-1-phosphate (from dietary fructose). Deficiency causes hereditary fructose intolerance.',
          },
        ],
        clinicalSignificance:
          'Aldolase B deficiency → hereditary fructose intolerance. Accumulation of F-1-P traps phosphate, depletes ATP, inhibits gluconeogenesis and glycogenolysis.',
      },
      substrates: [
        { id: 'fructose-1-6-bisphosphate', name: 'Fructose-1,6-bisphosphate', abbreviation: 'F-1,6-BP', formula: 'C6H14O12P2' },
      ],
      products: [
        { id: 'g3p', name: 'Glyceraldehyde-3-phosphate', abbreviation: 'G3P', formula: 'C3H7O6P' },
        { id: 'dhap', name: 'Dihydroxyacetone phosphate', abbreviation: 'DHAP', formula: 'C3H7O6P' },
      ],
      cofactorsConsumed: [],
      cofactorsProduced: [],
      deltaG: 23.8,
      isReversible: true,
      isRateLimiting: false,
      detailedDescription:
        'Despite the highly unfavorable ΔG°, this reaction proceeds forward in vivo because the products (G3P and DHAP) are rapidly consumed by subsequent steps (especially step 5 converting DHAP → G3P). This is a key example of how coupling reactions drives thermodynamically unfavorable steps forward.',
      clinicalSignificance:
        'Aldolase B deficiency causes hereditary fructose intolerance — severe hypoglycemia, vomiting, liver failure after fructose ingestion.',
      mcatHighYield: true,
    },

    // ── Step 5: Triose Phosphate Isomerase ──
    {
      id: 'glycolysis-step-5',
      stepNumber: 5,
      pathwayId: 'glycolysis',
      phaseName: 'Investment Phase',
      reactionName: 'Isomerization of DHAP to G3P',
      reactionType: 'isomerization',
      enzyme: {
        id: 'triose-phosphate-isomerase',
        name: 'Triose Phosphate Isomerase',
        ecNumber: 'EC 5.3.1.1',
        alternateNames: ['TPI', 'TIM'],
        cofactors: [],
        mechanismDescription:
          'Interconverts DHAP (ketose) and G3P (aldose) via an enediol intermediate. The enzyme is considered catalytically perfect — the reaction rate is limited only by diffusion.',
        regulation: [],
        clinicalSignificance: 'TPI deficiency is a rare autosomal recessive disorder causing hemolytic anemia and neuromuscular dysfunction.',
      },
      substrates: [
        { id: 'dhap', name: 'Dihydroxyacetone phosphate', abbreviation: 'DHAP', formula: 'C3H7O6P' },
      ],
      products: [
        { id: 'g3p', name: 'Glyceraldehyde-3-phosphate', abbreviation: 'G3P', formula: 'C3H7O6P' },
      ],
      cofactorsConsumed: [],
      cofactorsProduced: [],
      deltaG: 7.5,
      isReversible: true,
      isRateLimiting: false,
      detailedDescription:
        'This step ensures that both products of aldolase can proceed through the payoff phase. TPI is called a "catalytically perfect" or "kinetically perfect" enzyme because its rate approaches the diffusion-controlled limit. After this step, we effectively have 2 molecules of G3P per glucose — all subsequent yields are doubled.',
      clinicalSignificance: 'TPI deficiency: hemolytic anemia + progressive neurological dysfunction.',
      mcatHighYield: true,
    },

    // ── Step 6: G3P Dehydrogenase ──
    {
      id: 'glycolysis-step-6',
      stepNumber: 6,
      pathwayId: 'glycolysis',
      phaseName: 'Payoff Phase',
      reactionName: 'Oxidation and Phosphorylation of G3P',
      reactionType: 'oxidation',
      enzyme: {
        id: 'g3p-dehydrogenase',
        name: 'Glyceraldehyde-3-phosphate Dehydrogenase',
        ecNumber: 'EC 1.2.1.12',
        alternateNames: ['GAPDH'],
        cofactors: ['NAD+'],
        mechanismDescription:
          'Oxidizes the aldehyde group of G3P to a thioester intermediate (with an active-site cysteine), then transfers the acyl group to inorganic phosphate (Pi) to form a high-energy acyl-phosphate bond in 1,3-BPG. NAD+ is the electron acceptor, producing NADH.',
        regulation: [
          {
            regulatorName: 'Iodoacetate',
            regulatorType: 'allosteric-inhibitor',
            description: 'Irreversibly alkylates the active-site cysteine, poisoning the enzyme (laboratory inhibitor).',
          },
        ],
        clinicalSignificance: 'GAPDH is also implicated in apoptosis, DNA repair, and membrane fusion — moonlighting functions beyond glycolysis.',
      },
      substrates: [
        { id: 'g3p', name: 'Glyceraldehyde-3-phosphate', abbreviation: 'G3P', formula: 'C3H7O6P' },
      ],
      products: [
        { id: '1-3-bpg', name: '1,3-Bisphosphoglycerate', abbreviation: '1,3-BPG', formula: 'C3H8O10P2' },
      ],
      cofactorsConsumed: ['NAD+', 'Pi'],
      cofactorsProduced: ['NADH'],
      deltaG: 6.3,
      isReversible: true,
      isRateLimiting: false,
      detailedDescription:
        'This is the only oxidation step in glycolysis and the only step that generates NADH. The inorganic phosphate (Pi) is incorporated without ATP — this is important because it creates a high-energy acyl-phosphate bond that will drive ATP synthesis in step 7. Arsenic (arsenate) can substitute for Pi, forming an unstable product that spontaneously hydrolyzes, bypassing ATP generation at step 7.',
      clinicalSignificance: 'Arsenic poisoning: arsenate substitutes for Pi → no ATP generated at step 7. NAD+ must be regenerated (by LDH or shuttle) to keep glycolysis running.',
      mcatHighYield: true,
    },

    // ── Step 7: Phosphoglycerate Kinase ──
    {
      id: 'glycolysis-step-7',
      stepNumber: 7,
      pathwayId: 'glycolysis',
      phaseName: 'Payoff Phase',
      reactionName: 'Substrate-level Phosphorylation (1,3-BPG → 3-PG)',
      reactionType: 'substrate-level-phosphorylation',
      enzyme: {
        id: 'phosphoglycerate-kinase',
        name: 'Phosphoglycerate Kinase',
        ecNumber: 'EC 2.7.2.3',
        alternateNames: ['PGK'],
        cofactors: ['Mg2+'],
        mechanismDescription:
          'Transfers the high-energy acyl-phosphate from C-1 of 1,3-BPG to ADP, generating ATP. This is substrate-level phosphorylation (as opposed to oxidative phosphorylation in the ETC).',
        regulation: [],
        clinicalSignificance: 'PGK deficiency is X-linked and causes hemolytic anemia and neurological dysfunction.',
      },
      substrates: [
        { id: '1-3-bpg', name: '1,3-Bisphosphoglycerate', abbreviation: '1,3-BPG', formula: 'C3H8O10P2' },
      ],
      products: [
        { id: '3-pg', name: '3-Phosphoglycerate', abbreviation: '3-PG', formula: 'C3H7O7P' },
      ],
      cofactorsConsumed: ['ADP'],
      cofactorsProduced: ['ATP'],
      deltaG: -18.5,
      isReversible: true,
      isRateLimiting: false,
      detailedDescription:
        'This is the first substrate-level phosphorylation in glycolysis, directly generating ATP. Since 2 molecules of 1,3-BPG are produced per glucose, this step generates 2 ATP — breaking even with the 2 ATP invested in steps 1 and 3. Note: 1,3-BPG can also be converted to 2,3-BPG by bisphosphoglycerate mutase (important for hemoglobin O₂ affinity in RBCs).',
      clinicalSignificance: '2,3-BPG shunt: 1,3-BPG → 2,3-BPG (allosteric regulator of hemoglobin, decreases O₂ affinity, promotes O₂ release to tissues).',
      mcatHighYield: true,
    },

    // ── Step 8: Phosphoglycerate Mutase ──
    {
      id: 'glycolysis-step-8',
      stepNumber: 8,
      pathwayId: 'glycolysis',
      phaseName: 'Payoff Phase',
      reactionName: 'Isomerization of 3-PG to 2-PG',
      reactionType: 'mutase',
      enzyme: {
        id: 'phosphoglycerate-mutase',
        name: 'Phosphoglycerate Mutase',
        ecNumber: 'EC 5.4.2.11',
        alternateNames: ['PGM'],
        cofactors: [],
        mechanismDescription:
          'Transfers the phosphate group from C-3 to C-2 of phosphoglycerate via a 2,3-bisphosphoglycerate intermediate. The enzyme uses a phosphohistidine residue in its active site.',
        regulation: [],
      },
      substrates: [
        { id: '3-pg', name: '3-Phosphoglycerate', abbreviation: '3-PG', formula: 'C3H7O7P' },
      ],
      products: [
        { id: '2-pg', name: '2-Phosphoglycerate', abbreviation: '2-PG', formula: 'C3H7O7P' },
      ],
      cofactorsConsumed: [],
      cofactorsProduced: [],
      deltaG: 4.4,
      isReversible: true,
      isRateLimiting: false,
      detailedDescription:
        'This step repositions the phosphate group from C-3 to C-2, which is necessary for the subsequent dehydration by enolase. The enzyme requires catalytic amounts of 2,3-BPG to function. The reaction is near-equilibrium and freely reversible.',
      mcatHighYield: false,
    },

    // ── Step 9: Enolase ──
    {
      id: 'glycolysis-step-9',
      stepNumber: 9,
      pathwayId: 'glycolysis',
      phaseName: 'Payoff Phase',
      reactionName: 'Dehydration of 2-PG to PEP',
      reactionType: 'dehydration',
      enzyme: {
        id: 'enolase',
        name: 'Enolase',
        ecNumber: 'EC 4.2.1.11',
        cofactors: ['2 Mg2+'],
        mechanismDescription:
          'Removes a water molecule from 2-PG, creating the high-energy enol-phosphate bond in phosphoenolpyruvate (PEP). Despite a small ΔG for this step, it dramatically increases the free energy of the phosphate group, making PEP an excellent phosphoryl donor.',
        regulation: [
          {
            regulatorName: 'Fluoride (F⁻)',
            regulatorType: 'allosteric-inhibitor',
            description: 'Fluoride forms a complex with Mg2+ and phosphate, inhibiting enolase. This is why fluoride is used in blood collection tubes to preserve glucose levels.',
          },
        ],
        clinicalSignificance: 'Enolase is inhibited by fluoride — important in clinical blood glucose measurement. Neuron-specific enolase (NSE) is a tumor marker for small cell lung cancer and neuroblastoma.',
      },
      substrates: [
        { id: '2-pg', name: '2-Phosphoglycerate', abbreviation: '2-PG', formula: 'C3H7O7P' },
      ],
      products: [
        { id: 'pep', name: 'Phosphoenolpyruvate', abbreviation: 'PEP', formula: 'C3H5O6P' },
      ],
      cofactorsConsumed: [],
      cofactorsProduced: ['H2O'],
      deltaG: -3.2,
      isReversible: true,
      isRateLimiting: false,
      detailedDescription:
        'Enolase removes water to create PEP, which has the highest phosphoryl transfer potential of any common biological molecule (ΔG°\' of hydrolysis = -61.9 kJ/mol). This sets up the large energy release in step 10. The Mg2+ cofactors are essential — fluoride inhibits by chelating them.',
      clinicalSignificance: 'Fluoride in blood tubes inhibits enolase to prevent glycolysis from consuming glucose ex vivo. NSE is a clinical tumor marker.',
      mcatHighYield: true,
    },

    // ── Step 10: Pyruvate Kinase ──
    {
      id: 'glycolysis-step-10',
      stepNumber: 10,
      pathwayId: 'glycolysis',
      phaseName: 'Payoff Phase',
      reactionName: 'Substrate-level Phosphorylation (PEP → Pyruvate)',
      reactionType: 'substrate-level-phosphorylation',
      enzyme: {
        id: 'pyruvate-kinase',
        name: 'Pyruvate Kinase',
        ecNumber: 'EC 2.7.1.40',
        alternateNames: ['PK'],
        cofactors: ['Mg2+', 'K+'],
        mechanismDescription:
          'Transfers the phosphoryl group from PEP to ADP, generating ATP and pyruvate. The enol form of pyruvate spontaneously tautomerizes to the more stable keto form, making the reaction irreversible.',
        regulation: [
          {
            regulatorName: 'Fructose-1,6-bisphosphate',
            regulatorType: 'feedforward-activation',
            description: 'F-1,6-BP (product of PFK-1) activates pyruvate kinase — a feedforward activation that coordinates flux through glycolysis.',
          },
          {
            regulatorName: 'ATP',
            regulatorType: 'allosteric-inhibitor',
            description: 'High energy charge inhibits further ATP production.',
          },
          {
            regulatorName: 'Alanine',
            regulatorType: 'allosteric-inhibitor',
            description: 'Alanine signals abundant pyruvate (since alanine is made from pyruvate by transamination).',
          },
          {
            regulatorName: 'Glucagon (liver)',
            regulatorType: 'covalent-modification',
            description: 'Glucagon → cAMP → PKA phosphorylates liver pyruvate kinase, inactivating it. This diverts PEP toward gluconeogenesis.',
            tissueSpecific: 'Liver',
          },
          {
            regulatorName: 'Insulin',
            regulatorType: 'hormonal',
            description: 'Insulin induces transcription of pyruvate kinase gene, increasing enzyme levels in the fed state.',
          },
        ],
        tissueVariants: [
          {
            tissue: 'Liver',
            isoformName: 'L-PK (Pyruvate Kinase L)',
            differenceDescription: 'Subject to covalent modification by PKA (phosphorylation inactivates it). This allows glucagon to shut down glycolysis in liver.',
          },
          {
            tissue: 'Muscle/Brain',
            isoformName: 'M-PK (Pyruvate Kinase M)',
            differenceDescription: 'Not regulated by phosphorylation. Muscle glycolysis is not directly regulated by glucagon.',
          },
        ],
        clinicalSignificance:
          'Pyruvate kinase deficiency is the most common glycolytic enzyme deficiency. Causes chronic hemolytic anemia (RBCs lack mitochondria, depend entirely on glycolysis). Autosomal recessive.',
      },
      substrates: [
        { id: 'pep', name: 'Phosphoenolpyruvate', abbreviation: 'PEP', formula: 'C3H5O6P' },
      ],
      products: [
        { id: 'pyruvate', name: 'Pyruvate', abbreviation: 'Pyr', formula: 'C3H4O3' },
      ],
      cofactorsConsumed: ['ADP'],
      cofactorsProduced: ['ATP'],
      deltaG: -31.4,
      isReversible: false,
      isRateLimiting: true,
      detailedDescription:
        'The final step of glycolysis generates ATP via substrate-level phosphorylation and produces pyruvate. The reaction is irreversible due to the spontaneous tautomerization of enol-pyruvate to keto-pyruvate. In gluconeogenesis, this step is bypassed by two enzymes: pyruvate carboxylase (pyruvate → oxaloacetate) and PEPCK (oxaloacetate → PEP). Pyruvate kinase is also subject to feedforward activation by F-1,6-BP, coupling the committed step (PFK-1) to the final step.',
      clinicalSignificance:
        'PK deficiency → chronic hemolytic anemia. Most common cause of hereditary non-spherocytic hemolytic anemia after G6PD deficiency.',
      mcatHighYield: true,
    },
  ],
};

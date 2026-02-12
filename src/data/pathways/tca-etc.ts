import type { Pathway } from '../types';

export const tcaEtcPathway: Pathway = {
  id: 'tca-etc',
  name: 'TCA Cycle + Electron Transport Chain',
  description:
    'The citric acid cycle (Krebs cycle) completely oxidizes acetyl-CoA to CO2, generating NADH and FADH2. These electron carriers feed into the electron transport chain (ETC), which couples electron transfer to O2 with proton pumping across the inner mitochondrial membrane, driving ATP synthesis via oxidative phosphorylation. Together, they account for the vast majority of ATP produced from glucose.',
  location: 'Mitochondria',
  netEquation:
    'Acetyl-CoA + 3 NAD+ + FAD + GDP + Pi + 2 H2O → 2 CO2 + 3 NADH + FADH2 + GTP + CoA-SH; Total per glucose via ETC: ~30–32 ATP',
  energySummary: {
    atpConsumed: 0,
    atpProduced: 0,
    gtpProduced: 2,
    nadhProduced: 10,
    fadh2Produced: 2,
    netAtp: 30,
    co2Produced: 6,
  },
  connections: [
    {
      targetPathwayId: 'glycolysis',
      connectionDescription:
        'Pyruvate from glycolysis enters the mitochondria and is converted to acetyl-CoA by pyruvate dehydrogenase complex',
      sharedMetabolite: 'Pyruvate',
    },
    {
      targetPathwayId: 'gluconeogenesis',
      connectionDescription:
        'OAA from TCA cycle can be converted to PEP by PEPCK for gluconeogenesis. Acetyl-CoA cannot be used for net glucose synthesis.',
      sharedMetabolite: 'Oxaloacetate',
    },
    {
      targetPathwayId: 'fatty-acid-synthesis',
      connectionDescription:
        'Citrate is exported to cytoplasm via the citrate shuttle and cleaved by ATP-citrate lyase to provide acetyl-CoA for fatty acid synthesis',
      sharedMetabolite: 'Citrate',
    },
    {
      targetPathwayId: 'beta-oxidation',
      connectionDescription:
        'Beta-oxidation of fatty acids generates acetyl-CoA, NADH, and FADH2 that feed directly into TCA cycle and ETC',
      sharedMetabolite: 'Acetyl-CoA',
    },
    {
      targetPathwayId: 'ketone-metabolism',
      connectionDescription:
        'Excess acetyl-CoA in liver (from beta-oxidation when OAA is depleted) is diverted to ketone body synthesis',
      sharedMetabolite: 'Acetyl-CoA',
    },
    {
      targetPathwayId: 'pentose-phosphate',
      connectionDescription:
        'NADPH from PPP is not directly linked, but both pathways share regulation by the energy/redox state of the cell',
      sharedMetabolite: 'NADPH (redox balance)',
    },
  ],
  mcatKeyPoints: [
    'PDH is irreversible — acetyl-CoA cannot be converted back to pyruvate, so fatty acids cannot be used for net glucose synthesis',
    'PDH and α-ketoglutarate dehydrogenase share the same 5 cofactors: TPP (B1), lipoic acid, CoA (B5), FAD (B2), NAD+ (B3) — mnemonic: "Tender Loving Care For Nancy"',
    'Mnemonic for TCA intermediates: "Can I Keep Selling Succinate For Money" (Citrate, Isocitrate, α-Ketoglutarate, Succinyl-CoA, Succinate, Fumarate, Malate, Oxaloacetate)',
    'Isocitrate dehydrogenase is the rate-limiting enzyme of the TCA cycle (activated by ADP, inhibited by ATP and NADH)',
    'Succinate dehydrogenase (Complex II) is the only TCA enzyme embedded in the inner mitochondrial membrane and the only complex that does NOT pump protons',
    'Fluoroacetate poisoning: converted to fluorocitrate which inhibits aconitase, blocking the TCA cycle',
    'Malonate competitively inhibits succinate dehydrogenase (structural analog of succinate)',
    'Per acetyl-CoA turn: 3 NADH, 1 FADH2, 1 GTP, 2 CO2',
    'P/O ratios: NADH ≈ 2.5 ATP (via Complex I), FADH2 ≈ 1.5 ATP (via Complex II)',
    'ETC inhibitors: rotenone/barbiturates (Complex I), antimycin A (Complex III), cyanide/CO/H2S (Complex IV), oligomycin (Complex V/ATP synthase)',
    'Uncouplers (DNP, thermogenin/UCP1 in brown fat) dissipate the proton gradient as heat WITHOUT inhibiting electron transport — ETC runs faster but no ATP is made',
    'Total ATP per glucose: ~30–32 (varies by shuttle used: malate-aspartate shuttle yields ~32, glycerol-3-phosphate shuttle yields ~30)',
    'Arsenic inhibits PDH complex (binds lipoic acid), blocking entry of acetyl-CoA into TCA cycle',
    'Substrate-level phosphorylation occurs at succinyl-CoA synthetase (GTP); all other ATP comes from oxidative phosphorylation via ETC',
  ],
  steps: [
    // ── Step 0: Pyruvate Dehydrogenase Complex (Linking Reaction) ──
    {
      id: 'tca-etc-step-0',
      stepNumber: 0,
      pathwayId: 'tca-etc',
      phaseName: 'Linking Reaction',
      reactionName: 'Oxidative Decarboxylation of Pyruvate',
      reactionType: 'oxidative-decarboxylation',
      enzyme: {
        id: 'pyruvate-dehydrogenase-complex',
        name: 'Pyruvate Dehydrogenase Complex',
        alternateNames: ['PDH Complex', 'PDC'],
        cofactors: ['TPP (B1)', 'Lipoic acid', 'CoA (B5)', 'FAD (B2)', 'NAD+ (B3)'],
        mechanismDescription:
          'A multi-enzyme complex of three enzymes (E1: pyruvate dehydrogenase, E2: dihydrolipoyl transacetylase, E3: dihydrolipoyl dehydrogenase) that catalyzes the irreversible oxidative decarboxylation of pyruvate. E1 uses TPP to decarboxylate pyruvate, E2 transfers the acetyl group to CoA via lipoic acid, and E3 regenerates oxidized lipoamide using FAD and NAD+.',
        regulation: [
          {
            regulatorName: 'Pyruvate',
            regulatorType: 'allosteric-activator',
            description: 'Substrate availability drives the reaction forward.',
          },
          {
            regulatorName: 'CoA (free)',
            regulatorType: 'allosteric-activator',
            description: 'Free CoA indicates capacity to accept acetyl groups.',
          },
          {
            regulatorName: 'NAD+',
            regulatorType: 'allosteric-activator',
            description: 'Oxidized NAD+ signals need for NADH production.',
          },
          {
            regulatorName: 'ADP',
            regulatorType: 'allosteric-activator',
            description: 'Low energy charge activates PDH to increase energy production.',
          },
          {
            regulatorName: 'Ca2+',
            regulatorType: 'allosteric-activator',
            description:
              'Calcium activates PDH phosphatase, which dephosphorylates and activates PDH. Important in exercising muscle.',
          },
          {
            regulatorName: 'Acetyl-CoA',
            regulatorType: 'product-inhibition',
            description: 'Product inhibition signals sufficient acetyl-CoA.',
          },
          {
            regulatorName: 'NADH',
            regulatorType: 'product-inhibition',
            description: 'High NADH/NAD+ ratio inhibits PDH, signaling reduced carriers are abundant.',
          },
          {
            regulatorName: 'ATP',
            regulatorType: 'covalent-modification',
            description:
              'ATP activates PDH kinase, which phosphorylates and inactivates the PDH complex. High energy charge shuts down pyruvate oxidation.',
          },
        ],
        clinicalSignificance:
          'Arsenic poisoning: arsenic binds to lipoic acid in the PDH complex, inhibiting the enzyme and blocking acetyl-CoA production. PDH deficiency causes lactic acidosis and neurological defects. Thiamine (B1) deficiency impairs PDH (and α-KGDH), contributing to Wernicke-Korsakoff syndrome in alcoholics.',
      },
      substrates: [
        { id: 'pyruvate', name: 'Pyruvate', abbreviation: 'Pyr', formula: 'C3H4O3' },
        { id: 'coa-free', name: 'Coenzyme A', abbreviation: 'CoA-SH', formula: 'C21H36N7O16P3S' },
      ],
      products: [
        { id: 'acetyl-coa', name: 'Acetyl-CoA', abbreviation: 'Ac-CoA', formula: 'C23H38N7O17P3S' },
        { id: 'co2-pdh', name: 'Carbon Dioxide', abbreviation: 'CO2', formula: 'CO2' },
      ],
      cofactorsConsumed: ['NAD+'],
      cofactorsProduced: ['NADH', 'CO2'],
      deltaG: -33.4,
      isReversible: false,
      isRateLimiting: false,
      detailedDescription:
        'The pyruvate dehydrogenase complex links glycolysis to the TCA cycle by irreversibly converting pyruvate to acetyl-CoA. This is a critical regulatory point: because this reaction is irreversible, acetyl-CoA (and therefore fatty acids) CANNOT be used for net glucose synthesis in mammals. The complex requires 5 cofactors derived from vitamins: TPP (thiamine/B1), lipoic acid, CoA (pantothenate/B5), FAD (riboflavin/B2), and NAD+ (niacin/B3). Regulation occurs by phosphorylation/dephosphorylation: PDH kinase inactivates the complex (stimulated by ATP, acetyl-CoA, NADH), while PDH phosphatase activates it (stimulated by Ca2+, insulin).',
      clinicalSignificance:
        'Arsenic binds lipoic acid, inhibiting PDH and α-KGDH. Thiamine deficiency → impaired PDH → lactic acidosis, Wernicke-Korsakoff syndrome. PDH deficiency is X-linked and presents with lactic acidosis and neurological dysfunction.',
      mcatHighYield: true,
    },

    // ── Step 1: Citrate Synthase ──
    {
      id: 'tca-etc-step-1',
      stepNumber: 1,
      pathwayId: 'tca-etc',
      phaseName: 'TCA Cycle',
      reactionName: 'Condensation of Acetyl-CoA with OAA to form Citrate',
      reactionType: 'condensation',
      enzyme: {
        id: 'citrate-synthase',
        name: 'Citrate Synthase',
        ecNumber: 'EC 2.3.3.1',
        cofactors: [],
        mechanismDescription:
          'Catalyzes the aldol condensation of the acetyl group of acetyl-CoA with oxaloacetate, followed by hydrolysis of the thioester bond to release CoA-SH and drive the reaction forward. The reaction proceeds through a citryl-CoA intermediate.',
        regulation: [
          {
            regulatorName: 'ATP',
            regulatorType: 'allosteric-inhibitor',
            description: 'High energy charge reduces TCA cycle flux.',
          },
          {
            regulatorName: 'NADH',
            regulatorType: 'allosteric-inhibitor',
            description: 'High NADH/NAD+ ratio signals sufficient reducing equivalents.',
          },
          {
            regulatorName: 'Succinyl-CoA',
            regulatorType: 'allosteric-inhibitor',
            description: 'Downstream product inhibition prevents cycle overload.',
          },
          {
            regulatorName: 'Citrate',
            regulatorType: 'product-inhibition',
            description: 'Product inhibition when citrate accumulates.',
          },
        ],
        clinicalSignificance:
          'Citrate synthase activity is used as a marker for intact mitochondria in research. Citrate is exported to cytoplasm for fatty acid synthesis.',
      },
      substrates: [
        { id: 'acetyl-coa', name: 'Acetyl-CoA', abbreviation: 'Ac-CoA', formula: 'C23H38N7O17P3S' },
        { id: 'oxaloacetate', name: 'Oxaloacetate', abbreviation: 'OAA', formula: 'C4H4O5' },
      ],
      products: [
        { id: 'citrate', name: 'Citrate', abbreviation: 'Cit', formula: 'C6H8O7' },
        { id: 'coa-sh-cs', name: 'Coenzyme A', abbreviation: 'CoA-SH', formula: 'C21H36N7O16P3S' },
      ],
      cofactorsConsumed: [],
      cofactorsProduced: [],
      deltaG: -31.4,
      isReversible: false,
      isRateLimiting: false,
      detailedDescription:
        'Citrate synthase catalyzes the first step of the TCA cycle, combining the 2-carbon acetyl group from acetyl-CoA with the 4-carbon oxaloacetate to form the 6-carbon citrate. The hydrolysis of the CoA thioester bond releases significant free energy, making this reaction essentially irreversible under physiological conditions. OAA availability is a key factor controlling TCA cycle flux.',
      clinicalSignificance:
        'Citrate can be exported to the cytoplasm via the citrate shuttle for fatty acid synthesis. Citrate also inhibits PFK-1, linking TCA cycle status to glycolytic flux.',
      mcatHighYield: true,
    },

    // ── Step 2: Aconitase ──
    {
      id: 'tca-etc-step-2',
      stepNumber: 2,
      pathwayId: 'tca-etc',
      phaseName: 'TCA Cycle',
      reactionName: 'Isomerization of Citrate to Isocitrate',
      reactionType: 'isomerization',
      enzyme: {
        id: 'aconitase',
        name: 'Aconitase',
        ecNumber: 'EC 4.2.1.3',
        cofactors: ['Fe-S cluster'],
        mechanismDescription:
          'Catalyzes the reversible isomerization of citrate to isocitrate through a dehydration/rehydration mechanism via the intermediate cis-aconitate. The iron-sulfur cluster is essential for binding and positioning the substrate.',
        regulation: [
          {
            regulatorName: 'Fluoroacetate',
            regulatorType: 'allosteric-inhibitor',
            description:
              'Fluoroacetate is converted to fluorocitrate, which is a potent inhibitor of aconitase. This is the mechanism of fluoroacetate poisoning (used as a rodenticide).',
          },
        ],
        clinicalSignificance:
          'Aconitase also functions as an iron regulatory protein (IRP1) when iron is low — it loses its Fe-S cluster and binds iron-responsive elements (IREs) on mRNA, regulating iron metabolism genes. Fluoroacetate poisoning blocks the TCA cycle at this step.',
      },
      substrates: [
        { id: 'citrate', name: 'Citrate', abbreviation: 'Cit', formula: 'C6H8O7' },
      ],
      products: [
        { id: 'isocitrate', name: 'Isocitrate', abbreviation: 'IsoCit', formula: 'C6H8O7' },
      ],
      cofactorsConsumed: [],
      cofactorsProduced: [],
      deltaG: 6.3,
      isReversible: true,
      isRateLimiting: false,
      detailedDescription:
        'Aconitase isomerizes citrate to isocitrate via the intermediate cis-aconitate. This involves removal of water (dehydration) to form cis-aconitate, followed by re-addition of water (rehydration) in a different orientation to form isocitrate. The reaction is near-equilibrium and freely reversible. The Fe-S cluster is critical for catalysis and also makes aconitase sensitive to oxidative stress (reactive oxygen species can damage the cluster).',
      clinicalSignificance:
        'Fluoroacetate (compound 1080) is metabolized to fluorocitrate, which irreversibly inhibits aconitase — used as a rodenticide. Aconitase moonlights as IRP1 for iron homeostasis.',
      mcatHighYield: true,
    },

    // ── Step 3: Isocitrate Dehydrogenase ──
    {
      id: 'tca-etc-step-3',
      stepNumber: 3,
      pathwayId: 'tca-etc',
      phaseName: 'TCA Cycle',
      reactionName: 'Oxidative Decarboxylation of Isocitrate',
      reactionType: 'oxidative-decarboxylation',
      enzyme: {
        id: 'isocitrate-dehydrogenase',
        name: 'Isocitrate Dehydrogenase',
        ecNumber: 'EC 1.1.1.41',
        alternateNames: ['IDH'],
        cofactors: ['NAD+', 'Mn2+'],
        mechanismDescription:
          'Catalyzes the oxidative decarboxylation of isocitrate to α-ketoglutarate. First, isocitrate is oxidized to oxalosuccinate (with NAD+ → NADH), then oxalosuccinate is decarboxylated to α-ketoglutarate with release of CO2.',
        regulation: [
          {
            regulatorName: 'ADP',
            regulatorType: 'allosteric-activator',
            description: 'Low energy charge (high ADP) stimulates the TCA cycle to produce more NADH/FADH2 for ATP generation.',
          },
          {
            regulatorName: 'Ca2+',
            regulatorType: 'allosteric-activator',
            description: 'Calcium signaling during muscle contraction activates IDH to increase energy production.',
          },
          {
            regulatorName: 'ATP',
            regulatorType: 'allosteric-inhibitor',
            description: 'High energy charge inhibits the rate-limiting step of TCA cycle.',
          },
          {
            regulatorName: 'NADH',
            regulatorType: 'allosteric-inhibitor',
            description: 'High NADH/NAD+ ratio signals sufficient reducing equivalents; slows cycle.',
          },
        ],
        clinicalSignificance:
          'IDH1 and IDH2 mutations are found in gliomas and AML, producing the oncometabolite 2-hydroxyglutarate (2-HG) instead of α-ketoglutarate, which alters epigenetics and promotes tumorigenesis.',
      },
      substrates: [
        { id: 'isocitrate', name: 'Isocitrate', abbreviation: 'IsoCit', formula: 'C6H8O7' },
      ],
      products: [
        { id: 'alpha-ketoglutarate', name: 'α-Ketoglutarate', abbreviation: 'α-KG', formula: 'C5H6O5' },
        { id: 'co2-idh', name: 'Carbon Dioxide', abbreviation: 'CO2', formula: 'CO2' },
      ],
      cofactorsConsumed: ['NAD+'],
      cofactorsProduced: ['NADH', 'CO2'],
      deltaG: -20.9,
      isReversible: false,
      isRateLimiting: true,
      detailedDescription:
        'This is the RATE-LIMITING STEP of the TCA cycle. Isocitrate dehydrogenase (NAD+-dependent, mitochondrial IDH3) catalyzes the first oxidative decarboxylation, producing the first NADH and first CO2 of the cycle. The enzyme is tightly regulated by the energy charge of the cell: ADP activates it (need more ATP), while ATP and NADH inhibit it (energy is sufficient). This step controls the overall flux through the TCA cycle.',
      clinicalSignificance:
        'Mutant IDH1/IDH2 in gliomas and AML produce 2-hydroxyglutarate (2-HG), an oncometabolite that inhibits α-KG-dependent dioxygenases, altering DNA and histone methylation. IDH inhibitors (e.g., ivosidenib) are used in cancer treatment.',
      mcatHighYield: true,
    },

    // ── Step 4: α-Ketoglutarate Dehydrogenase ──
    {
      id: 'tca-etc-step-4',
      stepNumber: 4,
      pathwayId: 'tca-etc',
      phaseName: 'TCA Cycle',
      reactionName: 'Oxidative Decarboxylation of α-Ketoglutarate',
      reactionType: 'oxidative-decarboxylation',
      enzyme: {
        id: 'alpha-ketoglutarate-dehydrogenase',
        name: 'α-Ketoglutarate Dehydrogenase Complex',
        ecNumber: 'EC 1.2.4.2',
        alternateNames: ['α-KGDH Complex', 'Oxoglutarate Dehydrogenase'],
        cofactors: ['TPP (B1)', 'Lipoic acid', 'CoA (B5)', 'FAD (B2)', 'NAD+ (B3)'],
        mechanismDescription:
          'Structurally and mechanistically homologous to the pyruvate dehydrogenase complex. Catalyzes the oxidative decarboxylation of α-ketoglutarate to succinyl-CoA using the same 5 cofactors (TPP, lipoic acid, CoA, FAD, NAD+) and similar E1-E2-E3 subunit architecture.',
        regulation: [
          {
            regulatorName: 'Succinyl-CoA',
            regulatorType: 'product-inhibition',
            description: 'Product inhibition by succinyl-CoA.',
          },
          {
            regulatorName: 'NADH',
            regulatorType: 'product-inhibition',
            description: 'High NADH/NAD+ ratio inhibits the complex.',
          },
          {
            regulatorName: 'Ca2+',
            regulatorType: 'allosteric-activator',
            description: 'Calcium stimulates the complex during muscle contraction.',
          },
          {
            regulatorName: 'ADP',
            regulatorType: 'allosteric-activator',
            description: 'Low energy charge activates the enzyme.',
          },
        ],
        clinicalSignificance:
          'Uses the same cofactors as PDH, so thiamine (B1) deficiency impairs both. Arsenic also inhibits α-KGDH (binds lipoic acid). Deficiency contributes to neurodegeneration.',
      },
      substrates: [
        { id: 'alpha-ketoglutarate', name: 'α-Ketoglutarate', abbreviation: 'α-KG', formula: 'C5H6O5' },
        { id: 'coa-free-kgdh', name: 'Coenzyme A', abbreviation: 'CoA-SH', formula: 'C21H36N7O16P3S' },
      ],
      products: [
        { id: 'succinyl-coa', name: 'Succinyl-CoA', abbreviation: 'Suc-CoA', formula: 'C25H40N7O19P3S' },
        { id: 'co2-kgdh', name: 'Carbon Dioxide', abbreviation: 'CO2', formula: 'CO2' },
      ],
      cofactorsConsumed: ['NAD+'],
      cofactorsProduced: ['NADH', 'CO2'],
      deltaG: -33.5,
      isReversible: false,
      isRateLimiting: false,
      detailedDescription:
        'This is the second oxidative decarboxylation in the TCA cycle, producing the second CO2 and second NADH. The α-ketoglutarate dehydrogenase complex is structurally and functionally analogous to the PDH complex — both are large multi-enzyme complexes requiring the same 5 cofactors (TPP, lipoic acid, CoA, FAD, NAD+). This is a high-yield MCAT connection. Like PDH, it is irreversible and inhibited by its products (succinyl-CoA, NADH). After this step, the two carbons from acetyl-CoA have been fully oxidized to 2 CO2.',
      clinicalSignificance:
        'Thiamine deficiency impairs both PDH and α-KGDH. Arsenic binds lipoic acid in both complexes. α-KGDH dysfunction is implicated in neurodegenerative diseases.',
      mcatHighYield: true,
    },

    // ── Step 5: Succinyl-CoA Synthetase ──
    {
      id: 'tca-etc-step-5',
      stepNumber: 5,
      pathwayId: 'tca-etc',
      phaseName: 'TCA Cycle',
      reactionName: 'Substrate-level Phosphorylation (Succinyl-CoA → Succinate)',
      reactionType: 'substrate-level-phosphorylation',
      enzyme: {
        id: 'succinyl-coa-synthetase',
        name: 'Succinyl-CoA Synthetase',
        ecNumber: 'EC 6.2.1.4',
        alternateNames: ['Succinate Thiokinase'],
        cofactors: ['Pi', 'GDP (or ADP)'],
        mechanismDescription:
          'Cleaves the high-energy thioester bond of succinyl-CoA, coupling the energy release to the phosphorylation of GDP → GTP (or ADP → ATP depending on isoform). This is substrate-level phosphorylation, the only one in the TCA cycle.',
        regulation: [],
        clinicalSignificance:
          'The GTP produced can be converted to ATP by nucleoside diphosphate kinase (GTP + ADP → GDP + ATP). This is the only substrate-level phosphorylation in the TCA cycle.',
      },
      substrates: [
        { id: 'succinyl-coa', name: 'Succinyl-CoA', abbreviation: 'Suc-CoA', formula: 'C25H40N7O19P3S' },
      ],
      products: [
        { id: 'succinate', name: 'Succinate', abbreviation: 'Succ', formula: 'C4H6O4' },
        { id: 'coa-sh-scs', name: 'Coenzyme A', abbreviation: 'CoA-SH', formula: 'C21H36N7O16P3S' },
      ],
      cofactorsConsumed: ['GDP', 'Pi'],
      cofactorsProduced: ['GTP'],
      deltaG: -2.9,
      isReversible: true,
      isRateLimiting: false,
      detailedDescription:
        'This is the only substrate-level phosphorylation in the TCA cycle. The high-energy thioester bond of succinyl-CoA is cleaved, and the released energy drives the phosphorylation of GDP to GTP. The GTP is energetically equivalent to ATP and can be interconverted by nucleoside diphosphate kinase. In some tissues, an ADP-specific isoform directly produces ATP. This step parallels the substrate-level phosphorylation reactions in glycolysis (steps 7 and 10).',
      clinicalSignificance:
        'Succinyl-CoA is also a precursor for heme synthesis (condensation with glycine by ALA synthase). Succinyl-CoA synthetase deficiency can cause mitochondrial DNA depletion syndrome.',
      mcatHighYield: true,
    },

    // ── Step 6: Succinate Dehydrogenase ──
    {
      id: 'tca-etc-step-6',
      stepNumber: 6,
      pathwayId: 'tca-etc',
      phaseName: 'TCA Cycle',
      reactionName: 'Oxidation of Succinate to Fumarate',
      reactionType: 'oxidation',
      enzyme: {
        id: 'succinate-dehydrogenase',
        name: 'Succinate Dehydrogenase',
        ecNumber: 'EC 1.3.5.1',
        alternateNames: ['SDH', 'Complex II of ETC'],
        cofactors: ['FAD', 'Fe-S clusters'],
        mechanismDescription:
          'Oxidizes succinate to fumarate by removing two hydrogen atoms (trans elimination), reducing enzyme-bound FAD to FADH2. The electrons are then transferred through iron-sulfur clusters to ubiquinone in the ETC. This is the only TCA enzyme embedded in the inner mitochondrial membrane.',
        regulation: [
          {
            regulatorName: 'Malonate',
            regulatorType: 'allosteric-inhibitor',
            description:
              'Malonate is a competitive inhibitor of SDH — it is a structural analog of succinate (dicarboxylic acid with one fewer CH2 group) and binds the active site without being oxidized.',
          },
          {
            regulatorName: 'Oxaloacetate',
            regulatorType: 'allosteric-inhibitor',
            description: 'OAA inhibits SDH, helping regulate cycle flux.',
          },
        ],
        clinicalSignificance:
          'SDH mutations (loss of function) are associated with paragangliomas and pheochromocytomas. Succinate accumulation acts as an oncometabolite, inhibiting prolyl hydroxylases and stabilizing HIF-1α. Complex II is also unique because it does NOT pump protons.',
      },
      substrates: [
        { id: 'succinate', name: 'Succinate', abbreviation: 'Succ', formula: 'C4H6O4' },
      ],
      products: [
        { id: 'fumarate', name: 'Fumarate', abbreviation: 'Fum', formula: 'C4H4O4' },
      ],
      cofactorsConsumed: ['FAD'],
      cofactorsProduced: ['FADH2'],
      deltaG: 0.0,
      isReversible: true,
      isRateLimiting: false,
      detailedDescription:
        'Succinate dehydrogenase is unique among TCA cycle enzymes for two reasons: (1) it is the only enzyme directly embedded in the inner mitochondrial membrane (all other TCA enzymes are in the matrix), and (2) it uses FAD rather than NAD+ as the electron acceptor, producing FADH2 instead of NADH. SDH is also Complex II of the electron transport chain — FADH2 electrons are passed directly to ubiquinone, bypassing Complex I. Because it enters the ETC at ubiquinone (not at Complex I), FADH2 yields only ~1.5 ATP compared to ~2.5 for NADH.',
      clinicalSignificance:
        'Malonate (competitive inhibitor) is a classic example of competitive inhibition for MCAT. SDH mutations cause hereditary paraganglioma-pheochromocytoma syndromes via succinate-driven pseudohypoxia.',
      mcatHighYield: true,
    },

    // ── Step 7: Fumarase ──
    {
      id: 'tca-etc-step-7',
      stepNumber: 7,
      pathwayId: 'tca-etc',
      phaseName: 'TCA Cycle',
      reactionName: 'Hydration of Fumarate to Malate',
      reactionType: 'hydration',
      enzyme: {
        id: 'fumarase',
        name: 'Fumarase',
        ecNumber: 'EC 4.2.1.2',
        alternateNames: ['Fumarate Hydratase'],
        cofactors: [],
        mechanismDescription:
          'Catalyzes the stereospecific trans-addition of water across the double bond of fumarate to produce L-malate. The enzyme is highly specific for the trans addition, producing only the L-stereoisomer.',
        regulation: [],
        clinicalSignificance:
          'Fumarase deficiency causes fumaric aciduria (severe neurological impairment). Fumarate hydratase mutations are associated with hereditary leiomyomatosis and renal cell cancer (HLRCC) — fumarate accumulates and acts as an oncometabolite similar to succinate.',
      },
      substrates: [
        { id: 'fumarate', name: 'Fumarate', abbreviation: 'Fum', formula: 'C4H4O4' },
        { id: 'water-fum', name: 'Water', abbreviation: 'H2O', formula: 'H2O' },
      ],
      products: [
        { id: 'malate', name: 'L-Malate', abbreviation: 'Mal', formula: 'C4H6O5' },
      ],
      cofactorsConsumed: [],
      cofactorsProduced: [],
      deltaG: -3.8,
      isReversible: true,
      isRateLimiting: false,
      detailedDescription:
        'Fumarase catalyzes a simple hydration reaction, adding water across the double bond of fumarate to form L-malate. This near-equilibrium reaction is freely reversible. Fumarase also participates in the urea cycle (fumarate is produced when argininosuccinate is cleaved, linking the TCA cycle to nitrogen metabolism).',
      clinicalSignificance:
        'Fumarase deficiency causes fumaric aciduria. Fumarate hydratase loss is linked to HLRCC (hereditary leiomyomatosis and renal cell cancer).',
      mcatHighYield: false,
    },

    // ── Step 8: Malate Dehydrogenase ──
    {
      id: 'tca-etc-step-8',
      stepNumber: 8,
      pathwayId: 'tca-etc',
      phaseName: 'TCA Cycle',
      reactionName: 'Oxidation of Malate to Oxaloacetate',
      reactionType: 'oxidation',
      enzyme: {
        id: 'malate-dehydrogenase',
        name: 'Malate Dehydrogenase',
        ecNumber: 'EC 1.1.1.37',
        alternateNames: ['MDH'],
        cofactors: ['NAD+'],
        mechanismDescription:
          'Oxidizes L-malate to oxaloacetate, reducing NAD+ to NADH. This regenerates OAA so it can condense with another acetyl-CoA in step 1, completing the cycle.',
        regulation: [],
        clinicalSignificance:
          'The equilibrium strongly favors malate, but the reaction is pulled forward by the very favorable citrate synthase reaction (step 1) consuming OAA. The malate-aspartate shuttle uses cytoplasmic and mitochondrial MDH isoforms to transfer NADH equivalents into the mitochondria.',
      },
      substrates: [
        { id: 'malate', name: 'L-Malate', abbreviation: 'Mal', formula: 'C4H6O5' },
      ],
      products: [
        { id: 'oxaloacetate', name: 'Oxaloacetate', abbreviation: 'OAA', formula: 'C4H4O5' },
      ],
      cofactorsConsumed: ['NAD+'],
      cofactorsProduced: ['NADH'],
      deltaG: 29.7,
      isReversible: true,
      isRateLimiting: false,
      detailedDescription:
        'The final step of the TCA cycle regenerates oxaloacetate by oxidizing malate, producing the third NADH of the cycle (per acetyl-CoA). Although the standard free energy change is highly unfavorable (+29.7 kJ/mol), the reaction is driven forward by the rapid removal of OAA by citrate synthase (step 1) and NADH by the electron transport chain. This coupling is a classic example of Le Chatelier\'s principle applied to metabolism. MDH also participates in the malate-aspartate shuttle for transferring NADH equivalents from cytoplasm to mitochondria.',
      clinicalSignificance:
        'MDH is part of the malate-aspartate shuttle (the more efficient shuttle for cytoplasmic NADH). Both cytoplasmic and mitochondrial isoforms exist.',
      mcatHighYield: true,
    },

    // ── Step 9: Complex I (NADH Dehydrogenase) ──
    {
      id: 'tca-etc-step-9',
      stepNumber: 9,
      pathwayId: 'tca-etc',
      phaseName: 'Electron Transport Chain',
      reactionName: 'NADH Oxidation and Proton Pumping (Complex I)',
      reactionType: 'oxidation',
      enzyme: {
        id: 'complex-i',
        name: 'NADH Dehydrogenase (Complex I)',
        alternateNames: ['NADH:Ubiquinone Oxidoreductase', 'Complex I'],
        cofactors: ['FMN', 'Fe-S clusters'],
        mechanismDescription:
          'The largest ETC complex. Accepts electrons from NADH, passes them through FMN and a series of iron-sulfur clusters, and ultimately reduces ubiquinone (CoQ) to ubiquinol (QH2). The energy released is coupled to pumping 4 H+ from the matrix to the intermembrane space.',
        regulation: [
          {
            regulatorName: 'Rotenone',
            regulatorType: 'allosteric-inhibitor',
            description:
              'Rotenone (a pesticide from plants) blocks electron transfer from Fe-S clusters to ubiquinone, halting Complex I and preventing NADH-linked respiration.',
          },
          {
            regulatorName: 'Barbiturates (Amytal)',
            regulatorType: 'allosteric-inhibitor',
            description: 'Barbiturates such as amobarbital inhibit Complex I similarly to rotenone.',
          },
          {
            regulatorName: 'Piericidin A',
            regulatorType: 'allosteric-inhibitor',
            description: 'A natural product that acts as a ubiquinone analog, blocking the CoQ binding site of Complex I.',
          },
        ],
        clinicalSignificance:
          'Leber hereditary optic neuropathy (LHON) is caused by mutations in mitochondrial DNA encoding Complex I subunits. Rotenone exposure is linked to Parkinson disease in epidemiological studies (damages dopaminergic neurons). Complex I is the largest source of mitochondrial reactive oxygen species (ROS).',
      },
      substrates: [
        { id: 'nadh-ci', name: 'NADH', abbreviation: 'NADH', formula: 'C21H29N7O14P2' },
        { id: 'ubiquinone-ci', name: 'Ubiquinone', abbreviation: 'CoQ', formula: 'C59H90O4' },
      ],
      products: [
        { id: 'nad-ci', name: 'NAD+', abbreviation: 'NAD+', formula: 'C21H27N7O14P2' },
        { id: 'ubiquinol-ci', name: 'Ubiquinol', abbreviation: 'QH2', formula: 'C59H92O4' },
      ],
      cofactorsConsumed: ['NADH'],
      cofactorsProduced: ['NAD+'],
      deltaG: -69.4,
      isReversible: false,
      isRateLimiting: false,
      detailedDescription:
        'Complex I is the main entry point for electrons from NADH into the ETC. It is the largest respiratory complex (~45 subunits in mammals, ~1 MDa). NADH donates 2 electrons to FMN, which passes them through 7 Fe-S clusters to ubiquinone. The energy from this electron transfer pumps 4 H+ across the inner mitochondrial membrane, contributing to the proton motive force. Complex I is a major site of superoxide production (ROS) and a common target of mitochondrial disease mutations.',
      clinicalSignificance:
        'LHON (mitochondrial inheritance) results from Complex I mutations. Rotenone exposure is an environmental risk factor for Parkinson disease. Complex I deficiency is the most common cause of mitochondrial disease.',
      mcatHighYield: true,
    },

    // ── Step 10: Complex II (Succinate Dehydrogenase / ETC entry) ──
    {
      id: 'tca-etc-step-10',
      stepNumber: 10,
      pathwayId: 'tca-etc',
      phaseName: 'Electron Transport Chain',
      reactionName: 'FADH2 Oxidation via Complex II (no H+ pumping)',
      reactionType: 'oxidation',
      enzyme: {
        id: 'complex-ii',
        name: 'Succinate Dehydrogenase (Complex II)',
        alternateNames: ['Succinate:Ubiquinone Oxidoreductase', 'Complex II', 'SDH'],
        cofactors: ['FAD', 'Fe-S clusters'],
        mechanismDescription:
          'Complex II is the same enzyme as TCA step 6 (succinate dehydrogenase). FADH2 electrons (generated from succinate oxidation) are passed through Fe-S clusters to ubiquinone, reducing it to ubiquinol. Complex II does NOT pump protons because the free energy change is insufficient.',
        regulation: [
          {
            regulatorName: 'Malonate',
            regulatorType: 'allosteric-inhibitor',
            description: 'Competitive inhibitor that mimics succinate at the active site.',
          },
        ],
        clinicalSignificance:
          'Complex II is unique: (1) it is the only complex entirely encoded by nuclear DNA (all others have some mtDNA-encoded subunits), (2) it is the only complex that does NOT pump protons, (3) it directly links the TCA cycle to the ETC. FADH2 → CoQ bypasses Complex I, yielding only ~1.5 ATP vs ~2.5 for NADH.',
      },
      substrates: [
        { id: 'fadh2-cii', name: 'FADH2 (enzyme-bound)', abbreviation: 'FADH2', formula: 'C27H35N9O15P2' },
        { id: 'ubiquinone-cii', name: 'Ubiquinone', abbreviation: 'CoQ', formula: 'C59H90O4' },
      ],
      products: [
        { id: 'fad-cii', name: 'FAD', abbreviation: 'FAD', formula: 'C27H33N9O15P2' },
        { id: 'ubiquinol-cii', name: 'Ubiquinol', abbreviation: 'QH2', formula: 'C59H92O4' },
      ],
      cofactorsConsumed: ['FADH2'],
      cofactorsProduced: ['FAD'],
      deltaG: -5.8,
      isReversible: false,
      isRateLimiting: false,
      detailedDescription:
        'Complex II is the only ETC complex that does NOT pump protons across the inner mitochondrial membrane. Because electrons from FADH2 enter the ETC at ubiquinone (bypassing Complex I), they contribute to fewer protons being pumped and therefore produce less ATP (~1.5 per FADH2 vs ~2.5 per NADH). Complex II is also unique in being entirely encoded by nuclear DNA — all other ETC complexes have at least some subunits encoded by mitochondrial DNA. It serves a dual role as both TCA cycle enzyme (step 6) and ETC component.',
      clinicalSignificance:
        'SDH mutations → paraganglioma/pheochromocytoma. The P/O ratio difference between NADH (2.5) and FADH2 (1.5) is explained by Complex II not pumping H+. This is a frequently tested MCAT concept.',
      mcatHighYield: true,
    },

    // ── Step 11: Complex III (Cytochrome bc1) ──
    {
      id: 'tca-etc-step-11',
      stepNumber: 11,
      pathwayId: 'tca-etc',
      phaseName: 'Electron Transport Chain',
      reactionName: 'Electron Transfer from Ubiquinol to Cytochrome c (Complex III)',
      reactionType: 'oxidation',
      enzyme: {
        id: 'complex-iii',
        name: 'Cytochrome bc1 Complex (Complex III)',
        alternateNames: ['Ubiquinol:Cytochrome c Oxidoreductase', 'Complex III'],
        cofactors: ['Heme b', 'Heme c1', 'Fe-S cluster (Rieske protein)'],
        mechanismDescription:
          'Transfers electrons from ubiquinol (QH2) to cytochrome c via the Q cycle. In the Q cycle, one QH2 donates one electron to cytochrome c (via the Rieske Fe-S center and cytochrome c1) and one electron to another ubiquinone (via heme b), pumping 4 H+ per pair of electrons transferred to cytochrome c.',
        regulation: [
          {
            regulatorName: 'Antimycin A',
            regulatorType: 'allosteric-inhibitor',
            description:
              'Antimycin A blocks the Qi site of Complex III (where ubiquinone is reduced), preventing the Q cycle from completing and halting electron flow.',
          },
        ],
        clinicalSignificance:
          'Antimycin A is a classic Complex III inhibitor used in research. Complex III is also a significant source of ROS (superoxide production at the Qo site). Mutations can cause exercise intolerance and multisystem disease.',
      },
      substrates: [
        { id: 'ubiquinol-ciii', name: 'Ubiquinol', abbreviation: 'QH2', formula: 'C59H92O4' },
        { id: 'cytochrome-c-ox', name: 'Cytochrome c (oxidized)', abbreviation: 'Cyt c (Fe3+)', formula: 'heme protein' },
      ],
      products: [
        { id: 'ubiquinone-ciii', name: 'Ubiquinone', abbreviation: 'CoQ', formula: 'C59H90O4' },
        { id: 'cytochrome-c-red', name: 'Cytochrome c (reduced)', abbreviation: 'Cyt c (Fe2+)', formula: 'heme protein' },
      ],
      cofactorsConsumed: [],
      cofactorsProduced: [],
      deltaG: -34.2,
      isReversible: false,
      isRateLimiting: false,
      detailedDescription:
        'Complex III transfers electrons from ubiquinol (the mobile electron carrier in the inner membrane) to cytochrome c (a small soluble protein in the intermembrane space) via the Q cycle. The Q cycle effectively doubles the number of protons pumped per pair of electrons: 4 H+ are translocated for every 2 electrons passed to cytochrome c. This is because one electron from QH2 is recycled to reduce another CoQ at a different site. Complex III links the two mobile electron carriers: ubiquinone/ubiquinol (membrane-soluble) and cytochrome c (water-soluble).',
      clinicalSignificance:
        'Antimycin A is a commonly tested ETC inhibitor. Complex III mutations can cause mitochondrial myopathy and exercise intolerance.',
      mcatHighYield: true,
    },

    // ── Step 12: Complex IV (Cytochrome c Oxidase) ──
    {
      id: 'tca-etc-step-12',
      stepNumber: 12,
      pathwayId: 'tca-etc',
      phaseName: 'Electron Transport Chain',
      reactionName: 'Terminal Electron Transfer to O2 (Complex IV)',
      reactionType: 'oxidation',
      enzyme: {
        id: 'complex-iv',
        name: 'Cytochrome c Oxidase (Complex IV)',
        alternateNames: ['Complex IV', 'Cytochrome aa3'],
        cofactors: ['Heme a', 'Heme a3', 'CuA', 'CuB'],
        mechanismDescription:
          'Accepts electrons from cytochrome c and transfers them to molecular oxygen (O2), the terminal electron acceptor. Four electrons are needed to fully reduce one O2 to two H2O. The enzyme pumps 2 H+ per pair of electrons (1 H+ per electron transferred) across the inner membrane.',
        regulation: [
          {
            regulatorName: 'Cyanide (CN-)',
            regulatorType: 'allosteric-inhibitor',
            description:
              'Cyanide binds to the Fe3+ of heme a3 (and CuB), blocking electron transfer to O2. This shuts down the entire ETC and oxidative phosphorylation, causing histotoxic hypoxia.',
          },
          {
            regulatorName: 'Carbon monoxide (CO)',
            regulatorType: 'allosteric-inhibitor',
            description:
              'CO binds to the reduced (Fe2+) form of heme a3. CO also binds hemoglobin (carboxyhemoglobin), reducing O2 delivery.',
          },
          {
            regulatorName: 'Hydrogen sulfide (H2S)',
            regulatorType: 'allosteric-inhibitor',
            description: 'H2S binds to Complex IV similarly to cyanide, inhibiting cytochrome c oxidase.',
          },
        ],
        clinicalSignificance:
          'Cyanide poisoning causes rapid death by blocking ETC at Complex IV → cells cannot use O2 → histotoxic hypoxia. Treatment: hydroxocobalamin (binds CN-) or nitrites (induce methemoglobin that scavenges CN-) + sodium thiosulfate (converts CN- to thiocyanate). CO poisoning: cherry-red skin, headache, confusion → treat with 100% O2 or hyperbaric O2.',
      },
      substrates: [
        { id: 'cytochrome-c-red-civ', name: 'Cytochrome c (reduced)', abbreviation: 'Cyt c (Fe2+)', formula: 'heme protein' },
        { id: 'oxygen', name: 'Molecular Oxygen', abbreviation: 'O2', formula: 'O2' },
      ],
      products: [
        { id: 'cytochrome-c-ox-civ', name: 'Cytochrome c (oxidized)', abbreviation: 'Cyt c (Fe3+)', formula: 'heme protein' },
        { id: 'water-civ', name: 'Water', abbreviation: 'H2O', formula: 'H2O' },
      ],
      cofactorsConsumed: [],
      cofactorsProduced: [],
      deltaG: -112.0,
      isReversible: false,
      isRateLimiting: false,
      detailedDescription:
        'Complex IV is the terminal oxidase of the ETC. It collects 4 electrons from 4 cytochrome c molecules and uses them to reduce one O2 molecule to 2 H2O. This is where the oxygen we breathe is consumed. Complex IV pumps 2 H+ per pair of electrons (for a total of 4 H+ per O2 reduced), contributing to the proton gradient. The reduction of O2 must occur in a controlled 4-electron process to avoid releasing partially reduced (and highly reactive) oxygen species. Total H+ pumped per NADH across Complexes I, III, IV: 4 + 4 + 2 = 10 H+.',
      clinicalSignificance:
        'Cyanide, CO, and H2S are all Complex IV inhibitors. Cyanide poisoning: histotoxic hypoxia (venous blood remains oxygenated because cells cannot use O2). CO: binds hemoglobin 240x more tightly than O2. Treatment protocols are high-yield for MCAT.',
      mcatHighYield: true,
    },

    // ── Step 13: Complex V (ATP Synthase) ──
    {
      id: 'tca-etc-step-13',
      stepNumber: 13,
      pathwayId: 'tca-etc',
      phaseName: 'Electron Transport Chain',
      reactionName: 'ATP Synthesis via Proton Gradient (Complex V)',
      reactionType: 'phosphorylation',
      enzyme: {
        id: 'complex-v',
        name: 'ATP Synthase (Complex V)',
        alternateNames: ['F0F1 ATP Synthase', 'Complex V'],
        cofactors: ['ADP', 'Pi'],
        mechanismDescription:
          'The F0 subunit is a proton channel embedded in the inner mitochondrial membrane. The F1 subunit is the catalytic head that synthesizes ATP. As protons flow down their electrochemical gradient through F0, the c-ring rotates, driving conformational changes in the F1 β-subunits that catalyze ADP + Pi → ATP (binding change mechanism). Approximately 4 H+ are needed per ATP synthesized.',
        regulation: [
          {
            regulatorName: 'Oligomycin',
            regulatorType: 'allosteric-inhibitor',
            description:
              'Oligomycin blocks the F0 proton channel, preventing H+ flow through ATP synthase. This stops both ATP synthesis AND electron transport (because the proton gradient builds up and cannot be dissipated, backing up the ETC).',
          },
        ],
        clinicalSignificance:
          'Uncouplers (2,4-dinitrophenol/DNP, thermogenin/UCP1 in brown fat) dissipate the proton gradient by carrying H+ across the membrane independently of ATP synthase. ETC runs faster (more O2 consumed) but no ATP is made — energy is released as heat. DNP was historically used as a weight-loss drug (dangerous: hyperthermia, death). UCP1 in brown fat generates heat for thermoregulation in neonates.',
      },
      substrates: [
        { id: 'adp-cv', name: 'ADP', abbreviation: 'ADP', formula: 'C10H15N5O10P2' },
        { id: 'pi-cv', name: 'Inorganic Phosphate', abbreviation: 'Pi', formula: 'HPO4 2-' },
      ],
      products: [
        { id: 'atp-cv', name: 'ATP', abbreviation: 'ATP', formula: 'C10H16N5O13P3' },
      ],
      cofactorsConsumed: ['ADP', 'Pi'],
      cofactorsProduced: ['ATP'],
      deltaG: -30.5,
      isReversible: true,
      isRateLimiting: false,
      detailedDescription:
        'ATP synthase (Complex V) is the molecular machine that harnesses the proton motive force to synthesize ATP. The F0 portion forms a proton channel in the inner membrane, and proton flow drives rotation of the c-ring. This mechanical rotation drives conformational changes in the F1 catalytic subunits (L, T, O states in the binding change mechanism), converting ADP + Pi → ATP. About 4 H+ are required per ATP. With ~10 H+ pumped per NADH (Complexes I+III+IV), this yields ~2.5 ATP per NADH. With ~6 H+ pumped per FADH2 (Complexes III+IV only, bypassing Complex I), this yields ~1.5 ATP per FADH2. Total per glucose: ~30-32 ATP. Uncouplers like DNP and thermogenin (UCP1) allow protons to leak back without passing through ATP synthase, dissipating energy as heat.',
      clinicalSignificance:
        'Oligomycin inhibits ATP synthase (blocks F0 channel). Uncouplers vs. inhibitors: uncouplers (DNP, UCP1) increase O2 consumption and heat but decrease ATP; ETC inhibitors (cyanide, rotenone) decrease both O2 consumption and ATP. DNP caused fatal hyperthermia as a diet drug. UCP1 in brown fat: neonatal non-shivering thermogenesis.',
      mcatHighYield: true,
    },
  ],
};

import type { Pathway } from '../types';

export const pentosePhosphatePathway: Pathway = {
  id: 'pentose-phosphate',
  name: 'Pentose Phosphate Pathway',
  description:
    'The pentose phosphate pathway (PPP, also called the hexose monophosphate shunt) branches from glycolysis at glucose-6-phosphate. Its oxidative phase produces NADPH (essential for reductive biosynthesis and antioxidant defense), while its non-oxidative phase produces ribose-5-phosphate (for nucleotide synthesis) and can interconvert sugars back to glycolytic intermediates. The PPP does not consume or produce ATP.',
  location: 'Cytoplasm',
  netEquation:
    '3 Glucose-6-phosphate + 6 NADP+ + 3 H2O → 6 NADPH + 6 H+ + 3 CO2 + 2 Fructose-6-phosphate + Glyceraldehyde-3-phosphate',
  energySummary: {
    atpConsumed: 0,
    atpProduced: 0,
    nadhProduced: 0,
    fadh2Produced: 0,
    netAtp: 0,
  },
  connections: [
    {
      targetPathwayId: 'glycolysis',
      connectionDescription:
        'G6P is the branch point: it can enter glycolysis or the PPP. Non-oxidative phase products (F6P, G3P) re-enter glycolysis.',
      sharedMetabolite: 'Glucose-6-phosphate',
    },
    {
      targetPathwayId: 'gluconeogenesis',
      connectionDescription:
        'F6P and G3P from the non-oxidative phase can feed into gluconeogenesis.',
      sharedMetabolite: 'Fructose-6-phosphate',
    },
    {
      targetPathwayId: 'fatty-acid-synthesis',
      connectionDescription:
        'NADPH produced by the PPP is the primary source of reducing equivalents for fatty acid synthesis by fatty acid synthase.',
      sharedMetabolite: 'NADPH',
    },
    {
      targetPathwayId: 'glycogenesis',
      connectionDescription:
        'G6P can be diverted to glycogen synthesis instead of the PPP when glucose storage is favored.',
      sharedMetabolite: 'Glucose-6-phosphate',
    },
  ],
  mcatKeyPoints: [
    'G6PD (glucose-6-phosphate dehydrogenase) is the rate-limiting and committed enzyme of the PPP — most tested PPP enzyme on MCAT',
    'G6PD deficiency is the most common enzyme deficiency worldwide (~400 million people), X-linked recessive, common in African, Mediterranean, and Southeast Asian populations',
    'G6PD deficiency → decreased NADPH → decreased reduced glutathione → RBCs vulnerable to oxidative stress → hemolytic anemia',
    'Triggers for hemolysis in G6PD deficiency: fava beans (favism), sulfa drugs, primaquine (antimalarial), dapsone, infections, diabetic ketoacidosis',
    'Peripheral blood smear in G6PD deficiency: Heinz bodies (denatured hemoglobin precipitates) and bite cells (RBCs with "bites" from splenic macrophage removal of Heinz bodies)',
    'NADPH is needed for: (1) glutathione reduction (protects RBCs from oxidative damage), (2) fatty acid synthesis, (3) cholesterol synthesis, (4) cytochrome P450 detoxification reactions, (5) respiratory burst in neutrophils/macrophages (NADPH oxidase), (6) nitric oxide synthesis',
    'The oxidative phase is irreversible and produces 2 NADPH + 1 CO2 per G6P',
    'The non-oxidative phase is reversible and interconverts sugars: produces ribose-5-phosphate for nucleotide/DNA/RNA synthesis',
    'Transketolase requires TPP (thiamine/B1) — Wernicke-Korsakoff syndrome can impair PPP non-oxidative phase',
    'Rapidly dividing cells (bone marrow, tumors) need both NADPH and ribose-5-phosphate, heavily using the PPP',
    'Tissues with high PPP activity: liver (fatty acid synthesis), adrenal cortex (steroid synthesis), RBCs (glutathione), mammary glands (lactation), gonads',
  ],
  steps: [
    // ══════════════════════════════════════════════════
    // OXIDATIVE PHASE (irreversible, produces NADPH)
    // ══════════════════════════════════════════════════

    // ── Step 1: Glucose-6-phosphate Dehydrogenase (G6PD) ──
    {
      id: 'ppp-step-1',
      stepNumber: 1,
      pathwayId: 'pentose-phosphate',
      phaseName: 'Oxidative Phase',
      reactionName: 'Oxidation of G6P to 6-Phosphoglucono-δ-lactone',
      reactionType: 'oxidation',
      enzyme: {
        id: 'g6pd',
        name: 'Glucose-6-phosphate Dehydrogenase',
        ecNumber: 'EC 1.1.1.49',
        alternateNames: ['G6PD', 'G6PDH'],
        cofactors: ['NADP+'],
        mechanismDescription:
          'Oxidizes glucose-6-phosphate at the C-1 position, reducing NADP+ to NADPH and forming the intramolecular ester 6-phosphoglucono-δ-lactone. This is the committed, rate-limiting, and irreversible step of the PPP.',
        regulation: [
          {
            regulatorName: 'NADP+',
            regulatorType: 'allosteric-activator',
            description:
              'The NADP+/NADPH ratio is the primary regulator of G6PD. When NADPH is consumed (e.g., fatty acid synthesis, glutathione reduction), NADP+ rises and activates G6PD to produce more NADPH.',
          },
          {
            regulatorName: 'NADPH',
            regulatorType: 'product-inhibition',
            description:
              'NADPH competitively inhibits G6PD. When NADPH is abundant, the PPP slows down. This makes the pathway self-regulating based on the cell\'s redox needs.',
          },
        ],
        clinicalSignificance:
          'G6PD deficiency is the most common enzyme deficiency worldwide (~400 million affected). X-linked recessive inheritance means males are predominantly affected. Decreased NADPH → decreased reduced glutathione (GSH) → RBCs cannot neutralize reactive oxygen species → oxidative damage to hemoglobin → Heinz body formation → splenic macrophage removal → hemolytic anemia. Triggered by oxidative stressors: fava beans, sulfa drugs, primaquine, infections.',
      },
      substrates: [
        { id: 'glucose-6-phosphate', name: 'Glucose-6-phosphate', abbreviation: 'G6P', formula: 'C6H13O9P' },
      ],
      products: [
        {
          id: '6-phosphoglucono-delta-lactone',
          name: '6-Phosphoglucono-δ-lactone',
          abbreviation: '6-PGL',
          formula: 'C6H11O9P',
        },
      ],
      cofactorsConsumed: ['NADP+'],
      cofactorsProduced: ['NADPH'],
      deltaG: -17.6,
      isReversible: false,
      isRateLimiting: true,
      detailedDescription:
        'G6PD catalyzes the first and committed step of the pentose phosphate pathway. This is the RATE-LIMITING step and is regulated primarily by the NADP+/NADPH ratio. When NADPH is consumed (during fatty acid synthesis, glutathione reduction, or cytochrome P450 reactions), the rising NADP+ concentration activates G6PD, increasing NADPH production. This elegant feedback ensures NADPH supply matches demand. G6PD deficiency is the most clinically significant enzyme of the PPP — it is X-linked, so hemizygous males are most severely affected. RBCs are especially vulnerable because they lack mitochondria and depend entirely on the PPP for NADPH. Without adequate NADPH, glutathione cannot be maintained in its reduced state, and oxidative stress causes hemoglobin denaturation and hemolysis.',
      clinicalSignificance:
        'G6PD deficiency: X-linked, most common enzyme deficiency worldwide. Hemolytic anemia triggered by oxidative stress (fava beans, sulfa drugs, primaquine, dapsone, infections). Blood smear shows Heinz bodies (denatured Hb aggregates) and bite cells. Protective against Plasmodium falciparum malaria (similar to sickle cell trait).',
      mcatHighYield: true,
    },

    // ── Step 2: Lactonase ──
    {
      id: 'ppp-step-2',
      stepNumber: 2,
      pathwayId: 'pentose-phosphate',
      phaseName: 'Oxidative Phase',
      reactionName: 'Hydrolysis of 6-Phosphoglucono-δ-lactone',
      reactionType: 'hydrolysis',
      enzyme: {
        id: 'lactonase',
        name: '6-Phosphogluconolactonase',
        ecNumber: 'EC 3.1.1.31',
        alternateNames: ['Lactonase'],
        cofactors: [],
        mechanismDescription:
          'Hydrolyzes the intramolecular ester (lactone) bond of 6-phosphoglucono-δ-lactone, opening the ring to form the linear 6-phosphogluconate. This is a simple hydrolysis reaction that makes the product available for the next oxidative decarboxylation.',
        regulation: [],
      },
      substrates: [
        {
          id: '6-phosphoglucono-delta-lactone',
          name: '6-Phosphoglucono-δ-lactone',
          abbreviation: '6-PGL',
          formula: 'C6H11O9P',
        },
        { id: 'water-lac', name: 'Water', abbreviation: 'H2O', formula: 'H2O' },
      ],
      products: [
        { id: '6-phosphogluconate', name: '6-Phosphogluconate', abbreviation: '6-PG', formula: 'C6H13O10P' },
      ],
      cofactorsConsumed: [],
      cofactorsProduced: [],
      deltaG: -6.0,
      isReversible: false,
      isRateLimiting: false,
      detailedDescription:
        'Lactonase hydrolyzes the cyclic ester (lactone) of 6-phosphoglucono-δ-lactone to the open-chain 6-phosphogluconate. This is a straightforward hydrolysis reaction that is essentially irreversible under cellular conditions. The lactone would hydrolyze slowly even without the enzyme, but lactonase greatly accelerates the process. This step is generally not considered a high-yield step for the MCAT but is necessary to set up the next oxidative decarboxylation.',
      mcatHighYield: false,
    },

    // ── Step 3: 6-Phosphogluconate Dehydrogenase ──
    {
      id: 'ppp-step-3',
      stepNumber: 3,
      pathwayId: 'pentose-phosphate',
      phaseName: 'Oxidative Phase',
      reactionName: 'Oxidative Decarboxylation of 6-Phosphogluconate',
      reactionType: 'oxidative-decarboxylation',
      enzyme: {
        id: '6-phosphogluconate-dehydrogenase',
        name: '6-Phosphogluconate Dehydrogenase',
        ecNumber: 'EC 1.1.1.44',
        alternateNames: ['6-PGDH'],
        cofactors: ['NADP+'],
        mechanismDescription:
          'Catalyzes the oxidative decarboxylation of 6-phosphogluconate: first oxidizing C-3 to a keto group (reducing NADP+ to NADPH), then decarboxylating the resulting β-keto acid to release CO2 and form ribulose-5-phosphate.',
        regulation: [
          {
            regulatorName: 'NADPH',
            regulatorType: 'product-inhibition',
            description: 'NADPH product inhibition, mirroring the regulation at G6PD.',
          },
        ],
        clinicalSignificance:
          '6-PGDH deficiency is very rare but can contribute to hemolytic anemia similar to (but milder than) G6PD deficiency.',
      },
      substrates: [
        { id: '6-phosphogluconate', name: '6-Phosphogluconate', abbreviation: '6-PG', formula: 'C6H13O10P' },
      ],
      products: [
        { id: 'ribulose-5-phosphate', name: 'Ribulose-5-phosphate', abbreviation: 'Ru5P', formula: 'C5H11O8P' },
        { id: 'co2-ppp', name: 'Carbon Dioxide', abbreviation: 'CO2', formula: 'CO2' },
      ],
      cofactorsConsumed: ['NADP+'],
      cofactorsProduced: ['NADPH', 'CO2'],
      deltaG: -2.2,
      isReversible: false,
      isRateLimiting: false,
      detailedDescription:
        'This is the second NADPH-producing reaction of the oxidative phase, also generating the only CO2 of the PPP. The 6-carbon 6-phosphogluconate is oxidized and decarboxylated to the 5-carbon ribulose-5-phosphate. Together with step 1, the oxidative phase produces 2 NADPH per glucose-6-phosphate that enters the pathway. Ribulose-5-phosphate is the starting point for the non-oxidative phase, where it can be converted to ribose-5-phosphate (for nucleotide synthesis) or rearranged into glycolytic intermediates.',
      clinicalSignificance:
        'The oxidative phase is complete after this step: net products per G6P = 2 NADPH + 1 CO2 + ribulose-5-phosphate.',
      mcatHighYield: true,
    },

    // ══════════════════════════════════════════════════
    // NON-OXIDATIVE PHASE (reversible, sugar interconversions)
    // ══════════════════════════════════════════════════

    // ── Step 4: Ribulose-5-phosphate Isomerase ──
    {
      id: 'ppp-step-4',
      stepNumber: 4,
      pathwayId: 'pentose-phosphate',
      phaseName: 'Non-oxidative Phase',
      reactionName: 'Isomerization of Ribulose-5-phosphate to Ribose-5-phosphate',
      reactionType: 'isomerization',
      enzyme: {
        id: 'ribulose-5-phosphate-isomerase',
        name: 'Ribulose-5-phosphate Isomerase',
        ecNumber: 'EC 5.3.1.6',
        alternateNames: ['Rpi', 'R5P Isomerase'],
        cofactors: [],
        mechanismDescription:
          'Converts the ketose ribulose-5-phosphate to the aldose ribose-5-phosphate via an enediol intermediate (analogous to phosphoglucose isomerase in glycolysis). This provides ribose-5-phosphate for nucleotide biosynthesis.',
        regulation: [],
        clinicalSignificance:
          'Ribose-5-phosphate is essential for de novo synthesis of purine and pyrimidine nucleotides, and therefore for DNA and RNA synthesis. Rapidly dividing cells (bone marrow, tumors, immune cells) have high demand for ribose-5-phosphate.',
      },
      substrates: [
        { id: 'ribulose-5-phosphate', name: 'Ribulose-5-phosphate', abbreviation: 'Ru5P', formula: 'C5H11O8P' },
      ],
      products: [
        { id: 'ribose-5-phosphate', name: 'Ribose-5-phosphate', abbreviation: 'R5P', formula: 'C5H11O8P' },
      ],
      cofactorsConsumed: [],
      cofactorsProduced: [],
      deltaG: 2.0,
      isReversible: true,
      isRateLimiting: false,
      detailedDescription:
        'This is the entry point to the non-oxidative phase. Ribulose-5-phosphate (a ketose) is isomerized to ribose-5-phosphate (an aldose). Ribose-5-phosphate is the sugar used in the backbone of nucleotides (ATP, GTP, NAD+, FAD, CoA, DNA, RNA). When the cell needs more ribose-5-phosphate than NADPH, the non-oxidative reactions can run in reverse to convert F6P and G3P (from glycolysis) into ribose-5-phosphate without going through the oxidative phase.',
      clinicalSignificance:
        'Ribose-5-phosphate is the precursor for PRPP (phosphoribosyl pyrophosphate), which is required for de novo purine and pyrimidine synthesis. Cancer cells upregulate the PPP for both NADPH (antioxidant defense) and ribose-5-phosphate (rapid DNA replication).',
      mcatHighYield: true,
    },

    // ── Step 5: Ribulose-5-phosphate Epimerase ──
    {
      id: 'ppp-step-5',
      stepNumber: 5,
      pathwayId: 'pentose-phosphate',
      phaseName: 'Non-oxidative Phase',
      reactionName: 'Epimerization of Ribulose-5-phosphate to Xylulose-5-phosphate',
      reactionType: 'isomerization',
      enzyme: {
        id: 'ribulose-5-phosphate-epimerase',
        name: 'Ribulose-5-phosphate 3-Epimerase',
        ecNumber: 'EC 5.1.3.1',
        alternateNames: ['RPE', 'Xu5P Epimerase'],
        cofactors: [],
        mechanismDescription:
          'Epimerizes ribulose-5-phosphate at the C-3 position to produce xylulose-5-phosphate. The reaction proceeds via an enediol intermediate, changing the stereochemistry at C-3.',
        regulation: [],
      },
      substrates: [
        { id: 'ribulose-5-phosphate-ep', name: 'Ribulose-5-phosphate', abbreviation: 'Ru5P', formula: 'C5H11O8P' },
      ],
      products: [
        { id: 'xylulose-5-phosphate', name: 'Xylulose-5-phosphate', abbreviation: 'Xu5P', formula: 'C5H11O8P' },
      ],
      cofactorsConsumed: [],
      cofactorsProduced: [],
      deltaG: 0.0,
      isReversible: true,
      isRateLimiting: false,
      detailedDescription:
        'Xylulose-5-phosphate is the donor substrate for transketolase in the next step. The epimerase converts ribulose-5-phosphate to xylulose-5-phosphate by inverting the configuration at C-3. This reaction provides the xylulose-5-phosphate needed as a 2-carbon unit donor in the transketolase reactions of the non-oxidative phase.',
      mcatHighYield: false,
    },

    // ── Step 6: Transketolase (first reaction) ──
    {
      id: 'ppp-step-6',
      stepNumber: 6,
      pathwayId: 'pentose-phosphate',
      phaseName: 'Non-oxidative Phase',
      reactionName: 'Transketolase: Transfer of 2C unit (Xu5P + R5P → S7P + G3P)',
      reactionType: 'transfer',
      enzyme: {
        id: 'transketolase',
        name: 'Transketolase',
        ecNumber: 'EC 2.2.1.1',
        alternateNames: ['TKT'],
        cofactors: ['TPP (Thiamine/B1)', 'Mg2+'],
        mechanismDescription:
          'Transfers a 2-carbon unit (C1-C2 fragment, a glycolaldehyde group) from xylulose-5-phosphate (a ketose donor) to ribose-5-phosphate (an aldose acceptor). The 2-carbon fragment is carried by TPP as an activated glycolaldehyde intermediate. Products are the 7-carbon sedoheptulose-7-phosphate and the 3-carbon glyceraldehyde-3-phosphate.',
        regulation: [],
        clinicalSignificance:
          'Transketolase requires TPP (thiamine pyrophosphate/vitamin B1). Thiamine deficiency (beriberi, Wernicke-Korsakoff syndrome in alcoholics) impairs transketolase activity. The erythrocyte transketolase activity assay is used clinically to assess thiamine status: add TPP to RBC lysate and measure increased transketolase activity — a large increase indicates deficiency.',
      },
      substrates: [
        { id: 'xylulose-5-phosphate-tk1', name: 'Xylulose-5-phosphate', abbreviation: 'Xu5P', formula: 'C5H11O8P' },
        { id: 'ribose-5-phosphate-tk1', name: 'Ribose-5-phosphate', abbreviation: 'R5P', formula: 'C5H11O8P' },
      ],
      products: [
        { id: 'sedoheptulose-7-phosphate', name: 'Sedoheptulose-7-phosphate', abbreviation: 'S7P', formula: 'C7H15O10P' },
        { id: 'g3p-tk1', name: 'Glyceraldehyde-3-phosphate', abbreviation: 'G3P', formula: 'C3H7O6P' },
      ],
      cofactorsConsumed: [],
      cofactorsProduced: [],
      deltaG: 0.4,
      isReversible: true,
      isRateLimiting: false,
      detailedDescription:
        'Transketolase catalyzes the first of two 2-carbon transfer reactions in the non-oxidative phase. It transfers a 2-carbon glycolaldehyde unit from the ketose donor (xylulose-5-phosphate, 5C) to the aldose acceptor (ribose-5-phosphate, 5C), producing sedoheptulose-7-phosphate (7C) and glyceraldehyde-3-phosphate (3C). Transketolase uses TPP (thiamine/B1) as a cofactor to stabilize the carbanion intermediate. This TPP requirement connects PPP to thiamine deficiency: the erythrocyte transketolase assay (with and without added TPP) is the classic diagnostic test for thiamine status.',
      clinicalSignificance:
        'Thiamine (B1) deficiency impairs transketolase: measured by the erythrocyte transketolase activation assay. Relevant to Wernicke-Korsakoff syndrome (alcoholics), beriberi (wet: cardiac, dry: peripheral neuropathy).',
      mcatHighYield: true,
    },

    // ── Step 7: Transaldolase ──
    {
      id: 'ppp-step-7',
      stepNumber: 7,
      pathwayId: 'pentose-phosphate',
      phaseName: 'Non-oxidative Phase',
      reactionName: 'Transaldolase: Transfer of 3C unit (S7P + G3P → E4P + F6P)',
      reactionType: 'transfer',
      enzyme: {
        id: 'transaldolase',
        name: 'Transaldolase',
        ecNumber: 'EC 2.2.1.2',
        alternateNames: ['TALDO', 'TAL'],
        cofactors: [],
        mechanismDescription:
          'Transfers a 3-carbon unit (dihydroxyacetone, C1-C3 fragment) from sedoheptulose-7-phosphate (the ketose donor) to glyceraldehyde-3-phosphate (the aldose acceptor) via a Schiff base intermediate with an active-site lysine. Products are the 4-carbon erythrose-4-phosphate and the 6-carbon fructose-6-phosphate.',
        regulation: [],
        clinicalSignificance:
          'Transaldolase deficiency is a rare inborn error of metabolism causing liver disease, hepatosplenomegaly, and coagulopathy. Erythrose-4-phosphate is a precursor for aromatic amino acid biosynthesis (in bacteria/plants, not humans — relevant for shikimate pathway).',
      },
      substrates: [
        { id: 'sedoheptulose-7-phosphate-ta', name: 'Sedoheptulose-7-phosphate', abbreviation: 'S7P', formula: 'C7H15O10P' },
        { id: 'g3p-ta', name: 'Glyceraldehyde-3-phosphate', abbreviation: 'G3P', formula: 'C3H7O6P' },
      ],
      products: [
        { id: 'erythrose-4-phosphate', name: 'Erythrose-4-phosphate', abbreviation: 'E4P', formula: 'C4H9O7P' },
        { id: 'fructose-6-phosphate-ta', name: 'Fructose-6-phosphate', abbreviation: 'F6P', formula: 'C6H13O9P' },
      ],
      cofactorsConsumed: [],
      cofactorsProduced: [],
      deltaG: -1.5,
      isReversible: true,
      isRateLimiting: false,
      detailedDescription:
        'Transaldolase transfers a 3-carbon dihydroxyacetone unit from sedoheptulose-7-phosphate (7C) to glyceraldehyde-3-phosphate (3C), producing erythrose-4-phosphate (4C) and fructose-6-phosphate (6C). Unlike transketolase, transaldolase does not require a cofactor — it uses a Schiff base mechanism with an active-site lysine. F6P can re-enter glycolysis. The remaining erythrose-4-phosphate participates in a second transketolase reaction (with another Xu5P) to produce another F6P and G3P, both of which are glycolytic intermediates. The net result of the non-oxidative phase: 3 pentose-5-phosphates (C5) are rearranged into 2 fructose-6-phosphates (C6) + 1 glyceraldehyde-3-phosphate (C3), recycling the carbon back to glycolysis.',
      clinicalSignificance:
        'Transaldolase deficiency is a rare but recognized inborn error of metabolism with hepatic and hematologic manifestations. Fructose-6-phosphate (F6P) from this step re-enters glycolysis, linking the PPP to central carbon metabolism.',
      mcatHighYield: true,
    },
  ],
};

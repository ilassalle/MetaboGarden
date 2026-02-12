'use client';

import { motion } from 'framer-motion';
import type { ReactionStep } from '@/data/types';

interface StepDetailPanelProps {
  step: ReactionStep;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  currentIndex: number;
  totalSteps: number;
}

export default function StepDetailPanel({
  step,
  onClose,
  onPrev,
  onNext,
  currentIndex,
  totalSteps,
}: StepDetailPanelProps) {
  const isExergonic = step.deltaG < 0;

  return (
    <motion.div
      key={step.id}
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 26, stiffness: 200 }}
      className="fixed top-0 right-0 z-50 h-full w-full max-w-md bg-gradient-to-b from-green-50 to-amber-50/30 border-l border-green-200 shadow-2xl overflow-y-auto"
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-green-100 hover:bg-green-200 text-green-700 transition-colors text-lg leading-none cursor-pointer"
        aria-label="Close detail panel"
      >
        &times;
      </button>

      <div className="p-6 pt-8 space-y-6">
        {/* ---- Prev / Next navigation ---- */}
        <div className="flex items-center justify-between">
          <button
            onClick={onPrev}
            disabled={!onPrev}
            className={`
              flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer
              ${onPrev
                ? 'bg-green-100 text-green-700 hover:bg-green-200'
                : 'bg-green-50 text-green-300 cursor-not-allowed'
              }
            `}
            aria-label="Previous step"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M17 10a.75.75 0 0 1-.75.75H5.612l4.158 3.96a.75.75 0 1 1-1.04 1.08l-5.5-5.25a.75.75 0 0 1 0-1.08l5.5-5.25a.75.75 0 1 1 1.04 1.08L5.612 9.25H16.25A.75.75 0 0 1 17 10Z" clipRule="evenodd" />
            </svg>
            Prev
          </button>

          <span className="text-xs text-green-500 font-medium">
            {currentIndex + 1} / {totalSteps}
          </span>

          <button
            onClick={onNext}
            disabled={!onNext}
            className={`
              flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer
              ${onNext
                ? 'bg-green-100 text-green-700 hover:bg-green-200'
                : 'bg-green-50 text-green-300 cursor-not-allowed'
              }
            `}
            aria-label="Next step"
          >
            Next
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638l-4.158-3.96a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        {/* ---- Header ---- */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="flex items-center justify-center w-7 h-7 rounded-full bg-green-600 text-white text-xs font-bold">
              {step.stepNumber}
            </span>
            {step.mcatHighYield && (
              <span className="px-2 py-0.5 bg-emerald-600 rounded-full text-[10px] font-bold text-white tracking-wide">
                MCAT HIGH-YIELD
              </span>
            )}
            {step.isRateLimiting && (
              <span className="px-2 py-0.5 bg-amber-400 rounded-full text-[10px] font-bold text-white tracking-wide">
                RATE-LIMITING
              </span>
            )}
          </div>
          <h2 className="text-lg font-bold text-green-900 leading-snug">
            {step.reactionName}
          </h2>
          <p className="text-sm text-green-700 mt-0.5">
            Enzyme: <span className="font-semibold">{step.enzyme.name}</span>
            {step.enzyme.ecNumber && (
              <span className="ml-1 text-green-500 text-xs">({step.enzyme.ecNumber})</span>
            )}
          </p>
          {step.enzyme.alternateNames && step.enzyme.alternateNames.length > 0 && (
            <p className="text-xs text-green-500 mt-0.5">
              Also known as: {step.enzyme.alternateNames.join(', ')}
            </p>
          )}
        </div>

        {/* ---- Substrates -> Products ---- */}
        <Section title="Reaction">
          <div className="flex items-center gap-2 flex-wrap">
            <MoleculeList molecules={step.substrates} />
            <span className="text-green-600 font-bold text-lg">&rarr;</span>
            <MoleculeList molecules={step.products} />
          </div>
          <p className="text-xs text-green-600/70 mt-1.5 italic capitalize">
            {step.reactionType.replace(/-/g, ' ')}
            {step.isReversible ? ' (reversible)' : ' (irreversible)'}
          </p>
        </Section>

        {/* ---- Cofactors ---- */}
        {(step.cofactorsConsumed.length > 0 || step.cofactorsProduced.length > 0) && (
          <Section title="Cofactors">
            {step.cofactorsConsumed.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-1">
                <span className="text-xs text-green-700 font-medium mr-1">Consumed:</span>
                {step.cofactorsConsumed.map((c) => (
                  <CofactorChip key={c} name={c} variant="consumed" />
                ))}
              </div>
            )}
            {step.cofactorsProduced.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                <span className="text-xs text-green-700 font-medium mr-1">Produced:</span>
                {step.cofactorsProduced.map((c) => (
                  <CofactorChip key={c} name={c} variant="produced" />
                ))}
              </div>
            )}
          </Section>
        )}

        {/* ---- Delta G ---- */}
        <Section title="Energetics">
          <div className="flex items-baseline gap-2">
            <span className="text-sm text-green-800 font-medium">&Delta;G&deg;&apos; =</span>
            <span
              className={`text-lg font-bold ${
                isExergonic ? 'text-green-600' : 'text-red-500'
              }`}
            >
              {step.deltaG > 0 ? '+' : ''}
              {step.deltaG} kJ/mol
            </span>
          </div>
          <p className="text-xs text-green-600/70 mt-0.5">
            {isExergonic ? 'Exergonic (spontaneous, energy-releasing)' : 'Endergonic (non-spontaneous, energy-requiring)'}
          </p>
        </Section>

        {/* ---- Regulation ---- */}
        {step.enzyme.regulation.length > 0 && (
          <Section title="Regulation">
            <ul className="space-y-2">
              {step.enzyme.regulation.map((reg) => (
                <li key={reg.regulatorName} className="flex items-start gap-2">
                  <RegulationBadge type={reg.regulatorType} />
                  <div>
                    <span className="text-sm font-semibold text-green-800">
                      {reg.regulatorName}
                    </span>
                    <p className="text-xs text-green-600/80 leading-relaxed">
                      {reg.description}
                    </p>
                    {reg.tissueSpecific && (
                      <p className="text-[10px] text-amber-600 mt-0.5">
                        Tissue-specific: {reg.tissueSpecific}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {/* ---- Tissue Variants ---- */}
        {step.enzyme.tissueVariants && step.enzyme.tissueVariants.length > 0 && (
          <Section title="Tissue Variants">
            <ul className="space-y-2">
              {step.enzyme.tissueVariants.map((tv) => (
                <li key={tv.isoformName} className="bg-white/60 rounded-lg p-2.5 border border-green-100">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm font-semibold text-green-800">{tv.isoformName}</span>
                    <span className="text-[10px] bg-green-100 text-green-600 px-1.5 py-0.5 rounded-full">
                      {tv.tissue}
                    </span>
                  </div>
                  <p className="text-xs text-green-600/80 leading-relaxed">
                    {tv.differenceDescription}
                  </p>
                  {tv.kmValue && (
                    <p className="text-[10px] text-green-500 mt-0.5">
                      K<sub>m</sub> = {tv.kmValue}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </Section>
        )}

        {/* ---- Clinical Significance ---- */}
        {(step.clinicalSignificance || step.enzyme.clinicalSignificance) && (
          <Section title="Clinical Significance">
            {step.enzyme.clinicalSignificance && (
              <p className="text-sm text-green-700 leading-relaxed">
                {step.enzyme.clinicalSignificance}
              </p>
            )}
            {step.clinicalSignificance && step.clinicalSignificance !== step.enzyme.clinicalSignificance && (
              <p className="text-sm text-green-700 leading-relaxed mt-1">
                {step.clinicalSignificance}
              </p>
            )}
          </Section>
        )}

        {/* ---- Detailed Description ---- */}
        <Section title="Mechanism">
          <p className="text-sm text-green-700 leading-relaxed">
            {step.enzyme.mechanismDescription}
          </p>
        </Section>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Helper sub-components                                               */
/* ------------------------------------------------------------------ */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-xs font-bold uppercase tracking-wider text-green-500 mb-2">
        {title}
      </h3>
      {children}
    </div>
  );
}

function MoleculeList({ molecules }: { molecules: { name: string; abbreviation: string }[] }) {
  return (
    <div className="flex flex-wrap items-center gap-1">
      {molecules.map((m, i) => (
        <span key={m.name}>
          <span
            className="inline-block px-2 py-0.5 bg-white border border-green-200 rounded-md text-sm font-medium text-green-800"
            title={m.name}
          >
            {m.abbreviation || m.name}
          </span>
          {i < molecules.length - 1 && (
            <span className="text-green-400 mx-0.5">+</span>
          )}
        </span>
      ))}
    </div>
  );
}

function CofactorChip({ name, variant }: { name: string; variant: 'consumed' | 'produced' }) {
  return (
    <span
      className={`
        inline-block px-2 py-0.5 rounded-full text-[11px] font-medium
        ${variant === 'consumed'
          ? 'bg-red-50 text-red-500 border border-red-200'
          : 'bg-emerald-50 text-emerald-600 border border-emerald-200'
        }
      `}
    >
      {name}
    </span>
  );
}

function RegulationBadge({ type }: { type: string }) {
  const colors: Record<string, string> = {
    'allosteric-activator': 'bg-green-100 text-green-700',
    'allosteric-inhibitor': 'bg-red-100 text-red-600',
    'product-inhibition': 'bg-orange-100 text-orange-600',
    'feedforward-activation': 'bg-sky-100 text-sky-700',
    'hormonal': 'bg-purple-100 text-purple-600',
    'covalent-modification': 'bg-amber-100 text-amber-700',
  };

  const label = type.replace(/-/g, ' ');
  const cls = colors[type] || 'bg-gray-100 text-gray-600';

  return (
    <span className={`flex-shrink-0 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${cls}`}>
      {label}
    </span>
  );
}

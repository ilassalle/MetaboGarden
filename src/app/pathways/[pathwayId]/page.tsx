'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import GameModeCard from '@/components/layout/GameModeCard';
import { getPathwayMeta } from '@/data/pathway-registry';
import { isValidPathwayId } from '@/lib/helpers';
import type { Pathway, PathwayId } from '@/data/types';
import { usePathwayData } from '@/hooks/usePathwayData';
import { useProgressStore } from '@/lib/progress-store';

function DragIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <path d="M17.5 14v7m0 0l-2.5-2.5m2.5 2.5l2.5-2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function QuizIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
      <path d="M9 11l3 3L22 4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DiagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
      <circle cx="5" cy="6" r="3" />
      <circle cx="19" cy="6" r="3" />
      <circle cx="12" cy="18" r="3" />
      <path d="M7.5 7.5L10.5 16" strokeLinecap="round" />
      <path d="M16.5 7.5L13.5 16" strokeLinecap="round" />
    </svg>
  );
}

function MatchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
      <path d="M4 6h6M14 6h6M4 12h6M14 12h6M4 18h6M14 18h6" strokeLinecap="round" />
      <path d="M10 6l4 6M10 12l4 6" strokeLinecap="round" opacity={0.5} />
    </svg>
  );
}

function buildNeedToKnow(pathway: Pathway) {
  const rateLimiting = pathway.steps.filter((step) => step.isRateLimiting);
  const irreversible = pathway.steps.filter((step) => !step.isReversible);

  const regulators = new Set<string>();
  const tissues = new Set<string>();

  pathway.steps.forEach((step) => {
    step.enzyme.regulation.forEach((reg) => {
      const arrow = reg.regulatorType.includes('activator') || reg.regulatorType.includes('feedforward') ? '↑' : '↓';
      regulators.add(`${reg.regulatorName} ${arrow}`);
      if (reg.tissueSpecific) tissues.add(reg.tissueSpecific);
    });

    step.enzyme.tissueVariants?.forEach((variant) => {
      tissues.add(`${variant.tissue}: ${variant.isoformName}`);
    });
  });

  const energy = pathway.energySummary;

  return {
    rateLimiting: rateLimiting.length > 0
      ? rateLimiting.map((step) => `${step.enzyme.name} (Step ${step.stepNumber})`).join('; ')
      : 'No single rate-limiting step highlighted in this pathway dataset.',
    irreversible: irreversible.length > 0
      ? irreversible.map((step) => `Step ${step.stepNumber} ${step.reactionName}`).join('; ')
      : 'No irreversible steps highlighted in this pathway dataset.',
    regulators: regulators.size > 0
      ? Array.from(regulators).join('; ')
      : 'No major regulators listed in this pathway dataset.',
    netAtp: `${energy.netAtp} net ATP (ATP produced: ${energy.atpProduced}, ATP consumed: ${energy.atpConsumed})`,
    reducingEquivalents: `NADH: ${energy.nadhProduced}; FADH₂: ${energy.fadh2Produced}; NADPH consumed: ${energy.nadphConsumed ?? 0}`,
    tissues: tissues.size > 0 ? Array.from(tissues).join('; ') : `Primary location: ${pathway.location}`,
  };
}

export default function PathwayLanding({
  params,
}: {
  params: Promise<{ pathwayId: string }>;
}) {
  const { pathwayId } = use(params);

  if (!isValidPathwayId(pathwayId)) {
    notFound();
  }

  const meta = getPathwayMeta(pathwayId);
  if (!meta) notFound();

  const typedPathwayId = pathwayId as PathwayId;
  const { pathway, loading } = usePathwayData(typedPathwayId);
  const unlockPathway = useProgressStore((s) => s.unlockPathway);

  const pathwayUnlocked = useProgressStore((s) =>
    s.progress.unlockedPathways.includes(typedPathwayId)
  );
  const diagramUnlocked = useProgressStore((s) =>
    s.progress.diagramUnlockedPathways.includes(typedPathwayId)
  );

  const canAccessDiagram = pathwayUnlocked;
  const canAccessOtherModes = pathwayUnlocked && diagramUnlocked;

  const basePath = `/pathways/${pathwayId}`;
  const needToKnow = pathway ? buildNeedToKnow(pathway) : null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm text-green-600 hover:text-green-700 mb-6"
      >
        <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
          <path fillRule="evenodd" d="M17 10a.75.75 0 0 1-.75.75H5.612l4.158 3.96a.75.75 0 1 1-1.04 1.08l-5.5-5.25a.75.75 0 0 1 0-1.08l5.5-5.25a.75.75 0 1 1 1.04 1.08L5.612 9.25H16.25A.75.75 0 0 1 17 10Z" clipRule="evenodd" />
        </svg>
        All Pathways
      </Link>

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: meta.color }}
          />
          <span className="text-xs text-green-600/60 uppercase tracking-wide font-medium">
            {meta.location}
          </span>
        </div>
        <h1 className="text-3xl font-bold text-green-900 mb-2">{meta.label}</h1>
        <p className="text-green-700/70">{meta.shortDescription}</p>
      </div>

      <div className="bg-white rounded-2xl border border-green-200 p-6 mb-6">
          {loading && <p className="text-sm text-green-600/70">Loading pathway overview...</p>}

          {pathway && needToKnow && (
            <>
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-green-800 mb-1">Big Picture</h3>
                <p className="text-sm text-green-700/80">{pathway.description}</p>
              </div>

              <div className="mb-4">
                <h3 className="text-lg font-semibold text-green-800 mb-1">Need to Know</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm text-green-700/80">
                  <li><strong>Rate-limiting enzyme:</strong> {needToKnow.rateLimiting}</li>
                  <li><strong>Key irreversible steps:</strong> {needToKnow.irreversible}</li>
                  <li><strong>Key regulators (↑ / ↓):</strong> {needToKnow.regulators}</li>
                  <li><strong>Net ATP:</strong> {needToKnow.netAtp}</li>
                  <li><strong>NADH / FADH₂ / NADPH:</strong> {needToKnow.reducingEquivalents}</li>
                  <li><strong>Tissue specificity (if relevant):</strong> {needToKnow.tissues}</li>
                </ul>
              </div>

              <div className="mb-5">
                <h3 className="text-lg font-semibold text-green-800 mb-1">Important steps and information</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm text-green-700/80">
                  {pathway.steps.slice(0, 4).map((step) => (
                    <li key={step.id}>
                      Step {step.stepNumber}: {step.reactionName} ({step.enzyme.name})
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}

          {!pathwayUnlocked ? (
            <button
              onClick={() => {
                unlockPathway(typedPathwayId);
              }}
              className="inline-flex items-center justify-center rounded-xl bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-2"
            >
              Start learning
            </button>
          ) : (
            <p className="text-sm text-green-700/80 font-medium">Pathway unlocked — revisit this summary anytime.</p>
          )}
        </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <GameModeCard
          href={`${basePath}/diagram`}
          title="Interactive Diagram"
          description="Explore each step of the pathway with detailed info, animations, and energy diagrams."
          icon={<DiagramIcon />}
          locked={!canAccessDiagram}
        />
        <GameModeCard
          href={`${basePath}/pathway-builder`}
          title="Pathway Builder"
          description="Drag and drop enzymes, substrates, and products to build the pathway from scratch."
          icon={<DragIcon />}
          locked={!canAccessOtherModes}
          lockedLabel={pathwayUnlocked ? 'Locked - Explore Interactive Diagram First' : 'Locked'}
        />
        <GameModeCard
          href={`${basePath}/quiz`}
          title="Quiz & Flashcards"
          description="Test your knowledge with multiple choice, fill-in-the-blank, and flashcard questions."
          icon={<QuizIcon />}
          locked={!canAccessOtherModes}
          lockedLabel={pathwayUnlocked ? 'Locked - Explore Interactive Diagram First' : 'Locked'}
        />
        <GameModeCard
          href={`${basePath}/matching`}
          title="Matching Game"
          description="Match enzymes to reactions, substrates to products, and regulators to targets."
          icon={<MatchIcon />}
          locked={!canAccessOtherModes}
          lockedLabel={pathwayUnlocked ? 'Locked - Explore Interactive Diagram First' : 'Locked'}
        />
      </div>
    </div>
  );
}

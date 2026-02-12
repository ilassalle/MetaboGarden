'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import GameModeCard from '@/components/layout/GameModeCard';
import { getPathwayMeta } from '@/data/pathway-registry';
import { isValidPathwayId } from '@/lib/helpers';

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

  const basePath = `/pathways/${pathwayId}`;

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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <GameModeCard
          href={`${basePath}/diagram`}
          title="Interactive Diagram"
          description="Explore each step of the pathway with detailed info, animations, and energy diagrams."
          icon={<DiagramIcon />}
        />
        <GameModeCard
          href={`${basePath}/pathway-builder`}
          title="Pathway Builder"
          description="Drag and drop enzymes, substrates, and products to build the pathway from scratch."
          icon={<DragIcon />}
        />
        <GameModeCard
          href={`${basePath}/quiz`}
          title="Quiz & Flashcards"
          description="Test your knowledge with multiple choice, fill-in-the-blank, and flashcard questions."
          icon={<QuizIcon />}
        />
        <GameModeCard
          href={`${basePath}/matching`}
          title="Matching Game"
          description="Match enzymes to reactions, substrates to products, and regulators to targets."
          icon={<MatchIcon />}
        />
      </div>
    </div>
  );
}

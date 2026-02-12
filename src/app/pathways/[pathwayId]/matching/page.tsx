'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { isValidPathwayId } from '@/lib/helpers';
import { getPathwayMeta } from '@/data/pathway-registry';
import type { PathwayId } from '@/data/types';
import MatchingGame from '@/components/matching/MatchingGame';

export default function MatchingPage({
  params,
}: {
  params: Promise<{ pathwayId: string }>;
}) {
  const { pathwayId } = use(params);

  if (!isValidPathwayId(pathwayId)) notFound();

  const meta = getPathwayMeta(pathwayId);
  if (!meta) notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <Link
        href={`/pathways/${pathwayId}`}
        className="inline-flex items-center gap-1 text-sm text-green-600 hover:text-green-700 mb-6"
      >
        <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
          <path fillRule="evenodd" d="M17 10a.75.75 0 0 1-.75.75H5.612l4.158 3.96a.75.75 0 1 1-1.04 1.08l-5.5-5.25a.75.75 0 0 1 0-1.08l5.5-5.25a.75.75 0 1 1 1.04 1.08L5.612 9.25H16.25A.75.75 0 0 1 17 10Z" clipRule="evenodd" />
        </svg>
        {meta.label}
      </Link>

      <h1 className="text-2xl font-bold text-green-900 mb-1">Matching Game</h1>
      <p className="text-sm text-green-700/60 mb-6">
        Match enzymes to reactions, substrates to products
      </p>

      <MatchingGame pathwayId={pathwayId as PathwayId} />
    </div>
  );
}

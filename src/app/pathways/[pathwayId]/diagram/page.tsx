'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { isValidPathwayId } from '@/lib/helpers';
import { getPathwayMeta } from '@/data/pathway-registry';
import type { PathwayId } from '@/data/types';
import { usePathwayData } from '@/hooks/usePathwayData';
import InteractiveDiagram from '@/components/diagram/InteractiveDiagram';

export default function DiagramPage({
  params,
}: {
  params: Promise<{ pathwayId: string }>;
}) {
  const { pathwayId } = use(params);

  if (!isValidPathwayId(pathwayId)) notFound();

  const meta = getPathwayMeta(pathwayId);
  if (!meta) notFound();

  const { pathway, loading, error } = usePathwayData(pathwayId as PathwayId);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <Link
        href={`/pathways/${pathwayId}`}
        className="inline-flex items-center gap-1 text-sm text-green-600 hover:text-green-700 mb-6"
      >
        <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
          <path fillRule="evenodd" d="M17 10a.75.75 0 0 1-.75.75H5.612l4.158 3.96a.75.75 0 1 1-1.04 1.08l-5.5-5.25a.75.75 0 0 1 0-1.08l5.5-5.25a.75.75 0 1 1 1.04 1.08L5.612 9.25H16.25A.75.75 0 0 1 17 10Z" clipRule="evenodd" />
        </svg>
        {meta.label}
      </Link>

      <h1 className="text-2xl font-bold text-green-900 mb-1">Interactive Diagram</h1>
      <p className="text-sm text-green-700/60 mb-6">Click on any step to explore details</p>

      {loading && (
        <div className="flex items-center justify-center h-64">
          <div className="animate-pulse text-green-400">Loading pathway data...</div>
        </div>
      )}

      {error && (
        <div className="text-center py-12">
          <p className="text-red-500">{error}</p>
          <p className="text-sm text-green-600/60 mt-2">This pathway data is coming soon.</p>
        </div>
      )}

      {pathway && <InteractiveDiagram pathway={pathway} />}
    </div>
  );
}

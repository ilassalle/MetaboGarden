import Link from 'next/link';
import type { PathwayMeta } from '@/data/types';
import { SeedlingIcon } from './PlantDecoration';

interface PathwayCardProps {
  pathway: PathwayMeta;
  mastery?: number;
  locked?: boolean;
}

export default function PathwayCard({ pathway, mastery = 0, locked = false }: PathwayCardProps) {
  return (
    <Link href={`/pathways/${pathway.id}`}>
      <div className="group relative bg-white rounded-2xl border border-green-200 p-5 hover:border-green-400 hover:shadow-lg hover:shadow-green-100 transition-all duration-300 cursor-pointer h-full">
        <div className="absolute top-3 right-3 flex items-center gap-1.5">
          {locked ? (
            <span className="text-xs text-green-700 font-medium">🔒</span>
          ) : (
            <>
              <SeedlingIcon
                className={`w-5 h-5 transition-colors ${
                  mastery > 75
                    ? 'text-green-500'
                    : mastery > 25
                    ? 'text-green-300'
                    : 'text-green-200'
                }`}
              />
              <span className="text-xs text-green-600 font-medium">{mastery}%</span>
            </>
          )}
        </div>

        <div
          className="w-3 h-3 rounded-full mb-3"
          style={{ backgroundColor: pathway.color }}
        />

        <h3 className="font-semibold text-green-900 group-hover:text-green-700 transition-colors mb-1">
          {pathway.label}
        </h3>

        <p className="text-sm text-green-700/70 mb-3 leading-relaxed">
          {pathway.shortDescription}
        </p>

        <div className="flex items-center gap-3 text-xs text-green-600/60">
          {typeof pathway.stepCount === 'number' && (
            <>
              <span>{pathway.stepCount} steps</span>
              <span className="w-1 h-1 rounded-full bg-green-300" />
            </>
          )}
          <span>{pathway.location}</span>
        </div>

        {!locked && (
          <div className="mt-3 h-1 bg-green-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-400 rounded-full transition-all duration-500"
              style={{ width: `${mastery}%` }}
            />
          </div>
        )}
      </div>
    </Link>
  );
}

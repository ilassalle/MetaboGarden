import type { PathwayId } from '@/data/types';

/** Validate a URL parameter as a valid PathwayId */
export function isValidPathwayId(id: string): id is PathwayId {
  const valid: PathwayId[] = [
    'glycolysis',
    'gluconeogenesis',
    'glycogenesis',
    'glycogenolysis',
    'fatty-acid-synthesis',
    'beta-oxidation',
    'ketone-metabolism',
    'tca-cycle',
    'etc',
    'pentose-phosphate',
  ];
  return valid.includes(id as PathwayId);
}

/** Format a number with subscript HTML for molecular formulas */
export function formatFormula(formula: string): string {
  return formula.replace(/(\d+)/g, '<sub>$1</sub>');
}

/** Clamp a number between min and max */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** Format seconds into mm:ss */
export function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

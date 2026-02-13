export function LeafIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M20 4c-6 0-11 5-11 11 0 3.3 2.7 6 6 6 6 0 11-5 11-11 0-3.3-2.7-6-6-6Z" transform="translate(-2 -2)" />
      <path d="M8 16c3-3 5.5-5.5 10-10" />
    </svg>
  );
}

export function SeedlingIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={className}>
      <path d="M12 22V10" strokeLinecap="round" />
      <path d="M12 14c-2-2-6-2-8 0 0-6 4-8 8-8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 14c2-2 6-2 8 0 0-6-4-8-8-8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 22h6" strokeLinecap="round" />
    </svg>
  );
}

export function VineCorner({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={`text-green-200 ${className}`} fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path d="M0 80 Q 20 80, 30 60 Q 40 40, 60 35 Q 80 30, 100 20" />
      <ellipse cx="15" cy="72" rx="6" ry="4" fill="currentColor" opacity={0.5} transform="rotate(-30 15 72)" />
      <ellipse cx="45" cy="42" rx="5" ry="3" fill="currentColor" opacity={0.4} transform="rotate(-15 45 42)" />
      <ellipse cx="75" cy="28" rx="6" ry="4" fill="currentColor" opacity={0.3} transform="rotate(10 75 28)" />
    </svg>
  );
}

export function SmallLeaf({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={`text-green-300 ${className}`} fill="currentColor">
      <path d="M10 2c0 0-6 4-6 10s6 6 6 6 6 0 6-6S10 2 10 2z" opacity={0.6} />
      <path d="M10 4v14" stroke="currentColor" strokeWidth={0.5} fill="none" opacity={0.8} />
    </svg>
  );
}

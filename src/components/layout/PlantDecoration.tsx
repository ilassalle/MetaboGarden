import Image from 'next/image';

export function LeafIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <Image
      src="/leaf.png"
      alt=""
      aria-hidden="true"
      width={20}
      height={20}
      className={className}
    />
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

export function SmallLeaf({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={`text-green-300 ${className}`} fill="currentColor">
      <path d="M10 2c0 0-6 4-6 10s6 6 6 6 6 0 6-6S10 2 10 2z" opacity={0.6} />
      <path d="M10 4v14" stroke="currentColor" strokeWidth={0.5} fill="none" opacity={0.8} />
    </svg>
  );
}

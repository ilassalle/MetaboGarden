'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LeafIcon } from './PlantDecoration';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/progress', label: 'My Garden' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 top-0 z-[100] bg-secondary-bg/95 backdrop-blur-md border-b border-accent/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-2 group">
            <LeafIcon className="w-6 h-6 text-heading-text group-hover:text-earth transition-colors" />
            <span className="font-semibold text-heading-text text-lg">MetaboGarden</span>
          </Link>

          <div className="flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-accent text-heading-text border border-heading-text/25 shadow-sm'
                      : 'text-heading-text/85 hover:text-heading-text hover:bg-secondary-bg/70'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}

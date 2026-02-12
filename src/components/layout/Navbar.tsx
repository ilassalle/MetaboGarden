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
    <nav className="sticky top-0 z-50 bg-green-50/80 backdrop-blur-md border-b border-green-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-2 group">
            <LeafIcon className="w-6 h-6 text-green-600 group-hover:text-green-500 transition-colors" />
            <span className="font-semibold text-green-800 text-lg">MetaboGarden</span>
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
                      ? 'bg-green-200 text-green-800'
                      : 'text-green-700 hover:bg-green-100 hover:text-green-800'
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

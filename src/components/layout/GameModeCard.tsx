import Link from 'next/link';

interface GameModeCardProps {
  href: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  bestScore?: number;
}

export default function GameModeCard({ href, title, description, icon, bestScore }: GameModeCardProps) {
  return (
    <Link href={href}>
      <div className="group bg-white rounded-2xl border border-green-200 p-6 hover:border-green-400 hover:shadow-lg hover:shadow-green-100 transition-all duration-300 cursor-pointer h-full flex flex-col">
        <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors text-green-600">
          {icon}
        </div>

        <h3 className="font-semibold text-green-900 mb-1">{title}</h3>
        <p className="text-sm text-green-700/70 flex-1">{description}</p>

        {bestScore !== undefined && bestScore > 0 && (
          <div className="mt-4 pt-3 border-t border-green-100 flex items-center justify-between">
            <span className="text-xs text-green-600/60">Best score</span>
            <span className="text-sm font-medium text-green-700">{bestScore}%</span>
          </div>
        )}
      </div>
    </Link>
  );
}

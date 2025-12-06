import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/Card';
import { getTypeIcon, getTypeColor, getTypeLabel, getResultLink, type GlobalSearchResult } from '@/lib/data/search-config';

interface SearchResultCardProps {
  result: GlobalSearchResult;
}

export function SearchResultCard({ result }: SearchResultCardProps) {
  const Icon = getTypeIcon(result.result_type);
  const typeColor = getTypeColor(result.result_type);
  const typeLabel = getTypeLabel(result.result_type);
  const link = getResultLink(result);

  return (
    <Link href={link} className="block">
      <Card className="hover:border-gold-500/50 transition-all group">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            {Icon && <div className={`mt-1 ${typeColor}`}><Icon className="w-4 h-4" /></div>}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-xl font-bold text-dungeon-100 group-hover:text-gold-400 transition-colors font-heading">
                  {result.name}
                </h3>
                <span className={`text-sm px-2 py-1 rounded ${typeColor} bg-dungeon-900/50 border border-dungeon-700`}>
                  {typeLabel}
                </span>
                {result.category && (
                  <span className="text-sm text-dungeon-400">
                    {result.category}
                  </span>
                )}
              </div>
              <p className="text-dungeon-300 leading-relaxed">
                {result.description}
                {result.description.length >= 200 && '...'}
              </p>
              <div className="mt-3 flex items-center gap-4 text-xs text-dungeon-500">
                <span>Relevancia: {(result.relevance * 100).toFixed(1)}%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

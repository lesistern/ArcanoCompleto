import { SEARCH_RESULT_TYPES, type SearchResultType } from '@/lib/data/search-config';

export interface SearchCountResult {
  result_type: SearchResultType;
  total_results: number;
}

interface SearchFiltersProps {
  counts: SearchCountResult[];
  selectedFilter: SearchResultType | 'all';
  onSelectFilter: (filter: SearchResultType | 'all') => void;
  onSearch: () => void;
}

export function SearchFilters({
  counts,
  selectedFilter,
  onSelectFilter,
  onSearch,
}: SearchFiltersProps) {
  if (counts.length === 0) {
    return null;
  }

  const getTotalCount = () => {
    return counts.reduce((sum, item) => sum + Number(item.total_results), 0);
  };

  return (
    <div className="mb-6 flex gap-4 flex-wrap">
      <button
        onClick={() => {
          onSelectFilter('all');
          onSearch();
        }}
        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
          selectedFilter === 'all'
            ? 'bg-gold-500 text-dungeon-950'
            : 'bg-dungeon-800 text-dungeon-300 hover:bg-dungeon-700 border border-dungeon-700'
        }`}
      >
        Todos ({getTotalCount()})
      </button>

      {counts.map((count) => {
        const config = SEARCH_RESULT_TYPES.find((c) => c.type === count.result_type);
        if (!config) return null;

        const Icon = config.icon;
        return (
          <button
            key={count.result_type}
            onClick={() => {
              onSelectFilter(count.result_type);
              onSearch();
            }}
            className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
              selectedFilter === count.result_type
                ? 'bg-gold-500 text-dungeon-950'
                : 'bg-dungeon-800 text-dungeon-300 hover:bg-dungeon-700 border border-dungeon-700'
            }`}
          >
            <Icon className="w-4 h-4" />
            {config.plural} ({count.total_results})
          </button>
        );
      })}
    </div>
  );
}

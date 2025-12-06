import { LucideIcon } from 'lucide-react';

interface FilterButtonProps<T extends { value: string; label: string }> {
  items: T[];
  selected: string;
  onSelect: (value: string) => void;
  renderItem?: (item: T, isSelected: boolean) => React.ReactNode;
  getIcon?: (item: T) => LucideIcon | null;
  getColor?: (item: T) => string;
}

export function FilterButton<T extends { value: string; label: string }>({
  items,
  selected,
  onSelect,
  renderItem,
  getIcon,
  getColor,
}: FilterButtonProps<T>) {
  if (renderItem) {
    return (
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <button
            key={item.value}
            onClick={() => onSelect(item.value)}
            className={`px-3 py-1.5 rounded-lg border text-sm flex items-center gap-2 transition-all ${
              selected === item.value
                ? 'border-gold-500 bg-gold-500/10 text-gold-400'
                : 'border-dungeon-700 bg-dungeon-900 text-dungeon-300 hover:border-dungeon-600'
            }`}
          >
            {renderItem(item, selected === item.value)}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => {
        const Icon = getIcon?.(item);
        const color = getColor?.(item);
        const isSelected = selected === item.value;

        return (
          <button
            key={item.value}
            onClick={() => onSelect(item.value)}
            className={`px-3 py-1.5 rounded-lg border text-sm flex items-center gap-2 transition-all ${
              isSelected
                ? 'border-gold-500 bg-gold-500/10 text-gold-400'
                : 'border-dungeon-700 bg-dungeon-900 text-dungeon-300 hover:border-dungeon-600'
            }`}
          >
            {Icon ? (
              <Icon className={`w-4 h-4 ${isSelected ? 'text-gold-400' : color}`} />
            ) : item.value !== 'all' && 'color' in item ? (
              <div className={`w-2 h-2 rounded-full ${(item as any).color}`} />
            ) : null}
            {item.label}
          </button>
        );
      })}
    </div>
  );
}

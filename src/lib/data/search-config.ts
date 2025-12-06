import { LucideIcon } from 'lucide-react';
import { Sparkles, Swords, BookOpen, Users, Brain, Axe, Crown, Skull } from 'lucide-react';

export type SearchResultType = 'spell' | 'feat' | 'class' | 'race' | 'skill' | 'weapon' | 'deity' | 'monster';

export interface SearchResultTypeConfig {
  type: SearchResultType;
  icon: LucideIcon;
  color: string;
  label: string;
  plural: string;
  linkPath: (item: any) => string;
}

export interface GlobalSearchResult {
  result_type: SearchResultType;
  id: string;
  slug?: string;
  name: string;
  category?: string;
  description: string;
  relevance: number;
}

export const SEARCH_RESULT_TYPES: SearchResultTypeConfig[] = [
  {
    type: 'spell',
    icon: Sparkles,
    color: 'text-purple-400',
    label: 'Conjuro',
    plural: 'Conjuros',
    linkPath: (item) => `/conjuros/${item.slug || item.id}`,
  },
  {
    type: 'feat',
    icon: Swords,
    color: 'text-red-400',
    label: 'Dote',
    plural: 'Dotes',
    linkPath: (item) => `/dotes/${item.slug || item.id}`,
  },
  {
    type: 'class',
    icon: BookOpen,
    color: 'text-blue-400',
    label: 'Clase',
    plural: 'Clases',
    linkPath: (item) => `/clases/${item.slug || item.name?.toLowerCase()}`,
  },
  {
    type: 'race',
    icon: Users,
    color: 'text-green-400',
    label: 'Raza',
    plural: 'Razas',
    linkPath: (item) => `/razas/${item.slug || item.id}`,
  },
  {
    type: 'skill',
    icon: Brain,
    color: 'text-cyan-400',
    label: 'Habilidad',
    plural: 'Habilidades',
    linkPath: (item) => `/habilidades/${item.slug || item.id}`,
  },
  {
    type: 'weapon',
    icon: Axe,
    color: 'text-orange-400',
    label: 'Arma',
    plural: 'Armas',
    linkPath: (item) => `/objetos/armas/${item.slug || item.id}`,
  },
  {
    type: 'deity',
    icon: Crown,
    color: 'text-gold-400',
    label: 'Deidad',
    plural: 'Deidades',
    linkPath: (item) => `/reglas/contenido/dioses/${item.slug || item.id}`,
  },
  {
    type: 'monster',
    icon: Skull,
    color: 'text-rose-400',
    label: 'Monstruo',
    plural: 'Monstruos',
    linkPath: (item) => `/monstruos/${item.slug || item.id}`,
  },
];

export function getSearchResultConfig(type: SearchResultType): SearchResultTypeConfig | undefined {
  return SEARCH_RESULT_TYPES.find((config) => config.type === type);
}

export function getTypeIcon(type: SearchResultType): LucideIcon | undefined {
  return getSearchResultConfig(type)?.icon;
}

export function getTypeColor(type: SearchResultType): string {
  return getSearchResultConfig(type)?.color || 'text-gray-400';
}

export function getTypeLabel(type: SearchResultType): string {
  return getSearchResultConfig(type)?.label || type;
}

export function getResultLink(result: GlobalSearchResult): string {
  const config = getSearchResultConfig(result.result_type);
  return config ? config.linkPath(result) : '#';
}

export function createSearchResult(
  type: SearchResultType,
  item: any
): GlobalSearchResult {
  const descriptions: Record<SearchResultType, string> = {
    spell: item.description?.substring(0, 200) || '',
    feat: item.benefit?.substring(0, 200) || '',
    class: item.description?.substring(0, 200) || item.description_es?.substring(0, 200) || '',
    race: item.description_es?.substring(0, 200) || item.description?.substring(0, 200) || '',
    skill: item.description?.substring(0, 200) || '',
    weapon: item.damage || '',
    deity: item.portfolio_es?.substring(0, 200) || '',
    monster: item.challenge_rating ? `CR ${item.challenge_rating}` : '',
  };

  const categories: Record<SearchResultType, string | undefined> = {
    spell: item.school,
    feat: item.category,
    class: item.class_type,
    race: item.creature_type || 'Humanoide',
    skill: item.key_ability || 'Habilidad',
    weapon: item.weapon_type || 'Arma',
    deity: item.alignment || 'Deidad',
    monster: item.creature_type || 'Monstruo',
  };

  return {
    result_type: type,
    id: item.id,
    name: item.name || item.titulo || item.name_es,
    category: categories[type],
    description: descriptions[type],
    relevance: item.relevance || 0,
  };
}

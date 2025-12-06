import type { CSSProperties } from 'react';

// ============================================================================
// Helper Functions
// ============================================================================

export const generateSlug = (name: string) => {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export const normalizeSlug = (slug: string) =>
  slug
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

export const capitalizeFirst = (str: string) => {
  if (!str) return str;
  if (str.startsWith('¿')) {
    return '¿' + str.charAt(1).toUpperCase() + str.slice(2);
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// ============================================================================
// Class Images Configuration
// ============================================================================

export const CLASS_IMAGES: Record<string, string> = {
  barbaro: '/images/classes/Barbarian.webp',
  barbarian: '/images/classes/Barbarian.webp',
  bardo: '/images/classes/Bard.webp',
  bard: '/images/classes/Bard.webp',
  clerigo: '/images/classes/Cleric.webp',
  cleric: '/images/classes/Cleric.webp',
  druida: '/images/classes/Druid.webp',
  druid: '/images/classes/Druid.webp',
  guerrero: '/images/classes/Fighter.webp',
  fighter: '/images/classes/Fighter.webp',
  monje: '/images/classes/Monk.webp',
  monk: '/images/classes/Monk.webp',
  paladin: '/images/classes/Paladin.webp',
  explorador: '/images/classes/Ranger.webp',
  ranger: '/images/classes/Ranger.webp',
  picaro: '/images/classes/Rogue.webp',
  rogue: '/images/classes/Rogue.webp',
  brujo: '/images/classes/Warlock.webp',
  warlock: '/images/classes/Warlock.webp',
  mago: '/images/classes/Wizard.webp',
  wizard: '/images/classes/Wizard.webp',
  archivista: '/images/classes/Archivist.webp',
  archivist: '/images/classes/Archivist.webp',
};

export const getClassImage = (slug: string): string | null => {
  const normalized = normalizeSlug(slug);
  return CLASS_IMAGES[slug] || CLASS_IMAGES[normalized] || null;
};

// ============================================================================
// Class Image Glows Configuration
// ============================================================================

export type GlowStops = { from: string; via: string; to: string };

export const CLASS_IMAGE_GLOWS: Record<string, GlowStops> = {
  red: { from: '#dc2626', via: '#f97316', to: '#fb923c' },
  pink: { from: '#ec4899', via: '#fb7185', to: '#fbbf24' },
  yellow: { from: '#facc15', via: '#f59e0b', to: '#fb923c' },
  green: { from: '#10b981', via: '#22c55e', to: '#a3e635' },
  purple: { from: '#a855f7', via: '#8b5cf6', to: '#ec4899' },
  blue: { from: '#3b82f6', via: '#38bdf8', to: '#22d3ee' },
  orange: { from: '#f97316', via: '#fb923c', to: '#fbbf24' },
  cyan: { from: '#06b6d4', via: '#0ea5e9', to: '#22d3ee' },
  gray: { from: '#9ca3af', via: '#cbd5e1', to: '#e5e7eb' },
};

export const DEFAULT_GLOW: GlowStops = { from: '#fbbf24', via: '#f59e0b', to: '#10b981' };

export const getClassImageGlow = (colorClasses: string): GlowStops => {
  const hue = colorClasses.match(/text-([a-z]+)/)?.[1];
  return (hue && CLASS_IMAGE_GLOWS[hue]) || DEFAULT_GLOW;
};

// ============================================================================
// Alignment Replacements Configuration
// ============================================================================

export const ALIGNMENT_REPLACEMENTS: Array<{ pattern: RegExp; replacement: string }> = [
  { pattern: /\bany\s+non-evil\s*\(any\s+non-chaotic\)/gi, replacement: 'Cualquiera que no sea malvado (cualquiera que no sea caótico)' },
  { pattern: /\bany\s+non[- ]?lawful\b/gi, replacement: 'Cualquiera que no sea legal' },
  { pattern: /\bany\s+non[- ]?chaotic\b/gi, replacement: 'Cualquiera que no sea caótico' },
  { pattern: /\bany\s+non[- ]?good\b/gi, replacement: 'Cualquiera que no sea bueno' },
  { pattern: /\bany\s+non[- ]?evil\b/gi, replacement: 'Cualquiera que no sea malvado' },
  { pattern: /\bany\s+lawful\b/gi, replacement: 'Cualquiera legal' },
  { pattern: /\bany\s+chaotic\b/gi, replacement: 'Cualquiera caótico' },
  { pattern: /\bany\s+good\b/gi, replacement: 'Cualquiera bueno' },
  { pattern: /\bany\s+evil\b/gi, replacement: 'Cualquiera malvado' },
  { pattern: /\bany\s+neutral\b/gi, replacement: 'Cualquiera neutral' },
  { pattern: /\bany\s+alignment\b/gi, replacement: 'Cualquier alineamiento' },
  { pattern: /\blawful\s+good\b/gi, replacement: 'Legal bueno' },
  { pattern: /\bneutral\s+good\b/gi, replacement: 'Neutral bueno' },
  { pattern: /\bchaotic\s+good\b/gi, replacement: 'Caótico bueno' },
  { pattern: /\blawful\s+neutral\b/gi, replacement: 'Legal neutral' },
  { pattern: /\btrue\s+neutral\b/gi, replacement: 'Neutral verdadero' },
  { pattern: /\bchaotic\s+neutral\b/gi, replacement: 'Caótico neutral' },
  { pattern: /\bneutral\s+evil\b/gi, replacement: 'Neutral malvado' },
  { pattern: /\blawful\s+evil\b/gi, replacement: 'Legal malvado' },
  { pattern: /\bchaotic\s+evil\b/gi, replacement: 'Caótico malvado' },
  { pattern: /\bneutral\b/gi, replacement: 'Neutral' },
  { pattern: /\bany\b/gi, replacement: 'Cualquiera' },
  { pattern: /\bor\b/gi, replacement: 'o' },
  { pattern: /\band\b/gi, replacement: 'y' },
];

export const translateAlignmentText = (text?: string | null): string | null => {
  if (!text) return null;
  return ALIGNMENT_REPLACEMENTS.reduce(
    (acc, { pattern, replacement }) => acc.replace(pattern, replacement),
    text
  ).trim();
};

// ============================================================================
// Note: JSX rendering moved to React components (not in .ts files)
// ============================================================================

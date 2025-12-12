// src/lib/utils/formatters.ts

/**
 * Formatea un slug para mostrarlo correctamente
 * Convierte "kebab-case" a "Title Case"
 *
 * Ejemplos:
 * - "guerrero" → "Guerrero"
 * - "psionic-warrior" → "Psionic Warrior"
 * - "arcane-archer" → "Arcane Archer"
 * - "half-elf" → "Half Elf"
 */
export function formatSlug(slug: string | null | undefined): string {
  if (!slug) return '';

  return slug
    .split('-') // Dividir por guiones
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalizar cada palabra
    .join(' '); // Unir con espacios
}

/**
 * Alias específico para formatear nombres de clase
 */
export function formatClassName(classSlug: string | null | undefined): string {
  return formatSlug(classSlug);
}

/**
 * Alias específico para formatear nombres de raza
 */
export function formatRaceName(raceSlug: string | null | undefined): string {
  return formatSlug(raceSlug);
}

/**
 * Formatea un slug a kebab-case (para URLs)
 * Convierte "Title Case" a "kebab-case"
 *
 * Ejemplos:
 * - "Guerrero" → "guerrero"
 * - "Psionic Warrior" → "psionic-warrior"
 * - "Arcane Archer" → "arcane-archer"
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD') // Normalizar acentos
    .replace(/[\u0300-\u036f]/g, '') // Eliminar acentos
    .replace(/[^a-z0-9\s-]/g, '') // Eliminar caracteres especiales
    .trim()
    .replace(/\s+/g, '-') // Reemplazar espacios por guiones
    .replace(/-+/g, '-'); // Eliminar guiones duplicados
}

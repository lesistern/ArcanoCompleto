/**
 * Mapeo de slugs de deidades a nombres de archivos de imagen WebP
 * Las imágenes están ubicadas en public/images/deities/
 */

export const DEITY_IMAGES: Record<string, string> = {
  // Dioses Principales D&D 3.5
  'pelor': 'Pelor-removebg-preview.webp',
  'st-cuthbert': 'St._Cuthbert-removebg-preview.webp',
  'moradin': 'Moradin-removebg-preview.webp',
  'yondalla': 'Yondalla-removebg-preview.webp',
  'corellon-larethian': 'Corellon_Larethian-removebg-preview.webp',
  'garl-glittergold': 'Garl_Glittergold-removebg-preview.webp',
  'ehlonna': 'Ehlonna-removebg-preview.webp',
  'obad-hai': 'Obad-Hai-removebg-preview.webp',
  'gruumsh': 'Gruumsh-removebg-preview.webp',
  'kurtulmak': 'Kurtulmak-removebg-preview.webp',
  'lolth': 'Lolth-removebg-preview.webp',
  'kord': 'Kord-removebg-preview.webp',
  'hextor': 'Hextor-removebg-preview.webp',
  'heironeus': 'Heironeus-removebg-preview.webp',
  'nerull': 'Nerull-removebg-preview.webp',
  'wee-jas': 'Wee_Jas-removebg-preview.webp',
  'vecna': 'Vecna-removebg-preview.webp',
  'orcus': 'Orcus-removebg-preview.webp',
  'tiamat': 'Tiamat-removebg-preview.webp',
  'bahamut': 'Bahamut-removebg-preview.webp',
  'boccob': 'Boccob-removebg-preview.webp',
  'olidammara': 'Olidammara-removebg-preview.webp',
  'fharlanghn': 'Fharlanghn-removebg-preview.webp',
  'erythnul': 'Erythnul-removebg-preview.webp',
  'lendys': 'Lendys-removebg-preview.webp',
  'ilsensine': 'Ilsensine-removebg-preview.webp',
  'io': 'Io-removebg-preview.webp',
  'chronepsis': 'Chronepsis-removebg-preview.webp',
  'doresain': 'Doresain-removebg-preview.webp',
  'aasterinian': 'Aasterinian-removebg-preview.webp',
  'falazure': 'Falazure.webp',
  'garyx': 'Garyx-removebg-preview.webp',
  'hlal': 'Hlal-removebg-preview.webp',
  'evening-glory': 'Evening_Glory-removebg-preview.webp',
  'tamara': 'Tamara-removebg-preview.webp',
  'astilabor': 'Astilabor-removebg-preview.webp',
  'afflux': 'Afflux-removebg-preview.webp',
  'zuoken': 'Zuoken-removebg-preview.webp',
};

/**
 * Obtiene la imagen WebP de una deidad por su slug
 * @param slug - El slug de la deidad (ej: 'pelor')
 * @returns Ruta de la imagen WebP o undefined si no existe
 */
export function getDeityImageUrl(slug: string): string | undefined {
  const imageName = DEITY_IMAGES[slug];
  if (!imageName) return undefined;
  return `/images/deities/${imageName}`;
}

/**
 * Verifica si una deidad tiene imagen disponible
 * @param slug - El slug de la deidad
 * @returns true si la deidad tiene imagen, false en caso contrario
 */
export function hasDeityImage(slug: string): boolean {
  return !!DEITY_IMAGES[slug];
}

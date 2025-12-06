'use client';

import { useEffect } from 'react';
import { DEITY_IMAGES } from '@/lib/data/deity-images';

/**
 * Componente de depuración para verificar slugs de deidades
 * Muestra qué slugs están mapeados y cuáles no
 */
export function DeityDebugInfo({ slug }: { slug: string }) {
  useEffect(() => {
    const hasMappedImage = !!DEITY_IMAGES[slug];
    const imagePath = hasMappedImage ? `/images/deities/${DEITY_IMAGES[slug]}` : 'NO MAPEADO';

    console.group('🔍 DEBUG: Deidad Slug');
    console.log('Slug actual:', slug);
    console.log('¿Tiene imagen mapeada?', hasMappedImage);
    console.log('Ruta de imagen:', imagePath);
    console.log('Slugs mapeados disponibles:', Object.keys(DEITY_IMAGES).sort());
    console.groupEnd();
  }, [slug]);

  return null; // No renderiza nada
}

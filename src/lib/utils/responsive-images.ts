/**
 * Responsive Images Utility
 * ========================
 * Sistema centralizado para imágenes responsivas con srcSet y sizes
 * Sigue patrón mobile-first de Tailwind: mobile primero, luego enhancements
 *
 * Uso:
 * import { getImageSizes, getImageSrcSet } from '@/lib/utils/responsive-images';
 *
 * <Image
 *   src="/imagen.jpg"
 *   alt="Descripción"
 *   width={800}
 *   height={600}
 *   sizes={getImageSizes('fullWidth')}
 *   quality={80}
 * />
 */

export type ImageContext =
  | 'hero'           // Imagen de héroe: full-width responsive
  | 'card'           // Imagen de card: pequeña a mediana
  | 'avatar'         // Avatar circular: fijo 48px - 192px
  | 'thumbnail'      // Miniatura: muy pequeña 100px - 300px
  | 'feature'        // Imagen destacada: grande responsive
  | 'background'     // Imagen de fondo: full-width
  | 'icon'           // Icono: muy pequeño 20px - 64px
  | 'detail-page'    // Detalle: optimizada para páginas de producto
  | 'list'           // Listado: pequeña para cards de lista
  | 'sidebar';       // Sidebar: ancho fijo responsive

export type ImageQuality = 'low' | 'medium' | 'high';

/**
 * Configuración de breakpoints para responsive images
 * Sigue el sistema Tailwind mobile-first
 */
export const IMAGE_BREAKPOINTS = {
  mobile: 320,      // iPhone SE, Galaxy S21 pequeños
  tablet: 640,      // sm: - iPad Mini, tablets pequeñas
  desktop: 768,     // md: - iPad Air, laptops
  large: 1024,      // lg: - Desktops grandes
  xlarge: 1280,     // xl: - 4K monitors
} as const;

/**
 * Configuración de tamaños para cada contexto
 * Define el tamaño de imagen mostrado en diferentes breakpoints
 * Formato: "size1px" para ancho en píxeles
 */
export const IMAGE_SIZES: Record<ImageContext, string> = {
  hero: `
    (max-width: 640px) 100vw,
    (max-width: 1024px) 90vw,
    1280px
  `,

  card: `
    (max-width: 640px) calc(100vw - 32px),
    (max-width: 1024px) calc(50vw - 24px),
    calc(33.333vw - 16px)
  `,

  avatar: `
    (max-width: 640px) 48px,
    (max-width: 1024px) 64px,
    96px
  `,

  thumbnail: `
    (max-width: 640px) 100px,
    (max-width: 1024px) 150px,
    200px
  `,

  feature: `
    (max-width: 640px) 100vw,
    (max-width: 1024px) 85vw,
    1200px
  `,

  background: `100vw`,

  icon: `
    (max-width: 640px) 24px,
    (max-width: 1024px) 32px,
    48px
  `,

  'detail-page': `
    (max-width: 640px) 100vw,
    (max-width: 1024px) 80vw,
    800px
  `,

  list: `
    (max-width: 640px) 80px,
    (max-width: 1024px) 120px,
    150px
  `,

  sidebar: `
    (max-width: 1024px) 100vw,
    300px
  `,
};

/**
 * Mapeo de calidad de imagen a valores Next.js
 * Quality afecta compresión JPEG (1-100)
 * - low: 60 - para imágenes pequeñas, background
 * - medium: 75 - balance entre calidad y tamaño
 * - high: 90 - para imágenes principales, héroe
 */
export const IMAGE_QUALITY: Record<ImageQuality, number> = {
  low: 60,
  medium: 75,
  high: 90,
};

/**
 * Tamaños de salida para srcSet
 * Define las dimensiones de imagen a generar para diferentes dispositivos
 * Formato: array de anchos en píxeles
 */
export const IMAGE_SRCSET_WIDTHS: Record<ImageContext, number[]> = {
  hero: [320, 640, 1024, 1536],          // Responsive completo
  card: [200, 400, 600, 800, 1000],      // Grid cards
  avatar: [48, 96, 192],                 // Avatares 1x, 2x, 3x
  thumbnail: [100, 200, 300, 400],       // Miniaturas
  feature: [400, 800, 1200, 1600],       // Destacada grande
  background: [320, 640, 1024, 1536],    // Background full-width
  icon: [24, 32, 48, 64],                // Iconos pequeños
  'detail-page': [400, 800, 1200],       // Detalle página
  list: [80, 120, 150, 200],             // Lista pequeña
  sidebar: [300, 400, 600],              // Sidebar responsive
};

/**
 * Obtener atributo `sizes` para <Image>
 * @param context - Tipo de imagen (hero, card, avatar, etc.)
 * @returns String con media queries para `sizes` attribute
 *
 * Ejemplo:
 * sizes={getImageSizes('card')}
 * // Resultado: "(max-width: 640px) calc(100vw - 32px), ..."
 */
export function getImageSizes(context: ImageContext = 'card'): string {
  return IMAGE_SIZES[context].trim();
}

/**
 * Obtener calidad recomendada para contexto
 * @param context - Tipo de imagen
 * @param custom - Sobrescribir con custom quality si se desea
 * @returns Número de 1-100 para quality prop
 *
 * Ejemplo:
 * quality={getImageQuality('hero')}
 * // Resultado: 90
 */
export function getImageQuality(context: ImageContext, custom?: number): number {
  if (custom) return Math.max(1, Math.min(100, custom));

  const qualityMap: Record<ImageContext, ImageQuality> = {
    hero: 'high',
    card: 'medium',
    avatar: 'high',
    thumbnail: 'low',
    feature: 'high',
    background: 'low',
    icon: 'medium',
    'detail-page': 'high',
    list: 'low',
    sidebar: 'medium',
  };

  return IMAGE_QUALITY[qualityMap[context]];
}

/**
 * Obtener array de anchos para srcSet
 * @param context - Tipo de imagen
 * @returns Array de números para generar srcSet
 *
 * Ejemplo:
 * IMAGE_SRCSET_WIDTHS[getImageWidths('card')]
 * // Resultado: [200, 400, 600, 800, 1000]
 */
export function getImageWidths(context: ImageContext = 'card'): number[] {
  return IMAGE_SRCSET_WIDTHS[context];
}

/**
 * Generar string de srcSet manualmente (si no usas Next.js Image)
 * Nota: Next.js Image maneja esto automáticamente, pero útil para <img>
 *
 * @param basePath - URL base sin extensión (ej: "/images/hero")
 * @param context - Tipo de imagen
 * @param extension - Extensión de archivo (jpg, webp, etc.)
 * @returns String listo para srcSet attribute
 *
 * Ejemplo:
 * srcSet={generateSrcSet('/images/hero', 'card', 'jpg')}
 * // Resultado: "/images/hero-200w.jpg 200w, /images/hero-400w.jpg 400w, ..."
 */
export function generateSrcSet(
  basePath: string,
  context: ImageContext = 'card',
  extension: string = 'jpg'
): string {
  const widths = IMAGE_SRCSET_WIDTHS[context];
  return widths
    .map(width => `${basePath}-${width}w.${extension} ${width}w`)
    .join(', ');
}

/**
 * Obtener dimensiones optimizadas para un contexto
 * @param context - Tipo de imagen
 * @returns Objeto con width, height, aspect ratio
 *
 * Ejemplo:
 * const { width, height } = getImageDimensions('card');
 * // Resultado: { width: 400, height: 300, aspectRatio: '4/3' }
 */
export function getImageDimensions(context: ImageContext) {
  const dimensionsMap: Record<ImageContext, { width: number; height: number; aspectRatio: string }> = {
    hero: { width: 1280, height: 400, aspectRatio: '16/5' },
    card: { width: 400, height: 300, aspectRatio: '4/3' },
    avatar: { width: 192, height: 192, aspectRatio: '1/1' },
    thumbnail: { width: 200, height: 200, aspectRatio: '1/1' },
    feature: { width: 1200, height: 675, aspectRatio: '16/9' },
    background: { width: 1920, height: 1080, aspectRatio: '16/9' },
    icon: { width: 48, height: 48, aspectRatio: '1/1' },
    'detail-page': { width: 800, height: 600, aspectRatio: '4/3' },
    list: { width: 150, height: 150, aspectRatio: '1/1' },
    sidebar: { width: 300, height: 300, aspectRatio: '1/1' },
  };

  return dimensionsMap[context];
}

/**
 * Generar atributos de imagen optimizados
 * Devuelve objeto con todos los atributos necesarios
 *
 * @param context - Tipo de imagen
 * @param overrides - Sobrescribir atributos específicos
 * @returns Objeto con atributos optimizados
 *
 * Ejemplo:
 * const imageProps = getOptimizedImageProps('card');
 * <Image {...imageProps} src="/imagen.jpg" alt="Desc" />
 */
export function getOptimizedImageProps(
  context: ImageContext,
  overrides?: {
    quality?: number;
    priority?: boolean;
    loading?: 'lazy' | 'eager';
  }
) {
  const dims = getImageDimensions(context);

  return {
    sizes: getImageSizes(context),
    quality: overrides?.quality ?? getImageQuality(context),
    priority: overrides?.priority ?? context === 'hero',
    loading: overrides?.loading ?? (context === 'hero' ? 'eager' : 'lazy'),
    width: dims.width,
    height: dims.height,
  };
}

/**
 * Calcular aspectRatio CSS para aspect-ratio property
 * @param context - Tipo de imagen
 * @returns String formato CSS "width/height"
 *
 * Uso en CSS:
 * aspect-ratio: ${getAspectRatio('card')}; // "4/3"
 */
export function getAspectRatio(context: ImageContext): string {
  return getImageDimensions(context).aspectRatio;
}

/**
 * Validar si un contexto es válido
 * @param context - String a validar
 * @returns true si es contexto válido
 */
export function isValidImageContext(context: unknown): context is ImageContext {
  const validContexts: ImageContext[] = [
    'hero', 'card', 'avatar', 'thumbnail', 'feature',
    'background', 'icon', 'detail-page', 'list', 'sidebar',
  ];
  return validContexts.includes(context as ImageContext);
}

/**
 * Tabla de referencia rápida de propiedades por contexto
 */
export const IMAGE_REFERENCE_TABLE = {
  hero: {
    sizes: getImageSizes('hero'),
    quality: getImageQuality('hero'),
    widths: getImageWidths('hero'),
    description: 'Imagen de héroe full-width responsive',
  },
  card: {
    sizes: getImageSizes('card'),
    quality: getImageQuality('card'),
    widths: getImageWidths('card'),
    description: 'Imagen para cards de grid',
  },
  avatar: {
    sizes: getImageSizes('avatar'),
    quality: getImageQuality('avatar'),
    widths: getImageWidths('avatar'),
    description: 'Avatar circular pequeño a mediano',
  },
  thumbnail: {
    sizes: getImageSizes('thumbnail'),
    quality: getImageQuality('thumbnail'),
    widths: getImageWidths('thumbnail'),
    description: 'Miniatura pequeña',
  },
  feature: {
    sizes: getImageSizes('feature'),
    quality: getImageQuality('feature'),
    widths: getImageWidths('feature'),
    description: 'Imagen destacada grande responsive',
  },
  background: {
    sizes: getImageSizes('background'),
    quality: getImageQuality('background'),
    widths: getImageWidths('background'),
    description: 'Imagen de fondo full-width',
  },
  icon: {
    sizes: getImageSizes('icon'),
    quality: getImageQuality('icon'),
    widths: getImageWidths('icon'),
    description: 'Icono pequeño',
  },
  'detail-page': {
    sizes: getImageSizes('detail-page'),
    quality: getImageQuality('detail-page'),
    widths: getImageWidths('detail-page'),
    description: 'Imagen en página de detalle',
  },
  list: {
    sizes: getImageSizes('list'),
    quality: getImageQuality('list'),
    widths: getImageWidths('list'),
    description: 'Imagen en lista pequeña',
  },
  sidebar: {
    sizes: getImageSizes('sidebar'),
    quality: getImageQuality('sidebar'),
    widths: getImageWidths('sidebar'),
    description: 'Imagen en sidebar responsive',
  },
} as const;

/**
 * Mobile-First Responsive Typography Utilities
 *
 * Provides a consistent pattern for font sizes, weights, and line heights across all pages.
 * Following mobile-first principle: start small (mobile), enhance for larger screens.
 *
 * Breakpoints:
 * - Mobile: No prefix (< 640px)
 * - Tablet: sm: (640px+)
 * - Desktop: md: (768px+) and lg: (1024px+)
 *
 * Usage:
 * <h1 className={typographyScale.heading.h1}>Title</h1>
 * <p className={typographyScale.body.normal}>Description</p>
 * <span className={getResponsiveTextSize('body')}>Text</span>
 */

/**
 * Heading H1 - Page titles
 * Mobile: 24px | Tablet: 32px | Desktop: 40px
 */
export const headingH1 = 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold';

/**
 * Heading H2 - Section titles
 * Mobile: 20px | Tablet: 24px | Desktop: 32px
 */
export const headingH2 = 'text-xl sm:text-2xl md:text-3xl lg:text-4xl font-heading font-bold';

/**
 * Heading H3 - Subsection titles
 * Mobile: 18px | Tablet: 20px | Desktop: 24px
 */
export const headingH3 = 'text-lg sm:text-xl md:text-2xl lg:text-3xl font-heading font-semibold';

/**
 * Heading H4 - Small headings
 * Mobile: 16px | Tablet: 18px | Desktop: 20px
 */
export const headingH4 = 'text-base sm:text-lg md:text-xl font-heading font-semibold';

/**
 * Body text - Regular content
 * Mobile: 14px | Tablet: 15px | Desktop: 16px
 */
export const bodyText = 'text-sm sm:text-base md:text-base leading-relaxed';

/**
 * Body text large - Highlighted body content
 * Mobile: 15px | Tablet: 16px | Desktop: 18px
 */
export const bodyTextLarge = 'text-base sm:text-base md:text-lg leading-relaxed';

/**
 * Small text - Secondary content, captions
 * Mobile: 12px | Tablet: 13px | Desktop: 14px
 */
export const smallText = 'text-xs sm:text-sm md:text-sm';

/**
 * Extra small text - Metadata, footnotes
 * Mobile: 11px | Tablet: 12px | Desktop: 12px
 */
export const xsmallText = 'text-xs md:text-xs';

/**
 * Card title - Titles within cards
 * Mobile: 16px | Tablet: 18px | Desktop: 20px
 */
export const cardTitle = 'text-base sm:text-lg md:text-xl font-semibold';

/**
 * Card subtitle - Subtitles within cards
 * Mobile: 14px | Tablet: 14px | Desktop: 15px
 */
export const cardSubtitle = 'text-sm sm:text-sm md:text-base';

/**
 * Label - Form labels, badges
 * Mobile: 12px | Tablet: 13px | Desktop: 14px
 */
export const labelText = 'text-xs sm:text-sm md:text-sm font-medium uppercase tracking-wider';

/**
 * Button text - Default button text
 * Mobile: 14px | Tablet: 14px | Desktop: 15px
 */
export const buttonText = 'text-sm sm:text-sm md:text-base font-medium';

/**
 * Navigation text - Navigation menu items
 * Mobile: 14px | Tablet: 15px | Desktop: 15px
 */
export const navText = 'text-sm sm:text-base md:text-base';

/**
 * Breadcrumb text - Navigation breadcrumbs
 * Mobile: 12px | Tablet: 13px | Desktop: 14px
 */
export const breadcrumbText = 'text-xs sm:text-sm md:text-sm';

/**
 * Typography scale object with organized presets
 * Organized by context: headings, body, labels, special
 */
export const typographyScale = {
  // Heading variants
  heading: {
    h1: headingH1,
    h2: headingH2,
    h3: headingH3,
    h4: headingH4,
    h5: 'text-base sm:text-lg font-semibold',
    h6: 'text-sm sm:text-base font-semibold',
  },

  // Body text variants
  body: {
    normal: bodyText,
    large: bodyTextLarge,
    small: smallText,
    xsmall: xsmallText,
    // Common combinations
    muted: `${bodyText} text-dungeon-400`,
    highlight: `${bodyText} text-gold-400 font-semibold`,
    subtle: `${smallText} text-dungeon-500`,
  },

  // Component-specific typography
  card: {
    title: cardTitle,
    subtitle: cardSubtitle,
    description: bodyText,
  },

  // UI elements
  ui: {
    label: labelText,
    button: buttonText,
    nav: navText,
    breadcrumb: breadcrumbText,
    badge: 'text-xs sm:text-xs md:text-xs font-semibold',
    tooltip: 'text-xs sm:text-xs md:text-sm',
  },

  // Special typography
  special: {
    code: 'font-mono text-xs sm:text-sm md:text-sm bg-dungeon-800 px-2 py-1 rounded',
    quote: `${bodyText} italic border-l-4 border-gold-500 pl-4`,
    accent: 'text-sm sm:text-base md:text-base font-semibold text-gold-400',
    error: 'text-sm sm:text-sm md:text-base text-red-400 font-semibold',
    success: 'text-sm sm:text-sm md:text-base text-green-400 font-semibold',
    warning: 'text-sm sm:text-sm md:text-base text-amber-400 font-semibold',
  },

  // Line heights presets (can combine with text size)
  lineHeight: {
    tight: 'leading-tight', // 1.25
    normal: 'leading-normal', // 1.5
    relaxed: 'leading-relaxed', // 1.625
    loose: 'leading-loose', // 2
  },

  // Font weight presets
  weight: {
    thin: 'font-thin', // 100
    extralight: 'font-extralight', // 200
    light: 'font-light', // 300
    normal: 'font-normal', // 400
    medium: 'font-medium', // 500
    semibold: 'font-semibold', // 600
    bold: 'font-bold', // 700
    extrabold: 'font-extrabold', // 800
    black: 'font-black', // 900
  },
};

/**
 * Get responsive text size based on context
 * @param context - 'hero' | 'heading' | 'body' | 'label' | 'small' | 'card'
 * @returns Tailwind text size classes
 */
export function getResponsiveTextSize(context: 'hero' | 'heading' | 'body' | 'label' | 'small' | 'card' = 'body'): string {
  const contextMap = {
    hero: headingH1,
    heading: headingH2,
    body: bodyText,
    label: labelText,
    small: smallText,
    card: cardTitle,
  };

  return contextMap[context];
}

/**
 * Combine text size with color and weight
 * @param size - 'h1' | 'h2' | 'h3' | 'body' | 'small'
 * @param weight - 'normal' | 'semibold' | 'bold'
 * @returns Combined Tailwind classes
 */
export function getTypographyClasses(
  size: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'body-large' | 'small' | 'xsmall' = 'body',
  weight: keyof typeof typographyScale.weight = 'normal'
): string {
  const sizeMap = {
    h1: headingH1,
    h2: headingH2,
    h3: headingH3,
    h4: headingH4,
    body: bodyText,
    'body-large': bodyTextLarge,
    small: smallText,
    xsmall: xsmallText,
  };

  const weightClasses = typographyScale.weight[weight];
  return `${sizeMap[size]} ${weightClasses}`;
}

/**
 * Mobile-first responsive typography scale
 * Provides text size presets organized by size class
 * Values follow: mobile -> tablet -> desktop progression
 */
export const responsiveTextSizes = {
  // Text-xs variants: 11px -> 12px -> 12px
  xs: {
    default: 'text-xs sm:text-xs md:text-xs',
    tight: 'text-[10px] sm:text-xs md:text-xs',
    comfortable: 'text-xs sm:text-sm md:text-xs',
  },

  // Text-sm variants: 12px -> 13px -> 14px
  sm: {
    default: 'text-xs sm:text-sm md:text-sm',
    tight: 'text-xs sm:text-xs md:text-xs',
    comfortable: 'text-sm sm:text-sm md:text-base',
  },

  // Text-base variants: 14px -> 15px -> 16px
  base: {
    default: 'text-sm sm:text-base md:text-base',
    tight: 'text-sm sm:text-sm md:text-sm',
    comfortable: 'text-base sm:text-base md:text-lg',
  },

  // Text-lg variants: 15px -> 16px -> 18px
  lg: {
    default: 'text-base sm:text-lg md:text-lg',
    tight: 'text-base sm:text-base md:text-lg',
    comfortable: 'text-lg sm:text-lg md:text-xl',
  },

  // Text-xl variants: 16px -> 18px -> 20px
  xl: {
    default: 'text-lg sm:text-xl md:text-xl',
    tight: 'text-base sm:text-lg md:text-xl',
    comfortable: 'text-xl sm:text-xl md:text-2xl',
  },

  // Text-2xl variants: 18px -> 20px -> 24px
  '2xl': {
    default: 'text-lg sm:text-2xl md:text-2xl',
    tight: 'text-lg sm:text-xl md:text-2xl',
    comfortable: 'text-2xl sm:text-2xl md:text-3xl',
  },

  // Text-3xl variants: 20px -> 24px -> 30px
  '3xl': {
    default: 'text-xl sm:text-3xl md:text-3xl',
    tight: 'text-xl sm:text-2xl md:text-3xl',
    comfortable: 'text-3xl sm:text-3xl md:text-4xl',
  },

  // Text-4xl variants: 24px -> 30px -> 36px
  '4xl': {
    default: 'text-2xl sm:text-4xl md:text-4xl',
    tight: 'text-2xl sm:text-3xl md:text-4xl',
    comfortable: 'text-4xl sm:text-4xl md:text-5xl',
  },

  // Text-5xl variants: 28px -> 35px -> 48px
  '5xl': {
    default: 'text-3xl sm:text-5xl md:text-5xl',
    tight: 'text-2xl sm:text-4xl md:text-5xl',
    comfortable: 'text-5xl sm:text-5xl md:text-6xl',
  },
};

/**
 * Provides responsive typography for common contexts
 * @param context - 'page-title' | 'section-title' | 'card-title' | 'body' | 'small'
 * @returns Tailwind typography classes
 */
export function getContextualTypography(
  context: 'page-title' | 'section-title' | 'card-title' | 'body' | 'small' | 'label'
): string {
  const contextMap = {
    'page-title': `${headingH1} text-gold-500`,
    'section-title': `${headingH2} text-dungeon-100`,
    'card-title': `${cardTitle} text-dungeon-200`,
    body: `${bodyText} text-dungeon-300`,
    small: `${smallText} text-dungeon-400`,
    label: `${labelText} text-dungeon-500`,
  };

  return contextMap[context];
}

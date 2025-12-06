/**
 * Mobile-First Responsive Spacing Utilities
 *
 * Provides a consistent pattern for padding and spacing across all pages.
 * Following mobile-first principle: start small (mobile), enhance for larger screens.
 *
 * Breakpoints:
 * - Mobile: No prefix (< 640px)
 * - Tablet: sm: (640px+)
 * - Desktop: md: (768px+) and lg: (1024px+)
 */

/**
 * Standard page container padding
 * Mobile: 12px | Tablet: 16px | Desktop: 24px
 */
export const pageContainerPadding = 'px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8 lg:py-12';

/**
 * Section/Card padding
 * Mobile: 16px | Tablet: 20px | Desktop: 24px
 */
export const sectionPadding = 'p-4 sm:p-5 md:p-6';

/**
 * Compact padding (for smaller elements)
 * Mobile: 8px | Tablet: 12px | Desktop: 16px
 */
export const compactPadding = 'p-2 sm:p-3 md:p-4';

/**
 * Large padding (for prominent sections)
 * Mobile: 20px | Tablet: 24px | Desktop: 32px
 */
export const largePadding = 'p-5 sm:p-6 md:p-8';

/**
 * Horizontal padding only
 * Mobile: 12px | Tablet: 16px | Desktop: 24px
 */
export const horizontalPadding = 'px-3 sm:px-4 md:px-6';

/**
 * Vertical padding only
 * Mobile: 12px | Tablet: 16px | Desktop: 24px
 */
export const verticalPadding = 'py-3 sm:py-4 md:py-6';

/**
 * Gap for horizontal flex/grid layouts
 * Mobile: 12px | Tablet: 16px | Desktop: 24px
 */
export const horizontalGap = 'gap-3 sm:gap-4 md:gap-6';

/**
 * Gap for vertical flex/grid layouts
 * Mobile: 8px | Tablet: 12px | Desktop: 16px
 */
export const verticalGap = 'gap-2 sm:gap-3 md:gap-4';

/**
 * Margin for spacing between sections
 * Mobile: 16px | Tablet: 24px | Desktop: 32px
 */
export const sectionMargin = 'mb-4 sm:mb-6 md:mb-8';

/**
 * Combined horizontal padding and vertical margin
 * Used for page sections
 */
export const sectionLayout = `${pageContainerPadding} ${sectionMargin}`;

/**
 * Grid gap responsive sizes
 * Mobile: 12px | Tablet: 16px | Desktop: 24px
 */
export const gridGap = 'gap-3 sm:gap-4 md:gap-6';

/**
 * Provides responsive spacing based on context
 * @param context - 'compact' | 'normal' | 'large' | 'page'
 * @returns Tailwind padding classes
 */
export function getResponsivePadding(context: 'compact' | 'normal' | 'large' | 'page' = 'normal'): string {
  const paddingMap = {
    compact: compactPadding,
    normal: sectionPadding,
    large: largePadding,
    page: pageContainerPadding,
  };

  return paddingMap[context];
}

/**
 * Provides responsive gap based on direction
 * @param direction - 'horizontal' | 'vertical'
 * @returns Tailwind gap classes
 */
export function getResponsiveGap(direction: 'horizontal' | 'vertical' = 'horizontal'): string {
  return direction === 'horizontal' ? horizontalGap : verticalGap;
}

/**
 * Combines padding and gap for common layouts
 * @param includeMargin - Whether to include bottom margin
 * @returns Combined Tailwind classes
 */
export function getResponsiveLayoutClasses(includeMargin: boolean = true): string {
  return includeMargin
    ? `${pageContainerPadding} ${sectionMargin}`
    : pageContainerPadding;
}

/**
 * Mobile-first responsive spacing scale
 * Use these values for consistent spacing throughout the app
 */
export const spacingScale = {
  // Padding presets
  padding: {
    xs: 'p-1 sm:p-2', // 4px -> 8px
    sm: 'p-2 sm:p-3 md:p-4', // 8px -> 12px -> 16px
    md: 'p-3 sm:p-4 md:p-5', // 12px -> 16px -> 20px
    lg: 'p-4 sm:p-5 md:p-6', // 16px -> 20px -> 24px
    xl: 'p-5 sm:p-6 md:p-8', // 20px -> 24px -> 32px
  },

  // Gap presets (for flex/grid)
  gap: {
    xs: 'gap-1 sm:gap-2', // 4px -> 8px
    sm: 'gap-2 sm:gap-3 md:gap-4', // 8px -> 12px -> 16px
    md: 'gap-3 sm:gap-4 md:gap-5', // 12px -> 16px -> 20px
    lg: 'gap-4 sm:gap-5 md:gap-6', // 16px -> 20px -> 24px
    xl: 'gap-5 sm:gap-6 md:gap-8', // 20px -> 24px -> 32px
  },

  // Margin presets
  margin: {
    xs: 'm-1 sm:m-2', // 4px -> 8px
    sm: 'm-2 sm:m-3 md:m-4', // 8px -> 12px -> 16px
    md: 'm-3 sm:m-4 md:m-5', // 12px -> 16px -> 20px
    lg: 'm-4 sm:m-5 md:m-6', // 16px -> 20px -> 24px
    xl: 'm-5 sm:m-6 md:m-8', // 20px -> 24px -> 32px
  },
};

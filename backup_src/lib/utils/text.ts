// Función helper para crear resúmenes de texto
export function createSummary(text: string, maxLength: number = 120): string {
  if (!text) return '';
  if (text.length <= maxLength) return text;

  // Cortar en el último espacio antes del límite
  const trimmed = text.substring(0, maxLength);
  const lastSpace = trimmed.lastIndexOf(' ');
  return trimmed.substring(0, lastSpace) + '...';
}

/**
 * Capitalizes only the first letter of a string, leaving the rest unchanged
 */
export function capitalizeFirst(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Formats a relative time string with capitalizeFirst
 */
export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSecs < 60) {
    return 'hace unos segundos';
  } else if (diffMins < 60) {
    return `hace ${diffMins} ${diffMins === 1 ? 'minuto' : 'minutos'}`;
  } else if (diffHours < 24) {
    return `hace ${diffHours} ${diffHours === 1 ? 'hora' : 'horas'}`;
  } else if (diffDays < 30) {
    return `hace ${diffDays} ${diffDays === 1 ? 'día' : 'días'}`;
  } else {
    return date.toLocaleDateString('es-ES');
  }
}
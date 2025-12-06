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
 * Extrae las primeras oraciones completas de un texto, terminando siempre en punto.
 * Ideal para resúmenes que no deben terminar con "..."
 * @param text - El texto largo
 * @param maxLength - Límite aproximado de caracteres (default: 150)
 * @returns Las primeras oraciones que quepan en el límite
 */
export function extractFirstSentences(text: string, maxLength: number = 150): string {
  if (!text) return '';
  if (text.length <= maxLength) return text;

  // Buscar puntos que terminan oraciones (seguidos de espacio o fin de texto)
  const sentenceEndings = [...text.matchAll(/[.!?](?:\s|$)/g)];

  if (sentenceEndings.length === 0) {
    // No hay puntos, devolver el texto truncado en el último espacio
    const trimmed = text.substring(0, maxLength);
    const lastSpace = trimmed.lastIndexOf(' ');
    return lastSpace > 0 ? trimmed.substring(0, lastSpace) + '.' : trimmed + '.';
  }

  // Encontrar las primeras oraciones que quepan en maxLength
  let result = '';
  for (const match of sentenceEndings) {
    const endIndex = match.index! + 1; // Incluir el punto
    if (endIndex <= maxLength) {
      result = text.substring(0, endIndex);
    } else {
      break;
    }
  }

  // Si no encontramos ninguna oración que quepa, tomar la primera de todas formas
  if (!result && sentenceEndings.length > 0) {
    result = text.substring(0, sentenceEndings[0].index! + 1);
  }

  return result.trim();
}

/**
 * Truncates text to a maximum length and adds ellipsis if truncated
 * @param text - The text to truncate
 * @param maxLength - Maximum length of the returned string (including ellipsis)
 * @param ellipsis - The ellipsis string to append (default: '...')
 * @returns Truncated text
 */
export function truncateText(
  text: string | undefined,
  maxLength: number = 100,
  ellipsis: string = '...'
): string {
  if (!text) return '';

  if (text.length <= maxLength) {
    return text;
  }

  // Subtract ellipsis length from max length
  const truncateLength = maxLength - ellipsis.length;

  // Find the last space within the truncate length to avoid cutting words
  const truncated = text.substring(0, truncateLength);
  const lastSpace = truncated.lastIndexOf(' ');

  // If there's a space, cut there; otherwise cut at truncate length
  const finalLength = lastSpace > 0 ? lastSpace : truncateLength;

  return text.substring(0, finalLength).trim() + ellipsis;
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
'use client';

import DOMPurify from 'dompurify';

/**
 * Componente para renderizar texto HTML con formato de RichTextEditor
 * Procesa HTML generado por TipTap incluyendo:
 * - Párrafos con alineación (text-align: justify, left, center, right)
 * - Estilos inline (strong, em, u, etc.)
 * - Listas (ul, ol)
 * - Blockquotes
 *
 * SEGURIDAD: Todo el HTML se sanitiza con DOMPurify para prevenir XSS
 */

interface FormattedTextProps {
    text: string;
    className?: string;
}

// Configuración de DOMPurify - solo permitimos tags seguros de RichTextEditor
const DOMPURIFY_CONFIG = {
    ALLOWED_TAGS: [
        'p', 'br', 'span', 'div',
        'strong', 'b', 'em', 'i', 'u', 's', 'strike',
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'ul', 'ol', 'li',
        'blockquote', 'pre', 'code',
        'a', 'hr', 'table', 'thead', 'tbody', 'tr', 'th', 'td'
    ],
    ALLOWED_ATTR: [
        'href', 'target', 'rel',
        'style', 'class',
        'colspan', 'rowspan'
    ],
    ALLOW_DATA_ATTR: false,
    FORBID_TAGS: ['script', 'iframe', 'object', 'embed', 'form', 'input'],
    FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover'],
};

export function FormattedText({ text, className = '' }: FormattedTextProps) {
    if (!text) return null;

    // Sanitizar el HTML para prevenir ataques XSS
    const sanitizedHtml = DOMPurify.sanitize(text, DOMPURIFY_CONFIG);

    return (
        <div
            className={`formatted-text-content space-y-2 ${className}`}
            dangerouslySetInnerHTML={{
                __html: sanitizedHtml
            }}
            style={{
                textAlign: 'justify'
            }}
        />
    );
}

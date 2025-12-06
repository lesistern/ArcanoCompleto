'use client';

/**
 * Componente para renderizar texto HTML con formato de RichTextEditor
 * Procesa HTML generado por TipTap incluyendo:
 * - Párrafos con alineación (text-align: justify, left, center, right)
 * - Estilos inline (strong, em, u, etc.)
 * - Listas (ul, ol)
 * - Blockquotes
 */

interface FormattedTextProps {
    text: string;
    className?: string;
}

export function FormattedText({ text, className = '' }: FormattedTextProps) {
    if (!text) return null;

    // El texto viene como HTML desde RichTextEditor (TipTap)
    // Lo renderizamos directamente con dangerouslySetInnerHTML
    // Aplicamos estilos globales a los elementos HTML que TipTap genera

    return (
        <div
            className={`formatted-text-content space-y-2 ${className}`}
            dangerouslySetInnerHTML={{
                __html: text
            }}
            style={{
                // Estilos globales para elementos HTML renderizados
                textAlign: 'justify'
            }}
        />
    );
}

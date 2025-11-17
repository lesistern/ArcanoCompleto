'use client';

import { useState, useRef } from 'react';
import { EyeOff, Eye } from 'lucide-react';
import Button from './Button';
import SpoilerText from './SpoilerText';

interface SpoilerEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  className?: string;
  label?: string;
}

/**
 * Editor de texto con soporte para spoilers
 *
 * Features:
 * - Botón para insertar spoiler tags
 * - Preview del texto con spoilers renderizados
 * - Textarea estándar con syntax highlighting básico
 *
 * Sintaxis de spoiler: ||texto oculto||
 *
 * Ejemplo de uso:
 * ```tsx
 * <SpoilerEditor
 *   value={notes}
 *   onChange={setNotes}
 *   label="Notas del Personaje"
 *   placeholder="Escribe tus notas aquí..."
 * />
 * ```
 */
export default function SpoilerEditor({
  value,
  onChange,
  placeholder = 'Escribe aquí...',
  rows = 6,
  className = '',
  label
}: SpoilerEditorProps) {
  const [showPreview, setShowPreview] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // ========================================================================
  // INSERTAR SPOILER
  // ========================================================================

  const insertSpoiler = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const beforeText = value.substring(0, start);
    const afterText = value.substring(end);

    // Si hay texto seleccionado, envolverlo en spoiler tags
    // Si no, insertar placeholder
    const newText = selectedText || 'texto oculto';
    const spoilerText = `||${newText}||`;

    const newValue = beforeText + spoilerText + afterText;
    onChange(newValue);

    // Mover cursor después del spoiler insertado
    setTimeout(() => {
      const newPosition = start + spoilerText.length;
      textarea.setSelectionRange(newPosition, newPosition);
      textarea.focus();
    }, 0);
  };

  // ========================================================================
  // RENDERIZAR PREVIEW CON SPOILERS
  // ========================================================================

  const renderPreview = () => {
    // Regex para encontrar ||texto|| y convertirlo en componente Spoiler
    const parts = value.split(/(\\|\\|.*?\\|\\|)/g);

    return parts.map((part, index) => {
      // Si es un spoiler (||texto||)
      if (part.startsWith('||') && part.endsWith('||')) {
        const spoilerContent = part.slice(2, -2); // Remover ||
        return (
          <SpoilerText key={index} mode="inline">
            {spoilerContent}
          </SpoilerText>
        );
      }

      // Texto normal
      return <span key={index}>{part}</span>;
    });
  };

  // ========================================================================
  // RENDER
  // ========================================================================

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Label */}
      {label && (
        <label className="block text-sm font-medium text-dungeon-300">
          {label}
        </label>
      )}

      {/* Toolbar */}
      <div className="flex items-center gap-2 border-b border-dungeon-700 pb-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={insertSpoiler}
          title="Insertar spoiler"
          type="button"
        >
          <EyeOff className="h-4 w-4 mr-1" />
          Spoiler
        </Button>

        <div className="flex-1" />

        <button
          onClick={() => setShowPreview(!showPreview)}
          className="text-xs text-dungeon-400 hover:text-dungeon-200 transition-colors"
          type="button"
        >
          {showPreview ? (
            <>
              <Eye className="h-3 w-3 inline mr-1" />
              Editar
            </>
          ) : (
            <>
              <Eye className="h-3 w-3 inline mr-1" />
              Preview
            </>
          )}
        </button>
      </div>

      {/* Editor / Preview */}
      {showPreview ? (
        // Preview
        <div className="min-h-[150px] p-3 bg-dungeon-900 border border-dungeon-700 rounded-lg text-dungeon-100 whitespace-pre-wrap">
          {value ? renderPreview() : (
            <span className="text-dungeon-500 italic">{placeholder}</span>
          )}
        </div>
      ) : (
        // Textarea
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          className="w-full px-3 py-2 bg-dungeon-900 border border-dungeon-700 rounded-lg text-dungeon-100 placeholder-dungeon-500 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent resize-vertical"
        />
      )}

      {/* Hint */}
      <p className="text-xs text-dungeon-500">
        💡 Usa <code className="bg-dungeon-800 px-1 rounded">||texto||</code> para crear spoilers. Selecciona texto y haz click en "Spoiler" para envolverlo automáticamente.
      </p>
    </div>
  );
}

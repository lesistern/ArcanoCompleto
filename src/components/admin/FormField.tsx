'use client';

import { AlertCircle, CheckCircle } from 'lucide-react';
import { ChangeEvent, FocusEvent } from 'react';

type InputType = 'text' | 'textarea' | 'select' | 'number' | 'email' | 'password';

interface FormFieldProps {
  /** Etiqueta del campo */
  label: string;
  /** Nombre del campo (para asociar con label) */
  name: string;
  /** Valor actual del campo */
  value?: string | number;
  /** Tipo de input */
  type?: InputType;
  /** Mensaje de error */
  error?: string | null;
  /** Texto de ayuda */
  hint?: string;
  /** Si el campo es requerido */
  required?: boolean;
  /** Si el campo está deshabilitado */
  disabled?: boolean;
  /** Número máximo de caracteres */
  maxLength?: number;
  /** Placeholder del input */
  placeholder?: string;
  /** Callback al cambiar el valor */
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  /** Callback al perder el foco */
  onBlur?: (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  /** Opciones para select */
  options?: Array<{ value: string | number; label: string }>;
  /** Si mostrar indicador de validación exitosa */
  showSuccess?: boolean;
  /** CSS clase personalizado */
  className?: string;
}

/**
 * Componente de campo de formulario reutilizable con validación integrada
 */
export function FormField({
  label,
  name,
  value,
  type = 'text',
  error,
  hint,
  required = false,
  disabled = false,
  maxLength,
  placeholder,
  onChange,
  onBlur,
  options,
  showSuccess = false,
  className = '',
}: FormFieldProps) {
  // Calcular conteo de caracteres
  const charCount = typeof value === 'string' ? value.length : 0;
  const hasMaxLength = maxLength && charCount > 0;
  const isNearLimit = hasMaxLength && charCount > maxLength * 0.9;

  // Estados visuales
  const hasError = !!error;
  const isValid = !hasError && showSuccess;

  // Clases dinámicas para el input
  const inputClasses = `
    w-full px-3 py-2 rounded-lg
    bg-dungeon-900 border transition-colors duration-200
    placeholder-dungeon-500 text-dungeon-100
    disabled:opacity-50 disabled:cursor-not-allowed
    focus:outline-none focus:ring-2 focus:ring-offset-0
    ${
      hasError
        ? 'border-red-500 focus:ring-red-400'
        : isValid
          ? 'border-green-500 focus:ring-green-400'
          : 'border-dungeon-600 hover:border-dungeon-500 focus:ring-gold-400'
    }
    ${isNearLimit ? 'border-orange-500' : ''}
  `;

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Label */}
      <label
        htmlFor={name}
        className="block text-sm font-medium text-dungeon-200"
      >
        {label}
        {required && (
          <span className="text-red-400 ml-1 font-bold" title="Campo requerido">
            *
          </span>
        )}
      </label>

      {/* Input/Textarea/Select */}
      {type === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          value={value || ''}
          disabled={disabled}
          maxLength={maxLength}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          className={`${inputClasses} resize-none font-mono text-sm`}
          rows={4}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${name}-error` : undefined}
        />
      ) : type === 'select' ? (
        <select
          id={name}
          name={name}
          value={value || ''}
          disabled={disabled}
          onChange={onChange}
          onBlur={onBlur}
          className={inputClasses}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${name}-error` : undefined}
        >
          <option value="">{placeholder || 'Seleccionar...'}</option>
          {options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <div className="relative">
          <input
            id={name}
            name={name}
            type={type}
            value={value || ''}
            disabled={disabled}
            maxLength={maxLength}
            placeholder={placeholder}
            onChange={onChange}
            onBlur={onBlur}
            className={inputClasses}
            aria-invalid={hasError}
            aria-describedby={hasError ? `${name}-error` : undefined}
          />

          {/* Icono de validación (esquina derecha) */}
          {isValid && (
            <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-400 flex-shrink-0 pointer-events-none" />
          )}
          {hasError && (
            <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-red-400 flex-shrink-0 pointer-events-none" />
          )}
        </div>
      )}

      {/* Contador de caracteres */}
      {hasMaxLength && (
        <div
          className={`text-xs text-right font-mono ${
            isNearLimit ? 'text-orange-400 font-semibold' : 'text-dungeon-400'
          }`}
        >
          {charCount} / {maxLength}
        </div>
      )}

      {/* Mensaje de error */}
      {hasError && (
        <div
          id={`${name}-error`}
          className="flex items-center gap-2 text-sm text-red-400 animate-in fade-in"
          role="alert"
        >
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Hint/Ayuda */}
      {hint && !hasError && (
        <p className="text-sm text-dungeon-400">{hint}</p>
      )}
    </div>
  );
}

/**
 * Sistema de Validación de Formularios
 * Validadores reutilizables con mensajes en español
 */

// ========================================
// TIPOS
// ========================================

export type ValidationResult =
  | { valid: true }
  | { valid: false; message: string };

export interface ValidationRule {
  validate: (value: any) => ValidationResult;
  message?: string;
}

export type ValidationRules<T> = {
  [K in keyof T]?: ValidationRule[];
};

export type ValidationErrors<T> = {
  [K in keyof T]?: string;
};

// ========================================
// VALIDADORES BÁSICOS
// ========================================

/**
 * Valida que el campo no esté vacío
 */
export function required(
  message: string = 'Este campo es requerido'
): ValidationRule {
  return {
    validate: (value: any) => {
      if (
        value === null ||
        value === undefined ||
        value === '' ||
        (Array.isArray(value) && value.length === 0)
      ) {
        return { valid: false, message };
      }
      return { valid: true };
    },
  };
}

/**
 * Valida longitud mínima de caracteres
 */
export function minLength(
  min: number,
  message?: string
): ValidationRule {
  return {
    validate: (value: any) => {
      const str = String(value || '');
      if (str.length < min) {
        return {
          valid: false,
          message:
            message ||
            `Mínimo ${min} caracteres requerido${min !== 1 ? 's' : ''}`,
        };
      }
      return { valid: true };
    },
  };
}

/**
 * Valida longitud máxima de caracteres
 */
export function maxLength(
  max: number,
  message?: string
): ValidationRule {
  return {
    validate: (value: any) => {
      const str = String(value || '');
      if (str.length > max) {
        return {
          valid: false,
          message:
            message ||
            `Máximo ${max} caracteres permitido${max !== 1 ? 's' : ''}`,
        };
      }
      return { valid: true };
    },
  };
}

/**
 * Valida que sea un email válido
 */
export function email(
  message: string = 'Ingrese un email válido'
): ValidationRule {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return {
    validate: (value: any) => {
      if (value && !emailRegex.test(String(value))) {
        return { valid: false, message };
      }
      return { valid: true };
    },
  };
}

/**
 * Valida que sea una URL válida
 */
export function url(
  message: string = 'Ingrese una URL válida'
): ValidationRule {
  return {
    validate: (value: any) => {
      if (!value) return { valid: true };
      try {
        new URL(String(value));
        return { valid: true };
      } catch {
        return { valid: false, message };
      }
    },
  };
}

/**
 * Valida que solo contenga números
 */
export function numeric(
  message: string = 'Solo se permiten números'
): ValidationRule {
  return {
    validate: (value: any) => {
      if (value && !/^\d+$/.test(String(value))) {
        return { valid: false, message };
      }
      return { valid: true };
    },
  };
}

/**
 * Valida que solo contenga letras y números
 */
export function alphanumeric(
  message: string = 'Solo se permiten letras y números'
): ValidationRule {
  return {
    validate: (value: any) => {
      if (value && !/^[a-zA-Z0-9]+$/.test(String(value))) {
        return { valid: false, message };
      }
      return { valid: true };
    },
  };
}

/**
 * Valida usando un patrón regex
 */
export function pattern(
  regex: RegExp,
  message: string = 'Formato inválido'
): ValidationRule {
  return {
    validate: (value: any) => {
      if (value && !regex.test(String(value))) {
        return { valid: false, message };
      }
      return { valid: true };
    },
  };
}

/**
 * Validación personalizada con función
 */
export function custom(
  validator: (value: any) => boolean,
  message: string = 'Validación fallida'
): ValidationRule {
  return {
    validate: (value: any) => {
      if (!validator(value)) {
        return { valid: false, message };
      }
      return { valid: true };
    },
  };
}

/**
 * Valida que el array tenga mínimo de elementos
 */
export function minItems(
  min: number,
  message?: string
): ValidationRule {
  return {
    validate: (value: any) => {
      if (!Array.isArray(value) || value.length < min) {
        return {
          valid: false,
          message:
            message ||
            `Mínimo ${min} elemento${min !== 1 ? 's' : ''} requerido${min !== 1 ? 's' : ''}`,
        };
      }
      return { valid: true };
    },
  };
}

/**
 * Valida que el array tenga máximo de elementos
 */
export function maxItems(
  max: number,
  message?: string
): ValidationRule {
  return {
    validate: (value: any) => {
      if (Array.isArray(value) && value.length > max) {
        return {
          valid: false,
          message:
            message ||
            `Máximo ${max} elemento${max !== 1 ? 's' : ''} permitido${max !== 1 ? 's' : ''}`,
        };
      }
      return { valid: true };
    },
  };
}

/**
 * Valida que sea dentro de un rango
 */
export function range(
  min: number,
  max: number,
  message?: string
): ValidationRule {
  return {
    validate: (value: any) => {
      const num = Number(value);
      if (isNaN(num) || num < min || num > max) {
        return {
          valid: false,
          message: message || `Ingrese un valor entre ${min} y ${max}`,
        };
      }
      return { valid: true };
    },
  };
}

/**
 * Valida que sea uno de los valores permitidos
 */
export function oneOf(
  allowedValues: any[],
  message?: string
): ValidationRule {
  return {
    validate: (value: any) => {
      if (!allowedValues.includes(value)) {
        return {
          valid: false,
          message: message || `Valor no permitido`,
        };
      }
      return { valid: true };
    },
  };
}

// ========================================
// FUNCIONES DE VALIDACIÓN
// ========================================

/**
 * Valida un campo contra un conjunto de reglas
 */
export function validateField(
  value: any,
  rules?: ValidationRule[]
): string | null {
  if (!rules || rules.length === 0) {
    return null;
  }

  for (const rule of rules) {
    const result = rule.validate(value);
    if (!result.valid) {
      return result.message;
    }
  }

  return null;
}

/**
 * Valida un objeto completo contra reglas de validación
 */
export function validateObject<T extends Record<string, any>>(
  object: T,
  rules: ValidationRules<T>
): ValidationErrors<T> {
  const errors: ValidationErrors<T> = {};

  for (const key in rules) {
    const fieldRules = rules[key];
    const value = object[key];

    const error = validateField(value, fieldRules);
    if (error) {
      errors[key] = error;
    }
  }

  return errors;
}

/**
 * Verifica si un objeto tiene errores de validación
 */
export function hasValidationErrors<T extends Record<string, any>>(
  errors: ValidationErrors<T>
): boolean {
  return Object.values(errors).some((error) => error !== undefined && error !== null);
}

/**
 * Obtiene el primer error de un objeto
 */
export function getFirstError<T extends Record<string, any>>(
  errors: ValidationErrors<T>
): string | null {
  for (const key in errors) {
    if (errors[key]) {
      return errors[key];
    }
  }
  return null;
}

// ========================================
// CONSTANTES
// ========================================

/**
 * Longitudes estándar para diferentes campos
 */
export const FIELD_LENGTHS = {
  // Textos cortos
  SHORT_MIN: 3,
  SHORT_MAX: 50,

  // Textos medios
  MEDIUM_MIN: 5,
  MEDIUM_MAX: 100,

  // Textos largos
  LONG_MIN: 10,
  LONG_MAX: 500,

  // Descripciones
  DESCRIPTION_MIN: 20,
  DESCRIPTION_MAX: 2000,

  // URLs
  URL_MIN: 5,
  URL_MAX: 2000,

  // Nombres
  NAME_MIN: 3,
  NAME_MAX: 100,
} as const;

/**
 * Patrones regex comunes
 */
export const PATTERNS = {
  // Alfanumérico con espacios y guiones
  SLUG: /^[a-z0-9-]+$/,
  // Nombre propio (puede tener espacios, acentos)
  NAME: /^[a-zA-ZáéíóúñÁÉÍÓÚÑ\s'-]+$/,
  // Números únicamente
  NUMERIC: /^\d+$/,
  // Hexadecimal (color)
  HEX_COLOR: /^#[0-9a-fA-F]{6}$/,
  // IP address
  IP_ADDRESS: /^(\d{1,3}\.){3}\d{1,3}$/,
} as const;

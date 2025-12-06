/**
 * Hook de Validación de Formularios
 * Validación en tiempo real con soporte para blur y onChange
 */

import { useState, useCallback, useMemo } from 'react';
import {
  ValidationRules,
  ValidationErrors,
  validateField,
  validateObject,
  hasValidationErrors,
} from '@/lib/utils/validation';

// ========================================
// TIPOS
// ========================================

export interface UseFormValidationOptions<T> {
  /** Habilitar validación al cambiar el campo */
  validateOnChange?: boolean;
  /** Habilitar validación al desenfocarse del campo */
  validateOnBlur?: boolean;
  /** Callback cuando cambian los errores */
  onValidationChange?: (errors: ValidationErrors<T>) => void;
  /** Callback cuando el formulario se vuelve válido/inválido */
  onValidityChange?: (isValid: boolean) => void;
}

export interface UseFormValidationReturn<T> {
  /** Valores actuales del formulario */
  values: T;
  /** Errores de validación */
  errors: ValidationErrors<T>;
  /** Campos que han sido tocados por el usuario */
  touched: Partial<Record<keyof T, boolean>>;
  /** Si el formulario es válido (sin errores) */
  isValid: boolean;
  /** Si hay campos que han sido modificados */
  isDirty: boolean;
  /** Actualizar valor de un campo */
  setFieldValue: (field: keyof T, value: any) => void;
  /** Marcar un campo como tocado */
  setFieldTouched: (field: keyof T, touched?: boolean) => void;
  /** Validar un campo específico */
  validateField: (field: keyof T, value: any) => string | null;
  /** Validar todos los campos */
  validateAll: () => ValidationErrors<T>;
  /** Limpiar errores */
  clearErrors: () => void;
  /** Resetear formulario a valores iniciales */
  reset: () => void;
  /** Establecer múltiples valores a la vez */
  setValues: (values: Partial<T>) => void;
  /** Marcar varios campos como tocados */
  setTouched: (touched: Partial<Record<keyof T, boolean>>) => void;
}

// ========================================
// HOOK
// ========================================

/**
 * Hook para validación de formularios con soporte para reglas complejas
 * @param initialValues - Valores iniciales del formulario
 * @param validationRules - Reglas de validación por campo
 * @param options - Opciones de configuración
 */
export function useFormValidation<T extends Record<string, any>>(
  initialValues: T,
  validationRules?: ValidationRules<T>,
  options: UseFormValidationOptions<T> = {}
): UseFormValidationReturn<T> {
  const {
    validateOnChange = true,
    validateOnBlur = true,
    onValidationChange,
    onValidityChange,
  } = options;

  // Estado del formulario
  const [values, setValuesState] = useState<T>(initialValues);
  const [errors, setErrorsState] = useState<ValidationErrors<T>>({});
  const [touched, setTouchedState] = useState<Partial<Record<keyof T, boolean>>>({});

  // Calcular si el formulario tiene cambios
  const isDirty = useMemo(() => {
    return JSON.stringify(values) !== JSON.stringify(initialValues);
  }, [values, initialValues]);

  // Calcular si el formulario es válido
  const isValid = useMemo(() => {
    return !hasValidationErrors(errors);
  }, [errors]);

  // Callback cuando cambia la validez
  const handleValidityChange = useCallback(
    (valid: boolean) => {
      if (onValidityChange) {
        onValidityChange(valid);
      }
    },
    [onValidityChange]
  );

  // Callback cuando cambian los errores
  const handleValidationChange = useCallback(
    (newErrors: ValidationErrors<T>) => {
      setErrorsState(newErrors);
      if (onValidationChange) {
        onValidationChange(newErrors);
      }
      handleValidityChange(!hasValidationErrors(newErrors));
    },
    [onValidationChange, handleValidityChange]
  );

  // Validar un campo específico
  const validateSingleField = useCallback(
    (field: keyof T, value: any): string | null => {
      const rules = validationRules?.[field];
      return validateField(value, rules) || null;
    },
    [validationRules]
  );

  // Actualizar valor de un campo
  const setFieldValue = useCallback(
    (field: keyof T, value: any) => {
      const newValues = { ...values, [field]: value };
      setValuesState(newValues);

      // Validar si está configurado
      if (validateOnChange && (touched[field] || Object.keys(touched).length > 0)) {
        const error = validateSingleField(field, value);
        const newErrors = { ...errors };

        if (error) {
          newErrors[field] = error;
        } else {
          delete newErrors[field];
        }

        handleValidationChange(newErrors);
      }
    },
    [values, touched, validateOnChange, validateSingleField, errors, handleValidationChange]
  );

  // Marcar un campo como tocado
  const setFieldTouched = useCallback(
    (field: keyof T, isTouched: boolean = true) => {
      const newTouched = { ...touched, [field]: isTouched };
      setTouchedState(newTouched);

      // Validar si está configurado
      if (validateOnBlur) {
        const error = validateSingleField(field, values[field]);
        const newErrors = { ...errors };

        if (error) {
          newErrors[field] = error;
        } else {
          delete newErrors[field];
        }

        handleValidationChange(newErrors);
      }
    },
    [touched, validateOnBlur, validateSingleField, values, errors, handleValidationChange]
  );

  // Validar todos los campos
  const validateAllFields = useCallback((): ValidationErrors<T> => {
    const allTouched = Object.keys(initialValues).reduce(
      (acc, key) => ({ ...acc, [key]: true }),
      {} as Record<keyof T, boolean>
    );
    setTouchedState(allTouched);

    const newErrors = validateObject(values, validationRules || {});
    handleValidationChange(newErrors);
    return newErrors;
  }, [initialValues, values, validationRules, handleValidationChange]);

  // Limpiar errores
  const clearErrors = useCallback(() => {
    handleValidationChange({});
  }, [handleValidationChange]);

  // Resetear formulario
  const reset = useCallback(() => {
    setValuesState(initialValues);
    setTouchedState({});
    handleValidationChange({});
  }, [initialValues, handleValidationChange]);

  // Establecer múltiples valores
  const setValues = useCallback(
    (newValues: Partial<T>) => {
      const updated = { ...values, ...newValues };
      setValuesState(updated);

      // Re-validar si hay errores
      if (Object.keys(errors).length > 0) {
        const newErrors = validateObject(updated, validationRules || {});
        handleValidationChange(newErrors);
      }
    },
    [values, errors, validationRules, handleValidationChange]
  );

  // Establecer campos tocados
  const setTouched = useCallback(
    (newTouched: Partial<Record<keyof T, boolean>>) => {
      setTouchedState(newTouched);

      if (validateOnBlur) {
        const newErrors = validateObject(values, validationRules || {});
        handleValidationChange(newErrors);
      }
    },
    [values, validateOnBlur, validationRules, handleValidationChange]
  );

  return {
    values,
    errors,
    touched,
    isValid,
    isDirty,
    setFieldValue,
    setFieldTouched,
    validateField: validateSingleField,
    validateAll: validateAllFields,
    clearErrors,
    reset,
    setValues,
    setTouched,
  };
}

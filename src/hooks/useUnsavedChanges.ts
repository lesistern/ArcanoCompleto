/**
 * Hook para detectar cambios sin guardar
 * Muestra warning al salir de la página si hay cambios pendientes
 */

import { useEffect } from 'react';

/**
 * Hook que muestra un warning cuando el usuario intenta salir de la página
 * sin guardar cambios
 * @param hasUnsavedChanges - Si hay cambios sin guardar
 * @param message - Mensaje personalizado (opcional)
 */
export function useUnsavedChanges(
  hasUnsavedChanges: boolean,
  message: string = 'Tienes cambios sin guardar. ¿Estás seguro de que quieres salir?'
) {
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = message;
        return message;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [hasUnsavedChanges, message]);
}

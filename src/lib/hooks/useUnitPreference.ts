'use client';

import { useState, useEffect, useCallback } from 'react';

export type UnitSystem = 'imperial' | 'metric';

const STORAGE_KEY = 'dnd-unit-preference';
const DEFAULT_UNIT: UnitSystem = 'imperial';

/**
 * Hook para gestionar la preferencia de unidades del usuario
 * Imperial (pies) es el valor por defecto
 * Se persiste en localStorage y se sincroniza entre componentes
 */
export function useUnitPreference() {
  const [unitSystem, setUnitSystemState] = useState<UnitSystem>(DEFAULT_UNIT);
  const [isLoaded, setIsLoaded] = useState(false);

  // Cargar preferencia de localStorage al montar
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'metric' || stored === 'imperial') {
      setUnitSystemState(stored);
    }
    setIsLoaded(true);
  }, []);

  // Escuchar cambios de otros componentes/pestañas
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        if (e.newValue === 'metric' || e.newValue === 'imperial') {
          setUnitSystemState(e.newValue);
        }
      }
    };

    // Escuchar evento personalizado para sincronizar dentro de la misma pestaña
    const handleCustomEvent = (e: CustomEvent<UnitSystem>) => {
      setUnitSystemState(e.detail);
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('unitPreferenceChange' as any, handleCustomEvent);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('unitPreferenceChange' as any, handleCustomEvent);
    };
  }, []);

  // Guardar preferencia en localStorage y notificar a otros componentes
  const setUnitSystem = useCallback((unit: UnitSystem) => {
    setUnitSystemState(unit);
    localStorage.setItem(STORAGE_KEY, unit);
    // Disparar evento personalizado para sincronizar en la misma pestaña
    window.dispatchEvent(new CustomEvent('unitPreferenceChange', { detail: unit }));
  }, []);

  // Toggle entre sistemas
  const toggleUnitSystem = useCallback(() => {
    const newUnit = unitSystem === 'imperial' ? 'metric' : 'imperial';
    setUnitSystem(newUnit);
  }, [unitSystem, setUnitSystem]);

  return {
    unitSystem,
    setUnitSystem,
    toggleUnitSystem,
    isImperial: unitSystem === 'imperial',
    isMetric: unitSystem === 'metric',
    isLoaded,
  };
}

/**
 * Obtener la preferencia de unidades sin React (para server components o utilidades)
 * Retorna 'imperial' por defecto si no hay localStorage disponible
 */
export function getUnitPreference(): UnitSystem {
  if (typeof window === 'undefined') return DEFAULT_UNIT;
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored === 'metric' ? 'metric' : 'imperial';
}

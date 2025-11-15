/**
 * Zustand Store para el Editor de Personajes
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Character, createEmptyCharacter, CharacterRace } from '@/lib/types/character';
import { AbilityScores, applyRacialModifiers, calculateAllModifiers } from '@/lib/utils/character';

interface CharacterStore {
  // Estado del personaje
  character: Partial<Character>;

  // Acciones básicas
  setCharacterName: (name: string) => void;
  setAlignment: (alignment: string) => void;
  setDeity: (deity: string) => void;

  // Raza
  setRace: (race: CharacterRace) => void;

  // Puntajes de habilidad
  setBaseAbilityScores: (scores: AbilityScores) => void;
  recalculateAbilityScores: () => void;

  // Utilidades
  resetCharacter: () => void;
  loadCharacter: (character: Partial<Character>) => void;
}

export const useCharacterStore = create<CharacterStore>()(
  persist(
    (set, get) => ({
      // Estado inicial
      character: createEmptyCharacter(),

      // Acciones
      setCharacterName: (name) =>
        set((state) => ({
          character: { ...state.character, name },
        })),

      setAlignment: (alignment) =>
        set((state) => ({
          character: { ...state.character, alignment },
        })),

      setDeity: (deity) =>
        set((state) => ({
          character: { ...state.character, deity },
        })),

      setRace: (race) =>
        set((state) => {
          const updatedCharacter = {
            ...state.character,
            race,
            effectiveCharacterLevel: 1 + race.levelAdjustment,
          };

          // Recalcular puntajes si ya existen puntajes base
          if (state.character.abilityScores?.base) {
            const racialScores = applyRacialModifiers(
              state.character.abilityScores.base,
              race.abilityModifiers
            );
            updatedCharacter.abilityScores = {
              ...state.character.abilityScores,
              racial: racialScores,
              current: racialScores,
            };
            updatedCharacter.abilityModifiers = calculateAllModifiers(racialScores);
          }

          return { character: updatedCharacter };
        }),

      setBaseAbilityScores: (scores) =>
        set((state) => {
          const character = { ...state.character };

          if (!character.abilityScores) {
            character.abilityScores = {
              base: scores,
              racial: scores,
              current: scores,
            };
          } else {
            character.abilityScores.base = scores;
          }

          // Si ya hay raza, aplicar modificadores
          if (character.race) {
            const racialScores = applyRacialModifiers(scores, character.race.abilityModifiers);
            character.abilityScores.racial = racialScores;
            character.abilityScores.current = racialScores;
            character.abilityModifiers = calculateAllModifiers(racialScores);
          } else {
            character.abilityScores.racial = scores;
            character.abilityScores.current = scores;
            character.abilityModifiers = calculateAllModifiers(scores);
          }

          return { character };
        }),

      recalculateAbilityScores: () =>
        set((state) => {
          const character = { ...state.character };

          if (!character.abilityScores?.base) return { character };

          // Aplicar modificadores raciales si hay raza
          if (character.race) {
            const racialScores = applyRacialModifiers(
              character.abilityScores.base,
              character.race.abilityModifiers
            );
            character.abilityScores.racial = racialScores;
            character.abilityScores.current = racialScores;
            character.abilityModifiers = calculateAllModifiers(racialScores);
          } else {
            character.abilityScores.racial = character.abilityScores.base;
            character.abilityScores.current = character.abilityScores.base;
            character.abilityModifiers = calculateAllModifiers(character.abilityScores.base);
          }

          return { character };
        }),

      resetCharacter: () =>
        set({ character: createEmptyCharacter() }),

      loadCharacter: (character) =>
        set({ character }),
    }),
    {
      name: 'dnd-character-storage',
      partialize: (state) => ({ character: state.character }),
    }
  )
);

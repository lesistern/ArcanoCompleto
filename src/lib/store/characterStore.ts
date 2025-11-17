/**
 * Zustand Store para el Editor de Personajes
 *
 * Con integración a Supabase para guardado automático
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Character, createEmptyCharacter, CharacterRace } from '@/lib/types/character';
import { AbilityScores, applyRacialModifiers, calculateAllModifiers } from '@/lib/utils/character';
import {
  createCharacter,
  updateCharacter,
  deleteCharacter,
  getCharacter,
  fromEditorFormat,
  toEditorFormat,
  type UpdateCharacterData
} from '@/lib/supabase/characters';
import { migrateAlignment } from '@/lib/utils/alignment';

interface CharacterStore {
  // Estado del personaje
  character: Partial<Character>;

  // Estado de Supabase
  characterId: string | null; // ID en Supabase (null si no está guardado)
  isSaving: boolean;
  lastSaved: string | null; // Timestamp del último guardado
  saveError: string | null;

  // Acciones básicas
  setCharacterName: (name: string) => void;
  setAlignment: (alignment: string) => void;
  setDeity: (deity: string) => void;
  setAvatarUrl: (avatarUrl: string) => void;

  // Raza
  setRace: (race: CharacterRace) => void;

  // Clase
  setClass: (characterClass: any, level?: number) => void; // any para evitar import circular

  // Puntajes de habilidad
  setBaseAbilityScores: (scores: AbilityScores) => void;
  recalculateAbilityScores: () => void;

  // Supabase
  saveToSupabase: () => Promise<void>;
  loadFromSupabase: (characterId: string) => Promise<void>;
  deleteFromSupabase: () => Promise<void>;
  autoSave: () => Promise<void>;

  // Utilidades
  resetCharacter: () => void;
  loadCharacter: (character: Partial<Character>) => void;
}

export const useCharacterStore = create<CharacterStore>()(
  persist(
    (set, get) => ({
      // Estado inicial
      character: createEmptyCharacter(),

      // Estado de Supabase
      characterId: null,
      isSaving: false,
      lastSaved: null,
      saveError: null,

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

      setAvatarUrl: (avatarUrl) =>
        set((state) => ({
          character: { ...state.character, avatarUrl },
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

      setClass: (characterClass, level = 1) =>
        set((state) => {
          const updatedCharacter = { ...state.character };

          // Por ahora solo soportamos una clase (sin multiclase)
          // Reemplazar el array de clases con la nueva clase
          updatedCharacter.classes = [
            {
              class: characterClass,
              level: level,
            },
          ];

          // Recalcular ECL (Effective Character Level)
          const totalClassLevels = level;
          const levelAdjustment = updatedCharacter.race?.levelAdjustment || 0;
          updatedCharacter.effectiveCharacterLevel = totalClassLevels + levelAdjustment;

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

      // ========================================================================
      // SUPABASE INTEGRATION
      // ========================================================================

      /**
       * Guarda el personaje en Supabase
       * Crea un nuevo registro si no tiene characterId, actualiza si existe
       */
      saveToSupabase: async () => {
        const state = get();

        // No guardar si ya se está guardando
        if (state.isSaving) {
          console.warn('Ya hay un guardado en progreso');
          return;
        }

        set({ isSaving: true, saveError: null });

        try {
          const characterData = fromEditorFormat(state.character);

          if (state.characterId) {
            // Actualizar existente
            await updateCharacter(state.characterId, characterData);
          } else {
            // Crear nuevo
            const newId = await createCharacter(characterData);
            set({ characterId: newId });
          }

          set({
            lastSaved: new Date().toISOString(),
            isSaving: false,
            saveError: null
          });

          console.log('Personaje guardado exitosamente en Supabase');
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
          console.error('Error al guardar personaje:', errorMessage);
          set({
            isSaving: false,
            saveError: errorMessage
          });
        }
      },

      /**
       * Carga un personaje desde Supabase por su ID
       */
      loadFromSupabase: async (characterId: string) => {
        set({ isSaving: true, saveError: null });

        try {
          const characterRow = await getCharacter(characterId);
          const character = toEditorFormat(characterRow);

          set({
            character,
            characterId: characterRow.id,
            lastSaved: characterRow.updated_at,
            isSaving: false,
            saveError: null
          });

          console.log('Personaje cargado exitosamente desde Supabase');
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
          console.error('Error al cargar personaje:', errorMessage);
          set({
            isSaving: false,
            saveError: errorMessage
          });
        }
      },

      /**
       * Elimina el personaje actual de Supabase
       */
      deleteFromSupabase: async () => {
        const state = get();

        if (!state.characterId) {
          console.warn('No hay personaje guardado para eliminar');
          return;
        }

        set({ isSaving: true, saveError: null });

        try {
          await deleteCharacter(state.characterId);

          // Resetear el personaje después de eliminar
          set({
            character: createEmptyCharacter(),
            characterId: null,
            lastSaved: null,
            isSaving: false,
            saveError: null
          });

          console.log('Personaje eliminado exitosamente de Supabase');
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
          console.error('Error al eliminar personaje:', errorMessage);
          set({
            isSaving: false,
            saveError: errorMessage
          });
        }
      },

      /**
       * Auto-guardado
       * Se llama cada 30 segundos desde el componente del editor
       */
      autoSave: async () => {
        const state = get();

        // Solo auto-guardar si:
        // 1. No se está guardando actualmente
        // 2. El personaje tiene al menos un nombre
        if (state.isSaving || !state.character.name) {
          return;
        }

        await get().saveToSupabase();
      },

      resetCharacter: () =>
        set({
          character: createEmptyCharacter(),
          characterId: null,
          lastSaved: null,
          saveError: null
        }),

      loadCharacter: (character) =>
        set({ character }),
    }),
    {
      name: 'dnd-character-storage',
      partialize: (state) => ({
        character: state.character,
        characterId: state.characterId,
        lastSaved: state.lastSaved
      }),
      onRehydrateStorage: () => (state) => {
        // Migrar alignment del formato antiguo (nombre completo) al nuevo (abreviatura)
        if (state?.character?.alignment) {
          const migratedAlignment = migrateAlignment(state.character.alignment);
          if (migratedAlignment) {
            state.character.alignment = migratedAlignment;
          }
        }
      },
    }
  )
);

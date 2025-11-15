# Guía del Editor de Personajes D&D 3.5

## 📋 Resumen

Este documento describe cómo usar las utilidades optimizadas para crear un editor de personajes con los datos de razas, clases y habilidades desde Supabase.

---

## 🗂️ Archivos Creados

### 1. **`src/lib/utils/character.ts`**
Funciones utilitarias para cálculos de personajes:
- Cálculo de modificadores de habilidad
- Aplicación de modificadores raciales
- Sistema de Point Buy (compra de puntos)
- Tirada de dados para habilidades (4d6 drop lowest)
- Formateo y validación

### 2. **`src/lib/types/character.ts`**
Tipos TypeScript para el sistema de personajes:
- `Character` - Estructura completa de un personaje
- `CharacterRace` - Raza optimizada para el editor
- `CharacterClass` - Clase optimizada para el editor
- `EXPERIENCE_TABLE` - Tabla de XP por nivel
- `SIZE_MODIFIERS` - Modificadores por tamaño

### 3. **`src/lib/services/raceService.ts`**
Servicio para cargar razas desde Supabase:
- `getAvailableRaces()` - Obtener razas disponibles
- `getRaceBySlug()` - Obtener raza específica
- `getRacesGrouped()` - Razas agrupadas por categoría
- `convertToCharacterRace()` - Conversión optimizada

---

## 🚀 Uso Rápido

### Ejemplo 1: Cargar Razas para Selector

```typescript
import { getAvailableRaces } from '@/lib/services/raceService';

// Solo razas del Player's Handbook sin LA
const coreRaces = await getAvailableRaces();

// Incluir razas suplementarias
const allRaces = await getAvailableRaces({
  includeSupplemental: true
});

// Incluir razas con Level Adjustment
const allRacesWithLA = await getAvailableRaces({
  includeSupplemental: true,
  includeWithLA: true
});
```

### Ejemplo 2: Aplicar Modificadores Raciales

```typescript
import { getRaceBySlug } from '@/lib/services/raceService';
import {
  applyRacialModifiers,
  calculateAllModifiers,
  rollAbilityScores
} from '@/lib/utils/character';

// 1. Usuario selecciona "Elfo"
const race = await getRaceBySlug('elfo');

// 2. Usuario genera puntajes (tirada o point buy)
const baseScores = rollAbilityScores();
// baseScores = { str: 13, dex: 15, con: 12, int: 10, wis: 14, cha: 8 }

// 3. Aplicar modificadores raciales del Elfo (+2 Des, -2 Con)
const finalScores = applyRacialModifiers(baseScores, race.abilityModifiers);
// finalScores = { str: 13, dex: 17, con: 10, int: 10, wis: 14, cha: 8 }

// 4. Calcular modificadores finales
const modifiers = calculateAllModifiers(finalScores);
// modifiers = { str: +1, dex: +3, con: 0, int: 0, wis: +2, cha: -1 }
```

### Ejemplo 3: Sistema de Point Buy

```typescript
import {
  calculatePointBuyCost,
  POINT_BUY_COSTS
} from '@/lib/utils/character';

// Usuario asigna puntajes
const scores = {
  str: 14, // Cuesta 6 puntos
  dex: 16, // Cuesta 10 puntos
  con: 12, // Cuesta 4 puntos
  int: 10, // Cuesta 2 puntos
  wis: 13, // Cuesta 5 puntos
  cha: 8   // Cuesta 0 puntos
};

// Calcular costo total
const totalCost = calculatePointBuyCost(scores); // 27 puntos

// Validar (estándar es 25 puntos)
if (totalCost > 25) {
  alert('Has usado demasiados puntos!');
}
```

### Ejemplo 4: Formatear Modificadores para UI

```typescript
import {
  formatModifier,
  getModifierColor
} from '@/lib/utils/character';

const dexMod = 3;

// Formatear con signo
const formatted = formatModifier(dexMod); // "+3"

// Obtener color para CSS
const color = getModifierColor(dexMod); // "positive"

// En componente React:
<span className={`
  ${color === 'positive' && 'text-green-400'}
  ${color === 'negative' && 'text-red-400'}
  ${color === 'neutral' && 'text-gray-400'}
`}>
  {formatted}
</span>
```

---

## 🎨 Componente de Ejemplo: Selector de Raza

```tsx
'use client';

import { useState, useEffect } from 'react';
import { CharacterRace } from '@/lib/types/character';
import { getAvailableRaces, getRacialModifiersSummary } from '@/lib/services/raceService';

export default function RaceSelector() {
  const [races, setRaces] = useState<CharacterRace[]>([]);
  const [selectedRace, setSelectedRace] = useState<CharacterRace | null>(null);

  useEffect(() => {
    getAvailableRaces().then(setRaces);
  }, []);

  return (
    <div className="space-y-4">
      <h2>Selecciona tu Raza</h2>

      <select
        onChange={(e) => {
          const race = races.find(r => r.slug === e.target.value);
          setSelectedRace(race || null);
        }}
        className="w-full p-2 border rounded"
      >
        <option value="">-- Selecciona una raza --</option>
        {races.map(race => (
          <option key={race.slug} value={race.slug}>
            {race.name}
            {race.levelAdjustment > 0 && ` (LA +${race.levelAdjustment})`}
          </option>
        ))}
      </select>

      {selectedRace && (
        <div className="bg-gray-100 p-4 rounded">
          <h3 className="font-bold">{selectedRace.name}</h3>
          <div className="space-y-2 mt-2 text-sm">
            <p>
              <strong>Tamaño:</strong> {selectedRace.size}
            </p>
            <p>
              <strong>Velocidad:</strong> {selectedRace.baseSpeed} pies
            </p>
            <p>
              <strong>Modificadores:</strong>{' '}
              {getRacialModifiersSummary(selectedRace)}
            </p>
            <p>
              <strong>Clase Favorita:</strong>{' '}
              {Array.isArray(selectedRace.favoredClass)
                ? selectedRace.favoredClass.join(', ')
                : selectedRace.favoredClass}
            </p>
            {selectedRace.darkvision && (
              <p>
                <strong>Visión en la oscuridad:</strong> {selectedRace.darkvision} pies
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
```

---

## 🎮 Flujo Completo del Editor de Personajes

```typescript
import { createEmptyCharacter } from '@/lib/types/character';
import { getRaceBySlug } from '@/lib/services/raceService';
import {
  rollAbilityScores,
  applyRacialModifiers,
  calculateAllModifiers
} from '@/lib/utils/character';

async function createNewCharacter(raceSl: string, characterName: string) {
  // 1. Crear personaje vacío
  const character = createEmptyCharacter();
  character.name = characterName;

  // 2. Seleccionar raza
  const race = await getRaceBySlug(raceSlug);
  if (!race) throw new Error('Raza no encontrada');

  // 3. Generar puntajes base
  const baseScores = rollAbilityScores();

  // 4. Aplicar modificadores raciales
  const racialScores = applyRacialModifiers(baseScores, race.abilityModifiers);

  // 5. Asignar al personaje
  character.abilityScores = {
    base: baseScores,
    racial: racialScores,
    current: racialScores, // Empieza igual a racial
  };

  // 6. Calcular modificadores
  character.abilityModifiers = calculateAllModifiers(racialScores);

  // 7. Calcular nivel efectivo (nivel de clase + LA)
  character.effectiveCharacterLevel = 1 + race.levelAdjustment;

  return character;
}
```

---

## 📊 Estructura de Datos Optimizada

### Base de Datos (Supabase)
```sql
-- Estructura actual en Supabase
races (
  slug TEXT PRIMARY KEY,
  name TEXT,
  size TEXT,
  base_speed INTEGER,
  ability_adjustments JSONB, -- { str: 0, dex: 2, con: -2, ... }
  favored_class TEXT,
  level_adjustment INTEGER,
  darkvision INTEGER,
  low_light_vision BOOLEAN,
  ...
)
```

### Frontend (TypeScript)
```typescript
// Formato optimizado para el editor
interface CharacterRace {
  slug: string;
  name: string;
  size: 'Pequeño' | 'Mediano' | 'Grande';
  baseSpeed: number;
  abilityModifiers: Partial<AbilityModifiers>; // Solo no-cero
  favoredClass: string | string[];
  levelAdjustment: number;
  darkvision?: number;
  lowLightVision?: boolean;
}
```

---

## 🔧 Próximos Pasos

### Para Implementar el Editor Completo:

1. **Crear página `/editor-personajes`**
   ```typescript
   // src/app/editor-personajes/page.tsx
   ```

2. **Componentes necesarios:**
   - `RaceSelector` - Selector de raza ✅
   - `AbilityScoreGenerator` - Tirada/Point Buy
   - `ClassSelector` - Selector de clase (pendiente)
   - `SkillsManager` - Gestión de skills (pendiente)
   - `FeatsSelector` - Selector de dotes (pendiente)
   - `EquipmentManager` - Gestión de equipo (pendiente)

3. **Estado del personaje:**
   - Usar Zustand, Redux o Context API
   - Guardar en localStorage para persistencia
   - Exportar a PDF cuando esté completo

4. **Validaciones:**
   - Point Buy no excede 25 puntos
   - Skills no exceden ranks máximos
   - Prerequisitos de dotes cumplidos
   - ECL calculado correctamente

---

## 📚 Referencias

- **Player's Handbook D&D 3.5** - Capítulo 1: Habilidades
- **SRD 3.5** - [dndtools.org](https://srd.dndtools.org/)
- **Point Buy Calculator** - Estándar 25 puntos
- **Character Sheet** - Formato oficial de Wizards of the Coast

---

## ✅ Ventajas de Esta Arquitectura

1. **Separación de responsabilidades**
   - `raceService.ts` - Datos desde Supabase
   - `character.ts` - Lógica de cálculos
   - `character.ts` (types) - Tipos TypeScript

2. **Optimización para performance**
   - Solo se cargan campos necesarios
   - Modificadores pre-calculados
   - Conversión de datos una sola vez

3. **Reutilizable**
   - Funciones puras y testeables
   - Tipos compartidos entre componentes
   - Fácil de extender con nuevas reglas

4. **Type-safe**
   - TypeScript estricto
   - Auto-completado en IDE
   - Errores en tiempo de compilación

---

**Última actualización:** 2025-01-14
**Versión:** 1.0.0

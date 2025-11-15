# 📊 Guía de Ejecución: Progresión de Clases

**Archivo**: `class_progression_complete-fixed.sql` ✅ (USAR ESTE)
**Tamaño**: ~386 líneas (corregido)
**Prioridad**: ALTA 🟡

**⚠️ IMPORTANTE**: Usar el archivo **`class_progression_complete-fixed.sql`**, no el original.
El archivo original contenía errores de columnas inexistentes que han sido corregidos.
Ver [SOLUCION_ERROR_PROGRESION.md](SOLUCION_ERROR_PROGRESION.md) para detalles del problema y solución.

---

## 🎯 ¿Qué hace este SQL?

Crea e inserta **220 registros** de progresión de clases (11 clases × 20 niveles):

### Tabla Creada:
- **`class_progression`** - Progresión completa niveles 1-20

**Columnas:**
- `class_slug` - Referencia a la clase (barbarian, bard, cleric, etc.)
- `level` - Nivel (1-20)
- `base_attack_bonus` - BAB por nivel ("+1", "+6/+1", "+15/+10/+5")
- `fort_save` - Salvación de Fortaleza
- `ref_save` - Salvación de Reflejos
- `will_save` - Salvación de Voluntad
- `special_abilities` - Habilidades especiales obtenidas
- `spells_per_day` - Conjuros por día (JSONB, para clases mágicas)

### Datos Incluidos:

**11 Clases Base:**
1. Barbarian (Bárbaro)
2. Bard (Bardo)
3. Cleric (Clérigo)
4. Druid (Druida)
5. Fighter (Guerrero)
6. Monk (Monje)
7. Paladin (Paladín)
8. Ranger (Explorador)
9. Rogue (Pícaro)
10. Sorcerer (Hechicero)
11. Wizard (Mago)

**220 Niveles Totales:**
- 20 niveles por clase
- BAB progresivo según tipo de clase
- Salvaciones (Fort/Ref/Will) por nivel
- Habilidades especiales por nivel
- Conjuros por día (clases mágicas)

---

## 📋 Instrucciones de Ejecución

### Paso 1: Abrir Supabase SQL Editor

```
https://supabase.com/dashboard/project/[tu-proyecto-id]/sql
```

### Paso 2: Copiar y Pegar el SQL

1. Abrir archivo `supabase/class_progression_complete-fixed.sql` ✅ (archivo corregido)
2. Copiar **TODO** el contenido (~386 líneas)
3. Pegar en Supabase SQL Editor

### Paso 3: Ejecutar

Click en "Run" y esperar confirmación

**Tiempo estimado**: 5-10 segundos

---

## ✅ Verificación

### 1. Verificar Tabla Creada

```sql
-- Verificar que la tabla existe
SELECT COUNT(*)
FROM information_schema.tables
WHERE table_name = 'class_progression';
-- Debe retornar: 1
```

### 2. Verificar Total de Registros

```sql
-- Contar registros totales
SELECT COUNT(*) FROM class_progression;
-- Resultado esperado: 220
```

### 3. Verificar Distribución por Clase

```sql
-- Ver cuántos niveles hay por clase
SELECT class_slug, COUNT(*) as levels
FROM class_progression
GROUP BY class_slug
ORDER BY class_slug;
-- Cada clase debe tener 20 niveles
```

**Resultado esperado:**
```
barbarian    | 20
bard         | 20
cleric       | 20
druid        | 20
fighter      | 20
monk         | 20
paladin      | 20
ranger       | 20
rogue        | 20
sorcerer     | 20
wizard       | 20
```

### 4. Ver Progresión de una Clase (Ejemplo: Fighter)

```sql
-- Ver progresión completa del Guerrero
SELECT
  level,
  base_attack_bonus as bab,
  fort_save,
  ref_save,
  will_save,
  special_abilities
FROM class_progression
WHERE class_slug = 'fighter'
ORDER BY level;
```

**Resultado esperado (primeros 5 niveles):**
```
level | bab | fort | ref | will | special_abilities
------|-----|------|-----|------|------------------
1     | +1  | 2    | 0   | 0    | Bonus feat
2     | +2  | 3    | 0   | 0    | Bonus feat
3     | +3  | 3    | 1   | 1    |
4     | +4  | 4    | 1   | 1    | Bonus feat
5     | +5  | 4    | 1   | 1    |
```

### 5. Ver Conjuros por Día (Ejemplo: Wizard)

```sql
-- Ver progresión de conjuros del Mago
SELECT
  level,
  spells_per_day
FROM class_progression
WHERE class_slug = 'wizard'
ORDER BY level
LIMIT 5;
```

**Resultado esperado:**
```json
// Nivel 1
{"0": 3, "1": 1}

// Nivel 2
{"0": 4, "1": 2}

// Nivel 3
{"0": 4, "1": 2, "2": 1}

// etc.
```

---

## 🎨 Impacto en el Frontend

### Páginas Afectadas:

**Página `/clases/[slug]`** - Ahora puede mostrar:
- ✅ Tabla completa de progresión 1-20
- ✅ BAB por nivel
- ✅ Salvaciones por nivel
- ✅ Habilidades especiales por nivel
- ✅ Conjuros por día (clases mágicas)

### Ejemplo de Query para Frontend:

```typescript
// Obtener progresión completa de una clase
const { data: progression } = await supabase
  .from('class_progression')
  .select('*')
  .eq('class_slug', 'barbarian')
  .order('level', { ascending: true });

// Resultado: Array de 20 objetos con toda la info por nivel
```

### Componente Recomendado:

```tsx
<ProgressionTable progression={progression} />
```

Mostrar tabla responsive con:
- Columnas: Nivel, BAB, Fort, Ref, Will, Habilidades Especiales
- Collapse en móviles
- Highlight de niveles importantes (5, 10, 15, 20)

---

## ⚠️ Notas Importantes

### El SQL hace lo siguiente:

1. **DROP TABLE IF EXISTS** - Elimina tabla anterior si existe
2. **CREATE TABLE** - Crea tabla nueva con constraints
3. **CREATE INDEX** - Crea índices en class_slug y level
4. **INSERT 220 registros** - Inserta progresión de 11 clases
5. **UPDATE classes** - Actualiza info básica de clases

### Seguridad:

- ✅ Usa `ON CONFLICT` para evitar duplicados
- ✅ Referencias con `ON DELETE CASCADE`
- ✅ Constraints de validación (level 1-20)
- ✅ Índices optimizados para queries rápidas

### Datos Scraped desde:

- **d20srd.org** - Scraping completo con cheerio + node-fetch
- **Validado manualmente** - Hit Die, class skills, weapon/armor proficiencies
- **Fuente oficial**: System Reference Document 3.5

---

## 🚀 Próximos Pasos (Después de Ejecutar)

1. **Verificar datos** con las queries de arriba
2. **Crear componente `<ProgressionTable>`** en frontend
3. **Integrar en `/clases/[slug]`** para mostrar progresión
4. **Testear responsive** en móviles

---

## 📊 Datos de Ejemplo

### Bárbaro (Barbarian) - Nivel 10

```
Level: 10
BAB: +10/+5
Fort: +7
Ref: +3
Will: +3
Special: Damage Reduction 2/-, Greater Rage
```

### Mago (Wizard) - Nivel 10

```
Level: 10
BAB: +5
Fort: +3
Ref: +3
Will: +7
Special: Bonus feat
Spells per day: {
  "0": 4,
  "1": 4,
  "2": 4,
  "3": 4,
  "4": 3,
  "5": 2
}
```

---

**¿Listo para ejecutar?** Copia el contenido de `class_progression_complete.sql` y ejecútalo en Supabase SQL Editor. 🚀

---

**Resultado esperado:**
- ✅ Tabla `class_progression` creada
- ✅ 220 registros insertados
- ✅ Índices creados
- ✅ Listo para usar en frontend

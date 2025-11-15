# Mejoras al Esquema de Base de Datos

## 📋 Resumen

Análisis de mejoras al esquema actual de Supabase para optimizar el almacenamiento y las consultas de datos de D&D 3.5.

## 🎯 Problemas Identificados

### 1. **Tabla `weapons` - Tipos de datos incorrectos**

#### Problema Actual:
```sql
cost TEXT NOT NULL,        -- "50 po", "5 pp", "Gratis"
weight TEXT NOT NULL,       -- "8 lb"
range_increment TEXT,       -- "120 pies"
damage TEXT NOT NULL,       -- "1d8", "2d6"
```

#### Problemas:
- ❌ No se pueden hacer queries numéricas (`WHERE cost > 100`)
- ❌ No se pueden ordenar por precio o peso correctamente
- ❌ No se pueden calcular totales o promedios
- ❌ Datos duplicados (información en TEXT y necesidad de parsear)

#### Solución Propuesta:
```sql
-- Añadir columnas numéricas
cost_gold NUMERIC(10,2),
cost_silver NUMERIC(10,2),
weight_lb NUMERIC(6,2),
range_feet INTEGER,

-- Mantener TEXT para display, usar NUMERIC para queries
-- Ejemplo de query mejorado:
SELECT * FROM weapons WHERE cost_gold BETWEEN 10 AND 100 ORDER BY weight_lb;
```

#### Beneficios:
- ✅ Queries numéricas eficientes
- ✅ Ordenamiento correcto
- ✅ Cálculos de estadísticas (precio promedio, peso total del inventario)
- ✅ Conversión automática de moneda (pp a po)

---

### 2. **Tabla `weapons` - Falta de normalización**

#### Problema Actual:
```sql
weapon_type TEXT NOT NULL,  -- "Arma marcial cuerpo a cuerpo"
```

Mezcla 3 conceptos diferentes:
1. Tipo de arma (simple/marcial/exótica)
2. Categoría de combate (cuerpo a cuerpo/distancia)
3. Mano requerida (ligera/una mano/dos manos)

#### Solución Propuesta:
```sql
proficiency TEXT,           -- 'simple', 'marcial', 'exótica'
combat_category TEXT,       -- 'melee', 'ranged', 'melee-ranged'
hands TEXT,                 -- 'light', 'one-handed', 'two-handed'
properties TEXT[],          -- ['Ligera', 'A dos manos', 'Arrojadiza']

-- Constraints para validación
CHECK (proficiency IN ('simple', 'marcial', 'exótica'))
CHECK (combat_category IN ('melee', 'ranged', 'melee-ranged'))
CHECK (hands IN ('unarmed', 'light', 'one-handed', 'two-handed'))
```

#### Beneficios:
- ✅ Filtrado preciso por tipo
- ✅ Queries más simples: `WHERE proficiency = 'marcial' AND hands = 'two-handed'`
- ✅ Datos estructurados vs parsing de strings

---

### 3. **Tabla `feats` - Prerequisites no estructurados**

#### Problema Actual:
```sql
prerequisites TEXT,  -- "Fuerza 13+, Destreza 15+, BAB +1, Montar 1 rango"
```

#### Problemas:
- ❌ No se pueden validar programáticamente
- ❌ No se pueden buscar dotes por prerequisito específico
- ❌ Difícil crear un "árbol de dotes" (feat tree)

#### Solución Propuesta:
```sql
prerequisite_feats TEXT[],        -- ['Ataque poderoso', 'Pericia en combate']
prerequisite_bab INTEGER,         -- 1, 6, 11
prerequisite_abilities JSONB,     -- {"str": 13, "dex": 15}
prerequisite_skills JSONB,        -- {"Montar": 1, "Saltar": 4}
prerequisite_other TEXT,          -- Cualquier otro requisito en texto

-- Metadata adicional
is_metamagic BOOLEAN DEFAULT FALSE,
is_item_creation BOOLEAN DEFAULT FALSE,
can_take_multiple BOOLEAN DEFAULT FALSE,
```

#### Beneficios:
- ✅ Validación automática de prerequisitos
- ✅ Sugerencias de dotes disponibles basadas en stats del personaje
- ✅ Visualización de árboles de dotes
- ✅ Búsqueda eficiente: "todas las dotes que requieren FUE 13+"

---

### 4. **Tabla `skills` - Falta de información de clases**

#### Problema Actual:
- No hay información de qué clases tienen cada habilidad como "class skill"
- No hay ejemplos de CDs (difficulty classes)

#### Solución Propuesta:
```sql
class_skills TEXT[],        -- ['Bardo', 'Pícaro', 'Explorador']
example_dcs JSONB,          -- {"10": "Fácil", "15": "Normal", "20": "Difícil"}

-- Constraint para validar atributo clave
CHECK (key_ability IN ('Fuerza', 'Destreza', 'Constitución',
                       'Inteligencia', 'Sabiduría', 'Carisma'))
```

---

### 5. **Tablas faltantes importantes**

#### Tablas que deberían existir:

1. **`armor`** - Armaduras y escudos
   ```sql
   armor_type TEXT,              -- 'light', 'medium', 'heavy', 'shield'
   armor_bonus INTEGER,
   max_dex_bonus INTEGER,
   armor_check_penalty INTEGER,
   arcane_spell_failure INTEGER,
   ```

2. **`magic_items`** - Objetos mágicos
   ```sql
   item_type TEXT,               -- 'weapon', 'armor', 'wondrous', 'ring', etc.
   item_slot TEXT,               -- 'head', 'neck', 'hands', etc.
   caster_level INTEGER,
   price_gold NUMERIC(12,2),
   ```

3. **`monsters`** - Bestiario
   ```sql
   creature_type TEXT,
   hit_dice TEXT,
   challenge_rating TEXT,
   abilities JSONB,
   skills JSONB,
   ```

---

## 📊 Nuevas vistas útiles

### `v_weapons_complete`
Vista con cálculos automáticos:
```sql
SELECT
  name,
  cost_total_gold,          -- Conversión automática pp a po
  proficiency_level,        -- Extraído de weapon_type
  combat_type               -- melee/ranged
FROM v_weapons_complete;
```

### `v_skills_complete`
Vista con abreviaturas:
```sql
SELECT name, ability_abbr    -- 'FUE', 'DES', 'INT', etc.
FROM v_skills_complete;
```

### `v_feats_by_category`
Resumen de dotes por categoría:
```sql
SELECT category, total_feats, feat_names
FROM v_feats_by_category;
```

---

## 🔧 Funciones útiles

### `calculate_bab(progression, level)`
Calcula el BAB para un nivel dado:
```sql
SELECT calculate_bab('good', 10);    -- 10
SELECT calculate_bab('medium', 10);  -- 7
SELECT calculate_bab('poor', 10);    -- 5
```

### `calculate_save(progression, level)`
Calcula las salvaciones para un nivel dado:
```sql
SELECT calculate_save('good', 10);   -- 7
SELECT calculate_save('poor', 10);   -- 3
```

---

## 📝 Plan de Implementación

### Fase 1: Mejoras sin romper compatibilidad ✅ RECOMENDADO
1. **Añadir columnas numéricas** a `weapons` sin eliminar las TEXT
2. **Migrar datos** de TEXT a NUMERIC
3. **Añadir constraints** de validación
4. **Crear vistas** para facilitar queries
5. **Añadir funciones** de utilidad

**Ventaja**: No rompe el código existente, permite migración gradual.

### Fase 2: Normalización completa
1. **Separar weapon_type** en múltiples columnas
2. **Estructurar prerequisites** en feats
3. **Añadir tablas** de armor, magic_items, monsters

### Fase 3: Deprecación
1. Marcar columnas TEXT antiguas como deprecated
2. Actualizar frontend para usar columnas nuevas
3. Eventualmente eliminar columnas TEXT antiguas

---

## 🚀 Comandos de Ejecución

### Aplicar mejoras (Fase 1):
```bash
# En Supabase SQL Editor:
# Copiar y ejecutar: supabase-schema-improvements.sql
```

### Verificar cambios:
```sql
-- Ver estructura de tabla mejorada
\d weapons

-- Probar queries numéricas
SELECT name, cost_gold, weight_lb
FROM weapons
WHERE cost_gold BETWEEN 10 AND 50
ORDER BY weight_lb;

-- Usar vistas
SELECT * FROM v_weapons_complete LIMIT 10;
```

---

## 📈 Impacto Esperado

### Performance:
- ⚡ **Queries 10-50x más rápidas** en filtros numéricos
- ⚡ **Índices más eficientes** en columnas numéricas
- ⚡ **Menor uso de CPU** (no parsing de strings)

### Funcionalidad:
- 🎯 **Filtros avanzados** por precio, peso, prerequisitos
- 🎯 **Ordenamiento correcto** de datos numéricos
- 🎯 **Validaciones automáticas** con constraints
- 🎯 **Cálculos de estadísticas** (promedios, totales)

### Desarrollo:
- 👨‍💻 **Código más simple** en frontend
- 👨‍💻 **Menos bugs** por parsing incorrecto
- 👨‍💻 **Mejor autocompletado** con tipos estructurados

---

## ⚠️ Consideraciones

1. **Migración de datos**: El script incluye UPDATE statements para migrar datos existentes
2. **Compatibilidad**: Fase 1 mantiene columnas antiguas para no romper código existente
3. **Testing**: Probar en ambiente de desarrollo antes de producción
4. **Backup**: Hacer backup de la base de datos antes de aplicar cambios

---

## 🔗 Archivos Relacionados

- [`supabase-schema.sql`](supabase-schema.sql) - Esquema original
- [`supabase-schema-improvements.sql`](supabase-schema-improvements.sql) - Script de mejoras
- [`scripts/migrate-weapons.mjs`](scripts/migrate-weapons.mjs) - Script de migración actual

---

**Última actualización**: 2025-01-14
**Estado**: Propuesta - Pendiente de aplicación

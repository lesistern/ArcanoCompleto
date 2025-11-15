# 📚 D&D 3.5 SRD - Estructura de Contenido

## 🎯 Objetivo

Este documento detalla la estructura completa del contenido de D&D 3.5 según el System Reference Document (SRD), organizado para implementación en el compendio.

**Fuente**: SRD 3.5 (Open Game License)
**Versión**: D&D 3.5 (ignorar contenido de 3.0)

---

## 📖 Índice de Contenido SRD

### 1. RAZAS (Races)

#### Razas Base del Player's Handbook
| Raza | Tamaño | Velocidad | Ajustes de Habilidad | Clase Favorecida |
|------|--------|-----------|---------------------|------------------|
| **Humano** | Mediano | 30 pies | Ninguno | Cualquiera |
| **Elfo** | Mediano | 30 pies | +2 Des, -2 Con | Mago |
| **Enano** | Mediano | 20 pies | +2 Con, -2 Car | Guerrero |
| **Mediano** | Pequeño | 20 pies | +2 Des, -2 Fue | Pícaro |
| **Semielfo** | Mediano | 30 pies | Ninguno | Cualquiera |
| **Semiorco** | Mediano | 30 pies | +2 Fue, -2 Int, -2 Car | Bárbaro |
| **Gnomo** | Pequeño | 20 pies | +2 Con, -2 Fue | Bardo |

#### Datos Necesarios por Raza:
```typescript
interface Race {
  slug: string
  name: string
  size: 'Diminuto' | 'Pequeño' | 'Mediano' | 'Grande'
  base_speed: number // en pies
  ability_adjustments: {
    str: number
    dex: number
    con: number
    int: number
    wis: number
    cha: number
  }
  racial_traits: string[] // ['Visión en la oscuridad', 'Familiaridad con armas']
  automatic_languages: string[] // ['Común', 'Élfico']
  bonus_languages: string[] // ['Dracónico', 'Gnoll', 'Goblin']
  favored_class: string // 'Mago', 'Cualquiera'
  level_adjustment: number // +0 para razas base
  special_abilities: string[]
  // Rasgos especiales
  darkvision?: number // rango en pies
  low_light_vision?: boolean
  weapon_familiarity?: string[]
  skill_bonuses?: { skill: string, bonus: number }[]
}
```

---

### 2. CLASES (Classes)

#### 2.1 Clases Base (11 clases)

| Clase | DG | Puntos Hab/Nivel | BAB | Fort | Ref | Vol | Lanzador |
|-------|----|-----------------:|-----|------|-----|-----|----------|
| **Bárbaro** | d12 | 4 + Int | Bueno | Bueno | Pobre | Pobre | No |
| **Bardo** | d6 | 6 + Int | Medio | Pobre | Bueno | Bueno | Arcano |
| **Clérigo** | d8 | 2 + Int | Medio | Bueno | Pobre | Bueno | Divino |
| **Druida** | d8 | 4 + Int | Medio | Bueno | Pobre | Bueno | Divino |
| **Guerrero** | d10 | 2 + Int | Bueno | Bueno | Pobre | Pobre | No |
| **Hechicero** | d4 | 2 + Int | Pobre | Pobre | Pobre | Bueno | Arcano |
| **Mago** | d4 | 2 + Int | Pobre | Pobre | Pobre | Bueno | Arcano |
| **Monje** | d8 | 4 + Int | Medio | Bueno | Bueno | Bueno | No |
| **Paladín** | d10 | 2 + Int | Bueno | Bueno | Pobre | Pobre | Divino |
| **Pícaro** | d6 | 8 + Int | Medio | Pobre | Bueno | Pobre | No |
| **Explorador** | d8 | 6 + Int | Bueno | Bueno | Bueno | Pobre | Divino |

#### Progresión de BAB:
- **Bueno**: +1 por nivel (ej: nivel 10 = +10)
- **Medio**: +3/4 por nivel (ej: nivel 10 = +7)
- **Pobre**: +1/2 por nivel (ej: nivel 10 = +5)

#### Progresión de Salvaciones:
- **Bueno**: 2 + nivel/2 (ej: nivel 10 = +7)
- **Pobre**: nivel/3 (ej: nivel 10 = +3)

#### Datos Necesarios por Clase:
```typescript
interface Class {
  slug: string
  name: string
  hit_die: 'd4' | 'd6' | 'd8' | 'd10' | 'd12'
  skill_points_per_level: number
  class_skills: string[] // slugs de habilidades
  weapon_proficiencies: string[]
  armor_proficiencies: string[]
  bab_progression: 'poor' | 'medium' | 'good'
  fortitude_save: 'poor' | 'good'
  reflex_save: 'poor' | 'good'
  will_save: 'poor' | 'good'
  spellcasting_ability?: 'Int' | 'Wis' | 'Cha'
  spells_per_day?: SpellsPerDay[]
  class_features_by_level: ClassFeature[]
}
```

#### 2.2 Clases de Prestigio (Prestige Classes)

Ejemplos del SRD:
- **Arcane Archer** (Arquero Arcano)
- **Arcane Trickster** (Bribón Arcano)
- **Assassin** (Asesino)
- **Blackguard** (Caballero Oscuro)
- **Dragon Disciple** (Discípulo del Dragón)
- **Duelist** (Duelista)
- **Dwarven Defender** (Defensor Enano)
- **Eldritch Knight** (Caballero Místico)
- **Hierophant** (Hierofante)
- **Horizon Walker** (Caminante del Horizonte)
- **Loremaster** (Maestro del Saber)
- **Mystic Theurge** (Teurgo Místico)
- **Shadowdancer** (Bailarín de las Sombras)

Requisitos comunes:
- BAB mínimo
- Nivel de lanzador de conjuros
- Rangos en habilidades específicas
- Dotes específicas
- Habilidades especiales

---

### 3. HABILIDADES (Skills)

#### Lista Completa de Habilidades (43 habilidades)

| Habilidad | Atributo Clave | Sólo Entrenado | Penalización Armadura |
|-----------|----------------|----------------|----------------------|
| Abrir Cerraduras | Des | Sí | Sí |
| Actuar | Car | No | No |
| Artesanía | Int | No | No |
| Avistar | Sab | No | No |
| Averiguar Intenciones | Sab | No | No |
| Buscar | Int | No | No |
| Concentración | Con | No | No |
| Conocimiento (arcano) | Int | Sí | No |
| Conocimiento (arquitectura e ingeniería) | Int | Sí | No |
| Conocimiento (dungeons) | Int | Sí | No |
| Conocimiento (geografía) | Int | Sí | No |
| Conocimiento (historia) | Int | Sí | No |
| Conocimiento (local) | Int | Sí | No |
| Conocimiento (naturaleza) | Int | Sí | No |
| Conocimiento (nobleza y realeza) | Int | Sí | No |
| Conocimiento (los planos) | Int | Sí | No |
| Conocimiento (religión) | Int | Sí | No |
|Craft (Artesanía) | Int | No | No |
| Descifrar Escritura | Int | Sí | No |
| Diplomacia | Car | No | No |
| Disfrazarse | Car | No | No |
| Escapismo | Des | No | Sí |
| Esconderse | Des | No | Sí |
| Escuchar | Sab | No | No |
| Equilibrio | Des | No | Sí |
| Engañar | Car | No | No |
| Equitación | Des | No | No |
| Falsificar | Int | No | No |
| Hablar Idioma | - | Sí | No |
| Inutilizar Mecanismo | Int | Sí | No |
| Intimidar | Car | No | No |
| Montar | Des | No | No |
| Nadar | Fue | No | Sí* |
| Oficio | Int | No | No |
| Piruetas | Des | No | Sí |
| Profesión | Sab | Sí | No |
| Reunir Información | Car | No | No |
| Sanar | Sab | No | No |
| Saltar | Fue | No | Sí* |
| Saber Arcano | Int | Sí | No |
| Tasación | Int | No | No |
| Trepar | Fue | No | Sí* |
| Trato con Animales | Car | Sí | No |
| Usar Objeto Mágico | Car | Sí | No |

\* Penalización por armadura x2

#### Sinergia entre Habilidades (Synergy):
- 5+ rangos en una habilidad otorga +2 a otra relacionada
- Ejemplos:
  - Engañar → Diplomacia
  - Esconderse → Moverse Sigilosamente
  - Saltar → Piruetas

---

### 4. DOTES (Feats)

#### Categorías de Dotes:

**General** (más de 100 dotes)
- Sin prerequisitos especiales
- Ejemplos: Alerta, Atletismo, Duro de Matar

**Combate** (40+ dotes)
- Usables en combate
- Ejemplos: Ataque Poderoso, Pericia con Arma, Combatir con Dos Armas

**Metamágica** (10 dotes)
- Modifican hechizos
- Ejemplos: Hechizo Maximizado, Hechizo Silencioso, Hechizo Extendido

**Creación de Objetos** (8 dotes)
- Permiten crear objetos mágicos
- Ejemplos: Crear Armas y Armaduras Mágicas, Crear Varita, Forjar Anillo

**Especiales**
- Dotes de metamorfosis
- Dotes divinas
- Dotes épicas (nivel 21+)

#### Estructura de Prerequisitos:
- **BAB mínimo**: +1, +4, +6, etc.
- **Atributos**: "Fuerza 13+", "Destreza 15+"
- **Habilidades**: "X rangos en Y habilidad"
- **Dotes previas**: "Dote A y Dote B"
- **Nivel de lanzador**: "Capaz de lanzar hechizos de nivel X"
- **Habilidades de clase**: "Furia, Ataque furtivo 2d6"

---

### 5. CONJUROS (Spells)

#### Escuelas de Magia (8 + Universal):
1. **Abjuración** - Protección
2. **Conjuración** - Invocar y transportar
3. **Adivinación** - Revelar información
4. **Encantamiento** - Controlar mentes
5. **Evocación** - Energía y fuerza
6. **Ilusión** - Engañar sentidos
7. **Nigromancia** - Muerte y no-muertos
8. **Transmutación** - Cambiar propiedades
9. **Universal** - No pertenece a ninguna escuela

#### Subescuelas (Ejemplos):
- **Conjuración**: Convocación, Creación, Curación, Invocación, Teletransportación
- **Adivinación**: Clarividencia, Profecía
- **Encantamiento**: Compulsión, Hechizo
- **Ilusión**: Figmento, Glamour, Patrón, Fantasma, Sombra

#### Descriptores Comunes:
- Ácido, Aire, Caótico, Frío, Oscuridad, Eléctrico
- Fuego, Fuerza, Legal, Luz, Mental, Sónico, Tierra
- Mal, Bien, Agua, Afecta la Mente, Muerte, Miedo, Lenguaje

#### Niveles de Hechizo por Clase:
```typescript
interface SpellListing {
  spell_slug: string
  class_levels: {
    class: string
    level: number // 0-9
  }[]
}
```

Ejemplo:
- **Bola de Fuego** (Fireball)
  - Mago/Hechicero: 3
  - Ninguna otra clase

#### Componentes de Hechizo:
- **V** - Verbal (palabras)
- **S** - Somático (gestos)
- **M** - Material (componentes físicos)
- **F** - Foco (objeto reutilizable)
- **DF** - Foco Divino (símbolo sagrado)
- **XP** - Coste en puntos de experiencia

#### Datos de Hechizo:
```typescript
interface Spell {
  slug: string
  name: string
  school: string // Escuela
  subschool?: string
  descriptors: string[] // [Fuego], [Mal, Miedo]

  // Nivel por clase
  levels: { class: string, level: number }[]

  // Casting
  casting_time: string // '1 acción estándar', '1 minuto'
  components: {
    verbal: boolean
    somatic: boolean
    material: boolean
    focus: boolean
    divine_focus: boolean
    xp: boolean
    material_components?: string
    focus_description?: string
    xp_cost?: number
  }

  // Efectos
  range: string // 'Cerca (25 pies + 5 pies/2 niveles)'
  area?: string
  effect?: string
  target?: string
  duration: string
  saving_throw: string // 'Reflejos mitad', 'Voluntad anula'
  spell_resistance: string // 'Sí', 'No'

  // Descripción
  description: string

  // Fuente
  source_book: string
  source_page?: number
}
```

---

### 6. EQUIPO

#### 6.1 ARMAS

Ya tenemos implementadas **72 armas mundanas**, pero el SRD incluye más categorías:

##### Categorías de Armas:
1. **Armas Simples**
   - Cuerpo a Cuerpo: Sin arma, Ligeras, A una mano, A dos manos
   - Distancia: Proyectiles, Arrojadizas

2. **Armas Marciales**
   - Cuerpo a Cuerpo: Ligeras, A una mano, A dos manos
   - Distancia: Proyectiles, Arrojadizas

3. **Armas Exóticas**
   - Cuerpo a Cuerpo: Ligeras, A una mano, A dos manos
   - Distancia: Proyectiles, Arrojadizas

##### Propiedades Especiales de Armas:
- **Alcance** (Reach): Ataque a 10 pies
- **Arrojadiza**: Puede lanzarse
- **Doble**: Dos extremos atacables
- **A dos manos**: Requiere dos manos
- **Desarmable**: No se puede desarmar
- **Montado**: Bonificadores al usarse montado
- **Disparo de tropel**: Para ataques de oportunidad

#### 6.2 ARMADURAS Y ESCUDOS

##### Armadura Ligera:
| Nombre | Bon CA | Dex Max | Penalización | Fallo Arcano | Velocidad 30/20 | Peso | Costo |
|--------|--------|---------|--------------|--------------|-----------------|------|-------|
| Acolchada | +1 | +8 | 0 | 5% | 30/20 | 10 lb | 5 po |
| Cuero | +2 | +6 | 0 | 10% | 30/20 | 15 lb | 10 po |
| Cuero Tachonado | +3 | +5 | -1 | 15% | 30/20 | 20 lb | 25 po |
| Camisa de Mallas | +4 | +4 | -2 | 20% | 30/20 | 25 lb | 100 po |

##### Armadura Media:
| Nombre | Bon CA | Dex Max | Penalización | Fallo Arcano | Velocidad 30/20 | Peso | Costo |
|--------|--------|---------|--------------|--------------|-----------------|------|-------|
| Pieles | +3 | +4 | -3 | 20% | 20/15 | 25 lb | 15 po |
| Camisote de Mallas | +5 | +2 | -5 | 30% | 20/15 | 40 lb | 200 po |
| Coraza | +5 | +3 | -4 | 25% | 20/15 | 30 lb | 200 po |
| Cota de Mallas | +6 | +2 | -5 | 30% | 20/15 | 40 lb | 150 po |

##### Armadura Pesada:
| Nombre | Bon CA | Dex Max | Penalización | Fallo Arcano | Velocidad 30/20 | Peso | Costo |
|--------|--------|---------|--------------|--------------|-----------------|------|-------|
| Cota de Bandas | +6 | +1 | -6 | 35% | 20/15 | 35 lb | 250 po |
| Semiplaca | +7 | +0 | -7 | 40% | 20/15 | 50 lb | 600 po |
| Placas Completas | +8 | +1 | -6 | 35% | 20/15 | 50 lb | 1500 po |

##### Escudos:
| Nombre | Bon CA | Penalización | Fallo Arcano | Peso | Costo |
|--------|--------|--------------|--------------|------|-------|
| Broquel | +1 | -1 | 5% | 5 lb | 15 po |
| Escudo Ligero (Madera) | +1 | -1 | 5% | 5 lb | 3 po |
| Escudo Ligero (Acero) | +1 | -1 | 5% | 6 lb | 9 po |
| Escudo Pesado (Madera) | +2 | -2 | 15% | 10 lb | 7 po |
| Escudo Pesado (Acero) | +2 | -2 | 15% | 15 lb | 20 po |
| Escudo de Cuerpo | +4 | -10 | 50% | 45 lb | 30 po |

#### 6.3 EQUIPO GENERAL

##### Equipo de Aventurero:
- **Mochila**: 2 po, 2 lb
- **Odre**: 1 po, 4 lb (lleno)
- **Cuerda de Cáñamo (50 pies)**: 1 po, 10 lb
- **Cuerda de Seda (50 pies)**: 10 po, 5 lb
- **Antorchas (10)**: 1 pp, 10 lb
- **Raciones de Viaje (por día)**: 5 pp, 1 lb
- **Pedernal y Yesca**: 1 po, -
- **Saco**: 1 pp, 1/2 lb
- **Aceite (1 pinta)**: 1 pp, 1 lb

##### Herramientas Especiales:
- **Herramientas de Ladrón**: 30 po, 1 lb
- **Herramientas de Artesano**: 5 po, 5 lb
- **Kit de Escalada**: 80 po, 5 lb
- **Kit de Curación**: 50 po, 1 lb
- **Símbolo Sagrado (Madera)**: 1 po, -
- **Símbolo Sagrado (Plata)**: 25 po, 1 lb

---

### 7. OBJETOS MÁGICOS

#### 7.1 Categorías de Objetos Mágicos

##### Armas Mágicas:
- **Bonificadores**: +1 a +5
- **Propiedades especiales**: Ígnea, Helada, Impactante, Venenosa, etc.
- **Armas específicas**: Espada de Respuestas, Daga de Veneno, etc.

##### Armaduras Mágicas:
- **Bonificadores**: +1 a +5
- **Propiedades especiales**: Sombra, Silenciosa, Slick, etc.
- **Armaduras específicas**: Armadura del Mando, Placas del Dragón, etc.

##### Pociones y Aceites:
- Equivalentes a hechizos de nivel 0-3
- Nivel de lanzador 1-5

##### Pergaminos:
- Hechizos de nivel 0-9
- Arcanos o divinos

##### Varitas:
- Hechizos de nivel 0-4
- 50 cargas

##### Objetos Maravillosos:
Divididos por slot corporal:
- **Sin Slot**: Bolsa de Retención, Cuerda de Escalada, etc.
- **Cabeza**: Diademas, Cascos
- **Ojos**: Gafas, Lentes
- **Cuello**: Amuletos, Medallones
- **Hombros**: Capas, Mantos
- **Pecho**: Túnicas, Chalecos
- **Cuerpo**: Ropas, Vestiduras
- **Cintura**: Cinturones, Fajas
- **Muñecas**: Brazales, Pulseras
- **Manos**: Guantes, Manoplas
- **Anillos**: (máximo 2)
- **Pies**: Botas, Sandalias

##### Anillos:
- Anillo de Protección
- Anillo de Invisibilidad
- Anillo de Regeneración
- Anillo de Deseos (limitados o ilimitados)

##### Báculos:
- Sólo para lanzadores divinos
- Múltiples poderes

##### Cetros:
- Poderes especiales
- No requieren lanzador de conjuros

---

### 8. MONSTRUOS

#### 8.1 Tipos de Criatura (14 tipos)

1. **Aberración** - Anatomía extraña, mental
2. **Animal** - Bestias no mágicas
3. **Constructo** - Creados artificialmente
4. **Dragón** - Reptiles alados poderosos
5. **Elemental** - Criaturas de energía pura
6. **Fey** - Criaturas feéricas
7. **Gigante** - Humanoides muy grandes
8. **Humanoide** - Forma humana
9. **Humanoide Monstruoso** - Mezcla humano-bestia
10. **Cieno** - Masas amorfas
11. **Planta** - Vegetación animada
12. **No-Muerto** - Muertos animados
13. **Forastero** - De otros planos
14. **Vermin** - Insectos y arácnidos gigantes

#### 8.2 Datos de Monstruo:
```typescript
interface Monster {
  slug: string
  name: string

  // Básicos
  creature_type: string
  creature_subtypes: string[]
  size: 'Diminuto' | 'Pequeño' | 'Mediano' | 'Grande' | 'Enorme' | 'Colosal'

  // Combate
  hit_dice: string // '4d8+12'
  hit_points: { average: number, formula: string }
  initiative: number
  speed: {
    base: string // '30 pies'
    fly?: string // '60 pies (buena)'
    swim?: string
    burrow?: string
    climb?: string
  }

  // Defensa
  armor_class: number
  touch_ac: number
  flat_footed_ac: number

  // Ataque
  base_attack_bonus: number
  grapple_bonus: number
  attacks: string[] // ['Mordisco +8 (1d8+6)']
  full_attack: string
  space: string // '5 pies'
  reach: string // '5 pies'
  special_attacks: string[]
  special_qualities: string[]

  // Salvaciones
  saves: {
    fort: number
    ref: number
    will: number
  }

  // Atributos
  abilities: {
    str: number
    dex: number
    con: number
    int: number
    wis: number
    cha: number
  }

  // Habilidades y dotes
  skills: { [skillName: string]: number }
  feats: string[]

  // Ecología
  environment: string
  organization: string
  challenge_rating: string // '1', '1/2', '1/4'
  treasure: string
  alignment: string
  advancement: string
  level_adjustment?: string

  description: string
  source_book: string
  source_page?: number
}
```

#### 8.3 Ejemplos de Monstruos Icónicos:

**Bajo CR (1-3)**:
- Goblin (CR 1/3)
- Kobold (CR 1/4)
- Orc (CR 1/2)
- Gnoll (CR 1)
- Hobgoblin (CR 1/2)

**CR Medio (4-10)**:
- Ogro (CR 3)
- Troll (CR 5)
- Owlbear (CR 4)
- Minotauro (CR 4)
- Medusa (CR 7)

**Alto CR (11+)**:
- Dragón Adulto (CR variable)
- Balor (CR 20)
- Pit Fiend (CR 20)
- Tarrasque (CR 20)

---

### 9. REGLAS DE COMBATE

#### 9.1 Acciones en Combate

**Acciones Estándar**:
- Ataque (cuerpo a cuerpo o distancia)
- Lanzar un conjuro
- Activar un objeto mágico
- Usar una habilidad especial

**Acciones de Movimiento**:
- Moverse hasta tu velocidad
- Levantarse de prone
- Preparar/guardar escudo
- Montar/desmontar

**Acciones de Asalto Completo**:
- Ataque completo (múltiples ataques)
- Cargar (movimiento + ataque)
- Correr (4x velocidad)
- Retirada (movimiento defensivo)

**Acciones Gratuitas**:
- Soltar objeto
- Caer prone
- Hablar

**Acciones Inmediatas**:
- Respuesta instantánea fuera de tu turno

**Acciones de Reacción**:
- Ataques de oportunidad

#### 9.2 Modificadores de Ataque

| Situación | Modificador |
|-----------|-------------|
| Atacante en terreno elevado | +1 |
| Defensor prone | +4 cuerpo a cuerpo, -4 distancia |
| Defensor indefenso | Automático crítico |
| Cobertura | -2 a -8 |
| Ocultamiento | 20% miss chance |
| Flanquear | +2 |
| Apuntar | +1 |

---

### 10. CONDICIONES

**Estados negativos**:
- **Aturdido** (Stunned): No puede actuar
- **Cegado** (Blinded): -2 CA, pierde bonif Dex
- **Confundido** (Confused): Actúa aleatoriamente
- **Ensordecido** (Deafened): -4 Iniciativa
- **Exhausto** (Exhausted): -6 Fue y Des, no puede correr
- **Fatigado** (Fatigued): -2 Fue y Des, no puede correr
- **Indefenso** (Helpless): Dex = 0
- **Invisible**: +2 ataque, ignora bonif Dex del enemigo
- **Náusea** (Nauseated): Sólo acción de movimiento
- **Paralizado** (Paralyzed): Dex = 0, indefenso
- **Petrificado** (Petrified): Convertido en piedra
- **Prone**: -4 cuerpo a cuerpo, +4 vs distancia
- **Atontado** (Dazed): No puede actuar, mantiene bonif Dex

---

### 11. PLAN DE IMPLEMENTACIÓN

#### Prioridad 1 (Core Rules) - COMPLETADO ✅:
- [x] Razas básicas
- [x] Habilidades (43)
- [x] Dotes básicas (34+)
- [x] Armas mundanas (72)

#### Prioridad 2 (Essential Content):
- [ ] **Clases Base** (11 clases)
  - Progresión por nivel (1-20)
  - Características de clase
  - Competencias
  - Hechizos por día

- [ ] **Armaduras y Escudos**
  - Armadura ligera (4)
  - Armadura media (4)
  - Armadura pesada (3)
  - Escudos (6)

- [ ] **Conjuros** (300+ hechizos del core)
  - Nivel 0-9
  - Todas las clases lanzadoras

#### Prioridad 3 (Extended Content):
- [ ] Clases de Prestigio (13+)
- [ ] Dotes avanzadas
- [ ] Equipo general
- [ ] Objetos mágicos básicos
- [ ] Monstruos comunes (CR 1-5)

#### Prioridad 4 (Complete SRD):
- [ ] Objetos mágicos completos
- [ ] Bestiario completo
- [ ] Reglas avanzadas
- [ ] Condiciones y estados

---

### 12. FUENTES DE DATOS SRD

**Recursos Open Game Content**:
- https://www.d20srd.org/ - SRD 3.5 oficial
- https://www.5esrd.com/ - (ignorar, es 5e)
- System Reference Document v3.5 (PDF oficial de WotC)

**Libros Core de 3.5**:
1. **Player's Handbook** (PHB)
2. **Dungeon Master's Guide** (DMG)
3. **Monster Manual** (MM)

**Limitaciones SRD**:
- ❌ No incluye nombres de deidades específicas
- ❌ No incluye descripciones de setting (Forgotten Realms, etc.)
- ❌ No incluye contenido de expansiones (Complete Warrior, etc.)
- ✅ Incluye todo el contenido mecánico core
- ✅ Incluye ~50% del contenido total de los 3 libros core

---

### 13. ESTRUCTURA DE BASE DE DATOS RECOMENDADA

Según el análisis de optimización ([optimizaciondb.md](optimizaciondb.md)), necesitamos:

#### Tablas Actuales ✅:
- `feats` (dotes)
- `skills` (habilidades)
- `weapons` (armas)

#### Tablas por Crear 📋:
- `races` (razas)
- `classes` (clases)
- `class_features` (características por nivel)
- `class_spells_per_day` (hechizos por día)
- `spells` (conjuros)
- `spell_class_levels` (nivel de hechizo por clase)
- `armor` (armaduras)
- `magic_items` (objetos mágicos)
- `monsters` (monstruos)

#### Mejoras Pendientes 🔧:
- Añadir columnas numéricas a `weapons`
- Estructurar `prerequisites` en `feats`
- Añadir `class_skills` a `skills`
- Crear vistas y funciones de utilidad

---

**Última actualización**: 2025-01-14
**Fuente**: D&D 3.5 System Reference Document (OGL)
**Estado**: Documentación base completa

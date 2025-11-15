/**
 * Diccionario de terminología oficial D&D 3.5 en español
 * Basado en traducciones de Devir Iberia
 */

export const SPELL_TERMINOLOGY = {
  // Términos comunes de mecánicas
  'caster level': 'nivel de lanzador',
  'spell level': 'nivel de conjuro',
  'hit points': 'puntos de golpe',
  'hit dice': 'dados de golpe',
  'damage': 'daño',
  'healing': 'curación',
  'points of damage': 'puntos de daño',
  'per level': 'por nivel',
  'per caster level': 'por nivel de lanzador',
  'spell resistance': 'resistencia a conjuros',
  'saving throw': 'tirada de salvación',
  'ranged touch attack': 'ataque de toque a distancia',
  'melee touch attack': 'ataque de toque cuerpo a cuerpo',
  'touch attack': 'ataque de toque',
  'attack roll': 'tirada de ataque',
  'bonus': 'bonificación',
  'penalty': 'penalización',
  'round': 'asalto',
  'turn': 'turno',
  'minute': 'minuto',
  'hour': 'hora',
  'day': 'día',
  'permanent': 'permanente',
  'instantaneous': 'instantáneo',
  'concentration': 'concentración',
  'dismiss': 'disipar',
  'discharge': 'descargar',

  // Tiradas de salvación
  'fortitude': 'Fortaleza',
  'reflex': 'Reflejos',
  'will': 'Voluntad',
  'negates': 'anula',
  'half': 'mitad',
  'partial': 'parcial',
  'none': 'ninguna',

  // Rangos
  'personal': 'Personal',
  'touch': 'Toque',
  'close': 'Cercano',
  'medium': 'Medio',
  'long': 'Largo',
  'unlimited': 'Ilimitado',
  'range': 'alcance',

  // Áreas
  'target': 'objetivo',
  'targets': 'objetivos',
  'creature': 'criatura',
  'creatures': 'criaturas',
  'object': 'objeto',
  'objects': 'objetos',
  'area': 'área',
  'effect': 'efecto',
  'radius': 'radio',
  'cone': 'cono',
  'line': 'línea',
  'cylinder': 'cilindro',
  'sphere': 'esfera',
  'burst': 'explosión',
  'emanation': 'emanación',
  'spread': 'extensión',

  // Duraciones
  'instantaneous': 'Instantáneo',
  'permanent': 'Permanente',
  'concentration': 'Concentración',
  'rounds': 'asaltos',
  'minutes': 'minutos',
  'hours': 'horas',
  'days': 'días',
  'until discharged': 'hasta descargarse',
  'until triggered': 'hasta activarse',

  // Componentes
  'verbal': 'verbal',
  'somatic': 'somático',
  'material': 'material',
  'focus': 'foco',
  'divine focus': 'foco divino',
  'experience points': 'puntos de experiencia',
  'XP cost': 'coste en PX',

  // Habilidades
  'Strength': 'Fuerza',
  'Dexterity': 'Destreza',
  'Constitution': 'Constitución',
  'Intelligence': 'Inteligencia',
  'Wisdom': 'Sabiduría',
  'Charisma': 'Carisma',

  // Criaturas y tipos
  'undead': 'muerto viviente',
  'construct': 'constructo',
  'elemental': 'elemental',
  'humanoid': 'humanoide',
  'outsider': 'forastero',
  'aberration': 'aberración',
  'dragon': 'dragón',
  'magical beast': 'bestia mágica',
  'animal': 'animal',
  'plant': 'planta',
  'vermin': 'alimaña',
  'ooze': 'cieno',

  // Escuelas de magia
  'Abjuration': 'Abjuración',
  'Conjuration': 'Conjuración',
  'Divination': 'Adivinación',
  'Enchantment': 'Encantamiento',
  'Evocation': 'Evocación',
  'Illusion': 'Ilusión',
  'Necromancy': 'Nigromancia',
  'Transmutation': 'Transmutación',
  'Universal': 'Universal',

  // Descriptores
  'acid': 'ácido',
  'cold': 'frío',
  'fire': 'fuego',
  'electricity': 'electricidad',
  'sonic': 'sónico',
  'force': 'de fuerza',
  'light': 'luz',
  'darkness': 'oscuridad',
  'fear': 'miedo',
  'mind-affecting': 'afecta a la mente',
  'language-dependent': 'dependiente del idioma',
  'evil': 'mal',
  'good': 'bien',
  'lawful': 'legal',
  'chaotic': 'caótico',

  // Acciones
  'standard action': 'acción estándar',
  'move action': 'acción de movimiento',
  'full-round action': 'acción de asalto completo',
  'swift action': 'acción rápida',
  'immediate action': 'acción inmediata',
  'free action': 'acción gratuita',

  // Términos de combate
  'armor class': 'clase de armadura',
  'AC': 'CA',
  'hit': 'impacto',
  'miss': 'fallo',
  'critical hit': 'impacto crítico',
  'critical threat': 'amenaza de crítico',
  'attack of opportunity': 'ataque de oportunidad',
  'flat-footed': 'desprevenido',
  'invisible': 'invisible',
  'concealment': 'ocultamiento',
  'cover': 'cobertura',

  // Condiciones
  'blinded': 'cegado',
  'dazzled': 'deslumbrado',
  'deafened': 'ensordecido',
  'stunned': 'aturdido',
  'paralyzed': 'paralizado',
  'petrified': 'petrificado',
  'poisoned': 'envenenado',
  'diseased': 'enfermo',
  'exhausted': 'exhausto',
  'fatigued': 'fatigado',
  'nauseated': 'con náuseas',
  'sickened': 'enfermizo',
  'frightened': 'asustado',
  'panicked': 'presa del pánico',
  'shaken': 'sacudido',
  'confused': 'confundido',
  'charmed': 'hechizado',
  'dominated': 'dominado',

  // Verbos comunes
  'cast': 'lanzar',
  'target': 'hacer objetivo',
  'affect': 'afectar',
  'create': 'crear',
  'summon': 'convocar',
  'teleport': 'teletransportar',
  'transform': 'transformar',
  'dispel': 'disipar',
  'counter': 'contrarrestar',
  'detect': 'detectar',
  'identify': 'identificar',
  'protect': 'proteger',
  'heal': 'curar',
  'restore': 'restaurar',
  'enhance': 'mejorar',
  'grant': 'otorgar',
  'bestow': 'conferir',
  'remove': 'eliminar',
  'suppress': 'suprimir',
  'duplicate': 'duplicar',

  // Otros
  'you': 'el lanzador', // Evitar "tú" en descripciones
  'the caster': 'el lanzador',
  'the subject': 'el objetivo',
  'the target': 'el objetivo',
  'willing': 'voluntario',
  'unwilling': 'involuntario',
  'allied': 'aliado',
  'hostile': 'hostil',
  'friendly': 'amistoso',
  'magical': 'mágico',
  'supernatural': 'sobrenatural',
  'extraordinary': 'extraordinario',
  'spell-like': 'similar a conjuro',
};

// Reglas especiales de traducción
export const TRANSLATION_RULES = {
  // Mantener formato de dados
  preserveDiceNotation: true, // "1d8" se mantiene como "1d8"

  // Mantener números y medidas
  preserveNumbers: true,

  // Capitalización de nombres de hechizos
  capitalizeSpellNames: true,

  // Mantener nombres propios
  preserveProperNouns: [
    "Melf's",
    "Bigby's",
    "Mordenkainen's",
    "Tasha's",
    "Otiluke's",
    "Evard's",
    "Rary's",
    "Leomund's",
    "Drawmij's",
    "Nystul's",
    "Tenser's",
  ],
};

export default {
  SPELL_TERMINOLOGY,
  TRANSLATION_RULES,
};

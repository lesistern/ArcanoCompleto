/**
 * Character Templates / Presets - Pool de Inspiraciones
 *
 * Plantillas predefinidas de personajes organizadas por clase y alineamiento
 * para ayudar a usuarios bloqueados en la creación de personajes.
 *
 * Cada plantilla incluye:
 * - Concepto temático del personaje
 * - Clase y raza sugerida
 * - Alineamiento
 * - Distribución sugerida de habilidades (Point Buy 25 pts)
 * - Trasfondo breve
 */

export interface CharacterTemplate {
  id: string;
  name: string;
  description: string;
  concept: string; // Concepto en 1 línea (ej: "Guerrero tribal de las estepas")
  class_slug: string;
  class_name: string;
  race_slug: string;
  race_name: string;
  alignment: string; // Código abreviado (LG, NG, etc.)
  alignment_name: string; // Nombre completo (Legal Bueno, etc.)

  // Ability scores sugeridas (Point Buy 25 pts)
  suggested_abilities: {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
  };

  // Habilidades (skills) recomendadas para enfocarse
  recommended_skills: string[];

  // Dotes sugeridas para nivel 1
  suggested_feats: string[];

  // Tags para filtrado
  tags: string[]; // ej: ['combate', 'magia', 'furtividad', 'social']
}

// ============================================================================
// PLANTILLAS DE BÁRBARO
// ============================================================================

const barbarianTemplates: CharacterTemplate[] = [
  {
    id: 'barbarian-tribal-warrior',
    name: 'Guerrero Tribal',
    description: 'Un feroz combatiente de las estepas que confía en su fuerza bruta y resistencia. Criado en una tribu nómada, aprendió a sobrevivir en las tierras salvajes.',
    concept: 'Guerrero tribal de las estepas del norte',
    class_slug: 'barbarian',
    class_name: 'Bárbaro',
    race_slug: 'human',
    race_name: 'Humano',
    alignment: 'CN',
    alignment_name: 'Caótico Neutral',
    suggested_abilities: {
      strength: 16,      // +2 racial = 18
      dexterity: 14,
      constitution: 14,
      intelligence: 8,
      wisdom: 12,
      charisma: 10
    },
    recommended_skills: ['Supervivencia', 'Intimidar', 'Escuchar', 'Saltar'],
    suggested_feats: ['Power Attack', 'Weapon Focus (Greataxe)'],
    tags: ['combate', 'fuerza', 'supervivencia', 'tribal']
  },
  {
    id: 'barbarian-berserker',
    name: 'Berserker Vikingo',
    description: 'Guerrero furioso que entra en un frenesí de batalla incontrolable. Procedente de tierras heladas, honra a sus ancestros con cada victoria.',
    concept: 'Guerrero vikingo sediento de gloria en combate',
    class_slug: 'barbarian',
    class_name: 'Bárbaro',
    race_slug: 'dwarf',
    race_name: 'Enano',
    alignment: 'CG',
    alignment_name: 'Caótico Bueno',
    suggested_abilities: {
      strength: 16,      // +2 racial = 18
      dexterity: 12,
      constitution: 14,  // +2 racial = 16
      intelligence: 10,
      wisdom: 10,
      charisma: 8        // -2 racial = 6
    },
    recommended_skills: ['Trepar', 'Intimidar', 'Saltar', 'Nadar'],
    suggested_feats: ['Toughness', 'Endurance'],
    tags: ['combate', 'furia', 'resistencia', 'vikingo']
  }
];

// ============================================================================
// PLANTILLAS DE BARDO
// ============================================================================

const bardTemplates: CharacterTemplate[] = [
  {
    id: 'bard-traveling-minstrel',
    name: 'Trovador Viajero',
    description: 'Músico carismático que viaja de pueblo en pueblo contando historias y cantando baladas. Usa su encanto para abrir puertas y obtener información.',
    concept: 'Músico itinerante que recolecta historias del mundo',
    class_slug: 'bard',
    class_name: 'Bardo',
    race_slug: 'halfling',
    race_name: 'Mediano',
    alignment: 'NG',
    alignment_name: 'Neutral Bueno',
    suggested_abilities: {
      strength: 8,
      dexterity: 14,     // +2 racial = 16
      constitution: 12,
      intelligence: 12,
      wisdom: 10,
      charisma: 16
    },
    recommended_skills: ['Interpretar', 'Diplomacia', 'Reunir información', 'Conocimiento (historia)'],
    suggested_feats: ['Skill Focus (Perform)', 'Persuasive'],
    tags: ['social', 'música', 'diplomacia', 'viajero']
  },
  {
    id: 'bard-court-spy',
    name: 'Espía de Corte',
    description: 'Bardo astuto que usa su posición como entretenedor para infiltrarse en círculos nobles. Recopila secretos y manipula eventos políticos.',
    concept: 'Intrigante de corte disfrazado de músico',
    class_slug: 'bard',
    class_name: 'Bardo',
    race_slug: 'half-elf',
    race_name: 'Semielfo',
    alignment: 'N',
    alignment_name: 'Neutral',
    suggested_abilities: {
      strength: 10,
      dexterity: 14,
      constitution: 12,
      intelligence: 14,
      wisdom: 12,
      charisma: 14
    },
    recommended_skills: ['Engañar', 'Diplomacia', 'Reunir información', 'Sentir motivación'],
    suggested_feats: ['Deceitful', 'Alertness'],
    tags: ['social', 'espionaje', 'intriga', 'noble']
  }
];

// ============================================================================
// PLANTILLAS DE CLÉRIGO
// ============================================================================

const clericTemplates: CharacterTemplate[] = [
  {
    id: 'cleric-war-priest',
    name: 'Sacerdote Guerrero',
    description: 'Clérigo devoto que lucha en la primera línea de batalla, bendiciendo aliados y aplastando enemigos en nombre de su dios de la guerra.',
    concept: 'Campeón divino que predica con espada y escudo',
    class_slug: 'cleric',
    class_name: 'Clérigo',
    race_slug: 'human',
    race_name: 'Humano',
    alignment: 'LG',
    alignment_name: 'Legal Bueno',
    suggested_abilities: {
      strength: 14,      // +2 racial = 16
      dexterity: 10,
      constitution: 14,
      intelligence: 10,
      wisdom: 16,
      charisma: 12
    },
    recommended_skills: ['Concentración', 'Conocimiento (religión)', 'Conjuros'],
    suggested_feats: ['Combat Casting', 'Weapon Focus (Warhammer)'],
    tags: ['combate', 'divino', 'sanación', 'guerra']
  },
  {
    id: 'cleric-healer',
    name: 'Sanador Compasivo',
    description: 'Clérigo dedicado a sanar heridas y curar enfermedades. Recorre el mundo ayudando a los necesitados y aliviando el sufrimiento.',
    concept: 'Médico divino que salva vidas con magia sagrada',
    class_slug: 'cleric',
    class_name: 'Clérigo',
    race_slug: 'elf',
    race_name: 'Elfo',
    alignment: 'NG',
    alignment_name: 'Neutral Bueno',
    suggested_abilities: {
      strength: 10,
      dexterity: 12,     // +2 racial = 14
      constitution: 12,  // -2 racial = 10
      intelligence: 10,
      wisdom: 16,
      charisma: 14
    },
    recommended_skills: ['Sanar', 'Concentración', 'Diplomacia', 'Conocimiento (religión)'],
    suggested_feats: ['Augment Healing', 'Empower Spell'],
    tags: ['sanación', 'divino', 'compasivo', 'apoyo']
  }
];

// ============================================================================
// PLANTILLAS DE DRUIDA
// ============================================================================

const druidTemplates: CharacterTemplate[] = [
  {
    id: 'druid-forest-guardian',
    name: 'Guardián del Bosque',
    description: 'Druida protector de un bosque sagrado que lucha contra aquellos que amenazan el equilibrio natural. Acompañado por un lobo leal.',
    concept: 'Defensor de la naturaleza con vínculo animal profundo',
    class_slug: 'druid',
    class_name: 'Druida',
    race_slug: 'human',
    race_name: 'Humano',
    alignment: 'N',
    alignment_name: 'Neutral',
    suggested_abilities: {
      strength: 12,
      dexterity: 12,
      constitution: 14,  // +2 racial = 16
      intelligence: 10,
      wisdom: 16,
      charisma: 10
    },
    recommended_skills: ['Trato con animales', 'Supervivencia', 'Conocimiento (naturaleza)', 'Avistar'],
    suggested_feats: ['Natural Spell', 'Track'],
    tags: ['naturaleza', 'bestias', 'forma salvaje', 'protector']
  },
  {
    id: 'druid-storm-caller',
    name: 'Invocador de Tormentas',
    description: 'Druida que canaliza la furia de los elementos. Invoca rayos y tempestades para castigar a quienes profanan la tierra.',
    concept: 'Chamán elemental que controla el clima',
    class_slug: 'druid',
    class_name: 'Druida',
    race_slug: 'half-orc',
    race_name: 'Semiorco',
    alignment: 'N',
    alignment_name: 'Neutral',
    suggested_abilities: {
      strength: 14,      // +2 racial = 16
      dexterity: 10,
      constitution: 14,
      intelligence: 8,   // -2 racial = 6
      wisdom: 16,
      charisma: 10
    },
    recommended_skills: ['Concentración', 'Supervivencia', 'Conjuros', 'Conocimiento (naturaleza)'],
    suggested_feats: ['Spell Focus (Evocation)', 'Combat Casting'],
    tags: ['elementos', 'tormenta', 'magia', 'chamán']
  }
];

// ============================================================================
// PLANTILLAS DE GUERRERO
// ============================================================================

const fighterTemplates: CharacterTemplate[] = [
  {
    id: 'fighter-knight',
    name: 'Caballero Noble',
    description: 'Guerrero honorable entrenado en las artes marciales y el código caballeresco. Defiende a los débiles y lucha por la justicia.',
    concept: 'Paladín secular con armadura reluciente',
    class_slug: 'fighter',
    class_name: 'Guerrero',
    race_slug: 'human',
    race_name: 'Humano',
    alignment: 'LG',
    alignment_name: 'Legal Bueno',
    suggested_abilities: {
      strength: 16,      // +2 racial = 18
      dexterity: 12,
      constitution: 14,
      intelligence: 10,
      wisdom: 10,
      charisma: 12
    },
    recommended_skills: ['Montar', 'Intimidar', 'Conocimiento (nobleza)'],
    suggested_feats: ['Mounted Combat', 'Weapon Focus (Longsword)', 'Weapon Specialization (Longsword)'],
    tags: ['combate', 'honor', 'caballería', 'noble']
  },
  {
    id: 'fighter-archer',
    name: 'Arquero Élite',
    description: 'Maestro del arco que nunca falla su objetivo. Entrenado en arquería de precisión, elimina amenazas desde la distancia.',
    concept: 'Tirador experto con puntería letal',
    class_slug: 'fighter',
    class_name: 'Guerrero',
    race_slug: 'elf',
    race_name: 'Elfo',
    alignment: 'NG',
    alignment_name: 'Neutral Bueno',
    suggested_abilities: {
      strength: 14,
      dexterity: 16,     // +2 racial = 18
      constitution: 12,  // -2 racial = 10
      intelligence: 10,
      wisdom: 14,
      charisma: 8
    },
    recommended_skills: ['Avistar', 'Escuchar', 'Artesanía (fabricar arcos)'],
    suggested_feats: ['Point Blank Shot', 'Precise Shot', 'Rapid Shot'],
    tags: ['combate', 'arco', 'precisión', 'distancia']
  }
];

// ============================================================================
// PLANTILLAS DE MONJE
// ============================================================================

const monkTemplates: CharacterTemplate[] = [
  {
    id: 'monk-zen-master',
    name: 'Maestro Zen',
    description: 'Monje contemplativo que busca la iluminación a través de la disciplina y la meditación. Sus golpes fluyen como el agua.',
    concept: 'Asceta que perfecciona cuerpo y mente en armonía',
    class_slug: 'monk',
    class_name: 'Monje',
    race_slug: 'human',
    race_name: 'Humano',
    alignment: 'LN',
    alignment_name: 'Legal Neutral',
    suggested_abilities: {
      strength: 12,
      dexterity: 16,     // +2 racial = 18
      constitution: 12,
      intelligence: 10,
      wisdom: 16,
      charisma: 8
    },
    recommended_skills: ['Saltar', 'Equilibrio', 'Trepar', 'Esconderse'],
    suggested_feats: ['Improved Unarmed Strike', 'Stunning Fist', 'Dodge'],
    tags: ['combate', 'desarmado', 'disciplina', 'movilidad']
  },
  {
    id: 'monk-drunken-master',
    name: 'Maestro Ebrio',
    description: 'Monje poco ortodoxo que combina técnicas marciales con movimientos erráticos. Su estilo impredecible confunde a los enemigos.',
    concept: 'Luchador caótico con estilo de borracho',
    class_slug: 'monk',
    class_name: 'Monje',
    race_slug: 'halfling',
    race_name: 'Mediano',
    alignment: 'CN',
    alignment_name: 'Caótico Neutral',
    suggested_abilities: {
      strength: 10,
      dexterity: 16,     // +2 racial = 18
      constitution: 14,
      intelligence: 8,
      wisdom: 14,
      charisma: 12
    },
    recommended_skills: ['Acrobacias', 'Saltar', 'Interpretar', 'Equilibrio'],
    suggested_feats: ['Mobility', 'Spring Attack'],
    tags: ['combate', 'acrobacias', 'impredecible', 'caótico']
  }
];

// ============================================================================
// PLANTILLAS DE PALADÍN
// ============================================================================

const paladinTemplates: CharacterTemplate[] = [
  {
    id: 'paladin-holy-crusader',
    name: 'Cruzado Sagrado',
    description: 'Paladín devoto que erradica el mal dondequiera que lo encuentre. Portador de luz divina, sus enemigos tiemblan ante su presencia.',
    concept: 'Campeón divino que purga la oscuridad',
    class_slug: 'paladin',
    class_name: 'Paladín',
    race_slug: 'human',
    race_name: 'Humano',
    alignment: 'LG',
    alignment_name: 'Legal Bueno',
    suggested_abilities: {
      strength: 16,      // +2 racial = 18
      dexterity: 10,
      constitution: 14,
      intelligence: 10,
      wisdom: 12,
      charisma: 14
    },
    recommended_skills: ['Diplomacia', 'Sanar', 'Conocimiento (religión)'],
    suggested_feats: ['Extra Smiting', 'Weapon Focus (Greatsword)'],
    tags: ['combate', 'divino', 'justicia', 'anti-mal']
  },
  {
    id: 'paladin-defender',
    name: 'Defensor Inquebrantable',
    description: 'Paladín que se especializa en proteger a los inocentes. Su escudo es un bastión contra las fuerzas del mal.',
    concept: 'Guardaespaldas sagrado con voto de protección',
    class_slug: 'paladin',
    class_name: 'Paladín',
    race_slug: 'dwarf',
    race_name: 'Enano',
    alignment: 'LG',
    alignment_name: 'Legal Bueno',
    suggested_abilities: {
      strength: 14,
      dexterity: 10,
      constitution: 16,  // +2 racial = 18
      intelligence: 8,
      wisdom: 12,
      charisma: 12       // -2 racial = 10
    },
    recommended_skills: ['Sanar', 'Diplomacia', 'Sentir motivación'],
    suggested_feats: ['Shield Specialization', 'Toughness'],
    tags: ['combate', 'defensa', 'protección', 'tanque']
  }
];

// ============================================================================
// PLANTILLAS DE EXPLORADOR
// ============================================================================

const rangerTemplates: CharacterTemplate[] = [
  {
    id: 'ranger-beast-master',
    name: 'Maestro de Bestias',
    description: 'Explorador con un vínculo profundo con los animales. Acompañado por un compañero animal leal, protege las tierras salvajes.',
    concept: 'Rastreador salvaje con compañero animal inseparable',
    class_slug: 'ranger',
    class_name: 'Explorador',
    race_slug: 'human',
    race_name: 'Humano',
    alignment: 'N',
    alignment_name: 'Neutral',
    suggested_abilities: {
      strength: 14,      // +2 racial = 16
      dexterity: 16,
      constitution: 12,
      intelligence: 10,
      wisdom: 14,
      charisma: 8
    },
    recommended_skills: ['Trato con animales', 'Supervivencia', 'Avistar', 'Rastrear'],
    suggested_feats: ['Track', 'Endurance', 'Point Blank Shot'],
    tags: ['naturaleza', 'bestias', 'rastreo', 'exploración']
  },
  {
    id: 'ranger-urban-tracker',
    name: 'Rastreador Urbano',
    description: 'Explorador adaptado a la vida en la ciudad. Caza criminales en callejones oscuros y conoce cada rincón de la metrópolis.',
    concept: 'Cazarrecompensas urbano especializado en persecución',
    class_slug: 'ranger',
    class_name: 'Explorador',
    race_slug: 'half-elf',
    race_name: 'Semielfo',
    alignment: 'NG',
    alignment_name: 'Neutral Bueno',
    suggested_abilities: {
      strength: 14,
      dexterity: 16,
      constitution: 12,
      intelligence: 12,
      wisdom: 14,
      charisma: 10
    },
    recommended_skills: ['Reunir información', 'Avistar', 'Escuchar', 'Sentir motivación'],
    suggested_feats: ['Track', 'Skill Focus (Gather Information)'],
    tags: ['urbano', 'rastreo', 'cazador', 'ciudad']
  }
];

// ============================================================================
// PLANTILLAS DE PÍCARO
// ============================================================================

const rogueTemplates: CharacterTemplate[] = [
  {
    id: 'rogue-cat-burglar',
    name: 'Ladrón de Tejados',
    description: 'Pícaro ágil especializado en escalar edificios y robar desde las alturas. Nunca deja rastro y siempre planea la escapada.',
    concept: 'Acróbata nocturno que roba a los ricos',
    class_slug: 'rogue',
    class_name: 'Pícaro',
    race_slug: 'halfling',
    race_name: 'Mediano',
    alignment: 'CN',
    alignment_name: 'Caótico Neutral',
    suggested_abilities: {
      strength: 10,
      dexterity: 18,     // +2 racial = 20
      constitution: 12,
      intelligence: 14,
      wisdom: 10,
      charisma: 10
    },
    recommended_skills: ['Trepar', 'Abrir cerraduras', 'Inutilizar mecanismo', 'Esconderse', 'Moverse sigilosamente'],
    suggested_feats: ['Acrobatic', 'Nimble Fingers'],
    tags: ['furtividad', 'robo', 'agilidad', 'tejados']
  },
  {
    id: 'rogue-assassin',
    name: 'Asesino de Elite',
    description: 'Pícaro letal entrenado en el arte del asesinato. Elimina objetivos sin ser visto y desaparece en las sombras.',
    concept: 'Sicario profesional experto en muerte silenciosa',
    class_slug: 'rogue',
    class_name: 'Pícaro',
    race_slug: 'elf',
    race_name: 'Elfo',
    alignment: 'NE',
    alignment_name: 'Neutral Malvado',
    suggested_abilities: {
      strength: 12,
      dexterity: 18,     // +2 racial = 20
      constitution: 10,  // -2 racial = 8
      intelligence: 14,
      wisdom: 12,
      charisma: 8
    },
    recommended_skills: ['Esconderse', 'Moverse sigilosamente', 'Avistar', 'Escuchar', 'Usar veneno'],
    suggested_feats: ['Weapon Finesse', 'Stealthy'],
    tags: ['furtividad', 'asesinato', 'sombras', 'letal']
  }
];

// ============================================================================
// PLANTILLAS DE HECHICERO
// ============================================================================

const sorcererTemplates: CharacterTemplate[] = [
  {
    id: 'sorcerer-dragon-blood',
    name: 'Sangre de Dragón',
    description: 'Hechicero con linaje dracónico que manifiesta poderes arcanos innatos. La magia fluye por sus venas como fuego.',
    concept: 'Descendiente de dragones con magia instintiva',
    class_slug: 'sorcerer',
    class_name: 'Hechicero',
    race_slug: 'human',
    race_name: 'Humano',
    alignment: 'CN',
    alignment_name: 'Caótico Neutral',
    suggested_abilities: {
      strength: 8,
      dexterity: 14,
      constitution: 14,  // +2 racial = 16
      intelligence: 12,
      wisdom: 10,
      charisma: 16
    },
    recommended_skills: ['Concentración', 'Conocimiento (arcano)', 'Engañar'],
    suggested_feats: ['Spell Focus (Evocation)', 'Combat Casting'],
    tags: ['magia', 'dragón', 'evocación', 'innato']
  },
  {
    id: 'sorcerer-charmer',
    name: 'Encantador Natural',
    description: 'Hechicero carismático especializado en hechizos de encantamiento y control mental. Manipula mentes con una sonrisa.',
    concept: 'Manipulador mágico con influencia sobrenatural',
    class_slug: 'sorcerer',
    class_name: 'Hechicero',
    race_slug: 'half-elf',
    race_name: 'Semielfo',
    alignment: 'N',
    alignment_name: 'Neutral',
    suggested_abilities: {
      strength: 8,
      dexterity: 12,
      constitution: 14,
      intelligence: 12,
      wisdom: 10,
      charisma: 18
    },
    recommended_skills: ['Diplomacia', 'Engañar', 'Reunir información', 'Concentración'],
    suggested_feats: ['Spell Focus (Enchantment)', 'Persuasive'],
    tags: ['magia', 'encantamiento', 'social', 'control']
  }
];

// ============================================================================
// PLANTILLAS DE MAGO
// ============================================================================

const wizardTemplates: CharacterTemplate[] = [
  {
    id: 'wizard-battle-mage',
    name: 'Mago de Batalla',
    description: 'Mago especializado en magia evocadora destructiva. Lanza bolas de fuego y rayos con precisión mortal en el campo de batalla.',
    concept: 'Artillero arcano con arsenal de conjuros destructivos',
    class_slug: 'wizard',
    class_name: 'Mago',
    race_slug: 'human',
    race_name: 'Humano',
    alignment: 'LN',
    alignment_name: 'Legal Neutral',
    suggested_abilities: {
      strength: 8,
      dexterity: 14,
      constitution: 14,  // +2 racial = 16
      intelligence: 18,
      wisdom: 12,
      charisma: 8
    },
    recommended_skills: ['Concentración', 'Conocimiento (arcano)', 'Conjuros'],
    suggested_feats: ['Spell Focus (Evocation)', 'Scribe Scroll', 'Empower Spell'],
    tags: ['magia', 'evocación', 'daño', 'batalla']
  },
  {
    id: 'wizard-sage',
    name: 'Sabio Erudito',
    description: 'Mago estudioso que pasa sus días en bibliotecas antiguas descifrando secretos arcanos. Su conocimiento es vasto e invaluable.',
    concept: 'Académico mágico obsesionado con el saber',
    class_slug: 'wizard',
    class_name: 'Mago',
    race_slug: 'gnome',
    race_name: 'Gnomo',
    alignment: 'NG',
    alignment_name: 'Neutral Bueno',
    suggested_abilities: {
      strength: 8,
      dexterity: 12,
      constitution: 14,  // +2 racial = 16
      intelligence: 18,
      wisdom: 12,
      charisma: 8        // -2 racial = 6
    },
    recommended_skills: ['Conocimiento (arcano)', 'Conocimiento (historia)', 'Conocimiento (los planos)', 'Descifrar escritura'],
    suggested_feats: ['Scribe Scroll', 'Spell Mastery', 'Skill Focus (Knowledge)'],
    tags: ['magia', 'conocimiento', 'erudito', 'utilidad']
  }
];

// ============================================================================
// EXPORTAR TODAS LAS PLANTILLAS
// ============================================================================

export const allTemplates: CharacterTemplate[] = [
  ...barbarianTemplates,
  ...bardTemplates,
  ...clericTemplates,
  ...druidTemplates,
  ...fighterTemplates,
  ...monkTemplates,
  ...paladinTemplates,
  ...rangerTemplates,
  ...rogueTemplates,
  ...sorcererTemplates,
  ...wizardTemplates
];

/**
 * Obtiene plantillas filtradas por clase
 */
export function getTemplatesByClass(classSlug: string): CharacterTemplate[] {
  return allTemplates.filter(t => t.class_slug === classSlug);
}

/**
 * Obtiene plantillas filtradas por alineamiento
 */
export function getTemplatesByAlignment(alignment: string): CharacterTemplate[] {
  return allTemplates.filter(t => t.alignment === alignment);
}

/**
 * Obtiene plantillas filtradas por tags
 */
export function getTemplatesByTag(tag: string): CharacterTemplate[] {
  return allTemplates.filter(t => t.tags.includes(tag));
}

/**
 * Búsqueda de plantillas por nombre o descripción
 */
export function searchTemplates(query: string): CharacterTemplate[] {
  const lowerQuery = query.toLowerCase();
  return allTemplates.filter(t =>
    t.name.toLowerCase().includes(lowerQuery) ||
    t.description.toLowerCase().includes(lowerQuery) ||
    t.concept.toLowerCase().includes(lowerQuery)
  );
}

// Constantes útiles
export const TEMPLATE_TAGS = [
  'combate', 'magia', 'furtividad', 'social', 'naturaleza',
  'divino', 'sanación', 'daño', 'defensa', 'utilidad',
  'exploración', 'conocimiento'
] as const;

export const TEMPLATE_CLASSES = [
  'barbarian', 'bard', 'cleric', 'druid', 'fighter',
  'monk', 'paladin', 'ranger', 'rogue', 'sorcerer', 'wizard'
] as const;

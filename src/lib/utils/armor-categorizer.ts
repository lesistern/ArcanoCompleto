/**
 * Armor Categorization and Utility Functions
 * Centralized logic for armor type handling, colors, formatting, and EN↔ES translation
 */

// Extended interface matching the armor database table
export interface ArmorItem {
  id: string;
  name: string;
  slug: string;
  armor_type: string; // light, medium, heavy, shield (from DB in English)
  armor_bonus: number;
  max_dex_bonus: number | null;
  armor_check_penalty: number | null;
  arcane_spell_failure: number | null;
  base_speed_30: number | null;
  base_speed_20: number | null;
  cost_gold: number;
  cost_silver?: number | null;
  weight_lb: number;
  description?: string | null;
  special_properties?: string | null;
}

// ============================================
// EN ↔ ES Translation Maps for armor_type
// ============================================

// Database uses English types, UI uses Spanish
const ARMOR_TYPE_EN_TO_ES: Record<string, string> = {
  'light': 'Ligera',
  'medium': 'Media',
  'heavy': 'Pesada',
  'shield': 'Escudo'
};

const ARMOR_TYPE_ES_TO_EN: Record<string, string> = {
  'Ligera': 'light',
  'Media': 'medium',
  'Pesada': 'heavy',
  'Escudo': 'shield'
};

// Armor detailed descriptions from SRD (Spanish)
export const ARMOR_DESCRIPTIONS: Record<string, string> = {
  // Light Armor
  'Padded': `La armadura acolchada consiste en capas acolchadas de tela y guata. Es la armadura más básica disponible, ofreciendo protección mínima pero sin restringir el movimiento. Es silenciosa y ligera, ideal para aquellos que necesitan sigilo sobre protección. Tiempo de colocación: 1 minuto (5 asaltos apresurado). Tiempo de retirada: 1 minuto.`,

  'Leather': `La armadura de cuero está hecha de cuero endurecido mediante hervido en aceite. Las piezas de cuero cubren la mayor parte del cuerpo y se unen con correas de cuero. Es flexible y relativamente silenciosa, permitiendo buena movilidad mientras proporciona protección básica contra golpes cortantes y perforantes. Tiempo de colocación: 1 minuto (5 asaltos apresurado). Tiempo de retirada: 1 minuto.`,

  'Studded leather': `El cuero tachonado es similar al cuero normal, pero reforzado con pequeños remaches de metal o tachuelas cerradas espaciadas uniformemente. Estas tachuelas ayudan a desviar golpes cortantes y proporcionan protección adicional en puntos vitales. Es ligeramente más pesada que el cuero normal pero sigue siendo flexible. Tiempo de colocación: 1 minuto (5 asaltos apresurado). Tiempo de retirada: 1 minuto.`,

  'Chain shirt': `La camisa de mallas está hecha de anillos de metal entrelazados. Cubre el torso y se extiende hasta medio muslo. Incluye un capacete de acero. Es más pesada que las armaduras de cuero pero proporciona protección significativamente mejor contra ataques cortantes y perforantes, aunque es vulnerable a golpes contundentes. Tiempo de colocación: 1 minuto (5 asaltos apresurado). Tiempo de retirada: 1 minuto.`,

  // Medium Armor
  'Hide': `La armadura de pieles está compuesta de las pieles gruesas y resistentes de animales como osos, alces gigantes o incluso criaturas más exóticas. Es tosca pero efectiva, popular entre bárbaros y druidas que prefieren materiales naturales. No incluye componentes metálicos, permitiendo a los druidas usarla sin restricciones. Tiempo de colocación: 1 minuto (5 asaltos apresurado). Tiempo de retirada: 1 minuto.`,

  'Scale mail': `La cota de escamas consiste en una capa de cuero cubierta con escamas de metal superpuestas, similar a las escamas de un pez o dragón. Incluye guanteletes. Las escamas proporcionan buena protección pero restringen el movimiento más que la malla. Tiempo de colocación: 4 minutos (1 minuto apresurado). Tiempo de retirada: 1 minuto.`,

  'Chainmail': `La cota de mallas es una armadura completa hecha de anillos de metal entrelazados que cubre todo el cuerpo. Incluye guanteletes y una capa de relleno debajo. Proporciona excelente protección contra ataques cortantes y perforantes. Es más pesada y ruidosa que la camisa de mallas. Tiempo de colocación: 4 minutos (1 minuto apresurado). Tiempo de retirada: 1 minuto.`,

  'Breastplate': `La coraza consiste en una pieza de metal ajustada que cubre el frente y la espalda del torso. Incluye un yelmo y grebas. Es relativamente ligera para la protección que ofrece, permitiendo más movilidad que otras armaduras medias. Popular entre soldados de caballería y aquellos que valoran la movilidad. Tiempo de colocación: 4 minutos (1 minuto apresurado). Tiempo de retirada: 1 minuto.`,

  // Heavy Armor
  'Splint mail': `La loriga de bandas está hecha de tiras de metal remachadas a un respaldo de cuero y cota de mallas. Incluye guanteletes. Las bandas de metal proporcionan protección rígida mientras la malla cubre las articulaciones. Es pesada y restrictiva pero ofrece excelente protección. Al correr, solo te mueves al triple de tu velocidad, no al cuádruple. Tiempo de colocación: 4 minutos (4 minutos apresurado, requiere ayuda). Tiempo de retirada: 1d4+1 minutos.`,

  'Banded mail': `La cota anillada está hecha de bandas de metal horizontal superpuestas, remachadas a un respaldo de cuero con cota de mallas debajo. Incluye guanteletes. Es similar a la loriga de bandas pero con una construcción diferente que permite algo más de flexibilidad. Al correr, solo te mueves al triple de tu velocidad. Tiempo de colocación: 4 minutos (4 minutos apresurado, requiere ayuda). Tiempo de retirada: 1d4+1 minutos.`,

  'Half-plate': `La media armadura incluye placas de metal moldeadas que cubren la mayor parte del cuerpo, con cota de mallas flexible en las articulaciones. Incluye guanteletes. Proporciona protección casi completa pero es muy pesada y restrictiva. Al correr, solo te mueves al triple de tu velocidad. Tiempo de colocación: 4 minutos (4 minutos apresurado, requiere ayuda). Tiempo de retirada: 1d4+1 minutos.`,

  'Full plate': `La armadura completa es el pináculo de la protección personal. Consiste en placas de metal moldeadas que cubren todo el cuerpo, incluyendo guanteletes, botas pesadas de cuero, un yelmo con visera, y una gruesa capa de relleno debajo. Cada armadura completa debe ser ajustada individualmente por un maestro armero. Una armadura capturada puede ser reajustada por 200-800 (2d4×100) piezas de oro. Al correr, solo te mueves al triple de tu velocidad. Tiempo de colocación: 4 minutos (requiere ayuda obligatoriamente). Tiempo de retirada: 1d4+1 minutos.`,

  // Shields
  'Buckler': `El broquel es un pequeño escudo de metal que se lleva atado al antebrazo. Puedes usar un arco o ballesta sin penalización mientras lo llevas. También puedes usar el brazo del escudo para empuñar un arma (ya sea un arma secundaria o usando la mano secundaria para ayudar a empuñar un arma a dos manos), pero sufres un penalizador de -1 a las tiradas de ataque. Este penalizador se acumula con los que apliquen por combatir con la mano secundaria o con dos armas. No puedes golpear con un broquel. Tiempo de colocación: 1 acción de movimiento.`,

  'Shield, light wooden': `El escudo ligero de madera se ata al antebrazo y se agarra con la mano. Su peso te permite llevar otros objetos en esa mano, aunque no puedes usar armas con ella. Los escudos de madera y acero ofrecen la misma protección básica, aunque responden de forma diferente a ataques especiales. Puedes golpear a un oponente con un escudo ligero (daño 1d3, arma marcial contundente, arma ligera). Si usas el escudo como arma, pierdes su bonificador a CA hasta tu siguiente acción. Tiempo de colocación: 1 acción de movimiento.`,

  'Shield, light steel': `El escudo ligero de acero se ata al antebrazo y se agarra con la mano. Su peso te permite llevar otros objetos en esa mano, aunque no puedes usar armas con ella. Los escudos de acero son más resistentes a ciertos ataques especiales que los de madera. Puedes golpear a un oponente con un escudo ligero (daño 1d3, arma marcial contundente, arma ligera). Si usas el escudo como arma, pierdes su bonificador a CA hasta tu siguiente acción. Tiempo de colocación: 1 acción de movimiento.`,

  'Shield, heavy wooden': `El escudo pesado de madera se ata al antebrazo y se agarra con la mano. Es tan pesado que no puedes usar la mano del escudo para nada más. Puedes golpear a un oponente con un escudo pesado (daño 1d4, arma marcial contundente, arma a una mano). Si usas el escudo como arma, pierdes su bonificador a CA hasta tu siguiente acción. Los escudos de madera son más ligeros pero menos resistentes a ciertos ataques especiales. Tiempo de colocación: 1 acción de movimiento.`,

  'Shield, heavy steel': `El escudo pesado de acero se ata al antebrazo y se agarra con la mano. Es tan pesado que no puedes usar la mano del escudo para nada más. Puedes golpear a un oponente con un escudo pesado (daño 1d4, arma marcial contundente, arma a una mano). Si usas el escudo como arma, pierdes su bonificador a CA hasta tu siguiente acción. Los escudos de acero son más resistentes a ciertos ataques especiales que los de madera. Tiempo de colocación: 1 acción de movimiento.`,

  'Shield, tower': `Este escudo masivo de madera es casi tan alto como tú. En la mayoría de situaciones proporciona el bonificador de escudo indicado a tu CA. Sin embargo, puedes usarlo como cobertura total, aunque debes renunciar a tus ataques para hacerlo. El escudo no proporciona cobertura contra conjuros dirigidos; un lanzador puede lanzarte un conjuro apuntando al escudo. No puedes golpear con un escudo torre, ni usar la mano del escudo para nada más. Cuando empleas un escudo torre en combate, sufres un penalizador de -2 a las tiradas de ataque debido a su aparatosidad. Tiempo de colocación: 1 acción de movimiento.`,
};

// Armor name translations (DB stores English, UI shows Spanish)
const ARMOR_NAME_EN_TO_ES: Record<string, string> = {
  // Light armor
  'Padded': 'Acolchada',
  'Leather': 'Cuero',
  'Studded leather': 'Cuero tachonado',
  'Chain shirt': 'Camisa de mallas',
  // Medium armor
  'Hide': 'Pieles',
  'Scale mail': 'Cota de escamas',
  'Chainmail': 'Cota de mallas',
  'Breastplate': 'Coraza',
  // Heavy armor
  'Splint mail': 'Loriga de bandas',
  'Banded mail': 'Cota anillada',
  'Half-plate': 'Media armadura',
  'Full plate': 'Armadura completa',
  // Shields
  'Buckler': 'Broquel',
  'Shield, light wooden': 'Escudo ligero de madera',
  'Shield, light steel': 'Escudo ligero de acero',
  'Shield, heavy wooden': 'Escudo pesado de madera',
  'Shield, heavy steel': 'Escudo pesado de acero',
  'Shield, tower': 'Escudo torre',
};

/**
 * Translate armor type from English (DB) to Spanish (UI)
 */
export function translateArmorType(type: string): string {
  return ARMOR_TYPE_EN_TO_ES[type.toLowerCase()] || type;
}

/**
 * Translate armor type from Spanish (UI) to English (DB)
 */
export function armorTypeToDb(type: string): string {
  return ARMOR_TYPE_ES_TO_EN[type] || type.toLowerCase();
}

/**
 * Translate armor name from English (DB) to Spanish (UI)
 */
export function translateArmorName(name: string): string {
  return ARMOR_NAME_EN_TO_ES[name] || name;
}

/**
 * Get detailed armor description from SRD (Spanish)
 */
export function getArmorDescription(name: string): string {
  return ARMOR_DESCRIPTIONS[name] || '';
}

// ============================================
// Armor Type Configuration
// ============================================

// UI filter options (Spanish)
export const ARMOR_TYPES = ['Todas', 'Ligera', 'Media', 'Pesada', 'Escudo'] as const;
export type ArmorType = (typeof ARMOR_TYPES)[number];

// Armor type to color mapping (works with both EN and ES types)
const ARMOR_TYPE_COLORS: Record<string, string> = {
  'Ligera': 'border-green-500/30 bg-green-500/5',
  'Media': 'border-blue-500/30 bg-blue-500/5',
  'Pesada': 'border-red-500/30 bg-red-500/5',
  'Escudo': 'border-gold-500/30 bg-gold-500/5',
  'light': 'border-green-500/30 bg-green-500/5',
  'medium': 'border-blue-500/30 bg-blue-500/5',
  'heavy': 'border-red-500/30 bg-red-500/5',
  'shield': 'border-gold-500/30 bg-gold-500/5'
};

// Badge/accent colors for armor types
const ARMOR_TYPE_BADGE_COLORS: Record<string, string> = {
  'Ligera': 'bg-green-500/20 text-green-400 border-green-500/30',
  'Media': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'Pesada': 'bg-red-500/20 text-red-400 border-red-500/30',
  'Escudo': 'bg-gold-500/20 text-gold-400 border-gold-500/30',
  'light': 'bg-green-500/20 text-green-400 border-green-500/30',
  'medium': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'heavy': 'bg-red-500/20 text-red-400 border-red-500/30',
  'shield': 'bg-gold-500/20 text-gold-400 border-gold-500/30'
};

// Armor type to icon mapping
const ARMOR_TYPE_ICONS: Record<string, string> = {
  'Ligera': '🥾',
  'Media': '🛡️',
  'Pesada': '🏰',
  'Escudo': '🛡️',
  'light': '🥾',
  'medium': '🛡️',
  'heavy': '🏰',
  'shield': '🛡️'
};

// ============================================
// Getter Functions
// ============================================

/**
 * Get CSS classes for armor type color styling
 */
export function getArmorTypeColor(type: string): string {
  return ARMOR_TYPE_COLORS[type] || ARMOR_TYPE_COLORS[type.toLowerCase()] || 'border-dungeon-700';
}

/**
 * Get CSS classes for armor type badge styling
 */
export function getArmorTypeBadgeColor(type: string): string {
  return ARMOR_TYPE_BADGE_COLORS[type] || ARMOR_TYPE_BADGE_COLORS[type.toLowerCase()] || 'bg-dungeon-700 text-dungeon-300';
}

/**
 * Get emoji icon for armor type
 */
export function getArmorTypeIcon(type: string): string {
  return ARMOR_TYPE_ICONS[type] || ARMOR_TYPE_ICONS[type.toLowerCase()] || '🛡️';
}

// ============================================
// Filtering and Grouping
// ============================================

/**
 * Filter armors by type and search term (handles EN↔ES translation)
 */
export function filterArmors(
  armors: ArmorItem[],
  selectedType: string,
  searchTerm: string
): ArmorItem[] {
  return armors.filter(armor => {
    const armorTypeEs = translateArmorType(armor.armor_type);
    const matchesType = selectedType === 'Todas' || armorTypeEs === selectedType;
    const matchesSearch = armor.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });
}

/**
 * Group armors by type (using Spanish labels)
 */
export function groupArmorsByType(
  armors: ArmorItem[],
  selectedType: string
): Record<string, ArmorItem[]> {
  const typeOrder = ['Ligera', 'Media', 'Pesada', 'Escudo'];
  return typeOrder.reduce((acc, type) => {
    const typeArmors = armors.filter(a => translateArmorType(a.armor_type) === type);
    if (typeArmors.length > 0 || selectedType === type) {
      acc[type] = typeArmors;
    }
    return acc;
  }, {} as Record<string, ArmorItem[]>);
}

// ============================================
// Formatting Functions
// ============================================

export function formatArmorCost(gold: number, silver?: number | null): string {
  if (silver && silver > 0) {
    return `${gold} po / ${silver} pp`;
  }
  return `${gold} po`;
}

export function formatArmorWeight(weight: number): string {
  return `${weight} lb`;
}

export function formatMaxDexBonus(maxDexBonus: number | null): string {
  if (maxDexBonus === null || maxDexBonus === undefined) return '—';
  return `+${maxDexBonus}`;
}

export function formatArmorCheckPenalty(penalty: number | null): string {
  if (penalty === null || penalty === undefined) return '—';
  if (penalty === 0) return '0';
  return `${penalty}`;
}

export function formatArcaneSpellFailure(failure: number | null): string {
  if (failure === null || failure === undefined) return '—';
  return `${failure}%`;
}

export function formatSpeed30(speed: number | null): string {
  if (speed === null || speed === undefined) return '—';
  return `${speed} pies`;
}

export function formatSpeed20(speed: number | null): string {
  if (speed === null || speed === undefined) return '—';
  return `${speed} pies`;
}

export function formatArmorBonus(bonus: number): string {
  if (bonus === 0) return '—';
  return `+${bonus}`;
}

export function getArmorTypeLabel(type: string): string {
  const translatedType = translateArmorType(type);
  const labels: Record<string, string> = {
    'Ligera': 'Armadura Ligera',
    'Media': 'Armadura Media',
    'Pesada': 'Armadura Pesada',
    'Escudo': 'Escudo'
  };
  return labels[translatedType] || translatedType;
}

export function getArmorTypeShort(type: string): string {
  return translateArmorType(type);
}

// ============================================
// Categorization
// ============================================

export function categorizeArmors(armors: ArmorItem[]): Record<string, { count: number; items: ArmorItem[] }> {
  const categories: Record<string, { count: number; items: ArmorItem[] }> = {
    'Ligera': { count: 0, items: [] },
    'Media': { count: 0, items: [] },
    'Pesada': { count: 0, items: [] },
    'Escudo': { count: 0, items: [] }
  };

  armors.forEach(armor => {
    const typeEs = translateArmorType(armor.armor_type);
    if (categories[typeEs]) {
      categories[typeEs].count++;
      categories[typeEs].items.push(armor);
    }
  });

  return categories;
}

export function getArmorStatsSummary(armor: ArmorItem): {
  bonus: string;
  maxDex: string;
  penalty: string;
  arcaneFailure: string;
  speed30: string;
  speed20: string;
} {
  return {
    bonus: formatArmorBonus(armor.armor_bonus),
    maxDex: formatMaxDexBonus(armor.max_dex_bonus),
    penalty: formatArmorCheckPenalty(armor.armor_check_penalty),
    arcaneFailure: formatArcaneSpellFailure(armor.arcane_spell_failure),
    speed30: formatSpeed30(armor.base_speed_30),
    speed20: formatSpeed20(armor.base_speed_20)
  };
}

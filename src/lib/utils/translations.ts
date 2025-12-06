export const BOOK_TRANSLATIONS: Record<string, string> = {
    'Core': 'Manual del jugador 1',
    'MMI': 'Manual de monstruos',
    'EPH': 'Manual de psiónica',
    'CAdv': 'Aventurero completo',
    'CArc': 'Arcano completo',
    'CC': 'Campeón completo',
    'CD': 'Divino completo',
    'City': 'Entornos urbanos',
    'CM': 'Mago completo',
    'CP': 'Psiónica completa',
    'Epic': 'Niveles épicos',
    'BoED': 'Obras elevadas',
    'PHB': 'Manual del jugador 1',
    'DMG': 'Guía del Dungeon Master',
    'MM': 'Manual de monstruos',
};

export const TYPE_TRANSLATIONS: Record<string, string> = {
    'General': 'General',
    'Item Creation': 'Creación de objetos',
    'Metamagic': 'Metamagia',
    'Special': 'Especial',
    'Psionic': 'Psiónica',
    'Wild': 'Salvaje',
    'Divine': 'Divina',
    'Epic': 'Épica',
    'Racial': 'Racial',
    'Host': 'Huésped',
    'Heritage': 'Herencia',
    'Tactical': 'Táctica',
    'Reserve': 'Reserva',
    'Bardic music': 'Música de bardo',
    'Draconic': 'Dracónica',
    'Exalted': 'Exaltada',
    'Domain': 'Dominio',
    'Weapon Mastery': 'Maestría con armas',
};

export const ATTRIBUTE_TRANSLATIONS: Record<string, string> = {
    'Str': 'Fue',
    'Dex': 'Des',
    'Con': 'Con',
    'Int': 'Int',
    'Wis': 'Sab',
    'Cha': 'Car',
    'Base attack bonus': 'Ataque base',
    'Caster level': 'Nivel de lanzador',
    'Level': 'Nivel',
    'ranks': 'rangos',
    'rank': 'rango',
    'See text': 'Ver texto',
    'fighter level': 'nivel de guerrero',
    'character level': 'nivel de personaje',
    'class feature': 'rasgo de clase',
    'ability': 'habilidad',
    'proficient with': 'competente con',
    'Proficiency': 'Competencia',
    'Weapon Focus': 'Soltura con un arma',
    'Combat Expertise': 'Pericia en combate',
    'Power Attack': 'Ataque poderoso',
    'Two-Weapon Fighting': 'Combate con dos armas',
    'Improved Unarmed Strike': 'Impacto sin arma mejorado',
    'Point Blank Shot': 'Disparo a bocajarro',
    'Dodge': 'Esquiva',
    'Mobility': 'Movilidad',
    'Endurance': 'Aguante',
    'Diehard': 'Dureza',
};

export const translateBook = (book: string) => {
    const trimmed = book?.trim();
    return BOOK_TRANSLATIONS[trimmed] || trimmed || 'Manual del jugador 1';
};

export const translateType = (type: string) => {
    if (!type) return '';
    const trimmed = type.trim();
    // Handle comma separated types like "Psionic, Racial"
    if (trimmed.includes(',')) {
        return trimmed.split(',').map(t => TYPE_TRANSLATIONS[t.trim()] || t.trim()).join(', ');
    }
    return TYPE_TRANSLATIONS[trimmed] || trimmed;
};

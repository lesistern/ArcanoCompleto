
/**
 * Reglas de Avance de Monstruos D&D 3.5
 * Basado en reglas del System Reference Document (SRD)
 */

import { Monster } from '../services/monsterService.client';

// ==========================================
// Tipos y Interfaces
// ==========================================

// Extendemos la interfaz base para incluir propiedades que pueden venir de JSON/Supabase
interface ExtendedMonster extends Monster {
    grapple_bonus?: number;
    start_cr?: string;
    space?: string;
    reach?: string;
    creature_subtypes?: string[];
}

export interface MonsterStats extends ExtendedMonster {
    computed_hp: number;
    computed_ac: {
        total: number;
        touch: number;
        flat_footed: number;
        breakdown?: string;
    };
    computed_attacks: any[];
    computed_saves: {
        fort: number;
        ref: number;
        will: number;
    };
    computed_abilities: {
        str: number;
        dex: number;
        con: number;
        int: number;
        wis: number;
        cha: number;
    };
    computed_skills: Record<string, number>;
    computed_feats: string[];
    computed_cr: number;
    computed_xp: number;
    computed_hd: number;
    computed_bab: number;
    computed_grapple: number;
    computed_initiative: number;
}

// Configuración por Tipo de Criatura
interface CreatureTypeRules {
    hitDie: number; // d8, d10, etc.
    babProgression: 'poor' | 'medium' | 'good';
    goodSaves: ('fort' | 'ref' | 'will')[];
    skillPointsPerHD: number;
}

// Configuración de Cambios de Tamaño (Placeholder for future expansion)
interface SizeChange {
    str: number;
    dex: number;
    con: number;
    natArmor: number;
    acMod: number;
    grappleMod: number;
    hideMod: number;
}

// ==========================================
// Constantes de Reglas
// ==========================================

export const CREATURE_TYPE_RULES: Record<string, CreatureTypeRules> = {
    'humanoide': { hitDie: 8, babProgression: 'medium', goodSaves: ['ref'], skillPointsPerHD: 2 },
    'animal': { hitDie: 8, babProgression: 'medium', goodSaves: ['fort', 'ref'], skillPointsPerHD: 2 },
    'no-muerto': { hitDie: 12, babProgression: 'poor', goodSaves: ['will'], skillPointsPerHD: 4 },
    'bestia mágica': { hitDie: 10, babProgression: 'good', goodSaves: ['fort', 'ref'], skillPointsPerHD: 2 },
    'dragón': { hitDie: 12, babProgression: 'good', goodSaves: ['fort', 'ref', 'will'], skillPointsPerHD: 6 },
    'constructo': { hitDie: 10, babProgression: 'medium', goodSaves: [], skillPointsPerHD: 2 },
    'planta': { hitDie: 8, babProgression: 'medium', goodSaves: ['fort'], skillPointsPerHD: 2 },
    'gigante': { hitDie: 8, babProgression: 'medium', goodSaves: ['fort'], skillPointsPerHD: 2 },
    'limo': { hitDie: 10, babProgression: 'medium', goodSaves: [], skillPointsPerHD: 2 },
    'sabandija': { hitDie: 8, babProgression: 'medium', goodSaves: ['fort'], skillPointsPerHD: 2 },
    'extraplanar': { hitDie: 8, babProgression: 'good', goodSaves: ['fort', 'ref', 'will'], skillPointsPerHD: 8 },
    'aberración': { hitDie: 8, babProgression: 'medium', goodSaves: ['will'], skillPointsPerHD: 2 },
    'fata': { hitDie: 6, babProgression: 'poor', goodSaves: ['ref', 'will'], skillPointsPerHD: 6 },
};

// Mapa de Habilidades a Características Clave
const SKILL_ABILITY_MAP: Record<string, 'str' | 'dex' | 'con' | 'int' | 'wis' | 'cha'> = {
    'Esconderse': 'dex',
    'Moverse Sigilosamente': 'dex',
    'Montar': 'dex',
    'Equilibrio': 'dex',
    'Escapismo': 'dex',
    'Piruestas': 'dex',
    'Uso de cuerdas': 'dex',
    'Abrir cerraduras': 'dex',
    'Inutilizar mecanismo': 'int',
    'Escuchar': 'wis',
    'Avistar': 'wis',
    'Supervivencia': 'wis',
    'Averiguar intenciones': 'wis',
    'Sanar': 'wis',
    'Profesión': 'wis',
    'Buscar': 'int',
    'Saber': 'int',
    'Saber (Arcano)': 'int',
    'Saber (Religión)': 'int',
    'Saber (Naturaleza)': 'int',
    'Saber (Planos)': 'int',
    'Saber (Dungeons)': 'int',
    'Saber (Local)': 'int',
    'Saber (Historia)': 'int',
    'Saber (Geografía)': 'int',
    'Saber (Nobleza)': 'int',
    'Arte de la magia': 'int', // Spellcraft
    'Tasación': 'int',
    'Falsificación': 'int',
    'Descifrar escritura': 'int',
    'Oficio': 'int',
    'Diplomacia': 'cha',
    'Intimidar': 'cha',
    'Engañar': 'cha',
    'Reunir información': 'cha',
    'Interpretación': 'cha',
    'Disfrazarse': 'cha',
    'Trato con animales': 'cha',
    'Usar objeto mágico': 'cha',
    'Trepar': 'str',
    'Saltar': 'str',
    'Nadar': 'str',
    'Concentración': 'con'
};

export const XP_BY_CR: Record<string, number> = {
    '0': 10,
    '1/8': 50, '1/6': 65, '1/4': 100, '1/3': 135, '1/2': 200,
    '1': 400, '2': 600, '3': 800, '4': 1200, '5': 1600,
    '6': 2400, '7': 3200, '8': 4800, '9': 6400, '10': 9600,
    '11': 12800, '12': 19000, '13': 25600, '14': 38000, '15': 51000,
    '16': 76000, '17': 102000, '18': 153000, '19': 204000, '20': 307000,
    '21': 409000, '22': 614000, '23': 819000, '24': 1200000, '25': 1600000,
    '26': 2400000, '27': 3200000, '28': 4900000, '29': 6500000, '30': 9800000
};

// ==========================================
// Lógica de Cálculo
// ==========================================

function getBAB(hd: number, progression: 'poor' | 'medium' | 'good'): number {
    if (progression === 'good') return hd;
    if (progression === 'medium') return Math.floor(hd * 0.75);
    return Math.floor(hd * 0.5);
}

function getSave(hd: number, isGood: boolean): number {
    return isGood ? 2 + Math.floor(hd / 2) : Math.floor(hd / 3);
}

function parseDice(diceStr: string): { count: number, die: number, mod: number } {
    // Ej: "1d8+1", "1d8", "2d10-1"
    const regex = /(\d+)d(\d+)([+-]\d+)?/;
    const match = (diceStr || '').match(regex);
    if (!match) return { count: 1, die: 8, mod: 0 };
    return {
        count: parseInt(match[1]),
        die: parseInt(match[2]),
        mod: match[3] ? parseInt(match[3]) : 0
    };
}

function parseCR(crStr: string): number {
    if (!crStr) return 0;
    if (crStr.includes('/')) {
        const [num, den] = crStr.split('/');
        return parseInt(num) / parseInt(den);
    }
    return parseFloat(crStr);
}

function getModifier(score: number): number {
    return Math.floor((score - 10) / 2);
}

/**
 * Calcula las estadísticas avanzadas de un monstruo
 */
export function calculateAdvancedMonster(baseMonster: Monster, targetCR: number): MonsterStats {
    const monster = baseMonster as ExtendedMonster; // Cast safely to extended
    const typeRules = CREATURE_TYPE_RULES[monster.creature_type.toLowerCase()] || CREATURE_TYPE_RULES['humanoide'];

    // 1. Determinar HD Base y Actual
    let baseCR = parseCR(monster.challenge_rating);
    let baseHDInfo = typeof monster.hit_dice === 'string'
        ? parseDice(monster.hit_dice)
        : parseDice(monster.hit_dice.dice);

    // Heurística simple: +1 CR = +X HD
    const safeBaseCR = Math.max(baseCR, 0.5);
    const hdToCrRatio = baseHDInfo.count / safeBaseCR;

    // Nuevos HD
    let newHDCount = Math.max(1, Math.round(targetCR * hdToCrRatio));

    // Si es un monstruo "Por clase" como humanoide, 1 CR = 1 Nivel (1 HD).
    if (monster.advancement?.includes('Por clase') || monster.creature_type.toLowerCase() === 'humanoide') {
        const diffCR = targetCR - baseCR;
        newHDCount = Math.max(1, baseHDInfo.count + Math.round(diffCR));
    }

    // Identificar Abilities
    const abilities = monster.abilities ? { ...monster.abilities } : { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 };

    // 2. Ability Score Improvements (1 cada 4 HD ganados)
    const statPoints = Math.floor(newHDCount / 4) - Math.floor(baseHDInfo.count / 4);

    let bestStat: keyof typeof abilities = 'str';
    let bestVal = 0;
    for (const s of ['str', 'dex', 'con', 'int', 'wis', 'cha'] as const) {
        if ((abilities[s] || 10) > bestVal) {
            bestVal = abilities[s] || 10;
            bestStat = s;
        }
    }
    // Aplicar bonificador
    if (statPoints > 0) {
        abilities[bestStat] = (abilities[bestStat] || 10) + statPoints;
    }

    // 3. Recalcular Stats Derivados

    // Mods
    const strMod = getModifier(abilities.str || 10);
    const dexMod = getModifier(abilities.dex || 10);
    const conMod = getModifier(abilities.con || 10);
    const intMod = getModifier(abilities.int || 10);
    const wisMod = getModifier(abilities.wis || 10);
    // const chaMod = getModifier(abilities.cha || 10);

    // BAB
    const newBab = getBAB(newHDCount, typeRules.babProgression);
    const oldBab = getBAB(baseHDInfo.count, typeRules.babProgression);
    const babDiff = newBab - oldBab;

    // HP
    const avgDie = (typeRules.hitDie / 2) + 0.5;
    const hpPerHD = avgDie + conMod;
    const newHP = Math.floor(newHDCount * hpPerHD);

    // Saves
    const newFort = getSave(newHDCount, typeRules.goodSaves.includes('fort')) + conMod;
    const newRef = getSave(newHDCount, typeRules.goodSaves.includes('ref')) + dexMod;
    const newWill = getSave(newHDCount, typeRules.goodSaves.includes('will')) + wisMod;

    // AC Logic
    let currentAC = typeof monster.armor_class === 'object' ? (monster.armor_class as any).total : (monster.armor_class as number);
    const oldDexMod = getModifier(monster.abilities?.dex || 10);

    // Apply Dex changes to Total AC
    if (bestStat === 'dex' && statPoints > 0) {
        currentAC = currentAC - oldDexMod + dexMod;
    }

    // Touch AC
    const baseTouch = (monster.armor_class as any)?.touch || 10;
    const newTouch = baseTouch + (dexMod - oldDexMod);

    // Flat Footed AC (Dex doesn't help)
    const newFlat = (monster.armor_class as any)?.flat_footed || 10;

    // Breakdown Update
    let newBreakdown = (monster.armor_class as any)?.breakdown || '';
    if (newBreakdown && dexMod !== oldDexMod) {
        newBreakdown = newBreakdown.replace(/([+-]?\d+)\s*(Des|Destreza)/, (match: string, val: string, label: string) => {
            return `${dexMod >= 0 ? '+' : ''}${dexMod} ${label}`;
        });
    }

    // Grapple
    const oldStrMod = getModifier(monster.abilities?.str || 10);
    const oldGrapple = monster.grapple_bonus || (monster as any).grapple || 0;
    const sizeModEstimate = oldGrapple - oldBab - oldStrMod;
    const newGrapple = newBab + strMod + sizeModEstimate;

    // Attacks
    const computedAttacks = (monster.attacks || []).map((atk: any) => {
        let isRanged = atk.type === 'ranged';
        let statModUsed = isRanged ? dexMod : strMod;
        let oldStatModUsed = isRanged ? getModifier(monster.abilities?.dex || 10) : oldStrMod;

        let inherent = atk.bonus - oldBab - oldStatModUsed;
        let newBonus = inherent + newBab + statModUsed;

        let newDamage = atk.damage || '';

        // Safety check for damage field
        if (typeof atk.damage === 'string' && atk.damage.length > 0 && (!isRanged || (isRanged && atk.name && atk.name.includes('Jabalina')))) {
            const dmgMatch = atk.damage.match(/([+-])(\d+)$/);
            if (dmgMatch) {
                const oldDmgBonus = parseInt(dmgMatch[2]) * (dmgMatch[1] === '-' ? -1 : 1);
                const strDiff = strMod - oldStrMod;
                const finalBonus = oldDmgBonus + strDiff;
                newDamage = atk.damage.replace(/([+-])\d+$/, '') + (finalBonus >= 0 ? `+${finalBonus}` : `${finalBonus}`);
            }
        }

        return {
            ...atk,
            bonus: newBonus,
            damage: newDamage
        };
    });

    // Skills
    const computedSkills: Record<string, number> = {};
    if (Array.isArray(monster.skills)) {
        const tempAbilities = monster.abilities || { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 };
        monster.skills.forEach((s: any) => {
            if (s.name) {
                let bonus = s.bonus || 0;
                let abilityKey: keyof typeof abilities | undefined = SKILL_ABILITY_MAP[s.name] as any;
                if (!abilityKey) {
                    const parts = s.name.split(' ');
                    if (parts[0] === 'Saber') abilityKey = 'int';
                    if (parts[0] === 'Oficio') abilityKey = 'wis';
                    if (parts[0] === 'Profesión') abilityKey = 'wis';
                }

                if (abilityKey) {
                    const oldModSkill = getModifier(tempAbilities[abilityKey] || 10);
                    const newModSkill = getModifier(abilities[abilityKey] || 10);
                    bonus += (newModSkill - oldModSkill);
                }

                computedSkills[s.name] = bonus;
            }
        });
    }

    // Initiative
    const baseInitiative = typeof monster.initiative === 'string' ? parseInt(monster.initiative) || 0 : (monster.initiative || 0);
    const computedInitiative = baseInitiative + (dexMod - oldDexMod);

    // XP
    const finalCR = Math.max(0, Math.floor(targetCR));
    const xp = XP_BY_CR[finalCR.toString()] || 10;

    return {
        ...monster,
        computed_cr: targetCR,
        computed_hd: newHDCount,
        computed_hp: newHP,
        computed_bab: newBab,
        computed_grapple: newGrapple,
        computed_initiative: computedInitiative,
        computed_ac: {
            total: currentAC,
            touch: newTouch,
            flat_footed: newFlat,
            breakdown: newBreakdown
        },
        computed_saves: {
            fort: newFort,
            ref: newRef,
            will: newWill
        },
        computed_abilities: abilities,
        computed_attacks: computedAttacks,
        computed_skills: computedSkills,
        computed_feats: Array.isArray(monster.feats) ? monster.feats : (monster.feats ? [monster.feats] : []),
        computed_xp: xp
    };
}

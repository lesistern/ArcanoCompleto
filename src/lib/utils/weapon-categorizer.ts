import { DnDWeapon } from '@/lib/types/item';

/**
 * Weapon categorization and filtering utilities
 * Extracted from ArmasClient.tsx for reusability and testability
 */

// Simple weapons categorization by subcategory
export const simpleWeaponCategories = {
    unarmed: [
        'guantelete', 'impacto-sin-arma', 'guantelete-armado'
    ],
    lightMelee: [
        'daga', 'hoz', 'maza-ligera', 'puñal'
    ],
    oneHandedMelee: [
        'clava', 'maza-de-armas', 'maza-pesada', 'lanza-corta'
    ],
    twoHandedMelee: [
        'bastón', 'lanza-larga', 'lanza'
    ],
    ranged: [
        'ballesta-ligera', 'ballesta-pesada', 'dardo', 'honda', 'jabalina'
    ]
};

// Martial weapons categorization by subcategory
export const martialWeaponCategories = {
    lightMelee: [
        'armadura-con-púas', 'cachiporra', 'escudo-ligero', 'escudo-con-púas-ligero',
        'espada-corta', 'hacha-arrojadiza', 'hacha-de-mano', 'kukri', 'martillo-ligero',
        'pico-ligero'
    ],
    oneHandedMelee: [
        'cimitarra', 'escudo-pesado', 'escudo-con-púas-pesado', 'espada-larga', 'estoque',
        'hacha-de-batalla', 'mangual', 'martillo-de-guerra', 'pico-pesado', 'tridente'
    ],
    twoHandedMelee: [
        'alabarda', 'alfanjón', 'guisarma', 'espadón', 'gran-hacha',
        'guadaña', 'guja', 'lanza-de-caballería', 'mangual-pesado', 'ranseur'
    ],
    ranged: [
        'arco-largo', 'arco-largo-compuesto', 'arco-corto', 'arco-corto-compuesto'
    ]
};

// Exotic weapons categorization by subcategory
export const exoticWeaponCategories = {
    lightMelee: [
        'kama', 'nunchaku', 'sai', 'siangham'
    ],
    oneHandedMelee: [
        'espada-bastarda', 'hacha-de-guerra-enana', 'látigo'
    ],
    twoHandedMelee: [
        'cadena-armada', 'espada-de-dos-hojas', 'hacha-doble-orca', 'mangual-doble',
        'martillo-ganchudo-gnomo', 'urgrosh-enano'
    ],
    ranged: [
        'ballesta-de-mano', 'ballesta-de-repetición-ligera', 'ballesta-de-repetición-pesada',
        'bolas', 'red', 'shuriken'
    ]
};

/**
 * Categorize weapons by type (simple, marcial, exótica)
 */
export function categorizeWeapons(weapons: DnDWeapon[]) {
    return {
        simpleWeapons: weapons.filter(w => w.weaponType.toLowerCase().includes('simple')),
        martialWeapons: weapons.filter(w => w.weaponType.toLowerCase().includes('marcial') || w.weaponType.toLowerCase().includes('martial')),
        exoticWeapons: weapons.filter(w => w.weaponType.toLowerCase().includes('exótica') || w.weaponType.toLowerCase().includes('exotic')),
    };
}

/**
 * Subcategorize weapons within a category by hand/range
 */
/**
 * Subcategorize weapons within a category by hand/range
 * Now uses dynamic logic instead of hardcoded lists
 */
export function subcategorizeByType(
    weapons: DnDWeapon[],
    // @ts-ignore - Keeping signature for backward compatibility but ignoring map
    categoryMap: Record<string, string[]> = {}
) {
    const lightSizes = ['Pequeño', 'Pequeña', 'Diminuto', 'Diminuta', 'Small', 'Tiny'];
    const twoHandedSizes = ['Grande', 'Enorme', 'Large', 'Huge'];

    // Helper to check if unarmed
    const isUnarmed = (w: DnDWeapon) =>
        ['sin-arma', 'unarmed', 'guantelete', 'gauntlet'].some(s => w.slug.includes(s));

    return {
        lightMelee: weapons.filter(w => {
            if (isUnarmed(w)) return false;
            if (w.weaponType.toLowerCase().includes('distancia') || w.weaponType.toLowerCase().includes('ranged')) return false;
            return lightSizes.includes(w.size);
        }),
        oneHandedMelee: weapons.filter(w => {
            if (isUnarmed(w)) return false;
            if (w.weaponType.toLowerCase().includes('distancia') || w.weaponType.toLowerCase().includes('ranged')) return false;
            // Default to one handed if not light or two handed
            return !lightSizes.includes(w.size) && !twoHandedSizes.includes(w.size);
        }),
        twoHandedMelee: weapons.filter(w => {
            if (isUnarmed(w)) return false;
            if (w.weaponType.toLowerCase().includes('distancia') || w.weaponType.toLowerCase().includes('ranged')) return false;
            return twoHandedSizes.includes(w.size);
        }),
        ranged: weapons.filter(w => w.weaponType.toLowerCase().includes('distancia') || w.weaponType.toLowerCase().includes('ranged')),
        unarmed: weapons.filter(w => isUnarmed(w)),
    };
}

/**
 * Format weapon cost for display
 */
export function formatCost(weapon: DnDWeapon): string {
    return weapon.cost.gold
        ? `${weapon.cost.gold} po`
        : weapon.cost.silver
            ? `${weapon.cost.silver} pp`
            : 'Gratis';
}

/**
 * Get abbreviation for damage type
 */
export function getDamageTypeAbbr(type: string): string {
    if (type === 'Perforante') return 'Perf';
    if (type === 'Cortante') return 'Cort';
    if (type === 'Contundente') return 'Cont';
    return type;
}

/**
 * Get color class for single damage type
 */
export function getSingleDamageColor(type: string): string {
    if (type === 'Perforante') return 'text-green-400';
    if (type === 'Cortante') return 'text-red-400';
    if (type === 'Contundente') return 'text-blue-400';
    return 'text-gray-400';
}

/**
 * Determine if weapon has "and" damage or "or" damage
 * In D&D 3.5, Dagger is "or" (P or S), Morningstar is "and" (B and P)
 */
export function isDamageTypeAnd(weaponName: string): boolean {
    const andWeapons = ['lucero del alba', 'guadaña', 'morningstar', 'scythe'];
    return andWeapons.some(name => weaponName.toLowerCase().includes(name));
}

/**
 * Get gradient class for dual damage types
 */
export function getDualDamageGradientClass(type1: string, type2: string): {
    gradient: string;
    border: string;
} {
    if (type1 === 'Contundente' && type2 === 'Perforante') {
        return { gradient: 'bg-gradient-to-br from-blue-500/20 to-green-500/20', border: 'border-blue-500/30' };
    }
    if (type1 === 'Perforante' && type2 === 'Cortante') {
        return { gradient: 'bg-gradient-to-br from-green-500/20 to-red-500/20', border: 'border-green-500/30' };
    }
    if (type1 === 'Cortante' && type2 === 'Perforante') {
        return { gradient: 'bg-gradient-to-br from-red-500/20 to-green-500/20', border: 'border-red-500/30' };
    }
    if (type1 === 'Contundente' && type2 === 'Cortante') {
        return { gradient: 'bg-gradient-to-br from-blue-500/20 to-red-500/20', border: 'border-blue-500/30' };
    }
    // Fallback generic
    return { gradient: 'bg-gradient-to-br from-gray-500/20 to-gray-500/20', border: 'border-gray-500/30' };
}

/**
 * Get background class for single damage type
 */
export function getSingleDamageBgClass(type: string): string {
    if (type === 'Perforante') return 'bg-green-500/20 border-green-500/30';
    if (type === 'Cortante') return 'bg-red-500/20 border-red-500/30';
    if (type === 'Contundente') return 'bg-blue-500/20 border-blue-500/30';
    return 'bg-gray-500/20 border-gray-500/30';
}


import { DnDWeapon } from '@/lib/types/item';

export function mapDatabaseItemToWeapon(dbItem: any): DnDWeapon {
    // Helper to format critical
    const formatCritical = (range: string | null, mult: string | null) => {
        if (!mult) return '—';
        // Ensure mult starts with x or ×
        const formattedMult = (mult.startsWith('x') || mult.startsWith('×')) ? mult : `×${mult}`;

        if (!range || range === '20') return formattedMult;
        return `${range}–20/${formattedMult}`;
    };

    // Helper to format cost from copper pieces
    const formatCost = (cp: number | null) => {
        if (cp === null || cp === undefined) return {};
        const gold = Math.floor(cp / 100);
        const remainingCp = cp % 100;
        const silver = Math.floor(remainingCp / 10);
        const copper = remainingCp % 10;

        return {
            gold: gold > 0 ? gold : undefined,
            silver: silver > 0 ? silver : undefined,
            copper: copper > 0 ? copper : undefined
        };
    };

    // Extract damage from JSON if available
    const damage = dbItem.damage_by_size || {};

    return {
        id: dbItem.id,
        name: dbItem.name,
        slug: dbItem.slug,
        shortDescription: dbItem.short_description,
        description: dbItem.description,
        category: dbItem.item_category as 'Arma',
        weaponType: `${dbItem.weapon_category || ''} ${dbItem.weapon_type || ''}`.trim(),
        size: dbItem.size,
        stats: {
            damage: {
                small: damage.S || dbItem.damage_small,
                medium: damage.M || dbItem.damage_medium,
                large: damage.L || dbItem.damage_large,
            },
            critical: formatCritical(dbItem.critical_range, dbItem.critical_mult) || dbItem.critical,
            range: dbItem.range_increment_ft || dbItem.range_increment,
            damageType: dbItem.damage_type || [],
            weight: dbItem.weight_lb || dbItem.weight,
        },
        cost: formatCost(dbItem.price_cp),
        properties: dbItem.properties || [],
        special: dbItem.special,
        isMagic: dbItem.is_magic,
        source: {
            book: dbItem.source_book,
            page: dbItem.source_page,
        },
    };
}

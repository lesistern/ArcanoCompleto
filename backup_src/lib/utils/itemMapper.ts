
import { DnDWeapon } from '@/lib/types/item';

export function mapDatabaseItemToWeapon(dbItem: any): DnDWeapon {
    return {
        id: dbItem.id,
        name: dbItem.name,
        slug: dbItem.slug,
        shortDescription: dbItem.short_description,
        description: dbItem.description,
        category: dbItem.category as 'Arma', // Assumes filtered by category or valid data
        weaponType: dbItem.weapon_type,
        size: dbItem.size,
        stats: {
            damage: {
                small: dbItem.damage_small,
                medium: dbItem.damage_medium,
                large: dbItem.damage_large,
            },
            critical: dbItem.critical,
            range: dbItem.range_increment,
            damageType: dbItem.damage_type || [],
            weight: dbItem.weight,
        },
        cost: {
            gold: dbItem.cost_gold,
            silver: dbItem.cost_silver,
        },
        properties: dbItem.properties || [],
        special: dbItem.special,
        isMagic: dbItem.is_magic,
        source: {
            book: dbItem.source_book,
            page: dbItem.source_page,
        },
    };
}

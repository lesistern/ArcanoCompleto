/**
 * Tipos compartidos para el editor de clases admin
 * Soporta múltiples nombres de columna para flexibilidad de BD
 */

export interface ClassData {
    id: string;
    slug: string;

    // Spanish column names (actual DB schema)
    titulo?: string;
    subtitulo?: string;
    descripcion?: string;

    // English column names (legacy/alternative)
    name?: string;
    title?: string;
    class_name?: string;
    label?: string;

    hit_die?: string;
    skill_points?: number;
    skill_points_per_level?: number;
    bab_progression?: 'good' | 'medium' | 'poor';
    fort_save?: 'good' | 'poor';
    ref_save?: 'good' | 'poor';
    will_save?: 'good' | 'poor';
    fort_save_progression?: 'good' | 'poor';
    ref_save_progression?: 'good' | 'poor';
    will_save_progression?: 'good' | 'poor';
    image_url?: string;
    spell_type?: 'arcanos' | 'divinos' | null;
    spell_ability?: string;
    class_skills?: string[];
    weapon_proficiencies?: string[];
    armor_proficiencies?: string[];

    // Fluff fields
    short_description?: string;
    description?: string;
    adventures?: string;
    characteristics?: string;
    alignment?: string;
    religion?: string;
    background?: string;
    races?: string;
    other_classes?: string;
    role?: string;

    // Progression
    level_progression?: any[];

    // Allow any other fields from database
    [key: string]: any;
}

/**
 * Obtener el nombre de la clase desde múltiples posibles columnas
 */
export function getClassName(classData: ClassData): string {
    return (
        classData.titulo ||
        classData.name ||
        classData.title ||
        classData.class_name ||
        classData.label ||
        classData.slug ||
        'Unknown'
    );
}

/**
 * Obtener el hit die de la clase
 */
export function getHitDie(classData: ClassData): string {
    return classData.hit_die || 'd8';
}

/**
 * Obtener el BAB progression de la clase
 */
export function getBABProgression(classData: ClassData): string {
    return classData.bab_progression || '?';
}

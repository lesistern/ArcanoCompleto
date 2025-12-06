import { z } from 'zod';

/**
 * Validation schemas for admin forms
 */

// Class validation
export const classSchema = z.object({
    name: z.string().min(1, 'El nombre es requerido').max(100, 'Nombre muy largo'),
    slug: z.string().min(1, 'El slug es requerido').regex(/^[a-z0-9-]+$/, 'Solo minúsculas, números y guiones'),
    hit_die: z.number().min(4).max(12, 'Hit die debe estar entre d4 y d12'),
    skill_points: z.number().min(1).max(8, 'Puntos de habilidad entre 1 y 8'),
    bab_progression: z.enum(['high', 'medium', 'low']).catch('high'),
    fortitude_progression: z.enum(['good', 'poor']),
    reflex_progression: z.enum(['good', 'poor']),
    will_progression: z.enum(['good', 'poor']),
});

// Race validation
export const raceSchema = z.object({
    name: z.string().min(1, 'El nombre es requerido').max(100),
    slug: z.string().min(1, 'El slug es requerido').regex(/^[a-z0-9-]+$/),
    size: z.enum(['fine', 'diminutive', 'tiny', 'small', 'medium', 'large', 'huge', 'gargantuan', 'colossal']),
    speed: z.number().min(0).max(120),
});

// Feat validation
export const featSchema = z.object({
    name: z.string().min(1, 'El nombre es requerido').max(100),
    slug: z.string().min(1, 'El slug es requerido').regex(/^[a-z0-9-]+$/),
    type: z.enum(['general', 'combat', 'metamagic', 'item_creation', 'special']),
});

// Spell validation
export const spellSchema = z.object({
    name: z.string().min(1, 'El nombre es requerido').max(100),
    slug: z.string().min(1, 'El slug es requerido').regex(/^[a-z0-9-]+$/),
    school: z.string().min(1, 'La escuela es requerida'),
    level: z.number().min(0).max(9),
});

// Deity validation
export const deitySchema = z.object({
    name: z.string().min(1, 'El nombre es requerido').max(100),
    slug: z.string().min(1, 'El slug es requerido').regex(/^[a-z0-9-]+$/),
    alignment: z.string().length(2, 'Alineamiento debe ser 2 caracteres'),
});

/**
 * Helper function to validate data against a schema
 */
export function validateField<T>(
    schema: z.ZodSchema<T>,
    data: unknown
): { success: true; data: T } | { success: false; errors: Record<string, string> } {
    const result = schema.safeParse(data);

    if (result.success) {
        return { success: true, data: result.data };
    }

    const errors: Record<string, string> = {};
    result.error.issues.forEach((err) => {
        const path = err.path.join('.');
        errors[path] = err.message;
    });

    return { success: false, errors };
}

/**
 * Validate a single field
 */
export function validateSingleField<T>(
    schema: z.ZodSchema<T>,
    fieldName: string,
    value: unknown
): string | null {
    try {
        const fieldSchema = (schema as any).shape[fieldName];
        if (!fieldSchema) return null;

        fieldSchema.parse(value);
        return null;
    } catch (error) {
        if (error instanceof z.ZodError) {
            return error.issues[0]?.message || 'Error de validación';
        }
        return 'Error de validación';
    }
}

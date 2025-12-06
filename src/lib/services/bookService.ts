import { createClient } from '@/lib/supabase/client';

export interface SrdBook {
    id: number;
    system_key: string;
    code: string;
    title_es: string;
    title_en: string | null;
    category: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    recommended_for: string[];
    is_core: boolean;
}

export async function getBooksBySystem(systemKey: string): Promise<SrdBook[]> {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('srd_books')
        .select('*')
        .eq('system_key', systemKey)
        .order('is_core', { ascending: false })
        .order('title_es', { ascending: true });

    if (error) {
        console.error('Error fetching books:', error);
        return [];
    }

    return data as SrdBook[];
}

export function getRecommendedBooks(books: SrdBook[], experienceLevel: string): SrdBook[] {
    if (!experienceLevel) return books;

    return books.filter(book => {
        // Expertos ven todo
        if (experienceLevel === 'experto') return true;

        // Novatos ven 'beginner' y core
        if (experienceLevel === 'novato') {
            return book.difficulty === 'beginner' || book.is_core;
        }

        // Intermedios ven 'beginner' e 'intermediate'
        if (experienceLevel === 'intermedio') {
            return book.difficulty === 'beginner' || book.difficulty === 'intermediate';
        }

        return true;
    });
}

export function isBookRecommendedForLevel(book: SrdBook, experienceLevel: string): boolean {
    if (!book.recommended_for) return false;
    return book.recommended_for.includes(experienceLevel);
}

import { useState, useEffect } from 'react';
import { getBooksBySystem, SrdBook, getRecommendedBooks } from '@/lib/services/bookService';
import { useSystem } from '@/contexts/SystemContext';
import { useExperience } from '@/contexts/ExperienceContext';

export function useBooks() {
    const { system } = useSystem();
    const { level } = useExperience();
    const [books, setBooks] = useState<SrdBook[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchBooks() {
            setLoading(true);
            const allBooks = await getBooksBySystem(system);
            setBooks(allBooks);
            setLoading(false);
        }

        fetchBooks();
    }, [system]);

    const recommendedBooks = getRecommendedBooks(books, level);

    return {
        books,
        recommendedBooks,
        loading,
        allBooks: books
    };
}

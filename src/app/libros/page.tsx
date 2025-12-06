import { Metadata } from 'next';
import LibrosClient from './LibrosClient';

export const metadata: Metadata = {
  title: 'Índice de Libros | D&D Compendium',
  description: 'Explora el índice completo de 47 libros de D&D 3.5 con más de 19,000 entradas categorizadas.',
};

export default function LibrosPage() {
  return <LibrosClient />;
}

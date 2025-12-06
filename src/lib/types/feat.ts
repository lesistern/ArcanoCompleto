/**
 * Tipos para las dotes de D&D 3.5
 */

export type FeatType =
  | 'General'
  | 'Combate'
  | 'Metamagia'
  | 'Creación de Objetos'
  | 'Especial';

export type FeatCategory =
  | 'Combate'
  | 'Magia'
  | 'Habilidades'
  | 'Creación'
  | 'Racial'
  | 'Varios';

export interface FeatPrerequisite {
  type: 'ability' | 'skill' | 'feat' | 'bab' | 'casterLevel' | 'race' | 'class' | 'special';
  name?: string; // Nombre de la habilidad/skill/feat/raza/clase
  value?: number | string; // Valor requerido (número para ability/bab/casterLevel, nombre para otros)
  description: string; // Descripción legible del prerrequisito
}

export interface DnDFeat {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;

  // Tipo y categoría
  type: FeatType;
  category: FeatCategory;

  // Prerrequisitos
  prerequisites: FeatPrerequisite[];

  // Beneficio
  benefit: string;

  // Normal (qué pasa sin la dote)
  normal?: string;

  // Especial
  special?: string[];

  // Fighters bonus feat (si puede tomarse como dote adicional de guerrero)
  fighterBonus?: boolean;

  // Clases que pueden obtener esta dote como bonus feat
  bonusFeatClasses?: Array<{
    className: 'Guerrero' | 'Explorador' | 'Monje' | 'Mago' | 'Hechicero';
    level?: number; // Nivel en que se obtiene
    condition?: string; // Condición específica (ej: "estilo de combate con arco")
  }>;

  // Puede tomarse múltiples veces
  multipleAllowed?: boolean;
  multipleDetails?: string;

  // Dotes relacionadas (sinergias, cadenas de dotes)
  relatedFeats?: string[];

  // Información adicional
  source: {
    book: string;
    page: number;
  };
  bookId?: number;
}

export interface FeatFilter {
  type?: FeatType;
  category?: FeatCategory;
  fighterBonus?: boolean;
  hasPrerequisites?: boolean;
  multipleAllowed?: boolean;
}

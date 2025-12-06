/**
 * Kits de equipo inicial por clase para D&D 3.5
 *
 * Basado en el Player's Handbook 3.5
 * Cada clase tiene 2 opciones de kit de equipo
 */

export interface EquipmentItem {
  name: string;
  quantity: number;
  weight?: number; // en libras
}

export interface StarterKit {
  name: string;
  description: string;
  items: EquipmentItem[];
  totalCost: number; // en piezas de oro
  totalWeight: number; // en libras
}

export const STARTING_EQUIPMENT: Record<string, StarterKit[]> = {
  // BÁRBARO
  barbarian: [
    {
      name: 'Kit del Guerrero Tribal',
      description: 'Equipo para un bárbaro que confía en su fuerza bruta y movilidad',
      totalCost: 40,
      totalWeight: 55,
      items: [
        { name: 'Hacha de batalla grande', quantity: 1, weight: 12 },
        { name: 'Jabalinas', quantity: 4, weight: 8 },
        { name: 'Armadura de cuero', quantity: 1, weight: 15 },
        { name: 'Mochila', quantity: 1, weight: 2 },
        { name: 'Odre', quantity: 1, weight: 4 },
        { name: 'Raciones (1 día)', quantity: 3, weight: 3 },
        { name: 'Saco de dormir', quantity: 1, weight: 5 },
        { name: 'Pedernal y yesca', quantity: 1, weight: 0 },
        { name: 'Antorchas', quantity: 5, weight: 5 },
      ],
    },
    {
      name: 'Kit del Saqueador Nómada',
      description: 'Equipo versátil para un bárbaro que caza y saquea',
      totalCost: 45,
      totalWeight: 48,
      items: [
        { name: 'Espada larga', quantity: 1, weight: 4 },
        { name: 'Arco corto compuesto', quantity: 1, weight: 2 },
        { name: 'Flechas', quantity: 20, weight: 3 },
        { name: 'Armadura de pieles', quantity: 1, weight: 25 },
        { name: 'Mochila', quantity: 1, weight: 2 },
        { name: 'Odre', quantity: 1, weight: 4 },
        { name: 'Raciones (1 día)', quantity: 3, weight: 3 },
        { name: 'Cuerda de cáñamo (50 pies)', quantity: 1, weight: 10 },
      ],
    },
  ],

  // BARDO
  bard: [
    {
      name: 'Kit del Trovador Viajero',
      description: 'Equipo para un bardo que entretiene en las tabernas',
      totalCost: 80,
      totalWeight: 40,
      items: [
        { name: 'Espada corta', quantity: 1, weight: 2 },
        { name: 'Ballesta ligera', quantity: 1, weight: 4 },
        { name: 'Virotes', quantity: 20, weight: 2 },
        { name: 'Armadura de cuero tachonado', quantity: 1, weight: 20 },
        { name: 'Laúd', quantity: 1, weight: 3 },
        { name: 'Mochila', quantity: 1, weight: 2 },
        { name: 'Ropa de viajero elegante', quantity: 1, weight: 0 },
        { name: 'Odre', quantity: 1, weight: 4 },
        { name: 'Raciones (1 día)', quantity: 3, weight: 3 },
      ],
    },
    {
      name: 'Kit del Pícaro Carismático',
      description: 'Equipo ligero para un bardo que prefiere la astucia',
      totalCost: 75,
      totalWeight: 35,
      items: [
        { name: 'Estoque', quantity: 1, weight: 2 },
        { name: 'Daga', quantity: 2, weight: 2 },
        { name: 'Armadura de cuero', quantity: 1, weight: 15 },
        { name: 'Flauta', quantity: 1, weight: 1 },
        { name: 'Herramientas de ladrón', quantity: 1, weight: 1 },
        { name: 'Mochila', quantity: 1, weight: 2 },
        { name: 'Tinta y pluma', quantity: 1, weight: 0 },
        { name: 'Pergamino en blanco (5 hojas)', quantity: 1, weight: 0 },
        { name: 'Raciones (1 día)', quantity: 5, weight: 5 },
        { name: 'Odre', quantity: 1, weight: 4 },
      ],
    },
  ],

  // CLÉRIGO
  cleric: [
    {
      name: 'Kit del Clérigo de Guerra',
      description: 'Equipo para un clérigo que lidera desde el frente',
      totalCost: 120,
      totalWeight: 68,
      items: [
        { name: 'Maza pesada', quantity: 1, weight: 8 },
        { name: 'Escudo pesado de madera', quantity: 1, weight: 10 },
        { name: 'Cota de escamas', quantity: 1, weight: 30 },
        { name: 'Símbolo sagrado de madera', quantity: 1, weight: 0 },
        { name: 'Mochila', quantity: 1, weight: 2 },
        { name: 'Odre', quantity: 1, weight: 4 },
        { name: 'Raciones (1 día)', quantity: 3, weight: 3 },
        { name: 'Libro de oraciones', quantity: 1, weight: 3 },
        { name: 'Antorchas', quantity: 5, weight: 5 },
      ],
    },
    {
      name: 'Kit del Sanador Devoto',
      description: 'Equipo para un clérigo centrado en curar y proteger',
      totalCost: 100,
      totalWeight: 45,
      items: [
        { name: 'Maza ligera', quantity: 1, weight: 4 },
        { name: 'Armadura de cuero tachonado', quantity: 1, weight: 20 },
        { name: 'Símbolo sagrado de plata', quantity: 1, weight: 1 },
        { name: 'Mochila', quantity: 1, weight: 2 },
        { name: 'Kit de curación', quantity: 1, weight: 1 },
        { name: 'Agua bendita (frasco)', quantity: 2, weight: 2 },
        { name: 'Odre', quantity: 1, weight: 4 },
        { name: 'Raciones (1 día)', quantity: 5, weight: 5 },
        { name: 'Libro de oraciones', quantity: 1, weight: 3 },
      ],
    },
  ],

  // DRUIDA
  druid: [
    {
      name: 'Kit del Guardián del Bosque',
      description: 'Equipo natural para un druida que protege la naturaleza',
      totalCost: 35,
      totalWeight: 42,
      items: [
        { name: 'Cimitarra', quantity: 1, weight: 4 },
        { name: 'Dardos', quantity: 5, weight: 2.5 },
        { name: 'Armadura de cuero', quantity: 1, weight: 15 },
        { name: 'Escudo de madera', quantity: 1, weight: 5 },
        { name: 'Muérdago sagrado', quantity: 1, weight: 0 },
        { name: 'Mochila', quantity: 1, weight: 2 },
        { name: 'Odre', quantity: 1, weight: 4 },
        { name: 'Raciones (1 día)', quantity: 3, weight: 3 },
        { name: 'Kit de herbalismo', quantity: 1, weight: 3 },
      ],
    },
    {
      name: 'Kit del Caminante Salvaje',
      description: 'Equipo para un druida que vive en armonía con la naturaleza',
      totalCost: 40,
      totalWeight: 38,
      items: [
        { name: 'Bastón', quantity: 1, weight: 4 },
        { name: 'Honda', quantity: 1, weight: 0 },
        { name: 'Balas de honda', quantity: 20, weight: 10 },
        { name: 'Armadura de pieles', quantity: 1, weight: 25 },
        { name: 'Bolsa de componentes', quantity: 1, weight: 2 },
        { name: 'Mochila', quantity: 1, weight: 2 },
        { name: 'Saco de dormir', quantity: 1, weight: 5 },
        { name: 'Kit de herbalismo', quantity: 1, weight: 3 },
      ],
    },
  ],

  // GUERRERO
  fighter: [
    {
      name: 'Kit del Guerrero Pesado',
      description: 'Equipo completo para un guerrero de primera línea',
      totalCost: 150,
      totalWeight: 85,
      items: [
        { name: 'Espada larga', quantity: 1, weight: 4 },
        { name: 'Espada corta', quantity: 1, weight: 2 },
        { name: 'Cota de mallas', quantity: 1, weight: 40 },
        { name: 'Escudo pesado de acero', quantity: 1, weight: 15 },
        { name: 'Arco largo', quantity: 1, weight: 3 },
        { name: 'Flechas', quantity: 20, weight: 3 },
        { name: 'Mochila', quantity: 1, weight: 2 },
        { name: 'Odre', quantity: 1, weight: 4 },
        { name: 'Raciones (1 día)', quantity: 3, weight: 3 },
        { name: 'Cuerda de cáñamo (50 pies)', quantity: 1, weight: 10 },
      ],
    },
    {
      name: 'Kit del Guerrero Ágil',
      description: 'Equipo más ligero para un guerrero que valora la movilidad',
      totalCost: 110,
      totalWeight: 52,
      items: [
        { name: 'Espada bastarda', quantity: 1, weight: 6 },
        { name: 'Daga', quantity: 2, weight: 2 },
        { name: 'Cota de escamas', quantity: 1, weight: 30 },
        { name: 'Ballesta ligera', quantity: 1, weight: 4 },
        { name: 'Virotes', quantity: 20, weight: 2 },
        { name: 'Mochila', quantity: 1, weight: 2 },
        { name: 'Odre', quantity: 1, weight: 4 },
        { name: 'Raciones (1 día)', quantity: 3, weight: 3 },
      ],
    },
  ],

  // MONJE
  monk: [
    {
      name: 'Kit del Monje Asceta',
      description: 'Equipo minimalista para un monje que rechaza lo material',
      totalCost: 15,
      totalWeight: 22,
      items: [
        { name: 'Bastón', quantity: 1, weight: 4 },
        { name: 'Shuriken', quantity: 10, weight: 0.5 },
        { name: 'Ropa de monje', quantity: 1, weight: 0 },
        { name: 'Mochila', quantity: 1, weight: 2 },
        { name: 'Odre', quantity: 1, weight: 4 },
        { name: 'Raciones (1 día)', quantity: 5, weight: 5 },
        { name: 'Saco de dormir', quantity: 1, weight: 5 },
        { name: 'Texto sagrado', quantity: 1, weight: 3 },
      ],
    },
    {
      name: 'Kit del Monje Viajero',
      description: 'Equipo versátil para un monje en peregrinación',
      totalCost: 20,
      totalWeight: 28,
      items: [
        { name: 'Kama', quantity: 1, weight: 2 },
        { name: 'Nunchaku', quantity: 1, weight: 2 },
        { name: 'Dardos', quantity: 10, weight: 5 },
        { name: 'Ropa de viajero', quantity: 1, weight: 0 },
        { name: 'Mochila', quantity: 1, weight: 2 },
        { name: 'Odre', quantity: 1, weight: 4 },
        { name: 'Raciones (1 día)', quantity: 5, weight: 5 },
        { name: 'Cuerda de seda (50 pies)', quantity: 1, weight: 5 },
        { name: 'Incienso', quantity: 1, weight: 0 },
      ],
    },
  ],

  // PALADÍN
  paladin: [
    {
      name: 'Kit del Paladín Justo',
      description: 'Equipo sagrado para un paladín que combate el mal',
      totalCost: 180,
      totalWeight: 82,
      items: [
        { name: 'Espada larga', quantity: 1, weight: 4 },
        { name: 'Lanza', quantity: 1, weight: 6 },
        { name: 'Cota de mallas', quantity: 1, weight: 40 },
        { name: 'Escudo pesado de acero', quantity: 1, weight: 15 },
        { name: 'Símbolo sagrado de plata', quantity: 1, weight: 1 },
        { name: 'Mochila', quantity: 1, weight: 2 },
        { name: 'Agua bendita (frasco)', quantity: 3, weight: 3 },
        { name: 'Odre', quantity: 1, weight: 4 },
        { name: 'Raciones (1 día)', quantity: 3, weight: 3 },
        { name: 'Libro de oraciones', quantity: 1, weight: 3 },
      ],
    },
    {
      name: 'Kit del Caballero Errante',
      description: 'Equipo para un paladín que viaja ayudando a los necesitados',
      totalCost: 160,
      totalWeight: 75,
      items: [
        { name: 'Espada bastarda', quantity: 1, weight: 6 },
        { name: 'Jabalinas', quantity: 3, weight: 6 },
        { name: 'Cota de escamas', quantity: 1, weight: 30 },
        { name: 'Escudo de madera reforzado', quantity: 1, weight: 10 },
        { name: 'Símbolo sagrado de madera', quantity: 1, weight: 0 },
        { name: 'Mochila', quantity: 1, weight: 2 },
        { name: 'Kit de curación', quantity: 1, weight: 1 },
        { name: 'Odre', quantity: 1, weight: 4 },
        { name: 'Raciones (1 día)', quantity: 5, weight: 5 },
        { name: 'Saco de dormir', quantity: 1, weight: 5 },
        { name: 'Antorchas', quantity: 5, weight: 5 },
      ],
    },
  ],

  // EXPLORADOR (RANGER)
  ranger: [
    {
      name: 'Kit del Rastreador de Bosques',
      description: 'Equipo para un explorador que caza en los bosques',
      totalCost: 90,
      totalWeight: 48,
      items: [
        { name: 'Espada larga', quantity: 1, weight: 4 },
        { name: 'Arco largo', quantity: 1, weight: 3 },
        { name: 'Flechas', quantity: 40, weight: 6 },
        { name: 'Armadura de cuero tachonado', quantity: 1, weight: 20 },
        { name: 'Mochila', quantity: 1, weight: 2 },
        { name: 'Odre', quantity: 1, weight: 4 },
        { name: 'Raciones (1 día)', quantity: 5, weight: 5 },
        { name: 'Cuerda de cáñamo (50 pies)', quantity: 1, weight: 10 },
        { name: 'Kit de trampeador', quantity: 1, weight: 5 },
      ],
    },
    {
      name: 'Kit del Guardabosques Versátil',
      description: 'Equipo completo para un explorador de múltiples terrenos',
      totalCost: 85,
      totalWeight: 52,
      items: [
        { name: 'Hacha de mano', quantity: 2, weight: 6 },
        { name: 'Arco corto', quantity: 1, weight: 2 },
        { name: 'Flechas', quantity: 30, weight: 4.5 },
        { name: 'Armadura de cuero', quantity: 1, weight: 15 },
        { name: 'Mochila', quantity: 1, weight: 2 },
        { name: 'Odre', quantity: 1, weight: 4 },
        { name: 'Raciones (1 día)', quantity: 7, weight: 7 },
        { name: 'Saco de dormir', quantity: 1, weight: 5 },
        { name: 'Pedernal y yesca', quantity: 1, weight: 0 },
        { name: 'Kit de herbalismo', quantity: 1, weight: 3 },
      ],
    },
  ],

  // PÍCARO (ROGUE)
  rogue: [
    {
      name: 'Kit del Ladrón Urbano',
      description: 'Equipo para un pícaro que opera en las ciudades',
      totalCost: 70,
      totalWeight: 35,
      items: [
        { name: 'Estoque', quantity: 1, weight: 2 },
        { name: 'Daga', quantity: 3, weight: 3 },
        { name: 'Ballesta de mano', quantity: 1, weight: 2 },
        { name: 'Virotes', quantity: 20, weight: 2 },
        { name: 'Armadura de cuero', quantity: 1, weight: 15 },
        { name: 'Herramientas de ladrón', quantity: 1, weight: 1 },
        { name: 'Mochila', quantity: 1, weight: 2 },
        { name: 'Cuerda de seda (50 pies)', quantity: 1, weight: 5 },
        { name: 'Odre', quantity: 1, weight: 4 },
        { name: 'Raciones (1 día)', quantity: 3, weight: 3 },
        { name: 'Ganzúa', quantity: 1, weight: 0 },
      ],
    },
    {
      name: 'Kit del Explorador Sigiloso',
      description: 'Equipo ligero para un pícaro que valora la discreción',
      totalCost: 60,
      totalWeight: 28,
      items: [
        { name: 'Espada corta', quantity: 1, weight: 2 },
        { name: 'Daga arrojadiza', quantity: 5, weight: 5 },
        { name: 'Armadura de cuero tachonado', quantity: 1, weight: 20 },
        { name: 'Herramientas de ladrón', quantity: 1, weight: 1 },
        { name: 'Mochila', quantity: 1, weight: 2 },
        { name: 'Antorchas encapuchadas', quantity: 3, weight: 0 },
        { name: 'Odre', quantity: 1, weight: 4 },
        { name: 'Raciones (1 día)', quantity: 3, weight: 3 },
        { name: 'Espejo pequeño de acero', quantity: 1, weight: 0.5 },
      ],
    },
  ],

  // HECHICERO
  sorcerer: [
    {
      name: 'Kit del Hechicero Carismático',
      description: 'Equipo para un hechicero que confía en su don innato',
      totalCost: 50,
      totalWeight: 28,
      items: [
        { name: 'Bastón', quantity: 1, weight: 4 },
        { name: 'Ballesta ligera', quantity: 1, weight: 4 },
        { name: 'Virotes', quantity: 20, weight: 2 },
        { name: 'Bolsa de componentes', quantity: 1, weight: 2 },
        { name: 'Mochila', quantity: 1, weight: 2 },
        { name: 'Ropa de viajero de calidad', quantity: 1, weight: 0 },
        { name: 'Odre', quantity: 1, weight: 4 },
        { name: 'Raciones (1 día)', quantity: 5, weight: 5 },
        { name: 'Saco de dormir', quantity: 1, weight: 5 },
      ],
    },
    {
      name: 'Kit del Mago Callejero',
      description: 'Equipo para un hechicero que sobrevive con ingenio',
      totalCost: 45,
      totalWeight: 25,
      items: [
        { name: 'Daga', quantity: 2, weight: 2 },
        { name: 'Honda', quantity: 1, weight: 0 },
        { name: 'Balas de honda', quantity: 20, weight: 10 },
        { name: 'Bolsa de componentes', quantity: 1, weight: 2 },
        { name: 'Mochila', quantity: 1, weight: 2 },
        { name: 'Odre', quantity: 1, weight: 4 },
        { name: 'Raciones (1 día)', quantity: 3, weight: 3 },
        { name: 'Antorchas', quantity: 5, weight: 5 },
        { name: 'Pedernal y yesca', quantity: 1, weight: 0 },
      ],
    },
  ],

  // MAGO
  wizard: [
    {
      name: 'Kit del Erudito Arcano',
      description: 'Equipo para un mago que valora el conocimiento',
      totalCost: 60,
      totalWeight: 30,
      items: [
        { name: 'Bastón', quantity: 1, weight: 4 },
        { name: 'Ballesta ligera', quantity: 1, weight: 4 },
        { name: 'Virotes', quantity: 20, weight: 2 },
        { name: 'Libro de conjuros', quantity: 1, weight: 3 },
        { name: 'Bolsa de componentes', quantity: 1, weight: 2 },
        { name: 'Mochila', quantity: 1, weight: 2 },
        { name: 'Tinta y pluma', quantity: 1, weight: 0 },
        { name: 'Pergamino en blanco (10 hojas)', quantity: 1, weight: 0 },
        { name: 'Odre', quantity: 1, weight: 4 },
        { name: 'Raciones (1 día)', quantity: 5, weight: 5 },
        { name: 'Linterna encapuchada', quantity: 1, weight: 2 },
        { name: 'Aceite (frasco)', quantity: 2, weight: 2 },
      ],
    },
    {
      name: 'Kit del Aventurero Arcano',
      description: 'Equipo para un mago que se aventura fuera de la torre',
      totalCost: 55,
      totalWeight: 28,
      items: [
        { name: 'Daga', quantity: 2, weight: 2 },
        { name: 'Libro de conjuros', quantity: 1, weight: 3 },
        { name: 'Bolsa de componentes', quantity: 1, weight: 2 },
        { name: 'Mochila', quantity: 1, weight: 2 },
        { name: 'Odre', quantity: 1, weight: 4 },
        { name: 'Raciones (1 día)', quantity: 5, weight: 5 },
        { name: 'Saco de dormir', quantity: 1, weight: 5 },
        { name: 'Cuerda de cáñamo (50 pies)', quantity: 1, weight: 10 },
        { name: 'Antorchas', quantity: 5, weight: 5 },
      ],
    },
  ],
};

/**
 * Obtiene los kits de equipo para una clase específica
 */
export function getStarterKits(classSlug: string): StarterKit[] {
  return STARTING_EQUIPMENT[classSlug] || [];
}

/**
 * Obtiene un kit específico por clase e índice
 */
export function getStarterKit(classSlug: string, kitIndex: number): StarterKit | null {
  const kits = getStarterKits(classSlug);
  return kits[kitIndex] || null;
}

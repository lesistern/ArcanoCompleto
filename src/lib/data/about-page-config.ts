// ============================================================================
// About Page Configuration and Data
// ============================================================================

export interface EditionData {
  title: string;
  status: string;
  statusColor: string;
  statusBgColor: string;
  statusBorderColor: string;
  badge: string;
  features: string[];
  cardBorder: string;
  cardHoverBorder: string;
  cardGradient: string;
  featureColor: string;
  cta?: {
    text: string;
    href: string;
  };
  releaseDate?: string;
}

export interface StatCard {
  value: string | number;
  label: string;
  borderColor: string;
  bgColor: string;
}

export interface FeatureCard {
  icon: string; // Icon name from lucide-react
  title: string;
  items: string[];
}

export interface ContributionLink {
  icon: string; // Icon name from lucide-react
  text: string;
  href: string;
  color: string;
}

export interface VisionPoint {
  title: string;
  description: string;
}

// ============================================================================
// Edition Configurations
// ============================================================================

export const EDITIONS: Record<string, EditionData> = {
  dnd35: {
    title: 'D&D 3.5',
    status: 'Disponible Ahora',
    statusColor: 'text-green-300',
    statusBgColor: 'bg-green-500/20',
    statusBorderColor: 'border-green-500/30',
    badge: '✅',
    features: [
      '118 libros catalogados',
      '605 conjuros (554 traducidos oficialmente)',
      '143 dotes categorizadas',
      '11 clases con progresión 1-20',
      '16 razas jugables'
    ],
    cardBorder: 'border-green-500/40',
    cardHoverBorder: 'border-green-500/60',
    cardGradient: 'from-green-500/10',
    featureColor: 'text-green-400',
    cta: {
      text: 'Explorar Compendio 3.5',
      href: '/clases'
    }
  },
  dnd5e: {
    title: 'D&D 5e',
    status: 'En Desarrollo',
    statusColor: 'text-blue-300',
    statusBgColor: 'bg-blue-500/20',
    statusBorderColor: 'border-blue-500/30',
    badge: '🚧',
    features: [
      '50+ libros oficiales planificados',
      '13 clases (incluyendo Artificer)',
      '50+ subclases oficiales',
      '500+ conjuros con upcast',
      'Editor de personajes 5e completo'
    ],
    cardBorder: 'border-blue-500/40',
    cardHoverBorder: 'border-blue-500/60',
    cardGradient: 'from-blue-500/10',
    featureColor: 'text-blue-400',
    releaseDate: 'Q1 2026'
  },
  dnd55e: {
    title: 'One D&D',
    status: 'Planificado',
    statusColor: 'text-purple-300',
    statusBgColor: 'bg-purple-500/20',
    statusBorderColor: 'border-purple-500/30',
    badge: '📋',
    features: [
      'PHB 2024 completo',
      'Nuevas versiones de clases',
      'Species (reemplazo de razas)',
      'Compatibilidad retroactiva con 5e',
      'Migrador de personajes 5e → 5.5e'
    ],
    cardBorder: 'border-purple-500/40',
    cardHoverBorder: 'border-purple-500/60',
    cardGradient: 'from-purple-500/10',
    featureColor: 'text-purple-400',
    releaseDate: 'Q2-Q3 2026'
  }
};

// ============================================================================
// Project Statistics
// ============================================================================

export const PROJECT_STATS: StatCard[] = [
  {
    value: 118,
    label: 'Libros Catalogados',
    borderColor: 'border-green-500/30',
    bgColor: 'bg-dungeon-800/50'
  },
  {
    value: 605,
    label: 'Conjuros D&D 3.5',
    borderColor: 'border-blue-500/30',
    bgColor: 'bg-dungeon-800/50'
  },
  {
    value: '500+',
    label: 'Usuarios Registrados',
    borderColor: 'border-purple-500/30',
    bgColor: 'bg-dungeon-800/50'
  },
  {
    value: '95+',
    label: 'Score Lighthouse',
    borderColor: 'border-orange-500/30',
    bgColor: 'bg-dungeon-800/50'
  }
];

// ============================================================================
// Featured Features
// ============================================================================

export const FEATURED_FEATURES: FeatureCard[] = [
  {
    icon: 'Code',
    title: 'Editor de Personajes',
    items: [
      '✅ Point Buy de 25 puntos automático',
      '✅ Tiradas 4d6 con animación',
      '✅ Guardado en la nube',
      '✅ Generador de nombres por raza',
      '✅ Export/Import JSON'
    ]
  },
  {
    icon: 'MessageCircle',
    title: 'Sistema de Foro',
    items: [
      '✅ 6 categorías especializadas',
      '✅ Sistema de votación (upvote/downvote)',
      '✅ Trust Levels y XP',
      '✅ Marcar respuestas como solución',
      '✅ 20 achievements desbloqueables'
    ]
  },
  {
    icon: 'Users',
    title: 'Traducciones Colaborativas',
    items: [
      '✅ 554 conjuros traducidos oficialmente',
      '✅ Sistema de tiers de usuario',
      '✅ Votación comunitaria',
      '✅ Integración DeepL API',
      '✅ Sistema de reputación'
    ]
  },
  {
    icon: 'Shield',
    title: 'Seguridad y Privacidad',
    items: [
      '✅ Row Level Security (RLS)',
      '✅ 7 headers de seguridad',
      '✅ Sin tracking de terceros',
      '✅ Datos encriptados',
      '✅ Perfiles públicos opcionales'
    ]
  }
];

// ============================================================================
// Contribution Links
// ============================================================================

export const CONTRIBUTION_LINKS: ContributionLink[] = [
  {
    icon: 'Heart',
    text: 'Patreon',
    href: 'https://www.patreon.com/c/compendioarcano',
    color: 'text-pink-400'
  },
  {
    icon: 'Coffee',
    text: 'Cafecito',
    href: 'https://cafecito.app/compendioarcano',
    color: 'text-orange-400'
  },
  {
    icon: 'DollarSign',
    text: 'Mercado Pago',
    href: 'https://link.mercadopago.com.ar/compendioarcano',
    color: 'text-blue-400'
  }
];

// ============================================================================
// Vision Points
// ============================================================================

export const VISION_POINTS: VisionPoint[] = [
  {
    title: '100% gratuito',
    description: 'sin publicidad invasiva'
  },
  {
    title: 'Comunidad primero',
    description: 'Decisiones guiadas por feedback'
  },
  {
    title: 'Mantenido por la comunidad',
    description: 'para la comunidad'
  },
  {
    title: 'Multi-edición',
    description: '3.5, 5e y 5.5e'
  }
];

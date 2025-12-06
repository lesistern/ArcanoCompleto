import {
  Heart, Skull, Scale, Zap, Scroll,
  ShieldCheck, HeartHandshake, Sparkles,
  Circle, Wind, Gavel, Flame, LucideIcon
} from 'lucide-react';

export const ALIGNMENT_GENERAL_INFO = {
  intro: {
    title: 'Alineamiento',
    description: 'El alineamiento define la moral y actitud de tu personaje. Es una guía para desarrollar su identidad, no una restricción rígida, permitiendo una amplia variedad de personalidades dentro de cada categoría.'
  },
  goodVsEvil: {
    title: 'El Bien contra el Mal',
    description: 'El Bien implica altruismo y respeto por la vida, protegiendo a los inocentes. El Mal busca herir u oprimir, ya sea por placer o beneficio. La Neutralidad respeta la vida pero evita el sacrificio personal, priorizando las relaciones cercanas.'
  },
  lawVsChaos: {
    title: 'La Ley contra el Caos',
    description: 'La Ley valora el honor, la tradición y la autoridad, aportando confiabilidad pero a veces rigidez. El Caos prioriza la libertad y la adaptabilidad, siguiendo la propia conciencia. La Neutralidad busca un equilibrio sin compulsión hacia el orden ni la rebelión.'
  }
};

export const alignmentDetails: Record<string, {
  name: string;
  archetype: string;
  shortDesc: string;
  description: string;
  quote: string; // "Why it's the best/dangerous"
  quoteType: 'best' | 'dangerous';
  axis: {
    lawChaos: 'law' | 'chaos' | 'neutral';
    goodEvil: 'good' | 'evil' | 'neutral';
  };
}> = {
  'legal-bueno': {
    name: 'Legal Bueno',
    archetype: 'El Cruzado',
    shortDesc: 'Combina honor y compasión.',
    description: 'Actúa como se espera de una buena persona, combinando el compromiso de oponerse al mal con la disciplina para luchar sin descanso. Dice la verdad, cumple su palabra y ayuda a los necesitados, odiando ver que los culpables queden impunes.',
    quote: 'Combina honor y compasión.',
    quoteType: 'best',
    axis: { lawChaos: 'law', goodEvil: 'good' }
  },
  'neutral-bueno': {
    name: 'Neutral Bueno',
    archetype: 'El Benefactor',
    shortDesc: 'Hace lo mejor que una buena persona puede hacer.',
    description: 'Hace lo mejor que puede por los demás, dedicado a ayudar sin sentirse obligado por jerarquías. Trabaja con figuras de autoridad si es necesario, pero su lealtad es hacia el bien, no hacia la ley.',
    quote: 'Significa hacer el bien sin prejuicios a favor o en contra del orden.',
    quoteType: 'best',
    axis: { lawChaos: 'neutral', goodEvil: 'good' }
  },
  'caotico-bueno': {
    name: 'Caótico Bueno',
    archetype: 'El Rebelde',
    shortDesc: 'Sigue su conciencia sin importar las expectativas.',
    description: 'Actúa según su conciencia sin importar las expectativas ajenas. Es amable y benevolente, pero tiene poco uso para leyes y regulaciones, siguiendo su propia brújula moral para hacer el bien.',
    quote: 'Combina un buen corazón con un espíritu libre.',
    quoteType: 'best',
    axis: { lawChaos: 'chaos', goodEvil: 'good' }
  },
  'legal-neutral': {
    name: 'Legal Neutral',
    archetype: 'El Juez',
    shortDesc: 'Actúa según la ley, la tradición o un código personal.',
    description: 'Se rige por la ley, la tradición o un código personal. El orden y la organización son primordiales, ya sea creyendo en un orden personal o favoreciendo un gobierno fuerte y organizado para todos.',
    quote: 'Significa que eres confiable y honorable sin ser un fanático.',
    quoteType: 'best',
    axis: { lawChaos: 'law', goodEvil: 'neutral' }
  },
  'neutral': {
    name: 'Neutral',
    archetype: 'El Indeciso',
    shortDesc: 'Hace lo que parece ser una buena idea.',
    description: 'Prefiere el bien al mal, pero no siente una fuerte inclinación por ningún extremo. Puede carecer de convicción o, en algunos casos, comprometerse filosóficamente con la neutralidad como el camino más equilibrado.',
    quote: 'Significa que actúas naturalmente, sin prejuicios ni compulsiones.',
    quoteType: 'best',
    axis: { lawChaos: 'neutral', goodEvil: 'neutral' }
  },
  'caotico-neutral': {
    name: 'Caótico Neutral',
    archetype: 'El Espíritu Libre',
    shortDesc: 'Sigue sus caprichos y valora su propia libertad.',
    description: 'Sigue sus caprichos y valora su libertad por encima de todo. Evita la autoridad y desafía las tradiciones, no por anarquía organizada, sino por puro individualismo impredecible.',
    quote: 'Representa la verdadera libertad tanto de las restricciones de la sociedad como del celo de los bienhechores.',
    quoteType: 'best',
    axis: { lawChaos: 'chaos', goodEvil: 'neutral' }
  },
  'legal-malvado': {
    name: 'Legal Malvado',
    archetype: 'El Dominador',
    shortDesc: 'Toma metódicamente lo que quiere dentro de su código.',
    description: 'Toma lo que quiere dentro de los límites de su código, sin piedad ni compasión. Le importa la tradición y el orden, pero no la libertad o la vida, usando el sistema para sus propios fines egoístas.',
    quote: 'Representa el mal metódico, intencional y frecuentemente exitoso.',
    quoteType: 'dangerous',
    axis: { lawChaos: 'law', goodEvil: 'evil' }
  },
  'neutral-malvado': {
    name: 'Neutral Malvado',
    archetype: 'El Malhechor',
    shortDesc: 'Hace todo lo que puede para salirse con la suya.',
    description: 'Hace lo que sea para salirse con la suya, pensando solo en sí mismo. No tiene amor por el orden ni conflicto con él; simplemente el mal puro y pragmático sin honor ni variación.',
    quote: 'Representa el mal puro sin honor y sin variación.',
    quoteType: 'dangerous',
    axis: { lawChaos: 'neutral', goodEvil: 'evil' }
  },
  'caotico-malvado': {
    name: 'Caótico Malvado',
    archetype: 'El Destructor',
    shortDesc: 'Hace lo que su codicia, odio y lujuria por la destrucción le impulsan.',
    description: 'Guiado por la codicia, el odio y la destrucción. Es vicioso, arbitrariamente violento e impredecible, representando la destrucción no solo de la vida, sino del orden mismo.',
    quote: 'Representa la destrucción no solo de la belleza y la vida, sino también del orden del que dependen la belleza y la vida.',
    quoteType: 'dangerous',
    axis: { lawChaos: 'chaos', goodEvil: 'evil' }
  }
};

export const axisDescriptions = {
  good: {
    title: 'El Bien',
    desc: 'Implica altruismo, respeto por la vida y preocupación por la dignidad de los seres sintientes. Los personajes buenos hacen sacrificios personales para ayudar a otros.',
    icon: Heart,
    color: 'text-blue-400',
    borderColor: 'border-blue-500/30',
    bg: 'bg-blue-900/10'
  },
  evil: {
    title: 'El Mal',
    desc: 'Implica herir, oprimir y matar a otros. Algunos carecen de compasión, otros persiguen el mal activamente por deporte o deber hacia una deidad oscura.',
    icon: Skull,
    color: 'text-red-400',
    borderColor: 'border-red-500/30',
    bg: 'bg-red-900/10'
  },
  law: {
    title: 'La Ley',
    desc: 'Implica honor, confiabilidad, obediencia a la autoridad y fiabilidad. Puede incluir cerrazón mental y adhesión reaccionaria a la tradición.',
    icon: Scale,
    color: 'text-gold-400',
    borderColor: 'border-gold-500/30',
    bg: 'bg-gold-900/10'
  },
  chaos: {
    title: 'El Caos',
    desc: 'Implica libertad, adaptabilidad y flexibilidad. Puede incluir imprudencia, resentimiento hacia la autoridad legítima y acciones arbitrarias.',
    icon: Zap,
    color: 'text-purple-400',
    borderColor: 'border-purple-500/30',
    bg: 'bg-purple-900/10'
  },
  neutral: {
    title: 'La Neutralidad',
    desc: 'Representa un punto medio o falta de compromiso. Puede ser una elección consciente de equilibrio o simplemente indiferencia hacia los extremos morales.',
    icon: Scroll,
    color: 'text-dungeon-300',
    borderColor: 'border-dungeon-500/30',
    bg: 'bg-dungeon-900/10'
  }
};

export const slugToCode: Record<string, string> = {
  'legal-bueno': 'LG',
  'neutral-bueno': 'NG',
  'caotico-bueno': 'CG',
  'legal-neutral': 'LN',
  'neutral': 'N',
  'caotico-neutral': 'CN',
  'legal-malvado': 'LE',
  'neutral-malvado': 'NE',
  'caotico-malvado': 'CE',
};

export const ALIGNMENT_CONFIG: Record<string, { label: string; color: string; hex: string; code: string; description: string; icon: LucideIcon }> = {
  LG: {
    label: 'Legal Bueno',
    color: 'text-[#4FB3FF]',
    hex: '#4FB3FF',
    code: 'LG',
    description: 'Combina honor y compasión.',
    icon: ShieldCheck
  },
  NG: {
    label: 'Neutral Bueno',
    color: 'text-[#6CDFA8]',
    hex: '#6CDFA8',
    code: 'NG',
    description: 'Hace lo mejor que una buena persona puede hacer.',
    icon: HeartHandshake
  },
  CG: {
    label: 'Caótico Bueno',
    color: 'text-[#A9FF72]',
    hex: '#A9FF72',
    code: 'CG',
    description: 'Sigue su conciencia sin importar las expectativas.',
    icon: Sparkles
  },
  LN: {
    label: 'Legal Neutral',
    color: 'text-[#7AA6FF]',
    hex: '#7AA6FF',
    code: 'LN',
    description: 'Actúa según la ley, la tradición o un código personal.',
    icon: Scale
  },
  N: {
    label: 'Neutral',
    color: 'text-[#C8C8C8]',
    hex: '#C8C8C8',
    code: 'N',
    description: 'Hace lo que parece ser una buena idea.',
    icon: Circle
  },
  CN: {
    label: 'Caótico Neutral',
    color: 'text-[#F2C94C]',
    hex: '#F2C94C',
    code: 'CN',
    description: 'Sigue sus caprichos y valora su propia libertad.',
    icon: Wind
  },
  LE: {
    label: 'Legal Malvado',
    color: 'text-[#A15BFF]',
    hex: '#A15BFF',
    code: 'LE',
    description: 'Toma metódicamente lo que quiere dentro de su código.',
    icon: Gavel
  },
  NE: {
    label: 'Neutral Malvado',
    color: 'text-[#FF6B6B]',
    hex: '#FF6B6B',
    code: 'NE',
    description: 'Hace todo lo que puede para salirse con la suya.',
    icon: Skull
  },
  CE: {
    label: 'Caótico Malvado',
    color: 'text-[#E00000]',
    hex: '#E00000',
    code: 'CE',
    description: 'Hace lo que su codicia, odio y lujuria por la destrucción le impulsan.',
    icon: Flame
  },
};

export const ALIGNMENT_GRID = [
  ['LG', 'NG', 'CG'],
  ['LN', 'N', 'CN'],
  ['LE', 'NE', 'CE']
];

export function getAlignmentImageGlow(alignmentCode: string) {
  const config = ALIGNMENT_CONFIG[alignmentCode] || ALIGNMENT_CONFIG['N'];
  const baseColor = config.hex;

  return {
    from: `${baseColor}CC`, // 80% opacity
    via: `${baseColor}66`,  // 40% opacity
    to: `${baseColor}1A`    // 10% opacity
  };
}

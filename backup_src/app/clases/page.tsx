import { createClient } from '@/lib/supabase/server';
import ClassCard from '@/components/classes/ClassCard';
import { DnDClass } from '@/lib/types/class';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import {
  getClassCategoryIcon,
  getClassCategoryColor,
  extractTextColor,
  ClassCategory,
  getSourceTag,
} from '@/lib/utils/icons';

export const revalidate = 3600;

const slugifyClassName = (name: string) =>
  name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const CATEGORY_OVERRIDES: Record<string, ClassCategory> = {
  // PHB
  barbaro: 'Marciales',
  barbarian: 'Marciales',
  bardo: 'Versátiles',
  bard: 'Versátiles',
  clerigo: 'Mágicas',
  cleric: 'Mágicas',
  druida: 'Mágicas',
  druid: 'Mágicas',
  guerrero: 'Marciales',
  fighter: 'Marciales',
  monje: 'Marciales',
  monk: 'Marciales',
  paladin: 'Marciales',
  explorador: 'Marciales',
  ranger: 'Marciales',
  picaro: 'Versátiles',
  rogue: 'Versátiles',
  hechicero: 'Mágicas',
  sorcerer: 'Mágicas',
  mago: 'Mágicas',
  wizard: 'Mágicas',
  // Psionic
  psion: 'Mágicas',
  'psychic-warrior': 'Marciales',
  soulknife: 'Marciales',
  wilder: 'Mágicas',
  // Complete Adventurer
  ninja: 'Versátiles',
  scout: 'Versátiles',
  spellthief: 'Versátiles',
  // Complete Arcane
  warlock: 'Mágicas',
  'wu-jen': 'Mágicas',
  // Complete Divine
  shugenja: 'Mágicas',
  'spirit-shaman': 'Mágicas',
  // Complete Psionic
  ardent: 'Mágicas',
  'divine-mind': 'Versátiles',
  erudite: 'Mágicas',
  lurk: 'Versátiles',
  // Complete Warrior
  hexblade: 'Versátiles',
  samurai: 'Marciales',
  swashbuckler: 'Marciales',
  // Dragon Compendium
  'battle-dancer': 'Marciales',
  'death-master': 'Mágicas',
  jester: 'Versátiles',
  mountebank: 'Versátiles',
  savant: 'Versátiles',
  shair: 'Mágicas',
  'sha-ir': 'Mágicas',
  'urban-druid': 'Mágicas',
  // Dragon Magic
  'dragonfire-adept': 'Mágicas',
  // Dragonlance
  mariner: 'Marciales',
  master: 'Versátiles',
  mystic: 'Mágicas',
  nightstalker: 'Versátiles',
  noble: 'Versátiles',
  // Dungeonscape
  factotum: 'Versátiles',
  // Eberron
  artificer: 'Mágicas',
  // Heroes of Horror
  archivist: 'Mágicas',
  'dread-necromancer': 'Mágicas',
  // Magic of Incarnum
  incarnate: 'Mágicas',
  soulborn: 'Marciales',
  totemist: 'Versátiles',
  // Miniatures Handbook
  'favored-soul': 'Mágicas',
  healer: 'Mágicas',
  marshal: 'Versátiles',
  warmage: 'Mágicas',
  // Oriental Adventures
  shaman: 'Mágicas',
  sohei: 'Marciales',
  // Player's Handbook II
  beguiler: 'Mágicas',
  'dragon-shaman': 'Versátiles',
  duskblade: 'Versátiles',
  knight: 'Marciales',
  // Tome of Battle
  crusader: 'Marciales',
  swordsage: 'Versátiles',
  warblade: 'Marciales',
  // Tome of Magic
  binder: 'Versátiles',
  shadowcaster: 'Mágicas',
  truenamer: 'Mágicas',
  // WotC Website
  'psychic-rogue': 'Versátiles',
};

type BaseSaveAttackRow = {
  level: number;
  goodSave: string;
  poorSave: string;
  goodBab: string;
  averageBab: string;
  poorBab: string;
};

type LevelBenefitRow = {
  level: number;
  xp: string;
  classSkillMax: string;
  crossClassMax: string;
  feats: string;
  abilityIncrease: string;
};

type WealthRow = {
  level: number;
  pc: string;
  npc: string;
};

type StandardClassCategory = {
  title: string;
  source?: string;
  defaultOpen?: boolean;
  classes: string[];
};

const standardClassCategories: StandardClassCategory[] = [
  {
    title: 'Clases núcleo',
    source: 'Manual del Jugador',
    defaultOpen: true,
    classes: ['Bárbaro', 'Bardo', 'Clérigo', 'Druida', 'Guerrero', 'Monje', 'Paladín', 'Explorador', 'Pícaro', 'Hechicero', 'Mago'],
  },
  { title: 'Psiónicos', classes: ['Psión', 'Guerrero psíquico', 'Hoja de alma', 'Indómito'] },
  { title: 'Complete Adventurer', classes: ['Ninja', 'Explorador veloz', 'Robaconjuros'] },
  { title: 'Complete Arcane', classes: ['Brujo', 'Wu jen'] },
  { title: 'Complete Divine', classes: ['Shugenja', 'Chamán espiritual'] },
  { title: 'Complete Psionic', classes: ['Ardent', 'Mente divina', 'Erudito', 'Merodeador psíquico'] },
  { title: 'Complete Warrior', classes: ['Espadachín maldito', 'Samurái', 'Espadachín'] },
  { title: 'Dragon Compendium', classes: ['Bailarín de batalla', 'Maestro de la muerte', 'Bufón', 'Mountebank', 'Sabio', "Sha'ir", 'Druida urbano'] },
  { title: 'Dragon Magic', classes: ['Adepto al Fuego de Dragón'] },
  { title: 'Dragonlance Campaign Setting', classes: ['Marinero', 'Maestre', 'Místico', 'Acechador nocturno', 'Noble'] },
  { title: 'Dungeonscape', classes: ['Factótum'] },
  { title: 'Eberron Campaign Setting', classes: ['Artífice'] },
  { title: 'Heroes of Horror', classes: ['Archivista', 'Nigromante temible'] },
  { title: 'Magic of Incarnum', classes: ['Encarnado', 'Nacido del alma', 'Totemista'] },
  { title: 'Miniatures Handbook', classes: ['Alma favorecida', 'Sanador', 'Mariscal', 'Mago de guerra'] },
  { title: 'Oriental Adventures', classes: ['Chamán', 'Sohei'] },
  { title: "Player's Handbook II", classes: ['Embaucador', 'Chamán dragón', 'Hoja del ocaso', 'Caballero'] },
  { title: 'Tome of Battle', classes: ['Cruzado', 'Sabio de la espada', 'Hoja de guerra'] },
  { title: 'Tome of Magic', classes: ['Vinculador', 'Lanzador de sombras', 'Pronunciador'] },
  { title: 'Sitio web de Wizards', classes: ['Pícaro psíquico'] },
];

const totalStandardClasses = standardClassCategories.reduce((sum, group) => sum + group.classes.length, 0);

const supplementalClassSources: Array<{ name: string; source: string }> = [
  // Psionic
  { name: 'Psion', source: 'Expanded Psionics Handbook' },
  { name: 'Psychic Warrior', source: 'Expanded Psionics Handbook' },
  { name: 'Soulknife', source: 'Expanded Psionics Handbook' },
  { name: 'Wilder', source: 'Expanded Psionics Handbook' },
  // Complete Adventurer
  { name: 'Ninja', source: 'Complete Adventurer' },
  { name: 'Scout', source: 'Complete Adventurer' },
  { name: 'Spellthief', source: 'Complete Adventurer' },
  // Complete Arcane
  { name: 'Warlock', source: 'Complete Arcane' },
  { name: 'Wu jen', source: 'Complete Arcane' },
  // Complete Divine
  { name: 'Shugenja', source: 'Complete Divine' },
  { name: 'Spirit Shaman', source: 'Complete Divine' },
  // Complete Psionic
  { name: 'Ardent', source: 'Complete Psionic' },
  { name: 'Divine Mind', source: 'Complete Psionic' },
  { name: 'Erudite', source: 'Complete Psionic' },
  { name: 'Lurk', source: 'Complete Psionic' },
  // Complete Warrior
  { name: 'Hexblade', source: 'Complete Warrior' },
  { name: 'Samurai', source: 'Complete Warrior' },
  { name: 'Swashbuckler', source: 'Complete Warrior' },
  // Dragon Compendium
  { name: 'Battle Dancer', source: 'Dragon Compendium' },
  { name: 'Death Master', source: 'Dragon Compendium' },
  { name: 'Jester', source: 'Dragon Compendium' },
  { name: 'Mountebank', source: 'Dragon Compendium' },
  { name: 'Savant', source: 'Dragon Compendium' },
  { name: "Sha'ir", source: 'Dragon Compendium' },
  { name: 'Urban Druid', source: 'Dragon Compendium' },
  // Dragon Magic
  { name: 'Dragonfire Adept', source: 'Dragon Magic' },
  // Dragonlance Campaign Setting
  { name: 'Mariner', source: 'Dragonlance Campaign Setting' },
  { name: 'Master', source: 'Dragonlance Campaign Setting' },
  { name: 'Mystic', source: 'Dragonlance Campaign Setting' },
  { name: 'Nightstalker', source: 'Dragonlance Campaign Setting' },
  { name: 'Noble', source: 'Dragonlance Campaign Setting' },
  // Dungeonscape
  { name: 'Factotum', source: 'Dungeonscape' },
  // Eberron
  { name: 'Artificer', source: 'Eberron Campaign Setting' },
  // Heroes of Horror
  { name: 'Archivist', source: 'Heroes of Horror' },
  { name: 'Dread Necromancer', source: 'Heroes of Horror' },
  // Magic of Incarnum
  { name: 'Incarnate', source: 'Magic of Incarnum' },
  { name: 'Soulborn', source: 'Magic of Incarnum' },
  { name: 'Totemist', source: 'Magic of Incarnum' },
  // Miniatures Handbook
  { name: 'Favored Soul', source: 'Miniatures Handbook' },
  { name: 'Healer', source: 'Miniatures Handbook' },
  { name: 'Marshal', source: 'Miniatures Handbook' },
  { name: 'Warmage', source: 'Miniatures Handbook' },
  // Oriental Adventures
  { name: 'Shaman', source: 'Oriental Adventures' },
  { name: 'Sohei', source: 'Oriental Adventures' },
  // Player's Handbook II
  { name: 'Beguiler', source: "Player's Handbook II" },
  { name: 'Dragon Shaman', source: "Player's Handbook II" },
  { name: 'Duskblade', source: "Player's Handbook II" },
  { name: 'Knight', source: "Player's Handbook II" },
  // Tome of Battle
  { name: 'Crusader', source: 'Tome of Battle' },
  { name: 'Swordsage', source: 'Tome of Battle' },
  { name: 'Warblade', source: 'Tome of Battle' },
  // Tome of Magic
  { name: 'Binder', source: 'Tome of Magic' },
  { name: 'Shadowcaster', source: 'Tome of Magic' },
  { name: 'Truenamer', source: 'Tome of Magic' },
  // WotC Website
  { name: 'Psychic Rogue', source: 'Sitio web de Wizards' },
];

const baseSaveAttackTable: BaseSaveAttackRow[] = [
  { level: 1, goodSave: '+2', poorSave: '+0', goodBab: '+1', averageBab: '+0', poorBab: '+0' },
  { level: 2, goodSave: '+3', poorSave: '+0', goodBab: '+2', averageBab: '+1', poorBab: '+1' },
  { level: 3, goodSave: '+3', poorSave: '+1', goodBab: '+3', averageBab: '+2', poorBab: '+1' },
  { level: 4, goodSave: '+4', poorSave: '+1', goodBab: '+4', averageBab: '+3', poorBab: '+2' },
  { level: 5, goodSave: '+4', poorSave: '+1', goodBab: '+5', averageBab: '+3', poorBab: '+2' },
  { level: 6, goodSave: '+5', poorSave: '+2', goodBab: '+6/+1', averageBab: '+4', poorBab: '+3' },
  { level: 7, goodSave: '+5', poorSave: '+2', goodBab: '+7/+2', averageBab: '+5', poorBab: '+3' },
  { level: 8, goodSave: '+6', poorSave: '+2', goodBab: '+8/+3', averageBab: '+6/+1', poorBab: '+4' },
  { level: 9, goodSave: '+6', poorSave: '+3', goodBab: '+9/+4', averageBab: '+6/+1', poorBab: '+4' },
  { level: 10, goodSave: '+7', poorSave: '+3', goodBab: '+10/+5', averageBab: '+7/+2', poorBab: '+5' },
  { level: 11, goodSave: '+7', poorSave: '+3', goodBab: '+11/+6/+1', averageBab: '+8/+3', poorBab: '+5' },
  { level: 12, goodSave: '+8', poorSave: '+4', goodBab: '+12/+7/+2', averageBab: '+9/+4', poorBab: '+6/+1' },
  { level: 13, goodSave: '+8', poorSave: '+4', goodBab: '+13/+8/+3', averageBab: '+9/+4', poorBab: '+6/+1' },
  { level: 14, goodSave: '+9', poorSave: '+4', goodBab: '+14/+9/+4', averageBab: '+10/+5', poorBab: '+7/+2' },
  { level: 15, goodSave: '+9', poorSave: '+5', goodBab: '+15/+10/+5', averageBab: '+11/+6/+1', poorBab: '+7/+2' },
  { level: 16, goodSave: '+10', poorSave: '+5', goodBab: '+16/+11/+6/+1', averageBab: '+12/+7/+2', poorBab: '+8/+3' },
  { level: 17, goodSave: '+10', poorSave: '+5', goodBab: '+17/+12/+7/+2', averageBab: '+12/+7/+2', poorBab: '+8/+3' },
  { level: 18, goodSave: '+11', poorSave: '+6', goodBab: '+18/+13/+8/+3', averageBab: '+13/+8/+3', poorBab: '+9/+4' },
  { level: 19, goodSave: '+11', poorSave: '+6', goodBab: '+19/+14/+9/+4', averageBab: '+14/+9/+4', poorBab: '+9/+4' },
  { level: 20, goodSave: '+12', poorSave: '+6', goodBab: '+20/+15/+10/+5', averageBab: '+15/+10/+5', poorBab: '+10/+5' },
];

const levelBenefitTable: LevelBenefitRow[] = [
  { level: 1, xp: '0', classSkillMax: '4', crossClassMax: '2', feats: 'Dote inicial', abilityIncrease: '-' },
  { level: 2, xp: '1,000', classSkillMax: '5', crossClassMax: '2.5', feats: '-', abilityIncrease: '-' },
  { level: 3, xp: '3,000', classSkillMax: '6', crossClassMax: '3', feats: '2a dote', abilityIncrease: '-' },
  { level: 4, xp: '6,000', classSkillMax: '7', crossClassMax: '3.5', feats: '-', abilityIncrease: '1a mejora' },
  { level: 5, xp: '10,000', classSkillMax: '8', crossClassMax: '4', feats: '-', abilityIncrease: '-' },
  { level: 6, xp: '15,000', classSkillMax: '9', crossClassMax: '4.5', feats: '3a dote', abilityIncrease: '-' },
  { level: 7, xp: '21,000', classSkillMax: '10', crossClassMax: '5', feats: '-', abilityIncrease: '-' },
  { level: 8, xp: '28,000', classSkillMax: '11', crossClassMax: '5.5', feats: '-', abilityIncrease: '2a mejora' },
  { level: 9, xp: '36,000', classSkillMax: '12', crossClassMax: '6', feats: '4a dote', abilityIncrease: '-' },
  { level: 10, xp: '45,000', classSkillMax: '13', crossClassMax: '6.5', feats: '-', abilityIncrease: '-' },
  { level: 11, xp: '55,000', classSkillMax: '14', crossClassMax: '7', feats: '-', abilityIncrease: '-' },
  { level: 12, xp: '66,000', classSkillMax: '15', crossClassMax: '7.5', feats: '5a dote', abilityIncrease: '3a mejora' },
  { level: 13, xp: '78,000', classSkillMax: '16', crossClassMax: '8', feats: '-', abilityIncrease: '-' },
  { level: 14, xp: '91,000', classSkillMax: '17', crossClassMax: '8.5', feats: '-', abilityIncrease: '-' },
  { level: 15, xp: '105,000', classSkillMax: '18', crossClassMax: '9', feats: '6a dote', abilityIncrease: '-' },
  { level: 16, xp: '120,000', classSkillMax: '19', crossClassMax: '9.5', feats: '-', abilityIncrease: '4a mejora' },
  { level: 17, xp: '136,000', classSkillMax: '20', crossClassMax: '10', feats: '-', abilityIncrease: '-' },
  { level: 18, xp: '153,000', classSkillMax: '21', crossClassMax: '10.5', feats: '7a dote', abilityIncrease: '-' },
  { level: 19, xp: '171,000', classSkillMax: '22', crossClassMax: '11', feats: '-', abilityIncrease: '-' },
  { level: 20, xp: '190,000', classSkillMax: '23', crossClassMax: '11.5', feats: '-', abilityIncrease: '5a mejora' },
];

const wealthTable: WealthRow[] = [
  { level: 1, pc: '300 po', npc: '900 po' },
  { level: 2, pc: '900 po', npc: '2,000 po' },
  { level: 3, pc: '2,700 po', npc: '2,500 po' },
  { level: 4, pc: '5,400 po', npc: '3,300 po' },
  { level: 5, pc: '9,000 po', npc: '4,300 po' },
  { level: 6, pc: '13,000 po', npc: '5,600 po' },
  { level: 7, pc: '19,000 po', npc: '7,200 po' },
  { level: 8, pc: '27,000 po', npc: '9,400 po' },
  { level: 9, pc: '36,000 po', npc: '12,000 po' },
  { level: 10, pc: '49,000 po', npc: '16,000 po' },
  { level: 11, pc: '66,000 po', npc: '21,000 po' },
  { level: 12, pc: '88,000 po', npc: '27,000 po' },
  { level: 13, pc: '110,000 po', npc: '35,000 po' },
  { level: 14, pc: '150,000 po', npc: '45,000 po' },
  { level: 15, pc: '200,000 po', npc: '59,000 po' },
  { level: 16, pc: '260,000 po', npc: '77,000 po' },
  { level: 17, pc: '340,000 po', npc: '100,000 po' },
  { level: 18, pc: '440,000 po', npc: '130,000 po' },
  { level: 19, pc: '580,000 po', npc: '170,000 po' },
  { level: 20, pc: '760,000 po', npc: '220,000 po' },
  { level: 21, pc: '975,000 po', npc: '240,000 po' },
  { level: 22, pc: '1,200,000 po', npc: '265,000 po' },
  { level: 23, pc: '1,500,000 po', npc: '290,000 po' },
  { level: 24, pc: '1,800,000 po', npc: '320,000 po' },
  { level: 25, pc: '2,100,000 po', npc: '350,000 po' },
  { level: 26, pc: '2,500,000 po', npc: '390,000 po' },
  { level: 27, pc: '2,900,000 po', npc: '430,000 po' },
  { level: 28, pc: '3,300,000 po', npc: '470,000 po' },
  { level: 29, pc: '3,800,000 po', npc: '520,000 po' },
  { level: 30, pc: '4,300,000 po', npc: '570,000 po' },
  { level: 31, pc: '4,900,000 po', npc: '630,000 po' },
  { level: 32, pc: '5,600,000 po', npc: '690,000 po' },
  { level: 33, pc: '6,300,000 po', npc: '760,000 po' },
  { level: 34, pc: '7,000,000 po', npc: '840,000 po' },
  { level: 35, pc: '7,900,000 po', npc: '920,000 po' },
  { level: 36, pc: '8,800,000 po', npc: '1,010,000 po' },
  { level: 37, pc: '9,900,000 po', npc: '1,110,000 po' },
  { level: 38, pc: '11,000,000 po', npc: '1,220,000 po' },
  { level: 39, pc: '12,300,000 po', npc: '1,340,000 po' },
  { level: 40, pc: '13,600,000 po', npc: '1,470,000 po' },
];

const levelUpSteps = [
  { title: 'Elegir clase', description: 'Súbete un nivel en tu clase actual o desbloquea una nueva clase a nivel 1 (siguiendo las reglas de multiclase).' },
  { title: 'Ataque base', description: 'Actualiza el ataque base según la tabla de progresión de tu clase.' },
  { title: 'Salvaciones', description: 'Aumenta los bonos base de Fortaleza, Reflejos y Voluntad que mejoren en ese nivel.' },
  { title: 'Aumento de característica', description: 'En niveles 4, 8, 12, 16 y 20 suma +1 a una puntuación; si sube Constitución, ajusta PG previos.' },
  { title: 'Puntos de golpe', description: 'Tira tu dado de golpe, añade modificador de Constitución y suma al total (mínimo 1 PG por nivel).' },
  { title: 'Puntos de habilidad', description: 'Recibe y gasta puntos de habilidad según tu clase e Inteligencia actual. Clase: coste 1:1. Cruzada: coste 2:1.' },
  { title: 'Dotes', description: 'Ganas una dote adicional en los niveles 3, 6, 9, 12, 15 y 18 (además de bonificaciones por clase o por ser humano).' },
  { title: 'Conjuros', description: 'Las clases lanzadoras amplían conjuros por día y conjuros conocidos según su tabla.' },
  { title: 'Rasgos de clase', description: 'Aplica las facultades nuevas o mejoradas que otorgue tu clase en ese nivel.' },
];

export default async function ClassesPage() {
  const supabase = await createClient();
  const { data: classesData, error } = await supabase.from('classes').select('*');

  if (error || !classesData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Clases</h1>
        <p className="text-red-600">Error al cargar las clases</p>
      </div>
    );
  }

  const dbClasses: DnDClass[] = classesData.map((c: any) => {
    const getBABProgression = (): 'good' | 'medium' | 'poor' => {
      if (c.bab === 'bueno') return 'good';
      if (c.bab === 'pobre') return 'poor';
      return 'medium';
    };

    const babProgression = getBABProgression();
    const hasMagic = c.spellcasting === 'si';
    const powerSource = c.spellcasting === 'si' ? 'magico' : 'marcial'; // Simplified inference
    const sourceBook = "Manual del Jugador"; // Default for core classes
    const sourcePage = 0;

    const primaryAbility =
      (babProgression === 'good'
        ? ['Fuerza', 'Destreza']
        : babProgression === 'poor'
          ? ['Inteligencia', 'Sabiduría', 'Carisma']
          : ['Fuerza', 'Destreza', 'Inteligencia', 'Sabiduría', 'Carisma']) as any[];

    const goodSaves: any[] = [];
    if (c.fort === 'bueno') goodSaves.push('Fortaleza');
    if (c.ref === 'bueno') goodSaves.push('Reflejos');
    if (c.will === 'bueno') goodSaves.push('Voluntad');

    return {
      id: c.slug,
      name: c.titulo,
      slug: c.slug,
      hitDie: `d${c.dg}` as any,
      skillPointsPerLevel: c.skill_points_per_level_base,
      primaryAbility,
      goodSaves,
      description: c.subtitulo || '',
      shortDescription: c.subtitulo || '',
      classSkills: [], // Not in simple table
      weaponProficiencies: {},
      armorProficiencies: {},
      alignment: [],
      classFeatures: [],
      levelProgression: [],
      source: { book: sourceBook, page: sourcePage },
      classType: 'base',
      hasMagic,
      powerSource,
      babProgression,
    };
  });

  const existingSlugs = new Set(dbClasses.map((cls) => cls.slug));

  const placeholderClasses: DnDClass[] = supplementalClassSources
    .map((entry) => {
      const slug = slugifyClassName(entry.name);
      const category = CATEGORY_OVERRIDES[slug];
      const powerSource =
        category === 'Marciales' ? 'marcial' : category === 'Mágicas' ? 'arcano' : 'mixto';
      const hasMagic = category === 'Mágicas';

      const placeholder: DnDClass = {
        id: slug,
        name: entry.name,
        slug,
        hitDie: 'd8',
        skillPointsPerLevel: 0,
        primaryAbility: [],
        goodSaves: [],
        description: 'Contenido pendiente de carga.',
        shortDescription: 'Contenido pendiente de carga.',
        classSkills: [],
        weaponProficiencies: {},
        armorProficiencies: {},
        alignment: [],
        classFeatures: [],
        levelProgression: [],
        source: { book: entry.source, page: 0 },
        classType: 'base',
        hasMagic,
        powerSource,
        babProgression: 'medium',
      };

      return placeholder;
    })
    .filter((cls) => !existingSlugs.has(cls.slug));

  const allClasses: DnDClass[] = [...dbClasses, ...placeholderClasses];

  const categorizeClass = (classData: DnDClass): ClassCategory => {
    const slug = (classData.slug || '').toLowerCase();
    const override = CATEGORY_OVERRIDES[slug];
    if (override) return override;

    const powerSource = (classData.powerSource ?? '').toString().toLowerCase();
    const normalizedPower = powerSource.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const babProgression = classData.babProgression || 'medium';
    const hasMagic = classData.hasMagic ?? Boolean((classData as any).spellcasting);

    if (powerSource === 'marcial') return 'Marciales';
    if (['arcano', 'divino', 'magico', 'psionico', 'psiquico'].some((keyword) => normalizedPower.includes(keyword))) {
      return 'Mágicas';
    }
    if (['mixto', 'versatil', 'hibrido'].includes(normalizedPower)) {
      return 'Versátiles';
    }
    if (hasMagic) return 'Mágicas';
    if (babProgression === 'good') return 'Marciales';
    return 'Versátiles';
  };

  const classesByCategory = allClasses.reduce<Record<ClassCategory, DnDClass[]>>(
    (acc, cls) => {
      const category = categorizeClass(cls);
      acc[category].push(cls);
      return acc;
    },
    { Marciales: [], 'Mágicas': [], 'Versátiles': [] }
  );

  const categoryOrder: ClassCategory[] = ['Marciales', 'Mágicas', 'Versátiles'];

  const sortBySourceAndName = (a: DnDClass, b: DnDClass) => {
    const isPhb = (cls: DnDClass) => getSourceTag(cls.source?.book).code.toUpperCase() === 'PHB';
    const aPhb = isPhb(a);
    const bPhb = isPhb(b);
    if (aPhb && !bPhb) return -1;
    if (!aPhb && bPhb) return 1;
    return a.name.localeCompare(b.name, 'es');
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-7xl">
      <div className="border-l-4 border-gold-500 pl-6 mb-12 space-y-3">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-dungeon-100">Clases</h1>
        <p className="text-lg text-dungeon-300">Todas las clases base de D&D 3.5 y {totalStandardClasses} opciones adicionales de suplementos oficiales agrupadas por rol marcial, mágico y versátil.</p>
        <div className="flex flex-wrap gap-2 text-sm text-dungeon-200">
          <span className="bg-dungeon-700/60 border border-dungeon-600 rounded-full px-3 py-1">{allClasses.length} clases completas listadas</span>
          <span className="bg-dungeon-700/60 border border-dungeon-600 rounded-full px-3 py-1">{totalStandardClasses} clases estándar del Ultimate SRD integradas</span>
          <span className="bg-dungeon-700/60 border border-dungeon-600 rounded-full px-3 py-1">Tags de libro (PHB en verde) y tablas de progreso</span>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-12">
        <Card className="bg-dungeon-800 border-dungeon-700">
          <CardHeader>
            <CardTitle className="text-gold-400 text-lg">Cómo usar esta sección</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-dungeon-200 space-y-2">
            <p>Explora las clases base con las tarjetas de abajo y consulta las tablas de progreso para planificar subidas de nivel, XP y equipo.</p>
            <p>Todo el texto del SRD está en español y condensado para tener las reglas clave a mano.</p>
          </CardContent>
        </Card>
        <Card className="bg-dungeon-800 border-dungeon-700">
          <CardHeader>
            <CardTitle className="text-gold-400 text-lg">Definición de clases</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-dungeon-200 space-y-2">
            <p>Un personaje pertenece a una única clase a la vez, pero puede combinar varias como multiclase.</p>
            <p>La clase determina competencias, progresión de ataque, salvaciones, dotes y conjuros.</p>
          </CardContent>
        </Card>
        <Card className="bg-dungeon-800 border-dungeon-700">
          <CardHeader>
            <CardTitle className="text-gold-400 text-lg">Progresión rápida</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-dungeon-200 space-y-2">
            <p>Consulta valores de ataque base, salvaciones, máximos de habilidades, dotes y riqueza por nivel sin salir de la página.</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6 mb-16">
        {categoryOrder.map((category) => {
          const categoryClasses = [...classesByCategory[category]].sort(sortBySourceAndName);
          if (categoryClasses.length === 0) return null;

          const Icon = getClassCategoryIcon(category);
          const colorClasses = getClassCategoryColor(category);
          const iconColor = extractTextColor(colorClasses);

          return (
            <Card key={category} className="bg-dungeon-800 border-dungeon-700">
              <CardHeader>
                <CardTitle className={`flex items-center gap-2 ${iconColor}`}>
                  <Icon className="h-5 w-5" />
                  {category} ({categoryClasses.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categoryClasses.map((classData) => (
                    <ClassCard key={classData.id} classData={classData} />
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="bg-dungeon-800/40 border-dungeon-700 mb-12">
        <CardHeader>
          <CardTitle className="text-gold-400 text-lg">Clases estándar del Ultimate SRD ({totalStandardClasses})</CardTitle>
          <p className="text-sm text-dungeon-300">Expande una categoría para ver todas las clases agrupadas por libro u origen.</p>
        </CardHeader>
        <CardContent className="space-y-3">
          {standardClassCategories.map((group) => (
            <details
              key={group.title}
              className="bg-dungeon-900/50 border border-dungeon-700 rounded-lg px-4 py-3 transition-colors open:border-gold-500/50"
              open={group.defaultOpen}
            >
              <summary className="flex items-center justify-between cursor-pointer text-dungeon-100">
                <div className="flex flex-col">
                  <span className="font-semibold">{group.title}</span>
                  {group.source && <span className="text-xs text-dungeon-400">{group.source}</span>}
                </div>
                <span className="text-sm text-gold-400">{group.classes.length} clases</span>
              </summary>
              <div className="mt-3 flex flex-wrap gap-2">
                {group.classes.map((className) => (
                  <span
                    key={className}
                    className="px-3 py-1 rounded-full bg-dungeon-800/70 border border-dungeon-700 text-dungeon-100 text-sm"
                  >
                    {className}
                  </span>
                ))}
              </div>
            </details>
          ))}
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 mb-12">
        <Card className="bg-dungeon-800 border-dungeon-700">
          <CardHeader>
            <CardTitle className="text-gold-400 text-lg">Bonos base de salvación y ataque</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-dungeon-200 space-y-3">
            <p>El bono de salvación base depende de si la tirada es buena o pobre para tu clase. Monjes tienen las tres tiradas buenas, por ejemplo.</p>
            <p>El ataque base se usa en cada ataque. Buen ataque (guerrero, bárbaro, paladín, explorador) progresa a +20; medio (clérigo, druida, monje, pícaro) termina en +15; pobre (hechicero, mago) llega a +10.</p>
            <div className="overflow-x-auto">
              <table className="min-w-full text-xs md:text-sm text-left border border-dungeon-700">
                <thead className="bg-dungeon-900 text-dungeon-100">
                  <tr>
                    <th className="px-3 py-2 border-b border-dungeon-700">Nivel</th>
                    <th className="px-3 py-2 border-b border-dungeon-700">Salvación buena</th>
                    <th className="px-3 py-2 border-b border-dungeon-700">Salvación pobre</th>
                    <th className="px-3 py-2 border-b border-dungeon-700">Ataque bueno</th>
                    <th className="px-3 py-2 border-b border-dungeon-700">Ataque medio</th>
                    <th className="px-3 py-2 border-b border-dungeon-700">Ataque pobre</th>
                  </tr>
                </thead>
                <tbody>
                  {baseSaveAttackTable.map((row) => (
                    <tr key={row.level} className="odd:bg-dungeon-900/40">
                      <td className="px-3 py-2 border-b border-dungeon-800 text-dungeon-100">{row.level}</td>
                      <td className="px-3 py-2 border-b border-dungeon-800">{row.goodSave}</td>
                      <td className="px-3 py-2 border-b border-dungeon-800">{row.poorSave}</td>
                      <td className="px-3 py-2 border-b border-dungeon-800">{row.goodBab}</td>
                      <td className="px-3 py-2 border-b border-dungeon-800">{row.averageBab}</td>
                      <td className="px-3 py-2 border-b border-dungeon-800">{row.poorBab}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-dungeon-800 border-dungeon-700">
          <CardHeader>
            <CardTitle className="text-gold-400 text-lg">Beneficios dependientes del nivel</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-dungeon-200 space-y-3">
            <p>Máximos de rangos: habilidad de clase = nivel + 3. Habilidad cruzada = (nivel + 3) ÷ 2. Los valores de XP son acumulativos.</p>
            <div className="overflow-x-auto">
              <table className="min-w-full text-xs md:text-sm text-left border border-dungeon-700">
                <thead className="bg-dungeon-900 text-dungeon-100">
                  <tr>
                    <th className="px-3 py-2 border-b border-dungeon-700">Nivel</th>
                    <th className="px-3 py-2 border-b border-dungeon-700">XP total</th>
                    <th className="px-3 py-2 border-b border-dungeon-700">Rangos máx. (clase)</th>
                    <th className="px-3 py-2 border-b border-dungeon-700">Rangos máx. (cruzada)</th>
                    <th className="px-3 py-2 border-b border-dungeon-700">Dotes</th>
                    <th className="px-3 py-2 border-b border-dungeon-700">Mejora de característica</th>
                  </tr>
                </thead>
                <tbody>
                  {levelBenefitTable.map((row) => (
                    <tr key={row.level} className="odd:bg-dungeon-900/40">
                      <td className="px-3 py-2 border-b border-dungeon-800 text-dungeon-100">{row.level}º</td>
                      <td className="px-3 py-2 border-b border-dungeon-800">{row.xp}</td>
                      <td className="px-3 py-2 border-b border-dungeon-800">{row.classSkillMax}</td>
                      <td className="px-3 py-2 border-b border-dungeon-800">{row.crossClassMax}</td>
                      <td className="px-3 py-2 border-b border-dungeon-800">{row.feats}</td>
                      <td className="px-3 py-2 border-b border-dungeon-800">{row.abilityIncrease}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-dungeon-800 border-dungeon-700 mb-12">
        <CardHeader>
          <CardTitle className="text-gold-400 text-lg">Experiencia, entrenamiento y subida de nivel</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2 text-sm text-dungeon-200">
          <div className="space-y-3">
            <p>La XP mide lo que tu personaje aprende tras cada aventura. Al alcanzar el mínimo de la tabla anterior subes de nivel inmediatamente: aplica beneficios y continúa con la XP sobrante.</p>
            <p>Si el DJ otorga tanta XP que saltarías más de un nivel, solo subes uno y quedas a 1 XP del siguiente; el resto se pierde.</p>
            <p>El entrenamiento entre aventuras consolida habilidades. Si un personaje no puede practicar durante largo tiempo, el DJ puede reducir o negar XP.</p>
          </div>
          <div className="bg-dungeon-900/50 border border-dungeon-700 rounded-lg p-4 space-y-3">
            <h3 className="text-dungeon-100 font-semibold">Pasos al subir de nivel</h3>
            <ol className="list-decimal list-inside space-y-2 text-dungeon-200">
              {levelUpSteps.map((step) => (
                <li key={step.title}>
                  <span className="font-semibold text-dungeon-100">{step.title}:</span> {step.description}
                </li>
              ))}
            </ol>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-dungeon-800 border-dungeon-700 mb-12">
        <CardHeader>
          <CardTitle className="text-gold-400 text-lg">Personajes multiclase</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-dungeon-200 space-y-3">
          <p>Las habilidades de varias clases se suman: el ataque base se agrega, las salvaciones base también, los puntos de golpe se tiran por clase adquirida y los rasgos conviven (incluyendo restricciones). Los PNJ multiclase usan las mismas reglas.</p>
          <p>Las habilidades que sean de clase para cualquiera de tus clases usan el máximo de clase. Si ninguna clase la tiene, usa el máximo cruzado. Los conjuros se llevan por lista: lleva un registro separado de cada clase lanzadora.</p>
          <p>Rasgos especiales combinados: clérigo + paladín apilan para expulsar muertos vivientes (paladín a partir de nivel 4 cuenta como nivel de clérigo -3). Bárbaro + pícaro apilan para esquiva asombrosa; si la ganas dos veces, obtienes la versión mejorada. Hechicero y mago apilan niveles para las estadísticas del familiar.</p>
          <p>Favor de raza y penalizaciones de XP: si la diferencia entre tu clase más alta y otra clase es de 2 o más niveles, esa clase retrasada sufre -20% XP. La clase favorecida de tu raza no cuenta para ese cálculo (humano y semielfo tratan su clase más alta como favorecida).</p>
        </CardContent>
      </Card>

      <Card className="bg-dungeon-800 border-dungeon-700 mb-12">
        <CardHeader>
          <CardTitle className="text-gold-400 text-lg">Añadir una segunda clase</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2 text-sm text-dungeon-200">
          <div className="space-y-3">
            <p>Cuando subes nivel puedes escoger empezar una clase distinta a nivel 1. Obtienes ataques base, salvaciones, competencias, rasgos y puntos de habilidad de esa clase, pero no recibes los beneficios exclusivos del nivel 1 inicial (PG máximos del primer dado, x4 puntos de habilidad, equipo inicial, oro inicial).</p>
            <p>El DJ puede exigir declarar con antelación qué clase estás practicando, o requerir un tutor o ritual específico antes de permitirte multiclasear.</p>
          </div>
          <div className="space-y-3">
            <p>Avance posterior: un personaje multiclase que gana otro nivel puede subir cualquier clase que ya tenga o añadir una nueva (si cumple requisitos). Aplica siempre los beneficios estándar de la clase y nivel elegido.</p>
            <p>Reglas épicas para niveles superiores a 20 aparecen en la sección de Niveles Épicos.</p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-dungeon-800 border-dungeon-700 mb-12">
        <CardHeader>
          <CardTitle className="text-gold-400 text-lg">Clases variantes, rasgos alternativos y niveles de sustitución</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-dungeon-200 space-y-3">
          <p><span className="text-dungeon-100 font-semibold">Clases variantes:</span> pueden cambiar alineamiento permitido, dado de golpe, ataque base, salvaciones, habilidades de clase o rasgos. Para variantes de una misma clase (por ejemplo, bárbaro tótem) suele prohibirse multiclasear entre variantes; si se permite, los rasgos idénticos se apilan salvo la magia.</p>
          <p><span className="text-dungeon-100 font-semibold">Rasgos de clase alternativos:</span> sustituyen un rasgo por otro en el nivel especificado. Indican requisitos, nivel, qué rasgo reemplazan y el beneficio obtenido. Puedes reentrenar al subir de nivel usando las reglas de Player's Handbook II.</p>
          <p><span className="text-dungeon-100 font-semibold">Niveles de sustitución:</span> reemplazan los beneficios de un nivel concreto de tu clase por otros distintos, manteniendo la misma clase. Suelen requerir raza o habilidades. No puedes recuperar los beneficios reemplazados salvo que el DJ permita un rito o decisión narrativa, normalmente pagando oro y tiempo.</p>
          <p><span className="text-dungeon-100 font-semibold">Reentrenar rasgos:</span> al subir de nivel puedes intercambiar un rasgo legal del nivel previo por otro elegible del mismo nivel, siempre que no invalide elecciones posteriores.</p>
        </CardContent>
      </Card>

      <Card className="bg-dungeon-800 border-dungeon-700 mb-12">
        <CardHeader>
          <CardTitle className="text-gold-400 text-lg">Crear PJ por encima de nivel 1</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-dungeon-200 space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <p>1) Asigna una cantidad de XP total acorde al nivel deseado.</p>
              <p>2) Elige raza y clases, definiendo el orden de niveles (importa para puntos de habilidad iniciales y conjuros).</p>
              <p>3) Calcula ataque base, salvaciones, PG, conjuros, rasgos y mejora de característica cada 4 niveles (Int solo añade habilidades a partir de ese nivel).</p>
              <p>4) Compra habilidades nivel a nivel para respetar máximos y posibles cambios de Inteligencia.</p>
              <p>5) Equipo: usa la tabla de riqueza y selecciona objetos (el DJ puede limitar el coste máximo a 1/4 de la riqueza).</p>
              <p>6) Ajusta detalles: montura de paladín, compañero animal, familiar, afiliaciones, etc.</p>
            </div>
            <div className="bg-dungeon-900/50 border border-dungeon-700 rounded-lg p-4">
              <h3 className="text-dungeon-100 font-semibold mb-2">Objetos mágicos y creación</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>El DJ puede vetar objetos o fijar un coste máximo por objeto para evitar desequilibrios.</li>
                <li>Objetos de un solo uso cuestan x5 en mazmorras de una sola sesión; objetos con cargas tienen 1/5 de cargas.</li>
                <li>Puedes seleccionar varitas parcialmente usadas pagando proporcional al número de cargas restantes.</li>
                <li>Un lanzador puede gastar parte de su XP y oro iniciales para crear objetos si tiene las dotes necesarias.</li>
              </ul>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-xs md:text-sm text-left border border-dungeon-700">
              <thead className="bg-dungeon-900 text-dungeon-100">
                <tr>
                  <th className="px-3 py-2 border-b border-dungeon-700">Nivel</th>
                  <th className="px-3 py-2 border-b border-dungeon-700">Riqueza PJ</th>
                  <th className="px-3 py-2 border-b border-dungeon-700">Riqueza PNJ</th>
                </tr>
              </thead>
              <tbody>
                {wealthTable.map((row) => (
                  <tr key={row.level} className="odd:bg-dungeon-900/40">
                    <td className="px-3 py-2 border-b border-dungeon-800 text-dungeon-100">{row.level}º</td>
                    <td className="px-3 py-2 border-b border-dungeon-800">{row.pc}</td>
                    <td className="px-3 py-2 border-b border-dungeon-800">{row.npc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

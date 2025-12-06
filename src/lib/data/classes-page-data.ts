/**
 * Classes Page Data
 * Extracted constants and data tables for /clases page
 * This file contains all hardcoded data to reduce page.tsx file size
 */

import { ClassCategory } from '@/lib/utils/icons';

export const CATEGORY_OVERRIDES: Record<string, ClassCategory> = {
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

export type BaseSaveAttackRow = {
  level: number;
  goodSave: string;
  poorSave: string;
  goodBab: string;
  averageBab: string;
  poorBab: string;
};

export type LevelBenefitRow = {
  level: number;
  xp: string;
  classSkillMax: string;
  crossClassMax: string;
  feats: string;
  abilityIncrease: string;
};

export type WealthRow = {
  level: number;
  pc: string;
  npc: string;
};

export type StandardClassCategory = {
  title: string;
  source?: string;
  defaultOpen?: boolean;
  classes: string[];
};

export const standardClassCategories: StandardClassCategory[] = [
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

export const totalStandardClasses = standardClassCategories.reduce((sum, group) => sum + group.classes.length, 0);

export const supplementalClassSources: Array<{ name: string; source: string }> = [
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

export const baseSaveAttackTable: BaseSaveAttackRow[] = [
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

export const levelBenefitTable: LevelBenefitRow[] = [
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

export const wealthTable: WealthRow[] = [
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

export const levelUpSteps = [
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

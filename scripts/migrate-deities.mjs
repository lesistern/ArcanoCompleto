#!/usr/bin/env node

/**
 * Script de Migración de Deidades D&D 3.5
 * Mapea datos de deities-initial.ts a la tabla deities en Supabase
 *
 * Uso: node scripts/migrate-deities.mjs [option]
 * Opciones:
 *   --sql    Generar archivo SQL para insertar manualmente
 *   --live   Insertar directamente en Supabase (requiere SUPABASE_SERVICE_ROLE_KEY)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

// Mapeo de dominios D&D 3.5 en inglés a slugs estandarizados
const DOMAIN_MAPPING = {
  'Abomination': 'abomination',
  'Air': 'air',
  'Animal': 'animal',
  'Artifice': 'artifice',
  'Astral': 'astral',
  'Cavern': 'cavern',
  'Chaos': 'chaos',
  'Charm': 'charm',
  'Cold': 'cold',
  'Community': 'community',
  'Corruption': 'corruption',
  'Creation': 'creation',
  'Darkness': 'darkness',
  'Death': 'death',
  'Deathbound': 'deathbound',
  'Demonic': 'demonic',
  'Desolation': 'desolation',
  'Destruction': 'destruction',
  'Diabolic': 'diabolic',
  'Disease': 'disease',
  'Domination': 'domination',
  'Dragon': 'dragon',
  'Dream': 'dream',
  'Dwarven': 'dwarven',
  'Earth': 'earth',
  'Elven': 'elven',
  'Endurance': 'endurance',
  'Envy': 'envy',
  'Evil': 'evil',
  'Fate': 'fate',
  'Fire': 'fire',
  'Forgery': 'forgery',
  'Fury': 'fury',
  'Gnome': 'gnome',
  'Good': 'good',
  'Greed': 'greed',
  'Hatred': 'hatred',
  'Healing': 'healing',
  'Hunger': 'hunger',
  'Illusion': 'illusion',
  'Knowledge': 'knowledge',
  'Law': 'law',
  'Lie': 'lie',
  'Limitation': 'limitation',
  'Luck': 'luck',
  'Lust': 'lust',
  'Madness': 'madness',
  'Magic': 'magic',
  'Malice': 'malice',
  'Mentalism': 'mentalism',
  'Metal': 'metal',
  'Mischief': 'mischief',
  'Misfortune': 'misfortune',
  'Mockery': 'mockery',
  'Moon': 'moon',
  'Necromancy': 'necromancy',
  'Nightmare': 'nightmare',
  'Nobility': 'nobility',
  'Oath': 'oath',
  'Obedience': 'obedience',
  'Obsession': 'obsession',
  'Ocean': 'ocean',
  'Pride': 'pride',
  'Protection': 'protection',
  'Punishment': 'punishment',
  'Rage': 'rage',
  'Ruin': 'ruin',
  'Runecraft': 'runecraft',
  'Scalykind': 'scalykind',
  'Scheming': 'scheming',
  'Seduction': 'seduction',
  'Self': 'self',
  'Sorrow': 'sorrow',
  'Spider': 'spider',
  'Spite': 'spite',
  'Strength': 'strength',
  'Strife': 'strife',
  'Suffering': 'suffering',
  'Sun': 'sun',
  'Superiority': 'superiority',
  'Temperance': 'temperance',
  'Tempest': 'tempest',
  'Terror': 'terror',
  'Trade': 'trade',
  'Travel': 'travel',
  'Treachery': 'treachery',
  'Trial': 'trial',
  'Trick': 'trick',
  'Trickery': 'trickery',
  'Tyranny': 'tyranny',
  'Undeath': 'undeath',
  'Underdark': 'underdark',
  'Vanity': 'vanity',
  'Vengeance': 'vengeance',
  'Vermin': 'vermin',
  'Vice': 'vice',
  'Victories': 'victories',
  'War': 'war',
  'Warding': 'warding',
  'Water': 'water',
  'Wealth': 'wealth',
  'Weather': 'weather',
  'Wilderness': 'wilderness',
  'Wrath': 'wrath',
};

// Datos de deidades (importados de deities-initial.ts)
const DEITIES = [
  { slug: "afflux", name_es: "Afflux", portfolio_es: "Investigación, nigromancia, muerte", alignment: "NE", domains: ["Knowledge", "Evil", "Deathbound", "Undeath"], favored_weapon: "Short sword", symbol_es: "Gota escarlata", worshipers_es: "Nigromantes, magos malvados, inquisidores, torturadores", home_plane_es: "Carceri", description_es: "El insaciable Afflux busca conocimiento de la sangre, el cuerpo y la mente. Es el señor del interrogatorio, la tortura y la ejecución.", rank: "lesser" },
  { slug: "aasterinian", name_es: "Aasterinian", portfolio_es: "Aprendizaje, invención, placer", alignment: "CN", domains: ["Chaos", "Charm", "Dragon", "Illusion", "Luck", "Trade", "Travel", "Trickery"], favored_weapon: "Scimitar or Claw", symbol_es: "Cabeza de dragón sonriente", worshipers_es: "Dragones caóticos, pensadores libres", home_plane_es: "Tierras Exteriores", description_es: "Aasterinian es una deidad descarada que disfruta aprendiendo a través del juego, la invención y el placer.", rank: "demigod" },
  { slug: "astilabor", name_es: "Astilabor", portfolio_es: "Adquisición, estatus, riqueza", alignment: "TN", domains: ["Cavern", "Dragon", "Metal", "Protection", "Wealth"], favored_weapon: "Scimitar or Claw", symbol_es: "Una gema de doce facetas", worshipers_es: "Dragones, aquellos que buscan riqueza", home_plane_es: "Tierras Exteriores", description_es: "Astilabor representa el deseo dracónico natural de adquirir tesoro y poder.", rank: "lesser" },
  { slug: "bahamut", name_es: "Bahamut", portfolio_es: "Dragones buenos, viento", alignment: "LG", domains: ["Air", "Cold", "Good", "Luck", "Nobility", "Protection", "Storm"], favored_weapon: "Claw", symbol_es: "Estrella sobre una nebulosa lechosa", worshipers_es: "Dragones buenos, cualquiera que busque protección", home_plane_es: "Celestia", description_es: "Bahamut es venerado en muchos lugares. Los dragones de oro, plata y latón lo tienen en especial consideración.", rank: "lesser" },
  { slug: "boccob", name_es: "Boccob", portfolio_es: "Magia, conocimiento arcano, equilibrio", alignment: "TN", domains: ["Knowledge", "Magic", "Mind", "Oracle", "Planning", "Trickery"], favored_weapon: "Quarterstaff", symbol_es: "Ojo equilibrado en un pedestal dentro de un pentágono", worshipers_es: "Magos, hechiceros, ilusionistas, filósofos, sabios", home_plane_es: "Las Tierras Exteriores", description_es: "La deidad de la magia, Boccob, aparece como un hombre apuesto de edad indeterminada.", rank: "greater" },
  { slug: "chronepsis", name_es: "Chronepsis", portfolio_es: "Destino, muerte, juicio", alignment: "TN", domains: ["Death", "Dragon", "Fate", "Knowledge", "Planning", "Time"], favored_weapon: "Scythe (claw)", symbol_es: "Un ojo dracónico que no parpadea", worshipers_es: "Dragones, aquellos que observarían", home_plane_es: "Tierras Exteriores", description_es: "Chronepsis es neutral—silencioso, despreocupado e imparcial.", rank: "lesser" },
  { slug: "corellon-larethian", name_es: "Corellon Larethian", portfolio_es: "Elfos, magia, música, artes y guerra", alignment: "CG", domains: ["Chaos", "Community", "Good", "Protection", "War"], favored_weapon: "Longsword", symbol_es: "Luna creciente de plata", worshipers_es: "Elfos, semielfos, bardos", home_plane_es: "Arborea", description_es: "La deidad de los elfos, Corellon Larethian, generalmente aparece como un elfo andrógino.", rank: "greater" },
  { slug: "doresain", name_es: "Doresain", portfolio_es: "Nigromancia, gules", alignment: "CE", domains: ["Chaos", "Evil", "Hunger"], favored_weapon: "Scimitar", symbol_es: "Cráneo de ghul", worshipers_es: "Gules", home_plane_es: "Abismo", description_es: "El insaciablemente hambriento Doresain apela a todas las criaturas cuya hambre nunca puede ser saciada.", rank: "demigod" },
  { slug: "ehlonna", name_es: "Ehlonna", portfolio_es: "Bosques, tierras boscosas, flora, fauna y fertilidad", alignment: "NG", domains: ["Animal", "Celerity", "Good", "Plant", "Sun"], favored_weapon: "Longbow", symbol_es: "Unicornio encabritado", worshipers_es: "Elfos, gnomos, semielfos, medianos, exploradores, druidas", home_plane_es: "Tierras de Bestias", description_es: "Ehlonna a veces aparece como una humana de cabello negro.", rank: "intermediate" },
  { slug: "erythnul", name_es: "Erythnul", portfolio_es: "Odio, envidia, malicia, pánico, fealdad y masacre", alignment: "CE", domains: ["Chaos", "Evil", "Madness", "Trickery", "War"], favored_weapon: "Morningstar", symbol_es: "Una máscara medio demonio, medio jabalí", worshipers_es: "Bárbaros, guerreros, pícaros, saqueadores", home_plane_es: "Pandemonium", description_es: "La deidad de la matanza, Erythnul, es un espectáculo terrible de contemplar.", rank: "intermediate" },
  { slug: "evening-glory", name_es: "Gloria Nocturna", portfolio_es: "Amor, belleza, inmortalidad a través de la no-muerte", alignment: "TN", domains: ["Charm", "Magic", "Protection"], favored_weapon: "Dagger", symbol_es: "Una mano, atravesada por una palma con un agujero en forma de corazón", worshipers_es: "Buscadores de inmortalidad, amantes, no-muertos", home_plane_es: "Desconocido", description_es: "Gloria Nocturna enseña que el amor no tiene que morir nunca.", rank: "lesser" },
  { slug: "falazure", name_es: "Falazure", portfolio_es: "Decadencia, no-muerte, agotamiento", alignment: "NE", domains: ["Darkness", "Death", "Dragon", "Evil", "Undeath"], favored_weapon: "Scimitar or Claw", symbol_es: "Cráneo dracónico", worshipers_es: "Dragones malvados, nigromantes, no-muertos", home_plane_es: "Hades", description_es: "El aterrador Dragón Nocturno, Falazure, es neutral malvado.", rank: "lesser" },
  { slug: "fharlanghn", name_es: "Fharlanghn", portfolio_es: "Horizontes, distancia, viaje y caminos", alignment: "TN", domains: ["Celerity", "Luck", "Protection", "Travel", "Weather"], favored_weapon: "Quarterstaff", symbol_es: "Disco con una línea curva y una luna creciente", worshipers_es: "Bardos, viajeros, comerciantes", home_plane_es: "Plano Material", description_es: "Fharlanghn, la deidad de los caminos, aparece como un hombre anciano y curtido.", rank: "intermediate" },
  { slug: "garl-glittergold", name_es: "Garl Glittergold", portfolio_es: "Gnomos, humor y corte de gemas", alignment: "NG", domains: ["Community", "Creation", "Good", "Protection", "Trickery"], favored_weapon: "Battleaxe", symbol_es: "Una pepita de oro", worshipers_es: "Gnomos, ilusionistas, joyeros, bromistas prácticos", home_plane_es: "Bytopia", description_es: "La deidad de los gnomos, Garl Glittergold, aparece como un gnomo apuesto.", rank: "greater" },
  { slug: "garyx", name_es: "Garyx", portfolio_es: "Fuego, destrucción, renovación", alignment: "CE", domains: ["Chaos", "Destruction", "Dragon", "Evil", "Fire", "Renewal"], favored_weapon: "Sickle or Claw", symbol_es: "Ojo reptiliano superpuesto sobre una llama", worshipers_es: "Dragones, hechiceros, señores de la guerra", home_plane_es: "Pandemonium", description_es: "Garyx el Destructor de Todo simboliza el poder puro.", rank: "lesser" },
  { slug: "gruumsh", name_es: "Gruumsh", portfolio_es: "Orcos, guerra y territorio", alignment: "CE", domains: ["Chaos", "Evil", "Domination", "Strength", "War"], favored_weapon: "Spear", symbol_es: "Cuenca ocular vacía", worshipers_es: "Orcos, semiorcos", home_plane_es: "Acheron", description_es: "Gruumsh, deidad de los orcos, es caótico malvado.", rank: "greater" },
  { slug: "heironeous", name_es: "Heironeous", portfolio_es: "Caballerosidad, justicia, honor, guerra y valor", alignment: "LG", domains: ["Courage", "Destiny", "Glory", "Good", "Inquisition", "Law", "Nobility", "War"], favored_weapon: "Longsword", symbol_es: "Puño sosteniendo un rayo", worshipers_es: "Paladines, guerreros, monjes, jueces", home_plane_es: "Celestia", description_es: "La deidad del valor, Heironeous, aparece como un hombre humano alto.", rank: "intermediate" },
  { slug: "hextor", name_es: "Hextor", portfolio_es: "Guerra, discordia, masacres, conflicto, aptitud y tiranía", alignment: "LE", domains: ["Destruction", "Domination", "Evil", "Law", "Tyranny", "War"], favored_weapon: "Flail", symbol_es: "Puño sosteniendo seis flechas rojas", worshipers_es: "Guerreros, monjes, conquistadores, tiranos", home_plane_es: "Acheron", description_es: "La deidad de la tiranía, Hextor, toma muchas formas.", rank: "intermediate" },
  { slug: "hlal", name_es: "Hlal", portfolio_es: "Humor, narración de historias, inspiración", alignment: "CG", domains: ["Chaos", "Dragon", "Good", "Rune", "Trickery"], favored_weapon: "Shortsword or Claw", symbol_es: "Un libro abierto", worshipers_es: "Dragones, bardos, intérpretes", home_plane_es: "Arborea", description_es: "Hlal es un dragón liso de color cobre con una sonrisa lista.", rank: "lesser" },
  { slug: "ilsensine", name_es: "Ilsensine", portfolio_es: "Dominación mental, magia", alignment: "LE", domains: ["Evil", "Law", "Knowledge", "Magic", "Mind"], favored_weapon: "Tentacle or Unarmed Strike", symbol_es: "Cerebro con dos tentáculos que sobresalen", worshipers_es: "Illithids", home_plane_es: "Tierras Exteriores", description_es: "Ilsensine es el dios de los devoraentes.", rank: "greater" },
  { slug: "io", name_es: "Io", portfolio_es: "Linaje de dragones", alignment: "TN", domains: ["Dragon", "Knowledge", "Magic", "Spell", "Strength", "Travel", "Wealth"], favored_weapon: "Scimitar or Claw", symbol_es: "Un disco metálico multicolor", worshipers_es: "Dragones", home_plane_es: "Tierras Exteriores", description_es: "Io el Dragón Noveno es neutral.", rank: "intermediate" },
  { slug: "kord", name_es: "Kord", portfolio_es: "Atletismo, deportes, riña, fuerza y coraje", alignment: "CG", domains: ["Chaos", "Competition", "Good", "Luck", "Strength"], favored_weapon: "Greatsword", symbol_es: "Una estrella de lanzas y mazas", worshipers_es: "Bárbaros, guerreros, pícaros, atletas", home_plane_es: "Ysgard", description_es: "Kord, deidad de la fuerza, aparece como un hombre enormemente musculoso.", rank: "intermediate" },
  { slug: "kurtulmak", name_es: "Kurtulmak", portfolio_es: "Kobolds, fabricación de trampas, minería, guerra", alignment: "LE", domains: ["Evil", "Law", "Luck", "Trickery"], favored_weapon: "Spear", symbol_es: "Cráneo de gnomo", worshipers_es: "Kobolds", home_plane_es: "Baator", description_es: "Kurtulmak, la deidad de los kobolds, aparece como un kobold particularmente grande.", rank: "intermediate" },
  { slug: "lendys", name_es: "Lendys", portfolio_es: "Equilibrio, justicia", alignment: "LN", domains: ["Destruction", "Dragon", "Law", "Protection", "Retribution"], favored_weapon: "Sword (balanced on a needle's point)", symbol_es: "Espada equilibrada en la punta de una aguja", worshipers_es: "Dragones", home_plane_es: "Mechanus", description_es: "Lendys administra justicia durante la vida de un dragón.", rank: "lesser" },
  { slug: "lolth", name_es: "Lolth", portfolio_es: "Drow, arañas, mal, oscuridad", alignment: "CE", domains: ["Chaos", "Destruction", "Evil", "Trickery"], favored_weapon: "Whip", symbol_es: "Araña negra con la cabeza de una hembra drow", worshipers_es: "Drow", home_plane_es: "El Abismo", description_es: "Lolth aparece como una hembra drow alta y hermosa o como una araña negra.", rank: "intermediate" },
  { slug: "moradin", name_es: "Moradin", portfolio_es: "Enanos, creación, herrería, ingeniería, guerra", alignment: "LG", domains: ["Creation", "Earth", "Good", "Law", "Protection"], favored_weapon: "Warhammer", symbol_es: "Martillo y yunque", worshipers_es: "Enanos, herreros", home_plane_es: "Celestia", description_es: "La deidad de los enanos, Moradin, generalmente aparece como un enano macho severo.", rank: "greater" },
  { slug: "nerull", name_es: "Nerull", portfolio_es: "Muerte, oscuridad, asesinato y el inframundo", alignment: "NE", domains: ["Death", "Evil", "Fate", "Pestilence", "Trickery"], favored_weapon: "Scythe", symbol_es: "Cráneo y guadaña", worshipers_es: "Nigromantes, asesinos, pícaros", home_plane_es: "Carceri", description_es: "La deidad de la muerte, Nerull, es ampliamente conocida y temida.", rank: "greater" },
  { slug: "obad-hai", name_es: "Obad-Hai", portfolio_es: "Naturaleza, libertad, caza y bestias", alignment: "TN", domains: ["Air", "Animal", "Earth", "Fate", "Fire", "Plant", "Water", "Weather"], favored_weapon: "Quarterstaff", symbol_es: "Máscara de hojas de roble y bellotas", worshipers_es: "Bárbaros, exploradores, druidas, cazadores", home_plane_es: "Tierras Exteriores", description_es: "Obad-Hai, deidad de la naturaleza, es mostrado como un hombre delgado y curtido.", rank: "intermediate" },
  { slug: "olidammara", name_es: "Olidammara", portfolio_es: "Música, juergas, vino, pícaros, humor y trucos", alignment: "CN", domains: ["Celerity", "City", "Chaos", "Luck", "Mind", "Trickery"], favored_weapon: "Rapier", symbol_es: "Máscara riente", worshipers_es: "Pícaros, bardos, actores, vinagreros", home_plane_es: "Ysgard", description_es: "La deidad de los pícaros, Olidammara, aparece como un hombre de cabello castaño.", rank: "intermediate" },
  { slug: "orcus", name_es: "Orcus", portfolio_es: "No-muerte, venganza", alignment: "CE", domains: ["Chaos", "Evil", "Death", "Darkness"], favored_weapon: "Mace", symbol_es: "Bastón con cabeza de calavera", worshipers_es: "Demonios, nigromantes y los no-muertos", home_plane_es: "Abismo", description_es: "Orcus es un príncipe demonio masivo e hinchado.", rank: "demon_lord" },
  { slug: "pelor", name_es: "Pelor", portfolio_es: "Sol, luz, fuerza y sanación", alignment: "NG", domains: ["Glory", "Good", "Healing", "Nobility", "Strength", "Sun"], favored_weapon: "Mace", symbol_es: "Rostro del sol", worshipers_es: "Bardos, exploradores, druidas, sanadores, plebeyos", home_plane_es: "Elisio", description_es: "Pelor, deidad del sol, se representa como un hombre mayor en blanco.", rank: "greater" },
  { slug: "st-cuthbert", name_es: "San Cuthbert", portfolio_es: "Sentido común, sabiduría, celo, honestidad, verdad", alignment: "LN", domains: ["Destruction", "Domination", "Law", "Protection", "Strength"], favored_weapon: "Mace", symbol_es: "Ráfaga de estrellas incrustada de rubí", worshipers_es: "Guerreros, monjes, jueces, alguaciles", home_plane_es: "Arcadia", description_es: "La deidad de la retribución, San Cuthbert, toma muchas formas.", rank: "intermediate" },
  { slug: "tamara", name_es: "Tamara", portfolio_es: "Vida, luz, misericordia", alignment: "NG", domains: ["Dragon", "Family", "Good", "Healing", "Strength", "Sun"], favored_weapon: "Scimitar or Claw", symbol_es: "Estrella de siete puntas en un campo negro", worshipers_es: "Dragones buenos, sanadores, aquellos que desean misericordia", home_plane_es: "Elisio", description_es: "Tamara es la más amable y benévola de las deidades dracónicas.", rank: "lesser" },
  { slug: "tiamat", name_es: "Tiamat", portfolio_es: "Dragones malvados, conquista", alignment: "LE", domains: ["Destruction", "Dragon", "Evil", "Greed", "Hatred", "Law", "Skalykind", "Tyranny", "Trickery"], favored_weapon: "Heavy pick or Claw", symbol_es: "Dragón de cinco cabezas", worshipers_es: "Dragones malvados, conquistadores", home_plane_es: "Baator", description_es: "Tiamat, como su rival acérrimo, Bahamut, es venerada como deidad.", rank: "lesser" },
  { slug: "vecna", name_es: "Vecna", portfolio_es: "Secretos destructivos y malvados", alignment: "NE", domains: ["Destiny", "Evil", "Knowledge", "Madness", "Magic", "Planning", "Tyranny"], favored_weapon: "Dagger", symbol_es: "Mano izquierda agarrando un globo ocular", worshipers_es: "Magos, hechiceros, conspiradores", home_plane_es: "Plano Material", description_es: "Vecna, deidad de los secretos, fue una vez un rey mortal que se convirtió en lich.", rank: "lesser" },
  { slug: "wee-jas", name_es: "Wee Jas", portfolio_es: "Magia, muerte, vanidad y ley", alignment: "LN", domains: ["Death", "Domination", "Law", "Magic", "Mind", "Planning", "Tyranny"], favored_weapon: "Dagger", symbol_es: "Cráneo rojo envuelto en fuego", worshipers_es: "Nigromantes, magos", home_plane_es: "Acheron", description_es: "Wee Jas, deidad de la muerte y la magia, es retratada como una mujer impresionante.", rank: "greater" },
  { slug: "yondalla", name_es: "Yondalla", portfolio_es: "Medianos, protección, fertilidad", alignment: "LG", domains: ["Community", "Courage", "Creation", "Good", "Law", "Protection"], favored_weapon: "Short sword", symbol_es: "Escudo con cornucopia", worshipers_es: "Medianos, exploradores, pioneros", home_plane_es: "Celestia", description_es: "La deidad de los medianos, Yondalla, aparece como una mediana fuerte.", rank: "greater" },
  { slug: "zuoken", name_es: "Zuoken", portfolio_es: "Monjes, poderes mentales", alignment: "TN", domains: ["Knowledge", "Mind", "Strength", "War"], favored_weapon: "Nunchaku", symbol_es: "Puño Golpeante", worshipers_es: "Monjes, Psiones", home_plane_es: "Plano Material Primario", description_es: "Antaño un artista marcial humano, Zuoken alcanzó una perfección tal que ascendió a la divinidad.", rank: "demigod" }
];

/**
 * Genera SQL INSERT para las deidades
 */
function generateSQL(deities) {
  const lines = [
    '-- Migración de Deidades D&D 3.5',
    '-- Generado automáticamente por scripts/migrate-deities.mjs',
    '-- Ejecutar en: https://supabase.com/dashboard/projects/[PROJECT]/sql/new',
    '',
    'BEGIN;',
    '',
  ];

  for (const deity of deities) {
    // Convertir dominios a array SQL
    const domainSlugs = deity.domains.map(d => DOMAIN_MAPPING[d] || d.toLowerCase()).join(',');
    const domainsArray = `ARRAY['${domainSlugs.split(',').join("','")}']`;

    // Convertir alignment a código
    const alignmentCode = deity.alignment || 'TN';

    // Determinar flags de clasificación basado en rank
    const isMajor = deity.rank === 'greater' ? 'true' : 'false';
    const isMinor = deity.rank === 'lesser' ? 'true' : 'false';
    const isDemigod = deity.rank === 'demigod' ? 'true' : 'false';
    const isPhilosophy = 'false'; // Ninguno es una filosofía

    // Insertar deidad
    const insert = `INSERT INTO public.deities (
  slug, name_es, alignment, portfolio_es, description_es,
  worshipers_es, favored_weapon, symbol_es,
  is_major_deity, is_minor_deity, is_demigod, is_philosophy,
  tags, created_at, updated_at
) VALUES (
  '${deity.slug}',
  '${escapeSql(deity.name_es)}',
  '${alignmentCode}',
  '${escapeSql(deity.portfolio_es)}',
  '${escapeSql(deity.description_es)}',
  '${escapeSql(deity.worshipers_es)}',
  '${escapeSql(deity.favored_weapon)}',
  '${escapeSql(deity.symbol_es)}',
  ${isMajor},
  ${isMinor},
  ${isDemigod},
  ${isPhilosophy},
  ARRAY['core-pantheon', '${deity.rank}'],
  NOW(),
  NOW()
) ON CONFLICT (slug) DO NOTHING;`;

    lines.push(insert);

    // Insertar dominios asociados
    for (const domainEn of deity.domains) {
      const domainSlug = DOMAIN_MAPPING[domainEn] || domainEn.toLowerCase();
      const domainInsert = `INSERT INTO public.deity_domains (deity_id, domain_slug, domain_name, created_at)
SELECT id, '${domainSlug}', '${domainEn}', NOW()
FROM public.deities WHERE slug = '${deity.slug}'
ON CONFLICT DO NOTHING;`;
      lines.push(domainInsert);
    }

    lines.push('');
  }

  lines.push('COMMIT;');
  lines.push('');
  lines.push(`-- Verificación: SELECT COUNT(*) FROM public.deities; -- Debe retornar ${deities.length + (deities.length === DEITIES.length ? 0 : 1)}`);

  return lines.join('\n');
}

/**
 * Escapa caracteres especiales en SQL
 */
function escapeSql(str) {
  if (!str) return '';
  return str.replace(/'/g, "''").replace(/\\/g, '\\\\');
}

/**
 * Main
 */
async function main() {
  const arg = process.argv[2];

  if (arg === '--sql') {
    // Generar archivo SQL
    const sql = generateSQL(DEITIES);
    const outputPath = path.join(projectRoot, 'supabase', 'migrate-deities-initial.sql');

    fs.writeFileSync(outputPath, sql);
    console.log(`✅ SQL generado: ${outputPath}`);
    console.log(`📊 Deidades a migrar: ${DEITIES.length}`);
    console.log(`\n📋 Próximos pasos:`);
    console.log(`1. Abre Supabase Dashboard: https://supabase.com/dashboard`);
    console.log(`2. Ve a SQL Editor`);
    console.log(`3. Copia el contenido de: ${outputPath}`);
    console.log(`4. Ejecuta el script`);
    console.log(`5. Verifica: SELECT COUNT(*) FROM deities;`);
  } else {
    console.log('🎭 Migrador de Deidades D&D 3.5');
    console.log('');
    console.log('Uso: node scripts/migrate-deities.mjs [option]');
    console.log('');
    console.log('Opciones:');
    console.log('  --sql    Generar archivo SQL para insertar manualmente');
    console.log('  --live   Insertar directamente en Supabase (próximamente)');
    console.log('');
    console.log(`Deidades disponibles: ${DEITIES.length}`);
    console.log('Ejemplo de deidades:');
    DEITIES.slice(0, 3).forEach(d => {
      console.log(`  - ${d.name_es} (${d.slug})`);
    });
  }
}

main().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});

/**
 * Generador de nombres aleatorios para personajes de D&D 3.5
 *
 * Nombres basados en la nomenclatura oficial de D&D 3.5 (PHB, MM, etc.)
 * Organizados por raza y género
 */

export interface NameList {
  male: string[];
  female: string[];
  surnames?: string[];
}

export const CHARACTER_NAMES: Record<string, NameList> = {
  // HUMANO (Common, variedad cultural)
  human: {
    male: [
      'Aldric', 'Bram', 'Cedric', 'Drake', 'Erik', 'Finn', 'Gareth', 'Heath',
      'Ivan', 'Joran', 'Kael', 'Liam', 'Marcus', 'Nolan', 'Owen', 'Pierce',
      'Quinn', 'Rowan', 'Sean', 'Tomas', 'Ulric', 'Victor', 'Warren', 'Xavier',
      'Alaric', 'Balthazar', 'Cassius', 'Darius', 'Elias', 'Felix'
    ],
    female: [
      'Aria', 'Brenna', 'Celia', 'Diana', 'Elena', 'Fiona', 'Gwen', 'Helena',
      'Iris', 'Julia', 'Kira', 'Luna', 'Mara', 'Nina', 'Olivia', 'Petra',
      'Rosa', 'Sara', 'Talia', 'Una', 'Vera', 'Willa', 'Yara', 'Zara',
      'Anastasia', 'Beatrice', 'Cassandra', 'Delilah', 'Evangeline', 'Freya'
    ],
    surnames: [
      'Blackwood', 'Stormwind', 'Ironforge', 'Brightblade', 'Darkwater',
      'Goldmane', 'Swiftarrow', 'Thornhill', 'Ravenwood', 'Silverhand',
      'Fireheart', 'Stonefist', 'Moonwhisper', 'Sunstrider', 'Nightshade'
    ]
  },

  // ELFO (Élfico)
  elf: {
    male: [
      'Aelrindel', 'Athtar', 'Berevan', 'Caelynn', 'Daratrine', 'Erevan',
      'Faelyn', 'Galinndan', 'Hadarai', 'Immeral', 'Ivellios', 'Laucian',
      'Mindartis', 'Nailo', 'Paelias', 'Quarion', 'Riardon', 'Soveliss',
      'Thamior', 'Uldreyin', 'Varis', 'Wrenn', 'Xiloscient', 'Zaor'
    ],
    female: [
      'Adrie', 'Birel', 'Chaedi', 'Drusilia', 'Enna', 'Felosial', 'Gweyir',
      'Hatae', 'Ielenia', 'Jelenneth', 'Keyleth', 'Leshanna', 'Meriele',
      'Naivara', 'Quelenna', 'Sariel', 'Shanairra', 'Thia', 'Valanthe',
      'Xanaphia', 'Yaereene', 'Zestari'
    ],
    surnames: [
      'Moonwhisper', 'Starshine', 'Leafsong', 'Autumnwind', 'Silverleaf',
      'Dawnbringer', 'Nightbreeze', 'Springwater', 'Wintermoon', 'Rainfaller',
      'Sunwalker', 'Shadowdancer', 'Forestkeeper', 'Skygazer', 'Dreamweaver'
    ]
  },

  // ENANO (Dwarvish)
  dwarf: {
    male: [
      'Adrik', 'Baern', 'Barendd', 'Brottor', 'Bruenor', 'Dain', 'Darrak',
      'Eberk', 'Fargrim', 'Gardain', 'Harbek', 'Kildrak', 'Morgran',
      'Orsik', 'Rangrim', 'Rurik', 'Taklinn', 'Thoradin', 'Thorin',
      'Tordek', 'Traubon', 'Ulfgar', 'Veit', 'Vondal'
    ],
    female: [
      'Amber', 'Artin', 'Audhild', 'Bardryn', 'Dagnal', 'Diesa', 'Eldeth',
      'Falkrunn', 'Finellen', 'Gunnloda', 'Gurdis', 'Helja', 'Hlin',
      'Kathra', 'Kristryd', 'Ilde', 'Liftrasa', 'Mardred', 'Riswynn',
      'Sannl', 'Torbera', 'Torgga', 'Vistra'
    ],
    surnames: [
      'Ironforge', 'Steelhammer', 'Goldfinder', 'Stoneshield', 'Firebeard',
      'Battleaxe', 'Bronzefist', 'Deepdelver', 'Oreseeker', 'Gemcutter',
      'Mountainheart', 'Copperbrow', 'Silverstream', 'Stronghammer', 'Rockbreaker'
    ]
  },

  // MEDIANO (Halfling)
  halfling: {
    male: [
      'Alton', 'Ander', 'Cade', 'Corrin', 'Eldon', 'Errich', 'Finnan',
      'Garret', 'Lindal', 'Lyle', 'Merric', 'Milo', 'Osborn', 'Perrin',
      'Reed', 'Roscoe', 'Wellby', 'Wendel', 'Bilbo', 'Frodo', 'Samwise',
      'Pippin', 'Meriadoc', 'Drogo'
    ],
    female: [
      'Andry', 'Bree', 'Callie', 'Cora', 'Euphemia', 'Jillian', 'Kithri',
      'Lavinia', 'Lidda', 'Merla', 'Nedda', 'Paela', 'Portia', 'Seraphina',
      'Shaena', 'Trym', 'Vani', 'Verna', 'Primrose', 'Rose', 'Lily'
    ],
    surnames: [
      'Brushgather', 'Goodbarrel', 'Greenbottle', 'Highhill', 'Hilltopple',
      'Leagallow', 'Tealeaf', 'Thorngage', 'Tosscobble', 'Underbough',
      'Bramblefoot', 'Quickstep', 'Lightfoot', 'Stoutfellow', 'Meadowbrook'
    ]
  },

  // GNOMO (Gnomish)
  gnome: {
    male: [
      'Alston', 'Alvyn', 'Boddynock', 'Brocc', 'Burgell', 'Dimble', 'Eldon',
      'Erky', 'Fonkin', 'Frug', 'Gerbo', 'Gimble', 'Glim', 'Jebeddo',
      'Kellen', 'Namfoodle', 'Orryn', 'Roondar', 'Seebo', 'Sindri',
      'Warryn', 'Wrenn', 'Zook'
    ],
    female: [
      'Bimpnottin', 'Breena', 'Caramip', 'Carlin', 'Donella', 'Duvamil',
      'Ella', 'Ellyjobell', 'Ellywick', 'Lilli', 'Loopmottin', 'Lorilla',
      'Mardnab', 'Nissa', 'Nyx', 'Oda', 'Orla', 'Roywyn', 'Shamil',
      'Tana', 'Waywocket', 'Zanna'
    ],
    surnames: [
      'Beren', 'Daergel', 'Folkor', 'Garrick', 'Nackle', 'Murnig', 'Ningel',
      'Raulnor', 'Scheppen', 'Timbers', 'Turen', 'Sparklegem', 'Tinkertop',
      'Geargrinder', 'Fizzlebang'
    ]
  },

  // SEMIELFO (Mezcla de humano y élfico)
  'half-elf': {
    male: [
      'Aelric', 'Bren', 'Caelum', 'Doran', 'Eilian', 'Faramir', 'Galen',
      'Heir', 'Ilian', 'Jorin', 'Kaelen', 'Larian', 'Maric', 'Naeris',
      'Orin', 'Peren', 'Rael', 'Soren', 'Talin', 'Varen', 'Zephyr'
    ],
    female: [
      'Aela', 'Bryn', 'Cara', 'Delara', 'Elara', 'Farah', 'Gwen', 'Hira',
      'Ilia', 'Jenna', 'Kira', 'Lyra', 'Mira', 'Nara', 'Ora', 'Phaedra',
      'Raina', 'Sera', 'Tara', 'Vara', 'Zara'
    ],
    surnames: [
      'Wanderer', 'Traveler', 'Exile', 'Seeker', 'Pathfinder',
      'Duskwalker', 'Twilightborn', 'Betweenworlds', 'Twokinds',
      'Borderlands', 'Halfblood', 'Mixedline', 'Dualheart', 'Bridgeborn'
    ]
  },

  // SEMIORCO (Orcish + Common)
  'half-orc': {
    male: [
      'Dench', 'Feng', 'Gell', 'Henk', 'Holg', 'Imsh', 'Keth', 'Krusk',
      'Mhurren', 'Ront', 'Shump', 'Thokk', 'Grognak', 'Thrag', 'Urg',
      'Vorgath', 'Zug', 'Drog', 'Grok', 'Grosh'
    ],
    female: [
      'Baggi', 'Emen', 'Engong', 'Kansif', 'Myev', 'Neega', 'Ovak',
      'Ownka', 'Shautha', 'Sutha', 'Vola', 'Volen', 'Yevelda', 'Grasha',
      'Usha', 'Voltha'
    ],
    surnames: [
      'Ironfist', 'Skullcrusher', 'Bloodaxe', 'Bonesplitter', 'Goretusk',
      'Steelgut', 'Rockjaw', 'Ironscar', 'Warbringer', 'Grimfang',
      'Deathgrip', 'Fleshrender', 'Stonefist', 'Ashentongue', 'Doomhammer'
    ]
  },

  // RAZAS SUPLEMENTARIAS

  // AASIMAR (Celestial)
  aasimar: {
    male: [
      'Arken', 'Armazi', 'Beltin', 'Cernan', 'Cronwier', 'Eran', 'Ilamin',
      'Maudril', 'Okrin', 'Parant', 'Tural', 'Wyran', 'Zaigan', 'Seraphiel',
      'Angelus', 'Lumiel'
    ],
    female: [
      'Arken', 'Arsinoe', 'Davina', 'Dورا', 'Hesper', 'Kara', 'Larra',
      'Mishann', 'Nijena', 'Valeria', 'Zariel', 'Celestia', 'Seraphina',
      'Aurelia', 'Evangeline'
    ],
    surnames: [
      'Dawnbringer', 'Lightbearer', 'Holyflame', 'Divinewing', 'Truthseeker',
      'Justiceblade', 'Purehart', 'Brightsoul', 'Radiantborn', 'Heavenguard'
    ]
  },

  // TIEFLING (Infernal)
  tiefling: {
    male: [
      'Akmenos', 'Amnon', 'Barakas', 'Damakos', 'Ekemon', 'Iados', 'Kairon',
      'Leucis', 'Melech', 'Mordai', 'Morthos', 'Pelaios', 'Skamos',
      'Therai', 'Verin', 'Zaebos', 'Zevon'
    ],
    female: [
      'Akta', 'Anakis', 'Bryseis', 'Criella', 'Damaia', 'Ea', 'Kallista',
      'Lerissa', 'Makaria', 'Nemeia', 'Orianna', 'Phelaia', 'Rieta',
      'Kallista', 'Nemeia'
    ],
    surnames: [
      'Art', 'Carrion', 'Chant', 'Creed', 'Despair', 'Excellence', 'Fear',
      'Glory', 'Hope', 'Ideal', 'Music', 'Nowhere', 'Open', 'Poetry',
      'Quest', 'Random', 'Reverence', 'Sorrow', 'Torment', 'Weary'
    ]
  },

  // GOLIATH (Tribal)
  goliath: {
    male: [
      'Aukan', 'Eglath', 'Gae-Al', 'Gauthak', 'Ilikan', 'Keothi', 'Kuori',
      'Lo-Kag', 'Manneo', 'Maveith', 'Nalla', 'Orilo', 'Paavu', 'Pethani',
      'Thalai', 'Thotham', 'Uthal', 'Vaunea', 'Vimak'
    ],
    female: [
      'Elanithino', 'Geletha', 'Iamunal', 'Kaena', 'Kolae', 'Lithorea',
      'Mavoutha', 'Nae-laa', 'Oiala', 'Pala-ea', 'Pethani', 'Thalai',
      'Uthal', 'Vaunea', 'Vimaki'
    ],
    surnames: [
      'Bearkiller', 'Dawncaller', 'Fearless', 'Flintfinder', 'Horncarver',
      'Keeneye', 'Lonehunter', 'Mountainborn', 'Skywatcher', 'Steadyhand',
      'Threadtwister', 'Thriceclan', 'Twice-Orphaned', 'Twistedlimb', 'Wordpainter'
    ]
  }
};

/**
 * Genera un nombre aleatorio para una raza específica
 */
export function generateRandomName(raceSlug: string, includeRural: boolean = true): string {
  const names = CHARACTER_NAMES[raceSlug];

  if (!names) {
    // Si no hay nombres para esta raza, usar nombres humanos genéricos
    return generateRandomName('human', includeRural);
  }

  // Elegir aleatoriamente entre masculino y femenino
  const gender = Math.random() > 0.5 ? 'male' : 'female';
  const firstNames = names[gender];
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];

  // Añadir apellido si existe y si está habilitado
  if (includeRural && names.surnames && Math.random() > 0.3) {
    const surname = names.surnames[Math.floor(Math.random() * names.surnames.length)];
    return `${firstName} ${surname}`;
  }

  return firstName;
}

/**
 * Obtiene una lista de nombres sugeridos para una raza
 */
export function getNameSuggestions(raceSlug: string, count: number = 5): string[] {
  const suggestions: string[] = [];
  const usedNames = new Set<string>();

  while (suggestions.length < count) {
    const name = generateRandomName(raceSlug, true);
    if (!usedNames.has(name)) {
      suggestions.push(name);
      usedNames.add(name);
    }
  }

  return suggestions;
}

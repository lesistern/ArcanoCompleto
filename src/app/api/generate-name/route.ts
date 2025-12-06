import { NextResponse } from 'next/server';

// Mapeo de razas entre nuestro sistema y Fantasy Name Generators
const RACE_MAPPING: Record<string, string> = {
  'human': 'human',
  'elf': 'elf',
  'dwarf': 'dwarf',
  'halfling': 'halfling',
  'gnome': 'gnome',
  'half-elf': 'half-elf',
  'half-orc': 'half-orc',
  'aasimar': 'aasimar',
  'tiefling': 'tiefling',
  'goliath': 'goliath',
  'dragonborn': 'dragonborn',
  'warforged': 'warforged',
  'genasi': 'genasi',
  'tabaxi': 'tabaxi',
  'firbolg': 'firbolg',
  'kenku': 'kenku'
};

// Nombres de respaldo por si falla la API externa
const FALLBACK_NAMES: Record<string, { male: string[], female: string[], surnames: string[] }> = {
  human: {
    male: ['Aldric', 'Bram', 'Cedric', 'Drake', 'Erik', 'Finn', 'Gareth', 'Heath'],
    female: ['Aria', 'Brenna', 'Celia', 'Diana', 'Elena', 'Fiona', 'Gwen', 'Helena'],
    surnames: ['Blackwood', 'Stormwind', 'Ironforge', 'Brightblade', 'Darkwater']
  },
  elf: {
    male: ['Aelrindel', 'Athtar', 'Berevan', 'Caelynn', 'Daratrine', 'Erevan'],
    female: ['Adrie', 'Birel', 'Chaedi', 'Drusilia', 'Enna', 'Felosial'],
    surnames: ['Moonwhisper', 'Starshine', 'Leafsong', 'Autumnwind', 'Silverleaf']
  },
  dwarf: {
    male: ['Adrik', 'Baern', 'Barendd', 'Brottor', 'Bruenor', 'Dain'],
    female: ['Amber', 'Artin', 'Audhild', 'Bardryn', 'Dagnal', 'Diesa'],
    surnames: ['Ironforge', 'Steelhammer', 'Goldfinder', 'Stoneshield', 'Firebeard']
  },
  halfling: {
    male: ['Alton', 'Ander', 'Cade', 'Corrin', 'Eldon', 'Errich'],
    female: ['Andry', 'Bree', 'Callie', 'Cora', 'Euphemia', 'Jillian'],
    surnames: ['Brushgather', 'Goodbarrel', 'Greenbottle', 'Highhill', 'Hilltopple']
  },
  gnome: {
    male: ['Alston', 'Alvyn', 'Boddynock', 'Brocc', 'Burgell', 'Dimble'],
    female: ['Bimpnottin', 'Breena', 'Caramip', 'Carlin', 'Donella', 'Duvamil'],
    surnames: ['Beren', 'Daergel', 'Folkor', 'Garrick', 'Nackle', 'Murnig']
  },
  'half-elf': {
    male: ['Aelric', 'Bren', 'Caelum', 'Doran', 'Eilian', 'Faramir'],
    female: ['Aela', 'Bryn', 'Cara', 'Delara', 'Elara', 'Farah'],
    surnames: ['Wanderer', 'Traveler', 'Exile', 'Seeker', 'Pathfinder']
  },
  'half-orc': {
    male: ['Dench', 'Feng', 'Gell', 'Henk', 'Holg', 'Imsh'],
    female: ['Baggi', 'Emen', 'Engong', 'Kansif', 'Myev', 'Neega'],
    surnames: ['Ironfist', 'Skullcrusher', 'Bloodaxe', 'Bonesplitter', 'Goretusk']
  },
  aasimar: {
    male: ['Arken', 'Armazi', 'Beltin', 'Cernan', 'Cronwier', 'Eran'],
    female: ['Arsinoe', 'Davina', 'Hesper', 'Kara', 'Larra', 'Valeria'],
    surnames: ['Dawnbringer', 'Lightbearer', 'Holyflame', 'Divinewing', 'Truthseeker']
  },
  tiefling: {
    male: ['Akmenos', 'Amnon', 'Barakas', 'Damakos', 'Ekemon', 'Iados'],
    female: ['Akta', 'Anakis', 'Bryseis', 'Criella', 'Damaia', 'Ea'],
    surnames: ['Art', 'Carrion', 'Chant', 'Creed', 'Despair', 'Excellence']
  },
  goliath: {
    male: ['Aukan', 'Eglath', 'Gae-Al', 'Gauthak', 'Ilikan', 'Keothi'],
    female: ['Elanithino', 'Geletha', 'Iamunal', 'Kaena', 'Kolae', 'Lithorea'],
    surnames: ['Bearkiller', 'Dawncaller', 'Fearless', 'Flintfinder', 'Horncarver']
  }
};

function generateFallbackName(race: string): string {
  const raceNames = FALLBACK_NAMES[race] || FALLBACK_NAMES['human'];
  const gender = Math.random() > 0.5 ? 'male' : 'female';
  const firstNames = raceNames[gender];
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];

  // 70% de probabilidad de tener apellido
  if (Math.random() < 0.7 && raceNames.surnames && raceNames.surnames.length > 0) {
    const surname = raceNames.surnames[Math.floor(Math.random() * raceNames.surnames.length)];
    return `${firstName} ${surname}`;
  }

  return firstName;
}

async function fetchFromFantasyNameGenerators(race: string): Promise<string | null> {
  try {
    // Fantasy Name Generators no tiene una API pública oficial
    // Por lo que necesitaríamos hacer web scraping
    // Por ahora, vamos a usar un enfoque más simple con nombres predefinidos

    // En una implementación real, podrías:
    // 1. Usar puppeteer/playwright para renderizar la página
    // 2. Hacer click en el botón de generar
    // 3. Extraer el nombre generado
    // 4. O contactar al creador para obtener permiso de API

    // Por ahora retornamos null para usar el fallback
    return null;
  } catch (error) {
    console.error('Error fetching from Fantasy Name Generators:', error);
    return null;
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const race = searchParams.get('race') || 'human';
  const count = parseInt(searchParams.get('count') || '1');

  try {
    const names: string[] = [];

    for (let i = 0; i < count; i++) {
      // Intentar obtener de Fantasy Name Generators
      const externalName = await fetchFromFantasyNameGenerators(race);

      if (externalName) {
        names.push(externalName);
      } else {
        // Usar fallback local
        names.push(generateFallbackName(race));
      }
    }

    return NextResponse.json({ names, source: 'local' });
  } catch (error) {
    console.error('Error generating names:', error);
    return NextResponse.json(
      { error: 'Failed to generate names' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { race = 'human', gender, inclueSurname = true } = body;

    const raceNames = FALLBACK_NAMES[race] || FALLBACK_NAMES['human'];
    const selectedGender = gender || (Math.random() > 0.5 ? 'male' : 'female');
    const firstNames = raceNames[selectedGender === 'male' ? 'male' : 'female'];
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];

    let fullName = firstName;

    if (inclueSurname && raceNames.surnames && raceNames.surnames.length > 0 && Math.random() < 0.7) {
      const surname = raceNames.surnames[Math.floor(Math.random() * raceNames.surnames.length)];
      fullName = `${firstName} ${surname}`;
    }

    return NextResponse.json({
      name: fullName,
      firstName,
      gender: selectedGender,
      race,
      source: 'local'
    });
  } catch (error) {
    console.error('Error generating name:', error);
    return NextResponse.json(
      { error: 'Failed to generate name' },
      { status: 500 }
    );
  }
}
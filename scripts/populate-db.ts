
import * as fs from 'fs';
import * as path from 'path';

const BASE_PATH = 'd:\\CalabozosYDragones\\Extras\\ScrapData\\srd.dndtools.org\\srd';
const OUTPUT_FILE = 'scripts/population_data.sql';

function escapeSql(value: string | null | number): string {
  if (value === null || value === undefined) return 'NULL';
  if (typeof value === 'number') return value.toString();
  return `'${value.replace(/'/g, "''")}'`;
}

function appendSql(sql: string) {
  fs.appendFileSync(OUTPUT_FILE, sql + '\n');
}

async function parseAndGeneratePsionics() {
  console.log('Parsing Psionics...');
  const filePath = path.join(BASE_PATH, 'magic', 'psionics', 'powers', 'powersAllCore.html');

  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    return;
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  const powerRegex = /<h6><a\s+[^>]+><\/a>(?:<a\s+[^>]+><\/a>)?(.*?)<\/h6>(.*?)(?=<h6>|$)/gs;

  let match;
  let count = 0;

  while ((match = powerRegex.exec(content)) !== null) {
    const name = match[1].trim();
    const body = match[2];

    const disciplineMatch = body.match(/<span style="font-style: italic;">(.*?)<\/span>/);
    const discipline = disciplineMatch ? disciplineMatch[1].trim() : null;

    const levelMatch = body.match(/<span style="font-weight: bold;">Level:<\/span>\s*(.*?)<br \/>/);
    const level = levelMatch ? levelMatch[1].trim() : null;

    const manifestingTimeMatch = body.match(/<span style="font-weight: bold;">Manifesting Time:<\/span>\s*(.*?)<br \/>/);
    const manifestingTime = manifestingTimeMatch ? manifestingTimeMatch[1].trim() : null;

    const rangeMatch = body.match(/<span style="font-weight: bold;">Range:<\/span>\s*(.*?)<br \/>/);
    const range = rangeMatch ? rangeMatch[1].trim() : null;

    const targetMatch = body.match(/<span style="font-weight: bold;">Target:<\/span>\s*(.*?)<br \/>/);
    const target = targetMatch ? targetMatch[1].trim() : null;

    const durationMatch = body.match(/<span style="font-weight: bold;">Duration:<\/span>\s*(.*?)<br \/>/);
    const duration = durationMatch ? durationMatch[1].trim() : null;

    const savingThrowMatch = body.match(/<span style="font-weight: bold;">Saving Throw:<\/span>\s*(.*?)<br \/>/);
    const savingThrow = savingThrowMatch ? savingThrowMatch[1].trim() : null;

    const powerResistanceMatch = body.match(/<span style="font-weight: bold;">Power Resistance:<\/span>\s*(.*?)<br \/>/);
    const powerResistance = powerResistanceMatch ? powerResistanceMatch[1].trim() : null;

    const powerPointsMatch = body.match(/<span style="font-weight: bold;">Power Points:<\/span>\s*(.*?)<br \/>/);
    const powerPoints = powerPointsMatch ? powerPointsMatch[1].trim() : null;

    const descRegex = /<p>(.*?)<\/p>/gs;
    let descMatch;
    let description = '';
    while ((descMatch = descRegex.exec(body)) !== null) {
      description += descMatch[1] + '\n\n';
    }
    description = description.replace(/<[^>]+>/g, '').trim();

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const sql = `
INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  ${escapeSql(name)},
  ${escapeSql(slug)},
  ${escapeSql(discipline)},
  ${escapeSql(level)},
  ${escapeSql(manifestingTime)},
  ${escapeSql(range)},
  ${escapeSql(target)},
  ${escapeSql(duration)},
  ${escapeSql(savingThrow)},
  ${escapeSql(powerResistance)},
  ${escapeSql(description)},
  true,
  ${escapeSql(powerPoints)}
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;
`;
    appendSql(sql);
    count++;
  }
  console.log(`Generated SQL for ${count} psionic powers.`);
}

async function parseAndGenerateArmor() {
  console.log('Parsing Armor...');
  const filePath = path.join(BASE_PATH, 'equipment', 'armor.html');

  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    return;
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  const rowRegex = /<tr[^>]*>(.*?)<\/tr>/gs;
  const cellRegex = /<td[^>]*>(.*?)<\/td>/gs;

  let match;
  let count = 0;

  while ((match = rowRegex.exec(content)) !== null) {
    const rowContent = match[1];
    const cells = [];
    let cellMatch;
    while ((cellMatch = cellRegex.exec(rowContent)) !== null) {
      cells.push(cellMatch[1].replace(/<[^>]+>/g, '').trim());
    }

    if (cells.length >= 8) {
      const name = cells[0];
      const cost = cells[1];
      const armorBonus = cells[2];
      const maxDex = cells[3];
      const checkPenalty = cells[4];
      const spellFailure = cells[5];
      const weight = cells[8];

      if (!name || name === 'Armor' || name.includes('Light armor') || name.includes('Medium armor') || name.includes('Heavy armor') || name.includes('Shields') || name.includes('Extras')) continue;

      const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

      const parseIntSafe = (v: string) => {
        const n = parseInt(v.replace(/[^0-9-]/g, ''));
        return isNaN(n) ? null : n;
      };
      const parseBonus = (v: string) => parseIntSafe(v);
      const parsePercent = (v: string) => parseIntSafe(v);
      const parseWeight = (v: string) => {
        const n = parseFloat(v.replace(/[^0-9.]/g, ''));
        return isNaN(n) ? null : n;
      };

      const sql = `
WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    ${escapeSql(slug)},
    ${escapeSql(name)},
    'armor',
    ${escapeSql(cost)},
    ${escapeSql(weight)},
    ${escapeSql(parseWeight(weight))}
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_armors (
  item_id, armor_category, armor_bonus, max_dex_bonus, armor_check_penalty, arcane_spell_failure
)
SELECT
  id,
  'Armor',
  ${escapeSql(parseBonus(armorBonus)) || 0},
  ${escapeSql(parseBonus(maxDex))},
  ${escapeSql(parseBonus(checkPenalty)) || 0},
  ${escapeSql(parsePercent(spellFailure)) || 0}
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  armor_bonus = EXCLUDED.armor_bonus,
  max_dex_bonus = EXCLUDED.max_dex_bonus,
  armor_check_penalty = EXCLUDED.armor_check_penalty,
  arcane_spell_failure = EXCLUDED.arcane_spell_failure;
`;
      appendSql(sql);
      count++;
    }
  }
  console.log(`Generated SQL for ${count} armor items.`);
}

async function parseAndGenerateWeapons() {
  console.log('Parsing Weapons...');
  const filePath = path.join(BASE_PATH, 'equipment', 'weapons.html');

  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    return;
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  const rowRegex = /<tr[^>]*>(.*?)<\/tr>/gs;
  const cellRegex = /<td[^>]*>(.*?)<\/td>/gs;

  let match;
  let count = 0;

  while ((match = rowRegex.exec(content)) !== null) {
    const rowContent = match[1];
    const cells = [];
    let cellMatch;
    while ((cellMatch = cellRegex.exec(rowContent)) !== null) {
      cells.push(cellMatch[1].replace(/<[^>]+>/g, '').trim());
    }

    if (cells.length >= 6 && cells[0] && !cells[0].includes('Weapon') && !cells[0].includes('Simple') && !cells[0].includes('Martial') && !cells[0].includes('Exotic')) {
      const name = cells[0];
      const cost = cells[1];
      const damage = cells[2];
      const critical = cells[3];
      const range = cells[4];
      const weight = cells[5];
      const damageType = cells[6] || 'slashing';

      const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

      const parseWeight = (v: string) => {
        const n = parseFloat(v.replace(/[^0-9.]/g, ''));
        return isNaN(n) ? null : n;
      };

      const sql = `
WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    ${escapeSql(slug)},
    ${escapeSql(name)},
    'weapon',
    ${escapeSql(cost)},
    ${escapeSql(weight)},
    ${escapeSql(parseWeight(weight))}
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_weapons (
  item_id, weapon_category, weapon_type, handedness, damage_by_size, critical_range, critical_mult, damage_type
)
SELECT
  id,
  'simple',
  'melee',
  'one-handed',
  jsonb_build_object('M', ${escapeSql(damage)}),
  ${escapeSql(critical.split('/')[0] || '20')},
  ${escapeSql(critical.split('/')[1] || 'x2')},
  ARRAY[${escapeSql(damageType)}]::text[]
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  damage_by_size = EXCLUDED.damage_by_size,
  critical_range = EXCLUDED.critical_range,
  critical_mult = EXCLUDED.critical_mult;
`;
      appendSql(sql);
      count++;
    }
  }
  console.log(`Generated SQL for ${count} weapons.`);
}

async function parseAndGenerateGoods() {
  console.log('Parsing Goods and Services...');
  const filePath = path.join(BASE_PATH, 'equipment', 'goodsAndServices.html');

  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    return;
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  const rowRegex = /<tr[^>]*>(.*?)<\/tr>/gs;
  const cellRegex = /<td[^>]*>(.*?)<\/td>/gs;

  let match;
  let count = 0;

  while ((match = rowRegex.exec(content)) !== null) {
    const rowContent = match[1];
    const cells = [];
    let cellMatch;
    while ((cellMatch = cellRegex.exec(rowContent)) !== null) {
      cells.push(cellMatch[1].replace(/<[^>]+>/g, '').trim());
    }

    if (cells.length >= 2 && cells[0] && !cells[0].includes('Item') && !cells[0].includes('Adventuring') && cells[0].length > 0) {
      const name = cells[0];
      const cost = cells[1];
      const weight = cells[2] || '';

      const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

      const parseWeight = (v: string) => {
        const n = parseFloat(v.replace(/[^0-9.]/g, ''));
        return isNaN(n) ? null : n;
      };

      const sql = `
INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  ${escapeSql(slug)},
  ${escapeSql(name)},
  'goods',
  ${escapeSql(cost)},
  ${escapeSql(weight)},
  ${escapeSql(parseWeight(weight))}
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;
`;
      appendSql(sql);
      count++;
    }
  }
  console.log(`Generated SQL for ${count} goods and services.`);
}

async function main() {
  fs.writeFileSync(OUTPUT_FILE, '-- Population Data\n');
  await parseAndGeneratePsionics();
  await parseAndGenerateArmor();
  await parseAndGenerateWeapons();
  await parseAndGenerateGoods();
  console.log('\nDone! Check scripts/population_data.sql');
  console.log('Run: Get-Content "scripts/population_data.sql" | psql "postgresql://postgres:jWwBPszjfe2KDlsk@db.akcuvlanpqpoizconuhm.supabase.co:5432/postgres"');
}

main();

-- =========================================================
-- 1) Tabla de libros – D&D 3.5
-- =========================================================

create table if not exists public.srd_books (
  id              bigserial primary key,
  system_key      text not null, -- 'dnd_35', 'dnd_5e', etc.
  code            text not null unique, -- phb, phb2, cavd, etc.
  title_es        text not null,
  title_en        text,
  category        text not null, -- core, complete, supplement, monster, rules, setting, etc.
  difficulty      text not null check (difficulty in ('beginner','intermediate','advanced')),
  recommended_for text[] not null default '{}', -- {'novato','intermedio','experto'}
  is_core         boolean not null default false
);

-- Índice útil para filtros
create index if not exists srd_books_system_key_idx
  on public.srd_books (system_key);

create index if not exists srd_books_difficulty_idx
  on public.srd_books (difficulty);

-- =========================================================
-- 2) Libros núcleo y recomendados para NOVATO (3.5)
--    PHB, PHB2, Aventureros Completos
-- =========================================================

insert into public.srd_books (system_key, code, title_es, title_en, category, difficulty, recommended_for, is_core)
values
  -- Núcleo absoluto
  ('dnd_35', 'phb',  'Manual del Jugador',       'Player''s Handbook',        'core',     'beginner',    '{novato,intermedio,experto}', true),
  ('dnd_35', 'phb2', 'Manual del Jugador II',    'Player''s Handbook II',     'core',     'beginner',    '{novato,intermedio,experto}', true),

  -- Aventureros Completos – recomendados fuertemente
  ('dnd_35', 'cwar', 'Guerrero Completo',        'Complete Warrior',          'complete', 'beginner',    '{novato,intermedio,experto}', false),
  ('dnd_35', 'carc', 'Arcano Completo',          'Complete Arcane',           'complete', 'beginner',    '{novato,intermedio,experto}', false),
  ('dnd_35', 'cdiv', 'Divino Completo',          'Complete Divine',           'complete', 'beginner',    '{novato,intermedio,experto}', false),
  ('dnd_35', 'cadv', 'Aventurero Completo',      'Complete Adventurer',       'complete', 'beginner',    '{novato,intermedio,experto}', false),

  -- Otros Complete útiles (un poco más avanzados, pero amigables)
  ('dnd_35', 'cscn', 'Canalla Completo',         'Complete Scoundrel',        'complete', 'intermediate','{intermedio,experto}',       false),
  ('dnd_35', 'cchr', 'Campeón Completo',         'Complete Champion',         'complete', 'intermediate','{intermedio,experto}',       false),
  ('dnd_35', 'cmag', 'Mago Completo',            'Complete Mage',             'complete', 'intermediate','{intermedio,experto}',       false),
  ('dnd_35', 'cpsi', 'Psiónico Completo',        'Complete Psionic',          'complete', 'advanced',   '{intermedio,experto}',       false)
on conflict (code) do nothing;

-- =========================================================
-- 3) Resto de núcleo 3.5 (DMG, MM, etc.)
-- =========================================================

insert into public.srd_books (system_key, code, title_es, title_en, category, difficulty, recommended_for, is_core)
values
  ('dnd_35', 'dmg',  'Guía del Dungeon Master',  'Dungeon Master''s Guide',   'core',   'intermediate', '{intermedio,experto}', true),
  ('dnd_35', 'dmg2', 'Guía del Dungeon Master II','Dungeon Master''s Guide II','core',  'advanced',    '{intermedio,experto}', true),

  ('dnd_35', 'mm1',  'Manual de Monstruos I',    'Monster Manual I',          'monster','intermediate','{novato,intermedio,experto}', true),
  ('dnd_35', 'mm2',  'Manual de Monstruos II',   'Monster Manual II',         'monster','intermediate','{intermedio,experto}',        false),
  ('dnd_35', 'mm3',  'Manual de Monstruos III',  'Monster Manual III',        'monster','intermediate','{intermedio,experto}',        false),
  ('dnd_35', 'mm4',  'Manual de Monstruos IV',   'Monster Manual IV',         'monster','advanced',   '{intermedio,experto}',        false),
  ('dnd_35', 'mm5',  'Manual de Monstruos V',    'Monster Manual V',          'monster','advanced',   '{intermedio,experto}',        false)
on conflict (code) do nothing;

-- =========================================================
-- 4) Suplementos de reglas muy usados (intermedio)
-- =========================================================

insert into public.srd_books (system_key, code, title_es, title_en, category, difficulty, recommended_for, is_core)
values
  ('dnd_35', 'scomp', 'Compendio de Conjuros',      'Spell Compendium',          'rules', 'intermediate','{intermedio,experto}', false),
  ('dnd_35', 'mic',   'Compendio de Objetos Mágicos','Magic Item Compendium',    'rules', 'intermediate','{intermedio,experto}', false),
  ('dnd_35', 'xph',   'Manual Ampliado de Psiónica','Expanded Psionics Handbook','rules', 'advanced',   '{intermedio,experto}', false),
  ('dnd_35', 'ua',    'Arcana Desenterrada',        'Unearthed Arcana',          'rules', 'advanced',   '{experto}',            false),
  ('dnd_35', 'tob',   'Libro de las Nueve Espadas', 'Tome of Battle',            'rules', 'advanced',   '{intermedio,experto}', false),
  ('dnd_35', 'tom',   'Libro de la Magia Extraña',  'Tome of Magic',             'rules', 'advanced',   '{intermedio,experto}', false)
on conflict (code) do nothing;

-- =========================================================
-- 5) Libros de razas y “player options”
-- =========================================================

insert into public.srd_books (system_key, code, title_es, title_en, category, difficulty, recommended_for, is_core)
values
  ('dnd_35', 'ros',  'Razas de Piedra',      'Races of Stone',       'supplement','intermediate','{intermedio,experto}', false),
  ('dnd_35', 'row',  'Razas del Bosque',    'Races of the Wild',    'supplement','intermediate','{intermedio,experto}', false),
  ('dnd_35', 'rod',  'Razas del Destino',   'Races of Destiny',     'supplement','intermediate','{intermedio,experto}', false),
  ('dnd_35', 'rodr', 'Razas de Dragón',     'Races of the Dragon',  'supplement','intermediate','{intermedio,experto}', false)
on conflict (code) do nothing;

-- =========================================================
-- 6) Libros de “tema” (horror, entorno, ciudades)
--    Buen material para INTERMEDIO/EXPERTO
-- =========================================================

insert into public.srd_books (system_key, code, title_es, title_en, category, difficulty, recommended_for, is_core)
values
  ('dnd_35', 'hoh',   'Héroes del Horror',      'Heroes of Horror',     'setting','intermediate','{intermedio,experto}', false),
  ('dnd_35', 'sand',  'Tormenta de Arena',      'Sandstorm',            'setting','intermediate','{intermedio,experto}', false),
  ('dnd_35', 'frost', 'Escarcha Eterna',        'Frostburn',            'setting','intermediate','{intermedio,experto}', false),
  ('dnd_35', 'storm', 'Furia de las Olas',      'Stormwrack',           'setting','intermediate','{intermedio,experto}', false),
  ('dnd_35', 'city',  'Paisajes Urbanos',       'Cityscape',            'setting','intermediate','{intermedio,experto}', false),
  ('dnd_35', 'dung',  'Mazmorras',              'Dungeonscape',         'setting','intermediate','{intermedio,experto}', false)
on conflict (code) do nothing;

-- =========================================================
-- 7) Libros “oscuros / extremos” (claramente avanzados)
-- =========================================================

insert into public.srd_books (system_key, code, title_es, title_en, category, difficulty, recommended_for, is_core)
values
  ('dnd_35', 'lmort', 'Libro de los No Muertos',   'Libris Mortis',         'supplement','advanced','{intermedio,experto}', false),
  ('dnd_35', 'bovd',  'Libro de la Maldad Suprema','Book of Vile Darkness', 'supplement','advanced','{experto}',            false),
  ('dnd_35', 'boed',  'Libro de la Bondad Suprema','Book of Exalted Deeds', 'supplement','advanced','{experto}',            false),
  ('dnd_35', 'drac',  'Draconomicon',             'Draconomicon',           'supplement','advanced','{intermedio,experto}', false),
  ('dnd_35', 'fiend', 'Folio de los Demonios',    'Fiend Folio',            'monster',   'advanced','{experto}',            false)
on conflict (code) do nothing;

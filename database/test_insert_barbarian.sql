INSERT INTO classes (
  slug, titulo, name_en, name_es, hit_die, dg, skill_points_per_level,
  bab_progression, bab, fort_save, fort, ref_save, ref, will_save, will,
  primary_ability_en, primary_ability_es,
  alignment_restriction_en, alignment_restriction_es,
  description_en, description_es,
  summary_en, summary_es,
  source_en, source_es
) VALUES (
  'barbarian',
  'Bárbaro',
  'Barbarian',
  'Bárbaro',
  12, 12, -- hit_die / dg
  4,
  'good', 'bueno', -- bab_progression / bab
  'good', 'bueno', -- fort_save / fort
  'poor', 'pobre', -- ref_save / ref
  'poor', 'pobre', -- will_save / will
  'Strength',
  'Fuerza',
  'Any nonlawful',
  'Cualquiera no legal',
  'From the frozen wastes of the north and the hellish jungles of the south come brave, even reckless, warriors. Civilized people call them barbarians or berserkers and suspect them of mayhem, impiety, and atrocities. These "barbarians," however, have proven their mettle and their value to those who would be their allies. To enemies who underestimated them, they have proved their cunning, resourcefulness, persistence, and mercilessness.',
  'Desde los páramos helados del norte y las junglas infernales del sur vienen guerreros valientes, incluso temerarios. La gente civilizada los llama bárbaros o berserkers y sospecha de ellos por su caos, impiedad y atrocidades. Sin embargo, estos "bárbaros" han demostrado su temple y su valor para aquellos que serían sus aliados. A los enemigos que los subestimaron, han demostrado su astucia, ingenio, persistencia y falta de piedad.',
  'A barbarian''s typical primary role in a group of adventurers is as a front-line combat specialist.',
  'El rol principal típico de un bárbaro en un grupo de aventureros es como especialista de combate en primera línea.',
  'Player''s Handbook v3.5',
  'Manual del Jugador v3.5'
) ON CONFLICT (slug) DO UPDATE SET
  titulo = EXCLUDED.titulo,
  name_en = EXCLUDED.name_en,
  name_es = EXCLUDED.name_es,
  hit_die = EXCLUDED.hit_die,
  dg = EXCLUDED.dg,
  skill_points_per_level = EXCLUDED.skill_points_per_level,
  bab_progression = EXCLUDED.bab_progression,
  bab = EXCLUDED.bab,
  fort_save = EXCLUDED.fort_save,
  fort = EXCLUDED.fort,
  ref_save = EXCLUDED.ref_save,
  ref = EXCLUDED.ref,
  will_save = EXCLUDED.will_save,
  will = EXCLUDED.will,
  primary_ability_en = EXCLUDED.primary_ability_en,
  primary_ability_es = EXCLUDED.primary_ability_es,
  alignment_restriction_en = EXCLUDED.alignment_restriction_en,
  alignment_restriction_es = EXCLUDED.alignment_restriction_es,
  description_en = EXCLUDED.description_en,
  description_es = EXCLUDED.description_es,
  summary_en = EXCLUDED.summary_en,
  summary_es = EXCLUDED.summary_es,
  source_en = EXCLUDED.source_en,
  source_es = EXCLUDED.source_es;

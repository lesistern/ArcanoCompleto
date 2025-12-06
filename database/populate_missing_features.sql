-- Populate missing class features for Fighter, Cleric, Sorcerer, and Wizard

-- ============================================
-- FIGHTER CLASS FEATURES
-- ============================================
INSERT INTO class_features (class_slug, level, title, name_en, name_es, description_en, description_es, summary_en, summary_es, type)
VALUES
('fighter', 1, 'Weapon and Armor Proficiency', 'Weapon and Armor Proficiency', 'Competencia con Armas y Armaduras',
  'A fighter is proficient with all simple and martial weapons and with all armor (heavy, medium, and light) and shields (including tower shields).',
  'Un guerrero es competente con todas las armas simples y marciales y con todas las armaduras (pesadas, medias y ligeras) y escudos (incluyendo escudos torreón).',
  'Proficient with all simple and martial weapons, all armor, and shields.',
  'Competente con todas las armas simples y marciales, todas las armaduras y escudos.',
  NULL),
  
('fighter', 1, 'Bonus Feats', 'Bonus Feats', 'Dotes Adicionales',
  'At 1st level, a fighter gets a bonus combat-oriented feat in addition to the feat that any 1st-level character gets. The fighter gains an additional bonus feat at 2nd level and every two levels thereafter (4th, 6th, 8th, 10th, 12th, 14th, 16th, 18th, and 20th). These bonus feats must be drawn from fighter bonus feats. A fighter must still meet all prerequisites.',
  'A 1er nivel, un guerrero obtiene una dote adicional orientada al combate además de la dote que obtiene cualquier personaje de 1er nivel. El guerrero obtiene una dote adicional adicional a 2do nivel y cada dos niveles después (4to, 6to, 8vo, 10mo, 12vo, 14vo, 16vo, 18vo y 20vo). Estas dotes adicionales deben extraerse de las dotes adicionales de guerrero. Un guerrero debe cumplir todos los prerrequisitos.',
  'Bonus combat feat at 1st, 2nd, and every 2 levels.',
  'Dote de combate adicional a 1er, 2do y cada 2 niveles.',
  NULL)

ON CONFLICT (class_slug, level, name_en) 
DO UPDATE SET
  title = EXCLUDED.title,
  name_es = EXCLUDED.name_es,
  description_en = EXCLUDED.description_en,
  description_es = EXCLUDED.description_es,
  summary_en = EXCLUDED.summary_en,
  summary_es = EXCLUDED.summary_es,
  type = EXCLUDED.type;

-- Verification
SELECT 'Fighter features: ' || COUNT(*) FROM class_features WHERE class_slug = 'fighter';

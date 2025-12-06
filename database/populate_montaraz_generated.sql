-- Population script for RANGER (montaraz)
BEGIN;

        UPDATE classes 
        SET hit_die = 8, dg = 8
        WHERE slug = 'montaraz';
        

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('montaraz', 1, 'spells', 'for', 'a', '4th-level', ARRAY['ranger)', 'he gains only the bonus spells'], 'spells', 'for', 'a', '4th-level')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_features (class_slug, name, level, description, name_en, description_en)
            VALUES ('montaraz', 'ranger)', 1, 'Descripción pendiente.', 'ranger)', 'Pending description.')
            ON CONFLICT (class_slug, name) DO NOTHING;
            

            INSERT INTO class_features (class_slug, name, level, description, name_en, description_en)
            VALUES ('montaraz', 'he gains only the bonus spells', 1, 'Descripción pendiente.', 'he gains only the bonus spells', 'Pending description.')
            ON CONFLICT (class_slug, name) DO NOTHING;
            
COMMIT;
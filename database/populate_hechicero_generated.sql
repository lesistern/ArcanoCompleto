-- Population script for SORCERER (hechicero)
BEGIN;

        UPDATE classes 
        SET hit_die = 4, dg = 4
        WHERE slug = 'hechicero';
        

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('hechicero', 1, '+0', '+0', '+0', '+2', ARRAY['Summon familiar'], '+0', '+0', '+0', '+2')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('hechicero', 2, '+1', '+0', '+0', '+3', NULL, '+1', '+0', '+0', '+3')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('hechicero', 3, '+1', '+1', '+1', '+3', NULL, '+1', '+1', '+1', '+3')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('hechicero', 4, '+2', '+1', '+1', '+4', NULL, '+2', '+1', '+1', '+4')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('hechicero', 5, '+2', '+1', '+1', '+4', NULL, '+2', '+1', '+1', '+4')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('hechicero', 6, '+3', '+2', '+2', '+5', NULL, '+3', '+2', '+2', '+5')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('hechicero', 7, '+3', '+2', '+2', '+5', NULL, '+3', '+2', '+2', '+5')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('hechicero', 8, '+4', '+2', '+2', '+6', NULL, '+4', '+2', '+2', '+6')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('hechicero', 9, '+4', '+3', '+3', '+6', NULL, '+4', '+3', '+3', '+6')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('hechicero', 10, '+5', '+3', '+3', '+7', NULL, '+5', '+3', '+3', '+7')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('hechicero', 11, '+5', '+3', '+3', '+7', NULL, '+5', '+3', '+3', '+7')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('hechicero', 12, '+6/+1', '+4', '+4', '+8', NULL, '+6/+1', '+4', '+4', '+8')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('hechicero', 13, '+6/+1', '+4', '+4', '+8', NULL, '+6/+1', '+4', '+4', '+8')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('hechicero', 14, '+7/+2', '+4', '+4', '+9', NULL, '+7/+2', '+4', '+4', '+9')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('hechicero', 15, '+7/+2', '+5', '+5', '+9', NULL, '+7/+2', '+5', '+5', '+9')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('hechicero', 16, '+8/+3', '+5', '+5', '+10', NULL, '+8/+3', '+5', '+5', '+10')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('hechicero', 17, '+8/+3', '+5', '+5', '+10', NULL, '+8/+3', '+5', '+5', '+10')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('hechicero', 18, '+9/+4', '+6', '+6', '+11', NULL, '+9/+4', '+6', '+6', '+11')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('hechicero', 19, '+9/+4', '+6', '+6', '+11', NULL, '+9/+4', '+6', '+6', '+11')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('hechicero', 20, '+10/+5', '+6', '+6', '+12', NULL, '+10/+5', '+6', '+6', '+12')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_features (class_slug, name, level, description, name_en, description_en)
            VALUES ('hechicero', 'Summon familiar', 1, 'Descripción pendiente.', 'Summon familiar', 'Pending description.')
            ON CONFLICT (class_slug, name) DO NOTHING;
            
COMMIT;
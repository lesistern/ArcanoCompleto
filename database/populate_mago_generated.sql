-- Population script for WIZARD (mago)
BEGIN;

        UPDATE classes 
        SET hit_die = 4, dg = 4
        WHERE slug = 'mago';
        

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('mago', 1, '+0', '+0', '+0', '+2', ARRAY['Summon familiar'], '+0', '+0', '+0', '+2')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('mago', 2, '+1', '+0', '+0', '+3', NULL, '+1', '+0', '+0', '+3')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('mago', 3, '+1', '+1', '+1', '+3', NULL, '+1', '+1', '+1', '+3')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('mago', 4, '+2', '+1', '+1', '+4', NULL, '+2', '+1', '+1', '+4')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('mago', 5, '+2', '+1', '+1', '+4', ARRAY['Bonus feat'], '+2', '+1', '+1', '+4')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('mago', 6, '+3', '+2', '+2', '+5', NULL, '+3', '+2', '+2', '+5')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('mago', 7, '+3', '+2', '+2', '+5', NULL, '+3', '+2', '+2', '+5')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('mago', 8, '+4', '+2', '+2', '+6', NULL, '+4', '+2', '+2', '+6')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('mago', 9, '+4', '+3', '+3', '+6', NULL, '+4', '+3', '+3', '+6')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('mago', 10, '+5', '+3', '+3', '+7', ARRAY['Bonus feat'], '+5', '+3', '+3', '+7')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('mago', 11, '+5', '+3', '+3', '+7', NULL, '+5', '+3', '+3', '+7')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('mago', 12, '+6/+1', '+4', '+4', '+8', NULL, '+6/+1', '+4', '+4', '+8')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('mago', 13, '+6/+1', '+4', '+4', '+8', NULL, '+6/+1', '+4', '+4', '+8')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('mago', 14, '+7/+2', '+4', '+4', '+9', NULL, '+7/+2', '+4', '+4', '+9')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('mago', 15, '+7/+2', '+5', '+5', '+9', ARRAY['Bonus feat'], '+7/+2', '+5', '+5', '+9')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('mago', 16, '+8/+3', '+5', '+5', '+10', NULL, '+8/+3', '+5', '+5', '+10')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('mago', 17, '+8/+3', '+5', '+5', '+10', NULL, '+8/+3', '+5', '+5', '+10')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('mago', 18, '+9/+4', '+6', '+6', '+11', NULL, '+9/+4', '+6', '+6', '+11')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('mago', 19, '+9/+4', '+6', '+6', '+11', NULL, '+9/+4', '+6', '+6', '+11')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('mago', 20, '+10/+5', '+6', '+6', '+12', ARRAY['Bonus feat'], '+10/+5', '+6', '+6', '+12')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_features (class_slug, name, level, description, name_en, description_en)
            VALUES ('mago', 'Summon familiar', 1, 'Descripción pendiente.', 'Summon familiar', 'Pending description.')
            ON CONFLICT (class_slug, name) DO NOTHING;
            

            INSERT INTO class_features (class_slug, name, level, description, name_en, description_en)
            VALUES ('mago', 'Bonus feat', 5, 'Descripción pendiente.', 'Bonus feat', 'Pending description.')
            ON CONFLICT (class_slug, name) DO NOTHING;
            
COMMIT;
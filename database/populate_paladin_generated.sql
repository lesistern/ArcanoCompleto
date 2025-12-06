-- Population script for PALADIN (paladin)
BEGIN;

        UPDATE classes 
        SET hit_die = 10, dg = 10
        WHERE slug = 'paladin';
        

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('paladin', 1, '+1', '+2', '+0', '+0', ARRAY['Aura of good', '_detect evil_', 'smite evil 1/day'], '+1', '+2', '+0', '+0')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('paladin', 7, '+7/+2', '+5', '+2', '+2', NULL, '+7/+2', '+5', '+2', '+2')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('paladin', 8, '+8/+3', '+6', '+2', '+2', NULL, '+8/+3', '+6', '+2', '+2')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('paladin', 9, '+9/+4', '+6', '+3', '+3', ARRAY['_Remove disease_ 2/week'], '+9/+4', '+6', '+3', '+3')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('paladin', 12, '+12/+7/+2', '+8', '+4', '+4', ARRAY['_Remove disease_ 3/week'], '+12/+7/+2', '+8', '+4', '+4')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('paladin', 13, '+13/+8/+3', '+8', '+4', '+4', NULL, '+13/+8/+3', '+8', '+4', '+4')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('paladin', 14, '+14/+9/+4', '+9', '+4', '+4', NULL, '+14/+9/+4', '+9', '+4', '+4')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('paladin', 15, '+15/+10/+5', '+9', '+5', '+5', ARRAY['_Remove disease_ 4/week', 'smite evil 4/day'], '+15/+10/+5', '+9', '+5', '+5')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('paladin', 16, '+16/+11/+6/+1', '+10', '+5', '+5', NULL, '+16/+11/+6/+1', '+10', '+5', '+5')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('paladin', 17, '+17/+12/+7/+2', '+10', '+5', '+5', NULL, '+17/+12/+7/+2', '+10', '+5', '+5')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('paladin', 18, '+18/+13/+8/+3', '+11', '+6', '+6', ARRAY['_Remove disease_ 5/week'], '+18/+13/+8/+3', '+11', '+6', '+6')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('paladin', 19, '+19/+14/+9/+4', '+11', '+6', '+6', NULL, '+19/+14/+9/+4', '+11', '+6', '+6')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('paladin', 20, '+20/+15/+10/+5', '+12', '+6', '+6', ARRAY['Smite evil 5/day'], '+20/+15/+10/+5', '+12', '+6', '+6')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_features (class_slug, name, level, description, name_en, description_en)
            VALUES ('paladin', 'Aura of good', 1, 'Descripción pendiente.', 'Aura of good', 'Pending description.')
            ON CONFLICT (class_slug, name) DO NOTHING;
            

            INSERT INTO class_features (class_slug, name, level, description, name_en, description_en)
            VALUES ('paladin', '_detect evil_', 1, 'Descripción pendiente.', '_detect evil_', 'Pending description.')
            ON CONFLICT (class_slug, name) DO NOTHING;
            

            INSERT INTO class_features (class_slug, name, level, description, name_en, description_en)
            VALUES ('paladin', 'smite evil 1/day', 1, 'Descripción pendiente.', 'smite evil 1/day', 'Pending description.')
            ON CONFLICT (class_slug, name) DO NOTHING;
            

            INSERT INTO class_features (class_slug, name, level, description, name_en, description_en)
            VALUES ('paladin', '_Remove disease_ 2/week', 9, 'Descripción pendiente.', '_Remove disease_ 2/week', 'Pending description.')
            ON CONFLICT (class_slug, name) DO NOTHING;
            

            INSERT INTO class_features (class_slug, name, level, description, name_en, description_en)
            VALUES ('paladin', '_Remove disease_ 3/week', 12, 'Descripción pendiente.', '_Remove disease_ 3/week', 'Pending description.')
            ON CONFLICT (class_slug, name) DO NOTHING;
            

            INSERT INTO class_features (class_slug, name, level, description, name_en, description_en)
            VALUES ('paladin', '_Remove disease_ 4/week', 15, 'Descripción pendiente.', '_Remove disease_ 4/week', 'Pending description.')
            ON CONFLICT (class_slug, name) DO NOTHING;
            

            INSERT INTO class_features (class_slug, name, level, description, name_en, description_en)
            VALUES ('paladin', 'smite evil 4/day', 15, 'Descripción pendiente.', 'smite evil 4/day', 'Pending description.')
            ON CONFLICT (class_slug, name) DO NOTHING;
            

            INSERT INTO class_features (class_slug, name, level, description, name_en, description_en)
            VALUES ('paladin', '_Remove disease_ 5/week', 18, 'Descripción pendiente.', '_Remove disease_ 5/week', 'Pending description.')
            ON CONFLICT (class_slug, name) DO NOTHING;
            

            INSERT INTO class_features (class_slug, name, level, description, name_en, description_en)
            VALUES ('paladin', 'Smite evil 5/day', 20, 'Descripción pendiente.', 'Smite evil 5/day', 'Pending description.')
            ON CONFLICT (class_slug, name) DO NOTHING;
            
COMMIT;
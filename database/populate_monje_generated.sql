-- Population script for MONK (monje)
BEGIN;

        UPDATE classes 
        SET hit_die = 8, dg = 8
        WHERE slug = 'monje';
        

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('monje', 1, '+0', '+2', '+2', '+2', ARRAY['Bonus feat', 'flurry of blows'], '+0', '+2', '+2', '+2')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('monje', 2, '+1', '+3', '+3', '+3', ARRAY['Bonus feat', 'evasion'], '+1', '+3', '+3', '+3')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('monje', 3, '+2', '+3', '+3', '+3', ARRAY['Still mind +0/+0 1d6 +0 +10 ft.'], '+2', '+3', '+3', '+3')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('monje', 4, '+3', '+4', '+4', '+4', ARRAY['_Ki_ strike (magic)', 'slow fall'], '+3', '+4', '+4', '+4')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('monje', 5, '+3', '+4', '+4', '+4', ARRAY['Purity of body +2/+2 1d8 +1 +10 ft.'], '+3', '+4', '+4', '+4')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('monje', 6, '+4', '+5', '+5', '+5', ARRAY['Bonus feat', 'slow fall'], '+4', '+5', '+5', '+5')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('monje', 7, '+5', '+5', '+5', '+5', ARRAY['Wholeness of body +4/+4 1d8 +1 +20 ft.'], '+5', '+5', '+5', '+5')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('monje', 8, '+6/+1', '+6', '+6', '+6', ARRAY['Slow fall'], '+6/+1', '+6', '+6', '+6')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('monje', 9, '+6/+1', '+6', '+6', '+6', ARRAY['Improved evasion +6/+6/+1 1d10 +1 +30 ft.'], '+6/+1', '+6', '+6', '+6')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('monje', 10, '+7/+2', '+7', '+7', '+7', ARRAY['_Ki_ strike (lawful)', 'slow fall'], '+7/+2', '+7', '+7', '+7')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('monje', 11, '+8/+3', '+7', '+7', '+7', ARRAY['Diamond body', 'greater flurry +8/+8/+8/+3 1d10 +2 +30 ft.'], '+8/+3', '+7', '+7', '+7')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('monje', 12, '+9/+4', '+8', '+8', '+8', ARRAY['Abundant step', 'slow fall'], '+9/+4', '+8', '+8', '+8')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('monje', 13, '+9/+4', '+8', '+8', '+8', ARRAY['Diamond soul +9/+9/+9/+4 2d6 +2 +40 ft.'], '+9/+4', '+8', '+8', '+8')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('monje', 14, '+10/+5', '+9', '+9', '+9', ARRAY['Slow fall'], '+10/+5', '+9', '+9', '+9')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('monje', 15, '+11/+6/+1', '+9', '+9', '+9', ARRAY['Quivering palm +11/+11/+11/+6/+1 2d6 +3 +50 ft.'], '+11/+6/+1', '+9', '+9', '+9')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('monje', 16, '+12/+7/+2', '+10', '+10', '+10', ARRAY['_Ki_ strike (adamantine)', '+12/+12/+12/+7/+2 2d8 +3 +50 ft.'], '+12/+7/+2', '+10', '+10', '+10')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('monje', 17, '+12/+7/+2', '+10', '+10', '+10', ARRAY['Timeless body', '+12/+12/+12/+7/+2 2d8 +3 +50 ft.'], '+12/+7/+2', '+10', '+10', '+10')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('monje', 18, '+13/+8/+3', '+11', '+11', '+11', ARRAY['Slow fall'], '+13/+8/+3', '+11', '+11', '+11')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('monje', 19, '+14/+9/+4', '+11', '+11', '+11', ARRAY['Empty body +14/+14/+14/+9/+4 2d8 +3 +60 ft.'], '+14/+9/+4', '+11', '+11', '+11')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('monje', 20, '+15/+10/+5', '+12', '+12', '+12', ARRAY['Perfect self', '+15/+15/+15/+10/+5 2d10 +4 +60 ft.'], '+15/+10/+5', '+12', '+12', '+12')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_features (class_slug, name, level, description, name_en, description_en)
            VALUES ('monje', 'Bonus feat', 1, 'Descripción pendiente.', 'Bonus feat', 'Pending description.')
            ON CONFLICT (class_slug, name) DO NOTHING;
            

            INSERT INTO class_features (class_slug, name, level, description, name_en, description_en)
            VALUES ('monje', 'flurry of blows', 1, 'Descripción pendiente.', 'flurry of blows', 'Pending description.')
            ON CONFLICT (class_slug, name) DO NOTHING;
            

            INSERT INTO class_features (class_slug, name, level, description, name_en, description_en)
            VALUES ('monje', 'evasion', 2, 'Descripción pendiente.', 'evasion', 'Pending description.')
            ON CONFLICT (class_slug, name) DO NOTHING;
            

            INSERT INTO class_features (class_slug, name, level, description, name_en, description_en)
            VALUES ('monje', 'Still mind +0/+0 1d6 +0 +10 ft.', 3, 'Descripción pendiente.', 'Still mind +0/+0 1d6 +0 +10 ft.', 'Pending description.')
            ON CONFLICT (class_slug, name) DO NOTHING;
            

            INSERT INTO class_features (class_slug, name, level, description, name_en, description_en)
            VALUES ('monje', '_Ki_ strike (magic)', 4, 'Descripción pendiente.', '_Ki_ strike (magic)', 'Pending description.')
            ON CONFLICT (class_slug, name) DO NOTHING;
            

            INSERT INTO class_features (class_slug, name, level, description, name_en, description_en)
            VALUES ('monje', 'slow fall', 4, 'Descripción pendiente.', 'slow fall', 'Pending description.')
            ON CONFLICT (class_slug, name) DO NOTHING;
            

            INSERT INTO class_features (class_slug, name, level, description, name_en, description_en)
            VALUES ('monje', 'Purity of body +2/+2 1d8 +1 +10 ft.', 5, 'Descripción pendiente.', 'Purity of body +2/+2 1d8 +1 +10 ft.', 'Pending description.')
            ON CONFLICT (class_slug, name) DO NOTHING;
            

            INSERT INTO class_features (class_slug, name, level, description, name_en, description_en)
            VALUES ('monje', 'Wholeness of body +4/+4 1d8 +1 +20 ft.', 7, 'Descripción pendiente.', 'Wholeness of body +4/+4 1d8 +1 +20 ft.', 'Pending description.')
            ON CONFLICT (class_slug, name) DO NOTHING;
            

            INSERT INTO class_features (class_slug, name, level, description, name_en, description_en)
            VALUES ('monje', 'Slow fall', 8, 'Descripción pendiente.', 'Slow fall', 'Pending description.')
            ON CONFLICT (class_slug, name) DO NOTHING;
            

            INSERT INTO class_features (class_slug, name, level, description, name_en, description_en)
            VALUES ('monje', 'Improved evasion +6/+6/+1 1d10 +1 +30 ft.', 9, 'Descripción pendiente.', 'Improved evasion +6/+6/+1 1d10 +1 +30 ft.', 'Pending description.')
            ON CONFLICT (class_slug, name) DO NOTHING;
            

            INSERT INTO class_features (class_slug, name, level, description, name_en, description_en)
            VALUES ('monje', '_Ki_ strike (lawful)', 10, 'Descripción pendiente.', '_Ki_ strike (lawful)', 'Pending description.')
            ON CONFLICT (class_slug, name) DO NOTHING;
            

            INSERT INTO class_features (class_slug, name, level, description, name_en, description_en)
            VALUES ('monje', 'Diamond body', 11, 'Descripción pendiente.', 'Diamond body', 'Pending description.')
            ON CONFLICT (class_slug, name) DO NOTHING;
            

            INSERT INTO class_features (class_slug, name, level, description, name_en, description_en)
            VALUES ('monje', 'greater flurry +8/+8/+8/+3 1d10 +2 +30 ft.', 11, 'Descripción pendiente.', 'greater flurry +8/+8/+8/+3 1d10 +2 +30 ft.', 'Pending description.')
            ON CONFLICT (class_slug, name) DO NOTHING;
            

            INSERT INTO class_features (class_slug, name, level, description, name_en, description_en)
            VALUES ('monje', 'Abundant step', 12, 'Descripción pendiente.', 'Abundant step', 'Pending description.')
            ON CONFLICT (class_slug, name) DO NOTHING;
            

            INSERT INTO class_features (class_slug, name, level, description, name_en, description_en)
            VALUES ('monje', 'Diamond soul +9/+9/+9/+4 2d6 +2 +40 ft.', 13, 'Descripción pendiente.', 'Diamond soul +9/+9/+9/+4 2d6 +2 +40 ft.', 'Pending description.')
            ON CONFLICT (class_slug, name) DO NOTHING;
            

            INSERT INTO class_features (class_slug, name, level, description, name_en, description_en)
            VALUES ('monje', 'Quivering palm +11/+11/+11/+6/+1 2d6 +3 +50 ft.', 15, 'Descripción pendiente.', 'Quivering palm +11/+11/+11/+6/+1 2d6 +3 +50 ft.', 'Pending description.')
            ON CONFLICT (class_slug, name) DO NOTHING;
            

            INSERT INTO class_features (class_slug, name, level, description, name_en, description_en)
            VALUES ('monje', '_Ki_ strike (adamantine)', 16, 'Descripción pendiente.', '_Ki_ strike (adamantine)', 'Pending description.')
            ON CONFLICT (class_slug, name) DO NOTHING;
            

            INSERT INTO class_features (class_slug, name, level, description, name_en, description_en)
            VALUES ('monje', '+12/+12/+12/+7/+2 2d8 +3 +50 ft.', 16, 'Descripción pendiente.', '+12/+12/+12/+7/+2 2d8 +3 +50 ft.', 'Pending description.')
            ON CONFLICT (class_slug, name) DO NOTHING;
            

            INSERT INTO class_features (class_slug, name, level, description, name_en, description_en)
            VALUES ('monje', 'Timeless body', 17, 'Descripción pendiente.', 'Timeless body', 'Pending description.')
            ON CONFLICT (class_slug, name) DO NOTHING;
            

            INSERT INTO class_features (class_slug, name, level, description, name_en, description_en)
            VALUES ('monje', 'Empty body +14/+14/+14/+9/+4 2d8 +3 +60 ft.', 19, 'Descripción pendiente.', 'Empty body +14/+14/+14/+9/+4 2d8 +3 +60 ft.', 'Pending description.')
            ON CONFLICT (class_slug, name) DO NOTHING;
            

            INSERT INTO class_features (class_slug, name, level, description, name_en, description_en)
            VALUES ('monje', 'Perfect self', 20, 'Descripción pendiente.', 'Perfect self', 'Pending description.')
            ON CONFLICT (class_slug, name) DO NOTHING;
            

            INSERT INTO class_features (class_slug, name, level, description, name_en, description_en)
            VALUES ('monje', '+15/+15/+15/+10/+5 2d10 +4 +60 ft.', 20, 'Descripción pendiente.', '+15/+15/+15/+10/+5 2d10 +4 +60 ft.', 'Pending description.')
            ON CONFLICT (class_slug, name) DO NOTHING;
            
COMMIT;
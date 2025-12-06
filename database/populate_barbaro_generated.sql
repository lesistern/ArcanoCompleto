-- Population script for BARBARIAN (barbaro)
BEGIN;

        UPDATE classes 
        SET hit_die = 12, dg = 12
        WHERE slug = 'barbaro';
        

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('barbaro', 1, '+1', '+2', '+0', '+0', ARRAY['Fast movement', 'illiteracy', 'rage 1/day'], '+1', '+2', '+0', '+0')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('barbaro', 2, '+2', '+3', '+0', '+0', ARRAY['Uncanny dodge'], '+2', '+3', '+0', '+0')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('barbaro', 3, '+3', '+3', '+1', '+1', ARRAY['Trap sense +1'], '+3', '+3', '+1', '+1')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('barbaro', 4, '+4', '+4', '+1', '+1', ARRAY['Rage 2/day'], '+4', '+4', '+1', '+1')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('barbaro', 5, '+5', '+4', '+1', '+1', ARRAY['Improved uncanny dodge'], '+5', '+4', '+1', '+1')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('barbaro', 6, '+6', '/+1', '+5', '+2', ARRAY['+2 Trap sense +2'], '+6', '/+1', '+5', '+2')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('barbaro', 7, '+7/+2', '+5', '+2', '+2', ARRAY['Damage reduction 1/—'], '+7/+2', '+5', '+2', '+2')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('barbaro', 8, '+8/+3', '+6', '+2', '+2', ARRAY['Rage 3/day'], '+8/+3', '+6', '+2', '+2')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('barbaro', 9, '+9/+4', '+6', '+3', '+3', ARRAY['Trap sense +3'], '+9/+4', '+6', '+3', '+3')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('barbaro', 10, '+10/+5', '+7', '+3', '+3', ARRAY['Damage reduction 2/—'], '+10/+5', '+7', '+3', '+3')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('barbaro', 11, '+11/+6/+1', '+7', '+3', '+3', ARRAY['Greater rage'], '+11/+6/+1', '+7', '+3', '+3')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('barbaro', 12, '+12/', '+7/', '+2', '+8', ARRAY['+4 +4 Rage 4/day', 'trap sense +4'], '+12/', '+7/', '+2', '+8')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('barbaro', 13, '+13/+8/+3', '+8', '+4', '+4', ARRAY['Damage reduction 3/—'], '+13/+8/+3', '+8', '+4', '+4')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('barbaro', 14, '+14/+9/+4', '+9', '+4', '+4', ARRAY['Indomitable will'], '+14/+9/+4', '+9', '+4', '+4')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('barbaro', 15, '+15/+10/+5', '+9', '+5', '+5', ARRAY['Trap sense +5'], '+15/+10/+5', '+9', '+5', '+5')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('barbaro', 16, '+16/+11/+6/+1', '+10', '+5', '+5', ARRAY['Damage reduction 4/—', 'rage 5/day'], '+16/+11/+6/+1', '+10', '+5', '+5')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('barbaro', 17, '+17/+12/+7/+2', '+10', '+5', '+5', ARRAY['Tireless rage'], '+17/+12/+7/+2', '+10', '+5', '+5')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('barbaro', 18, '+18/', '+13/', '+8/', '+3', ARRAY['+11 +6 +6 Trap sense +6'], '+18/', '+13/', '+8/', '+3')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('barbaro', 19, '+19/+14/+9/+4', '+11', '+6', '+6', ARRAY['Damage reduction 5/—'], '+19/+14/+9/+4', '+11', '+6', '+6')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('barbaro', 20, '+20/+15/+10/+5', '+12', '+6', '+6', ARRAY['Mighty rage', 'rage 6/day'], '+20/+15/+10/+5', '+12', '+6', '+6')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_features (class_slug, name, level, description, name_en, description_en)
            VALUES ('barbaro', 'Fast movement', 1, 'Descripción pendiente.', 'Fast movement', 'Pending description.')
            ON CONFLICT (class_slug, name) DO NOTHING;
            

            INSERT INTO class_features (class_slug, name, level, description, name_en, description_en)
            VALUES ('barbaro', 'illiteracy', 1, 'Descripción pendiente.', 'illiteracy', 'Pending description.')
            ON CONFLICT (class_slug, name) DO NOTHING;
            

            INSERT INTO class_features (class_slug, name, level, description, name_en, description_en)
            VALUES ('barbaro', 'rage 1/day', 1, 'Descripción pendiente.', 'rage 1/day', 'Pending description.')
            ON CONFLICT (class_slug, name) DO NOTHING;
            

            INSERT INTO class_features (class_slug, name, level, description, name_en, description_en)
            VALUES ('barbaro', 'Uncanny dodge', 2, 'Descripción pendiente.', 'Uncanny dodge', 'Pending description.')
            ON CONFLICT (class_slug, name) DO NOTHING;
            

            INSERT INTO class_features (class_slug, name, level, description, name_en, description_en)
            VALUES ('barbaro', 'Trap sense +1', 3, 'Descripción pendiente.', 'Trap sense +1', 'Pending description.')
            ON CONFLICT (class_slug, name) DO NOTHING;
            

            INSERT INTO class_features (class_slug, name, level, description, name_en, description_en)
            VALUES ('barbaro', 'Rage 2/day', 4, 'Descripción pendiente.', 'Rage 2/day', 'Pending description.')
            ON CONFLICT (class_slug, name) DO NOTHING;
            

            INSERT INTO class_features (class_slug, name, level, description, name_en, description_en)
            VALUES ('barbaro', 'Improved uncanny dodge', 5, 'Descripción pendiente.', 'Improved uncanny dodge', 'Pending description.')
            ON CONFLICT (class_slug, name) DO NOTHING;
            

            INSERT INTO class_features (class_slug, name, level, description, name_en, description_en)
            VALUES ('barbaro', '+2 Trap sense +2', 6, 'Descripción pendiente.', '+2 Trap sense +2', 'Pending description.')
            ON CONFLICT (class_slug, name) DO NOTHING;
            

            INSERT INTO class_features (class_slug, name, level, description, name_en, description_en)
            VALUES ('barbaro', 'Damage reduction 1/—', 7, 'Descripción pendiente.', 'Damage reduction 1/—', 'Pending description.')
            ON CONFLICT (class_slug, name) DO NOTHING;
            

            INSERT INTO class_features (class_slug, name, level, description, name_en, description_en)
            VALUES ('barbaro', 'Rage 3/day', 8, 'Descripción pendiente.', 'Rage 3/day', 'Pending description.')
            ON CONFLICT (class_slug, name) DO NOTHING;
            

            INSERT INTO class_features (class_slug, name, level, description, name_en, description_en)
            VALUES ('barbaro', 'Trap sense +3', 9, 'Descripción pendiente.', 'Trap sense +3', 'Pending description.')
            ON CONFLICT (class_slug, name) DO NOTHING;
            

            INSERT INTO class_features (class_slug, name, level, description, name_en, description_en)
            VALUES ('barbaro', 'Damage reduction 2/—', 10, 'Descripción pendiente.', 'Damage reduction 2/—', 'Pending description.')
            ON CONFLICT (class_slug, name) DO NOTHING;
            

            INSERT INTO class_features (class_slug, name, level, description, name_en, description_en)
            VALUES ('barbaro', 'Greater rage', 11, 'Descripción pendiente.', 'Greater rage', 'Pending description.')
            ON CONFLICT (class_slug, name) DO NOTHING;
            

            INSERT INTO class_features (class_slug, name, level, description, name_en, description_en)
            VALUES ('barbaro', '+4 +4 Rage 4/day', 12, 'Descripción pendiente.', '+4 +4 Rage 4/day', 'Pending description.')
            ON CONFLICT (class_slug, name) DO NOTHING;
            

            INSERT INTO class_features (class_slug, name, level, description, name_en, description_en)
            VALUES ('barbaro', 'trap sense +4', 12, 'Descripción pendiente.', 'trap sense +4', 'Pending description.')
            ON CONFLICT (class_slug, name) DO NOTHING;
            

            INSERT INTO class_features (class_slug, name, level, description, name_en, description_en)
            VALUES ('barbaro', 'Damage reduction 3/—', 13, 'Descripción pendiente.', 'Damage reduction 3/—', 'Pending description.')
            ON CONFLICT (class_slug, name) DO NOTHING;
            

            INSERT INTO class_features (class_slug, name, level, description, name_en, description_en)
            VALUES ('barbaro', 'Indomitable will', 14, 'Descripción pendiente.', 'Indomitable will', 'Pending description.')
            ON CONFLICT (class_slug, name) DO NOTHING;
            

            INSERT INTO class_features (class_slug, name, level, description, name_en, description_en)
            VALUES ('barbaro', 'Trap sense +5', 15, 'Descripción pendiente.', 'Trap sense +5', 'Pending description.')
            ON CONFLICT (class_slug, name) DO NOTHING;
            

            INSERT INTO class_features (class_slug, name, level, description, name_en, description_en)
            VALUES ('barbaro', 'Damage reduction 4/—', 16, 'Descripción pendiente.', 'Damage reduction 4/—', 'Pending description.')
            ON CONFLICT (class_slug, name) DO NOTHING;
            

            INSERT INTO class_features (class_slug, name, level, description, name_en, description_en)
            VALUES ('barbaro', 'rage 5/day', 16, 'Descripción pendiente.', 'rage 5/day', 'Pending description.')
            ON CONFLICT (class_slug, name) DO NOTHING;
            

            INSERT INTO class_features (class_slug, name, level, description, name_en, description_en)
            VALUES ('barbaro', 'Tireless rage', 17, 'Descripción pendiente.', 'Tireless rage', 'Pending description.')
            ON CONFLICT (class_slug, name) DO NOTHING;
            

            INSERT INTO class_features (class_slug, name, level, description, name_en, description_en)
            VALUES ('barbaro', '+11 +6 +6 Trap sense +6', 18, 'Descripción pendiente.', '+11 +6 +6 Trap sense +6', 'Pending description.')
            ON CONFLICT (class_slug, name) DO NOTHING;
            

            INSERT INTO class_features (class_slug, name, level, description, name_en, description_en)
            VALUES ('barbaro', 'Damage reduction 5/—', 19, 'Descripción pendiente.', 'Damage reduction 5/—', 'Pending description.')
            ON CONFLICT (class_slug, name) DO NOTHING;
            

            INSERT INTO class_features (class_slug, name, level, description, name_en, description_en)
            VALUES ('barbaro', 'Mighty rage', 20, 'Descripción pendiente.', 'Mighty rage', 'Pending description.')
            ON CONFLICT (class_slug, name) DO NOTHING;
            

            INSERT INTO class_features (class_slug, name, level, description, name_en, description_en)
            VALUES ('barbaro', 'rage 6/day', 20, 'Descripción pendiente.', 'rage 6/day', 'Pending description.')
            ON CONFLICT (class_slug, name) DO NOTHING;
            
COMMIT;
SELECT id, slug FROM classes WHERE slug = 'barbarian';

SELECT * FROM class_fluff WHERE class_id = (SELECT id FROM classes WHERE slug = 'barbarian');

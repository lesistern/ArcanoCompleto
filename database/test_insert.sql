INSERT INTO classes (slug, name_en, name_es, hit_die) VALUES ('test-class', 'Test Class', 'Clase de Prueba', 10);
SELECT slug, name_en, name_es, hit_die FROM classes WHERE slug = 'test-class';
DELETE FROM classes WHERE slug = 'test-class';

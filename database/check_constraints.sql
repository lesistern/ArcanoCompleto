SELECT tc.table_name, kcu.column_name, tc.constraint_name
FROM information_schema.table_constraints tc
JOIN information_schema.key_column_usage kcu
ON tc.constraint_name = kcu.constraint_name
WHERE tc.table_name IN ('class_progression', 'class_features', 'starting_packages')
AND tc.constraint_type = 'UNIQUE';

import json
import os

json_path = r"D:\CalabozosYDragones\dnd-compendium\scripts\output\extracted_classes.json"

with open(json_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

barbarian_data = data.get("BARBARIAN", {})
table = barbarian_data.get("progression_table_raw", [])

print(f"Barbarian Table Length: {len(table)}")
if len(table) > 0:
    print("First 3 rows:")
    for row in table[:3]:
        print(row)
else:
    print("Barbarian table is empty.")

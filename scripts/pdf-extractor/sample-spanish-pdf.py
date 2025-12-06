#!/usr/bin/env python3
"""
Muestra el texto de páginas del PDF español para entender el formato
"""

import pdfplumber

pdf_path = r"D:\CalabozosYDragones\PDF\Libros PDF\Jugador\D&D 3.5 - Manual del Jugador español.pdf"

print("Muestreando páginas del PDF...")
print("=" * 80)

with pdfplumber.open(pdf_path) as pdf:
    total_pages = len(pdf.pages)
    print(f"Total de páginas: {total_pages}\n")

    # Probar diferentes rangos para encontrar los hechizos
    test_pages = [200, 210, 220, 230, 240, 250, 260, 270]

    for page_num in test_pages:
        if page_num >= total_pages:
            continue

        print(f"\n{'='*80}")
        print(f"PÁGINA {page_num}")
        print('='*80)

        page = pdf.pages[page_num]
        text = page.extract_text()

        if text:
            # Mostrar primeras 50 líneas
            lines = text.split('\n')[:50]
            for i, line in enumerate(lines, 1):
                print(f"{i:3}. {line}")
        else:
            print("(No se pudo extraer texto)")

        # Solo mostrar las primeras 2 páginas para no saturar
        if page_num >= 210:
            break

#!/bin/bash

# Script para limpiar archivos innecesarios del repositorio

echo "🧹 Limpieza de Repositorio"
echo "=========================="
echo ""

# Función para preguntar confirmación
confirm() {
    read -p "$1 (y/n): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        return 1
    fi
    return 0
}

# 1. Actualizar .gitignore
if [ -f ".gitignore.recommended" ]; then
    echo "📝 Actualizando .gitignore..."
    cp .gitignore.recommended .gitignore
    echo "✅ .gitignore actualizado"
else
    echo "⚠️  .gitignore.recommended no encontrado"
fi

# 2. Eliminar directorios de output del tracking
echo ""
echo "🗑️  Eliminando directorios de output del tracking..."

if confirm "¿Eliminar scripts/output/ y scripts/scraper/output/ del repo?"; then
    git rm --cached -r scripts/output/ 2>/dev/null && echo "  ✅ scripts/output/ removido" || echo "  ⚠️  scripts/output/ no trackeado"
    git rm --cached -r scripts/scraper/output/ 2>/dev/null && echo "  ✅ scripts/scraper/output/ removido" || echo "  ⚠️  scripts/scraper/output/ no trackeado"
else
    echo "  ⏭️  Saltado"
fi

# 3. Eliminar archivos de test
echo ""
echo "🧪 Eliminando archivos de test..."

if confirm "¿Eliminar src/app/test-db/ y src/app/api/test-supabase/?"; then
    git rm --cached -r src/app/test-db/ 2>/dev/null && echo "  ✅ test-db/ removido" || echo "  ⚠️  test-db/ no existe"
    git rm --cached -r src/app/api/test-supabase/ 2>/dev/null && echo "  ✅ test-supabase/ removido" || echo "  ⚠️  test-supabase/ no existe"
else
    echo "  ⏭️  Saltado"
fi

# 4. Reportar archivos grandes restantes
echo ""
echo "📊 Archivos más grandes en el repo:"
git ls-files | xargs du -b 2>/dev/null | sort -rn | head -10 | awk '{printf "  %8.1f KB  %s\n", $1/1024, $2}'

# 5. Mostrar estado
echo ""
echo "📋 Estado actual:"
git status --short

echo ""
echo "✅ Limpieza completada"
echo ""
echo "🚀 Próximos pasos:"
echo "  1. Revisa los cambios: git status"
echo "  2. Commit: git commit -m 'chore: Remove generated files from tracking'"
echo "  3. Push: git push"

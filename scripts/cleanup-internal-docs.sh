#!/bin/bash

# ==============================================================================
# Script para Limpiar Documentación Interna del Repositorio
# ==============================================================================
# Este script elimina archivos .md de desarrollo interno del tracking de Git,
# pero los mantiene localmente para referencia.
# ==============================================================================

echo "=============================================================================="
echo "  LIMPIEZA DE DOCUMENTACIÓN INTERNA"
echo "=============================================================================="
echo ""

# Archivos de documentación interna que deben removerse del repo
INTERNAL_DOCS=(
  # Setup y Configuración
  "BETA_TESTERS_SETUP.md"
  "CONFIGURACION_AUTH_PROVIDERS.md"
  "DEPLOY_VERCEL.md"
  "SUPABASE_SETUP.md"
  "SUPABASE_FEATURES_APLICABLES.md"

  # Instrucciones y Guías internas
  "APLICAR_OPTIMIZACIONES.md"
  "INSTRUCCIONES_MIGRACION_CLASES.md"
  "GUIA_PROGRESION_CLASES.md"
  "GUIA_USO_I18N.md"

  # Completados (sesiones de trabajo)
  "FASE2_COMPLETADA.md"
  "FASE3_COMPLETADA.md"
  "FRONTEND_I18N_COMPLETADO.md"
  "OPTIMIZACION_COMPLETADA.md"
  "OPTIMIZACIONES_IMPLEMENTADAS.md"
  "SISTEMA_AUTH_COMPLETADO.md"
  "SISTEMA_FEEDBACK_COMPLETADO.md"
  "TRADUCCIONES_OFICIALES_COMPLETADO.md"

  # Planes y tracking interno
  "implementacion_plan.md"
  "PLAN_EJECUCION_SQL.md"
  "PROXIMOS_PASOS.md"
  "WORKFLOW.md"

  # Troubleshooting y fixes
  "TROUBLESHOOTING_DB.md"
  "SOLUCION_ERROR_PROGRESION.md"
  "GITIGNORE_AUDIT.md"

  # Reviews y análisis técnicos
  "SPELLS_SQL_REVIEW.md"
  "SCHEMA_IMPROVEMENTS.md"
  "optimizaciondb.md"

  # Resúmenes de sesiones
  "RESUMEN_SESION_2025-11-14_MULTIIDIOMA.md"

  # Documentación de sistemas (muy técnica para usuarios)
  "CLASES_PLAYER_HANDBOOK.md"
  "D20SRD_ESTRUCTURA_COMPLETA.md"
  "EXTENSIONES_SUPABASE.md"
  "SISTEMA_AUTENTICACION.md"
  "SISTEMA_EXPERIENCIA.md"
  "SISTEMA_FEEDBACK.md"
  "SISTEMA_MULTIIDIOMA.md"
  "SISTEMA_TRADUCCIONES_COLABORATIVO.md"
  "VERCEL_OPTIMIZATIONS_PLAN.md"
)

# Archivos que DEBEN QUEDARSE (documentación pública)
echo "📌 Archivos que permanecerán en el repositorio:"
echo "   - README.md (documentación principal)"
echo "   - SECURITY.md (política de seguridad)"
echo "   - claude.md (instrucciones del proyecto)"
echo "   - DND35_LIBROS_DISPONIBLES.md (catálogo de libros)"
echo "   - DND35_SRD_ESTRUCTURA.md (estructura del SRD)"
echo "   - PERFORMANCE_OPTIMIZATIONS.md (optimizaciones)"
echo ""

# Contar archivos a remover
echo "🗑️  Archivos de documentación interna a remover del tracking:"
echo "   Total: ${#INTERNAL_DOCS[@]} archivos"
echo ""

# Mostrar lista de archivos
for doc in "${INTERNAL_DOCS[@]}"; do
  if [ -f "$doc" ]; then
    size=$(du -h "$doc" | cut -f1)
    echo "   - $doc ($size)"
  fi
done

echo ""
echo "=============================================================================="
read -p "¿Continuar con la limpieza? (s/N): " -n 1 -r
echo ""
echo "=============================================================================="

if [[ ! $REPLY =~ ^[Ss]$ ]]; then
  echo "❌ Operación cancelada"
  exit 1
fi

echo ""
echo "🔧 Removiendo archivos del tracking de Git..."
echo ""

# Remover archivos del tracking
removed_count=0
for doc in "${INTERNAL_DOCS[@]}"; do
  if [ -f "$doc" ]; then
    git rm --cached "$doc" 2>/dev/null
    if [ $? -eq 0 ]; then
      echo "   ✓ Removido: $doc"
      ((removed_count++))
    fi
  fi
done

echo ""
echo "=============================================================================="
echo "✅ Limpieza completada"
echo ""
echo "📊 Resumen:"
echo "   - Archivos removidos del tracking: $removed_count"
echo "   - Los archivos permanecen localmente en tu sistema"
echo "   - No serán incluidos en futuros commits"
echo ""
echo "📝 Próximo paso:"
echo "   git commit -m \"docs: Remove internal development documentation from repo\""
echo "   git push"
echo "=============================================================================="

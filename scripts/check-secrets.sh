#!/bin/bash

# Script para verificar que no haya información sensible antes de commit

echo "🔍 Verificando información sensible..."

# Buscar archivos .env que no sean .example
if git diff --cached --name-only | grep -E "^\.env$|^\.env\.local$"; then
  echo "❌ ERROR: Intentando commitear archivo .env"
  echo "   Archivos encontrados:"
  git diff --cached --name-only | grep -E "^\.env"
  echo ""
  echo "   Acción: Remueve estos archivos del staging"
  echo "   git reset HEAD .env.local"
  exit 1
fi

# Buscar posibles credenciales en diff
SUSPICIOUS=$(git diff --cached | grep -i "supabase_url.*http.*supabase\.co" | grep -v "YOUR_PROJECT_ID" | grep -v "your-project")
if [ ! -z "$SUSPICIOUS" ]; then
  echo "⚠️  ADVERTENCIA: Posible URL real de Supabase detectada"
  echo "$SUSPICIOUS"
  echo ""
  echo "   ¿Estás seguro que quieres commitear esto?"
  echo "   Usa placeholders como: YOUR_PROJECT_ID.supabase.co"
  exit 1
fi

# Buscar API keys sospechosas
API_KEYS=$(git diff --cached | grep -iE "anon.*key.*ey[A-Za-z0-9]{20,}|service.*role.*key.*ey[A-Za-z0-9]{20,}")
if [ ! -z "$API_KEYS" ]; then
  echo "❌ ERROR: Posible API key real detectada"
  echo "   NO commitees API keys reales"
  echo "   Usa placeholders como: your_anon_key_here"
  exit 1
fi

echo "✅ No se detectó información sensible"
exit 0

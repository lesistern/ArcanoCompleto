-- ============================================================================
-- CONFIGURACIÓN DE STORAGE BUCKETS PARA COMPENDIO D&D
-- ============================================================================
-- Este script configura 3 buckets de almacenamiento en Supabase:
-- 1. avatars - Avatares de usuarios (públicos)
-- 2. icons - Iconos de clases, razas, items (públicos)
-- 3. monsters - Imágenes de monstruos (públicos)
-- ============================================================================

-- ============================================================================
-- 1. BUCKET: AVATARS (Avatares de usuarios)
-- ============================================================================

-- Crear bucket para avatares
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'avatars',
  'avatars',
  true, -- Público (cualquiera puede ver)
  2097152, -- 2 MB límite
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 2097152,
  allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

-- Política: Cualquiera puede VER avatares
CREATE POLICY "Avatars are publicly accessible"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'avatars');

-- Política: Solo usuarios autenticados pueden SUBIR su propio avatar
CREATE POLICY "Users can upload their own avatar"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'avatars' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Política: Solo usuarios autenticados pueden ACTUALIZAR su propio avatar
CREATE POLICY "Users can update their own avatar"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'avatars' AND
  (storage.foldername(name))[1] = auth.uid()::text
)
WITH CHECK (
  bucket_id = 'avatars' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Política: Solo usuarios autenticados pueden ELIMINAR su propio avatar
CREATE POLICY "Users can delete their own avatar"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'avatars' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- ============================================================================
-- 2. BUCKET: ICONS (Iconos de clases, razas, items)
-- ============================================================================

-- Crear bucket para iconos
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'icons',
  'icons',
  true, -- Público (cualquiera puede ver)
  1048576, -- 1 MB límite
  ARRAY['image/svg+xml', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 1048576,
  allowed_mime_types = ARRAY['image/svg+xml', 'image/png', 'image/webp'];

-- Política: Cualquiera puede VER iconos
CREATE POLICY "Icons are publicly accessible"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'icons');

-- Política: Solo admins pueden SUBIR iconos
CREATE POLICY "Only admins can upload icons"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'icons' AND
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid()
    AND tier_code IN ('admin', 'mod')
  )
);

-- Política: Solo admins pueden ACTUALIZAR iconos
CREATE POLICY "Only admins can update icons"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'icons' AND
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid()
    AND tier_code IN ('admin', 'mod')
  )
)
WITH CHECK (
  bucket_id = 'icons' AND
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid()
    AND tier_code IN ('admin', 'mod')
  )
);

-- Política: Solo admins pueden ELIMINAR iconos
CREATE POLICY "Only admins can delete icons"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'icons' AND
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid()
    AND tier_code IN ('admin', 'mod')
  )
);

-- ============================================================================
-- 3. BUCKET: MONSTERS (Imágenes de monstruos)
-- ============================================================================

-- Crear bucket para imágenes de monstruos
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'monsters',
  'monsters',
  true, -- Público (cualquiera puede ver)
  5242880, -- 5 MB límite
  ARRAY['image/jpeg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 5242880,
  allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp'];

-- Política: Cualquiera puede VER imágenes de monstruos
CREATE POLICY "Monster images are publicly accessible"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'monsters');

-- Política: Solo admins pueden SUBIR imágenes de monstruos
CREATE POLICY "Only admins can upload monster images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'monsters' AND
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid()
    AND tier_code IN ('admin', 'mod')
  )
);

-- Política: Solo admins pueden ACTUALIZAR imágenes de monstruos
CREATE POLICY "Only admins can update monster images"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'monsters' AND
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid()
    AND tier_code IN ('admin', 'mod')
  )
)
WITH CHECK (
  bucket_id = 'monsters' AND
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid()
    AND tier_code IN ('admin', 'mod')
  )
);

-- Política: Solo admins pueden ELIMINAR imágenes de monstruos
CREATE POLICY "Only admins can delete monster images"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'monsters' AND
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid()
    AND tier_code IN ('admin', 'mod')
  )
);

-- ============================================================================
-- VERIFICACIÓN
-- ============================================================================

DO $$
BEGIN
  RAISE NOTICE '';
  RAISE NOTICE '✅ Storage Buckets Configurados:';
  RAISE NOTICE '   - avatars (2 MB, imágenes, usuarios pueden subir el suyo)';
  RAISE NOTICE '   - icons (1 MB, SVG/PNG/WebP, solo admins)';
  RAISE NOTICE '   - monsters (5 MB, imágenes, solo admins)';
  RAISE NOTICE '';
  RAISE NOTICE '📁 Estructura de Carpetas Recomendada:';
  RAISE NOTICE '   avatars/';
  RAISE NOTICE '     └── {user_id}/';
  RAISE NOTICE '         └── avatar.{jpg|png|webp}';
  RAISE NOTICE '   icons/';
  RAISE NOTICE '     ├── classes/';
  RAISE NOTICE '     ├── races/';
  RAISE NOTICE '     ├── items/';
  RAISE NOTICE '     └── spells/';
  RAISE NOTICE '   monsters/';
  RAISE NOTICE '     └── {monster_slug}/';
  RAISE NOTICE '         └── {monster_name}.{jpg|png|webp}';
  RAISE NOTICE '';
  RAISE NOTICE '🔐 Políticas RLS Aplicadas:';
  RAISE NOTICE '   - Todos los buckets son PÚBLICOS (lectura)';
  RAISE NOTICE '   - Avatars: usuarios autenticados pueden subir/editar/borrar el suyo';
  RAISE NOTICE '   - Icons y Monsters: solo admins/mods pueden subir/editar/borrar';
  RAISE NOTICE '';
END $$;

-- ============================================================================
-- NOTAS DE USO
-- ============================================================================
--
-- AVATARS:
-- - Usuarios suben su avatar a: avatars/{user_id}/avatar.png
-- - Tamaño máximo: 2 MB
-- - Formatos: JPEG, PNG, WebP, GIF
--
-- ICONS:
-- - Admins suben iconos a: icons/classes/barbarian.svg
-- - Tamaño máximo: 1 MB
-- - Formatos: SVG (preferido), PNG, WebP
--
-- MONSTERS:
-- - Admins suben imágenes a: monsters/ancient-red-dragon/ancient-red-dragon.jpg
-- - Tamaño máximo: 5 MB
-- - Formatos: JPEG, PNG, WebP
--
-- ============================================================================
-- SIGUIENTE PASO: FRONTEND
-- ============================================================================
-- Ahora puedes usar estos buckets en tu frontend con el cliente de Supabase:
--
-- import { supabase } from '@/lib/supabase/client';
--
-- // Subir avatar
-- const { data, error } = await supabase.storage
--   .from('avatars')
--   .upload(`${userId}/avatar.png`, file);
--
-- // Obtener URL pública de avatar
-- const { data } = supabase.storage
--   .from('avatars')
--   .getPublicUrl(`${userId}/avatar.png`);
--
-- ============================================================================

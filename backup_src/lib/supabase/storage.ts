/**
 * Storage Helpers
 * Funciones para subir y gestionar archivos en Supabase Storage
 */

import { createClient } from './client';

// Types
export interface UploadResult {
  path: string;
  publicUrl: string;
}

export interface UploadError {
  message: string;
  statusCode?: number;
}

// ============================================================================
// AVATARS
// ============================================================================

/**
 * Sube un avatar de usuario
 * @param userId - ID del usuario
 * @param file - Archivo de imagen
 * @param options - Opciones de upload
 */
export async function uploadAvatar(
  userId: string,
  file: File,
  options: {
    onProgress?: (progress: number) => void;
    maxSize?: number; // En bytes, default: 2MB
  } = {}
): Promise<{ data: UploadResult | null; error: UploadError | null }> {
  const supabase = createClient();
  const maxSize = options.maxSize || 2 * 1024 * 1024; // 2 MB

  // Validar tamaño
  if (file.size > maxSize) {
    return {
      data: null,
      error: { message: `El archivo es demasiado grande. Máximo: ${maxSize / 1024 / 1024} MB` }
    };
  }

  // Validar tipo de archivo
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  if (!allowedTypes.includes(file.type)) {
    return {
      data: null,
      error: { message: 'Tipo de archivo no permitido. Usa JPEG, PNG, WebP o GIF' }
    };
  }

  // Generar nombre de archivo único
  const fileExt = file.name.split('.').pop();
  const filePath = `${userId}/avatar.${fileExt}`;

  // Subir archivo
  const { data, error } = await supabase.storage
    .from('avatars')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: true // Sobrescribir si ya existe
    });

  if (error) {
    return {
      data: null,
      error: { message: error.message }
    };
  }

  // Obtener URL pública
  const { data: urlData } = supabase.storage
    .from('avatars')
    .getPublicUrl(filePath);

  return {
    data: {
      path: data.path,
      publicUrl: urlData.publicUrl
    },
    error: null
  };
}

/**
 * Obtiene la URL pública de un avatar
 * @param userId - ID del usuario
 */
export function getAvatarUrl(userId: string): string {
  const supabase = createClient();
  const { data } = supabase.storage
    .from('avatars')
    .getPublicUrl(`${userId}/avatar.png`);

  return data.publicUrl;
}

/**
 * Elimina el avatar de un usuario
 * @param userId - ID del usuario
 */
export async function deleteAvatar(
  userId: string
): Promise<{ data: boolean | null; error: UploadError | null }> {
  const supabase = createClient();

  // Listar todos los archivos del usuario
  const { data: files, error: listError } = await supabase.storage
    .from('avatars')
    .list(userId);

  if (listError) {
    return {
      data: null,
      error: { message: listError.message }
    };
  }

  if (!files || files.length === 0) {
    return { data: true, error: null }; // No hay archivos para eliminar
  }

  // Eliminar todos los archivos del usuario
  const filePaths = files.map(f => `${userId}/${f.name}`);
  const { error: deleteError } = await supabase.storage
    .from('avatars')
    .remove(filePaths);

  if (deleteError) {
    return {
      data: null,
      error: { message: deleteError.message }
    };
  }

  return { data: true, error: null };
}

// ============================================================================
// ICONS (Solo admins)
// ============================================================================

/**
 * Sube un icono (solo admins)
 * @param category - Categoría (classes, races, items, spells)
 * @param name - Nombre del archivo
 * @param file - Archivo de imagen
 */
export async function uploadIcon(
  category: 'classes' | 'races' | 'items' | 'spells',
  name: string,
  file: File
): Promise<{ data: UploadResult | null; error: UploadError | null }> {
  const supabase = createClient();

  // Validar tamaño (1 MB)
  if (file.size > 1024 * 1024) {
    return {
      data: null,
      error: { message: 'El archivo es demasiado grande. Máximo: 1 MB' }
    };
  }

  // Validar tipo de archivo
  const allowedTypes = ['image/svg+xml', 'image/png', 'image/webp'];
  if (!allowedTypes.includes(file.type)) {
    return {
      data: null,
      error: { message: 'Tipo de archivo no permitido. Usa SVG, PNG o WebP' }
    };
  }

  const fileExt = file.name.split('.').pop();
  const filePath = `${category}/${name}.${fileExt}`;

  const { data, error } = await supabase.storage
    .from('icons')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: true
    });

  if (error) {
    return {
      data: null,
      error: { message: error.message }
    };
  }

  const { data: urlData } = supabase.storage
    .from('icons')
    .getPublicUrl(filePath);

  return {
    data: {
      path: data.path,
      publicUrl: urlData.publicUrl
    },
    error: null
  };
}

/**
 * Obtiene la URL pública de un icono
 * @param category - Categoría
 * @param name - Nombre del archivo (sin extensión)
 * @param ext - Extensión del archivo (default: svg)
 */
export function getIconUrl(
  category: 'classes' | 'races' | 'items' | 'spells',
  name: string,
  ext: string = 'svg'
): string {
  const supabase = createClient();
  const { data } = supabase.storage
    .from('icons')
    .getPublicUrl(`${category}/${name}.${ext}`);

  return data.publicUrl;
}

// ============================================================================
// MONSTERS (Solo admins)
// ============================================================================

/**
 * Sube una imagen de monstruo (solo admins)
 * @param monsterSlug - Slug del monstruo
 * @param file - Archivo de imagen
 */
export async function uploadMonsterImage(
  monsterSlug: string,
  file: File
): Promise<{ data: UploadResult | null; error: UploadError | null }> {
  const supabase = createClient();

  // Validar tamaño (5 MB)
  if (file.size > 5 * 1024 * 1024) {
    return {
      data: null,
      error: { message: 'El archivo es demasiado grande. Máximo: 5 MB' }
    };
  }

  // Validar tipo de archivo
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
  if (!allowedTypes.includes(file.type)) {
    return {
      data: null,
      error: { message: 'Tipo de archivo no permitido. Usa JPEG, PNG o WebP' }
    };
  }

  const fileExt = file.name.split('.').pop();
  const filePath = `${monsterSlug}/${monsterSlug}.${fileExt}`;

  const { data, error } = await supabase.storage
    .from('monsters')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: true
    });

  if (error) {
    return {
      data: null,
      error: { message: error.message }
    };
  }

  const { data: urlData } = supabase.storage
    .from('monsters')
    .getPublicUrl(filePath);

  return {
    data: {
      path: data.path,
      publicUrl: urlData.publicUrl
    },
    error: null
  };
}

/**
 * Obtiene la URL pública de una imagen de monstruo
 * @param monsterSlug - Slug del monstruo
 * @param ext - Extensión del archivo (default: jpg)
 */
export function getMonsterImageUrl(
  monsterSlug: string,
  ext: string = 'jpg'
): string {
  const supabase = createClient();
  const { data } = supabase.storage
    .from('monsters')
    .getPublicUrl(`${monsterSlug}/${monsterSlug}.${ext}`);

  return data.publicUrl;
}

// ============================================================================
// UTILITIES
// ============================================================================

/**
 * Convierte bytes a formato legible
 * @param bytes - Tamaño en bytes
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Valida si un archivo es una imagen
 * @param file - Archivo a validar
 */
export function isImageFile(file: File): boolean {
  return file.type.startsWith('image/');
}

/**
 * Redimensiona una imagen antes de subirla (client-side)
 * @param file - Archivo de imagen
 * @param maxWidth - Ancho máximo
 * @param maxHeight - Alto máximo
 * @param quality - Calidad JPEG (0-1)
 */
export async function resizeImage(
  file: File,
  maxWidth: number = 800,
  maxHeight: number = 800,
  quality: number = 0.8
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      let width = img.width;
      let height = img.height;

      // Calcular nuevas dimensiones manteniendo aspect ratio
      if (width > height) {
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('No se pudo obtener el contexto del canvas'));
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Error al convertir canvas a blob'));
          }
        },
        file.type,
        quality
      );
    };

    img.onerror = () => reject(new Error('Error al cargar la imagen'));
    img.src = URL.createObjectURL(file);
  });
}

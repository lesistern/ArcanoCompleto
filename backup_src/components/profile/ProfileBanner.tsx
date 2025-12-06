// src/components/profile/ProfileBanner.tsx
'use client';

import { useState } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

interface ProfileBannerProps {
  userId: string;
  bannerUrl?: string | null;
  displayName?: string | null;
  editable?: boolean;
  onBannerUpdate?: (newUrl: string | null) => void;
}

export function ProfileBanner({
  userId,
  bannerUrl,
  displayName,
  editable = false,
  onBannerUpdate
}: ProfileBannerProps) {
  const [uploading, setUploading] = useState(false);
  const [currentBanner, setCurrentBanner] = useState(bannerUrl);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validar tamaño (máx 5MB para banners)
    if (file.size > 5 * 1024 * 1024) {
      alert('El banner debe ser menor a 5MB');
      return;
    }

    // Validar tipo
    if (!file.type.startsWith('image/')) {
      alert('Solo se permiten imágenes');
      return;
    }

    // Validar dimensiones (recomendado: ratio 3:1, mínimo 1200x400)
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = async () => {
      URL.revokeObjectURL(objectUrl);

      // Verificar ratio aproximado (3:1 con margen de error)
      const ratio = img.width / img.height;
      if (ratio < 2.5 || ratio > 3.5) {
        alert('El banner debe tener un ratio aproximado de 3:1 (ej: 1500x500 px)');
        return;
      }

      // Verificar dimensiones mínimas
      if (img.width < 1200 || img.height < 400) {
        alert('El banner debe tener al menos 1200x400 px');
        return;
      }

      // Si pasa las validaciones, subir
      await uploadBanner(file);
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      alert('Error al cargar la imagen');
    };

    img.src = objectUrl;
  };

  const uploadBanner = async (file: File) => {
    try {
      setUploading(true);
      const supabase = createClient();

      // Generar nombre de archivo único
      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}/banner.${fileExt}`;

      // Subir a storage
      const { data, error } = await supabase.storage
        .from('banners')
        .upload(fileName, file, {
          upsert: true, // Sobrescribir si ya existe
          contentType: file.type
        });

      if (error) throw error;

      // Obtener URL pública
      const { data: { publicUrl } } = supabase.storage
        .from('banners')
        .getPublicUrl(fileName);

      // Actualizar en base de datos
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ banner_url: publicUrl })
        .eq('id', userId);

      if (updateError) throw updateError;

      // Actualizar estado local
      setCurrentBanner(publicUrl);
      setPreviewUrl(null);

      // Callback opcional para notificar al padre
      onBannerUpdate?.(publicUrl);

      alert('Banner actualizado exitosamente');
    } catch (error) {
      console.error('Error uploading banner:', error);
      alert('Error al subir el banner. Por favor, intenta de nuevo.');
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveBanner = async () => {
    if (!confirm('¿Estás seguro de eliminar tu banner?')) return;

    try {
      setUploading(true);
      const supabase = createClient();

      // Eliminar de storage (solo si existe)
      if (currentBanner) {
        const fileName = currentBanner.split('/').pop();
        if (fileName) {
          await supabase.storage
            .from('banners')
            .remove([`${userId}/${fileName}`]);
        }
      }

      // Actualizar en base de datos
      const { error } = await supabase
        .from('profiles')
        .update({ banner_url: null })
        .eq('id', userId);

      if (error) throw error;

      // Actualizar estado local
      setCurrentBanner(null);
      setPreviewUrl(null);
      onBannerUpdate?.(null);

      alert('Banner eliminado exitosamente');
    } catch (error) {
      console.error('Error removing banner:', error);
      alert('Error al eliminar el banner');
    } finally {
      setUploading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Mostrar preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Procesar upload
    handleUpload(e);
  };

  return (
    <div className="relative w-full h-48 md:h-64 bg-gradient-to-br from-dungeon-800 to-dungeon-900 rounded-lg overflow-hidden">
      {/* Banner actual o placeholder */}
      {currentBanner || previewUrl ? (
        <img
          src={previewUrl || currentBanner || ''}
          alt={`Banner de ${displayName || 'usuario'}`}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center text-dungeon-500">
            <ImageIcon className="h-16 w-16 mx-auto mb-2" />
            <p className="text-sm">Sin banner personalizado</p>
            {editable && (
              <p className="text-xs mt-1">Sube una imagen (ratio 3:1)</p>
            )}
          </div>
        </div>
      )}

      {/* Overlay de carga */}
      {uploading && (
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-400 mx-auto mb-2"></div>
            <p className="text-white text-sm">Subiendo banner...</p>
          </div>
        </div>
      )}

      {/* Controles (solo si es editable) */}
      {editable && (
        <div className="absolute top-4 right-4 flex gap-2">
          {/* Botón para subir */}
          <label
            className="cursor-pointer bg-dungeon-900/80 hover:bg-dungeon-800/80 text-white p-2 rounded-lg transition-colors backdrop-blur-sm"
            title="Subir banner"
          >
            <Upload className="h-5 w-5" />
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              disabled={uploading}
              className="hidden"
            />
          </label>

          {/* Botón para eliminar (solo si hay banner) */}
          {currentBanner && (
            <button
              onClick={handleRemoveBanner}
              disabled={uploading}
              className="bg-red-900/80 hover:bg-red-800/80 text-white p-2 rounded-lg transition-colors backdrop-blur-sm"
              title="Eliminar banner"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
      )}

      {/* Información de dimensiones recomendadas */}
      {editable && !currentBanner && (
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-dungeon-900/80 backdrop-blur-sm rounded-lg p-3 text-xs text-dungeon-300">
            <p className="font-semibold text-gold-400 mb-1">Dimensiones recomendadas:</p>
            <ul className="list-disc list-inside space-y-0.5">
              <li>Tamaño: 1500x500 px (ratio 3:1)</li>
              <li>Mínimo: 1200x400 px</li>
              <li>Máximo: 5MB</li>
              <li>Formatos: JPG, PNG, WebP</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

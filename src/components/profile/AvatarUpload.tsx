'use client';

import { useState, useRef } from 'react';
import { Upload, Loader2, X, Camera } from 'lucide-react';
import { uploadAvatar, deleteAvatar, resizeImage, formatFileSize } from '@/lib/supabase/storage';
import { useAuth } from '@/hooks/useAuth';
import Image from 'next/image';

interface AvatarUploadProps {
  currentAvatarUrl?: string;
  onUploadSuccess?: (url: string) => void;
  onUploadError?: (error: string) => void;
}

export default function AvatarUpload({
  currentAvatarUrl,
  onUploadSuccess,
  onUploadError
}: AvatarUploadProps) {
  const { user, profile } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validar tipo
    if (!file.type.startsWith('image/')) {
      onUploadError?.('Por favor selecciona una imagen válida');
      return;
    }

    // Validar tamaño (2 MB)
    if (file.size > 2 * 1024 * 1024) {
      onUploadError?.(`El archivo es demasiado grande (${formatFileSize(file.size)}). Máximo: 2 MB`);
      return;
    }

    setSelectedFile(file);

    // Crear preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!selectedFile || !user) return;

    setUploading(true);

    try {
      // Redimensionar imagen a 400x400 para optimizar
      const resizedBlob = await resizeImage(selectedFile, 400, 400, 0.9);
      const resizedFile = new File([resizedBlob], selectedFile.name, { type: selectedFile.type });

      // Subir avatar
      const { data, error } = await uploadAvatar(user.id, resizedFile);

      if (error) {
        onUploadError?.(error.message);
        return;
      }

      if (data) {
        onUploadSuccess?.(data.publicUrl);
        setPreview(null);
        setSelectedFile(null);

        // Recargar la página para actualizar el avatar en el header
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error: any) {
      onUploadError?.(error.message || 'Error al subir el avatar');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async () => {
    if (!user) return;
    if (!confirm('¿Estás seguro de que quieres eliminar tu avatar?')) return;

    setDeleting(true);

    try {
      const { error } = await deleteAvatar(user.id);

      if (error) {
        onUploadError?.(error.message);
        return;
      }

      onUploadSuccess?.('');

      // Recargar la página para actualizar el avatar en el header
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error: any) {
      onUploadError?.(error.message || 'Error al eliminar el avatar');
    } finally {
      setDeleting(false);
    }
  };

  const handleCancel = () => {
    setPreview(null);
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      {/* Current Avatar Display */}
      <div className="flex items-center gap-6">
        <div className="relative group">
          {currentAvatarUrl || preview ? (
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-dungeon-700">
              <Image
                src={preview || currentAvatarUrl || ''}
                alt="Avatar"
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center border-4 border-dungeon-700">
              <span className="text-4xl font-bold text-white">
                {profile?.display_name?.[0]?.toUpperCase() || 'U'}
              </span>
            </div>
          )}
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-semibold text-dungeon-100 mb-2">
            Avatar del Perfil
          </h3>
          <p className="text-sm text-dungeon-400 mb-4">
            JPG, PNG, WebP o GIF. Máximo 2 MB.
          </p>

          {!preview ? (
            <div className="flex gap-3">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 bg-gold-500 hover:bg-gold-600 text-dungeon-950 font-medium rounded-lg transition-colors flex items-center gap-2"
              >
                <Camera className="w-4 h-4" />
                Cambiar Avatar
              </button>

              {currentAvatarUrl && (
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 font-medium rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {deleting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Eliminando...
                    </>
                  ) : (
                    <>
                      <X className="w-4 h-4" />
                      Eliminar
                    </>
                  )}
                </button>
              )}
            </div>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={handleUpload}
                disabled={uploading}
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {uploading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Subiendo...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    Subir
                  </>
                )}
              </button>

              <button
                onClick={handleCancel}
                disabled={uploading}
                className="px-4 py-2 bg-dungeon-700 hover:bg-dungeon-600 text-dungeon-200 font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancelar
              </button>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
      </div>

      {/* File Info */}
      {selectedFile && (
        <div className="bg-dungeon-800 border border-dungeon-700 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <Camera className="w-5 h-5 text-gold-400" />
            <div className="flex-1">
              <p className="text-sm font-medium text-dungeon-100">
                {selectedFile.name}
              </p>
              <p className="text-xs text-dungeon-400">
                {formatFileSize(selectedFile.size)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

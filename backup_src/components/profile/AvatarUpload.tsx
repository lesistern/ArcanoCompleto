'use client';

import { useState, useRef, useEffect } from 'react';
import { Upload, Loader2, X, Camera } from 'lucide-react';
import { uploadAvatar, deleteAvatar, formatFileSize } from '@/lib/supabase/storage';
import { useAuth } from '@/hooks/useAuth';
import NextImage from 'next/image';

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
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [cropZoom, setCropZoom] = useState(1);
  const [cropOffsetX, setCropOffsetX] = useState(0);
  const [cropOffsetY, setCropOffsetY] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragStartRef = useRef<{ x: number; y: number; startX: number; startY: number } | null>(null);

  // Garantiza que si hay preview, abrimos el modal (fallback ante renders intermedios)
  useEffect(() => {
    if (preview) {
      setCropModalOpen(true);
    }
  }, [preview]);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      onUploadError?.('Por favor selecciona una imagen válida');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      onUploadError?.(`El archivo es demasiado grande (${formatFileSize(file.size)}). Máximo: 2 MB`);
      return;
    }

    setSelectedFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
      setCropModalOpen(true);
    };
    reader.readAsDataURL(file);
  };

  const cropToSquareWebp = async (
    file: File,
    zoom = 1.2,
    offsetX = 0,
    offsetY = 0
  ): Promise<{ blob: Blob; dataUrl: string }> =>
    new Promise((resolve, reject) => {
      const img = document.createElement('img');
      img.onload = () => {
        const size = 600;
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('No se pudo preparar el canvas'));
          return;
        }
        const zoomFactor = Math.max(1, zoom);
        const cropWidth = img.width / zoomFactor;
        const cropHeight = img.height / zoomFactor;
        const maxOffsetX = (img.width - cropWidth) / 2;
        const maxOffsetY = (img.height - cropHeight) / 2;
        const clampedOffsetX = Math.max(-1, Math.min(1, offsetX));
        const clampedOffsetY = Math.max(-1, Math.min(1, offsetY));
        const sx = (img.width - cropWidth) / 2 + clampedOffsetX * maxOffsetX;
        const sy = (img.height - cropHeight) / 2 + clampedOffsetY * maxOffsetY;
        ctx.drawImage(img, sx, sy, cropWidth, cropHeight, 0, 0, size, size);
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('No se pudo crear la imagen WebP'));
              return;
            }
            const dataUrl = canvas.toDataURL('image/webp', 0.85);
            resolve({ blob, dataUrl });
          },
          'image/webp',
          0.85
        );
      };
      img.onerror = () => reject(new Error('No se pudo cargar la imagen para recortar'));
      img.src = URL.createObjectURL(file);
    });

  const handleUpload = async () => {
    if (!selectedFile || !user) return;

    setUploading(true);

    try {
      const { blob, dataUrl } = await cropToSquareWebp(selectedFile, cropZoom, cropOffsetX, cropOffsetY);
      const webpFile = new File([blob], 'avatar.webp', { type: 'image/webp' });

      const { data, error } = await uploadAvatar(user.id, webpFile);

      if (error) {
        onUploadError?.(error.message);
        return;
      }

      if (data) {
        onUploadSuccess?.(data.publicUrl);
        setPreview(dataUrl);
        setSelectedFile(null);
        setCropModalOpen(false);

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
    setCropModalOpen(false);
    setCropZoom(1.2);
    setCropOffsetX(0);
    setCropOffsetY(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-6">
        <div className="relative group">
          {currentAvatarUrl || preview ? (
            <div className="relative w-32 h-32 rounded-md overflow-hidden border-4 border-dungeon-700">
              <NextImage
                src={preview || currentAvatarUrl || ''}
                alt="Avatar"
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-32 h-32 rounded-md bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center border-4 border-dungeon-700">
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
                type="button"
                onClick={() => {
                  if (fileInputRef.current) fileInputRef.current.value = '';
                  fileInputRef.current?.click();
                }}
                className="px-4 py-2 bg-gold-500 hover:bg-gold-600 text-dungeon-950 font-medium rounded-lg transition-colors flex items-center gap-2"
              >
                <Camera className="w-4 h-4" />
                Cambiar Avatar
              </button>

              {currentAvatarUrl && (
                <button
                  type="button"
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
                type="button"
                onClick={() => setCropModalOpen(true)}
                className="px-4 py-2 bg-dungeon-800 hover:bg-dungeon-700 text-dungeon-100 rounded-lg transition-colors flex items-center gap-2"
              >
                Ajustar recorte
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 bg-dungeon-800 hover:bg-dungeon-700 text-dungeon-100 rounded-lg transition-colors flex items-center gap-2"
              >
                Cancelar
              </button>
            </div>
          )}
        </div>
      </div>

      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileSelect}
      />

      {cropModalOpen && preview && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-dungeon-900 border border-gold-500 rounded-lg shadow-2xl w-full max-w-xl">
            <div className="p-4 border-b border-dungeon-700 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-gold-400" />
                <h3 className="text-dungeon-50 font-semibold">Recorta tu avatar</h3>
              </div>
              <button onClick={handleCancel} className="text-dungeon-400 hover:text-dungeon-100">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div className="flex justify-center">
                <div className="relative w-72 h-72 rounded-md overflow-hidden border border-dungeon-700 bg-dungeon-800">
                  <img
                    src={preview}
                    alt="Recorte"
                    className="absolute inset-0 w-full h-full object-contain cursor-grab active:cursor-grabbing select-none bg-dungeon-900"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      dragStartRef.current = {
                        x: e.clientX,
                        y: e.clientY,
                        startX: cropOffsetX,
                        startY: cropOffsetY,
                      };
                    }}
                    onMouseUp={() => {
                      dragStartRef.current = null;
                    }}
                    onMouseLeave={() => {
                      dragStartRef.current = null;
                    }}
                    onMouseMove={(e) => {
                      if (!dragStartRef.current) return;
                      const deltaX = e.clientX - dragStartRef.current.x;
                      const deltaY = e.clientY - dragStartRef.current.y;
                      const factor = 1 / 40; // velocidad reducida 50% (más control fino)
                      const nextX = Math.max(-1, Math.min(1, dragStartRef.current.startX + deltaX * factor));
                      const nextY = Math.max(-1, Math.min(1, dragStartRef.current.startY + deltaY * factor));
                      setCropOffsetX(nextX);
                      setCropOffsetY(nextY);
                    }}
                    style={{
                      transform: `translate(${cropOffsetX * 100}%, ${cropOffsetY * 100}%) scale(${cropZoom})`,
                      transformOrigin: 'center',
                    }}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-dungeon-300">Zoom</label>
                <input
                  type="range"
                  min={1}
                  max={3}
                  step={0.05}
                  value={cropZoom}
                  onChange={(e) => setCropZoom(parseFloat(e.target.value))}
                  className="w-full accent-gold-500"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 rounded-md border border-dungeon-700 text-dungeon-200 hover:bg-dungeon-800"
                  disabled={uploading}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleUpload}
                  disabled={uploading}
                  className="px-4 py-2 rounded-md bg-gold-500 hover:bg-gold-600 text-dungeon-950 font-semibold disabled:opacity-50"
                >
                  {uploading ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Guardando
                    </span>
                  ) : (
                    'Guardar recorte'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

'use client';

import { useState, useRef, useCallback } from 'react';
import { Loader2, X, Camera, ZoomIn, RotateCw, Shuffle, Check, Upload } from 'lucide-react';
import Cropper, { Area } from 'react-easy-crop';
import { uploadAvatar, deleteAvatar, formatFileSize } from '@/lib/supabase/storage';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import NextImage from 'next/image';
import { PROFILE_AVATARS, getRandomAvatar, ProfileAvatarOption } from '@/lib/data/profile-avatars';

interface AvatarUploadProps {
  currentAvatarUrl?: string;
  onUploadSuccess?: (url: string) => void;
  onUploadError?: (error: string) => void;
}

// Create cropped image from canvas
async function getCroppedImg(
  imageSrc: string,
  pixelCrop: Area,
  rotation = 0
): Promise<Blob> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('No 2d context');
  }

  const rotRad = getRadianAngle(rotation);

  // Calculate bounding box of the rotated image
  const { width: bBoxWidth, height: bBoxHeight } = rotateSize(
    image.width,
    image.height,
    rotation
  );

  // Set canvas size to match the bounding box
  canvas.width = bBoxWidth;
  canvas.height = bBoxHeight;

  // Translate canvas context to center of canvas
  ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
  ctx.rotate(rotRad);
  ctx.translate(-image.width / 2, -image.height / 2);

  // Draw rotated image
  ctx.drawImage(image, 0, 0);

  // Create output canvas for the cropped area
  const outputCanvas = document.createElement('canvas');
  const outputCtx = outputCanvas.getContext('2d');

  if (!outputCtx) {
    throw new Error('No 2d context');
  }

  // Set output size to 400x400 for avatar
  const outputSize = 400;
  outputCanvas.width = outputSize;
  outputCanvas.height = outputSize;

  // Draw the cropped image
  outputCtx.drawImage(
    canvas,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    outputSize,
    outputSize
  );

  // Convert to WebP blob
  return new Promise((resolve, reject) => {
    outputCanvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('Canvas is empty'));
        }
      },
      'image/webp',
      0.9
    );
  });
}

function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.src = url;
  });
}

function getRadianAngle(degreeValue: number) {
  return (degreeValue * Math.PI) / 180;
}

function rotateSize(width: number, height: number, rotation: number) {
  const rotRad = getRadianAngle(rotation);
  return {
    width: Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    height: Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
  };
}

export default function AvatarUpload({
  currentAvatarUrl,
  onUploadSuccess,
  onUploadError
}: AvatarUploadProps) {
  const { user, profile } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState<ProfileAvatarOption | null>(null);

  const onCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      onUploadError?.('Por favor selecciona una imagen válida');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      onUploadError?.(`El archivo es demasiado grande (${formatFileSize(file.size)}). Máximo: 5 MB`);
      return;
    }

    const reader = new FileReader();
    reader.addEventListener('load', () => {
      setImageSrc(reader.result as string);
    });
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!imageSrc || !croppedAreaPixels || !user) return;

    setUploading(true);
    const supabase = createClient();

    try {
      const croppedBlob = await getCroppedImg(imageSrc, croppedAreaPixels, rotation);
      const webpFile = new File([croppedBlob], 'avatar.webp', { type: 'image/webp' });

      console.log('📤 Subiendo avatar...', { size: webpFile.size, type: webpFile.type });

      const { data, error } = await uploadAvatar(user.id, webpFile);

      if (error) {
        console.error('❌ Error al subir avatar:', error);
        onUploadError?.(error.message);
        return;
      }

      if (data) {
        console.log('✅ Avatar subido a Storage:', data.publicUrl);

        // IMPORTANTE: Actualizar la URL del avatar en la tabla profiles
        const { error: updateError } = await supabase
          .from('profiles')
          .update({ avatar_url: data.publicUrl })
          .eq('id', user.id);

        if (updateError) {
          console.error('❌ Error al actualizar perfil:', updateError);
          onUploadError?.('Avatar subido pero error al guardar en perfil: ' + updateError.message);
          return;
        }

        console.log('✅ Perfil actualizado con nueva URL de avatar');
        onUploadSuccess?.(data.publicUrl);
        handleCancel();

        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error: any) {
      console.error('❌ Error inesperado:', error);
      onUploadError?.(error.message || 'Error al subir el avatar');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async () => {
    if (!user) return;
    if (!confirm('¿Estás seguro de que quieres eliminar tu avatar?')) return;

    setDeleting(true);
    const supabase = createClient();

    try {
      const { error } = await deleteAvatar(user.id);

      if (error) {
        onUploadError?.(error.message);
        return;
      }

      // Limpiar la URL del avatar en la tabla profiles
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: null })
        .eq('id', user.id);

      if (updateError) {
        console.error('❌ Error al limpiar avatar del perfil:', updateError);
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
    setImageSrc(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setRotation(0);
    setCroppedAreaPixels(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSelectDefaultAvatar = async () => {
    if (!selectedAvatar || !user) return;

    setUploading(true);
    const supabase = createClient();

    try {
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: selectedAvatar.path })
        .eq('id', user.id);

      if (updateError) throw updateError;

      onUploadSuccess?.(selectedAvatar.path);
      setShowAvatarPicker(false);
      setSelectedAvatar(null);

      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error: any) {
      console.error('Error selecting avatar:', error);
      onUploadError?.(error.message || 'Error al seleccionar avatar');
    } finally {
      setUploading(false);
    }
  };

  const handleRandomAvatar = () => {
    const random = getRandomAvatar();
    setSelectedAvatar(random);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-6">
        <div className="relative group">
          {currentAvatarUrl ? (
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-dungeon-700">
              <NextImage
                src={currentAvatarUrl}
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
            JPG, PNG, WebP o GIF. Máximo 5 MB. Se recortará a 400×400px.
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setShowAvatarPicker(true)}
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
        </div>
      </div>

      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileSelect}
      />

      {/* Crop Modal */}
      {imageSrc && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-dungeon-900 border border-gold-500/50 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-dungeon-700 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-gold-400" />
                <h3 className="text-dungeon-50 font-semibold">Recorta tu avatar</h3>
              </div>
              <button
                onClick={handleCancel}
                className="p-1 text-dungeon-400 hover:text-dungeon-100 hover:bg-dungeon-800 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Cropper Area */}
            <div className="relative h-80 bg-dungeon-950">
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                rotation={rotation}
                aspect={1}
                cropShape="round"
                showGrid={false}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onRotationChange={setRotation}
                onCropComplete={onCropComplete}
                classes={{
                  containerClassName: 'rounded-none',
                  cropAreaClassName: 'border-2 border-gold-400',
                }}
              />
            </div>

            {/* Controls */}
            <div className="p-4 space-y-4 bg-dungeon-800/50">
              {/* Zoom Control */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm text-dungeon-300">
                  <span className="flex items-center gap-2">
                    <ZoomIn className="w-4 h-4" />
                    Zoom
                  </span>
                  <span>{Math.round(zoom * 100)}%</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={3}
                  step={0.05}
                  value={zoom}
                  onChange={(e) => setZoom(parseFloat(e.target.value))}
                  className="w-full h-2 bg-dungeon-700 rounded-lg appearance-none cursor-pointer accent-gold-500"
                />
              </div>

              {/* Rotation Control */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm text-dungeon-300">
                  <span className="flex items-center gap-2">
                    <RotateCw className="w-4 h-4" />
                    Rotación
                  </span>
                  <span>{rotation}°</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={360}
                  step={1}
                  value={rotation}
                  onChange={(e) => setRotation(parseInt(e.target.value))}
                  className="w-full h-2 bg-dungeon-700 rounded-lg appearance-none cursor-pointer accent-gold-500"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2.5 rounded-lg border border-dungeon-600 text-dungeon-200 hover:bg-dungeon-700 transition-colors"
                  disabled={uploading}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleUpload}
                  disabled={uploading}
                  className="px-6 py-2.5 rounded-lg bg-gold-500 hover:bg-gold-600 text-dungeon-950 font-semibold disabled:opacity-50 transition-colors flex items-center gap-2"
                >
                  {uploading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Guardando...
                    </>
                  ) : (
                    'Guardar'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Avatar Picker Modal */}
      {showAvatarPicker && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-dungeon-900 border border-dungeon-700 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-dungeon-700">
              <h3 className="text-lg font-bold text-gold-400">Elige tu Avatar</h3>
              <button
                onClick={() => {
                  setShowAvatarPicker(false);
                  setSelectedAvatar(null);
                }}
                className="p-1 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-4 overflow-y-auto max-h-[60vh]">
              {/* Avatares predefinidos */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm text-gray-400">Avatares de Clase</p>
                  <button
                    onClick={handleRandomAvatar}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gold-400 bg-gold-500/10 hover:bg-gold-500/20 border border-gold-500/30 rounded-lg transition-colors"
                  >
                    <Shuffle className="w-3.5 h-3.5" />
                    Aleatorio
                  </button>
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                  {PROFILE_AVATARS.map((avatar) => (
                    <button
                      key={avatar.id}
                      onClick={() => setSelectedAvatar(avatar)}
                      className={`relative group/avatar flex flex-col items-center gap-1.5 p-2 rounded-lg border transition-all ${
                        selectedAvatar?.id === avatar.id
                          ? 'border-gold-500 bg-gold-500/20'
                          : 'border-dungeon-700 hover:border-dungeon-500 bg-dungeon-800/50'
                      }`}
                    >
                      <div className="relative">
                        <NextImage
                          src={avatar.path}
                          alt={avatar.name}
                          width={64}
                          height={64}
                          className="rounded-full object-cover"
                        />
                        {selectedAvatar?.id === avatar.id && (
                          <div className="absolute inset-0 flex items-center justify-center bg-gold-500/40 rounded-full">
                            <Check className="w-6 h-6 text-white" />
                          </div>
                        )}
                      </div>
                      <span className="text-xs text-gray-400 group-hover/avatar:text-gray-300 truncate w-full text-center">
                        {avatar.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Separador */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-dungeon-700" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-2 bg-dungeon-900 text-gray-500">o sube tu propia imagen</span>
                </div>
              </div>

              {/* Upload personalizado */}
              <div className="flex justify-center">
                <label className="flex flex-col items-center gap-2 p-6 border-2 border-dashed border-dungeon-600 hover:border-gold-500/50 rounded-xl cursor-pointer transition-colors">
                  <Upload className="w-8 h-8 text-gray-400" />
                  <span className="text-sm text-gray-400">Click para subir imagen personalizada</span>
                  <span className="text-xs text-gray-500">PNG, JPG o WebP (máx. 5MB)</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      handleFileSelect(e);
                      setShowAvatarPicker(false);
                    }}
                  />
                </label>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 p-4 border-t border-dungeon-700 bg-dungeon-800/50">
              <button
                onClick={() => {
                  setShowAvatarPicker(false);
                  setSelectedAvatar(null);
                }}
                className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleSelectDefaultAvatar}
                disabled={!selectedAvatar || uploading}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-dungeon-900 bg-gold-500 hover:bg-gold-400 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
              >
                {uploading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Guardando...
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    Confirmar
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

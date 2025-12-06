'use client';

import { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { X, Loader2, ImageIcon, AlertTriangle, Sparkles, Check, Upload, ZoomIn, RotateCw } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import Cropper, { Area } from 'react-easy-crop';

interface ProfileBannerUploadProps {
  currentBannerUrl: string | null;
  userId: string;
  onBannerUpdate: (newBannerUrl: string | null) => void;
}

const DEFAULT_BANNERS = [
  {
    id: 'dragon-mountain',
    url: '/banners/dragon-mountain.jpg',
    name: 'Montaña Dragón',
  },
  {
    id: 'dungeon-entrance',
    url: '/banners/dungeon-entrance.jpg',
    name: 'Entrada Mazmorra',
  },
  {
    id: 'magic-library',
    url: '/banners/magic-library.jpg',
    name: 'Biblioteca Mágica',
  },
  {
    id: 'forest-path',
    url: '/banners/forest-path.jpg',
    name: 'Sendero Bosque',
  },
  {
    id: 'castle-night',
    url: '/banners/castle-night.jpg',
    name: 'Castillo Nocturno',
  },
];

// Create cropped image from canvas - optimized for banners (1920x480 @ 16:4 aspect)
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

  // Set output size - banner dimensions (max 1920px width, 16:4 aspect ratio)
  const maxWidth = 1920;
  const aspectRatio = 4; // 16:4 = 4:1
  let outputWidth = Math.min(pixelCrop.width, maxWidth);
  let outputHeight = outputWidth / aspectRatio;

  // Ensure we maintain the crop proportions
  if (pixelCrop.width / pixelCrop.height > aspectRatio) {
    outputHeight = Math.min(pixelCrop.height, maxWidth / aspectRatio);
    outputWidth = outputHeight * aspectRatio;
  }

  outputCanvas.width = outputWidth;
  outputCanvas.height = outputHeight;

  // Draw the cropped image
  outputCtx.drawImage(
    canvas,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    outputWidth,
    outputHeight
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
      0.85
    );
  });
}

function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new window.Image();
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

export function ProfileBannerUpload({
  currentBannerUrl,
  userId,
  onBannerUpdate,
}: ProfileBannerUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [selectedDefaultBanner, setSelectedDefaultBanner] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Cropper states
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const supabase = createClient();

  const onCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file
    if (!file.type.startsWith('image/')) {
      setUploadError('Por favor selecciona una imagen válida');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setUploadError('La imagen no puede ser mayor a 10MB');
      return;
    }

    // Read file and show cropper
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      setImageSrc(reader.result as string);
    });
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!imageSrc || !croppedAreaPixels) return;

    setIsUploading(true);
    setUploadError(null);

    try {
      // Create cropped WebP blob
      const croppedBlob = await getCroppedImg(imageSrc, croppedAreaPixels, rotation);
      const webpFile = new File([croppedBlob], 'banner.webp', { type: 'image/webp' });
      const fileName = `${userId}-${Date.now()}.webp`;

      console.log('📤 Subiendo banner...', { size: webpFile.size, type: webpFile.type, fileName });

      // Upload to profile-banners bucket
      const { error: uploadError } = await supabase.storage
        .from('profile-banners')
        .upload(fileName, webpFile, {
          contentType: 'image/webp',
          cacheControl: '3600',
          upsert: true,
        });

      if (uploadError) {
        console.error('❌ Error al subir banner a Storage:', uploadError);
        throw uploadError;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('profile-banners')
        .getPublicUrl(fileName);

      console.log('✅ Banner subido a Storage:', publicUrl);

      // Update profile in database
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ banner_url: publicUrl })
        .eq('id', userId);

      if (updateError) {
        console.error('❌ Error al actualizar perfil con banner:', updateError);
        throw updateError;
      }

      console.log('✅ Perfil actualizado con nueva URL de banner');
      onBannerUpdate(publicUrl);
      handleCancel();
    } catch (err: any) {
      console.error('❌ Error inesperado en upload de banner:', err);
      setUploadError(err?.message || 'Error al subir la imagen');
    } finally {
      setIsUploading(false);
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

  const handleDefaultBannerSelect = async (bannerUrl: string) => {
    setSelectedDefaultBanner(bannerUrl);
    setUploadError(null);

    try {
      const { error } = await supabase
        .from('profiles')
        .update({ banner_url: bannerUrl })
        .eq('id', userId);

      if (error) throw error;

      onBannerUpdate(bannerUrl);
    } catch (err: any) {
      setUploadError(err?.message || 'Error al seleccionar el banner');
    } finally {
      setSelectedDefaultBanner(null);
    }
  };

  const handleRemoveBanner = async () => {
    setIsRemoving(true);
    setUploadError(null);

    try {
      const { error } = await supabase
        .from('profiles')
        .update({ banner_url: null })
        .eq('id', userId);

      if (error) throw error;

      onBannerUpdate(null);
    } catch (err: any) {
      setUploadError(err?.message || 'Error al eliminar el banner');
    } finally {
      setIsRemoving(false);
    }
  };

  const isCurrentBannerDefault = DEFAULT_BANNERS.some(b => b.url === currentBannerUrl);

  return (
    <div className="space-y-6">
      {/* Error */}
      {uploadError && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            <span>{uploadError}</span>
          </div>
          <button onClick={() => setUploadError(null)} className="p-1 hover:bg-red-500/20 rounded">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Current Banner Preview */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-blue-500/20 rounded-lg">
            <ImageIcon className="w-4 h-4 text-blue-400" />
          </div>
          <span className="text-sm font-medium text-dungeon-200">Banner Actual</span>
        </div>

        <div className="relative w-full h-40 rounded-xl overflow-hidden border border-dungeon-700 bg-dungeon-800/50">
          {currentBannerUrl ? (
            <>
              <Image
                src={currentBannerUrl}
                alt="Banner de perfil"
                fill
                className="object-cover"
              />
              <button
                onClick={handleRemoveBanner}
                disabled={isRemoving}
                className="absolute top-2 right-2 p-1.5 bg-dungeon-900/80 hover:bg-red-500/20 border border-dungeon-700 hover:border-red-500/40 rounded-lg transition-colors group"
                aria-label="Eliminar banner"
              >
                {isRemoving ? (
                  <Loader2 className="h-4 w-4 text-dungeon-400 animate-spin" />
                ) : (
                  <X className="h-4 w-4 text-dungeon-400 group-hover:text-red-400 transition-colors" />
                )}
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-dungeon-500">
              <ImageIcon className="h-10 w-10 mb-2" />
              <span className="text-xs">Sin banner</span>
            </div>
          )}
        </div>
      </div>

      {/* Upload Custom Banner */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-green-500/20 rounded-lg">
            <Upload className="w-4 h-4 text-green-400" />
          </div>
          <span className="text-sm font-medium text-dungeon-200">Subir Banner Personalizado</span>
        </div>

        <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-dungeon-700 hover:border-gold-500/50 rounded-xl cursor-pointer bg-dungeon-800/30 hover:bg-dungeon-800/50 transition-colors">
          <div className="flex flex-col items-center justify-center py-4">
            <Upload className="h-6 w-6 text-dungeon-500 mb-2" />
            <p className="text-sm text-dungeon-300">
              <span className="font-medium">Click para subir</span> o arrastra
            </p>
            <p className="text-xs text-dungeon-500 mt-1">JPG, PNG o WEBP (máx. 10MB)</p>
          </div>
          <input
            type="file"
            className="hidden"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileSelect}
          />
        </label>
      </div>

      {/* Default Banners */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-amber-500/20 rounded-lg">
            <Sparkles className="w-4 h-4 text-amber-400" />
          </div>
          <span className="text-sm font-medium text-dungeon-200">Banners Predeterminados</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {DEFAULT_BANNERS.map((banner) => {
            const isSelected = currentBannerUrl === banner.url;
            const isLoading = selectedDefaultBanner === banner.url;

            return (
              <button
                key={banner.id}
                onClick={() => handleDefaultBannerSelect(banner.url)}
                disabled={isLoading || isSelected}
                className={`group relative h-20 rounded-xl overflow-hidden border-2 transition-all ${
                  isSelected
                    ? 'border-gold-500 ring-2 ring-gold-500/30'
                    : 'border-dungeon-700 hover:border-dungeon-600'
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-dungeon-700 to-dungeon-800" />
                <div className="absolute inset-0 flex items-center justify-center">
                  {isLoading ? (
                    <Loader2 className="h-5 w-5 text-gold-400 animate-spin" />
                  ) : isSelected ? (
                    <div className="flex items-center gap-1.5">
                      <Check className="h-4 w-4 text-gold-400" />
                      <span className="text-xs font-medium text-gold-400">{banner.name}</span>
                    </div>
                  ) : (
                    <span className="text-xs font-medium text-dungeon-400 group-hover:text-dungeon-200 transition-colors">
                      {banner.name}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Info Box */}
      <div className="flex items-start gap-3 p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl">
        <div className="p-1.5 bg-blue-500/20 rounded-lg flex-shrink-0">
          <Sparkles className="w-4 h-4 text-blue-400" />
        </div>
        <div>
          <p className="text-sm text-blue-300 font-medium">Banner de perfil</p>
          <p className="text-xs text-dungeon-400 mt-0.5">
            El banner aparece en la parte superior de tu perfil público. Recomendamos imágenes panorámicas.
          </p>
        </div>
      </div>

      {/* Crop Modal */}
      {imageSrc && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-dungeon-900 border border-gold-500/50 rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-dungeon-700 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-gold-400" />
                <h3 className="text-dungeon-50 font-semibold">Recorta tu banner</h3>
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
                aspect={4}
                cropShape="rect"
                showGrid={true}
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
                  disabled={isUploading}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleUpload}
                  disabled={isUploading}
                  className="px-6 py-2.5 rounded-lg bg-gold-500 hover:bg-gold-600 text-dungeon-950 font-semibold disabled:opacity-50 transition-colors flex items-center gap-2"
                >
                  {isUploading ? (
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
    </div>
  );
}

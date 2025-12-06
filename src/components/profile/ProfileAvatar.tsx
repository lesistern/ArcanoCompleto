// src/components/profile/ProfileAvatar.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Upload, X, Check, Shuffle } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { PROFILE_AVATARS, getRandomAvatar, ProfileAvatarOption } from '@/lib/data/profile-avatars';

interface ProfileAvatarProps {
  userId: string;
  avatarUrl?: string | null;
  displayName?: string | null;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  editable?: boolean;
  onAvatarChange?: (newUrl: string) => void;
}

export function ProfileAvatar({
  userId,
  avatarUrl,
  displayName,
  size = 'md',
  editable = false,
  onAvatarChange
}: ProfileAvatarProps) {
  const [uploading, setUploading] = useState(false);
  const [currentAvatar, setCurrentAvatar] = useState(avatarUrl);
  const [showSelector, setShowSelector] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState<ProfileAvatarOption | null>(null);

  const sizeClasses = {
    sm: 'w-10 h-10 text-lg',
    md: 'w-16 h-16 text-2xl',
    lg: 'w-24 h-24 text-4xl',
    xl: 'w-32 h-32 text-5xl'
  };

  const pixelSizes = {
    sm: 40,
    md: 64,
    lg: 96,
    xl: 128
  };

  const updateAvatarInDB = async (newUrl: string) => {
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from('profiles')
        .update({ avatar_url: newUrl })
        .eq('id', userId);

      if (error) throw error;

      setCurrentAvatar(newUrl);
      onAvatarChange?.(newUrl);
      return true;
    } catch (error) {
      console.error('Error updating avatar:', error);
      return false;
    }
  };

  const handleSelectDefaultAvatar = async (avatar: ProfileAvatarOption) => {
    setSelectedAvatar(avatar);
  };

  const handleConfirmSelection = async () => {
    if (!selectedAvatar) return;

    setUploading(true);
    const success = await updateAvatarInDB(selectedAvatar.path);
    setUploading(false);

    if (success) {
      setShowSelector(false);
      setSelectedAvatar(null);
    } else {
      alert('Error al guardar el avatar. Intenta de nuevo.');
    }
  };

  const handleRandomAvatar = () => {
    const random = getRandomAvatar();
    setSelectedAvatar(random);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert('La imagen debe ser menor a 2MB');
      return;
    }

    if (!file.type.startsWith('image/')) {
      alert('Solo se permiten imágenes');
      return;
    }

    try {
      setUploading(true);
      const supabase = createClient();

      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}-${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);

      await updateAvatarInDB(publicUrl);
      setShowSelector(false);
    } catch (error) {
      console.error('Error uploading avatar:', error);
      alert('Error al subir la imagen. Intenta de nuevo.');
    } finally {
      setUploading(false);
    }
  };

  const initial = displayName?.charAt(0).toUpperCase() || 'U';

  return (
    <>
      <div className="relative group">
        {currentAvatar ? (
          <Image
            src={currentAvatar}
            alt={displayName || 'User avatar'}
            width={pixelSizes[size]}
            height={pixelSizes[size]}
            className={`${sizeClasses[size]} rounded-full object-cover border-2 border-gold-500/30`}
            loading={size === 'lg' || size === 'xl' ? 'eager' : 'lazy'}
          />
        ) : (
          <div className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-gold-900/40 to-dungeon-800 border-2 border-gold-500/30 flex items-center justify-center text-gold-400 font-bold`}>
            {initial}
          </div>
        )}

        {editable && (
          <button
            onClick={() => setShowSelector(true)}
            className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity"
          >
            <Upload className="w-6 h-6 text-white" />
          </button>
        )}
      </div>

      {/* Modal de selección de avatar */}
      {showSelector && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
          <div className="bg-dungeon-900 border border-dungeon-700 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-dungeon-700">
              <h3 className="text-lg font-bold text-gold-400">Elige tu Avatar</h3>
              <button
                onClick={() => {
                  setShowSelector(false);
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
                      onClick={() => handleSelectDefaultAvatar(avatar)}
                      className={`relative group/avatar flex flex-col items-center gap-1.5 p-2 rounded-lg border transition-all ${
                        selectedAvatar?.id === avatar.id
                          ? 'border-gold-500 bg-gold-500/20'
                          : 'border-dungeon-700 hover:border-dungeon-500 bg-dungeon-800/50'
                      }`}
                    >
                      <div className="relative">
                        <Image
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
                  <span className="text-sm text-gray-400">Click para subir</span>
                  <span className="text-xs text-gray-500">PNG, JPG o WebP (máx. 2MB)</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleUpload}
                    disabled={uploading}
                  />
                </label>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 p-4 border-t border-dungeon-700 bg-dungeon-800/50">
              <button
                onClick={() => {
                  setShowSelector(false);
                  setSelectedAvatar(null);
                }}
                className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmSelection}
                disabled={!selectedAvatar || uploading}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-dungeon-900 bg-gold-500 hover:bg-gold-400 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
              >
                {uploading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-dungeon-900 border-t-transparent" />
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
    </>
  );
}

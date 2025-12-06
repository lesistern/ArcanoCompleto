// src/components/profile/ProfileAvatar.tsx
'use client';

import { useState } from 'react';
import { Upload } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

interface ProfileAvatarProps {
  userId: string;
  avatarUrl?: string | null;
  displayName?: string | null;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  editable?: boolean;
}

export function ProfileAvatar({
  userId,
  avatarUrl,
  displayName,
  size = 'md',
  editable = false
}: ProfileAvatarProps) {
  const [uploading, setUploading] = useState(false);
  const [currentAvatar, setCurrentAvatar] = useState(avatarUrl);

  const sizes = {
    sm: 'w-10 h-10 text-lg',
    md: 'w-16 h-16 text-2xl',
    lg: 'w-24 h-24 text-4xl',
    xl: 'w-32 h-32 text-5xl'
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validar tamaño (máx 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert('La imagen debe ser menor a 2MB');
      return;
    }

    // Validar tipo
    if (!file.type.startsWith('image/')) {
      alert('Solo se permiten imágenes');
      return;
    }

    try {
      setUploading(true);
      const supabase = createClient();

      // Upload a Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}-${Date.now()}.${fileExt}`;
      const { data, error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) throw uploadError;

      // Obtener URL pública
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);

      // Actualizar perfil
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('id', userId);

      if (updateError) throw updateError;

      setCurrentAvatar(publicUrl);
    } catch (error) {
      console.error('Error uploading avatar:', error);
      alert('Error al subir la imagen. Intenta de nuevo.');
    } finally {
      setUploading(false);
    }
  };

  const initial = displayName?.charAt(0).toUpperCase() || 'U';

  return (
    <div className="relative group">
      {currentAvatar ? (
        <img
          src={currentAvatar}
          alt={displayName || 'User avatar'}
          className={`${sizes[size]} rounded-full object-cover border-2 border-gold-500/30`}
        />
      ) : (
        <div className={`${sizes[size]} rounded-full bg-gradient-to-br from-gold-900/40 to-dungeon-800 border-2 border-gold-500/30 flex items-center justify-center text-gold-400 font-bold`}>
          {initial}
        </div>
      )}

      {editable && (
        <label className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
          {uploading ? (
            <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent" />
          ) : (
            <Upload className="w-6 h-6 text-white" />
          )}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleUpload}
            disabled={uploading}
          />
        </label>
      )}
    </div>
  );
}

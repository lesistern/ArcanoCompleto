'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { User, MapPin, FileText, X, Sparkles, Camera } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import AvatarUpload from './AvatarUpload';
import { SaveStatusIndicator, SaveStatus } from '@/components/ui/SaveStatusIndicator';

interface ProfileInfoEditorProps {
  userId: string;
  currentData: {
    avatar_url: string | null;
    display_name: string | null;
    bio: string | null;
    location: string | null;
  };
  onUpdate: (data: Partial<ProfileInfoEditorProps['currentData']>) => void;
}

export function ProfileInfoEditor({
  userId,
  currentData,
  onUpdate,
}: ProfileInfoEditorProps) {
  const [displayName, setDisplayName] = useState(currentData.display_name || '');
  const [bio, setBio] = useState(currentData.bio || '');
  const [location, setLocation] = useState(currentData.location || '');
  const [error, setError] = useState<string | null>(null);

  // Save status per field
  const [saveStatus, setSaveStatus] = useState<Record<string, SaveStatus>>({
    display_name: 'idle',
    bio: 'idle',
    location: 'idle',
  });

  // Refs for debouncing
  const saveTimeouts = useRef<Record<string, NodeJS.Timeout>>({});

  const supabase = createClient();

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      Object.values(saveTimeouts.current).forEach(clearTimeout);
    };
  }, []);

  // Auto-save function with debouncing
  const autoSave = useCallback(async (field: string, value: string) => {
    // Clear existing timeout for this field
    if (saveTimeouts.current[field]) {
      clearTimeout(saveTimeouts.current[field]);
    }

    // Set saving status
    setSaveStatus(prev => ({ ...prev, [field]: 'saving' }));
    setError(null);

    // Debounce the save
    saveTimeouts.current[field] = setTimeout(async () => {
      try {
        const { error: updateError } = await supabase
          .from('profiles')
          .update({ [field]: value || null })
          .eq('id', userId);

        if (updateError) throw updateError;

        setSaveStatus(prev => ({ ...prev, [field]: 'saved' }));
        onUpdate({ [field]: value || null });

        // Reset to idle after 2 seconds
        setTimeout(() => {
          setSaveStatus(prev => ({ ...prev, [field]: 'idle' }));
        }, 2000);
      } catch (err: any) {
        console.error(`Error saving ${field}:`, err);
        setSaveStatus(prev => ({ ...prev, [field]: 'error' }));
        setError(err.message || 'Error al guardar');
      }
    }, 800);
  }, [userId, supabase, onUpdate]);

  const handleAvatarSuccess = (url: string) => {
    onUpdate({ avatar_url: url || null });
  };

  const handleAvatarError = (errorMsg: string) => {
    setError(errorMsg);
  };

  return (
    <div className="space-y-8">
      {/* Error Global */}
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm flex items-center justify-between">
          <span>{error}</span>
          <button onClick={() => setError(null)} className="p-1 hover:bg-red-500/20 rounded">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Avatar Section */}
      <div className="rounded-2xl border border-dungeon-700/50 p-6 bg-gradient-to-br from-dungeon-800/30 to-transparent">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-blue-500/20 rounded-xl">
            <Camera className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-dungeon-100">Avatar de Perfil</h3>
            <p className="text-sm text-dungeon-400">Tu imagen representativa en la comunidad</p>
          </div>
        </div>

        <AvatarUpload
          currentAvatarUrl={currentData.avatar_url || undefined}
          onUploadSuccess={handleAvatarSuccess}
          onUploadError={handleAvatarError}
        />
      </div>

      {/* Display Name */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm font-medium text-dungeon-200">
            <div className="p-1.5 bg-gold-500/20 rounded-lg">
              <User className="w-4 h-4 text-gold-400" />
            </div>
            Nombre para mostrar
          </label>
          <SaveStatusIndicator status={saveStatus.display_name} />
        </div>
        <input
          type="text"
          value={displayName}
          onChange={(e) => {
            const value = e.target.value.slice(0, 50);
            setDisplayName(value);
            autoSave('display_name', value);
          }}
          placeholder="¿Cómo te gustaría que te llamen?"
          className="w-full px-4 py-3 bg-dungeon-800/50 border border-dungeon-700 rounded-xl text-dungeon-100 placeholder-dungeon-500 focus:outline-none focus:ring-2 focus:ring-gold-500/30 focus:border-gold-500/50 transition-all"
        />
        <div className="flex items-center justify-between text-xs text-dungeon-500">
          <span>Aparecerá en tu perfil público y comentarios</span>
          <span className={displayName.length > 40 ? 'text-amber-400' : ''}>{displayName.length}/50</span>
        </div>
      </div>

      {/* Bio */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm font-medium text-dungeon-200">
            <div className="p-1.5 bg-purple-500/20 rounded-lg">
              <FileText className="w-4 h-4 text-purple-400" />
            </div>
            Biografía
          </label>
          <SaveStatusIndicator status={saveStatus.bio} />
        </div>
        <textarea
          value={bio}
          onChange={(e) => {
            const value = e.target.value.slice(0, 250);
            setBio(value);
            autoSave('bio', value);
          }}
          placeholder="Cuéntanos sobre ti, tu experiencia con D&D, tu estilo de juego..."
          rows={4}
          className="w-full px-4 py-3 bg-dungeon-800/50 border border-dungeon-700 rounded-xl text-dungeon-100 placeholder-dungeon-500 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500/50 transition-all resize-none"
        />
        <div className="flex items-center justify-between text-xs text-dungeon-500">
          <span>Markdown básico soportado</span>
          <span className={bio.length > 200 ? 'text-amber-400' : ''}>{bio.length}/250</span>
        </div>
      </div>

      {/* Location */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm font-medium text-dungeon-200">
            <div className="p-1.5 bg-green-500/20 rounded-lg">
              <MapPin className="w-4 h-4 text-green-400" />
            </div>
            Ubicación
          </label>
          <SaveStatusIndicator status={saveStatus.location} />
        </div>
        <input
          type="text"
          value={location}
          onChange={(e) => {
            const value = e.target.value.slice(0, 100);
            setLocation(value);
            autoSave('location', value);
          }}
          placeholder="Ciudad, País (ej: Madrid, España)"
          className="w-full px-4 py-3 bg-dungeon-800/50 border border-dungeon-700 rounded-xl text-dungeon-100 placeholder-dungeon-500 focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500/50 transition-all"
        />
        <p className="text-xs text-dungeon-500">
          Ayuda a otros jugadores a encontrar partidas cerca de ti. Controla la visibilidad en Privacidad.
        </p>
      </div>

      {/* Info Box */}
      <div className="flex items-start gap-3 p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl">
        <div className="p-1.5 bg-blue-500/20 rounded-lg flex-shrink-0">
          <Sparkles className="w-4 h-4 text-blue-400" />
        </div>
        <div>
          <p className="text-sm text-blue-300 font-medium">Guardado automático</p>
          <p className="text-xs text-dungeon-400 mt-0.5">
            Tus cambios se guardan automáticamente mientras escribes
          </p>
        </div>
      </div>
    </div>
  );
}

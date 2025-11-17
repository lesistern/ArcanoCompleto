'use client';

import { useState, useRef } from 'react';
import { useCharacterStore } from '@/lib/store/characterStore';
import { Upload, User, X } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import Button from '@/components/ui/Button';

/**
 * Avatares stock por raza
 * Por ahora usamos placeholders de UI Avatars (https://ui-avatars.com/)
 * En el futuro se pueden reemplazar con imágenes reales
 */
const STOCK_AVATARS_BY_RACE: Record<string, { name: string; url: string }[]> = {
  human: [
    { name: 'Humano Guerrero', url: 'https://ui-avatars.com/api/?name=HG&background=8B4513&color=fff&size=200' },
    { name: 'Humana Maga', url: 'https://ui-avatars.com/api/?name=HM&background=4B0082&color=fff&size=200' },
    { name: 'Humano Pícaro', url: 'https://ui-avatars.com/api/?name=HP&background=696969&color=fff&size=200' },
  ],
  elf: [
    { name: 'Elfo Arquero', url: 'https://ui-avatars.com/api/?name=EA&background=228B22&color=fff&size=200' },
    { name: 'Elfa Hechicera', url: 'https://ui-avatars.com/api/?name=EH&background=9370DB&color=fff&size=200' },
    { name: 'Elfo Explorador', url: 'https://ui-avatars.com/api/?name=EE&background=2E8B57&color=fff&size=200' },
  ],
  dwarf: [
    { name: 'Enano Guerrero', url: 'https://ui-avatars.com/api/?name=EG&background=CD853F&color=fff&size=200' },
    { name: 'Enano Clérigo', url: 'https://ui-avatars.com/api/?name=EC&background=DAA520&color=fff&size=200' },
    { name: 'Enana Paladín', url: 'https://ui-avatars.com/api/?name=EP&background=FFD700&color=000&size=200' },
  ],
  halfling: [
    { name: 'Mediano Pícaro', url: 'https://ui-avatars.com/api/?name=MP&background=A0522D&color=fff&size=200' },
    { name: 'Mediano Bardo', url: 'https://ui-avatars.com/api/?name=MB&background=FF8C00&color=fff&size=200' },
    { name: 'Mediana Druida', url: 'https://ui-avatars.com/api/?name=MD&background=8FBC8F&color=fff&size=200' },
  ],
  gnome: [
    { name: 'Gnomo Ilusionista', url: 'https://ui-avatars.com/api/?name=GI&background=FF69B4&color=fff&size=200' },
    { name: 'Gnoma Barda', url: 'https://ui-avatars.com/api/?name=GB&background=FF1493&color=fff&size=200' },
    { name: 'Gnomo Inventor', url: 'https://ui-avatars.com/api/?name=GI&background=FFA500&color=fff&size=200' },
  ],
  'half-elf': [
    { name: 'Semielfo Bardo', url: 'https://ui-avatars.com/api/?name=SB&background=8B008B&color=fff&size=200' },
    { name: 'Semielfa Paladín', url: 'https://ui-avatars.com/api/?name=SP&background=FFD700&color=000&size=200' },
    { name: 'Semielfo Explorador', url: 'https://ui-avatars.com/api/?name=SE&background=556B2F&color=fff&size=200' },
  ],
  'half-orc': [
    { name: 'Semiorco Bárbaro', url: 'https://ui-avatars.com/api/?name=SB&background=8B0000&color=fff&size=200' },
    { name: 'Semiorco Guerrero', url: 'https://ui-avatars.com/api/?name=SG&background=B22222&color=fff&size=200' },
    { name: 'Semiorco Monje', url: 'https://ui-avatars.com/api/?name=SM&background=A52A2A&color=fff&size=200' },
  ],
  // Razas suplementarias
  aasimar: [
    { name: 'Aasimar Paladín', url: 'https://ui-avatars.com/api/?name=AP&background=FFD700&color=000&size=200' },
    { name: 'Aasimar Clérigo', url: 'https://ui-avatars.com/api/?name=AC&background=F0E68C&color=000&size=200' },
  ],
  tiefling: [
    { name: 'Tiefling Hechicero', url: 'https://ui-avatars.com/api/?name=TH&background=8B0000&color=fff&size=200' },
    { name: 'Tiefling Pícaro', url: 'https://ui-avatars.com/api/?name=TP&background=4B0000&color=fff&size=200' },
  ],
  goliath: [
    { name: 'Goliath Bárbaro', url: 'https://ui-avatars.com/api/?name=GB&background=808080&color=fff&size=200' },
    { name: 'Goliath Guerrero', url: 'https://ui-avatars.com/api/?name=GG&background=696969&color=fff&size=200' },
  ],
  // Agregar más razas según sea necesario
};

export default function CharacterAvatarSelector() {
  const { character, setAvatarUrl } = useCharacterStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentAvatar = character.avatarUrl;
  const raceSlug = character.race?.slug || '';
  const stockAvatars = STOCK_AVATARS_BY_RACE[raceSlug] || [];

  // Handler para subir imagen personalizada
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validar tamaño (máximo 2MB)
    if (file.size > 2 * 1024 * 1024) {
      setUploadError('La imagen no puede pesar más de 2MB');
      return;
    }

    // Validar tipo de archivo
    if (!file.type.startsWith('image/')) {
      setUploadError('Por favor selecciona una imagen válida (JPG, PNG, etc.)');
      return;
    }

    // Por ahora, crear URL local
    // TODO: Implementar upload a Supabase Storage en el futuro
    const imageUrl = URL.createObjectURL(file);
    setAvatarUrl(imageUrl);
    setUploadError(null);
    setIsModalOpen(false);
  };

  // Handler para seleccionar avatar stock
  const handleSelectStockAvatar = (avatarUrl: string) => {
    setAvatarUrl(avatarUrl);
    setIsModalOpen(false);
  };

  // Handler para eliminar avatar
  const handleRemoveAvatar = () => {
    setAvatarUrl('');
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-gold-500">
        Avatar del Personaje
      </label>

      {/* Avatar actual o placeholder */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="h-24 w-24 rounded-full overflow-hidden bg-dungeon-700 border-2 border-dungeon-600 flex items-center justify-center">
            {currentAvatar ? (
              <img
                src={currentAvatar}
                alt="Avatar del personaje"
                className="h-full w-full object-cover"
              />
            ) : (
              <User className="h-12 w-12 text-dungeon-500" />
            )}
          </div>
        </div>

        <div className="flex-1 space-y-2">
          <Button
            onClick={() => setIsModalOpen(true)}
            variant="secondary"
            size="sm"
            className="w-full"
          >
            {currentAvatar ? 'Cambiar Avatar' : 'Seleccionar Avatar'}
          </Button>
          {currentAvatar && (
            <Button
              onClick={handleRemoveAvatar}
              variant="ghost"
              size="sm"
              className="w-full text-red-400 hover:text-red-300"
            >
              Eliminar Avatar
            </Button>
          )}
        </div>
      </div>

      {/* Modal de selección */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-dungeon-900 border-dungeon-700">
            <div className="p-6 space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gold-400">Seleccionar Avatar</h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-dungeon-400 hover:text-dungeon-200 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Subir imagen personalizada */}
              <div className="border-2 border-dashed border-dungeon-700 rounded-lg p-6 hover:border-gold-500 transition-colors">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full flex flex-col items-center gap-2 text-dungeon-400 hover:text-gold-400 transition-colors"
                >
                  <Upload className="h-8 w-8" />
                  <span className="text-sm font-semibold">Subir Imagen Personalizada</span>
                  <span className="text-xs text-dungeon-500">JPG, PNG (máx. 2MB)</span>
                </button>
                {uploadError && (
                  <p className="mt-2 text-sm text-red-400 text-center">{uploadError}</p>
                )}
              </div>

              {/* Avatares stock */}
              {stockAvatars.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-dungeon-300">
                    Avatares para {character.race?.name || 'tu raza'}
                  </h4>
                  <div className="grid grid-cols-3 gap-4">
                    {stockAvatars.map((avatar, index) => (
                      <button
                        key={index}
                        onClick={() => handleSelectStockAvatar(avatar.url)}
                        className="group relative aspect-square rounded-lg overflow-hidden border-2 border-dungeon-700 hover:border-gold-500 transition-all hover:scale-105"
                      >
                        <img
                          src={avatar.url}
                          alt={avatar.name}
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="text-xs text-white font-semibold text-center px-2">
                            {avatar.name}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Sin avatares stock */}
              {stockAvatars.length === 0 && (
                <div className="text-center py-8 text-dungeon-500">
                  <p className="text-sm">
                    {raceSlug
                      ? `No hay avatares predefinidos para ${character.race?.name}. Sube tu propia imagen.`
                      : 'Selecciona una raza primero para ver avatares predefinidos.'}
                  </p>
                </div>
              )}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

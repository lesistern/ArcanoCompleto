'use client';

import { useState } from 'react';
import { Share2, Copy, Check, X, MessageCircle } from 'lucide-react';
import QRCode from 'react-qr-code';

interface ShareProfileButtonProps {
  username: string;
  displayName: string;
  tier?: string;
  level?: number;
  variant?: 'default' | 'icon-only';
}

export function ShareProfileButton({
  username,
  displayName,
  tier,
  level,
  variant = 'default'
}: ShareProfileButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Generar URL del perfil
  const profileUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/u/${username}`
    : '';

  // Textos para compartir
  const shareText = `¡Mira el perfil de ${displayName} en D&D Compendium!${tier ? ` (${tier})` : ''}${level ? ` - Nivel ${level}` : ''}`;

  // Usar Web Share API nativa si está disponible (mejor UX en móviles)
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Perfil de ${displayName}`,
          text: shareText,
          url: profileUrl,
        });
        return true;
      } catch (err) {
        // Usuario canceló o error - mostrar modal de fallback
        if ((err as Error).name !== 'AbortError') {
          console.error('Error sharing:', err);
        }
        return false;
      }
    }
    return false;
  };

  const handleShareClick = async () => {
    // Intentar compartir nativo primero (móviles)
    const shared = await handleNativeShare();
    if (!shared) {
      // Fallback al modal personalizado
      setIsOpen(true);
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(profileUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Error copying to clipboard:', err);
    }
  };

  const handleShare = (platform: 'twitter' | 'whatsapp' | 'discord') => {
    const encodedUrl = encodeURIComponent(profileUrl);
    const encodedText = encodeURIComponent(shareText);

    let shareUrl = '';

    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodedText}%20${encodedUrl}`;
        break;
      case 'discord':
        // Discord no tiene URL directa, copiamos el mensaje formateado
        const discordMessage = `${shareText}\n${profileUrl}`;
        navigator.clipboard.writeText(discordMessage);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        return;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  if (variant === 'icon-only') {
    return (
      <>
        <button
          onClick={handleShareClick}
          className="p-2 rounded-lg bg-dungeon-800/50 border border-dungeon-700 hover:border-gold-500/50 transition-colors text-dungeon-300 hover:text-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 focus:ring-offset-dungeon-950"
          aria-label="Compartir perfil"
          title="Compartir perfil"
        >
          <Share2 className="w-5 h-5" aria-hidden="true" />
        </button>

        {isOpen && (
          <ShareModal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            profileUrl={profileUrl}
            shareText={shareText}
            displayName={displayName}
            copied={copied}
            onCopyLink={handleCopyLink}
            onShare={handleShare}
          />
        )}
      </>
    );
  }

  return (
    <>
      <button
        onClick={handleShareClick}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gold-500/10 border border-gold-500/30 hover:bg-gold-500/20 transition-colors text-gold-400 hover:text-gold-300 font-semibold focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 focus:ring-offset-dungeon-950"
        aria-label="Abrir opciones para compartir perfil"
      >
        <Share2 className="w-4 h-4" aria-hidden="true" />
        Compartir Perfil
      </button>

      {isOpen && (
        <ShareModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          profileUrl={profileUrl}
          shareText={shareText}
          displayName={displayName}
          copied={copied}
          onCopyLink={handleCopyLink}
          onShare={handleShare}
        />
      )}
    </>
  );
}

// Modal Component
interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  profileUrl: string;
  shareText: string;
  displayName: string;
  copied: boolean;
  onCopyLink: () => void;
  onShare: (platform: 'twitter' | 'whatsapp' | 'discord') => void;
}

function ShareModal({
  isOpen,
  onClose,
  profileUrl,
  shareText,
  displayName,
  copied,
  onCopyLink,
  onShare
}: ShareModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-modal-title"
    >
      <div className="bg-dungeon-900 border border-dungeon-700 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-dungeon-700">
          <h2 id="share-modal-title" className="text-2xl font-bold text-gold-400 font-heading">
            Compartir Perfil
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-dungeon-800 transition-colors text-dungeon-300 hover:text-dungeon-100 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 focus:ring-offset-dungeon-900"
            aria-label="Cerrar diálogo de compartir"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Copy Link Section */}
          <div>
            <label htmlFor="profile-url-input" className="block text-sm font-semibold text-dungeon-200 mb-2">
              Enlace del Perfil
            </label>
            <div className="flex gap-2">
              <input
                id="profile-url-input"
                type="text"
                value={profileUrl}
                readOnly
                aria-label="URL del perfil para compartir"
                className="flex-1 px-4 py-2.5 bg-dungeon-950 border border-dungeon-700 rounded-lg text-dungeon-200 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
              />
              <button
                onClick={onCopyLink}
                aria-label={copied ? "Enlace copiado" : "Copiar enlace al portapapeles"}
                className={`px-4 py-2.5 rounded-lg font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dungeon-900 ${
                  copied
                    ? 'bg-green-500/20 border-green-500/40 text-green-400 focus:ring-green-500'
                    : 'bg-gold-500/10 border border-gold-500/30 hover:bg-gold-500/20 text-gold-400 focus:ring-gold-500'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 inline mr-1" aria-hidden="true" />
                    Copiado!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 inline mr-1" aria-hidden="true" />
                    Copiar
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Social Share Buttons */}
          <div>
            <label className="block text-sm font-semibold text-dungeon-200 mb-3">
              Compartir en Redes Sociales
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Twitter */}
              <button
                onClick={() => onShare('twitter')}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-[#1DA1F2]/10 border border-[#1DA1F2]/30 hover:bg-[#1DA1F2]/20 rounded-lg transition-colors text-[#1DA1F2] font-semibold focus:outline-none focus:ring-2 focus:ring-[#1DA1F2] focus:ring-offset-2 focus:ring-offset-dungeon-900"
                aria-label="Compartir perfil en Twitter"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
                Twitter
              </button>

              {/* WhatsApp */}
              <button
                onClick={() => onShare('whatsapp')}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-[#25D366]/10 border border-[#25D366]/30 hover:bg-[#25D366]/20 rounded-lg transition-colors text-[#25D366] font-semibold focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 focus:ring-offset-dungeon-900"
                aria-label="Compartir perfil en WhatsApp"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                WhatsApp
              </button>

              {/* Discord */}
              <button
                onClick={() => onShare('discord')}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-[#5865F2]/10 border border-[#5865F2]/30 hover:bg-[#5865F2]/20 rounded-lg transition-colors text-[#5865F2] font-semibold focus:outline-none focus:ring-2 focus:ring-[#5865F2] focus:ring-offset-2 focus:ring-offset-dungeon-900"
                aria-label="Copiar mensaje de compartir para Discord"
              >
                <MessageCircle className="w-5 h-5" aria-hidden="true" />
                Discord
              </button>
            </div>
            <p className="text-xs text-dungeon-400 mt-2 italic">
              * Discord: Copia el mensaje al portapapeles para pegar en tu servidor
            </p>
          </div>

          {/* QR Code Section */}
          <div>
            <label className="block text-sm font-semibold text-dungeon-200 mb-3">
              Código QR
            </label>
            <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-lg" role="img" aria-label={`Código QR para acceder al perfil de ${displayName}`}>
              <QRCode
                value={profileUrl}
                size={200}
                level="M"
                fgColor="#1a1a1a"
                bgColor="#ffffff"
              />
              <p className="text-xs text-gray-600 text-center">
                Escanea este código para acceder al perfil de <span className="font-bold">{displayName}</span>
              </p>
            </div>
            <p className="text-xs text-dungeon-400 mt-2 text-center italic">
              Ideal para compartir en eventos presenciales o imprimir
            </p>
          </div>

          {/* Preview Card */}
          <div>
            <label className="block text-sm font-semibold text-dungeon-200 mb-3">
              Vista Previa de Compartir
            </label>
            <div className="p-4 bg-dungeon-950 border border-dungeon-800 rounded-lg">
              <p className="text-sm text-dungeon-300 mb-2">Así se verá el enlace compartido:</p>
              <div className="p-4 bg-dungeon-900 border border-dungeon-700 rounded-lg">
                <p className="font-semibold text-gold-400 mb-1">{shareText}</p>
                <p className="text-xs text-dungeon-400 font-mono break-all">{profileUrl}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-dungeon-700">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-lg bg-dungeon-800 hover:bg-dungeon-700 transition-colors text-dungeon-300 font-semibold"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}

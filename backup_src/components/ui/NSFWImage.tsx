'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Eye, EyeOff, AlertTriangle } from 'lucide-react';
import { Button } from './Button';

interface NSFWImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  isNSFW?: boolean;
  showWarning?: boolean;
}

/**
 * Componente de imagen con filtro NSFW (blur)
 *
 * Features:
 * - Blur automático si isNSFW es true
 * - Botón para mostrar/ocultar
 * - Warning opcional antes de mostrar
 */
export default function NSFWImage({
  src,
  alt,
  width = 400,
  height = 400,
  className = '',
  isNSFW = false,
  showWarning = true
}: NSFWImageProps) {
  const [isBlurred, setIsBlurred] = useState(isNSFW);
  const [showImage, setShowImage] = useState(!isNSFW);

  // ========================================================================
  // HANDLERS
  // ========================================================================

  const handleReveal = () => {
    if (showWarning && isNSFW) {
      const confirmed = confirm(
        '⚠️ Advertencia: Esta imagen puede contener contenido sensible.\n\n¿Estás seguro de que quieres verla?'
      );
      if (!confirmed) return;
    }

    setIsBlurred(false);
    setShowImage(true);
  };

  const handleHide = () => {
    setIsBlurred(true);
  };

  // ========================================================================
  // RENDER: NO NSFW (imagen normal)
  // ========================================================================

  if (!isNSFW) {
    return (
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
      />
    );
  }

  // ========================================================================
  // RENDER: NSFW
  // ========================================================================

  return (
    <div className="relative inline-block">
      {/* Imagen con blur */}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`${className} transition-all duration-300 ${
          isBlurred ? 'blur-3xl' : 'blur-none'
        }`}
      />

      {/* Overlay con warning (solo si está blurred) */}
      {isBlurred && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="text-center p-6">
            <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white mb-2">
              Contenido Sensible
            </h3>
            <p className="text-sm text-gray-300 mb-4">
              Esta imagen puede contener contenido NSFW
            </p>
            <Button variant="primary" size="sm" onClick={handleReveal}>
              <Eye className="h-4 w-4 mr-2" />
              Mostrar Imagen
            </Button>
          </div>
        </div>
      )}

      {/* Botón para ocultar (solo si está visible) */}
      {!isBlurred && showImage && (
        <button
          onClick={handleHide}
          className="absolute top-2 right-2 bg-black/70 hover:bg-black/90 text-white p-2 rounded-lg transition-colors"
          title="Ocultar imagen"
        >
          <EyeOff className="h-4 w-4" />
        </button>
      )}

      {/* Badge NSFW */}
      <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
        NSFW
      </div>
    </div>
  );
}

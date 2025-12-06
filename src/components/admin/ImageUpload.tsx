'use client';

import { useRef, useState, DragEvent } from 'react';
import Image from 'next/image';
import { Upload, X, Loader2 } from 'lucide-react';

interface ImageUploadProps {
    imageUrl?: string;
    onImageChange: (url: string) => void;
    disabled?: boolean;
    itemName: string;
    itemSlug?: string;
}

export function ImageUpload({ imageUrl, onImageChange, disabled, itemName, itemSlug }: ImageUploadProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadError, setUploadError] = useState<string | null>(null);

    const convertToWebP = (file: File): Promise<Blob> => {
        return new Promise((resolve, reject) => {
            const img = document.createElement('img');
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                if (!ctx) {
                    reject(new Error('Could not get canvas context'));
                    return;
                }
                ctx.drawImage(img, 0, 0);
                canvas.toBlob((blob) => {
                    if (blob) resolve(blob);
                    else reject(new Error('Conversion failed'));
                }, 'image/webp', 0.8);
            };
            img.onerror = reject;
            img.src = URL.createObjectURL(file);
        });
    };

    const uploadImage = async (file: File) => {
        setIsUploading(true);
        setUploadError(null);

        try {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                throw new Error('El archivo debe ser una imagen');
            }

            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                throw new Error('La imagen no debe superar los 5MB');
            }

            const webpBlob = await convertToWebP(file);
            const fileName = `${itemSlug || 'temp'}-${Date.now()}.webp`;

            // Import supabase client dynamically to avoid SSR issues
            const { createClient } = await import('@/lib/supabase/client');
            const supabase = createClient();

            const { data, error } = await supabase.storage
                .from('classes')
                .upload(fileName, webpBlob, {
                    contentType: 'image/webp',
                    upsert: true
                });

            if (error) throw error;

            const { data: { publicUrl } } = supabase.storage
                .from('classes')
                .getPublicUrl(fileName);

            onImageChange(publicUrl);
        } catch (error: any) {
            console.error('Error uploading image:', error);
            setUploadError(error.message || 'Error al subir la imagen');
        } finally {
            setIsUploading(false);
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            uploadImage(file);
        }
    };

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (!disabled && !isUploading) {
            setIsDragging(true);
        }
    };

    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        if (disabled || isUploading) return;

        const file = e.dataTransfer.files?.[0];
        if (file) {
            uploadImage(file);
        }
    };

    const handleRemoveImage = () => {
        onImageChange('');
        setUploadError(null);
    };

    return (
        <div className="space-y-2">
            <label className="block text-sm font-semibold text-dungeon-300">
                Imagen
            </label>
            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`
          flex flex-col items-center justify-center 
          border-2 border-dashed rounded-lg p-6 
          transition-all duration-200
          ${isDragging
                        ? 'border-gold-400 bg-gold-900/20'
                        : 'border-dungeon-600 hover:border-gold-500/50 bg-dungeon-900/30'
                    }
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          ${isUploading ? 'pointer-events-none' : ''}
        `}
                onClick={() => !disabled && !isUploading && fileInputRef.current?.click()}
            >
                {isUploading ? (
                    <div className="text-center">
                        <Loader2 className="h-10 w-10 mx-auto mb-2 text-gold-400 animate-spin" />
                        <p className="text-sm text-dungeon-300">Subiendo imagen...</p>
                    </div>
                ) : imageUrl ? (
                    <div className="relative w-full">
                        <div className="relative w-full h-48 mb-4">
                            <Image
                                src={imageUrl}
                                alt={itemName}
                                fill
                                className="object-contain"
                                sizes="(max-width: 768px) 100vw, 300px"
                            />
                        </div>
                        {!disabled && (
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleRemoveImage();
                                }}
                                className="absolute top-0 right-0 bg-red-500 p-1 rounded-full text-white hover:bg-red-600 transition-colors"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="text-center">
                        <Upload className="h-10 w-10 mx-auto mb-2 text-dungeon-400" />
                        <p className="text-sm text-dungeon-300 mb-1">
                            {isDragging ? '¡Suelta la imagen aquí!' : 'Arrastra una imagen o haz clic para seleccionar'}
                        </p>
                        <p className="text-xs text-dungeon-500">
                            PNG, JPG, GIF hasta 5MB (se convertirá a WebP)
                        </p>
                    </div>
                )}

                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    accept="image/*"
                    disabled={disabled || isUploading}
                    className="hidden"
                />
            </div>

            {uploadError && (
                <div className="text-sm text-red-400 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    {uploadError}
                </div>
            )}

            {!disabled && !imageUrl && !isUploading && (
                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full px-4 py-2 bg-dungeon-700 hover:bg-dungeon-600 rounded-lg text-sm font-medium transition-colors"
                >
                    Seleccionar Imagen
                </button>
            )}
        </div>
    );
}

function AlertCircle({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
    );
}

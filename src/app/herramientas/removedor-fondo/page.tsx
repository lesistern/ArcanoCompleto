'use client';

import { useState, useRef, useCallback } from 'react';
import { Upload, Download, Image as ImageIcon, Loader2, X, Sparkles, Wand2 } from 'lucide-react';
import { removeBackground } from '@imgly/background-removal';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function BackgroundRemoverPage() {
    const [originalImage, setOriginalImage] = useState<string | null>(null);
    const [processedImage, setProcessedImage] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [dragActive, setDragActive] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const processImage = useCallback(async (file: File) => {
        try {
            setIsProcessing(true);
            setError(null);
            setOriginalImage(URL.createObjectURL(file));
            setProcessedImage(null);

            // Configuración para descargar los assets necesarios si es la primera vez
            const blob = await removeBackground(file, {
                publicPath: 'https://staticimgly.com/@imgly/background-removal-data/1.7.0/dist/',
                progress: (key, current, total) => {
                    console.log(`Downloading ${key}: ${current}/${total}`);
                }
            });

            const url = URL.createObjectURL(blob);
            setProcessedImage(url);
        } catch (err: any) {
            console.error('Error removing background:', err);
            setError('Hubo un error al procesar la imagen. Por favor intenta con otra.');
        } finally {
            setIsProcessing(false);
        }
    }, []);

    const handleDrag = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            if (file.type.startsWith('image/')) {
                processImage(file);
            } else {
                setError('Por favor sube un archivo de imagen válido.');
            }
        }
    }, [processImage]);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            processImage(e.target.files[0]);
        }
    }, [processImage]);

    const handleDownload = () => {
        if (processedImage) {
            const link = document.createElement('a');
            link.href = processedImage;
            link.download = 'imagen-sin-fondo.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    const reset = () => {
        setOriginalImage(null);
        setProcessedImage(null);
        setError(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-neutral-100 flex flex-col font-sans selection:bg-purple-500/30">

            {/* Navbar Minimalista */}
            <nav className="border-b border-white/5 bg-black/50 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity">
                        <Wand2 className="w-6 h-6 text-purple-500" />
                        <span>Studio</span>
                    </Link>
                    <div className="flex gap-4 text-sm text-neutral-400">
                        <Link href="/herramientas" className="hover:text-white transition-colors">Volver a Herramientas</Link>
                    </div>
                </div>
            </nav>

            <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 relative overflow-hidden">

                {/* Background Gradients */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] -z-10" />
                <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-blue-600/5 rounded-full blur-[100px] -z-10" />

                <div className="max-w-4xl w-full space-y-8">

                    <div className="text-center space-y-4">
                        <h1 className="text-4xl md:text-6xl font-black tracking-tight">
                            Quita el fondo <br />
                            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                                en segundos.
                            </span>
                        </h1>
                        <p className="text-lg text-neutral-400 max-w-xl mx-auto">
                            Sube tu imagen y nuestra IA eliminará el fondo automáticamente.
                            <br />Gratis, privado y procesado 100% en tu navegador.
                        </p>
                    </div>

                    <div className="w-full bg-neutral-900/50 border border-white/10 rounded-3xl p-1 shadow-2xl backdrop-blur-sm relative overflow-hidden group">

                        {/* Main Content Area */}
                        {!originalImage ? (
                            <div
                                className={cn(
                                    "relative h-96 flex flex-col items-center justify-center border-2 border-dashed rounded-2xl transition-all duration-300",
                                    dragActive
                                        ? "border-purple-500/50 bg-purple-500/10 scale-[0.99]"
                                        : "border-white/10 hover:border-white/20 hover:bg-white/5"
                                )}
                                onDragEnter={handleDrag}
                                onDragLeave={handleDrag}
                                onDragOver={handleDrag}
                                onDrop={handleDrop}
                            >
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleChange}
                                />

                                <div className="flex flex-col items-center gap-4 p-8 text-center animate-in fade-in zoom-in duration-500">
                                    <div className="w-20 h-20 bg-gradient-to-tr from-purple-500/20 to-blue-500/20 rounded-full flex items-center justify-center ring-1 ring-white/10 shadow-inner group-hover:scale-110 transition-transform duration-500">
                                        <Upload className="w-8 h-8 text-purple-400" />
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-xl font-medium text-white">
                                            Arrastra tu imagen aquí
                                        </p>
                                        <p className="text-sm text-neutral-400">
                                            o <button onClick={() => fileInputRef.current?.click()} className="text-purple-400 hover:text-purple-300 underline underline-offset-4 cursor-pointer font-medium">selecciona un archivo</button>
                                        </p>
                                    </div>
                                    <p className="text-xs text-neutral-500 mt-4">
                                        Soporta PNG, JPG, JPEG, WEBP
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="relative min-h-[500px] flex flex-col md:flex-row gap-4 p-4">

                                {/* Reset Button */}
                                <button
                                    onClick={reset}
                                    className="absolute top-6 right-6 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white/70 hover:text-white transition-colors backdrop-blur-md"
                                    title="Empezar de nuevo"
                                >
                                    <X className="w-5 h-5" />
                                </button>

                                {/* Original Image */}
                                <div className="flex-1 relative rounded-xl overflow-hidden bg-[url('/bg-grid.svg')] bg-[#111] border border-white/5 group-hover/image:ring-2 ring-purple-500/0 transition-all">
                                    <div className="absolute top-3 left-3 px-3 py-1 bg-black/60 backdrop-blur rounded-full text-xs font-medium text-white/80 z-10">Original</div>
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={originalImage}
                                        alt="Original"
                                        className="w-full h-full object-contain"
                                    />
                                </div>

                                {/* Processed Image */}
                                <div className="flex-1 relative rounded-xl overflow-hidden bg-[url('https://transparenttextures.com/patterns/stardust.png')] bg-[#1a1a1a] border border-white/5 flex items-center justify-center">

                                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#888_1px,transparent_1px)] [background-size:16px_16px]"></div>

                                    <div className="absolute top-3 left-3 px-3 py-1 bg-purple-600/80 backdrop-blur rounded-full text-xs font-medium text-white z-10 flex items-center gap-1">
                                        <Sparkles className="w-3 h-3" />
                                        Sin Fondo
                                    </div>

                                    {isProcessing ? (
                                        <div className="flex flex-col items-center gap-3 text-purple-400 animate-pulse">
                                            <Loader2 className="w-10 h-10 animate-spin" />
                                            <p className="text-sm font-medium">Procesando imagen con IA...</p>
                                        </div>
                                    ) : processedImage ? (
                                        <>
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={processedImage}
                                                alt="Procesada"
                                                className="w-full h-full object-contain relative z-10 animate-in zoom-in duration-300"
                                            />
                                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
                                                <button
                                                    onClick={handleDownload}
                                                    className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-bold shadow-lg shadow-purple-500/20 hover:scale-105 hover:bg-neutral-200 transition-all active:scale-95 text-sm"
                                                >
                                                    <Download className="w-4 h-4" />
                                                    Descargar Imagen
                                                </button>
                                            </div>
                                        </>
                                    ) : null}
                                </div>

                            </div>
                        )}
                    </div>

                    {error && (
                        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-200 text-sm text-center animate-in slide-in-from-bottom-2">
                            {error}
                        </div>
                    )}

                    <div className="text-center">
                        <p className="text-xs text-neutral-500">
                            Nota: La primera vez puede tardar unos segundos en cargar los modelos de IA.
                        </p>
                    </div>

                </div>
            </main>
        </div>
    );
}

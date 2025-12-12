"use client";

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Scroll, Shield, Sword, Heart, Brain, Zap, Backpack, Book, Calculator, User, Scale, Coins, FileDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';

export function CrearHojaPjClient() {
    return (
        <div className="container mx-auto px-4 py-8 md:py-16 max-w-5xl">
            {/* Hero Section */}
            <div className="relative rounded-xl overflow-hidden bg-gray-900 border border-gray-800 shadow-2xl mb-12">
                <div className="absolute inset-0 bg-[url('/images/textures/parchment-dark.jpg')] opacity-20 mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-900/90 to-gray-950/50"></div>

                <div className="relative z-10 p-6 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
                    <div className="max-w-2xl space-y-4">
                        <div className="flex items-center gap-3 mb-2">
                            <Link href="/reglas">
                                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-200 pl-0">
                                    <ArrowLeft className="h-4 w-4 mr-2" />
                                    Volver a Reglas
                                </Button>
                            </Link>
                        </div>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-gray-100 leading-tight">
                            Guia de la Hoja de Personaje
                        </h1>
                        <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                            Guia paso a paso para rellenar cada campo de la hoja de personaje v3.5.
                        </p>
                        <div className="pt-2">
                            <a
                                href="https://drive.google.com/drive/folders/1cbatIBiCQ_StwcVGDJQHmfz42lTF2_DI?usp=sharing"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-gold-400 hover:text-gold-300 transition-colors text-sm font-medium"
                            >
                                <FileDown className="mr-2 h-4 w-4" />
                                ¿Prefieres papel y lápiz? Descarga nuestras hojas imprimibles
                            </a>
                        </div>
                    </div>

                    <div className="p-6 rounded-full bg-indigo-500/10 border border-indigo-500/30 backdrop-blur-sm">
                        <Scroll className="h-12 w-12 text-indigo-400" />
                    </div>
                </div>
            </div>

            <Tabs defaultValue="hoja1" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8">
                    <TabsTrigger value="hoja1">Hoja 1: Combate y Habilidades</TabsTrigger>
                    <TabsTrigger value="hoja2">Hoja 2: Equipo y Magia</TabsTrigger>
                </TabsList>

                {/* ==================== HOJA 1 ==================== */}
                <TabsContent value="hoja1" className="space-y-8">

                    {/* ========== SECCIÓN: CABECERA DE LA HOJA ========== */}
                    <Card className="card border-indigo-500/30">
                        <CardHeader className="bg-gradient-to-r from-indigo-900/20 to-transparent">
                            <CardTitle className="flex items-center gap-3 text-xl">
                                <User className="h-5 w-5 text-indigo-400" />
                                Cabecera: Datos del Personaje
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-6">
                            {/* Replica de la cabecera oficial */}
                            <div className="border-2 border-gray-600 rounded bg-white/5 overflow-hidden">
                                {/* Fila 1: Título y nombre */}
                                <div className="flex border-b-2 border-gray-600">
                                    <div className="bg-gray-950 px-4 py-2 border-r-2 border-gray-600">
                                        <span className="text-white font-bold text-xs uppercase tracking-wider">Hoja de Personaje</span>
                                    </div>
                                    <div className="flex-1 px-3 py-1">
                                        <span className="text-[9px] text-gray-500 uppercase block">Nombre del Personaje</span>
                                        <div className="border-b border-gray-600 h-5"></div>
                                    </div>
                                </div>
                                {/* Fila 2: Jugador, Clase, Raza */}
                                <div className="flex border-b-2 border-gray-600 text-center">
                                    <div className="flex-1 px-2 py-1 border-r border-gray-600">
                                        <span className="text-[9px] text-gray-500 uppercase block">Jugador</span>
                                    </div>
                                    <div className="flex-1 px-2 py-1 border-r border-gray-600">
                                        <span className="text-[9px] text-gray-500 uppercase block">Clase y Nivel</span>
                                    </div>
                                    <div className="flex-1 px-2 py-1">
                                        <span className="text-[9px] text-gray-500 uppercase block">Raza</span>
                                    </div>
                                </div>
                                {/* Fila 3: Alineamiento, Deidad, etc */}
                                <div className="flex text-center">
                                    <div className="flex-1 px-2 py-1 border-r border-gray-600">
                                        <span className="text-[9px] text-gray-500 uppercase block">Alineamiento</span>
                                    </div>
                                    <div className="flex-1 px-2 py-1 border-r border-gray-600">
                                        <span className="text-[9px] text-gray-500 uppercase block">Deidad</span>
                                    </div>
                                    <div className="flex-1 px-2 py-1 border-r border-gray-600">
                                        <span className="text-[9px] text-gray-500 uppercase block">Tamaño</span>
                                    </div>
                                    <div className="flex-1 px-2 py-1 border-r border-gray-600">
                                        <span className="text-[9px] text-gray-500 uppercase block">Edad</span>
                                    </div>
                                    <div className="flex-1 px-2 py-1 border-r border-gray-600">
                                        <span className="text-[9px] text-gray-500 uppercase block">Sexo</span>
                                    </div>
                                    <div className="flex-1 px-2 py-1 border-r border-gray-600">
                                        <span className="text-[9px] text-gray-500 uppercase block">Altura</span>
                                    </div>
                                    <div className="flex-1 px-2 py-1 border-r border-gray-600">
                                        <span className="text-[9px] text-gray-500 uppercase block">Peso</span>
                                    </div>
                                    <div className="flex-1 px-2 py-1">
                                        <span className="text-[9px] text-gray-500 uppercase block">Campaña</span>
                                    </div>
                                </div>
                            </div>

                            {/* Explicaciones */}
                            <div className="grid md:grid-cols-2 gap-4 text-sm">
                                <div className="space-y-2">
                                    <p><strong className="text-indigo-300">Nombre del personaje:</strong> Como te llamarás en el juego.</p>
                                    <p><strong className="text-indigo-300">Jugador:</strong> Tu nombre real.</p>
                                    <p><strong className="text-indigo-300">Clase y Nivel:</strong> Tu profesión y poder (ej. "Guerrero 1"). Si eres multiclase: "Guerrero 1 / Mago 1".</p>
                                    <p><strong className="text-indigo-300">Raza:</strong> Humano, Elfo, Enano, etc.</p>
                                </div>
                                <div className="space-y-2">
                                    <p><strong className="text-indigo-300">Alineamiento:</strong> Tu moral (ej. Legal Bueno, Caótico Malvado).</p>
                                    <p><strong className="text-indigo-300">Deidad:</strong> A quién adoras (importante para Clérigos y Paladines).</p>
                                    <p><strong className="text-indigo-300">Tamaño:</strong> "Mediano" (Humanos, Elfos) o "Pequeño" (Gnomos, Halflings).</p>
                                    <p><strong className="text-indigo-300">Resto:</strong> Descripción física para rolear.</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* ========== SECCIÓN: CARACTERÍSTICAS ========== */}
                    <Card className="card border-gold-500/30">
                        <CardHeader className="bg-gradient-to-r from-gold-900/20 to-transparent">
                            <CardTitle className="flex items-center gap-3 text-xl">
                                <Calculator className="h-5 w-5 text-gold-400" />
                                Características (Ability Scores)
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-6">
                            {/* Replica de la sección de características oficial */}
                            <div className="border-2 border-gray-600 rounded bg-white/5 overflow-hidden">
                                {/* Header de columnas */}
                                <div className="grid grid-cols-5 text-center text-[8px] border-b border-gray-600 bg-gray-900/50">
                                    <div className="p-1 border-r border-gray-600">
                                        <span className="text-gray-500 uppercase">Nombre<br />Caract.</span>
                                    </div>
                                    <div className="p-1 border-r border-gray-600">
                                        <span className="text-gray-500 uppercase">Punt.<br />Caract.</span>
                                    </div>
                                    <div className="p-1 border-r border-gray-600 bg-gold-900/20">
                                        <span className="text-gold-500 uppercase">Mod.<br />Caract.</span>
                                    </div>
                                    <div className="p-1 border-r border-gray-600">
                                        <span className="text-gray-600 uppercase">Puntuación<br />Temporal</span>
                                    </div>
                                    <div className="p-1">
                                        <span className="text-gray-600 uppercase">Modificador<br />Temporal</span>
                                    </div>
                                </div>
                                {/* 6 filas de características */}
                                {[
                                    { name: 'FUE', sub: 'Fuerza', color: 'text-red-400' },
                                    { name: 'DES', sub: 'Destreza', color: 'text-green-400' },
                                    { name: 'CON', sub: 'Constitución', color: 'text-orange-400' },
                                    { name: 'INT', sub: 'Inteligencia', color: 'text-blue-400' },
                                    { name: 'SAB', sub: 'Sabiduría', color: 'text-purple-400' },
                                    { name: 'CAR', sub: 'Carisma', color: 'text-pink-400' },
                                ].map((stat, i) => (
                                    <div key={stat.name} className={`grid grid-cols-5 text-center ${i < 5 ? 'border-b border-gray-700' : ''}`}>
                                        <div className="p-2 border-r border-gray-700 bg-gray-950 text-left">
                                            <span className={`font-bold text-sm ${stat.color}`}>{stat.name}</span>
                                            <span className="text-[8px] text-gray-500 uppercase block">{stat.sub}</span>
                                        </div>
                                        <div className="p-2 border-r border-gray-700 flex items-center justify-center">
                                            <div className="w-10 h-8 border border-gray-600 bg-gray-900"></div>
                                        </div>
                                        <div className="p-2 border-r border-gray-700 bg-gold-900/10 flex items-center justify-center">
                                            <div className="w-10 h-8 border-2 border-gold-500/50 bg-gray-900 rounded"></div>
                                        </div>
                                        <div className="p-2 border-r border-gray-700 flex items-center justify-center opacity-50">
                                            <div className="w-10 h-8 border border-dashed border-gray-700 bg-gray-950/30"></div>
                                        </div>
                                        <div className="p-2 flex items-center justify-center opacity-50">
                                            <div className="w-10 h-8 border border-dashed border-gray-700 bg-gray-950/30"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Ejemplo rellenado: Guerrero Enano */}
                            <div className="border-2 border-gold-500/50 rounded bg-gray-900/40 overflow-hidden">
                                <div className="bg-gold-900/30 px-3 py-1 border-b border-gold-500/30">
                                    <span className="text-gold-400 text-xs font-semibold">✏️ Ejemplo: Guerrero Enano nivel 1 (Enano: +2 CON, -2 CAR)</span>
                                </div>
                                {/* Header */}
                                <div className="grid grid-cols-5 text-center text-[8px] border-b border-gray-700 bg-gray-900/50">
                                    <div className="p-1 border-r border-gray-700">
                                        <span className="text-gray-400 uppercase">Caract.</span>
                                    </div>
                                    <div className="p-1 border-r border-gray-700">
                                        <span className="text-gray-400 uppercase">Punt.</span>
                                    </div>
                                    <div className="p-1 border-r border-gray-700 bg-gold-900/20">
                                        <span className="text-gold-500 uppercase">Mod.</span>
                                    </div>
                                    <div className="p-1 border-r border-gray-700">
                                        <span className="text-gray-600 uppercase">Temp.</span>
                                    </div>
                                    <div className="p-1">
                                        <span className="text-gray-600 uppercase">Mod.T</span>
                                    </div>
                                </div>
                                {/* FUE */}
                                <div className="grid grid-cols-5 text-center border-b border-gray-700">
                                    <div className="p-1.5 border-r border-gray-700 bg-gray-950 text-left">
                                        <span className="font-bold text-sm text-red-400">FUE</span>
                                        <span className="text-[7px] text-gray-500 uppercase block">Fuerza</span>
                                    </div>
                                    <div className="p-1.5 border-r border-gray-700 flex items-center justify-center">
                                        <span className="text-gray-200 font-bold">16</span>
                                    </div>
                                    <div className="p-1.5 border-r border-gray-700 bg-gold-900/10 flex items-center justify-center">
                                        <span className="text-gold-400 font-bold text-lg">+3</span>
                                    </div>
                                    <div className="p-1.5 border-r border-gray-700 flex items-center justify-center opacity-50">
                                        <span className="text-gray-600">—</span>
                                    </div>
                                    <div className="p-1.5 flex items-center justify-center opacity-50">
                                        <span className="text-gray-600">—</span>
                                    </div>
                                </div>
                                {/* DES */}
                                <div className="grid grid-cols-5 text-center border-b border-gray-700 bg-gray-950/20">
                                    <div className="p-1.5 border-r border-gray-700 bg-gray-950 text-left">
                                        <span className="font-bold text-sm text-green-400">DES</span>
                                        <span className="text-[7px] text-gray-500 uppercase block">Destreza</span>
                                    </div>
                                    <div className="p-1.5 border-r border-gray-700 flex items-center justify-center">
                                        <span className="text-gray-200 font-bold">12</span>
                                    </div>
                                    <div className="p-1.5 border-r border-gray-700 bg-gold-900/10 flex items-center justify-center">
                                        <span className="text-gold-400 font-bold text-lg">+1</span>
                                    </div>
                                    <div className="p-1.5 border-r border-gray-700 flex items-center justify-center opacity-50">
                                        <span className="text-gray-600">—</span>
                                    </div>
                                    <div className="p-1.5 flex items-center justify-center opacity-50">
                                        <span className="text-gray-600">—</span>
                                    </div>
                                </div>
                                {/* CON - Con bonus racial */}
                                <div className="grid grid-cols-5 text-center border-b border-gray-700">
                                    <div className="p-1.5 border-r border-gray-700 bg-gray-950 text-left">
                                        <span className="font-bold text-sm text-orange-400">CON</span>
                                        <span className="text-[7px] text-gray-500 uppercase block">Constitución</span>
                                    </div>
                                    <div className="p-1.5 border-r border-gray-700 flex items-center justify-center">
                                        <div className="text-center">
                                            <span className="text-gray-200 font-bold">16</span>
                                            <span className="text-green-400 text-[9px] block">(14+2)</span>
                                        </div>
                                    </div>
                                    <div className="p-1.5 border-r border-gray-700 bg-gold-900/10 flex items-center justify-center">
                                        <span className="text-gold-400 font-bold text-lg">+3</span>
                                    </div>
                                    <div className="p-1.5 border-r border-gray-700 flex items-center justify-center opacity-50">
                                        <span className="text-gray-600">—</span>
                                    </div>
                                    <div className="p-1.5 flex items-center justify-center opacity-50">
                                        <span className="text-gray-600">—</span>
                                    </div>
                                </div>
                                {/* INT */}
                                <div className="grid grid-cols-5 text-center border-b border-gray-700 bg-gray-950/20">
                                    <div className="p-1.5 border-r border-gray-700 bg-gray-950 text-left">
                                        <span className="font-bold text-sm text-blue-400">INT</span>
                                        <span className="text-[7px] text-gray-500 uppercase block">Inteligencia</span>
                                    </div>
                                    <div className="p-1.5 border-r border-gray-700 flex items-center justify-center">
                                        <span className="text-gray-200 font-bold">10</span>
                                    </div>
                                    <div className="p-1.5 border-r border-gray-700 bg-gold-900/10 flex items-center justify-center">
                                        <span className="text-gray-400 font-bold text-lg">+0</span>
                                    </div>
                                    <div className="p-1.5 border-r border-gray-700 flex items-center justify-center opacity-50">
                                        <span className="text-gray-600">—</span>
                                    </div>
                                    <div className="p-1.5 flex items-center justify-center opacity-50">
                                        <span className="text-gray-600">—</span>
                                    </div>
                                </div>
                                {/* SAB */}
                                <div className="grid grid-cols-5 text-center border-b border-gray-700">
                                    <div className="p-1.5 border-r border-gray-700 bg-gray-950 text-left">
                                        <span className="font-bold text-sm text-purple-400">SAB</span>
                                        <span className="text-[7px] text-gray-500 uppercase block">Sabiduría</span>
                                    </div>
                                    <div className="p-1.5 border-r border-gray-700 flex items-center justify-center">
                                        <span className="text-gray-200 font-bold">13</span>
                                    </div>
                                    <div className="p-1.5 border-r border-gray-700 bg-gold-900/10 flex items-center justify-center">
                                        <span className="text-gold-400 font-bold text-lg">+1</span>
                                    </div>
                                    <div className="p-1.5 border-r border-gray-700 flex items-center justify-center opacity-50">
                                        <span className="text-gray-600">—</span>
                                    </div>
                                    <div className="p-1.5 flex items-center justify-center opacity-50">
                                        <span className="text-gray-600">—</span>
                                    </div>
                                </div>
                                {/* CAR - Con penalizador racial */}
                                <div className="grid grid-cols-5 text-center">
                                    <div className="p-1.5 border-r border-gray-700 bg-gray-950 text-left">
                                        <span className="font-bold text-sm text-pink-400">CAR</span>
                                        <span className="text-[7px] text-gray-500 uppercase block">Carisma</span>
                                    </div>
                                    <div className="p-1.5 border-r border-gray-700 flex items-center justify-center">
                                        <div className="text-center">
                                            <span className="text-gray-200 font-bold">8</span>
                                            <span className="text-red-400 text-[9px] block">(10-2)</span>
                                        </div>
                                    </div>
                                    <div className="p-1.5 border-r border-gray-700 bg-gold-900/10 flex items-center justify-center">
                                        <span className="text-red-400 font-bold text-lg">-1</span>
                                    </div>
                                    <div className="p-1.5 border-r border-gray-700 flex items-center justify-center opacity-50">
                                        <span className="text-gray-600">—</span>
                                    </div>
                                    <div className="p-1.5 flex items-center justify-center opacity-50">
                                        <span className="text-gray-600">—</span>
                                    </div>
                                </div>
                                {/* Nota explicativa */}
                                <div className="bg-gray-950/50 px-3 py-2 border-t border-gray-700">
                                    <p className="text-gray-400 text-[10px]">
                                        <strong className="text-gold-400">Nota:</strong> CON muestra <strong className="text-green-400">(14+2)</strong> porque el Enano tiene +2 racial.
                                        CAR muestra <strong className="text-red-400">(10-2)</strong> porque el Enano tiene -2 racial.
                                        El modificador negativo <strong className="text-red-400">-1</strong> se resta de las tiradas de Carisma.
                                    </p>
                                </div>
                            </div>

                            {/* Tabla de referencia rápida de modificadores - HORIZONTAL COMPACTA */}
                            <div className="border border-gray-700 rounded bg-gray-900/30 overflow-hidden">
                                <div className="bg-gray-950 px-3 py-1 border-b border-gray-700 flex items-center justify-between">
                                    <span className="text-gray-300 text-xs font-semibold">📊 Puntuación → Modificador</span>
                                </div>
                                <div className="p-2 flex flex-wrap gap-1 justify-center text-center text-[10px]">
                                    {[
                                        { punt: '1', mod: '-5', color: 'text-red-500' },
                                        { punt: '2-3', mod: '-4', color: 'text-red-500' },
                                        { punt: '4-5', mod: '-3', color: 'text-red-400' },
                                        { punt: '6-7', mod: '-2', color: 'text-red-400' },
                                        { punt: '8-9', mod: '-1', color: 'text-red-300' },
                                        { punt: '10-11', mod: '+0', color: 'text-gray-400' },
                                        { punt: '12-13', mod: '+1', color: 'text-green-300' },
                                        { punt: '14-15', mod: '+2', color: 'text-green-400' },
                                        { punt: '16-17', mod: '+3', color: 'text-green-400' },
                                        { punt: '18-19', mod: '+4', color: 'text-gold-400' },
                                        { punt: '20-21', mod: '+5', color: 'text-gold-400' },
                                        { punt: '22-23', mod: '+6', color: 'text-gold-300' },
                                        { punt: '24-25', mod: '+7', color: 'text-gold-300' },
                                        { punt: '26+', mod: '+8+', color: 'text-purple-400' },
                                    ].map((item, i) => (
                                        <div key={i} className="bg-gray-950/50 rounded px-2 py-1 min-w-[45px]">
                                            <span className="text-gray-500">{item.punt}</span>
                                            <span className={`font-bold ml-1 ${item.color}`}>{item.mod}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Explicaciones */}
                            <div className="bg-gray-900/40 p-4 rounded text-sm space-y-3">
                                <div>
                                    <strong className="text-gold-400 block mb-1">Puntuación de Característica</strong>
                                    <p className="text-gray-300">
                                        <strong>Base (Dados) + Bonus Racial + Bonus por Nivel</strong>.
                                        <br />
                                        <em>Ej:</em> Orco (FUE +4) con 14 base = <strong>18</strong> de Fuerza.
                                    </p>
                                </div>
                                <div>
                                    <strong className="text-gold-400 block mb-1">Modificador de Característica</strong>
                                    <p className="text-gray-300">
                                        Fórmula: <code className="bg-gray-950 px-1 rounded">(Puntuación - 10) / 2</code> redondeado abajo.
                                        <br />
                                        <em>Ej:</em> FUE 18 → (18-10)/2 = <strong className="text-gold-400">+4</strong>
                                    </p>
                                </div>
                                <div>
                                    <strong className="text-gold-400 block mb-1">Temporales</strong>
                                    <p className="text-gray-300">
                                        Solo cuando un hechizo o efecto modifica tus stats temporalmente (ej. <em>Fuerza de Toro</em>, <em>Furia</em>).
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* 3. Clase de Armadura */}
                    <Card className="card border-blue-500/30">
                        <CardHeader className="bg-gradient-to-r from-blue-900/20 to-transparent">
                            <CardTitle className="flex items-center gap-3 text-xl">
                                <Shield className="h-5 w-5 text-blue-400" />
                                Clase de Armadura (CA)
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-6">
                            {/* Replica de la sección CA oficial */}
                            <div className="border-2 border-gray-600 rounded bg-white/5 overflow-hidden">
                                {/* Fila 1: CA Principal */}
                                <div className="flex items-stretch border-b-2 border-gray-600">
                                    {/* CA Label negro */}
                                    <div className="bg-gray-950 px-3 py-2 flex items-center border-r-2 border-gray-600">
                                        <span className="text-white font-bold text-sm uppercase tracking-wide">CA</span>
                                    </div>
                                    {/* TOTAL box grande */}
                                    <div className="flex flex-col items-center justify-center px-4 py-2 border-r-2 border-gray-600 bg-blue-900/20 min-w-[60px]">
                                        <div className="w-12 h-10 border-2 border-blue-500/50 bg-gray-900 rounded flex items-center justify-center">
                                            <span className="text-blue-400 font-bold text-xl"></span>
                                        </div>
                                        <span className="text-[8px] text-blue-400 uppercase mt-1 font-bold">Total</span>
                                    </div>
                                    {/* = 10 + */}
                                    <div className="flex items-center px-2 border-r border-gray-600">
                                        <span className="text-gray-500 font-bold">=10+</span>
                                    </div>
                                    {/* Modificadores en fila */}
                                    <div className="flex-1 flex">
                                        {[
                                            { label: 'Bon. Armadura', color: 'text-gray-400' },
                                            { label: 'Bon. Escudo', color: 'text-gray-400' },
                                            { label: 'Mod. Des', color: 'text-green-400' },
                                            { label: 'Mod. Tamaño', color: 'text-gray-400' },
                                            { label: 'Arm. Natural', color: 'text-gray-400' },
                                            { label: 'Mod. Desvío', color: 'text-gray-400' },
                                            { label: 'Mod. Varios', color: 'text-gray-400' },
                                        ].map((mod, i) => (
                                            <div key={i} className={`flex flex-col items-center justify-center px-1 py-1 ${i < 6 ? 'border-r border-gray-700' : ''} flex-1`}>
                                                <div className="w-8 h-7 border border-gray-600 bg-gray-900 text-center text-sm"></div>
                                                <span className={`text-[7px] uppercase mt-1 text-center leading-tight ${mod.color}`}>{mod.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                {/* Fila 2: Toque y Desprevenido */}
                                <div className="flex border-b border-gray-600">
                                    <div className="flex-1 flex items-center justify-center gap-2 py-2 border-r border-gray-600">
                                        <span className="text-[9px] text-gray-500 uppercase">De Toque</span>
                                        <div className="w-10 h-7 border border-gray-600 bg-gray-900"></div>
                                    </div>
                                    <div className="flex-1 flex items-center justify-center gap-2 py-2">
                                        <span className="text-[9px] text-gray-500 uppercase">Desprevenido</span>
                                        <div className="w-10 h-7 border border-gray-600 bg-gray-900"></div>
                                    </div>
                                </div>
                                {/* Fila 3: Modificadores Condicionales */}
                                <div className="px-2 py-1 text-center">
                                    <span className="text-[8px] text-gray-500 uppercase">Modificadores Condicionales</span>
                                </div>
                            </div>

                            {/* Ejemplo rellenado */}
                            <div className="border-2 border-gold-500/50 rounded bg-gray-900/40 overflow-hidden">
                                <div className="bg-gold-900/30 px-3 py-1 border-b border-gold-500/30">
                                    <span className="text-gold-400 text-xs font-semibold">✏️ Ejemplo: Guerrero con Cota de Mallas (+5), Escudo (+2), Des +1</span>
                                </div>
                                <div className="flex items-stretch border-b border-gray-700">
                                    <div className="bg-gray-950 px-3 py-2 flex items-center border-r border-gray-700">
                                        <span className="text-gold-400 font-bold text-sm uppercase">CA</span>
                                    </div>
                                    <div className="flex flex-col items-center justify-center px-4 py-2 border-r border-gray-700 bg-blue-900/20 min-w-[60px]">
                                        <div className="w-12 h-10 border-2 border-blue-500/50 bg-gray-900 rounded flex items-center justify-center">
                                            <span className="text-blue-400 font-bold text-xl">18</span>
                                        </div>
                                        <span className="text-[8px] text-blue-400 uppercase mt-1 font-bold">Total</span>
                                    </div>
                                    <div className="flex items-center px-2 border-r border-gray-700">
                                        <span className="text-gray-500 font-bold">=10+</span>
                                    </div>
                                    <div className="flex-1 flex">
                                        {['+5', '+2', '+1', '+0', '+0', '+0', '+0'].map((val, i) => (
                                            <div key={i} className={`flex flex-col items-center justify-center px-1 py-1 ${i < 6 ? 'border-r border-gray-700' : ''} flex-1`}>
                                                <div className="w-8 h-7 border border-gray-600 bg-gray-900 text-center text-sm flex items-center justify-center">
                                                    <span className="text-gold-400 font-bold text-xs">{val}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="flex-1 flex items-center justify-center gap-2 py-2 border-r border-gray-700">
                                        <span className="text-[9px] text-gray-400 uppercase">De Toque</span>
                                        <div className="w-10 h-7 border border-gray-600 bg-gray-900 flex items-center justify-center">
                                            <span className="text-gold-400 font-bold">11</span>
                                        </div>
                                    </div>
                                    <div className="flex-1 flex items-center justify-center gap-2 py-2">
                                        <span className="text-[9px] text-gray-400 uppercase">Desprevenido</span>
                                        <div className="w-10 h-7 border border-gray-600 bg-gray-900 flex items-center justify-center">
                                            <span className="text-gold-400 font-bold">17</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Explicaciones */}
                            <div className="grid md:grid-cols-2 gap-4 text-sm">
                                <div className="space-y-3">
                                    <div className="bg-gray-900/40 p-3 rounded">
                                        <strong className="text-blue-300 block mb-1">CA de Toque</strong>
                                        <p className="text-xs text-gray-300 mb-1">
                                            Lo difícil que es <em>tocarte</em>. Se usa contra rayos, agarres, armas de contacto.
                                        </p>
                                        <code className="text-xs text-gray-400 block bg-gray-950/50 p-1 rounded">
                                            10 + Des + Tamaño + Desvío
                                        </code>
                                        <p className="text-xs text-red-400 mt-1">
                                            NO sumas: Armadura, Escudo ni Armadura Natural.
                                        </p>
                                    </div>
                                    <div className="bg-gray-900/40 p-3 rounded">
                                        <strong className="text-blue-300 block mb-1">CA Desprevenido</strong>
                                        <p className="text-xs text-gray-300 mb-1">
                                            Tu defensa cuando no puedes esquivar (sorpresa, invisible, escalando).
                                        </p>
                                        <code className="text-xs text-gray-400 block bg-gray-950/50 p-1 rounded">
                                            10 + Armadura + Escudo + Tamaño + Natural + Desvío
                                        </code>
                                        <p className="text-xs text-red-400 mt-1">
                                            NO sumas: Modificador de Destreza.
                                        </p>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="bg-gray-900/40 p-3 rounded">
                                        <strong className="text-gold-400 block mb-1">Modificadores Condicionales</strong>
                                        <p className="text-xs text-gray-300">
                                            Bonos que solo aplican en ciertas situaciones.
                                        </p>
                                        <p className="text-xs text-gray-400 mt-1 italic">
                                            Ej: "+4 contra Gigantes" (rasgo de Enano).
                                        </p>
                                    </div>
                                    <div className="bg-gray-900/40 p-3 rounded">
                                        <strong className="text-gray-200 block mb-1">Fórmula Completa</strong>
                                        <code className="text-[10px] text-gray-400 block bg-gray-950/50 p-1 rounded">
                                            Total = 10 + Armadura + Escudo + Des + Tamaño + Natural + Desvío + Varios
                                        </code>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    {/* 4. Puntos de Golpe */}
                    <Card className="card border-red-500/30">
                        <CardHeader className="bg-gradient-to-r from-red-900/20 to-transparent">
                            <CardTitle className="flex items-center gap-3 text-xl">
                                <Heart className="h-5 w-5 text-red-400" />
                                Puntos de Golpe (PG)
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-6">
                            {/* Replica de la sección PG oficial */}
                            <div className="border-2 border-gray-600 rounded bg-white/5 overflow-hidden">
                                {/* Fila 1: PG Principal */}
                                <div className="flex items-stretch border-b-2 border-gray-600">
                                    <div className="bg-gray-950 px-3 py-2 flex items-center border-r-2 border-gray-600">
                                        <span className="text-white font-bold text-sm uppercase tracking-wide">PG</span>
                                    </div>
                                    {/* TOTAL grande */}
                                    <div className="flex flex-col items-center justify-center px-4 py-2 border-r-2 border-gray-600 bg-red-900/20 min-w-[70px]">
                                        <div className="w-14 h-12 border-2 border-red-500/50 bg-gray-900 rounded flex items-center justify-center">
                                            <span className="text-red-400 font-bold text-2xl"></span>
                                        </div>
                                        <span className="text-[8px] text-red-400 uppercase mt-1 font-bold">Total</span>
                                    </div>
                                    {/* Dados de Golpe */}
                                    <div className="flex flex-col items-center justify-center px-3 py-2 border-r border-gray-600">
                                        <span className="text-[8px] text-gray-500 uppercase">Dados de Golpe</span>
                                        <div className="w-16 h-6 border border-gray-600 bg-gray-900 mt-1"></div>
                                    </div>
                                    {/* Heridas / PG Actuales */}
                                    <div className="flex-1 flex flex-col items-center justify-center px-3 py-2 border-r border-gray-600">
                                        <span className="text-[8px] text-gray-500 uppercase">Heridas / PG Actuales</span>
                                        <div className="w-full h-8 border border-gray-600 bg-gray-900 mt-1"></div>
                                    </div>
                                    {/* Daño No Letal */}
                                    <div className="flex flex-col items-center justify-center px-3 py-2">
                                        <span className="text-[8px] text-gray-500 uppercase">Daño No Letal</span>
                                        <div className="w-16 h-6 border border-gray-600 bg-gray-900 mt-1"></div>
                                    </div>
                                </div>
                                {/* Fila 2: Reducción de Daño */}
                                <div className="flex items-center px-2 py-1 gap-2">
                                    <span className="text-[9px] text-gray-500 uppercase">Reducción de Daño</span>
                                    <div className="flex-1 border-b border-gray-600"></div>
                                </div>
                            </div>

                            {/* Ejemplo rellenado */}
                            <div className="border-2 border-gold-500/50 rounded bg-gray-900/40 overflow-hidden">
                                <div className="bg-gold-900/30 px-3 py-1 border-b border-gold-500/30">
                                    <span className="text-gold-400 text-xs font-semibold">✏️ Ejemplo: Bárbaro nivel 1 con CON 16 (+3)</span>
                                </div>
                                <div className="flex items-stretch border-b border-gray-700">
                                    <div className="bg-gray-950 px-3 py-2 flex items-center border-r border-gray-700">
                                        <span className="text-gold-400 font-bold text-sm uppercase">PG</span>
                                    </div>
                                    <div className="flex flex-col items-center justify-center px-4 py-2 border-r border-gray-700 bg-red-900/20 min-w-[70px]">
                                        <div className="w-14 h-12 border-2 border-red-500/50 bg-gray-900 rounded flex items-center justify-center">
                                            <span className="text-red-400 font-bold text-2xl">15</span>
                                        </div>
                                        <span className="text-[8px] text-red-400 uppercase mt-1 font-bold">Total</span>
                                    </div>
                                    <div className="flex flex-col items-center justify-center px-3 py-2 border-r border-gray-700">
                                        <span className="text-[8px] text-gray-500 uppercase">Dados de Golpe</span>
                                        <div className="w-16 h-6 border border-gray-600 bg-gray-900 mt-1 flex items-center justify-center">
                                            <span className="text-gold-400 text-xs font-bold">1d12</span>
                                        </div>
                                    </div>
                                    <div className="flex-1 flex flex-col items-center justify-center px-3 py-2 border-r border-gray-700">
                                        <span className="text-[8px] text-gray-500 uppercase">Heridas / PG Actuales</span>
                                        <div className="w-full h-8 border border-gray-600 bg-gray-900 mt-1 flex items-center justify-center">
                                            <span className="text-gray-400 text-xs">_____ / 15</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-center justify-center px-3 py-2">
                                        <span className="text-[8px] text-gray-500 uppercase">Daño No Letal</span>
                                        <div className="w-16 h-6 border border-gray-600 bg-gray-900 mt-1 flex items-center justify-center">
                                            <span className="text-gray-500 text-xs">—</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center px-2 py-1 gap-2 bg-gray-950/30">
                                    <span className="text-[9px] text-gray-500 uppercase">Reducción de Daño</span>
                                    <span className="text-gray-400 text-xs">— (ninguna a nivel 1)</span>
                                </div>
                            </div>

                            {/* Explicaciones */}
                            <div className="grid md:grid-cols-2 gap-4 text-sm">
                                <div className="space-y-3">
                                    <div className="bg-gray-900/40 p-3 rounded">
                                        <strong className="text-red-300 block mb-1">Total de PG (Nivel 1)</strong>
                                        <p className="text-xs text-gray-300">
                                            <strong>Máximo del Dado de Golpe + Mod. CON</strong>
                                        </p>
                                        <p className="text-xs text-gray-400 mt-1 italic">
                                            Ej: Bárbaro (d12 máx = 12) + CON +3 = <strong className="text-red-400">15 PG</strong>
                                        </p>
                                    </div>
                                    <div className="bg-gray-900/40 p-3 rounded">
                                        <strong className="text-red-300 block mb-1">Dados de Golpe</strong>
                                        <p className="text-xs text-gray-300">
                                            Tipo de dado de tu clase: d4, d6, d8, d10 o d12.
                                        </p>
                                        <div className="flex gap-2 mt-2 text-[10px]">
                                            <span className="bg-gray-950 px-1 rounded text-gray-400">Mago: d4</span>
                                            <span className="bg-gray-950 px-1 rounded text-gray-400">Pícaro: d6</span>
                                            <span className="bg-gray-950 px-1 rounded text-gray-400">Clérigo: d8</span>
                                            <span className="bg-gray-950 px-1 rounded text-gray-400">Guerrero: d10</span>
                                            <span className="bg-gray-950 px-1 rounded text-gray-400">Bárbaro: d12</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="bg-gray-900/40 p-3 rounded">
                                        <strong className="text-red-300 block mb-1">Heridas / PG Actuales</strong>
                                        <p className="text-xs text-gray-300">
                                            Aquí vas restando el daño que recibes. Si llega a <strong className="text-red-400">-10</strong>, mueres.
                                        </p>
                                    </div>
                                    <div className="bg-gray-900/40 p-3 rounded">
                                        <strong className="text-red-300 block mb-1">Daño No Letal</strong>
                                        <p className="text-xs text-gray-300">
                                            Daño que aturde pero no mata (puñetazos, fatiga). Se anota aparte.
                                        </p>
                                    </div>
                                    <div className="bg-gray-900/40 p-3 rounded">
                                        <strong className="text-red-300 block mb-1">Reducción de Daño (RD)</strong>
                                        <p className="text-xs text-gray-300">
                                            Ignora los primeros X puntos de cada golpe. <strong>A nivel 1 suele estar vacío.</strong>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* 5. Iniciativa & Velocidad */}
                    <Card className="card border-yellow-500/30">
                        <CardHeader className="bg-gradient-to-r from-yellow-900/20 to-transparent">
                            <CardTitle className="flex items-center gap-3 text-xl">
                                <Zap className="h-5 w-5 text-yellow-400" />
                                Iniciativa y Velocidad
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-6">
                            {/* Replica de Iniciativa y Velocidad estilo oficial */}
                            <div className="grid md:grid-cols-2 gap-4">
                                {/* INICIATIVA */}
                                <div className="border-2 border-gray-600 rounded bg-white/5 overflow-hidden">
                                    <div className="flex items-stretch border-b border-gray-600">
                                        <div className="bg-gray-950 px-3 py-2 flex items-center border-r-2 border-gray-600">
                                            <span className="text-white font-bold text-xs uppercase tracking-wide">Iniciativa</span>
                                        </div>
                                        <div className="flex flex-col items-center justify-center px-3 py-2 border-r border-gray-600 bg-yellow-900/20 min-w-[50px]">
                                            <div className="w-10 h-8 border-2 border-yellow-500/50 bg-gray-900 rounded flex items-center justify-center">
                                                <span className="text-yellow-400 font-bold text-lg"></span>
                                            </div>
                                            <span className="text-[7px] text-yellow-400 uppercase mt-1 font-bold">Total</span>
                                        </div>
                                        <div className="flex items-center px-1 text-gray-500 text-sm">=</div>
                                        <div className="flex flex-col items-center justify-center px-2 py-1 border-r border-gray-700 flex-1">
                                            <div className="w-8 h-6 border border-gray-600 bg-gray-900"></div>
                                            <span className="text-[7px] text-green-400 uppercase mt-1">Mod. Des</span>
                                        </div>
                                        <div className="flex items-center px-1 text-gray-500 text-sm">+</div>
                                        <div className="flex flex-col items-center justify-center px-2 py-1 flex-1">
                                            <div className="w-8 h-6 border border-gray-600 bg-gray-900"></div>
                                            <span className="text-[7px] text-gray-400 uppercase mt-1">Varios</span>
                                        </div>
                                    </div>
                                </div>
                                {/* VELOCIDAD */}
                                <div className="border-2 border-gray-600 rounded bg-white/5 overflow-hidden">
                                    <div className="flex items-stretch">
                                        <div className="bg-gray-950 px-3 py-2 flex items-center border-r-2 border-gray-600">
                                            <span className="text-white font-bold text-xs uppercase tracking-wide">Velocidad</span>
                                        </div>
                                        <div className="flex-1 grid grid-cols-3 text-center">
                                            <div className="p-2 border-r border-gray-600">
                                                <div className="w-12 h-6 border border-gray-600 bg-gray-900 mx-auto"></div>
                                                <span className="text-[7px] text-gray-500 uppercase mt-1 block">Base</span>
                                            </div>
                                            <div className="p-2 border-r border-gray-600">
                                                <div className="w-12 h-6 border border-gray-600 bg-gray-900 mx-auto"></div>
                                                <span className="text-[7px] text-gray-500 uppercase mt-1 block">Con Armadura</span>
                                            </div>
                                            <div className="p-2">
                                                <div className="w-12 h-6 border border-gray-600 bg-gray-900 mx-auto"></div>
                                                <span className="text-[7px] text-gray-500 uppercase mt-1 block">Volar/Nadar</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Ejemplo rellenado */}
                            <div className="border-2 border-gold-500/50 rounded bg-gray-900/40 overflow-hidden">
                                <div className="bg-gold-900/30 px-3 py-1 border-b border-gold-500/30">
                                    <span className="text-gold-400 text-xs font-semibold">✏️ Ejemplo: Guerrero con DES 14 (+2) y dote Iniciativa Mejorada (+4)</span>
                                </div>
                                <div className="grid md:grid-cols-2 gap-4 p-3">
                                    <div className="flex items-center gap-2">
                                        <span className="text-yellow-400 font-bold">Iniciativa:</span>
                                        <span className="text-gold-400 font-bold text-xl">+6</span>
                                        <span className="text-gray-400 text-xs">= +2 (Des) + 4 (Dote)</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-gray-300 font-bold">Velocidad:</span>
                                        <span className="text-gray-200">30 pies</span>
                                        <span className="text-gray-400 text-xs">(Humano en armadura ligera)</span>
                                    </div>
                                </div>
                            </div>

                            {/* Explicaciones breves */}
                            <div className="grid md:grid-cols-2 gap-4 text-sm">
                                <div className="bg-gray-900/40 p-3 rounded">
                                    <strong className="text-yellow-300 block mb-1">Iniciativa</strong>
                                    <p className="text-xs text-gray-300">
                                        Determina quién actúa primero en combate. <strong>Mod. Des + bonos de dotes/objetos</strong>.
                                    </p>
                                </div>
                                <div className="bg-gray-900/40 p-3 rounded">
                                    <strong className="text-gray-200 block mb-1">Velocidad</strong>
                                    <p className="text-xs text-gray-300">
                                        Cuántos pies te mueves por ronda. La armadura media/pesada puede reducirla.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* 6. Salvaciones */}
                    <Card className="card border-green-500/30">
                        <CardHeader className="bg-gradient-to-r from-green-900/20 to-transparent">
                            <CardTitle className="flex items-center gap-3 text-xl">
                                <Shield className="h-5 w-5 text-green-400" />
                                Tiradas de Salvación
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-6">
                            {/* Replica de Salvaciones estilo oficial */}
                            <div className="border-2 border-gray-600 rounded bg-white/5 overflow-hidden">
                                {/* Header de columnas */}
                                <div className="flex items-stretch border-b-2 border-gray-600 text-[8px] uppercase">
                                    <div className="bg-gray-950 px-2 py-1 border-r-2 border-gray-600 min-w-[90px]">
                                        <span className="text-white font-bold">Salvación</span>
                                    </div>
                                    <div className="flex-1 flex text-center">
                                        <div className="flex-1 p-1 border-r border-gray-600 bg-green-900/20">
                                            <span className="text-green-400 font-bold">Total</span>
                                        </div>
                                        <div className="flex-1 p-1 border-r border-gray-600">
                                            <span className="text-gray-400">Base</span>
                                        </div>
                                        <div className="flex-1 p-1 border-r border-gray-600">
                                            <span className="text-gray-400">Mod. Car.</span>
                                        </div>
                                        <div className="flex-1 p-1 border-r border-gray-600">
                                            <span className="text-gray-400">Mágico</span>
                                        </div>
                                        <div className="flex-1 p-1 border-r border-gray-600">
                                            <span className="text-gray-400">Varios</span>
                                        </div>
                                        <div className="flex-1 p-1">
                                            <span className="text-gray-500">Temp</span>
                                        </div>
                                    </div>
                                </div>
                                {/* Filas de salvaciones */}
                                {[
                                    { name: 'Fortaleza', sub: '(Constitución)', color: 'text-red-400', bgColor: 'bg-red-900/10' },
                                    { name: 'Reflejos', sub: '(Destreza)', color: 'text-blue-400', bgColor: 'bg-blue-900/10' },
                                    { name: 'Voluntad', sub: '(Sabiduría)', color: 'text-purple-400', bgColor: 'bg-purple-900/10' },
                                ].map((save, i) => (
                                    <div key={save.name} className={`flex items-stretch ${i < 2 ? 'border-b border-gray-700' : ''}`}>
                                        <div className={`px-2 py-2 border-r-2 border-gray-600 min-w-[90px] ${save.bgColor}`}>
                                            <span className={`font-bold text-sm ${save.color}`}>{save.name}</span>
                                            <span className="text-[8px] text-gray-500 block">{save.sub}</span>
                                        </div>
                                        <div className="flex-1 flex text-center items-center">
                                            <div className="flex-1 p-1 border-r border-gray-700 bg-green-900/10">
                                                <div className="w-8 h-6 border-2 border-green-500/50 bg-gray-900 rounded mx-auto"></div>
                                            </div>
                                            <div className="flex-1 p-1 border-r border-gray-700">
                                                <div className="w-7 h-5 border border-gray-600 bg-gray-900 mx-auto"></div>
                                            </div>
                                            <div className="flex-1 p-1 border-r border-gray-700">
                                                <div className="w-7 h-5 border border-gray-600 bg-gray-900 mx-auto"></div>
                                            </div>
                                            <div className="flex-1 p-1 border-r border-gray-700">
                                                <div className="w-7 h-5 border border-gray-600 bg-gray-900 mx-auto"></div>
                                            </div>
                                            <div className="flex-1 p-1 border-r border-gray-700">
                                                <div className="w-7 h-5 border border-gray-600 bg-gray-900 mx-auto"></div>
                                            </div>
                                            <div className="flex-1 p-1">
                                                <div className="w-7 h-5 border border-dashed border-gray-600 bg-gray-950/30 mx-auto"></div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {/* Modificadores condicionales */}
                                <div className="px-2 py-1 border-t border-gray-600">
                                    <span className="text-[8px] text-gray-500 uppercase">Modificadores Condicionales</span>
                                </div>
                            </div>

                            {/* Ejemplo rellenado */}
                            <div className="border-2 border-gold-500/50 rounded bg-gray-900/40 overflow-hidden">
                                <div className="bg-gold-900/30 px-3 py-1 border-b border-gold-500/30">
                                    <span className="text-gold-400 text-xs font-semibold">✏️ Ejemplo: Guerrero nivel 1 (CON 14, DES 12, SAB 10)</span>
                                </div>
                                <div className="p-3">
                                    <div className="grid grid-cols-3 gap-4 text-center text-xs">
                                        <div>
                                            <span className="text-red-400 font-bold block">Fortaleza</span>
                                            <span className="text-gold-400 text-lg font-bold">+4</span>
                                            <span className="text-gray-400 block text-[10px]">=+2 (base) +2 (CON)</span>
                                        </div>
                                        <div>
                                            <span className="text-blue-400 font-bold block">Reflejos</span>
                                            <span className="text-gold-400 text-lg font-bold">+1</span>
                                            <span className="text-gray-400 block text-[10px]">=+0 (base) +1 (DES)</span>
                                        </div>
                                        <div>
                                            <span className="text-purple-400 font-bold block">Voluntad</span>
                                            <span className="text-gold-400 text-lg font-bold">+0</span>
                                            <span className="text-gray-400 block text-[10px]">=+0 (base) +0 (SAB)</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Explicaciones */}
                            <div className="grid md:grid-cols-3 gap-4 text-sm">
                                <div className="bg-red-900/20 p-3 rounded border border-red-500/30">
                                    <strong className="text-red-300 block mb-1">Fortaleza (Fort)</strong>
                                    <p className="text-xs text-gray-300">
                                        Resistir venenos, enfermedades, efectos físicos. Usa <strong>CON</strong>.
                                    </p>
                                </div>
                                <div className="bg-blue-900/20 p-3 rounded border border-blue-500/30">
                                    <strong className="text-blue-300 block mb-1">Reflejos (Ref)</strong>
                                    <p className="text-xs text-gray-300">
                                        Esquivar explosiones, trampas, bolas de fuego. Usa <strong>DES</strong>.
                                    </p>
                                </div>
                                <div className="bg-purple-900/20 p-3 rounded border border-purple-500/30">
                                    <strong className="text-purple-300 block mb-1">Voluntad (Vol)</strong>
                                    <p className="text-xs text-gray-300">
                                        Resistir control mental, ilusiones, miedo. Usa <strong>SAB</strong>.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* 6. Combate: Ataque Base */}
                    <Card className="card border-red-500/30">
                        <CardHeader className="bg-gradient-to-r from-red-900/20 to-transparent">
                            <CardTitle className="flex items-center gap-3 text-xl">
                                <Sword className="h-5 w-5 text-red-400" />
                                Ataque Base
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-6 text-sm">

                            {/* Réplica de hoja oficial D&D 3.5 */}
                            <div className="border-2 border-gray-600 rounded bg-white/5 overflow-hidden">
                                <div className="flex items-stretch">
                                    {/* Header negro ATAQUE BASE */}
                                    <div className="bg-gray-950 px-3 py-3 flex items-center justify-center border-r-2 border-gray-600" style={{ minWidth: '100px' }}>
                                        <span className="text-white font-bold text-[10px] uppercase tracking-wide text-center leading-tight">Bon. de<br />Ataque<br />Base</span>
                                    </div>
                                    {/* TOTAL box */}
                                    <div className="flex-1 flex flex-col items-center justify-center py-2 border-r border-gray-600 bg-red-900/10">
                                        <span className="text-[7px] text-gray-500 uppercase tracking-wider">Total</span>
                                        <div className="border-2 border-red-500/50 rounded px-6 py-1 bg-gray-950 mt-1">
                                            <span className="text-gray-500 text-lg font-mono">&nbsp;&nbsp;&nbsp;</span>
                                        </div>
                                    </div>
                                    {/* Info de ataques múltiples */}
                                    <div className="flex-1 flex flex-col items-center justify-center py-2 px-3">
                                        <span className="text-[7px] text-gray-500 uppercase tracking-wider text-center">Segundo<br />Ataque</span>
                                        <div className="border border-gray-600 rounded px-4 py-1 bg-gray-950/50 mt-1">
                                            <span className="text-gray-600 text-sm font-mono">—</span>
                                        </div>
                                    </div>
                                    <div className="flex-1 flex flex-col items-center justify-center py-2 px-3">
                                        <span className="text-[7px] text-gray-500 uppercase tracking-wider text-center">Tercer<br />Ataque</span>
                                        <div className="border border-gray-600 rounded px-4 py-1 bg-gray-950/50 mt-1">
                                            <span className="text-gray-600 text-sm font-mono">—</span>
                                        </div>
                                    </div>
                                    <div className="flex-1 flex flex-col items-center justify-center py-2 px-3">
                                        <span className="text-[7px] text-gray-500 uppercase tracking-wider text-center">Cuarto<br />Ataque</span>
                                        <div className="border border-gray-600 rounded px-4 py-1 bg-gray-950/50 mt-1">
                                            <span className="text-gray-600 text-sm font-mono">—</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Ejemplo rellenado */}
                            <div className="border-2 border-gold-500/50 rounded bg-gray-900/40 overflow-hidden">
                                <div className="bg-gold-900/30 px-3 py-1 border-b border-gold-500/30">
                                    <span className="text-gold-400 text-xs font-semibold">✏️ Ejemplo: Guerrero nivel 6</span>
                                </div>
                                <div className="flex items-stretch">
                                    <div className="bg-gray-950 px-3 py-3 flex items-center justify-center border-r border-gray-700" style={{ minWidth: '100px' }}>
                                        <span className="text-gold-400 font-bold text-[10px] uppercase tracking-wide text-center leading-tight">Bon. de<br />Ataque<br />Base</span>
                                    </div>
                                    <div className="flex-1 flex flex-col items-center justify-center py-2 border-r border-gray-700 bg-red-900/20">
                                        <span className="text-[7px] text-gray-400 uppercase tracking-wider">Total</span>
                                        <div className="border-2 border-red-500/50 rounded px-4 py-1 bg-gray-950 mt-1">
                                            <span className="text-red-400 text-lg font-bold">+6</span>
                                        </div>
                                    </div>
                                    <div className="flex-1 flex flex-col items-center justify-center py-2 px-3 border-r border-gray-700">
                                        <span className="text-[7px] text-gray-400 uppercase tracking-wider text-center">Segundo<br />Ataque</span>
                                        <div className="border border-gray-600 rounded px-4 py-1 bg-gray-950 mt-1">
                                            <span className="text-gold-400 text-sm font-bold">+1</span>
                                        </div>
                                    </div>
                                    <div className="flex-1 flex flex-col items-center justify-center py-2 px-3 border-r border-gray-700">
                                        <span className="text-[7px] text-gray-400 uppercase tracking-wider text-center">Tercer<br />Ataque</span>
                                        <div className="border border-gray-600 rounded px-4 py-1 bg-gray-950/50 mt-1">
                                            <span className="text-gray-600 text-sm font-mono">—</span>
                                        </div>
                                    </div>
                                    <div className="flex-1 flex flex-col items-center justify-center py-2 px-3">
                                        <span className="text-[7px] text-gray-400 uppercase tracking-wider text-center">Cuarto<br />Ataque</span>
                                        <div className="border border-gray-600 rounded px-4 py-1 bg-gray-950/50 mt-1">
                                            <span className="text-gray-600 text-sm font-mono">—</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="px-3 py-2 bg-gray-950/30 text-xs text-gray-400 text-center">
                                    BAB +6/+1 = Ataque principal a +6, segundo ataque a +1
                                </div>
                            </div>

                            {/* Explicaciones */}
                            <div className="space-y-4">
                                <div>
                                    <strong className="text-red-300 block mb-2">¿Qué es el Bonificador de Ataque Base (BAB)?</strong>
                                    <p className="text-gray-300">
                                        Es tu <strong>habilidad marcial pura</strong>, sin contar fuerza, armas ni magia.
                                        Representa cuánto has aprendido a combatir por tu experiencia de clase.
                                    </p>
                                </div>
                                <div className="bg-gray-900/40 p-3 rounded border border-gray-700">
                                    <strong className="text-gold-400 block mb-2">¿Cómo se calcula?</strong>
                                    <p className="text-gray-300 mb-2">
                                        <strong>NO lo calculas tú.</strong> Lo copias directamente de la <strong>Tabla de Progresión de tu Clase</strong>.
                                    </p>
                                    <div className="grid grid-cols-3 gap-2 text-xs">
                                        <div className="bg-gray-950 p-2 rounded text-center">
                                            <span className="text-green-400 font-bold block">Bueno</span>
                                            <span className="text-gray-400">Guerrero, Bárbaro</span>
                                            <span className="text-gray-300 block">+1/nivel</span>
                                        </div>
                                        <div className="bg-gray-950 p-2 rounded text-center">
                                            <span className="text-yellow-400 font-bold block">Medio</span>
                                            <span className="text-gray-400">Clérigo, Pícaro</span>
                                            <span className="text-gray-300 block">+3/4 nivel</span>
                                        </div>
                                        <div className="bg-gray-950 p-2 rounded text-center">
                                            <span className="text-red-400 font-bold block">Malo</span>
                                            <span className="text-gray-400">Mago, Hechicero</span>
                                            <span className="text-gray-300 block">+1/2 nivel</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-900/40 p-3 rounded border border-gray-700">
                                    <strong className="text-gold-400 block mb-2">¿Para qué sirve?</strong>
                                    <ul className="text-gray-300 space-y-1 list-disc list-inside">
                                        <li>Es la <strong>base</strong> de tu bonificador de ataque (luego le sumas FUE o DES)</li>
                                        <li>Determina cuántos <strong>ataques extra</strong> tienes por ronda</li>
                                        <li>Se usa para calcular tu <strong>Modificador de Presa</strong></li>
                                    </ul>
                                </div>
                                <div className="bg-blue-900/20 p-3 rounded border border-blue-500/30">
                                    <strong className="text-blue-300 block mb-1">¿Qué es "+6/+1"?</strong>
                                    <p className="text-gray-300 text-xs">
                                        Cuando tu BAB llega a +6, ganas un segundo ataque a +1. A +11 ganas un tercero a +6/+1, etc.
                                        <br />
                                        <em>Ejemplo: Guerrero nivel 6 tiene BAB +6/+1 = Puede atacar dos veces por ronda.</em>
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* 7. Resistencia a Conjuros */}
                    <Card className="card border-purple-500/30">
                        <CardHeader className="bg-gradient-to-r from-purple-900/20 to-transparent">
                            <CardTitle className="flex items-center gap-3 text-xl">
                                <Shield className="h-5 w-5 text-purple-400" />
                                Resistencia a Conjuros (RC)
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-6 text-sm">

                            {/* Réplica de hoja oficial D&D 3.5 */}
                            <div className="border-2 border-gray-600 rounded bg-white/5 overflow-hidden">
                                <div className="flex items-stretch">
                                    {/* Header negro RC */}
                                    <div className="bg-gray-950 px-4 py-3 flex items-center justify-center border-r-2 border-gray-600" style={{ minWidth: '80px' }}>
                                        <span className="text-white font-bold text-sm uppercase tracking-wide">RC</span>
                                    </div>
                                    {/* TOTAL box */}
                                    <div className="flex-1 flex flex-col items-center justify-center py-3 bg-purple-900/10">
                                        <span className="text-[7px] text-gray-500 uppercase tracking-wider">Total</span>
                                        <div className="border-2 border-purple-500/50 rounded px-8 py-1 bg-gray-950 mt-1">
                                            <span className="text-gray-500 text-lg font-mono">&nbsp;&nbsp;&nbsp;</span>
                                        </div>
                                        <span className="text-[8px] text-gray-600 mt-1">Resistencia a Conjuros</span>
                                    </div>
                                </div>
                            </div>

                            {/* Ejemplo rellenado (Drow) */}
                            <div className="border-2 border-gold-500/50 rounded bg-gray-900/40 overflow-hidden">
                                <div className="bg-gold-900/30 px-3 py-1 border-b border-gold-500/30">
                                    <span className="text-gold-400 text-xs font-semibold">✏️ Ejemplo: Drow nivel 3</span>
                                </div>
                                <div className="flex items-stretch">
                                    <div className="bg-gray-950 px-4 py-3 flex items-center justify-center border-r border-gray-700" style={{ minWidth: '80px' }}>
                                        <span className="text-gold-400 font-bold text-sm uppercase tracking-wide">RC</span>
                                    </div>
                                    <div className="flex-1 flex flex-col items-center justify-center py-3 bg-purple-900/20">
                                        <span className="text-[7px] text-gray-400 uppercase tracking-wider">Total</span>
                                        <div className="border-2 border-purple-500/50 rounded px-6 py-1 bg-gray-950 mt-1">
                                            <span className="text-purple-400 text-lg font-bold">14</span>
                                        </div>
                                        <span className="text-[8px] text-gray-400 mt-1">11 + 3 (nivel)</span>
                                    </div>
                                </div>
                            </div>

                            {/* Explicaciones */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div>
                                        <strong className="text-purple-300 block mb-2">¿Qué es?</strong>
                                        <p className="text-gray-300">
                                            Es una <strong>defensa especial contra la magia</strong>. Si tienes RC, los hechizos enemigos deben "superar" tu resistencia para afectarte.
                                        </p>
                                    </div>
                                    <div className="bg-gray-900/40 p-3 rounded border border-gray-700">
                                        <strong className="text-gold-400 block mb-2">¿Cómo funciona?</strong>
                                        <p className="text-gray-300 text-xs">
                                            El lanzador tira: <code className="bg-gray-950 px-1 rounded">1d20 + Nivel de Lanzador</code>
                                            <br />
                                            Si iguala o supera tu RC, el conjuro te afecta. Si no, el conjuro "rebota".
                                        </p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="bg-gray-900/40 p-3 rounded border border-gray-700">
                                        <strong className="text-gold-400 block mb-2">¿Quién tiene RC?</strong>
                                        <p className="text-gray-300 text-xs mb-2">
                                            <strong>La mayoría de personajes NO tienen RC.</strong> Solo la obtienen por:
                                        </p>
                                        <ul className="text-gray-400 text-xs space-y-1 list-disc list-inside">
                                            <li><strong>Raza:</strong> Drow (11 + nivel de personaje)</li>
                                            <li><strong>Clase:</strong> Monje nivel 13+ (10 + nivel)</li>
                                            <li><strong>Objetos mágicos:</strong> Armaduras especiales</li>
                                        </ul>
                                    </div>
                                    <div className="bg-red-900/20 p-3 rounded border border-red-500/30">
                                        <strong className="text-red-300 block mb-1">⚠️ Si no tienes RC</strong>
                                        <p className="text-gray-300 text-xs">
                                            Deja esta casilla en <strong>blanco</strong> o escribe <strong>"-"</strong>.
                                            No pongas "0" porque eso significaría que tienes RC pero muy baja.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* 8. Modificador de Presa */}
                    <Card className="card border-orange-500/30">
                        <CardHeader className="bg-gradient-to-r from-orange-900/20 to-transparent">
                            <CardTitle className="flex items-center gap-3 text-xl">
                                <Sword className="h-5 w-5 text-orange-400" />
                                Modificador de Presa
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-6 text-sm">
                            <div>
                                <strong className="text-orange-300 block mb-2">¿Qué es la Presa?</strong>
                                <p className="text-gray-300">
                                    Es cuando intentas <strong>agarrar, inmovilizar o derribar</strong> a un enemigo sin armas.
                                    Piensa en lucha libre, asfixiar, o impedir que alguien escape.
                                </p>
                            </div>

                            {/* Réplica de hoja oficial D&D 3.5 */}
                            <div className="border-2 border-gray-600 rounded bg-white/5 overflow-hidden">
                                <div className="flex items-stretch">
                                    {/* Header negro PRESA */}
                                    <div className="bg-gray-950 px-3 py-3 flex items-center justify-center border-r-2 border-gray-600" style={{ minWidth: '80px' }}>
                                        <span className="text-white font-bold text-[10px] uppercase tracking-wide text-center leading-tight">Mod.<br />Presa</span>
                                    </div>
                                    {/* TOTAL box */}
                                    <div className="flex-1 flex flex-col items-center justify-center py-2 border-r border-gray-600 bg-orange-900/10">
                                        <span className="text-[7px] text-gray-500 uppercase tracking-wider">Total</span>
                                        <div className="border-2 border-orange-500/50 rounded px-4 py-1 bg-gray-950 mt-1">
                                            <span className="text-gray-500 text-lg font-mono">&nbsp;&nbsp;&nbsp;</span>
                                        </div>
                                    </div>
                                    {/* = */}
                                    <div className="flex items-center justify-center px-2 border-r border-gray-600">
                                        <span className="text-gray-500 font-bold text-lg">=</span>
                                    </div>
                                    {/* BAB */}
                                    <div className="flex-1 flex flex-col items-center justify-center py-2 border-r border-gray-600">
                                        <span className="text-[7px] text-gray-500 uppercase tracking-wider text-center">Bon.<br />Ataque<br />Base</span>
                                        <div className="border border-gray-600 rounded px-3 py-1 bg-gray-950/50 mt-1">
                                            <span className="text-gray-600 text-sm font-mono">&nbsp;&nbsp;</span>
                                        </div>
                                    </div>
                                    {/* + */}
                                    <div className="flex items-center justify-center px-1 border-r border-gray-600">
                                        <span className="text-gray-500 font-bold">+</span>
                                    </div>
                                    {/* Mod FUE */}
                                    <div className="flex-1 flex flex-col items-center justify-center py-2 border-r border-gray-600">
                                        <span className="text-[7px] text-gray-500 uppercase tracking-wider text-center">Mod.<br />Fuerza</span>
                                        <div className="border border-gray-600 rounded px-3 py-1 bg-gray-950/50 mt-1">
                                            <span className="text-gray-600 text-sm font-mono">&nbsp;&nbsp;</span>
                                        </div>
                                    </div>
                                    {/* + */}
                                    <div className="flex items-center justify-center px-1 border-r border-gray-600">
                                        <span className="text-gray-500 font-bold">+</span>
                                    </div>
                                    {/* Tamaño */}
                                    <div className="flex-1 flex flex-col items-center justify-center py-2 border-r border-gray-600">
                                        <span className="text-[7px] text-gray-500 uppercase tracking-wider text-center">Mod.<br />Tamaño</span>
                                        <div className="border border-gray-600 rounded px-3 py-1 bg-gray-950/50 mt-1">
                                            <span className="text-gray-600 text-sm font-mono">&nbsp;&nbsp;</span>
                                        </div>
                                    </div>
                                    {/* + */}
                                    <div className="flex items-center justify-center px-1 border-r border-gray-600">
                                        <span className="text-gray-500 font-bold">+</span>
                                    </div>
                                    {/* Varios */}
                                    <div className="flex-1 flex flex-col items-center justify-center py-2">
                                        <span className="text-[7px] text-gray-500 uppercase tracking-wider text-center">Mod.<br />Varios</span>
                                        <div className="border border-gray-600 rounded px-3 py-1 bg-gray-950/50 mt-1">
                                            <span className="text-gray-600 text-sm font-mono">&nbsp;&nbsp;</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Ejemplo rellenado */}
                            <div className="border-2 border-gold-500/50 rounded bg-gray-900/40 overflow-hidden">
                                <div className="bg-gold-900/30 px-3 py-1 border-b border-gold-500/30">
                                    <span className="text-gold-400 text-xs font-semibold">✏️ Ejemplo: Guerrero nivel 1 (FUE 16)</span>
                                </div>
                                <div className="flex items-stretch">
                                    <div className="bg-gray-950 px-3 py-3 flex items-center justify-center border-r border-gray-700" style={{ minWidth: '80px' }}>
                                        <span className="text-gold-400 font-bold text-[10px] uppercase tracking-wide text-center leading-tight">Mod.<br />Presa</span>
                                    </div>
                                    <div className="flex-1 flex flex-col items-center justify-center py-2 border-r border-gray-700 bg-orange-900/20">
                                        <span className="text-[7px] text-gray-400 uppercase tracking-wider">Total</span>
                                        <div className="border-2 border-orange-500/50 rounded px-3 py-1 bg-gray-950 mt-1">
                                            <span className="text-orange-400 text-lg font-bold">+4</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-center px-2 border-r border-gray-700">
                                        <span className="text-gray-500 font-bold text-lg">=</span>
                                    </div>
                                    <div className="flex-1 flex flex-col items-center justify-center py-2 border-r border-gray-700">
                                        <span className="text-[7px] text-gray-400 uppercase tracking-wider text-center">BAB</span>
                                        <div className="border border-gray-600 rounded px-3 py-1 bg-gray-950 mt-1">
                                            <span className="text-red-400 text-sm font-bold">+1</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-center px-1 border-r border-gray-700">
                                        <span className="text-gray-500 font-bold">+</span>
                                    </div>
                                    <div className="flex-1 flex flex-col items-center justify-center py-2 border-r border-gray-700">
                                        <span className="text-[7px] text-gray-400 uppercase tracking-wider text-center">FUE</span>
                                        <div className="border border-gray-600 rounded px-3 py-1 bg-gray-950 mt-1">
                                            <span className="text-green-400 text-sm font-bold">+3</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-center px-1 border-r border-gray-700">
                                        <span className="text-gray-500 font-bold">+</span>
                                    </div>
                                    <div className="flex-1 flex flex-col items-center justify-center py-2 border-r border-gray-700">
                                        <span className="text-[7px] text-gray-400 uppercase tracking-wider text-center">Tam.</span>
                                        <div className="border border-gray-600 rounded px-3 py-1 bg-gray-950 mt-1">
                                            <span className="text-blue-400 text-sm font-bold">+0</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-center px-1 border-r border-gray-700">
                                        <span className="text-gray-500 font-bold">+</span>
                                    </div>
                                    <div className="flex-1 flex flex-col items-center justify-center py-2">
                                        <span className="text-[7px] text-gray-400 uppercase tracking-wider text-center">Var.</span>
                                        <div className="border border-gray-600 rounded px-3 py-1 bg-gray-950 mt-1">
                                            <span className="text-gray-500 text-sm font-bold">+0</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Detailed Explanation */}
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-3">
                                    <div className="bg-gray-900/40 p-3 rounded border border-gray-700">
                                        <strong className="text-red-400 block mb-1">Ataque Base (BAB)</strong>
                                        <p className="text-gray-300 text-xs">Tu BAB de la tabla de clase. Ya lo anotaste arriba.</p>
                                    </div>
                                    <div className="bg-gray-900/40 p-3 rounded border border-gray-700">
                                        <strong className="text-green-400 block mb-1">Mod. de Fuerza</strong>
                                        <p className="text-gray-300 text-xs">Tu modificador de FUE (ej. FUE 16 = +3).</p>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="bg-gray-900/40 p-3 rounded border border-gray-700">
                                        <strong className="text-blue-400 block mb-1">Mod. de Tamaño</strong>
                                        <table className="w-full text-xs mt-1">
                                            <tbody>
                                                <tr><td className="text-gray-400">Pequeño</td><td className="text-red-400 text-right">-4</td></tr>
                                                <tr><td className="text-gray-400">Mediano</td><td className="text-gray-300 text-right">+0</td></tr>
                                                <tr><td className="text-gray-400">Grande</td><td className="text-green-400 text-right">+4</td></tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="bg-gray-900/40 p-3 rounded border border-gray-700">
                                        <strong className="text-gray-300 block mb-1">Mod. Varios</strong>
                                        <p className="text-gray-400 text-xs">Dotes como <em>Presa Mejorada</em> (+4) u objetos mágicos.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-blue-900/20 p-3 rounded border border-blue-500/30">
                                <strong className="text-blue-300 block mb-1">¿Cuándo uso los Temporales?</strong>
                                <p className="text-gray-300 text-xs">
                                    Solo si un <strong>hechizo o efecto temporal</strong> modifica tu Fuerza o tamaño.
                                    <br />
                                    <em>Ejemplo: El conjuro "Agrandar Persona" te hace Grande (+4 tamaño) y te da +2 FUE (+1 mod).
                                        Tu presa temporal sería +2 mayor.</em>
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* 9. Armas y Ataques */}
                    <Card className="card border-red-500/30">
                        <CardHeader className="bg-gradient-to-r from-red-900/20 to-transparent">
                            <CardTitle className="flex items-center gap-3 text-xl">
                                <Sword className="h-5 w-5 text-red-400" />
                                Armas y Ataques
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-6 text-sm">

                            {/* Why multiple fields */}
                            <div className="bg-gray-900/40 p-4 rounded border border-gray-700">
                                <strong className="text-red-300 block mb-2">¿Por qué hay varios campos de ataque?</strong>
                                <p className="text-gray-300">
                                    Porque puedes llevar <strong>múltiples armas</strong>: una espada principal, una daga de reserva, un arco para distancia, etc.
                                    Rellena un bloque por cada arma que uses frecuentemente.
                                </p>
                            </div>

                            {/* Weapon Sheet Replica - Estilo hoja oficial D&D 3.5 */}
                            <div className="border-2 border-gray-600 rounded overflow-hidden bg-white/5">
                                {/* Row 1: Header con ATAQUE negro */}
                                <div className="flex border-b-2 border-gray-600">
                                    <div className="bg-gray-950 px-3 py-2 flex items-center border-r-2 border-gray-600" style={{ minWidth: '120px' }}>
                                        <span className="text-white font-bold text-sm uppercase tracking-wide">Ataque</span>
                                    </div>
                                    <div className="flex-1 flex">
                                        <div className="flex-1 px-2 py-1 border-r border-gray-600 text-center">
                                            <span className="text-[9px] text-gray-500 uppercase block">Bonif. de Ataque</span>
                                        </div>
                                        <div className="flex-1 px-2 py-1 border-r border-gray-600 text-center">
                                            <span className="text-[9px] text-gray-500 uppercase block">Daño</span>
                                        </div>
                                        <div className="flex-1 px-2 py-1 text-center">
                                            <span className="text-[9px] text-gray-500 uppercase block">Crítico</span>
                                        </div>
                                    </div>
                                </div>
                                {/* Row 2: Alcance, Tipo, Notas */}
                                <div className="flex border-b-2 border-gray-600">
                                    <div className="px-2 py-1 border-r border-gray-600 text-center" style={{ minWidth: '60px' }}>
                                        <span className="text-[9px] text-gray-500 uppercase block">Alcance</span>
                                    </div>
                                    <div className="px-2 py-1 border-r border-gray-600 text-center" style={{ minWidth: '50px' }}>
                                        <span className="text-[9px] text-gray-500 uppercase block">Tipo</span>
                                    </div>
                                    <div className="flex-1 px-2 py-1">
                                        <span className="text-[9px] text-gray-500 uppercase block">Notas</span>
                                    </div>
                                </div>
                                {/* Row 3: Munición con casillas */}
                                <div className="flex items-center px-2 py-1 gap-2">
                                    <span className="text-[9px] text-gray-500 uppercase">Munición</span>
                                    <div className="flex gap-[2px]">
                                        {[...Array(20)].map((_, i) => (
                                            <div key={i} className="w-3 h-3 border border-gray-500 bg-transparent"></div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Ejemplo rellenado */}
                            <div className="mt-4 border-2 border-gold-500/50 rounded overflow-hidden bg-gray-900/40">
                                <div className="bg-gold-900/30 px-3 py-1 border-b border-gold-500/30">
                                    <span className="text-gold-400 text-xs font-semibold">✏️ Ejemplo rellenado:</span>
                                </div>
                                {/* Row 1 */}
                                <div className="flex border-b border-gray-700">
                                    <div className="bg-gray-950 px-3 py-2 flex items-center border-r border-gray-700" style={{ minWidth: '120px' }}>
                                        <span className="text-gold-400 font-bold text-sm">Espada Larga +1</span>
                                    </div>
                                    <div className="flex-1 flex">
                                        <div className="flex-1 px-2 py-2 border-r border-gray-700 text-center">
                                            <span className="text-gold-400 font-bold">+5</span>
                                        </div>
                                        <div className="flex-1 px-2 py-2 border-r border-gray-700 text-center">
                                            <span className="text-gray-200 font-bold">1d8+4</span>
                                        </div>
                                        <div className="flex-1 px-2 py-2 text-center">
                                            <span className="text-gray-300">19-20/×2</span>
                                        </div>
                                    </div>
                                </div>
                                {/* Row 2 */}
                                <div className="flex border-b border-gray-700">
                                    <div className="px-2 py-2 border-r border-gray-700 text-center" style={{ minWidth: '60px' }}>
                                        <span className="text-gray-400">—</span>
                                    </div>
                                    <div className="px-2 py-2 border-r border-gray-700 text-center" style={{ minWidth: '50px' }}>
                                        <span className="text-gray-300">C</span>
                                    </div>
                                    <div className="flex-1 px-2 py-2">
                                        <span className="text-gray-400 text-sm italic">Herencia familiar</span>
                                    </div>
                                </div>
                                {/* Row 3 */}
                                <div className="flex items-center px-2 py-1 gap-2 bg-gray-950/30">
                                    <span className="text-[9px] text-gray-500 uppercase">Munición</span>
                                    <span className="text-gray-500 text-xs">(No aplica para espada)</span>
                                </div>
                            </div>

                            {/* Detailed Explanations */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div className="bg-gray-900/40 p-3 rounded border border-gray-700">
                                        <strong className="text-red-300 block mb-1">Ataque</strong>
                                        <p className="text-gray-300 text-xs">
                                            El <strong>nombre del arma</strong>. Si es mágica, incluye el bonus (ej. "Espada Larga +1").
                                        </p>
                                    </div>
                                    <div className="bg-gray-900/40 p-3 rounded border border-gray-700">
                                        <strong className="text-gold-400 block mb-2">Bonif. de Ataque</strong>
                                        <p className="text-gray-300 text-xs mb-2">
                                            El número que <strong>sumas a tu d20</strong> al atacar. Se calcula:
                                        </p>
                                        <div className="bg-gray-950 p-2 rounded text-xs font-mono">
                                            <div className="text-gray-400 mb-1">Cuerpo a cuerpo:</div>
                                            <div className="text-gray-200">BAB + FUE + Magia + Dotes</div>
                                            <div className="text-gray-400 mt-2 mb-1">A distancia:</div>
                                            <div className="text-gray-200">BAB + DES + Magia + Dotes</div>
                                        </div>
                                        <p className="text-gray-400 text-xs mt-2 italic">
                                            Ej: BAB +1 + FUE +3 + Arma +1 = <strong>+5</strong>
                                        </p>
                                    </div>
                                    <div className="bg-gray-900/40 p-3 rounded border border-gray-700">
                                        <strong className="text-gray-200 block mb-1">Daño</strong>
                                        <p className="text-gray-300 text-xs">
                                            <strong>Dado del arma + Mod. Fuerza</strong> (cuerpo a cuerpo/arrojadiza).
                                            <br />
                                            <em>Ej: Espada 1d8 + FUE +3 + Magia +1 = <strong>1d8+4</strong></em>
                                        </p>
                                        <p className="text-gray-500 text-xs mt-1">
                                            Arcos normales NO suman Fuerza al daño (arcos compuestos sí).
                                        </p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="bg-gray-900/40 p-3 rounded border border-gray-700">
                                        <strong className="text-gray-200 block mb-1">Crítico</strong>
                                        <p className="text-gray-300 text-xs">
                                            Formato: <strong>Rango / Multiplicador</strong>
                                        </p>
                                        <ul className="text-gray-400 text-xs mt-1 space-y-1 list-disc list-inside">
                                            <li><strong>19-20/x2:</strong> Amenaza crítico con 19 o 20, daño x2</li>
                                            <li><strong>20/x3:</strong> Solo amenaza con 20, pero daño x3</li>
                                        </ul>
                                        <p className="text-gray-500 text-xs mt-1 italic">
                                            Copia el crítico de la descripción del arma.
                                        </p>
                                    </div>
                                    <div className="bg-gray-900/40 p-3 rounded border border-gray-700">
                                        <strong className="text-gray-200 block mb-1">Alcance</strong>
                                        <p className="text-gray-300 text-xs">
                                            Para armas <strong>arrojadizas</strong> o <strong>de proyectiles</strong>.
                                            Indica la distancia máxima sin penalización.
                                        </p>
                                        <p className="text-gray-500 text-xs mt-1">
                                            Cuerpo a cuerpo: pon "—" o déjalo vacío.
                                        </p>
                                    </div>
                                    <div className="bg-gray-900/40 p-3 rounded border border-gray-700">
                                        <strong className="text-gray-200 block mb-1">Tipo</strong>
                                        <p className="text-gray-300 text-xs">
                                            El tipo de daño físico. Importante contra criaturas con resistencias.
                                        </p>
                                        <div className="flex gap-2 mt-1 text-xs">
                                            <span className="bg-gray-950 px-2 py-1 rounded"><strong>C</strong> = Cortante</span>
                                            <span className="bg-gray-950 px-2 py-1 rounded"><strong>P</strong> = Perforante</span>
                                            <span className="bg-gray-950 px-2 py-1 rounded"><strong>B</strong> = Contundente</span>
                                        </div>
                                    </div>
                                    <div className="bg-gray-900/40 p-3 rounded border border-gray-700">
                                        <strong className="text-gray-200 block mb-1">Notas</strong>
                                        <p className="text-gray-300 text-xs">
                                            Propiedades especiales: <em>"Plateada"</em>, <em>"Flamígera +1d6 fuego"</em>,
                                            <em>"Santa"</em>, o cualquier detalle importante.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Ammo explanation */}
                            <div className="bg-amber-900/20 p-4 rounded border border-amber-500/30">
                                <strong className="text-amber-400 block mb-2">🏹 ¿Qué es el cuadro de Munición?</strong>
                                <p className="text-gray-300 text-xs mb-2">
                                    Los cuadraditos son para <strong>contar flechas, virotes o piedras</strong>.
                                    Cada vez que dispares, <strong>tacha un cuadrado</strong>.
                                </p>
                                <p className="text-gray-400 text-xs">
                                    <em>Para armas cuerpo a cuerpo (espadas, hachas), ignora este cuadro.</em>
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* 10. Habilidades */}
                    <Card className="card border-purple-500/30">
                        <CardHeader className="bg-gradient-to-r from-purple-900/20 to-transparent">
                            <CardTitle className="flex items-center gap-3 text-xl">
                                <Brain className="h-5 w-5 text-purple-400" />
                                Habilidades (Skills)
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-6 text-sm">

                            {/* Intro */}
                            <div className="bg-gray-900/40 p-4 rounded border border-gray-700">
                                <strong className="text-purple-300 block mb-2">¿Qué son los Rangos Máximos?</strong>
                                <p className="text-gray-300">
                                    El límite de cuánto puedes subir una habilidad. Se muestra arriba de la lista de habilidades.
                                </p>
                                <div className="bg-gray-950 p-3 rounded mt-2 font-mono text-center">
                                    <span className="text-gray-400">Rangos Máximos = </span>
                                    <span className="text-purple-400 font-bold">Nivel + 3</span>
                                    <span className="text-gray-500 text-xs block mt-1">(Nivel 1 = máximo 4 rangos en cada habilidad)</span>
                                </div>
                            </div>

                            {/* Réplica de hoja oficial D&D 3.5 - Habilidades */}
                            <div className="border-2 border-gray-600 rounded bg-white/5 overflow-hidden">
                                {/* Header negro con HABILIDADES y Rangos Máximos */}
                                <div className="flex items-stretch border-b-2 border-gray-600">
                                    <div className="bg-gray-950 px-4 py-2 flex items-center justify-center border-r-2 border-gray-600" style={{ minWidth: '140px' }}>
                                        <span className="text-white font-bold text-sm uppercase tracking-wide">Habilidades</span>
                                    </div>
                                    <div className="flex-1 flex items-center justify-center gap-2 py-2 bg-purple-900/10">
                                        <span className="text-[9px] text-gray-500 uppercase tracking-wider">Rangos Máximos</span>
                                        <div className="border border-gray-600 rounded px-3 py-0.5 bg-gray-950">
                                            <span className="text-gray-500 text-sm font-mono">&nbsp;&nbsp;&nbsp;</span>
                                        </div>
                                        <span className="text-[8px] text-gray-600">/</span>
                                        <div className="border border-gray-600 rounded px-3 py-0.5 bg-gray-950">
                                            <span className="text-gray-500 text-sm font-mono">&nbsp;&nbsp;&nbsp;</span>
                                        </div>
                                        <span className="text-[8px] text-gray-600">(clase/transclase)</span>
                                    </div>
                                </div>
                                {/* Fila de encabezados de columna */}
                                <div className="flex items-stretch border-b border-gray-700 bg-gray-900/50 text-[8px] uppercase tracking-wider text-gray-500">
                                    <div className="w-8 py-1 flex items-center justify-center border-r border-gray-700">
                                        <span>☐</span>
                                    </div>
                                    <div className="flex-1 py-1 px-2 border-r border-gray-700 text-left" style={{ minWidth: '140px' }}>
                                        <span>Nombre de Habilidad</span>
                                    </div>
                                    <div className="w-12 py-1 flex items-center justify-center border-r border-gray-700">
                                        <span>Car.</span>
                                    </div>
                                    <div className="w-14 py-1 flex items-center justify-center border-r border-gray-700 bg-purple-900/20">
                                        <span className="text-purple-400">Mod.</span>
                                    </div>
                                    <div className="w-12 py-1 flex items-center justify-center border-r border-gray-700">
                                        <span>=</span>
                                    </div>
                                    <div className="w-14 py-1 flex items-center justify-center border-r border-gray-700">
                                        <span>Mod.Car</span>
                                    </div>
                                    <div className="w-12 py-1 flex items-center justify-center border-r border-gray-700">
                                        <span>+</span>
                                    </div>
                                    <div className="w-14 py-1 flex items-center justify-center border-r border-gray-700">
                                        <span>Rangos</span>
                                    </div>
                                    <div className="w-12 py-1 flex items-center justify-center border-r border-gray-700">
                                        <span>+</span>
                                    </div>
                                    <div className="w-14 py-1 flex items-center justify-center">
                                        <span>Varios</span>
                                    </div>
                                </div>
                                {/* Fila de ejemplo en blanco */}
                                <div className="flex items-stretch border-b border-gray-700">
                                    <div className="w-8 py-2 flex items-center justify-center border-r border-gray-700">
                                        <div className="w-4 h-4 border border-gray-600 bg-gray-950"></div>
                                    </div>
                                    <div className="flex-1 py-2 px-2 border-r border-gray-700 flex items-center gap-1" style={{ minWidth: '140px' }}>
                                        <span className="text-gray-400 text-xs">Avistar</span>
                                        <span className="text-gray-600 text-[10px]">■</span>
                                    </div>
                                    <div className="w-12 py-2 flex items-center justify-center border-r border-gray-700">
                                        <span className="text-gray-500 text-xs">SAB</span>
                                    </div>
                                    <div className="w-14 py-2 flex items-center justify-center border-r border-gray-700 bg-purple-900/10">
                                        <div className="border border-purple-500/40 rounded px-2 py-0.5 bg-gray-950">
                                            <span className="text-gray-600 text-xs font-mono">&nbsp;&nbsp;</span>
                                        </div>
                                    </div>
                                    <div className="w-12 py-2 flex items-center justify-center border-r border-gray-700">
                                        <span className="text-gray-600">=</span>
                                    </div>
                                    <div className="w-14 py-2 flex items-center justify-center border-r border-gray-700">
                                        <div className="border border-gray-600 rounded px-2 py-0.5 bg-gray-950">
                                            <span className="text-gray-600 text-xs font-mono">&nbsp;&nbsp;</span>
                                        </div>
                                    </div>
                                    <div className="w-12 py-2 flex items-center justify-center border-r border-gray-700">
                                        <span className="text-gray-600">+</span>
                                    </div>
                                    <div className="w-14 py-2 flex items-center justify-center border-r border-gray-700">
                                        <div className="border border-gray-600 rounded px-2 py-0.5 bg-gray-950">
                                            <span className="text-gray-600 text-xs font-mono">&nbsp;&nbsp;</span>
                                        </div>
                                    </div>
                                    <div className="w-12 py-2 flex items-center justify-center border-r border-gray-700">
                                        <span className="text-gray-600">+</span>
                                    </div>
                                    <div className="w-14 py-2 flex items-center justify-center">
                                        <div className="border border-gray-600 rounded px-2 py-0.5 bg-gray-950">
                                            <span className="text-gray-600 text-xs font-mono">&nbsp;&nbsp;</span>
                                        </div>
                                    </div>
                                </div>
                                {/* Segunda fila de ejemplo (con especialidad) */}
                                <div className="flex items-stretch">
                                    <div className="w-8 py-2 flex items-center justify-center border-r border-gray-700">
                                        <div className="w-4 h-4 border border-gray-600 bg-gray-950"></div>
                                    </div>
                                    <div className="flex-1 py-2 px-2 border-r border-gray-700 flex items-center" style={{ minWidth: '140px' }}>
                                        <span className="text-gray-400 text-xs">Artesanía (<span className="border-b border-dashed border-gray-600">_____</span>)</span>
                                    </div>
                                    <div className="w-12 py-2 flex items-center justify-center border-r border-gray-700">
                                        <span className="text-gray-500 text-xs">INT</span>
                                    </div>
                                    <div className="w-14 py-2 flex items-center justify-center border-r border-gray-700 bg-purple-900/10">
                                        <div className="border border-purple-500/40 rounded px-2 py-0.5 bg-gray-950">
                                            <span className="text-gray-600 text-xs font-mono">&nbsp;&nbsp;</span>
                                        </div>
                                    </div>
                                    <div className="w-12 py-2 flex items-center justify-center border-r border-gray-700">
                                        <span className="text-gray-600">=</span>
                                    </div>
                                    <div className="w-14 py-2 flex items-center justify-center border-r border-gray-700">
                                        <div className="border border-gray-600 rounded px-2 py-0.5 bg-gray-950">
                                            <span className="text-gray-600 text-xs font-mono">&nbsp;&nbsp;</span>
                                        </div>
                                    </div>
                                    <div className="w-12 py-2 flex items-center justify-center border-r border-gray-700">
                                        <span className="text-gray-600">+</span>
                                    </div>
                                    <div className="w-14 py-2 flex items-center justify-center border-r border-gray-700">
                                        <div className="border border-gray-600 rounded px-2 py-0.5 bg-gray-950">
                                            <span className="text-gray-600 text-xs font-mono">&nbsp;&nbsp;</span>
                                        </div>
                                    </div>
                                    <div className="w-12 py-2 flex items-center justify-center border-r border-gray-700">
                                        <span className="text-gray-600">+</span>
                                    </div>
                                    <div className="w-14 py-2 flex items-center justify-center">
                                        <div className="border border-gray-600 rounded px-2 py-0.5 bg-gray-950">
                                            <span className="text-gray-600 text-xs font-mono">&nbsp;&nbsp;</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Ejemplo rellenado con borde dorado */}
                            <div className="border-2 border-gold-500/50 rounded bg-gray-900/40 overflow-hidden">
                                <div className="bg-gold-900/30 px-3 py-1 border-b border-gold-500/30">
                                    <span className="text-gold-400 text-xs font-semibold">✏️ Ejemplo rellenado: Pícaro nivel 1 con DES 16, INT 14, SAB 12</span>
                                </div>
                                {/* Header */}
                                <div className="flex items-stretch border-b border-gray-700">
                                    <div className="bg-gray-950 px-3 py-1.5 flex items-center justify-center border-r border-gray-700" style={{ minWidth: '100px' }}>
                                        <span className="text-gold-400 font-bold text-xs uppercase">Habilidades</span>
                                    </div>
                                    <div className="flex-1 flex items-center justify-center gap-2 py-1.5 bg-purple-900/10">
                                        <span className="text-[8px] text-gray-500 uppercase">Rangos Máx</span>
                                        <div className="border border-gold-500/40 rounded px-2 py-0.5 bg-gray-950">
                                            <span className="text-gold-400 text-xs font-mono font-bold">4</span>
                                        </div>
                                        <span className="text-[8px] text-gray-600">/</span>
                                        <div className="border border-gray-600 rounded px-2 py-0.5 bg-gray-950">
                                            <span className="text-gray-300 text-xs font-mono">2</span>
                                        </div>
                                    </div>
                                </div>
                                {/* Fila 1: Abrir Cerraduras (habilidad de clase, entrenada) */}
                                <div className="flex items-stretch border-b border-gray-700">
                                    <div className="w-8 py-1.5 flex items-center justify-center border-r border-gray-700">
                                        <div className="w-4 h-4 border-2 border-purple-500 bg-gray-950 flex items-center justify-center">
                                            <span className="text-purple-400 text-[10px] font-bold">✓</span>
                                        </div>
                                    </div>
                                    <div className="flex-1 py-1.5 px-2 border-r border-gray-700 flex items-center gap-1" style={{ minWidth: '120px' }}>
                                        <span className="text-gray-200 text-xs font-semibold">Abrir Cerraduras</span>
                                        <span className="text-gray-600 text-[10px]">■</span>
                                    </div>
                                    <div className="w-10 py-1.5 flex items-center justify-center border-r border-gray-700">
                                        <span className="text-gray-400 text-[10px]">DES</span>
                                    </div>
                                    <div className="w-12 py-1.5 flex items-center justify-center border-r border-gray-700 bg-purple-900/20">
                                        <span className="text-purple-400 text-sm font-bold">+7</span>
                                    </div>
                                    <div className="w-8 py-1.5 flex items-center justify-center border-r border-gray-700">
                                        <span className="text-gray-600 text-xs">=</span>
                                    </div>
                                    <div className="w-10 py-1.5 flex items-center justify-center border-r border-gray-700">
                                        <span className="text-blue-300 text-xs">+3</span>
                                    </div>
                                    <div className="w-8 py-1.5 flex items-center justify-center border-r border-gray-700">
                                        <span className="text-gray-600 text-xs">+</span>
                                    </div>
                                    <div className="w-10 py-1.5 flex items-center justify-center border-r border-gray-700">
                                        <span className="text-green-400 text-xs font-bold">4</span>
                                    </div>
                                    <div className="w-8 py-1.5 flex items-center justify-center border-r border-gray-700">
                                        <span className="text-gray-600 text-xs">+</span>
                                    </div>
                                    <div className="w-10 py-1.5 flex items-center justify-center">
                                        <span className="text-gray-500 text-xs">0</span>
                                    </div>
                                </div>
                                {/* Fila 2: Avistar (no es de clase para pícaro) */}
                                <div className="flex items-stretch border-b border-gray-700 bg-gray-950/30">
                                    <div className="w-8 py-1.5 flex items-center justify-center border-r border-gray-700">
                                        <div className="w-4 h-4 border border-gray-600 bg-gray-950"></div>
                                    </div>
                                    <div className="flex-1 py-1.5 px-2 border-r border-gray-700 flex items-center gap-1" style={{ minWidth: '120px' }}>
                                        <span className="text-gray-300 text-xs">Avistar</span>
                                        <span className="text-gray-600 text-[10px]">■</span>
                                    </div>
                                    <div className="w-10 py-1.5 flex items-center justify-center border-r border-gray-700">
                                        <span className="text-gray-400 text-[10px]">SAB</span>
                                    </div>
                                    <div className="w-12 py-1.5 flex items-center justify-center border-r border-gray-700 bg-purple-900/10">
                                        <span className="text-purple-300 text-sm font-bold">+3</span>
                                    </div>
                                    <div className="w-8 py-1.5 flex items-center justify-center border-r border-gray-700">
                                        <span className="text-gray-600 text-xs">=</span>
                                    </div>
                                    <div className="w-10 py-1.5 flex items-center justify-center border-r border-gray-700">
                                        <span className="text-blue-300 text-xs">+1</span>
                                    </div>
                                    <div className="w-8 py-1.5 flex items-center justify-center border-r border-gray-700">
                                        <span className="text-gray-600 text-xs">+</span>
                                    </div>
                                    <div className="w-10 py-1.5 flex items-center justify-center border-r border-gray-700">
                                        <span className="text-green-400 text-xs font-bold">2</span>
                                    </div>
                                    <div className="w-8 py-1.5 flex items-center justify-center border-r border-gray-700">
                                        <span className="text-gray-600 text-xs">+</span>
                                    </div>
                                    <div className="w-10 py-1.5 flex items-center justify-center">
                                        <span className="text-gray-500 text-xs">0</span>
                                    </div>
                                </div>
                                {/* Fila 3: Escuchar (habilidad de clase, sin entrenar necesario) */}
                                <div className="flex items-stretch">
                                    <div className="w-8 py-1.5 flex items-center justify-center border-r border-gray-700">
                                        <div className="w-4 h-4 border-2 border-purple-500 bg-gray-950 flex items-center justify-center">
                                            <span className="text-purple-400 text-[10px] font-bold">✓</span>
                                        </div>
                                    </div>
                                    <div className="flex-1 py-1.5 px-2 border-r border-gray-700 flex items-center" style={{ minWidth: '120px' }}>
                                        <span className="text-gray-200 text-xs font-semibold">Escuchar</span>
                                    </div>
                                    <div className="w-10 py-1.5 flex items-center justify-center border-r border-gray-700">
                                        <span className="text-gray-400 text-[10px]">SAB</span>
                                    </div>
                                    <div className="w-12 py-1.5 flex items-center justify-center border-r border-gray-700 bg-purple-900/20">
                                        <span className="text-purple-400 text-sm font-bold">+5</span>
                                    </div>
                                    <div className="w-8 py-1.5 flex items-center justify-center border-r border-gray-700">
                                        <span className="text-gray-600 text-xs">=</span>
                                    </div>
                                    <div className="w-10 py-1.5 flex items-center justify-center border-r border-gray-700">
                                        <span className="text-blue-300 text-xs">+1</span>
                                    </div>
                                    <div className="w-8 py-1.5 flex items-center justify-center border-r border-gray-700">
                                        <span className="text-gray-600 text-xs">+</span>
                                    </div>
                                    <div className="w-10 py-1.5 flex items-center justify-center border-r border-gray-700">
                                        <span className="text-green-400 text-xs font-bold">4</span>
                                    </div>
                                    <div className="w-8 py-1.5 flex items-center justify-center border-r border-gray-700">
                                        <span className="text-gray-600 text-xs">+</span>
                                    </div>
                                    <div className="w-10 py-1.5 flex items-center justify-center">
                                        <span className="text-gray-500 text-xs">0</span>
                                    </div>
                                </div>
                                {/* Nota explicativa */}
                                <div className="bg-gray-950/50 px-3 py-2 border-t border-gray-700">
                                    <p className="text-gray-400 text-[10px]">
                                        <strong className="text-gold-400">Nota:</strong> Avistar tiene <strong>2 rangos</strong> porque NO es habilidad de clase del Pícaro (cuesta 2 puntos por rango).
                                        Abrir Cerraduras y Escuchar SÍ son de clase (marcadas con ✓), así que pueden tener hasta 4 rangos.
                                    </p>
                                </div>
                            </div>

                            {/* Explanations Grid */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div className="bg-gray-900/40 p-3 rounded border border-gray-700">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="w-5 h-5 border-2 border-purple-500 bg-gray-950 flex items-center justify-center text-purple-400 font-bold text-xs">✓</div>
                                            <strong className="text-purple-300">Casilla de Clase (izquierda)</strong>
                                        </div>
                                        <p className="text-gray-300 text-xs">
                                            <strong>Marca con ✓</strong> si es habilidad de tu clase.
                                        </p>
                                        <ul className="text-gray-400 text-xs mt-1 space-y-1 list-disc list-inside">
                                            <li><strong>Marcada:</strong> 1 punto = 1 rango</li>
                                            <li><strong>Sin marcar:</strong> 2 puntos = 1 rango (y máximo rangos/2)</li>
                                        </ul>
                                    </div>
                                    <div className="bg-gray-900/40 p-3 rounded border border-gray-700">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-gray-600 text-lg">■</span>
                                            <strong className="text-gray-200">Cuadrado Negro (derecha del nombre)</strong>
                                        </div>
                                        <p className="text-gray-300 text-xs">
                                            Indica <strong>"Solo entrenado"</strong>. Si tienes <strong>0 rangos</strong>,
                                            NO puedes usar esta habilidad (ni siquiera tirar el dado).
                                        </p>
                                        <p className="text-gray-500 text-xs mt-1 italic">
                                            Ej: No puedes intentar "Abrir Cerraduras" sin entrenamiento.
                                        </p>
                                    </div>
                                    <div className="bg-gray-900/40 p-3 rounded border border-gray-700">
                                        <strong className="text-gray-200 block mb-1">¿Qué pongo en los (______)?</strong>
                                        <p className="text-gray-300 text-xs">
                                            Habilidades como <strong>Artesanía</strong>, <strong>Interpretar</strong>,
                                            <strong>Profesión</strong> y <strong>Saber</strong> requieren especificar una especialidad.
                                        </p>
                                        <p className="text-gray-400 text-xs mt-1">
                                            <em>Ejemplos: Artesanía (Armería), Saber (Arcano), Interpretar (Canto)</em>
                                        </p>
                                        <p className="text-red-400 text-xs mt-2">
                                            <strong>No es obligatorio</strong> rellenarlos todos. Solo los que uses.
                                        </p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="bg-gray-900/40 p-3 rounded border border-gray-700">
                                        <strong className="text-purple-300 block mb-2">¿Qué pongo en cada columna?</strong>
                                        <div className="space-y-2 text-xs">
                                            <div className="flex items-center gap-2">
                                                <span className="text-purple-400 font-bold w-20">Mod. Total</span>
                                                <span className="text-gray-300">= Suma de las otras 3 columnas</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-blue-300 w-20">Mod. Caract.</span>
                                                <span className="text-gray-300">= El mod. de la característica indicada</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-green-400 w-20">Rangos</span>
                                                <span className="text-gray-300">= Puntos invertidos (tú decides)</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-gray-400 w-20">Varios</span>
                                                <span className="text-gray-300">= Dotes, magia, bonus raciales</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-amber-900/20 p-3 rounded border border-amber-500/30">
                                        <strong className="text-amber-400 block mb-1">⚠️ ¿Qué es el Asterisco (*)?</strong>
                                        <p className="text-gray-300 text-xs">
                                            Si ves <strong>FUE*</strong> o <strong>DES*</strong>, significa que esta habilidad
                                            recibe tu <strong>Penalizador por Armadura</strong>.
                                        </p>
                                        <p className="text-gray-400 text-xs mt-1">
                                            <em>Ej: Trepar usa FUE*. Si tu armadura tiene -5 penalizador, restas 5 a Trepar.</em>
                                        </p>
                                    </div>
                                    <div className="bg-blue-900/20 p-3 rounded border border-blue-500/30">
                                        <strong className="text-blue-300 block mb-1">📖 Ejemplo Completo</strong>
                                        <p className="text-gray-300 text-xs">
                                            <strong>Avistar</strong> con SAB 14 (+2) y 4 rangos:
                                        </p>
                                        <p className="text-gray-200 text-xs mt-1 font-mono">
                                            Mod. Total = +2 (SAB) + 4 (rangos) + 0 (varios) = <strong className="text-purple-400">+6</strong>
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </CardContent>
                    </Card>
                </TabsContent>

                {/* ==================== HOJA 2 ==================== */}
                <TabsContent value="hoja2" className="space-y-6">

                    {/* 1. Experiencia */}
                    <Card className="card border-purple-500/30">
                        <CardHeader className="bg-gradient-to-r from-purple-900/20 to-transparent">
                            <CardTitle className="flex items-center gap-3 text-xl">
                                <Scale className="h-5 w-5 text-purple-400" />
                                Experiencia y Progresión
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-6 text-sm">

                            {/* Réplica de hoja oficial D&D 3.5 - Experiencia */}
                            <div className="border-2 border-gray-600 rounded bg-white/5 overflow-hidden">
                                {/* Header negro */}
                                <div className="bg-gray-950 px-4 py-2 border-b-2 border-gray-600">
                                    <span className="text-white font-bold text-sm uppercase tracking-wide">Experiencia</span>
                                </div>
                                {/* Fila principal */}
                                <div className="flex items-stretch">
                                    {/* PX */}
                                    <div className="flex-1 p-3 border-r-2 border-gray-600">
                                        <span className="text-[8px] text-gray-500 uppercase tracking-wider block mb-1">PX</span>
                                        <div className="border-b-2 border-gray-500 py-2">
                                            <span className="text-gray-600 text-lg font-mono">&nbsp;</span>
                                        </div>
                                    </div>
                                    {/* Para Subir de Nivel */}
                                    <div className="flex-1 p-3">
                                        <span className="text-[8px] text-gray-500 uppercase tracking-wider block mb-1">Para Subir de Nivel</span>
                                        <div className="border-b-2 border-gray-500 py-2">
                                            <span className="text-gray-600 text-lg font-mono">&nbsp;</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Ejemplo rellenado con borde dorado */}
                            <div className="border-2 border-gold-500/50 rounded bg-gray-900/40 overflow-hidden">
                                <div className="bg-gold-900/30 px-3 py-1 border-b border-gold-500/30">
                                    <span className="text-gold-400 text-xs font-semibold">✏️ Ejemplo: Guerrero nivel 2 a mitad de camino al nivel 3</span>
                                </div>
                                {/* Header */}
                                <div className="bg-gray-950 px-4 py-1.5 border-b border-gray-700">
                                    <span className="text-gold-400 font-bold text-xs uppercase">Experiencia</span>
                                </div>
                                {/* Fila con valores */}
                                <div className="flex items-stretch">
                                    <div className="flex-1 p-3 border-r border-gray-700">
                                        <span className="text-[8px] text-gray-500 uppercase tracking-wider block mb-1">PX</span>
                                        <div className="border-b-2 border-gold-500/50 py-1">
                                            <span className="text-purple-400 text-lg font-bold font-mono">1,850</span>
                                        </div>
                                    </div>
                                    <div className="flex-1 p-3">
                                        <span className="text-[8px] text-gray-500 uppercase tracking-wider block mb-1">Para Subir de Nivel</span>
                                        <div className="border-b-2 border-gold-500/50 py-1">
                                            <span className="text-blue-400 text-lg font-bold font-mono">3,000</span>
                                        </div>
                                    </div>
                                </div>
                                {/* Nota explicativa */}
                                <div className="bg-gray-950/50 px-3 py-2 border-t border-gray-700">
                                    <p className="text-gray-400 text-[10px]">
                                        <strong className="text-gold-400">Nota:</strong> Nivel 1→2 requiere 1,000 PX. Nivel 2→3 requiere 3,000 PX totales.
                                        Faltan <strong className="text-purple-300">1,150 PX</strong> para nivel 3.
                                    </p>
                                </div>
                            </div>

                            {/* Tabla de referencia de PX por nivel */}
                            <div className="border border-gray-700 rounded bg-gray-900/30 overflow-hidden">
                                <div className="bg-gray-950 px-3 py-1.5 border-b border-gray-700">
                                    <span className="text-gray-300 text-xs font-semibold">📊 Tabla de Referencia: PX por Nivel</span>
                                </div>
                                <div className="grid grid-cols-5 gap-0 text-[10px]">
                                    {[
                                        { lvl: '1', px: '0' },
                                        { lvl: '2', px: '1,000' },
                                        { lvl: '3', px: '3,000' },
                                        { lvl: '4', px: '6,000' },
                                        { lvl: '5', px: '10,000' },
                                        { lvl: '6', px: '15,000' },
                                        { lvl: '7', px: '21,000' },
                                        { lvl: '8', px: '28,000' },
                                        { lvl: '9', px: '36,000' },
                                        { lvl: '10', px: '45,000' },
                                        { lvl: '11', px: '55,000' },
                                        { lvl: '12', px: '66,000' },
                                        { lvl: '13', px: '78,000' },
                                        { lvl: '14', px: '91,000' },
                                        { lvl: '15', px: '105,000' },
                                        { lvl: '16', px: '120,000' },
                                        { lvl: '17', px: '136,000' },
                                        { lvl: '18', px: '153,000' },
                                        { lvl: '19', px: '171,000' },
                                        { lvl: '20', px: '190,000' },
                                    ].map((item, idx) => (
                                        <div key={idx} className={`flex justify-between px-2 py-1 border-b border-r border-gray-800 ${idx < 5 ? 'bg-green-900/10' : idx < 10 ? 'bg-blue-900/10' : idx < 15 ? 'bg-purple-900/10' : 'bg-red-900/10'}`}>
                                            <span className="text-gray-400">Nv. {item.lvl}</span>
                                            <span className="text-purple-300 font-mono">{item.px}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Explanations Grid */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div className="bg-gray-900/40 p-4 rounded border border-gray-700">
                                        <strong className="text-purple-300 block mb-2">¿Qué pongo en Experiencia?</strong>
                                        <p className="text-gray-300 text-xs">
                                            Los <strong>Puntos de Experiencia (PX)</strong> que has acumulado.
                                            Empiezas con <strong>0 PX</strong> a nivel 1.
                                            Ganas PX al vencer monstruos, superar desafíos y completar misiones.
                                        </p>
                                    </div>
                                    <div className="bg-gray-900/40 p-4 rounded border border-gray-700">
                                        <strong className="text-purple-300 block mb-2">¿Qué es el Ajuste de Nivel (LA)?</strong>
                                        <p className="text-gray-300 text-xs">
                                            Algunas <strong>razas poderosas</strong> tienen un "coste" extra en niveles.
                                            El LA se suma a tu nivel de clase para determinar tu poder efectivo.
                                        </p>
                                        <ul className="text-gray-400 text-xs mt-2 space-y-1 list-disc list-inside">
                                            <li><strong>Humano, Elfo, Enano:</strong> LA +0 (normal)</li>
                                            <li><strong>Drow:</strong> LA +2 (equivale a 2 niveles extra)</li>
                                            <li><strong>Aasimar:</strong> LA +1 (equivale a 1 nivel extra)</li>
                                        </ul>
                                        <p className="text-red-400 text-xs mt-2">
                                            <strong>Razas básicas del MJ: déjalo en 0.</strong>
                                        </p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="bg-gray-900/40 p-4 rounded border border-gray-700">
                                        <strong className="text-purple-300 block mb-2">¿Qué es "Para Subir de Nivel"?</strong>
                                        <p className="text-gray-300 text-xs mb-2">
                                            Los PX que necesitas para el <strong>siguiente nivel</strong>.
                                            Es un recordatorio para saber cuánto te falta.
                                        </p>
                                    </div>
                                    <div className="bg-gray-900/40 p-4 rounded border border-gray-700">
                                        <strong className="text-purple-300 block mb-2">¿Qué es el NEP?</strong>
                                        <p className="text-gray-300 text-xs">
                                            <strong>Nivel Efectivo de Personaje</strong> = Nivel de Clase + LA.
                                            Lo usa el DM para calcular encuentros equilibrados.
                                        </p>
                                        <p className="text-gray-400 text-xs mt-1 italic">
                                            Ej: Drow Guerrero 3 con LA +2 = NEP 5.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* 2. Armadura y Protección */}
                    <Card className="card border-blue-500/30">
                        <CardHeader className="bg-gradient-to-r from-blue-900/20 to-transparent">
                            <CardTitle className="flex items-center gap-3 text-xl">
                                <Shield className="h-5 w-5 text-blue-400" />
                                Armadura / Objetos Protectores
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-6 text-sm">

                            {/* Réplica de hoja oficial D&D 3.5 - Armadura (COMPACTA) */}
                            <div className="border-2 border-gray-600 rounded bg-white/5 overflow-hidden">
                                {/* Header negro */}
                                <div className="bg-gray-950 px-3 py-1.5 border-b-2 border-gray-600">
                                    <span className="text-white font-bold text-xs uppercase tracking-wide">Armadura / Obj. Protector</span>
                                </div>
                                {/* Header de columnas - compacto */}
                                <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr_1fr] border-b border-gray-600 text-[7px] text-gray-500 uppercase tracking-wider bg-gray-900/30 px-2 py-1 text-center">
                                    <span className="text-left">Objeto</span>
                                    <span>Tipo</span>
                                    <span>CA</span>
                                    <span>Des</span>
                                    <span>Pen.</span>
                                    <span>Fallo</span>
                                    <span>Vel.</span>
                                </div>
                                {/* Filas vacías para completar - 2 filas compactas */}
                                {[1, 2].map((row) => (
                                    <div key={row} className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr_1fr] text-xs px-2 py-0.5 text-center items-center border-b border-gray-700">
                                        <span className="text-left border-b border-gray-600 py-0.5">&nbsp;</span>
                                        <span className="border-b border-gray-600 py-0.5">&nbsp;</span>
                                        <span className="border-b border-gray-600 py-0.5">&nbsp;</span>
                                        <span className="border-b border-gray-600 py-0.5">&nbsp;</span>
                                        <span className="border-b border-gray-600 py-0.5">&nbsp;</span>
                                        <span className="border-b border-gray-600 py-0.5">&nbsp;</span>
                                        <span className="border-b border-gray-600 py-0.5">&nbsp;</span>
                                    </div>
                                ))}
                                {/* Propiedades especiales */}
                                <div className="px-2 py-1 border-t border-gray-600 flex items-center gap-2">
                                    <span className="text-[7px] text-gray-500 uppercase">Props. Especiales:</span>
                                    <span className="flex-1 border-b border-gray-600">&nbsp;</span>
                                </div>
                            </div>

                            {/* Ejemplo rellenado con borde dorado - COMPACTO */}
                            <div className="border-2 border-gold-500/50 rounded bg-gray-900/40 overflow-hidden">
                                <div className="bg-gold-900/30 px-3 py-1 border-b border-gold-500/30">
                                    <span className="text-gold-400 text-xs font-semibold">✏️ Ejemplo: Guerrero con Cota de Mallas + Escudo Pesado</span>
                                </div>
                                {/* Datos compactos en flex */}
                                <div className="p-2 space-y-1.5">
                                    {/* Fila 1: Items de armadura */}
                                    <div className="flex flex-wrap gap-2 text-[10px]">
                                        <div className="bg-gray-950/50 rounded px-2 py-1 flex items-center gap-1">
                                            <span className="text-amber-300 font-bold">Cota de Mallas</span>
                                            <span className="text-gray-500">Media</span>
                                            <span className="text-blue-400 font-bold">+5 CA</span>
                                            <span className="text-gray-400">Des+2</span>
                                            <span className="text-red-400">-5 pen</span>
                                            <span className="text-amber-400">30%</span>
                                        </div>
                                        <div className="bg-gray-950/50 rounded px-2 py-1 flex items-center gap-1">
                                            <span className="text-amber-300 font-bold">Escudo Pesado</span>
                                            <span className="text-gray-500">Escudo</span>
                                            <span className="text-blue-400 font-bold">+2 CA</span>
                                            <span className="text-red-400">-2 pen</span>
                                            <span className="text-amber-400">15%</span>
                                        </div>
                                    </div>
                                    {/* Fila 2: Totales */}
                                    <div className="flex flex-wrap gap-3 text-[10px] border-t border-gray-700 pt-1.5">
                                        <span><strong className="text-gold-400">CA Total:</strong> 10 + <span className="text-blue-300">5</span> + <span className="text-blue-300">2</span> + <span className="text-green-300">2</span> (DES) = <strong className="text-blue-400">19</strong></span>
                                        <span><strong className="text-red-300">Penaliz.:</strong> <span className="text-red-400">-7</span></span>
                                        <span><strong className="text-amber-300">Fallo:</strong> <span className="text-amber-400">45%</span></span>
                                    </div>
                                </div>
                            </div>

                            {/* Detailed explanations */}
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-3">
                                    <div className="bg-gray-900/40 p-3 rounded border border-gray-700">
                                        <strong className="text-blue-300 block mb-1">Armadura/Objeto Protector</strong>
                                        <p className="text-gray-300 text-xs">El nombre de tu armadura: <em>Cuero, Cota de Mallas, Armadura de Placas</em>, etc.</p>
                                    </div>
                                    <div className="bg-gray-900/40 p-3 rounded border border-gray-700">
                                        <strong className="text-blue-300 block mb-1">Tipo</strong>
                                        <p className="text-gray-300 text-xs">
                                            <strong>Ligera, Media, Pesada</strong> o <strong>Escudo</strong>.
                                            Determina restricciones para clases (ej. Magos no usan armadura).
                                        </p>
                                    </div>
                                    <div className="bg-gray-900/40 p-3 rounded border border-gray-700">
                                        <strong className="text-blue-300 block mb-1">Bonif. de Armadura</strong>
                                        <p className="text-gray-300 text-xs">
                                            Lo que <strong>sumas a tu CA</strong>. Viene de la descripción del objeto.
                                        </p>
                                    </div>
                                    <div className="bg-gray-900/40 p-3 rounded border border-gray-700">
                                        <strong className="text-blue-300 block mb-1">Des Máx</strong>
                                        <p className="text-gray-300 text-xs">
                                            El <strong>límite de Destreza</strong> que puedes sumar a tu CA con esta armadura.
                                        </p>
                                        <p className="text-gray-400 text-xs mt-1 italic">
                                            Ej: Des +4 pero armadura con Des Máx +2 = solo sumas +2.
                                        </p>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="bg-gray-900/40 p-3 rounded border border-gray-700">
                                        <strong className="text-red-400 block mb-1">Penalización a las Pruebas</strong>
                                        <p className="text-gray-300 text-xs">
                                            <strong>Resta este número</strong> a habilidades físicas marcadas con * (Trepar, Nadar, Sigilo, etc.).
                                        </p>
                                    </div>
                                    <div className="bg-gray-900/40 p-3 rounded border border-gray-700">
                                        <strong className="text-amber-400 block mb-1">Fallo de Conjuro (Arcano)</strong>
                                        <p className="text-gray-300 text-xs">
                                            <strong>% de probabilidad</strong> de que tus conjuros arcanos fallen.
                                            Tiras d100; si sacas igual o menor, el conjuro falla.
                                        </p>
                                        <p className="text-gray-500 text-xs mt-1">
                                            Solo afecta a Magos, Hechiceros, Bardos. Clérigos y Druidas ignoran esto.
                                        </p>
                                    </div>
                                    <div className="bg-gray-900/40 p-3 rounded border border-gray-700">
                                        <strong className="text-gray-200 block mb-1">Velocidad</strong>
                                        <p className="text-gray-300 text-xs">
                                            Tu velocidad se reduce con armaduras medias y pesadas.
                                            30' se convierte en 20', 20' se convierte en 15'.
                                        </p>
                                    </div>
                                    <div className="bg-gray-900/40 p-3 rounded border border-gray-700">
                                        <strong className="text-gray-200 block mb-1">Propiedades Especiales</strong>
                                        <p className="text-gray-300 text-xs">
                                            Para armaduras mágicas: <em>"Etérea"</em>, <em>"Fortaleza Ligera"</em>, <em>"+1"</em>, etc.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-blue-900/20 p-4 rounded border border-blue-500/30">
                                <strong className="text-blue-300 block mb-2">¿Por qué hay 3 cuadros libres?</strong>
                                <p className="text-gray-300 text-xs">
                                    Para anotar <strong>otros objetos protectores</strong>: Brazales de Armadura, Amuleto de Armadura Natural, Anillo de Protección, etc.
                                    Cada uno puede darte bonus diferentes a la CA.
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* 3. Rasgos Raciales */}
                    <Card className="card border-green-500/30">
                        <CardHeader className="bg-gradient-to-r from-green-900/20 to-transparent">
                            <CardTitle className="flex items-center gap-3 text-xl">
                                <User className="h-5 w-5 text-green-400" />
                                Rasgos Raciales
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-6 text-sm">

                            {/* Réplica de hoja oficial D&D 3.5 - Rasgos Raciales */}
                            <div className="border-2 border-gray-600 rounded bg-white/5 overflow-hidden">
                                {/* Header negro */}
                                <div className="bg-gray-950 px-4 py-2 border-b-2 border-gray-600">
                                    <span className="text-white font-bold text-sm uppercase tracking-wide">Rasgos Raciales</span>
                                </div>
                                {/* Área de escritura vacía */}
                                <div className="p-4 min-h-[120px]">
                                    <div className="border-b border-gray-600 py-2">&nbsp;</div>
                                    <div className="border-b border-gray-600 py-2">&nbsp;</div>
                                    <div className="border-b border-gray-600 py-2">&nbsp;</div>
                                    <div className="border-b border-gray-600 py-2">&nbsp;</div>
                                    <div className="border-b border-gray-600 py-2">&nbsp;</div>
                                </div>
                            </div>

                            {/* Ejemplo rellenado con borde dorado */}
                            <div className="border-2 border-gold-500/50 rounded bg-gray-900/40 overflow-hidden">
                                <div className="bg-gold-900/30 px-3 py-1 border-b border-gold-500/30">
                                    <span className="text-gold-400 text-xs font-semibold">✏️ Ejemplo: Enano de las Colinas</span>
                                </div>
                                {/* Header */}
                                <div className="bg-gray-950 px-4 py-1.5 border-b border-gray-700">
                                    <span className="text-gold-400 font-bold text-xs uppercase">Rasgos Raciales</span>
                                </div>
                                {/* Contenido del ejemplo */}
                                <div className="p-3 space-y-1 text-xs">
                                    <div className="border-b border-gray-700 py-1 text-gray-200">
                                        <span className="text-green-400">•</span> +2 Constitución, -2 Carisma
                                    </div>
                                    <div className="border-b border-gray-700 py-1 text-gray-200">
                                        <span className="text-green-400">•</span> Tamaño Mediano, Velocidad 20 pies (no se reduce con armadura)
                                    </div>
                                    <div className="border-b border-gray-700 py-1 text-gray-200">
                                        <span className="text-green-400">•</span> Visión en la Oscuridad 60 pies
                                    </div>
                                    <div className="border-b border-gray-700 py-1 text-gray-200">
                                        <span className="text-green-400">•</span> +2 a salvaciones contra veneno y conjuros
                                    </div>
                                    <div className="border-b border-gray-700 py-1 text-gray-200">
                                        <span className="text-green-400">•</span> +1 ataque contra orcos y goblinoides
                                    </div>
                                    <div className="border-b border-gray-700 py-1 text-gray-200">
                                        <span className="text-green-400">•</span> +4 CA contra criaturas de tipo Gigante
                                    </div>
                                    <div className="border-b border-gray-700 py-1 text-gray-200">
                                        <span className="text-green-400">•</span> +2 a Tasación y Artesanía (piedra/metal)
                                    </div>
                                </div>
                                {/* Nota explicativa */}
                                <div className="bg-gray-950/50 px-3 py-2 border-t border-gray-700">
                                    <p className="text-gray-400 text-[10px]">
                                        <strong className="text-gold-400">Fuente:</strong> Manual del Jugador, página 14-15 (descripción de la raza Enano)
                                    </p>
                                </div>
                            </div>

                            {/* Explicación adicional */}
                            <div className="bg-gray-900/40 p-4 rounded border border-gray-700">
                                <strong className="text-green-300 block mb-2">¿Por qué anotarlo todo?</strong>
                                <p className="text-gray-300 text-xs">
                                    Muchos rasgos raciales son <strong>situacionales</strong> (ej: +4 CA solo contra gigantes).
                                    Tenerlos escritos te ayuda a recordarlos durante el juego sin consultar el manual.
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* 4. Retrato */}
                    <Card className="card border-gray-500/30">
                        <CardHeader className="bg-gradient-to-r from-gray-900/20 to-transparent">
                            <CardTitle className="flex items-center gap-3 text-xl">
                                <User className="h-5 w-5 text-gray-300" />
                                Cuadrado en Blanco (Arriba Derecha)
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 text-sm">
                            <div className="bg-gray-900/40 p-4 rounded border border-gray-700">
                                <strong className="text-gray-200 block mb-2">¿Para qué es?</strong>
                                <p className="text-gray-300 text-xs">
                                    Es el espacio para <strong>dibujar a tu personaje</strong> o pegar una imagen.
                                    Es opcional pero ayuda a visualizar tu aventurero durante el juego.
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* 5. Rasgos de Clase */}
                    <Card className="card border-orange-500/30">
                        <CardHeader className="bg-gradient-to-r from-orange-900/20 to-transparent">
                            <CardTitle className="flex items-center gap-3 text-xl">
                                <Sword className="h-5 w-5 text-orange-400" />
                                Rasgos de Clase
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-6 text-sm">

                            {/* Réplica de hoja oficial D&D 3.5 - Rasgos de Clase */}
                            <div className="border-2 border-gray-600 rounded bg-white/5 overflow-hidden">
                                {/* Header negro */}
                                <div className="bg-gray-950 px-4 py-2 border-b-2 border-gray-600">
                                    <span className="text-white font-bold text-sm uppercase tracking-wide">Rasgos de Clase</span>
                                </div>
                                {/* Header de columnas */}
                                <div className="grid grid-cols-[2fr_1fr_2fr] border-b-2 border-gray-600 text-[8px] text-gray-500 uppercase tracking-wider bg-gray-900/30 p-2 text-center">
                                    <span className="text-left">Nombre del Rasgo</span>
                                    <span>Pág. Ref.</span>
                                    <span className="text-left">Notas</span>
                                </div>
                                {/* Filas vacías para completar */}
                                {[1, 2, 3, 4, 5, 6].map((row) => (
                                    <div key={row} className="grid grid-cols-[2fr_1fr_2fr] text-xs p-2 text-center items-center border-b border-gray-700">
                                        <span className="text-left border-b border-gray-600 py-1">&nbsp;</span>
                                        <span className="border-b border-gray-600 py-1">&nbsp;</span>
                                        <span className="text-left border-b border-gray-600 py-1">&nbsp;</span>
                                    </div>
                                ))}
                            </div>

                            {/* Ejemplo rellenado con borde dorado */}
                            <div className="border-2 border-gold-500/50 rounded bg-gray-900/40 overflow-hidden">
                                <div className="bg-gold-900/30 px-3 py-1 border-b border-gold-500/30">
                                    <span className="text-gold-400 text-xs font-semibold">✏️ Ejemplo: Pícaro nivel 3</span>
                                </div>
                                {/* Header */}
                                <div className="bg-gray-950 px-4 py-1.5 border-b border-gray-700">
                                    <span className="text-gold-400 font-bold text-xs uppercase">Rasgos de Clase</span>
                                </div>
                                {/* Header de columnas */}
                                <div className="grid grid-cols-[2fr_1fr_2fr] border-b border-gray-700 text-[8px] text-gray-500 uppercase tracking-wider bg-gray-900/30 p-2 text-center">
                                    <span className="text-left">Nombre del Rasgo</span>
                                    <span>Pág. Ref.</span>
                                    <span className="text-left">Notas</span>
                                </div>
                                {/* Fila 1 */}
                                <div className="grid grid-cols-[2fr_1fr_2fr] text-xs p-2 text-center items-center border-b border-gray-700">
                                    <span className="text-left font-bold text-orange-300">Ataque Furtivo +2d6</span>
                                    <span className="text-gray-400">50</span>
                                    <span className="text-left text-gray-300 text-[10px]">Daño extra vs desprevenidos/flanqueados</span>
                                </div>
                                {/* Fila 2 */}
                                <div className="grid grid-cols-[2fr_1fr_2fr] text-xs p-2 text-center items-center border-b border-gray-700 bg-gray-950/30">
                                    <span className="text-left font-bold text-orange-300">Buscar Trampas</span>
                                    <span className="text-gray-400">50</span>
                                    <span className="text-left text-gray-300 text-[10px]">Puedo encontrar trampas CD 20+</span>
                                </div>
                                {/* Fila 3 */}
                                <div className="grid grid-cols-[2fr_1fr_2fr] text-xs p-2 text-center items-center border-b border-gray-700">
                                    <span className="text-left font-bold text-orange-300">Evasión</span>
                                    <span className="text-gray-400">51</span>
                                    <span className="text-left text-gray-300 text-[10px]">Reflejos OK = 0 daño (en vez de mitad)</span>
                                </div>
                                {/* Fila 4 */}
                                <div className="grid grid-cols-[2fr_1fr_2fr] text-xs p-2 text-center items-center border-b border-gray-700 bg-gray-950/30">
                                    <span className="text-left font-bold text-orange-300">Sentido de las Trampas +1</span>
                                    <span className="text-gray-400">51</span>
                                    <span className="text-left text-gray-300 text-[10px]">+1 Reflejos y CA vs trampas</span>
                                </div>
                                {/* Nota explicativa */}
                                <div className="bg-gray-950/50 px-3 py-2 border-t border-gray-700">
                                    <p className="text-gray-400 text-[10px]">
                                        <strong className="text-gold-400">Nota:</strong> Los rasgos se acumulan al subir de nivel.
                                        Nivel 1 = Ataque Furtivo +1d6 + Buscar Trampas. Nivel 2 = +Evasión. Nivel 3 = Sentido +1.
                                    </p>
                                </div>
                            </div>

                            {/* Grid de explicaciones */}
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="bg-gray-900/40 p-4 rounded border border-gray-700">
                                    <strong className="text-orange-300 block mb-2">¿Cuántos rasgos tengo a nivel 1?</strong>
                                    <p className="text-gray-300 text-xs">
                                        Depende de la clase. Consulta la descripción de tu clase en el Manual del Jugador.
                                        Anota <strong>todos los que apliquen a tu nivel actual</strong>.
                                    </p>
                                </div>
                                <div className="bg-gray-900/40 p-4 rounded border border-gray-700">
                                    <strong className="text-orange-300 block mb-2">¿Pág. Ref y Notas son obligatorios?</strong>
                                    <p className="text-gray-300 text-xs">
                                        <strong>No</strong>, pero son muy útiles durante el juego para consultar reglas rápidamente.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* 6. Furia (Bárbaro) */}
                    <Card className="card border-red-500/30">
                        <CardHeader className="bg-gradient-to-r from-red-900/20 to-transparent">
                            <CardTitle className="flex items-center gap-3 text-xl">
                                <Zap className="h-5 w-5 text-red-400" />
                                Cuadro de Furia (Bárbaro)
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-6 text-sm">

                            {/* Aviso importante */}
                            <div className="bg-red-900/20 p-4 rounded border border-red-500/30">
                                <strong className="text-red-300 block mb-2">⚠️ ¿Mi clase NO es Bárbaro?</strong>
                                <p className="text-gray-300 text-xs">
                                    <strong>Ignora completamente este cuadro</strong>. La Furia es exclusiva del Bárbaro.
                                    Pasa directamente a la siguiente sección.
                                </p>
                            </div>

                            {/* Réplica de hoja oficial D&D 3.5 - Furia */}
                            <div className="border-2 border-gray-600 rounded bg-white/5 overflow-hidden">
                                {/* Header negro */}
                                <div className="bg-gray-950 px-4 py-2 border-b-2 border-gray-600">
                                    <span className="text-white font-bold text-sm uppercase tracking-wide">Furia</span>
                                </div>
                                {/* Grid de campos de Furia */}
                                <div className="grid grid-cols-3 gap-0">
                                    {/* Furia/Día */}
                                    <div className="p-3 border-r border-b border-gray-600">
                                        <span className="text-[8px] text-gray-500 uppercase tracking-wider block mb-1">Furia/Día</span>
                                        <div className="border-b-2 border-gray-500 py-2 text-center">&nbsp;</div>
                                    </div>
                                    {/* Duración */}
                                    <div className="p-3 border-r border-b border-gray-600">
                                        <span className="text-[8px] text-gray-500 uppercase tracking-wider block mb-1">Duración (rondas)</span>
                                        <div className="border-b-2 border-gray-500 py-2 text-center">&nbsp;</div>
                                    </div>
                                    {/* Bonif. FUE/CON */}
                                    <div className="p-3 border-b border-gray-600">
                                        <span className="text-[8px] text-gray-500 uppercase tracking-wider block mb-1">Bonif. FUE</span>
                                        <div className="border-b-2 border-gray-500 py-2 text-center">&nbsp;</div>
                                    </div>
                                    {/* Bonif. CON */}
                                    <div className="p-3 border-r border-b border-gray-600">
                                        <span className="text-[8px] text-gray-500 uppercase tracking-wider block mb-1">Bonif. CON</span>
                                        <div className="border-b-2 border-gray-500 py-2 text-center">&nbsp;</div>
                                    </div>
                                    {/* Salvación Vol */}
                                    <div className="p-3 border-r border-b border-gray-600">
                                        <span className="text-[8px] text-gray-500 uppercase tracking-wider block mb-1">Bonif. Voluntad</span>
                                        <div className="border-b-2 border-gray-500 py-2 text-center">&nbsp;</div>
                                    </div>
                                    {/* Penaliz CA */}
                                    <div className="p-3 border-b border-gray-600">
                                        <span className="text-[8px] text-gray-500 uppercase tracking-wider block mb-1">Penaliz. CA</span>
                                        <div className="border-b-2 border-gray-500 py-2 text-center">&nbsp;</div>
                                    </div>
                                </div>
                                {/* Furias Usadas (checkboxes) */}
                                <div className="p-3">
                                    <span className="text-[8px] text-gray-500 uppercase tracking-wider block mb-2">Furias Usadas</span>
                                    <div className="flex gap-2">
                                        {[1, 2, 3, 4, 5, 6].map((n) => (
                                            <div key={n} className="w-5 h-5 border-2 border-gray-500 rounded-sm"></div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Ejemplo rellenado con borde dorado */}
                            <div className="border-2 border-gold-500/50 rounded bg-gray-900/40 overflow-hidden">
                                <div className="bg-gold-900/30 px-3 py-1 border-b border-gold-500/30">
                                    <span className="text-gold-400 text-xs font-semibold">✏️ Ejemplo: Bárbaro nivel 1 (CON 16)</span>
                                </div>
                                {/* Header */}
                                <div className="bg-gray-950 px-4 py-1.5 border-b border-gray-700">
                                    <span className="text-gold-400 font-bold text-xs uppercase">Furia</span>
                                </div>
                                {/* Grid rellenado */}
                                <div className="grid grid-cols-3 gap-0 text-xs">
                                    <div className="p-2 border-r border-b border-gray-700 text-center">
                                        <span className="text-[8px] text-gray-500 block">Furia/Día</span>
                                        <span className="text-red-400 font-bold text-lg">1</span>
                                    </div>
                                    <div className="p-2 border-r border-b border-gray-700 text-center">
                                        <span className="text-[8px] text-gray-500 block">Duración</span>
                                        <span className="text-red-400 font-bold text-lg">6</span>
                                        <span className="text-gray-500 text-[9px] block">(3 + mod CON 3)</span>
                                    </div>
                                    <div className="p-2 border-b border-gray-700 text-center">
                                        <span className="text-[8px] text-gray-500 block">Bonif. FUE</span>
                                        <span className="text-green-400 font-bold text-lg">+4</span>
                                    </div>
                                    <div className="p-2 border-r border-b border-gray-700 text-center">
                                        <span className="text-[8px] text-gray-500 block">Bonif. CON</span>
                                        <span className="text-green-400 font-bold text-lg">+4</span>
                                    </div>
                                    <div className="p-2 border-r border-b border-gray-700 text-center">
                                        <span className="text-[8px] text-gray-500 block">Bonif. Vol</span>
                                        <span className="text-blue-400 font-bold text-lg">+2</span>
                                    </div>
                                    <div className="p-2 border-b border-gray-700 text-center">
                                        <span className="text-[8px] text-gray-500 block">Penaliz. CA</span>
                                        <span className="text-red-500 font-bold text-lg">-2</span>
                                    </div>
                                </div>
                                {/* Nota explicativa */}
                                <div className="bg-gray-950/50 px-3 py-2 border-t border-gray-700">
                                    <p className="text-gray-400 text-[10px]">
                                        <strong className="text-gold-400">Efectos:</strong>
                                        <span className="text-green-300 ml-1">+2 ataque/daño</span>,
                                        <span className="text-green-300 ml-1">+2 PG temporales/nivel</span>,
                                        <span className="text-blue-300 ml-1">+2 Voluntad</span>,
                                        <span className="text-red-300 ml-1">-2 CA</span>.
                                        Al terminar: <strong>Fatigado</strong>.
                                    </p>
                                </div>
                            </div>

                            {/* Grid de explicaciones */}
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="bg-gray-900/40 p-4 rounded border border-gray-700">
                                    <strong className="text-red-400 block mb-2">¿Cómo calculo la duración?</strong>
                                    <p className="text-gray-300 text-xs">
                                        <strong>3 + Modificador de Constitución</strong> rondas.
                                        Con CON 16 (+3), dura 6 rondas.
                                    </p>
                                </div>
                                <div className="bg-gray-900/40 p-4 rounded border border-gray-700">
                                    <strong className="text-red-400 block mb-2">¿Qué pasa cuando termina?</strong>
                                    <p className="text-gray-300 text-xs">
                                        Quedas <strong>Fatigado</strong> (-2 FUE, -2 DES, no puedes correr/cargar).
                                        No puedes volver a enfurecerte hasta descansar.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* 7. Dotes */}
                    <Card className="card border-purple-500/30">
                        <CardHeader className="bg-gradient-to-r from-purple-900/20 to-transparent">
                            <CardTitle className="flex items-center gap-3 text-xl">
                                <Brain className="h-5 w-5 text-purple-400" />
                                Dotes (Feats)
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-6 text-sm">

                            {/* Réplica de hoja oficial D&D 3.5 - Dotes */}
                            <div className="border-2 border-gray-600 rounded bg-white/5 overflow-hidden">
                                {/* Header negro */}
                                <div className="bg-gray-950 px-4 py-2 border-b-2 border-gray-600">
                                    <span className="text-white font-bold text-sm uppercase tracking-wide">Dotes</span>
                                </div>
                                {/* Header de columnas */}
                                <div className="grid grid-cols-[2fr_1fr_2fr] border-b-2 border-gray-600 text-[8px] text-gray-500 uppercase tracking-wider bg-gray-900/30 p-2 text-center">
                                    <span className="text-left">Nombre de la Dote</span>
                                    <span>Pág. Ref.</span>
                                    <span className="text-left">Notas</span>
                                </div>
                                {/* Filas vacías para completar */}
                                {[1, 2, 3, 4, 5, 6].map((row) => (
                                    <div key={row} className="grid grid-cols-[2fr_1fr_2fr] text-xs p-2 text-center items-center border-b border-gray-700">
                                        <span className="text-left border-b border-gray-600 py-1">&nbsp;</span>
                                        <span className="border-b border-gray-600 py-1">&nbsp;</span>
                                        <span className="text-left border-b border-gray-600 py-1">&nbsp;</span>
                                    </div>
                                ))}
                            </div>

                            {/* Ejemplo rellenado con borde dorado */}
                            <div className="border-2 border-gold-500/50 rounded bg-gray-900/40 overflow-hidden">
                                <div className="bg-gold-900/30 px-3 py-1 border-b border-gold-500/30">
                                    <span className="text-gold-400 text-xs font-semibold">✏️ Ejemplo: Guerrero Humano nivel 1 (3 dotes: 1 base + 1 humano + 1 bonus guerrero)</span>
                                </div>
                                {/* Header */}
                                <div className="bg-gray-950 px-4 py-1.5 border-b border-gray-700">
                                    <span className="text-gold-400 font-bold text-xs uppercase">Dotes</span>
                                </div>
                                {/* Header de columnas */}
                                <div className="grid grid-cols-[2fr_1fr_2fr] border-b border-gray-700 text-[8px] text-gray-500 uppercase tracking-wider bg-gray-900/30 p-2 text-center">
                                    <span className="text-left">Nombre de la Dote</span>
                                    <span>Pág. Ref.</span>
                                    <span className="text-left">Notas</span>
                                </div>
                                {/* Fila 1: Ataque Poderoso */}
                                <div className="grid grid-cols-[2fr_1fr_2fr] text-xs p-2 text-center items-center border-b border-gray-700">
                                    <span className="text-left font-bold text-purple-300">Ataque Poderoso</span>
                                    <span className="text-gray-400">98</span>
                                    <span className="text-left text-gray-300 text-[10px]">-1 ataque = +2 daño (máx -5/+10)</span>
                                </div>
                                {/* Fila 2: Combatir a la Defensiva */}
                                <div className="grid grid-cols-[2fr_1fr_2fr] text-xs p-2 text-center items-center border-b border-gray-700 bg-gray-950/30">
                                    <span className="text-left font-bold text-purple-300">Soltura con Armas (Espada Larga)</span>
                                    <span className="text-gray-400">102</span>
                                    <span className="text-left text-gray-300 text-[10px]">+1 ataque con espada larga</span>
                                </div>
                                {/* Fila 3: Esquivar */}
                                <div className="grid grid-cols-[2fr_1fr_2fr] text-xs p-2 text-center items-center border-b border-gray-700">
                                    <span className="text-left font-bold text-purple-300">Esquivar</span>
                                    <span className="text-gray-400">93</span>
                                    <span className="text-left text-gray-300 text-[10px]">+1 CA vs 1 enemigo designado</span>
                                </div>
                                {/* Nota explicativa */}
                                <div className="bg-gray-950/50 px-3 py-2 border-t border-gray-700">
                                    <p className="text-gray-400 text-[10px]">
                                        <strong className="text-gold-400">Origen:</strong>
                                        <span className="text-blue-300 ml-1">Ataque Poderoso</span> (dote base nivel 1) +
                                        <span className="text-green-300 ml-1">Soltura</span> (bonus Guerrero nivel 1) +
                                        <span className="text-amber-300 ml-1">Esquivar</span> (bonus racial Humano)
                                    </p>
                                </div>
                            </div>

                            {/* Explanations Grid */}
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="bg-gray-900/40 p-4 rounded border border-gray-700">
                                    <strong className="text-purple-300 block mb-2">¿Por qué hay tantos casilleros?</strong>
                                    <p className="text-gray-300 text-xs">
                                        Porque a medida que subes de nivel, <strong>ganas más dotes</strong>:
                                    </p>
                                    <ul className="text-gray-400 text-xs mt-2 space-y-1 list-disc list-inside">
                                        <li>1 dote a nivel 1</li>
                                        <li>+1 dote cada 3 niveles (3, 6, 9, 12...)</li>
                                        <li>Humanos ganan 1 dote extra a nivel 1</li>
                                        <li>Guerreros ganan dotes bonus adicionales</li>
                                    </ul>
                                </div>
                                <div className="bg-gray-900/40 p-4 rounded border border-gray-700">
                                    <strong className="text-purple-300 block mb-2">¿Debo completar todos?</strong>
                                    <p className="text-gray-300 text-xs">
                                        <strong>NO</strong>. Solo rellena los que tengas. A nivel 1 tendrás 1-3 dotes normalmente.
                                        Los demás casilleros son para niveles futuros.
                                    </p>
                                    <div className="mt-2">
                                        <p className="text-gray-400 text-xs">
                                            <strong>Pág. Ref:</strong> Opcional pero útil para consultas rápidas.
                                        </p>
                                        <p className="text-gray-400 text-xs mt-1">
                                            <strong>Notas:</strong> Recordatorios del efecto de la dote.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* 8. Notas */}
                    <Card className="card border-gray-500/30">
                        <CardHeader className="bg-gradient-to-r from-gray-900/20 to-transparent">
                            <CardTitle className="flex items-center gap-3 text-xl">
                                <Book className="h-5 w-5 text-gray-300" />
                                Cuadro de Notas
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 text-sm">
                            <div className="bg-gray-900/40 p-4 rounded border border-gray-700">
                                <strong className="text-gray-200 block mb-2">¿Es necesario?</strong>
                                <p className="text-gray-300 text-xs">
                                    Es <strong>opcional</strong> pero muy útil. Puedes anotar:
                                </p>
                                <ul className="text-gray-400 text-xs mt-2 space-y-1 list-disc list-inside">
                                    <li>Historia y trasfondo de tu personaje</li>
                                    <li>Aliados y enemigos importantes</li>
                                    <li>Misiones activas y objetivos</li>
                                    <li>Información de la campaña</li>
                                    <li>Cualquier cosa que quieras recordar</li>
                                </ul>
                            </div>
                        </CardContent>
                    </Card>

                    {/* 9. Conjuros (MEGA SECTION) */}
                    <Card className="card border-blue-500/30">
                        <CardHeader className="bg-gradient-to-r from-blue-900/20 to-transparent">
                            <CardTitle className="flex items-center gap-3 text-xl">
                                <Zap className="h-5 w-5 text-blue-400" />
                                Conjuros (Magia)
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-6 text-sm">
                            <div className="bg-red-900/20 p-4 rounded border border-red-500/30">
                                <strong className="text-red-300 block mb-2">¿Debo rellenar si mi personaje NO usa magia?</strong>
                                <p className="text-gray-300 text-xs">
                                    <strong>NO</strong>. Si eres Guerrero, Bárbaro, Pícaro o Monje (sin multiclase mágica), ignora toda esta sección.
                                    Solo es para <strong>clases lanzadoras</strong>: Mago, Hechicero, Clérigo, Druida, Bardo, Paladín, Explorador.
                                </p>
                            </div>

                            {/* Ejemplo rellenado con borde dorado - Mago nivel 1 */}
                            <div className="border-2 border-gold-500/50 rounded bg-gray-900/40 overflow-hidden">
                                <div className="bg-gold-900/30 px-3 py-1 border-b border-gold-500/30">
                                    <span className="text-gold-400 text-xs font-semibold">✏️ Ejemplo: Mago nivel 1 con INT 16</span>
                                </div>
                                <div className="p-3 space-y-2">
                                    {/* Fila 1: CD y Fallo */}
                                    <div className="flex flex-wrap gap-3 text-[11px]">
                                        <div className="bg-gray-950/50 rounded px-3 py-1.5 flex items-center gap-2">
                                            <span className="text-gray-500">CD Salvación:</span>
                                            <span className="text-blue-400 font-bold">10 + Nivel + 3</span>
                                            <span className="text-gray-400">=</span>
                                            <span className="text-blue-300 font-bold">13</span>
                                            <span className="text-gray-500 text-[9px]">(nivel 0)</span>
                                        </div>
                                        <div className="bg-gray-950/50 rounded px-3 py-1.5 flex items-center gap-2">
                                            <span className="text-gray-500">% Fallo Arcano:</span>
                                            <span className="text-green-400 font-bold">0%</span>
                                            <span className="text-gray-500 text-[9px]">(sin armadura)</span>
                                        </div>
                                        <div className="bg-gray-950/50 rounded px-3 py-1.5 flex items-center gap-2">
                                            <span className="text-gray-500">Mod. Característica:</span>
                                            <span className="text-purple-400 font-bold">INT +3</span>
                                        </div>
                                    </div>
                                    {/* Fila 2: Conjuros por día */}
                                    <div className="flex flex-wrap gap-2 text-[10px]">
                                        <span className="text-gray-500">Conjuros/día:</span>
                                        <div className="bg-gray-950/50 rounded px-2 py-0.5">
                                            <span className="text-gray-400">Nivel 0:</span>
                                            <span className="text-amber-400 font-bold ml-1">3</span>
                                        </div>
                                        <div className="bg-gray-950/50 rounded px-2 py-0.5">
                                            <span className="text-gray-400">Nivel 1:</span>
                                            <span className="text-amber-400 font-bold ml-1">1 + 1</span>
                                            <span className="text-gray-500 text-[9px] ml-1">(adicional INT)</span>
                                        </div>
                                    </div>
                                    {/* Nota */}
                                    <p className="text-gray-500 text-[10px] italic border-t border-gray-700 pt-2">
                                        Los Magos preparan conjuros de su libro cada día. Hechiceros los conocen pero no preparan.
                                    </p>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div className="bg-gray-900/40 p-4 rounded border border-gray-700">
                                        <strong className="text-blue-300 block mb-2">Salvación de Conjuro / CD</strong>
                                        <p className="text-gray-300 text-xs mb-2">
                                            La <strong>Clase de Dificultad</strong> que deben superar los enemigos para resistir tu hechizo.
                                        </p>
                                        <div className="bg-gray-950 p-2 rounded font-mono text-xs text-center">
                                            <span className="text-blue-400">CD = 10 + Nivel del Conjuro + Mod. Característica</span>
                                        </div>
                                        <p className="text-gray-400 text-xs mt-2 italic">
                                            Ej: Bola de Fuego (nivel 3) con INT 16 (+3) = CD 16.
                                        </p>
                                    </div>
                                    <div className="bg-gray-900/40 p-4 rounded border border-gray-700">
                                        <strong className="text-blue-300 block mb-2">Mod. a la CD</strong>
                                        <p className="text-gray-300 text-xs">
                                            Bonus extra de objetos mágicos o dotes que aumentan la dificultad de tus conjuros.
                                            Normalmente vacío a nivel 1.
                                        </p>
                                    </div>
                                    <div className="bg-gray-900/40 p-4 rounded border border-gray-700">
                                        <strong className="text-amber-400 block mb-2">% de Fallo de Conjuro Arcano</strong>
                                        <p className="text-gray-300 text-xs">
                                            <strong>Solo para Magos, Hechiceros y Bardos</strong> que usan armadura.
                                            Copia el % de tu armadura. Tiras d100 y si sacas igual o menor, el conjuro falla.
                                        </p>
                                        <p className="text-gray-500 text-xs mt-1">
                                            Clérigos y Druidas no tienen este problema.
                                        </p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="bg-gray-900/40 p-4 rounded border border-gray-700">
                                        <strong className="text-blue-300 block mb-2">Conjuros Conocidos</strong>
                                        <p className="text-gray-300 text-xs">
                                            <strong>Hechiceros y Bardos:</strong> Lista fija de conjuros que sabes. Lo dice la tabla de clase.
                                        </p>
                                        <p className="text-gray-300 text-xs mt-1">
                                            <strong>Magos:</strong> Los que tienes en tu libro de conjuros.
                                        </p>
                                        <p className="text-gray-300 text-xs mt-1">
                                            <strong>Clérigos y Druidas:</strong> Acceso a TODA la lista (preparas los que quieras cada día).
                                        </p>
                                    </div>
                                    <div className="bg-gray-900/40 p-4 rounded border border-gray-700">
                                        <strong className="text-blue-300 block mb-2">Conjuros por Día</strong>
                                        <p className="text-gray-300 text-xs">
                                            Cuántos conjuros de cada nivel puedes lanzar. Viene de tu tabla de clase.
                                        </p>
                                    </div>
                                    <div className="bg-gray-900/40 p-4 rounded border border-gray-700">
                                        <strong className="text-blue-300 block mb-2">Conjuros Adicionales</strong>
                                        <p className="text-gray-300 text-xs">
                                            Bonus por característica alta. Si tu mod. de lanzamiento es +4, ganas conjuros extra de niveles 1-4.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="bg-gray-900/40 p-4 rounded border border-gray-700">
                                    <strong className="text-blue-300 block mb-2">Escuela Especialista</strong>
                                    <p className="text-gray-300 text-xs">
                                        <strong>Solo Magos especializados</strong>. La escuela en la que te enfocas (Evocación, Abjuración, etc.).
                                        Si no eres especialista, déjalo en blanco.
                                    </p>
                                </div>
                                <div className="bg-gray-900/40 p-4 rounded border border-gray-700">
                                    <strong className="text-red-400 block mb-2">Escuelas Prohibidas</strong>
                                    <p className="text-gray-300 text-xs">
                                        Las escuelas que <strong>NO puedes usar</strong> por ser especialista.
                                        Normalmente 2 escuelas (o 1 si es Adivinación).
                                    </p>
                                </div>
                            </div>

                            <div className="bg-blue-900/20 p-4 rounded border border-blue-500/30">
                                <strong className="text-blue-300 block mb-2">¿Cuándo uso los Modificadores Condicionales?</strong>
                                <p className="text-gray-300 text-xs">
                                    Para bonus que solo aplican en ciertas situaciones: <em>"CD +2 contra no-muertos"</em>,
                                    <em>"+1 nivel de lanzador con fuego"</em>, etc.
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* 10. Pertenencias */}
                    <Card className="card border-amber-500/30">
                        <CardHeader className="bg-gradient-to-r from-amber-900/20 to-transparent">
                            <CardTitle className="flex items-center gap-3 text-xl">
                                <Backpack className="h-5 w-5 text-amber-400" />
                                Pertenencias
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-6 text-sm">

                            {/* Réplica de hoja oficial D&D 3.5 - Pertenencias */}
                            <div className="border-2 border-gray-600 rounded bg-white/5 overflow-hidden">
                                {/* Header negro */}
                                <div className="bg-gray-950 px-4 py-2 border-b-2 border-gray-600">
                                    <span className="text-white font-bold text-sm uppercase tracking-wide">Pertenencias</span>
                                </div>
                                {/* Header de columnas */}
                                <div className="grid grid-cols-[3fr_1fr_1fr] border-b-2 border-gray-600 text-[8px] text-gray-500 uppercase tracking-wider bg-gray-900/30 p-2 text-center">
                                    <span className="text-left">Objeto</span>
                                    <span>Peso</span>
                                    <span>Cantidad</span>
                                </div>
                                {/* Filas vacías para completar - 2 filas (compacto) */}
                                {[1, 2].map((row) => (
                                    <div key={row} className="grid grid-cols-[3fr_1fr_1fr] text-xs p-1.5 text-center items-center border-b border-gray-700">
                                        <span className="text-left border-b border-gray-600 py-0.5">&nbsp;</span>
                                        <span className="border-b border-gray-600 py-0.5">&nbsp;</span>
                                        <span className="border-b border-gray-600 py-0.5">&nbsp;</span>
                                    </div>
                                ))}
                                {/* Peso total */}
                                <div className="grid grid-cols-[3fr_1fr_1fr] text-xs p-2 items-center bg-gray-900/40">
                                    <span className="text-right font-bold text-gray-400 pr-2">PESO TOTAL:</span>
                                    <span className="border-b-2 border-gray-500 py-1 text-center">&nbsp;</span>
                                    <span className="text-gray-500 text-[10px] pl-2">lb.</span>
                                </div>
                            </div>

                            {/* Ejemplo rellenado con borde dorado */}
                            <div className="border-2 border-gold-500/50 rounded bg-gray-900/40 overflow-hidden">
                                <div className="bg-gold-900/30 px-3 py-1 border-b border-gold-500/30">
                                    <span className="text-gold-400 text-xs font-semibold">✏️ Ejemplo: Equipo de Aventurero Estándar</span>
                                </div>
                                {/* Header */}
                                <div className="bg-gray-950 px-4 py-1.5 border-b border-gray-700">
                                    <span className="text-gold-400 font-bold text-xs uppercase">Pertenencias</span>
                                </div>
                                {/* Header de columnas */}
                                <div className="grid grid-cols-[3fr_1fr_1fr] border-b border-gray-700 text-[8px] text-gray-500 uppercase tracking-wider bg-gray-900/30 p-2 text-center">
                                    <span className="text-left">Objeto</span>
                                    <span>Peso</span>
                                    <span>Cant.</span>
                                </div>
                                {/* Filas con datos - compactas */}
                                {[
                                    { item: 'Mochila (vacía)', peso: '2 lb', cant: '1' },
                                    { item: 'Cuerda de cáñamo (50 pies)', peso: '10 lb', cant: '1' },
                                    { item: 'Antorchas', peso: '1 lb', cant: '5' },
                                    { item: 'Raciones de viaje (día)', peso: '1 lb', cant: '5' },
                                    { item: 'Odre de agua', peso: '4 lb', cant: '1' },
                                    { item: 'Poción Curar Heridas Leves', peso: '—', cant: '2' },
                                ].map((row, i) => (
                                    <div key={i} className={`grid grid-cols-[3fr_1fr_1fr] text-[11px] px-2 py-1 text-center items-center border-b border-gray-700 ${i % 2 === 1 ? 'bg-gray-950/30' : ''}`}>
                                        <span className="text-left text-amber-300">{row.item}</span>
                                        <span className="text-gray-400">{row.peso}</span>
                                        <span className="text-gray-300">{row.cant}</span>
                                    </div>
                                ))}
                                {/* Peso total */}
                                <div className="grid grid-cols-[3fr_1fr_1fr] text-xs p-2 items-center bg-gray-900/40">
                                    <span className="text-right font-bold text-gold-400 pr-2">PESO TOTAL:</span>
                                    <span className="text-gold-300 font-bold text-center">26 lb</span>
                                    <span></span>
                                </div>
                            </div>

                            {/* Explicación */}
                            <div className="bg-gray-900/40 p-4 rounded border border-gray-700">
                                <strong className="text-amber-300 block mb-2">¿Qué NO va aquí?</strong>
                                <p className="text-gray-300 text-xs">
                                    <strong>Armas</strong> (van en la sección de Armas),
                                    <strong> Armadura</strong> (va en Armadura/Objetos Protectores),
                                    <strong> Dinero</strong> (va en Riquezas).
                                    Aquí solo va <strong>equipo de aventura</strong>.
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* 11. Capacidades de Carga */}
                    <Card className="card border-amber-500/30">
                        <CardHeader className="bg-gradient-to-r from-amber-900/20 to-transparent">
                            <CardTitle className="flex items-center gap-3 text-xl">
                                <Scale className="h-5 w-5 text-amber-400" />
                                Capacidades de Carga
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-4 text-sm">
                            {/* Réplica de hoja oficial D&D 3.5 - Capacidades de Carga */}
                            <div className="border-2 border-gray-600 rounded bg-white/5 overflow-hidden">
                                <div className="bg-gray-950 px-4 py-2 border-b-2 border-gray-600">
                                    <span className="text-white font-bold text-sm uppercase tracking-wide">Capacidades de Carga</span>
                                </div>
                                {/* Tabla de cargas */}
                                <div className="grid grid-cols-3 border-b border-gray-700 bg-gray-900/30">
                                    <div className="text-center p-2 border-r border-gray-700">
                                        <span className="text-[8px] text-gray-500 uppercase tracking-wider block">Carga Ligera</span>
                                        <div className="h-6 border-b border-gray-600 mt-1"></div>
                                    </div>
                                    <div className="text-center p-2 border-r border-gray-700">
                                        <span className="text-[8px] text-gray-500 uppercase tracking-wider block">Carga Media</span>
                                        <div className="h-6 border-b border-gray-600 mt-1"></div>
                                    </div>
                                    <div className="text-center p-2">
                                        <span className="text-[8px] text-gray-500 uppercase tracking-wider block">Carga Pesada</span>
                                        <div className="h-6 border-b border-gray-600 mt-1"></div>
                                    </div>
                                </div>
                                {/* Acciones especiales */}
                                <div className="grid grid-cols-3 bg-gray-900/20">
                                    <div className="text-center p-2 border-r border-gray-700">
                                        <span className="text-[8px] text-gray-500 uppercase tracking-wider block">Levantar Sobre Cabeza</span>
                                        <div className="h-6 border-b border-gray-600 mt-1"></div>
                                    </div>
                                    <div className="text-center p-2 border-r border-gray-700">
                                        <span className="text-[8px] text-gray-500 uppercase tracking-wider block">Levantar del Suelo</span>
                                        <div className="h-6 border-b border-gray-600 mt-1"></div>
                                    </div>
                                    <div className="text-center p-2">
                                        <span className="text-[8px] text-gray-500 uppercase tracking-wider block">Empujar/Arrastrar</span>
                                        <div className="h-6 border-b border-gray-600 mt-1"></div>
                                    </div>
                                </div>
                            </div>

                            {/* Ejemplo visual con borde dorado */}
                            <div className="border-2 border-gold-500/50 rounded bg-gray-900/40 overflow-hidden">
                                <div className="bg-gold-900/30 px-4 py-2 border-b border-gold-500/30">
                                    <span className="text-gold-300 font-bold text-sm">📝 Ejemplo: Guerrero Humano (FUE 16)</span>
                                </div>
                                {/* Tabla de cargas rellenada */}
                                <div className="grid grid-cols-3 border-b border-gold-500/30 bg-gray-900/30">
                                    <div className="text-center p-2 border-r border-gold-500/20">
                                        <span className="text-[8px] text-gray-500 uppercase tracking-wider block">Carga Ligera</span>
                                        <span className="text-green-400 font-bold">0-76 lb</span>
                                    </div>
                                    <div className="text-center p-2 border-r border-gold-500/20">
                                        <span className="text-[8px] text-gray-500 uppercase tracking-wider block">Carga Media</span>
                                        <span className="text-yellow-400 font-bold">77-153 lb</span>
                                    </div>
                                    <div className="text-center p-2">
                                        <span className="text-[8px] text-gray-500 uppercase tracking-wider block">Carga Pesada</span>
                                        <span className="text-red-400 font-bold">154-230 lb</span>
                                    </div>
                                </div>
                                {/* Acciones especiales rellenadas */}
                                <div className="grid grid-cols-3 bg-gray-900/20">
                                    <div className="text-center p-2 border-r border-gold-500/20">
                                        <span className="text-[8px] text-gray-500 uppercase tracking-wider block">Levantar Sobre Cabeza</span>
                                        <span className="text-amber-300 font-bold">230 lb</span>
                                    </div>
                                    <div className="text-center p-2 border-r border-gold-500/20">
                                        <span className="text-[8px] text-gray-500 uppercase tracking-wider block">Levantar del Suelo</span>
                                        <span className="text-amber-300 font-bold">460 lb</span>
                                    </div>
                                    <div className="text-center p-2">
                                        <span className="text-[8px] text-gray-500 uppercase tracking-wider block">Empujar/Arrastrar</span>
                                        <span className="text-amber-300 font-bold">1,150 lb</span>
                                    </div>
                                </div>
                                <div className="p-3 border-t border-gold-500/30 text-xs text-gray-400">
                                    💡 <strong className="text-gold-300">Penalizaciones:</strong> Carga Media = máx DES +3, -3 pruebas, x4 correr. Carga Pesada = máx DES +1, -6 pruebas, x3 correr.
                                </div>
                            </div>

                            {/* Explicación adicional */}
                            <div className="bg-amber-900/20 p-4 rounded border border-amber-500/30">
                                <strong className="text-amber-300 block mb-2">📊 ¿De dónde saco los números?</strong>
                                <p className="text-gray-300 text-xs mb-2">
                                    Tabla de Capacidad de Carga (Manual del Jugador, pág. 162). Busca tu <strong>puntuación de Fuerza</strong>, no el modificador.
                                </p>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-3 text-xs">
                                    <div className="bg-gray-950 p-2 rounded text-center">
                                        <span className="text-gray-500 block">FUE 10</span>
                                        <span className="text-gray-300">33/66/100 lb</span>
                                    </div>
                                    <div className="bg-gray-950 p-2 rounded text-center">
                                        <span className="text-gray-500 block">FUE 14</span>
                                        <span className="text-gray-300">58/116/175 lb</span>
                                    </div>
                                    <div className="bg-gray-950 p-2 rounded text-center">
                                        <span className="text-gray-500 block">FUE 16</span>
                                        <span className="text-gray-300">76/153/230 lb</span>
                                    </div>
                                    <div className="bg-gray-950 p-2 rounded text-center">
                                        <span className="text-gray-500 block">FUE 18</span>
                                        <span className="text-gray-300">100/200/300 lb</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* 12. Contenedores */}
                    <Card className="card border-gray-500/30">
                        <CardHeader className="bg-gradient-to-r from-gray-900/20 to-transparent">
                            <CardTitle className="flex items-center gap-3 text-xl">
                                <Backpack className="h-5 w-5 text-gray-300" />
                                Contenedores
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-4 text-sm">
                            {/* Réplica de hoja oficial D&D 3.5 - Contenedores */}
                            <div className="border-2 border-gray-600 rounded bg-white/5 overflow-hidden">
                                <div className="bg-gray-950 px-4 py-2 border-b-2 border-gray-600">
                                    <span className="text-white font-bold text-sm uppercase tracking-wide">Contenedores</span>
                                </div>
                                {/* Headers */}
                                <div className="grid grid-cols-[2fr_1fr_2fr] gap-0 border-b border-gray-700 bg-gray-900/30 px-3 py-2">
                                    <span className="text-[8px] text-gray-500 uppercase tracking-wider text-left">Contenedor</span>
                                    <span className="text-[8px] text-gray-500 uppercase tracking-wider text-center">Capacidad</span>
                                    <span className="text-[8px] text-gray-500 uppercase tracking-wider text-left">Contenido</span>
                                </div>
                                {/* 4 rows vacías */}
                                {[1, 2, 3, 4].map((row) => (
                                    <div key={row} className="grid grid-cols-[2fr_1fr_2fr] gap-0 border-b border-gray-700/50 px-3 py-2">
                                        <div className="h-5 border-b border-gray-600"></div>
                                        <div className="h-5 border-b border-gray-600 mx-2"></div>
                                        <div className="h-5 border-b border-gray-600"></div>
                                    </div>
                                ))}
                            </div>

                            {/* Ejemplo visual con borde dorado */}
                            <div className="border-2 border-gold-500/50 rounded bg-gray-900/40 overflow-hidden">
                                <div className="bg-gold-900/30 px-4 py-2 border-b border-gold-500/30">
                                    <span className="text-gold-300 font-bold text-sm">📝 Ejemplo: Explorador Organizado</span>
                                </div>
                                {/* Headers */}
                                <div className="grid grid-cols-[2fr_1fr_2fr] gap-0 border-b border-gold-500/30 bg-gray-900/30 px-3 py-2">
                                    <span className="text-[8px] text-gray-500 uppercase tracking-wider text-left">Contenedor</span>
                                    <span className="text-[8px] text-gray-500 uppercase tracking-wider text-center">Capacidad</span>
                                    <span className="text-[8px] text-gray-500 uppercase tracking-wider text-left">Contenido</span>
                                </div>
                                {/* Filas de ejemplo */}
                                <div className="text-xs">
                                    <div className="grid grid-cols-[2fr_1fr_2fr] gap-0 border-b border-gold-500/20 px-3 py-2">
                                        <span className="text-gray-200">Mochila</span>
                                        <span className="text-gray-400 text-center">60 lb</span>
                                        <span className="text-gray-300">Raciones, cuerda, saco de dormir</span>
                                    </div>
                                    <div className="grid grid-cols-[2fr_1fr_2fr] gap-0 border-b border-gold-500/20 px-3 py-2">
                                        <span className="text-gray-200">Bolsa de cinturón</span>
                                        <span className="text-gray-400 text-center">10 lb</span>
                                        <span className="text-gray-300">Pociones, dinero, yesca</span>
                                    </div>
                                    <div className="grid grid-cols-[2fr_1fr_2fr] gap-0 border-b border-gold-500/20 px-3 py-2">
                                        <span className="text-gray-200">Carcaj</span>
                                        <span className="text-gray-400 text-center">20 flechas</span>
                                        <span className="text-gray-300">Flechas normales (18 restantes)</span>
                                    </div>
                                    <div className="grid grid-cols-[2fr_1fr_2fr] gap-0 px-3 py-2">
                                        <span className="text-gray-200">Alforjas (caballo)</span>
                                        <span className="text-gray-400 text-center">250 lb</span>
                                        <span className="text-gray-300">Tienda, equipo de cocina, tesoro</span>
                                    </div>
                                </div>
                            </div>

                            {/* Explicación */}
                            <div className="bg-gray-900/40 p-4 rounded border border-gray-700">
                                <strong className="text-gray-200 block mb-2">❓ ¿Es necesario rellenar esto?</strong>
                                <p className="text-gray-300 text-xs">
                                    <strong className="text-amber-300">Opcional pero útil</strong>. Sirve para organizar dónde guardas las cosas.
                                    Cuando el DM pregunte "¿dónde tienes eso exactamente?" podrás responder con precisión.
                                </p>
                                <p className="text-gray-500 text-xs mt-2 italic">
                                    También importa si te roban un contenedor específico o si te caes al agua con la mochila puesta.
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* 13. Idiomas */}
                    <Card className="card border-green-500/30">
                        <CardHeader className="bg-gradient-to-r from-green-900/20 to-transparent">
                            <CardTitle className="flex items-center gap-3 text-xl">
                                <Book className="h-5 w-5 text-green-400" />
                                Idiomas
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-4 text-sm">
                            {/* Réplica de hoja oficial D&D 3.5 - Idiomas */}
                            <div className="border-2 border-gray-600 rounded bg-white/5 overflow-hidden">
                                <div className="bg-gray-950 px-4 py-2 border-b-2 border-gray-600">
                                    <span className="text-white font-bold text-sm uppercase tracking-wide">Idiomas</span>
                                </div>
                                <div className="p-4">
                                    {/* 6 líneas de escritura */}
                                    <div className="space-y-3">
                                        {[1, 2, 3, 4, 5, 6].map((line) => (
                                            <div key={line} className="h-5 border-b border-gray-600"></div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Ejemplo visual con borde dorado */}
                            <div className="border-2 border-gold-500/50 rounded bg-gray-900/40 overflow-hidden">
                                <div className="bg-gold-900/30 px-4 py-2 border-b border-gold-500/30">
                                    <span className="text-gold-300 font-bold text-sm">📝 Ejemplo: Elfo Mago (INT 18)</span>
                                </div>
                                <div className="p-4">
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
                                        <div className="bg-gray-950 p-2 rounded text-center">
                                            <span className="text-green-400 font-bold">Común</span>
                                            <span className="text-gray-500 block text-[10px]">Base</span>
                                        </div>
                                        <div className="bg-gray-950 p-2 rounded text-center">
                                            <span className="text-green-400 font-bold">Élfico</span>
                                            <span className="text-gray-500 block text-[10px]">Racial</span>
                                        </div>
                                        <div className="bg-gray-950 p-2 rounded text-center">
                                            <span className="text-blue-400 font-bold">Dracónico</span>
                                            <span className="text-gray-500 block text-[10px]">INT bonus</span>
                                        </div>
                                        <div className="bg-gray-950 p-2 rounded text-center">
                                            <span className="text-blue-400 font-bold">Celestial</span>
                                            <span className="text-gray-500 block text-[10px]">INT bonus</span>
                                        </div>
                                        <div className="bg-gray-950 p-2 rounded text-center">
                                            <span className="text-blue-400 font-bold">Silvano</span>
                                            <span className="text-gray-500 block text-[10px]">INT bonus</span>
                                        </div>
                                        <div className="bg-gray-950 p-2 rounded text-center">
                                            <span className="text-blue-400 font-bold">Infracomún</span>
                                            <span className="text-gray-500 block text-[10px]">INT bonus</span>
                                        </div>
                                    </div>
                                    <div className="mt-3 text-xs text-gray-400 bg-gray-900/50 p-2 rounded">
                                        💡 <strong className="text-gold-300">Cálculo:</strong> Común (base) + Élfico (racial) + 4 idiomas bonus (INT +4)
                                    </div>
                                </div>
                            </div>

                            {/* Explicación */}
                            <div className="bg-green-900/20 p-4 rounded border border-green-500/30">
                                <strong className="text-green-300 block mb-2">📖 ¿Cómo calculo mis idiomas?</strong>
                                <div className="grid md:grid-cols-2 gap-4 text-xs">
                                    <div>
                                        <p className="text-gray-300 mb-2">
                                            <strong className="text-green-400">Paso 1:</strong> Común (todos lo hablan)
                                        </p>
                                        <p className="text-gray-300 mb-2">
                                            <strong className="text-green-400">Paso 2:</strong> + Idioma racial (según tu raza)
                                        </p>
                                        <p className="text-gray-300">
                                            <strong className="text-green-400">Paso 3:</strong> + Idiomas bonus (= mod INT)
                                        </p>
                                    </div>
                                    <div className="bg-gray-950 p-3 rounded">
                                        <p className="text-gray-400 font-bold mb-2">Idiomas Raciales:</p>
                                        <ul className="text-gray-300 space-y-1">
                                            <li>• Elfos: Élfico</li>
                                            <li>• Enanos: Enano</li>
                                            <li>• Humanos: Ninguno (pero +1 idioma de cualquier lista)</li>
                                            <li>• Gnomos: Gnomo</li>
                                            <li>• Medianos: Mediano</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* 14. Riquezas */}
                    <Card className="card border-yellow-500/30">
                        <CardHeader className="bg-gradient-to-r from-yellow-900/20 to-transparent">
                            <CardTitle className="flex items-center gap-3 text-xl">
                                <Coins className="h-5 w-5 text-yellow-400" />
                                Riquezas
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-4 text-sm">
                            {/* Réplica de hoja oficial D&D 3.5 - Riquezas */}
                            <div className="border-2 border-gray-600 rounded bg-white/5 overflow-hidden">
                                <div className="bg-gray-950 px-4 py-2 border-b-2 border-gray-600">
                                    <span className="text-white font-bold text-sm uppercase tracking-wide">Riquezas</span>
                                </div>
                                {/* Grid de monedas */}
                                <div className="grid grid-cols-4 border-b border-gray-700">
                                    <div className="text-center p-3 border-r border-gray-700">
                                        <span className="text-[8px] text-gray-500 uppercase tracking-wider block mb-1">PC</span>
                                        <div className="h-6 border-b border-gray-600"></div>
                                    </div>
                                    <div className="text-center p-3 border-r border-gray-700">
                                        <span className="text-[8px] text-gray-500 uppercase tracking-wider block mb-1">PP</span>
                                        <div className="h-6 border-b border-gray-600"></div>
                                    </div>
                                    <div className="text-center p-3 border-r border-gray-700">
                                        <span className="text-[8px] text-gray-500 uppercase tracking-wider block mb-1">PO</span>
                                        <div className="h-6 border-b border-gray-600"></div>
                                    </div>
                                    <div className="text-center p-3">
                                        <span className="text-[8px] text-gray-500 uppercase tracking-wider block mb-1">PPt</span>
                                        <div className="h-6 border-b border-gray-600"></div>
                                    </div>
                                </div>
                                {/* Secciones adicionales */}
                                <div className="grid grid-cols-3">
                                    <div className="p-3 border-r border-gray-700">
                                        <span className="text-[8px] text-gray-500 uppercase tracking-wider block mb-2">Gemas</span>
                                        <div className="space-y-2">
                                            <div className="h-4 border-b border-gray-600"></div>
                                            <div className="h-4 border-b border-gray-600"></div>
                                        </div>
                                    </div>
                                    <div className="p-3 border-r border-gray-700">
                                        <span className="text-[8px] text-gray-500 uppercase tracking-wider block mb-2">Arte</span>
                                        <div className="space-y-2">
                                            <div className="h-4 border-b border-gray-600"></div>
                                            <div className="h-4 border-b border-gray-600"></div>
                                        </div>
                                    </div>
                                    <div className="p-3">
                                        <span className="text-[8px] text-gray-500 uppercase tracking-wider block mb-2">Otros</span>
                                        <div className="space-y-2">
                                            <div className="h-4 border-b border-gray-600"></div>
                                            <div className="h-4 border-b border-gray-600"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Ejemplo visual con borde dorado */}
                            <div className="border-2 border-gold-500/50 rounded bg-gray-900/40 overflow-hidden">
                                <div className="bg-gold-900/30 px-4 py-2 border-b border-gold-500/30">
                                    <span className="text-gold-300 font-bold text-sm">📝 Ejemplo: Guerrero nivel 1 (después de comprar equipo)</span>
                                </div>
                                {/* Grid de monedas rellenado */}
                                <div className="grid grid-cols-4 border-b border-gold-500/30">
                                    <div className="text-center p-3 border-r border-gold-500/20">
                                        <span className="text-[8px] text-gray-500 uppercase tracking-wider block mb-1">PC</span>
                                        <span className="text-orange-300 font-bold">5</span>
                                    </div>
                                    <div className="text-center p-3 border-r border-gold-500/20">
                                        <span className="text-[8px] text-gray-500 uppercase tracking-wider block mb-1">PP</span>
                                        <span className="text-gray-300 font-bold">8</span>
                                    </div>
                                    <div className="text-center p-3 border-r border-gold-500/20">
                                        <span className="text-[8px] text-gray-500 uppercase tracking-wider block mb-1">PO</span>
                                        <span className="text-yellow-400 font-bold">12</span>
                                    </div>
                                    <div className="text-center p-3">
                                        <span className="text-[8px] text-gray-500 uppercase tracking-wider block mb-1">PPt</span>
                                        <span className="text-white font-bold">—</span>
                                    </div>
                                </div>
                                {/* Secciones vacías (nivel 1) */}
                                <div className="grid grid-cols-3">
                                    <div className="p-3 border-r border-gold-500/20">
                                        <span className="text-[8px] text-gray-500 uppercase tracking-wider block mb-1">Gemas</span>
                                        <span className="text-gray-500 text-xs italic">—</span>
                                    </div>
                                    <div className="p-3 border-r border-gold-500/20">
                                        <span className="text-[8px] text-gray-500 uppercase tracking-wider block mb-1">Arte</span>
                                        <span className="text-gray-500 text-xs italic">—</span>
                                    </div>
                                    <div className="p-3">
                                        <span className="text-[8px] text-gray-500 uppercase tracking-wider block mb-1">Otros</span>
                                        <span className="text-gray-500 text-xs italic">—</span>
                                    </div>
                                </div>
                                <div className="p-3 border-t border-gold-500/30 text-xs text-gray-400">
                                    💡 <strong className="text-gold-300">Nota:</strong> Gemas, Arte y Otros estarán vacíos a nivel 1. Se llenan con tesoros encontrados en aventuras.
                                </div>
                            </div>

                            {/* Explicación de conversión */}
                            <div className="bg-yellow-900/20 p-4 rounded border border-yellow-500/30">
                                <strong className="text-yellow-300 block mb-2">💰 Tabla de Conversión de Monedas</strong>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                                    <div className="bg-gray-950 p-2 rounded text-center">
                                        <span className="text-orange-300 font-bold block">PC</span>
                                        <span className="text-gray-400">Cobre</span>
                                        <span className="text-gray-500 block text-[10px]">10 = 1 PP</span>
                                    </div>
                                    <div className="bg-gray-950 p-2 rounded text-center">
                                        <span className="text-gray-300 font-bold block">PP</span>
                                        <span className="text-gray-400">Plata</span>
                                        <span className="text-gray-500 block text-[10px]">10 = 1 PO</span>
                                    </div>
                                    <div className="bg-gray-950 p-2 rounded text-center">
                                        <span className="text-yellow-400 font-bold block">PO</span>
                                        <span className="text-gray-400">Oro</span>
                                        <span className="text-gray-500 block text-[10px]">Base</span>
                                    </div>
                                    <div className="bg-gray-950 p-2 rounded text-center">
                                        <span className="text-white font-bold block">PPt</span>
                                        <span className="text-gray-400">Platino</span>
                                        <span className="text-gray-500 block text-[10px]">1 = 10 PO</span>
                                    </div>
                                </div>
                                <p className="text-gray-500 text-xs mt-3 italic">
                                    50 monedas = 1 libra de peso. Llevar mucho dinero en monedas puede ser un problema logístico.
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                </TabsContent>
            </Tabs>
        </div>
    );
}

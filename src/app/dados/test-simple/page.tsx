'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import TestCube from '@/components/dice3d/TestCube';

export default function TestSimplePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-dungeon-900 to-dungeon-800 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gold-400 mb-4">Test Simple 3D</h1>

        <div className="w-full h-[600px] bg-black rounded-lg overflow-hidden">
          <Suspense fallback={
            <div className="w-full h-full flex items-center justify-center text-white">
              Cargando...
            </div>
          }>
            <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />

              <TestCube />

              <OrbitControls />
            </Canvas>
          </Suspense>
        </div>

        <div className="mt-4 text-white">
          <p>Si ves un cubo naranja girando, three.js está funcionando correctamente.</p>
          <p>Si no ves nada, revisa la consola del navegador (F12).</p>
        </div>
      </div>
    </div>
  );
}

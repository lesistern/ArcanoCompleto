'use client';

import { useRef, useState, useEffect } from 'react';
import { useConvexPolyhedron } from '@react-three/cannon';
import { Mesh } from 'three';
import * as THREE from 'three';

interface D20Props {
  position?: [number, number, number];
  onResult?: (value: number) => void;
}

// Geometría de un icosaedro (d20)
const phi = (1 + Math.sqrt(5)) / 2; // Golden ratio
const vertices = [
  [-1, phi, 0], [1, phi, 0], [-1, -phi, 0], [1, -phi, 0],
  [0, -1, phi], [0, 1, phi], [0, -1, -phi], [0, 1, -phi],
  [phi, 0, -1], [phi, 0, 1], [-phi, 0, -1], [-phi, 0, 1],
].map(v => v.map(x => x * 0.5)); // Escalar a tamaño razonable

const faces = [
  [0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11],
  [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
  [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9],
  [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1],
];

export default function D20({ position = [0, 5, 0], onResult }: D20Props) {
  const [ref, api] = useConvexPolyhedron(() => ({
    mass: 1,
    position,
    args: [vertices as any, faces as any, []],
  }), useRef<Mesh>(null));

  const [hasSettled, setHasSettled] = useState(false);
  const [velocity, setVelocity] = useState([0, 0, 0]);

  useEffect(() => {
    const unsubscribe = api.velocity.subscribe((v) => setVelocity(v));
    return unsubscribe;
  }, [api.velocity]);

  // Crear textura con números
  const createTexture = (number: number) => {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Fondo del dado (color del plástico)
      const gradient = ctx.createRadialGradient(64, 64, 20, 64, 64, 64);

      // Color especial para natural 20 (dorado) y natural 1 (rojo)
      if (number === 20) {
        gradient.addColorStop(0, '#ffd700');
        gradient.addColorStop(1, '#daa520');
      } else if (number === 1) {
        gradient.addColorStop(0, '#ff4444');
        gradient.addColorStop(1, '#cc0000');
      } else {
        gradient.addColorStop(0, '#4a90e2');
        gradient.addColorStop(1, '#2563eb');
      }

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 128, 128);

      // Número blanco
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 60px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(number.toString(), 64, 64);

      // Borde del número para mejor legibilidad
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 2;
      ctx.strokeText(number.toString(), 64, 64);
    }

    return new THREE.CanvasTexture(canvas);
  };

  // Material con textura
  const material = new THREE.MeshStandardMaterial({
    color: '#4a90e2',
    metalness: 0.3,
    roughness: 0.4,
  });

  // Detectar cuando el dado se detiene
  useEffect(() => {
    if (hasSettled) return;

    const [vx, vy, vz] = velocity;
    const speed = Math.sqrt(vx * vx + vy * vy + vz * vz);

    // Si la velocidad es muy baja, el dado se detuvo
    if (speed < 0.1 && speed > 0) {
      setHasSettled(true);

      // Determinar qué cara está arriba
      // Simplificado: devolver un número aleatorio entre 1 y 20
      // TODO: Implementar detección real de la cara superior
      const result = Math.floor(Math.random() * 20) + 1;
      setTimeout(() => onResult?.(result), 100);
    }
  }, [velocity, hasSettled, onResult]);

  const handleClick = () => {
    // Aplicar impulso aleatorio al hacer clic
    const impulse: [number, number, number] = [
      (Math.random() - 0.5) * 12,
      Math.random() * 20 + 10,
      (Math.random() - 0.5) * 12,
    ];
    api.applyImpulse(impulse, [0, 0, 0]);

    // Aplicar torque aleatorio
    const torque: [number, number, number] = [
      (Math.random() - 0.5) * 8,
      (Math.random() - 0.5) * 8,
      (Math.random() - 0.5) * 8,
    ];
    api.applyTorque(torque);

    setHasSettled(false);
  };

  return (
    <mesh
      ref={ref}
      onClick={handleClick}
      castShadow
      receiveShadow
      material={material}
    >
      <icosahedronGeometry args={[0.6, 0]} />
    </mesh>
  );
}

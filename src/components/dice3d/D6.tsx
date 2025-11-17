'use client';

import { useRef, useState, useEffect } from 'react';
import { useBox } from '@react-three/cannon';
import { Mesh } from 'three';
import * as THREE from 'three';

interface D6Props {
  position?: [number, number, number];
  onResult?: (value: number) => void;
}

export default function D6({ position = [0, 5, 0], onResult }: D6Props) {
  const [ref, api] = useBox(() => ({
    mass: 1,
    position,
    args: [1, 1, 1], // Tamaño del dado (1x1x1 metros)
  }), useRef<Mesh>(null));

  const [hasSettled, setHasSettled] = useState(false);
  const [velocity, setVelocity] = useState([0, 0, 0]);

  useEffect(() => {
    const unsubscribe = api.velocity.subscribe((v) => setVelocity(v));
    return unsubscribe;
  }, [api.velocity]);

  // Textura de números en las caras
  const materials = Array.from({ length: 6 }, (_, i) => {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Fondo blanco
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, 128, 128);

      // Número negro
      ctx.fillStyle = '#000000';
      ctx.font = 'bold 80px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText((i + 1).toString(), 64, 64);
    }

    const texture = new THREE.CanvasTexture(canvas);
    return new THREE.MeshStandardMaterial({ map: texture });
  });

  // Detectar cuando el dado se detiene
  useEffect(() => {
    if (hasSettled) return;

    const [vx, vy, vz] = velocity;
    const speed = Math.sqrt(vx * vx + vy * vy + vz * vz);

    // Si la velocidad es muy baja, el dado se detuvo
    if (speed < 0.1 && speed > 0) {
      setHasSettled(true);

      // Determinar qué cara está arriba (simplificado)
      // En una implementación completa, calcularías esto basado en la rotación real
      const result = Math.floor(Math.random() * 6) + 1;
      setTimeout(() => onResult?.(result), 100);
    }
  }, [velocity, hasSettled, onResult]);

  const handleClick = () => {
    // Aplicar impulso aleatorio al hacer clic
    const impulse: [number, number, number] = [
      (Math.random() - 0.5) * 10,
      Math.random() * 15 + 5,
      (Math.random() - 0.5) * 10,
    ];
    api.applyImpulse(impulse, [0, 0, 0]);

    // Aplicar torque aleatorio
    const torque: [number, number, number] = [
      (Math.random() - 0.5) * 5,
      (Math.random() - 0.5) * 5,
      (Math.random() - 0.5) * 5,
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
      material={materials}
    >
      <boxGeometry args={[1, 1, 1]} />
    </mesh>
  );
}

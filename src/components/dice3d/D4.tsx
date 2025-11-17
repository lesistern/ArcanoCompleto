'use client';

import { useRef, useState, useEffect } from 'react';
import { useConvexPolyhedron } from '@react-three/cannon';
import { Mesh } from 'three';
import * as THREE from 'three';

interface D4Props {
  position?: [number, number, number];
  onResult?: (value: number) => void;
}

// Geometría de un tetraedro (d4)
const vertices = [
  [1, 1, 1],
  [-1, -1, 1],
  [-1, 1, -1],
  [1, -1, -1],
].map(v => v.map(x => x * 0.6)); // Escalar a tamaño razonable

const faces = [
  [0, 1, 2], // Cara 1
  [0, 3, 1], // Cara 2
  [0, 2, 3], // Cara 3
  [1, 3, 2], // Cara 4
];

export default function D4({ position = [0, 5, 0], onResult }: D4Props) {
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

  // Material con color
  const material = new THREE.MeshStandardMaterial({
    color: '#9333ea', // Púrpura para d4
    metalness: 0.3,
    roughness: 0.4,
  });

  // Detectar cuando el dado se detiene
  useEffect(() => {
    if (hasSettled) return;

    const [vx, vy, vz] = velocity;
    const speed = Math.sqrt(vx * vx + vy * vy + vz * vz);

    if (speed < 0.1 && speed > 0) {
      setHasSettled(true);

      // TODO: Implementar detección real de la cara superior
      const result = Math.floor(Math.random() * 4) + 1;
      setTimeout(() => onResult?.(result), 100);
    }
  }, [velocity, hasSettled, onResult]);

  const handleClick = () => {
    const impulse: [number, number, number] = [
      (Math.random() - 0.5) * 12,
      Math.random() * 20 + 10,
      (Math.random() - 0.5) * 12,
    ];
    api.applyImpulse(impulse, [0, 0, 0]);

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
      <tetrahedronGeometry args={[0.7, 0]} />
    </mesh>
  );
}

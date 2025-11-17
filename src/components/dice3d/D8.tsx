'use client';

import { useRef, useState, useEffect } from 'react';
import { useConvexPolyhedron } from '@react-three/cannon';
import { Mesh } from 'three';
import * as THREE from 'three';

interface D8Props {
  position?: [number, number, number];
  onResult?: (value: number) => void;
}

// Geometría de un octaedro (d8)
const vertices = [
  [1, 0, 0],
  [-1, 0, 0],
  [0, 1, 0],
  [0, -1, 0],
  [0, 0, 1],
  [0, 0, -1],
].map(v => v.map(x => x * 0.6));

const faces = [
  [0, 2, 4], [0, 4, 3], [0, 3, 5], [0, 5, 2],
  [1, 2, 5], [1, 5, 3], [1, 3, 4], [1, 4, 2],
];

export default function D8({ position = [0, 5, 0], onResult }: D8Props) {
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
    color: '#f59e0b', // Ámbar para d8
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
      const result = Math.floor(Math.random() * 8) + 1;
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
      <octahedronGeometry args={[0.6, 0]} />
    </mesh>
  );
}

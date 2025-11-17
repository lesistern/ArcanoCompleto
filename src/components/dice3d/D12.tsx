'use client';

import { useRef, useState, useEffect } from 'react';
import { useConvexPolyhedron } from '@react-three/cannon';
import { Mesh } from 'three';
import * as THREE from 'three';

interface D12Props {
  position?: [number, number, number];
  onResult?: (value: number) => void;
}

// Geometría de un dodecaedro (d12)
// Usando la proporción áurea para los vértices
const phi = (1 + Math.sqrt(5)) / 2;
const a = 1 / phi;
const b = 1;

const vertices = [
  // 8 vértices del cubo
  [a, a, a], [a, a, -a], [a, -a, a], [a, -a, -a],
  [-a, a, a], [-a, a, -a], [-a, -a, a], [-a, -a, -a],
  // 4 vértices en plano XY
  [0, b, 1/phi], [0, b, -1/phi], [0, -b, 1/phi], [0, -b, -1/phi],
  // 4 vértices en plano YZ
  [1/phi, 0, b], [-1/phi, 0, b], [1/phi, 0, -b], [-1/phi, 0, -b],
  // 4 vértices en plano XZ
  [b, 1/phi, 0], [b, -1/phi, 0], [-b, 1/phi, 0], [-b, -1/phi, 0],
].map(v => v.map(x => x * 0.5));

// Triangular cada cara pentagonal (cada pentágono = 3 triángulos)
const faces = [
  // Cara 1: pentágono 0-8-4-18-16
  [0, 8, 4], [0, 4, 18], [0, 18, 16],
  // Cara 2: pentágono 0-16-17-2-12
  [0, 16, 17], [0, 17, 2], [0, 2, 12],
  // Cara 3: pentágono 12-2-10-6-13
  [12, 2, 10], [12, 10, 6], [12, 6, 13],
  // Cara 4: pentágono 13-6-19-18-4
  [13, 6, 19], [13, 19, 18], [13, 18, 4],
  // Cara 5: pentágono 4-8-9-5-19
  [4, 8, 9], [4, 9, 5], [4, 5, 19],
  // Cara 6: pentágono 19-5-15-14-18
  [19, 5, 15], [19, 15, 14], [19, 14, 18],
  // Cara 7: pentágono 18-14-1-16-0
  [18, 14, 1], [18, 1, 16], [18, 16, 0],
  // Cara 8: pentágono 16-1-3-17-0
  [16, 1, 3], [16, 3, 17], [16, 17, 0],
  // Cara 9: pentágono 17-3-11-10-2
  [17, 3, 11], [17, 11, 10], [17, 10, 2],
  // Cara 10: pentágono 10-11-7-6-13
  [10, 11, 7], [10, 7, 6], [10, 6, 13],
  // Cara 11: pentágono 6-7-15-5-19
  [6, 7, 15], [6, 15, 5], [6, 5, 19],
  // Cara 12: pentágono 3-1-14-15-7
  [3, 1, 14], [3, 14, 15], [3, 15, 7],
];

export default function D12({ position = [0, 5, 0], onResult }: D12Props) {
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
    color: '#ec4899', // Rosa para d12
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
      const result = Math.floor(Math.random() * 12) + 1;
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
      <dodecahedronGeometry args={[0.6, 0]} />
    </mesh>
  );
}

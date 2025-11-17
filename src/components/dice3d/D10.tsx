'use client';

import { useRef, useState, useEffect } from 'react';
import { useConvexPolyhedron } from '@react-three/cannon';
import { Mesh } from 'three';
import * as THREE from 'three';

interface D10Props {
  position?: [number, number, number];
  onResult?: (value: number) => void;
}

// Geometría de un trapezoedro pentagonal (d10)
// Aproximación usando vértices calculados
const h = 0.65; // altura
const r = 0.6;  // radio
const vertices = [
  // Pentágono superior
  [r * Math.cos(0), h, r * Math.sin(0)],
  [r * Math.cos(2 * Math.PI / 5), h, r * Math.sin(2 * Math.PI / 5)],
  [r * Math.cos(4 * Math.PI / 5), h, r * Math.sin(4 * Math.PI / 5)],
  [r * Math.cos(6 * Math.PI / 5), h, r * Math.sin(6 * Math.PI / 5)],
  [r * Math.cos(8 * Math.PI / 5), h, r * Math.sin(8 * Math.PI / 5)],
  // Pentágono inferior (rotado)
  [r * Math.cos(Math.PI / 5), -h, r * Math.sin(Math.PI / 5)],
  [r * Math.cos(3 * Math.PI / 5), -h, r * Math.sin(3 * Math.PI / 5)],
  [r * Math.cos(5 * Math.PI / 5), -h, r * Math.sin(5 * Math.PI / 5)],
  [r * Math.cos(7 * Math.PI / 5), -h, r * Math.sin(7 * Math.PI / 5)],
  [r * Math.cos(9 * Math.PI / 5), -h, r * Math.sin(9 * Math.PI / 5)],
];

const faces = [
  // Caras superiores (triángulos desde pentágono superior a inferior)
  [0, 1, 5], [1, 2, 6], [2, 3, 7], [3, 4, 8], [4, 0, 9],
  // Caras inferiores (triángulos entre vértices del pentágono inferior)
  [1, 6, 5], [2, 7, 6], [3, 8, 7], [4, 9, 8], [0, 5, 9],
];

export default function D10({ position = [0, 5, 0], onResult }: D10Props) {
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
    color: '#10b981', // Verde esmeralda para d10
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
      const result = Math.floor(Math.random() * 10) + 1;
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
      {/* Usamos cylinderGeometry como aproximación visual */}
      <cylinderGeometry args={[0.6, 0.6, 1.3, 10, 1]} />
    </mesh>
  );
}

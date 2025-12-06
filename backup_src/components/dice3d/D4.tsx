'use client';

import { useMemo, useRef } from 'react';
import { Mesh } from 'three';
import * as THREE from 'three';

interface D4Props {
  position?: [number, number, number];
  onResult?: (value: number) => void;
}

export default function D4({ position = [0, 5, 0], onResult }: D4Props) {
  const ref = useRef<Mesh>(null);

  const material = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#9333ea', // Púrpura para d4
    metalness: 0.3,
    roughness: 0.4,
  }), []);

  const handleClick = () => {
    const result = Math.floor(Math.random() * 4) + 1;
    setTimeout(() => onResult?.(result), 100);
  };

  return (
    <mesh
      ref={ref}
      position={position}
      onClick={handleClick}
      castShadow
      receiveShadow
      material={material}
    >
      <tetrahedronGeometry args={[0.7, 0]} />
    </mesh>
  );
}

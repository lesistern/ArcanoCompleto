'use client';

import { useMemo, useRef } from 'react';
import { Mesh } from 'three';
import * as THREE from 'three';

interface D20Props {
  position?: [number, number, number];
  onResult?: (value: number) => void;
}

export default function D20({ position = [0, 5, 0], onResult }: D20Props) {
  const ref = useRef<Mesh>(null);

  const material = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#3b82f6', // azul para d20
    metalness: 0.3,
    roughness: 0.4,
  }), []);

  const handleClick = () => {
    const result = Math.floor(Math.random() * 20) + 1;
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
      <icosahedronGeometry args={[0.7, 0]} />
    </mesh>
  );
}

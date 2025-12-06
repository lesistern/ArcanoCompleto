'use client';

import { useMemo, useRef } from 'react';
import { Mesh } from 'three';
import * as THREE from 'three';

interface D6Props {
  position?: [number, number, number];
  onResult?: (value: number) => void;
}

export default function D6({ position = [0, 5, 0], onResult }: D6Props) {
  const ref = useRef<Mesh>(null);

  const material = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#f8fafc',
    metalness: 0.2,
    roughness: 0.5,
  }), []);

  const handleClick = () => {
    const result = Math.floor(Math.random() * 6) + 1;
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
      <boxGeometry args={[1, 1, 1]} />
    </mesh>
  );
}

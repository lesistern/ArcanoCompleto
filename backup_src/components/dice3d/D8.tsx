'use client';

import { useMemo, useRef } from 'react';
import { Mesh } from 'three';
import * as THREE from 'three';

interface D8Props {
  position?: [number, number, number];
  onResult?: (value: number) => void;
}

export default function D8({ position = [0, 5, 0], onResult }: D8Props) {
  const ref = useRef<Mesh>(null);

  const material = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#f59e0b', // ámbar para d8
    metalness: 0.3,
    roughness: 0.4,
  }), []);

  const handleClick = () => {
    const result = Math.floor(Math.random() * 8) + 1;
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
      <octahedronGeometry args={[0.6, 0]} />
    </mesh>
  );
}

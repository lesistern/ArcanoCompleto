'use client';

import { useMemo, useRef } from 'react';
import { Mesh } from 'three';
import * as THREE from 'three';

interface D10Props {
  position?: [number, number, number];
  onResult?: (value: number) => void;
}

export default function D10({ position = [0, 5, 0], onResult }: D10Props) {
  const ref = useRef<Mesh>(null);

  // Material con color
  const material = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#10b981', // Verde esmeralda para d10
    metalness: 0.3,
    roughness: 0.4,
  }), []);

  const handleClick = () => {
    const result = Math.floor(Math.random() * 10) + 1;
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
      {/* Usamos cylinderGeometry como aproximación visual */}
      <cylinderGeometry args={[0.6, 0.6, 1.3, 10, 1]} />
    </mesh>
  );
}

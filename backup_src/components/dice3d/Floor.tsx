'use client';

import { useRef } from 'react';
import { Mesh } from 'three';

export default function Floor() {
  const ref = useRef<Mesh>(null);

  return (
    <mesh
      ref={ref}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, 0, 0]}
      receiveShadow
    >
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial color="#1a202c" roughness={0.8} metalness={0.2} />
    </mesh>
  );
}

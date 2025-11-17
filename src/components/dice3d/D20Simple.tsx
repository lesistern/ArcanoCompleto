'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import * as THREE from 'three';

interface D20SimpleProps {
  position?: [number, number, number];
  onResult?: (value: number) => void;
}

// Geometría de un icosaedro (d20)
const phi = (1 + Math.sqrt(5)) / 2;

export default function D20Simple({ position = [0, 0, 0], onResult }: D20SimpleProps) {
  const meshRef = useRef<Mesh>(null);
  const [isRolling, setIsRolling] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
  const [rollCount, setRollCount] = useState(0);

  useFrame((state, delta) => {
    if (meshRef.current && isRolling) {
      meshRef.current.rotation.x += delta * 10;
      meshRef.current.rotation.y += delta * 8;
      meshRef.current.rotation.z += delta * 6;

      setRollCount(prev => {
        const newCount = prev + 1;
        if (newCount > 60) { // Después de 1 segundo (60 frames)
          setIsRolling(false);
          const result = Math.floor(Math.random() * 20) + 1;
          setTimeout(() => onResult?.(result), 100);
          return 0;
        }
        return newCount;
      });
    }
  });

  const handleClick = () => {
    setIsRolling(true);
    setRollCount(0);
  };

  const material = new THREE.MeshStandardMaterial({
    color: '#4a90e2',
    metalness: 0.3,
    roughness: 0.4,
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      onClick={handleClick}
      castShadow
      receiveShadow
      material={material}
    >
      <icosahedronGeometry args={[1, 0]} />
    </mesh>
  );
}

'use client';

import { useRef, useState } from 'react';
import { RigidBody, RapierRigidBody } from '@react-three/rapier';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import * as THREE from 'three';

interface D12RapierProps {
  position?: [number, number, number];
  onResult?: (value: number) => void;
}

export default function D12Rapier({ position = [0, 5, 0], onResult }: D12RapierProps) {
  const rigidBodyRef = useRef<RapierRigidBody>(null);
  const meshRef = useRef<Mesh>(null);
  const [hasSettled, setHasSettled] = useState(false);

  const material = new THREE.MeshStandardMaterial({
    color: '#ec4899', // Rosa
    metalness: 0.3,
    roughness: 0.4,
  });

  useFrame(() => {
    if (rigidBodyRef.current) {
      const linvel = rigidBodyRef.current.linvel();
      const angvel = rigidBodyRef.current.angvel();

      const speed = Math.sqrt(
        linvel.x * linvel.x +
        linvel.y * linvel.y +
        linvel.z * linvel.z +
        angvel.x * angvel.x +
        angvel.y * angvel.y +
        angvel.z * angvel.z
      );

      if (!hasSettled && speed < 0.1 && speed > 0.001) {
        setHasSettled(true);
        const result = Math.floor(Math.random() * 12) + 1;
        setTimeout(() => onResult?.(result), 100);
      }
    }
  });

  const handleClick = () => {
    if (rigidBodyRef.current) {
      const impulse = {
        x: (Math.random() - 0.5) * 12,
        y: Math.random() * 20 + 10,
        z: (Math.random() - 0.5) * 12,
      };
      rigidBodyRef.current.applyImpulse(impulse, true);

      const torque = {
        x: (Math.random() - 0.5) * 8,
        y: (Math.random() - 0.5) * 8,
        z: (Math.random() - 0.5) * 8,
      };
      rigidBodyRef.current.applyTorqueImpulse(torque, true);

      setHasSettled(false);
    }
  };

  return (
    <RigidBody
      ref={rigidBodyRef}
      position={position}
      colliders="hull"
      restitution={0.3}
      friction={0.6}
    >
      <mesh
        ref={meshRef}
        onClick={handleClick}
        castShadow
        receiveShadow
        material={material}
      >
        <dodecahedronGeometry args={[0.6, 0]} />
      </mesh>
    </RigidBody>
  );
}

'use client';

import { useRef, useState, useEffect } from 'react';
import { RigidBody, RapierRigidBody } from '@react-three/rapier';
import { useFrame } from '@react-three/fiber';
import { Mesh, Vector3 } from 'three';
import * as THREE from 'three';

interface D6RapierProps {
  position?: [number, number, number];
  onResult?: (value: number) => void;
}

export default function D6Rapier({ position = [0, 5, 0], onResult }: D6RapierProps) {
  const rigidBodyRef = useRef<RapierRigidBody>(null);
  const meshRef = useRef<Mesh>(null);
  const [hasSettled, setHasSettled] = useState(false);
  const [velocity, setVelocity] = useState(new Vector3());

  // Textura de números en las caras
  const materials = Array.from({ length: 6 }, (_, i) => {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Fondo blanco
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, 128, 128);
      // Número negro
      ctx.fillStyle = '#000000';
      ctx.font = 'bold 80px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText((i + 1).toString(), 64, 64);
    }

    const texture = new THREE.CanvasTexture(canvas);
    return new THREE.MeshStandardMaterial({ map: texture });
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
        // TODO: Implementar detección real de la cara superior
        const result = Math.floor(Math.random() * 6) + 1;
        setTimeout(() => onResult?.(result), 100);
      }
    }
  });

  const handleClick = () => {
    if (rigidBodyRef.current) {
      // Aplicar impulso aleatorio
      const impulse = {
        x: (Math.random() - 0.5) * 10,
        y: Math.random() * 15 + 5,
        z: (Math.random() - 0.5) * 10,
      };
      rigidBodyRef.current.applyImpulse(impulse, true);

      // Aplicar torque aleatorio
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
      colliders="cuboid"
      restitution={0.3}
      friction={0.6}
    >
      <mesh
        ref={meshRef}
        onClick={handleClick}
        castShadow
        receiveShadow
        material={materials}
      >
        <boxGeometry args={[1, 1, 1]} />
      </mesh>
    </RigidBody>
  );
}

'use client';

import { RigidBody } from '@react-three/rapier';

export default function FloorRapier() {
  return (
    <RigidBody type="fixed" position={[0, 0, 0]}>
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#1a202c" roughness={0.8} metalness={0.2} />
      </mesh>
    </RigidBody>
  );
}

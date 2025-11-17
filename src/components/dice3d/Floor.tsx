'use client';

import { usePlane } from '@react-three/cannon';

export default function Floor() {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, 0, 0],
  }));

  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial color="#1a202c" roughness={0.8} metalness={0.2} />
    </mesh>
  );
}

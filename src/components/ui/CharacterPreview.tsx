import { Canvas, useFrame } from '@react-three/fiber';
import { VoxelCharacter } from '../game/VoxelCharacter';
import { Suspense, useRef, useMemo } from 'react';
import * as THREE from 'three';

interface CharacterPreviewProps {
  characterId: string;
  isActive: boolean;
  mousePos?: { x: number; y: number };
  previewCenter?: { x: number; y: number };
}

const RotatingCharacter = ({
  characterId,
  mousePos,
  previewCenter
}: {
  characterId: string;
  mousePos?: { x: number; y: number };
  previewCenter?: { x: number; y: number };
}) => {
  const groupRef = useRef<THREE.Group>(null);

  const targetRotation = useMemo(() => {
    if (!mousePos || !previewCenter) return Math.PI; // Default: 180°

    // Calculate angle from preview center to mouse
    const dx = mousePos.x - previewCenter.x;
    const dy = mousePos.y - previewCenter.y;
    const angle = Math.atan2(dx, dy);

    // Add Math.PI to align with the default down-facing orientation
    return angle + Math.PI;
  }, [mousePos, previewCenter]);

  useFrame(() => {
    if (groupRef.current) {
      // Smooth rotation interpolation
      const current = groupRef.current.rotation.y;
      const diff = targetRotation - current;

      // Handle wrap-around for smooth rotation
      let shortestDiff = ((diff + Math.PI) % (Math.PI * 2)) - Math.PI;
      if (shortestDiff < -Math.PI) shortestDiff += Math.PI * 2;

      groupRef.current.rotation.y += shortestDiff * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.9, 0]} rotation={[0, Math.PI, 0]}>
      <VoxelCharacter characterId={characterId} />
    </group>
  );
};

export const CharacterPreview = ({ characterId, isActive, mousePos, previewCenter }: CharacterPreviewProps) => {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      borderRadius: '12px',
      overflow: 'hidden',
      background: isActive
        ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        : '#f0f0f0',
    }}>
      <Canvas
        camera={{ position: [1.1, 1.1, 1.1], fov: 35 }}
        style={{ width: '100%', height: '100%' }}
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.6} />
          <directionalLight position={[2, 3, 2]} intensity={0.8} />

          {/* Character */}
          <RotatingCharacter
            characterId={characterId}
            mousePos={mousePos}
            previewCenter={previewCenter}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

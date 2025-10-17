import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface TrainFogProps {
  position: [number, number, number];
}

export const TrainFog = ({ position }: TrainFogProps) => {
  const particlesRef = useRef<THREE.Points>(null);

  // Créer les particules de brouillard
  const particles = useMemo(() => {
    const count = 100; // Plus de particules
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const velocities = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Position aléatoire autour du point (zone plus large)
      positions[i * 3] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 1] = Math.random() * 5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;

      // Échelle aléatoire (plus grandes particules)
      scales[i] = Math.random() * 3 + 2;

      // Vélocité aléatoire pour animation
      velocities[i * 3] = (Math.random() - 0.5) * 0.2;
      velocities[i * 3 + 1] = Math.random() * 0.1;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.2;
    }

    return { positions, scales, velocities, count };
  }, []);

  // Animer les particules
  useFrame((_, delta) => {
    if (!particlesRef.current) return;

    const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < particles.count; i++) {
      // Déplacer la particule
      positions[i * 3] += particles.velocities[i * 3] * delta;
      positions[i * 3 + 1] += particles.velocities[i * 3 + 1] * delta;
      positions[i * 3 + 2] += particles.velocities[i * 3 + 2] * delta;

      // Réinitialiser si la particule sort de la zone
      if (Math.abs(positions[i * 3]) > 7.5 || positions[i * 3 + 1] > 5) {
        positions[i * 3] = (Math.random() - 0.5) * 15;
        positions[i * 3 + 1] = 0;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
      }
    }

    particlesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={particlesRef} position={position}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.count}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-scale"
          count={particles.count}
          array={particles.scales}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={3}
        color="#ffffff"
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

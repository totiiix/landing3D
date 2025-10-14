import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface DustParticlesProps {
  position: [number, number, number];
  active: boolean;
}

export const DustParticles = ({ position, active }: DustParticlesProps) => {
  const particlesRef = useRef<THREE.Points>(null);
  const timeRef = useRef(0);

  const particleCount = 30;
  const maxLifetime = 1.5; // seconds

  // Create particles
  const { positions, velocities, lifetimes } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const lifetimes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // Start at center, spread outward in a circle
      const angle = (Math.PI * 2 * i) / particleCount;
      const radius = 0.3 + Math.random() * 0.3;

      positions[i3] = Math.cos(angle) * radius;
      positions[i3 + 1] = 0.05 + Math.random() * 0.1;
      positions[i3 + 2] = Math.sin(angle) * radius;

      // Velocities - spread outward and slightly up
      velocities[i3] = Math.cos(angle) * (0.5 + Math.random() * 0.5);
      velocities[i3 + 1] = 0.3 + Math.random() * 0.5; // upward
      velocities[i3 + 2] = Math.sin(angle) * (0.5 + Math.random() * 0.5);

      lifetimes[i] = Math.random() * 0.3; // Stagger start times
    }

    return { positions, velocities, lifetimes };
  }, []);

  useFrame((_, delta) => {
    if (!particlesRef.current || !active) return;

    timeRef.current += delta;

    const positionAttribute = particlesRef.current.geometry.attributes.position;
    const positions = positionAttribute.array as Float32Array;

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const particleTime = timeRef.current - lifetimes[i];

      if (particleTime > 0 && particleTime < maxLifetime) {
        // Update position based on velocity
        positions[i3] += velocities[i3] * delta;
        positions[i3 + 1] += velocities[i3 + 1] * delta;
        positions[i3 + 2] += velocities[i3 + 2] * delta;

        // Apply gravity
        velocities[i3 + 1] -= 2 * delta;

        // Stop at ground level
        if (positions[i3 + 1] < 0.05) {
          positions[i3 + 1] = 0.05;
          velocities[i3] *= 0.8; // Friction
          velocities[i3 + 2] *= 0.8;
        }
      }
    }

    positionAttribute.needsUpdate = true;

    // Update opacity
    const material = particlesRef.current.material as THREE.PointsMaterial;
    const opacity = Math.max(0, 1 - timeRef.current / maxLifetime);
    material.opacity = opacity;
  });

  return (
    <points ref={particlesRef} position={position}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        color="#D2B48C"
        transparent
        opacity={1}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
};

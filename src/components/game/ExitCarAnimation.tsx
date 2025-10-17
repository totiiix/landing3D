import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Car } from './Car';
import { useCarSounds } from '../../hooks/useCarSounds';
import * as THREE from 'three';

interface ExitCarAnimationProps {
  startPosition: [number, number, number];
  onComplete: () => void;
}

const EXIT_ANIMATION_DURATION = 3.0; // seconds
const CAR_SPEED = 8; // units per second
const ENGINE_START_DELAY = 0.5; // delay before engine starts (seconds)
const DRIVING_START_DELAY = 1.5; // delay before car starts moving (seconds)

export const ExitCarAnimation = ({ startPosition, onComplete }: ExitCarAnimationProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const timeRef = useRef(0);
  const hasCompletedRef = useRef(false);
  const hasStartedEngineRef = useRef(false);
  const hasStartedDrivingRef = useRef(false);
  const drivingAudioRef = useRef<HTMLAudioElement | null>(null);

  const { playEngineStart, playEngineDriving, stopSound } = useCarSounds();

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (drivingAudioRef.current) {
        stopSound(drivingAudioRef.current);
      }
    };
  }, [stopSound]);

  useFrame((_, delta) => {
    if (!groupRef.current || hasCompletedRef.current) return;

    timeRef.current += delta;

    // Démarrer le moteur après un court délai
    if (timeRef.current >= ENGINE_START_DELAY && !hasStartedEngineRef.current) {
      hasStartedEngineRef.current = true;
      playEngineStart();
    }

    // Démarrer le son de conduite et le mouvement
    if (timeRef.current >= DRIVING_START_DELAY && !hasStartedDrivingRef.current) {
      hasStartedDrivingRef.current = true;
      drivingAudioRef.current = playEngineDriving();
    }

    // La voiture commence à rouler après DRIVING_START_DELAY
    if (timeRef.current >= DRIVING_START_DELAY) {
      const drivingTime = timeRef.current - DRIVING_START_DELAY;
      const distance = CAR_SPEED * drivingTime;
      groupRef.current.position.x = startPosition[0] + distance;
    }

    // Animation terminée après la durée définie
    if (timeRef.current >= EXIT_ANIMATION_DURATION && !hasCompletedRef.current) {
      hasCompletedRef.current = true;
      // Stop driving sound
      if (drivingAudioRef.current) {
        stopSound(drivingAudioRef.current);
      }
      onComplete();
    }
  });

  return (
    <group ref={groupRef} position={startPosition}>
      <Car
        position={[0, 0, 0]}
        rotation={[0, 2 * Math.PI, 0]}
        scale={0.1}
      />
    </group>
  );
};

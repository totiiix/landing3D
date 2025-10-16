import { useGLTF } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { TrainFog } from './TrainFog';

interface TrainProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
}

// Configuration de l'animation du train
const TRAIN_SPEED = 3; // Unités par seconde
const RAIL_START_X = -80; // Position de départ (à gauche)
const RAIL_END_X = -40; // Position de fin (à droite)
const FADE_DISTANCE = 5; // Distance sur laquelle le train apparaît/disparaît

export const Train = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
}: TrainProps) => {
  const { scene } = useGLTF('/models/nature/train.glb');
  const groupRef = useRef<THREE.Group>(null);

  // Position X actuelle du train
  const currentXRef = useRef(position[0]);

  // Cloner la scène une seule fois avec useMemo
  const clonedScene = useMemo(() => {
    const clone = scene.clone();
    clone.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        // Rendre les matériaux transparents pour le fade
        if (child.material) {
          child.material = (child.material as THREE.Material).clone();
          child.material.transparent = true;
        }
      }
    });
    return clone;
  }, [scene]);

  // Animation : faire avancer le train le long des rails
  useFrame((_, delta) => {
    if (!groupRef.current) return;

    // Avancer le train
    currentXRef.current += TRAIN_SPEED * delta;

    // Si le train sort à droite, le replacer à gauche
    if (currentXRef.current > RAIL_END_X) {
      currentXRef.current = RAIL_START_X;
    }

    // Calculer l'opacité basée sur la position (fade in/out)
    let opacity = 1;
    const distanceFromStart = currentXRef.current - RAIL_START_X;
    const distanceFromEnd = RAIL_END_X - currentXRef.current;

    if (distanceFromStart < FADE_DISTANCE) {
      // Fade in au début
      opacity = distanceFromStart / FADE_DISTANCE;
    } else if (distanceFromEnd < FADE_DISTANCE) {
      // Fade out à la fin
      opacity = distanceFromEnd / FADE_DISTANCE;
    }

    // Appliquer l'opacité à tous les matériaux
    groupRef.current.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material) {
        (child.material as THREE.Material & { opacity: number }).opacity = opacity;
      }
    });

    // Mettre à jour la position
    groupRef.current.position.set(
      currentXRef.current,
      position[1],
      position[2]
    );
  });

  return (
    <>
      {/* Brouillard statique au début des rails (position absolue) */}
      <TrainFog position={[RAIL_START_X, -8, position[2]]} />

      {/* Brouillard statique à la fin des rails (position absolue) */}
      <TrainFog position={[RAIL_END_X, -8, position[2]]} />

      {/* Le train avec fade */}
      <group ref={groupRef} position={position}>
        <primitive
          object={clonedScene}
          rotation={rotation}
          scale={scale}
        />
      </group>
    </>
  );
};

// Précharger le modèle
useGLTF.preload('/models/nature/train.glb');

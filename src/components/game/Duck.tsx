import { useGLTF } from '@react-three/drei';
import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { isPositionOccupied, gridToWorld } from '../../config/testDecorations';
import { DuckPositionDebug } from './GridDebug';
import { WalkDustTrail } from './WalkDustTrail';
import { useDynamicEntities } from '../../contexts/DynamicEntitiesContext';

interface DuckProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  gridPosition?: { x: number; z: number };
}

const GRID_SIZE = 20;
const MOVE_DURATION_MIN = 0.3; // Durée minimale du mouvement
const MOVE_DURATION_MAX = 0.6; // Durée maximale du mouvement
const WAIT_TIME_MIN = 1; // Temps minimum d'attente entre deux mouvements (secondes)
const WAIT_TIME_MAX = 3; // Temps maximum d'attente
const MIN_DISTANCE = 1; // Distance minimale de déplacement (cases)
const MAX_DISTANCE = 3; // Distance maximale de déplacement (cases)
const ROTATION_DURATION = 0.3; // Durée de la rotation
const LOOK_AROUND_PROBABILITY = 0.6; // 60% de chance de regarder autour avant de bouger

export const Duck = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  gridPosition = { x: 15, z: 12 },
}: DuckProps) => {
  const { scene } = useGLTF('/models/animals/duck.glb');
  const groupRef = useRef<THREE.Group>(null);
  const { updateDuckPosition } = useDynamicEntities();

  // Utiliser des refs pour tout l'état du mouvement
  const currentGridPosRef = useRef(gridPosition);
  const targetGridPosRef = useRef(gridPosition);
  const isMovingRef = useRef(false);
  const startGridPosRef = useRef(gridPosition);
  const targetRotationRef = useRef(0);
  const waitTimerRef = useRef(Math.random() * (WAIT_TIME_MAX - WAIT_TIME_MIN) + WAIT_TIME_MIN);
  const moveDurationRef = useRef(MOVE_DURATION_MIN); // Durée actuelle du mouvement
  const isRotatingRef = useRef(false); // Si le canard est en train de tourner
  const rotationProgressRef = useRef(0); // Progression de la rotation
  const startRotationRef = useRef(0); // Rotation de départ

  // État pour la poussière
  const [dustState, setDustState] = useState({
    position: [position[0], 0, position[2]] as [number, number, number],
    isActive: false,
  });

  // Initialiser la position du canard dans le contexte
  useEffect(() => {
    updateDuckPosition(gridPosition);
  }, [gridPosition, updateDuckPosition]);

  // Cloner la scène une seule fois avec useMemo
  const clonedScene = useMemo(() => {
    const clone = scene.clone();
    clone.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    return clone;
  }, [scene]);

  // Choisir une rotation aléatoire (90° gauche ou droite)
  const chooseLookAroundRotation = useCallback(() => {
    const rotationOptions = [
      Math.PI / 2,  // 90° à droite
      -Math.PI / 2, // 90° à gauche
    ];

    const randomRotation = rotationOptions[Math.floor(Math.random() * rotationOptions.length)];

    startRotationRef.current = currentRotationRef.current;
    targetRotationRef.current = currentRotationRef.current + randomRotation;
    isRotatingRef.current = true;
    rotationProgressRef.current = 0;
  }, []);

  // Choisir une direction aléatoire et une distance
  const chooseRandomMove = useCallback(() => {
    const directions = [
      { dx: 1, dz: 0, rotation: Math.PI / 4 - Math.PI / 4 },      // Droite
      { dx: -1, dz: 0, rotation: -Math.PI * 3 / 4 - Math.PI / 4 }, // Gauche
      { dx: 0, dz: 1, rotation: -Math.PI / 4 - Math.PI / 4 },      // Bas
      { dx: 0, dz: -1, rotation: Math.PI * 3 / 4 - Math.PI / 4 },  // Haut
    ];

    // Mélanger les directions
    const shuffled = directions.sort(() => Math.random() - 0.5);

    for (const dir of shuffled) {
      // Distance aléatoire entre MIN_DISTANCE et MAX_DISTANCE
      const maxPossibleDistance = Math.floor(Math.random() * (MAX_DISTANCE - MIN_DISTANCE + 1)) + MIN_DISTANCE;

      // Trouver la distance maximale possible sans collision
      let validDistance = 0;
      for (let distance = 1; distance <= maxPossibleDistance; distance++) {
        const newX = currentGridPosRef.current.x + dir.dx * distance;
        const newZ = currentGridPosRef.current.z + dir.dz * distance;

        // Vérifier les limites
        if (newX < 0 || newX >= GRID_SIZE || newZ < 0 || newZ >= GRID_SIZE) {
          break;
        }

        // Vérifier les collisions sur le chemin
        if (isPositionOccupied(newX, newZ)) {
          break;
        }

        validDistance = distance;
      }

      // Si on a trouvé une distance valide, déplacer le canard
      if (validDistance > 0) {
        const newX = currentGridPosRef.current.x + dir.dx * validDistance;
        const newZ = currentGridPosRef.current.z + dir.dz * validDistance;

        startGridPosRef.current = currentGridPosRef.current;
        targetGridPosRef.current = { x: newX, z: newZ };
        targetRotationRef.current = dir.rotation;

        // Durée du mouvement proportionnelle à la distance + aléatoire
        const baseMoveDuration = MOVE_DURATION_MIN + (validDistance - 1) * 0.1;
        moveDurationRef.current = baseMoveDuration + Math.random() * (MOVE_DURATION_MAX - MOVE_DURATION_MIN);

        isMovingRef.current = true;
        moveProgressRef.current = 0;
        return;
      }
    }
  }, []);

  // Utiliser des refs pour éviter les re-renders
  const moveProgressRef = useRef(0);
  const currentRotationRef = useRef(0);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    if (isRotatingRef.current) {
      // Animation de rotation
      rotationProgressRef.current = Math.min(rotationProgressRef.current + delta / ROTATION_DURATION, 1);

      if (rotationProgressRef.current >= 1) {
        isRotatingRef.current = false;
        currentRotationRef.current = targetRotationRef.current;
        rotationProgressRef.current = 0;
        // Nouveau temps d'attente aléatoire avant de bouger
        waitTimerRef.current = Math.random() * 0.5 + 0.3; // Courte attente après rotation
      }
    } else if (isMovingRef.current) {
      // Animation de mouvement avec durée dynamique
      moveProgressRef.current = Math.min(moveProgressRef.current + delta / moveDurationRef.current, 1);

      if (moveProgressRef.current >= 1) {
        isMovingRef.current = false;
        currentGridPosRef.current = targetGridPosRef.current;
        moveProgressRef.current = 0;
        // Nouveau temps d'attente aléatoire
        waitTimerRef.current = Math.random() * (WAIT_TIME_MAX - WAIT_TIME_MIN) + WAIT_TIME_MIN;
        // Mettre à jour la position du canard dans le contexte
        updateDuckPosition(targetGridPosRef.current);
      }
    } else {
      // Attendre avant le prochain mouvement ou rotation
      waitTimerRef.current -= delta;
      if (waitTimerRef.current <= 0) {
        // Probabilité de regarder autour avant de se déplacer
        if (Math.random() < LOOK_AROUND_PROBABILITY) {
          chooseLookAroundRotation();
        } else {
          chooseRandomMove();
        }
      }
    }

    // Interpolation de position
    const currentGridX = isMovingRef.current
      ? THREE.MathUtils.lerp(startGridPosRef.current.x, targetGridPosRef.current.x, moveProgressRef.current)
      : currentGridPosRef.current.x;
    const currentGridZ = isMovingRef.current
      ? THREE.MathUtils.lerp(startGridPosRef.current.z, targetGridPosRef.current.z, moveProgressRef.current)
      : currentGridPosRef.current.z;

    const worldPos = gridToWorld(currentGridX, currentGridZ);

    // Animation : Petit saut pendant le déplacement
    const hopHeight = 0.15;
    const hopY = isMovingRef.current
      ? Math.sin(moveProgressRef.current * Math.PI) * hopHeight
      : 0;

    // Animation : Dandינement (balancement latéral)
    const waddleAmount = 0.08;
    const waddleSpeed = 3; // Nombre de balancements par déplacement
    const waddleZ = isMovingRef.current
      ? Math.sin(moveProgressRef.current * Math.PI * waddleSpeed) * waddleAmount
      : 0;

    // Interpolation de rotation
    if (isRotatingRef.current) {
      // Rotation en douceur pendant l'animation de "regarder autour"
      currentRotationRef.current = THREE.MathUtils.lerp(
        startRotationRef.current,
        targetRotationRef.current,
        rotationProgressRef.current
      );
    } else if (isMovingRef.current) {
      // Rotation rapide vers la direction du déplacement
      let rotationDiff = targetRotationRef.current - currentRotationRef.current;
      while (rotationDiff > Math.PI) rotationDiff -= Math.PI * 2;
      while (rotationDiff < -Math.PI) rotationDiff += Math.PI * 2;

      const rotationSpeed = 8;
      currentRotationRef.current = currentRotationRef.current + rotationDiff * Math.min(delta * rotationSpeed, 1);
    }

    // Animation : Légère inclinaison du corps pendant le dandινement
    const tiltAmount = 0.1;
    const bodyTilt = isMovingRef.current
      ? Math.sin(moveProgressRef.current * Math.PI * waddleSpeed) * tiltAmount
      : 0;

    groupRef.current.position.set(worldPos.x, position[1] + hopY, worldPos.z);
    groupRef.current.rotation.y = currentRotationRef.current;
    groupRef.current.rotation.z = bodyTilt; // Inclinaison du corps

    // Dandينement latéral (décalage perpendiculaire à la direction)
    const waddleOffsetX = Math.cos(currentRotationRef.current + Math.PI / 2) * waddleZ;
    const waddleOffsetZ = Math.sin(currentRotationRef.current + Math.PI / 2) * waddleZ;
    groupRef.current.position.x += waddleOffsetX;
    groupRef.current.position.z += waddleOffsetZ;

    // Mettre à jour l'état de la poussière
    setDustState({
      position: [groupRef.current.position.x, 0, groupRef.current.position.z],
      isActive: isMovingRef.current,
    });
  });

  return (
    <>
      <group ref={groupRef}>
        {/* Groupe de décalage pour recentrer le modèle */}
        <group position={[0, 0, -0.2]}>
          <primitive
            object={clonedScene}
            rotation={[rotation[0], rotation[1] - Math.PI / 2, rotation[2]]}
            scale={scale}
          />
        </group>
      </group>
      {/* Effet de poussière lors du déplacement */}
      <WalkDustTrail
        position={dustState.position}
        isActive={dustState.isActive}
      />
      {/* Point vert de debug pour la position du canard au niveau du sol */}
      {/* <DuckPositionDebug position={[groupRef.current?.position.x || 0, 0.1, groupRef.current?.position.z || 0]} /> */}
    </>
  );
};

// Précharger le modèle
useGLTF.preload('/models/animals/duck.glb');

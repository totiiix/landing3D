import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useKeyboard } from '../../hooks/useKeyboard';
import { VoxelCharacter } from './VoxelCharacter';
import { DustParticles } from './DustParticles';
import * as THREE from 'three';

const TILE_SIZE = 1;
const GRID_SIZE = 20;
const MOVE_DURATION = 0.2; // seconds for smooth movement between tiles
const JUMP_HEIGHT = 0.5;
const ENTRANCE_DURATION = 1.6; // seconds for entrance animation
const FALL_START_HEIGHT = 6; // Height from which character falls

interface PlayerProps {
  characterId: string;
  isEntering: boolean;
}

export const Player = ({ characterId, isEntering }: PlayerProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const keys = useKeyboard();

  // Entrance animation state
  const [entranceProgress, setEntranceProgress] = useState(0);
  const [hasEntered, setHasEntered] = useState(false);
  const [showDust, setShowDust] = useState(false);
  const [dustPosition, setDustPosition] = useState<[number, number, number]>([0, 0, 0]);

  // Reset entrance animation when character changes
  useEffect(() => {
    if (isEntering) {
      setEntranceProgress(0);
      setHasEntered(false);
      setShowDust(false);
    }
  }, [characterId, isEntering]);

  // Grid position (discrete) - Start at center of grid
  const centerPos = { x: Math.floor(GRID_SIZE / 2), z: Math.floor(GRID_SIZE / 2) };
  const [gridPos, setGridPos] = useState(centerPos);

  // Animation state
  const [isMoving, setIsMoving] = useState(false);
  const [targetPos, setTargetPos] = useState(centerPos);
  const [moveProgress, setMoveProgress] = useState(0);
  const [startPos, setStartPos] = useState(centerPos);

  // Jump state
  const [isJumping, setIsJumping] = useState(false);
  const [jumpProgress, setJumpProgress] = useState(0);

  // Rotation state - Start facing down (S direction)
  const initialRotation = Math.PI; // 180 degrees
  const [targetRotation, setTargetRotation] = useState(initialRotation);
  const [currentRotation, setCurrentRotation] = useState(initialRotation);

  const keyPressedRef = useRef({ forward: false, backward: false, left: false, right: false, jump: false });

  // Grid to world position conversion
  const gridToWorld = (gx: number, gz: number) => ({
    x: (gx - GRID_SIZE / 2 + 0.5) * TILE_SIZE,
    z: (gz - GRID_SIZE / 2 + 0.5) * TILE_SIZE
  });

  // Handle key press for grid movement
  useEffect(() => {
    if (isMoving || isEntering) return;

    const handleMove = () => {
      let newX = gridPos.x;
      let newZ = gridPos.z;
      let moved = false;
      let rotation = targetRotation;

      // Move along single grid axis - Allow continuous movement when key is held
      // Adjust rotation to align character's front face with movement direction
      const modelOffset = Math.PI - Math.PI / 4; // 135° offset (180° - 45°)

      // W/Z = UP along grid's X axis
      if (keys.forward) {
        newX -= 1;
        moved = true;
        rotation = -Math.PI * 3 / 4 + modelOffset; // Rotation from D
      }
      // S = DOWN along grid's X axis
      else if (keys.backward) {
        newX += 1;
        moved = true;
        rotation = Math.PI / 4 + modelOffset; // Face down direction
      }
      // A/Q = LEFT along grid's Z axis (movement stays, rotation swapped with W)
      else if (keys.left) {
        newZ += 1;
        moved = true;
        rotation = -Math.PI / 4 + modelOffset; // Rotation from W
      }
      // D = RIGHT along grid's Z axis (movement stays, rotation swapped with S)
      else if (keys.right) {
        newZ -= 1;
        moved = true;
        rotation = Math.PI * 3 / 4 + modelOffset; // Rotation from S
      }

      // Jump
      if (keys.jump && !keyPressedRef.current.jump && !isJumping) {
        setIsJumping(true);
        setJumpProgress(0);
      }

      // Update key pressed state for jump only
      keyPressedRef.current.jump = keys.jump;

      if (moved) {
        // Clamp to grid boundaries
        newX = Math.max(0, Math.min(GRID_SIZE - 1, newX));
        newZ = Math.max(0, Math.min(GRID_SIZE - 1, newZ));

        if (newX !== gridPos.x || newZ !== gridPos.z) {
          setStartPos({ x: gridPos.x, z: gridPos.z });
          setTargetPos({ x: newX, z: newZ });
          setTargetRotation(rotation);
          setIsMoving(true);
          setMoveProgress(0);
        }
      }
    };

    handleMove();
  }, [keys, gridPos, isMoving, isJumping, targetRotation]);

  // Reset jump key state when released
  useEffect(() => {
    if (!keys.jump) keyPressedRef.current.jump = false;
  }, [keys.jump]);

  // Animation frame
  useFrame((_, delta) => {
    if (!groupRef.current) return;

    const group = groupRef.current;

    // Handle entrance animation
    if (isEntering && entranceProgress < 1) {
      setEntranceProgress((prev) => Math.min(prev + delta / ENTRANCE_DURATION, 1));

      // Falling animation with bounce
      const t = entranceProgress;
      let heightY = 0;

      if (t < 0.7) {
        // Falling phase (70% of animation)
        const fallProgress = t / 0.7;
        const easeInCubic = fallProgress * fallProgress * fallProgress;
        heightY = FALL_START_HEIGHT * (1 - easeInCubic);
      } else {
        // Bouncing phase (30% of animation)
        const bounceProgress = (t - 0.7) / 0.3;
        const bounceHeight = 1.2; // Height of first bounce

        if (bounceProgress < 0.5) {
          // First bounce up
          const t1 = bounceProgress / 0.5;
          heightY = bounceHeight * Math.sin(t1 * Math.PI);
        } else {
          // Second bounce (smaller)
          const t2 = (bounceProgress - 0.5) / 0.5;
          heightY = bounceHeight * 0.3 * Math.sin(t2 * Math.PI);
        }
      }

      const worldPos = gridToWorld(gridPos.x, gridPos.z);
      group.position.set(worldPos.x, 0.01 + heightY, worldPos.z);

      // Trigger dust particles when landing (at t = 0.7)
      if (t >= 0.7 && t < 0.75 && !showDust) {
        setShowDust(true);
        setDustPosition([worldPos.x, 0, worldPos.z]);

        // Hide dust after animation completes
        setTimeout(() => {
          setShowDust(false);
        }, 1500); // Match maxLifetime from DustParticles
      }

      if (entranceProgress >= 1) {
        setHasEntered(true);
      }
      return;
    }

    // Handle tile-to-tile movement animation
    if (isMoving) {
      setMoveProgress((prev) => Math.min(prev + delta / MOVE_DURATION, 1));

      if (moveProgress >= 1) {
        setIsMoving(false);
        setGridPos(targetPos);
        setMoveProgress(0);
      }
    }

    // Handle jump animation
    if (isJumping) {
      setJumpProgress((prev) => Math.min(prev + delta / (MOVE_DURATION * 2), 1));

      if (jumpProgress >= 1) {
        setIsJumping(false);
        setJumpProgress(0);
      }
    }

    // Smooth rotation interpolation - take shortest path
    let rotationDiff = targetRotation - currentRotation;

    // Normalize to take shortest path (handle wrap-around)
    while (rotationDiff > Math.PI) rotationDiff -= Math.PI * 2;
    while (rotationDiff < -Math.PI) rotationDiff += Math.PI * 2;

    const rotationSpeed = 10; // Adjust for faster/slower rotation
    const newRotation = currentRotation + rotationDiff * Math.min(delta * rotationSpeed, 1);
    setCurrentRotation(newRotation);

    // Interpolate position
    const currentGridX = isMoving ? THREE.MathUtils.lerp(startPos.x, targetPos.x, moveProgress) : gridPos.x;
    const currentGridZ = isMoving ? THREE.MathUtils.lerp(startPos.z, targetPos.z, moveProgress) : gridPos.z;

    const worldPos = gridToWorld(currentGridX, currentGridZ);

    // Jump arc (parabola)
    const jumpY = isJumping ? Math.sin(jumpProgress * Math.PI) * JUMP_HEIGHT : 0;

    group.position.set(worldPos.x, 0.01 + jumpY, worldPos.z);
    group.rotation.y = newRotation;
  });

  return (
    <>
      <group ref={groupRef}>
        {/* Voxel Character Model */}
        <VoxelCharacter characterId={characterId} />
      </group>

      {/* Dust particles on landing */}
      {showDust && <DustParticles position={dustPosition} active={showDust} />}
    </>
  );
};

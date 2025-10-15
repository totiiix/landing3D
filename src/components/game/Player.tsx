import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useKeyboard } from '../../hooks/useKeyboard';
import { useFootstepSound } from '../../hooks/useFootstepSound';
import { isPositionOccupied } from '../../config/testDecorations';
import { VoxelCharacter } from './VoxelCharacter';
import { DustParticles } from './DustParticles';
import { WalkDustTrail } from './WalkDustTrail';
import * as THREE from 'three';

const TILE_SIZE = 1;
const GRID_SIZE = 20;
const MOVE_DURATION = 0.2; // seconds for smooth movement between tiles
const JUMP_HEIGHT = 0.5;
const WALK_HOP_HEIGHT = 0.15; // Small hop during walking
const ENTRANCE_DURATION = 1.6; // seconds for entrance animation
const FALL_START_HEIGHT = 6; // Height from which character falls

interface PlayerProps {
  characterId: string;
  isEntering: boolean;
}

export const Player = ({ characterId, isEntering }: PlayerProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const keys = useKeyboard();
  const { playFootstep, stopFootstep, playLanding, playCollision } = useFootstepSound();

  // Entrance animation state
  const [entranceProgress, setEntranceProgress] = useState(0);
  const [hasEntered, setHasEntered] = useState(false);
  const [showDust, setShowDust] = useState(false);
  const [dustPosition, setDustPosition] = useState<[number, number, number]>([0, 0, 0]);
  const hasPlayedLandingSoundRef = useRef(false);

  // Walking dust trail state
  const [walkTrails, setWalkTrails] = useState<Array<{ id: number; position: [number, number, number] }>>([]);
  const trailIdRef = useRef(0);
  const lastTrailTimeRef = useRef(0);

  // Collision tracking
  const lastCollisionPositionRef = useRef<string | null>(null);

  // Reset entrance animation when character changes
  useEffect(() => {
    if (isEntering) {
      setEntranceProgress(0);
      setHasEntered(false);
      setShowDust(false);
      hasPlayedLandingSoundRef.current = false;
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
  const initialRotation = 0; // Face down direction
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
      // Model is now rotated 180°, so we subtract Math.PI from all rotations
      const modelOffset = -Math.PI / 4; // Adjusted for 180° rotated model

      // W/Z = UP along grid's X axis
      if (keys.forward) {
        newX -= 1;
        moved = true;
        rotation = -Math.PI * 3 / 4 + modelOffset;
      }
      // S = DOWN along grid's X axis
      else if (keys.backward) {
        newX += 1;
        moved = true;
        rotation = Math.PI / 4 + modelOffset;
      }
      // A/Q = LEFT along grid's Z axis
      else if (keys.left) {
        newZ += 1;
        moved = true;
        rotation = -Math.PI / 4 + modelOffset;
      }
      // D = RIGHT along grid's Z axis
      else if (keys.right) {
        newZ -= 1;
        moved = true;
        rotation = Math.PI * 3 / 4 + modelOffset;
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
          // Vérifier si la position est occupée par un décor
          if (!isPositionOccupied(newX, newZ)) {
            setStartPos({ x: gridPos.x, z: gridPos.z });
            setTargetPos({ x: newX, z: newZ });
            setTargetRotation(rotation);
            setIsMoving(true);
            setMoveProgress(0);
            // Play footstep sound when starting to move
            playFootstep();
            // Reset collision tracker when successfully moving
            lastCollisionPositionRef.current = null;
          } else {
            // Position occupée : on change juste la rotation sans bouger
            setTargetRotation(rotation);

            // Jouer le son de collision seulement si c'est une nouvelle collision
            const collisionKey = `${newX},${newZ}`;
            if (lastCollisionPositionRef.current !== collisionKey) {
              playCollision();
              lastCollisionPositionRef.current = collisionKey;
            }
          }
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

      // Play landing sound slightly before impact (at t = 0.65)
      if (t >= 0.65 && !hasPlayedLandingSoundRef.current) {
        playLanding();
        hasPlayedLandingSoundRef.current = true;
      }

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

      // Create dust trail periodically while moving
      lastTrailTimeRef.current += delta;
      if (lastTrailTimeRef.current >= 0.08) { // Create trail every 80ms
        const currentGridX = THREE.MathUtils.lerp(startPos.x, targetPos.x, moveProgress);
        const currentGridZ = THREE.MathUtils.lerp(startPos.z, targetPos.z, moveProgress);
        const worldPos = gridToWorld(currentGridX, currentGridZ);

        const newTrail = {
          id: trailIdRef.current++,
          position: [worldPos.x, 0, worldPos.z] as [number, number, number]
        };

        setWalkTrails((prev) => [...prev, newTrail]);

        // Remove trail after its lifetime
        setTimeout(() => {
          setWalkTrails((prev) => prev.filter((t) => t.id !== newTrail.id));
        }, 500);

        lastTrailTimeRef.current = 0;
      }

      if (moveProgress >= 1) {
        setIsMoving(false);
        setGridPos(targetPos);
        setMoveProgress(0);
        lastTrailTimeRef.current = 0;
        // Stop footstep sound when movement ends
        stopFootstep();
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

    // Jump arc (parabola) for Space key jump
    const jumpY = isJumping ? Math.sin(jumpProgress * Math.PI) * JUMP_HEIGHT : 0;

    // Walking hop animation - small arc during movement
    const walkHopY = isMoving ? Math.sin(moveProgress * Math.PI) * WALK_HOP_HEIGHT : 0;

    // Combine jump and walk hop (only one active at a time)
    const totalY = jumpY + walkHopY;

    group.position.set(worldPos.x, 0.01 + totalY, worldPos.z);
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

      {/* Walking dust trails */}
      {walkTrails.map((trail) => (
        <WalkDustTrail
          key={trail.id}
          position={trail.position}
          isActive={true}
        />
      ))}
    </>
  );
};

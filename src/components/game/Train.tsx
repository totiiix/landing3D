import { useGLTF } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { TrainFog } from './TrainFog';
import { AUDIO_PATHS, AUDIO_VOLUMES } from '../../config/audioConfig';
import { useAudioSettings } from '../../contexts/AudioContext';

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
const MIN_WAIT_TIME = 10; // Temps d'attente minimum en secondes
const MAX_WAIT_TIME = 30; // Temps d'attente maximum en secondes

export const Train = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
}: TrainProps) => {
  const { scene } = useGLTF('/models/nature/train.glb');
  const { soundEffectsEnabled } = useAudioSettings();
  const groupRef = useRef<THREE.Group>(null);

  // Position X actuelle du train
  const currentXRef = useRef(position[0]);

  // Flag pour savoir si le klaxon a déjà été joué pour ce passage
  const hasPlayedHornRef = useRef(false);

  // État du train : "waiting" (en attente) ou "moving" (en mouvement)
  const trainStateRef = useRef<'waiting' | 'moving'>('waiting');

  // Temps d'attente actuel et temps écoulé
  const waitTimeRef = useRef(Math.random() * (MAX_WAIT_TIME - MIN_WAIT_TIME) + MIN_WAIT_TIME);
  const elapsedWaitTimeRef = useRef(0);

  // Référence à l'audio
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialiser l'audio
  useMemo(() => {
    if (typeof window !== 'undefined') {
      audioRef.current = new Audio(AUDIO_PATHS.sfx.trainHorn);
      audioRef.current.volume = AUDIO_VOLUMES.trainHorn;
    }
    return null;
  }, []);

  // Jouer le son de klaxon
  const playTrainHorn = () => {
    if (!soundEffectsEnabled) return;

    if (audioRef.current) {
      audioRef.current.currentTime = 0; // Recommencer depuis le début
      audioRef.current.play().catch(error => {
        console.log('Erreur lors de la lecture du klaxon:', error);
      });
    }
  };

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

    // Si le train est en attente
    if (trainStateRef.current === 'waiting') {
      elapsedWaitTimeRef.current += delta;

      // Si le temps d'attente est écoulé, démarrer le train
      if (elapsedWaitTimeRef.current >= waitTimeRef.current) {
        trainStateRef.current = 'moving';
        currentXRef.current = RAIL_START_X;
        elapsedWaitTimeRef.current = 0;
        playTrainHorn(); // Jouer le klaxon à l'apparition du train
        hasPlayedHornRef.current = true; // Marquer comme joué pour éviter de rejouer au milieu
      } else {
        // Rendre le train invisible pendant l'attente
        groupRef.current.traverse((child) => {
          if (child instanceof THREE.Mesh && child.material) {
            (child.material as THREE.Material & { opacity: number }).opacity = 0;
          }
        });
        return;
      }
    }

    const previousX = currentXRef.current;

    // Avancer le train
    currentXRef.current += TRAIN_SPEED * delta;

    // Si le train sort à droite, le mettre en attente
    if (currentXRef.current > RAIL_END_X) {
      trainStateRef.current = 'waiting';
      // Générer un nouveau temps d'attente aléatoire
      waitTimeRef.current = Math.random() * (MAX_WAIT_TIME - MIN_WAIT_TIME) + MIN_WAIT_TIME;
      hasPlayedHornRef.current = false; // Réinitialiser le flag pour le prochain passage
      return;
    }

    // Jouer le klaxon au milieu des rails
    const middleX = (RAIL_START_X + RAIL_END_X) / 2;
    if (previousX < middleX && currentXRef.current >= middleX && !hasPlayedHornRef.current) {
      playTrainHorn();
      hasPlayedHornRef.current = true;
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

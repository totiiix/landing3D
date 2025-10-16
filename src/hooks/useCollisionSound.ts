import { useRef, useCallback, useEffect } from 'react';
import { useAudioSettings } from '../contexts/AudioContext';
import { AUDIO_PATHS, AUDIO_VOLUMES } from '../config/audioConfig';

export type CollisionSoundType =
  | 'tree'
  | 'rock'
  | 'fence'
  | 'bush'
  | 'bigTree'
  | 'cactus'
  | 'house'
  | 'car'
  | 'duck'
  | 'oldMan'
  | 'default';

export const useCollisionSound = () => {
  const { soundEffectsEnabled } = useAudioSettings();

  // Cache pour stocker les audios préchargés
  const audioCache = useRef<Map<CollisionSoundType, HTMLAudioElement>>(new Map());
  const fallbackCache = useRef<Set<CollisionSoundType>>(new Set());
  const audioContextRef = useRef<AudioContext | null>(null);

  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  // Fallback : son de collision synthétisé
  const playSynthCollision = useCallback(() => {
    try {
      const ctx = getAudioContext();
      if (ctx.state === 'suspended') ctx.resume();
      if (ctx.state !== 'running') return;

      const now = ctx.currentTime;
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.frequency.setValueAtTime(200, now);
      oscillator.frequency.exponentialRampToValueAtTime(50, now + 0.08);
      gainNode.gain.setValueAtTime(0.4, now);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

      oscillator.type = 'square';
      oscillator.start(now);
      oscillator.stop(now + 0.08);
    } catch (error) {
      console.error('Error playing synth collision:', error);
    }
  }, [getAudioContext]);

  // Charger un son de collision spécifique
  const loadCollisionSound = useCallback(async (type: CollisionSoundType) => {
    if (audioCache.current.has(type) || fallbackCache.current.has(type)) {
      return; // Déjà chargé
    }

    try {
      const audioPath = AUDIO_PATHS.collisions[type];
      const audio = new Audio(audioPath);
      audio.volume = AUDIO_VOLUMES.collision;
      audio.preload = 'auto';

      await new Promise((resolve, reject) => {
        audio.addEventListener('canplaythrough', resolve, { once: true });
        audio.addEventListener('error', reject, { once: true });
        audio.load();
      });

      audioCache.current.set(type, audio);
      console.log(`Collision sound loaded: ${type} (${audioPath})`);
    } catch (error) {
      console.warn(`Could not load collision sound for ${type}, using fallback`);
      fallbackCache.current.add(type);
    }
  }, []);

  // Précharger tous les sons de collision au démarrage
  useEffect(() => {
    const types: CollisionSoundType[] = [
      'default', 'tree', 'rock', 'fence', 'bush', 'bigTree',
      'cactus', 'house', 'car', 'duck', 'oldMan'
    ];

    types.forEach(type => {
      loadCollisionSound(type);
    });
  }, [loadCollisionSound]);

  // Jouer un son de collision selon le type
  const playCollision = useCallback((type: CollisionSoundType = 'default') => {
    if (!soundEffectsEnabled) return;

    // Si on doit utiliser le fallback
    if (fallbackCache.current.has(type)) {
      playSynthCollision();
      return;
    }

    // Charger le son s'il n'est pas déjà en cache
    if (!audioCache.current.has(type)) {
      loadCollisionSound(type);
      playSynthCollision(); // Utiliser le fallback en attendant
      return;
    }

    const audio = audioCache.current.get(type);
    if (audio) {
      // Cloner et jouer pour permettre les sons qui se chevauchent
      const clone = audio.cloneNode() as HTMLAudioElement;
      clone.volume = AUDIO_VOLUMES.collision;
      clone.play().catch((error) => {
        console.error(`Error playing collision sound (${type}):`, error);
        // Fallback vers le son synthétisé en cas d'erreur
        playSynthCollision();
      });
    }
  }, [soundEffectsEnabled, playSynthCollision, loadCollisionSound]);

  return { playCollision };
};

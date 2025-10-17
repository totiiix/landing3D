import { useCallback } from 'react';
import { useAudioSettings } from '../contexts/AudioContext';
import { AUDIO_PATHS, AUDIO_VOLUMES } from '../config/audioConfig';

export const useCarSounds = () => {
  const { soundEffectsEnabled } = useAudioSettings();

  // Jouer le son de porte qui s'ouvre
  const playDoorOpen = useCallback(() => {
    if (!soundEffectsEnabled) return;

    const audio = new Audio(AUDIO_PATHS.sfx.carDoorOpen);
    audio.volume = AUDIO_VOLUMES.carDoor;
    audio.play().catch(err => console.warn('Failed to play door open sound:', err));
  }, [soundEffectsEnabled]);

  // Jouer le son de porte qui se ferme
  const playDoorClose = useCallback(() => {
    if (!soundEffectsEnabled) return;

    const audio = new Audio(AUDIO_PATHS.sfx.carDoorClose);
    audio.volume = AUDIO_VOLUMES.carDoor;
    audio.play().catch(err => console.warn('Failed to play door close sound:', err));
  }, [soundEffectsEnabled]);

  // Jouer le son du moteur qui démarre
  const playEngineStart = useCallback(() => {
    if (!soundEffectsEnabled) return;

    const audio = new Audio(AUDIO_PATHS.sfx.carEngineStart);
    audio.volume = AUDIO_VOLUMES.carEngineStart;
    audio.play().catch(err => console.warn('Failed to play engine start sound:', err));
  }, [soundEffectsEnabled]);

  // Jouer le son du moteur qui roule (loop)
  const playEngineDriving = useCallback(() => {
    if (!soundEffectsEnabled) return null;

    const audio = new Audio(AUDIO_PATHS.sfx.carEngineDriving);
    audio.volume = AUDIO_VOLUMES.carEngineDriving;
    audio.loop = true;
    audio.play().catch(err => console.warn('Failed to play engine driving sound:', err));

    return audio; // Return audio element to allow stopping it later
  }, [soundEffectsEnabled]);

  // Arrêter un son en cours
  const stopSound = useCallback((audio: HTMLAudioElement | null) => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  }, []);

  return {
    playDoorOpen,
    playDoorClose,
    playEngineStart,
    playEngineDriving,
    stopSound,
  };
};

import { useRef, useCallback, useEffect } from 'react';
import { useAudioSettings } from '../contexts/AudioContext';
import { AUDIO_PATHS, AUDIO_VOLUMES } from '../config/audioConfig';

export const useFootstepSound = () => {
  const { soundEffectsEnabled } = useAudioSettings();
  const footstepAudioRef = useRef<HTMLAudioElement | null>(null);
  const landingAudioRef = useRef<HTMLAudioElement | null>(null);
  const currentFootstepRef = useRef<HTMLAudioElement | null>(null); // Track currently playing footstep
  const isLoadedRef = useRef({ footstep: false, landing: false });
  const useFallbackRef = useRef({ footstep: false, landing: false });

  // Fallback: Synthesized sounds
  const audioContextRef = useRef<AudioContext | null>(null);

  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  const playSynthFootstep = useCallback(() => {
    try {
      const ctx = getAudioContext();
      if (ctx.state === 'suspended') ctx.resume();
      if (ctx.state !== 'running') return;

      const now = ctx.currentTime;
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.frequency.setValueAtTime(80, now);
      oscillator.frequency.exponentialRampToValueAtTime(40, now + 0.1);
      gainNode.gain.setValueAtTime(0.3, now);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);

      oscillator.type = 'sine';
      oscillator.start(now);
      oscillator.stop(now + 0.1);
    } catch (error) {
      console.error('Error playing synth footstep:', error);
    }
  }, [getAudioContext]);

  const playSynthLanding = useCallback(() => {
    try {
      const ctx = getAudioContext();
      if (ctx.state === 'suspended') ctx.resume();
      if (ctx.state !== 'running') return;

      const now = ctx.currentTime;
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.frequency.setValueAtTime(100, now);
      oscillator.frequency.exponentialRampToValueAtTime(30, now + 0.15);
      gainNode.gain.setValueAtTime(0.6, now);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.15);

      oscillator.type = 'sine';
      oscillator.start(now);
      oscillator.stop(now + 0.15);
    } catch (error) {
      console.error('Error playing synth landing:', error);
    }
  }, [getAudioContext]);

  // Load audio files
  useEffect(() => {
    const loadFootstep = async () => {
      try {
        const audio = new Audio(AUDIO_PATHS.sfx.footstep);
        audio.volume = AUDIO_VOLUMES.footstep;
        audio.preload = 'auto';
        await new Promise((resolve, reject) => {
          audio.addEventListener('canplaythrough', resolve, { once: true });
          audio.addEventListener('error', reject, { once: true });
          audio.load();
        });
        footstepAudioRef.current = audio;
        isLoadedRef.current.footstep = true;
        console.log('Footstep sound loaded:', AUDIO_PATHS.sfx.footstep);
      } catch (error) {
        console.warn('Could not load footstep sound, using synthesized fallback');
        useFallbackRef.current.footstep = true;
        isLoadedRef.current.footstep = true;
      }
    };

    const loadLanding = async () => {
      try {
        const audio = new Audio(AUDIO_PATHS.sfx.landing);
        audio.volume = AUDIO_VOLUMES.landing;
        audio.preload = 'auto';
        await new Promise((resolve, reject) => {
          audio.addEventListener('canplaythrough', resolve, { once: true });
          audio.addEventListener('error', reject, { once: true });
          audio.load();
        });
        landingAudioRef.current = audio;
        isLoadedRef.current.landing = true;
        console.log('Landing sound loaded:', AUDIO_PATHS.sfx.landing);
      } catch (error) {
        console.warn('Could not load landing sound, using synthesized fallback');
        useFallbackRef.current.landing = true;
        isLoadedRef.current.landing = true;
      }
    };

    loadFootstep();
    loadLanding();
  }, []);

  const playFootstep = useCallback(() => {
    if (!soundEffectsEnabled) return;

    if (useFallbackRef.current.footstep) {
      playSynthFootstep();
      return;
    }

    if (footstepAudioRef.current) {
      // Stop the previous footstep sound if still playing
      if (currentFootstepRef.current) {
        currentFootstepRef.current.pause();
        currentFootstepRef.current.currentTime = 0;
      }

      // Clone and play new sound
      const clone = footstepAudioRef.current.cloneNode() as HTMLAudioElement;
      clone.volume = AUDIO_VOLUMES.footstep;
      currentFootstepRef.current = clone;

      clone.play().catch((error) => {
        console.error('Error playing footstep:', error);
      });

      // Clear reference when sound ends
      clone.addEventListener('ended', () => {
        if (currentFootstepRef.current === clone) {
          currentFootstepRef.current = null;
        }
      });
    }
  }, [soundEffectsEnabled, playSynthFootstep]);

  const stopFootstep = useCallback(() => {
    if (currentFootstepRef.current) {
      currentFootstepRef.current.pause();
      currentFootstepRef.current.currentTime = 0;
      currentFootstepRef.current = null;
    }
  }, []);

  const playLanding = useCallback(() => {
    if (!soundEffectsEnabled) return;

    if (useFallbackRef.current.landing) {
      playSynthLanding();
      return;
    }

    if (landingAudioRef.current) {
      // Clone and play to allow overlapping sounds
      const clone = landingAudioRef.current.cloneNode() as HTMLAudioElement;
      clone.volume = AUDIO_VOLUMES.landing;
      clone.play().catch((error) => {
        console.error('Error playing landing:', error);
      });
    }
  }, [soundEffectsEnabled, playSynthLanding]);

  return { playFootstep, stopFootstep, playLanding };
};

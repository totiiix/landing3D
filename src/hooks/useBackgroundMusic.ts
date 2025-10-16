import { useEffect, useRef, useCallback } from 'react';
import { useAudioSettings } from '../contexts/AudioContext';
import { AUDIO_PATHS, AUDIO_VOLUMES } from '../config/audioConfig';

export const useBackgroundMusic = () => {
  const { musicEnabled } = useAudioSettings();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isLoadedRef = useRef(false);
  const shouldBePlayingRef = useRef(false);
  const useFallbackRef = useRef(false);

  // Fallback: Synthesized music (original version)
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const isPlayingSynthRef = useRef(false);

  const startSynthMusic = useCallback(() => {
    if (isPlayingSynthRef.current) return;

    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      audioContextRef.current = ctx;

      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.15, ctx.currentTime);
      masterGain.connect(ctx.destination);

      const notes = [261.63, 293.66, 329.63, 392.00, 440.00];
      const pattern = [0, 2, 4, 2, 3, 0, 2, 4];
      let noteIndex = 0;

      const playNote = () => {
        if (!isPlayingSynthRef.current) return;

        const now = ctx.currentTime;
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(masterGain);

        oscillator.frequency.setValueAtTime(notes[pattern[noteIndex % pattern.length]], now);
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(0.3, now + 0.1);
        gainNode.gain.linearRampToValueAtTime(0, now + 0.8);

        oscillator.start(now);
        oscillator.stop(now + 0.8);

        oscillatorsRef.current.push(oscillator);
        noteIndex++;

        setTimeout(() => {
          const idx = oscillatorsRef.current.indexOf(oscillator);
          if (idx > -1) oscillatorsRef.current.splice(idx, 1);
        }, 1000);

        if (isPlayingSynthRef.current) {
          setTimeout(playNote, 600);
        }
      };

      isPlayingSynthRef.current = true;
      playNote();
      console.log('Fallback synthesized music started');
    } catch (error) {
      console.error('Error starting synthesized music:', error);
    }
  }, []);

  const stopSynthMusic = useCallback(() => {
    isPlayingSynthRef.current = false;
    oscillatorsRef.current.forEach((osc) => {
      try {
        osc.stop();
      } catch (e) {}
    });
    oscillatorsRef.current = [];
  }, []);

  const loadAudioFile = useCallback(async () => {
    if (isLoadedRef.current) return;

    try {
      // Try to load the audio file
      const audio = new Audio(AUDIO_PATHS.music.background);
      audio.loop = true;
      audio.volume = AUDIO_VOLUMES.music;
      audio.preload = 'auto';

      // Wait for the file to be loaded
      await new Promise((resolve, reject) => {
        audio.addEventListener('canplaythrough', resolve, { once: true });
        audio.addEventListener('error', reject, { once: true });
        audio.load();
      });

      audioRef.current = audio;
      isLoadedRef.current = true;
      useFallbackRef.current = false;
      console.log('Background music loaded successfully:', AUDIO_PATHS.music.background);
    } catch (error) {
      console.warn('Could not load background music file, using synthesized fallback:', error);
      useFallbackRef.current = true;
      isLoadedRef.current = true;
    }
  }, []);

  const startMusic = useCallback(async () => {
    if (!isLoadedRef.current) {
      await loadAudioFile();
    }

    if (useFallbackRef.current) {
      startSynthMusic();
      return;
    }

    if (audioRef.current) {
      try {
        await audioRef.current.play();
        console.log('Background music playing');
      } catch (error) {
        console.error('Error playing background music:', error);
      }
    }
  }, [loadAudioFile, startSynthMusic]);

  const stopMusic = useCallback(() => {
    if (useFallbackRef.current) {
      stopSynthMusic();
      return;
    }

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      console.log('Background music stopped');
    }
  }, [stopSynthMusic]);

  // Initialize audio on user interaction
  useEffect(() => {
    const handleInteraction = () => {
      if (!shouldBePlayingRef.current) {
        shouldBePlayingRef.current = true;
        if (musicEnabled) {
          startMusic();
        }
      }
    };

    window.addEventListener('click', handleInteraction, { once: true });
    window.addEventListener('keydown', handleInteraction, { once: true });

    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
      stopMusic();
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [startMusic, stopMusic, musicEnabled]);

  // Handle music enable/disable
  useEffect(() => {
    if (!shouldBePlayingRef.current) return; // Don't start until user interaction

    if (musicEnabled) {
      startMusic();
    } else {
      stopMusic();
    }
  }, [musicEnabled, startMusic, stopMusic]);

  return { startMusic, stopMusic };
};

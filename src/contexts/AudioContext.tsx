import { createContext, useContext, useState, ReactNode } from 'react';

interface AudioSettings {
  musicEnabled: boolean;
  soundEffectsEnabled: boolean;
}

interface AudioContextType extends AudioSettings {
  setMusicEnabled: (enabled: boolean) => void;
  setSoundEffectsEnabled: (enabled: boolean) => void;
  toggleMusic: () => void;
  toggleSoundEffects: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider = ({ children }: { children: ReactNode }) => {
  const [musicEnabled, setMusicEnabled] = useState(true);
  const [soundEffectsEnabled, setSoundEffectsEnabled] = useState(true);

  const toggleMusic = () => setMusicEnabled((prev) => !prev);
  const toggleSoundEffects = () => setSoundEffectsEnabled((prev) => !prev);

  return (
    <AudioContext.Provider
      value={{
        musicEnabled,
        soundEffectsEnabled,
        setMusicEnabled,
        setSoundEffectsEnabled,
        toggleMusic,
        toggleSoundEffects,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudioSettings = () => {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudioSettings must be used within an AudioProvider');
  }
  return context;
};

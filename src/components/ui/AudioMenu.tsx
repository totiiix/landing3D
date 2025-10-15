import { useState } from 'react';
import { useAudioSettings } from '../../contexts/AudioContext';

export const AudioMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { musicEnabled, soundEffectsEnabled, toggleMusic, toggleSoundEffects } = useAudioSettings();

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: 1000,
    }}>
      {/* Audio Icon Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          border: '2px solid #333',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
          color: 'white',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.2s, box-shadow 0.2s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.boxShadow = '0 6px 8px rgba(0, 0, 0, 0.15)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        }}
      >
        🔊
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '60px',
          right: '0',
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
          padding: '16px',
          minWidth: '200px',
          border: '2px solid #e0e0e0',
        }}>
          {/* Music Toggle */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '12px',
            padding: '8px',
            borderRadius: '8px',
            background: '#f5f5f5',
          }}>
            <span style={{
              fontSize: '14px',
              fontWeight: '600',
              color: '#333',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              🎵 Musique
            </span>
            <button
              onClick={toggleMusic}
              style={{
                width: '50px',
                height: '26px',
                borderRadius: '13px',
                border: 'none',
                cursor: 'pointer',
                position: 'relative',
                background: musicEnabled ? '#4CAF50' : '#ccc',
                transition: 'background 0.3s',
              }}
            >
              <div style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: 'white',
                position: 'absolute',
                top: '3px',
                left: musicEnabled ? '27px' : '3px',
                transition: 'left 0.3s',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
              }} />
            </button>
          </div>

          {/* Sound Effects Toggle */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '8px',
            borderRadius: '8px',
            background: '#f5f5f5',
          }}>
            <span style={{
              fontSize: '14px',
              fontWeight: '600',
              color: '#333',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              🔔 Effets sonores
            </span>
            <button
              onClick={toggleSoundEffects}
              style={{
                width: '50px',
                height: '26px',
                borderRadius: '13px',
                border: 'none',
                cursor: 'pointer',
                position: 'relative',
                background: soundEffectsEnabled ? '#4CAF50' : '#ccc',
                transition: 'background 0.3s',
              }}
            >
              <div style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: 'white',
                position: 'absolute',
                top: '3px',
                left: soundEffectsEnabled ? '27px' : '3px',
                transition: 'left 0.3s',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
              }} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

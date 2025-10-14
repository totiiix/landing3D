import { useState } from 'react';

interface CharacterSelectorProps {
  onSelectCharacter: (characterId: string) => void;
}

export const CharacterSelector = ({ onSelectCharacter }: CharacterSelectorProps) => {
  const [hoveredChar, setHoveredChar] = useState<string | null>(null);

  const characters = Array.from({ length: 14 }, (_, i) => ({
    id: `Char${String(i + 1).padStart(2, '0')}`,
    name: `Character ${i + 1}`
  }));

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(to bottom, #87CEEB 0%, #E0F6FF 100%)',
      zIndex: 1000
    }}>
      <h1 style={{
        fontSize: '3rem',
        color: '#333',
        marginBottom: '2rem',
        textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
      }}>
        Choose Your Character
      </h1>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: '1.5rem',
        padding: '2rem',
        maxWidth: '1200px'
      }}>
        {characters.map((char) => (
          <div
            key={char.id}
            onClick={() => onSelectCharacter(char.id)}
            onMouseEnter={() => setHoveredChar(char.id)}
            onMouseLeave={() => setHoveredChar(null)}
            style={{
              width: '140px',
              height: '140px',
              background: 'white',
              borderRadius: '16px',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease',
              transform: hoveredChar === char.id ? 'scale(1.1) translateY(-8px)' : 'scale(1)',
              boxShadow: hoveredChar === char.id
                ? '0 12px 24px rgba(0,0,0,0.2)'
                : '0 4px 8px rgba(0,0,0,0.1)',
              border: hoveredChar === char.id ? '3px solid #4A90E2' : '3px solid transparent'
            }}
          >
            <img
              src={`/models/${char.id}/${char.id}.png`}
              alt={char.name}
              style={{
                width: '80px',
                height: '80px',
                imageRendering: 'pixelated',
                objectFit: 'contain'
              }}
            />
            <span style={{
              marginTop: '0.5rem',
              fontSize: '0.9rem',
              fontWeight: 'bold',
              color: '#555'
            }}>
              {char.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

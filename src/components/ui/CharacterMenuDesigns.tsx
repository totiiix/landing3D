import { useState } from 'react';

interface DesignDemoProps {
  title: string;
  children: React.ReactNode;
}

const DesignDemo = ({ title, children }: DesignDemoProps) => (
  <div style={{
    flex: 1,
    minWidth: '400px',
    background: 'white',
    borderRadius: '16px',
    padding: '20px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
  }}>
    <h3 style={{ marginBottom: '20px', color: '#333', textAlign: 'center' }}>{title}</h3>
    <div style={{
      minHeight: '300px',
      background: 'linear-gradient(to bottom, #87CEEB 0%, #E0F6FF 100%)',
      borderRadius: '12px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {children}
    </div>
  </div>
);

// Design 1: Minimaliste Moderne
const Design1 = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [current, setCurrent] = useState('Char01');
  const characters = Array.from({ length: 14 }, (_, i) => `Char${String(i + 1).padStart(2, '0')}`);

  return (
    <div style={{
      position: 'absolute',
      top: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      background: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '16px',
      padding: '12px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div
          onClick={() => setIsExpanded(!isExpanded)}
          style={{
            width: '50px',
            height: '50px',
            background: 'white',
            borderRadius: '10px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid #4A90E2',
          }}
        >
          <img src={`/models/${current}/${current}.png`} alt="" style={{ width: '40px', height: '40px', imageRendering: 'pixelated' }} />
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          style={{
            background: '#4A90E2',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '8px 16px',
            cursor: 'pointer',
            fontSize: '0.85rem',
            fontWeight: 'bold',
          }}
        >
          {isExpanded ? 'Close' : 'Change'}
        </button>
      </div>
      {isExpanded && (
        <div style={{
          marginTop: '16px',
          paddingTop: '16px',
          borderTop: '1px solid #E0E0E0',
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '8px',
        }}>
          {characters.map((char) => (
            <div
              key={char}
              onClick={() => { setCurrent(char); setIsExpanded(false); }}
              style={{
                width: '50px',
                height: '50px',
                background: current === char ? '#E3F2FD' : 'white',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: current === char ? '2px solid #4A90E2' : '2px solid #E0E0E0',
              }}
            >
              <img src={`/models/${char}/${char}.png`} alt="" style={{ width: '40px', height: '40px', imageRendering: 'pixelated' }} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Design 2: Gaming Neon
const Design2 = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [current, setCurrent] = useState('Char01');
  const characters = Array.from({ length: 14 }, (_, i) => `Char${String(i + 1).padStart(2, '0')}`);

  return (
    <div style={{
      position: 'absolute',
      top: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      background: 'rgba(20, 20, 40, 0.9)',
      borderRadius: '16px',
      padding: '16px',
      boxShadow: '0 0 30px rgba(74, 144, 226, 0.5), 0 4px 12px rgba(0, 0, 0, 0.3)',
      border: '2px solid rgba(74, 144, 226, 0.5)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div
          onClick={() => setIsExpanded(!isExpanded)}
          style={{
            width: '60px',
            height: '60px',
            background: 'rgba(0, 0, 0, 0.5)',
            borderRadius: '12px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '3px solid #4A90E2',
            boxShadow: '0 0 20px rgba(74, 144, 226, 0.6)',
          }}
        >
          <img src={`/models/${current}/${current}.png`} alt="" style={{ width: '50px', height: '50px', imageRendering: 'pixelated' }} />
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: '2px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '10px',
            padding: '10px 20px',
            cursor: 'pointer',
            fontSize: '0.9rem',
            fontWeight: 'bold',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
            boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
          }}
        >
          {isExpanded ? '✕ CLOSE' : '⚡ SELECT'}
        </button>
      </div>
      {isExpanded && (
        <div style={{
          marginTop: '20px',
          paddingTop: '20px',
          borderTop: '2px solid rgba(74, 144, 226, 0.3)',
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '10px',
        }}>
          {characters.map((char) => (
            <div
              key={char}
              onClick={() => { setCurrent(char); setIsExpanded(false); }}
              style={{
                width: '55px',
                height: '55px',
                background: current === char ? 'rgba(74, 144, 226, 0.3)' : 'rgba(0, 0, 0, 0.5)',
                borderRadius: '10px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: current === char ? '3px solid #4A90E2' : '2px solid rgba(74, 144, 226, 0.2)',
                boxShadow: current === char ? '0 0 15px rgba(74, 144, 226, 0.6)' : 'none',
              }}
            >
              <img src={`/models/${char}/${char}.png`} alt="" style={{ width: '45px', height: '45px', imageRendering: 'pixelated' }} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Design 3: Card Carousel
const Design3 = () => {
  const [current, setCurrent] = useState(0);
  const characters = Array.from({ length: 14 }, (_, i) => `Char${String(i + 1).padStart(2, '0')}`);

  const prev = () => setCurrent((current - 1 + 14) % 14);
  const next = () => setCurrent((current + 1) % 14);

  return (
    <div style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
    }}>
      <button
        onClick={prev}
        style={{
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.9)',
          border: 'none',
          cursor: 'pointer',
          fontSize: '24px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        }}
      >
        ←
      </button>

      <div style={{
        background: 'white',
        borderRadius: '20px',
        padding: '30px',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
        minWidth: '200px',
        textAlign: 'center',
      }}>
        <div style={{
          width: '120px',
          height: '120px',
          margin: '0 auto',
          background: '#f0f0f0',
          borderRadius: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '16px',
        }}>
          <img
            src={`/models/${characters[current]}/${characters[current]}.png`}
            alt=""
            style={{ width: '100px', height: '100px', imageRendering: 'pixelated' }}
          />
        </div>
        <h3 style={{ margin: '0', color: '#333' }}>Character {current + 1}</h3>
        <p style={{ margin: '8px 0 0', color: '#666', fontSize: '0.85rem' }}>{current + 1} / 14</p>
      </div>

      <button
        onClick={next}
        style={{
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.9)',
          border: 'none',
          cursor: 'pointer',
          fontSize: '24px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        }}
      >
        →
      </button>
    </div>
  );
};

// Design 4: Bottom Bar
const Design4 = () => {
  const [current, setCurrent] = useState('Char01');
  const characters = Array.from({ length: 14 }, (_, i) => `Char${String(i + 1).padStart(2, '0')}`);

  return (
    <div style={{
      position: 'absolute',
      bottom: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      background: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '24px',
      padding: '16px 24px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
      backdropFilter: 'blur(10px)',
    }}>
      <div style={{
        display: 'flex',
        gap: '12px',
        alignItems: 'center',
      }}>
        {characters.map((char) => (
          <div
            key={char}
            onClick={() => setCurrent(char)}
            style={{
              width: current === char ? '70px' : '50px',
              height: current === char ? '70px' : '50px',
              background: current === char ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'white',
              borderRadius: '16px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
              transform: current === char ? 'translateY(-10px)' : 'translateY(0)',
              border: current === char ? '3px solid white' : '2px solid #E0E0E0',
              boxShadow: current === char ? '0 8px 20px rgba(102, 126, 234, 0.4)' : '0 2px 6px rgba(0, 0, 0, 0.1)',
            }}
          >
            <img
              src={`/models/${char}/${char}.png`}
              alt=""
              style={{
                width: current === char ? '60px' : '40px',
                height: current === char ? '60px' : '40px',
                imageRendering: 'pixelated',
                filter: current === char ? 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))' : 'none',
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

// Main Demo Page
export const CharacterMenuDesigns = () => {
  return (
    <div style={{
      width: '100vw',
      minHeight: '100vh',
      background: '#f5f5f5',
      padding: '40px 20px',
    }}>
      <h1 style={{
        textAlign: 'center',
        marginBottom: '40px',
        color: '#333',
        fontSize: '2.5rem',
      }}>
        Character Menu Designs
      </h1>

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '30px',
        maxWidth: '1800px',
        margin: '0 auto',
      }}>
        <DesignDemo title="Design 1: Minimaliste Moderne">
          <Design1 />
        </DesignDemo>

        <DesignDemo title="Design 2: Gaming Neon">
          <Design2 />
        </DesignDemo>

        <DesignDemo title="Design 3: Card Carousel">
          <Design3 />
        </DesignDemo>

        <DesignDemo title="Design 4: Bottom Bar (Dock)">
          <Design4 />
        </DesignDemo>
      </div>
    </div>
  );
};

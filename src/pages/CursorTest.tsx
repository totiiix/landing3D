import { useState } from 'react';

type CursorDesign = {
  name: string;
  description: string;
  cursor: string;
  customCSS?: string;
};

const cursorDesigns: CursorDesign[] = [
  {
    name: "Design 1: Croix Pixel",
    description: "Croix pixelisée classique style rétro",
    cursor: "crosshair",
    customCSS: `
      cursor: crosshair;
    `
  },
  {
    name: "Design 2: Pointeur Voxel",
    description: "SVG custom - main pixelisée",
    cursor: "custom",
    customCSS: `
      cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><rect x="8" y="0" width="4" height="4" fill="white"/><rect x="8" y="4" width="4" height="4" fill="white"/><rect x="8" y="8" width="4" height="4" fill="white"/><rect x="8" y="12" width="4" height="4" fill="white"/><rect x="12" y="12" width="4" height="4" fill="white"/><rect x="16" y="12" width="4" height="4" fill="white"/><rect x="4" y="12" width="4" height="4" fill="white"/><rect x="0" y="12" width="4" height="4" fill="white"/><rect x="12" y="16" width="4" height="4" fill="white"/><rect x="16" y="20" width="4" height="4" fill="white"/><rect x="8" y="0" width="4" height="4" fill="black" opacity="0.3"/></svg>') 0 0, auto;
    `
  },
  {
    name: "Design 3: Viseur Gaming",
    description: "Croix avec bordure - style FPS",
    cursor: "custom",
    customCSS: `
      cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><rect x="14" y="6" width="4" height="6" fill="white"/><rect x="14" y="20" width="4" height="6" fill="white"/><rect x="6" y="14" width="6" height="4" fill="white"/><rect x="20" y="14" width="6" height="4" fill="white"/><rect x="14" y="14" width="4" height="4" fill="transparent" stroke="white" stroke-width="1"/></svg>') 16 16, crosshair;
    `
  },
  {
    name: "Design 4: Cube 3D",
    description: "Petit cube isométrique",
    cursor: "custom",
    customCSS: `
      cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><polygon points="16,8 24,12 16,16 8,12" fill="%234da6ff"/><polygon points="8,12 8,20 16,24 16,16" fill="%232e7acc"/><polygon points="16,16 16,24 24,20 24,12" fill="%236bc4ff"/></svg>') 16 16, auto;
    `
  },
  {
    name: "Design 5: Cristal",
    description: "Forme de cristal brillant",
    cursor: "custom",
    customCSS: `
      cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><rect x="14" y="4" width="4" height="4" fill="%236bc4ff"/><rect x="14" y="8" width="4" height="4" fill="%234da6ff"/><rect x="10" y="12" width="4" height="4" fill="%234da6ff"/><rect x="14" y="12" width="4" height="4" fill="white"/><rect x="18" y="12" width="4" height="4" fill="%234da6ff"/><rect x="14" y="16" width="4" height="4" fill="%234da6ff"/><rect x="14" y="20" width="4" height="4" fill="%232e7acc"/></svg>') 16 16, auto;
    `
  },
  {
    name: "Design 6: Épée Pixel",
    description: "Petite épée pixelisée",
    cursor: "custom",
    customCSS: `
      cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><rect x="20" y="4" width="3" height="3" fill="%23cccccc"/><rect x="17" y="7" width="3" height="3" fill="%23cccccc"/><rect x="14" y="10" width="3" height="3" fill="%23cccccc"/><rect x="11" y="13" width="3" height="3" fill="%23999999"/><rect x="8" y="16" width="3" height="3" fill="%23666666"/><rect x="8" y="19" width="3" height="3" fill="%23d4af37"/><rect x="5" y="22" width="3" height="3" fill="%23d4af37"/><rect x="5" y="25" width="3" height="3" fill="%23b8941e"/></svg>') 4 4, auto;
    `
  },
  {
    name: "Design 7: Main Ouverte",
    description: "Main ouverte style pixel art",
    cursor: "custom",
    customCSS: `
      cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><rect x="12" y="4" width="3" height="8" fill="%23ffdbac"/><rect x="15" y="4" width="3" height="10" fill="%23ffdbac"/><rect x="18" y="4" width="3" height="9" fill="%23ffdbac"/><rect x="21" y="6" width="3" height="7" fill="%23ffdbac"/><rect x="9" y="12" width="15" height="8" fill="%23ffdbac"/><rect x="9" y="20" width="12" height="4" fill="%23ffdbac"/></svg>') 16 16, pointer;
    `
  },
  {
    name: "Design 8: Cible Simple",
    description: "Cercles concentriques minimalistes",
    cursor: "custom",
    customCSS: `
      cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><circle cx="16" cy="16" r="12" fill="none" stroke="white" stroke-width="2" opacity="0.8"/><circle cx="16" cy="16" r="6" fill="none" stroke="white" stroke-width="2" opacity="0.8"/><circle cx="16" cy="16" r="2" fill="white" opacity="0.8"/></svg>') 16 16, crosshair;
    `
  }
];

export const CursorTest = () => {
  const [selectedCursor, setSelectedCursor] = useState<number | null>(null);

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
      overflow: 'auto',
      padding: '40px 20px'
    }}>
      {/* Titre */}
      <div style={{
        color: 'white',
        fontSize: '32px',
        fontFamily: 'monospace',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: '40px'
      }}>
        🖱️ Designs de Curseur Voxel
      </div>

      {/* Grille de designs */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '30px',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {cursorDesigns.map((design, index) => (
          <div
            key={index}
            onClick={() => setSelectedCursor(index)}
            style={{
              background: selectedCursor === index ? '#2d4263' : '#1f2937',
              border: selectedCursor === index ? '3px solid #4da6ff' : '2px solid #374151',
              borderRadius: '12px',
              padding: '30px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              position: 'relative'
            }}
          >
            {/* Badge sélectionné */}
            {selectedCursor === index && (
              <div style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: '#4da6ff',
                color: 'white',
                padding: '5px 12px',
                borderRadius: '6px',
                fontSize: '12px',
                fontFamily: 'monospace',
                fontWeight: 'bold'
              }}>
                ✓ SÉLECTIONNÉ
              </div>
            )}

            {/* Nom */}
            <div style={{
              color: 'white',
              fontSize: '20px',
              fontFamily: 'monospace',
              fontWeight: 'bold',
              marginBottom: '10px'
            }}>
              {design.name}
            </div>

            {/* Description */}
            <div style={{
              color: '#9ca3af',
              fontSize: '14px',
              fontFamily: 'monospace',
              marginBottom: '25px'
            }}>
              {design.description}
            </div>

            {/* Zone de prévisualisation */}
            <div
              style={{
                background: '#111827',
                border: '2px dashed #374151',
                borderRadius: '8px',
                height: '200px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#6b7280',
                fontSize: '14px',
                fontFamily: 'monospace',
                ...(design.customCSS ? { cursor: design.cursor } : {})
              }}
            >
              {design.customCSS && (
                <style>
                  {`
                    .cursor-preview-${index}:hover {
                      ${design.customCSS}
                    }
                  `}
                </style>
              )}
              <div className={`cursor-preview-${index}`} style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                ...(design.customCSS && design.cursor === 'custom' ? {} : { cursor: design.cursor })
              }}>
                {design.customCSS && (
                  <style>
                    {`
                      .cursor-preview-${index} {
                        ${design.customCSS}
                      }
                    `}
                  </style>
                )}
                Survolez pour voir le curseur
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Instructions */}
      <div style={{
        color: '#9ca3af',
        fontSize: '14px',
        fontFamily: 'monospace',
        textAlign: 'center',
        marginTop: '40px',
        padding: '20px',
        background: '#1f2937',
        borderRadius: '8px',
        maxWidth: '600px',
        margin: '40px auto 0'
      }}>
        💡 Cliquez sur un design pour le sélectionner, puis survolez la zone de prévisualisation pour voir le curseur en action
      </div>
    </div>
  );
};

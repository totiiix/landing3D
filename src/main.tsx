import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import DesignTest from './DesignTest.tsx'
import { CrystalTest } from './pages/CrystalTest.tsx'
import { CursorTest } from './pages/CursorTest.tsx'
import { AudioProvider } from './contexts/AudioContext.tsx'

// Check URL for test modes
const urlParams = new URLSearchParams(window.location.search);
const showDesigns = urlParams.get('designs') === 'true';
const showCrystals = urlParams.get('crystals') === 'true';
const showCursors = urlParams.get('cursors') === 'true';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AudioProvider>
      {showCursors ? <CursorTest /> : showCrystals ? <CrystalTest /> : showDesigns ? <DesignTest /> : <App />}
    </AudioProvider>
  </StrictMode>,
)

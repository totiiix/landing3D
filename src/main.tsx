import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import DesignTest from './DesignTest.tsx'
import { AudioProvider } from './contexts/AudioContext.tsx'

// Check URL for design test mode
const urlParams = new URLSearchParams(window.location.search);
const showDesigns = urlParams.get('designs') === 'true';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AudioProvider>
      {showDesigns ? <DesignTest /> : <App />}
    </AudioProvider>
  </StrictMode>,
)

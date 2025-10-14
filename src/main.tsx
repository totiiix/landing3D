import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import DesignTest from './DesignTest.tsx'

// Check URL for design test mode
const urlParams = new URLSearchParams(window.location.search);
const showDesigns = urlParams.get('designs') === 'true';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {showDesigns ? <DesignTest /> : <App />}
  </StrictMode>,
)

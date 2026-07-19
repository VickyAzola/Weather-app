import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
// Supports weights 100-900
import '@fontsource-variable/dm-sans/wght.css';
import '@fontsource/bricolage-grotesque/700.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
